import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 5.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_05 = defineFullTest({
  number: 5,
  description:
    "Cinquième examen blanc complet : trois épreuves enchaînées, du niveau A1 au niveau C2, dans les conditions du TCF Tout public.",
  listening: [
    {
      level: "A1",
      category: "culture",
      transcription:
        "La bibliothèque municipale est fermée ce lundi pour une journée pédagogique. Elle rouvrira mardi à dix heures. Les livres peuvent être rendus dans la boîte extérieure.",
      prompt: "Quel jour la bibliothèque rouvre-t-elle ?",
      options: ["Mardi", "Lundi", "Mercredi", "Jeudi"],
      correct: "A",
      explanation: "La bibliothèque fermée lundi rouvre le mardi à dix heures.",
    },
    {
      level: "A1",
      category: "santé",
      transcription:
        "La pharmacie de garde se trouve rue des Lilas, à côté de la boulangerie. Elle est ouverte jusqu'à minuit. Pensez à appeler avant de vous déplacer.",
      prompt: "Où se trouve la pharmacie de garde ?",
      options: ["Rue des Lilas", "Rue de la Gare", "Place du Marché", "Avenue des Écoles"],
      correct: "A",
      explanation: "L'annonce situe la pharmacie de garde rue des Lilas, près de la boulangerie.",
    },
    {
      level: "A1",
      category: "services",
      transcription:
        "Bonjour, votre vélo sera prêt vendredi en fin de matinée. Il reste vingt euros à payer. Merci de venir avec votre ticket de réparation.",
      prompt: "Quand le vélo sera-t-il prêt ?",
      options: ["Vendredi en fin de matinée", "Jeudi après-midi", "Samedi matin", "Lundi midi"],
      correct: "A",
      explanation: "Le réparateur annonce que le vélo sera prêt vendredi en fin de matinée.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Le car scolaire passera désormais à sept heures quarante-cinq au lieu de sept heures trente. Il s'arrêtera devant la mairie, puis devant le collège.",
      prompt: "À quelle heure passe désormais le car ?",
      options: ["À sept heures quarante-cinq", "À sept heures trente", "À huit heures", "À sept heures quinze"],
      correct: "A",
      explanation: "Le nouvel horaire du car scolaire est fixé à sept heures quarante-cinq.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Le médecin vous a prescrit un traitement pour cinq jours. Vous pouvez retirer les médicaments à la pharmacie du centre commercial, qui ouvre à neuf heures.",
      prompt: "Où retirer les médicaments ?",
      options: ["À la pharmacie du centre commercial", "Au cabinet du médecin", "À l'hôpital", "À la mairie"],
      correct: "A",
      explanation: "L'ordonnance est à retirer à la pharmacie du centre commercial, ouverte dès neuf heures.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Les places pour le spectacle de samedi sont disponibles sur le site de la salle ou à l'accueil. Elles coûtent douze euros et sont gratuites pour les moins de douze ans.",
      prompt: "Comment réserver les places ?",
      options: ["Sur le site de la salle ou à l'accueil", "Uniquement par téléphone", "Chez un revendeur", "Au guichet de la gare"],
      correct: "A",
      explanation: "Les billets sont en vente sur le site de la salle ou directement à l'accueil.",
    },
    {
      level: "A2",
      category: "vie quotidienne",
      transcription:
        "Votre colis est arrivé à la maison de quartier. Il est disponible jusqu'à vendredi, de quatorze heures à dix-huit heures. Munissez-vous d'une pièce d'identité.",
      prompt: "Que doit faire le client pour récupérer son colis ?",
      options: ["Présenter une pièce d'identité", "Payer des frais", "Appeler le livreur", "Venir le matin"],
      correct: "A",
      explanation: "Le retrait du colis exige une pièce d'identité, à la maison de quartier.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "La formation sur la sécurité est reportée à la semaine prochaine, car l'intervenant est souffrant. Les inscrits recevront un nouveau courriel avec la salle et l'horaire. Aucune nouvelle inscription n'est possible.",
      prompt: "Pourquoi la formation est-elle reportée ?",
      options: ["L'intervenant est souffrant", "La salle est occupée", "Les inscrits sont absents", "Le programme a changé"],
      correct: "A",
      explanation: "Le report est dû à l'absence de l'intervenant, souffrant cette semaine.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "La résidence met en place une carte d'accès pour le local à vélos. Elle sera distribuée par le gardien à partir de lundi. Sans cette carte, l'accès au local restera fermé la nuit.",
      prompt: "Que permet la nouvelle carte ?",
      options: ["Accéder au local à vélos la nuit", "Ouvrir le portail du parking", "Réserver la salle commune", "Utiliser l'ascenseur"],
      correct: "A",
      explanation: "La carte d'accès autorise l'ouverture du local à vélos, y compris la nuit.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "L'exposition sur les oiseaux est prolongée jusqu'au trente novembre en raison de son succès. Les visites guidées du samedi sont complètes, mais une nouvelle séance a été ajoutée le dimanche à onze heures.",
      prompt: "Pourquoi l'exposition est-elle prolongée ?",
      options: ["Elle rencontre un grand succès", "Elle a été mal organisée", "Les visites sont annulées", "Le musée ferme"],
      correct: "A",
      explanation: "Le succès de l'exposition justifie sa prolongation jusqu'au trente novembre.",
    },
    {
      level: "B1",
      category: "sport",
      transcription:
        "Le club de handball recherche des bénévoles pour tenir la buvette lors des matchs. Aucune expérience n'est nécessaire. Les personnes intéressées peuvent laisser leurs coordonnées à l'accueil du gymnase.",
      prompt: "Quelle aide le club demande-t-il ?",
      options: ["Tenir la buvette", "Entraîner les jeunes", "Arbitrer les matchs", "Réparer le gymnase"],
      correct: "A",
      explanation: "Le club cherche des bénévoles pour la buvette, sans expérience préalable.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La mairie propose des composteurs individuels aux habitants qui disposent d'un jardin. Il faut s'inscrire en ligne et suivre une courte formation. Le matériel est remis gratuitement à la fin de la formation.",
      prompt: "Que doivent faire les habitants intéressés ?",
      options: ["S'inscrire et suivre une formation", "Payer le composteur", "Aller à la déchèterie", "Attendre le passage d'un agent"],
      correct: "A",
      explanation: "L'obtention du composteur suppose une inscription et une formation préalable.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Notre équipe cherche un assistant polyvalent. Nous recherchons surtout une personne capable de s'adapter à des tâches variées et de communiquer clairement avec les clients. La maîtrise de l'anglais serait un atout, mais n'est pas exigée.",
      prompt: "Quelle qualité est particulièrement recherchée ?",
      options: ["La capacité d'adaptation", "La maîtrise de l'anglais", "L'expérience de vente", "La disponibilité nocturne"],
      correct: "A",
      explanation: "L'annonce insiste sur l'adaptation à des tâches variées et la communication avec les clients.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "La plateforme de covoiturage propose désormais un forfait mensuel pour les conducteurs. Ils bénéficient d'une place de parking gratuite à l'entrée de l'autoroute. Le dispositif vise à inciter les trajets partagés aux heures de pointe.",
      prompt: "Quel avantage est proposé aux conducteurs ?",
      options: ["Une place de parking gratuite", "Une réduction de carburant", "Un abonnement de train", "Une prime annuelle"],
      correct: "A",
      explanation: "Le forfait mensuel comprend une place de parking gratuite à l'entrée de l'autoroute.",
    },
    {
      level: "B2",
      category: "vie quotidienne",
      transcription:
        "La collecte des encombrants aura lieu le premier mardi du mois. Les habitants doivent prendre rendez-vous par téléphone au moins quarante-huit heures à l'avance. Les déchets doivent être sortis la veille au soir et ne pas gêner la circulation.",
      prompt: "Comment prendre rendez-vous pour les encombrants ?",
      options: ["Par téléphone, quarante-huit heures à l'avance", "En déposant un courrier", "Sur place, le jour même", "Par courriel, une semaine avant"],
      correct: "A",
      explanation: "Le rendez-vous se prend par téléphone au moins quarante-huit heures avant la collecte.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "La bibliothèque universitaire expérimente le prêt d'ordinateurs portables. Les étudiants peuvent les emprunter pour quatre heures, sur présentation de leur carte. Le matériel doit être restitué avant la fermeture, sous peine de suspension du prêt.",
      prompt: "Quelle nouveauté est annoncée ?",
      options: ["Le prêt d'ordinateurs portables", "L'ouverture le dimanche", "La suppression des amendes", "La vente de livres"],
      correct: "A",
      explanation: "La bibliothèque met en place le prêt d'ordinateurs pour quatre heures.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "La maison de garde reçoit les patients le week-end lorsqu'aucun cabinet n'est ouvert. Elle ne traite pas les urgences graves, qui relèvent de l'hôpital. Il est conseillé d'appeler avant de s'y rendre pour limiter l'attente.",
      prompt: "Quand faut-il s'adresser à la maison de garde ?",
      options: ["Le week-end, hors urgences graves", "Tous les jours, à toute heure", "Uniquement sur rendez-vous", "En cas d'urgence vitale"],
      correct: "A",
      explanation: "La maison de garde reçoit le week-end pour les soins non vitaux, les urgences graves relevant de l'hôpital.",
    },
    {
      level: "B2",
      category: "commerce",
      transcription:
        "Les commerçants du centre-ville s'inquiètent du chantier de rénovation des trottoirs. Ils craignent une baisse de fréquentation pendant les travaux, même si la ville promet des accès maintenus. Une réunion avec la mairie est prévue la semaine prochaine.",
      prompt: "Pourquoi les commerçants sont-ils inquiets ?",
      options: ["Ils redoutent une baisse de fréquentation", "Ils doivent fermer définitivement", "La mairie refuse de les recevoir", "Les travaux sont terminés"],
      correct: "A",
      explanation: "Les commerçants craignent de perdre des clients pendant la durée du chantier.",
    },
    {
      level: "C1",
      category: "médias",
      transcription:
        "Les podcasts ont renouvelé l'écoute de contenu long : on peut les entendre en marchant, en cuisinant ou dans les transports. Leur succès tient moins à la technologie qu'à cette souplesse d'usage. Mais l'abondance crée un nouveau problème : les auditeurs doivent désormais choisir parmi des milliers de séries, souvent sans repères de qualité.",
      prompt: "Quel avantage des podcasts le texte souligne-t-il ?",
      options: ["La possibilité d'écouter en faisant autre chose", "La qualité garantie des contenus", "La brièveté des épisodes", "L'absence de publicité"],
      correct: "A",
      explanation: "Le succès vient de la souplesse d'usage : écouter tout en vaquant à d'autres activités.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Les jardins partagés ne se contentent pas d'embellir les quartiers. Ils abritent une diversité d'insectes et de plantes souvent supérieure à celle des espaces verts entretenus. Cette richesse s'explique par la variété des cultures et par la présence de zones laissées libres. Les chercheurs y voient un réservoir écologique, à condition que les pratiques restent diversifiées.",
      prompt: "Quel effet des jardins partagés est mis en évidence ?",
      options: ["Ils favorisent la biodiversité grâce à des pratiques variées", "Ils remplacent tous les espaces verts", "Ils réduisent le nombre d'insectes", "Ils suppriment les cultures"],
      correct: "A",
      explanation: "La diversité des cultures et les zones libres créent un réservoir écologique.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "Le marché de l'occasion connaît une croissance remarquable. Il prolonge la vie des objets et réduit la production de déchets. Pourtant, son développement peut aussi stimuler la consommation de neuf : certains acheteurs revendent un produit pour en acquérir un autre, plus récent. La sobriété espérée n'est donc pas automatique ; elle dépend de la manière dont les plateformes organisent les échanges.",
      prompt: "Quel paradoxe le texte décrit-il ?",
      options: ["L'occasion peut stimuler la consommation de neuf", "L'occasion réduit toujours les déchets", "Les plateformes refusent les échanges", "Les objets durent plus longtemps"],
      correct: "A",
      explanation: "Le texte montre que la revente peut encourager l'achat de produits neufs, limitant l'effet de sobriété.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Les réformes des rythmes scolaires sont souvent jugées sur leur coût ou leur simplicité, plus que sur leurs effets réels. Les évaluations montrent des résultats variables selon les territoires, les équipes et les moyens disponibles. Un même dispositif peut améliorer le bien-être des élèves ici et créer de nouvelles contraintes ailleurs. La question n'est donc pas de savoir si la réforme est bonne en soi, mais à quelles conditions elle fonctionne.",
      prompt: "Quelle critique est adressée aux réformes ?",
      options: ["Elles sont jugées sans tenir compte des conditions locales", "Elles coûtent toujours trop cher", "Elles sont refusées par les enseignants", "Elles suppriment les activités"],
      correct: "A",
      explanation: "Le texte reproche une évaluation abstraite, qui ignore les conditions et les moyens locaux.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "L'humour n'est pas seulement un divertissement. Il rend visible l'écart entre ce qui est et ce qui prétend être, entre l'apparence et la réalité. En riant d'une institution, on ne la détruit pas, mais on rappelle qu'elle n'est pas naturelle et qu'elle pourrait être autrement. Cette fonction critique suppose toutefois une condition : le rire doit viser le pouvoir, non les plus faibles.",
      prompt: "Quelle fonction de l'humour l'auteur défend-il ?",
      options: ["Révéler l'écart entre l'apparence et la réalité", "Détruire toute institution", "Divertir sans portée critique", "Protéger les plus faibles du rire"],
      correct: "A",
      explanation: "L'humour critique montre que les institutions sont construites et peuvent être changées.",
    },
    {
      level: "C2",
      category: "politique",
      transcription:
        "La souveraineté est souvent invoquée comme une évidence : un peuple devrait décider seul de son destin. Mais les décisions économiques, climatiques et sanitaires dépassent largement les frontières. Revendiquer la souveraineté peut alors signifier deux choses opposées : reprendre la main sur des contraintes extérieures, ou refuser toute coopération. L'ambiguïté du mot permet de rassembler des projets politiques incompatibles.",
      prompt: "Quelle ambiguïté le texte relève-t-il ?",
      options: ["La souveraineté peut désigner l'autonomie ou le refus de coopérer", "La souveraineté est toujours impossible", "Les peuples refusent de décider", "Les frontières n'existent plus"],
      correct: "A",
      explanation: "Le texte distingue la reconquête d'autonomie et le repli, deux sens opposés du même mot.",
    },
    {
      level: "C2",
      category: "littérature",
      transcription:
        "La lecture à voix haute paraît archaïque à l'époque du texte numérique. Elle ralentit, oblige à respirer, à marquer les pauses et à entendre la langue. Ce ralentissement n'est pas un défaut : il révèle la dimension physique de l'écrit, souvent effacée par la lecture silencieuse. Lire à voix haute, c'est rendre au texte sa durée et à l'auditeur le temps de comprendre.",
      prompt: "Pourquoi la lecture à voix haute reste-t-elle nécessaire ?",
      options: ["Elle rend au texte sa durée et à l'auditeur le temps de comprendre", "Elle va plus vite que la lecture silencieuse", "Elle supprime le sens du texte", "Elle remplace l'écriture"],
      correct: "A",
      explanation: "La lenteur de la lecture à voix haute restitue la dimension physique et temporelle du texte.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Vous ___ souvent à la piscine le dimanche.",
      options: ["allez", "allons", "vont", "va"],
      correct: "A",
      explanation: "Le sujet « vous » impose la deuxième personne du pluriel : « vous allez ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Elle boit ___ eau après chaque entraînement.",
      options: ["de l'", "du", "des", "le"],
      correct: "A",
      explanation: "Devant un nom féminin commençant par une voyelle, le partitif devient « de l' ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Ils ___ au restaurant quand nous les avons vus.",
      options: ["sortaient", "sortent", "sont sortis", "sortiront"],
      correct: "A",
      explanation: "L'imparfait décrit l'action en cours au moment où nous les avons vus.",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Ce livre, je ___ ai déjà lu deux fois.",
      options: ["l'", "le", "lui", "en"],
      correct: "A",
      explanation: "Le pronom COD « l' » remplace « ce livre » devant le verbe « ai lu ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Ils ont décidé ___ déménager au printemps.",
      options: ["de", "à", "pour", "en"],
      correct: "A",
      explanation: "Le verbe « décider » se construit avec « de » devant un infinitif.",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce gâteau est ___ sucré que l'autre : je préfère le premier.",
      options: ["moins", "aussi", "plus", "très"],
      correct: "A",
      explanation: "Le locuteur préfère le premier gâteau, donc celui-ci est « moins sucré ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "La maison ___ nous avons achetée a besoin de travaux.",
      options: ["que", "dont", "qui", "où"],
      correct: "A",
      explanation: "Le verbe « acheter » est transitif direct : « la maison que nous avons achetée ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Dès que vous ___ le formulaire, vous recevrez une confirmation.",
      options: ["aurez rempli", "remplirez", "remplissiez", "avez rempli"],
      correct: "A",
      explanation: "Après « dès que », l'action antérieure à un futur se met au futur antérieur.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Je souhaite qu'il ___ à la réunion de demain.",
      options: ["vienne", "vient", "viendra", "venait"],
      correct: "A",
      explanation: "Le verbe « souhaiter que » exige le subjonctif présent : « qu'il vienne ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Elle a réussi son examen ___ sa fatigue.",
      options: ["malgré", "grâce à", "à cause de", "afin de"],
      correct: "A",
      explanation: "« Malgré » introduit un obstacle surmonté : « malgré sa fatigue ».",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Ce roman ___ dans plus de vingt langues.",
      options: ["a été traduit", "a traduit", "est traduire", "traduira"],
      correct: "A",
      explanation: "Le sujet « ce roman » subit l'action : la voix passive s'impose, « a été traduit ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ les escaliers, elle a glissé.",
      options: ["En montant", "Monter", "Montée", "Ayant monté"],
      correct: "A",
      explanation: "Le gérondif exprime la simultanéité de la chute et de la montée : « en montant ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Le guide nous a dit que la visite ___ une heure.",
      options: ["durait", "dure", "durera", "a duré"],
      correct: "A",
      explanation: "Au discours indirect au passé, le présent devient imparfait : « durait ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "Le collègue ___ je partage le bureau est très ponctuel.",
      options: ["avec qui", "que", "dont", "où"],
      correct: "A",
      explanation: "Le verbe « partager avec » appelle « avec qui » : « le collègue avec qui je partage ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "Non seulement il est venu, ___ il a aussi apporté un cadeau.",
      options: ["mais", "et", "donc", "or"],
      correct: "A",
      explanation: "La corrélation « non seulement… mais » structure l'opposition et l'ajout.",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ de ce quartier a transformé les conditions de vie.",
      options: ["réhabilitation", "réhabiliter", "réhabilité", "réhabilitant"],
      correct: "A",
      explanation: "Le nom correspondant au verbe « réhabiliter » est « la réhabilitation ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "S'il avait pris le train, il ___ à l'heure.",
      options: ["serait arrivé", "arrivait", "arrivera", "était arrivé"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé appelle le conditionnel passé : « serait arrivé ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Ce rapport est ___ : il faudra le reprendre entièrement.",
      options: ["lacunaire", "laconique", "limpide", "louable"],
      correct: "A",
      explanation: "« Lacunaire » signifie incomplet, ce qui justifie une reprise du rapport.",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "Je ne pensais pas qu'il ___ si tôt.",
      options: ["fût parti", "soit parti", "serait parti", "est parti"],
      correct: "A",
      explanation: "Après un verbe au passé, le subjonctif plus-que-parfait marque l'antériorité : « qu'il fût parti ».",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "___ toutes les précautions, l'opération reste risquée.",
      options: ["Moyennant", "Nonobstant", "Sauf", "Hormis"],
      correct: "A",
      explanation: "« Nonobstant » signifie « malgré » et convient ici : « nonobstant toutes les précautions ».",
    },
  ],
  reading: [
    {
      title: "Fête des voisins",
      text: p(
        "La fête des voisins aura lieu samedi à partir de dix-huit heures dans la cour de l'immeuble. Chacun peut apporter un plat à partager. Les organisateurs demandent de prévenir avant jeudi pour installer les tables en nombre suffisant.",
      ),
      question: {
        level: "B1",
        prompt: "Que doivent faire les participants avant jeudi ?",
        options: ["Prévenir de leur venue", "Apporter des tables", "Payer une participation", "Réserver la cour"],
        correct: "A",
        explanation: "Il faut prévenir avant jeudi afin de prévoir le nombre de tables nécessaire.",
      },
    },
    {
      title: "Ouverture du city-stade",
      text: p(
        "Le nouveau city-stade est ouvert tous les jours de neuf heures à vingt heures. Il est réservé aux jeunes de moins de dix-huit ans entre quatorze et dix-sept heures. En dehors de ces horaires, il est accessible à tous, dans la limite des places disponibles.",
      ),
      question: {
        level: "B1",
        prompt: "À qui le city-stade est-il réservé l'après-midi ?",
        options: ["Aux jeunes de moins de dix-huit ans", "Aux habitants du quartier", "Aux élèves des écoles", "Aux associations sportives"],
        correct: "A",
        explanation: "Entre quatorze et dix-sept heures, le city-stade est réservé aux moins de dix-huit ans.",
      },
    },
    {
      title: "Atelier cuisine",
      text: p(
        "La maison de quartier propose un atelier cuisine le mercredi de quatorze heures à seize heures. Les ingrédients sont fournis. L'atelier est gratuit, mais il faut s'inscrire à l'accueil car il accueille seulement douze personnes.",
      ),
      question: {
        level: "B1",
        prompt: "Pourquoi faut-il s'inscrire ?",
        options: ["Le nombre de places est limité", "L'atelier est payant", "Les ingrédients manquent", "L'accueil ferme tôt"],
        correct: "A",
        explanation: "L'inscription est obligatoire car l'atelier ne peut accueillir que douze personnes.",
      },
    },
    {
      title: "Cours de français pour adultes",
      text: p(
        "Des cours de français pour adultes débutants sont proposés le mardi et le jeudi de dix-huit heures à vingt heures. Ils sont gratuits pour les habitants de la commune. Un test de niveau est organisé la première semaine de septembre.",
      ),
      question: {
        level: "B1",
        prompt: "Que se passe-t-il la première semaine de septembre ?",
        options: ["Un test de niveau", "La remise des diplômes", "Une réunion d'information", "La fin des cours"],
        correct: "A",
        explanation: "Le test de niveau permet de constituer les groupes au début de septembre.",
      },
    },
    {
      title: "Nouveau service de livraison",
      text: p(
        "La bibliothèque propose désormais un service de livraison à domicile pour les personnes qui ne peuvent pas se déplacer. Il faut choisir ses ouvrages en ligne ou par téléphone. La livraison a lieu le vendredi après-midi, une fois par mois.",
      ),
      question: {
        level: "B1",
        prompt: "Qui peut utiliser ce service ?",
        options: ["Les personnes qui ne peuvent pas se déplacer", "Tous les habitants", "Uniquement les étudiants", "Les enfants de moins de dix ans"],
        correct: "A",
        explanation: "Le service est destiné aux personnes empêchées de venir à la bibliothèque.",
      },
    },
    {
      title: "Le vélo cargo en ville",
      text: p(
        "Les vélos cargo se multiplient dans les rues. Ils transportent des enfants ou des courses et remplacent parfois une seconde voiture. Les associations cyclistes y voient un progrès, mais réclament des stationnements adaptés.",
        "Les commerçants sont partagés : certains y voient un moyen de livrer rapidement, d'autres craignent l'encombrement des trottoirs. Les villes expérimentent des places réservées pour éviter les conflits d'usage.",
      ),
      question: {
        level: "B2",
        prompt: "Que réclament les associations cyclistes ?",
        options: ["Des stationnements adaptés", "L'interdiction des voitures", "Des aides à l'achat", "Des pistes réservées aux piétons"],
        correct: "A",
        explanation: "Les associations demandent des espaces de stationnement adaptés aux vélos cargo.",
      },
    },
    {
      title: "Les tiers-lieux",
      text: p(
        "Les tiers-lieux, ni domiciles ni entreprises, proposent des espaces de travail partagés. Ils accueillent des indépendants, des associations et parfois des salariés en télétravail. Leur succès repose sur la flexibilité.",
        "Ces lieux ne sont pas de simples bureaux. Les animateurs organisent des rencontres et des ateliers qui favorisent les collaborations. Leur équilibre reste fragile : les charges augmentent plus vite que les cotisations.",
      ),
      question: {
        level: "B2",
        prompt: "Sur quoi repose le succès des tiers-lieux ?",
        options: ["La flexibilité et les rencontres", "La vente de matériel", "Les subventions publiques", "La fermeture des bureaux"],
        correct: "A",
        explanation: "Leur attractivité tient à la souplesse des usages et aux échanges organisés sur place.",
      },
    },
    {
      title: "La consigne des emballages",
      text: p(
        "Plusieurs enseignes testent la consigne des emballages en verre. Les clients paient une somme récupérée lorsqu'ils rapportent le contenant. Le dispositif réduit les déchets, mais suppose un réseau de collecte fiable.",
        "Les industriels doivent adapter lavage et remplissage. Les consommateurs, eux, doivent accepter de rapporter les emballages. La consigne fonctionne mieux dans les magasins de proximité que dans les grandes surfaces.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle condition est nécessaire au fonctionnement de la consigne ?",
        options: ["Un réseau de collecte fiable", "Une hausse des prix", "La suppression du verre", "Des magasins plus grands"],
        correct: "A",
        explanation: "Le dispositif exige une collecte fiable des contenants rapportés par les clients.",
      },
    },
    {
      title: "Les classes en plein air",
      text: p(
        "Des écoles organisent des classes en plein air dans un parc voisin. Les enseignants y voient un moyen de réduire l'agitation et d'ancrer les apprentissages dans le réel. Les résultats scolaires ne baissent pas.",
        "La pratique reste difficile à généraliser. Elle dépend de la météo, du transport et de l'accord des familles. Les équipes qui la maintiennent ont souvent des jardins ou des cours végétalisées, ce qui crée des inégalités.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi la pratique est-elle difficile à généraliser ?",
        options: ["Elle dépend des conditions matérielles et de l'environnement", "Les élèves refusent de sortir", "Les résultats baissent", "Les familles sont opposées"],
        correct: "A",
        explanation: "La météo, le transport et la présence d'espaces verts rendent la généralisation inégale.",
      },
    },
    {
      title: "Le financement des associations sportives",
      text: p(
        "Les associations sportives dépendent davantage des cotisations, car les subventions stagnent. Les petits clubs peinent à financer équipements et déplacements. Certains augmentent leurs tarifs, au risque d'exclure les familles modestes.",
        "Les fédérations encouragent les partenariats locaux et la mutualisation des équipements. Ces solutions ne suffisent pas partout. Les bénévoles, mobilisés pour l'encadrement, hésitent à chercher des financements.",
      ),
      question: {
        level: "B2",
        prompt: "Quel risque entraîne l'augmentation des tarifs ?",
        options: ["Exclure les familles modestes", "Réduire le nombre de bénévoles", "Fermer les équipements", "Supprimer les compétitions"],
        correct: "A",
        explanation: "La hausse des cotisations peut écarter les familles aux revenus limités.",
      },
    },
    {
      title: "La seconde main dans la mode",
      text: p(
        "La mode de seconde main séduit les jeunes générations, sensibles au coût et à l'écologie. Les plateformes facilitent la revente, mais prélèvent une commission et encouragent un renouvellement rapide.",
        "Les associations dénoncent une contradiction : acheter d'occasion peut nourrir la surconsommation. Pour elles, la mode durable suppose aussi de garder ses vêtements plus longtemps. Les marques développent des services de réparation et de reprise.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle contradiction les associations dénoncent-elles ?",
        options: ["La seconde main peut encourager la surconsommation", "Les jeunes refusent l'occasion", "Les vêtements coûtent trop cher", "Les marques interdisent la revente"],
        correct: "A",
        explanation: "Les associations estiment que la revente peut servir de prétexte à un renouvellement fréquent.",
      },
    },
    {
      title: "Les rendez-vous médicaux en ligne",
      text: p(
        "La prise de rendez-vous médicaux en ligne simplifie la vie des patients. Elle évite l'attente téléphonique et permet de choisir un créneau. Mais elle favorise ceux qui maîtrisent les outils numériques.",
        "Des créneaux sont réservés puis abandonnés. Pour limiter ces pertes, des plateformes envoient des rappels et facturent les annulations tardives. Les représentants de patients demandent un accès téléphonique pour ceux qui maîtrisent mal internet.",
      ),
      question: {
        level: "B2",
        prompt: "Quel problème les cabinets rencontrent-ils ?",
        options: ["Des rendez-vous réservés puis abandonnés", "Trop peu de demandes", "La fermeture des plateformes", "L'absence de créneaux"],
        correct: "A",
        explanation: "Les cabinets subissent des créneaux perdus lorsque les patients ne préviennent pas.",
      },
    },
    {
      title: "Le compostage collectif",
      text: p(
        "Des composteurs collectifs ont été installés dans des quartiers. Les habitants y déposent leurs déchets de cuisine, transformés en engrais pour les jardins partagés. Le dispositif réduit le volume des ordures ménagères.",
        "Son fonctionnement dépend de la participation et de la surveillance. Des erreurs de tri peuvent dégrader le compost. Les référents bénévoles expliquent les consignes et contrôlent régulièrement les bacs.",
      ),
      question: {
        level: "B2",
        prompt: "Quel rôle jouent les référents bénévoles ?",
        options: ["Expliquer les consignes et contrôler le compost", "Vendre le compost", "Collecter les ordures", "Construire les bacs"],
        correct: "A",
        explanation: "Les référents informent les habitants et vérifient la qualité du tri dans les bacs.",
      },
    },
    {
      title: "Les librairies indépendantes",
      text: p(
        "Les librairies indépendantes résistent. Elles misent sur le conseil, les rencontres et une sélection de qualité. Les lecteurs y trouvent ce que les algorithmes ignorent.",
        "Leur équilibre reste fragile : les charges augmentent et la trésorerie manque. Certaines se regroupent pour négocier avec les distributeurs ou partager un entrepôt. Les collectivités peuvent les soutenir par des commandes publiques, dans le respect de la concurrence.",
      ),
      question: {
        level: "B2",
        prompt: "Quel avantage les librairies indépendantes offrent-elles ?",
        options: ["Le conseil et une sélection de qualité", "Des prix toujours plus bas", "Une livraison immédiate", "Des livres numériques gratuits"],
        correct: "A",
        explanation: "Les librairies se distinguent par le conseil, les rencontres et une sélection exigeante.",
      },
    },
    {
      title: "Le télétravail et les centres-villes",
      text: p(
        "Le télétravail a modifié la fréquentation des centres-villes. Les salariés à distance déjeunent et achètent moins sur place. La restauration rapide recule, tandis que les cafés et les espaces de coworking attirent un autre public.",
        "Les municipalités cherchent des usages pour les bureaux vides. Certaines convertissent des locaux en logements ou espaces partagés. La transition est lente : elle dépend des propriétaires et des règles d'urbanisme.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle conséquence du télétravail est évoquée ?",
        options: ["La baisse de fréquentation de certains commerces", "La fermeture de tous les cafés", "La hausse des loyers de bureaux", "Le retour des salariés au centre-ville"],
        correct: "A",
        explanation: "Les salariés à distance fréquentent moins les commerces de proximité, notamment la restauration rapide.",
      },
    },
    {
      title: "La sobriété numérique",
      text: p(
        "Le numérique est souvent perçu comme immatériel. Il repose pourtant sur des infrastructures gourmandes en énergie et en matières premières : centres de données, réseaux, terminaux. La fabrication des appareils concentre une part importante de cet impact, avant même leur utilisation.",
        "Les solutions existent : allonger la durée de vie des équipements, réduire la taille des fichiers, limiter les renouvellements. Mais elles se heurtent à des modèles économiques fondés sur la nouveauté permanente.",
        "La sobriété numérique n'est pas qu'une affaire de gestes individuels. Elle dépend de choix collectifs : normes d'affichage, durée légale de mise à jour, soutien à la réparation. Sans ces cadres, on reproche aux utilisateurs des comportements que l'offre rend presque inévitables.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la sobriété numérique ne se réduit-elle pas aux gestes individuels ?",
        options: ["Elle dépend de choix collectifs et de normes", "Les individus n'ont aucun impact", "Les appareils ne consomment pas d'énergie", "Les entreprises refusent toute technologie"],
        correct: "A",
        explanation: "L'auteur insiste sur les normes et les choix collectifs qui rendent certains usages possibles.",
      },
    },
    {
      title: "L'apprentissage de l'esprit critique",
      text: p(
        "L'esprit critique est souvent présenté comme la capacité à douter de tout. Cette définition mène à une impasse : si tout est suspect, aucun jugement n'est possible. L'esprit critique consiste plutôt à distinguer les raisons de croire, à évaluer les sources et à reconnaître ce que l'on ne sait pas.",
        "Son apprentissage ne se limite pas à des cours de méthode. Il suppose des situations où les élèves doivent confronter des documents, défendre un point de vue et accepter la critique. Les enseignants jouent un rôle central, mais les familles et les médias participent aussi à la formation du jugement.",
        "Le risque est de confondre esprit critique et méfiance généralisée. Une société où chacun suspecte les institutions produit de la défiance, non de la lucidité. Apprendre à douter, c'est apprendre à examiner, et non à refuser par principe.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle définition de l'esprit critique l'auteur retient-il ?",
        options: ["La capacité à évaluer les sources et à distinguer les raisons de croire", "Le refus de toute information", "La confiance aveugle dans les institutions", "La méthode réservée aux spécialistes"],
        correct: "A",
        explanation: "L'auteur oppose l'examen raisonné des sources à la méfiance généralisée.",
      },
    },
    {
      title: "Les données personnelles",
      text: p(
        "Les services numériques collectent des données pour personnaliser leurs offres. Cette personnalisation peut être utile, mais elle crée une asymétrie : les utilisateurs ignorent souvent ce qui est enregistré et l'usage qui en est fait. Le consentement suppose une information réelle et un choix possible.",
        "Or les interfaces sont souvent conçues pour décourager le refus : réglages complexes, options par défaut peu protectrices, explications techniques. Une partie des utilisateurs abandonne par fatigue. Le consentement devient alors une formalité sans portée.",
        "Les régulations imposent des interfaces plus claires et des finalités précises. Leur efficacité dépend des contrôles et de la capacité des citoyens à faire valoir leurs droits. La protection des données est une question de conception et de pouvoir, pas seulement un problème individuel.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi le consentement est-il souvent une formalité sans portée ?",
        options: ["Les interfaces découragent le refus et l'information est complexe", "Les utilisateurs n'ont aucune donnée", "Les entreprises refusent de collecter", "La loi interdit le consentement"],
        correct: "A",
        explanation: "Le texte dénonce des réglages complexes et des options par défaut peu protectrices.",
      },
    },
    {
      title: "Le travail des aidants",
      text: p(
        "Les aidants accompagnent un proche malade ou dépendant, souvent en plus d'un emploi. Leur charge est rarement visible : rendez-vous, démarches administratives, présence de nuit. Cette invisibilité pèse sur leur santé et leur carrière, car les absences sont peu reconnues.",
        "Les dispositifs existent, mais restent mal connus et inégalement répartis. Les congés spécifiques sont courts, et les aidants hésitent à les demander par crainte des conséquences. Les entreprises en prennent conscience, sans toujours adapter l'organisation du travail.",
        "Reconnaître les aidants suppose donc de mesurer leur contribution et de rendre les droits accessibles. Cela implique des choix collectifs sur la dépendance, non une simple information individuelle. La question rejoint celle du soin : quelle valeur la société accorde-t-elle au temps consacré aux autres ?",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la charge des aidants est-elle peu visible ?",
        options: ["Les tâches accomplies sont rarement reconnues", "Ils refusent de parler de leur situation", "Ils n'ont pas d'emploi", "Les dispositifs sont trop généreux"],
        correct: "A",
        explanation: "Le texte souligne l'invisibilité des tâches et des absences liées à l'aide apportée.",
      },
    },
    {
      title: "L'aménagement du littoral",
      text: p(
        "Le littoral attire toujours plus d'habitants et de visiteurs. Cette pression entraîne une artificialisation des sols, qui aggrave l'érosion et réduit la protection naturelle contre les tempêtes. Les dunes et zones humides, longtemps jugées inutiles, jouent pourtant un rôle essentiel.",
        "Les politiques oscillent entre la construction de digues et le retrait des zones exposées. La première rassure à court terme, mais peut déplacer le problème. La seconde paraît durable, mais soulève des questions de justice : qui doit quitter son logement, et avec quels moyens ?",
        "Le débat n'est pas qu'un choix technique. Il engage une conception du territoire et du risque. Protéger le littoral suppose d'accepter que certaines zones ne soient pas constructibles, ce qui contrarie des intérêts immobiliers. La difficulté est politique autant qu'écologique.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle question de justice le retrait des zones exposées soulève-t-il ?",
        options: ["Qui doit quitter son logement et avec quels moyens", "Qui construira les digues", "Quel prix fixer pour les touristes", "Quelles espèces protéger"],
        correct: "A",
        explanation: "Le retrait pose la question de la répartition des coûts et de l'accompagnement des habitants.",
      },
    },
    {
      title: "Le courage civil",
      text: p(
        "Le courage est souvent associé aux situations extrêmes : guerre, catastrophe, sauvetage. Il existe pourtant un courage ordinaire, celui qui consiste à contredire une opinion dominante, à signaler une injustice ou à refuser une consigne abusive. Ce courage ne produit aucun récit héroïque, et c'est peut-être pourquoi il est si peu reconnu.",
        "Le courage civil suppose de mesurer un risque : perdre sa place, son statut ou l'estime de ses proches. Il n'est donc pas une vertu pure, détachée des conséquences. Il se construit dans des institutions qui protègent ceux qui parlent et qui organisent la possibilité du désaccord. Un salarié isolé n'a pas le même courage à déployer qu'un collectif soutenu.",
        "Reconnaître le courage civil ne revient pas à exiger l'héroïsme de chacun. Cela consiste à réduire le coût de la parole critique, pour que le désaccord ne soit pas un sacrifice personnel. Une société démocratique se juge aussi à la facilité avec laquelle on peut y contredire le pouvoir.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi l'auteur refuse-t-il de faire du courage civil un héroïsme individuel ?",
        options: ["Il dépend des protections offertes par les institutions", "Il est impossible dans une démocratie", "Il ne comporte aucun risque", "Il concerne uniquement les salariés"],
        correct: "A",
        explanation: "L'auteur souligne que le coût du désaccord dépend des institutions qui protègent la parole critique.",
      },
    },
    {
      title: "La justice et le hasard",
      text: p(
        "Une société juste doit-elle corriger les effets du hasard ? La question divise. Les uns estiment que chacun est responsable de ses choix, et que le hasard n'excuse rien. Les autres rappellent que les talents, la santé et le milieu familial sont distribués sans mérite, et qu'il serait arbitraire d'en tirer toutes les conséquences.",
        "Les deux positions comportent une part de vérité. Nier le hasard conduit à surestimer la responsabilité individuelle ; tout attribuer au hasard conduit à nier la capacité d'agir. La difficulté est de distinguer ce qui relève de la chance de ce qui relève du choix, sans prétendre que la frontière soit stable ou évidente.",
        "La justice ne consiste donc pas à rendre les destins identiques, mais à ne pas laisser les accidents de naissance déterminer entièrement les possibilités d'une vie. Elle exige des institutions qui compensent sans écraser la responsabilité. Cet équilibre est instable, et c'est précisément ce qui en fait un objet politique.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle conception de la justice l'auteur défend-il ?",
        options: ["Compenser les effets du hasard sans nier la responsabilité", "Rendre tous les destins identiques", "Attribuer toute réussite au mérite", "Nier toute responsabilité individuelle"],
        correct: "A",
        explanation: "L'auteur cherche un équilibre entre compensation des accidents et maintien de la responsabilité.",
      },
    },
    {
      title: "La promesse",
      text: p(
        "Une promesse engage celui qui la fait, mais elle suppose aussi un contexte : la confiance dans la parole donnée, la possibilité de tenir ce qui est annoncé, l'existence d'un tiers pour en témoigner. Une promesse isolée, sans institution ni mémoire, n'a guère de poids.",
        "Les sociétés modernes multiplient les contrats pour remplacer les promesses. Le contrat offre une garantie, mais il transforme la relation : ce qui était un lien devient une obligation juridique. On gagne en sécurité, on perd parfois en générosité, car la confiance n'a plus besoin d'être donnée pour être obtenue.",
        "La promesse garde pourtant une valeur que le contrat ne remplace pas. Elle crée une attente qui engage l'identité de celui qui parle. Tenir sa parole, ce n'est pas seulement exécuter une clause : c'est rester la même personne aux yeux des autres. La confiance repose sur cette continuité, plus fragile et plus humaine que la sanction.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle valeur de la promesse le contrat ne remplace-t-il pas ?",
        options: ["L'engagement de l'identité et la confiance dans la parole", "La garantie juridique", "La possibilité de sanctionner", "La sécurité des échanges"],
        correct: "A",
        explanation: "L'auteur oppose la confiance liée à la parole tenue à la seule garantie contractuelle.",
      },
    },
    {
      title: "La vitesse et la pensée",
      text: p(
        "La rapidité est devenue une norme : répondre vite, décider vite, produire vite. Cette exigence a des effets sur la pensée, qui a besoin de temps pour se tromper, revenir en arrière et reformuler. Un raisonnement immédiat n'est pas nécessairement faux, mais il est souvent prisonnier des évidences disponibles.",
        "Les institutions intellectuelles, écoles, revues, universités, ont longtemps organisé ce temps lent : relectures, discussions, vérifications. Leur affaiblissement au profit de la réaction immédiate modifie la nature des débats. Les arguments les plus rapides ne sont pas les plus solides, mais ils occupent l'espace avant que les autres n'aient pu se formuler.",
        "Ralentir n'est pas refuser le progrès. C'est reconnaître que certaines opérations, comme comprendre, juger ou transmettre, ne se compressent pas indéfiniment. La vitesse peut être un outil ; elle devient un problème lorsqu'elle impose son rythme à la réflexion. Préserver du temps, c'est préserver une condition de la pensée.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi la vitesse pose-t-elle un problème à la pensée ?",
        options: ["Certaines opérations intellectuelles exigent du temps", "Elle rend les arguments toujours faux", "Elle empêche toute discussion", "Elle supprime les institutions"],
        correct: "A",
        explanation: "L'auteur soutient que comprendre et juger ne peuvent être compressés indéfiniment.",
      },
    },
    {
      title: "L'échec comme expérience",
      text: p(
        "L'échec est souvent présenté comme une étape nécessaire de l'apprentissage. Cette formule consolante mérite d'être examinée : un échec n'apprend rien s'il n'est pas compris. Ce qui forme, ce n'est pas la chute elle-même, mais l'analyse des raisons et la possibilité de recommencer autrement.",
        "Les environnements qui valorisent l'échec sans offrir de retour d'expérience produisent de la résignation. À l'inverse, ceux qui sanctionnent toute erreur découragent l'initiative. L'enjeu est donc institutionnel : il faut des cadres où l'erreur est informative, et non humiliante, sans devenir indifférente.",
        "Reconnaître la valeur de l'échec ne signifie pas le célébrer. Cela signifie refuser deux extrêmes : le culte de la réussite qui cache les tâtonnements, et la complaisance qui excuse l'absence d'effort. L'échec n'est fécond que s'il est traversé, analysé et dépassé. Sinon, il n'est qu'une blessure de plus.",
      ),
      question: {
        level: "C2",
        prompt: "À quelle condition l'échec peut-il être formateur ?",
        options: ["S'il est analysé et suivi d'une nouvelle tentative", "S'il est célébré sans condition", "S'il est sanctionné sévèrement", "S'il est oublié rapidement"],
        correct: "A",
        explanation: "L'auteur affirme que l'échec n'instruit que s'il est compris et dépassé par un nouvel essai.",
      },
    },
  ],
});
