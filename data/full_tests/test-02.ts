import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 2.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_02 = defineFullTest({
  number: 2,
  description:
    "Deuxième examen blanc complet : trois épreuves enchaînées, du niveau A1 au niveau C2, dans les conditions du TCF Tout public.",
  listening: [
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Bonsoir, votre séance du film « Les jours clairs » commence à vingt heures. Les portes ouvrent à dix-neuf heures trente. Votre salle est la numéro deux.",
      prompt: "À quelle heure commence la séance ?",
      options: ["À dix-neuf heures trente", "À vingt heures", "À vingt heures trente", "À dix-neuf heures"],
      correct: "B",
      explanation: "L'annonce indique que le film commence à vingt heures ; les portes ouvrent une demi-heure plus tôt.",
    },
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, votre colis sera livré demain entre neuf heures et midi. Si vous êtes absent, nous le laisserons chez le gardien de l'immeuble.",
      prompt: "Que fera le livreur en cas d'absence ?",
      options: ["Il reviendra le lendemain", "Il laissera le colis chez le gardien", "Il déposera le colis devant la porte", "Il annulera la livraison"],
      correct: "B",
      explanation: "Le message précise que le colis sera confié au gardien si le destinataire est absent.",
    },
    {
      level: "A1",
      category: "sport",
      transcription:
        "La piscine municipale est fermée jeudi matin pour entretien. Elle rouvre jeudi à quatorze heures. Les abonnés peuvent utiliser la piscine du stade.",
      prompt: "Pourquoi la piscine est-elle fermée ?",
      options: ["Pour une compétition", "Pour des travaux de rénovation", "Pour entretien", "Pour un jour férié"],
      correct: "C",
      explanation: "La fermeture du jeudi matin est justifiée par l'entretien des installations.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Bonjour, je vous confirme votre rendez-vous de quatorze heures avec le docteur Lambert. Merci d'apporter votre ordonnance et votre carte d'assurance.",
      prompt: "Que doit apporter le patient ?",
      options: ["Son ordonnance et sa carte d'assurance", "Un bilan sanguin", "Son dossier scolaire", "Une lettre de son employeur"],
      correct: "A",
      explanation: "Le secrétariat demande explicitement l'ordonnance et la carte d'assurance.",
    },
    {
      level: "A2",
      category: "restauration",
      transcription:
        "Bonsoir, je voudrais réserver une table pour quatre personnes samedi à vingt heures. Si possible en terrasse. — C'est noté, à samedi.",
      prompt: "Quelle table le client souhaite-t-il ?",
      options: ["Une table près de la fenêtre", "Une table en terrasse", "Une table au premier étage", "Une table près du bar"],
      correct: "B",
      explanation: "Le client demande une table en terrasse, et la réservation est acceptée.",
    },
    {
      level: "A2",
      category: "banque",
      transcription:
        "Bonjour, votre carte bancaire a été bloquée après trois codes erronés. Pour la débloquer, appelez le numéro inscrit au dos de votre carte.",
      prompt: "Pourquoi la carte a-t-elle été bloquée ?",
      options: ["Après trois codes erronés", "Après un paiement à l'étranger", "Après un retrait important", "Après une perte déclarée"],
      correct: "A",
      explanation: "Le blocage fait suite à trois saisies incorrectes du code confidentiel.",
    },
    {
      level: "A2",
      category: "orientation",
      transcription:
        "Pour rejoindre le musée, prenez le tram deux jusqu'à l'arrêt République. Ensuite, marchez cinq minutes vers le nord. Le musée se trouve à côté de la poste.",
      prompt: "Quel transport faut-il prendre ?",
      options: ["Le bus douze", "Le tram deux", "Le métro quatre", "Le train régional"],
      correct: "B",
      explanation: "L'itinéraire commence par le tram deux jusqu'à l'arrêt République.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Suite à la grève des trains, la réunion de jeudi se tiendra finalement en visioconférence. Le lien vous sera envoyé mercredi. Merci de tester votre micro avant neuf heures.",
      prompt: "Pourquoi la réunion change-t-elle de format ?",
      options: ["La salle est indisponible", "Les trains sont en grève", "Le responsable est malade", "Le lien a expiré"],
      correct: "B",
      explanation: "La grève des trains oblige à remplacer la réunion en présentiel par une visioconférence.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "L'appartement est au deuxième étage avec ascenseur. Les charges comprennent l'eau et le chauffage, mais pas l'électricité. La visite est possible samedi matin.",
      prompt: "Qu'est-ce qui n'est pas compris dans les charges ?",
      options: ["L'eau", "Le chauffage", "L'électricité", "L'entretien de l'immeuble"],
      correct: "C",
      explanation: "Les charges couvrent l'eau et le chauffage ; l'électricité reste à la charge du locataire.",
    },
    {
      level: "B1",
      category: "loisirs",
      transcription:
        "Le cours de yoga de mardi est annulé. Une séance de remplacement aura lieu jeudi à dix-huit heures, ou vous pouvez demander le remboursement.",
      prompt: "Quelle solution est proposée ?",
      options: ["Un remboursement uniquement", "Une séance de remplacement ou un remboursement", "Un cours supplémentaire le lundi", "Un rendez-vous individuel"],
      correct: "B",
      explanation: "Le message offre le choix entre une séance de remplacement et un remboursement.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "Votre livre est rendu avec une semaine de retard. Vous devez régler trois euros d'amende à l'accueil avant d'emprunter un nouvel ouvrage.",
      prompt: "Que doit faire l'usager ?",
      options: ["Rendre un autre livre", "Payer une amende", "Renvoyer sa carte", "Attendre un mois"],
      correct: "B",
      explanation: "Le retard entraîne une amende de trois euros à régler avant tout nouvel emprunt.",
    },
    {
      level: "B1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, je suis votre voisin du dessous. Il y a une fuite sous mon plafond, probablement dans votre salle de bain. Pouvez-vous appeler un plombier rapidement ?",
      prompt: "Quel est le problème ?",
      options: ["Une fuite d'eau", "Une panne de chauffage", "Un bruit répété", "Une porte cassée"],
      correct: "A",
      explanation: "Le voisin signale une fuite d'eau provenant probablement de la salle de bain.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Votre profil correspond bien à nos besoins. Nous avons toutefois besoin d'une personne capable de conduire notre camionnette. Avez-vous un permis de conduire valide ?",
      prompt: "Quelle compétence est indispensable ?",
      options: ["Le permis de conduire", "La maîtrise de l'anglais", "Une expérience de vendeur", "La disponibilité le week-end"],
      correct: "A",
      explanation: "L'employeur exige un permis valide pour conduire la camionnette de l'entreprise.",
    },
    {
      level: "B2",
      category: "commerce",
      transcription:
        "En raison des travaux de la place, le marché alimentaire se tiendra provisoirement sur le parking de la gare. Il conserve ses horaires habituels, du mardi au dimanche matin.",
      prompt: "Où se déroule désormais le marché ?",
      options: ["Sur la place centrale", "Sur le parking de la gare", "Dans le hall de la mairie", "Au bord de la rivière"],
      correct: "B",
      explanation: "Les travaux déplacent le marché sur le parking de la gare, sans changer les horaires.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "Le colloque sur les villes durables est ouvert à tous, mais l'inscription est obligatoire. Elle se fait en ligne jusqu'au quinze mars. Le programme sera publié la semaine suivante.",
      prompt: "Que doivent faire les participants ?",
      options: ["S'inscrire en ligne", "Payer des frais d'entrée", "Attendre le programme", "Réserver une chambre"],
      correct: "A",
      explanation: "L'inscription en ligne est obligatoire avant le quinze mars, même si le colloque est ouvert à tous.",
    },
    {
      level: "B2",
      category: "environnement",
      transcription:
        "À partir de lundi, les déchets verts seront collectés le mercredi matin, et non plus le jeudi. Les bacs doivent être sortis la veille au soir. Cette mesure doit réduire les coûts de transport.",
      prompt: "Quel est l'objectif de la mesure ?",
      options: ["Réduire les coûts de transport", "Augmenter la fréquence des collectes", "Supprimer le tri des déchets", "Créer de nouveaux emplois"],
      correct: "A",
      explanation: "La collecte est décalée pour réduire les coûts de transport, selon l'annonce.",
    },
    {
      level: "B2",
      category: "logement",
      transcription:
        "Les locataires contestent l'augmentation annuelle des loyers. Ils estiment qu'elle dépasse le plafond autorisé par la loi. L'association de défense des occupants demande une médiation avant toute procédure.",
      prompt: "Que demandent les locataires ?",
      options: ["Une baisse immédiate des loyers", "Une médiation avant toute procédure", "Le départ des propriétaires", "La suppression du plafond"],
      correct: "B",
      explanation: "Les locataires réclament une médiation avant d'engager une procédure judiciaire.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "La téléconsultation permet de consulter un médecin à distance. Elle convient aux renouvellements d'ordonnance et aux symptômes légers, mais elle ne remplace pas un examen physique en cas d'urgence.",
      prompt: "Dans quel cas la téléconsultation est-elle inadaptée ?",
      options: ["Pour renouveler une ordonnance", "Pour des symptômes légers", "En cas d'urgence nécessitant un examen physique", "Pour un premier avis médical"],
      correct: "C",
      explanation: "Le message exclut la téléconsultation lorsqu'un examen physique est nécessaire en urgence.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "L'inflation alimentaire ralentit, mais elle reste supérieure à celle de l'énergie. Les ménages modestes, qui consacrent une part plus élevée de leur budget à l'alimentation, la ressentent davantage. Les statisticiens rappellent qu'une moyenne nationale masque ces écarts de structure. Une politique de soutien ciblé aurait donc plus d'effet qu'une baisse généralisée des taxes.",
      prompt: "Pourquoi une moyenne nationale est-elle trompeuse ?",
      options: ["Elle ignore les écarts entre catégories de ménages", "Elle exagère le poids de l'alimentation", "Elle exclut les prix de l'énergie", "Elle est calculée trop souvent"],
      correct: "A",
      explanation: "La moyenne masque les différences de budget et de ressenti entre les ménages.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "Le théâtre municipal envisage de réduire ses subventions aux compagnies émergentes pour financer deux grandes productions. Les défenseurs de cette orientation invoquent la billetterie et le rayonnement de la ville. Leurs critiques objectent que les créations inédites, moins rentables, constituent précisément la mission d'un service public. Le débat porte sur la définition de la réussite culturelle.",
      prompt: "Quel est le cœur du désaccord ?",
      options: ["Le montant total des subventions", "La définition de la réussite culturelle", "La qualité des grandes productions", "Les horaires des spectacles"],
      correct: "B",
      explanation: "Les deux camps ne mesurent pas la réussite culturelle de la même manière : rentabilité ou création.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Les recherches sur le sommeil modifient notre compréhension de l'apprentissage. Pendant la nuit, le cerveau ne se contente pas de reposer : il trie et consolide les informations de la journée. Une nuit trop courte ne supprime pas seulement de l'énergie ; elle fragilise l'ancrage des connaissances. D'où l'intérêt d'horaires scolaires qui respectent le rythme des adolescents.",
      prompt: "Quel rôle le sommeil joue-t-il dans l'apprentissage ?",
      options: ["Il consolide les informations de la journée", "Il efface les souvenirs inutiles", "Il remplace la révision", "Il augmente seulement l'énergie"],
      correct: "A",
      explanation: "Le sommeil trie et consolide les informations, ce qui renforce l'ancrage des connaissances.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Le vote électronique séduit par sa simplicité, mais il inquiète les spécialistes de la sécurité. Un système fermé peut être audité ; un système distant expose davantage au piratage et au doute sur le décompte. La confiance ne repose pas seulement sur la technique, elle dépend aussi de la possibilité de vérifier le résultat.",
      prompt: "Quelle est la principale réserve des spécialistes ?",
      options: ["La difficulté d'auditer et de vérifier le décompte", "Le coût des machines", "La faible participation", "L'interdiction du vote papier"],
      correct: "A",
      explanation: "Le vote à distance rend l'audit et la vérification du décompte plus difficiles, donc la confiance fragile.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "On réduit souvent le travail à sa fonction économique, comme s'il n'était qu'un moyen de gagner sa vie. Cette conception ignore ce que l'activité apporte à celui qui l'exerce : une place dans le monde, une reconnaissance, parfois un sentiment d'utilité. À l'inverse, l'idéal d'un travail purement expressif méconnaît les contraintes matérielles qui pèsent sur la plupart des emplois. Penser le travail exige de tenir ensemble ces deux dimensions.",
      prompt: "Quelle erreur l'auteur reproche-t-il aux deux conceptions ?",
      options: ["De négliger une dimension du travail", "De refuser toute contrainte économique", "De surestimer la reconnaissance", "De mépriser les loisirs"],
      correct: "A",
      explanation: "Chaque conception oublie une dimension : l'une la reconnaissance, l'autre les contraintes matérielles.",
    },
    {
      level: "C2",
      category: "environnement",
      transcription:
        "Le débat sur le nucléaire oppose souvent des certitudes symétriques. Les uns rappellent les risques d'accident et l'irréversibilité des déchets ; les autres mettent en avant la faible empreinte carbone et la stabilité de la production. Or ces arguments ne répondent pas aux mêmes questions : ils comparent des horizons temporels différents. Trancher suppose de rendre explicite ce que nous privilégions, la sécurité immédiate ou la continuité énergétique.",
      prompt: "Pourquoi le débat est-il difficile à trancher ?",
      options: ["Les arguments portent sur des horizons temporels différents", "Les données scientifiques manquent", "Les deux camps refusent le dialogue", "La production est trop faible"],
      correct: "A",
      explanation: "Les risques de long terme et la stabilité immédiate ne se comparent pas sur la même échelle de temps.",
    },
    {
      level: "C2",
      category: "littérature",
      transcription:
        "Traduire n'est pas transporter un sens intact d'une langue à l'autre. Chaque langue découpe le réel selon ses propres catégories ; certains mots n'ont pas d'équivalent exact. Le traducteur doit choisir entre la fidélité à l'original et la lisibilité dans la langue d'arrivée. Ce choix n'est pas un défaut technique : il révèle qu'aucune traduction ne peut être neutre.",
      prompt: "Quelle conception de la traduction l'auteur défend-il ?",
      options: ["Une opération neutre de transfert", "Un choix interprétatif inévitable", "Une simple adaptation commerciale", "Une copie exacte du sens"],
      correct: "B",
      explanation: "L'auteur affirme que le traducteur doit choisir, et qu'aucune traduction ne peut être neutre.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Nous ___ au cinéma chaque vendredi soir.",
      options: ["allons", "allez", "vont", "va"],
      correct: "A",
      explanation: "Le sujet « nous » impose la première personne du pluriel : « nous allons ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Elle achète ___ pain frais tous les matins.",
      options: ["du", "de", "des", "le"],
      correct: "A",
      explanation: "L'article partitif « du » introduit une quantité indéterminée de pain.",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Quand le téléphone a sonné, je ___ dans le jardin.",
      options: ["travaillais", "travaille", "ai travaillé", "travaillerai"],
      correct: "A",
      explanation: "L'imparfait décrit l'action en cours interrompue par la sonnerie du téléphone.",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Cette lettre, il ___ a envoyée hier.",
      options: ["l'", "la", "lui", "leur"],
      correct: "A",
      explanation: "Le pronom COD « l' » remplace « cette lettre » devant le verbe « a envoyée ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous avons décidé ___ partir plus tôt.",
      options: ["de", "à", "pour", "en"],
      correct: "A",
      explanation: "Le verbe « décider » se construit avec « de » devant un infinitif.",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce restaurant est ___ fréquenté que celui d'en face : on y trouve toujours une table.",
      options: ["moins", "aussi", "plus", "très"],
      correct: "A",
      explanation: "La présence systématique de tables libres indique une fréquentation inférieure : « moins fréquenté ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le village ___ je viens se trouve au bord de la mer.",
      options: ["dont", "que", "qui", "où"],
      correct: "A",
      explanation: "Le verbe « venir de » appelle le pronom relatif « dont » : « le village dont je viens ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Lorsqu'elle ___ son rapport, elle enverra une copie au directeur.",
      options: ["aura rédigé", "rédigera", "rédigeait", "a rédigé"],
      correct: "A",
      explanation: "Après « lorsque », l'action antérieure à un futur se met au futur antérieur : « aura rédigé ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Bien qu'il ___ fatigué, il a terminé la course.",
      options: ["soit", "est", "sera", "était"],
      correct: "A",
      explanation: "« Bien que » exige le subjonctif présent : « bien qu'il soit fatigué ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Le musée est fermé ___ travaux de rénovation.",
      options: ["en raison de", "grâce à", "malgré", "afin de"],
      correct: "A",
      explanation: "« En raison de » exprime une cause neutre ou défavorable, adaptée à une fermeture.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Les résultats ___ demain matin par la direction.",
      options: ["seront annoncés", "annonceront", "seront annoncer", "ont annoncé"],
      correct: "A",
      explanation: "Le complément d'agent « par la direction » impose la voix passive au futur : « seront annoncés ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ le train, elle a appelé son collègue.",
      options: ["En attendant", "Attendant", "Ayant attendu", "Attendre"],
      correct: "A",
      explanation: "Le gérondif exprime la simultanéité et se forme avec « en » : « en attendant ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Il m'a expliqué qu'il ___ ce dossier la semaine précédente.",
      options: ["avait terminé", "termine", "terminera", "terminait"],
      correct: "A",
      explanation: "Au discours indirect au passé, le plus-que-parfait marque l'antériorité : « avait terminé ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "La réunion ___ j'ai assistée portait sur le budget.",
      options: ["à laquelle", "que", "dont", "où"],
      correct: "A",
      explanation: "Le verbe « assister à » appelle « à laquelle », accordé avec « la réunion ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "Jamais ___ vu autant de monde dans cette salle.",
      options: ["n'a-t-on", "on n'a", "n'a on", "on n'a-t-il"],
      correct: "A",
      explanation: "Après « jamais » en tête de phrase, l'inversion du sujet est obligatoire : « n'a-t-on vu ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ du dossier a été confiée à une avocate.",
      options: ["défense", "défendre", "défendu", "défensif"],
      correct: "A",
      explanation: "Le nom correspondant au verbe « défendre » est « la défense ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "S'il ___ la vérité, il aurait agi autrement.",
      options: ["avait connue", "connaissait", "a connue", "connaîtrait"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé associe le plus-que-parfait au conditionnel passé : « s'il avait connue ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Cette mesure a ___ la colère des usagers.",
      options: ["suscité", "suscitée", "susciter", "suscitant"],
      correct: "A",
      explanation: "Le COD « la colère » est placé après le verbe : le participe passé « suscité » reste invariable.",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "À peine ___ -elle entrée que la salle se tut.",
      options: ["fut", "était", "est", "sera"],
      correct: "A",
      explanation: "Le passé antérieur « fut entrée » marque l'antériorité immédiate dans un récit au passé simple.",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "___ toute attente, le candidat a remporté l'élection.",
      options: ["Contre", "Malgré", "En dépit de", "Sans"],
      correct: "A",
      explanation: "L'expression figée « contre toute attente » signifie contrairement aux prévisions.",
    },
  ],
  reading: [
    {
      title: "La laverie du centre",
      text: p(
        "La laverie ouvre tous les jours de sept heures à vingt et une heures. Pour utiliser une machine, réglez le programme au comptoir et payez. L'eau de javel est interdite. Libérez les tambours en fin de cycle et signalez toute panne.",
      ),
      question: {
        level: "B1",
        prompt: "Que doit faire un client en cas de panne ?",
        options: ["La signaler à l'accueil", "Rembourser le cycle", "Appeler un technicien", "Changer de machine"],
        correct: "A",
        explanation: "La consigne demande de signaler toute panne, sans préciser d'autre démarche.",
      },
    },
    {
      title: "Changement d'horaire du cours de danse",
      text: p(
        "Bonjour à toutes et à tous, le cours de danse du mercredi est déplacé au mardi à dix-neuf heures, à partir de la semaine prochaine. La salle est en effet réservée pour un spectacle. Le contenu du cours ne change pas. Pensez à apporter une bouteille d'eau.",
      ),
      question: {
        level: "B1",
        prompt: "Pourquoi le cours change-t-il de jour ?",
        options: ["La salle est réservée pour un spectacle", "La professeure est absente", "Le cours dure plus longtemps", "Les élèves ont demandé ce changement"],
        correct: "A",
        explanation: "Le message explique que la salle du mercredi accueille un spectacle.",
      },
    },
    {
      title: "Brocante de quartier",
      text: p(
        "La brocante aura lieu dimanche, de huit heures à dix-huit heures, place des Tilleuls. L'inscription coûte cinq euros et comprend une table. La vente d'aliments préparés est interdite ; le comité vend les boissons.",
      ),
      question: {
        level: "B1",
        prompt: "Qu'est-il interdit aux exposants ?",
        options: ["Vendre des aliments préparés", "Vendre des vêtements", "Arriver avant sept heures trente", "Installer une table"],
        correct: "A",
        explanation: "Le règlement interdit la vente d'aliments préparés ; les boissons sont réservées au comité.",
      },
    },
    {
      title: "Nouveaux horaires de la crèche",
      text: p(
        "La crèche Les Petits Pas sera ouverte de sept heures trente à dix-huit heures trente à partir du mois prochain. Elle fermera les deux premières semaines d'août. Les familles doivent mettre à jour leur dossier avant le quinze juin.",
      ),
      question: {
        level: "B1",
        prompt: "Quand la crèche ferme-t-elle ?",
        options: ["Les deux premières semaines d'août", "Tout le mois de juillet", "Chaque vendredi après-midi", "La dernière semaine de juin"],
        correct: "A",
        explanation: "Le texte précise une fermeture durant les deux premières semaines d'août.",
      },
    },
    {
      title: "Covoiturage entre collègues",
      text: p(
        "Une plateforme de covoiturage est disponible pour les salariés du site. Les conducteurs doivent disposer d'une assurance adaptée et réserver leur place vingt-quatre heures à l'avance. Les places restantes sont attribuées par ordre de demande.",
      ),
      question: {
        level: "B1",
        prompt: "Quelle condition s'applique aux conducteurs ?",
        options: ["Avoir une assurance adaptée", "Habiter à moins de dix kilomètres", "Travailler à temps plein", "Prêter leur véhicule"],
        correct: "A",
        explanation: "Les conducteurs doivent justifier d'une assurance adaptée au covoiturage.",
      },
    },
    {
      title: "La cantine passe au local",
      text: p(
        "La cantine scolaire consacre désormais quarante pour cent de ses achats à des produits locaux. Le surcoût, estimé à quinze centimes par repas, sera supporté par la commune. Les agriculteurs y voient une reconnaissance, mais certains parents craignent une hausse des tarifs.",
        "L'offre variant selon les saisons, la cantine adapte ses menus plutôt que d'importer les mêmes légumes toute l'année.",
      ),
      question: {
        level: "B2",
        prompt: "Comment la cantine gère-t-elle la saisonnalité ?",
        options: ["En adaptant les menus aux produits disponibles", "En important les mêmes légumes toute l'année", "En supprimant les légumes en hiver", "En augmentant le prix des repas"],
        correct: "A",
        explanation: "Le texte indique que la cantine prévoit des menus adaptés à l'offre saisonnière.",
      },
    },
    {
      title: "Trottinettes : la ville légifère",
      text: p(
        "Face à la multiplication des trottinettes électriques, la ville limite leur vitesse à quinze kilomètres par heure sur les pistes cyclables et les interdit sur les trottoirs. Des zones de stationnement obligatoires seront créées près des stations de métro.",
        "Les usagers dénoncent une réglementation qui pénalise les trajets courts, tandis que les piétons saluent la mesure. Les accidents ont augmenté de vingt pour cent en un an.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle mesure la ville prend-elle pour le stationnement ?",
        options: ["Elle crée des zones obligatoires", "Elle l'interdit totalement", "Elle le rend payant partout", "Elle le réserve aux livreurs"],
        correct: "A",
        explanation: "Le texte annonce des zones de stationnement obligatoires près des stations de métro.",
      },
    },
    {
      title: "Se former sans quitter son poste",
      text: p(
        "L'entreprise a lancé un programme de formation destiné aux salariés peu qualifiés. Les cours ont lieu sur le temps de travail, à raison de deux heures par semaine, et préparent une certification reconnue.",
        "Les inscrits se sentent plus confiants. Les syndicats regrettent toutefois que le dispositif reste limité à une centaine de personnes et réclament un droit à la formation inscrit dans les accords collectifs.",
      ),
      question: {
        level: "B2",
        prompt: "Que reprochent les syndicats au dispositif ?",
        options: ["Son nombre limité de bénéficiaires", "La qualité des cours", "Le niveau trop élevé de la certification", "L'absence de salaire"],
        correct: "A",
        explanation: "Les syndicats dénoncent un programme réservé à une centaine de salariés seulement.",
      },
    },
    {
      title: "Habiter chez un aîné",
      text: p(
        "Le dispositif de cohabitation intergénérationnelle met en relation des étudiants et des personnes âgées disposant d'une chambre libre. En échange d'un loyer modéré, le jeune s'engage à rendre de petits services et à être présent le soir.",
        "Les travailleurs sociaux avertissent cependant que ce modèle ne remplace pas une politique publique du logement et ne concerne qu'un nombre limité de situations.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite les travailleurs sociaux soulignent-ils ?",
        options: ["Le dispositif ne remplace pas une politique du logement", "Les étudiants refusent de payer", "Les personnes âgées manquent de place", "Les règles sont trop souples"],
        correct: "A",
        explanation: "Ils rappellent que la cohabitation ne peut se substituer à une politique publique du logement.",
      },
    },
    {
      title: "Démarches en ligne : qui reste à l'écart ?",
      text: p(
        "La dématérialisation des services publics simplifie les démarches, mais exclut ceux qui maîtrisent mal le numérique. Les associations signalent que des personnes âgées et des foyers précaires renoncent parfois à leurs droits.",
        "Des points d'accueil ont été créés, mais ils restent insuffisants. Des chercheurs plaident pour un droit à un accompagnement humain, estimant que l'accès au service public ne peut dépendre de la seule compétence technique.",
      ),
      question: {
        level: "B2",
        prompt: "Que plaident les chercheurs ?",
        options: ["Un droit à un accompagnement humain", "La suppression des services en ligne", "La fermeture des points d'accueil", "Une formation obligatoire pour tous"],
        correct: "A",
        explanation: "Ils demandent un droit à l'accompagnement humain pour garantir l'accès au service public.",
      },
    },
    {
      title: "Le sport féminin gagne du terrain",
      text: p(
        "Les résultats des sportives progressent, mais leur présence médiatique reste inférieure à celle des hommes. Les grands événements sont davantage diffusés et les primes augmentent.",
        "Les chercheuses nuancent ces avancées : les horaires restent moins favorables et les sponsors investissent moins. La visibilité ne suffit pas si les conditions d'entraînement demeurent inégales ; il faut financer durablement les structures.",
      ),
      question: {
        level: "B2",
        prompt: "Selon les chercheuses, que ne suffit-il pas de faire ?",
        options: ["Médiatiser le sport féminin", "Augmenter les primes", "Créer des clubs professionnels", "Changer les horaires"],
        correct: "A",
        explanation: "La visibilité ne suffit pas sans financement durable ni égalité des conditions d'entraînement.",
      },
    },
    {
      title: "Réparer plutôt que jeter",
      text: p(
        "Le bonus réparation encourage les consommateurs à faire réparer leurs appareils au lieu d'en acheter des neufs. Il couvre une partie du coût.",
        "Le dispositif reste peu connu et les réparateurs se plaignent de démarches lourdes, tandis que les fabricants conçoivent encore des modèles difficiles à démonter. Pour les associations, l'enjeu est de contraindre l'écoconception, sans quoi le bonus déplace le problème.",
      ),
      question: {
        level: "B2",
        prompt: "Quel est l'enjeu principal selon les associations ?",
        options: ["Contraindre les fabricants à l'écoconception", "Augmenter le montant du bonus", "Réduire le nombre de réparateurs", "Interdire la vente d'appareils neufs"],
        correct: "A",
        explanation: "Sans obligation d'écoconception, le bonus ne ferait que déplacer le problème.",
      },
    },
    {
      title: "Des jeux vidéo à la bibliothèque",
      text: p(
        "Plusieurs bibliothèques proposent désormais des jeux vidéo en prêt. Le succès est immédiat auprès des adolescents.",
        "Le choix des titres suscite des débats : certains élus s'inquiètent de la violence, d'autres défendent la liberté des collections. Les bibliothécaires insistent sur leur rôle de médiation : ils expliquent les mécanismes, organisent des rencontres et accompagnent les parents.",
      ),
      question: {
        level: "B2",
        prompt: "Quel rôle les bibliothécaires mettent-ils en avant ?",
        options: ["Un rôle de médiation auprès du public", "Un rôle de contrôle des contenus violents", "Un rôle commercial", "Un rôle de surveillance des adolescents"],
        correct: "A",
        explanation: "Ils défendent une médiation qui transforme le jeu en support de discussion.",
      },
    },
    {
      title: "L'agriculture sur les toits",
      text: p(
        "Des exploitants installent des potagers sur les toits d'immeubles. Les rendements restent modestes, mais ces fermes rapprochent producteurs et consommateurs.",
        "Les contraintes sont nombreuses : poids des installations, accès, coût des structures. Les projets solides associent plusieurs usages. Les chercheurs estiment que ces fermes ne nourriront pas les villes, mais qu'elles peuvent jouer un rôle pédagogique et social important.",
      ),
      question: {
        level: "B2",
        prompt: "Quel rôle les chercheurs attribuent-ils aux fermes urbaines ?",
        options: ["Un rôle pédagogique et social", "L'approvisionnement complet des villes", "Le remplacement de l'agriculture rurale", "La réduction du prix des terrains"],
        correct: "A",
        explanation: "Ils jugent leur contribution alimentaire limitée mais leur rôle pédagogique et social important.",
      },
    },
    {
      title: "Le sommeil des adolescents",
      text: p(
        "Plusieurs établissements ont repoussé l'heure de début des cours pour respecter le rythme biologique des adolescents. Les résultats sont positifs : moins de retard.",
        "Les critiques invoquent l'organisation des transports. Les chercheurs répondent que ces difficultés sont réelles mais ne justifient pas des horaires défavorables à la santé. Le débat révèle un conflit entre logiques administratives et données scientifiques.",
      ),
      question: {
        level: "B2",
        prompt: "Quel conflit le débat révèle-t-il ?",
        options: ["Entre logiques administratives et données scientifiques", "Entre élèves et enseignants", "Entre zones rurales et urbaines", "Entre parents et médecins"],
        correct: "A",
        explanation: "Les contraintes d'organisation s'opposent aux résultats scientifiques sur le sommeil.",
      },
    },
    {
      title: "Quand la machine imite le style",
      text: p(
        "Les modèles génératifs produisent aujourd'hui des textes et des images dont le style évoque celui d'artistes identifiables. Cette capacité pose une question nouvelle : l'imitation d'un style peut-elle être considérée comme un plagiat, alors qu'aucune œuvre précise n'est copiée ?",
        "Les juristes hésitent. Le droit d'auteur protège une création originale, non un style en tant que tel. Mais l'entraînement de ces modèles repose sur des œuvres existantes, souvent sans rémunération de leurs auteurs.",
        "Au-delà du droit, la question esthétique demeure. Une œuvre imitée par une machine peut séduire, mais elle ne porte pas l'intention, l'hésitation ni la responsabilité d'un créateur. La valeur ne réside pas seulement dans le résultat visible : elle tient aussi au processus qui lui donne sens.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la notion de plagiat est-elle difficile à appliquer ?",
        options: ["Le droit protège une œuvre originale, pas un style", "Les machines n'ont pas de personnalité juridique", "Les artistes refusent toute rémunération", "Les œuvres imitées sont trop anciennes"],
        correct: "A",
        explanation: "Le droit d'auteur protège une création précise, et non un style, ce qui rend l'imitation difficile à qualifier.",
      },
    },
    {
      title: "Piétons et commerces : le compromis",
      text: p(
        "La piétonnisation des centres-villes est souvent présentée comme une évidence écologique. Les études montrent pourtant des effets contrastés : si la pollution baisse et que les terrasses se développent, certains commerces de proximité craignent de perdre la clientèle motorisée.",
        "Les expériences réussies partagent plusieurs traits. Elles sont progressives, associent les habitants et maintiennent des solutions de livraison. Elles prévoient aussi des alternatives de stationnement en périphérie et des transports fréquents.",
        "Le débat oppose parfois deux conceptions de la ville. Pour les uns, l'espace public doit prioritairement accueillir les piétons et les activités de proximité. Pour les autres, il doit rester accessible à toutes les formes de déplacement.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle condition les expériences réussies partagent-elles ?",
        options: ["Une mise en œuvre progressive et concertée", "La suppression du stationnement", "L'interdiction des livraisons", "Une décision prise sans les habitants"],
        correct: "A",
        explanation: "Le texte insiste sur la progressivité, la concertation et le maintien de solutions de livraison.",
      },
    },
    {
      title: "Notes ou retours ?",
      text: p(
        "L'évaluation scolaire est souvent réduite à une note chiffrée, censée résumer le niveau d'un élève. Or une note isole un résultat sans dire ce qui doit être amélioré. Des enseignants expérimentent donc des retours détaillés, qui décrivent les réussites et les points à retravailler.",
        "Les résultats sont nuancés. Les retours améliorent l'apprentissage lorsqu'ils sont précis et suivis d'une occasion de recommencer. À l'inverse, une note peut renforcer la motivation de certains élèves, mais démoraliser ceux qui accumulent les échecs. L'effet dépend donc moins du format que de l'usage qui en est fait.",
        "La question est aussi institutionnelle. Les retours exigent du temps et une formation des enseignants. Choisir un mode d'évaluation n'est pas seulement une décision pédagogique, c'est un choix sur ce que l'école entend mesurer et valoriser.",
      ),
      question: {
        level: "C1",
        prompt: "De quoi dépend principalement l'effet d'une évaluation ?",
        options: ["De l'usage qui en est fait", "Du format chiffré ou littéral", "De la matière enseignée", "De l'âge des élèves"],
        correct: "A",
        explanation: "Le texte conclut que l'effet dépend moins du format que de la manière dont l'évaluation est utilisée.",
      },
    },
    {
      title: "Restituer, mais à qui ?",
      text: p(
        "La question de la restitution des œuvres acquises pendant la colonisation divise les musées européens. Certains objets ont été pillés, d'autres achetés dans des conditions douteuses, d'autres encore offerts par des élites locales. Cette diversité d'origines rend toute règle générale difficile à appliquer.",
        "Les partisans de la restitution insistent sur la dimension symbolique : reconnaître un tort et permettre aux sociétés concernées de retrouver leur patrimoine. Les conservateurs craignent la dispersion des collections, mais ces craintes ne peuvent repousser indéfiniment l'examen des demandes.",
        "Plusieurs pays ont adopté des procédures au cas par cas. La restitution apparaît alors moins comme une perte que comme une transformation du musée, invité à raconter une histoire plus complète de ses collections.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi une règle générale est-elle difficile à appliquer ?",
        options: ["Les origines des œuvres sont très diverses", "Les musées refusent tout dialogue", "Les pays concernés sont tous d'accord", "Les objets n'ont pas de valeur"],
        correct: "A",
        explanation: "Pillages, achats douteux et dons se mêlent, ce qui rend une règle uniforme inadaptée.",
      },
    },
    {
      title: "Les limites du recyclage",
      text: p(
        "Le recyclage est devenu le symbole des politiques environnementales. Il permet de réduire les déchets enfouis et de réintroduire des matières dans l'économie. Pourtant, tous les matériaux ne se recyclent pas indéfiniment : la qualité diminue à chaque cycle.",
        "Les spécialistes insistent donc sur la hiérarchie des solutions : éviter la production inutile, réemployer, réparer, puis recycler. Cette hiérarchie est souvent oubliée dans les campagnes de communication, qui valorisent le geste individuel sans interroger les volumes produits.",
        "L'économie circulaire ne se réduit pas au tri. Elle suppose des produits conçus pour durer, des filières de réparation accessibles et des modèles économiques qui ne dépendent pas de la vente de quantités croissantes. Sans ces conditions, le recyclage devient un alibi plutôt qu'une solution.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque le texte souligne-t-il à propos du recyclage ?",
        options: ["Servir d'alibi à une production croissante", "Réduire excessivement les déchets", "Remplacer la réparation", "Coûter trop cher aux ménages"],
        correct: "A",
        explanation: "Le recyclage peut masquer l'augmentation des volumes au lieu de la remettre en cause.",
      },
    },
    {
      title: "Vérité et confiance politique",
      text: p(
        "On attend des responsables politiques qu'ils disent la vérité. Cette exigence, simple en apparence, se heurte à la nature même de l'action publique. Un gouvernement doit parfois taire des informations pour ne pas inquiéter, préparer une décision ou protéger des négociations. Le mensonge et la réserve ne sont pourtant pas équivalents : le premier trompe, la seconde diffère.",
        "La confiance ne dépend pas seulement du contenu des déclarations. Elle repose sur la possibilité de vérifier, de contredire et de demander des comptes. Une institution qui reconnaît une erreur peut renforcer sa crédibilité ; une institution qui nie l'évidence la détruit.",
        "Les citoyens, de leur côté, ne sont pas des juges neutres. Cette asymétrie complique l'exigence de vérité, car elle transforme chaque déclaration en épreuve de loyauté. Une démocratie solide ne promet pas la transparence totale ; elle organise les conditions d'un débat informé.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle distinction l'auteur établit-il ?",
        options: ["Entre le mensonge et la réserve", "Entre la vérité et la transparence", "Entre citoyens et institutions", "Entre information et négociation"],
        correct: "A",
        explanation: "L'auteur oppose le mensonge, qui trompe, à la réserve, qui diffère une information.",
      },
    },
    {
      title: "Les mots qui orientent",
      text: p(
        "Le langage politique n'est pas seulement un moyen de transmettre des idées ; il constitue le cadre dans lequel ces idées sont reçues. Choisir de parler de « réforme » plutôt que de « suppression », de « flexibilité » plutôt que de « précarité », ce n'est pas décrire la même réalité avec des mots différents. C'est orienter l'interprétation avant même que l'argument soit exposé.",
        "Les euphémismes sont souvent dénoncés comme des hypocrisies. Leur danger apparaît lorsqu'ils deviennent systématiques : le réel finit par être décrit dans un vocabulaire qui rend certaines expériences invisibles.",
        "La responsabilité n'incombe pas seulement aux dirigeants. Les médias, en reprenant les catégories officielles, participent à leur diffusion. Les citoyens, en les employant, les naturalisent. Analyser le langage politique n'est donc pas un exercice de style : c'est une manière de rendre visible le pouvoir qui se cache dans les évidences.",
      ),
      question: {
        level: "C2",
        prompt: "Quand l'usage des euphémismes devient-il problématique ?",
        options: ["Lorsqu'il devient systématique", "Lorsqu'il permet un compromis", "Lorsqu'il est critiqué par les médias", "Lorsqu'il simplifie le débat"],
        correct: "A",
        explanation: "L'auteur tolère le compromis mais alerte sur un vocabulaire systématique qui rend le réel invisible.",
      },
    },
    {
      title: "La technique et l'autonomie",
      text: p(
        "Les outils techniques sont souvent présentés comme de simples moyens, neutres quant aux fins. Cette neutralité est trompeuse : un outil impose des gestes, des rythmes et des manières de penser. Un logiciel de gestion ne se contente pas d'accélérer le travail : il le découpe en tâches mesurables.",
        "Cette contrainte n'est pas nécessairement une aliénation. Les individus détournent les outils, les adaptent, inventent des usages non prévus. Mais leur marge de manœuvre dépend de leur position : celui qui conçoit le système et celui qui l'utilise ne disposent pas du même pouvoir. L'autonomie n'est donc pas une propriété individuelle, elle se distribue socialement.",
        "La question politique est de savoir qui décide des contraintes. Une technique peut élargir les capacités collectives ou renforcer la dépendance, selon les choix qui président à sa conception. La critiquer ne signifie pas la refuser : cela signifie refuser qu'elle soit présentée comme une évidence sans débat.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle thèse l'auteur défend-il sur l'autonomie ?",
        options: ["Elle se distribue socialement selon les positions", "Elle est identique pour tous les utilisateurs", "Elle dépend uniquement de la volonté individuelle", "Elle disparaît avec les outils techniques"],
        correct: "A",
        explanation: "L'auteur affirme que la marge de manœuvre dépend de la position sociale, non d'une capacité purement individuelle.",
      },
    },
    {
      title: "L'art sous la contrainte du marché",
      text: p(
        "L'entrée de l'art dans le marché n'est pas nouvelle, mais elle s'intensifie. Les œuvres circulent comme des actifs, les artistes sont évalués à leur capacité à attirer un public, et les institutions culturelles doivent justifier leurs financements par des indicateurs de fréquentation. Cette logique produit des effets ambivalents.",
        "D'un côté, le marché élargit l'accès : il finance des productions, diffuse des œuvres et professionnalise des secteurs entiers. De l'autre, il tend à privilégier ce qui se vend et se mesure. Les propositions exigeantes, lentes ou minoritaires trouvent plus difficilement leur place. Le risque n'est pas la disparition de l'art, mais sa réduction à une offre.",
        "Les artistes négocient avec cette contrainte. Le débat sur la valeur artistique ne peut donc être séparé du débat sur les conditions de production. Dire qu'une œuvre est libre sans interroger son financement revient à confondre l'idéal et le contexte.",
      ),
      question: {
        level: "C2",
        prompt: "Quel risque principal l'auteur identifie-t-il ?",
        options: ["La réduction de l'art à une offre", "La disparition totale de l'art", "L'interdiction des financements privés", "La baisse de la fréquentation"],
        correct: "A",
        explanation: "Le risque n'est pas la disparition de l'art, mais sa réduction à ce qui se vend et se mesure.",
      },
    },
    {
      title: "L'accélération et ses remèdes",
      text: p(
        "Nos sociétés valorisent la vitesse : répondre vite, produire vite, se déplacer vite. Cette accélération ne se limite pas aux transports ou aux communications ; elle transforme notre rapport au temps, en rendant l'attente insupportable et le repos suspect. Le ralentissement devient alors un privilège, réservé à ceux qui peuvent s'offrir des pauses.",
        "Les remèdes individuels, comme la méditation ou les journées sans écran, ont leur utilité. Mais ils laissent intactes les causes collectives : des horaires qui se chevauchent, des institutions qui exigent une disponibilité permanente, une économie qui mesure la valeur au débit. En ce sens, ralentir n'est pas seulement une décision personnelle, c'est une question politique.",
        "L'enjeu n'est pas de revenir à un passé idéalisé, ni de condamner toute accélération. La question pertinente est de savoir quelles accélérations nous choisissons et quelles lenteurs nous voulons préserver.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi les remèdes individuels sont-ils insuffisants ?",
        options: ["Ils laissent intactes les causes collectives", "Ils sont trop coûteux", "Ils ralentissent l'économie", "Ils ignorent les bienfaits de la vitesse"],
        correct: "A",
        explanation: "Les causes de l'accélération sont collectives et ne disparaissent pas par des décisions personnelles.",
      },
    },
  ],
});
