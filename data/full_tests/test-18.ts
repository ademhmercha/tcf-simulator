import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 18.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_18 = defineFullTest({
  number: 18,
  description:
    "Dix-huitième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, je voudrais un billet pour Toulouse, s'il vous plaît. Aller simple. Le train part à quelle heure ? À onze heures dix.",
      prompt: "À quelle heure part le train pour Toulouse ?",
      options: ["À onze heures dix", "À dix heures onze", "À une heure dix", "À douze heures"],
      correct: "A",
      explanation: "L'employé indique que le train part à onze heures dix.",
    },
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Ce week-end, je vais à la montagne avec mes amis. Nous partons samedi matin en voiture. Nous dormons dans un petit hôtel.",
      prompt: "Comment la personne va-t-elle à la montagne ?",
      options: ["En voiture", "En train", "En avion", "À vélo"],
      correct: "A",
      explanation: "Le groupe part samedi matin en voiture.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Ce manteau est très joli. Il coûte quatre-vingts euros. Avez-vous la même couleur en plus grand ? Oui, je vais voir au fond du magasin.",
      prompt: "Combien coûte le manteau ?",
      options: ["Quatre-vingts euros", "Quarante euros", "Quatorze euros", "Cent euros"],
      correct: "A",
      explanation: "Le prix annoncé est de quatre-vingts euros.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Bonjour, je vous appelle pour l'annonce du studio. Est-il encore disponible ? Oui, il est libre dès le premier du mois. Le loyer est de quatre cent cinquante euros.",
      prompt: "À partir de quand le studio est-il disponible ?",
      options: ["Dès le premier du mois", "Dès demain", "Dans une semaine", "À la fin de l'année"],
      correct: "A",
      explanation: "Le studio est libre dès le premier du mois, pour quatre cent cinquante euros.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Le médecin m'a conseillé de me reposer pendant trois jours. Je dois prendre un comprimé après chaque repas et boire beaucoup d'eau.",
      prompt: "Que doit faire le patient après chaque repas ?",
      options: ["Prendre un comprimé", "Faire une promenade", "Boire du thé", "Dormir une heure"],
      correct: "A",
      explanation: "Il doit prendre un comprimé après chaque repas.",
    },
    {
      level: "A2",
      category: "travail",
      transcription:
        "Madame Durand, la réunion de ce matin est annulée. Le directeur est absent. Elle est reportée à jeudi, à quatorze heures, en salle de conférence.",
      prompt: "Quand la réunion aura-t-elle lieu ?",
      options: ["Jeudi à quatorze heures", "Ce matin", "Vendredi matin", "Jeudi à dix heures"],
      correct: "A",
      explanation: "La réunion est reportée à jeudi, quatorze heures.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "La ligne de bus numéro sept est déviée ce week-end à cause d'un marché. L'arrêt de la place du marché est supprimé. Utilisez l'arrêt de la rue Jaurès.",
      prompt: "Quel arrêt faut-il utiliser ce week-end ?",
      options: ["Celui de la rue Jaurès", "Celui de la place du marché", "Celui de la gare", "Celui de la mairie"],
      correct: "A",
      explanation: "L'arrêt du marché est supprimé ; il faut utiliser celui de la rue Jaurès.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Les élèves de seconde partiront en voyage à Londres au mois de mars. Les familles doivent verser un acompte de cent euros avant la fin du mois pour confirmer l'inscription.",
      prompt: "Que doivent faire les familles avant la fin du mois ?",
      options: ["Verser un acompte de cent euros", "Acheter les billets d'avion", "Fournir un passeport neuf", "Réserver un hôtel"],
      correct: "A",
      explanation: "Pour confirmer l'inscription, un acompte de cent euros est demandé avant la fin du mois.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Je vous écris au sujet de l'offre de poste de comptable. Mon expérience de cinq ans dans une petite entreprise me semble correspondre à vos attentes. Je suis disponible pour un entretien dès la semaine prochaine.",
      prompt: "Pourquoi la personne écrit-elle ?",
      options: ["Pour postuler à un emploi de comptable", "Pour démissionner", "Pour demander un congé", "Pour réclamer un salaire"],
      correct: "A",
      explanation: "Elle répond à une offre de poste de comptable et propose un entretien.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Je suis vraiment désolé d'avoir oublié ton anniversaire hier. J'ai eu une semaine épuisante. Pour me faire pardonner, je t'invite au restaurant vendredi soir, c'est moi qui paie.",
      prompt: "Comment la personne veut-elle se faire pardonner ?",
      options: ["En invitant son ami au restaurant", "En offrant un cadeau coûteux", "En organisant une fête", "En appelant ses amis"],
      correct: "A",
      explanation: "Elle propose un dîner au restaurant vendredi soir, à ses frais.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "Le conseil municipal a voté l'installation de panneaux solaires sur le toit de la médiathèque. Le chantier commencera au printemps et la bibliothèque restera ouverte pendant les travaux.",
      prompt: "Que se passera-t-il pour la bibliothèque pendant les travaux ?",
      options: ["Elle restera ouverte", "Elle fermera un mois", "Elle changera d'adresse", "Elle sera détruite"],
      correct: "A",
      explanation: "La médiathèque restera ouverte au public pendant l'installation des panneaux.",
    },
    {
      level: "B1",
      category: "santé",
      transcription:
        "La mairie organise samedi une matinée de dépistage gratuit du diabète sur la place centrale. Il suffit de venir sans rendez-vous, de préférence à jeun. Les résultats sont donnés immédiatement.",
      prompt: "Quand les résultats sont-ils communiqués ?",
      options: ["Immédiatement", "Dans une semaine", "Par courrier", "Le lendemain"],
      correct: "A",
      explanation: "Les résultats du dépistage sont remis sur place, tout de suite.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Face à la hausse des prix, de nombreux consommateurs se tournent vers les marques distributeur. Les industriels s'inquiètent de cette évolution, craignant de perdre des parts de marché, tandis que les distributeurs y voient l'occasion de renforcer leur image auprès de clients attentifs à leur budget.",
      prompt: "Quelle est la réaction des distributeurs ?",
      options: ["Ils y voient l'occasion de renforcer leur image", "Ils craignent de perdre des clients", "Ils baissent leurs marges à zéro", "Ils suppriment leurs marques"],
      correct: "A",
      explanation: "Les distributeurs profitent de cette tendance pour consolider leur image auprès de clients soucieux de leur budget.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "L'apprentissage des langues étrangères est jugé insuffisant par de nombreux employeurs. Si les élèves étudient l'anglais dès l'école primaire, peu atteignent un niveau leur permettant de converser, faute de pratique orale régulière.",
      prompt: "Pourquoi les élèves ne sont-ils pas assez à l'aise en langue étrangère ?",
      options: ["Ils manquent de pratique orale régulière", "Ils commencent trop tôt", "Ils étudient trop de langues", "Ils n'ont pas de manuels"],
      correct: "A",
      explanation: "Le principal handicap vient du peu de pratique orale tout au long de la scolarité.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "La médiathèque lance un cycle de rencontres avec des romanciers, des illustrateurs et des traducteurs. L'objectif est de montrer l'envers du décor de la fabrication d'un livre, et de susciter des vocations parmi les adolescents du quartier.",
      prompt: "Quel est l'objectif de ces rencontres ?",
      options: ["Montrer comment un livre est fabriqué et susciter des vocations", "Vendre des livres neufs", "Fermer la médiathèque", "Réserver l'accès aux adultes"],
      correct: "A",
      explanation: "Les rencontres dévoilent les coulisses du livre et visent à donner envie aux jeunes d'y travailler.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Le manque de sommeil chronique touche un adulte sur trois. Les spécialistes en rappellent les conséquences sur la concentration et l'humeur, et conseillent de réserver la chambre au repos, sans écran, avec des horaires de coucher réguliers.",
      prompt: "Quel conseil les spécialistes donnent-ils ?",
      options: ["Réserver la chambre au repos, sans écran", "Dormir en journée", "Boire du café le soir", "Se coucher à des heures variables"],
      correct: "A",
      explanation: "Ils recommandent une chambre sans écran et des horaires de coucher réguliers.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les objets connectés, de la montre à la brosse à dents, se multiplient. Leurs fabricants vantent un suivi personnalisé de la santé, mais des associations alertent sur la revente possible des données collectées à des tiers, souvent à l'insu des utilisateurs.",
      prompt: "De quoi les associations alertent-elles ?",
      options: ["De la revente possible des données à l'insu des utilisateurs", "Du prix des objets", "De leur fragilité", "De leur taille"],
      correct: "A",
      explanation: "Elles craignent que les données personnelles soient revendues sans que les utilisateurs le sachent.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "L'accueil des réfugiés mobilise de nombreux bénévoles dans les petites communes. Les habitants apprennent aux nouveaux arrivants le français et les aident dans leurs démarches, mais les élus soulignent que ces efforts reposent trop sur la bonne volonté de quelques-uns et manquent de soutien durable.",
      prompt: "Que soulignent les élus ?",
      options: ["Les efforts reposent sur quelques bénévoles et manquent de soutien durable", "Les réfugiés refusent d'apprendre", "Les communes ont trop de moyens", "Les habitants sont hostiles"],
      correct: "A",
      explanation: "Ils déplorent que l'accueil dépende trop de la bonne volonté de quelques personnes.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "La notion de souveraineté alimentaire revient dans le débat public : garantir à un pays la capacité de nourrir sa population sans dépendre excessivement d'importations. Mais l'objectif reste ambigu, car il suppose d'arbitrer entre autonomie, coût pour le consommateur et ouverture aux échanges internationaux.",
      prompt: "Pourquoi l'objectif de souveraineté alimentaire est-il ambigu ?",
      options: ["Il suppose d'arbitrer entre autonomie, coût et ouverture", "Il est déjà atteint", "Il ne concerne que l'export", "Il interdit tout échange"],
      correct: "A",
      explanation: "Atteindre cette souveraineté suppose de concilier des exigences parfois contradictoires.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "L'artificialisation des sols, c'est-à-dire leur recouvrement par du béton ou du bitume, menace la biodiversité et aggrave le risque d'inondation. Les pouvoirs publics ont fixé un objectif de réduction, mais les élus locaux s'inquiètent d'un frein à la construction de logements, pourtant nécessaires.",
      prompt: "Pourquoi les élus locaux sont-ils inquiets ?",
      options: ["L'objectif pourrait freiner la construction de logements", "Les sols sont trop chers", "La biodiversité n'existe plus", "Les inondations ont cessé"],
      correct: "A",
      explanation: "Limiter l'artificialisation risque de ralentir la construction des logements dont le pays a besoin.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "Les publications scientifiques sont de plus en plus nombreuses, au point que nul chercheur ne peut suivre l'ensemble de son domaine. Cette inflation incite à publier vite plutôt qu'à approfondir, et pose la question de la qualité du travail évalué par les pairs, déjà submergés de demandes.",
      prompt: "Quelle conséquence de l'inflation des publications est évoquée ?",
      options: ["On publie vite plutôt qu'à approfondir", "Les chercheurs lisent tout", "Les revues sont moins nombreuses", "La qualité s'améliore"],
      correct: "A",
      explanation: "Le volume de publications encourage la rapidité au détriment de la profondeur.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "L'allongement des études, la précarité de l'emploi et le coût du logement retardent l'accès des jeunes à l'autonomie. On parle volontiers d'un âge adulte différé, mais cette expression masque que le phénomène touche inégalement les milieux sociaux, les plus favorisés bénéficiant plus souvent de l'aide de leurs familles.",
      prompt: "Que masque l'expression « âge adulte différé » ?",
      options: ["Le fait que le phénomène touche inégalement les milieux", "Une baisse des études", "Une hausse des salaires", "Un retour à la campagne"],
      correct: "A",
      explanation: "L'expression ne dit pas que les jeunes de milieux favorisés sont mieux soutenus par leur famille.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "Nous attribuons volontiers nos réussites à notre mérite et nos échecs aux circonstances, alors que nous jugeons autrui à l'inverse. Ce biais, qui nous ménage, n'est pas qu'une faiblesse psychologique : il structure notre manière de concevoir la responsabilité et colore, sans que nous en ayons conscience, nos jugements les plus sérieux.",
      prompt: "Quel effet ce biais produit-il selon l'orateur ?",
      options: ["Il influence nos jugements sur la responsabilité, souvent sans que nous le sachions", "Il nous rend plus justes", "Il disparaît avec l'âge", "Il n'affecte que les enfants"],
      correct: "A",
      explanation: "Le biais colore nos jugements, y compris les plus sérieux, à notre insu.",
    },
    {
      level: "C2",
      category: "économie",
      transcription:
        "La notion de bien commun suppose que certaines ressources, l'eau, l'air, la connaissance, ne sauraient être traitées comme de simples marchandises. Mais encore faut-il décider qui en définit l'usage, et selon quelles règles : le bien commun ne se confond ni avec le bien public géré par l'État, ni avec le bien privé dont dispose un propriétaire.",
      prompt: "Qu'est-ce qui distingue le bien commun selon l'orateur ?",
      options: ["Il n'est ni un bien public d'État ni un bien privé", "Il est toujours géré par l'État", "Il appartient à un propriétaire unique", "Il se vend sur les marchés"],
      correct: "A",
      explanation: "Le bien commun suppose une gestion particulière, distincte du bien public et du bien privé.",
    },
    {
      level: "C2",
      category: "langue",
      transcription:
        "Traduire une œuvre, c'est choisir : conserver la musique du texte au prix de l'exactitude, ou privilégier la précision en sacrifiant le rythme. Aucune solution n'est satisfaisante en soi, et c'est précisément dans cette impossibilité de tout garder que se joue le travail du traducteur, qui doit assumer ses renoncements.",
      prompt: "En quoi consiste le travail du traducteur selon l'orateur ?",
      options: ["Assumer ses renoncements face à l'impossibilité de tout garder", "Reproduire chaque mot à l'identique", "Remplacer l'œuvre par un commentaire", "Éviter toute interprétation"],
      correct: "A",
      explanation: "Le traducteur doit choisir entre rythme et exactitude, et accepter de renoncer à une partie de l'œuvre.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "articles",
      prompt: "Pour le dîner, je prépare ___ soupe de légumes.",
      options: ["une", "un", "des", "de"],
      correct: "A",
      explanation: "« Soupe » est féminin singulier : l'article indéfini est « une ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Mes voisins ___ souvent des fêtes le week-end.",
      options: ["organisent", "organise", "organisons", "organisez"],
      correct: "A",
      explanation: "Le sujet « mes voisins » est à la troisième personne du pluriel : « organisent ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Tu veux du thé ? Oui, j'___ prendrai volontiers une tasse.",
      options: ["en", "y", "le", "lui"],
      correct: "A",
      explanation: "« En » remplace le complément partitif « du thé » dans la phrase.",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "C'est la maison ___ mes grands-parents ont vécu toute leur vie.",
      options: ["où", "que", "dont", "qui"],
      correct: "A",
      explanation: "« Où » reprend un lieu : « mes grands-parents ont vécu dans cette maison ».",
    },
    {
      level: "B1",
      category: "futur",
      prompt: "L'an prochain, nous ___ un voyage en Écosse.",
      options: ["ferons", "faisons", "ferions", "avons fait"],
      correct: "A",
      explanation: "« L'an prochain » appelle le futur simple : « nous ferons ».",
    },
    {
      level: "B1",
      category: "conditionnel",
      prompt: "Si j'étais riche, je ___ le tour du monde en bateau.",
      options: ["ferais", "ferai", "faisais", "fais"],
      correct: "A",
      explanation: "Après « si + imparfait », la principale se met au conditionnel présent : « ferais ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Il a réussi à convaincre son patron ___ lui accorder un jour de congé.",
      options: ["de", "à", "pour", "sur"],
      correct: "A",
      explanation: "« Convaincre quelqu'un de + infinitif » est la construction correcte du verbe.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il est important que chaque participant ___ son avis.",
      options: ["donne", "donnera", "donnait", "donne que"],
      correct: "A",
      explanation: "« Il est important que » est suivi du subjonctif présent : « que chaque participant donne ».",
    },
    {
      level: "B2",
      category: "expression de l'opposition",
      prompt: "Il a de bons résultats ___ il ne travaille presque jamais.",
      options: ["alors qu'", "puisqu'", "donc qu'", "parce qu'"],
      correct: "A",
      explanation: "« Alors que » exprime l'opposition entre les bons résultats et l'absence de travail.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Ce roman ___ en vingt langues depuis sa publication.",
      options: ["a été traduit", "a traduit", "traduisait", "est traduisant"],
      correct: "A",
      explanation: "Le roman subit l'action : passif au passé composé, « a été traduit ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Si tu avais écouté mon conseil, tu ne ___ pas dans cette situation.",
      options: ["serais", "es", "seras", "étais"],
      correct: "A",
      explanation: "Hypothèse irréelle dans le passé, conséquence au présent : conditionnel présent « serais ».",
    },
    {
      level: "B2",
      category: "participe présent",
      prompt: "___ à Lyon depuis dix ans, elle connaît tous les bons restaurants.",
      options: ["Habitant", "Habiter", "Habité", "Habitée"],
      correct: "A",
      explanation: "Le participe présent « habitant » exprime la cause : parce qu'elle habite à Lyon depuis dix ans.",
    },
    {
      level: "B2",
      category: "pronoms démonstratifs",
      prompt: "Je préfère cette maison à ___ que nous avons visitée hier.",
      options: ["celle", "celui", "ceux", "ce"],
      correct: "A",
      explanation: "Le pronom démonstratif féminin singulier « celle » reprend « maison ».",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Il a demandé aux élèves ___ ils avaient compris la leçon.",
      options: ["s'", "si", "qu'", "ce qu'"],
      correct: "A",
      explanation: "En discours indirect, une question fermée est introduite par « si », ici élidé en « s' ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Je ne crois pas que cette réforme ___ réellement les inégalités.",
      options: ["réduise", "réduit", "réduira", "réduirait"],
      correct: "A",
      explanation: "Après « ne pas croire que », on emploie le subjonctif : « réduise ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Les enjeux ___ ce rapport met en lumière sont considérables.",
      options: ["que", "dont", "auxquels", "lesquels"],
      correct: "A",
      explanation: "« Que » est complément d'objet direct de « met en lumière » et reprend « les enjeux ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ m'étonne, c'est qu'il n'ait pas réagi plus tôt.",
      options: ["Ce qui", "Ce que", "Ce dont", "Celui qui"],
      correct: "A",
      explanation: "« Ce qui » est sujet du verbe « étonne » dans la structure « ce qui… c'est que… ».",
    },
    {
      level: "C1",
      category: "concordance des temps",
      prompt: "Elle a reconnu qu'elle ___ une erreur en signant ce contrat.",
      options: ["avait commis", "commet", "commettra", "a commis"],
      correct: "A",
      explanation: "Le plus-que-parfait exprime l'antériorité dans le discours rapporté au passé.",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Sans que personne ne s'en ___ aperçu, le projet avait été modifié.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation: "« Sans que » exige le subjonctif ; la forme passée est « soit aperçu ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Il importe peu qu'il ___ tort ou raison ; l'essentiel est qu'il agisse.",
      options: ["ait", "a", "aura", "avait"],
      correct: "A",
      explanation: "« Il importe peu que » est suivi du subjonctif : « qu'il ait tort ou raison ».",
    },
  ],
  reading: [
    {
      title: "Départ en retraite",
      text: p(
        "Nous avons le plaisir de vous inviter au pot de départ en retraite de Mme Garnier, vendredi 28 à 17 h, dans la salle de pause.",
        "Une cagnotte est organisée pour lui offrir un cadeau ; vous pouvez participer auprès de Nadia au bureau 3.",
      ),
      question: {
        level: "B1",
        prompt: "Auprès de qui peut-on participer à la cagnotte ?",
        options: ["Auprès de Nadia", "Auprès de Mme Garnier", "Auprès du directeur", "Auprès du gardien"],
        correct: "A",
        explanation: "L'invitation indique de participer à la cagnotte en s'adressant à Nadia, bureau 3.",
      },
    },
    {
      title: "Piscine : stage de natation",
      text: p(
        "Un stage de natation pour enfants de 6 à 10 ans est proposé du 8 au 12 juillet, de 10 h à 11 h 30.",
        "Les groupes sont limités à huit enfants. Inscription obligatoire à l'accueil de la piscine avant le 30 juin.",
      ),
      question: {
        level: "B1",
        prompt: "Combien d'enfants au maximum par groupe ?",
        options: ["Huit", "Dix", "Six", "Douze"],
        correct: "A",
        explanation: "Le texte précise que les groupes sont limités à huit enfants.",
      },
    },
    {
      title: "Demande de renseignements",
      text: p(
        "Bonjour, je souhaite m'inscrire à vos cours de français pour adultes qui commencent en octobre. Pourriez-vous m'indiquer les tarifs et les horaires ?",
        "Je travaille la journée et je ne suis disponible que le soir. Merci d'avance pour votre réponse.",
      ),
      question: {
        level: "B1",
        prompt: "Quand l'auteur du message est-il disponible ?",
        options: ["Le soir", "Le matin", "Le week-end", "À midi"],
        correct: "A",
        explanation: "L'auteur travaille la journée : il n'est disponible que le soir.",
      },
    },
    {
      title: "Ouverture d'un nouveau supermarché",
      text: p(
        "Le nouveau supermarché de la zone commerciale ouvre ses portes mardi à 8 h. Pour l'occasion, une dégustation de produits locaux est proposée toute la journée.",
        "Les dix premiers clients recevront un panier garni. Un parking gratuit de 300 places est disponible.",
      ),
      question: {
        level: "B1",
        prompt: "Que recevront les dix premiers clients ?",
        options: ["Un panier garni", "Un bon d'achat", "Une carte de fidélité", "Une réduction de 50 %"],
        correct: "A",
        explanation: "Les dix premiers clients se verront offrir un panier garni.",
      },
    },
    {
      title: "Perte de clés",
      text: p(
        "J'ai perdu un trousseau de trois clés avec un porte-clés en forme de tortue, samedi dernier dans le parc Montsouris.",
        "Si vous le trouvez, merci de me contacter au numéro indiqué. Une récompense est prévue.",
      ),
      question: {
        level: "B1",
        prompt: "Que promet l'auteur à celui qui retrouvera les clés ?",
        options: ["Une récompense", "Un déjeuner", "Un remerciement écrit", "Une réduction"],
        correct: "A",
        explanation: "L'auteur précise qu'une récompense est prévue pour la personne qui retrouvera le trousseau.",
      },
    },
    {
      title: "Les cours de cuisine pour hommes",
      text: p(
        "Un atelier de cuisine réservé aux hommes rencontre un franc succès dans cette ville de l'ouest. Les participants, âgés de 30 à 70 ans, y apprennent à préparer des repas simples et équilibrés.",
        "L'animatrice explique que beaucoup d'entre eux, devenus veufs ou divorcés, souhaitent gagner en autonomie, mais qu'ils osent rarement l'avouer en dehors du groupe.",
      ),
      question: {
        level: "B2",
        prompt: "Que souhaitent les participants selon l'animatrice ?",
        options: ["Gagner en autonomie", "Ouvrir un restaurant", "Rencontrer une compagne", "Participer à un concours"],
        correct: "A",
        explanation: "L'animatrice explique qu'ils veulent devenir plus autonomes en cuisine.",
      },
    },
    {
      title: "Un nouveau départ pour la médiathèque",
      text: p(
        "Après dix-huit mois de travaux, la médiathèque de la ville rouvre dans un bâtiment entièrement rénové. Les espaces ont été repensés pour accueillir plus d'activités : ateliers, expositions, coins de lecture adaptés aux enfants.",
        "Les usagers apprécient le confort des lieux, mais regrettent que certaines collections soient encore en cours de reclassement et donc peu accessibles.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrettent les usagers ?",
        options: ["Certaines collections sont peu accessibles", "Le bâtiment est trop petit", "Les enfants sont exclus", "L'accès est payant"],
        correct: "A",
        explanation: "Les usagers déplorent que des collections soient encore en cours de reclassement.",
      },
    },
    {
      title: "La formation des aides à domicile",
      text: p(
        "Les aides à domicile accompagnent chaque jour des personnes âgées ou handicapées : toilette, repas, courses, présence. Leur métier, essentiel, reste pourtant peu valorisé, avec des salaires proches du minimum et des temps partiels subis.",
        "Une formation certifiante vient d'être mise en place pour reconnaître leurs compétences, mais les employeurs craignent de ne pas pouvoir libérer leurs salariées pour la suivre.",
      ),
      question: {
        level: "B2",
        prompt: "Que craignent les employeurs ?",
        options: ["Ne pas pouvoir libérer leurs salariées pour la formation", "Que les salaires baissent", "Que le métier disparaisse", "Que les personnes âgées refusent l'aide"],
        correct: "A",
        explanation: "Ils redoutent de manquer de personnel s'ils doivent laisser partir leurs salariées en formation.",
      },
    },
    {
      title: "Un lac réhabilité",
      text: p(
        "Pollué pendant des décennies par des rejets industriels, le lac de la vallée a fait l'objet d'un vaste programme de dépollution. Les poissons sont revenus, les oiseaux migrateurs aussi, et la baignade a pu être rouverte.",
        "Les habitants s'en réjouissent, mais les écologues préviennent que l'équilibre reste fragile et que l'afflux de baigneurs pourrait menacer la faune.",
      ),
      question: {
        level: "B2",
        prompt: "Que craignent les écologues ?",
        options: ["Que les baigneurs menacent la faune", "Que le lac soit de nouveau pollué par l'industrie", "Que les poissons partent", "Que la baignade soit interdite"],
        correct: "A",
        explanation: "Ils avertissent que l'affluence de baigneurs pourrait fragiliser un équilibre encore précaire.",
      },
    },
    {
      title: "Les ateliers d'écriture en prison",
      text: p(
        "Dans plusieurs établissements pénitentiaires, des écrivains animent des ateliers d'écriture auprès de détenus volontaires. Les participants écrivent des poèmes, des nouvelles, parfois des lettres à leurs proches, et lisent leurs textes devant le groupe.",
        "Les intervenants constatent que l'écriture aide à mettre des mots sur des expériences difficiles, mais ils regrettent que ces ateliers soient peu financés et souvent interrompus.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrettent les intervenants ?",
        options: ["Le manque de financement et les interruptions", "Le refus des détenus", "L'absence d'écrivains", "Le contenu des textes"],
        correct: "A",
        explanation: "Faute de financements suffisants, les ateliers sont souvent interrompus.",
      },
    },
    {
      title: "Des bureaux à l'heure du télétravail",
      text: p(
        "Avec la généralisation du télétravail, de nombreuses entreprises réduisent la surface de leurs bureaux. Elles aménagent des espaces partagés où les salariés réservent leur place pour les jours de présence, et transforment certaines salles en lieux de convivialité.",
        "Les salariés apprécient la flexibilité, mais certains se plaignent de perdre leurs repères et de ne plus avoir d'espace personnel sur le lieu de travail.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi certains salariés se plaignent-ils ?",
        options: ["De ne plus avoir d'espace personnel", "De travailler trop chez eux", "Du coût des réservations", "Du nombre de réunions"],
        correct: "A",
        explanation: "Ils regrettent de perdre leurs repères et leur espace propre au bureau.",
      },
    },
    {
      title: "Les épiceries solidaires",
      text: p(
        "Les épiceries solidaires permettent à des personnes à faibles revenus d'acheter des produits à prix réduit, tout en choisissant elles-mêmes leurs courses. Cette liberté de choix, que ne permet pas l'aide alimentaire classique, préserve la dignité des bénéficiaires.",
        "Les gestionnaires notent cependant que la demande augmente plus vite que les dons de produits, ce qui les oblige à limiter le nombre de visites par mois.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les gestionnaires limitent-ils les visites ?",
        options: ["La demande dépasse les dons", "Les produits sont périmés", "Les clients refusent de payer", "Le magasin est trop petit"],
        correct: "A",
        explanation: "La hausse de la demande est plus rapide que celle des dons de produits.",
      },
    },
    {
      title: "Les enfants et la nature",
      text: p(
        "De plus en plus d'écoles organisent des classes dehors, dans des jardins, des forêts ou des parcs. Les enseignants constatent que les enfants s'y montrent plus calmes, plus curieux et plus coopératifs, et que les apprentissages gagnent en concret.",
        "Les parents, eux, s'interrogent parfois sur la sécurité et sur le respect du programme, auxquels les équipes répondent par une préparation minutieuse des sorties.",
      ),
      question: {
        level: "B2",
        prompt: "Quelles interrogations les parents ont-ils ?",
        options: ["La sécurité et le respect du programme", "Le prix des sorties", "La distance des parcs", "Le matériel des enseignants"],
        correct: "A",
        explanation: "Ils se demandent si les sorties sont sûres et si le programme est bien suivi.",
      },
    },
    {
      title: "Des seniors au service des écoles",
      text: p(
        "Dans plusieurs villes, des retraités interviennent bénévolement dans les écoles pour aider des élèves à lire ou à faire leurs devoirs. Ils y consacrent quelques heures par semaine et tissent des liens durables avec les enfants.",
        "Les enseignants apprécient cette aide précieuse, mais soulignent que ces bénévoles ne peuvent remplacer des professionnels, notamment auprès des élèves qui ont de grandes difficultés.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite les enseignants rappellent-ils ?",
        options: ["Les bénévoles ne remplacent pas des professionnels", "Les retraités sont trop âgés", "Les enfants refusent leur aide", "Les écoles manquent de locaux"],
        correct: "A",
        explanation: "Pour les élèves en grande difficulté, un soutien professionnel reste nécessaire.",
      },
    },
    {
      title: "Un festival de BD gratuit",
      text: p(
        "Chaque automne, un festival de bande dessinée transforme les rues d'une petite ville en galerie à ciel ouvert. Expositions, dédicaces et ateliers sont proposés gratuitement, et attirent un public de tous âges.",
        "Les organisateurs se disent fiers de cette ouverture, mais admettent que la gratuité repose sur des subventions dont le montant n'est jamais assuré d'une année à l'autre.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle fragilité les organisateurs reconnaissent-ils ?",
        options: ["Les subventions ne sont pas garanties chaque année", "Le public se désintéresse du festival", "Les auteurs refusent de venir", "Les rues sont trop étroites"],
        correct: "A",
        explanation: "La gratuité dépend de subventions dont le montant varie d'une année à l'autre.",
      },
    },
    {
      title: "Réguler les loyers : le débat",
      text: p(
        "L'encadrement des loyers divise économistes et élus. Ses partisans y voient un moyen de protéger les locataires dans les zones où les prix s'envolent, en limitant les abus et en évitant que les ménages modestes soient chassés des centres-villes.",
        "Ses détracteurs soutiennent qu'il décourage l'investissement locatif et réduit l'offre, ce qui aggraverait la pénurie qu'il prétend résoudre. Les premiers bilans, contrastés selon les territoires, nourrissent les deux camps. Entre protection immédiate des locataires et risque de désengagement des propriétaires, le débat illustre la difficulté d'arbitrer entre des intérêts également légitimes, et l'importance d'évaluer chaque dispositif sur la durée plutôt que sur quelques mois.",
      ),
      question: {
        level: "C1",
        prompt: "Quel argument avancent les détracteurs de l'encadrement ?",
        options: ["Il réduit l'offre de logements et aggrave la pénurie", "Il augmente les loyers", "Il protège trop les propriétaires", "Il supprime les aides au logement"],
        correct: "A",
        explanation: "Ils estiment que l'encadrement décourage l'investissement locatif, donc diminue l'offre.",
      },
    },
    {
      title: "La fin des frontières entre vie privée et travail",
      text: p(
        "Les outils numériques permettent de travailler partout et à toute heure, ce qui brouille la frontière entre temps professionnel et temps personnel. Consulter ses courriels le soir ou répondre à un message le dimanche devient, pour beaucoup, un réflexe, voire une attente implicite de la hiérarchie.",
        "Cette porosité présente des avantages, notamment une plus grande souplesse dans l'organisation de la journée. Mais elle comporte aussi un coût : une disponibilité permanente, source de fatigue et de tensions familiales. Des entreprises expérimentent des chartes de déconnexion, mais l'efficacité de ces règles dépend avant tout de l'exemple donné par ceux qui encadrent, car aucune charte ne prévaut contre une culture de la réactivité immédiate.",
      ),
      question: {
        level: "C1",
        prompt: "De quoi dépend l'efficacité des chartes de déconnexion ?",
        options: ["De l'exemple donné par l'encadrement", "Du prix des outils numériques", "De la durée du travail", "Du nombre de salariés"],
        correct: "A",
        explanation: "Sans exemplarité de la hiérarchie, une charte ne change pas une culture de réactivité immédiate.",
      },
    },
    {
      title: "Le recul des bureaux de poste",
      text: p(
        "La réorganisation du réseau postal a entraîné la fermeture ou la réduction des horaires de nombreux bureaux, en particulier dans les zones rurales. L'entreprise justifie ces décisions par la baisse du courrier traditionnel et par le coût de maintien d'un maillage dense.",
        "Pour les habitants, la poste n'est pas qu'un guichet : c'est un lieu où se croisent des personnes âgées, des commerçants, des familles. Sa disparition ressemble donc à une perte de lien social autant qu'à celle d'un service. Certaines communes ont repris le relais en créant des agences communales, mais celles-ci ne proposent qu'un éventail limité de prestations, au risque d'entériner une forme de service public au rabais.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque comportent les agences communales ?",
        options: ["Entériner un service public au rabais", "Augmenter les coûts de la poste", "Supprimer le courrier", "Fermer les mairies"],
        correct: "A",
        explanation: "Leur offre limitée de prestations risque de normaliser un service public amoindri.",
      },
    },
    {
      title: "La santé mentale en entreprise",
      text: p(
        "La santé mentale des salariés est devenue un sujet de préoccupation majeur pour les entreprises, confrontées à une hausse des arrêts de travail liés au stress et à l'épuisement. Les directions multiplient les initiatives : numéros d'écoute, ateliers de relaxation, formation des managers au repérage des signaux faibles.",
        "Ces dispositifs sont utiles, mais ils risquent de déplacer vers l'individu un problème qui est aussi organisationnel. Apprendre à gérer son stress n'a guère de sens si la charge de travail, les objectifs ou le management restent inchangés. Les spécialistes plaident donc pour une approche qui traite à la fois les ressources personnelles et les conditions collectives, afin que la prévention ne se réduise pas à une responsabilisation des salariés.",
      ),
      question: {
        level: "C1",
        prompt: "Que recommandent les spécialistes ?",
        options: ["Traiter à la fois les ressources personnelles et les conditions collectives", "Se limiter aux ateliers de relaxation", "Supprimer les managers", "Réduire les numéros d'écoute"],
        correct: "A",
        explanation: "Ils préconisent d'agir sur l'individu et sur l'organisation du travail en même temps.",
      },
    },
    {
      title: "Archives numériques et mémoire collective",
      text: p(
        "La numérisation des archives promet de rendre accessibles à tous des documents jusqu'ici réservés à quelques spécialistes. Registres, journaux, photographies sont désormais consultables en ligne, ce qui démocratise la recherche historique et généalogique.",
        "Cet élan s'accompagne pourtant de questions. Qui décide de ce qui est numérisé, et selon quels critères ? Ce qui ne l'est pas risque de tomber dans l'oubli, tandis que ce qui l'est se trouve valorisé, parfois sans le contexte nécessaire à sa compréhension. La numérisation n'est donc pas qu'une opération technique : elle redessine, en fonction de choix souvent implicites, la carte de ce qu'une société se donne les moyens de se rappeler.",
      ),
      question: {
        level: "C1",
        prompt: "Que souligne le texte à propos de la numérisation ?",
        options: ["Elle redéfinit ce que la société se donne les moyens de se rappeler", "Elle ne pose aucun problème", "Elle supprime l'histoire", "Elle réserve les archives aux spécialistes"],
        correct: "A",
        explanation: "Les choix de numérisation orientent ce qui sera retenu ou oublié par la mémoire collective.",
      },
    },
    {
      title: "L'hospitalité numérique",
      text: p(
        "Les espaces numériques que nous fréquentons, réseaux, forums, plateformes, se présentent souvent comme des lieux ouverts à tous. Pourtant, leur architecture, leurs règles de modération et leurs modèles économiques déterminent qui peut s'y exprimer, et dans quelles conditions. L'hospitalité y est donc moins une disposition spontanée qu'un produit de conception.",
        "Concevoir des espaces véritablement accueillants suppose de dépasser l'alternative entre liberté absolue et contrôle strict. Il s'agit d'imaginer des formes de modération qui préservent la possibilité du désaccord sans tolérer l'humiliation, d'offrir des outils de contestation, et de rendre visibles les logiques qui orientent la circulation des contenus. Ce travail de conception, trop souvent perçu comme secondaire, relève de ce qu'il faut bien appeler une politique des lieux.",
      ),
      question: {
        level: "C2",
        prompt: "Que suppose la conception d'espaces numériques accueillants ?",
        options: ["Dépasser l'alternative entre liberté absolue et contrôle strict", "Supprimer toute modération", "Interdire le désaccord", "Réserver les espaces à des experts"],
        correct: "A",
        explanation: "L'auteur plaide pour une modération qui préserve le désaccord sans tolérer l'humiliation, hors des deux extrêmes.",
      },
    },
    {
      title: "L'esprit des lois et la lettre",
      text: p(
        "Appliquer la loi ne consiste pas à en répéter la lettre : il faut encore en comprendre l'esprit, c'est-à-dire la finalité qui la justifie. Un juge qui s'en tiendrait à une lecture littérale risquerait, dans certaines situations, de contredire l'intention même du législateur. À l'inverse, une interprétation trop libre ferait de lui un législateur de substitution.",
        "Cette tension traverse toute la pratique du droit et ne se résout pas par une règle générale. Elle se travaille cas par cas, dans la motivation des décisions, qui rend publique la manière dont un juge a pesé la lettre et l'esprit. C'est cette exigence de justification, plus que la rigueur d'un mécanisme, qui garantit que le droit demeure à la fois prévisible pour ceux qui y sont soumis et capable de s'adapter aux situations que nul n'avait prévues.",
      ),
      question: {
        level: "C2",
        prompt: "Qu'est-ce qui garantit l'équilibre entre prévisibilité et adaptation du droit ?",
        options: ["L'exigence de justifier publiquement les décisions", "Une lecture strictement littérale", "Une interprétation totalement libre", "La suppression des juges"],
        correct: "A",
        explanation: "La motivation des décisions rend visible l'arbitrage entre lettre et esprit, ce qui assure à la fois prévisibilité et souplesse.",
      },
    },
    {
      title: "Le risque et la précaution",
      text: p(
        "Le principe de précaution est souvent présenté comme un frein à l'innovation, alors qu'il répond à une logique différente : face à des risques graves et incertains, il invite à ne pas attendre une preuve définitive pour agir. Sa mise en œuvre se heurte cependant à une difficulté de fond, car l'absence de preuve de danger ne prouve pas l'absence de danger, et inversement.",
        "Dès lors, la précaution n'est ni un refus du progrès ni un blanc-seing donné à la prudence excessive : elle est une manière de reconnaître qu'une décision publique s'exerce toujours sous incertitude. La question décisive est celle de la proportion : quelle mesure adopter, à quel coût, au bénéfice de qui ? À ce titre, la précaution relève moins de la technique que de la délibération politique, qui doit assumer ses choix sans prétendre à une certitude que la science ne peut fournir.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur caractérise-t-il la précaution ?",
        options: ["Comme une délibération politique sous incertitude", "Comme un refus du progrès", "Comme une certitude scientifique", "Comme une technique de mesure"],
        correct: "A",
        explanation: "L'auteur souligne que la précaution engage un arbitrage proportionné, à assumer politiquement sans certitude scientifique.",
      },
    },
    {
      title: "Citoyenneté et appartenance",
      text: p(
        "Être citoyen, ce n'est pas seulement détenir une nationalité : c'est participer, de manière active ou potentielle, à la vie d'une communauté politique. Or cette participation suppose un sentiment d'appartenance, qui ne se décrète pas et que les institutions peinent à produire. On peut avoir des droits sans se sentir chez soi, et se sentir chez soi sans jouir de tous ses droits.",
        "Cette distinction invite à rapprocher deux dimensions souvent séparées : la citoyenneté juridique et la citoyenneté vécue. Les politiques d'intégration gagneraient à ne pas se limiter à la première, en créant des occasions concrètes de coopération, au sein des écoles, des quartiers, des associations, où chacun peut éprouver qu'il compte. Car l'appartenance se construit moins par des proclamations que par l'expérience répétée d'être reconnu comme un partenaire légitime.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'appartenance se construit-elle selon l'auteur ?",
        options: ["Par l'expérience répétée d'être reconnu comme partenaire légitime", "Par des proclamations officielles", "Par la seule nationalité", "Par la suppression des droits"],
        correct: "A",
        explanation: "L'auteur juge que l'appartenance naît de coopérations concrètes où chacun se sent reconnu.",
      },
    },
    {
      title: "L'enseignement de l'histoire en question",
      text: p(
        "L'enseignement de l'histoire est régulièrement pris dans des controverses qui révèlent ce que la société attend de lui. Certains y voient un instrument de cohésion, chargé de transmettre un récit commun ; d'autres insistent sur sa fonction critique, qui consiste à apprendre aux élèves à examiner des sources et à confronter des interprétations.",
        "Ces deux finalités ne sont pas nécessairement incompatibles, mais elles ne se concilient pas sans effort. Un récit trop lisse flatte et rassure, au prix d'une simplification ; une approche purement critique risque de laisser les élèves sans repères. Peut-être faut-il admettre qu'enseigner l'histoire, c'est précisément maintenir cette tension : offrir un cadre assez solide pour s'y reconnaître, et assez ouvert pour que chacun puisse l'interroger, y compris sur ce que ce cadre laisse dans l'ombre ou ne dit qu'à demi-mot.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur résume-t-il la mission de l'enseignement de l'histoire ?",
        options: ["Maintenir une tension entre cadre commun et regard critique", "Imposer un récit unique", "Supprimer les repères", "Se limiter à l'analyse de sources"],
        correct: "A",
        explanation: "Il s'agit d'offrir un cadre solide tout en laissant la possibilité de le questionner.",
      },
    },
  ],
});
