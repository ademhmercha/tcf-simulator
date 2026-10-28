import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 16.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_16 = defineFullTest({
  number: 16,
  description:
    "Seizième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, je m'appelle Julien et j'habite à Nantes. Je travaille dans une banque. Le soir, je fais du sport avec mes amis.",
      prompt: "Où travaille Julien ?",
      options: ["Dans une banque", "Dans un hôpital", "Dans une école", "Dans un magasin"],
      correct: "A",
      explanation: "Julien dit qu'il travaille dans une banque ; il fait du sport le soir.",
    },
    {
      level: "A1",
      category: "transports",
      transcription:
        "Excusez-moi, où est la gare, s'il vous plaît ? Allez tout droit, puis tournez à gauche après la pharmacie. C'est à cinq minutes à pied.",
      prompt: "Où faut-il tourner pour aller à la gare ?",
      options: ["À gauche après la pharmacie", "À droite après la poste", "Avant la pharmacie", "Devant l'école"],
      correct: "A",
      explanation: "Il faut aller tout droit puis tourner à gauche après la pharmacie.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Je voudrais un café et deux croissants, s'il vous plaît. Combien je vous dois ? Cela fait quatre euros cinquante.",
      prompt: "Combien la cliente doit-elle payer ?",
      options: ["Quatre euros cinquante", "Quarante-cinq euros", "Deux euros", "Quatorze euros"],
      correct: "A",
      explanation: "Le serveur annonce un total de quatre euros cinquante pour le café et les croissants.",
    },
    {
      level: "A2",
      category: "voyages",
      transcription:
        "Votre train pour Strasbourg partira à dix-sept heures vingt, voie douze. Attention, le wagon numéro huit sera en tête de train, côté escalier.",
      prompt: "Quel wagon sera en tête de train ?",
      options: ["Le numéro huit", "Le numéro douze", "Le numéro dix-sept", "Le numéro vingt"],
      correct: "A",
      explanation: "L'annonce précise que le wagon numéro huit se trouvera en tête, côté escalier.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Bonjour, ici le cabinet du docteur Petit. Il est absent jusqu'à lundi. En cas d'urgence, appelez le quinze ou rendez-vous aux urgences de l'hôpital.",
      prompt: "Que faire en cas d'urgence pendant l'absence du docteur ?",
      options: ["Appeler le quinze ou aller aux urgences", "Rappeler lundi", "Écrire un courriel", "Attendre le retour du docteur"],
      correct: "A",
      explanation: "Le message conseille d'appeler le quinze ou d'aller aux urgences de l'hôpital.",
    },
    {
      level: "A2",
      category: "travail",
      transcription:
        "La cantine de l'entreprise sera fermée demain pour rénovation. Un repas froid sera distribué à chaque salarié à l'accueil, entre midi et treize heures.",
      prompt: "Que recevront les salariés demain ?",
      options: ["Un repas froid", "Un bon de réduction", "Un repas chaud", "Une prime"],
      correct: "A",
      explanation: "Un repas froid sera remis à chacun à l'accueil, la cantine étant fermée.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Le club de photographie se réunit chaque jeudi à dix-huit heures. Ce mois-ci, le thème est la nature en ville. Chacun peut apporter jusqu'à trois images.",
      prompt: "Quel est le thème ce mois-ci ?",
      options: ["La nature en ville", "Les portraits", "Les voyages", "L'architecture"],
      correct: "A",
      explanation: "Le thème du mois est « la nature en ville ».",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "La copropriété vous informe que le nettoyage des vitres de l'escalier aura lieu jeudi. Les portes d'entrée resteront ouvertes de huit heures à midi. Merci de ne rien laisser sur les paliers.",
      prompt: "Que doivent faire les habitants jeudi ?",
      options: ["Ne rien laisser sur les paliers", "Fermer leurs fenêtres", "Rester chez eux", "Nettoyer leurs vitres"],
      correct: "A",
      explanation: "Pour faciliter le nettoyage, il est demandé de ne rien laisser sur les paliers.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "La rentrée des classes aura lieu lundi à huit heures trente. Les parents des nouveaux élèves sont invités à accompagner leur enfant jusqu'à la salle de classe, où l'enseignant les accueillera.",
      prompt: "Qui est invité à accompagner les nouveaux élèves ?",
      options: ["Les parents", "Les grands-parents", "Les enseignants", "Les anciens élèves"],
      correct: "A",
      explanation: "Les parents des nouveaux élèves peuvent accompagner leur enfant jusqu'à la classe.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Je voulais te remercier pour ton aide pendant mon déménagement. Sans toi, je n'y serais pas arrivé. Si tu es libre dimanche, je t'invite à déjeuner pour te remercier correctement.",
      prompt: "Pourquoi la personne invite-t-elle son ami à déjeuner ?",
      options: ["Pour le remercier de son aide", "Pour fêter son anniversaire", "Pour lui présenter sa famille", "Pour lui annoncer une nouvelle"],
      correct: "A",
      explanation: "L'invitation est un remerciement pour l'aide reçue pendant le déménagement.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La commune a installé des bacs à compost collectifs à l'entrée du jardin public. Les habitants peuvent y déposer leurs épluchures, mais pas de viande, de poisson ni d'huile.",
      prompt: "Qu'est-ce qui est interdit dans les bacs à compost ?",
      options: ["La viande, le poisson et l'huile", "Les épluchures de légumes", "Les feuilles mortes", "Le marc de café"],
      correct: "A",
      explanation: "Les bacs acceptent les épluchures, mais pas la viande, le poisson ni l'huile.",
    },
    {
      level: "B1",
      category: "achats",
      transcription:
        "Vous avez commandé un téléviseur sur notre site. La livraison est prévue entre neuf et douze heures. Une personne majeure devra être présente pour signer le bon de réception.",
      prompt: "Que faut-il pour recevoir la livraison ?",
      options: ["La présence d'une personne majeure", "Un paiement en espèces", "Un justificatif d'identité", "Un déplacement au dépôt"],
      correct: "A",
      explanation: "Une personne majeure doit être présente pour signer le bon de réception.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Le pouvoir d'achat des ménages demeure la préoccupation principale des Français. Une enquête montre que beaucoup réduisent leurs dépenses de loisirs plutôt que d'alimentation, mais que les plus modestes sont déjà contraints de renoncer à certains soins ou à des repas complets.",
      prompt: "Quel constat l'enquête fait-elle sur les ménages les plus modestes ?",
      options: ["Ils renoncent déjà à des soins ou à des repas", "Ils épargnent davantage", "Ils dépensent plus en loisirs", "Ils n'ont pas de difficultés"],
      correct: "A",
      explanation: "Les plus modestes doivent parfois renoncer à des soins ou à des repas complets.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Certaines universités expérimentent l'enseignement hybride, alliant cours en présentiel et ressources en ligne. Les étudiants apprécient la flexibilité, mais ceux qui manquent de rigueur personnelle décrochent plus facilement, d'où la nécessité d'un suivi individualisé.",
      prompt: "Pourquoi un suivi individualisé est-il nécessaire ?",
      options: ["Certains étudiants décrochent plus facilement", "Les cours sont trop courts", "Les professeurs manquent de temps", "Les étudiants refusent le numérique"],
      correct: "A",
      explanation: "L'autonomie demandée fait décrocher les étudiants peu rigoureux, d'où le besoin d'accompagnement.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "La rénovation de l'opéra a duré quatre ans et coûté plus de cinquante millions d'euros. Si le résultat est salué par la critique pour son acoustique, certains élus contestent la dépense, jugeant que cet argent aurait pu être consacré à des équipements de proximité.",
      prompt: "Que reprochent certains élus au projet ?",
      options: ["Son coût élevé par rapport à d'autres besoins", "Une mauvaise acoustique", "Sa durée trop courte", "Le choix des architectes"],
      correct: "A",
      explanation: "Ils estiment que la somme dépensée aurait été mieux utilisée pour des équipements de proximité.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "La vaccination contre la grippe est recommandée aux personnes fragiles. Les pharmaciens, désormais autorisés à vacciner, espèrent ainsi augmenter la couverture vaccinale, encore insuffisante dans certaines régions rurales où l'accès aux médecins est limité.",
      prompt: "Pourquoi autoriser les pharmaciens à vacciner ?",
      options: ["Pour augmenter la couverture vaccinale", "Pour réduire le prix du vaccin", "Pour remplacer les médecins", "Pour supprimer la grippe"],
      correct: "A",
      explanation: "L'objectif est d'élargir l'accès au vaccin, notamment là où les médecins sont peu nombreux.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les paiements sans contact représentent désormais la majorité des transactions en magasin. Pratiques et rapides, ils comportent toutefois le risque de dépenser sans s'en rendre compte, comme l'ont relevé des associations de consommateurs.",
      prompt: "Quel risque les associations de consommateurs signalent-elles ?",
      options: ["Dépenser sans s'en apercevoir", "Perdre sa carte plus souvent", "Payer des frais cachés", "Ne plus pouvoir payer en espèces"],
      correct: "A",
      explanation: "La rapidité du paiement sans contact peut conduire à dépenser sans en avoir conscience.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "Face au vieillissement, de nombreuses communes encouragent l'habitat intergénérationnel : un étudiant occupe une chambre chez une personne âgée contre un loyer modeste et quelques services. Cette formule limite l'isolement des uns tout en soulageant le budget des autres.",
      prompt: "Quel est l'avantage de l'habitat intergénérationnel ?",
      options: ["Il réduit l'isolement et allège le budget des étudiants", "Il augmente les loyers", "Il remplace les maisons de retraite", "Il supprime les services à domicile"],
      correct: "A",
      explanation: "Les aînés rompent leur solitude et les étudiants paient moins cher leur logement.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "Le référendum d'initiative citoyenne est souvent présenté comme un remède à la crise de représentation. Ses détracteurs objectent qu'il simplifie à l'excès des questions complexes en les réduisant à un choix binaire, et qu'il peut être instrumentalisé par ceux qui maîtrisent le mieux la communication.",
      prompt: "Quelle objection est formulée contre le référendum d'initiative citoyenne ?",
      options: ["Il réduit des questions complexes à un choix binaire", "Il coûte trop cher", "Il est trop rarement organisé", "Il exclut les jeunes"],
      correct: "A",
      explanation: "Les détracteurs lui reprochent de simplifier excessivement et d'être manipulable.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "Si l'on s'accorde sur la nécessité de réduire les émissions, les moyens d'y parvenir divisent : certains misent sur l'innovation technologique, d'autres sur la sobriété. La première option ménage les habitudes mais retarde les efforts ; la seconde est exigeante mais agit plus rapidement sur la consommation.",
      prompt: "Quel avantage est attribué à la sobriété ?",
      options: ["Elle agit plus rapidement sur la consommation", "Elle ménage les habitudes", "Elle dépend de l'innovation", "Elle est peu exigeante"],
      correct: "A",
      explanation: "La sobriété est plus contraignante, mais son effet sur la consommation est plus rapide.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "L'interdisciplinarité est unanimement louée, mais peu pratiquée. Les chercheurs expliquent que leurs carrières sont évaluées au sein de disciplines cloisonnées, ce qui décourage les collaborations risquées, pourtant indispensables pour aborder des questions comme le climat ou la santé publique.",
      prompt: "Pourquoi l'interdisciplinarité est-elle peu pratiquée ?",
      options: ["Les carrières sont évaluées au sein de disciplines cloisonnées", "Les chercheurs ne la jugent pas utile", "Les financements sont trop élevés", "Les laboratoires sont trop petits"],
      correct: "A",
      explanation: "Le système d'évaluation, organisé par discipline, décourage les collaborations jugées risquées.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "La notion de mérite, que l'on croit neutre, repose sur l'idée que chacun partirait avec des chances égales. Or les trajectoires dépendent aussi du milieu, du réseau, des circonstances. Célébrer le mérite sans interroger ces conditions revient à légitimer des écarts que l'on attribue à tort aux seuls efforts individuels.",
      prompt: "Que reproche l'orateur à la notion de mérite ?",
      options: ["Elle ignore les conditions initiales inégales", "Elle récompense trop l'effort", "Elle est trop ancienne", "Elle supprime la compétition"],
      correct: "A",
      explanation: "Le mérite n'est équitable que si les chances de départ le sont, ce que la réalité dément.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "La promesse engage celui qui la fait au-delà de ce qu'il peut prévoir : en disant « je viendrai », je me lie à un futur que je ne maîtrise pas. C'est précisément ce pari sur la continuité qui rend possible la confiance, et donc la vie commune, laquelle suppose que les paroles données ne soient pas révisables à chaque instant.",
      prompt: "Qu'est-ce que la promesse rend possible selon l'orateur ?",
      options: ["La confiance et la vie commune", "La maîtrise du futur", "L'abandon des engagements", "La révision permanente des choix"],
      correct: "A",
      explanation: "En liant celui qui promet à un futur incertain, la promesse fonde la confiance et la vie commune.",
    },
    {
      level: "C2",
      category: "économie",
      transcription:
        "On évoque volontiers la valeur d'un bien comme si elle lui était inhérente, alors qu'elle résulte d'un jeu d'attentes, de rareté et de conventions. L'économie n'est pas seulement l'étude de choix rationnels : c'est aussi l'analyse de croyances partagées, dont la solidité n'est jamais plus évidente qu'au moment où elles s'effondrent.",
      prompt: "Que révèle l'effondrement des croyances partagées ?",
      options: ["Leur solidité n'apparaît qu'au moment où elles cèdent", "L'inutilité de l'économie", "La valeur réelle des biens", "L'absence de rareté"],
      correct: "A",
      explanation: "L'orateur souligne que l'on mesure la force de ces croyances au moment où elles disparaissent.",
    },
    {
      level: "C2",
      category: "art",
      transcription:
        "Face à l'œuvre abstraite, le spectateur se sent parfois démuni, comme s'il lui manquait une clé. Mais l'abstraction ne prive pas de sens : elle le déplace, du contenu représenté vers l'expérience de la forme elle-même, qui sollicite l'attention autrement. Il ne s'agit pas de comprendre, mais d'éprouver avant de comprendre.",
      prompt: "Que propose l'orateur face à l'œuvre abstraite ?",
      options: ["Éprouver avant de chercher à comprendre", "Chercher une clé unique", "Éviter de regarder la forme", "Se contenter d'une explication écrite"],
      correct: "A",
      explanation: "L'abstraction déplace le sens vers l'expérience de la forme : il faut d'abord ressentir.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "adjectifs démonstratifs",
      prompt: "___ gâteau est délicieux ; qui l'a préparé ?",
      options: ["Ce", "Cet", "Cette", "Ces"],
      correct: "A",
      explanation: "« Gâteau » est masculin singulier commençant par une consonne : « ce gâteau ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Pour le moment, je ___ un livre passionnant.",
      options: ["lis", "lit", "lisons", "lisent"],
      correct: "A",
      explanation: "Le sujet « je » demande la première personne du singulier : « lis ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Mes parents habitent loin ; je ___ rends visite chaque mois.",
      options: ["leur", "les", "y", "en"],
      correct: "A",
      explanation: "« Rendre visite à quelqu'un » : le complément indirect pluriel se remplace par « leur ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "C'est la collègue ___ m'a aidé à finir le rapport.",
      options: ["qui", "que", "dont", "où"],
      correct: "A",
      explanation: "« Qui » est le sujet de « a aidé » et reprend « la collègue ».",
    },
    {
      level: "B1",
      category: "expression du temps",
      prompt: "Il a travaillé dans cette entreprise ___ dix ans, puis il a démissionné.",
      options: ["pendant", "depuis", "il y a", "dans"],
      correct: "A",
      explanation: "« Pendant » exprime une durée achevée, ici les dix années passées dans l'entreprise.",
    },
    {
      level: "B1",
      category: "conditionnel",
      prompt: "À ta place, je ___ un avocat avant de signer.",
      options: ["consulterais", "consulterai", "consultais", "consulte"],
      correct: "A",
      explanation: "Le conseil se formule au conditionnel présent : « je consulterais ».",
    },
    {
      level: "B1",
      category: "quantité",
      prompt: "Il reste ___ de gâteau ; voulez-vous le finir ?",
      options: ["un peu", "peu des", "quelques", "beaucoup des"],
      correct: "A",
      explanation: "Devant un nom non comptable précédé de « de », on utilise « un peu de gâteau ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Je suis content que tu ___ pu venir à la réunion hier soir.",
      options: ["aies", "as", "auras", "avais"],
      correct: "A",
      explanation: "L'expression de sentiment « content que » est suivie du subjonctif passé : « que tu aies pu ».",
    },
    {
      level: "B2",
      category: "opposition",
      prompt: "Il fait très froid ; ___, nous irons nous promener.",
      options: ["pourtant", "car", "donc", "puisque"],
      correct: "A",
      explanation: "« Pourtant » exprime une opposition inattendue entre le froid et la promenade.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "La décision ___ à l'unanimité par le conseil municipal.",
      options: ["a été votée", "a voté", "votait", "est votant"],
      correct: "A",
      explanation: "Le sujet « décision » subit l'action : passif au passé composé, « a été votée ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Après que nous ___ le dossier, nous irons déjeuner.",
      options: ["aurons terminé", "terminerons", "terminons", "terminions"],
      correct: "A",
      explanation: "L'action antérieure à une action future se met au futur antérieur : « aurons terminé ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "Il s'est fait mal ___ du vélo.",
      options: ["en tombant", "tombant", "à tomber", "tombé"],
      correct: "A",
      explanation: "Le gérondif « en tombant » exprime la simultanéité de la chute et de la blessure.",
    },
    {
      level: "B2",
      category: "pronoms démonstratifs",
      prompt: "De tous ces livres, ___ que je préfère est celui-ci.",
      options: ["celui", "ceux", "celle", "ce"],
      correct: "A",
      explanation: "Le pronom masculin singulier « celui » reprend « livre » dans la construction « celui que ».",
    },
    {
      level: "B2",
      category: "cause",
      prompt: "___ il a trop mangé, il n'a pas pu finir son dessert.",
      options: ["Comme", "Alors que", "Pour que", "Afin que"],
      correct: "A",
      explanation: "« Comme » en tête de phrase exprime la cause : il n'a pas pu finir parce qu'il avait trop mangé.",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "À moins que vous ne ___ d'avis, nous maintiendrons la date prévue.",
      options: ["changiez", "changez", "changerez", "changeriez"],
      correct: "A",
      explanation: "« À moins que » est suivi du subjonctif présent : « que vous changiez ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Voici l'architecte ___ le projet a été confié.",
      options: ["à qui", "dont", "que", "où"],
      correct: "A",
      explanation: "« Confier à quelqu'un » : avec un antécédent personne, on emploie « à qui ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ je regrette, c'est de ne pas t'avoir écouté.",
      options: ["Ce que", "Ce qui", "Ce dont", "Celui que"],
      correct: "A",
      explanation: "« Ce que » est complément d'objet direct de « regrette » dans la structure « ce que… c'est… ».",
    },
    {
      level: "C1",
      category: "conditionnel passé",
      prompt: "Il ___ réussi, s'il avait été plus patient.",
      options: ["aurait", "avait", "eut", "aura"],
      correct: "A",
      explanation: "L'hypothèse irréelle du passé (« s'il avait été ») entraîne le conditionnel passé : « aurait réussi ».",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Encore que cette thèse ___ défendable, elle comporte des faiblesses.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation: "« Encore que » exprime la concession et gouverne le subjonctif : « soit ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Il n'est rien qu'il ne ___ pour obtenir cette promotion.",
      options: ["fasse", "fait", "ferait", "fera"],
      correct: "A",
      explanation: "La tournure « il n'est rien que… ne » appelle le subjonctif : « il n'est rien qu'il ne fasse ».",
    },
  ],
  reading: [
    {
      title: "Changement de salle de réunion",
      text: p(
        "Chers collègues, la réunion de jeudi aura lieu en salle 204 et non en salle 105, qui est en cours de rénovation.",
        "Merci d'apporter votre ordinateur. Le début est maintenu à 14 h, comme prévu initialement.",
      ),
      question: {
        level: "B1",
        prompt: "Quelle est la raison du changement de salle pour la réunion de jeudi ?",
        options: ["La salle 105 est en rénovation", "La salle 204 est plus grande", "Il y a trop de participants", "Le début est avancé"],
        correct: "A",
        explanation: "La salle habituelle, la 105, est en travaux : la réunion se tient donc en salle 204.",
      },
    },
    {
      title: "Annonce de colocation",
      text: p(
        "Cherche colocataire pour grand appartement près de l'université. Chambre meublée de 14 m², loyer 380 euros charges comprises.",
        "Cuisine et salon partagés, connexion internet incluse. Disponible dès septembre. Contactez-moi par courriel.",
      ),
      question: {
        level: "B1",
        prompt: "Que comprend le loyer de 380 euros ?",
        options: ["Les charges", "Les repas", "Le linge", "Un parking"],
        correct: "A",
        explanation: "L'annonce précise que le loyer est de 380 euros, charges comprises.",
      },
    },
    {
      title: "Rappel de rendez-vous",
      text: p(
        "Madame, nous vous rappelons votre rendez-vous de contrôle dentaire le mardi 12, à 16 h 45, au cabinet du docteur Faure.",
        "En cas d'empêchement, merci de nous prévenir au moins 24 heures à l'avance afin de libérer le créneau.",
      ),
      question: {
        level: "B1",
        prompt: "Que doit faire la patiente en cas d'empêchement ?",
        options: ["Prévenir 24 heures à l'avance", "Se présenter quand même", "Payer le rendez-vous", "Changer de dentiste"],
        correct: "A",
        explanation: "Il est demandé de prévenir au moins 24 heures avant pour libérer le créneau.",
      },
    },
    {
      title: "Vente de gâteaux",
      text: p(
        "Samedi, les élèves de l'école organisent une vente de gâteaux devant la mairie, de 9 h à midi. Tout est fait maison par les parents.",
        "L'argent récolté servira à acheter des livres pour la bibliothèque de l'école.",
      ),
      question: {
        level: "B1",
        prompt: "Que financera la vente de gâteaux ?",
        options: ["L'achat de livres pour l'école", "À organiser un voyage", "À rénover la mairie", "À payer des professeurs"],
        correct: "A",
        explanation: "L'argent sera utilisé pour acheter des livres destinés à la bibliothèque de l'école.",
      },
    },
    {
      title: "Alerte météo",
      text: p(
        "Des orages violents sont attendus ce soir sur la moitié nord du département. Il est conseillé de rentrer les objets de jardin et d'éviter les déplacements inutiles.",
        "Les services de secours restent mobilisés. En cas d'urgence, composez le 112.",
      ),
      question: {
        level: "B1",
        prompt: "Que conseille-t-on aux habitants ?",
        options: ["Éviter les déplacements inutiles", "Quitter le département", "Fermer les écoles", "Allumer des bougies"],
        correct: "A",
        explanation: "L'alerte recommande de rentrer les objets de jardin et de limiter les déplacements.",
      },
    },
    {
      title: "Des cours de soutien gratuits",
      text: p(
        "Dans ce quartier, des étudiants proposent gratuitement des cours de soutien aux collégiens, deux soirs par semaine. Ils interviennent en mathématiques, en français et en anglais, dans les locaux de l'association.",
        "Les parents apprécient cette aide, mais regrettent que le nombre de places soit limité, ce qui oblige à constituer une liste d'attente.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrettent les parents ?",
        options: ["Le nombre limité de places", "Le prix des cours", "Le manque de matières", "L'éloignement du local"],
        correct: "A",
        explanation: "Les places étant limitées, une liste d'attente est nécessaire.",
      },
    },
    {
      title: "Un boulanger à l'école",
      text: p(
        "Chaque année, un boulanger du village anime un atelier de fabrication du pain dans les classes de primaire. Les enfants pétrissent la pâte, observent la cuisson et repartent avec leur petit pain.",
        "Les enseignants y voient une manière concrète d'aborder les sciences et l'alimentation, tout en valorisant un métier de proximité.",
      ),
      question: {
        level: "B2",
        prompt: "Quel intérêt les enseignants trouvent-ils à l'atelier ?",
        options: ["Aborder les sciences et valoriser un métier de proximité", "Réduire le coût de la cantine", "Remplacer les cours de français", "Recruter un boulanger"],
        correct: "A",
        explanation: "L'atelier permet de découvrir les sciences et l'alimentation tout en faisant connaître un métier local.",
      },
    },
    {
      title: "Des trottoirs plus larges",
      text: p(
        "La mairie a élargi les trottoirs de plusieurs rues commerçantes, au détriment de places de stationnement. Les piétons, notamment les personnes avec poussette ou en fauteuil roulant, se déplacent plus facilement.",
        "Certains commerçants s'inquiètent de perdre des clients venus en voiture, mais les premiers relevés indiquent une fréquentation stable.",
      ),
      question: {
        level: "B2",
        prompt: "Que montrent les premiers relevés ?",
        options: ["Une fréquentation stable", "Une forte baisse des clients", "Une hausse du stationnement", "Un départ des commerçants"],
        correct: "A",
        explanation: "Malgré les craintes, la fréquentation des commerces ne baisse pas.",
      },
    },
    {
      title: "La difficulté de recruter des saisonniers",
      text: p(
        "Chaque été, les restaurants du littoral peinent à recruter des serveurs et des cuisiniers. Les horaires coupés, le coût du logement dans les stations balnéaires et la saisonnalité des contrats découragent de nombreux candidats.",
        "Des employeurs proposent désormais des logements de fonction et des contrats plus longs pour fidéliser leurs équipes.",
      ),
      question: {
        level: "B2",
        prompt: "Que font certains employeurs pour fidéliser leurs équipes ?",
        options: ["Proposer des logements et des contrats plus longs", "Réduire les salaires", "Fermer l'été", "Supprimer les horaires coupés uniquement"],
        correct: "A",
        explanation: "Ils offrent des logements de fonction et allongent la durée des contrats.",
      },
    },
    {
      title: "Les fêtes de quartier",
      text: p(
        "Les fêtes de quartier connaissent un regain de popularité : repas, jeux pour enfants et concerts rassemblent les habitants dans la rue, parfois pour la première fois. Elles reposent souvent sur l'énergie d'associations bénévoles.",
        "Les organisateurs reconnaissent toutefois que les démarches administratives, notamment pour obtenir les autorisations, constituent un frein pour les plus petits comités.",
      ),
      question: {
        level: "B2",
        prompt: "Quel frein les organisateurs évoquent-ils ?",
        options: ["Les démarches administratives", "Le manque de voisins", "Le coût de la musique", "L'absence de bénévoles"],
        correct: "A",
        explanation: "Obtenir les autorisations est compliqué, surtout pour les plus petits comités.",
      },
    },
    {
      title: "Le métier de plombier",
      text: p(
        "Les plombiers sont très demandés, mais la profession peine à attirer des jeunes. Beaucoup ignorent que le métier offre de bons salaires, des perspectives de création d'entreprise et une grande diversité de chantiers.",
        "Les fédérations professionnelles organisent des forums dans les lycées pour démentir les idées reçues sur la pénibilité du travail.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les fédérations organisent-elles des forums dans les lycées ?",
        options: ["Pour démentir des idées reçues sur le métier", "Pour vendre des outils", "Pour fermer des écoles", "Pour réduire les salaires"],
        correct: "A",
        explanation: "Les forums visent à corriger l'image du métier, jugée pénible à tort.",
      },
    },
    {
      title: "Les cours du soir pour adultes",
      text: p(
        "De plus en plus d'adultes reprennent des études en cours du soir pour obtenir un diplôme ou changer de métier. Ils jonglent entre travail, famille et révisions, et citent la fatigue comme principale difficulté.",
        "Les établissements adaptent leurs horaires et proposent des cours enregistrés pour leur permettre de rattraper les séances manquées.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les établissements aident-ils les adultes ?",
        options: ["Avec des cours enregistrés et des horaires adaptés", "En supprimant les examens", "En réduisant les diplômes", "En imposant des stages"],
        correct: "A",
        explanation: "Ils ajustent les horaires et fournissent des enregistrements pour rattraper les séances manquées.",
      },
    },
    {
      title: "Les maisons de quartier",
      text: p(
        "Les maisons de quartier accueillent des activités très variées : cours de langue, ateliers de couture, aide aux devoirs, permanences juridiques. Elles servent de point de rencontre pour des habitants de tous âges et de toutes origines.",
        "Leurs responsables regrettent que leurs subventions, qui diminuent depuis plusieurs années, les contraignent à réduire certaines activités gratuites.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi certaines activités gratuites sont-elles réduites ?",
        options: ["Les subventions diminuent", "Les habitants s'en désintéressent", "Les locaux sont fermés", "Les bénévoles sont partis"],
        correct: "A",
        explanation: "La baisse des subventions oblige les maisons de quartier à limiter certaines activités gratuites.",
      },
    },
    {
      title: "Une ferme pédagogique en ville",
      text: p(
        "Au cœur d'un quartier dense, une ferme pédagogique accueille chaque semaine des classes et des familles. Les enfants y découvrent des poules, des chèvres et un potager, et participent aux soins quotidiens des animaux.",
        "Les riverains apprécient cette présence de la nature, même si quelques-uns se plaignent d'odeurs lors des fortes chaleurs, ce qui oblige l'équipe à nettoyer plus souvent.",
      ),
      question: {
        level: "B2",
        prompt: "Que fait l'équipe pour répondre aux plaintes des riverains ?",
        options: ["Elle nettoie plus souvent", "Elle ferme la ferme", "Elle supprime les animaux", "Elle demande un déménagement"],
        correct: "A",
        explanation: "Face aux odeurs en cas de chaleur, l'équipe intensifie le nettoyage.",
      },
    },
    {
      title: "Des bornes de recharge dans les villages",
      text: p(
        "Les communes rurales installent peu à peu des bornes de recharge pour véhicules électriques sur leurs places centrales. Ces équipements, financés en partie par la région, visent à ne pas laisser les campagnes à l'écart de la transition.",
        "Les élus constatent toutefois que ces bornes sont peu utilisées, car peu d'habitants possèdent déjà une voiture électrique, et leur rentabilité reste à démontrer.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi ces bornes sont-elles peu utilisées ?",
        options: ["Peu d'habitants ont une voiture électrique", "Elles sont en panne", "Elles sont trop chères", "Elles sont interdites"],
        correct: "A",
        explanation: "Le faible nombre de véhicules électriques parmi les habitants limite l'usage des bornes.",
      },
    },
    {
      title: "L'économie du partage à l'épreuve",
      text: p(
        "L'économie du partage promettait de mettre en commun voitures, logements et outils pour réduire le gaspillage. Elle a effectivement facilité l'accès à certains biens et permis à des particuliers de compléter leurs revenus. Mais ses promesses initiales se sont brouillées.",
        "Les grandes plateformes qui organisent ces échanges ont rapidement acquis un pouvoir considérable, prélevant des commissions et imposant leurs règles. Certains prestataires se retrouvent dans une situation de dépendance, sans la protection associée à un emploi salarié. L'idéal d'entraide s'est ainsi transformé, dans bien des cas, en un modèle commercial comme les autres, où le partage n'est plus qu'un argument de vente.",
      ),
      question: {
        level: "C1",
        prompt: "Que dénonce le texte à propos des plateformes de partage ?",
        options: ["Le partage est devenu un argument commercial", "Elles disparaissent progressivement", "Elles protègent les prestataires", "Elles baissent leurs commissions"],
        correct: "A",
        explanation: "Selon le texte, l'idéal d'entraide s'est transformé en modèle commercial où le partage sert d'argument de vente.",
      },
    },
    {
      title: "Le logement des travailleurs saisonniers",
      text: p(
        "Dans les stations touristiques, le logement des travailleurs saisonniers est devenu une question cruciale. Les loyers y sont élevés, les locations de courte durée aux visiteurs rapportent davantage que les baux classiques, et les propriétaires sont peu enclins à louer à l'année.",
        "Certaines communes expérimentent des solutions : construction de logements réservés, obligation pour les employeurs de contribuer à l'hébergement, limitation des locations touristiques. Ces dispositifs se heurtent toutefois à la rareté du foncier et à la résistance de propriétaires attachés à leur liberté. L'enjeu est de taille : sans résidents permanents ni travailleurs logés sur place, une station perd peu à peu les services qui la font vivre toute l'année.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque court une station sans travailleurs logés sur place ?",
        options: ["Perdre les services qui la font vivre toute l'année", "Gagner plus de touristes", "Voir baisser les loyers", "Fermer ses commerces l'hiver uniquement"],
        correct: "A",
        explanation: "Faute de résidents et de personnel logé, la station voit s'éroder les services qui permettent de fonctionner toute l'année.",
      },
    },
    {
      title: "La désindustrialisation et ses territoires",
      text: p(
        "La fermeture d'une usine ne se mesure pas seulement en emplois perdus : elle fragilise l'ensemble d'un bassin de vie. Commerces, services, associations dépendaient de la présence de salariés dont les revenus faisaient vivre le tissu local. La perte se diffuse ainsi bien au-delà des murs de l'entreprise.",
        "Les politiques de reconversion peinent à compenser ce choc. Les emplois créés ne correspondent pas toujours aux compétences des anciens ouvriers, et les jeunes diplômés quittent la région. Pour que la reconversion réussisse, il faut conjuguer formation, investissement local et accompagnement social, trois leviers rarement coordonnés avec la rapidité qu'exige la situation.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi les politiques de reconversion peinent-elles à réussir ?",
        options: ["Les nouveaux emplois ne correspondent pas aux compétences et les jeunes partent", "Les usines rouvrent trop vite", "Les salaires sont trop élevés", "Les commerces n'ont pas besoin d'aide"],
        correct: "A",
        explanation: "Les emplois proposés ne correspondent pas aux profils locaux, tandis que les jeunes diplômés quittent le territoire.",
      },
    },
    {
      title: "Les musées et le numérique",
      text: p(
        "La numérisation des collections permet à des millions de personnes d'accéder à des œuvres qu'elles n'auraient jamais vues en personne. Les musées multiplient les visites virtuelles, les bases de données en ligne et les applications de médiation. Cette ouverture élargit considérablement leur public potentiel.",
        "Cette évolution suscite pourtant des interrogations. Certains conservateurs craignent que l'image reproduite ne se substitue à l'expérience de l'œuvre, dont la matérialité, l'échelle et la présence ne se laissent pas réduire à un écran. D'autres soulignent que le numérique, bien conçu, peut au contraire éveiller le désir de visite. Entre complément et concurrence, les institutions cherchent le juste équilibre, sans disposer à ce jour de données suffisantes pour trancher.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle crainte certains conservateurs expriment-ils ?",
        options: ["Que l'image remplace l'expérience de l'œuvre", "Que les musées ferment", "Que le public rajeunisse", "Que les collections soient vendues"],
        correct: "A",
        explanation: "Ils redoutent que la reproduction numérique se substitue à la rencontre physique avec l'œuvre.",
      },
    },
    {
      title: "Les réseaux de solidarité de voisinage",
      text: p(
        "Pendant les périodes de crise, on a vu fleurir des réseaux d'entraide entre voisins : courses pour les personnes fragiles, garde d'enfants, prêt de matériel. Ces initiatives spontanées ont montré la capacité des habitants à s'organiser, souvent plus vite que les institutions.",
        "Leur pérennité interroge toutefois. Sans financement ni cadre, l'élan s'essouffle lorsque l'urgence passe, et ceux qui en avaient le plus besoin retombent dans l'isolement. Les travailleurs sociaux plaident donc pour une articulation entre solidarité informelle et action publique : la première apporte la proximité et la réactivité, la seconde la continuité et l'équité, indispensables pour ne laisser personne de côté.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle articulation les travailleurs sociaux recommandent-ils ?",
        options: ["Associer solidarité informelle et action publique", "Supprimer l'aide publique", "Remplacer les voisins par des institutions", "Limiter l'entraide aux crises"],
        correct: "A",
        explanation: "Ils estiment que la proximité des réseaux et la continuité de l'action publique se complètent.",
      },
    },
    {
      title: "Le travail à l'ère des algorithmes",
      text: p(
        "De plus en plus de décisions concernant le travail (recrutement, affectation, évaluation) sont assistées, voire déléguées, à des algorithmes. Ces outils promettent objectivité et rapidité, en évitant les biais subjectifs des responsables humains. L'argument séduit les entreprises, soucieuses de rationaliser leurs processus.",
        "Or un algorithme n'est pas neutre : il apprend à partir de données issues du passé, qui portent en elles les inégalités et les préjugés d'hier. Sans vigilance, il tend donc à les reproduire sous une apparence scientifique, ce qui les rend d'autant plus difficiles à contester. Garantir la possibilité de comprendre et de discuter une décision automatisée n'est pas un luxe : c'est la condition pour que l'efficacité ne se paie pas d'une perte de justice, ni d'une déresponsabilisation de ceux qui conçoivent ces outils.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi les biais d'un algorithme sont-ils difficiles à contester ?",
        options: ["Ils prennent l'apparence de l'objectivité scientifique", "Ils sont secrets par loi", "Ils sont corrigés automatiquement", "Ils sont choisis par les salariés"],
        correct: "A",
        explanation: "En reproduisant les inégalités passées sous une apparence scientifique, l'algorithme rend la contestation plus difficile.",
      },
    },
    {
      title: "L'éthique de l'attention",
      text: p(
        "Prêter attention à quelqu'un n'est pas un geste anodin : c'est lui reconnaître une valeur, accepter de se laisser déranger par sa présence. Dans une société saturée de sollicitations, cette disponibilité devient rare, et sa rareté même lui confère une dimension morale. Être attentif, c'est consentir à ne pas tout ramener à soi.",
        "Cette conception invite à reconsidérer ce que l'on nomme productivité. Une écoute véritable ne se mesure pas, elle ne se laisse pas optimiser ; elle exige du temps, de la patience et le renoncement à l'efficacité immédiate. Peut-être est-ce là l'une des principales leçons à tirer de notre époque : certaines formes de valeur échappent aux indicateurs, et c'est en leur faisant place que nous préservons ce qui rend la vie commune supportable, y compris lorsque cela ne figure sur aucun tableau de bord ni dans aucune évaluation.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle leçon l'auteur tire-t-il de cette réflexion ?",
        options: ["Certaines formes de valeur échappent aux indicateurs", "Il faut optimiser l'écoute", "La productivité est la seule valeur", "L'attention est inutile"],
        correct: "A",
        explanation: "L'écoute véritable ne se mesure pas : l'auteur y voit la preuve que la valeur ne se réduit pas aux indicateurs.",
      },
    },
    {
      title: "La ville, mémoire en mouvement",
      text: p(
        "Une ville ne se résume pas à son présent : elle conserve, dans ses rues, ses façades, ses noms, la trace de ceux qui l'ont habitée. Cette stratification, rarement perçue au quotidien, donne à chaque quartier une épaisseur que les plans d'urbanisme saisissent mal. L'amnésie urbaine, à l'inverse, consiste à traiter l'espace comme une surface vierge.",
        "Il ne s'agit pas pour autant de tout préserver. Une ville figée devient un musée, et une mémoire sans limite finit par étouffer le présent. La question est donc celle du choix : quelles traces maintenir, lesquelles laisser disparaître, et selon quels critères ? Ce choix, trop souvent confié aux seuls experts, gagnerait à être discuté avec ceux qui vivent les lieux, seuls capables de dire ce qui, pour eux, fait mémoire, et de rappeler que le patrimoine n'est pas seulement ce qui est beau, mais aussi ce qui est vécu.",
      ),
      question: {
        level: "C2",
        prompt: "Qui devrait participer au choix des traces à conserver ?",
        options: ["Les habitants, avec les experts", "Les experts seuls", "Les promoteurs", "Aucune personne en particulier"],
        correct: "A",
        explanation: "L'auteur plaide pour que ce choix soit discuté avec les habitants, et non confié aux seuls experts.",
      },
    },
    {
      title: "Penser la fragilité",
      text: p(
        "Nos sociétés valorisent la force : réussite, performance, autonomie. La fragilité, qu'elle soit physique, psychique ou sociale, y apparaît comme un échec ou une anomalie, que l'on voudrait corriger au plus vite. Or cette fragilité est la condition commune de tout être humain, que les circonstances révèlent plus ou moins tôt.",
        "Reconnaître la vulnérabilité comme une dimension constitutive de la vie invite à repenser nos institutions. Un système de santé, une école, une politique du travail conçus à partir de la seule figure de l'individu performant excluent d'emblée ceux qui s'en écartent, c'est-à-dire, à un moment ou à un autre, chacun d'entre nous. La solidarité cesse alors d'être une charité à l'égard de quelques-uns pour devenir une exigence de justice envers tous, y compris envers ceux que l'on ne voit pas encore comme vulnérables, mais qui le deviendront.",
      ),
      question: {
        level: "C2",
        prompt: "Que devient la solidarité si l'on reconnaît la fragilité comme condition commune ?",
        options: ["Une exigence de justice envers tous", "Une charité envers quelques-uns", "Une affaire privée", "Une dépense inutile"],
        correct: "A",
        explanation: "La fragilité étant universelle, la solidarité se comprend comme une exigence de justice et non comme une charité.",
      },
    },
    {
      title: "La parole publique et le mensonge",
      text: p(
        "Le mensonge en politique n'est pas nouveau, mais il change de portée quand les moyens de le diffuser et de le démentir se multiplient. Autrefois, une affirmation fausse pouvait être corrigée par quelques sources faisant autorité. Aujourd'hui, elle circule en même temps que son démenti, sans que rien n'assure que le second atteigne les mêmes personnes que la première.",
        "Le danger n'est pas seulement la propagation d'informations erronées, mais l'érosion de la confiance dans la possibilité même d'établir des faits. Quand tout peut être contesté, la frontière entre le vrai et le faux perd de sa netteté, et chacun se replie sur ce qui confirme ses convictions. Restaurer un espace commun de vérité suppose moins de contrôler l'information que de ranimer le goût du débat contradictoire, fondé sur des preuves que chacun peut examiner, et sur la patience nécessaire pour distinguer ce qui est établi de ce qui est simplement répété avec assurance.",
      ),
      question: {
        level: "C2",
        prompt: "Quel est, selon l'auteur, le véritable danger du mensonge public ?",
        options: ["L'érosion de la confiance dans la possibilité d'établir des faits", "La quantité d'informations erronées seulement", "L'absence de démenti", "La disparition des sources"],
        correct: "A",
        explanation: "Plus que les fausses informations elles-mêmes, c'est la perte de confiance dans la possibilité même de la vérité qui menace.",
      },
    },
  ],
});
