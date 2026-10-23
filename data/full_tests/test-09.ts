import { defineFullTest } from "./types";

const p = (...paragraphs: string[]): string => paragraphs.join("\n");

export const FULL_TEST_09 = defineFullTest({
  number: 9,
  description:
    "Neuvième examen blanc complet : trois épreuves enchaînées, du niveau A1 au niveau C2, avec des situations inédites sur la vie culturelle, le travail, l'environnement et les débats de société.",
  listening: [
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Le cinéma Le Rialto est fermé dimanche pour une réparation. Il rouvrira lundi à quatorze heures. Les séances du week-end sont reportées à la semaine suivante.",
      prompt: "Quand le cinéma rouvre-t-il ?",
      options: ["Lundi à quatorze heures", "Dimanche à quatorze heures", "Lundi à dix heures", "Samedi à quatorze heures"],
      correct: "A",
      explanation: "Le message indique une fermeture dimanche et une réouverture lundi à quatorze heures.",
    },
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, votre rendez-vous chez le coiffeur de mercredi est reporté à jeudi à quinze heures. Si cet horaire ne vous convient pas, rappelez-nous avant mardi.",
      prompt: "Quel est le nouveau rendez-vous ?",
      options: ["Jeudi à quinze heures", "Mercredi à quinze heures", "Jeudi à onze heures", "Vendredi à quinze heures"],
      correct: "A",
      explanation: "Le rendez-vous de mercredi est déplacé à jeudi à quinze heures.",
    },
    {
      level: "A1",
      category: "culture",
      transcription:
        "Le musée ferme ses portes à dix-sept heures le mardi. La dernière entrée a lieu à seize heures quinze. Les visiteurs déjà présents peuvent rester jusqu'à la fermeture.",
      prompt: "À quelle heure est la dernière entrée ?",
      options: ["À seize heures quinze", "À dix-sept heures", "À seize heures trente", "À quinze heures"],
      correct: "A",
      explanation: "La dernière entrée est fixée à seize heures quinze, une heure avant la fermeture.",
    },
    {
      level: "A2",
      category: "achats",
      transcription:
        "Bonjour, votre pull sera prêt vendredi après-midi. La tache de café est presque partie, mais une petite marque reste visible. Vous pourrez le retirer à partir de seize heures.",
      prompt: "Quand le pull sera-t-il prêt ?",
      options: ["Vendredi à partir de seize heures", "Jeudi à seize heures", "Vendredi matin", "Samedi après-midi"],
      correct: "A",
      explanation: "Le pressing annonce que le pull sera disponible vendredi à partir de seize heures.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "En raison de travaux, le bus numéro sept ne dessert plus la place du Marché. L'arrêt provisoire se trouve devant la mairie, jusqu'à la fin du mois.",
      prompt: "Où se trouve l'arrêt provisoire ?",
      options: ["Devant la mairie", "Place du Marché", "Devant la gare", "Derrière l'église"],
      correct: "A",
      explanation: "Le bus ne passe plus par la place du Marché : l'arrêt est déplacé devant la mairie.",
    },
    {
      level: "A2",
      category: "téléphonie",
      transcription:
        "Bonjour, votre forfait mobile passe à vingt gigaoctets dès le mois prochain, sans changement de prix. Vous recevrez un message de confirmation. Aucune démarche n'est nécessaire.",
      prompt: "Qu'est-ce qui change dans le forfait ?",
      options: ["Le volume de données augmente", "Le prix augmente", "Le numéro change", "Le forfait est supprimé"],
      correct: "A",
      explanation: "Le forfait passe à vingt gigaoctets, tandis que le prix reste identique.",
    },
    {
      level: "A2",
      category: "sport",
      transcription:
        "Les cours de natation pour débutants commencent lundi à dix-huit heures. Pensez à apporter un bonnet de bain et une paire de lunettes. Le maillot est obligatoire.",
      prompt: "Que faut-il apporter ?",
      options: ["Un bonnet de bain et des lunettes", "Un maillot de sport", "Une serviette uniquement", "Des chaussures de piscine"],
      correct: "A",
      explanation: "Le message demande un bonnet de bain et une paire de lunettes pour les cours.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Votre entretien annuel est reporté à mardi dix heures, car votre responsable sera en déplacement jusqu'à lundi soir. Merci de préparer un point sur vos projets du trimestre.",
      prompt: "Pourquoi l'entretien est-il reporté ?",
      options: ["Le responsable est en déplacement", "La salle est indisponible", "Le salarié est absent", "Le dossier est incomplet"],
      correct: "A",
      explanation: "Le report est justifié par le déplacement du responsable jusqu'à lundi soir.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Dans notre résidence, les vélos doivent être rangés au sous-sol, dans le local prévu. Il est interdit de les laisser dans le hall ou sur les balcons. La porte du local est fermée à clé le soir.",
      prompt: "Où faut-il ranger les vélos ?",
      options: ["Dans le local du sous-sol", "Dans le hall", "Sur les balcons", "Devant la porte de la résidence"],
      correct: "A",
      explanation: "Le règlement impose de ranger les vélos dans le local du sous-sol, et non dans le hall.",
    },
    {
      level: "B1",
      category: "santé",
      transcription:
        "Votre pharmacien vous rappelle que ce médicament peut provoquer de la somnolence. Ne conduisez pas dans les heures qui suivent la prise. Si les effets persistent, consultez votre médecin.",
      prompt: "Que faut-il éviter après la prise du médicament ?",
      options: ["Conduire", "Boire de l'eau", "Dormir", "Manger"],
      correct: "A",
      explanation: "Le médicament peut provoquer de la somnolence : il est déconseillé de conduire ensuite.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "L'atelier de théâtre de la maison de quartier accueille les débutants le jeudi soir. Aucune expérience n'est demandée. L'inscription se fait sur place, dans la limite des quinze places.",
      prompt: "À qui s'adresse l'atelier ?",
      options: ["Aux débutants", "Aux comédiens professionnels", "Aux enfants uniquement", "Aux habitants du centre-ville"],
      correct: "A",
      explanation: "L'atelier accueille les débutants et ne demande aucune expérience préalable.",
    },
    {
      level: "B1",
      category: "administration",
      transcription:
        "Pour renouveler votre carte d'identité, prenez rendez-vous en ligne. Présentez-vous avec une photo récente et un justificatif de domicile. Le délai de fabrication est d'environ trois semaines.",
      prompt: "Quel document faut-il apporter ?",
      options: ["Une photo récente", "Un passeport étranger", "Un certificat médical", "Une attestation de salaire"],
      correct: "A",
      explanation: "La procédure exige une photo récente et un justificatif de domicile.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Le poste de médiateur culturel que nous proposons exige une bonne capacité à travailler en public. Une expérience dans l'animation serait appréciée, mais les débutants motivés sont acceptés. Les horaires varient selon les événements, y compris le week-end.",
      prompt: "Quelle exigence peut être assouplie ?",
      options: ["L'expérience en animation", "La disponibilité le week-end", "La capacité à parler en public", "Le travail en équipe"],
      correct: "A",
      explanation: "L'expérience en animation est seulement appréciée : les débutants motivés peuvent postuler.",
    },
    {
      level: "B2",
      category: "environnement",
      transcription:
        "Les piles usagées ne doivent jamais être jetées avec les ordures ménagères. Déposez-les dans les bornes prévues en mairie ou en magasin. Elles seront recyclées et leurs métaux réutilisés dans de nouveaux produits.",
      prompt: "Que faut-il faire des piles usagées ?",
      options: ["Les déposer dans une borne de collecte", "Les jeter avec les ordures ménagères", "Les conserver à la maison", "Les apporter à l'hôpital"],
      correct: "A",
      explanation: "Les piles doivent être déposées dans les bornes de collecte pour être recyclées.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Plusieurs commerçants du quartier ont créé une plateforme de livraison commune. Les frais de fonctionnement sont partagés, ce qui évite à chacun d'investir seul. Les clients peuvent commander auprès de plusieurs boutiques et recevoir les achats en une seule fois.",
      prompt: "Quel avantage offre la plateforme aux commerçants ?",
      options: ["Elle partage les frais entre eux", "Elle supprime les livraisons", "Elle attire des clients étrangers", "Elle remplace les boutiques"],
      correct: "A",
      explanation: "La plateforme mutualise les frais, ce qui évite à chaque commerçant d'investir seul.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "La médiathèque prête désormais des guitares et des claviers aux adhérents. Le prêt dure trois semaines et une caution de cent euros est demandée. Un casque est fourni pour les instruments électroniques.",
      prompt: "Quelle condition faut-il remplir pour emprunter un instrument ?",
      options: ["Être adhérent et verser une caution", "Habiter la même rue", "Payer un abonnement mensuel", "Avoir plus de dix-huit ans"],
      correct: "A",
      explanation: "Le prêt est réservé aux adhérents et suppose une caution de cent euros.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "Le centre de formation propose des cours du soir en informatique. Un test de positionnement est obligatoire avant l'inscription afin de constituer des groupes de niveau. Les cours débutent la semaine suivante.",
      prompt: "Quelle étape est obligatoire avant l'inscription ?",
      options: ["Un test de positionnement", "Un entretien avec un psychologue", "Le paiement de la totalité des frais", "Une lettre de motivation"],
      correct: "A",
      explanation: "Un test de positionnement est obligatoire pour répartir les inscrits en groupes de niveau.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "L'abonnement TER pour les étudiants coûte moins cher, mais il n'est valable qu'en dehors des heures de pointe. Les trajets du matin et du soir aux heures d'affluence sont donc facturés au tarif normal.",
      prompt: "Quelle restriction s'applique à l'abonnement étudiant ?",
      options: ["Il ne vaut pas aux heures de pointe", "Il n'est valable que le week-end", "Il est réservé aux moins de vingt ans", "Il ne permet qu'un trajet par jour"],
      correct: "A",
      explanation: "L'abonnement réduit ne s'applique pas aux trajets effectués aux heures de pointe.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Une étude menée sur plusieurs parcelles montre que l'agriculture intensive réduit fortement la présence des vers de terre. Or ces animaux améliorent la structure du sol et facilitent l'infiltration de l'eau. Les chercheurs recommandent donc d'intégrer des cultures intermédiaires et de limiter les labours profonds.",
      prompt: "Pourquoi les vers de terre sont-ils importants pour les sols ?",
      options: ["Ils améliorent la structure du sol et l'infiltration de l'eau", "Ils remplacent les engrais chimiques", "Ils augmentent les rendements immédiatement", "Ils empêchent toute culture intermédiaire"],
      correct: "A",
      explanation: "L'étude relie la présence des vers de terre à une meilleure structure du sol et à l'infiltration de l'eau.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Le travail de nuit est souvent présenté comme une simple question d'horaires. Les études montrent pourtant des effets sur le sommeil, mais aussi sur la vie sociale, car les horaires décalés compliquent les repas en famille et les engagements réguliers. Les spécialistes plaident pour des compensations et des rotations plus lisibles.",
      prompt: "Quel effet du travail de nuit est mis en avant ?",
      options: ["Il perturbe le sommeil et la vie sociale", "Il améliore les repas en famille", "Il supprime les horaires décalés", "Il réduit la fatigue des salariés"],
      correct: "A",
      explanation: "Le texte souligne les effets sur le sommeil et sur la vie sociale, notamment les repas en famille.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "Le festival du film documentaire privilégie les œuvres réalisées avec de petits budgets. La sélection cherche des regards singuliers plutôt que des productions spectaculaires. Les organisateurs assument ce choix : il permet de découvrir des cinéastes avant qu'ils ne soient reconnus.",
      prompt: "Quel critère guide la sélection du festival ?",
      options: ["L'originalité du regard plus que le budget", "Le nombre de spectateurs attendus", "La notoriété des réalisateurs", "La durée des films"],
      correct: "A",
      explanation: "Le festival privilégie les petits budgets et les regards singuliers plutôt que les productions spectaculaires.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "La renaturation des rivières urbaines coûte cher, car elle suppose de déplacer des berges bétonnées et de restaurer la végétation. Les municipalités hésitent, mais les études montrent des bénéfices : moins d'inondations, eau plus fraîche et retour de certaines espèces. L'investissement doit être pensé sur plusieurs décennies.",
      prompt: "Pourquoi les municipalités hésitent-elles à renaturer les rivières ?",
      options: ["Le coût initial est élevé", "Les inondations augmentent", "Les espèces disparaissent", "La végétation est impossible à restaurer"],
      correct: "A",
      explanation: "La renaturation exige de déplacer des berges bétonnées et de restaurer la végétation, ce qui coûte cher.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "L'autorité n'est pas l'obéissance. Obéir suppose seulement de se soumettre à une consigne, tandis que reconnaître une autorité implique de lui prêter une légitimité. Cette distinction éclaire les crises politiques : un pouvoir peut obtenir l'obéissance par la crainte sans jamais disposer d'autorité véritable. La question n'est donc pas de savoir combien de personnes obéissent, mais au nom de quoi elles acceptent de le faire.",
      prompt: "Quelle distinction le locuteur établit-il ?",
      options: ["Entre obéissance et reconnaissance d'une autorité légitime", "Entre pouvoir politique et pouvoir économique", "Entre crainte et violence physique", "Entre légitimité et popularité"],
      correct: "A",
      explanation: "Le locuteur oppose la simple obéissance à la reconnaissance d'une autorité jugée légitime.",
    },
    {
      level: "C2",
      category: "technologie",
      transcription:
        "L'automatisation ne supprime pas seulement des tâches : elle déplace le jugement. Dans les usines, les opérateurs connaissent souvent des anomalies que les capteurs ne détectent pas. Si l'on confie toute la décision au système, ce savoir pratique disparaît. Les ingénieurs les plus lucides cherchent donc à préserver des espaces où l'expérience humaine peut corriger la machine.",
      prompt: "Quel risque l'automatisation fait-elle peser sur le travail ?",
      options: ["La disparition d'un savoir pratique fondé sur l'expérience", "La baisse de la production industrielle", "L'augmentation du nombre de capteurs", "La suppression des ingénieurs"],
      correct: "A",
      explanation: "Le locuteur craint que la décision confiée entièrement au système efface le savoir pratique des opérateurs.",
    },
    {
      level: "C2",
      category: "culture",
      transcription:
        "Le voyage est souvent décrit comme une rencontre avec l'altérité. Or le tourisme organisé tend à produire des lieux prévisibles, où l'étranger est invité à consommer des signes de différence. La véritable altérité résiste à cette mise en scène : elle dérange, elle ne se laisse pas photographier commodément. Voyager suppose alors d'accepter de ne pas tout comprendre.",
      prompt: "Quelle conception du voyage le locuteur défend-il ?",
      options: ["Une rencontre qui accepte l'incompréhension et la résistance de l'altérité", "Une consommation de signes culturels bien organisés", "Une recherche de paysages faciles à photographier", "Un séjour qui évite toute rencontre"],
      correct: "A",
      explanation: "Le locuteur valorise une altérité qui résiste et une rencontre qui accepte de ne pas tout comprendre.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Vous ___ le journal chaque matin.",
      options: ["lisez", "lit", "lisons", "lire"],
      correct: "A",
      explanation: "Avec le sujet « vous », le verbe « lire » se conjugue « lisez » au présent.",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Elle a acheté ___ huile d'olive au marché.",
      options: ["de l'", "du", "des", "la"],
      correct: "A",
      explanation: "Devant un nom féminin commençant par une voyelle, le partitif devient « de l' » : « de l'huile ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Nous ___ tranquillement lorsque l'orage a éclaté.",
      options: ["dînions", "dînons", "avons dîné", "dînerons"],
      correct: "A",
      explanation: "L'imparfait décrit l'action en cours interrompue par l'orage : « nous dînions ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Des gâteaux, il ___ a mangé deux.",
      options: ["en", "les", "leur", "y"],
      correct: "A",
      explanation: "Le pronom « en » remplace un complément introduit par « de » et accompagné d'une quantité : « il en a mangé deux ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Il rêve ___ devenir pilote depuis son enfance.",
      options: ["de", "à", "pour", "en"],
      correct: "A",
      explanation: "Le verbe « rêver » se construit avec « de » lorsqu'il introduit un infinitif : « rêver de devenir ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce musée est ___ visité que celui d'à côté : on y attend beaucoup moins.",
      options: ["moins", "aussi", "plus", "tant"],
      correct: "A",
      explanation: "L'attente plus courte indique une fréquentation inférieure : le musée est « moins visité ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "La rue ___ se trouve la librairie est en travaux.",
      options: ["où", "que", "dont", "laquelle"],
      correct: "A",
      explanation: "« Où » introduit un complément de lieu : « la rue où se trouve la librairie ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Aussitôt qu'il ___ la lettre, il nous préviendra.",
      options: ["aura reçu", "recevra", "a reçu", "recevait"],
      correct: "A",
      explanation: "Après « aussitôt que », l'action antérieure à un futur se met au futur antérieur : « aura reçu ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il est essentiel que vous ___ ce dossier confidentiel.",
      options: ["gardiez", "gardez", "garderez", "gardiez gardé"],
      correct: "A",
      explanation: "« Il est essentiel que » exige le subjonctif présent : « que vous gardiez ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Le concert a été annulé ___ la pluie.",
      options: ["à cause de", "grâce à", "malgré", "afin de"],
      correct: "A",
      explanation: "« À cause de » exprime une cause défavorable, adaptée à une annulation.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Ce pont ___ en 1932 par un ingénieur réputé.",
      options: ["a été construit", "a construit", "est construit", "construisait"],
      correct: "A",
      explanation: "Le complément d'agent « par un ingénieur » impose la voix passive au passé composé : « a été construit ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ ses clés, il a pu rentrer sans attendre.",
      options: ["En retrouvant", "Retrouvant", "Ayant retrouvé", "Retrouver"],
      correct: "A",
      explanation: "Le gérondif exprime la manière et se forme avec « en » : « en retrouvant ses clés ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Elle a promis qu'elle ___ le lendemain.",
      options: ["viendrait", "viendra", "venait", "vienne"],
      correct: "A",
      explanation: "Au discours indirect au passé, le futur « viendra » devient conditionnel : « viendrait ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "Les documents ___ vous avez besoin sont dans ce dossier.",
      options: ["dont", "que", "qui", "lesquels"],
      correct: "A",
      explanation: "Le verbe « avoir besoin de » appelle le pronom relatif « dont » : « les documents dont vous avez besoin ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "C'est en persévérant ___ elle a réussi.",
      options: ["qu'", "que", "dont", "où"],
      correct: "A",
      explanation: "La structure clivée « c'est… que » s'élide devant une voyelle : « c'est… qu'elle a réussi ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ de nouvelles règles a été annoncée par le ministère.",
      options: ["mise en place", "mettre en place", "mis en place", "met en place"],
      correct: "A",
      explanation: "Le nom correspondant au verbe « mettre en place » est « la mise en place ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Si nous avions réservé plus tôt, nous ___ une table.",
      options: ["aurions eu", "avions", "aurons", "ayons"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé associe le plus-que-parfait au conditionnel passé : « nous aurions eu ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Le journaliste a ___ les propos du ministre pour en modifier le sens.",
      options: ["déformé", "formé", "informé", "confirmé"],
      correct: "A",
      explanation: "« Déformer » signifie altérer le sens d'un propos ; les autres verbes ne conviennent pas ici.",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "Quand bien même il ___ raison, il devrait écouter les autres.",
      options: ["aurait", "a", "avait", "ait"],
      correct: "A",
      explanation: "« Quand bien même » appelle le conditionnel : « quand bien même il aurait raison ».",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "___ toutes les critiques, ce film a reçu un prix.",
      options: ["En dépit de", "Bien que", "Quoique", "Parce que"],
      correct: "A",
      explanation: "« En dépit de » introduit un nom, alors que « bien que » et « quoique » exigent un verbe conjugué.",
    },
  ],
  reading: [
    {
      title: "La grainothèque du quartier",
      text:
        "La grainothèque de la médiathèque échange gratuitement des graines de fleurs et de légumes. Elle ouvre le samedi matin. Chaque personne peut prendre cinq sachets par visite. Il est conseillé de noter la variété et l'année de récolte.",
      question: {
        level: "B1",
        prompt: "Combien de sachets peut-on prendre par visite ?",
        options: ["Cinq", "Deux", "Dix", "Autant que l'on veut"],
        correct: "A",
        explanation: "Le règlement de la grainothèque limite chaque visite à cinq sachets par personne.",
      },
    },
    {
      title: "Initiation aux premiers secours",
      text:
        "La Croix-Rouge propose une initiation aux premiers secours samedi, de neuf heures à dix-sept heures. La formation est gratuite dès seize ans. Elle alterne démonstrations et exercices pratiques. Une attestation est remise en fin de journée.",
      question: {
        level: "B1",
        prompt: "À partir de quel âge peut-on suivre la formation ?",
        options: ["Seize ans", "Dix-huit ans", "Quatorze ans", "Vingt et un ans"],
        correct: "A",
        explanation: "La formation est ouverte à tous à partir de seize ans.",
      },
    },
    {
      title: "Le club d'échecs",
      text:
        "Le club d'échecs se réunit chaque mercredi de dix-huit heures à vingt heures, à la maison des associations. Les débutants sont les bienvenus et des bénévoles leur apprennent les règles. L'entrée est libre, sans inscription.",
      question: {
        level: "B1",
        prompt: "Quand le club se réunit-il ?",
        options: ["Chaque mercredi soir", "Chaque samedi matin", "Deux fois par mois", "Tous les jours à midi"],
        correct: "A",
        explanation: "Les rencontres ont lieu chaque mercredi, de dix-huit heures à vingt heures.",
      },
    },
    {
      title: "La ferme pédagogique",
      text:
        "La ferme pédagogique ouvre le dimanche après-midi. Les enfants peuvent nourrir les chèvres et observer les poules. Les groupes sont reçus en semaine sur réservation, au moins huit jours à l'avance. L'entrée est gratuite pour les moins de six ans.",
      question: {
        level: "B1",
        prompt: "Que doivent faire les groupes qui viennent en semaine ?",
        options: ["Réserver au moins huit jours à l'avance", "Payer l'entrée pour chaque enfant", "Venir uniquement le dimanche", "Prévenir le jour même"],
        correct: "A",
        explanation: "Les groupes sont reçus en semaine sur réservation, au moins huit jours à l'avance.",
      },
    },
    {
      title: "La nuit des étoiles",
      text:
        "La nuit des étoiles aura lieu samedi au parc de la Colline, dès vingt et une heures. Des amateurs installeront des télescopes et expliqueront les constellations. En cas de ciel couvert, la soirée sera reportée au lendemain.",
      question: {
        level: "B1",
        prompt: "Que se passera-t-il si le ciel est couvert ?",
        options: ["La soirée sera reportée au lendemain", "La soirée sera annulée", "Les télescopes seront retirés", "L'événement commencera plus tôt"],
        correct: "A",
        explanation: "Le texte prévoit un report de la soirée au lendemain en cas de ciel couvert.",
      },
    },
    {
      title: "Le pain invendu devient farine",
      text: p(
        "Les boulangeries jettent chaque jour du pain invendu. Une coopérative a décidé de le transformer en farine, puis de la revendre aux agriculteurs. Le procédé exige un séchage rapide et un tri rigoureux, car le pain moisi est écarté.",
        "Les boulangeries partenaires réduisent leurs déchets et partagent les coûts de collecte. Le modèle reste fragile, mais montre qu'un déchet peut devenir une ressource.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle condition est nécessaire pour transformer le pain en farine ?",
        options: ["Un séchage rapide et un tri rigoureux", "Une congélation immédiate", "L'ajout de céréales nouvelles", "La vente directe aux particuliers"],
        correct: "A",
        explanation: "Le procédé exige un séchage rapide et un tri rigoureux, car le pain moisi doit être écarté.",
      },
    },
    {
      title: "Le dépistage auditif en entreprise",
      text: p(
        "Les entreprises doivent organiser un dépistage auditif pour les personnels exposés au bruit. Le test, rapide et indolore, mesure la perception de différentes fréquences. Les salariés aux résultats insuffisants sont orientés vers un médecin.",
        "Il ne remplace pas la réduction du bruit à la source, mais détecte des pertes souvent ignorées. Les syndicats exigent la confidentialité des résultats.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite du dispositif le texte souligne-t-il ?",
        options: ["Il ne remplace pas la réduction du bruit à la source", "Il est douloureux et long", "Il est réservé aux cadres", "Il supprime les visites médicales"],
        correct: "A",
        explanation: "Le dépistage complète la prévention mais ne dispense pas de réduire le bruit à la source.",
      },
    },
    {
      title: "Le fret ferroviaire reprend des couleurs",
      text: p(
        "Le transport de marchandises par train progresse. Les entreprises y voient un moyen de réduire leurs émissions. Pourtant, le fret exige des infrastructures adaptées et des correspondances fiables avec les camions.",
        "Les petits chargeurs hésitent, car les volumes minimaux restent élevés. Les opérateurs investissent dans des plateformes multimodales. La croissance est réelle, mais dépend encore de décisions publiques.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les petits chargeurs hésitent-ils ?",
        options: ["Les volumes minimaux exigés sont élevés", "Les trains sont trop rapides", "Les camions sont interdits", "Les émissions augmentent"],
        correct: "A",
        explanation: "Les petits chargeurs sont freinés par des volumes minimaux encore élevés.",
      },
    },
    {
      title: "Les écoquartiers face à la mixité sociale",
      text: p(
        "Les écoquartiers réduisent l'énergie consommée et favorisent les déplacements doux. Leur réussite environnementale est saluée. Pourtant, des études constatent qu'ils attirent des ménages aisés, ce qui limite la mixité sociale.",
        "Les logements sociaux y sont peu nombreux et les prix augmentent vite. Les urbanistes recommandent d'intégrer la mixité dès la conception. Un quartier durable doit être accessible à tous.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle critique est adressée aux écoquartiers ?",
        options: ["Ils attirent surtout des ménages aisés et limitent la mixité", "Ils consomment trop d'énergie", "Ils interdisent les transports en commun", "Ils manquent d'espaces verts"],
        correct: "A",
        explanation: "Le texte reproche aux écoquartiers d'attirer des ménages aisés, au détriment de la mixité sociale.",
      },
    },
    {
      title: "L'apprentissage en alternance",
      text: p(
        "L'alternance séduit les jeunes qui veulent acquérir de l'expérience tout en étudiant. Les entreprises y forment une main-d'œuvre adaptée à leurs besoins. Le rythme est exigeant : il faut s'adapter à deux univers et respecter des délais différents.",
        "Les centres constatent que l'accompagnement fait la différence. Sans tuteur ni suivi régulier, l'alternance peut devenir une source de stress plutôt qu'un tremplin.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi dépend principalement la réussite de l'alternance selon le texte ?",
        options: ["De la qualité de l'accompagnement", "Du montant du salaire", "De la distance géographique", "De la taille de l'entreprise"],
        correct: "A",
        explanation: "Le texte insiste sur l'accompagnement et le suivi pour éviter que l'alternance ne devienne stressante.",
      },
    },
    {
      title: "Les ateliers de mémoire",
      text: p(
        "Des ateliers de mémoire réunissent des personnes âgées autour de jeux de mots, de récits et de photos anciennes. Les participants y trouvent un motif de rencontre et une stimulation cognitive.",
        "Les animateurs rappellent qu'ils ne préviennent pas les maladies neurodégénératives. Leur intérêt principal est social : rompre l'isolement et valoriser les souvenirs. La régularité compte davantage qu'une performance ponctuelle.",
      ),
      question: {
        level: "B2",
        prompt: "Quel est l'intérêt principal des ateliers selon le texte ?",
        options: ["Rompre l'isolement et créer une habitude collective", "Prévenir les maladies neurodégénératives", "Mesurer les performances cognitives", "Remplacer les soins médicaux"],
        correct: "A",
        explanation: "Les ateliers stimulent la mémoire, mais leur apport principal est social : rompre l'isolement.",
      },
    },
    {
      title: "Les bibliothèques d'objets",
      text: p(
        "Des bibliothèques d'objets prêtent des outils et du matériel de bricolage. Au lieu d'acheter un objet utilisé quelques fois, on l'emprunte pour une durée limitée. Ce service réduit les dépenses et les déchets.",
        "Il exige pourtant une gestion rigoureuse : vérification de l'état, entretien et responsabilité en cas de casse. Les structures qui réussissent s'appuient sur des bénévoles et un règlement clair.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle exigence de gestion le texte mentionne-t-il ?",
        options: ["La vérification de l'état et l'entretien des objets", "La vente des objets après usage", "La limitation aux objets neufs", "La suppression du règlement"],
        correct: "A",
        explanation: "Le prêt d'objets suppose de vérifier leur état, de les entretenir et d'assumer les casses.",
      },
    },
    {
      title: "Le covoiturage en zone rurale",
      text: p(
        "En zone rurale, les transports publics sont rares et les trajets coûtent cher. Des plateformes de covoiturage mettent en relation habitants et salariés. Le dispositif fonctionne s'il existe des points de rendez-vous identifiables et des horaires stables.",
        "La confiance entre usagers reste décisive. Les collectivités soutiennent ces initiatives, mais rappellent qu'elles ne remplacent pas une offre structurée.",
      ),
      question: {
        level: "B2",
        prompt: "Que rappellent les collectivités ?",
        options: ["Le covoiturage ne remplace pas une offre de transport structurée", "Le covoiturage doit devenir obligatoire", "Les habitants doivent acheter une voiture", "Les plateformes doivent être publiques"],
        correct: "A",
        explanation: "Les collectivités soutiennent le covoiturage tout en le présentant comme un complément, non un substitut.",
      },
    },
    {
      title: "L'agriculture biologique et ses rendements",
      text: p(
        "L'agriculture biologique se passe de pesticides de synthèse et d'engrais chimiques. Elle protège les sols et la biodiversité, mais ses rendements sont souvent inférieurs à ceux de l'agriculture conventionnelle.",
        "Comparer les seuls volumes produits est trompeur : il faut aussi tenir compte des coûts environnementaux évités. Le débat porte sur la manière de mesurer la performance.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi la comparaison des seuls rendements est-elle jugée trompeuse ?",
        options: ["Elle ignore les coûts environnementaux évités", "Elle favorise l'agriculture biologique", "Elle mesure trop de critères", "Elle concerne toutes les régions"],
        correct: "A",
        explanation: "Les chercheurs rappellent que les rendements ne disent rien des coûts environnementaux évités.",
      },
    },
    {
      title: "Le mentorat entre élèves",
      text: p(
        "Dans des collèges, des élèves de troisième aident des plus jeunes à organiser leur travail. Le mentorat ne remplace pas les enseignants : il porte sur les méthodes, la confiance et la gestion du temps.",
        "Les résultats sont encourageants, notamment pour les mentors, qui consolident leurs acquis. Le dispositif exige une formation et un cadre précis. Sans supervision, les relations deviennent inégalitaires.",
      ),
      question: {
        level: "B2",
        prompt: "Quel bénéfice le texte attribue-t-il aux élèves mentors ?",
        options: ["Ils consolident leurs propres acquis", "Ils remplacent les enseignants", "Ils obtiennent de meilleures notes sans effort", "Ils évitent toute formation"],
        correct: "A",
        explanation: "Le mentorat profite aussi aux mentors, qui renforcent leurs connaissances en aidant les plus jeunes.",
      },
    },
    {
      title: "L'open data municipal",
      text: p(
        "Les communes publient désormais des données sur leurs budgets et leurs marchés publics. Cette ouverture vise à renforcer la transparence. Dans les faits, les effets restent contrastés : les fichiers sont parfois incomplets, difficiles à interpréter ou diffusés sans mise à jour régulière.",
        "Les spécialistes rappellent que la donnée brute ne produit pas automatiquement la compréhension : elle doit être accompagnée d'explications et d'outils accessibles. Le risque est de créer une apparence de transparence qui décourage le débat au lieu de l'alimenter.",
        "Une politique d'open data réussie suppose donc des moyens humains et une attention aux publics qui ne maîtrisent pas les formats techniques. La transparence n'est pas un fichier mis en ligne ; c'est une relation à construire.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle condition l'auteur juge-t-il nécessaire pour une open data réussie ?",
        options: ["Accompagner les données d'explications et d'outils accessibles", "Publier uniquement les fichiers les plus récents", "Réserver les données aux spécialistes", "Supprimer les mises à jour régulières"],
        correct: "A",
        explanation: "L'auteur insiste sur l'accompagnement des données pour que la transparence nourrisse réellement le débat.",
      },
    },
    {
      title: "La biodiversité ordinaire",
      text: p(
        "La protection de la biodiversité évoque souvent des espèces rares. Or une part essentielle de la diversité se trouve dans les jardins, les bords de route et les parcs urbains. Ces milieux ordinaires accueillent insectes, oiseaux et plantes qui assurent des fonctions écologiques décisives : pollinisation, décomposition, régulation des ravageurs.",
        "Leur valeur dépend de leurs connexions. Un jardin isolé profite peu à la faune, tandis qu'un réseau de haies et de zones non tondues facilite les déplacements. Les chercheurs invitent donc à penser la biodiversité à l'échelle du paysage, et non seulement dans des réserves.",
        "Cette approche demande de renoncer à un entretien uniforme et d'accepter une part d'incertitude esthétique. Protéger le vivant, c'est réapprendre à cohabiter avec ce qui n'est pas spectaculaire.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle approche les chercheurs recommandent-ils ?",
        options: ["Penser la biodiversité à l'échelle du paysage et des connexions", "Concentrer les efforts sur les réserves lointaines", "Tondre régulièrement tous les espaces", "Introduire des espèces exotiques"],
        correct: "A",
        explanation: "Les chercheurs privilégient une approche paysagère qui relie les milieux ordinaires entre eux.",
      },
    },
    {
      title: "Le mécénat culturel",
      text: p(
        "Le mécénat privé est devenu une ressource pour les institutions culturelles. Les entreprises financent des expositions ou des programmes éducatifs, en échange d'une visibilité. Les partisans y voient un moyen de compenser la baisse des subventions publiques.",
        "Les critiques soulignent un risque de dépendance : les projets les plus visibles attirent les mécènes, tandis que la recherche et les artistes émergents restent fragiles. La question n'est pas de condamner le mécénat, mais d'examiner ses conditions.",
        "Une charte claire, des contreparties limitées et une programmation indépendante permettent de préserver la liberté des institutions. Sans ces garde-fous, le financement privé peut orienter les choix culturels. La légitimité du mécénat dépend de la transparence des accords.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque les critiques du mécénat soulignent-elles ?",
        options: ["Une dépendance qui favorise les projets les plus visibles", "Une baisse de la qualité artistique", "Une augmentation des subventions publiques", "Une interdiction des avantages fiscaux"],
        correct: "A",
        explanation: "Les critiques craignent que les projets visibles captent le financement privé au détriment des plus fragiles.",
      },
    },
    {
      title: "Orthographe et écriture numérique",
      text: p(
        "L'écriture numérique transforme les pratiques orthographiques. Les correcteurs automatiques signalent les fautes et les messageries encouragent l'abréviation. Certains observent un relâchement des règles, d'autres y voient une adaptation légitime à de nouveaux usages.",
        "La recherche invite à dépasser cette opposition. Les scripteurs ne font pas seulement des erreurs : ils opèrent des choix selon le destinataire, le support et l'objectif. Le risque n'est pas l'innovation en soi, mais l'inégalité devant la maîtrise des registres.",
        "Ceux qui n'ont pas appris à passer d'un style à l'autre sont pénalisés. L'école a ici un rôle décisif : elle ne doit pas imposer un unique modèle, mais rendre explicites les normes et leurs contextes. Apprendre l'orthographe, c'est aussi apprendre à choisir la langue que l'on écrit.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle position l'auteur adopte-t-il sur les pratiques numériques ?",
        options: ["Elles relèvent de choix selon le contexte, et l'enjeu est l'inégalité devant les registres", "Elles sont toutes des fautes à corriger", "Elles doivent remplacer les règles scolaires", "Elles concernent uniquement les messages privés"],
        correct: "A",
        explanation: "L'auteur analyse les pratiques numériques comme des choix contextuels et alerte sur l'inégalité des registres.",
      },
    },
    {
      title: "Le vieillissement actif",
      text: p(
        "Le vieillissement est souvent décrit comme un coût. Cette lecture masque des situations diverses : certains seniors restent en bonne santé et souhaitent s'engager, d'autres connaissent une perte d'autonomie précoce. Les politiques de vieillissement actif soutiennent la participation sociale et la formation.",
        "Leur succès dépend des conditions matérielles : transports, logements et services adaptés. L'injonction à rester actif devient alors une responsabilité individuelle pesant sur les mieux dotés. L'expérience des seniors n'est pas uniforme.",
        "Les parcours et les revenus produisent des inégalités durables. Une politique efficace doit donc combiner prévention, accompagnement et reconnaissance du soin. Vieillir n'est pas un problème à éliminer, mais une phase de vie dont les conditions se construisent collectivement.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle limite des politiques de vieillissement actif l'auteur souligne-t-il ?",
        options: ["Elles risquent de faire porter la responsabilité sur les individus déjà favorisés", "Elles interdisent toute activité physique", "Elles concernent uniquement les personnes malades", "Elles suppriment les services de proximité"],
        correct: "A",
        explanation: "Sans conditions matérielles, l'injonction à rester actif pèse surtout sur ceux qui ont déjà des ressources.",
      },
    },
    {
      title: "La réputation numérique",
      text: p(
        "La réputation était autrefois liée à un cercle limité de connaissances. Elle se construit aujourd'hui sous le regard d'algorithmes et de publics dispersés, qui peuvent consulter des traces anciennes. Cette transformation produit un effet ambivalent.",
        "D'un côté, elle permet de rendre visibles des comportements longtemps ignorés et d'ouvrir un espace de critique aux voix sans pouvoir. De l'autre, elle expose chacun à des jugements qui ne connaissent ni le contexte ni la possibilité de réparation. Une erreur de jeunesse peut devenir une étiquette durable.",
        "Les plateformes, en hiérarchisant les contenus, ne se contentent pas de refléter la réputation : elles la fabriquent. La question politique n'est donc pas de savoir si chacun mérite sa réputation, mais quelles garanties entourent sa formation. Droit à l'oubli, procédures de contestation et transparence des critères deviennent des conditions d'une réputation juste.",
      ),
      question: {
        level: "C2",
        prompt: "Quel rôle l'auteur attribue-t-il aux plateformes ?",
        options: ["Elles fabriquent la réputation en hiérarchisant les contenus", "Elles se contentent de refléter une réputation déjà établie", "Elles garantissent une réputation toujours juste", "Elles suppriment toutes les traces anciennes"],
        correct: "A",
        explanation: "L'auteur affirme que les plateformes, par leur classement des contenus, produisent la réputation au lieu de la refléter.",
      },
    },
    {
      title: "L'hospitalité comme devoir",
      text: p(
        "L'hospitalité est souvent réduite à une politesse ou à un service rendu. Elle engage pourtant une conception du rapport à l'étranger. Accueillir, ce n'est pas seulement ouvrir sa porte : c'est accepter que l'autre ne se conforme pas immédiatement à nos habitudes.",
        "L'hôte doit offrir sans exiger de gratitude excessive, mais il fixe aussi des limites, car une hospitalité sans règles devient une forme de désordre. Les philosophes ont souligné le paradoxe : l'hôte est à la fois celui qui donne et celui qui garde la maîtrise du lieu.",
        "Les sociétés contemporaines redécouvrent cette difficulté. Une hospitalité véritable suppose des espaces, du temps et des institutions capables de protéger celui qui arrive comme celui qui reçoit. Elle n'est pas un supplément moral, mais une manière d'organiser la coexistence. C'est pourquoi elle exige des règles communes qui rendent l'accueil possible sans transformer l'étranger en obligé.",
      ),
      question: {
        level: "C2",
        prompt: "Quel paradoxe de l'hospitalité l'auteur met-il en évidence ?",
        options: ["L'hôte donne tout en gardant la maîtrise du lieu", "L'hôte doit refuser toute règle", "L'étranger doit toujours remercier", "L'hospitalité supprime toute limite"],
        correct: "A",
        explanation: "L'auteur souligne que l'hôte offre l'accueil tout en conservant la maîtrise et les limites du lieu.",
      },
    },
    {
      title: "La traduction automatique",
      text: p(
        "Les logiciels de traduction automatique ont fait des progrès spectaculaires. Ils produisent désormais des textes fluides, souvent suffisants pour communiquer rapidement. Cette efficacité modifie les attentes : pourquoi confier une traduction à un professionnel si une machine propose une version immédiate ?",
        "La traduction automatique excelle dans les échanges standardisés, mais elle peine sur les textes où le sens dépend du rythme, de l'ambiguïté ou de la culture. Elle tend à lisser les écarts et à choisir la formulation la plus probable. Les traducteurs ne sont donc pas seulement des convertisseurs : ils interprètent, hésitent et assument des choix.",
        "Le risque n'est pas que la machine remplace toute traduction, mais qu'elle banalise une langue uniforme. Défendre la traduction humaine, c'est défendre une certaine idée de la diversité linguistique. L'enjeu est de savoir quelles œuvres et quelles voix méritent encore une attention particulière.",
      ),
      question: {
        level: "C2",
        prompt: "Quel risque l'auteur identifie-t-il dans la traduction automatique ?",
        options: ["Elle banalise une langue uniforme et efface certains choix d'auteur", "Elle est toujours incompréhensible", "Elle interdit toute communication rapide", "Elle remplace déjà tous les traducteurs"],
        correct: "A",
        explanation: "L'auteur craint une uniformisation de la langue qui efface l'interprétation et les choix propres aux traducteurs.",
      },
    },
    {
      title: "L'architecture et le temps long",
      text: p(
        "L'architecture contemporaine est souvent jugée à sa capacité à surprendre. Les concours récompensent des formes inédites et les bâtiments deviennent des objets de communication. Pourtant, un édifice ne se réduit pas à son apparence initiale. Il vieillit, se transforme, accueille des usages imprévus.",
        "Sa qualité se mesure aussi à sa capacité à supporter le temps : vieillir sans devenir obsolète, s'adapter sans perdre sa cohérence. Les architectes attentifs pensent donc moins à l'inauguration qu'à l'entretien. Ils choisissent des matériaux réparables, prévoient des espaces évolutifs et acceptent que l'usage modifie le projet.",
        "Cette humilité contrarie l'économie de la nouveauté. Elle suppose aussi des maîtres d'ouvrage attentifs au temps long. Le temps long n'est pas une nostalgie du passé : c'est une exigence de responsabilité. Un bâtiment durable est capable d'accueillir plusieurs vies sans être détruit.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle conception de la qualité architecturale l'auteur défend-il ?",
        options: ["Un bâtiment doit pouvoir vieillir et s'adapter sans perdre sa cohérence", "Seule l'apparence à l'inauguration compte", "Les bâtiments doivent être détruits souvent", "Les matériaux réparables sont inutiles"],
        correct: "A",
        explanation: "L'auteur valorise une architecture capable de durer, de s'adapter et d'accueillir des usages successifs.",
      },
    },
    {
      title: "L'abstention électorale",
      text: p(
        "L'abstention électorale est souvent interprétée comme un manque d'intérêt. Cette lecture rassure les institutions : elle transforme un problème collectif en défaut individuel. Les enquêtes montrent pourtant des logiques plus complexes.",
        "Certains électeurs s'abstiennent parce qu'ils ne se sentent représentés par aucune offre, d'autres parce que les procédures leur semblent inutiles, d'autres à cause d'obstacles pratiques. L'abstention n'est pas un bloc homogène. Elle peut exprimer une critique, une résignation ou une exclusion.",
        "Les démocraties qui veulent y répondre doivent donc agir sur plusieurs plans : accessibilité du vote, pluralité de l'offre, reconnaissance des formes d'engagement non partisanes. La question n'est pas seulement de faire revenir les abstentionnistes aux urnes, mais de savoir ce que leur absence révèle du fonctionnement démocratique. Une élection à laquelle beaucoup renoncent perd une part de sa légitimité.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi l'auteur refuse-t-il de réduire l'abstention à un manque d'intérêt ?",
        options: ["Parce qu'elle recouvre des causes diverses, notamment la non-représentation et les obstacles pratiques", "Parce que voter est inutile", "Parce que les abstentionnistes sont toujours critiques", "Parce que les élections sont illégitimes"],
        correct: "A",
        explanation: "L'auteur montre que l'abstention mêle non-représentation, sentiment d'inutilité, obstacles pratiques et exclusion.",
      },
    },
  ],
});
