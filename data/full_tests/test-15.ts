import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 15.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_15 = defineFullTest({
  number: 15,
  description:
    "Quinzième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, ici la pharmacie du centre. Votre médicament est arrivé. Vous pouvez venir le chercher jusqu'à dix-neuf heures.",
      prompt: "Jusqu'à quelle heure peut-on récupérer le médicament ?",
      options: ["Jusqu'à dix-neuf heures", "Jusqu'à neuf heures", "Jusqu'à midi", "Jusqu'à vingt heures"],
      correct: "A",
      explanation: "La pharmacie précise que le médicament peut être retiré jusqu'à dix-neuf heures.",
    },
    {
      level: "A1",
      category: "météo",
      transcription:
        "Ce matin, il fait froid. Il y a du brouillard sur toute la région. Cet après-midi, le soleil revient et il fera dix degrés.",
      prompt: "Quel temps fera-t-il cet après-midi ?",
      options: ["Il y aura du soleil", "Il y aura du brouillard", "Il neigera", "Il pleuvra"],
      correct: "A",
      explanation: "Le brouillard concerne le matin ; l'après-midi, le soleil revient.",
    },
    {
      level: "A1",
      category: "logement",
      transcription:
        "Voici mon appartement. Il y a une grande cuisine, un salon et deux chambres. La salle de bains est à côté de ma chambre.",
      prompt: "Combien de chambres y a-t-il dans l'appartement ?",
      options: ["Deux", "Une", "Trois", "Quatre"],
      correct: "A",
      explanation: "La personne mentionne une cuisine, un salon et deux chambres.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Mesdames et messieurs, le prochain arrêt est la gare centrale. Correspondance avec la ligne quatre et les trains régionaux. Attention à la marche en descendant.",
      prompt: "Quelle correspondance est possible au prochain arrêt ?",
      options: ["La ligne quatre et les trains régionaux", "Le tramway et l'aéroport", "La ligne deux seulement", "Un bus de nuit"],
      correct: "A",
      explanation: "L'annonce indique une correspondance avec la ligne quatre et les trains régionaux.",
    },
    {
      level: "A2",
      category: "achats",
      transcription:
        "Cette semaine, le magasin propose des soldes sur les vêtements d'été. Les t-shirts sont à moitié prix et les maillots de bain à moins trente pour cent.",
      prompt: "Quelle réduction s'applique aux t-shirts ?",
      options: ["La moitié du prix", "Trente pour cent", "Dix euros", "Aucune réduction"],
      correct: "A",
      explanation: "Les t-shirts sont vendus à moitié prix, les maillots à moins trente pour cent.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Pour garder la forme, le docteur me conseille de marcher trente minutes par jour et de manger plus de légumes. Il m'a aussi recommandé de moins boire de boissons sucrées.",
      prompt: "Quel conseil le docteur donne-t-il pour l'alimentation ?",
      options: ["Manger plus de légumes", "Manger moins de pain", "Supprimer les repas du soir", "Boire plus de lait"],
      correct: "A",
      explanation: "Le docteur recommande de manger plus de légumes et de réduire les boissons sucrées.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Notre musée est ouvert tous les jours sauf le mardi. L'entrée est gratuite le premier dimanche du mois. Des visites guidées sont proposées à quinze heures.",
      prompt: "Quand l'entrée du musée est-elle gratuite ?",
      options: ["Le premier dimanche du mois", "Tous les mardis", "Chaque samedi", "À quinze heures"],
      correct: "A",
      explanation: "L'entrée est gratuite uniquement le premier dimanche du mois.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "À partir de lundi prochain, l'entreprise met en place le télétravail deux jours par semaine pour les salariés qui le souhaitent. Chacun devra en discuter avec son responsable avant la fin du mois.",
      prompt: "Que doivent faire les salariés intéressés ?",
      options: ["En discuter avec leur responsable", "Remplir un questionnaire médical", "Acheter un ordinateur", "Attendre le mois prochain"],
      correct: "A",
      explanation: "Les salariés doivent d'abord parler de leur souhait à leur responsable avant la fin du mois.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Les élèves de troisième participeront cette semaine à des stages d'observation en entreprise. Ils doivent rapporter leur convention signée avant mercredi, sans quoi ils ne pourront pas partir.",
      prompt: "Que se passe-t-il si la convention n'est pas rapportée avant mercredi ?",
      options: ["L'élève ne pourra pas partir en stage", "Le stage sera plus court", "L'élève changera de classe", "Les parents paieront une amende"],
      correct: "A",
      explanation: "Sans convention signée rapportée à temps, l'élève ne peut pas effectuer son stage.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Dis-moi, tu es libre samedi soir ? Je pensais organiser un petit dîner chez moi avec quelques amis. Si tu préfères sortir, on peut aussi aller voir le concert en plein air sur la place.",
      prompt: "Quelle autre proposition la personne fait-elle ?",
      options: ["Aller à un concert en plein air", "Partir en week-end", "Aller au restaurant", "Regarder un film"],
      correct: "A",
      explanation: "En alternative au dîner, elle propose d'aller voir le concert en plein air.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "Le parc naturel organise samedi une sortie pour observer les oiseaux migrateurs. Le rendez-vous est fixé à sept heures, à l'entrée nord. Pensez à apporter des jumelles et des vêtements chauds.",
      prompt: "Que faut-il apporter pour cette sortie ?",
      options: ["Des jumelles et des vêtements chauds", "Un appareil photo professionnel", "Un guide des oiseaux", "Un repas complet"],
      correct: "A",
      explanation: "Les participants doivent prévoir des jumelles et des vêtements chauds.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Nous vous informons que le gardien sera absent du quinze au vingt-deux août. Pendant cette période, les colis seront déposés au local à vélos et les urgences seront traitées par le syndic.",
      prompt: "Où seront déposés les colis pendant l'absence du gardien ?",
      options: ["Au local à vélos", "Chez le syndic", "Dans les boîtes aux lettres", "À la mairie"],
      correct: "A",
      explanation: "Les colis seront entreposés dans le local à vélos pendant l'absence du gardien.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Le nombre de créations d'entreprises a atteint un niveau record l'an dernier, essentiellement grâce aux micro-entrepreneurs. Les experts nuancent cependant cet enthousiasme : une grande partie de ces activités génère de très faibles revenus et disparaît après quelques années.",
      prompt: "Quelle nuance les experts apportent-ils ?",
      options: ["Beaucoup de ces activités rapportent peu et ne durent pas", "Ces entreprises paient trop d'impôts", "Elles embauchent trop de salariés", "Elles sont toutes très rentables"],
      correct: "A",
      explanation: "Les experts soulignent la faiblesse des revenus et la disparition rapide de nombre de ces activités.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Pour lutter contre le décrochage scolaire, un lycée a mis en place un système de tutorat : des élèves plus âgés accompagnent leurs camarades en difficulté. Les résultats sont encourageants, et les tuteurs affirment aussi y avoir gagné en confiance.",
      prompt: "Qu'apporte le tutorat aux élèves plus âgés ?",
      options: ["Davantage de confiance en eux", "Une réduction des cours", "Des notes automatiques", "Un salaire"],
      correct: "A",
      explanation: "Les tuteurs expliquent que cette expérience leur a permis de gagner en confiance.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le théâtre de la ville propose cette saison une programmation plus audacieuse, mêlant créations contemporaines et grands classiques revisités. La directrice assure vouloir attirer un public qui ne fréquente pas habituellement les salles, grâce à des tarifs réduits pour les moins de trente ans.",
      prompt: "Comment la directrice veut-elle toucher de nouveaux spectateurs ?",
      options: ["Avec des tarifs réduits pour les moins de trente ans", "En supprimant les classiques", "En allongeant les spectacles", "En ouvrant un restaurant"],
      correct: "A",
      explanation: "Elle mise sur des tarifs préférentiels pour les moins de trente ans afin d'élargir le public.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "La sédentarité est devenue un facteur de risque majeur. Selon une étude, rester assis plus de huit heures par jour augmente fortement les risques cardiovasculaires, même chez les personnes qui font du sport le week-end, d'où la recommandation de se lever régulièrement.",
      prompt: "Que recommande l'étude aux personnes qui travaillent assises ?",
      options: ["Se lever régulièrement", "Faire du sport uniquement le week-end", "Dormir plus longtemps", "Manger moins le soir"],
      correct: "A",
      explanation: "L'étude conseille de se lever souvent, car le sport du week-end ne compense pas la sédentarité quotidienne.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les assistants vocaux se généralisent dans les foyers. Pratiques pour lancer une musique ou régler le chauffage, ils posent toutefois la question de la confidentialité : les enregistrements sont parfois conservés par les fabricants, sans que les utilisateurs en aient toujours conscience.",
      prompt: "Quel problème les assistants vocaux posent-ils ?",
      options: ["La confidentialité des enregistrements", "Leur prix élevé", "Leur taille importante", "Leur manque de fonctions"],
      correct: "A",
      explanation: "Les fabricants peuvent conserver les enregistrements, ce qui pose un problème de confidentialité.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "Les crèches d'entreprise se développent, car elles permettent aux parents de concilier plus facilement vie familiale et vie professionnelle. Toutefois, leur coût reste élevé pour les employeurs, et seules les grandes sociétés peuvent réellement se les offrir.",
      prompt: "Pourquoi peu d'entreprises proposent-elles des crèches ?",
      options: ["Leur coût est élevé", "Les parents n'en veulent pas", "La loi les interdit", "Elles sont trop proches des bureaux"],
      correct: "A",
      explanation: "Le coût élevé réserve ce service aux grandes sociétés.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "La montée de l'abstention aux élections locales interroge sur la vitalité du lien démocratique. Si certains y voient un désintérêt, d'autres plaident pour une lecture plus nuancée : l'abstention serait aussi l'expression d'une défiance envers des institutions perçues comme éloignées des préoccupations quotidiennes.",
      prompt: "Comment certains expliquent-ils l'abstention ?",
      options: ["Par une défiance envers des institutions jugées éloignées", "Par un manque de bureaux de vote", "Par une trop grande confiance", "Par un manque d'élections"],
      correct: "A",
      explanation: "Selon cette lecture, l'abstention traduit la défiance à l'égard d'institutions perçues comme éloignées des préoccupations quotidiennes.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "L'agriculture est à la fois victime et actrice du dérèglement climatique : sécheresses et inondations fragilisent les récoltes, tandis que certaines pratiques contribuent aux émissions de gaz à effet de serre. Les agriculteurs réclament donc un accompagnement, plutôt que des contraintes qui les mettent en difficulté.",
      prompt: "Que réclament les agriculteurs ?",
      options: ["Un accompagnement plutôt que des contraintes", "L'arrêt de toute production", "Plus de pesticides", "Moins de récoltes"],
      correct: "A",
      explanation: "Face aux enjeux climatiques, ils demandent un soutien plutôt que des obligations qui les fragilisent.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "La communication scientifique se heurte à un écueil : simplifier un résultat pour le rendre accessible, c'est risquer de le déformer ; le restituer dans toute sa complexité, c'est prendre le risque de perdre son auditoire. Les journalistes spécialisés tâchent donc de trouver un équilibre, toujours précaire.",
      prompt: "Quel dilemme la communication scientifique rencontre-t-elle ?",
      options: ["Simplifier au risque de déformer, ou détailler au risque de perdre le public", "Choisir entre texte et image", "Publier ou ne pas publier", "Payer ou non les chercheurs"],
      correct: "A",
      explanation: "Simplifier peut fausser un résultat, le détailler peut décourager le public : l'équilibre est délicat.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Les inégalités territoriales d'accès aux soins ne se mesurent pas seulement en kilomètres : elles tiennent aussi à la capacité des habitants à se repérer dans un système complexe, à obtenir un rendez-vous, à faire valoir leurs droits. Les plus démunis cumulent ainsi les obstacles matériels et administratifs.",
      prompt: "Quels obstacles les plus démunis cumulent-ils ?",
      options: ["Matériels et administratifs", "Uniquement géographiques", "Seulement financiers", "Aucun obstacle particulier"],
      correct: "A",
      explanation: "À la distance s'ajoutent des difficultés à s'orienter dans le système et à faire valoir leurs droits.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "La modernité a valorisé l'autonomie de l'individu, au point que toute dépendance semble suspecte. Pourtant, ce que l'on nomme autonomie est souvent le résultat d'un réseau d'appuis invisibles : écoles, institutions, proches. Reconnaître ces dépendances n'abolit pas la liberté ; cela en précise les conditions concrètes.",
      prompt: "Que précise la reconnaissance des dépendances selon l'orateur ?",
      options: ["Les conditions concrètes de la liberté", "L'inutilité de la liberté", "La fin de l'autonomie", "L'origine des institutions"],
      correct: "A",
      explanation: "L'orateur soutient que reconnaître les appuis dont dépend l'autonomie ne supprime pas la liberté mais en clarifie les conditions.",
    },
    {
      level: "C2",
      category: "histoire",
      transcription:
        "Les archives ne parlent pas d'elles-mêmes : elles supposent un historien qui les interroge, et c'est la qualité de ses questions qui détermine ce qu'il y découvre. Un même fonds peut ainsi donner lieu à des lectures divergentes, sans que l'une soit nécessairement fausse, tant le passé se laisse approcher par des angles multiples.",
      prompt: "Pourquoi un même fonds d'archives peut-il donner des lectures différentes ?",
      options: ["Parce que les questions posées par l'historien orientent la lecture", "Parce que les archives sont fausses", "Parce que les historiens se contredisent volontairement", "Parce que les archives sont illisibles"],
      correct: "A",
      explanation: "Les archives n'étant pas parlantes par elles-mêmes, c'est l'angle d'interrogation qui détermine ce qu'on y trouve.",
    },
    {
      level: "C2",
      category: "politique",
      transcription:
        "On présente souvent le compromis comme une faiblesse, alors qu'il est la condition même de la vie démocratique : dans une société plurielle, nul ne peut imposer sa vision sans en payer le prix. Le compromis n'est pas la négation des convictions, mais l'art de les faire coexister avec celles des autres.",
      prompt: "Comment l'orateur définit-il le compromis ?",
      options: ["L'art de faire coexister des convictions différentes", "Un renoncement à toute conviction", "Une faiblesse politique", "Un moyen d'imposer sa vision"],
      correct: "A",
      explanation: "Le compromis est présenté comme une manière de faire cohabiter des convictions variées, sans les renier.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "négation",
      prompt: "Je ___ mange jamais de viande le soir.",
      options: ["ne", "n'", "pas", "plus"],
      correct: "A",
      explanation: "La négation « ne… jamais » se construit avec « ne » devant le verbe commençant par une consonne.",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Nous ___ à la gare à dix heures demain matin.",
      options: ["serons", "sommes", "étions", "serions"],
      correct: "A",
      explanation: "« Demain matin » exprime l'avenir : futur simple du verbe être, « nous serons ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Tu connais cette ville ? Oui, j'___ habité pendant deux ans.",
      options: ["y ai", "l'ai", "en ai", "lui ai"],
      correct: "A",
      explanation: "« Habiter dans une ville » : le pronom « y » remplace le complément de lieu.",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "La rue ___ j'habite est très calme.",
      options: ["où", "que", "dont", "qui"],
      correct: "A",
      explanation: "« Où » reprend un complément de lieu : « j'habite dans cette rue ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Elle court ___ vite que son frère.",
      options: ["aussi", "plus bien", "meilleur", "très"],
      correct: "A",
      explanation: "La comparaison d'égalité se forme avec « aussi… que ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Pendant que je ___ la vaisselle, le téléphone a sonné.",
      options: ["faisais", "ai fait", "ferai", "fais"],
      correct: "A",
      explanation: "L'action de fond, en cours quand une autre survient, se met à l'imparfait : « je faisais ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Il habite ___ États-Unis depuis cinq ans.",
      options: ["aux", "en", "à", "dans les"],
      correct: "A",
      explanation: "Devant un pays pluriel comme les États-Unis, on emploie « aux ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il est préférable que vous ___ votre dossier avant vendredi.",
      options: ["envoyiez", "envoyez", "enverrez", "enverriez"],
      correct: "A",
      explanation: "« Il est préférable que » est suivi du subjonctif présent : « que vous envoyiez ».",
    },
    {
      level: "B2",
      category: "expression du but",
      prompt: "Elle a tout noté ___ ne rien oublier.",
      options: ["afin de", "afin que", "parce que", "bien que"],
      correct: "A",
      explanation: "Le sujet est le même dans les deux verbes : on emploie « afin de » suivi de l'infinitif.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Les résultats ___ demain par le ministère.",
      options: ["seront annoncés", "annonceront", "ont annoncé", "annonçaient"],
      correct: "A",
      explanation: "Les résultats subissent l'action : passif au futur, « seront annoncés ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Quand j'___ rentré, il faisait déjà nuit depuis longtemps.",
      options: ["suis", "étais", "serai", "serais"],
      correct: "A",
      explanation: "L'action ponctuelle « rentrer » se met au passé composé : « quand je suis rentré ».",
    },
    {
      level: "B2",
      category: "restriction",
      prompt: "Elle ___ boit que de l'eau depuis qu'elle a arrêté le café.",
      options: ["ne", "n'", "pas", "jamais"],
      correct: "A",
      explanation: "La restriction « ne… que » exige « ne » devant le verbe « boit », qui commence par une consonne.",
    },
    {
      level: "B2",
      category: "pronoms possessifs",
      prompt: "Ce n'est pas mon stylo, c'est le ___ .",
      options: ["tien", "tienne", "ton", "tes"],
      correct: "A",
      explanation: "Le pronom possessif masculin singulier correspondant à « tu » est « le tien ».",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Il a affirmé qu'il ___ prévenu dès qu'il aurait des nouvelles.",
      options: ["nous préviendrait", "nous prévient", "nous préviendra", "nous prévenait"],
      correct: "A",
      explanation: "Dans le discours rapporté au passé, le futur devient conditionnel : « il nous préviendrait ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Il importe que chacun ___ conscience de ses responsabilités.",
      options: ["prenne", "prend", "prendra", "prendrait"],
      correct: "A",
      explanation: "« Il importe que » appelle le subjonctif présent : « que chacun prenne ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Les personnes ___ il s'est adressé n'ont pas répondu.",
      options: ["auxquelles", "dont", "que", "lesquelles"],
      correct: "A",
      explanation: "« S'adresser à » impose « auxquelles », contraction de « à lesquelles » avec un antécédent féminin pluriel.",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "C'est en forgeant ___ devient forgeron.",
      options: ["qu'on", "qui", "que", "dont on"],
      correct: "A",
      explanation: "Dans le proverbe, « c'est en… que » encadre le gérondif : « qu'on devient forgeron ».",
    },
    {
      level: "C1",
      category: "plus-que-parfait",
      prompt: "Elle a avoué qu'elle ___ la clé dans la voiture.",
      options: ["avait oublié", "oubliait", "oubliera", "avait oublier"],
      correct: "A",
      explanation: "Une action antérieure à un verbe passé s'exprime au plus-que-parfait : « avait oublié ».",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Pour sage qu'il ___, il s'est laissé convaincre par des promesses.",
      options: ["fût", "est", "serait", "était"],
      correct: "A",
      explanation: "« Pour… que » concessif exige le subjonctif ; en langue soutenue, l'imparfait « fût » est possible.",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Il convient de s'assurer que le projet ___ aux exigences réglementaires.",
      options: ["satisfasse", "satisfait", "satisfaisait", "satisfera"],
      correct: "A",
      explanation: "« S'assurer que » + subjonctif peut s'employer pour exprimer la vérification d'une condition à remplir.",
    },
  ],
  reading: [
    {
      title: "Piscine : horaires du mercredi",
      text: p(
        "Le mercredi, la piscine municipale ouvre ses bassins de 13 h à 17 h, réservés aux enfants accompagnés d'un adulte.",
        "Des cours d'initiation pour les débutants ont lieu à 14 h et à 16 h. Inscription sur place.",
      ),
      question: {
        level: "B1",
        prompt: "Comment s'inscrire aux cours d'initiation ?",
        options: ["Sur place", "Par téléphone", "En mairie", "Sur internet"],
        correct: "A",
        explanation: "Le texte précise que l'inscription aux cours se fait sur place.",
      },
    },
    {
      title: "Message d'un voisin",
      text: p(
        "Bonjour, je fais des travaux dans mon appartement du 10 au 20 mai, de 9 h à 17 h. Je m'excuse d'avance pour le bruit.",
        "Si le bruit vous gêne, n'hésitez pas à sonner : je ferai de mon mieux pour le réduire.",
      ),
      question: {
        level: "B1",
        prompt: "Que propose le voisin en cas de gêne ?",
        options: ["De sonner chez lui", "De prévenir le gardien", "De porter plainte", "De quitter l'immeuble"],
        correct: "A",
        explanation: "Il invite à sonner à sa porte si le bruit dérange afin de le réduire.",
      },
    },
    {
      title: "Offre de stage",
      text: p(
        "L'agence de voyages recherche un stagiaire pour l'été. Missions : accueil des clients, mise à jour du site internet, aide à la réservation.",
        "Durée : deux mois. Gratification légale. Envoyez votre candidature avant le 30 avril.",
      ),
      question: {
        level: "B1",
        prompt: "Jusqu'à quand peut-on candidater ?",
        options: ["Jusqu'au 30 avril", "Jusqu'à la fin de l'été", "Jusqu'au 1er mai", "Jusqu'à fin juin"],
        correct: "A",
        explanation: "La date limite d'envoi des candidatures est le 30 avril.",
      },
    },
    {
      title: "Cours de cuisine du jeudi",
      text: p(
        "Le jeudi soir, apprenez à cuisiner des plats simples avec un chef. Les cours durent deux heures et se terminent par un repas partagé.",
        "Le prix de 25 euros comprend les ingrédients. Tablier fourni.",
      ),
      question: {
        level: "B1",
        prompt: "Que comprend le prix du cours ?",
        options: ["Les ingrédients", "Un livre de recettes", "Un diplôme", "Les ustensiles à emporter"],
        correct: "A",
        explanation: "Le prix de 25 euros couvre les ingrédients nécessaires.",
      },
    },
    {
      title: "Réparation d'un vélo",
      text: p(
        "L'atelier de réparation de vélos est ouvert le samedi matin. Des bénévoles aident à changer une chambre à air ou à régler les freins.",
        "Il suffit d'apporter son vélo et de participer en donnant un coup de main. Aucun paiement n'est demandé.",
      ),
      question: {
        level: "B1",
        prompt: "Que doit apporter chaque participant à l'atelier ?",
        options: ["Son vélo, et un coup de main", "Payer les réparations", "Acheter des pièces neuves", "S'inscrire un mois avant"],
        correct: "A",
        explanation: "Les participants apportent leur vélo et mettent la main à la pâte, gratuitement.",
      },
    },
    {
      title: "Un repas pour les voisins",
      text: p(
        "Chaque mois, des habitants d'un immeuble organisent un repas partagé dans la cour. Chacun apporte un plat, et des chaises sont mises à disposition par la copropriété.",
        "Ces rencontres ont permis de nouer des liens entre locataires et propriétaires, qui ne se parlaient guère auparavant, et plusieurs habitants affirment s'y sentir désormais moins isolés dans l'immeuble.",
      ),
      question: {
        level: "B2",
        prompt: "Quel effet ces repas ont-ils eu ?",
        options: ["Ils ont créé des liens entre locataires et propriétaires", "Ils ont fait augmenter les loyers", "Ils ont supprimé le syndic", "Ils ont causé des conflits"],
        correct: "A",
        explanation: "Les repas ont rapproché des habitants qui ne se parlaient pas auparavant.",
      },
    },
    {
      title: "Un lycée au rythme des saisons",
      text: p(
        "Dans ce lycée agricole, les élèves cultivent un potager et vendent leur production aux familles de l'établissement. Ils apprennent ainsi la gestion d'un budget et les contraintes de la vente directe.",
        "Les enseignants constatent que les élèves, parfois en difficulté en classe, s'épanouissent dans ces activités concrètes.",
      ),
      question: {
        level: "B2",
        prompt: "Que constatent les enseignants ?",
        options: ["Des élèves en difficulté s'épanouissent dans le concret", "Les élèves refusent de travailler", "Les familles n'achètent rien", "Le potager coûte trop cher"],
        correct: "A",
        explanation: "Les élèves parfois en difficulté en classe trouvent leur place dans les activités concrètes.",
      },
    },
    {
      title: "Un festival de cirque",
      text: p(
        "Chaque année, un festival de cirque contemporain attire plusieurs milliers de spectateurs dans une petite ville de l'ouest. Jongleurs, acrobates et clowns se produisent dans la rue, sous des chapiteaux et dans des salles.",
        "Les commerçants se réjouissent de l'afflux, mais les habitants se plaignent du manque de places de stationnement durant ces quelques jours.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi les habitants se plaignent-ils ?",
        options: ["Du manque de places de stationnement", "Du bruit des chapiteaux", "Du prix des billets", "De la fermeture des commerces"],
        correct: "A",
        explanation: "Les habitants regrettent la difficulté à se garer pendant le festival.",
      },
    },
    {
      title: "La reconversion des friches industrielles",
      text: p(
        "D'anciennes usines abandonnées sont réhabilitées en centres culturels, en logements ou en espaces de travail partagés. Cette transformation donne une seconde vie à des bâtiments chargés d'histoire et évite d'étendre la ville sur des terres agricoles.",
        "Les riverains craignent toutefois que ces projets, souvent coûteux, n'entraînent une hausse des loyers dans le quartier.",
      ),
      question: {
        level: "B2",
        prompt: "Que craignent les riverains ?",
        options: ["Une hausse des loyers", "La destruction des usines", "Le bruit des machines", "Le départ des commerces"],
        correct: "A",
        explanation: "Ils redoutent que la transformation du quartier fasse monter les loyers.",
      },
    },
    {
      title: "Le recyclage des piles",
      text: p(
        "Les piles usagées contiennent des métaux polluants qu'il ne faut pas jeter à la poubelle ordinaire. Des bacs de collecte sont installés dans les supermarchés et les mairies, mais seule une pile sur deux y est rapportée.",
        "Les associations de défense de l'environnement appellent à plus de sensibilisation, notamment dans les écoles.",
      ),
      question: {
        level: "B2",
        prompt: "Que proposent les associations ?",
        options: ["Plus de sensibilisation, notamment dans les écoles", "L'interdiction des piles", "Moins de bacs de collecte", "Des amendes pour tous"],
        correct: "A",
        explanation: "Elles réclament davantage de sensibilisation, en particulier auprès des élèves.",
      },
    },
    {
      title: "Les coopératives d'habitants",
      text: p(
        "Dans une coopérative d'habitants, les résidents sont collectivement propriétaires de l'immeuble. Chacun paie une part et dispose d'un logement, mais ne peut pas le revendre pour réaliser une plus-value.",
        "Ce modèle, qui vise à éviter la spéculation, attire des ménages aux revenus moyens. Il reste cependant peu connu et se heurte à la difficulté d'obtenir des prêts bancaires.",
      ),
      question: {
        level: "B2",
        prompt: "Quel obstacle ce modèle rencontre-t-il ?",
        options: ["La difficulté d'obtenir des prêts", "Un manque de candidats", "Une interdiction légale", "Le prix de l'électricité"],
        correct: "A",
        explanation: "Les banques accordent difficilement des prêts à ce type de projet, peu connu du public.",
      },
    },
    {
      title: "Des maraîchers en ville",
      text: p(
        "Une ferme urbaine installée sur un ancien parking produit des légumes vendus aux restaurants et aux habitants du quartier. Les caisses de culture sont disposées sur du béton, sans terre au sol.",
        "Les exploitants espèrent atteindre l'équilibre financier d'ici deux ans, mais la production reste limitée par la surface disponible.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite rencontre la ferme urbaine ?",
        options: ["La surface disponible", "Le manque de clients", "L'interdiction de vendre", "L'absence d'eau"],
        correct: "A",
        explanation: "La production est restreinte par la superficie disponible sur le parking.",
      },
    },
    {
      title: "La retraite active",
      text: p(
        "De plus en plus de retraités poursuivent une activité, salariée ou bénévole, après avoir quitté leur emploi. Certains y voient un complément de revenus, d'autres un moyen de rester utiles et en lien avec les autres.",
        "Les spécialistes du vieillissement soulignent que cette activité protège la santé physique et mentale, à condition qu'elle reste choisie plutôt que subie.",
      ),
      question: {
        level: "B2",
        prompt: "À quelle condition l'activité des retraités est-elle bénéfique ?",
        options: ["Qu'elle soit choisie", "Qu'elle soit payée", "Qu'elle soit quotidienne", "Qu'elle soit solitaire"],
        correct: "A",
        explanation: "Selon les spécialistes, elle protège la santé si elle est choisie et non subie.",
      },
    },
    {
      title: "Des bibliobus dans les villages",
      text: p(
        "Dans les communes rurales, le bibliobus passe toutes les deux semaines devant la mairie. On peut y emprunter des romans, des albums pour enfants et des documentaires, sans abonnement ni frais d'inscription.",
        "Les bibliothécaires y voient un moyen de maintenir le goût de la lecture, mais déplorent que les horaires de passage soient mal connus des habitants les plus isolés.",
      ),
      question: {
        level: "B2",
        prompt: "Quel regret les bibliothécaires expriment-ils ?",
        options: ["Les horaires sont mal connus des plus isolés", "Les livres sont trop chers", "Le bibliobus est trop lent", "Les enfants ne lisent plus"],
        correct: "A",
        explanation: "Ils regrettent que les habitants les plus éloignés connaissent mal les horaires du bibliobus.",
      },
    },
    {
      title: "Des horaires pour les cantines",
      text: p(
        "À la rentrée, plusieurs écoles de la ville ont décalé la pause déjeuner de trente minutes afin de limiter l'attente au self. Les enfants mangent ainsi dans une ambiance moins bruyante et disposent de plus de temps pour jouer.",
        "Certains parents jugent que ce changement complique l'organisation de leur journée de travail, et demandent des garderies adaptées.",
      ),
      question: {
        level: "B2",
        prompt: "Que demandent certains parents ?",
        options: ["Des garderies adaptées", "Un retour à l'ancien horaire", "La suppression de la cantine", "Des repas gratuits"],
        correct: "A",
        explanation: "Gênés par le nouvel horaire, ils réclament des garderies qui s'y ajustent.",
      },
    },
    {
      title: "La fin des sacs plastiques",
      text: p(
        "Depuis l'interdiction des sacs plastiques à usage unique en caisse, les consommateurs ont dû modifier leurs habitudes : sacs réutilisables, cabas en tissu, paniers. Le nombre de sacs distribués a chuté de façon spectaculaire.",
        "Mais certains observateurs relativisent ce succès : l'usage de sacs en papier ou en coton, dont la fabrication est gourmande en ressources, s'est multiplié, ce qui n'est pas toujours plus écologique si ces sacs ne sont pas réutilisés assez longtemps. Une analyse du cycle de vie montre en effet qu'un sac en coton doit servir plusieurs centaines de fois pour compenser l'eau et l'énergie nécessaires à sa fabrication, seuil que peu de consommateurs atteignent réellement. Le véritable progrès serait donc moins de changer de matière que de changer d'habitude.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle nuance les observateurs apportent-ils ?",
        options: ["Les sacs de remplacement ne sont écologiques que s'ils sont longtemps réutilisés", "Les sacs plastiques sont meilleurs", "Les sacs en tissu sont interdits", "La consommation a doublé"],
        correct: "A",
        explanation: "Le papier et le coton demandent beaucoup de ressources ; leur bénéfice dépend du nombre de réutilisations.",
      },
    },
    {
      title: "Les apprentis face à l'orientation",
      text: p(
        "L'apprentissage attire de plus en plus de jeunes, séduits par la perspective de gagner un salaire tout en se formant. Les entreprises, de leur côté, y voient un moyen de recruter des profils déjà familiers de leurs méthodes. Les taux d'insertion à l'issue des formations sont souvent supérieurs à ceux des filières scolaires.",
        "Pourtant, la voie reste entachée d'une image dévalorisée, héritée de l'époque où elle était choisie par défaut. Les jeunes issus de milieux favorisés l'envisagent rarement, et les familles peinent à y voir un parcours d'excellence. Pour corriger ce déséquilibre, des campagnes de communication tentent de montrer la diversité des métiers accessibles, mais le changement des représentations demande du temps.",
      ),
      question: {
        level: "C1",
        prompt: "Quel frein à l'apprentissage le texte identifie-t-il ?",
        options: ["Une image dévalorisée héritée du passé", "Un manque d'entreprises", "Des salaires trop bas", "Une durée trop courte"],
        correct: "A",
        explanation: "Malgré ses atouts, l'apprentissage reste perçu comme un choix par défaut, ce qui freine son attractivité.",
      },
    },
    {
      title: "Le sens du jeu vidéo",
      text: p(
        "Longtemps considéré comme un loisir futile, voire nocif, le jeu vidéo est aujourd'hui reconnu comme une forme culturelle à part entière. Certaines productions, par leur écriture, leur musique et leur esthétique, rivalisent avec le cinéma ; d'autres servent à l'éducation, à la rééducation ou à la simulation de situations complexes.",
        "Cette reconnaissance ne dispense pas d'une vigilance. Les mécanismes de récompense qui retiennent le joueur peuvent générer des usages excessifs, et la monétisation de certains jeux, fondée sur des achats répétés, interroge. La question n'est donc plus de savoir si le jeu vidéo est bon ou mauvais, mais de distinguer, parmi la variété des pratiques, celles qui enrichissent et celles qui enferment.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle question le texte considère-t-il comme essentielle aujourd'hui ?",
        options: ["Distinguer les pratiques qui enrichissent de celles qui enferment", "Savoir si le jeu vidéo est un art", "Interdire tous les jeux", "Réduire le prix des consoles"],
        correct: "A",
        explanation: "L'enjeu est de différencier, au sein de pratiques variées, ce qui enrichit de ce qui enferme.",
      },
    },
    {
      title: "L'eau, un bien commun",
      text: p(
        "Alors que les sécheresses se multiplient, la gestion de l'eau devient un enjeu politique majeur. Agriculteurs, industriels, collectivités et particuliers se disputent une ressource dont la disponibilité varie selon les saisons et les territoires. Les arbitrages sont d'autant plus délicats qu'ils engagent des usages différents : irrigation, eau potable, production d'énergie, préservation des milieux.",
        "Les autorités encouragent la sobriété, mais l'efficacité de cette démarche dépend de la clarté des règles. Des restrictions variables d'un département à l'autre suscitent incompréhension et sentiment d'injustice. De plus en plus d'experts plaident pour une gouvernance concertée à l'échelle des bassins, où tous les usagers seraient associés aux décisions, de façon à ce que les efforts demandés soient perçus comme partagés.",
      ),
      question: {
        level: "C1",
        prompt: "Que proposent de plus en plus d'experts ?",
        options: ["Une gouvernance concertée à l'échelle des bassins", "L'interdiction de l'irrigation", "Des règles différentes par commune", "La privatisation de l'eau"],
        correct: "A",
        explanation: "Ils préconisent une gestion partagée par bassin, associant tous les usagers.",
      },
    },
    {
      title: "Le bruit des villes",
      text: p(
        "Le bruit est l'une des premières nuisances dont se plaignent les citadins. Circulation, chantiers, bars et voisinage se conjuguent pour former un environnement sonore parfois épuisant, dont les effets sur le sommeil et la santé cardiovasculaire sont désormais bien documentés.",
        "Plusieurs villes expérimentent des remèdes : revêtements routiers silencieux, limitation de vitesse, murs végétalisés, création de zones de calme. Ces mesures demandent des investissements, mais elles améliorent durablement la qualité de vie. Reste que la question du bruit ne relève pas seulement de la technique : elle suppose aussi de s'interroger sur les usages, c'est-à-dire sur ce que chacun accepte de modifier dans ses habitudes pour que la ville demeure habitable pour tous.",
      ),
      question: {
        level: "C1",
        prompt: "Que suppose la question du bruit au-delà de la technique ?",
        options: ["Une réflexion sur les usages de chacun", "L'abandon des villes", "Un contrôle par la police", "Une hausse des impôts locaux"],
        correct: "A",
        explanation: "Le texte souligne que réduire le bruit exige aussi de repenser les habitudes individuelles.",
      },
    },
    {
      title: "La responsabilité des plateformes",
      text: p(
        "Les grandes plateformes numériques se présentent volontiers comme de simples intermédiaires, neutres vis-à-vis des contenus qu'elles hébergent. Cette posture, longtemps confortable, est de plus en plus contestée : en organisant la visibilité, en recommandant, en hiérarchisant, elles participent activement à la circulation de l'information et ne sauraient prétendre n'en être que le support.",
        "Dès lors, la question de leur responsabilité se pose avec acuité. Elle ne se réduit pas à la modération des contenus illicites, mais touche aux choix de conception qui favorisent certaines formes d'expression, notamment les plus clivantes. Définir un cadre qui préserve la liberté d'expression tout en exigeant davantage de transparence sur ces choix constitue l'un des défis majeurs des démocraties contemporaines.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi la neutralité des plateformes est-elle contestée ?",
        options: ["Parce qu'elles organisent activement la visibilité des contenus", "Parce qu'elles n'hébergent rien", "Parce qu'elles sont gratuites", "Parce qu'elles refusent la liberté d'expression"],
        correct: "A",
        explanation: "En recommandant et hiérarchisant, elles influencent la circulation de l'information et ne sont pas de simples supports.",
      },
    },
    {
      title: "Penser le temps long",
      text: p(
        "Les sociétés contemporaines vivent sous le règne de l'immédiat : résultats trimestriels, cycles électoraux, flux d'informations continu. Cette contraction du temps rend difficile la prise en compte d'enjeux dont les effets s'étendent sur plusieurs générations, comme le climat, la gestion des déchets nucléaires ou la préservation de la biodiversité.",
        "Pour y remédier, certains proposent d'instituer des organes chargés de défendre les intérêts des générations futures, ou d'introduire dans les décisions publiques des évaluations de long terme. De telles initiatives n'effacent pas la tension entre urgence et durée, mais elles rappellent que gouverner consiste aussi à ne pas léguer à d'autres des problèmes que l'on aurait pu anticiper, quand bien même ces autres ne votent pas encore, et n'auront donc aucun moyen de faire valoir leurs droits au moment où se prennent les décisions qui les concernent.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle idée du gouvernement le texte développe-t-il ?",
        options: ["Gouverner, c'est aussi anticiper pour ne pas léguer les problèmes", "Gouverner, c'est répondre à l'urgence uniquement", "Gouverner, c'est suivre les sondages", "Gouverner, c'est ignorer l'avenir"],
        correct: "A",
        explanation: "Le texte défend une conception du gouvernement qui prend en charge l'avenir plutôt que de reporter les difficultés sur d'autres.",
      },
    },
    {
      title: "La parole des experts",
      text: p(
        "Au moment des crises, le public se tourne vers les experts, attendant d'eux des réponses claires. Or la science procède par hypothèses, probabilités et réajustements, ce qui s'accommode mal de l'exigence de certitude. De ce malentendu naît parfois une défiance : on reproche aux experts de se contredire alors qu'ils révisent, à la lumière de données nouvelles, ce qu'ils avaient énoncé avec prudence.",
        "Les experts eux-mêmes n'échappent pas à une difficulté : parler en public suppose de simplifier, ce qui expose à des raccourcis que leurs pairs jugeront excessifs. Il serait vain d'espérer résoudre cette tension par un surcroît de communication. Il s'agit plutôt de former le public à comprendre ce qu'est un savoir en construction, afin que l'incertitude cesse d'être confondue avec l'incompétence.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle confusion l'auteur souhaite-t-il dissiper ?",
        options: ["Celle entre incertitude et incompétence", "Celle entre experts et politiques", "Celle entre données et opinions", "Celle entre crise et normalité"],
        correct: "A",
        explanation: "Il faut apprendre au public qu'un savoir en construction comporte de l'incertitude, qui n'est pas de l'incompétence.",
      },
    },
    {
      title: "L'altérité et le voyage",
      text: p(
        "Voyager passe pour un moyen privilégié de rencontrer l'autre. Mais on peut se demander ce que nous rencontrons réellement lorsque les circuits touristiques sont organisés pour confirmer nos attentes : les paysages se laissent photographier, les habitants se font figurants, et l'étrangeté, dûment domestiquée, devient un produit.",
        "Il ne s'agit pas de condamner le voyage, mais de prendre conscience de ce qu'il engage. Rencontrer véritablement l'autre suppose d'accepter d'être dérangé, de ne pas tout comprendre, de renoncer à l'idée d'un séjour maîtrisé. Cet inconfort, que l'industrie du loisir tend à écarter, est peut-être la condition même d'une expérience qui change quelque chose en nous, car c'est dans la brèche ouverte par l'inattendu que se forme un regard véritablement nouveau, que nulle visite guidée ne saurait offrir.",
      ),
      question: {
        level: "C2",
        prompt: "Selon l'auteur, qu'est-ce qui rend l'expérience du voyage transformatrice ?",
        options: ["L'inconfort accepté de ne pas tout maîtriser", "Le confort d'un séjour organisé", "La photographie des paysages", "Le choix de destinations connues"],
        correct: "A",
        explanation: "L'auteur voit dans l'acceptation du dérangement et de l'incompréhension la condition d'une véritable rencontre.",
      },
    },
    {
      title: "Éthique et progrès technique",
      text: p(
        "Chaque avancée technique soulève des questions que ses concepteurs n'avaient pas anticipées. Les algorithmes de recommandation, nés pour faciliter l'accès à l'information, ont fini par influer sur les opinions ; la reconnaissance faciale, pensée pour la sécurité, interroge désormais la liberté d'aller et venir. L'histoire des techniques est en ce sens une histoire d'effets imprévus.",
        "Dans ces conditions, l'éthique ne peut se contenter d'intervenir après coup, pour juger des usages déjà installés. Elle doit accompagner la conception même des outils, en interrogeant leurs finalités et leurs conséquences possibles. Cela suppose d'accepter de ralentir parfois, de renoncer à certaines applications, et de reconnaître que ce qui est techniquement possible n'est pas, de ce seul fait, souhaitable, ni même acceptable pour ceux qui en subiront les effets sans avoir été consultés.",
      ),
      question: {
        level: "C2",
        prompt: "Quel rôle l'auteur assigne-t-il à l'éthique ?",
        options: ["Accompagner la conception des outils dès le départ", "Juger uniquement après coup", "Interdire toute technique", "Accélérer l'innovation"],
        correct: "A",
        explanation: "L'éthique doit intervenir en amont, pendant la conception, en interrogeant finalités et conséquences possibles.",
      },
    },
  ],
});
