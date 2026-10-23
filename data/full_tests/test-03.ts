import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 3.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_03 = defineFullTest({
  number: 3,
  description:
    "Troisième examen blanc complet : trois épreuves enchaînées, du niveau A1 au niveau C2, dans les conditions du TCF Tout public.",
  listening: [
    {
      level: "A1",
      category: "services",
      transcription:
        "La poste est fermée mercredi après-midi pour une formation du personnel. Elle rouvre jeudi à neuf heures. Les colis peuvent être retirés à l'agence de la gare.",
      prompt: "Quand la poste rouvre-t-elle ?",
      options: ["Mercredi après-midi", "Jeudi à neuf heures", "Vendredi à midi", "Jeudi à quatorze heures"],
      correct: "B",
      explanation: "L'annonce précise une réouverture jeudi à neuf heures après la fermeture du mercredi.",
    },
    {
      level: "A1",
      category: "transports",
      transcription:
        "À partir de lundi, le ticket de bus coûte un euro cinquante. Vous pouvez aussi acheter vos trajets sur l'application de la ville.",
      prompt: "Combien coûte le ticket de bus ?",
      options: ["Un euro", "Un euro cinquante", "Deux euros", "Cinquante centimes"],
      correct: "B",
      explanation: "Le nouveau tarif annoncé est d'un euro cinquante par ticket.",
    },
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Salut, pour mon anniversaire, je t'attends dimanche à quinze heures au parc. Apporte un ballon si tu en as un. On mangera un gâteau ensemble.",
      prompt: "Où se déroule l'anniversaire ?",
      options: ["Au parc", "À la maison", "Au restaurant", "À la piscine"],
      correct: "A",
      explanation: "L'invitation fixe le rendez-vous au parc dimanche à quinze heures.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Bonjour, le plombier passera mardi entre huit heures et dix heures. Merci de laisser le code de l'immeuble à l'accueil. Il interviendra dans la salle de bain.",
      prompt: "Quand le plombier viendra-t-il ?",
      options: ["Mardi matin", "Mardi après-midi", "Mercredi matin", "Lundi soir"],
      correct: "A",
      explanation: "Le rendez-vous est fixé mardi entre huit heures et dix heures, donc le matin.",
    },
    {
      level: "A2",
      category: "achats",
      transcription:
        "Bonjour, je viens chercher le gâteau commandé pour vendredi. — Il sera prêt jeudi soir. Voulez-vous toujours le chocolat ?",
      prompt: "Quel gâteau le client a-t-il commandé ?",
      options: ["Au chocolat", "Aux fruits", "À la vanille", "Au citron"],
      correct: "A",
      explanation: "La boulangère demande si le client veut toujours le gâteau au chocolat.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Le train de seize heures quarante-cinq partira finalement voie sept, et non voie deux. Les voyageurs sont priés de se rendre au quai sans délai.",
      prompt: "Quel est le nouveau quai ?",
      options: ["Le quai deux", "Le quai sept", "Le quai six", "Le quai seize"],
      correct: "B",
      explanation: "Le train part désormais voie sept au lieu de la voie deux initialement prévue.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Pour ce traitement, prenez un comprimé chaque matin après le petit-déjeuner. Si la douleur persiste après trois jours, consultez votre médecin.",
      prompt: "Quand faut-il prendre le comprimé ?",
      options: ["Le matin après le repas", "Le soir avant de dormir", "À midi", "Toutes les deux heures"],
      correct: "A",
      explanation: "Le pharmacien recommande un comprimé le matin, après le petit-déjeuner.",
    },
    {
      level: "B1",
      category: "études",
      transcription:
        "Pendant la période des examens, la bibliothèque universitaire restera ouverte jusqu'à minuit. Les salles de travail seront accessibles sur réservation, par tranches de deux heures.",
      prompt: "Que faut-il faire pour utiliser les salles de travail ?",
      options: ["Réserver un créneau", "Payer une cotisation", "Présenter sa carte d'étudiant", "Arriver avant midi"],
      correct: "A",
      explanation: "L'accès aux salles se fait sur réservation, par tranches de deux heures.",
    },
    {
      level: "B1",
      category: "transports",
      transcription:
        "Je t'attends devant la gare depuis dix minutes. Le covoiturage a du retard à cause des travaux. Je te préviens dès que la voiture arrive.",
      prompt: "Pourquoi la personne attend-elle ?",
      options: ["Le train est annulé", "Le covoiturage a du retard", "Elle a oublié l'heure", "La gare est fermée"],
      correct: "B",
      explanation: "Le message signale un retard du covoiturage causé par des travaux.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Le chauffage de votre immeuble sera coupé vendredi de neuf heures à midi pour une intervention technique. Le technicien n'aura pas besoin d'entrer dans les appartements.",
      prompt: "Quelle sera la conséquence de l'intervention ?",
      options: ["Le chauffage sera coupé", "L'eau sera coupée", "Les appartements seront inspectés", "L'ascenseur sera réparé"],
      correct: "A",
      explanation: "Le message annonce une coupure de chauffage vendredi matin.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "Votre carte de fidélité du cinéma est arrivée à son cinquième passage. Votre prochaine séance est donc gratuite, valable jusqu'à la fin du mois.",
      prompt: "Quel avantage la carte offre-t-elle ?",
      options: ["Une séance gratuite", "Une réduction sur les boissons", "Un abonnement annuel", "Une place réservée"],
      correct: "A",
      explanation: "Le cinquième passage déclenche une séance gratuite valable jusqu'à la fin du mois.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "Le musée est gratuit le premier dimanche du mois, mais la réservation en ligne est obligatoire. Les visites guidées affichent complet deux semaines à l'avance.",
      prompt: "Quelle formalité est obligatoire ?",
      options: ["Réserver en ligne", "Payer l'entrée", "Réserver une visite guidée", "Arriver avant midi"],
      correct: "A",
      explanation: "L'entrée est gratuite, mais une réservation en ligne reste indispensable.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "Votre rapport de stage doit être déposé lundi avant midi. Envoyez-le au format PDF à votre tuteur et à l'administration. Les documents remis en retard ne seront pas évalués cette session.",
      prompt: "Quel format est exigé ?",
      options: ["Un fichier PDF", "Un document papier", "Une présentation orale", "Un tableur"],
      correct: "A",
      explanation: "Le rapport doit être envoyé au format PDF au tuteur et à l'administration.",
    },
    {
      level: "B2",
      category: "restauration",
      transcription:
        "Notre carte de printemps propose désormais trois plats végétariens. Les produits viennent de fermes voisines et changent chaque semaine. Les réservations sont conseillées le week-end.",
      prompt: "Qu'est-ce qui change chaque semaine ?",
      options: ["Les produits proposés", "Les horaires d'ouverture", "Le nombre de tables", "Les prix des boissons"],
      correct: "A",
      explanation: "Le restaurant précise que les produits de fermes voisines changent chaque semaine.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "La ville organise mardi une réunion publique sur le plan vélo. Les habitants pourront consulter les tracés envisagés et proposer des aménagements. Un registre sera également ouvert en mairie pendant un mois.",
      prompt: "Que pourront faire les habitants lors de la réunion ?",
      options: ["Présenter et discuter le plan vélo", "Vendre des vélos", "Fermer des rues", "Élire un responsable"],
      correct: "A",
      explanation: "La réunion permet de consulter les tracés et de proposer des aménagements.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "À partir de septembre, les salariés pourront télétravailler deux jours par semaine, à condition que leur équipe soit présente au moins trois jours sur site. Les demandes seront validées par le responsable.",
      prompt: "Quelle condition encadre le télétravail ?",
      options: ["L'équipe doit être présente trois jours sur site", "Le salarié doit habiter loin", "Le responsable doit télétravailler aussi", "Les demandes sont automatiques"],
      correct: "A",
      explanation: "Le télétravail est possible si l'équipe assure au moins trois jours de présence sur site.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Pour donner votre sang, il faut avoir entre dix-huit et soixante-dix ans, peser au moins cinquante kilos et ne pas avoir été malade récemment. Un entretien confidentiel précède le prélèvement.",
      prompt: "Quelle condition est nécessaire pour donner son sang ?",
      options: ["Peser au moins cinquante kilos", "Avoir moins de dix-huit ans", "Être à jeun depuis douze heures", "Avoir déjà donné son sang"],
      correct: "A",
      explanation: "Le message mentionne un poids minimum de cinquante kilos parmi les conditions.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "La nouvelle saison du podcast consacré à l'histoire locale est disponible. Chaque épisode dure vingt minutes et s'appuie sur des archives sonores. Une rencontre avec les auteurs aura lieu à la médiathèque.",
      prompt: "Sur quoi repose le podcast ?",
      options: ["Des archives sonores", "Des entretiens filmés", "Des romans historiques", "Des photographies"],
      correct: "A",
      explanation: "Le podcast s'appuie sur des archives sonores pour raconter l'histoire locale.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "Le débat sur le salaire minimum ne porte pas seulement sur son montant. Il engage aussi la manière dont on mesure la productivité, la protection des emplois peu qualifiés et le coût pour les petites entreprises. Les économistes eux-mêmes divergent sur les effets d'une hausse, faute de données comparables entre secteurs.",
      prompt: "Pourquoi les économistes divergent-ils ?",
      options: ["Les données comparables entre secteurs manquent", "Ils refusent de mesurer la productivité", "Les petites entreprises n'existent pas", "Le salaire minimum est identique partout"],
      correct: "A",
      explanation: "L'absence de données comparables entre secteurs explique en partie les désaccords.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Les indicateurs de biodiversité sont souvent réduits au nombre d'espèces présentes. Or cette mesure ignore l'abondance, la répartition et les interactions entre espèces. Un milieu peut compter de nombreuses espèces rares tout en étant fragile, ou peu d'espèces abondantes mais stables. Les écologues plaident pour des indicateurs multiples.",
      prompt: "Que reprochent les écologues aux indicateurs actuels ?",
      options: ["Ils ignorent l'abondance et les interactions", "Ils mesurent trop de paramètres", "Ils favorisent les espèces rares", "Ils sont trop coûteux à produire"],
      correct: "A",
      explanation: "Le nombre d'espèces ne renseigne ni sur l'abondance, ni sur la répartition, ni sur les interactions.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "L'installation de caméras à reconnaissance faciale dans les établissements scolaires suscite une vive opposition. Ses promoteurs invoquent la sécurité et la rapidité des contrôles d'accès. Les juristes rappellent que la surveillance des mineurs exige des garanties renforcées et que l'efficacité n'est pas démontrée.",
      prompt: "Quel argument les juristes opposent-ils aux promoteurs ?",
      options: ["La surveillance des mineurs exige des garanties renforcées", "Les caméras coûtent trop cher", "Les contrôles sont déjà rapides", "Les élèves refusent l'école"],
      correct: "A",
      explanation: "Les juristes soulignent l'exigence de garanties renforcées pour surveiller des mineurs.",
    },
    {
      level: "C1",
      category: "littérature",
      transcription:
        "Retraduire les classiques n'est pas un aveu d'échec. Chaque époque découvre dans une œuvre des accents qu'elle n'entendait plus. La nouvelle traduction ne remplace pas l'ancienne : elle propose une lecture, située dans une langue et un moment. Les éditeurs qui publient plusieurs versions rendent visible cette pluralité.",
      prompt: "Quelle conception de la retraduction le locuteur défend-il ?",
      options: ["Chaque traduction propose une lecture située", "Une seule traduction doit être conservée", "Les classiques ne doivent plus être traduits", "La traduction la plus ancienne est la meilleure"],
      correct: "A",
      explanation: "Le locuteur présente chaque traduction comme une lecture liée à une époque et à une langue.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "Le pardon est souvent compris comme l'oubli de l'offense. Cette conception le rend à la fois admirable et suspect : oublier, n'est-ce pas cesser de reconnaître la gravité du tort ? Une autre approche consiste à maintenir la mémoire de l'offense tout en renonçant à la vengeance. Le pardon ne nie pas le mal ; il refuse d'en faire le seul horizon de la relation.",
      prompt: "Quelle conception du pardon l'orateur défend-il ?",
      options: ["Un pardon qui garde la mémoire du tort sans vengeance", "Un pardon qui efface totalement l'offense", "Un pardon qui justifie l'offense", "Un pardon qui exige une réparation financière"],
      correct: "A",
      explanation: "L'orateur distingue le pardon de l'oubli et le définit comme renoncement à la vengeance.",
    },
    {
      level: "C2",
      category: "politique",
      transcription:
        "Le compromis est parfois présenté comme une trahison des convictions. Cette critique suppose que la politique serait l'application de principes purs. Or gouverner consiste à arbitrer entre des biens concurrents, dans un monde où les conséquences ne sont jamais entièrement prévisibles. Le compromis n'est pas l'abandon de la valeur ; il est souvent la condition de sa réalisation partielle.",
      prompt: "Quelle idée l'orateur conteste-t-il ?",
      options: ["Que le compromis trahisse nécessairement les convictions", "Que gouverner exige des arbitrages", "Que les conséquences soient imprévisibles", "Que la politique concerne des biens concurrents"],
      correct: "A",
      explanation: "L'orateur rejette l'idée que tout compromis serait une trahison des convictions.",
    },
    {
      level: "C2",
      category: "environnement",
      transcription:
        "La décroissance est souvent réduite à une nostalgie de la pénurie. Ses partisans répondent qu'elle ne consiste pas à produire moins de tout, mais à interroger la finalité de la production. Certains secteurs devraient croître, comme la santé ou la rénovation énergétique, tandis que d'autres devraient diminuer. Le débat porte donc moins sur la quantité que sur les choix collectifs qu'elle suppose.",
      prompt: "Selon les partisans, sur quoi porte réellement le débat ?",
      options: ["Sur les choix collectifs et la finalité de la production", "Sur la quantité totale à produire", "Sur le retour à la pénurie", "Sur la suppression de la santé"],
      correct: "A",
      explanation: "Ils déplacent la question de la quantité vers la finalité et les choix collectifs.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Tu ___ souvent chez tes grands-parents ?",
      options: ["vas", "va", "allons", "allez"],
      correct: "A",
      explanation: "Le sujet « tu » impose la deuxième personne du singulier : « tu vas ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Nous avons acheté ___ fruits pour le dessert.",
      options: ["des", "de", "du", "le"],
      correct: "A",
      explanation: "L'article indéfini pluriel « des » convient devant un nom comptable au pluriel.",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Ils ___ à la mer chaque été quand ils étaient enfants.",
      options: ["allaient", "vont", "sont allés", "iront"],
      correct: "A",
      explanation: "L'imparfait exprime une habitude passée : « ils allaient chaque été ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Ces photos, je ___ ai montrées à ma sœur.",
      options: ["les", "leur", "lui", "en"],
      correct: "A",
      explanation: "« Les » remplace le COD pluriel « ces photos » : « je les ai montrées ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Il a commencé ___ apprendre le piano à six ans.",
      options: ["à", "de", "en", "pour"],
      correct: "A",
      explanation: "Le verbe « commencer » se construit avec « à » devant un infinitif.",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Cette salle est ___ grande que la précédente : elle accueille deux fois plus de monde.",
      options: ["plus", "moins", "aussi", "très"],
      correct: "A",
      explanation: "La capacité double indique une taille supérieure : « plus grande ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le film ___ nous avons parlé hier sort demain.",
      options: ["dont", "que", "qui", "où"],
      correct: "A",
      explanation: "Le verbe « parler de » appelle le pronom « dont » : « le film dont nous avons parlé ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Quand tu ___ ton travail, tu pourras sortir.",
      options: ["auras fini", "finiras", "finissais", "as fini"],
      correct: "A",
      explanation: "Après « quand », l'action antérieure à un futur se met au futur antérieur : « auras fini ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Je souhaite que vous ___ ce document avant lundi.",
      options: ["signiez", "signez", "signerez", "signiez pas"],
      correct: "A",
      explanation: "« Souhaiter que » exige le subjonctif présent : « que vous signiez ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Il a accepté le poste ___ le salaire soit plus faible.",
      options: ["bien que", "parce que", "donc", "car"],
      correct: "A",
      explanation: "« Bien que » introduit une concession suivie du subjonctif « soit ».",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "La décision ___ par le conseil municipal la semaine dernière.",
      options: ["a été prise", "a pris", "est prise", "prendra"],
      correct: "A",
      explanation: "Le complément d'agent « par le conseil » impose la voix passive au passé composé.",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ la porte, il a aperçu son voisin.",
      options: ["En ouvrant", "Ouvrant", "Ayant ouvert", "Ouvrir"],
      correct: "A",
      explanation: "Le gérondif exprime la simultanéité et se forme avec « en » : « en ouvrant ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Elle m'a demandé où je ___ habiter l'année suivante.",
      options: ["voulais", "veux", "voudrai", "veuille"],
      correct: "A",
      explanation: "Au discours indirect au passé, le présent « veux » devient « voulais ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "L'association ___ je participe organise un concert.",
      options: ["à laquelle", "que", "dont", "où"],
      correct: "A",
      explanation: "Le verbe « participer à » appelle « à laquelle », accordé avec « l'association ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "À peine ___ -il prononcé son nom que tout le monde se leva.",
      options: ["eut", "a", "avait", "fut"],
      correct: "A",
      explanation: "Le passé antérieur « eut prononcé » marque l'antériorité immédiate dans un récit au passé simple.",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ de cette loi a nécessité plusieurs mois de débats.",
      options: ["adoption", "adopter", "adopté", "adoptif"],
      correct: "A",
      explanation: "Le nom correspondant au verbe « adopter » est « l'adoption ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Si nous ___ plus tôt, nous aurions trouvé des places.",
      options: ["étions partis", "partions", "sommes partis", "partirions"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé associe le plus-que-parfait au conditionnel passé.",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "La direction a ___ les conclusions de l'enquête.",
      options: ["contesté", "contestée", "contester", "contestant"],
      correct: "A",
      explanation: "Le COD « les conclusions » est placé après le verbe : le participe reste invariable.",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "Sitôt ___ -il arrivé que la réunion commença.",
      options: ["fut", "était", "est", "sera"],
      correct: "A",
      explanation: "Le passé antérieur « fut arrivé » exprime une action immédiatement antérieure au passé simple.",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "___ ses efforts, il n'a pas obtenu la bourse.",
      options: ["Malgré", "Bien que", "Quoique", "Parce que"],
      correct: "A",
      explanation: "« Malgré » introduit un nom, alors que « bien que » et « quoique » exigent un verbe.",
    },
  ],
  reading: [
    {
      title: "Règlement du parking de la gare",
      text: p(
        "Le parking de la gare est réservé aux voyageurs munis d'un titre de transport. Le stationnement est gratuit pendant trente minutes, puis facturé un euro par heure. Les abonnés doivent afficher leur badge derrière le pare-brise.",
      ),
      question: {
        level: "B1",
        prompt: "Que doivent faire les abonnés ?",
        options: ["Afficher leur badge derrière le pare-brise", "Payer un euro par heure", "Garer leur véhicule trente minutes", "Présenter un titre de transport"],
        correct: "A",
        explanation: "Le règlement impose aux abonnés d'afficher leur badge de façon visible.",
      },
    },
    {
      title: "Menu de la cantine",
      text: p(
        "Cette semaine, la cantine propose un menu végétarien mardi et jeudi. Les élèves qui souhaitent une autre option doivent s'inscrire avant lundi midi. Les allergènes sont indiqués sur le panneau à l'entrée du réfectoire.",
      ),
      question: {
        level: "B1",
        prompt: "Que doivent faire les élèves qui veulent une autre option ?",
        options: ["S'inscrire avant lundi midi", "Apporter leur repas", "Prévenir le jour même", "Consulter le panneau des allergènes"],
        correct: "A",
        explanation: "Une inscription est exigée avant lundi midi pour choisir une autre option.",
      },
    },
    {
      title: "Coupure d'eau programmée",
      text: p(
        "En raison de travaux, l'eau sera coupée mercredi de neuf heures à seize heures dans les rues du Centre et des Écoles. Les habitants sont invités à faire des réserves la veille. Un point d'eau sera installé place de la Mairie.",
      ),
      question: {
        level: "B1",
        prompt: "Quelle mesure est prise pour les habitants ?",
        options: ["Un point d'eau est installé", "Les rues sont fermées", "L'eau est gratuite", "Les commerces ferment"],
        correct: "A",
        explanation: "La ville installe un point d'eau place de la Mairie pendant la coupure.",
      },
    },
    {
      title: "Le club de lecture",
      text: p(
        "Le club de lecture se réunit le premier jeudi du mois à la bibliothèque. Le livre du mois est disponible au prêt dès le quinze. Les participants sont invités à préparer trois passages qu'ils ont particulièrement appréciés.",
      ),
      question: {
        level: "B1",
        prompt: "Que doivent préparer les participants ?",
        options: ["Trois passages appréciés", "Une fiche de lecture", "Un résumé du livre", "Une question à l'auteur"],
        correct: "A",
        explanation: "Il est demandé de choisir trois passages que les participants ont aimés.",
      },
    },
    {
      title: "Location de vélos",
      text: p(
        "L'office de tourisme loue des vélos de neuf heures à dix-huit heures. La location coûte huit euros la demi-journée. Une pièce d'identité et une caution de cent euros sont exigées. Les vélos doivent être rendus avant la fermeture.",
      ),
      question: {
        level: "B1",
        prompt: "Que faut-il laisser pour louer un vélo ?",
        options: ["Une caution de cent euros", "Un passeport", "Une carte bancaire", "Un justificatif de domicile"],
        correct: "A",
        explanation: "La location exige une pièce d'identité et une caution de cent euros.",
      },
    },
    {
      title: "Une prime pour le vélo électrique",
      text: p(
        "La ville accorde une prime de quatre cents euros à l'achat d'un vélo électrique. Pour en bénéficier, il faut résider dans la commune et renoncer à une voiture ancienne. Le budget annuel est toutefois limité et les demandes sont traitées par ordre d'arrivée.",
        "Les associations cyclistes saluent le dispositif, mais regrettent qu'il profite surtout aux ménages déjà équipés. Elles réclament une aide à la location longue durée, plus accessible.",
      ),
      question: {
        level: "B2",
        prompt: "Que reprochent les associations au dispositif ?",
        options: ["Il profite surtout aux ménages déjà équipés", "Il est trop généreux", "Il exclut les voitures récentes", "Il ne concerne que les touristes"],
        correct: "A",
        explanation: "Les associations estiment que la prime bénéficie d'abord aux foyers déjà motorisés.",
      },
    },
    {
      title: "Zones à faibles émissions",
      text: p(
        "Plusieurs métropoles ont créé des zones à faibles émissions pour améliorer l'air. Les véhicules les plus anciens y sont interdits en semaine, sauf dérogation pour certains artisans.",
        "Les élus défendent une mesure sanitaire, mais les automobilistes modestes dénoncent le coût du renouvellement. Les aides existent, mais restent insuffisantes pour les véhicules les plus polluants. La réussite dépendra des alternatives de transport proposées.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi dépend la réussite du dispositif selon le texte ?",
        options: ["Des transports alternatifs proposés", "Du prix des voitures neuves", "Du nombre d'artisans", "De la météo"],
        correct: "A",
        explanation: "Le texte conclut que la réussite dépendra des alternatives de transport offertes.",
      },
    },
    {
      title: "Cours en ligne : l'autonomie en question",
      text: p(
        "Les universités ont développé des cours en ligne pour compléter l'enseignement présentiel. Les étudiants apprécient la souplesse, mais beaucoup décrochent faute d'accompagnement. Les taux de réussite varient selon les disciplines.",
        "Les pédagogues recommandent des échéances régulières et des temps d'échange. Ils rappellent que l'autonomie ne se décrète pas : elle s'apprend, et les étudiants les moins préparés sont ceux qui en bénéficient le moins.",
      ),
      question: {
        level: "B2",
        prompt: "Que rappellent les pédagogues ?",
        options: ["L'autonomie s'apprend et profite inégalement", "Les cours en ligne sont inutiles", "Les étudiants sont tous autonomes", "Les échéances doivent être supprimées"],
        correct: "A",
        explanation: "Ils soulignent que l'autonomie s'apprend et que les moins préparés en profitent le moins.",
      },
    },
    {
      title: "Une maison de santé à la campagne",
      text: p(
        "Un village a ouvert une maison de santé réunissant médecin, infirmière et kinésithérapeute. Le projet a nécessité deux ans de négociations et l'aide de la région pour rénover un bâtiment.",
        "Les habitants apprécient de ne plus parcourir trente kilomètres pour consulter. Les professionnels, eux, évoquent des journées longues et des difficultés à recruter. La structure améliore l'accès aux soins, mais elle ne suffit pas à résoudre la pénurie médicale.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle limite la maison de santé rencontre-t-elle ?",
        options: ["Des difficultés à recruter", "Un manque de patients", "Des locaux trop petits", "Le refus de la région"],
        correct: "A",
        explanation: "Les professionnels signalent des journées longues et des recrutements difficiles.",
      },
    },
    {
      title: "Le festival de rue",
      text: p(
        "Chaque été, le festival de rue investit les places du centre. Les spectacles sont gratuits, financés par la ville et des partenaires privés. Les commerçants profitent de l'affluence, mais des habitants se plaignent du bruit.",
        "Les organisateurs ont réduit les horaires du soir et créé une scène à l'écart des logements. Ils veulent ainsi préserver l'esprit populaire de l'événement tout en limitant les nuisances.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les organisateurs ont-ils répondu aux plaintes ?",
        options: ["En réduisant les horaires et déplaçant une scène", "En rendant le festival payant", "En supprimant les spectacles", "En fermant le centre-ville"],
        correct: "A",
        explanation: "Ils ont limité les horaires en soirée et éloigné une scène des logements.",
      },
    },
    {
      title: "Le commerce équitable se professionnalise",
      text: p(
        "Les produits du commerce équitable gagnent des parts de marché. Les labels se multiplient, ce qui complique la compréhension des consommateurs. Les producteurs bénéficient de prix garantis, mais les coûts de certification restent élevés.",
        "Les associations demandent une harmonisation des critères et un soutien aux petites coopératives. Sans cela, il risque de favoriser les structures déjà organisées, au détriment des plus fragiles.",
      ),
      question: {
        level: "B2",
        prompt: "Quel risque les associations soulignent-elles ?",
        options: ["Favoriser les coopératives déjà organisées", "Réduire le nombre de labels", "Baisser les prix garantis", "Interdire les certifications"],
        correct: "A",
        explanation: "Les coûts de certification pourraient avantager les structures les plus solides.",
      },
    },
    {
      title: "Vrac : moins d'emballages",
      text: p(
        "Le vrac permet d'acheter des aliments sans emballage. Les clients apportent leurs contenants et paient au poids. Le modèle séduit, mais se heurte à des contraintes d'hygiène et de logistique.",
        "Les gérants doivent former le personnel, contrôler les stocks et gérer des contenants variés. Les consommateurs hésitent parfois à changer leurs habitudes. Le vrac réduit les déchets, mais ne peut se généraliser sans accompagnement.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle contrainte le vrac impose-t-il aux magasins ?",
        options: ["Adapter l'hygiène et la logistique", "Augmenter les emballages", "Vendre uniquement des produits secs", "Supprimer la pesée"],
        correct: "A",
        explanation: "Le modèle exige des adaptations en matière d'hygiène, de formation et de gestion des stocks.",
      },
    },
    {
      title: "Orientation : accompagner les choix",
      text: p(
        "La plateforme d'orientation centralise les vœux des lycéens. Elle facilite la comparaison des formations, mais ne remplace pas le conseil personnalisé.",
        "Les établissements ont renforcé les ateliers d'accompagnement. Les résultats restent inégaux selon les territoires, car les équipes n'ont pas les mêmes moyens. La question n'est donc pas seulement technique : elle touche l'égalité d'accès à l'information.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les résultats de l'accompagnement sont-ils inégaux ?",
        options: ["Les équipes n'ont pas les mêmes moyens", "Les élèves refusent les ateliers", "La plateforme est payante", "Les formations sont identiques"],
        correct: "A",
        explanation: "Les moyens des équipes varient selon les territoires, ce qui crée des inégalités.",
      },
    },
    {
      title: "Télétravailler à l'étranger",
      text: p(
        "Le télétravail depuis un autre pays séduit certains salariés. Les entreprises doivent vérifier les règles fiscales et sociales, qui varient selon la durée du séjour. Des accords bilatéraux facilitent certains cas, mais restent limités.",
        "Les juristes conseillent des séjours courts et une déclaration préalable. Ils rappellent qu'un salarié peut être imposable dans deux pays et que l'employeur engage sa responsabilité.",
      ),
      question: {
        level: "B2",
        prompt: "Que conseillent les juristes ?",
        options: ["Des séjours courts et une déclaration préalable", "Une installation définitive à l'étranger", "L'absence de déclaration", "Un contrat verbal"],
        correct: "A",
        explanation: "Ils recommandent de limiter la durée et d'informer l'employeur avant le départ.",
      },
    },
    {
      title: "Les chorales amateurs",
      text: p(
        "Les chorales amateurs se multiplient dans les villes et les villages. Elles attirent des publics de tous âges et offrent un espace de rencontre qui dépasse la musique.",
        "Leur financement reste fragile. Les subventions diminuent, les salles sont partagées et les bénévoles assurent une part croissante du travail. Celles qui durent s'appuient sur un réseau local solide, plutôt que sur un seul financeur.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi dépend la pérennité des chorales selon le texte ?",
        options: ["D'un réseau local solide", "D'un financeur unique", "De la taille de la salle", "Du nombre de bénévoles"],
        correct: "A",
        explanation: "Les chorales durables s'appuient sur un réseau local plutôt que sur un financeur unique.",
      },
    },
    {
      title: "Le droit à l'erreur",
      text: p(
        "Plusieurs administrations expérimentent un droit à l'erreur pour les usagers de bonne foi. L'objectif est de corriger une déclaration inexacte sans sanction immédiate, à condition de régulariser spontanément la situation. Le dispositif vise à restaurer la confiance entre administration et citoyens.",
        "Les agents y voient une simplification, mais craignent une surcharge. Les associations d'usagers demandent que le droit soit étendu aux erreurs de bonne foi dans les dossiers complexes. Des juristes rappellent toutefois qu'il ne doit pas couvrir la fraude.",
        "La portée du dispositif dépend de sa mise en œuvre. Une procédure lisible et rapide peut réduire les litiges ; une procédure obscure risque de décourager ceux qu'elle prétend protéger. Le droit à l'erreur n'est donc pas seulement une règle, c'est une pratique administrative à construire.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle condition encadre le droit à l'erreur ?",
        options: ["Régulariser spontanément la situation", "Payer une amende préalable", "Renoncer à toute réclamation", "Prouver l'absence de bonne foi"],
        correct: "A",
        explanation: "Le dispositif s'applique aux usagers de bonne foi qui régularisent spontanément leur situation.",
      },
    },
    {
      title: "Neutralité du web : un principe menacé",
      text: p(
        "La neutralité du réseau impose aux fournisseurs d'accès de traiter tous les flux de la même manière. Ce principe a permis l'émergence de services innovants sans autorisation préalable. Il est aujourd'hui contesté par certains opérateurs qui souhaitent financer leurs infrastructures par des péages.",
        "Les défenseurs de la neutralité répondent que la différenciation favorise les acteurs capables de payer, au détriment des petits éditeurs et des usages non commerciaux. Ils admettent pourtant que la croissance du trafic pose un problème de coût, qu'une régulation transparente pourrait traiter.",
        "Le débat révèle un désaccord sur la nature d'internet. Un réseau de services différenciés peut être plus efficace, mais il n'est plus un espace commun. Choisir, c'est décider quel type d'infrastructure la société souhaite financer collectivement.",
      ),
      question: {
        level: "C1",
        prompt: "Quel désaccord de fond le débat révèle-t-il ?",
        options: ["La nature d'internet comme espace commun ou service différencié", "Le prix des abonnements", "La vitesse des connexions", "Le nombre de fournisseurs d'accès"],
        correct: "A",
        explanation: "Le texte oppose un espace commun à un réseau de services différenciés.",
      },
    },
    {
      title: "Écrans à l'école : au-delà du pour et du contre",
      text: p(
        "Les débats sur le numérique à l'école opposent souvent partisans et adversaires des écrans. Les études disponibles montrent des effets variables selon les usages, les disciplines et l'accompagnement des enseignants. Un logiciel d'entraînement n'agit pas comme un tableau interactif ou une recherche documentaire.",
        "Les chercheurs recommandent donc de raisonner en termes de situations pédagogiques. L'outil peut alléger certaines tâches, mais il peut aussi détourner l'attention s'il n'est pas intégré à une intention claire. La formation des enseignants apparaît comme un facteur décisif.",
        "La question des inégalités reste centrale. Les élèves qui disposent d'un accompagnement familial utilisent mieux les ressources numériques. Sans politique volontariste, l'école risque d'ajouter une nouvelle source d'écart plutôt que de la réduire.",
      ),
      question: {
        level: "C1",
        prompt: "Que recommandent les chercheurs ?",
        options: ["Raisonner en situations pédagogiques", "Interdire les écrans à l'école", "Équiper toutes les classes de tablettes", "Supprimer la formation des enseignants"],
        correct: "A",
        explanation: "Ils invitent à dépasser l'opposition binaire et à examiner les usages pédagogiques concrets.",
      },
    },
    {
      title: "Patrimoine et afflux touristique",
      text: p(
        "Les sites patrimoniaux les plus visités font face à un afflux qui menace leur conservation. Les files d'attente, l'usure des sols et la pression sur les services locaux incitent certains gestionnaires à limiter le nombre de visiteurs.",
        "Ces restrictions suscitent des critiques : le patrimoine appartient à tous, et les quotas peuvent exclure les visiteurs moins fortunés ou moins informés. Les défenseurs des limites répondent que la fréquentation excessive dégrade précisément ce que les visiteurs viennent voir.",
        "Les solutions expérimentées associent réservation, horaires élargis et valorisation de sites secondaires. Elles ne résolvent pas la question de fond : le tourisme patrimonial est-il un droit d'accès ou une activité économique à réguler ? La réponse dépend des lieux et des communautés concernées.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle question de fond le texte soulève-t-il ?",
        options: ["Le tourisme patrimonial est-il un droit d'accès ou une activité à réguler", "Les sites doivent-ils fermer définitivement", "Les visiteurs doivent-ils payer plus cher", "Les guides sont-ils nécessaires"],
        correct: "A",
        explanation: "Le texte oppose l'accès pour tous à la régulation d'une activité économique.",
      },
    },
    {
      title: "Les sciences participatives",
      text: p(
        "Les programmes de sciences participatives invitent des citoyens à collecter des observations pour la recherche. Ils permettent de couvrir des territoires vastes à moindre coût et de suivre des phénomènes difficiles à documenter autrement.",
        "Les chercheurs restent attentifs à la qualité des données. Des protocoles simples, des formations et des vérifications limitent les erreurs sans exclure les non-spécialistes. La confiance se construit par la transparence sur les méthodes et les résultats.",
        "La reconnaissance des participants demeure inégale. Certains sont cités dans les publications, d'autres non. Or la motivation repose en partie sur le sentiment de contribuer réellement. Les sciences participatives interrogent donc la frontière entre recherche professionnelle et engagement citoyen.",
      ),
      question: {
        level: "C1",
        prompt: "Sur quoi repose la confiance dans les données participatives ?",
        options: ["La transparence sur les méthodes et résultats", "La suppression des protocoles", "La sélection des seuls experts", "La publication sans vérification"],
        correct: "A",
        explanation: "Le texte souligne que la transparence sur les méthodes et les résultats construit la confiance.",
      },
    },
    {
      title: "Censure et démocratie",
      text: p(
        "La censure est généralement considérée comme incompatible avec la démocratie. Pourtant, toutes les démocraties limitent certaines paroles : incitation à la violence, diffamation, divulgation de secrets. La question n'est donc pas de savoir s'il faut censurer, mais selon quels critères et avec quelles garanties.",
        "Les partisans d'une régulation stricte invoquent les dommages concrets produits par la désinformation. Leurs adversaires rappellent que la frontière entre critique légitime et atteinte à l'ordre public est souvent tracée par ceux qui détiennent le pouvoir. Un mécanisme de contrôle peut devenir un instrument de silence.",
        "La solution institutionnelle consiste à encadrer les décisions par des procédures publiques, des recours et une pluralité d'acteurs. Aucun dispositif ne supprime le risque d'abus ; il s'agit de le rendre visible et contestable. La liberté d'expression n'est pas l'absence de limites, mais la possibilité de discuter ces limites.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle solution institutionnelle l'auteur privilégie-t-il ?",
        options: ["Encadrer les décisions par des procédures publiques et des recours", "Confier la régulation à un seul organe", "Supprimer toute limite à la parole", "Interdire les débats sur la censure"],
        correct: "A",
        explanation: "L'auteur plaide pour des procédures publiques, des recours et une pluralité d'acteurs.",
      },
    },
    {
      title: "Le mérite et la chance",
      text: p(
        "Le mérite est au cœur des discours sur la justice sociale : chacun serait récompensé selon son effort et son talent. Cette vision motive et rassure, mais elle ignore la part de hasard dans toute réussite. Naître dans une famille disposant de ressources, rencontrer un mentor ou bénéficier d'une conjoncture favorable ne relève pas du mérite personnel.",
        "Reconnaître cette part de chance ne conduit pas à nier l'effort. Cela permet de distinguer ce qui dépend de l'individu de ce qui dépend des conditions. Une société juste peut récompenser l'effort sans prétendre que tous partent du même point.",
        "Le risque est de transformer le mérite en justification des inégalités. Si les réussites sont entièrement attribuées au mérite, les échecs le sont aussi, et la solidarité perd sa légitimité. La critique du mérite n'est donc pas une critique de l'effort : c'est une critique de son usage idéologique.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi la critique du mérite n'est-elle pas une critique de l'effort ?",
        options: ["Elle vise l'usage idéologique qui justifie les inégalités", "Elle nie toute réussite individuelle", "Elle propose de supprimer le travail", "Elle affirme que la chance explique tout"],
        correct: "A",
        explanation: "L'auteur distingue l'effort, qu'il ne nie pas, de l'usage du mérite pour légitimer les inégalités.",
      },
    },
    {
      title: "Le progrès et l'incertitude",
      text: p(
        "L'innovation est souvent présentée comme un progrès, parce qu'elle élargit les possibilités techniques. Cette équivalence mérite d'être interrogée : une possibilité nouvelle n'est pas nécessairement un bien, et ses conséquences se révèlent parfois après des décennies.",
        "Le principe de précaution est parfois compris comme un refus du changement. Il consiste plutôt à exiger des garanties avant de généraliser une technologie dont les effets sont incertains. Sa difficulté est de définir le seuil d'incertitude qui justifie l'attente, sans bloquer toute recherche.",
        "Entre l'innovation sans contrôle et l'interdiction systématique, il existe une troisième voie : expérimenter à petite échelle, surveiller les effets et réviser les décisions. Cette démarche reconnaît que le progrès n'est pas un état à atteindre, mais un processus à orienter.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle troisième voie l'auteur propose-t-il ?",
        options: ["Expérimenter, surveiller et réviser les décisions", "Innover sans aucune contrôle", "Interdire toute nouvelle technologie", "Attendre un consensus mondial"],
        correct: "A",
        explanation: "L'auteur défend une expérimentation encadrée, suivie d'une évaluation et de révisions.",
      },
    },
    {
      title: "La solitude n'est pas l'isolement",
      text: p(
        "La solitude est souvent associée à l'isolement social, comme si elle n'était qu'un manque de relations. Cette assimilation laisse dans l'ombre une expérience différente : être seul peut aussi être un temps de retrait choisi, nécessaire à la réflexion ou à la création.",
        "Les sociétés contemporaines valorisent l'autonomie et la mobilité, ce qui fragilise les liens de proximité. Les outils numériques maintiennent des contacts, mais ils ne remplacent pas toujours la présence. La solitude subie progresse, tandis que la solitude choisie devient un privilège.",
        "Distinguer les deux expériences permet d'éviter deux erreurs. La première consiste à pathologiser toute solitude ; la seconde, à célébrer l'indépendance sans voir ceux qui souffrent de l'absence de liens. Une politique du lien social doit soutenir la rencontre sans imposer la présence.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle double erreur l'auteur veut-il éviter ?",
        options: ["Pathologiser toute solitude et célébrer l'indépendance sans voir la souffrance", "Distinguer solitude subie et solitude choisie", "Soutenir les liens de proximité", "Valoriser le retrait créatif"],
        correct: "A",
        explanation: "Il met en garde contre la pathologisation de toute solitude et contre l'aveuglement sur la solitude subie.",
      },
    },
    {
      title: "Lire vite, lire bien",
      text: p(
        "La lecture sur écran favorise le survol : nous parcourons, sélectionnons et passons rapidement d'un texte à l'autre. Cette compétence est utile face à l'abondance d'informations, mais elle ne remplace pas la lecture attentive, qui exige de suivre un raisonnement et d'accepter la durée.",
        "Les neuroscientifiques observent que la lecture profonde mobilise des processus différents de la consultation rapide. Elle améliore la compréhension des textes complexes et la mémorisation. Son apprentissage suppose des conditions matérielles et des pratiques régulières.",
        "Le risque n'est pas la disparition de la lecture, mais sa réduction à une seule modalité. Une société qui ne valorise que la vitesse forme des lecteurs capables de réagir, non de comprendre. Préserver la lecture lente n'est donc pas un conservatisme : c'est défendre une forme de pensée.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle évolution l'auteur redoute-t-il ?",
        options: ["La réduction de la lecture à la seule vitesse", "La disparition totale de la lecture", "L'abandon des écrans", "La baisse du nombre de livres"],
        correct: "A",
        explanation: "Le risque est que la lecture rapide devienne la seule modalité valorisée, au détriment de la compréhension.",
      },
    },
  ],
});
