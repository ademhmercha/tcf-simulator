import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 10.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_10 = defineFullTest({
  number: 10,
  description:
    "Dixième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, l'école Jean-Moulin fermera exceptionnellement à quinze heures aujourd'hui, en raison d'une panne de chauffage. Merci de venir chercher votre enfant à l'entrée principale.",
      prompt: "Pourquoi l'école ferme-t-elle plus tôt ?",
      options: [
        "À cause d'une panne de chauffage",
        "Pour une journée pédagogique",
        "À cause d'une grève des enseignants",
        "Pour des travaux de peinture",
      ],
      correct: "A",
      explanation:
        "Le message annonce une fermeture à quinze heures causée par une panne de chauffage.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Le petit marché de la rue des Roses a lieu dimanche matin, de huit heures à treize heures. Vous y trouverez des fruits, des légumes et du fromage de la région.",
      prompt: "Que vend-on à ce marché ?",
      options: [
        "Des fruits, des légumes et du fromage",
        "Des vêtements et des chaussures",
        "Des livres et des journaux",
        "Des meubles anciens",
      ],
      correct: "A",
      explanation:
        "L'annonce cite explicitement les fruits, les légumes et le fromage de la région.",
    },
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Salut, c'est Paul. Je pars en vacances samedi. Peux-tu arroser mes plantes mardi et jeudi ? Les clés sont chez la gardienne.",
      prompt: "Que doit faire la personne pendant l'absence de Paul ?",
      options: [
        "Arroser les plantes",
        "Nourrir le chat",
        "Sortir les poubelles",
        "Garder les clés chez elle",
      ],
      correct: "A",
      explanation:
        "Paul demande seulement d'arroser ses plantes mardi et jeudi ; les clés restent chez la gardienne.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Bonjour, la livraison de votre canapé aura lieu jeudi entre quatorze et seize heures. Merci de libérer le couloir et de prévenir le gardien de votre immeuble.",
      prompt: "Que doit faire le client avant la livraison ?",
      options: [
        "Libérer le couloir",
        "Payer la livraison en espèces",
        "Changer la date du rendez-vous",
        "Démonter la porte d'entrée",
      ],
      correct: "A",
      explanation:
        "Le livreur demande de libérer le couloir et de prévenir le gardien pour faciliter le passage.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Pour votre prise de sang de demain matin, venez à jeun et apportez votre carte Vitale. Le laboratoire ouvre à sept heures trente.",
      prompt: "Que doit faire le patient avant la prise de sang ?",
      options: [
        "Venir à jeun",
        "Boire beaucoup d'eau",
        "Prendre ses médicaments",
        "Apporter une ordonnance",
      ],
      correct: "A",
      explanation:
        "Le message exige de venir à jeun et de présenter sa carte Vitale ; l'ordonnance n'est pas demandée.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "À l'occasion de la fête du village, le parking de la mairie sera gratuit samedi. Le stationnement sera toutefois limité à deux heures.",
      prompt: "Quelle règle s'appliquera au parking samedi ?",
      options: [
        "Le stationnement sera limité à deux heures",
        "Le parking sera réservé aux habitants",
        "Le stationnement sera interdit toute la journée",
        "Il faudra payer une taxe à l'entrée",
      ],
      correct: "A",
      explanation:
        "Le parking devient gratuit, mais la durée de stationnement est plafonnée à deux heures.",
    },
    {
      level: "A2",
      category: "achats",
      transcription:
        "Votre commande est arrivée. Vous avez quatorze jours pour la retourner gratuitement en magasin. Le bon de retour se trouve à l'intérieur du colis.",
      prompt: "Combien de temps le client a-t-il pour retourner l'article ?",
      options: ["Quatorze jours", "Sept jours", "Un mois", "Trois jours"],
      correct: "A",
      explanation:
        "Le message accorde quatorze jours pour effectuer un retour gratuit en magasin.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "À partir de janvier, la mutuelle de l'entreprise change de prestataire. Les cartes actuelles restent valables jusqu'au 31 décembre. Une réunion d'information aura lieu jeudi à midi.",
      prompt: "Que se passera-t-il en janvier ?",
      options: [
        "La mutuelle changera de prestataire",
        "Les salariés perdront leur couverture",
        "Les cartes seront supprimées en décembre",
        "La réunion sera reportée",
      ],
      correct: "A",
      explanation:
        "Le changement de prestataire intervient en janvier ; les cartes actuelles restent valables jusqu'à la fin décembre.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Le propriétaire demande aux locataires de ne pas utiliser leur balcon pendant le ravalement. Les échafaudages seront installés lundi et retirés trois semaines plus tard.",
      prompt: "Que doivent éviter les locataires pendant trois semaines ?",
      options: [
        "Utiliser leur balcon",
        "Ouvrir les fenêtres",
        "Stationner devant l'immeuble",
        "Sortir par l'entrée principale",
      ],
      correct: "A",
      explanation:
        "L'installation des échafaudages impose de ne pas utiliser les balcons pendant toute la durée du chantier.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "Le théâtre propose des places à tarif réduit pour les moins de vingt-six ans. Elles sont vendues une heure avant le spectacle, uniquement au guichet et sur présentation d'une pièce d'identité.",
      prompt: "Comment bénéficier du tarif réduit ?",
      options: [
        "Au guichet, avec une pièce d'identité",
        "Par téléphone, la veille",
        "Sur Internet, avec une carte bancaire",
        "À l'entrée, sans justificatif",
      ],
      correct: "A",
      explanation:
        "Le tarif réduit est vendu au guichet, une heure avant, sur présentation d'une pièce d'identité.",
    },
    {
      level: "B1",
      category: "études",
      transcription:
        "Les inscriptions aux examens de langue sont ouvertes jusqu'au quinze avril. Les étudiants doivent fournir une photo et régler les frais auprès du secrétariat.",
      prompt: "Quelles démarches les étudiants doivent-ils accomplir ?",
      options: [
        "Fournir une photo et payer au secrétariat",
        "Envoyer un courriel au professeur",
        "S'inscrire en ligne sans justificatif",
        "Attendre la fin du semestre",
      ],
      correct: "A",
      explanation:
        "L'inscription exige une photo et le paiement des frais directement auprès du secrétariat.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La ville organise samedi une opération de nettoyage des berges. Les bénévoles se retrouvent à neuf heures au pont. Des gants et des sacs sont fournis, mais il faut porter des chaussures fermées.",
      prompt: "Quelle consigne vestimentaire est donnée aux bénévoles ?",
      options: [
        "Porter des chaussures fermées",
        "Porter des gants de jardinage",
        "Apporter des sacs poubelle",
        "Prévoir une collation pour le groupe",
      ],
      correct: "A",
      explanation:
        "Les gants et les sacs sont fournis ; seule une paire de chaussures fermées est demandée aux bénévoles.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "La direction a décidé de supprimer les réunions du lundi matin. Elle souhaite que les équipes consacrent ce créneau à la préparation de la semaine. Les salariés devront toutefois transmettre un point écrit avant midi.",
      prompt: "Pourquoi la direction supprime-t-elle ces réunions ?",
      options: [
        "Pour libérer du temps de préparation",
        "Pour réduire le nombre de salariés",
        "Pour supprimer le travail écrit",
        "Pour allonger les horaires de travail",
      ],
      correct: "A",
      explanation:
        "La direction remplace la réunion par un temps de préparation, tout en exigeant un point écrit avant midi.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les urgences de l'hôpital reçoivent un nombre croissant de patients pour des motifs qui pourraient être traités par un médecin généraliste. La direction ouvre donc une permanence le soir, sur rendez-vous, afin de désengorger le service.",
      prompt: "Pourquoi la permanence du soir est-elle créée ?",
      options: [
        "Pour réduire l'affluence aux urgences",
        "Pour remplacer les cabinets privés",
        "Pour accueillir uniquement les enfants",
        "Pour fermer les urgences la nuit",
      ],
      correct: "A",
      explanation:
        "La permanence doit prendre en charge les cas non urgents et ainsi désengorger le service des urgences.",
    },
    {
      level: "B2",
      category: "consommation",
      transcription:
        "Une étude montre que les consommateurs lisent davantage les étiquettes lorsqu'elles sont placées en face avant des produits. Les industriels ont donc commencé à y déplacer les informations nutritionnelles, sans toujours en améliorer la clarté.",
      prompt: "Quel effet la position de l'étiquette produit-elle ?",
      options: [
        "Elle attire davantage l'attention des consommateurs",
        "Elle garantit une meilleure qualité nutritionnelle",
        "Elle réduit le prix des produits",
        "Elle remplace les mentions obligatoires",
      ],
      correct: "A",
      explanation:
        "Les informations placées en face avant sont plus lues, même si leur clarté n'est pas toujours améliorée.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Les petits commerces de proximité résistent mieux dans les quartiers où les habitants marchent régulièrement. La présence d'écoles et de transports publics favorise en effet les passages quotidiens.",
      prompt: "Qu'est-ce qui soutient les commerces de proximité ?",
      options: [
        "Les passages quotidiens liés aux écoles et aux transports",
        "La hausse des loyers commerciaux",
        "L'ouverture de grands supermarchés",
        "La diminution des déplacements à pied",
      ],
      correct: "A",
      explanation:
        "Le texte relie la résistance des commerces aux flux piétons quotidiens générés par les écoles et les transports.",
    },
    {
      level: "B2",
      category: "sciences",
      transcription:
        "Des chercheurs ont équipé des abeilles de minuscules capteurs pour suivre leurs déplacements. Les données montrent que les colonies s'adaptent aux zones urbaines en diversifiant leurs sources de nourriture. Les jardins privés jouent un rôle plus important que prévu.",
      prompt: "Quelle découverte l'étude met-elle en évidence ?",
      options: [
        "Les jardins privés sont une ressource importante pour les abeilles",
        "Les abeilles évitent totalement les villes",
        "Les capteurs empêchent les abeilles de butiner",
        "Les colonies disparaissent en milieu urbain",
      ],
      correct: "A",
      explanation:
        "Le suivi montre que les abeilles urbaines diversifient leurs sources et exploitent fortement les jardins privés.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Les bibliothèques de quartier prêtent désormais des outils et des instruments de musique. Cette offre attire des habitants qui ne fréquentaient pas les lieux. Les bibliothécaires y voient un moyen de renouveler leur public.",
      prompt: "Quel effet cette nouvelle offre produit-elle ?",
      options: [
        "Elle attire un public qui ne venait pas auparavant",
        "Elle réduit le prêt de livres",
        "Elle oblige les habitants à payer un abonnement",
        "Elle ferme les salles de lecture",
      ],
      correct: "A",
      explanation:
        "Le prêt d'objets variés amène de nouveaux visiteurs et permet aux bibliothèques de renouveler leur public.",
    },
    {
      level: "C1",
      category: "logement",
      transcription:
        "Les aides à la rénovation énergétique bénéficient surtout aux propriétaires capables d'avancer les frais des travaux. Les ménages modestes, souvent locataires ou propriétaires de logements mal isolés, en profitent moins. Les associations réclament donc un accompagnement et un financement anticipé, plutôt qu'un remboursement différé.",
      prompt: "Quelle limite du dispositif est soulignée ?",
      options: [
        "Il favorise ceux qui peuvent avancer le coût des travaux",
        "Il exclut tous les propriétaires",
        "Il finance uniquement les logements neufs",
        "Il impose des travaux trop peu coûteux",
      ],
      correct: "A",
      explanation:
        "Le remboursement différé avantage les ménages capables de payer d'abord, ce qui écarte les plus modestes.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "Le streaming a transformé la rémunération des musiciens : les revenus dépendent du nombre d'écoutes, ce qui favorise les artistes déjà connus. Les petites formations peinent à vivre de leurs enregistrements et comptent davantage sur les concerts. Certains professionnels réclament une répartition plus équitable des recettes.",
      prompt: "Quel effet le streaming a-t-il sur les petits groupes ?",
      options: [
        "Il les rend davantage dépendants des concerts",
        "Il garantit des revenus stables",
        "Il supprime la nécessité de se produire en public",
        "Il réduit la notoriété des artistes connus",
      ],
      correct: "A",
      explanation:
        "Faute de revenus suffisants issus des écoutes, les petits groupes dépendent plus fortement des concerts.",
    },
    {
      level: "C1",
      category: "études",
      transcription:
        "L'apprentissage d'une langue étrangère ne se réduit pas à l'accumulation de vocabulaire. Les chercheurs observent que les apprenants progressent davantage lorsqu'ils sont exposés à des situations authentiques et encouragés à prendre la parole, même en faisant des erreurs. La peur de se tromper reste le principal frein.",
      prompt: "Quel est le principal obstacle à l'apprentissage selon l'étude ?",
      options: [
        "La peur de commettre des erreurs",
        "Le manque de vocabulaire",
        "L'absence de manuels",
        "La durée trop courte des cours",
      ],
      correct: "A",
      explanation:
        "L'étude identifie la peur de se tromper comme le frein principal, alors que les erreurs font partie de la progression.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Dans les zones rurales, l'absence de transports collectifs rend le permis de conduire indispensable pour accéder à l'emploi. Les aides au permis se multiplient, mais elles restent insuffisantes face au coût de l'assurance et de l'entretien. Les chercheurs plaident pour une approche globale de la mobilité.",
      prompt: "Pourquoi les aides au permis sont-elles jugées insuffisantes ?",
      options: [
        "Elles ne couvrent pas les coûts liés à l'usage du véhicule",
        "Elles sont réservées aux habitants des villes",
        "Elles financent uniquement les transports collectifs",
        "Elles obligent les jeunes à renoncer à l'emploi",
      ],
      correct: "A",
      explanation:
        "Les aides paient le permis, mais pas l'assurance ni l'entretien, qui pèsent aussi sur le budget des jeunes ruraux.",
    },
    {
      level: "C2",
      category: "sciences",
      transcription:
        "La vulgarisation scientifique est souvent jugée à sa capacité à simplifier. Or simplifier n'est pas appauvrir : c'est choisir un niveau de description qui préserve les relations essentielles entre les phénomènes. Le risque n'est pas de rendre une question complexe, mais de donner l'illusion qu'elle est définitivement résolue.",
      prompt: "Quelle idée le locuteur se fait-il de la vulgarisation scientifique ?",
      options: [
        "Elle doit simplifier sans appauvrir le contenu",
        "Elle doit éviter toute simplification pour rester exacte",
        "Elle doit remplacer les sciences par des récits",
        "Elle doit présenter chaque question comme résolue",
      ],
      correct: "A",
      explanation:
        "Le locuteur distingue simplification et appauvrissement et met en garde contre l'illusion d'un savoir achevé.",
    },
    {
      level: "C2",
      category: "société",
      transcription:
        "L'espace public n'est pas un vide à occuper, mais un ensemble de règles qui rendent la coexistence possible. Sa qualité se mesure moins à ce que l'on peut y faire qu'à ce que chacun accepte de ne pas y faire. La politesse urbaine n'est donc pas un ornement : elle constitue une infrastructure invisible.",
      prompt: "Comment le locuteur définit-il l'espace public ?",
      options: [
        "Comme un ensemble de règles de coexistence",
        "Comme un espace totalement dépourvu de règles",
        "Comme un simple ornement décoratif",
        "Comme une surface mesurée par sa superficie",
      ],
      correct: "A",
      explanation:
        "Le locuteur définit l'espace public par les règles partagées qui permettent la coexistence, et non par le seul usage.",
    },
    {
      level: "C2",
      category: "sociologie",
      transcription:
        "Le sentiment d'utilité ne se confond pas avec l'utilité objective. Un métier peut être socialement indispensable et peu reconnu ; un autre, accessoire, peut conférer du prestige. Cette asymétrie explique pourquoi les discours sur la valeur du travail restent souvent abstraits : ils ignorent la distribution inégale de la reconnaissance.",
      prompt: "Quelle asymétrie le locuteur souligne-t-il ?",
      options: [
        "L'écart entre l'utilité sociale et la reconnaissance accordée",
        "La différence entre salaire et temps de travail",
        "L'opposition entre métiers manuels et intellectuels",
        "Le décalage entre formation et expérience",
      ],
      correct: "A",
      explanation:
        "Le propos oppose l'utilité réelle d'un métier à la reconnaissance sociale dont il bénéficie, souvent distincte.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "articles",
      prompt: "Nous avons besoin ___ chaises pour la réunion de demain.",
      options: ["de", "des", "du", "les"],
      correct: "A",
      explanation:
        "Après « avoir besoin de », on emploie « de » ; le partitif « des » ne convient pas ici.",
    },
    {
      level: "A2",
      category: "présent",
      prompt: "Demain matin, vous ___ le train à huit heures.",
      options: ["prenez", "prend", "prenons", "prennent"],
      correct: "A",
      explanation: "Le sujet « vous » impose la deuxième personne du pluriel : « vous prenez ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Ce projet, nous ___ parlerons demain matin.",
      options: ["en", "le", "lui", "y"],
      correct: "A",
      explanation:
        "« Parler de ce projet » : le pronom « en » remplace le complément introduit par « de ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le village ___ je pense se trouve dans les Alpes.",
      options: ["auquel", "que", "dont", "où"],
      correct: "A",
      explanation:
        "« Penser à » impose le pronom relatif composé « auquel », contraction de « à lequel ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "C'est la ville ___ visitée de la région.",
      options: ["la plus", "plus", "la mieux", "aussi"],
      correct: "A",
      explanation:
        "Le superlatif relatif se forme avec « la plus » suivi du participe passé accordé : « la plus visitée ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous partons ___ Italie au mois de mai.",
      options: ["en", "à", "au", "dans"],
      correct: "A",
      explanation:
        "Devant un pays féminin singulier comme l'Italie, on emploie « en » sans article : « en Italie ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Elle ___ de sortir quand je l'ai appelée.",
      options: ["venait", "vient", "va", "viendra"],
      correct: "A",
      explanation:
        "« Venir de + infinitif » au passé récent : « elle venait de sortir » marque une action juste achevée.",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Une fois que nous ___ tous les documents, le dossier sera complet.",
      options: ["aurons signé", "signons", "signerons", "avons signé"],
      correct: "A",
      explanation:
        "Après « une fois que », l'action accomplie avant une autre action future se met au futur antérieur : « aurons signé ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Pour que le projet ___ , il faut convaincre les élus.",
      options: ["aboutisse", "aboutit", "aboutira", "aboutissait"],
      correct: "A",
      explanation: "« Pour que » exige le subjonctif présent : « pour que le projet aboutisse ».",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Les nouveaux tarifs ___ en vigueur le 1er janvier.",
      options: ["seront appliqués", "appliqueront", "appliquent", "ont appliqué"],
      correct: "A",
      explanation:
        "Les tarifs subissent l'action : on emploie la voix passive au futur, « seront appliqués ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Il a annulé sa participation ___ une entorse à la cheville.",
      options: ["en raison d'", "grâce à", "malgré", "afin d'"],
      correct: "A",
      explanation:
        "« En raison de » exprime une cause défavorable, adaptée ici à l'entorse qui empêche la participation.",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ ses notes, elle a préparé son exposé.",
      options: ["En relisant", "Relisant", "Relire", "Ayant relu"],
      correct: "A",
      explanation:
        "Le gérondif « en relisant » exprime la manière dont elle a préparé son exposé.",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Le client a demandé si le magasin ___ ouvert le dimanche.",
      options: ["était", "est", "sera", "soit"],
      correct: "A",
      explanation:
        "Au discours indirect au passé, le présent « est » devient « était » : « si le magasin était ouvert ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "La collègue ___ j'ai confié ce dossier est absente aujourd'hui.",
      options: ["à qui", "que", "dont", "où"],
      correct: "A",
      explanation:
        "« Confier quelque chose à quelqu'un » : le pronom relatif qui reprend « la collègue » est « à qui ».",
    },
    {
      level: "C1",
      category: "conjugaison",
      prompt: "Il aurait fallu que nous ___ plus tôt.",
      options: ["partions", "partons", "partirons", "partirions"],
      correct: "A",
      explanation:
        "Après un conditionnel passé, « il aurait fallu que » appelle le subjonctif imparfait : « que nous partions ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Au cas où il ___ , prévenez-moi immédiatement.",
      options: ["pleuvrait", "pleut", "pleuvra", "pleuvait"],
      correct: "A",
      explanation:
        "« Au cas où » introduit une éventualité et se construit avec le conditionnel : « il pleuvrait ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "Peut-être ___ -elle oublié notre rendez-vous.",
      options: ["a-t-", "a", "aura", "avait"],
      correct: "A",
      explanation:
        "Après « peut-être » en tête de phrase, l'inversion du sujet s'accompagne d'un « t » euphonique : « a-t-elle oublié ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Le témoignage du gardien ___ la version du suspect.",
      options: ["contredit", "contient", "contracte", "concentre"],
      correct: "A",
      explanation:
        "« Contredire » signifie s'opposer à une affirmation ; le témoignage contredit donc la version du suspect.",
    },
    {
      level: "C2",
      category: "concession",
      prompt: "___ que soient les difficultés, nous poursuivrons le projet.",
      options: ["Quelles", "Quels", "Quelques", "Quel"],
      correct: "A",
      explanation:
        "L'accord se fait avec « difficultés » : « quelles que soient les difficultés ».",
    },
    {
      level: "C2",
      category: "lexique",
      prompt: "Ce raisonnement ___ sur une prémisse contestable.",
      options: ["repose", "reprend", "répète", "résiste"],
      correct: "A",
      explanation:
        "« Reposer sur » signifie être fondé sur ; le raisonnement repose sur une prémisse contestable.",
    },
  ],
  reading: [
    {
      title: "La ludothèque ouvre ses portes",
      text:
        "La ludothèque ouvre mardi. Les habitants peuvent y emprunter des jeux de société pour deux semaines. L'inscription est gratuite, sur présentation d'une pièce d'identité. Les enfants de moins de douze ans doivent être accompagnés.",
      question: {
        level: "B1",
        category: "loisirs",
        prompt: "Que faut-il pour s'inscrire à la ludothèque ?",
        options: [
          "Une pièce d'identité",
          "Une carte bancaire",
          "Un justificatif de domicile",
          "L'accord d'un adulte pour tous",
        ],
        correct: "A",
        explanation:
          "L'inscription est gratuite mais nécessite une pièce d'identité ; l'accompagnement ne concerne que les moins de douze ans.",
      },
    },
    {
      title: "Permanence d'aide numérique",
      text:
        "Le centre social propose une aide numérique le mardi, de quatorze à dix-sept heures. Des bénévoles aident les habitants à créer un compte ou à remplir des démarches. L'accès est libre, mais il faut apporter ses documents personnels.",
      question: {
        level: "B1",
        category: "services",
        prompt: "Que doivent apporter les personnes qui viennent à la permanence ?",
        options: [
          "Leurs documents personnels",
          "Un ordinateur portable",
          "Une preuve de paiement",
          "Une lettre de leur banque",
        ],
        correct: "A",
        explanation:
          "L'accès est libre, mais les bénévoles demandent les documents personnels nécessaires aux démarches.",
      },
    },
    {
      title: "Vide-grenier de l'école",
      text:
        "L'école organise un vide-grenier dimanche, de huit heures à dix-huit heures, dans la cour. Les exposants paient dix euros pour une table. Les bénéfices financeront le voyage des élèves. Les visiteurs pourront acheter des crêpes sur place.",
      question: {
        level: "B1",
        category: "études",
        prompt: "À quoi servira l'argent récolté ?",
        options: [
          "À financer un voyage scolaire",
          "À rénover la cour de l'école",
          "À payer les professeurs",
          "À acheter des livres pour la bibliothèque",
        ],
        correct: "A",
        explanation:
          "Le texte précise que les bénéfices financeront le voyage des élèves de fin d'année.",
      },
    },
    {
      title: "Des graines à partager",
      text:
        "La médiathèque a installé une grainothèque. Les jardiniers peuvent y prendre gratuitement trois sachets de graines. En échange, ils sont invités à rapporter des graines après la récolte. Un atelier de semis est proposé samedi matin.",
      question: {
        level: "B1",
        category: "environnement",
        prompt: "Que peuvent faire les jardiniers à la grainothèque ?",
        options: [
          "Prendre gratuitement des graines",
          "Acheter des plants déjà cultivés",
          "Vendre leurs propres légumes",
          "Emprunter des outils de jardinage",
        ],
        correct: "A",
        explanation:
          "La grainothèque permet de prendre gratuitement trois sachets de graines par mois, avec un retour encouragé après la récolte.",
      },
    },
    {
      title: "Marche nordique le dimanche",
      text:
        "Le club propose une séance de marche nordique chaque dimanche à neuf heures. Le parcours dure une heure et demie et convient aux débutants. Les bâtons sont fournis, mais il faut apporter une gourde. La première séance est gratuite.",
      question: {
        level: "B1",
        category: "sport",
        prompt: "Qu'est-ce que le club fournit aux participants ?",
        options: ["Les bâtons", "Les chaussures", "La gourde", "Le petit-déjeuner"],
        correct: "A",
        explanation:
          "Le club prête les bâtons ; les participants doivent apporter leur gourde et leurs chaussures.",
      },
    },
    {
      title: "Le marché s'installe en soirée",
      text: p(
        "À partir de jeudi, le marché des producteurs ouvrira de dix-sept à vingt heures sur la place de la gare. Ce nouvel horaire vise à attirer les salariés qui ne peuvent pas faire leurs courses le matin.",
        "Les commerçants du centre-ville s'inquiètent toutefois de la concurrence et demandent que le stationnement reste gratuit pendant le marché.",
      ),
      question: {
        level: "B2",
        category: "économie",
        prompt: "Pourquoi le marché ouvre-t-il en soirée ?",
        options: [
          "Pour attirer les salariés après leur travail",
          "Pour concurrencer les supermarchés",
          "Pour réduire le nombre de producteurs",
          "Pour libérer la place le matin",
        ],
        correct: "A",
        explanation:
          "Le nouvel horaire doit permettre aux salariés de faire leurs courses après le travail.",
      },
    },
    {
      title: "Des cours de natation pour adultes",
      text: p(
        "La piscine municipale lance des cours de natation réservés aux adultes. Les groupes comptent six personnes au maximum, afin que chacun bénéficie d'un suivi attentif.",
        "Les séances s'adressent en priorité aux personnes qui ont peur de l'eau ou qui n'ont jamais appris à nager. Une évaluation gratuite est proposée avant l'inscription.",
      ),
      question: {
        level: "B2",
        category: "sport",
        prompt: "Quel public ces cours visent-ils en priorité ?",
        options: [
          "Les adultes qui ont peur de l'eau",
          "Les enfants de moins de six ans",
          "Les nageurs confirmés",
          "Les futurs maîtres-nageurs",
        ],
        correct: "A",
        explanation:
          "Les cours visent d'abord les adultes peu à l'aise dans l'eau ou n'ayant jamais appris à nager.",
      },
    },
    {
      title: "Des tablettes pour garder le lien",
      text: p(
        "Une maison de retraite a mis des tablettes à disposition de ses résidents. Elles permettent de passer des appels vidéo avec les familles et de participer à des ateliers culturels à distance.",
        "Le personnel a été formé pour accompagner les personnes qui ne maîtrisent pas ces outils. Les premiers retours font état d'une diminution du sentiment d'isolement.",
      ),
      question: {
        level: "B2",
        category: "santé",
        prompt: "Quel est le principal bénéfice de cette initiative ?",
        options: [
          "Elle réduit le sentiment d'isolement des résidents",
          "Elle remplace les visites des familles",
          "Elle supprime les ateliers en présentiel",
          "Elle permet de réduire le personnel soignant",
        ],
        correct: "A",
        explanation:
          "Le texte souligne que les appels vidéo et les ateliers à distance diminuent le sentiment d'isolement.",
      },
    },
    {
      title: "Une ressourcerie en centre-ville",
      text: p(
        "Une ressourcerie vient d'ouvrir en centre-ville. Elle collecte des objets encore utilisables, les répare puis les revend à petit prix.",
        "La structure emploie des personnes en réinsertion professionnelle et propose des ateliers pour apprendre à réparer un vélo ou un petit appareil électrique. La ville espère ainsi réduire les déchets tout en créant des emplois.",
      ),
      question: {
        level: "B2",
        category: "environnement",
        prompt: "Quel double objectif poursuit la ressourcerie ?",
        options: [
          "Réemployer des objets et favoriser l'insertion",
          "Vendre des objets neufs et augmenter les impôts",
          "Collecter des déchets et les enfouir",
          "Former des ingénieurs et exporter des machines",
        ],
        correct: "A",
        explanation:
          "La ressourcerie combine la réparation-revente d'objets et l'emploi de personnes en réinsertion.",
      },
    },
    {
      title: "Le festival du livre jeunesse",
      text: p(
        "Le festival du livre jeunesse se tiendra du 12 au 15 mars. Des auteurs rencontreront les classes le matin et dédicaceront leurs ouvrages l'après-midi.",
        "L'entrée est gratuite pour les familles, mais les enseignants doivent réserver les rencontres avec les auteurs avant le 1er mars. Un espace de lecture sera aménagé pour les plus jeunes.",
      ),
      question: {
        level: "B2",
        category: "culture",
        prompt: "Que doivent faire les enseignants pour les rencontres ?",
        options: [
          "Réserver avant le 1er mars",
          "Payer un droit d'entrée",
          "Venir uniquement l'après-midi",
          "Apporter des livres neufs",
        ],
        correct: "A",
        explanation:
          "Les rencontres avec les auteurs sont gratuites mais doivent être réservées par les enseignants avant le 1er mars.",
      },
    },
    {
      title: "La poste réduit ses horaires",
      text: p(
        "Le bureau de poste du bourg réduira ses horaires à partir de lundi : il sera ouvert de neuf heures à midi, du mardi au samedi.",
        "Pour compenser, plusieurs services seront proposés chez le buraliste et à la mairie. Les habitants craignent néanmoins de devoir se rendre à la ville voisine pour les opérations les plus complexes.",
      ),
      question: {
        level: "B2",
        category: "société",
        prompt: "Comment la poste compense-t-elle la réduction des horaires ?",
        options: [
          "En délocalisant certains services chez des commerçants",
          "En fermant définitivement le bureau",
          "En augmentant le prix des timbres",
          "En ouvrant le dimanche",
        ],
        correct: "A",
        explanation:
          "La poste transfère plusieurs services chez le buraliste et à la mairie pour compenser la baisse des horaires.",
      },
    },
    {
      title: "Des livres donnés, puis revendus",
      text: p(
        "La bibliothèque reçoit chaque année des centaines de livres donnés par les habitants. Faute de place, elle ne peut pas tous les conserver.",
        "Les ouvrages en bon état sont vendus lors d'une braderie annuelle, et les recettes financent les activités jeunesse. Les exemplaires abîmés sont recyclés. La bibliothèque précise qu'elle n'accepte plus les encyclopédies anciennes.",
      ),
      question: {
        level: "B2",
        category: "culture",
        prompt: "Que deviennent les livres en bon état ?",
        options: [
          "Ils sont vendus lors d'une braderie",
          "Ils sont tous ajoutés aux rayons",
          "Ils sont détruits immédiatement",
          "Ils sont envoyés aux écoles",
        ],
        correct: "A",
        explanation:
          "Les livres en bon état sont revendus à l'occasion d'une braderie dont les recettes soutiennent les activités jeunesse.",
      },
    },
    {
      title: "La fin du ticket de bus",
      text: p(
        "Les tickets papier disparaîtront progressivement des bus à partir de septembre. Les voyageurs devront valider leur trajet avec une carte rechargeable ou l'application mobile.",
        "Des bornes seront installées aux arrêts principaux, et les conducteurs pourront aider les personnes sans smartphone. Les abonnements restent valables sans changement.",
      ),
      question: {
        level: "B2",
        category: "transports",
        prompt: "Qu'est-ce qui est prévu pour les voyageurs sans smartphone ?",
        options: [
          "Ils pourront être aidés par les conducteurs",
          "Ils devront payer un supplément",
          "Ils ne pourront plus prendre le bus",
          "Ils recevront un ticket papier gratuit",
        ],
        correct: "A",
        explanation:
          "Le texte prévoit que les conducteurs aident les personnes dépourvues de smartphone.",
      },
    },
    {
      title: "Des aires de jeux pour tous",
      text: p(
        "La ville a inauguré une aire de jeux conçue pour accueillir les enfants en situation de handicap. Les équipements sont accessibles en fauteuil et disposent de revêtements souples.",
        "Le projet a été élaboré avec des associations et des familles. Deux autres aires doivent être aménagées dans les prochaines années, en fonction du budget disponible.",
      ),
      question: {
        level: "B2",
        category: "société",
        prompt: "Comment le projet a-t-il été conçu ?",
        options: [
          "Avec des associations et des familles",
          "Sans consultation des habitants",
          "Par une entreprise étrangère uniquement",
          "Pour remplacer toutes les autres aires",
        ],
        correct: "A",
        explanation:
          "La conception de l'aire accessible s'est faite en association avec des familles et des associations.",
      },
    },
    {
      title: "Un jardin thérapeutique à l'hôpital",
      text: p(
        "L'hôpital a ouvert un jardin thérapeutique destiné aux patients en rééducation. Ils peuvent y cultiver des plantes aromatiques et participer à des ateliers encadrés par un jardinier.",
        "Les soignants observent une baisse du stress pendant les séances. Le jardin est aussi ouvert aux visiteurs, mais certaines parcelles restent réservées aux patients.",
      ),
      question: {
        level: "B2",
        category: "santé",
        prompt: "Quel effet les soignants observent-ils ?",
        options: [
          "Une baisse du stress pendant les séances",
          "Une hausse des infections",
          "Une diminution du nombre de visites",
          "Une fermeture des ateliers",
        ],
        correct: "A",
        explanation:
          "Le personnel constate que la participation aux ateliers de jardinage réduit le stress des patients.",
      },
    },
    {
      title: "Le droit à la déconnexion, entre loi et usages",
      text: p(
        "Le droit à la déconnexion figure dans le code du travail, mais son application reste très inégale. Dans certaines entreprises, les salariés reçoivent encore des courriels tard le soir et craignent de ne pas y répondre. Beaucoup hésitent à signaler ces pratiques, par crainte de paraître moins disponibles.",
        "Les chercheurs expliquent que la loi ne suffit pas : elle doit être traduite en règles concrètes, négociées avec les représentants du personnel. Une charte trop vague laisse chacun seul face à la pression du groupe.",
        "Les expériences réussies partagent un point commun : elles limitent les sollicitations à la source, plutôt que de demander aux individus de résister seuls. La déconnexion devient alors une norme collective et non un effort personnel.",
      ),
      question: {
        level: "C1",
        category: "travail",
        prompt: "Quelle condition rend le droit à la déconnexion réellement efficace ?",
        options: [
          "Des règles collectives qui limitent les sollicitations",
          "Une charte très générale signée par chacun",
          "La suppression des courriels professionnels",
          "Un contrôle individuel des horaires de connexion",
        ],
        correct: "A",
        explanation:
          "Le texte montre que les expériences réussies limitent les sollicitations à la source et font de la déconnexion une norme collective.",
      },
    },
    {
      title: "Les monnaies locales, entre conviction et limites",
      text: p(
        "Les monnaies locales complémentaires se développent dans de nombreuses villes. Leur principe est simple : une devise propre à un territoire incite les habitants à consommer chez les commerçants qui l'acceptent.",
        "Les promoteurs y voient un outil de relocalisation de l'économie et de sensibilisation à la consommation de proximité. Les commerçants, eux, hésitent souvent à cause des frais de conversion et du temps nécessaire pour convaincre leur clientèle.",
        "Les résultats restent modestes à l'échelle de l'économie, mais les études soulignent un effet indirect : ces dispositifs créent des réseaux d'acteurs qui se connaissent et coopèrent. Leur principal défi n'est donc pas technique, mais celui de la participation.",
      ),
      question: {
        level: "C1",
        category: "économie",
        prompt: "Quel est le principal défi des monnaies locales selon le texte ?",
        options: [
          "Élargir la participation des acteurs locaux",
          "Stabiliser leur taux de change international",
          "Remplacer l'euro dans les grandes villes",
          "Supprimer les frais bancaires des commerçants",
        ],
        correct: "A",
        explanation:
          "Le texte conclut que le défi majeur est la participation, car les effets passent par des réseaux d'acteurs impliqués.",
      },
    },
    {
      title: "L'architecture bioclimatique, une évidence coûteuse",
      text: p(
        "L'architecture bioclimatique cherche à tirer parti du climat plutôt qu'à le corriger par des équipements. Orientation des pièces, isolation, ventilation naturelle et matériaux locaux réduisent les besoins de chauffage et de climatisation.",
        "Les principes sont anciens, mais leur application se heurte à des contraintes économiques. Les surcoûts de conception sont visibles immédiatement, tandis que les économies d'énergie se répartissent sur plusieurs décennies.",
        "Les chercheurs plaident pour une évaluation globale, intégrant la santé des occupants et la résilience aux canicules. À leurs yeux, le surcoût initial n'est pas un luxe : il correspond à des dépenses que la collectivité devra de toute manière assumer.",
      ),
      question: {
        level: "C1",
        category: "environnement",
        prompt: "Pourquoi l'architecture bioclimatique reste-t-elle peu appliquée ?",
        options: [
          "Ses surcoûts immédiats sont plus visibles que ses économies futures",
          "Elle est techniquement impossible en milieu urbain",
          "Elle augmente la consommation de climatisation",
          "Les matériaux locaux sont interdits par la loi",
        ],
        correct: "A",
        explanation:
          "Le texte oppose le surcoût de conception immédiat aux économies étalées dans le temps, ce qui freine la décision.",
      },
    },
    {
      title: "Vieillir en ville, une question d'aménagement",
      text: p(
        "Le vieillissement de la population transforme les attentes à l'égard de la ville. Marcher jusqu'à la boulangerie, s'asseoir sur un banc, traverser sans crainte : ces gestes ordinaires deviennent décisifs pour l'autonomie des personnes âgées.",
        "Or l'aménagement urbain privilégie souvent la vitesse et la distance. Les trottoirs étroits, les feux trop courts et l'absence de toilettes publiques réduisent les sorties et favorisent l'isolement. Les personnes âgées hésitent souvent à demander des aménagements, de peur de peser sur la collectivité.",
        "Les associations demandent que les personnes âgées participent aux décisions d'urbanisme. Elles rappellent que les solutions les plus simples, comme des bancs régulièrement espacés, coûtent peu et profitent à tous les piétons.",
      ),
      question: {
        level: "C1",
        category: "société",
        prompt: "Pourquoi les bancs publics sont-ils importants selon le texte ?",
        options: [
          "Ils permettent de faire des pauses et de maintenir l'autonomie",
          "Ils remplacent les transports en commun",
          "Ils accélèrent la circulation des piétons",
          "Ils servent uniquement aux personnes âgées",
        ],
        correct: "A",
        explanation:
          "Le texte présente les bancs comme un aménagement simple qui favorise les sorties et l'autonomie de tous les piétons.",
      },
    },
    {
      title: "La traçabilité alimentaire, un outil à double tranchant",
      text: p(
        "Les consommateurs disposent de plus en plus d'informations sur l'origine des produits, grâce à des applications et à des codes affichés sur les emballages. Cette traçabilité répond à une demande de transparence après plusieurs crises alimentaires.",
        "Mais les données peuvent être sélectionnées par les industriels eux-mêmes. Un code qui indique le pays de transformation ne dit rien des conditions de production, ni des intermédiaires. La transparence technique ne garantit donc pas la transparence politique.",
        "Les associations réclament des formats communs et des contrôles indépendants. Selon elles, l'information n'a de valeur que si le consommateur peut la comparer et la vérifier, ce qui suppose des règles publiques plutôt qu'une multiplication d'étiquettes privées.",
      ),
      question: {
        level: "C1",
        category: "consommation",
        prompt: "Quelle limite de la traçabilité le texte souligne-t-il ?",
        options: [
          "Les informations peuvent être choisies par les industriels",
          "Les consommateurs refusent de lire les étiquettes",
          "Les applications sont interdites dans certains pays",
          "Les contrôles indépendants sont trop nombreux",
        ],
        correct: "A",
        explanation:
          "Le texte explique que les données de traçabilité sont parfois sélectionnées par les industriels, ce qui limite leur portée.",
      },
    },
    {
      title: "Le secret, condition de la confiance ?",
      text: p(
        "La transparence est aujourd'hui présentée comme une vertu politique évidente : ce qui est public serait vérifiable, donc légitime. Cette exigence a produit des avancées réelles, notamment dans l'accès aux documents administratifs.",
        "Pourtant, toute institution a besoin d'une part de secret pour fonctionner. Une négociation diplomatique, une délibération judiciaire ou une évaluation médicale exigent un espace protégé où les arguments peuvent être discutés librement. La question n'est donc pas de choisir entre secret et transparence, mais de délimiter ce qui doit rester confidentiel et pour combien de temps.",
        "Le vrai critère est la justification du secret. Un secret qui protège une personne ou une procédure n'est pas de même nature qu'un secret qui protège une responsabilité. La transparence n'est pas l'absence de secret : c'est l'obligation de dire pourquoi un secret existe et devant qui il devra être levé.",
      ),
      question: {
        level: "C2",
        category: "politique",
        prompt: "Quel critère l'auteur propose-t-il pour évaluer un secret ?",
        options: [
          "La justification de ce qu'il protège et sa durée",
          "La quantité d'informations qu'il cache",
          "L'autorité qui l'a décidé",
          "La facilité à le divulguer",
        ],
        correct: "A",
        explanation:
          "L'auteur conditionne la légitimité du secret à la nature de ce qu'il protège et à l'obligation d'en justifier la durée.",
      },
    },
    {
      title: "Fiction et témoignage : qui parle ?",
      text: p(
        "Les récits personnels occupent une place croissante dans les librairies. Leur succès tient à une promesse implicite : celle d'une parole authentique, ancrée dans une expérience vécue. Le lecteur y cherche moins une information qu'une présence, parfois au prix d'un malentendu.",
        "Mais la frontière entre fiction et témoignage est souvent brouillée. Un auteur peut reconstituer des dialogues qu'il n'a pas entendus, changer des prénoms, déplacer des événements. Ces libertés ne sont pas nécessairement des mensonges : la mémoire elle-même est reconstructive.",
        "Le problème surgit lorsque le pacte de lecture n'est pas clair. Le lecteur qui croit lire un témoignage ne sait plus ce qui relève de la preuve et ce qui relève de la mise en forme. La question n'est donc pas de savoir si un récit est vrai, mais quel contrat il propose et quelles traces du réel il accepte de rendre vérifiables.",
      ),
      question: {
        level: "C2",
        category: "littérature",
        prompt: "Quel problème l'auteur identifie-t-il dans ces récits ?",
        options: [
          "L'ambiguïté du contrat de lecture proposé au public",
          "L'absence totale de vérité dans les récits",
          "Le refus des auteurs de parler d'eux-mêmes",
          "La disparition des romans de fiction",
        ],
        correct: "A",
        explanation:
          "Le texte pointe l'ambiguïté du pacte de lecture : le public ne distingue plus clairement témoignage et mise en forme romanesque.",
      },
    },
    {
      title: "La responsabilité face aux catastrophes",
      text: p(
        "Les catastrophes naturelles sont souvent décrites comme des événements imprévisibles. Cette formulation rassure, car elle suggère que personne n'aurait pu agir autrement. Or les recherches montrent que la vulnérabilité est largement construite par des décisions d'aménagement, d'urbanisation et de prévention.",
        "Reconnaître cette dimension collective ne revient pas à accuser les victimes. Il s'agit de comprendre que la responsabilité est distribuée entre des acteurs nombreux : élus, entreprises, administrations, habitants. Chacun n'a qu'une part, mais l'absence de cette part aggrave le risque.",
        "La difficulté est que la responsabilité préventive ne se voit pas. Elle se mesure à ce qui n'a pas eu lieu, à des dégâts évités. Les responsables politiques sont donc tentés d'investir dans des réponses visibles plutôt que dans une prévention discrète. Penser la catastrophe, c'est aussi apprendre à valoriser ce qui ne se produit pas.",
      ),
      question: {
        level: "C2",
        category: "société",
        prompt: "Pourquoi la prévention est-elle souvent négligée selon l'auteur ?",
        options: [
          "Parce que ses effets sont invisibles et difficiles à valoriser",
          "Parce qu'elle coûte toujours plus cher que la reconstruction",
          "Parce que les catastrophes sont totalement imprévisibles",
          "Parce que les habitants refusent toute responsabilité",
        ],
        correct: "A",
        explanation:
          "L'auteur montre que la prévention se juge à des dégâts évités, donc à ce qui ne se voit pas, ce qui la rend politiquement peu gratifiante.",
      },
    },
    {
      title: "Le patrimoine immatériel, entre conservation et vie",
      text: p(
        "Le patrimoine ne se limite pas aux monuments. Il comprend aussi des savoir-faire, des fêtes, des récits et des pratiques culinaires. Cette dimension immatérielle pose une difficulté : comment conserver ce qui n'existe que dans l'action et la transmission ?",
        "Les institutions patrimoniales ont tendance à figer les pratiques pour les rendre visibles et documentables. Une danse devient alors une représentation, un savoir-faire une démonstration. Ce processus de mise en patrimoine peut protéger une pratique, mais aussi la couper des conditions sociales qui la rendaient vivante.",
        "Les chercheurs proposent donc de distinguer la conservation des traces et le soutien aux conditions de transmission. Documenter un geste ne suffit pas à le faire vivre ; il faut encore que des personnes aient intérêt et possibilité de le réinventer. Le patrimoine immatériel n'est pas un objet à sauver, mais un rapport à entretenir.",
      ),
      question: {
        level: "C2",
        category: "culture",
        prompt: "Quel risque la mise en patrimoine fait-elle courir aux pratiques ?",
        options: [
          "Les couper des conditions sociales qui les maintiennent vivantes",
          "Les rendre totalement invisibles au public",
          "Supprimer toute possibilité de documentation",
          "Interdire aux chercheurs de les étudier",
        ],
        correct: "A",
        explanation:
          "Le texte explique que la patrimonialisation peut figer les pratiques et les séparer des conditions sociales qui les font vivre.",
      },
    },
    {
      title: "L'anonymat en ligne, une protection ambivalente",
      text: p(
        "L'anonymat sur Internet est souvent présenté comme une menace : il permettrait aux insultes et aux manipulations de prospérer sans responsabilité. Les plateformes sont donc tentées d'imposer l'identification, au nom de la sécurité.",
        "Cette analyse oublie ce que l'anonymat protège. Il permet à des victimes de témoigner, à des lanceurs d'alerte de s'exprimer, à des minorités de participer sans être exposées. Supprimer l'anonymat protégerait peut-être contre certains abus, mais exposerait des personnes vulnérables à des risques nouveaux.",
        "La bonne question n'est pas de savoir s'il faut choisir entre anonymat et responsabilité. Elle est de savoir quelles formes de responsabilité sont possibles sans identification publique, et comment les plateformes peuvent être tenues responsables des systèmes qu'elles organisent. Le débat porte moins sur les individus que sur les architectures techniques.",
      ),
      question: {
        level: "C2",
        category: "numérique",
        prompt: "Quelle position l'auteur défend-il sur l'anonymat ?",
        options: [
          "Il faut chercher des formes de responsabilité compatibles avec l'anonymat",
          "L'anonymat doit être totalement supprimé",
          "L'anonymat protège uniquement les auteurs d'insultes",
          "La responsabilité des plateformes est secondaire",
        ],
        correct: "A",
        explanation:
          "L'auteur refuse l'opposition simple entre anonymat et responsabilité et appelle à responsabiliser les architectures techniques.",
      },
    },
  ],
});
