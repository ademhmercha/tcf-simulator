import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 12.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_12 = defineFullTest({
  number: 12,
  description:
    "Douzième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, la bibliothèque est ouverte du mardi au samedi, de dix heures à dix-huit heures. Elle est fermée le dimanche et le lundi.",
      prompt: "Quel jour la bibliothèque est-elle ouverte ?",
      options: ["Le samedi", "Le dimanche", "Le lundi", "Aucun jour"],
      correct: "A",
      explanation: "La bibliothèque est ouverte du mardi au samedi ; elle ferme le dimanche et le lundi.",
    },
    {
      level: "A1",
      category: "météo",
      transcription:
        "Demain, il fera beau dans le sud de la France avec vingt-cinq degrés. Dans le nord, le ciel sera nuageux et il pleuvra en fin de journée.",
      prompt: "Quel temps fera-t-il demain dans le sud ?",
      options: ["Il fera beau", "Il pleuvra", "Il neigera", "Il y aura du vent"],
      correct: "A",
      explanation: "La météo annonce du beau temps et vingt-cinq degrés dans le sud ; la pluie concerne le nord.",
    },
    {
      level: "A1",
      category: "famille",
      transcription:
        "Je m'appelle Nadia. J'ai deux frères et une sœur. Mon père est cuisinier et ma mère travaille à l'hôpital.",
      prompt: "Quel est le métier du père de Nadia ?",
      options: ["Cuisinier", "Médecin", "Professeur", "Infirmier"],
      correct: "A",
      explanation: "Nadia dit que son père est cuisinier ; sa mère travaille à l'hôpital.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Notre club de randonnée organise une sortie dimanche. Rendez-vous à huit heures devant la gare. Prévoyez de bonnes chaussures et un pique-nique pour le midi.",
      prompt: "Que doivent prévoir les participants pour le midi ?",
      options: ["Un pique-nique", "De l'argent pour le restaurant", "Un sac de couchage", "Une carte de la région"],
      correct: "A",
      explanation: "Le message demande de prévoir un pique-nique, en plus de bonnes chaussures.",
    },
    {
      level: "A2",
      category: "travail",
      transcription:
        "Bonjour, c'est le secrétariat. La réunion de demain est avancée à neuf heures au lieu de dix heures. Elle aura lieu en salle trois.",
      prompt: "Que change-t-il pour la réunion de demain ?",
      options: ["L'heure", "Le jour", "Le sujet", "Les participants"],
      correct: "A",
      explanation: "La réunion est avancée à neuf heures au lieu de dix heures ; le lieu est la salle trois.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Le loyer de l'appartement est de six cent cinquante euros par mois, charges comprises. Il y a deux chambres, un balcon et une cave.",
      prompt: "Qu'est-ce qui est inclus dans le loyer ?",
      options: ["Les charges", "L'électricité uniquement", "Le parking", "Le mobilier"],
      correct: "A",
      explanation: "Le loyer de six cent cinquante euros est annoncé charges comprises.",
    },
    {
      level: "A2",
      category: "voyages",
      transcription:
        "Votre vol pour Marseille a une heure de retard. Il décollera à quatorze heures quinze. Nous vous prions de nous excuser pour ce désagrément.",
      prompt: "À quelle heure l'avion décollera-t-il ?",
      options: ["À quatorze heures quinze", "À quinze heures quinze", "À treize heures quinze", "À quatorze heures"],
      correct: "A",
      explanation: "Avec une heure de retard, le vol décollera à quatorze heures quinze.",
    },
    {
      level: "B1",
      category: "santé",
      transcription:
        "Le centre de vaccination sera ouvert sans rendez-vous tous les mercredis après-midi du mois d'octobre. Il suffit de présenter une pièce d'identité et son carnet de santé.",
      prompt: "Que faut-il apporter au centre de vaccination ?",
      options: ["Une pièce d'identité et le carnet de santé", "Une ordonnance", "Un certificat de travail", "Un justificatif de domicile"],
      correct: "A",
      explanation: "L'annonce demande une pièce d'identité et le carnet de santé, sans rendez-vous.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Les inscriptions à l'université se terminent le vingt-huit février. Après cette date, aucun dossier ne sera accepté. Pensez à joindre vos relevés de notes et une lettre de motivation.",
      prompt: "Que se passera-t-il après le vingt-huit février ?",
      options: ["Aucun dossier ne sera accepté", "Les inscriptions seront prolongées", "Les frais baisseront", "Les relevés ne seront plus demandés"],
      correct: "A",
      explanation: "L'université précise qu'après la date limite aucun dossier ne sera accepté.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Je suis désolée, je ne pourrai pas venir à ton anniversaire samedi. Ma mère est tombée malade et je dois aller la voir. On pourrait se retrouver la semaine prochaine pour fêter ça ?",
      prompt: "Pourquoi la personne ne peut-elle pas venir ?",
      options: ["Sa mère est malade", "Elle travaille ce jour-là", "Elle part en voyage", "Elle a oublié la date"],
      correct: "A",
      explanation: "Elle s'excuse car sa mère est tombée malade et elle doit lui rendre visite.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "Désormais, les bouteilles en plastique, les boîtes de conserve et les cartons se jettent dans le même bac jaune. Les emballages en verre, eux, restent à déposer dans les colonnes à verre de la rue.",
      prompt: "Où faut-il déposer les emballages en verre ?",
      options: ["Dans les colonnes à verre de la rue", "Dans le bac jaune", "Dans la poubelle ordinaire", "À la déchèterie uniquement"],
      correct: "A",
      explanation: "Seul le verre reste à déposer dans les colonnes de la rue ; les autres emballages vont dans le bac jaune.",
    },
    {
      level: "B1",
      category: "achats",
      transcription:
        "Vous avez acheté un lave-linge chez nous ? Il est garanti deux ans. Si une panne survient pendant cette période, appelez le service après-vente. La réparation sera gratuite, sauf en cas de mauvaise utilisation.",
      prompt: "Dans quel cas la réparation sera-t-elle payante ?",
      options: ["En cas de mauvaise utilisation", "Après six mois", "Si la panne est légère", "Si l'appareil est neuf"],
      correct: "A",
      explanation: "La garantie couvre les pannes pendant deux ans, sauf si l'appareil a été mal utilisé.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Face à la hausse des prix de l'énergie, plusieurs communes éteignent l'éclairage public la nuit. Si cette mesure permet d'économiser des milliers d'euros, certains habitants s'inquiètent pour leur sécurité, même si les statistiques ne montrent pas d'augmentation des cambriolages.",
      prompt: "Que montrent les statistiques évoquées ?",
      options: ["Pas d'augmentation des cambriolages", "Une hausse des accidents", "Une baisse des économies", "Une forte hausse de la délinquance"],
      correct: "A",
      explanation: "Malgré l'inquiétude des habitants, les statistiques ne révèlent pas davantage de cambriolages.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "La compagnie ferroviaire annonce la création d'un abonnement unique pour tous les trains régionaux. Les usagers saluent la simplicité du dispositif, mais regrettent qu'il ne couvre pas encore les bus et les tramways des grandes villes.",
      prompt: "Quel regret les usagers expriment-ils ?",
      options: ["Les bus et tramways ne sont pas inclus", "Le prix est trop élevé", "Les trains seront moins fréquents", "L'abonnement est compliqué"],
      correct: "A",
      explanation: "Les usagers apprécient la simplicité mais déplorent l'absence des bus et tramways dans l'abonnement.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "De plus en plus d'étudiants travaillent pendant leurs études pour financer leur logement. Une enquête révèle que ceux qui y consacrent plus de quinze heures par semaine ont deux fois plus de risques d'échouer à leurs examens.",
      prompt: "Que révèle l'enquête sur les étudiants salariés ?",
      options: ["Un fort travail augmente le risque d'échec", "Le travail améliore les notes", "Les étudiants réussissent mieux seuls", "Le logement coûte moins cher"],
      correct: "A",
      explanation: "Au-delà de quinze heures hebdomadaires, le risque d'échec aux examens double.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le musée de la ville rouvre après trois ans de rénovation. On y découvre une nouvelle présentation des collections, plus chronologique, et un espace numérique où les visiteurs peuvent consulter les archives de la cité.",
      prompt: "Qu'est-ce qui est nouveau dans le musée ?",
      options: ["Un espace numérique d'archives", "Un restaurant panoramique", "Une entrée gratuite", "Un parking souterrain"],
      correct: "A",
      explanation: "Outre une présentation plus chronologique, le musée propose un espace numérique pour consulter les archives.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les professionnels de santé alertent sur l'automédication. Prendre des antibiotiques sans avis médical, par exemple, favorise la résistance des bactéries et rend les traitements moins efficaces à long terme.",
      prompt: "Quel risque l'automédication aux antibiotiques entraîne-t-elle ?",
      options: ["La résistance des bactéries", "Une guérison plus rapide", "Une allergie systématique", "Une baisse des prix"],
      correct: "A",
      explanation: "L'usage d'antibiotiques sans avis médical rend les bactéries résistantes et les traitements moins efficaces.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "Les associations de quartier peinent à renouveler leurs bénévoles. Leurs responsables expliquent que les jeunes s'engagent volontiers, mais pour des missions ponctuelles, plutôt que dans des fonctions durables qui demandent un investissement régulier.",
      prompt: "Comment les jeunes s'engagent-ils selon les responsables ?",
      options: ["Pour des missions ponctuelles", "Pour des postes à responsabilité", "De manière régulière", "Ils ne s'engagent pas du tout"],
      correct: "A",
      explanation: "Les jeunes préfèrent des missions ponctuelles aux engagements durables.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "La réforme, présentée comme une simplification administrative, a en réalité multiplié les procédures. Les élus locaux dénoncent un transfert de charges non compensé par l'État, qui contraint les communes à réduire leurs services publics ou à relever les impôts.",
      prompt: "Que reprochent les élus locaux à la réforme ?",
      options: ["Un transfert de charges non compensé", "Une baisse des impôts locaux", "La suppression des communes", "Un excès de simplification"],
      correct: "A",
      explanation: "Les élus dénoncent un transfert de charges non compensé par l'État qui pèse sur les budgets communaux.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "On nous promet que la compensation carbone effacera nos émissions, mais les spécialistes restent sceptiques. Planter des arbres demande des décennies pour stocker le carbone émis en quelques heures de vol, et rien ne garantit la pérennité de ces forêts.",
      prompt: "Pourquoi les spécialistes doutent-ils de la compensation carbone ?",
      options: ["Les arbres mettent des décennies à compenser, sans garantie de durée", "Les arbres sont trop chers", "Les avions polluent moins qu'avant", "Les forêts brûlent toujours"],
      correct: "A",
      explanation: "Le décalage temporel entre l'émission et le stockage, ainsi que l'incertitude sur la durée des forêts, alimentent le scepticisme.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "L'intelligence artificielle générative bouleverse la recherche documentaire. Si elle accélère la synthèse d'informations, elle comporte un risque majeur : celui de produire des affirmations plausibles mais inexactes, que l'utilisateur, faute de recul, tendra à accepter sans les vérifier.",
      prompt: "Quel danger principal est mentionné ?",
      options: ["Des affirmations plausibles mais inexactes acceptées sans vérification", "Une lenteur excessive de la recherche", "La disparition des bibliothèques", "Un coût trop élevé pour les chercheurs"],
      correct: "A",
      explanation: "Le risque tient à des informations vraisemblables mais fausses, que l'utilisateur ne vérifie pas toujours.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "Le marché du travail se caractérise aujourd'hui par un paradoxe : malgré un taux de chômage élevé chez les jeunes, de nombreux secteurs ne parviennent pas à recruter. Cette inadéquation tient moins au manque de candidats qu'au décalage entre les compétences recherchées et celles que l'on acquiert à l'école.",
      prompt: "Comment explique-t-on ce paradoxe ?",
      options: ["Par un décalage entre compétences recherchées et acquises", "Par un manque d'offres d'emploi", "Par la hausse des salaires", "Par la baisse du nombre de jeunes"],
      correct: "A",
      explanation: "L'inadéquation vient du décalage entre ce que les employeurs attendent et ce que la formation dispense.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "Il serait naïf de croire que la technique est un simple outil que l'on pourrait brandir à volonté : chaque dispositif façonne en retour les pratiques de ceux qui s'en servent. Ce n'est donc pas tant l'usage que l'on en fait qu'il faut interroger, que les dispositions mêmes qu'il installe en nous.",
      prompt: "Quelle idée l'orateur défend-il à propos de la technique ?",
      options: ["Elle transforme ceux qui l'utilisent", "Elle est un outil neutre", "Elle doit être supprimée", "Elle ne change pas les habitudes"],
      correct: "A",
      explanation: "L'orateur rejette la neutralité de l'outil : tout dispositif façonne en retour les pratiques de ses utilisateurs.",
    },
    {
      level: "C2",
      category: "histoire",
      transcription:
        "L'histoire ne se réduit pas à l'inventaire des faits : elle tient aussi à la manière dont une société choisit de les raconter. Les commémorations en offrent un exemple saisissant, car en sélectionnant ce qu'elles célèbrent, elles révèlent moins le passé que les préoccupations du présent.",
      prompt: "Que révèlent les commémorations selon l'orateur ?",
      options: ["Les préoccupations du présent", "Les faits exacts du passé", "Les erreurs des historiens", "La volonté d'oublier"],
      correct: "A",
      explanation: "En choisissant ce qu'elles célèbrent, les commémorations disent surtout ce qui préoccupe la société actuelle.",
    },
    {
      level: "C2",
      category: "art",
      transcription:
        "On prête volontiers à l'artiste le pouvoir de dire l'indicible, comme si l'œuvre était l'expression transparente d'une intériorité. Or l'œuvre résiste, elle excède ce que son auteur y a mis ; c'est même à cette part d'opacité qu'elle doit de continuer à solliciter des interprétations bien après sa création.",
      prompt: "À quoi l'œuvre doit-elle sa longévité selon l'orateur ?",
      options: ["À une part d'opacité qui appelle des interprétations", "À la célébrité de l'artiste", "À une signification unique", "À sa transparence"],
      correct: "A",
      explanation: "La part d'opacité de l'œuvre, qui excède l'intention de l'auteur, nourrit durablement les interprétations.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "adjectifs possessifs",
      prompt: "Marie a oublié ___ parapluie dans le bus.",
      options: ["son", "sa", "ses", "leur"],
      correct: "A",
      explanation: "« Parapluie » est masculin singulier : l'adjectif possessif correspondant à « Marie » est « son ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Les enfants ___ dans le jardin depuis ce matin.",
      options: ["jouent", "joue", "jouez", "jouons"],
      correct: "A",
      explanation: "Le sujet « les enfants » est à la troisième personne du pluriel : « jouent ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Tu as vu Paul ? Non, je ne ___ ai pas vu depuis lundi.",
      options: ["l'", "lui", "y", "en"],
      correct: "A",
      explanation: "« Voir quelqu'un » : le complément d'objet direct se remplace par « le », ici élidé en « l' ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Quand j'étais enfant, nous ___ chaque été chez ma grand-mère.",
      options: ["allions", "sommes allés", "irons", "allons"],
      correct: "A",
      explanation: "Une habitude passée se met à l'imparfait : « nous allions ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce film est ___ intéressant que le livre.",
      options: ["moins", "plus bon", "meilleur", "très"],
      correct: "A",
      explanation: "La structure comparative « moins… que » se construit avec un adjectif : « moins intéressant que ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous habitons ___ la campagne, à vingt kilomètres de la ville.",
      options: ["à", "en", "au", "dans le"],
      correct: "A",
      explanation: "On emploie « à la campagne » : la préposition « à » suivie de l'article « la ».",
    },
    {
      level: "B1",
      category: "futur",
      prompt: "Demain, s'il ne pleut pas, nous ___ au parc.",
      options: ["irons", "allons", "allions", "irions"],
      correct: "A",
      explanation: "Après « si + présent », la principale se met au futur simple : « nous irons ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Je regrette que vous ne ___ pas pu venir à la réunion.",
      options: ["ayez", "avez", "aviez", "auriez"],
      correct: "A",
      explanation: "« Regretter que » entraîne le subjonctif ; le passé s'exprime par « ayez pu ».",
    },
    {
      level: "B2",
      category: "but",
      prompt: "Il parle lentement ___ tout le monde comprenne.",
      options: ["pour que", "parce que", "bien que", "alors que"],
      correct: "A",
      explanation: "« Pour que » exprime le but et se construit avec le subjonctif : « pour que tout le monde comprenne ».",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Le tableau ___ par un jeune artiste l'an dernier.",
      options: ["a été peint", "a peint", "peignait", "est peignant"],
      correct: "A",
      explanation: "Le sujet « tableau » subit l'action : le passif au passé composé s'écrit « a été peint ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Si vous ___ avant sept heures, vous auriez évité les embouteillages.",
      options: ["étiez partis", "partiez", "partiriez", "êtes partis"],
      correct: "A",
      explanation: "L'hypothèse irréelle dans le passé demande le plus-que-parfait après « si » : « si vous étiez partis ».",
    },
    {
      level: "B2",
      category: "opposition",
      prompt: "Il est très compétent, ___ il manque d'expérience.",
      options: ["mais", "donc", "car", "ainsi"],
      correct: "A",
      explanation: "« Mais » oppose deux idées contraires : la compétence et le manque d'expérience.",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "Le collègue ___ je t'ai parlé arrive demain.",
      options: ["dont", "que", "qui", "où"],
      correct: "A",
      explanation: "« Parler de quelqu'un » : le pronom relatif « dont » remplace le complément introduit par « de ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "Elle s'est blessée ___ au sol en descendant l'escalier.",
      options: ["en tombant", "tombant", "tomber", "tombé"],
      correct: "A",
      explanation: "Le gérondif « en tombant » indique que l'action de tomber a lieu en même temps que celle de descendre.",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Il est peu probable que le projet ___ avant l'été.",
      options: ["soit terminé", "est terminé", "sera terminé", "serait terminé"],
      correct: "A",
      explanation: "« Il est peu probable que » appelle le subjonctif : « que le projet soit terminé ».",
    },
    {
      level: "C1",
      category: "concession",
      prompt: "Aussi talentueux ___ soit cet artiste, il peine à se faire connaître.",
      options: ["qu'il", "que", "qui", "dont il"],
      correct: "A",
      explanation: "La structure concessive « aussi… que + subjonctif » se complète par « qu'il soit ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "C'est grâce à son soutien ___ j'ai pu terminer mes études.",
      options: ["que", "qui", "dont", "où"],
      correct: "A",
      explanation: "Dans la structure « c'est… que », le complément circonstanciel mis en relief est suivi de « que ».",
    },
    {
      level: "C1",
      category: "concordance des temps",
      prompt: "Il fallait que nous ___ tout rangé avant l'arrivée des invités.",
      options: ["eussions", "ayons", "avions", "aurions"],
      correct: "A",
      explanation: "En langue soutenue, « il fallait que » appelle l'imparfait du subjonctif : « que nous eussions rangé ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "N'eût été son courage, l'expédition ___ échoué.",
      options: ["aurait", "avait", "eut", "ait"],
      correct: "A",
      explanation: "« N'eût été » équivaut à « s'il n'avait pas été » ; la principale prend le conditionnel passé : « aurait échoué ».",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Pour peu qu'on lui ___ la parole, il parle sans s'arrêter.",
      options: ["donne", "donnera", "donnerait", "donnait"],
      correct: "A",
      explanation: "« Pour peu que » est suivi du subjonctif : « pour peu qu'on lui donne ».",
    },
  ],
  reading: [
    {
      title: "Fermeture exceptionnelle de la poste",
      text: p(
        "Le bureau de poste du centre-ville sera fermé lundi pour cause de travaux d'électricité.",
        "Vous pourrez retirer vos colis au bureau de la rue Voltaire, ouvert de 9 h à 17 h. Nous nous excusons pour la gêne.",
      ),
      question: {
        level: "B1",
        prompt: "Où peut-on retirer son colis lundi ?",
        options: ["Au bureau de la rue Voltaire", "Au centre-ville", "Chez le voisin", "À la mairie"],
        correct: "A",
        explanation: "Le texte indique de retirer les colis au bureau de la rue Voltaire pendant la fermeture.",
      },
    },
    {
      title: "Appartement à louer",
      text: p(
        "À louer : appartement de trois pièces, deuxième étage, proche du tramway. Cuisine équipée, parking inclus. Loyer : 780 euros, charges en sus.",
        "Visites possibles le samedi matin sur rendez-vous uniquement.",
      ),
      question: {
        level: "B1",
        prompt: "Comment visiter l'appartement ?",
        options: ["Sur rendez-vous le samedi matin", "Tous les jours sans rendez-vous", "Le dimanche après-midi", "Par téléphone seulement"],
        correct: "A",
        explanation: "L'annonce précise que les visites se font le samedi matin, sur rendez-vous.",
      },
    },
    {
      title: "Message à un collègue",
      text: p(
        "Bonjour Karim, je ne serai pas là demain car j'ai un rendez-vous chez le dentiste. Peux-tu envoyer le dossier au client à ma place ?",
        "Je te transmets le fichier ce soir. Merci d'avance pour ton aide.",
      ),
      question: {
        level: "B1",
        prompt: "Que demande l'auteur à Karim ?",
        options: ["Envoyer le dossier au client", "Remplacer le dentiste", "Reporter la réunion", "Préparer un fichier"],
        correct: "A",
        explanation: "L'auteur demande à Karim d'envoyer à sa place le dossier au client.",
      },
    },
    {
      title: "Vide-greniers du quartier",
      text: p(
        "Dimanche, de 8 h à 18 h, le vide-greniers du quartier de la Gare réunit plus de cent exposants. Entrée libre.",
        "Les inscriptions pour tenir un stand se font en mairie : deux euros le mètre. Buvette sur place.",
      ),
      question: {
        level: "B1",
        prompt: "Où s'inscrire pour tenir un stand ?",
        options: ["En mairie", "À la buvette", "Sur place le dimanche", "À la gare"],
        correct: "A",
        explanation: "Le texte précise que les inscriptions des exposants se font en mairie, au tarif de deux euros le mètre.",
      },
    },
    {
      title: "Offre d'emploi : animateur",
      text: p(
        "Le centre de loisirs recherche un animateur pour les mercredis et les vacances scolaires. Diplôme du BAFA souhaité mais non obligatoire.",
        "Envoyez votre CV et une lettre de motivation avant le 15 juin à l'adresse indiquée sur le site.",
      ),
      question: {
        level: "B1",
        prompt: "Le BAFA est-il indispensable ?",
        options: ["Non, il est seulement souhaité", "Oui, il est obligatoire", "Seulement en vacances", "On l'obtient sur place"],
        correct: "A",
        explanation: "L'annonce précise que le BAFA est souhaité mais non obligatoire.",
      },
    },
    {
      title: "Le retour des cabines téléphoniques en livres",
      text: p(
        "Dans plusieurs villages, d'anciennes cabines téléphoniques ont été transformées en bibliothèques gratuites. Chacun peut y prendre un livre et en déposer un autre, sans inscription ni contrôle.",
        "Le dispositif séduit les habitants, même si certains regrettent que des ouvrages soient parfois abîmés par l'humidité.",
      ),
      question: {
        level: "B2",
        prompt: "Quel inconvénient certains habitants signalent-ils ?",
        options: ["Des livres abîmés par l'humidité", "Un manque de livres récents", "Une inscription obligatoire", "Un prix trop élevé"],
        correct: "A",
        explanation: "Certains habitants déplorent que l'humidité abîme parfois les ouvrages laissés dans les cabines.",
      },
    },
    {
      title: "Les cantines et le menu végétarien",
      text: p(
        "Depuis la rentrée, la cantine du collège propose un menu végétarien chaque jeudi. Les élèves peuvent toutefois choisir un repas avec viande s'ils le souhaitent.",
        "Les premiers retours sont plutôt positifs : une majorité d'élèves découvre de nouveaux plats, même si quelques-uns regrettent le manque de variété.",
      ),
      question: {
        level: "B2",
        prompt: "Que peuvent faire les élèves qui préfèrent la viande ?",
        options: ["Choisir un repas avec viande", "Apporter leur repas", "Sauter le repas", "Attendre vendredi"],
        correct: "A",
        explanation: "Le menu végétarien n'est pas imposé : les élèves peuvent opter pour un repas contenant de la viande.",
      },
    },
    {
      title: "Un sentier pour tous",
      text: p(
        "Le parc régional vient d'aménager un sentier accessible aux personnes en fauteuil roulant. Long de deux kilomètres, il traverse la forêt sur un revêtement lisse, avec des bancs tous les deux cents mètres.",
        "Des panneaux en braille et des enregistrements audio permettent aussi aux visiteurs aveugles de profiter de la promenade.",
      ),
      question: {
        level: "B2",
        prompt: "Comment le sentier aide-t-il les visiteurs aveugles ?",
        options: ["Grâce à des panneaux en braille et des audios", "Grâce à un guide permanent", "Grâce à un chien offert", "Grâce à des barrières métalliques"],
        correct: "A",
        explanation: "Des panneaux en braille et des enregistrements audio leur permettent de profiter du sentier.",
      },
    },
    {
      title: "Les jeunes et l'épargne",
      text: p(
        "Contrairement à une idée reçue, les jeunes adultes épargnent davantage qu'il y a dix ans. Beaucoup mettent de côté pour acheter un logement, même si la hausse des prix rend cet objectif de plus en plus lointain.",
        "Les banques répondent en proposant des comptes adaptés, avec des plafonds réduits et des conseils personnalisés.",
      ),
      question: {
        level: "B2",
        prompt: "Que montre le texte à propos des jeunes ?",
        options: ["Ils épargnent plus qu'avant", "Ils dépensent plus qu'avant", "Ils refusent les banques", "Ils achètent tous un logement"],
        correct: "A",
        explanation: "Le texte contredit une idée reçue : les jeunes adultes épargnent davantage qu'il y a dix ans.",
      },
    },
    {
      title: "Des abeilles en ville",
      text: p(
        "Les ruches installées sur les toits de la ville se multiplient. Les apiculteurs urbains observent des récoltes de miel parfois meilleures qu'à la campagne, car les jardins fleuris y offrent une nourriture variée toute l'année.",
        "Les spécialistes préviennent toutefois qu'un trop grand nombre de ruches pourrait priver les abeilles sauvages de ressources.",
      ),
      question: {
        level: "B2",
        prompt: "Quel risque les spécialistes évoquent-ils ?",
        options: ["Une concurrence pour les abeilles sauvages", "Une baisse du miel urbain", "Un manque de fleurs en ville", "Des piqûres plus fréquentes"],
        correct: "A",
        explanation: "Trop de ruches pourraient priver les abeilles sauvages de nourriture.",
      },
    },
    {
      title: "Le vélo, atout pour les salariés",
      text: p(
        "Plusieurs entreprises versent à leurs salariés une indemnité pour venir au travail à vélo. Les premiers bilans sont encourageants : moins d'absences pour maladie, des places de parking libérées et une ambiance plus détendue au bureau.",
        "Reste à sécuriser les itinéraires, car beaucoup de salariés disent hésiter à cause de la circulation.",
      ),
      question: {
        level: "B2",
        prompt: "Qu'est-ce qui freine certains salariés ?",
        options: ["La circulation dangereuse", "Le coût de l'indemnité", "Le manque de parkings", "L'avis de leur employeur"],
        correct: "A",
        explanation: "Beaucoup hésitent à cause de la circulation, ce qui appelle une sécurisation des itinéraires.",
      },
    },
    {
      title: "Les marchés de nuit",
      text: p(
        "Dans plusieurs villes du sud, des marchés nocturnes ont vu le jour pendant l'été. On y vend de l'artisanat, des produits locaux et des plats cuisinés, dans une ambiance festive jusque tard dans la nuit.",
        "Les riverains se plaignent toutefois du bruit, et la municipalité réfléchit à fixer une heure de fermeture plus précoce.",
      ),
      question: {
        level: "B2",
        prompt: "Que réfléchit à faire la municipalité ?",
        options: ["Avancer l'heure de fermeture", "Interdire les marchés", "Agrandir l'espace", "Supprimer l'artisanat"],
        correct: "A",
        explanation: "À cause du bruit dénoncé par les riverains, elle envisage une fermeture plus précoce.",
      },
    },
    {
      title: "Le métier de sage-femme",
      text: p(
        "Les sages-femmes ne se limitent plus au suivi des grossesses : elles assurent aussi des consultations de contraception, des dépistages et des suivis gynécologiques. Pourtant, ce champ élargi de compétences reste mal connu du grand public.",
        "Leurs représentants réclament une meilleure reconnaissance de leur rôle et une revalorisation de leur rémunération.",
      ),
      question: {
        level: "B2",
        prompt: "Que réclament les représentants des sages-femmes ?",
        options: ["Une meilleure reconnaissance et un salaire revalorisé", "La fin des consultations", "Un retour au suivi des grossesses seul", "Un diplôme supplémentaire"],
        correct: "A",
        explanation: "Ils demandent une reconnaissance accrue et une revalorisation de leur rémunération.",
      },
    },
    {
      title: "Une ludothèque de quartier",
      text: p(
        "Ouverte depuis septembre, la ludothèque du quartier prête des jeux de société aux familles pour une durée de trois semaines. L'adhésion annuelle coûte cinq euros, et des soirées jeux sont organisées chaque vendredi.",
        "Les bénévoles constatent que des voisins de générations différentes viennent y jouer ensemble, ce qui était rare auparavant.",
      ),
      question: {
        level: "B2",
        prompt: "Quel bénéfice les bénévoles constatent-ils ?",
        options: ["Des rencontres entre générations", "Une baisse du prix des jeux", "Une fermeture du quartier", "Un recul du bénévolat"],
        correct: "A",
        explanation: "Les bénévoles notent que des voisins d'âges différents jouent désormais ensemble.",
      },
    },
    {
      title: "Des horaires adaptés aux commerçants",
      text: p(
        "La mairie a décidé de décaler la collecte des déchets des commerces du centre-ville à six heures du matin, afin d'éviter les embouteillages de milieu de matinée. Les camions passeront désormais avant l'ouverture des boutiques.",
        "Les commerçants approuvent, mais demandent que les sacs soient sortis seulement la veille au soir pour limiter les nuisances.",
      ),
      question: {
        level: "B2",
        prompt: "Que demandent les commerçants ?",
        options: ["Sortir les sacs seulement la veille au soir", "Revenir à l'ancien horaire", "Supprimer la collecte", "Payer moins de taxes"],
        correct: "A",
        explanation: "Tout en approuvant le nouvel horaire, ils souhaitent que les sacs soient sortis la veille au soir uniquement.",
      },
    },
    {
      title: "Les circuits courts à l'épreuve",
      text: p(
        "Les circuits courts, qui réduisent le nombre d'intermédiaires entre producteurs et consommateurs, ont connu un essor spectaculaire. Ils répondent à une demande de transparence, de fraîcheur et de rémunération plus juste des agriculteurs, tout en limitant les kilomètres parcourus par les aliments.",
        "Mais cette réussite appelle des nuances. Pour beaucoup de petites exploitations, la vente directe suppose un temps considérable consacré à la logistique, à la communication et aux marchés, au détriment de la production elle-même. Certains agriculteurs avouent que le surcroît de travail n'est pas toujours compensé par la marge supplémentaire. Aussi des plateformes collectives se développent-elles, mutualisant la livraison et la gestion des commandes, afin de concilier proximité et efficacité.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi se développent des plateformes collectives ?",
        options: ["Pour mutualiser la logistique et gagner en efficacité", "Pour remplacer les agriculteurs", "Pour augmenter les intermédiaires", "Pour éviter la vente directe"],
        correct: "A",
        explanation: "Ces plateformes partagent la livraison et la gestion des commandes afin d'allier proximité et efficacité.",
      },
    },
    {
      title: "L'apprentissage tout au long de la vie",
      text: p(
        "L'idée selon laquelle on apprend d'abord et on travaille ensuite est de moins en moins tenable. L'évolution rapide des techniques oblige chacun à actualiser ses compétences, voire à changer de métier plusieurs fois au cours de sa carrière. La formation continue cesse alors d'être une option pour devenir une nécessité.",
        "Pour autant, tous les salariés n'y accèdent pas de la même manière. Les cadres des grandes entreprises bénéficient plus aisément de dispositifs financés, quand les employés des petites structures disposent de moins de temps et d'informations. Les pouvoirs publics cherchent donc à garantir un droit individuel à la formation, mais l'enjeu reste de rendre ce droit effectif, c'est-à-dire connu, utilisable et adapté à des parcours très divers.",
      ),
      question: {
        level: "C1",
        prompt: "Quel obstacle le texte souligne-t-il pour le droit à la formation ?",
        options: ["Il n'est pas toujours connu ni adapté aux parcours", "Il est trop coûteux pour l'État", "Il est réservé aux jeunes", "Il a été supprimé"],
        correct: "A",
        explanation: "L'enjeu est de rendre le droit effectif : connu, utilisable et adapté à des situations diverses.",
      },
    },
    {
      title: "Le bruit des chantiers",
      text: p(
        "Les riverains des grands chantiers urbains supportent souvent un bruit continu pendant des mois, voire des années. Si la réglementation impose des plages horaires et des seuils sonores, leur application dépend de contrôles ponctuels, dont l'efficacité est parfois contestée.",
        "Certaines villes expérimentent des chartes de chantier à faibles nuisances : engins électriques, bardages acoustiques, information régulière des habitants. Ces dispositifs coûtent plus cher aux entreprises, mais elles y trouvent un intérêt à long terme, car des relations apaisées avec le voisinage réduisent les recours et les retards. Le bruit n'est donc pas qu'un désagrément : il est devenu un critère de qualité d'un projet.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi les entreprises ont-elles intérêt à ces chartes ?",
        options: ["Elles limitent les recours et les retards", "Elles réduisent les coûts immédiatement", "Elles suppriment la réglementation", "Elles évitent d'informer les habitants"],
        correct: "A",
        explanation: "Des relations apaisées avec les riverains diminuent les recours et les retards, ce qui profite aux entreprises à long terme.",
      },
    },
    {
      title: "Médecine et intelligence artificielle",
      text: p(
        "Les outils d'aide au diagnostic fondés sur l'intelligence artificielle progressent rapidement, notamment en imagerie médicale, où ils repèrent parfois des anomalies que l'œil humain manque. Leurs promoteurs y voient un moyen de soulager des médecins surchargés et de réduire les délais d'attente.",
        "Les praticiens restent néanmoins prudents. Un algorithme apprend à partir de données passées, et ses biais éventuels se reproduisent à grande échelle. Surtout, un diagnostic ne se réduit pas à une probabilité : il suppose d'écouter le patient, de peser son histoire et ses choix. La plupart des spécialistes plaident donc pour une complémentarité, l'outil éclairant la décision sans jamais s'y substituer.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle position défendent la plupart des spécialistes ?",
        options: ["L'outil doit éclairer la décision sans la remplacer", "L'outil doit remplacer le médecin", "L'outil doit être interdit", "Le patient ne doit plus être écouté"],
        correct: "A",
        explanation: "Ils plaident pour une complémentarité où l'algorithme éclaire le médecin sans prendre sa place.",
      },
    },
    {
      title: "La ville et la nuit",
      text: p(
        "Longtemps, la nuit urbaine a été pensée comme un temps de repos, qu'il fallait protéger du bruit et de l'agitation. Or une part croissante des habitants travaille, se déplace ou se divertit après la tombée du jour : soignants, livreurs, boulangers, noctambules. La ville qui dort n'existe plus tout à fait, et les politiques municipales peinent à ajuster leurs règles à cette réalité.",
        "Certaines métropoles ont créé des « maires de la nuit », chargés de médiation entre commerçants, riverains et services publics. Leur rôle consiste moins à trancher qu'à reconnaître que la nuit est un territoire partagé, où se jouent à la fois des enjeux de sécurité, de santé, d'économie et de sociabilité.",
      ),
      question: {
        level: "C1",
        prompt: "Quel est le rôle des « maires de la nuit » ?",
        options: ["Assurer une médiation entre les différents acteurs", "Interdire les activités nocturnes", "Rétablir le silence total", "Remplacer la police"],
        correct: "A",
        explanation: "Ils servent de médiateurs entre commerçants, riverains et services publics, dans un territoire nocturne partagé.",
      },
    },
    {
      title: "Le consentement et le numérique",
      text: p(
        "Chaque fois que nous acceptons des conditions d'utilisation sans les lire, nous invoquons une fiction juridique : celle d'un consentement libre et éclairé. Ces textes, longs et techniques, n'ont pas été conçus pour être compris, mais pour être acceptés. Le droit s'en satisfait, car il suppose que l'individu est le mieux placé pour défendre ses intérêts, hypothèse que la réalité des usages dément.",
        "Dès lors, il faudrait moins demander aux usagers de consentir que contraindre les services à des règles protectrices par défaut. Placer la charge de la vigilance sur celui qui n'a ni le temps ni les compétences pour l'assumer revient à organiser, sous couvert d'autonomie, une irresponsabilité collective. L'enjeu n'est pas d'informer davantage, mais de rééquilibrer le pouvoir entre ceux qui conçoivent les dispositifs et ceux qui s'y soumettent.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle solution l'auteur privilégie-t-il ?",
        options: ["Imposer aux services des règles protectrices par défaut", "Demander aux usagers de lire davantage", "Supprimer les conditions d'utilisation", "Allonger les textes juridiques"],
        correct: "A",
        explanation: "L'auteur juge qu'il faut contraindre les services par des règles protectrices plutôt que de faire peser la vigilance sur l'usager.",
      },
    },
    {
      title: "Le silence des campagnes",
      text: p(
        "On parle volontiers de la désertification des campagnes comme d'un destin, alors qu'elle résulte de choix cumulés : fermeture de classes, de bureaux de poste, de lignes ferroviaires, chacun justifié par un calcul de rentabilité. Pris isolément, ces arbitrages se défendent ; additionnés, ils retirent à un territoire les conditions mêmes de son attractivité, et rendent ensuite inévitable le déclin qu'ils prétendaient anticiper.",
        "Cette logique est d'autant plus insidieuse qu'elle se présente comme une simple gestion de ressources rares. Or le service public n'est pas qu'une dépense : il constitue une infrastructure invisible du lien social. Le mesurer à l'aune de son seul coût par usager, c'est ignorer ce qu'il rend possible, à commencer par la possibilité même de vivre ailleurs que dans les grandes villes.",
      ),
      question: {
        level: "C2",
        prompt: "Que reproche l'auteur à la logique de rentabilité ?",
        options: ["Elle provoque le déclin qu'elle prétend prévoir", "Elle coûte trop cher", "Elle favorise les campagnes", "Elle supprime les grandes villes"],
        correct: "A",
        explanation: "En retirant successivement des services, cette logique rend inévitable le déclin qu'elle disait seulement anticiper.",
      },
    },
    {
      title: "La mémoire et l'oubli en littérature",
      text: p(
        "Écrire sur le passé suppose un tri : aucun récit n'est en mesure de tout retenir, et c'est précisément parce que l'on oublie que l'on peut raconter. L'écrivain qui entreprend de restituer l'enfance ne retrouve pas les faits tels qu'ils furent ; il compose avec les lacunes, les déformations, les silences, et ce travail de reconstruction est la matière même de son œuvre.",
        "Aussi la fidélité, ici, ne peut-elle consister à reproduire, mais à rester honnête quant à ce que l'on ignore. Les plus grands récits de mémoire ne cherchent pas à dissimuler leurs trous : ils les exhibent, comme pour rappeler au lecteur qu'une vérité subjective ne s'obtient pas par l'accumulation de détails, mais par la lucidité sur les conditions de son énonciation, c'est-à-dire sur ce qui permet à quelqu'un de dire « je me souviens » sans se mentir.",
      ),
      question: {
        level: "C2",
        prompt: "Que signifie l'honnêteté dans un récit de mémoire ?",
        options: ["Reconnaître ce que l'on ignore", "Raconter tous les détails", "Cacher les trous de mémoire", "Reproduire exactement les faits"],
        correct: "A",
        explanation: "La fidélité consiste à rester honnête sur les lacunes plutôt qu'à prétendre reproduire le passé.",
      },
    },
    {
      title: "L'expertise et la démocratie",
      text: p(
        "Dans les sociétés contemporaines, la complexité des questions à trancher (climat, santé, numérique) pousse à s'en remettre à des experts. Ce recours est légitime : nul ne peut tout comprendre, et la décision éclairée suppose des savoirs spécialisés. Mais il crée une tension avec l'idéal démocratique, qui veut que les citoyens aient prise sur ce qui les concerne.",
        "Le risque est double. D'un côté, une technocratie qui se retranche derrière la science pour éviter le débat ; de l'autre, une défiance généralisée qui rejette le savoir au nom de la souveraineté du peuple. Entre ces deux écueils, il reste à inventer des formes de délibération où l'expertise informe sans clore la discussion, et où les citoyens, sans se faire experts, sont en mesure de questionner les hypothèses et les priorités des savants.",
      ),
      question: {
        level: "C2",
        prompt: "Quel équilibre l'auteur recommande-t-il ?",
        options: ["Une délibération où l'expertise informe sans clore le débat", "Un pouvoir exclusif des experts", "Un rejet total du savoir", "Une suppression des débats publics"],
        correct: "A",
        explanation: "Il faut éviter à la fois la technocratie et la défiance, en laissant l'expertise éclairer un débat qui reste ouvert.",
      },
    },
    {
      title: "La fatigue d'être soi",
      text: p(
        "La société contemporaine valorise l'initiative personnelle et la réalisation de soi, comme si chacun devait être l'entrepreneur de sa propre existence. Cette promesse d'autonomie a libéré des contraintes anciennes, mais elle a aussi déplacé le poids de la réussite sur l'individu seul : si l'on échoue, c'est que l'on n'a pas assez voulu, pas assez travaillé, pas assez su se vendre.",
        "Les sociologues y voient l'une des sources du malaise actuel, particulièrement chez les jeunes. Lorsque le succès est perçu comme une affaire de mérite personnel, les difficultés structurelles disparaissent de l'analyse ; l'échec devient une faute intime plutôt qu'un fait social. Redonner place aux déterminants collectifs n'est pas une manière de déresponsabiliser, mais de rendre à chacun la juste mesure de ce qui dépend, ou non, de lui.",
      ),
      question: {
        level: "C2",
        prompt: "Quel effet l'idéologie du mérite personnel a-t-elle selon le texte ?",
        options: ["Elle transforme l'échec en faute individuelle", "Elle supprime toute difficulté", "Elle renforce les solidarités", "Elle réduit le malaise des jeunes"],
        correct: "A",
        explanation: "En faisant du succès une affaire de mérite, elle masque les causes sociales et fait de l'échec une faute intime.",
      },
    },
  ],
});
