import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 20.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_20 = defineFullTest({
  number: 20,
  description:
    "Vingtième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Allô, bonjour, c'est Inès. Je voudrais parler à Monsieur Blanc, s'il vous plaît. Il est en réunion ? Je rappellerai à quatorze heures.",
      prompt: "À quelle heure Inès rappellera-t-elle ?",
      options: ["À quatorze heures", "À quatre heures", "À dix heures", "À midi"],
      correct: "A",
      explanation: "Inès annonce qu'elle rappellera à quatorze heures, M. Blanc étant en réunion.",
    },
    {
      level: "A1",
      category: "météo",
      transcription:
        "Aujourd'hui, il pleut sur la Bretagne et il fait quinze degrés. En Provence, il fait chaud avec trente degrés et beaucoup de soleil.",
      prompt: "Quel temps fait-il en Provence ?",
      options: ["Il fait chaud et il y a du soleil", "Il pleut", "Il neige", "Il y a du brouillard"],
      correct: "A",
      explanation: "En Provence, il fait trente degrés avec beaucoup de soleil ; la pluie est en Bretagne.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Bonjour, je cherche un livre de cuisine pour mon frère. Il aime les plats italiens. Voici un livre sur les pâtes, il coûte douze euros.",
      prompt: "Quel livre propose le vendeur ?",
      options: ["Un livre sur les pâtes", "Un livre de poissons", "Un livre de desserts", "Un livre de voyage"],
      correct: "A",
      explanation: "Le vendeur propose un livre sur les pâtes, à douze euros, pour un amateur de cuisine italienne.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Le tramway ne circule pas ce matin entre la gare et le centre-ville à cause d'une panne. Un bus de remplacement est prévu toutes les dix minutes devant la gare.",
      prompt: "Où prendre le bus de remplacement ?",
      options: ["Devant la gare", "Au centre-ville", "À la mairie", "Près de l'hôpital"],
      correct: "A",
      explanation: "Le bus de remplacement passe toutes les dix minutes devant la gare.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Bonjour, ici le laboratoire d'analyses. Vos résultats sont disponibles. Vous pouvez les consulter sur notre site avec votre identifiant ou venir les chercher sur place.",
      prompt: "Comment consulter les résultats ?",
      options: ["Sur le site avec un identifiant ou sur place", "Par téléphone seulement", "Par courrier uniquement", "Chez le médecin"],
      correct: "A",
      explanation: "Les résultats sont accessibles en ligne avec un identifiant ou au laboratoire.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Bonsoir, je suis votre voisin du dessous. Il y a de l'eau qui coule au plafond de ma salle de bains. Pouvez-vous vérifier votre machine à laver, s'il vous plaît ?",
      prompt: "Quelle vérification le voisin du dessous demande-t-il ?",
      options: ["De vérifier la machine à laver", "De baisser la musique", "D'appeler le gardien demain", "De fermer la porte"],
      correct: "A",
      explanation: "Le voisin demande de contrôler la machine à laver, soupçonnée de provoquer la fuite.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Le week-end prochain, le zoo propose une journée spéciale pour les familles. Les enfants de moins de six ans entrent gratuitement et un spectacle de rapaces a lieu à quinze heures.",
      prompt: "Quand a lieu le spectacle ?",
      options: ["À quinze heures", "À dix heures", "À midi", "À dix-sept heures"],
      correct: "A",
      explanation: "Le spectacle de rapaces est annoncé pour quinze heures.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "À partir du mois prochain, les salariés pourront choisir leurs horaires dans une plage comprise entre sept heures et dix heures le matin. L'important sera de respecter le total de trente-cinq heures par semaine.",
      prompt: "Qu'est-ce qui doit être respecté ?",
      options: ["Le total de trente-cinq heures par semaine", "Un horaire unique pour tous", "Une présence le samedi", "Un congé obligatoire"],
      correct: "A",
      explanation: "Les horaires sont flexibles à condition de respecter trente-cinq heures hebdomadaires.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Cette année, l'université propose des cours de rattrapage gratuits en mathématiques pour les étudiants de première année. Les séances ont lieu le mercredi soir et l'inscription se fait directement auprès du secrétariat.",
      prompt: "Comment s'inscrire aux cours de rattrapage ?",
      options: ["Auprès du secrétariat", "Sur internet uniquement", "Par téléphone", "Par un enseignant"],
      correct: "A",
      explanation: "Les étudiants intéressés s'inscrivent directement au secrétariat.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "Je te remercie pour ton invitation, mais je ne pourrai pas venir à ta crémaillère samedi. J'ai déjà promis d'aider ma sœur à déménager. Je passerai peut-être plus tard dans la soirée si j'ai fini à temps.",
      prompt: "Quelle raison la personne donne-t-elle pour refuser l'invitation à la crémaillère ?",
      options: ["Elle aide sa sœur à déménager", "Elle part en vacances", "Elle est malade", "Elle travaille"],
      correct: "A",
      explanation: "Elle a déjà promis son aide à sa sœur pour un déménagement.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La commune rappelle que les feux de jardin sont interdits entre juin et septembre pour limiter le risque d'incendie. Les déchets verts doivent être déposés à la déchèterie, ouverte du lundi au samedi.",
      prompt: "Que faire des déchets verts en été ?",
      options: ["Les déposer à la déchèterie", "Les brûler au jardin", "Les jeter dans la rue", "Les enterrer"],
      correct: "A",
      explanation: "Les feux étant interdits, les déchets verts doivent être apportés à la déchèterie.",
    },
    {
      level: "B1",
      category: "achats",
      transcription:
        "Nous vous informons que votre commande est retardée à cause d'une rupture de stock. Elle sera expédiée sous huit jours. Si ce délai ne vous convient pas, vous pouvez annuler et être remboursé intégralement.",
      prompt: "Que peut faire le client si le délai ne lui convient pas ?",
      options: ["Annuler et être remboursé", "Changer de produit gratuitement", "Attendre trois semaines", "Payer un supplément"],
      correct: "A",
      explanation: "Le client a la possibilité d'annuler sa commande avec remboursement complet.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "La hausse du coût de l'énergie pèse particulièrement sur les petites entreprises, qui n'ont pas toujours les moyens d'investir dans des équipements plus économes. Les chambres de commerce réclament un dispositif d'aide ciblé, assorti d'un accompagnement technique pour identifier les économies possibles.",
      prompt: "Que réclament les chambres de commerce ?",
      options: ["Une aide ciblée accompagnée d'un appui technique", "La suppression de toutes les taxes", "Une hausse des prix de vente", "La fermeture des petites entreprises"],
      correct: "A",
      explanation: "Elles demandent une aide ciblée et un accompagnement pour réaliser des économies d'énergie.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Dans plusieurs lycées professionnels, des entreprises partenaires proposent des stages dès la classe de seconde. Les élèves y découvrent la réalité du métier, mais certains enseignants s'inquiètent d'un risque d'exploitation si ces périodes ne sont pas strictement encadrées.",
      prompt: "Quel risque certains enseignants évoquent-ils ?",
      options: ["Une exploitation des élèves si l'encadrement est insuffisant", "Un manque d'entreprises", "Des stages trop courts", "Une baisse des notes"],
      correct: "A",
      explanation: "Sans encadrement strict, les stages pourraient devenir un moyen d'exploiter les élèves.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Une librairie indépendante a transformé son arrière-boutique en café littéraire où se tiennent des rencontres, des lectures et des clubs de lecture. La libraire explique que ces activités attirent de nouveaux clients et fidélisent les habitués, tout en compensant une marge faible sur les ventes.",
      prompt: "Pourquoi ces activités sont-elles utiles à la librairie ?",
      options: ["Elles attirent et fidélisent des clients et compensent une marge faible", "Elles remplacent la vente de livres", "Elles réduisent le loyer", "Elles intéressent seulement les écrivains"],
      correct: "A",
      explanation: "Le café littéraire élargit et retient la clientèle tout en apportant un complément à des marges faibles.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les professionnels de la petite enfance alertent sur l'usage précoce des écrans. Selon eux, les enfants de moins de trois ans en ont besoin le moins possible, car les interactions avec les adultes, la parole et le jeu sont essentiels au développement du langage et de la motricité.",
      prompt: "Que jugent essentiel les professionnels pour les tout-petits ?",
      options: ["Les interactions avec les adultes, la parole et le jeu", "L'usage quotidien des tablettes", "La télévision avant le coucher", "Les jeux vidéo éducatifs"],
      correct: "A",
      explanation: "Pour le développement du langage et de la motricité, ils privilégient échanges, parole et jeu.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les cyberattaques contre les hôpitaux se multiplient, paralysant parfois pendant plusieurs jours l'accès aux dossiers des patients. Les responsables de la sécurité informatique réclament des moyens supplémentaires pour moderniser des systèmes souvent obsolètes, et formation régulière du personnel aux bons réflexes.",
      prompt: "Pourquoi les hôpitaux sont-ils vulnérables ?",
      options: ["Leurs systèmes informatiques sont souvent obsolètes", "Leurs patients sont trop nombreux", "Leurs médecins refusent la technologie", "Leurs locaux sont vétustes"],
      correct: "A",
      explanation: "Les responsables pointent des systèmes anciens et un besoin de formation du personnel.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "Dans de nombreuses villes, les jeunes se plaignent de l'absence de lieux pour se retrouver sans consommer. Des collectivités répondent en ouvrant des espaces de loisirs gratuits, encadrés par des animateurs, mais les jeunes concernés regrettent de ne pas avoir été consultés sur leur conception.",
      prompt: "Que regrettent les jeunes concernés ?",
      options: ["De ne pas avoir été consultés sur la conception", "Que les espaces soient gratuits", "Que les animateurs soient trop nombreux", "Que les lieux soient trop proches"],
      correct: "A",
      explanation: "Ils auraient souhaité participer à la définition de ces lieux qui leur sont destinés.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "Le débat sur la décentralisation oppose ceux qui voient dans les collectivités le meilleur échelon pour répondre aux besoins du terrain, et ceux qui redoutent un morcellement de l'égalité républicaine, certains services variant sensiblement d'un territoire à l'autre selon les moyens des élus.",
      prompt: "Quelle crainte est exprimée à propos de la décentralisation ?",
      options: ["Un morcellement de l'égalité entre territoires", "Un excès de centralisation", "La suppression des élus", "Une uniformisation totale"],
      correct: "A",
      explanation: "Les critiques redoutent que les services publics diffèrent trop selon les territoires.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "L'agriculture biologique progresse, mais elle ne représente encore qu'une part limitée des surfaces cultivées. Ses défenseurs soulignent ses bénéfices pour les sols et la biodiversité ; ses critiques notent des rendements plus faibles, ce qui interroge la capacité d'un tel modèle à nourrir une population croissante sans étendre les surfaces.",
      prompt: "Quelle critique est adressée à l'agriculture biologique ?",
      options: ["Ses rendements plus faibles", "Son usage excessif de pesticides", "Sa disparition prochaine", "Ses prix trop bas"],
      correct: "A",
      explanation: "Ses détracteurs soulignent que des rendements inférieurs rendent difficile de nourrir davantage de monde.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "Les neurosciences nourrissent un enthousiasme considérable, parfois excessif : on leur demande d'expliquer des comportements aussi complexes que le choix amoureux ou la créativité. Les chercheurs eux-mêmes invitent à la modération, rappelant que corréler une activité cérébrale à un comportement ne revient pas à en rendre compte.",
      prompt: "Quel message les chercheurs adressent-ils ?",
      options: ["Corréler activité cérébrale et comportement ne suffit pas à l'expliquer", "Le cerveau n'a aucun rôle", "Les neurosciences sont inutiles", "Il faut abandonner les études"],
      correct: "A",
      explanation: "Ils appellent à la prudence : repérer une corrélation n'explique pas encore le comportement.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Le travail des enfants dans les chaînes d'approvisionnement mondiales demeure un problème persistant. Si des législations imposent désormais aux grandes entreprises un devoir de vigilance, les ONG soulignent que ces textes s'appliquent mal aux fournisseurs de rang éloigné, où les contrôles sont les plus difficiles.",
      prompt: "Quelle limite des législations les ONG soulignent-elles ?",
      options: ["Elles s'appliquent mal aux fournisseurs éloignés", "Elles interdisent le commerce", "Elles ne concernent que les enfants", "Elles sont trop strictes"],
      correct: "A",
      explanation: "Le devoir de vigilance peine à atteindre les fournisseurs de rang éloigné, où les contrôles sont rares.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "On confond souvent tolérance et indifférence : tolérer, ce serait laisser chacun penser ce qu'il veut, sans s'en soucier. Or la tolérance véritable suppose au contraire de se sentir concerné par ce que l'autre croit, tout en acceptant de ne pas le contraindre. Elle est moins un relâchement qu'une exigence, qui engage à écouter sans renoncer à discuter.",
      prompt: "Comment l'orateur définit-il la tolérance véritable ?",
      options: ["Se sentir concerné par l'autre sans le contraindre", "Ne se soucier de rien", "Imposer ses idées", "Éviter toute discussion"],
      correct: "A",
      explanation: "La tolérance, loin de l'indifférence, engage à écouter et à débattre sans contrainte.",
    },
    {
      level: "C2",
      category: "économie",
      transcription:
        "Les indicateurs économiques usuels, produit intérieur brut en tête, rendent mal compte du bien-être réel d'une population : ils ignorent les inégalités, la qualité de l'environnement, la valeur du travail non rémunéré. Les remplacer n'est pas simple, car tout nouvel indicateur soulève à son tour la question de ce que l'on décide de compter, et donc de valoriser.",
      prompt: "Quelle difficulté soulève le remplacement des indicateurs usuels ?",
      options: ["Tout nouvel indicateur pose la question de ce que l'on valorise", "Les chiffres sont introuvables", "Les États refusent de compter", "Le PIB est parfait"],
      correct: "A",
      explanation: "Choisir un indicateur revient à choisir ce que l'on juge digne d'être compté et valorisé.",
    },
    {
      level: "C2",
      category: "histoire",
      transcription:
        "Le travail de mémoire ne consiste pas seulement à se souvenir : il suppose d'accepter que le passé comporte des zones d'ombre qui ne s'accordent pas toujours avec l'image que l'on souhaite donner de soi. C'est à cette condition, exigeante, qu'une société peut regarder son histoire sans la sacraliser ni la renier.",
      prompt: "À quelle condition une société peut-elle regarder son histoire sans la sacraliser ni la renier ?",
      options: ["En acceptant les zones d'ombre de son passé", "En oubliant les événements douloureux", "En ne retenant que les succès", "En confiant l'histoire à l'État seul"],
      correct: "A",
      explanation: "Il faut admettre que le passé comporte des aspects qui contredisent l'image idéale que l'on s'en fait.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "articles",
      prompt: "Ils ont acheté ___ appartement dans le centre de Lyon.",
      options: ["un", "une", "des", "du"],
      correct: "A",
      explanation: "« Appartement » est masculin singulier : l'article indéfini est « un ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Je ne ___ pas où j'ai laissé mes lunettes.",
      options: ["sais", "sait", "savons", "savent"],
      correct: "A",
      explanation: "Le sujet « je » demande la forme « sais » au présent.",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Tu as parlé à Marie ? Oui, je ___ ai parlé ce matin.",
      options: ["lui", "la", "l'", "leur"],
      correct: "A",
      explanation: "« Parler à quelqu'un » : le complément indirect singulier se remplace par « lui ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le livre ___ tu m'as prêté est passionnant.",
      options: ["que", "qui", "dont", "où"],
      correct: "A",
      explanation: "« Que » est complément d'objet direct de « as prêté » et reprend « le livre ».",
    },
    {
      level: "B1",
      category: "expression du temps",
      prompt: "Je vais à la piscine ___ dix ans ; j'adore nager.",
      options: ["depuis", "pendant", "il y a", "en"],
      correct: "A",
      explanation: "« Depuis » exprime une durée qui se poursuit jusqu'à maintenant.",
    },
    {
      level: "B1",
      category: "futur proche",
      prompt: "Regarde ce ciel noir : il ___ pleuvoir.",
      options: ["va", "vas", "vont", "voulait"],
      correct: "A",
      explanation: "Le futur proche s'exprime avec « aller » conjugué : « il va pleuvoir ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Nous sommes arrivés ___ la gare avec dix minutes d'avance.",
      options: ["à", "dans", "sur", "chez"],
      correct: "A",
      explanation: "On dit « arriver à la gare » : la préposition « à » marque le lieu d'arrivée.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Je voudrais que tu ___ plus attention à tes affaires.",
      options: ["fasses", "fais", "feras", "ferais"],
      correct: "A",
      explanation: "« Vouloir que » est suivi du subjonctif présent : « que tu fasses ».",
    },
    {
      level: "B2",
      category: "expression de la condition",
      prompt: "Nous partirons demain ___ il fasse beau.",
      options: ["pourvu qu'", "parce qu'", "bien qu'", "alors qu'"],
      correct: "A",
      explanation: "« Pourvu que » exprime une condition souhaitée et se construit avec le subjonctif.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Le nouveau pont ___ par le maire samedi prochain.",
      options: ["sera inauguré", "inaugurera", "a inauguré", "inaugurait"],
      correct: "A",
      explanation: "Le pont subit l'action : passif au futur, « sera inauguré ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Si tu m'___ plus tôt, j'aurais pu t'aider.",
      options: ["avais appelé", "appelais", "appellerais", "as appelé"],
      correct: "A",
      explanation: "Hypothèse irréelle dans le passé : « si + plus-que-parfait », soit « avais appelé ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "Elle s'est détendue ___ de la musique classique.",
      options: ["en écoutant", "écoutant", "à écouter", "écoutée"],
      correct: "A",
      explanation: "Le gérondif « en écoutant » indique la manière dont elle s'est détendue.",
    },
    {
      level: "B2",
      category: "pronoms démonstratifs",
      prompt: "Parmi toutes ces robes, ___ que je préfère est la rouge.",
      options: ["celle", "celui", "ceux", "ce"],
      correct: "A",
      explanation: "Le pronom féminin singulier « celle » reprend « robe » dans la construction « celle que ».",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Il m'a promis qu'il m'___ dès son arrivée.",
      options: ["appellerait", "appelle", "appellera", "appelait"],
      correct: "A",
      explanation: "Dans le discours rapporté au passé, le futur devient conditionnel : « appellerait ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Il se peut que la réunion ___ reportée à la semaine prochaine.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation: "« Il se peut que » est suivi du subjonctif : « que la réunion soit reportée ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Voici les raisons ___ je vous écris aujourd'hui.",
      options: ["pour lesquelles", "dont", "que", "où"],
      correct: "A",
      explanation: "« Pour » impose « lesquelles » avec un antécédent féminin pluriel : « les raisons pour lesquelles ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ nous voulons, c'est une réponse claire et rapide.",
      options: ["Ce que", "Ce qui", "Ce dont", "Celui que"],
      correct: "A",
      explanation: "« Ce que » est complément d'objet direct de « voulons » dans la structure « ce que… c'est… ».",
    },
    {
      level: "C1",
      category: "concordance des temps",
      prompt: "Elle a confié qu'elle ___ longtemps hésité avant de partir.",
      options: ["avait", "a", "aura", "eut"],
      correct: "A",
      explanation: "Le plus-que-parfait « avait hésité » exprime l'antériorité dans le discours rapporté.",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Qu'il s'agisse de politique ou d'économie, les experts ne ___ pas d'accord.",
      options: ["sont", "soient", "seront", "seraient"],
      correct: "A",
      explanation: "Après « qu'il s'agisse de », la proposition suivante est indépendante et reste à l'indicatif : « ne sont pas d'accord ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "À peine ___-il arrivé qu'il demanda à parler au directeur.",
      options: ["fut", "est", "était", "serait"],
      correct: "A",
      explanation: "Après « à peine » en langue soutenue, on emploie le passé antérieur avec inversion : « à peine fut-il arrivé ».",
    },
  ],
  reading: [
    {
      title: "Avis de passage du facteur",
      text: p(
        "Un colis à votre nom n'a pas pu vous être remis ce matin. Il est disponible au bureau de poste de votre quartier pendant quinze jours.",
        "Munissez-vous de ce courrier et d'une pièce d'identité pour le retirer. Passé ce délai, il sera renvoyé à l'expéditeur.",
      ),
      question: {
        level: "B1",
        prompt: "Que se passera-t-il après quinze jours ?",
        options: ["Le colis sera renvoyé à l'expéditeur", "Le colis sera livré à domicile", "Le colis sera jeté", "Le colis sera gardé pour toujours"],
        correct: "A",
        explanation: "Passé le délai de quinze jours, le colis retourne à l'expéditeur.",
      },
    },
    {
      title: "Affiche : cours de théâtre d'improvisation",
      text: p(
        "Envie de vous exprimer et de rencontrer du monde ? Rejoignez notre atelier d'improvisation théâtrale chaque mardi soir à 19 h 30.",
        "Aucune expérience nécessaire. Séance d'essai gratuite. Tarif annuel : 120 euros, payable en trois fois.",
      ),
      question: {
        level: "B1",
        prompt: "Peut-on payer l'inscription en plusieurs fois ?",
        options: ["Oui, en trois fois", "Non, en une seule fois", "Oui, en dix fois", "Seulement par chèque"],
        correct: "A",
        explanation: "Le tarif annuel de 120 euros est payable en trois fois.",
      },
    },
    {
      title: "Message d'un professeur",
      text: p(
        "Chers parents, la sortie au musée prévue jeudi est reportée au 15 mai en raison des grèves de transports.",
        "Les autorisations déjà signées restent valables. Merci de ne pas en renvoyer de nouvelles.",
      ),
      question: {
        level: "B1",
        prompt: "Pourquoi la sortie est-elle reportée ?",
        options: ["À cause des grèves de transports", "À cause de la météo", "À cause d'une maladie", "À cause d'une réparation du musée"],
        correct: "A",
        explanation: "Le report est dû aux grèves de transports.",
      },
    },
    {
      title: "Règlement de la piscine",
      text: p(
        "Pour des raisons d'hygiène, le port du bonnet de bain est obligatoire. Il est également interdit de courir sur les bords des bassins.",
        "Les enfants de moins de dix ans doivent être accompagnés d'un adulte. Merci de respecter les consignes du personnel.",
      ),
      question: {
        level: "B1",
        prompt: "Qu'est-ce qui est obligatoire dans la piscine ?",
        options: ["Le port du bonnet de bain", "Le port des lunettes", "La douche froide", "Une serviette bleue"],
        correct: "A",
        explanation: "Le règlement impose le bonnet de bain pour des raisons d'hygiène.",
      },
    },
    {
      title: "Offre de covoiturage",
      text: p(
        "Je fais le trajet Rennes-Nantes tous les vendredis soir. Il me reste deux places dans ma voiture. Départ à 17 h 30 de la gare.",
        "Je demande une participation de dix euros pour l'essence. Contactez-moi par message pour réserver votre place.",
      ),
      question: {
        level: "B1",
        prompt: "Que demande le conducteur aux passagers ?",
        options: ["Une participation de dix euros", "Un permis de conduire", "Un repas", "Rien du tout"],
        correct: "A",
        explanation: "Le conducteur demande dix euros pour couvrir l'essence.",
      },
    },
    {
      title: "Les salons de coiffure solidaires",
      text: p(
        "Certains coiffeurs offrent chaque mois une journée de coupes gratuites aux personnes sans domicile. L'initiative leur permet de retrouver confiance et de se présenter plus sereinement à des entretiens.",
        "Les organisateurs recherchent des coiffeurs volontaires, mais constatent que beaucoup hésitent à immobiliser leur salon une journée entière.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les coiffeurs hésitent-ils à participer ?",
        options: ["Ils ne veulent pas immobiliser leur salon une journée entière", "Ils refusent d'aider", "Ils manquent de clients", "Ils n'ont pas le matériel"],
        correct: "A",
        explanation: "Consacrer toute une journée à cette action signifie renoncer à l'activité habituelle du salon.",
      },
    },
    {
      title: "Un cinéma associatif en milieu rural",
      text: p(
        "Dans ce village, une association a rouvert le cinéma fermé depuis vingt ans. Une fois par semaine, elle propose un film, souvent suivi d'un échange avec un invité, et l'entrée est à tarif réduit.",
        "Les bénévoles sont heureux de ce succès, mais admettent que le matériel de projection, très coûteux à renouveler, menace la poursuite de l'activité.",
      ),
      question: {
        level: "B2",
        prompt: "Qu'est-ce qui menace la poursuite de l'activité ?",
        options: ["Le coût du matériel de projection", "Le manque de films", "Le départ des habitants", "Le bruit du village"],
        correct: "A",
        explanation: "Renouveler le matériel de projection est très onéreux pour l'association.",
      },
    },
    {
      title: "L'accompagnement des aidants",
      text: p(
        "En France, des millions de personnes aident un proche malade, âgé ou handicapé. Elles assument des tâches quotidiennes sans formation, souvent en parallèle d'une activité professionnelle, et en subissent les conséquences sur leur santé.",
        "Des structures de répit leur permettent de souffler quelques jours, mais elles sont peu nombreuses et leurs tarifs restent hors de portée de beaucoup de familles.",
      ),
      question: {
        level: "B2",
        prompt: "Quel obstacle limite l'accès aux structures de répit ?",
        options: ["Leur petit nombre et leurs tarifs élevés", "L'absence de besoin", "Le refus des aidants", "La distance des hôpitaux"],
        correct: "A",
        explanation: "Peu de structures existent, et leur coût les rend inaccessibles à de nombreuses familles.",
      },
    },
    {
      title: "La reconversion du charbon",
      text: p(
        "Dans les anciens bassins miniers, la fin de l'extraction a laissé des territoires marqués par le chômage. Des programmes de reconversion y financent des formations aux métiers de l'énergie, de la logistique ou du numérique.",
        "Les habitants saluent ces efforts, mais restent prudents : ils ont déjà connu des promesses d'emplois qui n'ont pas toujours été tenues.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les habitants restent-ils prudents ?",
        options: ["Des promesses d'emplois n'ont pas toujours été tenues", "Les formations sont interdites", "Les mines ont rouvert", "Le chômage a disparu"],
        correct: "A",
        explanation: "Leur expérience passée les a rendus sceptiques envers de nouvelles promesses.",
      },
    },
    {
      title: "Les maisons d'assistantes maternelles",
      text: p(
        "Les maisons d'assistantes maternelles permettent à plusieurs professionnelles d'accueillir ensemble des enfants dans un même lieu. Les parents y trouvent des horaires souples et des tarifs plus accessibles qu'en crèche privée.",
        "Les assistantes apprécient le travail en équipe, mais regrettent que l'obtention d'un local adapté soit un parcours difficile, qui décourage certaines vocations.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté les assistantes rencontrent-elles ?",
        options: ["Obtenir un local adapté", "Trouver des enfants", "Travailler en équipe", "Réduire leurs tarifs"],
        correct: "A",
        explanation: "Trouver et faire valider un local adapté est complexe et décourage certaines candidates.",
      },
    },
    {
      title: "Des jardins pour tous les âges",
      text: p(
        "Dans ce quartier, un jardin partagé réunit des enfants, des actifs et des retraités autour de bacs de culture. Chacun y apporte son savoir : les anciens transmettent les gestes, les jeunes proposent de nouvelles variétés.",
        "Les participants soulignent la dimension sociale du lieu, plus importante à leurs yeux que les récoltes, et se réjouissent de voir les liens se tisser au fil des saisons.",
      ),
      question: {
        level: "B2",
        prompt: "Qu'est-ce qui compte le plus pour les participants ?",
        options: ["La dimension sociale du lieu", "Le volume des récoltes", "Le prix des graines", "Le nombre de bacs"],
        correct: "A",
        explanation: "Pour eux, la dimension sociale du jardin passe avant la production.",
      },
    },
    {
      title: "Le droit des animaux",
      text: p(
        "Les animaux sont désormais reconnus comme des êtres sensibles dans le droit de plusieurs pays. Cette évolution s'est traduite par de nouvelles règles sur l'élevage, le transport et la détention d'animaux de compagnie.",
        "Des associations estiment qu'elle reste insuffisante, car les contrôles sont rares et les sanctions rarement dissuasives, ce qui limite la portée des textes.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les associations jugent-elles la portée des textes limitée ?",
        options: ["Les contrôles sont rares et les sanctions peu dissuasives", "Les animaux n'ont pas de droits", "Les textes sont trop récents", "Les éleveurs ont disparu"],
        correct: "A",
        explanation: "Sans contrôles ni sanctions efficaces, les règles restent peu appliquées.",
      },
    },
    {
      title: "Les fêtes de village menacées",
      text: p(
        "Les fêtes de village, rendez-vous traditionnel de l'été, peinent à se maintenir. Les organisateurs, souvent bénévoles et vieillissants, doivent faire face à des obligations de sécurité de plus en plus strictes et à des coûts d'assurance en hausse.",
        "Certaines communes choisissent de mutualiser l'organisation entre villages voisins, une solution qui permet de partager les charges mais qui, parfois, dilue l'identité de chaque fête.",
      ),
      question: {
        level: "B2",
        prompt: "Quel inconvénient la mutualisation présente-t-elle ?",
        options: ["Elle peut diluer l'identité de chaque fête", "Elle augmente les coûts", "Elle supprime les bénévoles", "Elle interdit les fêtes"],
        correct: "A",
        explanation: "En partageant l'organisation, on risque de perdre ce qui fait la particularité de chaque fête.",
      },
    },
    {
      title: "Les villes face aux canicules",
      text: p(
        "Les épisodes de canicule se multiplient et frappent particulièrement les villes, où le béton emmagasine la chaleur. Les urbanistes recommandent de végétaliser les espaces, de créer des îlots de fraîcheur et de renouveler l'air dans les bâtiments.",
        "Ces aménagements demandent du temps et des investissements, et se heurtent parfois à la réticence d'habitants attachés à leurs places de stationnement, que la plantation d'arbres fait disparaître.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle réticence les habitants expriment-ils ?",
        options: ["Ils tiennent à leurs places de stationnement", "Ils refusent la fraîcheur", "Ils n'aiment pas les arbres exotiques", "Ils craignent l'ombre"],
        correct: "A",
        explanation: "Planter des arbres supprime des places de stationnement, ce qui déplaît à certains habitants.",
      },
    },
    {
      title: "Un tiers-lieu pour les associations",
      text: p(
        "Installé dans une ancienne école, ce tiers-lieu met à disposition des salles à tarif réduit pour des associations locales. On y croise des cours de langue, des répétitions de théâtre, des permanences juridiques et un atelier de réparation.",
        "Les usagers apprécient cette concentration d'activités, mais certains regrettent que les créneaux soient difficiles à obtenir, tant la demande dépasse la capacité du lieu.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrettent certains usagers du tiers-lieu ?",
        options: ["La difficulté d'obtenir des créneaux", "Le prix élevé des salles", "L'absence d'activités", "L'éloignement du centre"],
        correct: "A",
        explanation: "La demande est supérieure à la capacité du lieu : obtenir un créneau est compliqué.",
      },
    },
    {
      title: "Le défi des déserts médicaux",
      text: p(
        "Dans de nombreux territoires ruraux, trouver un médecin traitant relève du parcours du combattant. Les cabinets ferment au départ à la retraite de leurs titulaires, faute de successeurs, et les patients doivent parcourir des dizaines de kilomètres pour une consultation.",
        "Les pouvoirs publics multiplient les incitations : bourses pour les étudiants qui s'engagent à s'installer, maisons de santé, télémédecine. Ces mesures produisent des effets, mais lents et inégaux, car la désaffection des jeunes médecins pour l'exercice isolé tient aussi à des raisons qui dépassent la rémunération : conditions de travail, vie familiale, accès aux services pour leurs proches. Aucune solution ne sera durable sans prendre en compte cette dimension globale de l'attractivité d'un territoire.",
      ),
      question: {
        level: "C1",
        prompt: "Que faut-il prendre en compte pour des solutions durables ?",
        options: ["L'attractivité globale du territoire, au-delà de la rémunération", "Uniquement le salaire des médecins", "La seule télémédecine", "La suppression des maisons de santé"],
        correct: "A",
        explanation: "Les médecins sont sensibles à la qualité de vie du territoire, qui dépasse la question de la rémunération.",
      },
    },
    {
      title: "La recherche face aux crises",
      text: p(
        "Les crises récentes ont rappelé le rôle central de la recherche dans la réponse aux urgences sanitaires et climatiques. Des vaccins mis au point en un temps record ont montré ce que permet la mobilisation conjointe de moyens publics et privés, de données partagées et de collaborations internationales.",
        "Cette réussite ne doit pourtant pas masquer ses conditions : elle repose sur des décennies de recherche fondamentale, financée sans garantie de retombées immédiates. Réduire les budgets de cette recherche pour concentrer les moyens sur des applications rapides reviendrait à tarir la source dont on attend ensuite des solutions, comme si l'on pouvait récolter sans avoir semé. L'urgence des crises ne dispense donc pas de penser la durée.",
      ),
      question: {
        level: "C1",
        prompt: "Que serait-il erroné de faire selon le texte ?",
        options: ["Réduire la recherche fondamentale pour ne financer que les applications rapides", "Partager les données entre pays", "Financer des vaccins", "Penser la durée"],
        correct: "A",
        explanation: "Les solutions rapides s'appuient sur des décennies de recherche fondamentale : la sacrifier reviendrait à tarir cette source.",
      },
    },
    {
      title: "L'économie de la fonctionnalité",
      text: p(
        "L'économie de la fonctionnalité repose sur une idée simple : vendre l'usage d'un bien plutôt que le bien lui-même. On ne possède plus une perceuse ou une voiture, on paie pour s'en servir au moment voulu. Ce modèle promet de réduire la production d'objets rarement utilisés et d'inciter les fabricants à concevoir des produits plus durables.",
        "Son déploiement soulève toutefois des questions. Si le fabricant reste propriétaire, il a intérêt à allonger la durée de vie de ses produits, mais il acquiert aussi un contrôle accru sur leur usage, voire sur les données de ceux qui les utilisent. Entre bénéfice écologique et dépendance accrue du consommateur, la balance n'est pas évidente, et dépend largement des garanties qui encadreront ces nouveaux contrats.",
      ),
      question: {
        level: "C1",
        prompt: "Quel inconvénient potentiel le texte signale-t-il pour le consommateur ?",
        options: ["Une dépendance accrue envers le fabricant", "Un prix toujours plus bas", "Une perte de qualité garantie", "L'impossibilité d'utiliser le produit"],
        correct: "A",
        explanation: "Le fabricant reste propriétaire et contrôle l'usage, ce qui peut accroître la dépendance de l'utilisateur.",
      },
    },
    {
      title: "Les bibliothèques universitaires à l'ère du numérique",
      text: p(
        "Les bibliothèques universitaires voient leurs usages se transformer. Si les étudiants consultent moins les ouvrages papier, ils fréquentent davantage les lieux pour travailler en groupe, accéder au wifi ou profiter d'un cadre calme. Les établissements adaptent donc leurs espaces : salles de travail collectif, horaires élargis, services en ligne.",
        "Cette évolution n'est pas sans tension. Les budgets d'acquisition se tournent vers les abonnements numériques, dont les tarifs, fixés par quelques grands éditeurs, augmentent plus vite que les ressources des universités. Les bibliothécaires déplorent ainsi une dépendance accrue, qui réduit leur marge de manœuvre pour constituer des fonds diversifiés, et appellent à soutenir des modèles de publication moins coûteux et plus ouverts.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle conséquence de la hausse des abonnements numériques est mentionnée ?",
        options: ["Une marge de manœuvre réduite pour constituer des fonds diversifiés", "Une baisse des prix", "Une disparition des bibliothèques", "Un retour massif au papier"],
        correct: "A",
        explanation: "La dépendance aux grands éditeurs limite la capacité des bibliothèques à diversifier leurs collections.",
      },
    },
    {
      title: "L'urbanisme et la participation",
      text: p(
        "Associer les habitants aux projets d'aménagement est devenu un impératif affiché. Réunions publiques, ateliers, plateformes en ligne se multiplient. On espère ainsi mieux répondre aux besoins du terrain et prévenir les contestations, souvent coûteuses en temps et en argent pour les collectivités.",
        "Pourtant, la participation reste délicate à mettre en œuvre. Ceux qui s'expriment ne sont pas toujours représentatifs, et les décisions finales sont parfois prises avant que la consultation n'ait lieu, ce qui nourrit le sentiment d'un exercice de façade. Pour que la concertation soit crédible, les collectivités doivent préciser d'emblée ce qui est négociable et ce qui ne l'est pas, afin d'éviter les attentes déçues et la méfiance qu'elles engendrent.",
      ),
      question: {
        level: "C1",
        prompt: "Que doivent préciser les collectivités pour rendre la concertation crédible ?",
        options: ["Ce qui est négociable et ce qui ne l'est pas", "Le nombre de participants", "Le coût des ateliers", "La date de fin des travaux uniquement"],
        correct: "A",
        explanation: "Clarifier dès le départ la marge de négociation évite les attentes déçues et la méfiance.",
      },
    },
    {
      title: "Le temps de la décision",
      text: p(
        "Dans un monde où l'information circule instantanément, on attend des décideurs qu'ils réagissent sans délai. Cette exigence de rapidité, alimentée par les médias et les réseaux sociaux, tend à faire de l'annonce un substitut à l'action : on répond à l'émotion du moment par une mesure visible, quitte à en négliger les effets de long terme.",
        "Or certaines décisions ne gagnent rien à la précipitation. Elles supposent de peser des intérêts contradictoires, de consulter ceux qu'elles concernent, d'évaluer des conséquences que l'on ne perçoit qu'avec du recul. Rendre à la délibération sa légitimité ne revient pas à défendre la lenteur pour elle-même, mais à reconnaître que la qualité d'une décision tient aussi au temps qu'on a pris pour la comprendre, et à la possibilité laissée à chacun de s'en faire une idée avant qu'elle ne s'impose comme un fait accompli.",
      ),
      question: {
        level: "C2",
        prompt: "Que défend l'auteur à propos de la délibération ?",
        options: ["Que la qualité d'une décision tient aussi au temps pris pour la comprendre", "Que la lenteur est toujours préférable", "Que les annonces valent des actes", "Que l'on doit réagir instantanément"],
        correct: "A",
        explanation: "L'auteur ne défend pas la lenteur en soi, mais le temps nécessaire pour bien comprendre une décision.",
      },
    },
    {
      title: "Penser l'obsolescence",
      text: p(
        "Nos objets quotidiens semblent conçus pour ne pas durer : batteries non remplaçables, pièces introuvables, mises à jour qui ralentissent les appareils anciens. L'obsolescence, programmée ou non, nourrit un cycle de consommation dont les conséquences écologiques sont considérables, mais dont l'intérêt économique pour les fabricants rend la remise en cause délicate.",
        "Pour sortir de cette logique, il ne suffit pas d'interdire des pratiques jugées abusives. Il faut aussi transformer la manière dont nous valorisons les objets, en réhabilitant la réparation, la transmission, l'usage prolongé. C'est un changement culturel autant que réglementaire : accepter qu'un objet qui dure ne soit pas un objet démodé, mais le support d'une relation qui s'approfondit avec le temps, et dont la valeur ne se réduit pas à sa dernière version commercialisée ni à son prix d'achat.",
      ),
      question: {
        level: "C2",
        prompt: "Quel changement l'auteur juge-t-il nécessaire au-delà de la réglementation ?",
        options: ["Un changement culturel dans la manière de valoriser les objets", "La suppression de tous les objets", "Une interdiction de la réparation", "Une hausse des mises à jour"],
        correct: "A",
        explanation: "Il faut modifier notre regard sur la durée et la réparation, pas seulement interdire des pratiques.",
      },
    },
    {
      title: "L'éthique du soin",
      text: p(
        "Prendre soin de quelqu'un ne se limite pas à fournir des prestations techniques : c'est aussi se rendre disponible, reconnaître la singularité de l'autre dans sa vulnérabilité. Cette dimension relationnelle, que les soignants décrivent comme l'essence de leur métier, est paradoxalement la moins visible dans les indicateurs de performance des établissements.",
        "À mesure que les organisations hospitalières se rationalisent, le temps consacré à l'écoute tend à s'amenuiser, au profit d'actes mieux mesurables. Il en résulte une souffrance éthique chez les soignants, qui ont le sentiment de ne plus pouvoir faire correctement ce qu'ils estiment juste. Redonner de la place au soin dans sa dimension humaine suppose de remettre en cause une conception de l'efficacité réduite à ce qui se compte, et reconnaître que ce qui ne se compte pas n'en est pas moins ce qui rend un soin véritablement humain.",
      ),
      question: {
        level: "C2",
        prompt: "Qu'est-ce qui provoque la souffrance éthique des soignants ?",
        options: ["Ne plus pouvoir faire ce qu'ils estiment juste faute de temps d'écoute", "Le manque de salaires élevés", "La trop grande présence des patients", "L'excès de temps libre"],
        correct: "A",
        explanation: "La rationalisation réduit le temps d'écoute, ce qui les empêche d'exercer selon leurs valeurs.",
      },
    },
    {
      title: "Penser la fin de vie",
      text: p(
        "Les débats sur la fin de vie mettent en jeu des convictions profondes, que les arguments juridiques ou médicaux ne suffisent pas à départager. Pour les uns, l'autonomie de la personne justifie qu'elle puisse décider du moment et des conditions de sa mort ; pour les autres, la dignité de la vie interdit d'y mettre fin volontairement, et la protection des plus fragiles doit primer.",
        "Ces positions ne s'opposent pas seulement par leurs conclusions, mais par leur manière de concevoir la dignité : comme maîtrise de soi ou comme valeur inconditionnelle. Aucun consensus ne semblant possible à court terme, le défi consiste à construire un cadre qui reconnaisse la gravité de la question, garantisse à chacun un accompagnement de qualité et préserve, autant que possible, la capacité de discuter sans se condamner mutuellement.",
      ),
      question: {
        level: "C2",
        prompt: "En quoi les deux positions s'opposent-elles profondément ?",
        options: ["Dans leur manière de concevoir la dignité", "Dans le nombre de lois", "Dans leur confiance envers la médecine", "Dans leur ancienneté"],
        correct: "A",
        explanation: "Pour les uns, la dignité est maîtrise de soi ; pour les autres, valeur inconditionnelle de la vie.",
      },
    },
    {
      title: "La parole et l'écoute",
      text: p(
        "Notre époque valorise l'expression : chacun est invité à donner son avis, à se raconter, à faire entendre sa voix. Mais la parole n'a de sens que si quelqu'un l'écoute, et l'écoute, parent pauvre de cette culture de l'expression, est plus rare qu'on ne le croit. On parle beaucoup, on s'entend peu, et l'abondance des voix peut créer l'illusion d'un dialogue là où chacun poursuit un monologue.",
        "Cultiver l'écoute n'est pas un simple supplément de politesse : c'est la condition d'une pensée commune. Écouter, c'est accepter de se laisser modifier par ce que dit l'autre, au moins le temps de le comprendre, et reconnaître que sa propre position n'est pas le centre de la discussion. Sans cette disposition, la multiplication des espaces d'expression ne produit que des juxtapositions de certitudes, incapables de s'éclairer mutuellement.",
      ),
      question: {
        level: "C2",
        prompt: "Que risque la multiplication des espaces d'expression sans écoute ?",
        options: ["Des juxtapositions de certitudes qui ne s'éclairent pas mutuellement", "Un vrai dialogue", "Un silence complet", "Une uniformité des opinions"],
        correct: "A",
        explanation: "Sans écoute véritable, les voix restent côte à côte sans jamais s'enrichir l'une l'autre.",
      },
    },
  ],
});
