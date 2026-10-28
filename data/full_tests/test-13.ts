import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 13.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_13 = defineFullTest({
  number: 13,
  description:
    "Treizième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, je voudrais réserver une table pour quatre personnes ce soir, à vingt heures. Mon nom est Dubois.",
      prompt: "Combien de personnes viendront au restaurant ?",
      options: ["Quatre", "Deux", "Huit", "Vingt"],
      correct: "A",
      explanation: "La personne réserve une table pour quatre personnes à vingt heures.",
    },
    {
      level: "A1",
      category: "transports",
      transcription:
        "Pour aller à la piscine, prenez le bus numéro douze. Descendez à l'arrêt Victor-Hugo. La piscine est en face de l'arrêt.",
      prompt: "Quel bus faut-il prendre pour aller à la piscine ?",
      options: ["Le bus numéro douze", "Le bus numéro deux", "Le bus numéro vingt", "Le bus numéro quatorze"],
      correct: "A",
      explanation: "Le message indique le bus numéro douze, avec descente à l'arrêt Victor-Hugo.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Excusez-moi, avez-vous ce pull en bleu ? Je cherche la taille moyenne. C'est pour un cadeau.",
      prompt: "Quelle couleur la cliente cherche-t-elle ?",
      options: ["Bleu", "Rouge", "Vert", "Noir"],
      correct: "A",
      explanation: "La cliente demande le pull en bleu, en taille moyenne.",
    },
    {
      level: "A2",
      category: "travail",
      transcription:
        "Bonjour, ici le garage Martin. Votre voiture est prête. Vous pouvez venir la chercher aujourd'hui avant dix-huit heures. N'oubliez pas de prendre votre carte bancaire.",
      prompt: "Avant quelle heure le client doit-il venir ?",
      options: ["Avant dix-huit heures", "Avant midi", "Avant vingt heures", "Avant dix-sept heures"],
      correct: "A",
      explanation: "Le garage demande de venir chercher la voiture avant dix-huit heures.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Vous avez rendez-vous chez la dentiste lundi à quinze heures trente. Pensez à arriver dix minutes en avance pour remplir le formulaire.",
      prompt: "Pourquoi faut-il arriver en avance ?",
      options: ["Pour remplir un formulaire", "Pour payer la consultation", "Pour prendre une radio", "Pour choisir un médecin"],
      correct: "A",
      explanation: "Arriver dix minutes plus tôt permet de remplir le formulaire avant la consultation.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Cet après-midi, le parc propose des promenades à poney pour les enfants. C'est gratuit jusqu'à seize heures. Ensuite, le tarif est de trois euros.",
      prompt: "Combien coûtent les promenades après seize heures ?",
      options: ["Trois euros", "Elles sont gratuites", "Seize euros", "Cinq euros"],
      correct: "A",
      explanation: "Les promenades sont gratuites jusqu'à seize heures, puis coûtent trois euros.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Chers voisins, la chaudière sera réparée mercredi. Il n'y aura pas d'eau chaude entre neuf heures et midi. Merci de votre patience.",
      prompt: "Que se passera-t-il mercredi matin ?",
      options: ["Il n'y aura pas d'eau chaude", "Il n'y aura pas d'électricité", "Le gardien sera absent", "L'ascenseur sera en panne"],
      correct: "A",
      explanation: "La réparation de la chaudière privera les résidents d'eau chaude de neuf heures à midi.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "À compter du premier mars, les horaires de l'entreprise changent : nous commencerons à huit heures trente au lieu de neuf heures, et nous finirons une demi-heure plus tôt le vendredi.",
      prompt: "Que change-t-il le vendredi ?",
      options: ["On finit une demi-heure plus tôt", "On commence plus tard", "On ne travaille plus", "On finit une heure plus tard"],
      correct: "A",
      explanation: "Le vendredi, la journée se termine une demi-heure plus tôt que les autres jours.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Les parents d'élèves sont invités à une réunion d'information jeudi à dix-huit heures au collège. Le principal présentera les nouveaux horaires et répondra à vos questions sur le voyage scolaire.",
      prompt: "Quel sujet sera abordé lors de la réunion ?",
      options: ["Les nouveaux horaires et le voyage scolaire", "Le menu de la cantine", "Les résultats du brevet", "Le recrutement d'un professeur"],
      correct: "A",
      explanation: "Le principal présente les nouveaux horaires et répond aux questions sur le voyage scolaire.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Je t'écris pour t'inviter à mon pot de départ vendredi soir. Je quitte l'entreprise après dix ans. Ce sera à dix-neuf heures dans la salle de réunion, avec des petits fours et du jus de fruits.",
      prompt: "Pourquoi la personne organise-t-elle ce pot ?",
      options: ["Parce qu'elle quitte son entreprise", "Pour fêter son anniversaire", "Pour présenter un projet", "Pour accueillir un collègue"],
      correct: "A",
      explanation: "Elle organise un pot de départ car elle quitte l'entreprise après dix ans.",
    },
    {
      level: "B1",
      category: "transports",
      transcription:
        "En raison d'une grève, un train sur deux circulera demain sur la ligne Paris-Lille. Les billets restent valables jusqu'à lundi et sont échangeables gratuitement.",
      prompt: "Que peuvent faire les voyageurs avec leur billet ?",
      options: ["L'échanger gratuitement", "Se le faire rembourser immédiatement", "L'utiliser seulement demain", "Le revendre en gare"],
      correct: "A",
      explanation: "Les billets sont valables jusqu'à lundi et peuvent être échangés sans frais.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La ville distribue gratuitement des composteurs aux habitants de maisons individuelles. Il suffit de s'inscrire en mairie et de suivre une formation d'une heure pour savoir bien utiliser l'appareil.",
      prompt: "Que faut-il faire pour recevoir un composteur ?",
      options: ["S'inscrire et suivre une formation", "Payer un petit montant", "Habiter en appartement", "Acheter du terreau"],
      correct: "A",
      explanation: "L'inscription en mairie et une formation d'une heure sont les deux conditions pour obtenir le composteur gratuit.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Le prix du pain a augmenté de dix centimes en un an. Les boulangers expliquent que cette hausse reflète celle de la farine et de l'énergie, mais précisent qu'ils n'ont pas répercuté la totalité de ces coûts pour ne pas perdre leur clientèle.",
      prompt: "Que précisent les boulangers ?",
      options: ["Ils n'ont pas répercuté tous leurs coûts", "Ils ont doublé leurs prix", "Ils ont perdu tous leurs clients", "Ils ferment leurs boutiques"],
      correct: "A",
      explanation: "Les boulangers disent n'avoir répercuté qu'une partie de la hausse des coûts, par crainte de perdre des clients.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Une étude montre que les élèves qui pratiquent la musique pendant plusieurs années réussissent mieux en mathématiques. Les auteurs invitent toutefois à la prudence : il n'est pas prouvé que la musique soit la cause de ces progrès, car ces familles ont souvent des conditions de vie plus favorables.",
      prompt: "Pourquoi les auteurs invitent-ils à la prudence ?",
      options: ["La cause de la réussite n'est pas prouvée", "Les résultats sont mauvais", "L'étude est trop ancienne", "La musique est trop chère"],
      correct: "A",
      explanation: "Les auteurs rappellent que la corrélation ne prouve pas la causalité, les conditions familiales pouvant jouer un rôle.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "L'exposition consacrée à la photographie de rue réunit une centaine de clichés pris dans quinze pays. Ce qui frappe le visiteur, c'est la place accordée aux anonymes : aucun grand nom, mais des visages ordinaires saisis dans leur quotidien.",
      prompt: "Qu'est-ce qui frappe le visiteur de l'exposition ?",
      options: ["La place donnée aux anonymes", "La présence de photographes célèbres", "Le nombre de pays visités", "Le prix des clichés"],
      correct: "A",
      explanation: "L'exposition met en avant des anonymes plutôt que des célébrités.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les nutritionnistes recommandent de limiter les aliments ultra-transformés, souvent riches en sucre et en sel. Ils rappellent qu'il ne s'agit pas de tout interdire, mais de privilégier des produits bruts et de cuisiner davantage à la maison.",
      prompt: "Que recommandent les nutritionnistes ?",
      options: ["Privilégier les produits bruts", "Supprimer tous les aliments", "Manger plus de sel", "Éviter de cuisiner"],
      correct: "A",
      explanation: "Ils conseillent de limiter les produits ultra-transformés et de cuisiner des produits bruts à la maison.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les voitures électriques séduisent de plus en plus d'automobilistes. Pourtant, le manque de bornes de recharge, notamment dans les petites villes, reste un frein majeur, et les professionnels du secteur reconnaissent que le déploiement du réseau prend du retard.",
      prompt: "Quel frein à l'achat de voitures électriques est évoqué ?",
      options: ["Le manque de bornes de recharge", "Le bruit du moteur", "Le design des voitures", "La vitesse maximale"],
      correct: "A",
      explanation: "L'insuffisance des bornes de recharge, surtout hors des grandes villes, freine l'adoption des véhicules électriques.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "Dans les villages de montagne, les médecins se font rares. Pour y remédier, la région finance des cabinets partagés et propose des logements aux jeunes praticiens qui acceptent de s'installer pour au moins trois ans.",
      prompt: "Comment la région attire-t-elle de jeunes médecins ?",
      options: ["En finançant des cabinets et en proposant des logements", "En offrant des voitures", "En réduisant la durée des études", "En supprimant des taxes"],
      correct: "A",
      explanation: "La région aide à créer des cabinets partagés et met des logements à disposition de ceux qui s'engagent trois ans.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "Le débat sur le vote obligatoire resurgit à chaque scrutin marqué par une forte abstention. Ses partisans y voient un moyen de revitaliser la participation, tandis que ses opposants objectent qu'il ne ferait que masquer un désintérêt plus profond, auquel il conviendrait plutôt de répondre par un renouvellement de l'offre politique.",
      prompt: "Quelle objection les opposants au vote obligatoire formulent-ils ?",
      options: ["Il masquerait un désintérêt plus profond", "Il coûterait trop cher", "Il serait contraire à la loi", "Il favoriserait un seul parti"],
      correct: "A",
      explanation: "Selon eux, le vote obligatoire cacherait la désaffection au lieu d'en traiter les causes.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "Les gestionnaires du littoral se trouvent face à un dilemme : défendre coûte que coûte des constructions menacées par l'érosion, au prix d'ouvrages onéreux et temporaires, ou accepter le recul du trait de côte et organiser la relocalisation des habitants, solution plus lucide mais socialement douloureuse.",
      prompt: "Quelle solution est jugée plus lucide mais douloureuse ?",
      options: ["Organiser la relocalisation des habitants", "Construire des digues", "Interdire l'accès à la plage", "Ignorer l'érosion"],
      correct: "A",
      explanation: "Accepter le recul de la côte et déplacer les habitants est présenté comme la voie la plus réaliste, malgré son coût humain.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "La recherche fondamentale, dont les retombées pratiques sont rarement prévisibles, souffre d'une logique de financement qui privilégie les projets à finalité immédiate. Or nombre d'innovations majeures sont nées de découvertes dont personne n'imaginait l'application au moment où elles furent réalisées.",
      prompt: "Quel argument est avancé en faveur de la recherche fondamentale ?",
      options: ["Beaucoup d'innovations viennent de découvertes sans application prévue", "Elle est toujours rentable", "Elle remplace la recherche appliquée", "Elle coûte moins cher"],
      correct: "A",
      explanation: "L'orateur rappelle que des innovations majeures sont issues de recherches sans finalité immédiate.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Si l'on se félicite volontiers de l'allongement de l'espérance de vie, on envisage moins souvent ses conséquences : financement des retraites, prise en charge de la dépendance, mais aussi redéfinition des âges de la vie, désormais moins nettement séparés par le passage du travail à l'inactivité.",
      prompt: "Que remet en cause l'allongement de l'espérance de vie ?",
      options: ["La séparation nette entre les âges de la vie", "La durée des études", "Le nombre de naissances", "L'existence des retraites"],
      correct: "A",
      explanation: "En plus des enjeux financiers, il brouille les frontières entre travail et inactivité, donc entre les âges.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "Nous aimons croire que nos choix émanent d'une volonté souveraine, alors qu'ils sont largement tributaires d'habitudes, de contextes et d'incitations que nous ne discernons pas. Cette lucidité ne ruine pourtant pas l'idée de liberté : elle la déplace, de la maîtrise illusoire vers la capacité de réviser ce que l'on a longtemps tenu pour évident.",
      prompt: "Comment l'orateur redéfinit-il la liberté ?",
      options: ["Comme la capacité de réviser ses évidences", "Comme une maîtrise totale de soi", "Comme l'absence d'habitudes", "Comme une illusion à abandonner"],
      correct: "A",
      explanation: "Plutôt qu'une maîtrise illusoire, la liberté devient pour lui la capacité de remettre en cause ce qui paraissait évident.",
    },
    {
      level: "C2",
      category: "littérature",
      transcription:
        "Le roman ne se contente pas de refléter la société : il en éprouve les représentations, les met à l'épreuve de destins singuliers. C'est en cela qu'il peut parfois mieux faire entendre ce que les analyses sociologiques abstraites laissent échapper, à savoir l'expérience vécue dans sa texture contradictoire.",
      prompt: "Que peut faire entendre le roman selon l'orateur ?",
      options: ["L'expérience vécue dans sa texture contradictoire", "Des statistiques précises", "Des lois sociologiques", "Des faits historiques exacts"],
      correct: "A",
      explanation: "Le roman restitue l'expérience vécue dans ses contradictions, que des analyses abstraites négligent.",
    },
    {
      level: "C2",
      category: "droit",
      transcription:
        "Le droit ne se réduit pas à un ensemble de règles que l'on appliquerait mécaniquement : il suppose toujours une interprétation, c'est-à-dire un va-et-vient entre la généralité de la norme et la particularité du cas. C'est dans cet écart, jamais entièrement résorbé, que se loge la part proprement humaine de la justice.",
      prompt: "Où se loge la part humaine de la justice selon l'orateur ?",
      options: ["Dans l'écart entre la norme et le cas particulier", "Dans l'application mécanique des règles", "Dans la rapidité des procès", "Dans la sévérité des peines"],
      correct: "A",
      explanation: "L'interprétation, qui relie la norme générale au cas singulier, constitue la dimension humaine de la justice.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "articles contractés",
      prompt: "Nous allons ___ marché samedi matin.",
      options: ["au", "à la", "du", "aux"],
      correct: "A",
      explanation: "« Marché » est masculin : « à + le » se contracte en « au ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Ce week-end, ma sœur ___ une surprise à nos parents.",
      options: ["prépare", "préparons", "préparent", "préparez"],
      correct: "A",
      explanation: "Le sujet « ma sœur » est à la troisième personne du singulier : « prépare ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "J'ai des questions ; je ___ poserai à la directrice demain.",
      options: ["les lui", "lui les", "leur les", "les leur"],
      correct: "A",
      explanation: "Avec deux pronoms de troisième personne, le complément direct précède l'indirect : « les lui poserai ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "L'ami ___ tu m'as présenté hier est très sympathique.",
      options: ["que", "qui", "dont", "où"],
      correct: "A",
      explanation: "« Que » est complément d'objet direct de « présenter » : tu m'as présenté cet ami.",
    },
    {
      level: "B1",
      category: "expression du temps",
      prompt: "Je n'ai pas eu de nouvelles de lui ___ trois semaines.",
      options: ["depuis", "pendant", "il y a", "dans"],
      correct: "A",
      explanation: "« Depuis » indique le point de départ d'une durée qui se poursuit jusqu'au moment présent.",
    },
    {
      level: "B1",
      category: "quantité",
      prompt: "Il y a ___ monde dans le métro à cette heure-ci !",
      options: ["beaucoup de", "beaucoup du", "beaucoup des", "beaucoup"],
      correct: "A",
      explanation: "Après un adverbe de quantité, on emploie « de » sans article : « beaucoup de monde ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Il ___ quand je suis sorti de chez moi.",
      options: ["pleuvait", "pleuvra", "a plu", "pleut"],
      correct: "A",
      explanation: "L'imparfait « pleuvait » décrit la situation en cours quand l'action ponctuelle (je suis sorti) est intervenue.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Elle voudrait que nous ___ l'accompagner à la gare.",
      options: ["puissions", "pouvons", "pourrons", "pourrions"],
      correct: "A",
      explanation: "« Vouloir que » est suivi du subjonctif : « que nous puissions ».",
    },
    {
      level: "B2",
      category: "hypothèse",
      prompt: "___ vous trouviez une erreur, signalez-la immédiatement.",
      options: ["Au cas où", "Pendant que", "Tandis que", "Même si"],
      correct: "A",
      explanation: "« Au cas où » exprime l'éventualité ; ici suivi du subjonctif imparfait ou du conditionnel : « au cas où vous trouveriez ».",
    },
    {
      level: "B2",
      category: "conséquence",
      prompt: "Il a fait si chaud ___ nous avons dû annuler la randonnée.",
      options: ["que", "pour que", "alors que", "parce que"],
      correct: "A",
      explanation: "La structure « si… que » exprime la conséquence : la chaleur est la cause de l'annulation.",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Elle a dit qu'elle ___ en retard à cause du trafic.",
      options: ["arriverait", "arrive", "arrivera", "arrivait en"],
      correct: "A",
      explanation: "Dans le discours rapporté au passé, le futur devient conditionnel : « elle arriverait en retard ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Dès que le client ___ le formulaire, nous traiterons sa demande.",
      options: ["aura rempli", "remplit", "remplissait", "a rempli"],
      correct: "A",
      explanation: "L'antériorité par rapport au futur s'exprime au futur antérieur : « aura rempli ».",
    },
    {
      level: "B2",
      category: "pronoms démonstratifs",
      prompt: "Parmi ces deux options, ___ qui me semble la meilleure est la première.",
      options: ["celle", "celui", "ceux", "ce"],
      correct: "A",
      explanation: "Le pronom démonstratif doit reprendre « option », féminin singulier : « celle qui ».",
    },
    {
      level: "B2",
      category: "participe passé",
      prompt: "Les lettres qu'elle a ___ hier sont arrivées ce matin.",
      options: ["écrites", "écrit", "écrite", "écrits"],
      correct: "A",
      explanation: "Le COD « que » (= les lettres) est placé avant l'auxiliaire avoir : le participe s'accorde, « écrites ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Bien que cette hypothèse ___ séduisante, elle reste à vérifier.",
      options: ["paraisse", "paraît", "paraîtra", "paraissait"],
      correct: "A",
      explanation: "« Bien que » exige le subjonctif : « bien que cette hypothèse paraisse séduisante ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Voici les conditions ___ dépend la réussite du projet.",
      options: ["desquelles", "dont", "que", "auxquelles"],
      correct: "A",
      explanation: "« Dépendre de » impose « de » ; avec un antécédent féminin pluriel on emploie « desquelles ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ lui reprochent ses collègues, c'est son manque de rigueur.",
      options: ["Ce que", "Ce qui", "Ce dont", "Celui que"],
      correct: "A",
      explanation: "« Ce que » est complément d'objet direct de « reprochent » dans la tournure d'insistance « ce que… c'est… ».",
    },
    {
      level: "C1",
      category: "restriction",
      prompt: "Il ___ restait plus qu'une heure avant la fermeture.",
      options: ["ne lui", "ne leur", "ne", "ne l'"],
      correct: "A",
      explanation: "« Il ne lui restait plus qu'une heure » : le pronom « lui » est complément indirect du verbe « rester ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Qu'il le ___ ou non, son attitude a blessé plusieurs collègues.",
      options: ["veuille", "veut", "voudrait", "voulait"],
      correct: "A",
      explanation: "« Qu'il le veuille ou non » est une tournure figée qui exige le subjonctif présent.",
    },
    {
      level: "C2",
      category: "concordance",
      prompt: "Fût-il le plus expérimenté, nul ne ___ prétendre tout savoir.",
      options: ["saurait", "sait", "saura", "sache"],
      correct: "A",
      explanation: "Après « fût-il » (concessif soutenu), le conditionnel « saurait » exprime la possibilité niée.",
    },
  ],
  reading: [
    {
      title: "Fermeture du gymnase",
      text: p(
        "Le gymnase Jean-Jaurès sera fermé du 3 au 14 avril pour des travaux de rénovation du sol.",
        "Les associations sportives peuvent utiliser la salle de la rue Pascal à la place, sur réservation auprès de la mairie.",
      ),
      question: {
        level: "B1",
        prompt: "Que peuvent faire les associations pendant les travaux ?",
        options: ["Utiliser une autre salle sur réservation", "Annuler leurs activités", "Se rendre au gymnase", "Attendre le 3 avril"],
        correct: "A",
        explanation: "L'avis propose la salle de la rue Pascal, à réserver auprès de la mairie.",
      },
    },
    {
      title: "Bon plan pour le train",
      text: p(
        "Avec la carte Jeune, voyagez à moitié prix en train tous les week-ends. La carte coûte 49 euros pour un an.",
        "Elle est réservée aux personnes de 12 à 27 ans et s'achète en gare ou sur le site de la compagnie.",
      ),
      question: {
        level: "B1",
        prompt: "À qui s'adresse la carte Jeune ?",
        options: ["Aux personnes de 12 à 27 ans", "Aux retraités", "Aux enfants de moins de dix ans", "À tous les voyageurs"],
        correct: "A",
        explanation: "Le texte réserve la carte aux personnes âgées de 12 à 27 ans.",
      },
    },
    {
      title: "Réponse à une annonce",
      text: p(
        "Bonjour, je suis intéressé par la table à vendre sur votre annonce. Est-elle toujours disponible ?",
        "Je peux passer samedi pour la récupérer avec une camionnette et vous payer en espèces.",
      ),
      question: {
        level: "B1",
        prompt: "Que propose l'auteur du message ?",
        options: ["Venir chercher la table samedi", "Livrer la table lui-même", "Négocier le prix par téléphone", "Payer par virement"],
        correct: "A",
        explanation: "L'auteur propose de passer samedi avec une camionnette et de payer en espèces.",
      },
    },
    {
      title: "Concours de pâtisserie",
      text: p(
        "L'école de cuisine organise un concours de pâtisserie ouvert à tous les amateurs. Inscription gratuite avant le 20 mai.",
        "Le gagnant recevra un stage d'une semaine dans une grande pâtisserie parisienne.",
      ),
      question: {
        level: "B1",
        prompt: "Que gagnera le vainqueur ?",
        options: ["Un stage dans une pâtisserie", "Un voyage à Paris", "Un four neuf", "Un livre de recettes"],
        correct: "A",
        explanation: "Le prix annoncé est un stage d'une semaine dans une grande pâtisserie parisienne.",
      },
    },
    {
      title: "Médiathèque : nouveau règlement",
      text: p(
        "À partir de lundi, il est possible d'emprunter dix documents au lieu de six pendant quatre semaines.",
        "Les retards seront facturés cinquante centimes par jour. Des boîtes de retour sont disponibles à l'extérieur.",
      ),
      question: {
        level: "B1",
        prompt: "Combien de documents peut-on désormais emprunter ?",
        options: ["Dix", "Six", "Quatre", "Cinquante"],
        correct: "A",
        explanation: "Le nouveau règlement autorise dix documents au lieu de six.",
      },
    },
    {
      title: "Les jardins familiaux",
      text: p(
        "Les jardins familiaux, longtemps associés aux ouvriers du siècle dernier, connaissent un regain d'intérêt. Les parcelles sont très demandées et les listes d'attente s'allongent dans la plupart des villes.",
        "Les municipalités tentent d'en créer davantage, mais le foncier disponible se fait rare, et les terrains urbains sont convoités pour la construction de logements.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi est-il difficile de créer de nouveaux jardins ?",
        options: ["Le foncier disponible est rare", "Personne n'en veut", "Les ouvriers refusent", "La mairie l'interdit"],
        correct: "A",
        explanation: "Les terrains urbains se raréfient et sont convoités pour la construction de logements.",
      },
    },
    {
      title: "Un collège sans sonnerie",
      text: p(
        "Dans ce collège, la sonnerie a été supprimée il y a un an. Les élèves se déplacent d'une salle à l'autre selon leur emploi du temps, sans signal sonore, et les enseignants constatent une ambiance plus calme dans les couloirs.",
        "Les équipes soulignent toutefois que quelques élèves ont encore du mal à gérer leur temps, ce qui occasionne des retards en début de cours.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté persiste après la suppression de la sonnerie ?",
        options: ["Quelques élèves arrivent en retard", "Les couloirs sont bruyants", "Les cours sont plus longs", "Les enseignants refusent le changement"],
        correct: "A",
        explanation: "Quelques élèves gèrent mal leur temps, ce qui provoque des retards en début de cours.",
      },
    },
    {
      title: "Un festival écoresponsable",
      text: p(
        "Le festival de musique de l'été dernier a réduit de moitié ses déchets : gobelets réutilisables, repas servis en vaisselle lavable et toilettes sèches ont remplacé les équipements jetables.",
        "Les organisateurs reconnaissent que ces choix ont un coût, répercuté en partie sur le prix des billets, mais constatent que le public soutient la démarche.",
      ),
      question: {
        level: "B2",
        prompt: "Comment le coût de ces choix est-il financé ?",
        options: ["En partie par le prix des billets", "Par une subvention de l'État", "Par la vente de déchets", "Par la fermeture du festival"],
        correct: "A",
        explanation: "Les organisateurs indiquent que le surcoût est en partie répercuté sur les billets.",
      },
    },
    {
      title: "Reconversion professionnelle",
      text: p(
        "De plus en plus de salariés quittent un emploi stable pour se reconvertir dans l'artisanat. Menuisiers, céramistes ou boulangers, ils disent chercher un travail plus concret et plus épanouissant.",
        "Le chemin n'est pas toujours simple : les revenus des premières années sont souvent plus modestes, et la formation demande du temps et des économies.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté les reconvertis rencontrent-ils ?",
        options: ["Des revenus plus modestes au début", "Un manque de clients garanti", "L'interdiction de changer de métier", "Des horaires de bureau"],
        correct: "A",
        explanation: "Les premières années, les revenus sont généralement plus faibles et la formation demande des économies.",
      },
    },
    {
      title: "Le recyclage des vêtements",
      text: p(
        "Chaque année, des centaines de milliers de tonnes de vêtements sont jetées. Pour limiter ce gaspillage, de nouveaux points de collecte ont été installés devant les supermarchés, où chacun peut déposer ses textiles usagés.",
        "Une partie est revendue, une autre transformée en chiffons ou en isolants, mais certains vêtements, trop abîmés, finissent malgré tout incinérés.",
      ),
      question: {
        level: "B2",
        prompt: "Que devient une partie des vêtements trop abîmés ?",
        options: ["Ils sont incinérés", "Ils sont revendus", "Ils sont offerts", "Ils sont transformés en isolants"],
        correct: "A",
        explanation: "Les vêtements trop abîmés ne sont pas réutilisables et finissent incinérés.",
      },
    },
    {
      title: "Les pharmacies de garde",
      text: p(
        "Dans les zones rurales, la fermeture de pharmacies oblige parfois les habitants à parcourir plus de vingt kilomètres pour obtenir un médicament. Certaines régions testent des distributeurs automatiques de médicaments accessibles toute la nuit.",
        "Les pharmaciens saluent l'initiative, à condition que la dispensation reste encadrée par un professionnel à distance, par visioconférence.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle condition les pharmaciens posent-ils ?",
        options: ["Un encadrement à distance par un professionnel", "La fermeture des pharmacies", "L'achat sans ordonnance", "La suppression de la visioconférence"],
        correct: "A",
        explanation: "Ils acceptent l'initiative si un professionnel supervise la délivrance par visioconférence.",
      },
    },
    {
      title: "La mobilité des étudiants",
      text: p(
        "Les programmes d'échanges universitaires permettent chaque année à des milliers d'étudiants de passer un semestre à l'étranger. L'expérience est jugée très formatrice, tant sur le plan linguistique que personnel.",
        "Mais le coût du logement et de la vie sur place reste élevé, et l'on constate que ces séjours profitent surtout aux étudiants issus de familles favorisées.",
      ),
      question: {
        level: "B2",
        prompt: "Que constate-t-on sur les bénéficiaires des échanges ?",
        options: ["Ils viennent surtout de familles favorisées", "Ils sont tous boursiers", "Ils parlent déjà trois langues", "Ils sont moins nombreux chaque année"],
        correct: "A",
        explanation: "Le coût élevé du séjour fait que ces échanges profitent surtout aux étudiants de milieux favorisés.",
      },
    },
    {
      title: "Les chiens d'assistance",
      text: p(
        "Dressés pour guider des personnes aveugles ou alerter des malentendants, les chiens d'assistance changent la vie de leurs bénéficiaires. Leur éducation dure près de deux ans et coûte plusieurs milliers d'euros, pris en charge par des associations.",
        "Le manque de dons ralentit toutefois la formation de nouveaux chiens, et la liste d'attente dépasse souvent trois ans.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi la liste d'attente est-elle longue ?",
        options: ["Les dons manquent pour former de nouveaux chiens", "Les chiens refusent de travailler", "Les personnes ne veulent plus de chiens", "L'éducation est gratuite"],
        correct: "A",
        explanation: "Faute de dons, les associations forment moins de chiens, ce qui allonge l'attente.",
      },
    },
    {
      title: "Le covoiturage scolaire",
      text: p(
        "Dans plusieurs communes, des parents organisent un ramassage scolaire à pied ou à vélo, encadré à tour de rôle par des volontaires. Ce système évite des dizaines de trajets en voiture chaque matin devant l'école.",
        "Les enseignants notent que les enfants arrivent plus calmes, mais le dispositif repose sur peu de personnes et peine à durer quand les bénévoles se découragent.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle fragilité présente ce ramassage scolaire ?",
        options: ["Il dépend d'un petit nombre de bénévoles", "Il coûte trop cher aux familles", "Il rend les enfants nerveux", "Il est interdit par l'école"],
        correct: "A",
        explanation: "Le dispositif repose sur peu de personnes et risque de s'arrêter si les bénévoles se découragent.",
      },
    },
    {
      title: "Des toits solaires pour l'école",
      text: p(
        "La commune a équipé le toit de l'école de panneaux solaires. L'électricité produite couvre environ la moitié des besoins du bâtiment, et le surplus est revendu au réseau pour financer des activités scolaires.",
        "Les élèves suivent la production sur un écran dans le hall, ce qui nourrit des projets en classe sur l'énergie et le climat.",
      ),
      question: {
        level: "B2",
        prompt: "À quoi sert l'argent du surplus d'électricité ?",
        options: ["À financer des activités scolaires", "À payer les enseignants", "À acheter des écrans", "À réduire la taxe locale"],
        correct: "A",
        explanation: "Le surplus est revendu au réseau et finance des activités pour les élèves.",
      },
    },
    {
      title: "La parole aux habitants",
      text: p(
        "De nombreuses communes ont mis en place des budgets participatifs : une part du budget municipal est réservée à des projets proposés, puis votés, par les habitants. Plantation d'arbres, aires de jeux, jardins partagés figurent parmi les réalisations les plus fréquentes.",
        "Les élus y voient un moyen de renouer avec des citoyens souvent défiants envers la politique. Cependant, la participation reste inégale : ce sont surtout des personnes déjà engagées qui votent, et les quartiers populaires restent peu représentés. Les collectivités multiplient donc les rencontres de terrain, pour inviter ceux que les réunions publiques n'atteignent pas et recueillir des idées plus variées.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle limite des budgets participatifs le texte souligne-t-il ?",
        options: ["Les quartiers populaires y participent peu", "Ils coûtent plus cher que prévu", "Les élus les refusent", "Ils ne produisent aucune réalisation"],
        correct: "A",
        explanation: "La participation reste inégale, avec une faible représentation des quartiers populaires.",
      },
    },
    {
      title: "Les langues régionales à l'école",
      text: p(
        "L'enseignement des langues régionales connaît un regain d'intérêt depuis quelques années, porté par des parents soucieux de transmettre un héritage culturel et par des enseignants convaincus des bienfaits du bilinguisme précoce. Les filières bilingues se développent, notamment en Bretagne, au Pays basque et en Corse.",
        "Leur essor rencontre néanmoins des obstacles : pénurie d'enseignants formés, financements limités et inégalités d'accès d'un territoire à l'autre. Certains observateurs soulignent aussi que l'école seule ne saurait sauver une langue : sans usages quotidiens, dans la famille, les médias ou les commerces, l'apprentissage scolaire risque de rester une compétence plus qu'une pratique vivante.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi l'école seule ne peut-elle pas sauver une langue ?",
        options: ["Sans usages quotidiens, elle reste une compétence scolaire", "Les enseignants refusent d'enseigner", "Les parents s'y opposent", "Les langues régionales n'ont pas d'écriture"],
        correct: "A",
        explanation: "Faute d'usages dans la vie quotidienne, l'apprentissage scolaire reste une compétence et non une pratique vivante.",
      },
    },
    {
      title: "Le marché de l'art et la spéculation",
      text: p(
        "Le marché de l'art connaît depuis vingt ans une envolée des prix qui a transformé certaines œuvres en placements financiers. Des collectionneurs achètent moins par passion que pour diversifier leur patrimoine, et des tableaux circulent entre entrepôts sans jamais être exposés.",
        "Cette logique spéculative inquiète nombre d'artistes et de conservateurs. Elle favorise les noms déjà cotés au détriment des créateurs émergents, et réduit la diversité de ce qui est montré au public. Face à ce phénomène, des musées plaident pour des politiques d'acquisition plus ambitieuses, afin de préserver dans les collections publiques des œuvres dont le sort ne dépende pas des seules fluctuations du marché.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle conséquence de la spéculation est dénoncée ?",
        options: ["Elle favorise les artistes déjà cotés", "Elle augmente le nombre d'expositions", "Elle baisse les prix", "Elle facilite l'accès des jeunes artistes"],
        correct: "A",
        explanation: "La spéculation avantage les noms établis et réduit la diversité de ce qui est présenté au public.",
      },
    },
    {
      title: "Le sommeil et le travail de nuit",
      text: p(
        "Environ un salarié sur dix travaille la nuit, dans des secteurs aussi divers que la santé, la logistique ou la restauration. Ces horaires, indispensables au fonctionnement du pays, ont pourtant des effets documentés sur la santé : troubles du sommeil, fatigue chronique, risques cardiovasculaires accrus.",
        "Les compensations financières, souvent présentées comme la contrepartie de ces contraintes, ne suffisent pas à les effacer. Des chercheurs plaident pour un meilleur suivi médical et pour une organisation du travail qui limite les rotations trop rapides, car l'alternance désordonnée entre jour et nuit est ce que l'organisme supporte le plus mal.",
      ),
      question: {
        level: "C1",
        prompt: "Que supporte le moins bien l'organisme selon le texte ?",
        options: ["L'alternance désordonnée entre jour et nuit", "Le travail le dimanche", "Les congés prolongés", "Le travail en équipe"],
        correct: "A",
        explanation: "Les chercheurs soulignent que ce sont les rotations rapides et désordonnées qui perturbent le plus l'organisme.",
      },
    },
    {
      title: "Le tourisme de masse en question",
      text: p(
        "Certaines destinations, victimes de leur succès, voient leur identité dénaturée par l'afflux de visiteurs. Les habitants quittent les centres historiques devenus inabordables, les commerces de proximité cèdent la place à des boutiques de souvenirs et la ville, peu à peu, devient un décor.",
        "Pour réagir, des municipalités limitent les locations touristiques de courte durée, instaurent des quotas de visiteurs ou taxent davantage les séjours. Ces mesures suscitent des critiques : on leur reproche de pénaliser l'économie locale. Mais elles posent une question de fond : jusqu'où une ville peut-elle vendre son attractivité sans perdre ce qui la rend attractive ?",
      ),
      question: {
        level: "C1",
        prompt: "Quelle question de fond les mesures posent-elles ?",
        options: ["Jusqu'où vendre son attractivité sans la perdre", "Comment attirer plus de visiteurs", "Comment réduire la taxe de séjour", "Comment supprimer les commerces"],
        correct: "A",
        explanation: "Les mesures interrogent la limite à ne pas dépasser pour qu'une ville exploite son attrait sans le détruire.",
      },
    },
    {
      title: "L'illusion de la transparence",
      text: p(
        "L'exigence de transparence, érigée en vertu cardinale des institutions démocratiques, repose sur une intuition séduisante : ce qui est visible serait contrôlable, donc légitime. Mais la visibilité n'est pas la compréhension. Publier des milliers de documents ne rend pas un processus plus intelligible si l'on ne dispose ni des outils ni du temps pour les interpréter, et peut même servir à noyer l'essentiel dans l'accessoire.",
        "Il ne s'agit pas de renoncer à l'ouverture, mais de la penser comme un travail de médiation plutôt que comme un simple dépôt d'informations. Une institution véritablement transparente est celle qui accepte d'expliquer, de hiérarchiser, de se soumettre à des questions, c'est-à-dire de renoncer à l'avantage que lui confère la maîtrise de l'information disponible, et donc au confort de ne rendre des comptes qu'à ceux qui savent déjà où regarder.",
      ),
      question: {
        level: "C2",
        prompt: "Que signifie, pour l'auteur, une véritable transparence ?",
        options: ["Expliquer et accepter les questions plutôt que publier en masse", "Publier le maximum de documents", "Cacher les informations sensibles", "Supprimer les institutions"],
        correct: "A",
        explanation: "Pour l'auteur, la transparence est un travail de médiation : expliquer, hiérarchiser et répondre aux questions.",
      },
    },
    {
      title: "Le travail et la valeur",
      text: p(
        "Nous associons spontanément la valeur d'un travail à sa rémunération, comme si le marché était le meilleur juge de l'utilité sociale. Or l'expérience récente a rappelé que des métiers indispensables, aides-soignants, caissiers, éboueurs, sont souvent parmi les moins bien payés, tandis que d'autres, dont la contribution collective est plus incertaine, bénéficient de rémunérations considérables.",
        "Ce décalage n'est pas qu'une anomalie : il révèle que le salaire dépend moins de l'utilité que du rapport de force, de la rareté des compétences et du pouvoir de négociation. Reconnaître cette réalité ne revient pas à nier l'intérêt du marché, mais à admettre qu'il ne dit pas tout de la valeur, et qu'il appartient aux sociétés de décider de ce qu'elles souhaitent honorer, au-delà de ce qu'elles rémunèrent, et de ce qu'elles jugent essentiel.",
      ),
      question: {
        level: "C2",
        prompt: "De quoi le salaire dépend-il selon l'auteur ?",
        options: ["Du rapport de force et de la rareté plus que de l'utilité", "Uniquement de l'utilité sociale", "Du nombre d'heures travaillées", "De la décision de l'État seul"],
        correct: "A",
        explanation: "Le texte explique que le salaire reflète surtout le pouvoir de négociation et la rareté des compétences.",
      },
    },
    {
      title: "Le paradoxe de la mémoire numérique",
      text: p(
        "Jamais les sociétés n'ont produit autant de traces d'elles-mêmes : photographies, messages, vidéos s'accumulent à un rythme que les historiens d'hier n'auraient pu imaginer. On pourrait en conclure que la mémoire collective n'a jamais été aussi bien assurée. Pourtant, cette abondance recèle une fragilité : les formats changent, les plateformes disparaissent, les supports s'altèrent, et ce qui semblait éternel peut s'évanouir en quelques années.",
        "À l'inverse, un manuscrit ancien, dont la survie fut longtemps une affaire de hasard et de soins, nous parvient parfois intact. Le paradoxe tient à ceci : la facilité de produire n'a pas entraîné celle de conserver. Garantir la transmission suppose donc des choix et des moyens qu'aucune technologie ne dispense, et qui relèvent, en dernière analyse, d'une volonté collective de léguer quelque chose à ceux qui viendront.",
      ),
      question: {
        level: "C2",
        prompt: "Quel est le paradoxe décrit dans le texte ?",
        options: ["Produire des traces est facile, les conserver ne l'est pas", "Les manuscrits disparaissent plus vite que les vidéos", "Les historiens n'utilisent plus d'archives", "La mémoire collective est détruite volontairement"],
        correct: "A",
        explanation: "L'abondance de traces numériques ne garantit pas leur conservation, qui exige des choix et des moyens.",
      },
    },
    {
      title: "L'exil et la langue",
      text: p(
        "Écrire dans une langue qui n'est pas la sienne est, pour certains écrivains exilés, une façon d'échapper aux assignations. La langue d'adoption offre une distance, une neutralité relative, qui leur permet d'aborder des expériences que la langue maternelle, saturée de souvenirs et d'interdits, ne leur laisserait pas formuler. Ils y gagnent une liberté, mais aussi une vigilance permanente, car chaque mot doit être éprouvé.",
        "Cette position, souvent présentée comme un déracinement, peut donc être comprise comme une fécondité. L'écrivain qui travaille dans une langue apprise en perçoit les possibilités avec une acuité que ses natifs ne possèdent plus, rendus aveugles par l'habitude. Ainsi, loin de n'être qu'une perte, l'exil linguistique peut devenir, pour la langue elle-même, une chance de renouvellement.",
      ),
      question: {
        level: "C2",
        prompt: "Quel avantage l'écrivain tire-t-il d'une langue apprise ?",
        options: ["Une acuité sur ses possibilités et une liberté de ton", "Une maîtrise parfaite dès le départ", "L'oubli de sa langue maternelle", "Un public plus large"],
        correct: "A",
        explanation: "La langue d'adoption offre une distance et une vigilance qui permettent de percevoir ses ressources et de s'exprimer plus librement.",
      },
    },
    {
      title: "La science et le doute",
      text: p(
        "On présente volontiers la science comme un corpus de certitudes, alors qu'elle se définit plutôt par une manière de douter : formuler des hypothèses, les soumettre à l'épreuve, accepter qu'elles soient réfutées. Cette posture, féconde pour la connaissance, déroute le public quand elle s'exprime dans l'urgence, comme lors des crises sanitaires, où les avis changent à mesure que les données s'accumulent.",
        "Le malentendu naît d'une attente de vérité immédiate que la méthode scientifique ne peut satisfaire. Les révisions, loin d'attester une faillite, témoignent de son bon fonctionnement. Aussi importe-t-il d'expliquer non seulement les résultats, mais la manière dont ils sont produits, car la confiance durable ne se fonde pas sur l'infaillibilité supposée des savants, mais sur l'intelligibilité de leur démarche.",
      ),
      question: {
        level: "C2",
        prompt: "Sur quoi la confiance durable doit-elle reposer selon l'auteur ?",
        options: ["Sur la compréhension de la démarche scientifique", "Sur l'infaillibilité des savants", "Sur l'urgence des décisions", "Sur l'absence de débat"],
        correct: "A",
        explanation: "L'auteur juge que la confiance se fonde sur l'intelligibilité de la méthode, non sur une supposée infaillibilité.",
      },
    },
  ],
});
