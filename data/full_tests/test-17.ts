import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 17.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_17 = defineFullTest({
  number: 17,
  description:
    "Dix-septième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, c'est Lucie. Je suis à la boulangerie. Tu veux du pain ou des croissants pour le petit déjeuner ?",
      prompt: "Où se trouve Lucie en ce moment ?",
      options: ["À la boulangerie", "À la maison", "Au bureau", "Au marché"],
      correct: "A",
      explanation: "Lucie précise qu'elle est à la boulangerie et demande ce que son interlocuteur souhaite.",
    },
    {
      level: "A1",
      category: "famille",
      transcription:
        "Mon grand-père a quatre-vingts ans. Il habite à la campagne avec ma grand-mère. Nous allons les voir tous les étés.",
      prompt: "Quand la famille rend-elle visite aux grands-parents ?",
      options: ["Tous les étés", "Tous les hivers", "Chaque week-end", "Une fois par mois"],
      correct: "A",
      explanation: "La famille va voir les grands-parents tous les étés.",
    },
    {
      level: "A1",
      category: "travail",
      transcription:
        "Je commence le travail à huit heures et je finis à seize heures. Le midi, je mange à la cantine avec mes collègues.",
      prompt: "À quelle heure la personne finit-elle son travail ?",
      options: ["À seize heures", "À huit heures", "À midi", "À dix-huit heures"],
      correct: "A",
      explanation: "Elle commence à huit heures et termine à seize heures.",
    },
    {
      level: "A2",
      category: "voyages",
      transcription:
        "Notre hôtel est situé à deux cents mètres de la plage. La chambre comprend un balcon, une salle de bains et la climatisation. Le petit déjeuner est inclus.",
      prompt: "Quelle est la distance entre l'hôtel et la plage ?",
      options: ["Deux cents mètres", "Deux kilomètres", "Vingt mètres", "Cinq cents mètres"],
      correct: "A",
      explanation: "L'hôtel est à deux cents mètres de la plage.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Pour votre bilan sanguin, vous devez être à jeun depuis douze heures. Vous pouvez boire de l'eau, mais ne mangez rien après vingt heures la veille.",
      prompt: "Que peut faire le patient avant la prise de sang ?",
      options: ["Boire de l'eau", "Manger un fruit", "Prendre un café sucré", "Manger un yaourt"],
      correct: "A",
      explanation: "Seule l'eau est autorisée pendant le jeûne précédant la prise de sang.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Le cours de danse commence à dix-neuf heures. Il faut porter des vêtements souples et apporter une bouteille d'eau. Le premier cours d'essai est gratuit.",
      prompt: "Que peut-on faire gratuitement ?",
      options: ["Suivre un cours d'essai", "Louer des chaussures", "Acheter une tenue", "Réserver une place"],
      correct: "A",
      explanation: "Le premier cours d'essai est offert.",
    },
    {
      level: "A2",
      category: "achats",
      transcription:
        "Si vous n'êtes pas satisfait de votre achat, vous pouvez l'échanger dans les quinze jours avec le ticket de caisse. Les articles soldés ne sont pas repris.",
      prompt: "Qu'est-ce qui n'est pas repris ?",
      options: ["Les articles soldés", "Les vêtements d'été", "Les articles neufs", "Les chaussures"],
      correct: "A",
      explanation: "Les articles soldés ne peuvent pas être échangés.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Le syndic vous informe qu'un contrôle des chaudières individuelles aura lieu dans l'immeuble entre le douze et le quatorze mars. Un technicien passera à votre domicile ; merci de prévoir un accès libre à la chaudière.",
      prompt: "Que doivent faire les habitants ?",
      options: ["Laisser le technicien accéder à la chaudière", "Acheter une nouvelle chaudière", "Se rendre au siège du syndic", "Éteindre l'électricité"],
      correct: "A",
      explanation: "Un technicien contrôlera les chaudières : l'accès doit être libre.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Les inscriptions au conservatoire de musique sont ouvertes jusqu'au vingt septembre. Les élèves débutants passent un test d'orientation ; les élèves confirmés doivent présenter un morceau de leur choix devant le jury.",
      prompt: "Que doivent faire les élèves confirmés ?",
      options: ["Jouer un morceau devant un jury", "Passer un test d'orientation", "Payer en avance", "Apporter leur instrument neuf"],
      correct: "A",
      explanation: "Les confirmés présentent un morceau de leur choix devant le jury.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Je te rappelle que mercredi soir, c'est le dîner de classe de nos anciens camarades. J'ai réservé dans un petit restaurant italien près de la gare. Peux-tu me confirmer que tu viens avant lundi ?",
      prompt: "Avant quand faut-il confirmer sa présence ?",
      options: ["Avant lundi", "Avant mercredi", "Avant vendredi", "Avant dimanche"],
      correct: "A",
      explanation: "La personne demande une confirmation avant lundi.",
    },
    {
      level: "B1",
      category: "transports",
      transcription:
        "À partir du premier juin, le stationnement devient payant dans le centre-ville, de neuf heures à dix-neuf heures. Les résidents bénéficient d'un abonnement à vingt euros par mois, sur présentation d'un justificatif de domicile.",
      prompt: "Que doivent présenter les résidents pour l'abonnement ?",
      options: ["Un justificatif de domicile", "Une carte d'identité étrangère", "Un certificat de naissance", "Un permis moto"],
      correct: "A",
      explanation: "Les résidents doivent fournir un justificatif de domicile pour obtenir l'abonnement.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "Pour réduire sa consommation d'électricité, la ville remplace progressivement les lampadaires par des modèles à économie d'énergie. Les travaux se dérouleront de nuit pour limiter la gêne et dureront jusqu'à la fin de l'année.",
      prompt: "Quand auront lieu les travaux ?",
      options: ["La nuit", "Le week-end", "Pendant l'été", "Tôt le matin"],
      correct: "A",
      explanation: "Les travaux seront réalisés de nuit afin de limiter la gêne pour les habitants.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Les loyers dans les zones touristiques grimpent à cause des locations de courte durée. Un projet de loi prévoit de limiter à quatre-vingt-dix jours par an la location d'une résidence principale, mais les propriétaires dénoncent une atteinte à leur liberté d'usage.",
      prompt: "Que prévoit le projet de loi ?",
      options: ["Limiter à quatre-vingt-dix jours la location touristique", "Interdire toute location", "Supprimer la taxe de séjour", "Baisser tous les loyers"],
      correct: "A",
      explanation: "Le texte plafonne à quatre-vingt-dix jours annuels la location d'une résidence principale.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Après la pandémie, les enseignants constatent un retard dans l'apprentissage de la lecture chez certains élèves. Des dispositifs de soutien ont été mis en place, mais les professeurs insistent sur la nécessité d'un suivi plus personnalisé, difficile à assurer dans des classes nombreuses.",
      prompt: "Pourquoi un suivi personnalisé est-il difficile ?",
      options: ["Les classes sont nombreuses", "Les élèves refusent d'être aidés", "Les livres manquent", "Les cours sont supprimés"],
      correct: "A",
      explanation: "Dans des classes chargées, l'enseignant a peu de temps pour individualiser le soutien.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le festival de musique classique investit cette année des lieux inattendus : une gare, une usine désaffectée, une piscine vidée. Le directeur espère ainsi rapprocher la musique savante d'un public qui n'ose pas franchir la porte des salles traditionnelles.",
      prompt: "Quel est le but du directeur ?",
      options: ["Rapprocher la musique savante d'un public timide", "Réduire les coûts du festival", "Remplacer les salles de concert", "Réserver le festival aux experts"],
      correct: "A",
      explanation: "Les lieux insolites visent à toucher un public intimidé par les salles classiques.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les troubles musculo-squelettiques représentent la première cause de maladie professionnelle. Les ergonomes recommandent d'aménager les postes de travail et de multiplier les pauses, tandis que les employeurs évoquent le coût de ces adaptations pour les petites structures.",
      prompt: "Quel obstacle les employeurs mentionnent-ils ?",
      options: ["Le coût des adaptations pour les petites structures", "Le refus des salariés", "Le manque d'ergonomes", "L'interdiction des pauses"],
      correct: "A",
      explanation: "Les employeurs soulignent que les aménagements sont coûteux pour les petites entreprises.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les villes intelligentes collectent des données sur la circulation, l'énergie ou les déchets pour optimiser leurs services. Cependant, la protection de la vie privée des habitants pose question, d'autant que ces données sont parfois gérées par des entreprises privées.",
      prompt: "Quelle préoccupation est évoquée ?",
      options: ["La protection de la vie privée", "Le coût des écrans", "Le bruit des capteurs", "La vitesse des réseaux"],
      correct: "A",
      explanation: "La collecte de données par des acteurs privés soulève la question de la vie privée des habitants.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "Les familles monoparentales rencontrent des difficultés spécifiques : accès au logement, mode de garde, budget serré. Les associations demandent un guichet unique pour simplifier des démarches aujourd'hui dispersées entre plusieurs administrations.",
      prompt: "Que demandent les associations ?",
      options: ["Un guichet unique pour les démarches", "Une hausse des impôts", "La fermeture des administrations", "Des horaires de garde supprimés"],
      correct: "A",
      explanation: "Elles souhaitent regrouper les démarches dans un seul lieu pour les simplifier.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "La réforme des retraites cristallise des tensions qui dépassent la seule question financière. Au-delà de l'âge légal, c'est la perception d'un contrat social entre générations qui est en jeu : les actifs d'aujourd'hui acceptent-ils de financer des pensions dont ils ne sont pas certains de bénéficier eux-mêmes ?",
      prompt: "Quel enjeu dépasse la question financière ?",
      options: ["La confiance dans le contrat entre générations", "Le prix du logement", "Le nombre de fonctionnaires", "L'âge d'entrée dans la vie active"],
      correct: "A",
      explanation: "Le débat porte aussi sur la confiance des actifs dans un système qui leur garantira une pension à leur tour.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "On évoque souvent le coût de la transition écologique, rarement celui de l'inaction. Or des évaluations indépendantes montrent que les dommages liés au dérèglement climatique, tempêtes, incendies, pertes agricoles, pèseront bien davantage sur les finances publiques que les investissements nécessaires pour s'y préparer.",
      prompt: "Quelle comparaison les évaluations établissent-elles ?",
      options: ["L'inaction coûterait plus que les investissements", "La transition coûte plus que l'inaction", "Les deux coûtent autant", "Les dommages sont négligeables"],
      correct: "A",
      explanation: "Les dégâts climatiques pèseront davantage sur les finances que les investissements d'adaptation.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "La médecine personnalisée promet des traitements adaptés au profil génétique de chaque patient. Mais cette promesse suscite des réserves : outre son coût, elle risque d'accentuer les inégalités si seuls les patients les mieux informés ou les plus fortunés y ont accès.",
      prompt: "Quel risque est associé à la médecine personnalisée ?",
      options: ["Accentuer les inégalités d'accès aux soins", "Supprimer les médecins", "Allonger les consultations", "Réduire la recherche"],
      correct: "A",
      explanation: "Seuls les patients informés ou aisés pourraient en bénéficier, ce qui creuserait les écarts.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Le bénévolat, présenté comme un pilier de la vie associative, repose sur une ressource que l'on tient pour acquise. Or les responsables d'associations constatent un vieillissement de leurs bénévoles et une difficulté croissante à transmettre les responsabilités à de plus jeunes, davantage attirés par des engagements ponctuels.",
      prompt: "Quelle difficulté les responsables d'associations rencontrent-ils ?",
      options: ["Transmettre les responsabilités à de plus jeunes", "Recruter des salariés", "Trouver des locaux", "Réduire leurs dépenses"],
      correct: "A",
      explanation: "Les bénévoles vieillissent et la relève, plus attirée par l'engagement ponctuel, tarde à prendre le relais.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "Nous prenons pour naturel ce qui est le plus familier : une langue, des gestes, un paysage. Voyager ou apprendre une langue étrangère brise cette évidence en révélant la part de convention qui sous-tend nos manières de voir. Ce dépaysement n'appauvrit pas l'identité, il l'oblige à se penser comme l'une des possibilités, et non comme l'unique.",
      prompt: "Que produit le dépaysement selon l'orateur ?",
      options: ["Il oblige à voir son identité comme une possibilité parmi d'autres", "Il détruit l'identité", "Il renforce les préjugés", "Il rend les habitudes plus fortes"],
      correct: "A",
      explanation: "Le dépaysement révèle ce qu'il y a de conventionnel dans nos évidences et relativise notre manière de voir.",
    },
    {
      level: "C2",
      category: "histoire",
      transcription:
        "On évoque souvent les leçons de l'histoire comme si elles se transmettaient d'elles-mêmes. Pourtant, rien n'assure que le passé enseigne quoi que ce soit à qui ne l'interroge pas avec rigueur : les analogies hâtives, tentantes en temps de crise, éclairent moins qu'elles ne rassurent, car elles flattent l'illusion que l'avenir nous est déjà connu.",
      prompt: "Pourquoi l'orateur se méfie-t-il des analogies historiques hâtives ?",
      options: ["Elles rassurent en prétendant que l'avenir est déjà connu", "Elles sont toujours fausses", "Elles ne parlent que du passé lointain", "Elles sont réservées aux historiens"],
      correct: "A",
      explanation: "Ces rapprochements apaisent plus qu'ils n'éclairent, en donnant l'illusion de connaître l'avenir.",
    },
    {
      level: "C2",
      category: "littérature",
      transcription:
        "Lire, ce n'est pas seulement recevoir un message, c'est le reconstruire à partir de ses propres expériences. Aussi chaque lecteur compose-t-il, sans le savoir, un texte légèrement différent, et c'est cette plasticité de l'œuvre, loin de l'affaiblir, qui garantit qu'elle ne se réduise jamais à l'intention de son auteur.",
      prompt: "Que garantit la plasticité de l'œuvre selon l'orateur ?",
      options: ["Qu'elle ne se réduise pas à l'intention de son auteur", "Qu'elle soit comprise de la même façon par tous", "Qu'elle devienne illisible", "Qu'elle soit oubliée vite"],
      correct: "A",
      explanation: "Parce que chaque lecteur la reconstruit, l'œuvre dépasse toujours ce que son auteur a voulu y mettre.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "articles",
      prompt: "Il y a ___ eau dans la bouteille ?",
      options: ["de l'", "du", "des", "de la"],
      correct: "A",
      explanation: "« Eau » commence par une voyelle et est féminin : le partitif s'écrit « de l' ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Vous ___ à quelle heure demain ?",
      options: ["arrivez", "arrive", "arrivent", "arrivons"],
      correct: "A",
      explanation: "Le sujet « vous » impose la forme « arrivez » au présent.",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Elle m'a prêté son livre ; je ___ rendrai demain.",
      options: ["le lui", "lui le", "le leur", "me le"],
      correct: "A",
      explanation: "Le COD « le » précède le COI « lui » : « je le lui rendrai ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le pays ___ je rêve de visiter est le Japon.",
      options: ["que", "où", "dont", "qui"],
      correct: "A",
      explanation: "« Que » est complément d'objet direct de « visiter » : je rêve de visiter ce pays.",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Cette année, il pleut ___ que l'année dernière.",
      options: ["moins", "plus bon", "meilleur", "aussi bien"],
      correct: "A",
      explanation: "La comparaison porte sur la quantité de pluie : « il pleut moins que… ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Hier, j'___ un message de mon ancien professeur.",
      options: ["ai reçu", "recevais", "recevrai", "reçois"],
      correct: "A",
      explanation: "L'action ponctuelle et terminée se met au passé composé : « j'ai reçu ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous avons dîné ___ des amis hier soir.",
      options: ["chez", "à", "dans", "sur"],
      correct: "A",
      explanation: "« Chez » désigne le domicile de quelqu'un : « chez des amis ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Bien qu'elle ___ très occupée, elle a pris le temps de nous aider.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation: "« Bien que » exige le subjonctif : « bien qu'elle soit très occupée ».",
    },
    {
      level: "B2",
      category: "hypothèse",
      prompt: "S'il ___ de la neige ce week-end, nous irons skier.",
      options: ["y a", "y aura", "y aurait", "y avait"],
      correct: "A",
      explanation: "Après « si » de condition réalisable, on emploie le présent : « s'il y a de la neige ».",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Cette loi ___ par le Parlement la semaine dernière.",
      options: ["a été adoptée", "a adopté", "adoptait", "adoptera"],
      correct: "A",
      explanation: "La loi subit l'action : passif au passé composé, « a été adoptée ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Il ___ déjà parti quand nous sommes arrivés à la gare.",
      options: ["était", "est", "sera", "serait"],
      correct: "A",
      explanation: "Le plus-que-parfait « était parti » exprime une action antérieure à « nous sommes arrivés ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "Elle a appris l'espagnol ___ des séries télévisées.",
      options: ["en regardant", "regardant", "à regarder", "regardé"],
      correct: "A",
      explanation: "Le gérondif « en regardant » exprime le moyen par lequel elle a appris.",
    },
    {
      level: "B2",
      category: "pronoms indéfinis",
      prompt: "Il n'y a ___ de plus agréable qu'un bon livre au coin du feu.",
      options: ["rien", "personne", "aucun", "pas"],
      correct: "A",
      explanation: "« Rien de plus agréable que » est une tournure comparative figée.",
    },
    {
      level: "B2",
      category: "expression de la conséquence",
      prompt: "Il a tellement travaillé ___ il est tombé malade.",
      options: ["qu'", "pour qu'", "que", "alors qu'"],
      correct: "A",
      explanation: "« Tellement… que » exprime la conséquence ; devant « il » on emploie « qu' ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Il faut que nous ___ une solution avant la fin de la semaine.",
      options: ["trouvions", "trouvons", "trouverons", "trouverions"],
      correct: "A",
      explanation: "« Il faut que » appelle le subjonctif présent : « que nous trouvions ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "L'étude ___ il fait référence a été publiée l'an dernier.",
      options: ["à laquelle", "dont", "que", "laquelle"],
      correct: "A",
      explanation: "« Faire référence à » impose « à laquelle » pour un antécédent féminin singulier.",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ nous manque, c'est un peu de temps.",
      options: ["Ce qui", "Ce que", "Ce dont", "Celui qui"],
      correct: "A",
      explanation: "« Ce qui » est sujet de « manque » dans la structure « ce qui… c'est… ».",
    },
    {
      level: "C1",
      category: "concordance des temps",
      prompt: "Elle m'a assuré qu'elle ___ tout fait pour réussir.",
      options: ["avait", "a", "aura", "avait eu"],
      correct: "A",
      explanation: "Le plus-que-parfait « avait fait » exprime l'antériorité dans le discours rapporté au passé.",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Je cherche quelqu'un qui ___ parler couramment le japonais.",
      options: ["sache", "sait", "saura", "saurait"],
      correct: "A",
      explanation: "Un antécédent indéfini (« quelqu'un ») dont l'existence est incertaine appelle le subjonctif : « sache ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Quand bien même il ___ raison, il aurait dû s'y prendre autrement.",
      options: ["aurait", "avait", "a", "ait"],
      correct: "A",
      explanation: "« Quand bien même » est suivi du conditionnel : « quand bien même il aurait raison ».",
    },
  ],
  reading: [
    {
      title: "Réunion des copropriétaires",
      text: p(
        "L'assemblée générale annuelle de la copropriété aura lieu le jeudi 21 juin à 19 h, dans la salle polyvalente de la mairie.",
        "Les copropriétaires absents peuvent donner pouvoir à un voisin. L'ordre du jour est joint à ce courrier.",
      ),
      question: {
        level: "B1",
        prompt: "Que peuvent faire les copropriétaires absents ?",
        options: ["Donner pouvoir à un voisin", "Reporter la réunion", "Voter par téléphone", "Envoyer un avocat"],
        correct: "A",
        explanation: "Le courrier précise qu'ils peuvent donner pouvoir à un voisin.",
      },
    },
    {
      title: "Sortie scolaire au zoo",
      text: p(
        "Mardi, les élèves de CE2 iront au zoo de la ville. Le départ est prévu à 8 h 30 devant l'école, et le retour vers 16 h.",
        "Chaque enfant doit apporter un pique-nique et une casquette. Les sacs doivent être petits.",
      ),
      question: {
        level: "B1",
        prompt: "Que doit apporter chaque enfant ?",
        options: ["Un pique-nique et une casquette", "De l'argent de poche", "Un maillot de bain", "Un appareil photo"],
        correct: "A",
        explanation: "Il est demandé d'apporter un pique-nique et une casquette dans un petit sac.",
      },
    },
    {
      title: "Réclamation",
      text: p(
        "Madame, Monsieur, j'ai acheté un grille-pain dans votre magasin il y a une semaine. Il ne fonctionne plus depuis hier.",
        "Je souhaite un échange ou un remboursement. Vous trouverez ci-joint une copie de mon ticket de caisse.",
      ),
      question: {
        level: "B1",
        prompt: "Que souhaite l'auteur de la lettre ?",
        options: ["Un échange ou un remboursement", "Un nouveau ticket", "Une réparation gratuite à domicile", "Un bon d'achat"],
        correct: "A",
        explanation: "L'auteur réclame soit un échange, soit un remboursement de son grille-pain défectueux.",
      },
    },
    {
      title: "Concert de la chorale",
      text: p(
        "La chorale du village donne son concert annuel samedi à 20 h 30 à l'église. Au programme : chants de Noël et musique classique.",
        "L'entrée est libre ; une collecte au profit d'une association d'aide aux enfants sera organisée à la sortie.",
      ),
      question: {
        level: "B1",
        prompt: "À quoi servira la collecte ?",
        options: ["Aider une association pour enfants", "Réparer l'église", "Acheter des instruments", "Payer la chorale"],
        correct: "A",
        explanation: "La collecte est destinée à une association d'aide aux enfants.",
      },
    },
    {
      title: "Offre de bénévolat",
      text: p(
        "La banque alimentaire recherche des bénévoles pour trier et distribuer les colis, le mardi et le vendredi après-midi.",
        "Aucune compétence particulière n'est demandée, seulement de la bonne volonté. Présentez-vous au 12, rue des Lilas.",
      ),
      question: {
        level: "B1",
        prompt: "Quelle compétence est demandée aux bénévoles ?",
        options: ["Aucune compétence particulière", "Un diplôme de cuisine", "Un permis de conduire", "Une expérience associative"],
        correct: "A",
        explanation: "L'annonce précise qu'il suffit d'avoir de la bonne volonté.",
      },
    },
    {
      title: "Des cours de code pour tous",
      text: p(
        "Une association propose des cours d'initiation à l'informatique pour les adultes éloignés du numérique. Les participants apprennent à envoyer un courriel, à faire une démarche en ligne et à repérer les arnaques.",
        "Les bénévoles constatent que beaucoup d'apprenants, au départ intimidés, gagnent vite en confiance, mais que l'apprentissage demande de la répétition.",
      ),
      question: {
        level: "B2",
        prompt: "Que constatent les bénévoles ?",
        options: ["Les apprenants gagnent vite en confiance", "Les cours sont trop courts", "Le matériel manque", "Les arnaques disparaissent"],
        correct: "A",
        explanation: "Au départ intimidés, les participants prennent rapidement de l'assurance.",
      },
    },
    {
      title: "Le retour du lait en bouteille consignée",
      text: p(
        "Quelques producteurs relancent la consigne du lait en bouteille de verre. Les clients rapportent leurs bouteilles vides, qui sont lavées puis réutilisées plusieurs dizaines de fois.",
        "La démarche réduit les déchets, mais elle exige une logistique de collecte et de lavage que seuls quelques territoires peuvent se permettre.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite la consigne rencontre-t-elle ?",
        options: ["Une logistique de collecte et de lavage coûteuse", "Un manque de clients", "Une interdiction légale", "Le goût du lait"],
        correct: "A",
        explanation: "La collecte et le lavage nécessitent une organisation que peu de territoires peuvent assumer.",
      },
    },
    {
      title: "Une classe verte au bord de la mer",
      text: p(
        "Chaque printemps, des élèves de CM2 passent une semaine au bord de la mer pour observer la faune du littoral. Au programme : pêche à pied, étude des marées, nettoyage de la plage.",
        "Les enseignants soulignent l'intérêt éducatif du séjour, mais regrettent que son coût, même subventionné, exclue certains enfants dont les familles n'ont pas les moyens de l'avancer.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrettent les enseignants ?",
        options: ["Que le coût exclue certains enfants", "Que la mer soit trop froide", "Que le séjour soit trop court", "Que les parents refusent"],
        correct: "A",
        explanation: "Même subventionné, le séjour reste inaccessible à certaines familles.",
      },
    },
    {
      title: "Un cabinet médical partagé",
      text: p(
        "Dans ce bourg, trois jeunes médecins ont ouvert un cabinet partagé avec une infirmière et un kinésithérapeute. Cette organisation permet de mutualiser les frais et d'offrir aux patients un suivi coordonné.",
        "Les habitants se réjouissent de ne plus devoir se rendre à la ville voisine, mais s'inquiètent de la capacité du cabinet à accueillir de nouveaux patients.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle inquiétude les habitants expriment-ils ?",
        options: ["La capacité d'accueil de nouveaux patients", "Le prix des consultations", "Le départ des médecins", "L'éloignement du cabinet"],
        correct: "A",
        explanation: "Ils craignent que le cabinet ne puisse pas prendre en charge davantage de patients.",
      },
    },
    {
      title: "Des écoles ouvertes l'été",
      text: p(
        "Plusieurs communes ouvrent leurs écoles en juillet pour accueillir des activités de loisirs : sport, théâtre, sorties. Ces centres permettent aux parents de travailler pendant les vacances et aux enfants de profiter d'animations variées.",
        "Mais le recrutement d'animateurs reste difficile, car les salaires sont modestes et les contrats courts, ce qui limite le nombre de places proposées.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi le nombre de places est-il limité ?",
        options: ["Il est difficile de recruter des animateurs", "Les écoles sont fermées", "Les parents refusent", "Les enfants sont peu nombreux"],
        correct: "A",
        explanation: "Les salaires modestes et les contrats courts compliquent le recrutement d'animateurs.",
      },
    },
    {
      title: "La reconnaissance des langues des signes",
      text: p(
        "La langue des signes est reconnue comme une langue à part entière, mais son enseignement reste inégal. De nombreux enfants sourds n'y ont accès qu'à travers des associations, faute de professeurs qualifiés dans les écoles.",
        "Les familles réclament une présence plus forte de cette langue dans le système éducatif, pour permettre à ces enfants de mieux suivre leur scolarité.",
      ),
      question: {
        level: "B2",
        prompt: "Que réclament les familles ?",
        options: ["Une présence plus forte de la langue des signes à l'école", "L'arrêt des associations", "La suppression des écoles spécialisées", "Un diplôme national"],
        correct: "A",
        explanation: "Elles demandent que la langue des signes soit davantage intégrée au système éducatif.",
      },
    },
    {
      title: "Livrer en cargo : un pari urbain",
      text: p(
        "Des coursiers utilisent des vélos-cargos pour livrer colis et repas dans les centres-villes. Ces véhicules, plus agiles que les camionnettes dans les rues étroites, réduisent les embouteillages et la pollution sonore.",
        "Les entreprises de transport y voient une solution pour le dernier kilomètre, mais soulignent que ce mode reste limité par le poids des charges et les conditions météorologiques.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite les entreprises voient-elles ?",
        options: ["Le poids des charges et la météo", "L'interdiction des vélos", "Le manque de coursiers", "Le coût du carburant"],
        correct: "A",
        explanation: "Les vélos-cargos ne peuvent transporter que des charges légères et dépendent du temps.",
      },
    },
    {
      title: "Les assistants numériques à l'école",
      text: p(
        "Certains enseignants testent des outils d'intelligence artificielle pour proposer des exercices adaptés au niveau de chaque élève. Ces outils corrigent rapidement, signalent les erreurs fréquentes et laissent au professeur plus de temps pour accompagner ceux qui décrochent.",
        "Les syndicats rappellent toutefois que ces outils ne doivent pas servir à économiser des postes, et que le lien humain reste le cœur de l'enseignement.",
      ),
      question: {
        level: "B2",
        prompt: "Que rappellent les syndicats ?",
        options: ["Que ces outils ne doivent pas supprimer des postes", "Que ces outils sont gratuits", "Que les élèves refusent la technologie", "Que les corrections sont toujours fausses"],
        correct: "A",
        explanation: "Ils exigent que le numérique ne serve pas de prétexte à réduire le nombre d'enseignants.",
      },
    },
    {
      title: "Un marché solidaire de fin de semaine",
      text: p(
        "Le samedi, une association organise un marché où des producteurs vendent leurs invendus à prix réduit à des familles à faibles revenus. Cette initiative permet de valoriser des fruits et légumes parfois écartés des circuits classiques à cause de leur aspect.",
        "Les bénévoles se disent satisfaits, mais soulignent que la préparation du marché demande beaucoup d'heures de travail, difficiles à assurer sans renfort.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté les bénévoles soulignent-ils ?",
        options: ["Le nombre d'heures de préparation à assurer", "Le manque de producteurs", "L'absence de clients", "Le prix des légumes"],
        correct: "A",
        explanation: "Ils expliquent que préparer le marché mobilise de nombreuses heures sans renfort.",
      },
    },
    {
      title: "Des horaires de bibliothèque élargis le dimanche",
      text: p(
        "Après une expérimentation concluante, la bibliothèque municipale ouvre désormais ses portes le dimanche après-midi. Les familles, les étudiants et les personnes seules y trouvent un lieu calme, gratuit et chauffé, avec des activités pour les enfants.",
        "Le personnel salue l'affluence, mais regrette que les moyens n'aient pas été augmentés, ce qui oblige à répartir le travail sur des équipes déjà réduites.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrette le personnel de la bibliothèque ?",
        options: ["Que les moyens n'aient pas augmenté", "Que le dimanche soit chômé", "Que les familles soient trop nombreuses", "Que les livres soient chers"],
        correct: "A",
        explanation: "L'ouverture dominicale n'a pas été accompagnée de moyens supplémentaires, ce qui pèse sur les équipes.",
      },
    },
    {
      title: "Le dilemme des algorithmes de recommandation",
      text: p(
        "Les plateformes de musique et de vidéo proposent à chacun des contenus supposés lui plaire, d'après ses écoutes passées. Cette personnalisation facilite la découverte et fait gagner du temps, mais elle enferme aussi les utilisateurs dans leurs goûts, en leur présentant surtout ce qui ressemble à ce qu'ils connaissent déjà.",
        "Des chercheurs observent que cette logique réduit la diversité des expériences culturelles et favorise les productions les plus consensuelles. Certains services intègrent donc des recommandations plus surprenantes, de manière à ouvrir le champ des possibles. Reste à savoir si ces correctifs suffisent, ou si la logique commerciale qui régit ces plateformes ne les rend pas toujours secondaires.",
      ),
      question: {
        level: "C1",
        prompt: "Quel effet négatif la personnalisation produit-elle ?",
        options: ["Elle enferme les utilisateurs dans leurs goûts", "Elle supprime les contenus", "Elle augmente les prix", "Elle allonge les vidéos"],
        correct: "A",
        explanation: "En proposant ce qui ressemble à l'existant, elle réduit la diversité des découvertes culturelles.",
      },
    },
    {
      title: "Le vieillissement des ponts",
      text: p(
        "Des milliers de ponts, construits pour la plupart après la Seconde Guerre mondiale, arrivent aujourd'hui en fin de vie. Leur entretien, longtemps négligé au profit de nouvelles infrastructures, est devenu un enjeu de sécurité : des inspections révèlent régulièrement des corrosions ou des fissures qu'il est urgent de traiter.",
        "Les collectivités, propriétaires de la majorité de ces ouvrages, manquent souvent d'ingénieurs et de moyens pour programmer les travaux. Elles doivent arbitrer entre réparation, restriction de trafic et fermeture, avec des conséquences directes pour les habitants. Ce défi illustre une difficulté plus générale : les sociétés investissent volontiers dans ce qui se construit, beaucoup moins dans ce qui se maintient.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle difficulté plus générale ce cas illustre-t-il ?",
        options: ["On investit plus volontiers dans la construction que dans l'entretien", "Les ingénieurs sont trop nombreux", "Les ponts sont inutiles", "Les collectivités manquent de terrains"],
        correct: "A",
        explanation: "Le texte souligne que les sociétés financent plus facilement la construction neuve que la maintenance.",
      },
    },
    {
      title: "Réformer l'orientation scolaire",
      text: p(
        "L'orientation scolaire est souvent vécue comme une épreuve de tri plutôt que comme une aide à la réflexion. Les élèves doivent choisir des filières très tôt, avec des informations parfois incomplètes, et les familles les mieux informées disposent d'un avantage considérable pour naviguer dans un système complexe.",
        "Des réformes proposent d'étaler les choix et de renforcer l'accompagnement individualisé, par exemple en associant des professionnels de terrain. Ces dispositifs peuvent réduire les inégalités, à condition qu'ils ne se limitent pas à informer, mais permettent réellement aux élèves d'expérimenter, de se tromper et de revenir sur leurs choix sans que ce soit définitif.",
      ),
      question: {
        level: "C1",
        prompt: "À quelle condition les réformes peuvent-elles réduire les inégalités ?",
        options: ["Si les élèves peuvent expérimenter et revenir sur leurs choix", "Si les filières disparaissent", "Si les familles décident seules", "Si l'orientation est plus précoce"],
        correct: "A",
        explanation: "Pour être efficaces, elles doivent offrir un droit à l'essai et à l'erreur, au-delà de la simple information.",
      },
    },
    {
      title: "Le droit au logement",
      text: p(
        "Le droit au logement figure parmi les principes que la société prétend garantir, mais sa mise en œuvre se heurte à une réalité contrastée. Dans les grandes métropoles, la demande de logements sociaux dépasse largement l'offre, et les délais d'attribution s'étirent sur plusieurs années pour de nombreux ménages.",
        "Face à cette situation, les pouvoirs publics multiplient les dispositifs : construction, encadrement des loyers, aide à la réhabilitation. Pourtant, ces mesures ne produisent leurs effets qu'à moyen terme, tandis que les besoins sont immédiats. Cet écart entre le temps de la politique publique et celui de la vie quotidienne alimente un sentiment d'abandon, que les associations disent percevoir chez des familles parfois installées de longue date dans la précarité.",
      ),
      question: {
        level: "C1",
        prompt: "Quel décalage alimente le sentiment d'abandon ?",
        options: ["Entre le temps des politiques publiques et celui des besoins", "Entre loyers et salaires", "Entre villes et campagnes", "Entre jeunes et anciens"],
        correct: "A",
        explanation: "Les mesures n'agissent qu'à moyen terme alors que les besoins des ménages sont immédiats.",
      },
    },
    {
      title: "La reconnaissance des savoirs de l'expérience",
      text: p(
        "Les compétences acquises en dehors de l'école, dans le travail, le bénévolat ou la vie familiale, sont encore mal reconnues. La validation des acquis de l'expérience permet pourtant d'obtenir un diplôme sans repasser par un cursus classique, en faisant valoir ce que l'on sait déjà faire.",
        "Cette procédure demeure toutefois complexe et peu connue, et beaucoup de candidats potentiels, surtout dans les métiers les moins qualifiés, y renoncent faute d'accompagnement. Pour rendre la reconnaissance effective, il faudrait simplifier les démarches, former des conseillers et convaincre les employeurs de valoriser ces parcours, de manière à ce que les savoirs d'expérience ne soient plus tenus pour moins légitimes que ceux de l'école.",
      ),
      question: {
        level: "C1",
        prompt: "Que faudrait-il pour que la reconnaissance soit effective ?",
        options: ["Simplifier les démarches et valoriser ces parcours chez les employeurs", "Supprimer les diplômes", "Allonger les études", "Réduire les salaires"],
        correct: "A",
        explanation: "Il faut rendre la procédure plus accessible, former des conseillers et faire évoluer le regard des employeurs.",
      },
    },
    {
      title: "L'individu et le collectif",
      text: p(
        "L'opposition entre l'individu et le collectif traverse la pensée politique depuis des siècles, comme si l'un ne pouvait s'affirmer qu'au détriment de l'autre. Cette alternative paraît pourtant trompeuse : l'individu ne se constitue qu'à travers des langues, des institutions et des relations qui le précèdent, et le collectif n'existe que par la participation d'individus qui lui donnent forme.",
        "Dès lors, la question n'est pas de choisir entre autonomie et appartenance, mais de comprendre comment elles se conditionnent. Une société qui étouffe l'initiative se prive de sa vitalité ; une société qui ignore le lien se condamne à la fragmentation. L'enjeu politique est de ménager entre ces deux exigences une tension féconde, que ni le culte de la liberté personnelle ni celui de la cohésion ne suffisent à maintenir, car chacun tend à oublier ce que l'autre apporte à la vie commune.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur envisage-t-il le rapport entre individu et collectif ?",
        options: ["Comme une tension féconde où chacun conditionne l'autre", "Comme une opposition irréductible", "Comme une identité parfaite", "Comme une question dépassée"],
        correct: "A",
        explanation: "Selon l'auteur, autonomie et appartenance se conditionnent et doivent être tenues dans une tension productive.",
      },
    },
    {
      title: "Sobriété et liberté",
      text: p(
        "On présente fréquemment la sobriété comme une contrainte imposée de l'extérieur, une privation que des autorités éclairées exigeraient au nom de l'intérêt général. Cette lecture occulte une autre possibilité : celle d'une sobriété choisie, qui serait aussi une manière de se libérer de besoins fabriqués, d'une accumulation dont on ne perçoit plus le sens.",
        "Il ne s'agit pas d'opposer vertu et confort, mais de reconnaître que nos désirs sont en partie façonnés par un environnement qui les stimule sans cesse. Interroger cet environnement, c'est se donner la possibilité de décider ce qui compte vraiment pour soi. La sobriété cesse alors d'être un renoncement pour devenir, comme le soutiennent ses partisans, l'une des formes que peut prendre une liberté qui ne se confondrait plus avec la simple faculté de consommer, et qui redonnerait à chacun la maîtrise de son temps et de son attention, ressources autrement précieuses que les objets accumulés.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur réinterprète-t-il la sobriété ?",
        options: ["Comme une liberté qui ne se réduit pas à consommer", "Comme une privation imposée", "Comme une vertu inutile", "Comme une mode passagère"],
        correct: "A",
        explanation: "La sobriété choisie est présentée comme une libération des besoins fabriqués, donc comme une forme de liberté.",
      },
    },
    {
      title: "L'idée de progrès moral",
      text: p(
        "Beaucoup tiennent pour acquis que les sociétés progressent moralement, à mesure que reculent certaines violences et que s'étendent des droits. Cette idée, rassurante, mérite néanmoins d'être interrogée : elle suppose que les valeurs d'une époque constituent la mesure de celles du passé, et fait de nos prédécesseurs des fautifs que nous aurions dépassés.",
        "Il serait plus juste de parler de transformations que de progrès, car chaque avancée comporte ses angles morts, que les générations suivantes découvrent à leur tour. Reconnaître cette incertitude ne conduit pas à relativiser toute valeur ; cela invite à une humilité qui prémunit contre l'arrogance du présent et ouvre la possibilité de questionner nos propres évidences avant que d'autres ne le fassent à notre place, avec moins d'indulgence que nous n'en accordons à nous-mêmes.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle attitude l'auteur recommande-t-il ?",
        options: ["Une humilité qui interroge nos propres évidences", "La fierté d'avoir progressé", "Le rejet de toute valeur", "L'imitation du passé"],
        correct: "A",
        explanation: "Plutôt que de croire au progrès, l'auteur préconise de rester modeste et d'examiner ses propres certitudes.",
      },
    },
    {
      title: "La conversation démocratique",
      text: p(
        "La démocratie ne se réduit pas au vote : elle suppose une conversation continue, où des points de vue divergents se confrontent sans s'exclure. Cette conversation exige des conditions qui ne vont pas de soi : des médias qui informent, des lieux où se rencontrer, un langage commun suffisant pour que le désaccord reste intelligible.",
        "Or ces conditions s'érodent lorsque chacun s'informe dans des cercles qui le confortent, et que le débat tend à se réduire à l'affrontement d'identités. Préserver la conversation démocratique ne signifie pas viser le consensus, mais maintenir la possibilité de se contredire sans se disqualifier. C'est à cette exigence, plus discrète que le vote mais plus fondamentale, que se mesure la santé d'une société libre, bien plus qu'à la solennité de ses scrutins ou à l'éclat de ses discours officiels.",
      ),
      question: {
        level: "C2",
        prompt: "À quoi se mesure la santé d'une société libre selon l'auteur ?",
        options: ["À la possibilité de se contredire sans se disqualifier", "Au nombre de votants", "À l'absence de désaccord", "À la rapidité des décisions"],
        correct: "A",
        explanation: "Pour l'auteur, ce qui compte est de préserver un débat où l'on peut s'opposer sans exclure l'autre.",
      },
    },
    {
      title: "La responsabilité des générations",
      text: p(
        "À quoi sommes-nous tenus envers ceux qui viendront après nous ? La question, longtemps abstraite, s'est imposée avec la prise de conscience des limites écologiques. Léguer un monde habitable ne relève plus seulement de la générosité : c'est une exigence de justice, dès lors que nos actions présentes engagent des conditions de vie que d'autres subiront sans avoir pu les influencer.",
        "Mais cette responsabilité ne doit pas devenir un prétexte à la culpabilisation de ceux qui, aujourd'hui, ne disposent que de moyens limités. L'enjeu est de répartir équitablement l'effort entre ceux qui ont le plus contribué aux atteintes et ceux qui en pâtissent le plus. À défaut, l'invocation de l'avenir risque de servir à faire peser sur les plus vulnérables des sacrifices que d'autres auraient pu assumer, et que ceux-là mêmes qui s'en réclament se gardent bien de s'imposer à eux-mêmes.",
      ),
      question: {
        level: "C2",
        prompt: "Quel risque l'auteur signale-t-il à propos de la responsabilité envers l'avenir ?",
        options: ["Qu'elle fasse peser des sacrifices sur les plus vulnérables", "Qu'elle soit oubliée", "Qu'elle coûte trop cher", "Qu'elle soit réservée aux jeunes"],
        correct: "A",
        explanation: "Sans répartition équitable de l'effort, l'argument de l'avenir peut charger les plus fragiles de sacrifices injustes.",
      },
    },
  ],
});
