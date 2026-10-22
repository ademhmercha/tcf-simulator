# Module « Expression écrite » — TCF Simulator

Ce document est à placer à la **racine du projet**. Il contient tout ce qu'il faut pour ajouter un module d'entraînement à l'expression écrite :

1. un **prompt** à donner à Claude Code (ou à tout assistant de code),
2. le **SQL Supabase** (tables + sécurité),
3. les **30 sujets** (B2, C1, C2) au format JSON, prêts à importer.

Pour l'utiliser : ouvre le projet dans Claude Code et dis-lui :
> Lis le fichier WRITING_MODULE.md à la racine et réalise la tâche décrite dans la section « Prompt ».

---

## 1. Prompt

Tu travailles sur **TCF Simulator**, une application d'entraînement au TCF (Next.js, Supabase, déployée sur Vercel, interface en français avec des routes de type `/fr/...`, compte utilisateur, chronomètre, PWA).

### Objectif
Ajouter un module **« Expression écrite »**. Les candidats passent l'épreuve **sur papier, au stylo**, donc l'application **ne propose PAS de zone de texte pour écrire** et **n'utilise PAS d'IA**. Le site fournit le sujet, le chronomètre, une feuille à imprimer, puis une auto-évaluation et des aides (plan, phrases utiles, erreurs fréquentes).

### Étape 0 : explorer avant de coder
Avant toute modification, lis la structure du projet : routage et i18n (comment sont gérées les traductions et la langue `/fr`), composants UI existants, client Supabase (côté serveur et côté client), pages de tests, tableau de bord et authentification. **Suis les conventions existantes** (styles, nommage, dossiers). Ne casse aucune fonctionnalité existante.

### Étape 1 : base de données
Exécute le SQL de la section 2 (migration Supabase, dans le dossier de migrations du projet s'il existe). Si le projet utilise une autre table que `auth.users` pour les profils, adapte la clé étrangère de `writing_attempts.user_id`.

### Étape 2 : import des sujets
Crée un script d'import (par exemple `scripts/seed-writing-prompts.ts`) qui lit les 30 sujets du JSON de la section 3 (copie-les dans `data/writing_prompts.json`) et fait un **upsert sur la colonne `slug`** avec la clé `service_role` (jamais exposée au navigateur). Le script doit pouvoir être relancé sans créer de doublons. Ajoute la commande dans `package.json`.

### Étape 3 : pages
Crée, avec le même design que le reste du site :

1. **`/fr/ecriture`** — liste des sujets, **page publique** (pas besoin de compte).
   - Filtres : tâche (1, 2, 3), niveau (B2, C1, C2), thème.
   - Chaque carte affiche : titre, tâche, niveau, thème, nombre de mots, durée.
   - Un court texte d'introduction sur l'épreuve d'expression écrite du TCF (3 tâches, 60 minutes), utile pour le référencement.

2. **`/fr/ecriture/[slug]`** — page d'un sujet, **publique en lecture**.
   - Affiche la consigne et, pour la tâche 3, les deux documents (`documents`).
   - Rappelle la fourchette de mots (`min_words`–`max_words`) et la durée conseillée.
   - **Chronomètre** (démarrer / pause / réinitialiser) qui reprend la durée du sujet et fait un signal à la fin.
   - Bouton **« Imprimer la feuille »** : feuille A4 avec lignes, en-tête (nom, date, tâche) et un repère tous les 10 mots à peu près. Utilise une feuille de style `@media print` ou une route dédiée `/fr/ecriture/feuille`.
   - Bouton **« J'ai terminé »** qui ouvre l'étape d'auto-évaluation :
     - un champ numérique : « Combien de mots as-tu écrits ? » (avec alerte si hors de la fourchette) ;
     - une **checklist** (voir plus bas) ;
     - puis l'affichage de l'aide : `plan`, `useful_phrases`, `common_mistakes`.
   - Si l'utilisateur est connecté, enregistre la tentative dans `writing_attempts` (temps passé, nombre de mots, checklist, score d'auto-évaluation). S'il ne l'est pas, affiche tout quand même et propose de créer un compte pour sauvegarder sa progression.

3. **Historique** dans l'espace personnel : liste des tentatives (sujet, date, mots, score d'auto-évaluation) et un petit indicateur de progression.

### Checklist d'auto-évaluation (constante dans le code, traduisible)
1. J'ai respecté la consigne et traité tout le sujet
2. Mon nombre de mots est dans la fourchette
3. Le registre est adapté (tu / vous, formules de politesse)
4. Mon texte est organisé en paragraphes avec une introduction et une conclusion
5. J'ai utilisé des connecteurs variés
6. J'ai relu les accords, la conjugaison et l'orthographe
7. J'ai donné des exemples ou des arguments précis
8. Mon écriture est lisible

