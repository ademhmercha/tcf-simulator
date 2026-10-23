import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 8.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_08 = defineFullTest({
  number: 8,
  description:
    "Huitième examen blanc : un parcours complet du niveau A1 au niveau C2, avec des documents variés sur la vie locale, le travail, les sciences et les débats de société, dans les conditions du TCF Tout public.",
  listening: [
    {
      level: "A1",
      category: "culture",
      transcription:
        "Le château est ouvert tous les jours de dix heures à dix-huit heures. La dernière entrée a lieu une heure avant la fermeture. Les visites guidées partent à quatorze heures.",
      prompt: "À quelle heure a lieu la dernière entrée ?",
      options: ["À dix-sept heures", "À dix heures", "À dix-huit heures", "À quatorze heures"],
      correct: "A",
      explanation:
        "Le château ferme à dix-huit heures et la dernière entrée est autorisée une heure avant, soit à dix-sept heures.",
    },
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Le centre de loisirs propose un atelier de peinture mercredi à quatorze heures. Pensez à apporter un tablier et une vieille chemise. Les pinceaux et les couleurs sont fournis.",
      prompt: "Que faut-il apporter à l'atelier ?",
      options: ["Un tablier et une vieille chemise", "Des pinceaux", "De la peinture", "Un goûter"],
      correct: "A",
      explanation:
        "Le message demande d'apporter un tablier et une vieille chemise ; les pinceaux et les couleurs sont fournis.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Le supermarché est ouvert du lundi au samedi de huit heures à vingt heures. Le dimanche, il ferme à treize heures. Les commandes en ligne restent disponibles toute la journée.",
      prompt: "À quelle heure le supermarché ferme-t-il le dimanche ?",
      options: ["À treize heures", "À vingt heures", "À huit heures", "À dix-huit heures"],
      correct: "A",
      explanation:
        "Le message précise une fermeture à treize heures le dimanche, alors que le magasin reste ouvert jusqu'à vingt heures les autres jours.",
    },
    {
      level: "A2",
      category: "animaux",
      transcription:
        "Bonjour, c'est le cabinet vétérinaire. Le rendez-vous de jeudi à dix heures pour Médor est déplacé à vendredi seize heures. Merci de nous prévenir si ce créneau ne convient pas.",
      prompt: "Quand le rendez-vous est-il désormais fixé ?",
      options: ["Vendredi à seize heures", "Jeudi à dix heures", "Vendredi à dix heures", "Jeudi à seize heures"],
      correct: "A",
      explanation:
        "Le cabinet annonce le déplacement du rendez-vous à vendredi seize heures et invite à prévenir en cas d'empêchement.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Votre vol pour Lisbonne, prévu à quinze heures, est retardé d'une heure. L'embarquement se fera porte B douze. Nous vous prions de nous excuser pour ce désagrément.",
      prompt: "Quel est le nouvel horaire du vol ?",
      options: ["Seize heures", "Quinze heures", "Quatorze heures", "Dix-sept heures"],
      correct: "A",
      explanation:
        "Le vol prévu à quinze heures est retardé d'une heure : il partira donc à seize heures.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Bonjour, votre voiture de location est prête. Elle doit être rendue dimanche avant dix-huit heures, avec le plein d'essence. En cas de retard, des frais supplémentaires s'appliquent.",
      prompt: "Que doit faire le client avant de rendre la voiture ?",
      options: ["Faire le plein d'essence", "Laver le véhicule", "Changer les pneus", "Payer une assurance"],
      correct: "A",
      explanation:
        "Le message demande de rendre le véhicule avec le plein d'essence afin d'éviter des frais supplémentaires.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "La séance de cinéma en plein air aura lieu samedi à vingt et une heures sur la place du marché. L'entrée est gratuite pour les moins de douze ans et coûte quatre euros pour les autres.",
      prompt: "Qui entre gratuitement ?",
      options: ["Les enfants de moins de douze ans", "Tous les habitants", "Les étudiants", "Les personnes de plus de soixante ans"],
      correct: "A",
      explanation:
        "La gratuité est réservée aux enfants de moins de douze ans ; les autres spectateurs paient quatre euros.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Bonjour à tous, la réunion de l'équipe est déplacée dans la salle B, car la salle A est en travaux jusqu'à la fin du mois. L'horaire ne change pas : nous commençons à neuf heures.",
      prompt: "Pourquoi la réunion change-t-elle de salle ?",
      options: ["La salle habituelle est en travaux", "La salle B est plus grande", "L'horaire a été avancé", "Le nombre de participants augmente"],
      correct: "A",
      explanation:
        "La salle A, habituellement utilisée, est indisponible à cause de travaux jusqu'à la fin du mois.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "La résidence organise la vérification des détecteurs de fumée mardi entre neuf heures et midi. Merci de laisser l'accès à votre logement pendant cette période. Si vous êtes absent, contactez le gardien pour convenir d'un autre créneau.",
      prompt: "Que demande la résidence aux habitants ?",
      options: ["Laisser l'accès à leur logement", "Acheter un détecteur", "Appeler les pompiers", "Déménager temporairement"],
      correct: "A",
      explanation:
        "Les habitants doivent permettre l'accès à leur logement ; une autre date est possible en cas d'absence.",
    },
    {
      level: "B1",
      category: "santé",
      transcription:
        "Bonjour, le médicament que vous avez demandé n'est plus en stock. Nous l'avons commandé et il sera disponible demain après-midi. Vous pouvez le retirer au comptoir avec votre ordonnance.",
      prompt: "Quand le médicament sera-t-il disponible ?",
      options: ["Demain après-midi", "Ce soir", "Dans une semaine", "Demain matin"],
      correct: "A",
      explanation:
        "La pharmacie indique une disponibilité le lendemain après-midi, sur présentation de l'ordonnance.",
    },
    {
      level: "B1",
      category: "sport",
      transcription:
        "En raison des chutes de neige, la sortie en montagne de dimanche est annulée. Le club propose à la place une balade en forêt, sur un parcours facile de deux heures. Le départ reste fixé à neuf heures devant la mairie.",
      prompt: "Que propose le club à la place de la sortie en montagne ?",
      options: ["Une balade en forêt", "Une sortie à la piscine", "Un report au mois suivant", "Une réunion d'information"],
      correct: "A",
      explanation:
        "La sortie en montagne est remplacée par une balade en forêt de deux heures, au départ de la mairie.",
    },
    {
      level: "B1",
      category: "vie quotidienne",
      transcription:
        "La collecte des ordures ménagères est décalée à jeudi en raison du jour férié. Merci de sortir vos bacs mercredi soir après dix-neuf heures. Ils seront ramassés tôt le lendemain matin.",
      prompt: "Quand faut-il sortir les bacs ?",
      options: ["Le mercredi soir", "Le jeudi matin", "Le mardi soir", "Le jeudi soir"],
      correct: "A",
      explanation:
        "La collecte ayant lieu jeudi, les bacs doivent être sortis la veille au soir, après dix-neuf heures.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Notre accord d'entreprise instaure un compte épargne-temps. Les jours de congés non pris peuvent y être déposés et utilisés plus tard, par exemple pour un congé de formation. Le solde est toutefois plafonné à vingt jours ; au-delà, les jours doivent être consommés dans l'année.",
      prompt: "Quelle limite est prévue pour le compte épargne-temps ?",
      options: ["Le solde est plafonné à vingt jours", "Seuls les cadres peuvent l'utiliser", "Les jours sont perdus chaque mois", "Il ne finance pas les formations"],
      correct: "A",
      explanation:
        "L'accord fixe un plafond de vingt jours, au-delà duquel les jours doivent être utilisés dans l'année.",
    },
    {
      level: "B2",
      category: "environnement",
      transcription:
        "La ville installe des nichoirs à chauves-souris près des étangs. Ces animaux consomment chaque nuit une grande quantité d'insectes, notamment des moustiques. Les agents espèrent ainsi réduire les nuisances sans recourir à des traitements chimiques.",
      prompt: "Quel bénéfice la ville attend-elle de ces nichoirs ?",
      options: ["La réduction des moustiques sans produits chimiques", "L'augmentation du nombre de poissons", "La fermeture des étangs", "La vente des nichoirs aux habitants"],
      correct: "A",
      explanation:
        "Les chauves-souris mangent les moustiques, ce qui permet de limiter les nuisances sans traitements chimiques.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Les prix des fruits et légumes bio ont baissé de dix pour cent en un an, grâce à une logistique plus efficace et à des récoltes abondantes. Les consommateurs s'en félicitent, mais les producteurs redoutent une pression sur leurs marges, alors que leurs coûts de production restent élevés.",
      prompt: "Pourquoi les producteurs s'inquiètent-ils ?",
      options: ["La baisse des prix menace leurs marges", "Les récoltes sont trop faibles", "Les consommateurs refusent le bio", "La logistique coûte trop cher"],
      correct: "A",
      explanation:
        "Les producteurs craignent que la baisse des prix ne comprime leurs marges malgré des coûts de production élevés.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "L'université expérimente cette année des examens oraux en petits groupes. Les étudiants stressés peuvent demander un aménagement, comme un passage individuel ou un temps supplémentaire. Les enseignants espèrent ainsi mieux évaluer la capacité d'argumentation.",
      prompt: "Que peuvent demander les étudiants stressés ?",
      options: ["Un aménagement des conditions d'examen", "La suppression de l'oral", "Une note automatique", "Un changement de discipline"],
      correct: "A",
      explanation:
        "L'université prévoit des aménagements, tels qu'un passage individuel ou un temps supplémentaire.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le musée propose désormais des visites en langue des signes française. L'offre rencontre un vrai succès, mais elle reste limitée à deux rendez-vous par mois, faute de guides qualifiés. Le musée espère former de nouveaux intervenants l'an prochain.",
      prompt: "Quelle difficulté limite les visites en langue des signes ?",
      options: ["Le manque de guides qualifiés", "Le désintérêt du public", "Le prix des billets", "La fermeture du musée"],
      correct: "A",
      explanation:
        "Le musée ne propose que deux visites par mois, car les guides qualifiés en langue des signes sont trop peu nombreux.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "La région expérimente un abonnement unique pour le train et le bus, valable le week-end. L'offre vise les usagers occasionnels, qui renoncent souvent aux transports publics à cause de la multiplicité des tarifs. Si l'essai est concluant, le dispositif pourrait être étendu.",
      prompt: "À qui s'adresse principalement l'abonnement ?",
      options: ["Aux usagers occasionnels", "Aux scolaires uniquement", "Aux touristes étrangers", "Aux salariés à temps plein"],
      correct: "A",
      explanation:
        "L'abonnement cible les usagers occasionnels, découragés par la diversité des tarifs selon les réseaux.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Une étude montre que les abeilles se repèrent autant par des repères visuels que par les odeurs. Les chercheurs en déduisent que l'installation de haies et la diversité des paysages comptent autant que la richesse florale. Les politiques de protection devraient donc dépasser la seule question des pesticides.",
      prompt: "Quelle conclusion les chercheurs tirent-ils de l'étude ?",
      options: ["La protection des abeilles doit intégrer l'aménagement des paysages", "Les pesticides sont sans effet sur les abeilles", "Les odeurs sont le seul repère des abeilles", "Les haies nuisent à la biodiversité"],
      correct: "A",
      explanation:
        "Les chercheurs soulignent que les repères visuels dépendent des paysages, au-delà de la seule question des pesticides.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "L'économie circulaire progresse, mais se heurte à un obstacle peu visible : le cadre comptable des entreprises favorise encore l'achat de produits neufs. Un équipement réparé ou reconditionné est souvent amorti plus lentement qu'un équipement neuf, ce qui pénalise les choix durables. Des économistes réclament une réforme des règles fiscales.",
      prompt: "Quel obstacle freine l'économie circulaire ?",
      options: ["Un cadre comptable qui avantage le neuf", "Le refus des consommateurs de réparer", "L'absence de technologies disponibles", "La hausse du prix des matières premières"],
      correct: "A",
      explanation:
        "Le texte pointe des règles d'amortissement qui rendent le neuf plus avantageux que le matériel reconditionné.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "Les petites salles de concert indépendantes subissent la hausse des loyers et le durcissement des normes sonores. Pour résister, plusieurs d'entre elles se regroupent afin de mutualiser leurs moyens : achat commun de matériel, partage de la billetterie et négociation collective avec les pouvoirs publics.",
      prompt: "Quelle stratégie les salles adoptent-elles ?",
      options: ["Mutualiser leurs moyens", "Augmenter le prix des billets", "Fermer pendant l'été", "Diffuser uniquement des artistes locaux"],
      correct: "A",
      explanation:
        "Les salles se regroupent pour partager le matériel, la billetterie et les négociations avec les pouvoirs publics.",
    },
    {
      level: "C1",
      category: "études",
      transcription:
        "L'apprentissage par le jeu séduit les enseignants, qui y voient un levier de motivation. Les évaluations standardisées mesurent toutefois mal les compétences développées : coopération, créativité, persévérance. Certains chercheurs plaident pour des observations longues plutôt que pour des tests ponctuels.",
      prompt: "Quelle réserve est exprimée sur l'apprentissage par le jeu ?",
      options: ["Les évaluations standardisées ne rendent pas compte des compétences acquises", "Les jeux empêchent toute motivation", "Les enseignants refusent cette méthode", "Les élèves apprennent trop lentement"],
      correct: "A",
      explanation:
        "Le texte regrette que les tests standardisés ne mesurent pas les compétences développées par le jeu.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "La curiosité n'est pas un appétit de nouveauté. Elle suppose la patience de revenir aux mêmes questions et d'accepter de ne pas conclure trop vite. Le zapping permanent la simule : il change d'objet sans approfondir, produisant l'impression de découvrir alors qu'il ne fait que survoler. Une curiosité véritable accepte l'ennui et la durée.",
      prompt: "Quelle distinction l'orateur établit-il ?",
      options: ["Entre la curiosité véritable et la recherche de nouveauté", "Entre les savants et les ignorants", "Entre l'ennui et la paresse", "Entre la lecture et le zapping"],
      correct: "A",
      explanation:
        "L'orateur oppose la curiosité patiente, qui approfondit, à la simple recherche de nouveauté que simule le zapping.",
    },
    {
      level: "C2",
      category: "environnement",
      transcription:
        "La restauration des zones humides présente un double bénéfice : elle stocke du carbone et régule les crues. Son succès dépend pourtant moins des techniques que de l'adhésion des agriculteurs, qui exploitent souvent ces terres. Les projets réussis associent les exploitants dès la conception et s'inscrivent dans un horizon de long terme.",
      prompt: "Quelle condition est décisive pour réussir la restauration ?",
      options: ["L'adhésion des agriculteurs et un horizon de long terme", "L'achat de toutes les terres par l'État", "La suppression de l'agriculture locale", "Une intervention rapide et ponctuelle"],
      correct: "A",
      explanation:
        "Le texte insiste sur l'association des agriculteurs dès la conception et sur la durée des projets.",
    },
    {
      level: "C2",
      category: "littérature",
      transcription:
        "La critique littéraire ne doit pas expliquer l'œuvre comme on résout une énigme. Son rôle est de rendre sensible son fonctionnement : la manière dont une phrase construit une attente, dont un personnage se dérobe, dont un détail revient. L'interprétation abusive, qui prétend dire ce que le texte cache, finit par écraser le texte sous la théorie du critique.",
      prompt: "Quelle conception de la critique est défendue ?",
      options: ["Une critique qui éclaire le fonctionnement du texte sans l'écraser", "Une critique qui révèle le secret caché de l'œuvre", "Une critique qui résume l'intrigue", "Une critique qui juge la morale des personnages"],
      correct: "A",
      explanation:
        "L'orateur préfère une critique attentive au fonctionnement du texte plutôt qu'une interprétation abusive.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Nous ___ le train de huit heures chaque matin.",
      options: ["prenons", "prenait", "prendrons", "prenions"],
      correct: "A",
      explanation: "Le présent de l'indicatif convient à une habitude : « nous prenons le train chaque matin ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Pour cette recette, il faut ___ farine et un peu de sucre.",
      options: ["de la", "du", "des", "la"],
      correct: "A",
      explanation: "« Farine » est un nom féminin singulier : on emploie l'article partitif « de la ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Hier, pendant que je ___ le dîner, le téléphone a sonné.",
      options: ["préparais", "ai préparé", "préparerai", "prépares"],
      correct: "A",
      explanation: "L'imparfait décrit l'action en cours au moment où le téléphone a sonné.",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Ces photographies, je ___ ai montrées à ma sœur.",
      options: ["les", "leur", "lui", "en"],
      correct: "A",
      explanation: "« Les » remplace le COD pluriel « ces photos » ; le participe s'accorde au féminin pluriel.",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous nous sommes inscrits ___ cours de natation.",
      options: ["au", "du", "à la", "dans le"],
      correct: "A",
      explanation: "On s'inscrit « à » un cours ; « à le » se contracte obligatoirement en « au ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le village ___ je suis né a beaucoup changé.",
      options: ["où", "que", "dont", "lequel"],
      correct: "A",
      explanation: "« Où » complète « né » et indique le lieu ; « que » serait un COD.",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Cette salle est ___ spacieuse que la précédente : on y tient deux fois plus de tables.",
      options: ["plus", "moins", "aussi", "très"],
      correct: "A",
      explanation: "La seconde proposition indique une capacité supérieure : la salle est « plus spacieuse ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Quand la réunion commencera, vendredi, nous ___ ce dossier.",
      options: ["aurons terminé", "terminerons", "avons terminé", "terminions"],
      correct: "A",
      explanation: "L'action sera achevée avant un repère futur : on emploie le futur antérieur « aurons terminé ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Il m'a promis qu'il ___ avant midi.",
      options: ["arriverait", "arrive", "arrivera", "arrivât"],
      correct: "A",
      explanation: "Après un verbe introducteur au passé, le futur devient futur du passé : « il arriverait ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il est indispensable que vous ___ vos billets à l'avance.",
      options: ["réserviez", "réservez", "réserverez", "réserver"],
      correct: "A",
      explanation: "« Il est indispensable que » exige le subjonctif présent : « que vous réserviez ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Le musée est gratuit le premier dimanche du mois, ___ il est payant le reste du temps.",
      options: ["tandis qu'", "parce qu'", "afin qu'", "pourvu qu'"],
      correct: "A",
      explanation:
        "« Tandis que » exprime l'opposition entre deux situations ; les autres locutions marquent la cause, le but ou la condition.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Les nouvelles mesures ___ par le conseil dès demain.",
      options: ["seront appliquées", "appliqueront", "seront appliquer", "ont appliqué"],
      correct: "A",
      explanation: "Le complément d'agent « par le conseil » impose la voix passive au futur : « seront appliquées ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Il m'a expliqué qu'il ___ ce dossier la veille.",
      options: ["avait préparé", "a préparé", "préparera", "prépare"],
      correct: "A",
      explanation: "Au discours indirect au passé, « la veille » situe l'action avant l'énoncé : plus-que-parfait « avait préparé ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ les instructions, elle a assemblé les pièces sans difficulté.",
      options: ["En suivant", "Suivant", "Ayant suivi", "Suivre"],
      correct: "A",
      explanation: "Le gérondif exprime la manière et se forme avec « en » suivi du participe présent : « en suivant ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ de l'accord a été retardée par des désaccords.",
      options: ["signature", "signer", "signé", "signataire"],
      correct: "A",
      explanation: "Le nom dérivé du verbe « signer » est « la signature » ; les autres formes ne conviennent pas ici.",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "S'ils avaient réservé, ils ___ éviter la file d'attente.",
      options: ["auraient pu", "pouvaient", "pourraient", "peuvent"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé associe le plus-que-parfait au conditionnel passé : « ils auraient pu ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Le rapport ___ les principales causes de l'accident.",
      options: ["recense", "récuse", "recèle", "relègue"],
      correct: "A",
      explanation:
        "« Recenser » signifie dresser la liste ; « récuser » veut dire rejeter, « receler » contenir caché et « reléguer » écarter.",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Bien qu'elle ___ tous les documents, elle n'a pas obtenu le visa.",
      options: ["ait fourni", "a fourni", "avait fourni", "fournira"],
      correct: "A",
      explanation: "« Bien que » exige le subjonctif ; l'action passée impose le subjonctif passé « ait fourni ».",
    },
    {
      level: "C2",
      category: "syntaxe",
      prompt: "Sitôt ___ , il a repris la route.",
      options: ["arrivé", "arriver", "arrivait", "arrivant"],
      correct: "A",
      explanation: "« Sitôt » suivi d'un participe passé exprime l'antériorité immédiate : « sitôt arrivé ».",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "Il a accepté, ___ il eût préféré attendre.",
      options: ["encore qu'", "alors qu'", "puisqu'", "après qu'"],
      correct: "A",
      explanation:
        "« Encore qu' » introduit une restriction au subjonctif ; « alors que », « puisque » et « après qu' » demandent l'indicatif.",
    },
  ],
  reading: [
    {
      title: "La grainothèque",
      text: p(
        "La médiathèque a installé une grainothèque. Les usagers peuvent y prendre gratuitement des graines de légumes ou de fleurs. Il suffit de noter la variété choisie dans le cahier. Après la récolte, chacun est invité à rapporter des graines.",
      ),
      question: {
        level: "B1",
        prompt: "Que sont invités à faire les usagers après la récolte ?",
        options: ["Rapporter des graines", "Acheter des plants", "Nettoyer les bacs", "S'inscrire à un atelier"],
        correct: "A",
        explanation: "Le texte demande aux usagers de rapporter des graines après leur récolte pour alimenter le stock.",
      },
    },
    {
      title: "Prêt de raquettes",
      text: p(
        "Le club de tennis prête des raquettes aux habitants. Le prêt est gratuit pour sept jours, renouvelable une fois. Il faut laisser une pièce d'identité à l'accueil et rendre le matériel propre. Toute raquette endommagée doit être signalée.",
      ),
      question: {
        level: "B1",
        prompt: "Que faut-il laisser à l'accueil pour emprunter une raquette ?",
        options: ["Une pièce d'identité", "Une caution en espèces", "Un justificatif de domicile", "Une raquette personnelle"],
        correct: "A",
        explanation: "Le club exige une pièce d'identité, conservée à l'accueil pendant la durée du prêt.",
      },
    },
    {
      title: "Le vélo-bus",
      text: p(
        "Deux lignes de vélo-bus desservent les écoles. Encadrés par des parents bénévoles, les enfants suivent à pied un itinéraire fixe. Le départ a lieu à huit heures quinze devant la mairie. Les familles intéressées peuvent inscrire leur enfant.",
      ),
      question: {
        level: "B1",
        prompt: "Qui encadre les enfants pendant le trajet ?",
        options: ["Des parents bénévoles", "Des policiers municipaux", "Des enseignants", "Des animateurs salariés"],
        correct: "A",
        explanation: "Le texte précise que le vélo-bus est encadré par des parents bénévoles tout au long du parcours.",
      },
    },
    {
      title: "La boîte à livres",
      text: p(
        "Une boîte à livres est installée dans le parc. Chacun peut y déposer des ouvrages en bon état et en prendre librement. Les manuels scolaires et les magazines abîmés sont refusés. La boîte est vérifiée chaque semaine par les agents du parc.",
      ),
      question: {
        level: "B1",
        prompt: "Que peut-on déposer dans la boîte ?",
        options: ["Des livres en bon état", "Tous les magazines", "Des manuels scolaires", "Des objets divers"],
        correct: "A",
        explanation: "Seuls les ouvrages en bon état sont acceptés ; les manuels scolaires et magazines abîmés sont exclus.",
      },
    },
    {
      title: "Tournoi d'échecs",
      text: p(
        "Le club d'échecs organise un tournoi samedi à la maison des associations. Les inscriptions se font avant vendredi à l'accueil. Les parties durent trente minutes. Les débutants sont les bienvenus ; un atelier d'initiation est prévu le matin.",
      ),
      question: {
        level: "B1",
        prompt: "Quand faut-il s'inscrire ?",
        options: ["Avant vendredi", "Samedi matin", "Après le tournoi", "Le jour de la finale"],
        correct: "A",
        explanation: "Les inscriptions doivent être déposées auprès de l'accueil avant vendredi, le tournoi ayant lieu samedi.",
      },
    },
    {
      title: "Des micro-forêts en ville",
      text: p(
        "Planter des forêts minuscules en ville séduit de nombreuses communes. Cette approche densifie les plantations afin d'accélérer la croissance et d'abriter une biodiversité variée.",
        "Les spécialistes appellent pourtant à la prudence. Une micro-forêt exige un arrosage suivi et un sol adapté ; sans entretien, elle dépérit. Elle ne remplace pas les grands espaces verts, seuls capables de rafraîchir durablement un quartier.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle réserve les spécialistes expriment-ils ?",
        options: ["L'entretien nécessaire et la taille limitée des micro-forêts", "Le coût trop élevé des graines", "Le refus des habitants", "La dangerosité des essences plantées"],
        correct: "A",
        explanation: "Les spécialistes rappellent que les micro-forêts demandent un entretien suivi et ne remplacent pas les grands espaces verts.",
      },
    },
    {
      title: "Les magasins de producteurs",
      text: p(
        "Les magasins de producteurs se multiplient. Des agriculteurs louent ensemble un local et vendent directement leurs récoltes, sans intermédiaire.",
        "Le modèle reste exigeant. Il faut organiser les permanences, répartir les tâches et gérer les invendus. Certains magasins échouent faute d'accord entre les adhérents. Pour durer, ces collectifs doivent inventer une gouvernance claire.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté de fonctionnement le texte souligne-t-il ?",
        options: ["L'organisation collective des permanences et des stocks", "Le refus des consommateurs", "La hausse des prix imposée par les intermédiaires", "L'interdiction de vendre en ligne"],
        correct: "A",
        explanation: "Le texte insiste sur la répartition des tâches, les permanences et la gestion des invendus au sein du collectif.",
      },
    },
    {
      title: "Le mentorat en entreprise",
      text: p(
        "De plus en plus d'entreprises proposent du mentorat à leurs jeunes recrues. Un salarié expérimenté accompagne un débutant : il transmet des savoir-faire et ouvre son réseau.",
        "Les effets sont inégaux. Les jeunes qui osent demander un mentor progressent. Ceux qui n'osent pas restent à l'écart. Pour éviter que le dispositif ne renforce les écarts, certaines directions désignent elles-mêmes les binômes.",
      ),
      question: {
        level: "B2",
        prompt: "Quel risque le texte met-il en évidence ?",
        options: ["Que le mentorat accentue les inégalités entre salariés", "Que les mentors quittent l'entreprise", "Que les jeunes refusent toute formation", "Que le dispositif coûte trop cher"],
        correct: "A",
        explanation: "Le texte montre que seuls les jeunes qui osent demander un mentor en profitent, ce qui peut renforcer les écarts.",
      },
    },
    {
      title: "Les cinémas de quartier",
      text: p(
        "Les petits cinémas de quartier résistent. Face aux plateformes, ils misent sur des films anciens, des documentaires et des séances suivies de débats.",
        "Cette stratégie a un coût. Les équipements numériques sont onéreux et les salles réclament des aides publiques. Leur survie dépend de leur capacité à rester des espaces de discussion.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les petits cinémas tentent-ils de résister ?",
        options: ["En misant sur une programmation originale et des échanges", "En diffusant les mêmes films que les plateformes", "En supprimant les débats", "En augmentant le nombre de salles"],
        correct: "A",
        explanation: "Ils privilégient des films anciens, des documentaires et des séances suivies de débats pour offrir une expérience collective.",
      },
    },
    {
      title: "Les marchés nocturnes",
      text: p(
        "La ville autorise des marchés nocturnes sur les quais. Les artisans y présentent leurs produits jusqu'à vingt-trois heures, dans une ambiance musicale.",
        "Les commerçants du centre-ville craignent que ces marchés ne captent leur clientèle du soir. La mairie promet une évaluation avant de reconduire l'expérience.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle crainte les commerçants du centre-ville expriment-ils ?",
        options: ["Perdre une partie de leur clientèle du soir", "Ne pas pouvoir ouvrir le soir", "La hausse des loyers", "L'absence de musique"],
        correct: "A",
        explanation: "Les commerçants redoutent que les marchés nocturnes leur prennent une partie de la clientèle du soir.",
      },
    },
    {
      title: "Les fermes pédagogiques",
      text: p(
        "Les fermes pédagogiques accueillent des classes. Les élèves y nourrissent les animaux, sèment et observent les saisons.",
        "L'accueil reste limité. Les règles sanitaires et le besoin de personnel restreignent les visites. Certaines fermes refusent les grands groupes ou demandent une participation financière.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle contrainte limite l'accueil des classes ?",
        options: ["Les règles sanitaires et le besoin de personnel", "Le désintérêt des enseignants", "L'interdiction de sortir de l'école", "Le manque d'animaux"],
        correct: "A",
        explanation: "Les normes sanitaires et la mobilisation de personnel pendant la visite restreignent l'accueil des groupes scolaires.",
      },
    },
    {
      title: "Le bénévolat des retraités",
      text: p(
        "Les retraités forment une part importante des bénévoles associatifs. Leur expérience est précieuse, notamment pour la gestion administrative.",
        "Pour les fidéliser, les associations doivent les accompagner : formation aux outils numériques, binôme et temps de repos. Sans cela, les départs se multiplient.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi dépend la fidélisation des bénévoles retraités ?",
        options: ["D'un accompagnement et de conditions adaptées", "De la suppression des outils numériques", "D'une rémunération mensuelle", "De la réduction du nombre d'adhérents"],
        correct: "A",
        explanation: "Le texte montre que la formation, le travail en binôme et le respect du repos favorisent la fidélité des bénévoles.",
      },
    },
    {
      title: "Les cafés associatifs",
      text: p(
        "Les cafés associatifs se développent dans les bourgs ruraux. Ils proposent un lieu de rencontre, des ateliers et un petit service de restauration.",
        "Leur équilibre financier reste fragile : les recettes ne suffisent pas aux charges et les subventions sont incertaines. Les bénévoles peinent à se renouveler.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle fragilité des cafés associatifs le texte décrit-il ?",
        options: ["Un financement incertain et un bénévolat difficile à renouveler", "Une fréquentation trop forte", "Une offre de restauration trop chère", "Un refus des collectivités de les autoriser"],
        correct: "A",
        explanation: "Le texte souligne des recettes insuffisantes, des subventions incertaines et un renouvellement difficile des bénévoles.",
      },
    },
    {
      title: "Les bibliothèques de jouets",
      text: p(
        "Les bibliothèques de jouets prêtent jeux, puzzles et déguisements aux familles. Cela prolonge la vie des objets et permet d'essayer avant d'acheter.",
        "Chaque jouet doit être vérifié, nettoyé et compté au retour. Les pièces manquantes limitent les prêts et le travail des bénévoles est considérable. Ce contrôle demande plusieurs heures chaque semaine.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle contrainte de fonctionnement est soulignée ?",
        options: ["Le contrôle et le nettoyage des jouets", "Le prix élevé des jeux neufs", "Le refus des parents de rendre les jeux", "L'interdiction de prêter des déguisements"],
        correct: "A",
        explanation: "Chaque jouet doit être vérifié, nettoyé et compté, ce qui demande beaucoup de temps aux bénévoles.",
      },
    },
    {
      title: "Les ateliers d'écriture",
      text: p(
        "Les ateliers d'écriture se multiplient dans les bibliothèques. On y écrit à partir de consignes brèves, puis on lit son texte au groupe.",
        "Le cadre est bienveillant et la lecture est facultative. Ces ateliers permettent à des personnes éloignées de l'écrit de s'exprimer. Ils dépendent de subventions et d'intervenants peu disponibles.",
      ),
      question: {
        level: "B2",
        prompt: "Quel apport des ateliers d'écriture est mis en avant ?",
        options: ["Ils aident des personnes éloignées de l'écrit à s'exprimer", "Ils préparent à des examens officiels", "Ils remplacent les cours de français", "Ils publient les textes des participants"],
        correct: "A",
        explanation: "Le cadre bienveillant des ateliers permet à des personnes éloignées de l'écrit de raconter et de reprendre confiance.",
      },
    },
    {
      title: "La gratuité des musées",
      text: p(
        "La gratuité des musées est souvent présentée comme solution à la démocratisation culturelle. Elle augmente le nombre de visites, mais surtout chez des publics déjà familiers : étudiants, enseignants, retraités. Ceux qui ne vont jamais au musée ne changent guère leurs habitudes.",
        "Le prix n'est qu'un obstacle parmi d'autres : horaires, distance, sentiment d'illégitimité. Une exposition gratuite reste inaccessible si l'on ignore qu'elle existe ou si l'on craint de ne pas comprendre.",
        "La gratuité n'est donc pas inutile, mais elle ne suffit pas. Elle doit s'associer à un travail de médiation, à des partenariats avec les écoles et les associations. Cette démarche reste indispensable.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la gratuité ne suffit-elle pas à démocratiser les musées ?",
        options: ["Elle attire surtout des publics déjà familiers des institutions", "Elle réduit trop fortement les recettes", "Elle décourage les étudiants", "Elle supprime les expositions temporaires"],
        correct: "A",
        explanation: "Le texte montre que la gratuité augmente les visites sans élargir vraiment le public, car les nouveaux venus restent rares.",
      },
    },
    {
      title: "Le dernier kilomètre",
      text: p(
        "Le dernier kilomètre de livraison concentre les nuisances urbaines. Camionnettes en double file, moteurs au ralenti, colis devant les portes : le commerce en ligne transforme les rues en entrepôts improvisés. Les villes cherchent des solutions, mais aucune ne s'impose.",
        "Les points relais et les consignes réduisent les tournées, mais déplacent la contrainte vers l'usager. La livraison à vélo cargo fonctionne dans les centres denses, à condition de fragmenter les chargements.",
        "Aucune innovation ne suffira sans coordination. Les entrepôts, les horaires et l'occupation de la voirie relèvent de décisions publiques, tandis que les flux dépendent d'acteurs privés concurrents. Sans règles communes, chaque opérateur optimise son trajet au détriment de l'espace partagé.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle condition les solutions de livraison exigent-elles selon l'auteur ?",
        options: ["Une coordination entre acteurs publics et privés", "La suppression du commerce en ligne", "La fin des points relais", "L'augmentation du nombre de camionnettes"],
        correct: "A",
        explanation: "L'auteur conclut qu'aucune technique ne suffira sans règles communes entre pouvoirs publics et opérateurs privés.",
      },
    },
    {
      title: "La transmission des langues régionales",
      text: p(
        "La transmission des langues régionales ne se joue pas seulement à l'école. Une langue survit parce qu'elle est parlée dans les familles, les commerces et les lieux de sociabilité. L'enseignement peut la soutenir, mais il ne peut pas compenser seul la rupture de la transmission quotidienne.",
        "Les politiques publiques ont longtemps privilégié le cadre scolaire, plus visible. Les effectifs progressent dans certaines régions, tandis que le nombre de locuteurs naturels continue de baisser.",
        "Les spécialistes plaident pour une approche globale : formation des enseignants, émissions de radio, panneaux bilingues, soutien aux associations et reconnaissance des locuteurs âgés. La langue doit devenir audible dans l'espace public.",
      ),
      question: {
        level: "C1",
        prompt: "Quel enjeu central le texte met-il en avant ?",
        options: ["La transmission familiale et quotidienne des langues, au-delà de l'école", "La suppression de l'enseignement scolaire", "La hausse des effectifs dans toutes les régions", "L'interdiction des panneaux bilingues"],
        correct: "A",
        explanation: "Le texte affirme que l'école ne peut compenser seule la rupture de la transmission familiale et quotidienne.",
      },
    },
    {
      title: "Philanthropie et décision publique",
      text: p(
        "La philanthropie est souvent célébrée comme un signe de générosité. Les dons privés financent des musées, des recherches médicales ou des programmes éducatifs.",
        "Lorsqu'un donateur finance un programme public, il influence des choix qui relèvent normalement de la délibération collective. Les priorités des fondations ne sont pas nécessairement celles de la population et leur pouvoir échappe au contrôle électoral. La contrepartie fiscale transforme une décision privée en dépense supportée par tous.",
        "La philanthropie ne dispense pas de transparence. Connaître l'origine des fonds et les critères de sélection devient une condition de légitimité. Elle peut enrichir le débat public à condition de ne pas le privatiser silencieusement.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque politique la philanthropie fait-elle peser ?",
        options: ["Une influence privée sur des choix publics sans contrôle électoral", "Une baisse automatique des dons", "La suppression de la générosité individuelle", "Une hausse incontrôlée des impôts locaux"],
        correct: "A",
        explanation: "Le texte souligne qu'un donateur peut orienter des décisions publiques sans que son pouvoir soit soumis au vote.",
      },
    },
    {
      title: "La qualité de l'air intérieur",
      text: p(
        "Nous passons l'essentiel de notre temps à l'intérieur, mais la qualité de l'air des logements, des écoles et des bureaux reste mal connue. Les polluants y sont nombreux : produits d'entretien, peintures, moisissures, cuisson.",
        "Lorsque l'air extérieur est mauvais, on invite à fermer ses fenêtres. Or cette recommandation, utile en cas de pic, aggrave parfois la concentration de polluants intérieurs. Aérer reste nécessaire, même en ville, à condition d'adapter les moments et la durée.",
        "Les solutions existent : ventilation mécanique, matériaux moins émissifs, entretien régulier. Elles supposent une information des occupants et une attention des propriétaires. L'air intérieur doit être considéré comme un enjeu de santé publique.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la qualité de l'air intérieur est-elle peu prise en compte ?",
        options: ["Ses effets sont différés et difficiles à percevoir", "Elle est toujours meilleure qu'à l'extérieur", "Les habitants refusent toute mesure", "Les matériaux modernes ne polluent pas"],
        correct: "A",
        explanation: "Le texte explique que les effets sanitaires apparaissent après des années et restent invisibles au quotidien.",
      },
    },
    {
      title: "La gratuité et ses coûts cachés",
      text: p(
        "La gratuité est souvent présentée comme un idéal. Dire qu'un service est gratuit masque un déplacement de coûts. Ce que l'usager ne paie pas directement est financé par l'impôt, par la publicité ou par le travail non rémunéré.",
        "Un service peut être gratuit à l'entrée tout en reposant sur un financement collectif. L'essentiel est que ce transfert soit visible.",
        "Le danger commence lorsque la gratuité devient un argument de communication. Elle donne l'impression d'un don, alors qu'elle organise un partage de coûts dont les bénéficiaires et les contributeurs ne sont pas les mêmes. Les plateformes numériques illustrent ce phénomène : leurs services paraissent gratuits parce que la valeur est extraite ailleurs, dans les données et l'attention. Cette mise en visibilité est la condition d'un débat démocratique.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle est la thèse centrale de l'auteur ?",
        options: ["La gratuité déplace les coûts et doit rendre visible leur répartition", "La gratuité est toujours une illusion dangereuse", "Les services gratuits n'ont aucun coût réel", "Seule la publicité peut financer les services publics"],
        correct: "A",
        explanation: "L'auteur ne condamne pas la gratuité : il demande que le transfert de coûts qu'elle organise soit reconnu et discuté.",
      },
    },
    {
      title: "L'architecture inachevée",
      text: p(
        "Un bâtiment n'est jamais seulement ce que ses concepteurs avaient prévu. Les usagers déplacent les meubles, percent des cloisons, transforment un bureau en atelier ou un entrepôt en salle de concert. Ces appropriations font partie de la vie de l'architecture.",
        "Les architectes ont cherché à prévoir ces évolutions par la flexibilité : cloisons mobiles, réseaux accessibles, plateaux libres. Mais cette flexibilité peut produire des espaces neutres où rien ne suggère comment habiter. À l'inverse, un bâtiment très déterminé peut être détourné avec inventivité.",
        "Il ne s'agit pas seulement de rendre les bâtiments transformables, mais de leur donner assez de qualités pour que les habitants aient envie de les transformer. La lumière, les proportions, la possibilité de se rencontrer comptent davantage que la promesse d'un plan modulable. Une architecture durable accepte d'être inachevée par ses auteurs.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle idée l'auteur défend-il sur l'architecture ?",
        options: ["L'usage réel réinvente le bâtiment au-delà du plan des concepteurs", "Seule la flexibilité technique garantit un bon bâtiment", "Les usagers dégradent toujours les lieux conçus pour eux", "Un bâtiment doit rester totalement neutre"],
        correct: "A",
        explanation: "L'auteur montre que les habitants transforment les lieux et que cette appropriation fait partie de la vie du bâtiment.",
      },
    },
    {
      title: "Vulgariser sans trahir",
      text: p(
        "La vulgarisation scientifique vise à rendre simple ce qui est complexe. En supprimant les nuances, les incertitudes et les désaccords, elle donne une image faussement assurée de la science.",
        "Les chercheurs qui vulgarisent doivent choisir des métaphores, des exemples, des raccourcis. Ces choix ne sont pas neutres : une comparaison commode peut devenir une explication définitive.",
        "Une bonne vulgarisation ne consiste pas à abaisser le niveau, mais à rendre accessible la structure d'un raisonnement. Elle montre comment une conclusion a été obtenue, quelles données la soutiennent et quelles questions restent ouvertes. Le public doit comprendre comment les scientifiques travaillent et pourquoi ils peuvent se tromper et se corriger. Elle ne promet pas la certitude, mais elle rend le doute intelligible et partageable.",
      ),
      question: {
        level: "C2",
        prompt: "Quel risque de la vulgarisation l'auteur souligne-t-il ?",
        options: ["Faire oublier les nuances et les incertitudes de la science", "Rendre la science inaccessible au grand public", "Empêcher les chercheurs de publier", "Remplacer les articles scientifiques par des romans"],
        correct: "A",
        explanation: "L'auteur craint qu'une simplification excessive ne donne une image trop assurée et fasse disparaître les incertitudes.",
      },
    },
    {
      title: "Le patrimoine immatériel en question",
      text: p(
        "Le patrimoine immatériel désigne des pratiques vivantes : fêtes, savoir-faire, musiques, recettes. Sa reconnaissance a permis de protéger des traditions longtemps négligées.",
        "La patrimonialisation transforme ce qu'elle protège. Une pratique doit être décrite, documentée, mise en scène. Ses détenteurs deviennent des représentants. La transmission se trouve réorganisée autour d'événements et de financements.",
        "Certaines communautés utilisent la reconnaissance pour obtenir des moyens et défendre leurs droits. D'autres constatent que la mise en valeur attire un public qui ne partage ni les codes ni les responsabilités de la pratique. Le risque est la confusion entre une culture qui vit et une culture qui s'expose.",
        "Les spécialistes proposent donc de privilégier les conditions concrètes de transmission plutôt que les listes et les labels. Une pratique ne survit pas parce qu'elle est classée, mais parce que des personnes continuent de la pratiquer et de la transmettre.",
      ),
      question: {
        level: "C2",
        prompt: "Quel risque la patrimonialisation fait-elle courir selon l'auteur ?",
        options: ["Figer une pratique vivante en spectacle documenté", "Faire disparaître les institutions internationales", "Interdire aux communautés de transmettre leurs savoirs", "Refuser toute ouverture au public"],
        correct: "A",
        explanation: "L'auteur distingue la culture vivante de la culture exposée et redoute qu'un label ne transforme la pratique en démonstration figée.",
      },
    },
    {
      title: "Transparence et secret",
      text: p(
        "La transparence est devenue une exigence presque incontestable. Les institutions doivent publier leurs décisions et expliquer leurs critères. Le secret a longtemps protégé des abus, mais la transparence totale n'est pas toujours compatible avec la qualité de la décision publique.",
        "Une négociation menée sous les projecteurs se transforme en spectacle. Les participants défendent des positions plutôt que de chercher des compromis. Un espace de délibération à l'abri du regard permet parfois d'explorer des solutions impopulaires avant de les assumer publiquement. Le secret n'est pas un privilège, mais une condition temporaire du travail collectif.",
        "L'exception est difficile à borner. Qui décide de ce qui doit rester confidentiel ? Sans contrôle, l'espace protégé devient un refuge commode. La solution consiste à articuler délibérations protégées et obligation de rendre compte.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle position l'auteur défend-il ?",
        options: ["Articuler des délibérations protégées et une obligation de rendre compte", "Supprimer toute forme de secret dans l'État", "Confier le secret aux seuls journalistes", "Renoncer à la transparence au nom de l'efficacité"],
        correct: "A",
        explanation: "L'auteur refuse l'alternative simple et propose de protéger certaines délibérations tout en imposant ensuite une reddition de comptes.",
      },
    },
  ],
});
