import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 7.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_07 = defineFullTest({
  number: 7,
  description:
    "Septième examen blanc : un parcours complet et progressif, de la vie quotidienne aux débats de société, avec des supports renouvelés et une attention particulière portée à la précision de la langue.",
  listening: [
    {
      level: "A1",
      category: "commerce",
      transcription:
        "Le magasin de meubles sera fermé mardi pour procéder à son inventaire annuel. Nous vous accueillons de nouveau mercredi dès dix heures.",
      prompt: "Pourquoi le magasin est-il fermé mardi ?",
      options: [
        "Pour son inventaire annuel",
        "Pour des travaux de rénovation",
        "Parce que c'est un jour férié",
        "Pour une livraison exceptionnelle",
      ],
      correct: "A",
      explanation:
        "L'annonce indique clairement une fermeture liée à l'inventaire annuel du magasin.",
    },
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "La séance de dix-huit heures affiche complet. Les personnes qui ont déjà réservé sont invitées à se présenter à l'accueil pour choisir une autre séance.",
      prompt: "Que doivent faire les personnes qui ont réservé ?",
      options: [
        "Choisir une autre séance à l'accueil",
        "Attendre une place debout",
        "Payer un supplément",
        "Revenir le lendemain matin",
      ],
      correct: "A",
      explanation:
        "Elles sont invitées à passer à l'accueil afin de sélectionner une autre séance.",
    },
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Rendez-vous demain à dix heures devant la patinoire. N'oublie pas tes gants, il fait très froid.",
      prompt: "Où ont-ils rendez-vous ?",
      options: ["Devant la patinoire", "Devant la piscine", "À la gare", "Au stade"],
      correct: "A",
      explanation: "Le message fixe le rendez-vous devant la patinoire, à dix heures.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Bonjour, votre voiture sera prête vendredi à dix-sept heures. Nous avons remplacé le pare-brise, mais il faudra prévoir le changement des pneus avant l'hiver.",
      prompt: "Que devra faire le client plus tard ?",
      options: [
        "Changer les pneus",
        "Remplacer le pare-brise",
        "Réparer le moteur",
        "Payer une amende",
      ],
      correct: "A",
      explanation: "Le garage signale que les pneus devront être changés avant l'hiver.",
    },
    {
      level: "A2",
      category: "banque",
      transcription:
        "L'agence bancaire sera exceptionnellement fermée lundi matin pour une réunion du personnel. Le distributeur automatique reste accessible à l'extérieur.",
      prompt: "Qu'est-ce qui reste accessible lundi matin ?",
      options: [
        "Le distributeur automatique",
        "Les guichets de l'agence",
        "Le service des crédits",
        "La salle des coffres",
      ],
      correct: "A",
      explanation:
        "Seul le distributeur extérieur reste disponible pendant la fermeture de l'agence.",
    },
    {
      level: "A2",
      category: "études",
      transcription:
        "Les inscriptions à la cantine scolaire se font avant le quinze août. Passé cette date, aucun repas ne pourra être réservé pour la rentrée.",
      prompt: "Quelle est la date limite d'inscription ?",
      options: ["Le quinze août", "Le quinze septembre", "Le premier août", "Le premier septembre"],
      correct: "A",
      explanation:
        "Le message précise que les inscriptions doivent être faites avant le quinze août.",
    },
    {
      level: "A2",
      category: "services",
      transcription:
        "Votre manteau sera prêt jeudi. Nous avons réussi à retirer la tache, mais nous n'avons pas pu remplacer le bouton manquant.",
      prompt: "Qu'est-ce qui n'a pas été fait ?",
      options: ["Remplacer un bouton", "Retirer la tache", "Nettoyer le col", "Repasser le manteau"],
      correct: "A",
      explanation:
        "La teinturerie a retiré la tache mais n'a pas remplacé le bouton manquant.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "La formation à la sécurité incendie aura lieu jeudi de neuf heures à midi. Elle est obligatoire pour tous les nouveaux employés. Ceux qui ne peuvent pas y assister doivent prévenir le service avant mardi.",
      prompt: "Que doivent faire les employés indisponibles ?",
      options: [
        "Prévenir le service avant mardi",
        "Suivre la formation une autre année",
        "Payer une pénalité",
        "Envoyer un collègue à leur place",
      ],
      correct: "A",
      explanation: "Les employés empêchés doivent avertir le service avant mardi.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "La réunion des copropriétaires aura lieu mardi à dix-neuf heures dans la salle commune. Nous parlerons de la rénovation de la façade et du remplacement de l'ascenseur. Vous pouvez transmettre vos questions par écrit.",
      prompt: "Quels sujets seront abordés lors de la réunion ?",
      options: [
        "La façade et l'ascenseur",
        "Le parking et le jardin",
        "Les charges et les impôts",
        "La gardienne et le ménage",
      ],
      correct: "A",
      explanation:
        "L'annonce mentionne la rénovation de la façade et le remplacement de l'ascenseur.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "Le théâtre propose des places à tarif réduit pour les moins de vingt-six ans. Elles sont vendues uniquement sur place, une heure avant la représentation, dans la limite des places restantes.",
      prompt: "Comment obtenir une place à tarif réduit ?",
      options: [
        "Sur place, une heure avant le spectacle",
        "En ligne, la veille",
        "Par téléphone, une semaine avant",
        "À l'office de tourisme",
      ],
      correct: "A",
      explanation:
        "Les places réduites ne sont vendues que sur place, une heure avant la représentation.",
    },
    {
      level: "B1",
      category: "santé",
      transcription:
        "Pour votre prise de sang, vous devez venir à jeun. Le laboratoire ouvre à huit heures et les résultats seront consultables en ligne sous quarante-huit heures.",
      prompt: "Quelle consigne le patient doit-il respecter ?",
      options: ["Venir à jeun", "Boire beaucoup d'eau avant", "Apporter une ordonnance", "Venir l'après-midi"],
      correct: "A",
      explanation:
        "Le laboratoire exige que le patient se présente à jeun pour la prise de sang.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La collecte des déchets verts aura lieu exceptionnellement samedi matin. Merci de sortir les sacs la veille au soir et de ne pas utiliser de sacs en plastique.",
      prompt: "Quelle consigne la mairie adresse-t-elle aux habitants ?",
      options: [
        "Sortir les sacs la veille au soir",
        "Attendre lundi matin",
        "Mettre les déchets dans des sacs plastiques",
        "Apporter les sacs à la mairie",
      ],
      correct: "A",
      explanation:
        "La consigne est de sortir les sacs la veille au soir, sans sacs en plastique.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Une étude menée dans dix villes montre que les habitants fréquentent davantage les commerces de proximité lorsqu'ils peuvent s'y rendre à pied. Pourtant, les parkings gratuits en périphérie continuent d'attirer une clientèle importante. La municipalité envisage donc de rééquilibrer l'offre.",
      prompt: "Que révèle l'étude ?",
      options: [
        "Les commerces accessibles à pied sont plus fréquentés",
        "Les parkings gratuits font baisser la fréquentation",
        "Les habitants refusent les commerces de proximité",
        "La périphérie attire moins de clients",
      ],
      correct: "A",
      explanation:
        "L'étude établit un lien entre l'accès à pied et la fréquentation des commerces de proximité.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Notre entreprise a remplacé les entretiens individuels par des ateliers collectifs. L'objectif est d'observer la coopération et la manière dont les candidats résolvent un problème en groupe. Certains regrettent toutefois de recevoir peu de retours personnalisés.",
      prompt: "Quel est l'objectif de cette méthode de recrutement ?",
      options: [
        "Évaluer la coopération des candidats",
        "Réduire la durée des entretiens",
        "Tester les compétences informatiques",
        "Recruter uniquement des diplômés",
      ],
      correct: "A",
      explanation:
        "Les ateliers collectifs servent à observer la coopération et la résolution de problèmes en groupe.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "Les cours magistraux de première année seront désormais enregistrés et mis en ligne. Cette mesure vise à aider les étudiants qui travaillent en parallèle. Les enseignants craignent cependant une baisse de présence et un dialogue appauvri en amphithéâtre.",
      prompt: "Quelle crainte les enseignants expriment-ils ?",
      options: [
        "Une baisse de présence et du dialogue",
        "Une hausse du nombre d'étudiants",
        "La suppression des examens",
        "Un manque de matériel d'enregistrement",
      ],
      correct: "A",
      explanation:
        "Ils redoutent que l'enregistrement réduise la présence et appauvrisse les échanges.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "L'hôpital a mis en place un numéro unique pour les urgences non vitales. Un médecin rappelle les patients sous deux heures afin d'évaluer la situation. Le dispositif vise à désengorger les urgences, mais ne remplace pas le quinze en cas de danger immédiat.",
      prompt: "Quel est le but de ce numéro unique ?",
      options: [
        "Désengorger les urgences",
        "Remplacer le numéro d'urgence vitale",
        "Réduire le nombre de médecins",
        "Fermer le service de nuit",
      ],
      correct: "A",
      explanation:
        "Le dispositif a pour objectif de désengorger les urgences pour les cas non vitaux.",
    },
    {
      level: "B2",
      category: "logement",
      transcription:
        "Un programme aide les propriétaires à financer l'isolation des combles. Les travaux doivent être réalisés par des artisans labellisés. Les ménages modestes bénéficient d'un taux de subvention plus élevé, mais le reste à charge demeure un frein important.",
      prompt: "Quel frein subsiste malgré les aides ?",
      options: [
        "Le reste à charge pour les ménages",
        "Le manque d'artisans labellisés",
        "L'interdiction d'isoler les combles",
        "La hausse des impôts locaux",
      ],
      correct: "A",
      explanation:
        "Même subventionnés, les travaux laissent un reste à charge qui freine les ménages.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le cinéma de quartier a lancé un abonnement de cinq séances. La programmation privilégie les films en version originale sous-titrée. La fréquentation a augmenté depuis le lancement, même si les séances du dimanche soir restent peu remplies.",
      prompt: "Quel effet l'abonnement a-t-il eu ?",
      options: [
        "Une hausse de la fréquentation",
        "La fermeture des séances du dimanche",
        "Une baisse du nombre de films",
        "La fin des versions sous-titrées",
      ],
      correct: "A",
      explanation:
        "Le cinéma constate une augmentation de la fréquentation depuis la création de l'abonnement.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Une équipe de chercheurs a étudié l'effet de l'éclairage public sur les insectes pollinisateurs. Les lampes à led, très blanches, perturbent leur repérage nocturne et les détournent des fleurs. Les scientifiques recommandent des éclairages moins intenses, orientés vers le sol et éteints une partie de la nuit. Selon eux, la biodiversité urbaine dépend autant de l'obscurité que de la végétation.",
      prompt: "Quel effet l'éclairage à led produit-il sur les pollinisateurs ?",
      options: [
        "Il perturbe leur repérage nocturne",
        "Il attire davantage de fleurs",
        "Il accélère leur reproduction",
        "Il améliore leur vision",
      ],
      correct: "A",
      explanation:
        "L'étude montre que la lumière blanche des led désoriente les insectes et les éloigne des fleurs.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Les jeunes ruraux accèdent souvent à l'emploi au prix d'une dépendance à la voiture. Faute de transports collectifs suffisants, le permis devient une condition d'insertion, alors que son coût pèse lourdement sur les familles. Les auteurs de l'enquête plaident pour des solutions combinant covoiturage organisé, lignes à la demande et aides ciblées au permis.",
      prompt: "Quelle difficulté particulière l'enquête met-elle en évidence ?",
      options: [
        "La dépendance à la voiture pour accéder à l'emploi",
        "Le refus des jeunes de passer le permis",
        "La saturation des transports collectifs",
        "La baisse du coût du permis",
      ],
      correct: "A",
      explanation:
        "L'enquête souligne que le permis et la voiture conditionnent l'insertion professionnelle des jeunes ruraux.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "Le prix d'un billet d'avion ne reflète pas le coût environnemental du vol. Plusieurs économistes proposent d'intégrer ce coût dans le tarif afin que le voyageur perçoive l'ampleur de son impact. D'autres objectent qu'une telle mesure pénaliserait les ménages modestes et qu'il faudrait plutôt financer des alternatives ferroviaires.",
      prompt: "Que proposent les économistes favorables à la mesure ?",
      options: [
        "Intégrer le coût environnemental dans le prix",
        "Supprimer les vols intérieurs",
        "Baisser le prix des billets",
        "Financer uniquement les compagnies aériennes",
      ],
      correct: "A",
      explanation:
        "Ils souhaitent que le tarif reflète le coût environnemental pour rendre l'impact perceptible.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "La bande dessinée documentaire connaît un essor remarquable. En associant enquête, témoignages et dessin, elle rend accessibles des sujets historiques ou sociaux complexes. Certains critiques y voient un risque de simplification, mais ses auteurs revendiquent une exigence documentaire rigoureuse, souvent vérifiée par des historiens.",
      prompt: "Quelle évolution le critique décrit-il ?",
      options: [
        "Le renouveau du récit documentaire par la bande dessinée",
        "Le déclin des sujets historiques",
        "La suppression des enquêtes journalistiques",
        "Le refus des historiens de collaborer",
      ],
      correct: "A",
      explanation:
        "Le propos décrit l'essor d'une bande dessinée documentaire qui rend accessibles des sujets complexes.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "La nostalgie est souvent comprise comme le regret d'un passé idéalisé. Pourtant, elle ne se réduit pas à une fuite : elle exprime aussi le besoin de trouver, dans le présent, une continuité avec ce qui nous a formés. Ce qui est en jeu n'est donc pas la restitution d'un temps perdu, mais la manière dont nous habitons notre histoire.",
      prompt: "Quelle conception de la nostalgie l'orateur défend-il ?",
      options: [
        "Elle peut nourrir un rapport actif à notre histoire",
        "Elle se réduit toujours à une fuite du présent",
        "Elle exige la restitution exacte du passé",
        "Elle empêche toute continuité personnelle",
      ],
      correct: "A",
      explanation:
        "L'orateur refuse de réduire la nostalgie à une fuite et y voit un besoin de continuité avec notre histoire.",
    },
    {
      level: "C2",
      category: "société",
      transcription:
        "Des tribunaux utilisent des outils algorithmiques pour estimer le risque de récidive. Leurs défenseurs vantent une plus grande objectivité que le jugement humain. Or, ces outils restent opaques : les personnes concernées ne savent pas quels critères ont pesé. Cette opacité empêche de contester une décision sur le fond et déplace la responsabilité vers une machine que nul ne peut interroger.",
      prompt: "Pourquoi l'opacité des algorithmes pose-t-elle problème ?",
      options: [
        "Elle empêche de contester les décisions sur le fond",
        "Elle rend les juges trop nombreux",
        "Elle supprime toute évaluation du risque",
        "Elle accélère excessivement les procès",
      ],
      correct: "A",
      explanation:
        "Faute de connaître les critères utilisés, les personnes ne peuvent pas discuter véritablement la décision.",
    },
    {
      level: "C2",
      category: "environnement",
      transcription:
        "La compensation carbone permet aux entreprises de financer des projets de reforestation ou d'énergie propre à l'étranger. Ses partisans y voient un moyen de contribuer à la transition mondiale. Mais la compensation peut devenir un substitut à la réduction des émissions : une entreprise qui achète des crédits sans modifier ses pratiques donne l'apparence de l'effort sans en supporter le coût. Le mécanisme n'est utile que s'il s'ajoute à des réductions réelles et vérifiables.",
      prompt: "Quelle critique l'orateur adresse-t-il à la compensation carbone ?",
      options: [
        "Elle peut dispenser de réduire les émissions à la source",
        "Elle interdit toute reforestation",
        "Elle coûte trop cher aux États",
        "Elle empêche les entreprises d'investir",
      ],
      correct: "A",
      explanation:
        "L'orateur craint que l'achat de crédits remplace les réductions d'émissions plutôt que de les compléter.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent de l'indicatif",
      prompt: "Vous ___ vos grands-parents chaque dimanche.",
      options: ["visitez", "visite", "visitons", "visitent"],
      correct: "A",
      explanation:
        "Le sujet « vous » impose la deuxième personne du pluriel : « vous visitez ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Il y a ___ nuages dans le ciel.",
      options: ["des", "de", "du", "les"],
      correct: "A",
      explanation:
        "« Nuages » est un nom pluriel indéfini : on emploie l'article « des ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Pendant que je ___ le repas, le téléphone a sonné.",
      options: ["préparais", "ai préparé", "prépare", "préparerai"],
      correct: "A",
      explanation:
        "L'imparfait exprime l'action en cours, interrompue par le coup de téléphone au passé composé.",
    },
    {
      level: "B1",
      category: "pronoms compléments",
      prompt: "Ces lettres, il ___ a postées ce matin.",
      options: ["les", "leur", "lui", "en"],
      correct: "A",
      explanation:
        "« Les » remplace le COD pluriel « ces lettres » ; le participe s'accorde au féminin pluriel.",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous avons renoncé ___ ce voyage à cause du prix.",
      options: ["à", "de", "pour", "sur"],
      correct: "A",
      explanation:
        "Le verbe « renoncer » se construit avec la préposition « à » : renoncer à quelque chose.",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le stage ___ elle a suivi l'a beaucoup aidée.",
      options: ["que", "qui", "dont", "où"],
      correct: "A",
      explanation:
        "« Que » est COD du verbe « a suivi » ; « qui » serait sujet du verbe.",
    },
    {
      level: "B1",
      category: "pronoms compléments",
      prompt: "Tu as pensé à réserver les billets ? Oui, j'___ ai pensé hier.",
      options: ["y", "en", "le", "les"],
      correct: "A",
      explanation:
        "Le pronom « y » remplace le complément introduit par « à » : penser à réserver.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il est essentiel que vous ___ ce dossier avant la réunion.",
      options: ["prépariez", "préparez", "préparerez", "prépareriez"],
      correct: "A",
      explanation:
        "« Il est essentiel que » exige le subjonctif présent : « que vous prépariez ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Elle a expliqué qu'elle ___ son dossier deux jours plus tôt.",
      options: ["avait envoyé", "a envoyé", "enverrait", "envoyait"],
      correct: "A",
      explanation:
        "Le plus-que-parfait marque l'antériorité par rapport au passé composé « a expliqué ».",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Le nouveau règlement ___ par le conseil d'administration hier soir.",
      options: ["a été adopté", "a adopté", "est adopté", "adoptait"],
      correct: "A",
      explanation:
        "Le complément d'agent « par le conseil » impose la voix passive au passé composé : « a été adopté ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "___ la pluie, la manifestation a rassemblé plus de mille personnes.",
      options: ["En dépit de", "Bien que", "Étant donné que", "Pour que"],
      correct: "A",
      explanation:
        "« En dépit de » introduit un nom et exprime la concession ; les autres exigent une proposition.",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "Il a progressé ___ régulièrement.",
      options: ["en pratiquant", "pratiquant", "pratiquer", "pratique"],
      correct: "A",
      explanation:
        "Le gérondif exprime la manière et se forme avec « en » suivi du participe présent.",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Le directeur nous a annoncé que la réunion ___ reportée à la semaine suivante.",
      options: ["serait", "sera", "est", "était"],
      correct: "A",
      explanation:
        "Au discours indirect au passé, le futur « sera » devient conditionnel : « serait ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "Les personnes ___ j'ai parlé sont très compétentes.",
      options: ["auxquelles", "que", "dont", "qui"],
      correct: "A",
      explanation:
        "Le verbe « parler à » impose « auxquelles », pronom relatif composé féminin pluriel.",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "Nulle part ___ une telle diversité de paysages.",
      options: ["n'a-t-on trouvé", "on n'a trouvé", "n'a trouvé on", "on n'a-t-il trouvé"],
      correct: "A",
      explanation:
        "L'inversion du sujet est obligatoire après « nulle part » en tête de phrase : « n'a-t-on trouvé ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ soutenue de ce marché a surpris les analystes.",
      options: ["croissance", "croître", "cru", "croissant"],
      correct: "A",
      explanation:
        "Le nom dérivé du verbe « croître » est « la croissance » ; les autres formes ne sont pas des noms.",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Si le maire ___ écouté les habitants, il aurait modifié le projet.",
      options: ["avait", "a", "aurait", "écoutait"],
      correct: "A",
      explanation:
        "L'hypothèse irréelle au passé associe le plus-que-parfait à un conditionnel passé : « s'il avait écouté ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "Ils ont ___ leur argumentation sur des témoignages concordants.",
      options: ["fondé", "fondu", "fondant", "fonder"],
      correct: "A",
      explanation:
        "« Fonder sur » signifie baser sur ; « fondu » renvoie à la fusion et ne convient pas ici.",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "Dès qu'il ___ son allocution, la salle se leva.",
      options: ["eut achevé", "a achevé", "avait achevé", "acheva"],
      correct: "A",
      explanation:
        "Le passé antérieur « eut achevé » marque l'antériorité immédiate dans un récit au passé simple.",
    },
    {
      level: "C2",
      category: "syntaxe",
      prompt: "Aussi ___ soit sa prudence, il commet parfois des erreurs.",
      options: ["grande", "grand", "grandes", "grandement"],
      correct: "A",
      explanation:
        "La tournure concessive « aussi + adjectif + soit » impose l'accord avec le sujet : « aussi grande soit sa prudence ».",
    },
  ],
  reading: [
    {
      title: "Une épicerie bio en centre-ville",
      text:
        "L'épicerie bio du quartier ouvre ses portes mardi, au 12 rue des Tilleuls. Elle propose des fruits et légumes de saison, ainsi que des produits en vrac. Chaque samedi matin, un atelier gratuit apprend aux clients à cuisiner les invendus.",
      question: {
        level: "B1",
        category: "commerce",
        prompt: "Que propose l'épicerie le samedi matin ?",
        options: ["Un atelier gratuit", "Une dégustation payante", "Une livraison à domicile", "Un marché extérieur"],
        correct: "A",
        explanation:
          "Le texte précise qu'un atelier gratuit de cuisine est organisé chaque samedi matin.",
      },
    },
    {
      title: "Travaux de ravalement",
      text:
        "Le ravalement des façades de l'immeuble débutera lundi. Les échafaudages occuperont le trottoir pendant trois semaines. Les fenêtres devront rester fermées les jours de nettoyage. Les habitants sont priés de retirer les objets de leurs balcons.",
      question: {
        level: "B1",
        category: "logement",
        prompt: "Quelle précaution est demandée aux habitants ?",
        options: [
          "Retirer les objets des balcons",
          "Déménager pendant les travaux",
          "Fermer l'entrée de l'immeuble",
          "Payer le ravalement",
        ],
        correct: "A",
        explanation:
          "La consigne demande aux habitants de retirer les objets entreposés sur les balcons.",
      },
    },
    {
      title: "Une navette pour le marché",
      text:
        "À partir de samedi, une navette gratuite reliera le centre-ville au marché de gros toutes les demi-heures, de huit heures à treize heures. Elle part de la place de la République. Les animaux ne sont pas admis, sauf les chiens guides.",
      question: {
        level: "B1",
        category: "transports",
        prompt: "Quelle exception est prévue pour les animaux ?",
        options: [
          "Les chiens guides sont admis",
          "Les chats sont acceptés",
          "Tous les petits chiens sont admis",
          "Aucune exception n'est prévue",
        ],
        correct: "A",
        explanation:
          "Le règlement interdit les animaux, mais autorise expressément les chiens guides.",
      },
    },
    {
      title: "La cabane à livres du parc",
      text:
        "Une cabane à livres a été installée dans le parc municipal. Chacun peut y déposer ou emprunter gratuitement des ouvrages, sans inscription. Les magazines et les livres abîmés sont priés de rester dehors : ils ne peuvent pas être proposés aux lecteurs.",
      question: {
        level: "B1",
        category: "culture",
        prompt: "Que peut-on faire dans la cabane à livres ?",
        options: [
          "Déposer et emprunter des livres gratuitement",
          "Acheter des livres d'occasion",
          "S'inscrire à la bibliothèque municipale",
          "Emprunter des magazines récents",
        ],
        correct: "A",
        explanation:
          "La cabane permet le dépôt et l'emprunt libre et gratuit, mais exclut les magazines et les ouvrages abîmés.",
      },
    },
    {
      title: "Portes ouvertes à la caserne",
      text:
        "La caserne des pompiers organise des portes ouvertes dimanche, de dix heures à dix-sept heures. Les visiteurs pourront découvrir les véhicules et assister à une démonstration de secours. L'entrée est libre, mais les enfants doivent être accompagnés.",
      question: {
        level: "B1",
        category: "sécurité",
        prompt: "Quelle condition s'applique aux enfants ?",
        options: [
          "Ils doivent être accompagnés d'un adulte",
          "Ils doivent s'inscrire à l'avance",
          "Ils doivent payer l'entrée",
          "Ils ne peuvent pas visiter les véhicules",
        ],
        correct: "A",
        explanation:
          "L'entrée est libre, mais les enfants doivent obligatoirement être accompagnés d'un adulte.",
      },
    },
    {
      title: "Les halles ouvrent le soir",
      text: p(
        "Les halles du centre-ville expérimentent une ouverture jusqu'à vingt et une heures, du jeudi au samedi. L'objectif est d'attirer les salariés après leur journée de travail.",
        "Les restaurateurs accueillent l'initiative avec intérêt. En revanche, plusieurs producteurs s'inquiètent : assurer une présence en soirée suppose des horaires supplémentaires et une organisation difficile pour les petites exploitations.",
      ),
      question: {
        level: "B2",
        category: "économie",
        prompt: "Pourquoi les producteurs sont-ils réservés ?",
        options: [
          "Ils craignent de ne pas pouvoir assurer les horaires du soir",
          "Ils refusent de vendre aux salariés",
          "Ils trouvent les halles trop petites",
          "Ils souhaitent fermer le quartier",
        ],
        correct: "A",
        explanation:
          "Le texte indique que les horaires du soir compliquent l'organisation des petites exploitations.",
      },
    },
    {
      title: "Des instruments à emprunter",
      text: p(
        "L'école de musique municipale prête désormais des instruments aux élèves débutants. Le dispositif concerne le violon, la flûte et la clarinette, pour une durée de six mois renouvelable.",
        "L'objectif est de réduire le coût de la rentrée pour les familles et de permettre aux enfants d'essayer avant d'acheter. La demande dépasse toutefois l'offre : une liste d'attente a été ouverte, et certains instruments restent peu disponibles.",
      ),
      question: {
        level: "B2",
        category: "culture",
        prompt: "Quel est l'objectif de ce prêt d'instruments ?",
        options: [
          "Réduire le coût pour les familles",
          "Remplacer les professeurs de musique",
          "Vendre les instruments de l'école",
          "Ouvrir une nouvelle salle de concert",
        ],
        correct: "A",
        explanation:
          "Le prêt vise à alléger le coût de la rentrée et à permettre un essai avant l'achat.",
      },
    },
    {
      title: "Le mentorat entre générations",
      text: p(
        "Une entreprise a mis en place un mentorat : des salariés expérimentés accompagnent de jeunes recrues. L'initiative doit transmettre des savoir-faire que les formations classiques ne couvrent pas.",
        "Les premiers résultats sont positifs, mais le dispositif se heurte à une difficulté : les mentors disposent de peu de temps, car leur charge n'a pas été réduite. Sans moyens dédiés, l'accompagnement risque de se limiter à quelques rencontres.",
      ),
      question: {
        level: "B2",
        category: "travail",
        prompt: "Quelle limite le programme rencontre-t-il ?",
        options: [
          "Le manque de temps des mentors",
          "Le refus des jeunes recrues",
          "L'absence de compétences à transmettre",
          "La fermeture des formations classiques",
        ],
        correct: "A",
        explanation:
          "Les mentors manquent de temps car leur charge de travail n'a pas été allégée.",
      },
    },
    {
      title: "La sieste au lycée",
      text: p(
        "Trois lycées proposent une salle de sieste ouverte après le déjeuner. Les élèves volontaires peuvent y dormir vingt minutes, dans une pièce calme et faiblement éclairée.",
        "Les premiers bilans font état d'une meilleure concentration en début d'après-midi. Certains enseignants restent sceptiques : ils craignent que cette pause ne réduise le temps consacré aux révisions et ne soit difficile à encadrer dans les emplois du temps.",
      ),
      question: {
        level: "B2",
        category: "études",
        prompt: "Quel effet positif est observé ?",
        options: [
          "Une meilleure concentration l'après-midi",
          "Une hausse des résultats en mathématiques",
          "Une baisse du nombre d'élèves",
          "Un allongement de la journée de cours",
        ],
        correct: "A",
        explanation:
          "Les premiers bilans signalent une concentration améliorée en début d'après-midi.",
      },
    },
    {
      title: "Les paniers hebdomadaires et leur logistique",
      text: p(
        "Les paniers de produits fermiers séduisent de plus en plus. Chaque semaine, les consommateurs commandent en ligne et récupèrent leur panier dans un point relais.",
        "Mais la distribution reste fragile : elle repose sur quelques bénévoles chargés de réceptionner les caisses et de gérer les horaires. Les producteurs envisagent de professionnaliser ce service, ce qui pourrait augmenter le prix et écarter une partie de la clientèle.",
      ),
      question: {
        level: "B2",
        category: "économie",
        prompt: "Quelle difficulté la distribution rencontre-t-elle ?",
        options: [
          "Elle dépend d'un nombre limité de bénévoles",
          "Elle manque de produits fermiers",
          "Elle est interdite dans les points relais",
          "Elle coûte moins cher que prévu",
        ],
        correct: "A",
        explanation:
          "Le texte souligne que la distribution repose sur quelques bénévoles, ce qui la rend fragile.",
      },
    },
    {
      title: "Le sport en plein air et l'usure",
      text: p(
        "La ville a installé des agrès dans plusieurs parcs. Ces équipements gratuits attirent un public varié, des adolescents aux retraités, et favorisent l'activité physique.",
        "Leur entretien pose cependant problème. Les pièces s'usent vite, certaines installations sont vandalisées et les réparations tardent. Les habitants réclament un contrôle plus régulier, tandis que la municipalité cherche des financements pour remplacer les plus dégradés.",
      ),
      question: {
        level: "B2",
        category: "loisirs",
        prompt: "Quel problème est décrit dans le texte ?",
        options: [
          "La dégradation rapide des équipements",
          "Le prix élevé de l'abonnement",
          "Le manque de sportifs intéressés",
          "La fermeture des parcs municipaux",
        ],
        correct: "A",
        explanation:
          "Le texte évoque l'usure et le vandalisme des agrès, ainsi que le retard des réparations.",
      },
    },
    {
      title: "Le café suspendu",
      text: p(
        "Dans plusieurs cafés, les clients peuvent payer d'avance une boisson pour un inconnu. Le principe, appelé café suspendu, permet de consommer gratuitement.",
        "L'initiative rencontre un vrai succès, mais elle soulève une question délicate : afficher sa générosité peut exposer les bénéficiaires et les gêner. Les associations recommandent donc une discrétion totale, sans affichage ni annonce nominative, afin de préserver la dignité de chacun.",
      ),
      question: {
        level: "B2",
        category: "société",
        prompt: "Quel risque les associations veulent-elles éviter ?",
        options: [
          "Exposer les bénéficiaires et les gêner",
          "Augmenter le prix des boissons",
          "Fermer les cafés du quartier",
          "Rendre le service payant",
        ],
        correct: "A",
        explanation:
          "Elles craignent que la publicité autour du geste ne mette mal à l'aise les personnes aidées.",
      },
    },
    {
      title: "Des secrétariats partagés à la campagne",
      text: p(
        "Face à la baisse de leurs ressources, plusieurs villages mutualisent leur secrétariat. Un agent partage son temps entre trois communes et assure les démarches lors de permanences tournantes.",
        "Le dispositif maintient un service de proximité, mais il réduit les horaires d'ouverture dans chaque mairie. Les habitants âgés regrettent d'attendre le passage de l'agent, et certains craignent une perte de contact avec l'administration.",
      ),
      question: {
        level: "B2",
        category: "société",
        prompt: "Quelle conséquence les habitants regrettent-ils ?",
        options: [
          "La réduction des horaires de proximité",
          "La fermeture définitive des villages",
          "La hausse des impôts locaux",
          "Le départ de tous les agents",
        ],
        correct: "A",
        explanation:
          "La mutualisation maintient le service mais diminue les horaires d'ouverture dans chaque commune.",
      },
    },
    {
      title: "Les petites salles de spectacle sous pression",
      text: p(
        "Les petites salles accueillent des artistes émergents avec des budgets serrés. Depuis deux ans, leurs charges augmentent : assurance, sécurité, énergie et technique pèsent davantage.",
        "Pour continuer à programmer, certaines réduisent le nombre de créations et privilégient les spectacles les plus rentables. Les directeurs alertent : sans soutien public, la diversité artistique risque de se concentrer dans les grandes villes.",
      ),
      question: {
        level: "B2",
        category: "culture",
        prompt: "Quel obstacle financier les salles rencontrent-elles ?",
        options: [
          "La hausse des charges d'assurance et de sécurité",
          "La baisse du prix des billets",
          "Le trop grand nombre d'artistes",
          "La fermeture des grandes villes",
        ],
        correct: "A",
        explanation:
          "Le texte cite l'augmentation des charges d'assurance, de sécurité, d'énergie et de technique.",
      },
    },
    {
      title: "Les fleuristes face aux fortes chaleurs",
      text: p(
        "Les étés plus chauds obligent les fleuristes à revoir leurs achats. Les variétés fragiles fanent plus vite dans les boutiques mal climatisées, et les livraisons doivent être organisées plus tôt.",
        "Certains se tournent vers des fleurs plus résistantes et moins gourmandes en eau. D'autres limitent les compositions volumineuses, difficiles à conserver. Les clients découvrent des bouquets différents, parfois moins spectaculaires mais plus durables.",
      ),
      question: {
        level: "B2",
        category: "environnement",
        prompt: "Comment les fleuristes s'adaptent-ils aux fortes chaleurs ?",
        options: [
          "En choisissant des variétés plus résistantes",
          "En fermant leurs boutiques l'été",
          "En augmentant la taille des bouquets",
          "En arrêtant les livraisons à domicile",
        ],
        correct: "A",
        explanation:
          "Ils sélectionnent des fleurs plus résistantes et moins gourmandes en eau pour limiter les pertes.",
      },
    },
    {
      title: "La médecine de précision et l'égalité des soins",
      text: p(
        "La médecine de précision promet des traitements adaptés au profil génétique de chaque patient. Les progrès sont réels dans certaines maladies rares ou dans l'oncologie, où des thérapies ciblées améliorent les résultats. Cette approche suppose toutefois des données nombreuses et variées.",
        "Or les bases utilisées sont souvent constituées à partir de populations particulières, ce qui limite la portée des conclusions pour d'autres groupes. À cela s'ajoute le coût des tests et des traitements, rarement pris en charge intégralement.",
        "Les auteurs ne rejettent pas la médecine de précision, mais rappellent qu'elle pourrait creuser les inégalités si elle se développe sans politique d'accès. Ils plaident pour des cohortes diversifiées et pour un renforcement des soins primaires, seuls capables de garantir un suivi au plus grand nombre.",
      ),
      question: {
        level: "C1",
        category: "santé",
        prompt: "Quelle limite les auteurs soulignent-ils ?",
        options: [
          "Le risque d'accroître les inégalités d'accès aux soins",
          "L'absence de progrès thérapeutiques",
          "Le refus des patients de participer",
          "La fermeture des services d'oncologie",
        ],
        correct: "A",
        explanation:
          "Les auteurs craignent que le coût et le manque de diversité des données creusent les inégalités.",
      },
    },
    {
      title: "Transmettre les savoir-faire manuels",
      text: p(
        "La pénurie d'artisans ne s'explique pas seulement par le manque de candidats. Les entreprises du bâtiment, de la menuiserie ou de la bijouterie peinent surtout à transmettre des gestes qui s'apprennent par la pratique.",
        "Les formations existent, mais l'apprentissage suppose que l'entreprise consacre du temps à l'encadrement. Or les délais sont serrés : le compagnon qui pourrait former un jeune est souvent mobilisé sur un chantier. Les aides publiques financent le salaire de l'apprenti, rarement le temps du formateur.",
        "Les artisans réclament donc une reconnaissance de cette fonction de transmission. Sans elle, les savoir-faire les plus fins risquent de disparaître, alors que la demande de réparation progresse. La transmission n'est pas un coût accessoire : c'est un investissement dans la qualité future du métier.",
      ),
      question: {
        level: "C1",
        category: "travail",
        prompt: "Pourquoi la transmission des savoir-faire est-elle fragilisée ?",
        options: [
          "Les professionnels manquent de temps pour former",
          "Les jeunes refusent les métiers manuels",
          "Les formations ont été supprimées",
          "La demande de réparation diminue",
        ],
        correct: "A",
        explanation:
          "Le texte montre que les artisans, pris par les chantiers, disposent de peu de temps pour encadrer les apprentis.",
      },
    },
    {
      title: "Quand la ville laisse revenir l'eau",
      text: p(
        "Les inondations récentes ont relancé le débat sur l'aménagement des villes. Longtemps, la réponse consistait à construire des digues plus hautes et à évacuer l'eau vers l'aval. Cette stratégie protège certains quartiers, mais reporte le risque.",
        "Les hydrologues proposent une autre approche : redonner à l'eau des espaces où elle peut s'étendre sans dommage. Des parkings inondables ou des zones humides restaurées ralentissent les écoulements. Ces solutions coûtent moins cher que de nouveaux ouvrages, à condition de renoncer à construire dans certaines zones.",
        "L'obstacle est moins technique que politique. Les terrains concernés ont une valeur, et les habitants craignent de perdre des équipements. Pourtant, chaque été apporte son lot de sinistres. La question n'est plus de savoir si l'eau reviendra, mais où nous lui laisserons de la place.",
      ),
      question: {
        level: "C1",
        category: "environnement",
        prompt: "Quelle approche l'auteur préconise-t-il ?",
        options: [
          "Redonner des espaces à l'eau plutôt que bâtir toujours plus de digues",
          "Construire des digues plus hautes dans tous les quartiers",
          "Interdire toute construction en France",
          "Déplacer immédiatement toutes les villes",
        ],
        correct: "A",
        explanation:
          "L'auteur présente les solutions fondées sur l'expansion de l'eau comme plus efficaces et moins coûteuses.",
      },
    },
    {
      title: "Le théâtre forum et l'expérimentation du conflit",
      text: p(
        "Le théâtre forum invite les spectateurs à intervenir dans une scène de conflit ordinaire : un locataire face à son propriétaire, un salarié confronté à une décision injuste. Lorsqu'une situation bloque, le public peut monter sur scène et proposer une autre issue.",
        "Cette forme théâtrale ne vise pas à donner une leçon. Elle permet d'éprouver des solutions dans un espace protégé, où l'échec n'a pas de conséquence réelle. Les participants découvrent que plusieurs réponses sont possibles et que leur efficacité dépend du contexte et du rapport de force.",
        "Les animateurs insistent sur les limites de l'exercice : il ne remplace ni la négociation réelle ni l'action collective. Mais il développe une compétence souvent négligée, celle de se représenter le point de vue adverse. Cette capacité peut ouvrir un dialogue que la dénonciation rend impossible.",
      ),
      question: {
        level: "C1",
        category: "culture",
        prompt: "Quel apport principal l'auteur attribue-t-il au théâtre forum ?",
        options: [
          "Permettre d'expérimenter des solutions dans un cadre protégé",
          "Remplacer les négociations professionnelles",
          "Désigner les responsables des conflits",
          "Former des acteurs professionnels",
        ],
        correct: "A",
        explanation:
          "L'auteur souligne que le théâtre forum permet d'éprouver des réponses sans conséquence réelle et de comprendre le point de vue adverse.",
      },
    },
    {
      title: "L'âge de la retraite et l'inégalité des trajectoires",
      text: p(
        "Le débat sur l'âge de la retraite oppose souvent des chiffres globaux : espérance de vie, durée de cotisation, équilibre des régimes. Ces moyennes masquent des trajectoires très différentes selon les métiers.",
        "Un ouvrier du bâtiment et un cadre ne vieillissent pas de la même manière. Les pénibilités physiques, les horaires décalés et les interruptions de carrière pèsent sur la santé et sur la durée d'activité. Reculer uniformément l'âge de départ demande donc un effort plus long à ceux dont l'espérance de vie en bonne santé est la plus faible.",
        "Les économistes ne s'accordent pas sur les remèdes. Certains proposent des départs anticipés pour les carrières longues, d'autres préfèrent agir sur les conditions de travail. Mais tous reconnaissent qu'une réforme juste doit tenir compte de la diversité des parcours.",
      ),
      question: {
        level: "C1",
        category: "économie",
        prompt: "Pourquoi une hausse uniforme de l'âge de départ est-elle jugée injuste ?",
        options: [
          "L'espérance de vie en bonne santé varie selon les métiers",
          "Les salariés refusent tous de travailler",
          "Les régimes de retraite sont déjà excédentaires",
          "Les cadres partent plus tôt que les ouvriers",
        ],
        correct: "A",
        explanation:
          "Le texte explique que les pénibilités et les parcours font varier l'espérance de vie en bonne santé selon les professions.",
      },
    },
    {
      title: "L'hospitalité et ses conditions",
      text: p(
        "L'hospitalité est souvent célébrée comme une vertu universelle. Elle suppose pourtant des conditions matérielles et juridiques qui déterminent qui peut être accueilli. Une porte ouverte ne suffit pas si celui qui frappe n'a ni statut ni ressources.",
        "Les philosophes distinguent deux formes d'hospitalité. La première est inconditionnelle : elle accueille l'étranger sans exiger qu'il se présente ni qu'il rende quelque chose. La seconde est codifiée : elle repose sur des règles, des limites et une réciprocité possible. La première relève de l'éthique, la seconde du droit.",
        "Cette distinction éclaire les débats sur l'accueil des migrants. Invoquer une hospitalité pure permet de critiquer la dureté des frontières, mais ne dit rien des modalités concrètes de l'accueil. À l'inverse, se concentrer sur les procédures risque d'oublier la personne derrière le dossier. Penser l'hospitalité consiste donc à tenir ensemble l'exigence morale et les conditions politiques qui la rendent possible.",
      ),
      question: {
        level: "C2",
        category: "philosophie",
        prompt: "Quelle tension l'auteur met-il en évidence ?",
        options: [
          "Entre l'exigence morale de l'accueil et ses conditions juridiques",
          "Entre l'accueil des migrants et le tourisme",
          "Entre les philosophes et les juristes",
          "Entre la générosité et la richesse",
        ],
        correct: "A",
        explanation:
          "L'auteur oppose l'hospitalité inconditionnelle à sa codification juridique et invite à les articuler.",
      },
    },
    {
      title: "Les communs numériques et le travail invisible",
      text: p(
        "Les logiciels libres, les encyclopédies collaboratives et les bases de données ouvertes sont souvent présentés comme des biens communs. Ils sont accessibles à tous, modifiables et indépendants des intérêts commerciaux.",
        "Cette image mérite d'être nuancée. Ces communs reposent sur un travail considérable, souvent bénévole : maintenance, correction, documentation, modération. Une petite minorité de contributeurs assure l'essentiel du travail, tandis que la majorité des utilisateurs bénéficie du résultat sans participer.",
        "Le paradoxe est que la gratuité rend ce travail invisible et donc difficile à financer. Les entreprises qui les utilisent contribuent rarement à leur entretien. Les chercheurs parlent d'une « tragédie des communs inversée » : le risque n'est pas la surexploitation par tous, mais l'épuisement par quelques-uns. La soutenabilité des communs exige donc de reconnaître ce travail.",
      ),
      question: {
        level: "C2",
        category: "numérique",
        prompt: "Quel paradoxe l'auteur décrit-il ?",
        options: [
          "La gratuité rend invisible un travail pourtant indispensable",
          "Les communs numériques sont trop chers à utiliser",
          "Les entreprises refusent d'utiliser les logiciels libres",
          "Tous les utilisateurs contribuent également",
        ],
        correct: "A",
        explanation:
          "L'auteur montre que la gratuité masque un travail de maintenance assuré par une minorité et difficile à financer.",
      },
    },
    {
      title: "Le patrimoine ordinaire",
      text: p(
        "La protection du patrimoine se concentre généralement sur les monuments exceptionnels : cathédrales, châteaux, œuvres célébrées. Cette sélection laisse dans l'ombre des bâtiments qui structurent la vie quotidienne.",
        "Les ensembles de logements du vingtième siècle, les écoles de village, les halles ou les gares de quartier constituent le patrimoine ordinaire. Leur valeur ne tient pas à leur architecture, mais à l'usage collectif qu'ils portent. Leur démolition ne supprime pas seulement des murs : elle efface des repères partagés.",
        "Leur reconnaissance se heurte à un dilemme. Classer ces bâtiments empêcherait leur adaptation aux normes énergétiques. Ne rien faire les condamne à la disparition. Les urbanistes proposent donc une voie intermédiaire : inventorier, documenter et transformer avec soin, en préservant ce qui fait sens pour les habitants.",
      ),
      question: {
        level: "C2",
        category: "urbanisme",
        prompt: "Quelle voie l'auteur recommande-t-il pour le patrimoine ordinaire ?",
        options: [
          "L'inventorier et le transformer avec soin",
          "Le classer systématiquement comme monument",
          "Le laisser disparaître sans intervention",
          "Le reconstruire à l'identique partout",
        ],
        correct: "A",
        explanation:
          "L'auteur écarte le classement généralisé et l'abandon, et plaide pour une transformation documentée et attentive aux usages.",
      },
    },
    {
      title: "Le consentement en recherche médicale",
      text: p(
        "Le consentement éclairé est un principe central de la recherche médicale. Avant de participer à une étude, une personne doit comprendre les objectifs, les risques et les alternatives. Ce principe protège l'autonomie du patient.",
        "Son application soulève pourtant des difficultés. La compréhension réelle est souvent partielle, surtout si les informations sont techniques ou la personne vulnérable. Les formulaires, longs et juridiques, garantissent parfois l'accord formel sans compréhension réelle. Le consentement devient alors une signature plutôt qu'une décision.",
        "Certains proposent un consentement dynamique, révisable, et des supports plus accessibles. D'autres rappellent que la recherche bénéficie à la collectivité : le consentement individuel ne suffit donc pas à trancher les questions de justice entre groupes. La réflexion éthique doit articuler autonomie individuelle et solidarité.",
      ),
      question: {
        level: "C2",
        category: "éthique",
        prompt: "Pourquoi le consentement individuel ne suffit-il pas selon l'auteur ?",
        options: [
          "Il ne règle pas les questions de justice entre groupes",
          "Il est toujours obtenu sous la contrainte",
          "Il interdit toute recherche médicale",
          "Il empêche les patients de poser des questions",
        ],
        correct: "A",
        explanation:
          "L'auteur souligne que la recherche bénéficie à la collectivité et que le seul accord individuel ne résout pas les enjeux de justice.",
      },
    },
    {
      title: "Le temps libre, une conquête inachevée",
      text: p(
        "Le temps libre est souvent présenté comme une conquête du vingtième siècle : réduction de la journée de travail, congés payés, retraite. Ces avancées ont transformé la vie quotidienne, mais elles n'ont pas supprimé les inégalités devant le temps.",
        "Les enquêtes montrent que la disponibilité varie fortement selon le sexe, le métier et la charge familiale. Les tâches domestiques et l'accompagnement des proches continuent de peser majoritairement sur les femmes. Les horaires fragmentés et les transports empêchent certains salariés de disposer de temps libre.",
        "Le temps libre n'est donc pas seulement une quantité arrachée au travail. Sa qualité dépend de la possibilité de choisir ce que l'on fait, sans culpabilité ni contrainte. Une politique du temps libre ne se réduit pas à la durée du travail : elle doit agir sur les services et la répartition des tâches. À défaut, le temps gagné se transforme souvent en temps contraint.",
      ),
      question: {
        level: "C2",
        category: "société",
        prompt: "Pourquoi le temps libre reste-t-il inégalement réparti ?",
        options: [
          "La charge domestique et les rythmes de travail pèsent différemment",
          "Les salariés refusent de prendre des congés",
          "Les loisirs sont devenus trop nombreux",
          "La durée du travail a augmenté partout",
        ],
        correct: "A",
        explanation:
          "Le texte cite les tâches domestiques, les horaires fragmentés et les transports comme sources d'inégalités.",
      },
    },
  ],
});