`self_score` = pourcentage de cases cochées. Précise dans l'interface : *« Indicateur d'entraînement, ce n'est pas une note officielle. »*

### Étape 4 : référencement (important)
- Chaque page doit avoir un `<title>` et une `description` propres, avec des mots-clés comme « expression écrite TCF », « tâche 3 », « sujet corrigé », « Tunisie ».
- Les pages `/fr/ecriture` et `/fr/ecriture/[slug]` doivent être rendues côté serveur et ajoutées au **sitemap**.
- **Bug connu à corriger** : la balise `canonical` et `og:url` du site pointent actuellement vers `https://tcf-simulator.vercel.app` au lieu du domaine réel du site (`tcf-simulator-tn.vercel.app` ou le futur domaine). Cherche l'origine (probablement `metadataBase`, une variable d'environnement du type `NEXT_PUBLIC_SITE_URL`, ou une valeur codée en dur), corrige-la pour **toutes** les pages, et fais en sorte que le canonical utilise la même variable partout.

### Contraintes
- Textes d'interface en français, via le système de traduction existant.
- RLS Supabase activé (voir SQL). Aucune clé secrète côté client.
- Les sujets sont originaux et n'appartiennent pas au TCF officiel : garde la mention déjà présente sur le site.
- Pas de dépendance lourde pour le chrono ou l'impression.
- À la fin, résume ce que tu as créé et comment lancer la migration et l'import.

---

## 2. SQL Supabase

À exécuter dans l'éditeur SQL de Supabase (ou en migration).

