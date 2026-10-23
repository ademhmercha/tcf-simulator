import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 1.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_01 = defineFullTest({
  number: 1,
  description:
    "Premier examen blanc complet : trois épreuves enchaînées, du niveau A1 au niveau C2, dans les conditions du TCF Tout public.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, la boulangerie sera fermée exceptionnellement lundi et mardi. Nous rouvrons mercredi à sept heures. Merci de votre compréhension.",
      prompt: "Quand la boulangerie rouvre-t-elle ?",
      options: ["Mercredi à sept heures", "Lundi à sept heures", "Mardi à midi", "Jeudi à huit heures"],
      correct: "A",
      explanation:
        "L'annonce indique une fermeture lundi et mardi, puis une réouverture mercredi à sept heures.",
    },
    {
      level: "A1",
      category: "transports",
      transcription:
        "Le train à destination de Lyon, départ prévu à quatorze heures trente, partira voie numéro quatre. Les voyageurs sont invités à se rendre sur le quai.",
      prompt: "De quel quai part le train ?",
      options: ["Du quai numéro trois", "Du quai numéro quatre", "Du quai numéro quatorze", "Du quai numéro trente"],
      correct: "B",
      explanation: "L'annonce précise clairement « voie numéro quatre ».",
    },
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Salut, c'est Julie. Je t'invite à dîner samedi soir chez moi, vers vingt heures. Apporte simplement quelque chose à boire.",
      prompt: "Que doit apporter la personne invitée ?",
      options: ["Un dessert", "Une boisson", "Le dîner", "Des fleurs"],
      correct: "B",
      explanation: "Julie demande d'apporter « simplement quelque chose à boire ».",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Bonjour, je vous appelle au sujet de votre rendez-vous chez le dentiste. Celui de jeudi à dix heures est annulé. Nous pouvons vous proposer vendredi à quinze heures trente.",
      prompt: "Quel nouveau rendez-vous est proposé ?",
      options: ["Jeudi à dix heures", "Vendredi à dix heures", "Vendredi à quinze heures trente", "Jeudi à quinze heures"],
      correct: "C",
      explanation: "Le message annonce l'annulation de jeudi et propose vendredi à quinze heures trente.",
    },
    {
      level: "A2",
      category: "météo",
      transcription:
        "Et voici la météo. Ce matin, le ciel reste nuageux avec quelques averses. L'après-midi, le soleil revient et les températures atteignent vingt-deux degrés.",
      prompt: "Quel temps fera-t-il l'après-midi ?",
      options: ["Il pleuvra toute la journée", "Le soleil reviendra", "Il neigera", "Le ciel restera couvert"],
      correct: "B",
      explanation: "Le bulletin annonce le retour du soleil l'après-midi, avec vingt-deux degrés.",
    },
    {
      level: "A2",
      category: "achats",
      transcription:
        "Bonjour, j'ai acheté cette veste hier, mais elle est trop petite. Est-ce que je peux l'échanger contre une taille au-dessus ? — Bien sûr, avec le ticket de caisse.",
      prompt: "Que souhaite faire le client ?",
      options: ["Rendre la veste sans ticket", "Acheter une veste plus chère", "Échanger la veste contre une taille supérieure", "Faire réparer la veste"],
      correct: "C",
      explanation: "Le client demande une taille au-dessus ; le vendeur accepte avec le ticket de caisse.",
    },
    {
      level: "A2",
      category: "orientation",
      transcription:
        "Pour aller à la gare, prenez la deuxième rue à droite après la pharmacie, puis continuez tout droit. La gare se trouve au bout de la rue, en face d'un grand parc.",
      prompt: "Où se trouve la gare ?",
      options: ["Derrière la pharmacie", "Au bout de la rue, face au parc", "À gauche de la mairie", "Dans la deuxième rue à droite"],
      correct: "B",
      explanation: "L'itinéraire se termine au bout de la rue, en face d'un grand parc.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Marie, je dois décaler notre réunion de demain matin. J'ai un rendez-vous client à la même heure. Est-ce que quatorze heures te conviendrait ? Sinon, on peut la reporter à jeudi.",
      prompt: "Pourquoi la réunion doit-elle être décalée ?",
      options: ["Marie est absente", "La salle est occupée", "Un rendez-vous client a lieu au même moment", "Le dossier n'est pas prêt"],
      correct: "C",
      explanation: "La personne explique qu'elle a un rendez-vous client à l'heure prévue de la réunion.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Appartement lumineux de deux pièces, situé au troisième étage sans ascenseur. Cuisine équipée, proche des transports. Le loyer est de sept cent cinquante euros charges comprises. Disponible à partir du premier septembre.",
      prompt: "Quelle information est exacte ?",
      options: ["L'appartement possède un ascenseur", "Le loyer comprend les charges", "L'appartement est au rez-de-chaussée", "La cuisine n'est pas équipée"],
      correct: "B",
      explanation: "L'annonce précise « charges comprises », et mentionne l'absence d'ascenseur.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "La visite guidée commence à dix heures devant l'entrée principale. Elle dure environ une heure et demie. Les groupes sont limités à quinze personnes ; il est donc conseillé de réserver la veille.",
      prompt: "Pourquoi est-il conseillé de réserver ?",
      options: ["La visite est payante", "Le nombre de places est limité", "La visite commence tôt", "L'entrée est fermée la veille"],
      correct: "B",
      explanation: "Les groupes sont limités à quinze personnes, ce qui justifie la réservation.",
    },
    {
      level: "B1",
      category: "loisirs",
      transcription:
        "Votre abonnement mensuel inclut l'accès à la salle de sport et aux cours collectifs, mais pas au sauna. Pour celui-ci, un supplément de cinq euros par séance est demandé.",
      prompt: "Qu'est-ce qui n'est pas inclus dans l'abonnement ?",
      options: ["Les cours collectifs", "La salle de sport", "Le sauna", "L'accès au vestiaire"],
      correct: "C",
      explanation: "Le message précise que le sauna nécessite un supplément de cinq euros.",
    },
    {
      level: "B1",
      category: "vie quotidienne",
      transcription:
        "Excusez-moi, j'habite au-dessous. Depuis quelques jours, j'entends des bruits importants le soir. Est-ce que vous pourriez éviter de déplacer les meubles après vingt-deux heures ?",
      prompt: "Que demande le voisin ?",
      options: ["De déménager rapidement", "De ne plus déplacer les meubles après vingt-deux heures", "De fermer les fenêtres le soir", "De prévenir avant chaque visite"],
      correct: "B",
      explanation: "La demande porte explicitement sur les déplacements de meubles après vingt-deux heures.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Votre candidature nous a impressionnés, notamment votre expérience à l'étranger. En revanche, nous cherchons quelqu'un qui puisse encadrer une équipe dès son arrivée. Accepteriez-vous une formation de trois mois avant de prendre ce poste ?",
      prompt: "Quelle réserve l'employeur exprime-t-il ?",
      options: ["Le candidat n'a pas assez voyagé", "Le candidat devra d'abord être formé à l'encadrement", "Le candidat refuse le poste", "Le candidat manque d'expérience commerciale"],
      correct: "B",
      explanation: "L'employeur propose une formation de trois mois avant la prise de poste, car l'encadrement immédiat pose question.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Le marché de la place centrale attire chaque samedi près de deux mille visiteurs. Pourtant, plusieurs commerçants s'inquiètent : la hausse des loyers pourrait les contraindre à quitter les lieux. La mairie envisage de plafonner les prix.",
      prompt: "Quelle est la principale inquiétude des commerçants ?",
      options: ["La baisse de la fréquentation", "La hausse des loyers", "Les travaux de la place", "La concurrence des supermarchés"],
      correct: "B",
      explanation: "Le reportage indique que la hausse des loyers pourrait les obliger à partir.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "Les nouveaux étudiants sont invités à une réunion d'information mardi prochain. Elle présentera les modalités d'inscription aux examens et les ressources disponibles à la bibliothèque. La présence est fortement recommandée, mais non obligatoire.",
      prompt: "Quel est l'objectif de la réunion ?",
      options: ["Inscrire les étudiants aux cours", "Présenter les examens et les ressources", "Fermer la bibliothèque", "Élire les délégués"],
      correct: "B",
      explanation: "La réunion porte sur les modalités d'examen et les ressources de la bibliothèque.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "En raison de travaux, les trains régionaux circulent avec retard entre huit et dix-sept heures. Un service de bus remplace les trajets supprimés. Les billets restent valables sur l'ensemble du réseau.",
      prompt: "Quelle mesure est mise en place ?",
      options: ["Les billets sont remboursés", "Des bus remplacent les trains supprimés", "Les trains sont gratuits", "La gare ferme toute la journée"],
      correct: "B",
      explanation: "Un service de bus remplace les trajets supprimés pendant les travaux.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "La campagne de vaccination contre la grippe débute lundi dans les pharmacies. Elle s'adresse en priorité aux personnes de plus de soixante-cinq ans et aux professionnels de santé. Aucune ordonnance n'est nécessaire.",
      prompt: "À qui s'adresse en priorité la campagne ?",
      options: ["Aux enfants de moins de douze ans", "Aux personnes âgées et aux soignants", "Aux étudiants uniquement", "Aux personnes sans ordonnance"],
      correct: "B",
      explanation: "Le message cible les plus de soixante-cinq ans et les professionnels de santé.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Notre espace de coworking propose des bureaux à la journée, mais aussi des abonnements mensuels. Les membres bénéficient d'une salle de réunion et d'une connexion haut débit. En revanche, l'accès est interdit après vingt-deux heures pour des raisons de sécurité.",
      prompt: "Quelle restriction s'applique aux membres ?",
      options: ["Ils ne peuvent pas réserver de salle", "Ils n'ont pas accès à Internet", "Ils doivent partir avant vingt-deux heures", "Ils paient chaque journée"],
      correct: "C",
      explanation: "L'accès est interdit après vingt-deux heures, même pour les abonnés.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "La baisse du chômage masque une réalité plus contrastée : si les créations d'emplois se multiplient dans les services, elles concernent souvent des contrats courts et à temps partiel. Les économistes soulignent que la qualité de l'emploi, et non seulement son volume, devrait guider l'évaluation des politiques publiques.",
      prompt: "Quelle nuance l'émission apporte-t-elle aux chiffres du chômage ?",
      options: ["Les emplois créés sont majoritairement stables", "La quantité d'emplois progresse, mais leur qualité reste insuffisante", "Le chômage a augmenté dans tous les secteurs", "Les politiques publiques sont inutiles"],
      correct: "B",
      explanation: "Le propos distingue le volume des créations de leur qualité, souvent précaire.",
    },
    {
      level: "C1",
      category: "littérature",
      transcription:
        "Le roman séduit par sa construction éclatée : chaque chapitre donne la parole à un personnage différent, sans que le lecteur sache immédiatement ce qui les relie. Cette fragmentation, loin d'être gratuite, révèle peu à peu une même blessure familiale. L'auteur évite toutefois le pathos grâce à une ironie constante.",
      prompt: "Quel rôle joue la fragmentation du récit ?",
      options: ["Elle rend l'intrigue plus simple", "Elle dissimule une blessure familiale commune", "Elle supprime toute ironie", "Elle empêche l'identification des personnages"],
      correct: "B",
      explanation: "La critique affirme que la fragmentation révèle progressivement une blessure familiale partagée.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Les chercheurs ont observé que les coraux peuvent s'adapter à une hausse modérée des températures, à condition que celle-ci soit progressive. En revanche, une élévation brutale provoque un blanchissement irréversible. L'étude invite donc à distinguer adaptation et résistance.",
      prompt: "À quelle condition les coraux peuvent-ils s'adapter ?",
      options: ["Si la hausse des températures est progressive", "Si l'eau devient plus froide", "Si les températures augmentent brutalement", "Si le blanchissement est irréversible"],
      correct: "A",
      explanation: "L'étude conditionne l'adaptation à une hausse modérée et progressive de la température.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Mon collègue affirme que la gratuité des transports publics réduirait automatiquement la pollution. Je crains que cette mesure, sans investissement dans les lignes de banlieue, ne profite surtout aux habitants déjà bien desservis. Il ne s'agit pas de rejeter l'idée, mais d'en examiner les conditions.",
      prompt: "Quelle est la position du locuteur ?",
      options: ["Il rejette totalement la gratuité", "Il la juge efficace en toutes circonstances", "Il la conditionne à des investissements dans les banlieues", "Il propose de supprimer les lignes existantes"],
      correct: "C",
      explanation: "Le locuteur ne rejette pas l'idée, mais exige des investissements pour les zones mal desservies.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "L'attention n'est pas une ressource que l'on possède, mais une relation que l'on entretient. À force de la solliciter sans relâche, nous finissons par confondre disponibilité et vigilance. Or, seule la seconde permet de distinguer ce qui mérite d'être retenu de ce qui nous traverse.",
      prompt: "Quelle thèse le conférencier défend-il ?",
      options: ["L'attention est un capital fixe à économiser", "L'attention est une relation à cultiver, distincte de la simple disponibilité", "La vigilance empêche toute disponibilité", "Les sollicitations améliorent la mémoire"],
      correct: "B",
      explanation: "Le conférencier oppose l'attention comme relation à la disponibilité, et valorise la vigilance.",
    },
    {
      level: "C2",
      category: "environnement",
      transcription:
        "Les négociations climatiques achoppent moins sur les objectifs que sur leur répartition. Chaque État accepte de réduire ses émissions, à condition que l'effort soit partagé équitablement. Tant que cette équité restera définie par des indicateurs contestés, les engagements risquent de demeurer des déclarations d'intention.",
      prompt: "Quel est le principal obstacle aux négociations ?",
      options: ["Le refus de réduire les émissions", "Le désaccord sur la répartition équitable des efforts", "L'absence d'objectifs communs", "La suppression des indicateurs"],
      correct: "B",
      explanation: "Les objectifs font consensus, mais leur répartition et les indicateurs d'équité bloquent les accords.",
    },
    {
      level: "C2",
      category: "art",
      transcription:
        "La restauration d'une œuvre ancienne pose un dilemme : restituer l'état d'origine ou assumer les traces du temps. Les partisans de l'intervention minimale rappellent que toute retouche est une interprétation ; leurs adversaires objectent qu'une œuvre illisible cesse d'être transmise. Le débat porte moins sur la technique que sur ce que nous voulons conserver du passé.",
      prompt: "Sur quoi porte réellement le débat selon le critique ?",
      options: ["Sur le coût des techniques de restauration", "Sur le choix de ce que nous voulons transmettre du passé", "Sur la date des œuvres", "Sur l'interdiction de toute retouche"],
      correct: "B",
      explanation: "Le critique conclut que le débat est moins technique que mémoriel : il porte sur ce que l'on conserve du passé.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Elle ___ à la bibliothèque tous les mercredis.",
      options: ["va", "vont", "allons", "allez"],
      correct: "A",
      explanation: "Le sujet « elle » impose la troisième personne du singulier : « elle va ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Il n'y a plus ___ lait dans le réfrigérateur.",
      options: ["de", "du", "des", "le"],
      correct: "A",
      explanation: "Après une négation, l'article partitif « du » devient « de » : « il n'y a plus de lait ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce train est ___ rapide que l'avion : il met deux fois plus de temps.",
      options: ["moins", "aussi", "plus", "tellement"],
      correct: "A",
      explanation: "La seconde proposition indique un temps de trajet supérieur : le train est donc « moins rapide ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Quand je suis arrivé, il ___ depuis une heure.",
      options: ["pleuvait", "a plu", "pleut", "pleuvra"],
      correct: "A",
      explanation: "L'imparfait décrit une action en cours dans le passé : « il pleuvait depuis une heure ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Ces documents, je ___ ai transmis ce matin.",
      options: ["les", "leur", "lui", "en"],
      correct: "A",
      explanation: "« Les » remplace le COD pluriel « ces documents » : « je les ai transmis ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Elle s'intéresse ___ peinture depuis son enfance.",
      options: ["à la", "de la", "pour la", "dans la"],
      correct: "A",
      explanation: "Le verbe « s'intéresser » se construit avec la préposition « à » : « s'intéresser à la peinture ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "La personne ___ m'a aidé travaille dans ce service.",
      options: ["qui", "que", "dont", "où"],
      correct: "A",
      explanation: "« Qui » est sujet du verbe « m'a aidé » ; « que » serait COD.",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Dès qu'il ___ ses études, il cherchera un travail.",
      options: ["aura terminé", "terminera", "a terminé", "terminait"],
      correct: "A",
      explanation: "Après « dès que », l'action antérieure à une action future se met au futur antérieur : « aura terminé ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il faut que tu ___ ce formulaire avant vendredi.",
      options: ["remplisses", "remplis", "rempliras", "remplissais"],
      correct: "A",
      explanation: "« Il faut que » exige le subjonctif présent : « que tu remplisses ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Il a réussi ___ à travailler régulièrement.",
      options: ["grâce à", "à cause de", "malgré", "en raison de"],
      correct: "A",
      explanation: "« Grâce à » exprime une cause favorable, adaptée à une réussite.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Ce roman ___ par des millions de lecteurs l'année dernière.",
      options: ["a été lu", "a lu", "est lu", "lisait"],
      correct: "A",
      explanation: "Le complément d'agent « par des millions de lecteurs » impose la voix passive au passé composé : « a été lu ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ attention, il a évité l'accident.",
      options: ["En faisant", "Faisant", "Ayant fait", "Faire"],
      correct: "A",
      explanation: "Le gérondif exprime la manière et se forme avec « en » : « en faisant attention ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Elle m'a demandé si je ___ venir le lendemain.",
      options: ["pouvais", "peux", "pourrai", "puisse"],
      correct: "A",
      explanation: "Au discours indirect au passé, le présent « peux » devient « pouvais ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "Les collègues avec ___ je travaille sont sympathiques.",
      options: ["lesquels", "qui", "que", "dont"],
      correct: "A",
      explanation: "Après « avec », on emploie le pronom relatif composé « lesquels », accordé avec « collègues ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "Rarement ___ une telle mobilisation.",
      options: ["a-t-on vu", "on a vu", "a vu on", "on a-t-il vu"],
      correct: "A",
      explanation: "L'inversion du sujet est obligatoire après « rarement » en tête de phrase : « a-t-on vu ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ de ce projet nécessite des moyens considérables.",
      options: ["mise en œuvre", "mettre en œuvre", "mis en œuvre", "en œuvre"],
      correct: "A",
      explanation: "Le nom correspondant au verbe « mettre en œuvre » est « la mise en œuvre ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Si elle ___ plus tôt, elle aurait pu éviter ce problème.",
      options: ["était arrivée", "arrivait", "est arrivée", "arriverait"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé associe le plus-que-parfait à un conditionnel passé : « si elle était arrivée ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Il a ___ son argumentation en s'appuyant sur des données récentes.",
      options: ["étayé", "étalé", "étendu", "écarté"],
      correct: "A",
      explanation: "« Étayer » signifie appuyer une argumentation sur des preuves ; les autres verbes ne conviennent pas ici.",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "À peine ___ -il terminé son discours que la salle applaudit.",
      options: ["eut", "a", "avait", "fut"],
      correct: "A",
      explanation: "Le passé simple « eut terminé » marque l'antériorité immédiate dans un récit au passé simple.",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "___ les difficultés rencontrées, le projet a été mené à terme.",
      options: ["Malgré", "Bien que", "Quoique", "Parce que"],
      correct: "A",
      explanation: "« Malgré » introduit un nom (« les difficultés »), alors que « bien que » et « quoique » exigent un verbe conjugué.",
    },
  ],
  reading: [
    {
      title: "La médiathèque",
      text:
        "La médiathèque ouvre du mardi au samedi, de dix heures à dix-huit heures. L'inscription est gratuite pour les habitants. Les documents s'empruntent pour trois semaines, à raison de cinq ouvrages par personne. Une boîte de retour est accessible jour et nuit.",
      question: {
        level: "B1",
        prompt: "Pendant combien de temps peut-on emprunter un document ?",
        options: ["Une semaine", "Deux semaines", "Trois semaines", "Un mois"],
        correct: "C",
        explanation: "Le règlement indique un prêt de trois semaines, limité à cinq ouvrages par personne.",
      },
    },
    {
      title: "Randonnée au lac Bleu",
      text:
        "Le club propose une sortie dimanche au lac Bleu. Départ à huit heures devant la mairie. Le parcours de douze kilomètres convient aux débutants. Prévoyez des chaussures adaptées et un pique-nique. En cas de pluie, la sortie est reportée au dimanche suivant.",
      question: {
        level: "B1",
        prompt: "Que se passe-t-il s'il pleut ?",
        options: ["La sortie est annulée", "La sortie est reportée d'une semaine", "Le parcours est raccourci", "Le départ est avancé"],
        correct: "B",
        explanation: "Le texte prévoit un report au dimanche suivant en cas de pluie.",
      },
    },
    {
      title: "Nouveau tri des déchets",
      text:
        "À partir de janvier, les bacs jaunes accueilleront tous les emballages. Les habitants n'auront plus à séparer les pots de yaourt des barquettes. Le verre devra toutefois rester dans les conteneurs spécifiques. Un guide sera distribué dans chaque foyer.",
      question: {
        level: "B1",
        prompt: "Quel déchet ne va pas dans le bac jaune ?",
        options: ["Les pots de yaourt", "Les barquettes", "Le verre", "Les emballages en carton"],
        correct: "C",
        explanation: "Le verre conserve son conteneur spécifique, même après l'extension du bac jaune.",
      },
    },
    {
      title: "Atelier de cuisine",
      text:
        "La maison de quartier propose un atelier de cuisine le samedi matin. Il apprend à préparer des plats simples avec des produits de saison. L'activité est gratuite, mais seules douze personnes peuvent y participer. L'inscription se fait à l'accueil.",
      question: {
        level: "B1",
        prompt: "Pourquoi faut-il s'inscrire à l'accueil ?",
        options: ["Pour payer l'atelier", "Parce que le nombre de places est limité", "Pour choisir le menu", "Parce que l'atelier est réservé aux chefs"],
        correct: "B",
        explanation: "L'atelier est gratuit mais limité à douze participants, d'où l'inscription obligatoire.",
      },
    },
    {
      title: "Nouveaux horaires de bus",
      text:
        "À compter du 1er octobre, la ligne 12 desservira l'hôpital toutes les vingt minutes. Le dernier départ aura lieu à vingt et une heures trente. Les abonnements mensuels restent valables. Les horaires détaillés sont affichés aux arrêts et disponibles en ligne.",
      question: {
        level: "B1",
        prompt: "Quel changement annonce le document ?",
        options: ["La suppression de la ligne 12", "Une fréquence de passage toutes les vingt minutes", "La fin des abonnements mensuels", "Un départ unique à vingt et une heures"],
        correct: "B",
        explanation: "La ligne desservira désormais l'hôpital toutes les vingt minutes.",
      },
    },
    {
      title: "Télétravail : au-delà de l'engouement",
      text: p(
        "Longtemps présenté comme une facilité, le télétravail s'est installé durablement. Les salariés y gagnent des trajets et une meilleure maîtrise de leur temps ; les entreprises réduisent leurs coûts immobiliers.",
        "Pourtant, les études nuancent ce bilan. La productivité progresse sur les tâches isolées, mais recule quand la coopération devient centrale. Les échanges informels, décisifs pour l'innovation, souffrent de la distance.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite du télétravail le texte met-il en évidence ?",
        options: ["La baisse systématique de la productivité individuelle", "La diminution de la coopération et des échanges informels", "La hausse des coûts immobiliers des entreprises", "L'impossibilité de recruter à distance"],
        correct: "B",
        explanation: "Le texte souligne que la coopération et les échanges informels, essentiels à l'innovation, souffrent du travail à distance.",
      },
    },
    {
      title: "Gaspillage alimentaire : agir à la source",
      text: p(
        "Chaque année, des millions de tonnes d'aliments sont jetées, alors que les banques alimentaires peinent à répondre à la demande. La restauration collective et la grande distribution y contribuent largement.",
        "Les campagnes de sensibilisation misent sur les gestes individuels. Leur efficacité reste modeste : elles ignorent les formats imposés par les industriels, et un yaourt vendu par lots de seize se gâte souvent avant d'être consommé.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les campagnes de sensibilisation ont-elles une efficacité limitée ?",
        options: ["Elles coûtent trop cher aux municipalités", "Elles négligent les formats imposés par les industriels", "Elles ne s'adressent qu'aux restaurants", "Elles augmentent les quantités produites"],
        correct: "B",
        explanation: "Le texte explique que les campagnes se concentrent sur les gestes individuels sans agir sur les formats de vente.",
      },
    },
    {
      title: "Les musées tentent la nuit",
      text: p(
        "Plusieurs musées ouvrent désormais en soirée face à une fréquentation qui stagne. L'initiative séduit un public jeune, empêché par les horaires de travail, et des visiteurs qui évitent les foules du week-end.",
        "Le succès n'est pas automatique : une nocturne coûte cher en personnel et en sécurité. Les conservateurs rappellent surtout qu'elle ne remplace pas la médiation culturelle, seule capable de fidéliser le public.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle réserve les conservateurs expriment-ils ?",
        options: ["Les nocturnes dégradent les œuvres", "Les nocturnes ne remplacent pas un travail de médiation", "Le public jeune est trop nombreux", "Les concerts détournent l'attention des tableaux"],
        correct: "B",
        explanation: "Ils considèrent que l'ouverture en soirée ne peut se substituer à la médiation culturelle nécessaire pour fidéliser le public.",
      },
    },
    {
      title: "Le sport sur ordonnance",
      text: p(
        "Depuis quelques années, certains médecins peuvent prescrire une activité physique aux patients atteints de maladies chroniques. L'objectif est de réduire les symptômes et les médicaments, avec l'aide d'éducateurs formés.",
        "Les résultats sont encourageants pour le diabète de type 2 et l'hypertension. Le dispositif reste pourtant inégal : les zones rurales manquent de structures, et le coût de l'abonnement freine les foyers modestes.",
      ),
      question: {
        level: "B2",
        prompt: "Quel obstacle au dispositif est mentionné ?",
        options: ["L'absence de bénéfices cliniques", "Les inégalités territoriales et le coût pour les patients", "Le refus des éducateurs sportifs", "La suppression du suivi médical"],
        correct: "B",
        explanation: "Le texte pointe le manque de structures en zone rurale et le coût de l'abonnement pour les ménages modestes.",
      },
    },
    {
      title: "Logement étudiant : la pénurie",
      text: p(
        "À chaque rentrée, des milliers d'étudiants cherchent un logement. La demande dépasse l'offre des résidences publiques, et les loyers du parc privé augmentent. Certains acceptent plus d'une heure de trajet.",
        "Les collectivités transforment des bureaux vacants en studios, mais les normes et les délais ralentissent ces conversions. Les associations plaident pour une planification pluriannuelle plutôt que des mesures d'urgence.",
      ),
      question: {
        level: "B2",
        prompt: "Que reprochent les associations aux pouvoirs publics ?",
        options: ["De construire trop de résidences", "De réagir trop tardivement, sans planification", "De privilégier les logements chez les particuliers", "D'augmenter les loyers du parc privé"],
        correct: "B",
        explanation: "Les associations réclament une planification pluriannuelle plutôt que des mesures d'urgence prises au dernier moment.",
      },
    },
    {
      title: "Données personnelles : le consentement en question",
      text: p(
        "Le consentement est le pilier de la protection des données personnelles. Avant de collecter une information, les sites doivent obtenir l'accord explicite de l'internaute. Dans les faits, des bandeaux volontairement complexes rendent cet accord presque automatique.",
        "Les autorités ont sanctionné des plateformes qui rendent le refus plus difficile que l'acceptation. Certaines associations réclament l'interdiction du pistage publicitaire.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle critique est adressée aux bandeaux de consentement ?",
        options: ["Ils sont trop faciles à refuser", "Ils rendent le refus plus difficile que l'acceptation", "Ils interdisent toute publicité", "Ils augmentent les revenus des associations"],
        correct: "B",
        explanation: "Le texte dénonce des bandeaux complexes qui découragent le refus et favorisent l'acceptation.",
      },
    },
    {
      title: "Santé mentale des jeunes actifs",
      text: p(
        "Les entreprises constatent une hausse des arrêts de travail liés à l'épuisement professionnel. Les jeunes actifs sont particulièrement concernés, surtout lorsqu'ils cumulent emploi précaire et charge familiale.",
        "Les psychologues insistent sur les causes collectives : objectifs irréalistes, manque d'autonomie, frontières floues entre vie professionnelle et vie privée. Ils recommandent d'agir sur l'organisation plutôt que sur les individus.",
      ),
      question: {
        level: "B2",
        prompt: "Que recommandent les psychologues du travail ?",
        options: ["Davantage d'applications de bien-être", "Agir sur l'organisation du travail", "Réduire le nombre de salariés", "Supprimer le droit à la déconnexion"],
        correct: "B",
        explanation: "Ils estiment que les causes sont collectives et préconisent de modifier l'organisation plutôt que de responsabiliser les individus.",
      },
    },
    {
      title: "Tourisme : la quête du hors-saison",
      text: p(
        "Les destinations touristiques cherchent à étaler les visites sur l'année pour limiter la surcharge estivale. Les campagnes vantent les paysages d'automne afin de maintenir l'emploi dans les régions dépendantes.",
        "Le succès reste contrasté : les vacances scolaires structurent les départs, et les compagnies aériennes adaptent leur offre à l'été. Sans transports moins chers hors saison, les voyageurs hésitent à décaler leur séjour.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les campagnes hors saison ont-elles un succès limité ?",
        options: ["Les paysages sont moins beaux", "Les vacances scolaires et le prix des transports pèsent sur les choix", "Les habitants refusent les touristes", "Les événements culturels sont interdits en hiver"],
        correct: "B",
        explanation: "Le texte cite le calendrier scolaire et le coût des transports hors saison comme freins principaux.",
      },
    },
    {
      title: "Lecture numérique : le retour du papier",
      text: p(
        "Les liseuses électroniques avaient annoncé la fin du livre papier. Pourtant, les ventes de livres imprimés résistent, y compris chez les jeunes lecteurs.",
        "Les chercheurs expliquent ce phénomène : la lecture sur écran favorise la consultation rapide mais nuit à la mémorisation des textes longs. Le papier aiderait à se repérer et à construire une compréhension globale. Les usages se différencient donc.",
      ),
      question: {
        level: "B2",
        prompt: "Quel avantage du papier le texte souligne-t-il ?",
        options: ["Il est moins cher que le numérique", "Il favorise la mémorisation et la compréhension des textes longs", "Il permet de consulter rapidement des informations", "Il remplace désormais toutes les liseuses"],
        correct: "B",
        explanation: "Le texte indique que la matérialité du papier aide à se repérer et à construire une compréhension globale, contrairement à la lecture rapide sur écran.",
      },
    },
    {
      title: "Bénévolat : un engagement qui change de visage",
      text: p(
        "Les associations peinent à renouveler leurs bénévoles. Les engagements longs attirent moins que les missions ponctuelles : les jeunes préfèrent quelques heures sur un projet précis à un engagement long.",
        "Ce changement bouscule les modèles associatifs. Les structures doivent découper leurs activités en tâches courtes. Les chercheurs y voient moins un désengagement qu'une transformation des formes de participation.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les chercheurs interprètent-ils l'évolution du bénévolat ?",
        options: ["Comme un abandon progressif de l'engagement", "Comme une transformation des formes de participation", "Comme une baisse générale de la disponibilité", "Comme un refus de travailler en binôme"],
        correct: "B",
        explanation: "Ils estiment que la disponibilité demeure, mais que les modalités d'engagement changent.",
      },
    },
    {
      title: "Intelligence artificielle et emploi : la complémentarité",
      text: p(
        "Les débats sur l'intelligence artificielle opposent deux récits : la substitution de la main-d'œuvre et l'augmentation pure des capacités humaines. Les observations suggèrent une réalité plus nuancée, faite de recompositions.",
        "Dans les professions juridiques, les outils génératifs rédigent des synthèses documentaires. Les juristes ne disparaissent pas, mais leur valeur se déplace vers l'analyse stratégique et la relation au client. Les compétences d'interprétation deviennent décisives.",
        "Cette recomposition exige des formations continues et une reconnaissance des compétences acquises. Les entreprises qui déploient des outils sans repenser l'organisation obtiennent des gains limités. L'enjeu n'est donc pas de savoir si l'intelligence artificielle remplacera les emplois, mais dans quelles conditions les travailleurs pourront se les approprier.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle idée principale l'auteur défend-il ?",
        options: ["L'intelligence artificielle supprimera la plupart des emplois", "La question décisive est celle des conditions d'appropriation des outils", "Les gains de productivité sont toujours partagés équitablement", "Les formations continues sont inutiles face à l'automatisation"],
        correct: "B",
        explanation: "L'auteur dépasse l'alternative substitution/augmentation et place l'enjeu sur l'appropriation et l'encadrement institutionnel de la transition.",
      },
    },
    {
      title: "Villes et chaleur : repenser l'ombre",
      text: p(
        "Les épisodes de chaleur révèlent des inégalités que les politiques urbaines ont longtemps ignorées. Dans les quartiers denses, les températures nocturnes restent élevées, empêchant les habitants de récupérer. Les logements mal isolés deviennent des pièges thermiques.",
        "Les solutions techniques existent : végétalisation, revêtements clairs, ventilation. Mais leur efficacité dépend d'un projet d'ensemble. Quelques arbres isolés ne suffisent pas si les sols restent imperméables et si aucune continuité ombragée ne relie les espaces publics.",
        "La justice sociale est centrale : les quartiers les plus exposés sont souvent les moins dotés en espaces verts, et une politique limitée aux centres historiques profiterait aux plus privilégiés. Les « rues scolaires » créent des précédents, mais leur généralisation suppose des choix budgétaires.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi l'auteur insiste-t-il sur la justice sociale ?",
        options: ["Parce que les solutions techniques sont inefficaces", "Parce que les quartiers les plus exposés sont aussi les moins dotés", "Parce que les centres historiques manquent d'arbres", "Parce que les habitants refusent la végétalisation"],
        correct: "B",
        explanation: "L'auteur souligne que les populations les plus vulnérables à la chaleur cumulent absence d'espaces verts et éloignement des services.",
      },
    },
    {
      title: "Archives et mémoire : ce que l'on choisit d'oublier",
      text: p(
        "Les archives ne conservent pas tout. Derrière l'apparente neutralité des rayonnages se jouent des choix sur ce qui mérite d'être gardé. Le silence des sources n'est pas toujours accidentel : il peut résulter de décisions administratives ou de négligences.",
        "La numérisation bouleverse ces équilibres. Elle ouvre des fonds autrefois réservés aux spécialistes, mais crée de nouvelles dépendances : les documents non numérisés risquent l'oubli pratique, faute de visibilité.",
        "Les archivistes affrontent aussi la masse des documents nativement numériques. Leur conservation exige des moyens et une sélection rigoureuse, car tout garder sans hiérarchie revient à ne plus rien rendre intelligible. La mémoire collective suppose donc des institutions capables d'expliquer leurs critères.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque la numérisation fait-elle peser sur les fonds non numérisés ?",
        options: ["Ils sont détruits par les archivistes", "Ils peuvent tomber dans un oubli pratique faute de visibilité", "Ils perdent toute valeur historique", "Ils deviennent accessibles aux seuls spécialistes"],
        correct: "B",
        explanation: "Le texte explique que les documents non numérisés, moins visibles, risquent l'oubli pratique indépendamment de leur valeur.",
      },
    },
    {
      title: "Médias : reconstruire la confiance",
      text: p(
        "La défiance à l'égard des médias change de nature. Autrefois concentrée sur quelques titres, elle vise désormais l'ensemble des institutions informationnelles. Les réseaux sociaux l'amplifient en donnant l'impression que toute parole se vaut.",
        "Les rédactions ont multiplié les dispositifs de vérification et de transparence : sources publiées, corrections expliquées, méthodes ouvertes. Ces efforts sont nécessaires, mais la confiance ne se décrète pas ; elle se construit dans l'expérience concrète du lecteur.",
        "Certains proposent de renforcer l'éducation aux médias dès l'école, d'autres la responsabilité des plateformes. Le paradoxe est que l'information n'a jamais été aussi accessible, alors que le sentiment de ne plus pouvoir s'y fier progresse. La réponse consiste à rendre visible le travail qui rend une information crédible.",
      ),
      question: {
        level: "C1",
        prompt: "Comment l'auteur envisage-t-il la restauration de la confiance ?",
        options: ["Par le retour à une autorité médiatique unique", "En rendant visible le travail de fabrication de l'information", "En supprimant les réseaux sociaux", "En interdisant toute correction publique"],
        correct: "B",
        explanation: "La conclusion écarte le retour à une autorité perdue et prône la transparence sur le processus de crédibilisation.",
      },
    },
    {
      title: "Biodiversité : les corridors comme infrastructure",
      text: p(
        "La protection de la biodiversité a longtemps reposé sur des espaces délimités : réserves, parcs, zones protégées. Or les espèces ne respectent pas ces frontières. Pour se reproduire, migrer ou trouver de nouvelles ressources, elles doivent circuler.",
        "Les corridors écologiques répondent à cette exigence : des bandes de terrain qui relient les habitats, sous forme de haies, de passages à faune ou de berges préservées. Ils réduisent la fragmentation causée par les routes et l'urbanisation.",
        "Leur mise en œuvre se heurte à des conflits d'usage, car un corridor traverse parfois des terres agricoles. Les expériences réussies montrent que la concertation locale est déterminante : lorsque les agriculteurs sont associés et rémunérés, l'acceptation progresse et la biodiversité devient un élément de l'aménagement.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle condition favorise l'acceptation des corridors écologiques ?",
        options: ["Leur imposition par décret", "L'association et la rémunération des agriculteurs concernés", "Leur concentration dans les réserves existantes", "La suppression des zones constructibles"],
        correct: "B",
        explanation: "Le texte indique que la concertation et la rémunération des agriculteurs font progresser l'acceptation.",
      },
    },
    {
      title: "L'attention comme relation",
      text: p(
        "Nous parlons de notre attention comme d'une ressource : nous la « perdons », nous la « récupérons ». Ce vocabulaire économique trahit une conception particulière, celle d'un stock fini que chacun posséderait et dont il devrait gérer la dépense.",
        "Cette représentation a des effets pratiques. Elle justifie les techniques de « gestion de l'attention », qui promettent de répartir un capital supposé stable, et incline à considérer les sollicitations extérieures comme une concurrence à laquelle il suffirait d'opposer de la discipline individuelle.",
        "Or l'attention n'est peut-être pas un stock, mais une relation. Elle se construit dans l'échange avec un objet, un texte, une personne. Un environnement pauvre en relief produit une attention pauvre, quelle que soit la discipline du sujet. Cette perspective déplace la responsabilité : une société qui multiplie les sollicitations sans offrir de lieux où s'attarder ne peut se contenter de demander aux individus de mieux se concentrer.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle conséquence politique l'auteur tire-t-il de sa thèse ?",
        options: ["La concentration ne dépend que de la volonté individuelle", "Les conditions matérielles et culturelles de l'attention engagent la société", "Il faut supprimer toute sollicitation extérieure", "La disponibilité est supérieure à la vigilance"],
        correct: "B",
        explanation: "L'auteur déplace la responsabilité vers les conditions collectives, sans nier l'effort individuel.",
      },
    },
    {
      title: "La langue entre norme et innovation",
      text: p(
        "Les langues sont souvent décrites comme des systèmes stables, dont les règles garantiraient l'intelligibilité. Cette image masque une réalité plus dynamique : toute langue vivante est le théâtre d'innovations portées par des usages locaux, des groupes sociaux ou des technologies. Les puristes y voient une corruption et rappellent la nécessité d'une norme commune.",
        "Mais la norme elle-même est une construction historique. Ce que nous appelons « bon usage » résulte de choix institutionnels, scolaires et éditoriaux, souvent liés à des rapports de force. Des formes longtemps stigmatisées se sont imposées, d'autres ont disparu sans que leur valeur cognitive soit en cause.",
        "La question n'est donc pas d'accepter ou de refuser les innovations, mais de les décrire et de les évaluer. Une langue ne meurt pas de changer ; elle meurt de ne plus être transmise. La vigilance normative a du sens si elle protège cette transmission, et non si elle la décourage.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle est la position finale de l'auteur sur la norme linguistique ?",
        options: ["Elle doit être abolie au profit des usages", "Elle est utile si elle protège la transmission de la langue", "Elle est toujours le produit d'une corruption", "Elle empêche toute innovation syntaxique"],
        correct: "B",
        explanation: "L'auteur conditionne la légitimité de la norme à sa capacité à favoriser la transmission, non à freiner les usages.",
      },
    },
    {
      title: "Inégalités : mesurer ce qui compte",
      text: p(
        "Le revenu moyen d'un pays ne dit presque rien de la vie de ses habitants. Deux sociétés peuvent afficher des chiffres comparables tout en offrant des conditions d'existence différentes. C'est pourquoi les économistes ont développé des indicateurs intégrant la santé, l'éducation ou l'environnement.",
        "Ces indicateurs ont leurs limites : ils agrègent des dimensions hétérogènes et reposent sur des pondérations discutables. Donner plus de poids à l'espérance de vie qu'au niveau de diplôme implique une conception de ce qui compte dans une vie humaine.",
        "La mesure des inégalités soulève un problème analogue. Le coefficient de Gini résume la répartition des revenus en un seul nombre, mais ne dit rien de la nature des écarts : une société où les plus riches sont très riches et une société où les plus pauvres sont très pauvres peuvent afficher le même coefficient. Les chercheurs plaident donc pour une approche plurielle, rendant visibles les arbitrages au lieu d'un chiffre définitif.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi le coefficient de Gini est-il jugé insuffisant ?",
        options: ["Il ne mesure que la santé et l'éducation", "Il ne distingue pas la nature des écarts de revenus", "Il est trop difficile à calculer", "Il favorise les politiques publiques"],
        correct: "B",
        explanation: "Le texte explique qu'un même coefficient peut recouvrir des situations très différentes selon que les écarts viennent du haut ou du bas de la distribution.",
      },
    },
    {
      title: "Restaurer sans effacer le temps",
      text: p(
        "La restauration d'une œuvre ne se réduit jamais à un geste technique. Elle engage une conception du temps, de l'authenticité et de la transmission. Faut-il restituer l'état supposé d'origine, quitte à effacer les traces de l'histoire, ou préserver celles-ci comme une part de l'œuvre ?",
        "Les partisans de l'intervention minimale défendent la seconde option : toute retouche est une interprétation, et celle d'un restaurateur n'a pas plus de légitimité que celle d'un historien. Leurs adversaires objectent qu'une œuvre illisible cesse d'être transmise : une peinture noircie ne remplit plus sa fonction esthétique.",
        "Le débat est compliqué par l'absence de critère universel, car ce qui constitue une « trace du temps » varie selon les cultures. Les techniques numériques offrent des compromis, mais ne tranchent pas la question de valeur : elles en rendent les termes plus explicites. Une restauration réussie est donc celle qui rend compréhensibles les choix effectués.",
      ),
      question: {
        level: "C2",
        prompt: "En quoi les techniques numériques modifient-elles le débat selon l'auteur ?",
        options: ["Elles imposent une vérité définitive sur l'état d'origine", "Elles rendent les termes du choix plus explicites sans le résoudre", "Elles suppriment la nécessité de restaurer les œuvres", "Elles effacent les traces du temps"],
        correct: "B",
        explanation: "L'auteur précise que les compromis numériques ne tranchent pas la question de valeur mais explicitent les alternatives.",
      },
    },
    {
      title: "L'incertitude, moteur de la science",
      text: p(
        "La science est souvent présentée comme un corpus de certitudes. Les scientifiques travaillent pourtant avec des hypothèses provisoires, des marges d'erreur et des résultats révisables. L'incertitude n'est pas un défaut à éliminer, mais une condition du raisonnement.",
        "Elle oblige à distinguer ce qui est établi de ce qui est plausible et à expliciter les limites d'une conclusion. Les modèles climatiques, par exemple, projettent des évolutions assorties d'intervalles, car l'avenir dépend de choix et de variables non entièrement connues. Dans le débat public, l'incertitude devient alors un argument de scepticisme.",
        "Or un désaccord sur les détails n'implique pas l'absence de consensus sur l'essentiel. Une position informée reconnaît à la fois la solidité des acquis et la prudence sur les marges. La science ne promet donc pas l'absence de doute ; elle propose une méthode pour traiter le doute collectivement, en le soumettant à la critique et à l'épreuve des faits.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle confusion l'auteur dénonce-t-il dans le débat public ?",
        options: ["Confondre désaccord sur les détails et absence de consensus sur l'essentiel", "Confondre science et politique", "Confondre modèles et observations", "Confondre incertitude et ignorance totale"],
        correct: "A",
        explanation: "L'auteur explique que les désaccords sur les marges sont utilisés à tort pour nier le consensus sur les conclusions principales.",
      },
    },
  ],
});