```sql
-- Sujets d'expression écrite
create table if not exists public.writing_prompts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  task smallint not null check (task in (1, 2, 3)),
  level text not null check (level in ('B1', 'B2', 'C1', 'C2')),
  theme text not null,
  title text not null,
  instructions text not null,
  documents jsonb not null default '[]'::jsonb,          -- tâche 3 : [{author, text}]
  min_words int not null,
  max_words int not null,
  duration_min int not null,
  plan jsonb not null default '[]'::jsonb,
  useful_phrases jsonb not null default '[]'::jsonb,
  common_mistakes jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists writing_prompts_task_level_idx
  on public.writing_prompts (task, level) where published;

-- Tentatives de l'utilisateur (écriture sur papier + auto-évaluation)
create table if not exists public.writing_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  prompt_id uuid not null references public.writing_prompts (id) on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  duration_seconds int,
  word_count int,
  checklist jsonb not null default '{}'::jsonb,
  self_score smallint check (self_score between 0 and 100),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists writing_attempts_user_idx
  on public.writing_attempts (user_id, created_at desc);

-- Sécurité (RLS)
alter table public.writing_prompts enable row level security;
alter table public.writing_attempts enable row level security;

create policy "Lecture publique des sujets publiés"
  on public.writing_prompts for select
  using (published = true);

create policy "Chaque utilisateur gère ses tentatives"
  on public.writing_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

L'import des sujets utilise la clé `service_role`, qui contourne la RLS : il n'y a donc pas besoin de politique d'écriture sur `writing_prompts`.

---

## 3. Les 30 sujets (JSON)

Répartition : **10 en B2** (tâche 1 ×5, tâche 2 ×5), **10 en C1** (tâche 2 ×5, tâche 3 ×5), **10 en C2** (tâche 3 ×10).

Fourchettes de mots utilisées : tâche 1 = 60 à 120, tâche 2 = 120 à 150, tâche 3 = 120 à 180. **À vérifier sur le site de France Éducation international** avant publication, car elles peuvent évoluer.

À copier dans `data/writing_prompts.json` :

```json
[
  {
    "slug": "t1-b2-01-reclamation-ordinateur",
    "task": 1,
    "level": "B2",
    "theme": "consommation",
    "title": "Réclamation pour un colis abîmé",
    "instructions": "Vous avez commandé un ordinateur portable sur un site de vente en ligne. À la livraison, l'écran est fissuré. Écrivez au service client pour expliquer la situation et demander un remplacement ou un remboursement.",
    "documents": [],
    "min_words": 60,
    "max_words": 120,
    "duration_min": 10,
    "plan": [
      "Rappeler la commande (date, numéro)",
      "Décrire précisément le problème",
      "Formuler la demande et proposer un délai"
    ],
    "useful_phrases": [
      "Je me permets de vous contacter au sujet de ma commande n° ...",
      "À la réception du colis, j'ai constaté que...",
      "Je vous serais reconnaissant(e) de bien vouloir procéder au remplacement de...",
      "Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées."
    ],
    "common_mistakes": [
      "Adopter un ton agressif ou trop familier",
      "Oublier la formule de politesse finale"
    ]
  },
  {
    "slug": "t1-b2-02-report-entretien",
    "task": 1,
    "level": "B2",
    "theme": "travail",
    "title": "Reporter un entretien d'embauche",
    "instructions": "Vous avez un entretien d'embauche demain, mais un empêchement imprévu vous empêche d'y assister. Écrivez au responsable des ressources humaines pour vous excuser et proposer un autre rendez-vous.",
    "documents": [],
    "min_words": 60,
    "max_words": 120,
    "duration_min": 10,
    "plan": [
      "Rappeler le rendez-vous prévu",
      "Expliquer brièvement l'empêchement et s'excuser",
      "Proposer deux ou trois nouveaux créneaux"
    ],
    "useful_phrases": [
      "Je regrette de devoir reporter notre entretien prévu le...",
      "Un contretemps de dernière minute m'oblige à...",
      "Je serais disponible le... ou le...",
      "Je vous prie de bien vouloir excuser ce désagrément."
    ],
    "common_mistakes": [
      "Donner trop de détails personnels",
      "Ne proposer aucune date de remplacement"
    ]
  },
  {
    "slug": "t1-b2-03-chauffage-proprietaire",
    "task": 1,
    "level": "B2",
    "theme": "logement",
    "title": "Panne de chauffage chez le propriétaire",
    "instructions": "Le chauffage de votre appartement ne fonctionne plus depuis une semaine. Écrivez à votre propriétaire pour signaler le problème, rappeler vos démarches précédentes et demander une intervention rapide.",
    "documents": [],
    "min_words": 60,
    "max_words": 120,
    "duration_min": 10,
    "plan": [
      "Signaler la panne et sa durée",
      "Rappeler les démarches déjà faites",
      "Demander une intervention et fixer une échéance"
    ],
    "useful_phrases": [
      "Je vous écris à propos du chauffage de mon logement, en panne depuis le...",
      "Malgré mon appel du..., la situation n'a pas évolué.",
      "Je vous demande de faire intervenir un technicien dans les meilleurs délais.",
      "À défaut, je serai contraint(e) de..."
    ],
    "common_mistakes": [
      "Menacer sans avoir expliqué le problème",
      "Confondre « tu » et « vous »"
    ]
  },
  {
    "slug": "t1-b2-04-informations-inscription",
    "task": 1,
    "level": "B2",
    "theme": "études",
    "title": "Demande d'informations sur une inscription",
    "instructions": "Vous souhaitez vous inscrire dans une université française. Écrivez au secrétariat de la formation pour demander des informations sur les dates d'inscription, les documents à fournir et les frais.",
    "documents": [],
    "min_words": 60,
    "max_words": 120,
    "duration_min": 10,
    "plan": [
      "Se présenter et dire quelle formation intéresse",
      "Poser les questions de façon claire et ordonnée",
      "Remercier et annoncer que vous attendez la réponse"
    ],
    "useful_phrases": [
      "Actuellement étudiant(e) en..., je souhaite m'inscrire en...",
      "Pourriez-vous m'indiquer les dates limites de dépôt des dossiers ?",
      "Je voudrais également savoir quels documents sont à fournir.",
      "Je vous remercie par avance de votre réponse."
    ],
    "common_mistakes": [
      "Poser des questions sans ordre",
      "Écrire un message trop long pour la tâche 1"
    ]
  },
  {
    "slug": "t1-b2-05-candidature-job-ete",
    "task": 1,
    "level": "B2",
    "theme": "travail",
    "title": "Candidature pour un emploi d'été",
    "instructions": "Vous avez lu une annonce pour un emploi d'été dans un hôtel. Écrivez au directeur pour poser votre candidature : présentez votre profil, vos disponibilités et expliquez pourquoi ce poste vous intéresse.",
    "documents": [],
    "min_words": 60,
    "max_words": 120,
    "duration_min": 10,
    "plan": [
      "Dire à quelle annonce vous répondez",
      "Présenter votre profil et vos qualités",
      "Indiquer vos disponibilités et demander un entretien"
    ],
    "useful_phrases": [
      "Je me permets de poser ma candidature au poste de... proposé dans votre annonce.",
      "Sérieux(se) et dynamique, j'ai déjà travaillé comme...",
      "Je suis disponible du... au...",
      "Je serais heureux(se) de vous rencontrer lors d'un entretien."
    ],
    "common_mistakes": [
      "Copier un modèle de lettre sans l'adapter",
      "Oublier de préciser les dates de disponibilité"
    ]
  },
  {
    "slug": "t2-b2-01-voyage-marquant",
    "task": 2,
    "level": "B2",
    "theme": "voyage",
    "title": "Un voyage qui vous a marqué",
    "instructions": "Pour le blog de votre école, racontez un voyage qui vous a marqué : où êtes-vous allé(e), qu'avez-vous vécu et pourquoi ce souvenir est-il important pour vous ?",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Situer le voyage (où, quand, avec qui)",
      "Raconter les moments forts",
      "Conclure sur ce que vous en avez retiré"
    ],
    "useful_phrases": [
      "C'était il y a deux ans, lors d'un séjour à...",
      "Ce qui m'a le plus frappé(e), c'est...",
      "Cette expérience m'a appris que...",
      "J'en garde un souvenir inoubliable."
    ],
    "common_mistakes": [
      "Mélanger passé composé et imparfait",
      "Raconter sans exprimer son ressenti"
    ]
  },
  {
    "slug": "t2-b2-02-conseil-etudes-travail",
    "task": 2,
    "level": "B2",
    "theme": "études",
    "title": "Conseiller un ami : études ou travail",
    "instructions": "Un(e) ami(e) hésite entre commencer à travailler tout de suite ou poursuivre ses études. Écrivez-lui une lettre pour lui donner votre avis et le (la) conseiller en comparant les deux options.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Montrer que vous comprenez son hésitation",
      "Comparer les avantages des deux options",
      "Donner votre conseil"
    ],
    "useful_phrases": [
      "Je comprends tout à fait ton hésitation, car...",
      "D'un côté, travailler permet de..., de l'autre, étudier offre...",
      "À ta place, je choisirais...",
      "Quoi que tu décides, je te soutiendrai."
    ],
    "common_mistakes": [
      "Ne donner aucun conseil précis",
      "Utiliser un ton trop formel avec un ami"
    ]
  },
  {
    "slug": "t2-b2-03-article-accueil-etudiants",
    "task": 2,
    "level": "B2",
    "theme": "études",
    "title": "Journée d'accueil des étudiants internationaux",
    "instructions": "Vous avez participé à la journée d'accueil des étudiants internationaux de votre université. Rédigez un court article pour le journal de l'université : décrivez la journée et donnez votre appréciation.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Un titre et une introduction qui situent l'événement",
      "Le déroulement de la journée",
      "Votre appréciation et une suggestion"
    ],
    "useful_phrases": [
      "Le jeudi..., l'université a accueilli plus de... étudiants venus de...",
      "Au programme : visite du campus, présentation des services...",
      "Dans l'ensemble, cette journée m'a permis de...",
      "On aurait pu souhaiter davantage de..."
    ],
    "common_mistakes": [
      "Oublier le titre de l'article",
      "Faire une liste au lieu d'un texte rédigé"
    ]
  },
  {
    "slug": "t2-b2-04-lettre-mairie-quartier",
    "task": 2,
    "level": "B2",
    "theme": "ville",
    "title": "Un projet pour améliorer votre quartier",
    "instructions": "Écrivez au maire de votre ville pour proposer un projet qui améliorerait la vie dans votre quartier (espace vert, piste cyclable, salle de sport...). Présentez le projet et expliquez ses avantages.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Présenter le problème actuel du quartier",
      "Décrire votre projet",
      "Montrer ses avantages et demander une rencontre"
    ],
    "useful_phrases": [
      "Habitant du quartier de..., je me permets de vous proposer...",
      "Actuellement, les habitants manquent de...",
      "Ce projet permettrait de...",
      "Je me tiens à votre disposition pour en discuter."
    ],
    "common_mistakes": [
      "Critiquer sans proposer de solution",
      "Oublier la formule de politesse formelle"
    ]
  },
  {
    "slug": "t2-b2-05-difficulte-surmontee",
    "task": 2,
    "level": "B2",
    "theme": "langue",
    "title": "Une difficulté surmontée en apprenant le français",
    "instructions": "Racontez une difficulté que vous avez rencontrée en apprenant le français (ou une autre langue) et expliquez comment vous l'avez surmontée.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Présenter la difficulté",
      "Expliquer les solutions essayées",
      "Dire le résultat et donner un conseil"
    ],
    "useful_phrases": [
      "Au début, j'avais beaucoup de mal à...",
      "Pour y remédier, j'ai décidé de...",
      "Peu à peu, j'ai fini par...",
      "Mon conseil à ceux qui rencontrent le même problème : ..."
    ],
    "common_mistakes": [
      "Ne parler que du problème sans la solution",
      "Répéter les mêmes connecteurs (et, puis)"
    ]
  },
  {
    "slug": "t2-c1-01-colocation",
    "task": 2,
    "level": "C1",
    "theme": "logement",
    "title": "Vivre en colocation, une bonne idée ?",
    "instructions": "Pour un blog d'étudiants, rédigez un article intitulé « Vivre en colocation, une bonne idée ? ». Analysez les avantages et les inconvénients, puis donnez votre conclusion.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Introduction qui pose la question",
      "Avantages puis inconvénients, avec des exemples",
      "Conclusion personnelle nuancée"
    ],
    "useful_phrases": [
      "Si la colocation séduit de plus en plus d'étudiants, elle n'est pas sans contraintes.",
      "Outre l'aspect financier, elle permet de...",
      "En revanche, le partage du quotidien peut engendrer...",
      "Tout bien considéré, je dirais que..."
    ],
    "common_mistakes": [
      "Énumérer sans organiser en paragraphes",
      "Rester vague sans exemple concret"
    ]
  },
  {
    "slug": "t2-c1-02-lettre-ouverte-bibliotheque",
    "task": 2,
    "level": "C1",
    "theme": "études",
    "title": "Défendre l'ouverture de la bibliothèque le week-end",
    "instructions": "Votre université envisage de fermer la bibliothèque le week-end. Rédigez une lettre ouverte au directeur pour défendre le maintien de l'ouverture, avec des arguments précis.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Exposer le contexte et votre position",
      "Deux ou trois arguments développés",
      "Proposer une alternative et conclure"
    ],
    "useful_phrases": [
      "C'est avec inquiétude que j'ai appris votre projet de fermer...",
      "Une telle décision pénaliserait avant tout les étudiants qui...",
      "Je vous invite à reconsidérer cette mesure, ou du moins à...",
      "Veuillez agréer, Monsieur le Directeur, l'expression de ma haute considération."
    ],
    "common_mistakes": [
      "Passer à un ton trop émotionnel",
      "Ne pas proposer de compromis"
    ]
  },
  {
    "slug": "t2-c1-03-reseaux-sociaux-communication",
    "task": 2,
    "level": "C1",
    "theme": "technologie",
    "title": "Les réseaux sociaux et votre façon de communiquer",
    "instructions": "Dans un témoignage destiné à un magazine, expliquez comment les réseaux sociaux ont modifié votre façon de communiquer avec vos proches, en évoquant à la fois les bénéfices et les limites.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Situer votre usage des réseaux",
      "Les bénéfices avec exemples",
      "Les limites et votre bilan"
    ],
    "useful_phrases": [
      "Il y a encore quelques années, je me contentais de...",
      "Grâce aux réseaux sociaux, je peux désormais...",
      "Néanmoins, j'ai le sentiment que les échanges sont devenus plus superficiels.",
      "Aujourd'hui, j'essaie de trouver un juste équilibre."
    ],
    "common_mistakes": [
      "Écrire un témoignage sans « je »",
      "Ne traiter que les avantages"
    ]
  },
  {
    "slug": "t2-c1-04-courrier-lecteurs-teletravail",
    "task": 2,
    "level": "C1",
    "theme": "travail",
    "title": "Réagir à un article sur le télétravail",
    "instructions": "Un article affirme que le télétravail nuit à la cohésion des équipes. Dans une lettre au courrier des lecteurs, réagissez en nuançant ce point de vue à l'aide d'exemples.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Dire quel article provoque votre réaction",
      "Nuancer avec des exemples",
      "Conclure avec une position équilibrée"
    ],
    "useful_phrases": [
      "Je réagis à l'article publié le... qui affirme que...",
      "Cette affirmation mérite d'être nuancée.",
      "Tout dépend de la manière dont le travail est organisé.",
      "Plutôt que de l'opposer au bureau, il faudrait envisager..."
    ],
    "common_mistakes": [
      "Répondre par un simple « je suis d'accord / pas d'accord »",
      "Oublier de citer l'article auquel on répond"
    ]
  },
  {
    "slug": "t2-c1-05-tradition-disparaitre",
    "task": 2,
    "level": "C1",
    "theme": "culture",
    "title": "Une tradition menacée de disparition",
    "instructions": "Un magazine culturel prépare un dossier sur les traditions menacées. Présentez une tradition de votre pays qui risque de disparaître et expliquez pourquoi il faut la préserver.",
    "documents": [],
    "min_words": 120,
    "max_words": 150,
    "duration_min": 20,
    "plan": [
      "Présenter la tradition",
      "Expliquer pourquoi elle recule",
      "Argumenter pour sa préservation"
    ],
    "useful_phrases": [
      "Parmi les traditions de mon pays, il en est une qui...",
      "Elle tend à disparaître en raison de...",
      "La préserver, c'est transmettre aux générations futures...",
      "Il appartient à chacun de..."
    ],
    "common_mistakes": [
      "Décrire sans expliquer pourquoi elle disparaît",
      "Oublier la conclusion"
    ]
  },
  {
    "slug": "t3-c1-01-teletravail",
    "task": 3,
    "level": "C1",
    "theme": "travail",
    "title": "Le télétravail : liberté ou isolement ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Le télétravail est-il bénéfique pour les salariés ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Karim, 38 ans, ingénieur",
        "text": "« Le télétravail m'a changé la vie. Plus de trajets épuisants, plus de temps pour ma famille, et je suis plus concentré chez moi qu'au bureau. »"
      },
      {
        "author": "Hélène, 45 ans, responsable d'équipe",
        "text": "« À distance, on perd la spontanéité des échanges. Les nouveaux arrivants s'isolent et les idées naissent moins facilement qu'autour d'un café. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent sur la question de...",
      "D'un côté..., de l'autre...",
      "À mon sens, ..., en effet...",
      "En définitive, il me semble préférable de...",
      "Le télétravail offre une souplesse appréciable, mais...",
      "L'équilibre entre vie privée et vie professionnelle..."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c1-02-etudes-etranger",
    "task": 3,
    "level": "C1",
    "theme": "études",
    "title": "Faut-il faire ses études à l'étranger ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Faire ses études à l'étranger est-il une bonne option ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Yasmine, 22 ans, étudiante",
        "text": "« Étudier à l'étranger ouvre l'esprit, améliore ses langues et donne un énorme avantage sur le marché du travail. »"
      },
      {
        "author": "Pierre, 50 ans, parent d'étudiant",
        "text": "« Ces études coûtent très cher, éloignent les jeunes de leur famille et beaucoup ne reviennent jamais. Les bonnes formations existent aussi chez nous. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent sur la question de...",
      "D'un côté..., de l'autre...",
      "À mon sens, ..., en effet...",
      "En définitive, il me semble préférable de...",
      "Une expérience internationale constitue un atout sur un CV.",
      "Le coût d'un tel projet ne doit pas être négligé."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c1-03-telephones-lycee",
    "task": 3,
    "level": "C1",
    "theme": "éducation",
    "title": "Interdire les téléphones portables au lycée ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Faut-il interdire les téléphones portables au lycée ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Mme Laurent, professeure",
        "text": "« Les portables distraient les élèves et favorisent le harcèlement. Les interdire redonnerait de la concentration et de la sérénité à la classe. »"
      },
      {
        "author": "Nabil, 17 ans, lycéen",
        "text": "« Mon téléphone me sert à chercher des informations et à utiliser des applications pédagogiques. Plutôt que de l'interdire, il faut apprendre à bien s'en servir. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent sur la question de...",
      "D'un côté..., de l'autre...",
      "À mon sens, ..., en effet...",
      "En définitive, il me semble préférable de...",
      "L'école doit préparer les élèves à un usage raisonné du numérique.",
      "Une interdiction totale paraît difficile à faire respecter."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c1-04-transports-gratuits",
    "task": 3,
    "level": "C1",
    "theme": "ville",
    "title": "Des transports en commun gratuits ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Les transports en commun devraient-ils être gratuits ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Un élu municipal",
        "text": "« Rendre les transports en commun gratuits réduirait la pollution et le trafic, et profiterait surtout aux familles modestes. »"
      },
      {
        "author": "Une usagère",
        "text": "« Gratuit ne veut pas dire sans coût : sans recettes, les bus seront moins fréquents et moins bien entretenus. Mieux vaut des tarifs bas et un service de qualité. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent sur la question de...",
      "D'un côté..., de l'autre...",
      "À mon sens, ..., en effet...",
      "En définitive, il me semble préférable de...",
      "Le coût d'un tel dispositif reposerait sur les contribuables.",
      "Les transports collectifs répondent à un enjeu à la fois écologique et social."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c1-05-reseaux-moins-15-ans",
    "task": 3,
    "level": "C1",
    "theme": "société",
    "title": "Réseaux sociaux : une interdiction avant 15 ans ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Faut-il interdire les réseaux sociaux aux moins de 15 ans ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Mme Dubois, mère de deux adolescents",
        "text": "« Les réseaux sociaux exposent les enfants au harcèlement et à des contenus violents. Avant 15 ans, ils ne sont pas prêts à en mesurer les dangers. »"
      },
      {
        "author": "Thomas, 16 ans",
        "text": "« C'est là que je garde le contact avec mes amis et que je découvre des idées. Interdire ne résout rien : mieux vaut éduquer les jeunes à les utiliser. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent sur la question de...",
      "D'un côté..., de l'autre...",
      "À mon sens, ..., en effet...",
      "En définitive, il me semble préférable de...",
      "L'exposition précoce aux écrans peut nuire à la santé mentale.",
      "Le contrôle parental ne suffit pas toujours."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-01-ia-emploi",
    "task": 3,
    "level": "C2",
    "theme": "technologie",
    "title": "L'intelligence artificielle et l'emploi",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « L'intelligence artificielle est-elle une menace pour l'emploi ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Sophie, économiste",
        "text": "« L'IA supprimera des emplois répétitifs, mais elle en créera d'autres, comme les révolutions industrielles précédentes. L'enjeu est de former les travailleurs. »"
      },
      {
        "author": "Marc, syndicaliste",
        "text": "« Cette fois, c'est différent : l'IA touche aussi les métiers intellectuels et le rythme du changement est trop rapide pour que chacun puisse se reconvertir. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "La formation tout au long de la vie devient une nécessité.",
      "Le progrès technique n'est pas neutre sur le plan social."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-02-tourisme-masse",
    "task": 3,
    "level": "C2",
    "theme": "tourisme",
    "title": "Faut-il limiter le tourisme de masse ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Faut-il limiter le tourisme de masse ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Un hôtelier",
        "text": "« Le tourisme fait vivre des régions entières et crée des milliers d'emplois. Le limiter reviendrait à appauvrir ceux qui en dépendent. »"
      },
      {
        "author": "Une habitante d'une ville touristique",
        "text": "« Loyers en hausse, rues saturées, sites abîmés : le tourisme de masse chasse les habitants et dégrade le patrimoine. Il faut fixer des quotas. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "Le tourisme est une manne économique, mais à quel prix ?",
      "Un tourisme plus durable reste à inventer."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-03-semaine-quatre-jours",
    "task": 3,
    "level": "C2",
    "theme": "travail",
    "title": "La semaine de quatre jours",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « La semaine de travail de quatre jours devrait-elle se généraliser ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Chloé, directrice des ressources humaines",
        "text": "« En passant à quatre jours, nos salariés sont moins stressés, plus motivés et moins absents. La productivité n'a pas baissé. »"
      },
      {
        "author": "Olivier, chef d'entreprise",
        "text": "« Certains secteurs, comme la santé ou le commerce, ne peuvent pas s'arrêter. Concentrer le travail sur quatre jours fatigue et peut creuser les inégalités entre métiers. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "Une telle réforme ne s'appliquerait pas de la même façon à tous les secteurs.",
      "La qualité de vie au travail est devenue un critère d'attractivité."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-04-fuite-des-cerveaux",
    "task": 3,
    "level": "C2",
    "theme": "société",
    "title": "La fuite des cerveaux",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « L'émigration des jeunes diplômés est-elle un problème pour leur pays d'origine ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Amine, jeune ingénieur",
        "text": "« Quand on est diplômé, rester, c'est parfois accepter des salaires faibles et peu de perspectives. Partir est un droit, et une chance de progresser. »"
      },
      {
        "author": "Un professeur d'université",
        "text": "« Le pays forme des jeunes à ses frais et les voit partir. Cette fuite des cerveaux freine le développement et affaiblit les hôpitaux, les universités et les entreprises. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "La libre circulation des compétences peut aussi profiter au pays d'origine.",
      "Encore faut-il offrir des conditions attractives pour retenir les talents."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-05-agriculture-bio",
    "task": 3,
    "level": "C2",
    "theme": "environnement",
    "title": "Tout bio : utopie ou nécessité ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Faut-il développer massivement l'agriculture biologique ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Une agricultrice bio",
        "text": "« Le bio préserve les sols, l'eau et la santé des consommateurs. Il faut le développer, même si les produits sont un peu plus chers. »"
      },
      {
        "author": "Un économiste agricole",
        "text": "« Avec des rendements plus faibles, une agriculture entièrement bio ne pourrait pas nourrir une population qui augmente, et les prix deviendraient inaccessibles à beaucoup. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "La sécurité alimentaire est un enjeu majeur.",
      "Il s'agit de concilier rendement et respect de l'environnement."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-06-voiture-thermique",
    "task": 3,
    "level": "C2",
    "theme": "environnement",
    "title": "Interdire les voitures thermiques ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Faut-il interdire la vente de voitures thermiques à moyen terme ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Une militante écologiste",
        "text": "« Interdire la vente des voitures thermiques est indispensable pour atteindre les objectifs climatiques. Les constructeurs s'adapteront. »"
      },
      {
        "author": "Un artisan",
        "text": "« Les voitures électriques restent chères et les bornes de recharge manquent. Une interdiction trop rapide pénalisera les ménages modestes et ceux qui vivent loin des villes. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "La transition écologique ne doit pas se faire au détriment des plus modestes.",
      "Un calendrier progressif semble plus réaliste."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-07-enseignement-distance",
    "task": 3,
    "level": "C2",
    "theme": "études",
    "title": "Cours en ligne contre cours en présentiel",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « L'enseignement à distance peut-il remplacer l'enseignement en présentiel ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Une étudiante salariée",
        "text": "« Les cours en ligne me permettent de concilier travail et études, et d'accéder à des formations qui n'existent pas près de chez moi. »"
      },
      {
        "author": "Un enseignant",
        "text": "« Sans présence, on perd l'échange, la discipline et l'esprit de groupe. Beaucoup d'étudiants décrochent, surtout les plus fragiles. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "L'enseignement hybride combine souplesse et contact humain.",
      "Le risque de décrochage touche surtout les publics fragiles."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-08-traduction-automatique",
    "task": 3,
    "level": "C2",
    "theme": "langue",
    "title": "Apprendre une langue à l'ère de la traduction automatique",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « À l'heure de la traduction automatique, est-il encore utile d'apprendre une langue étrangère ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Julien, développeur",
        "text": "« Avec la traduction instantanée, apprendre une langue étrangère devient presque inutile. Le temps gagné peut servir à d'autres compétences. »"
      },
      {
        "author": "Mme Rossi, interprète",
        "text": "« La traduction automatique ne rend ni les nuances ni la culture. Apprendre une langue, c'est comprendre l'autre, pas seulement le traduire. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "Une langue véhicule une manière de penser et une culture.",
      "Les outils numériques sont un appui, non un substitut."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-09-grands-evenements-sportifs",
    "task": 3,
    "level": "C2",
    "theme": "sport",
    "title": "Accueillir un grand événement sportif",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « Un pays a-t-il intérêt à accueillir de grands événements sportifs internationaux ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Un responsable sportif",
        "text": "« Accueillir les Jeux ou une Coupe du monde améliore les infrastructures, attire les touristes et fait rayonner un pays. »"
      },
      {
        "author": "Une journaliste",
        "text": "« Ces événements coûtent des milliards, laissent des stades vides et des dettes, alors que des écoles et des hôpitaux manquent de moyens. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "Le bilan économique de ces événements est très contrasté.",
      "Il faut s'interroger sur les priorités budgétaires d'un pays."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  },
  {
    "slug": "t3-c2-10-consommation-responsable",
    "task": 3,
    "level": "C2",
    "theme": "consommation",
    "title": "Consommation responsable : qui doit agir ?",
    "instructions": "À partir des deux documents ci-dessous, rédigez un texte argumenté sur la question : « La responsabilité de la consommation durable repose-t-elle sur les individus ou sur les entreprises et les États ? » Présentez les deux points de vue en les reformulant, puis exprimez et justifiez votre opinion personnelle avec des arguments et des exemples.",
    "documents": [
      {
        "author": "Lina, 28 ans",
        "text": "« Chacun doit agir : acheter d'occasion, réparer, consommer moins. Ce sont les petits gestes qui changent les habitudes. »"
      },
      {
        "author": "Un chercheur",
        "text": "« Faire peser la responsabilité sur les individus est trompeur. Ce sont les entreprises et les États qui doivent imposer des produits durables et réparables. »"
      }
    ],
    "min_words": 120,
    "max_words": 180,
    "duration_min": 30,
    "plan": [
      "Introduction : poser le sujet et la question en une ou deux phrases",
      "Reformuler le point de vue du document 1, puis celui du document 2",
      "Donner votre opinion avec deux arguments appuyés par un exemple",
      "Conclusion : nuancer et ouvrir sur une perspective"
    ],
    "useful_phrases": [
      "Les deux documents s'opposent : l'un met en avant..., l'autre souligne...",
      "Force est de constater que...",
      "S'il est vrai que..., il n'en demeure pas moins que...",
      "Au-delà de cette opposition, il convient de...",
      "Les gestes individuels ne suffisent pas sans cadre collectif.",
      "Le consommateur dispose pourtant d'un vrai pouvoir par ses choix."
    ],
    "common_mistakes": [
      "Recopier les documents au lieu de les reformuler avec ses propres mots",
      "Oublier de donner une opinion personnelle claire et justifiée"
    ]
  }
]
```
