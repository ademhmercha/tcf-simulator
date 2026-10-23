import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 6.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_06 = defineFullTest({
  number: 6,
  description:
    "Sixième examen blanc : un parcours complet pour mesurer ses progrès, mêlant situations du quotidien et documents exigeants jusqu'au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "animaux",
      transcription:
        "Bonjour, vous êtes bien au cabinet vétérinaire. Nous sommes ouverts du lundi au vendredi, de neuf heures à dix-huit heures. Le samedi, les consultations ont lieu uniquement sur rendez-vous. En cas d'urgence, appelez le service de garde.",
      prompt: "Comment se déroule le samedi au cabinet ?",
      options: [
        "Les consultations ont lieu sur rendez-vous",
        "Le cabinet est fermé toute la journée",
        "Les urgences sont refusées",
        "Les horaires sont prolongés jusqu'à vingt heures",
      ],
      correct: "A",
      explanation:
        "Le message précise que le samedi, les consultations sont assurées uniquement sur rendez-vous.",
    },
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Salut Paul, c'est Léa. Le film commence à vingt heures, mais retrouvons-nous devant le cinéma un quart d'heure avant. J'ai déjà pris les billets, tu n'as rien à payer.",
      prompt: "À quelle heure se donnent-ils rendez-vous ?",
      options: [
        "À dix-neuf heures quarante-cinq",
        "À vingt heures",
        "À dix-neuf heures",
        "À vingt heures quinze",
      ],
      correct: "A",
      explanation:
        "Le rendez-vous est fixé un quart d'heure avant la séance de vingt heures, soit à dix-neuf heures quarante-cinq.",
    },
    {
      level: "A1",
      category: "travail",
      transcription:
        "Allô, c'est Nadia. J'ai oublié mes clés au bureau. Est-ce que tu peux les récupérer à l'accueil avant dix-sept heures ? Le gardien les gardera jusqu'à sa fermeture.",
      prompt: "Que doit faire la personne appelée ?",
      options: [
        "Récupérer les clés à l'accueil",
        "Fermer le bureau à dix-sept heures",
        "Apporter les clés à Nadia chez elle",
        "Prévenir le gardien de l'oubli",
      ],
      correct: "A",
      explanation:
        "Nadia demande explicitement de récupérer ses clés à l'accueil avant dix-sept heures.",
    },
    {
      level: "A2",
      category: "services",
      transcription:
        "Bonjour, vos chaussures seront prêtes vendredi après-midi. La réparation coûte vingt-cinq euros. Vous pourrez régler lors du retrait, par carte ou en espèces.",
      prompt: "Quand le client pourra-t-il retirer ses chaussures ?",
      options: [
        "Vendredi après-midi",
        "Jeudi matin",
        "Samedi midi",
        "Dans deux semaines",
      ],
      correct: "A",
      explanation:
        "Le cordonnier annonce que la réparation sera terminée vendredi après-midi.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Le cours de théâtre débutera le douze septembre. Il aura lieu tous les mardis, de dix-huit heures à vingt heures. Pensez à apporter des vêtements souples et une bouteille d'eau.",
      prompt: "Quand se déroulera le cours de théâtre ?",
      options: [
        "Le mardi soir",
        "Le jeudi matin",
        "Le samedi après-midi",
        "Tous les soirs",
      ],
      correct: "A",
      explanation:
        "Le cours est programmé chaque mardi, de dix-huit heures à vingt heures, donc en soirée.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Samedi, je déménage. Le camion est réservé à neuf heures et deux amis viennent m'aider. Si tu peux, arrive vers dix heures : nous aurons besoin de bras pour monter les cartons au troisième étage.",
      prompt: "Pourquoi la personne est-elle invitée à arriver vers dix heures ?",
      options: [
        "Pour aider à porter les cartons",
        "Pour conduire le camion",
        "Pour préparer le repas",
        "Pour signer le bail",
      ],
      correct: "A",
      explanation:
        "L'invitation mentionne le besoin de bras pour monter les cartons au troisième étage.",
    },
    {
      level: "A2",
      category: "commerce",
      transcription:
        "N'oublie pas que le magasin ouvrira exceptionnellement à huit heures demain, pour l'inventaire annuel. Peux-tu arriver à sept heures quarante-cinq afin que nous puissions tout préparer avant l'ouverture ?",
      prompt: "Pourquoi le magasin ouvre-t-il plus tôt ?",
      options: [
        "Pour réaliser l'inventaire annuel",
        "Pour accueillir un client important",
        "Pour changer les vitrines",
        "Pour former les nouveaux vendeurs",
      ],
      correct: "A",
      explanation:
        "Le message indique clairement que l'ouverture anticipée sert à réaliser l'inventaire annuel.",
    },
    {
      level: "B1",
      category: "loisirs",
      transcription:
        "L'atelier de photographie reprend jeudi prochain. Les débutants sont acceptés, mais chacun doit apporter son propre appareil. Une sortie en ville est prévue le dernier samedi du mois ; en cas de pluie, elle sera déplacée au lendemain.",
      prompt: "Que se passe-t-il si la sortie photo est perturbée par la pluie ?",
      options: [
        "Elle est déplacée au lendemain",
        "Elle est annulée définitivement",
        "Elle a lieu dans la salle de classe",
        "Elle est avancée à jeudi",
      ],
      correct: "A",
      explanation:
        "Le message prévoit un report au lendemain lorsque la sortie ne peut pas se faire à cause de la pluie.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Je cherche un colocataire pour partager un appartement de trois pièces. La chambre est meublée et le loyer s'élève à quatre cents euros, charges comprises. Je préfère une personne qui travaille ou étudie à proximité et qui ne fume pas.",
      prompt: "Quelle condition le locataire doit-il respecter ?",
      options: [
        "Ne pas fumer",
        "Avoir une voiture",
        "Cuisiner tous les soirs",
        "Payer six mois d'avance",
      ],
      correct: "A",
      explanation:
        "L'annonce demande une personne non fumeuse, en plus d'un travail ou d'études à proximité.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Le centre de loisirs recherche des animateurs pour les vacances de printemps. Une expérience auprès des enfants est appréciée, mais une formation est assurée. Les candidats doivent être majeurs et disponibles au moins deux semaines.",
      prompt: "Quelle condition est obligatoire pour être animateur ?",
      options: [
        "Être majeur",
        "Avoir déjà travaillé dans une école",
        "Posséder le permis de conduire",
        "Être disponible toute l'année",
      ],
      correct: "A",
      explanation:
        "La majorité est exigée, tandis que l'expérience est seulement appréciée et que la formation est fournie.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Des travaux de rénovation auront lieu dans le hall du lundi au mercredi. L'ascenseur restera accessible, mais l'entrée principale sera fermée. Les résidents devront utiliser la porte du fond, côté cour.",
      prompt: "Quelle conséquence les travaux auront-ils pour les résidents ?",
      options: [
        "Ils devront passer par la porte du fond",
        "Ils ne pourront plus utiliser l'ascenseur",
        "Ils devront quitter l'immeuble",
        "Ils paieront une taxe supplémentaire",
      ],
      correct: "A",
      explanation:
        "L'entrée principale étant fermée, les résidents devront emprunter la porte du fond côté cour.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "Le festival de musique de la ville aura lieu le premier week-end de juillet. Les concerts sont gratuits, mais les places doivent être réservées en ligne. Les enfants de moins de douze ans doivent être accompagnés d'un adulte.",
      prompt: "Que faut-il faire pour assister aux concerts ?",
      options: [
        "Réserver les places en ligne",
        "Payer l'entrée sur place",
        "Retirer un billet à la mairie",
        "S'inscrire avant le mois de juin",
      ],
      correct: "A",
      explanation:
        "Les concerts sont gratuits, mais une réservation en ligne est nécessaire pour obtenir une place.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "De nombreux ateliers d'artisans ferment faute de repreneurs. Les chambres de métiers proposent des stages de découverte pour attirer les jeunes. Pourtant, les candidats hésitent : les revenus sont irréguliers et la charge de travail importante.",
      prompt: "Quelle difficulté freine la reprise des ateliers artisanaux ?",
      options: [
        "Des revenus irréguliers et une lourde charge de travail",
        "Le manque de formation professionnelle",
        "L'absence de clientèle locale",
        "La fermeture des chambres de métiers",
      ],
      correct: "A",
      explanation:
        "Le reportage cite l'irrégularité des revenus et l'importance de la charge de travail comme freins à la reprise.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Une étude menée dans les écoles montre que l'aération des salles améliore la concentration des élèves. Les chercheurs recommandent d'ouvrir les fenêtres plusieurs fois par jour, même en hiver. Ils précisent que les purificateurs ne remplacent pas le renouvellement de l'air.",
      prompt: "Que recommandent les chercheurs pour améliorer la concentration ?",
      options: [
        "Aérer régulièrement les salles",
        "Installer des purificateurs partout",
        "Chauffer davantage les classes",
        "Réduire la durée des cours",
      ],
      correct: "A",
      explanation:
        "L'étude préconise d'ouvrir les fenêtres plusieurs fois par jour et rappelle que les purificateurs ne suffisent pas.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "La mairie a regroupé plusieurs services dans un guichet unique. Les usagers peuvent y accomplir leurs démarches sans se déplacer d'un bâtiment à l'autre. Toutefois, les rendez-vous restent obligatoires pour les demandes de logement, afin d'éviter une attente trop longue.",
      prompt: "Pourquoi un rendez-vous est-il obligatoire pour les demandes de logement ?",
      options: [
        "Pour limiter le temps d'attente",
        "Pour vérifier les revenus des demandeurs",
        "Pour fermer les autres services",
        "Pour accélérer les travaux municipaux",
      ],
      correct: "A",
      explanation:
        "La mairie impose un rendez-vous pour les demandes de logement afin de réduire l'attente des usagers.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "La ville a ouvert un parking relais à l'entrée de l'autoroute. Les automobilistes y laissent leur voiture et prennent le tramway, dont le ticket est inclus dans le prix du stationnement. La fréquentation dépasse déjà les prévisions.",
      prompt: "Quel avantage le parking relais offre-t-il aux automobilistes ?",
      options: [
        "Le ticket de tramway est compris dans le stationnement",
        "Le stationnement est entièrement gratuit",
        "Le tramway circule toute la nuit",
        "La voiture est gardée par un mécanicien",
      ],
      correct: "A",
      explanation:
        "Le prix du stationnement inclut le ticket de tramway, ce qui encourage les automobilistes à laisser leur voiture.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le cinéma de quartier a lancé une programmation de films en version originale. Les séances sont précédées d'une présentation par un critique. Le public reste toutefois limité, car les horaires tardifs découragent les familles.",
      prompt: "Pourquoi le public du cinéma reste-t-il limité ?",
      options: [
        "Les horaires tardifs découragent les familles",
        "Les films sont interdits aux enfants",
        "Les séances sont trop chères",
        "Le critique parle trop longtemps",
      ],
      correct: "A",
      explanation:
        "Le reportage attribue la fréquentation limitée aux séances tardives, qui écartent les familles.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Depuis que les réunions se tiennent en visioconférence, les salariés disent gagner du temps, mais se plaignent de la difficulté à prendre la parole. Les managers doivent désormais animer autrement et ménager des pauses pour que chacun puisse intervenir.",
      prompt: "Quelle difficulté les salariés rencontrent-ils en visioconférence ?",
      options: [
        "Ils ont du mal à prendre la parole",
        "Ils perdent du temps en déplacements",
        "Ils ne comprennent pas les consignes",
        "Ils doivent travailler le soir",
      ],
      correct: "A",
      explanation:
        "Les salariés gagnent du temps mais éprouvent des difficultés à intervenir pendant les réunions à distance.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "L'effet placebo ne se réduit pas à une illusion : il modifie réellement la perception de la douleur. Les chercheurs distinguent l'attente du patient et les mécanismes physiologiques qu'elle déclenche. Loin de discréditer les traitements, cette découverte invite à mieux comprendre la relation de soin.",
      prompt: "Quelle idée les chercheurs défendent-ils à propos de l'effet placebo ?",
      options: [
        "Il produit des effets physiologiques réels",
        "Il prouve que les médicaments sont inutiles",
        "Il dépend uniquement de la volonté du patient",
        "Il disparaît dès que le patient est informé",
      ],
      correct: "A",
      explanation:
        "Le propos affirme que l'effet placebo modifie réellement la perception de la douleur et déclenche des mécanismes physiologiques.",
    },
    {
      level: "C1",
      category: "travail",
      transcription:
        "Les entreprises affirment valoriser l'expérience des salariés âgés, mais les statistiques montrent que les recrutements au-delà de cinquante ans demeurent marginaux. Les stéréotypes sur la flexibilité pèsent davantage que les compétences. Des formations intergénérationnelles commencent à modifier les pratiques, sans renverser la tendance.",
      prompt: "Quel facteur explique principalement la faible embauche des seniors ?",
      options: [
        "Les stéréotypes sur leur flexibilité",
        "Leur manque de compétences",
        "Leur refus des formations",
        "La baisse des salaires proposés",
      ],
      correct: "A",
      explanation:
        "Le texte souligne que les préjugés sur la flexibilité des seniors pèsent plus lourd que leurs compétences réelles.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "Les sécheresses répétées fragilisent les forêts, mais les responsables hésitent à diversifier les essences. Les scientifiques avertissent qu'une plantation uniforme augmente la vulnérabilité aux insectes et au feu. La transition suppose des décennies, ce qui contrarie les cycles politiques.",
      prompt: "Pourquoi la diversification des essences est-elle nécessaire ?",
      options: [
        "Elle réduit la vulnérabilité aux insectes et au feu",
        "Elle accélère la croissance des arbres",
        "Elle supprime le besoin de surveillance",
        "Elle permet de planter plus rapidement",
      ],
      correct: "A",
      explanation:
        "Les scientifiques expliquent qu'une forêt uniforme est plus exposée aux insectes et aux incendies, d'où l'utilité de varier les essences.",
    },
    {
      level: "C1",
      category: "urbanisme",
      transcription:
        "La disparition des commerces de proximité ne se réduit pas à une question de concurrence. Elle transforme les usages : les habitants parcourent de plus longues distances et les liens sociaux se distendent. Les politiques de soutien doivent donc dépasser l'aide financière et agir sur les loyers commerciaux.",
      prompt: "Pourquoi l'aide financière aux commerces est-elle jugée insuffisante ?",
      options: [
        "Elle ne règle pas la question des loyers commerciaux",
        "Elle profite uniquement aux grandes surfaces",
        "Elle décourage les habitants de consommer",
        "Elle est interdite par les municipalités",
      ],
      correct: "A",
      explanation:
        "Le texte demande de dépasser l'aide financière pour agir sur les loyers, qui conditionnent la survie des commerces.",
    },
    {
      level: "C2",
      category: "santé",
      transcription:
        "Les outils d'aide au diagnostic promettent de réduire les erreurs, mais leur adoption soulève une question de responsabilité. Lorsque le clinicien suit une recommandation algorithmique, il demeure juridiquement responsable du choix. Certains y voient une garantie contre l'automatisation, d'autres une charge insoutenable. Le débat révèle surtout combien la décision médicale engage des valeurs, non seulement des calculs.",
      prompt:
        "Quel point central le débat sur les outils de diagnostic met-il en évidence ?",
      options: [
        "La décision médicale comporte une dimension éthique irréductible",
        "Les algorithmes remplacent définitivement les médecins",
        "La responsabilité juridique disparaît avec l'outil",
        "Les calculs suffisent à garantir la bonne décision",
      ],
      correct: "A",
      explanation:
        "Le locuteur conclut que la décision médicale engage des valeurs et ne peut se réduire à un calcul algorithmique.",
    },
    {
      level: "C2",
      category: "société",
      transcription:
        "Une société qui mesure la valeur d'un emploi à sa rémunération finit par invisibiliser les métiers essentiels. Les soignants, les éboueurs ou les enseignants produisent un bien commun difficile à chiffrer. Reconnaître leur utilité ne signifie pas nier les contraintes du marché, mais interroger les hiérarchies qu'il impose.",
      prompt:
        "Quelle position le conférencier défend-il sur la valeur du travail ?",
      options: [
        "La valeur d'un métier ne se réduit pas à sa rémunération",
        "Les métiers essentiels devraient tous être bénévoles",
        "Le marché fixe correctement la valeur de chaque emploi",
        "Seuls les emplois qualifiés produisent un bien commun",
      ],
      correct: "A",
      explanation:
        "Le conférencier critique la réduction de la valeur d'un métier à son salaire et plaide pour reconnaître l'utilité sociale.",
    },
    {
      level: "C2",
      category: "art",
      transcription:
        "La photographie a longtemps servi de preuve avant que la retouche numérique ne fragilise ce statut. Pourtant, douter de toute image revient à renoncer à comprendre le monde. Les historiens proposent une autre voie : analyser les intentions et les contextes de production plutôt que de chercher une authenticité pure. La crédibilité d'une image est une construction, non une donnée.",
      prompt: "Quelle approche les historiens proposent-ils face aux images retouchées ?",
      options: [
        "Analyser les intentions et les contextes de production",
        "Interdire toute retouche numérique",
        "Rejeter en bloc toutes les photographies",
        "Rechercher une authenticité pure et définitive",
      ],
      correct: "A",
      explanation:
        "Les historiens invitent à examiner les intentions et le contexte de fabrication des images plutôt qu'une prétendue pureté originelle.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "passé composé",
      prompt: "Elle ___ arrivée en retard hier matin.",
      options: ["est", "a", "es", "sont"],
      correct: "A",
      explanation:
        "Le verbe « arriver » se conjugue avec l'auxiliaire « être » : « elle est arrivée ».",
    },
    {
      level: "A2",
      category: "prépositions de lieu",
      prompt: "Le musée se trouve ___ la gare et l'école.",
      options: ["entre", "sur", "depuis", "chez"],
      correct: "A",
      explanation:
        "« Entre » indique la position de part et d'autre de deux repères : « entre la gare et l'école ».",
    },
    {
      level: "B1",
      category: "futur simple",
      prompt: "L'année prochaine, ils ___ dans un appartement plus grand.",
      options: ["habiteront", "habitent", "habitaient", "habiteraient"],
      correct: "A",
      explanation:
        "L'indicateur « l'année prochaine » appelle le futur simple : « ils habiteront ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Hier, pendant que je ___, le téléphone a sonné.",
      options: ["cuisinais", "cuisine", "cuisinerai", "avais cuisiné"],
      correct: "A",
      explanation:
        "L'imparfait décrit l'action en cours interrompue par un événement au passé composé : « pendant que je cuisinais ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Elle pense souvent à ce voyage ; elle ___ parle à ses amis.",
      options: ["en", "y", "le", "lui"],
      correct: "A",
      explanation:
        "Le verbe « parler de » remplace son complément par « en » : « elle en parle ». « Y » remplacerait « à ce voyage ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le quartier ___ je suis né a beaucoup changé.",
      options: ["où", "que", "dont", "qui"],
      correct: "A",
      explanation:
        "« Où » remplace un complément de lieu : « le quartier où je suis né ».",
    },
    {
      level: "B1",
      category: "adverbes",
      prompt: "Elle conduit ___ depuis son accident.",
      options: ["prudemment", "prudent", "prudence", "prudente"],
      correct: "A",
      explanation:
        "L'adverbe « prudemment » modifie le verbe « conduit » et exprime la manière.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Bien que la météo ___ mauvaise, nous partirons demain.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation:
        "« Bien que » exige le subjonctif : « bien que la météo soit mauvaise ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Si tu ___ plus tôt, tu pourrais nous rejoindre au restaurant.",
      options: ["venais", "viendras", "viens", "serais venu"],
      correct: "A",
      explanation:
        "L'hypothèse présente associe « si » à l'imparfait et la conséquence au conditionnel présent : « si tu venais ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "Il a été promu ___ son travail d'équipe.",
      options: ["en raison de", "malgré", "bien que", "tandis que"],
      correct: "A",
      explanation:
        "« En raison de » exprime une cause suivie d'un nom ; « bien que » demanderait un verbe au subjonctif.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Les résultats de l'étude ___ la semaine prochaine.",
      options: ["seront publiés", "publieront", "seront publiées", "ont publié"],
      correct: "A",
      explanation:
        "Le sujet « les résultats » est masculin pluriel et subit l'action : « seront publiés » au futur passif.",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Le directeur a annoncé que la réunion ___ reportée.",
      options: ["serait", "sera", "est", "aurait été"],
      correct: "A",
      explanation:
        "Après un verbe introducteur au passé, le futur devient conditionnel : « a annoncé que la réunion serait reportée ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ les consignes de sécurité, il a pu éviter le pire.",
      options: ["En respectant", "Respecter", "Respecté", "Respecterait"],
      correct: "A",
      explanation:
        "Le gérondif « en respectant » exprime la manière dont l'action principale a été rendue possible.",
    },
    {
      level: "B2",
      category: "comparaison",
      prompt: "Moins il dort, ___ il est concentré.",
      options: ["moins", "plus", "aussi", "autant"],
      correct: "A",
      explanation:
        "La corrélation « moins... moins... » exprime que la concentration diminue avec la durée du sommeil.",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Si nous avions suivi ses conseils, nous n'___ pas dans cette impasse.",
      options: ["serions", "serons", "fûmes", "soyons"],
      correct: "A",
      explanation:
        "L'hypothèse irréelle au passé associe le plus-que-parfait au conditionnel passé : « nous ne serions pas ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ rapide de ce secteur a surpris les observateurs.",
      options: ["croissance", "croître", "crû", "croissant"],
      correct: "A",
      explanation:
        "Le nom dérivé du verbe « croître » est « la croissance » ; les autres formes ne peuvent pas être sujets.",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "La question ___ il reste à répondre est complexe.",
      options: ["à laquelle", "dont", "que", "où"],
      correct: "A",
      explanation:
        "Le verbe « répondre à » impose le pronom relatif composé « à laquelle », accordé avec « la question ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Bien qu'il ___ toutes les conditions, sa candidature a été rejetée.",
      options: ["ait rempli", "a rempli", "remplisse", "aurait rempli"],
      correct: "A",
      explanation:
        "Le subjonctif passé « ait rempli » marque une action achevée soumise à la concession de « bien que ».",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt:
        "Aussitôt qu'il ___ son allocution, les journalistes se pressèrent autour de lui.",
      options: ["eut achevé", "a achevé", "avait achevé", "acheva"],
      correct: "A",
      explanation:
        "Le passé antérieur « eut achevé » exprime l'antériorité immédiate d'une action par rapport à un récit au passé simple.",
    },
    {
      level: "C2",
      category: "accord",
      prompt: "___ que soient les difficultés, le projet sera mené à son terme.",
      options: ["Quelles", "Quels", "Quel", "Quelle"],
      correct: "A",
      explanation:
        "« Quelles que » s'accorde avec le nom féminin pluriel « difficultés » : « quelles que soient les difficultés ».",
    },
  ],
  reading: [
    {
      title: "Une grainothèque à la médiathèque",
      text:
        "La médiathèque ouvre une grainothèque samedi matin. Les habitants peuvent y déposer des graines de fleurs ou de légumes, puis en prendre librement. Des bénévoles assurent une permanence mensuelle pour conseiller les débutants.",
      question: {
        level: "B1",
        category: "vie quotidienne",
        prompt: "Que peut-on faire à la grainothèque ?",
        options: [
          "Prendre et déposer librement des graines",
          "Acheter des plants à un producteur",
          "Emprunter des outils de jardinage",
          "Suivre un cours de botanique payant",
        ],
        correct: "A",
        explanation:
          "Le texte indique que les habitants déposent et prennent des graines librement, avec le conseil de bénévoles.",
      },
    },
    {
      title: "Le prêt d'instruments du conservatoire",
      text:
        "Le conservatoire prête des instruments aux élèves débutants. Le prêt est gratuit pendant un an, mais une caution de cent euros est demandée. Les familles doivent rendre l'instrument en bon état avant les vacances d'été.",
      question: {
        level: "B1",
        category: "culture",
        prompt: "Quelle condition accompagne le prêt d'un instrument ?",
        options: [
          "Verser une caution de cent euros",
          "Payer une location mensuelle",
          "Acheter l'instrument au bout d'un an",
          "Suivre les cours pendant deux ans",
        ],
        correct: "A",
        explanation:
          "Le prêt est gratuit, mais une caution de cent euros est exigée et l'instrument doit être rendu en bon état.",
      },
    },
    {
      title: "Nettoyage du parc municipal",
      text:
        "Le parc municipal sera fermé samedi matin pour une grande opération de nettoyage. Les bénévoles intéressés doivent s'inscrire à l'accueil. Des gants et des sacs seront fournis sur place, et le parc rouvrira à quatorze heures.",
      question: {
        level: "B1",
        category: "environnement",
        prompt: "Que doivent faire les bénévoles ?",
        options: [
          "S'inscrire à l'accueil",
          "Apporter leurs propres gants",
          "Payer une participation",
          "Venir après quatorze heures",
        ],
        correct: "A",
        explanation:
          "Les personnes qui souhaitent participer doivent s'inscrire à l'accueil ; le matériel est fourni.",
      },
    },
    {
      title: "Une navette pour l'hôpital",
      text:
        "À partir de lundi, une navette gratuite reliera le centre-ville à l'hôpital toutes les heures. Elle s'arrêtera devant la mairie et à la gare. Le service fonctionnera du lundi au vendredi, de huit heures à dix-huit heures.",
      question: {
        level: "B1",
        category: "transports",
        prompt: "Quels jours la navette circule-t-elle ?",
        options: [
          "Du lundi au vendredi",
          "Tous les jours de la semaine",
          "Le samedi et le dimanche",
          "Uniquement le lundi",
        ],
        correct: "A",
        explanation:
          "Le service fonctionne du lundi au vendredi, de huit heures à dix-huit heures.",
      },
    },
    {
      title: "Le club de jeux de société",
      text:
        "Le club de jeux de société se réunit chaque jeudi à la maison de quartier. Les débutants sont les bienvenus et des bénévoles expliquent les règles. Une participation de deux euros est demandée pour le goûter.",
      question: {
        level: "B1",
        category: "loisirs",
        prompt: "Que proposent les bénévoles du club ?",
        options: [
          "Expliquer les règles des jeux",
          "Vendre des jeux aux débutants",
          "Préparer le goûter chaque semaine",
          "Organiser des tournois payants",
        ],
        correct: "A",
        explanation:
          "Le texte précise que les bénévoles expliquent les règles, et que deux euros sont demandés pour le goûter.",
      },
    },
    {
      title: "Les halles alimentaires rouvrent",
      text: p(
        "Les halles municipales viennent de rouvrir après deux ans de travaux. Une vingtaine de producteurs de la région y vendent fruits, fromages et poissons. La ville espère ainsi redonner vie au centre-ville.",
        "Certains commerçants s'inquiètent pourtant de la hausse des loyers. La mairie promet un loyer progressif sur trois ans, mais les associations réclament des garanties écrites.",
      ),
      question: {
        level: "B2",
        category: "économie",
        prompt: "Quelle inquiétude les commerçants expriment-ils ?",
        options: [
          "La hausse des loyers",
          "La baisse de la fréquentation",
          "L'absence de produits régionaux",
          "La fermeture du centre-ville",
        ],
        correct: "A",
        explanation:
          "Le texte indique que les commerçants craignent la hausse des loyers, malgré la promesse d'un loyer progressif.",
      },
    },
    {
      title: "La médiation animale à l'hôpital",
      text: p(
        "Dans plusieurs hôpitaux, des séances de médiation animale sont proposées aux patients âgés. Un chien accompagne le soignant pendant une visite. Les équipes observent une baisse de l'anxiété et une reprise des échanges.",
        "Le dispositif reste encadré : les animaux sont vaccinés et les séances durent trente minutes. Les associations demandent davantage de financement, car les formations et les déplacements coûtent cher.",
      ),
      question: {
        level: "B2",
        category: "santé",
        prompt: "Pourquoi les associations demandent-elles davantage de financement ?",
        options: [
          "Les formations et les déplacements coûtent cher",
          "Les hôpitaux refusent les animaux",
          "Les séances sont trop courtes",
          "Les patients paient eux-mêmes les visites",
        ],
        correct: "A",
        explanation:
          "Le texte explique que les formations longues et les déplacements coûteux justifient une demande de financement.",
      },
    },
    {
      title: "Des bus à la nuit tombée",
      text: p(
        "Face au manque de transports en soirée, plusieurs villes expérimentent des lignes de bus nocturnes. Les véhicules circulent jusqu'à une heure du matin et desservent les quartiers étudiants ainsi que les zones d'emploi.",
        "Le coût du dispositif reste élevé. Les élus envisagent de le financer par une taxe sur les entreprises, mais les commerçants redoutent une nouvelle charge. Une évaluation est prévue dans un an.",
      ),
      question: {
        level: "B2",
        category: "transports",
        prompt: "Quelle crainte les commerçants formulent-ils ?",
        options: [
          "Devoir payer une nouvelle taxe",
          "Voir les bus circuler trop tard",
          "Perdre la clientèle étudiante",
          "Devoir financer les quartiers d'emploi",
        ],
        correct: "A",
        explanation:
          "Les commerçants redoutent la taxe sur les entreprises envisagée pour financer les lignes nocturnes.",
      },
    },
    {
      title: "Parcs et plages sans tabac",
      text: p(
        "De nombreuses communes interdisent désormais la cigarette dans les parcs et sur les plages. Les panneaux se multiplient, mais les contrôles restent rares. Les autorités misent davantage sur l'adhésion des habitants que sur les amendes.",
        "Les associations de santé saluent la mesure, tout en rappelant qu'elle ne suffit pas à réduire le tabagisme. Elles réclament des campagnes d'accompagnement et un meilleur accès aux substituts.",
      ),
      question: {
        level: "B2",
        category: "santé",
        prompt: "Sur quoi les autorités comptent-elles principalement ?",
        options: [
          "Sur l'adhésion des habitants",
          "Sur la multiplication des amendes",
          "Sur la fermeture des plages",
          "Sur la vente de cigarettes",
        ],
        correct: "A",
        explanation:
          "Le texte précise que les contrôles sont rares et que les autorités préfèrent obtenir l'adhésion des habitants.",
      },
    },
    {
      title: "Le mécénat culturel en question",
      text: p(
        "Les entreprises privées financent de plus en plus d'expositions et de festivals. Ce mécénat permet des projets ambitieux alors que les subventions publiques stagnent. Les directeurs y voient une bouffée d'oxygène.",
        "La dépendance au privé inquiète les observateurs. Un mécène peut imposer un thème consensuel ou retirer son soutien à tout moment. Les professionnels réclament des règles claires pour préserver l'indépendance artistique.",
      ),
      question: {
        level: "B2",
        category: "culture",
        prompt: "Quel risque le mécénat fait-il peser sur les institutions ?",
        options: [
          "Une perte d'indépendance artistique",
          "Une baisse des subventions publiques",
          "Une hausse du prix des expositions",
          "Une fermeture des festivals",
        ],
        correct: "A",
        explanation:
          "Le texte souligne qu'un mécène peut orienter les projets ou se retirer, ce qui menace l'indépendance artistique.",
      },
    },
    {
      title: "L'éducation financière au collège",
      text: p(
        "Le ministère souhaite introduire des notions d'éducation financière au collège. Les élèves apprendraient à lire une facture et à comprendre un taux d'intérêt. L'objectif est de les protéger des crédits coûteux.",
        "Les enseignants accueillent l'idée avec prudence. Ils craignent que ces heures empiètent sur les mathématiques et que les banques n'y voient un moyen de recruter de futurs clients.",
      ),
      question: {
        level: "B2",
        category: "études",
        prompt: "Que redoutent les enseignants ?",
        options: [
          "Une intrusion des banques dans l'enseignement",
          "La suppression des cours de mathématiques",
          "Le refus des élèves d'apprendre",
          "La hausse des frais de scolarité",
        ],
        correct: "A",
        explanation:
          "Les enseignants redoutent notamment que les banques utilisent ces cours pour conquérir de futurs clients.",
      },
    },
    {
      title: "Le tourisme industriel",
      text: p(
        "Des usines ouvrent leurs portes aux visiteurs pour expliquer leurs méthodes de fabrication. Cette forme de tourisme attire les familles et les écoles, curieuses de voir naître les produits qu'elles utilisent.",
        "Les entreprises y trouvent un moyen de valoriser leurs métiers et d'attirer des candidats. Les syndicats rappellent que l'opération ne doit pas masquer les conditions de travail. Ils demandent que les salariés participent aux parcours.",
      ),
      question: {
        level: "B2",
        category: "tourisme",
        prompt: "Quel avantage les entreprises espèrent-elles tirer de ces visites ?",
        options: [
          "Valoriser leurs métiers et attirer des candidats",
          "Augmenter directement leurs ventes",
          "Remplacer les salariés par des guides",
          "Fermer leurs portes au public",
        ],
        correct: "A",
        explanation:
          "Le texte indique que les entreprises cherchent à faire connaître leurs métiers et à susciter des candidatures.",
      },
    },
    {
      title: "L'escalade en salle",
      text: p(
        "Les salles d'escalade se multiplient dans les villes. Elles attirent un public varié, des débutants aux grimpeurs confirmés, grâce à des parcours adaptés et à des horaires souples.",
        "L'accès reste coûteux : l'équipement et l'abonnement représentent un budget important. Certaines salles proposent des tarifs réduits pour les étudiants. Les associations réclament des créneaux publics pour éviter un loisir réservé aux plus aisés.",
      ),
      question: {
        level: "B2",
        category: "sport",
        prompt:
          "Quelle limite au développement de l'escalade le texte souligne-t-il ?",
        options: [
          "Le coût de l'équipement et de l'abonnement",
          "Le manque de salles dans les villes",
          "L'interdiction de la pratique par les associations",
          "La difficulté à trouver des horaires souples",
        ],
        correct: "A",
        explanation:
          "Le texte insiste sur le budget que représentent l'équipement et l'abonnement, d'où la demande de créneaux publics.",
      },
    },
    {
      title: "Musique en streaming : qui paie les artistes ?",
      text: p(
        "Le streaming est devenu le principal mode d'écoute de la musique. Les plateformes reversent aux artistes une part calculée sur le nombre d'écoutes, ce qui favorise les stars et pénalise les petits groupes.",
        "Certains artistes dénoncent un système opaque et réclament une répartition plus équitable. Les plateformes affirment que la concurrence limite leurs marges. Le débat porte aussi sur la place des algorithmes.",
      ),
      question: {
        level: "B2",
        category: "culture",
        prompt: "Quelle critique les artistes adressent-ils aux plateformes ?",
        options: [
          "Une répartition des revenus qui favorise les stars",
          "Une qualité sonore insuffisante",
          "Une interdiction de publier leurs œuvres",
          "Une hausse du prix des concerts",
        ],
        correct: "A",
        explanation:
          "Les artistes jugent le système opaque et estiment que le calcul par nombre d'écoutes favorise les plus populaires.",
      },
    },
    {
      title: "La pêche durable et ses labels",
      text: p(
        "Les labels de pêche durable se multiplient sur les étals. Ils garantissent que le poisson provient de stocks gérés de manière durable. Les consommateurs y sont de plus en plus attentifs.",
        "Les scientifiques rappellent pourtant que la certification ne règle pas tout. Certaines méthodes de capture restent destructrices pour les fonds marins, et les contrôles manquent de moyens. Ils plaident pour une réduction globale de la pression de pêche.",
      ),
      question: {
        level: "B2",
        category: "environnement",
        prompt: "Quelle limite des labels les scientifiques soulignent-ils ?",
        options: [
          "Ils ne protègent pas toujours les fonds marins",
          "Ils augmentent le prix du poisson",
          "Ils interdisent toute activité de pêche",
          "Ils sont attribués sans contrôle des stocks",
        ],
        correct: "A",
        explanation:
          "Le texte précise que certaines méthodes de capture restent destructrices malgré la certification.",
      },
    },
    {
      title: "Le bruit, nouveau défi des villes",
      text: p(
        "Le bruit figure parmi les principales préoccupations des habitants. Les plaintes liées au trafic et aux chantiers augmentent dans les quartiers denses. Ses effets sur la santé sont documentés : troubles du sommeil et difficultés de concentration.",
        "Des solutions techniques existent : revêtements absorbants, murs antibruit, limitation de la vitesse. Leur efficacité reste partielle, car elles traitent les symptômes sans réduire la source. Les chercheurs plaident pour éloigner les logements des axes les plus fréquentés.",
        "La dimension sociale est décisive. Les ménages modestes habitent plus souvent près d'infrastructures bruyantes et ont moins de moyens pour s'en protéger.",
      ),
      question: {
        level: "C1",
        category: "environnement",
        prompt: "Pourquoi les solutions techniques ne suffisent-elles pas ?",
        options: [
          "Elles traitent les symptômes sans réduire la source",
          "Elles coûtent trop cher aux municipalités",
          "Elles augmentent le trafic routier",
          "Elles sont refusées par les habitants",
        ],
        correct: "A",
        explanation:
          "Le texte explique que ces solutions atténuent les effets mais ne s'attaquent pas à l'origine du bruit.",
      },
    },
    {
      title: "Apprendre une langue à l'âge adulte",
      text: p(
        "L'idée selon laquelle les adultes seraient incapables d'apprendre une langue étrangère persiste. Les recherches la nuancent : la prononciation s'acquiert plus difficilement après l'enfance, mais la grammaire et le vocabulaire restent accessibles à tout âge, à condition de pratiquer régulièrement.",
        "Les adultes ont même des atouts : ils comprennent mieux les règles et organisent leur travail. En revanche, ils craignent davantage l'erreur et se découragent vite. Un cours fondé sur la conversation entretient la motivation, tandis qu'un enseignement trop scolaire renforce le sentiment d'échec.",
        "Les spécialistes recommandent des objectifs modestes et une pratique quotidienne, même courte. L'âge n'est pas l'obstacle principal ; le manque de pratique l'est davantage.",
      ),
      question: {
        level: "C1",
        category: "études",
        prompt: "Quelle idée reçue les recherches récentes nuancent-elles ?",
        options: [
          "Les adultes seraient incapables d'apprendre une langue",
          "Les enfants apprennent moins vite que les adultes",
          "La grammaire serait inutile à l'âge adulte",
          "La prononciation s'améliorerait avec l'âge",
        ],
        correct: "A",
        explanation:
          "Le texte conteste l'idée d'une incapacité des adultes et montre que seule la prononciation est plus difficile à acquérir.",
      },
    },
    {
      title: "L'économie circulaire peut-elle créer des emplois ?",
      text: p(
        "La transition vers une économie circulaire est présentée comme une source d'emplois. Réparer, recycler et réutiliser exigent de la main-d'œuvre locale, difficile à délocaliser. Des milliers de postes sont attendus dans la réparation et le bâtiment.",
        "Ces promesses doivent être nuancées. Les emplois ne correspondent pas toujours aux qualifications et certaines filières restent peu rentables sans soutien public. La collecte des textiles dépend largement de bénévoles et de subventions.",
        "La question est celle de la qualité des emplois. Un modèle fondé sur des contrats précaires ne serait pas une transition réussie. Des formations et une reconnaissance des compétences techniques sont nécessaires pour éviter de reproduire les inégalités.",
      ),
      question: {
        level: "C1",
        category: "économie",
        prompt:
          "Quelle condition est décisive pour que la transition crée de bons emplois ?",
        options: [
          "La qualité des emplois et la reconnaissance des compétences",
          "La suppression des subventions publiques",
          "Le recours exclusif au bénévolat",
          "La délocalisation des activités de réparation",
        ],
        correct: "A",
        explanation:
          "Le texte place la qualité de l'emploi et la formation au cœur d'une transition socialement réussie.",
      },
    },
    {
      title: "Le théâtre participatif",
      text: p(
        "Le théâtre participatif invite les spectateurs à intervenir dans le déroulement de la pièce. Certains montent sur scène, d'autres votent pour orienter l'intrigue. La formule séduit un public qui s'ennuie des représentations traditionnelles et cherche une expérience collective.",
        "Les professionnels restent partagés. Les uns y voient un moyen de démocratiser la culture et de renouveler les formes narratives. Les autres craignent que la participation ne se réduise à un gadget et que l'œuvre perde sa cohérence au profit de l'animation.",
        "Le débat porte en réalité sur la place de l'auteur. Si le public décide de tout, le texte devient un simple canevas. Mais lorsque les comédiens conservent une marge d'interprétation, la participation peut enrichir le sens sans le dissoudre. Tout dépend de la manière dont les règles sont pensées et annoncées.",
      ),
      question: {
        level: "C1",
        category: "culture",
        prompt: "Sur quoi porte réellement le débat sur le théâtre participatif ?",
        options: [
          "Sur la place de l'auteur et l'équilibre de l'œuvre",
          "Sur le prix des places",
          "Sur la formation des comédiens",
          "Sur la fermeture des théâtres traditionnels",
        ],
        correct: "A",
        explanation:
          "Le texte déplace le débat vers la place de l'auteur et la façon dont la participation modifie le sens de l'œuvre.",
      },
    },
    {
      title: "La cybersécurité des petites entreprises",
      text: p(
        "Les petites entreprises se croient rarement concernées par les cyberattaques. Pourtant, elles en sont des cibles fréquentes, car leurs protections sont souvent insuffisantes. Un courriel frauduleux ou un mot de passe faible peut bloquer leur activité pendant plusieurs jours.",
        "Les conséquences ne sont pas seulement financières. La perte de données clients, l'interruption de la production et l'atteinte à la réputation peuvent menacer la survie de l'entreprise. Les dirigeants manquent souvent de temps et de compétences pour évaluer les risques.",
        "Des mesures adaptées existent : sensibiliser les salariés, sauvegarder les données et limiter les accès. Les assureurs commencent à les exiger. La cybersécurité devient une condition de confiance, et non un simple coût technique.",
      ),
      question: {
        level: "C1",
        category: "économie",
        prompt: "Pourquoi les petites entreprises sont-elles vulnérables aux cyberattaques ?",
        options: [
          "Leurs protections sont faibles et leurs dirigeants manquent de temps",
          "Elles refusent d'utiliser l'informatique",
          "Elles sont systématiquement protégées par les assureurs",
          "Elles ne conservent aucune donnée client",
        ],
        correct: "A",
        explanation:
          "Le texte pointe des protections insuffisantes et le manque de temps des dirigeants pour évaluer les risques.",
      },
    },
    {
      title: "Commémorer sans figer le passé",
      text: p(
        "Les commémorations sont souvent accusées de figer le passé dans une version officielle. En célébrant les mêmes événements aux mêmes dates, elles risqueraient d'étouffer les récits minoritaires. La critique est pertinente, mais elle méconnaît la diversité des usages de la mémoire.",
        "Une commémoration n'est pas seulement un rappel : c'est un espace de conflit. Des associations y contestent les récits dominants, des historiens y apportent des nuances, des descendants y revendiquent une reconnaissance. Ces cérémonies sont souvent réouvertes par ceux qui s'en emparent.",
        "Le risque principal n'est pas de se souvenir, mais de confondre mémoire et vérité historique. La mémoire sélectionne et oublie ; l'histoire explique et discute les sources. Une société mature a besoin des deux. La commémoration devient un point de départ pour interroger le présent, et non une conclusion définitive.",
      ),
      question: {
        level: "C2",
        category: "société",
        prompt: "Quel risque l'auteur identifie-t-il dans les commémorations ?",
        options: [
          "Confondre mémoire et vérité historique",
          "Oublier complètement le passé",
          "Interdire les récits minoritaires",
          "Renoncer à toute cérémonie officielle",
        ],
        correct: "A",
        explanation:
          "L'auteur ne condamne pas le souvenir mais la confusion entre mémoire sélective et histoire critique.",
      },
    },
    {
      title: "Recommandations en ligne et autonomie",
      text: p(
        "Les algorithmes de recommandation sont souvent décrits comme des outils de confort : ils nous épargnent l'effort de choisir et nous proposent ce qui correspond à nos goûts. Cette description oublie qu'ils ne se contentent pas de deviner nos préférences ; ils les façonnent.",
        "Le mécanisme repose sur une boucle : nos clics nourrissent le modèle, qui oriente ensuite notre attention vers des contenus similaires. À court terme, l'expérience semble plus fluide. À long terme, elle peut réduire la diversité des sources et renforcer les convictions existantes.",
        "La question n'est donc pas de savoir si les recommandations sont bonnes ou mauvaises, mais quelles conditions rendent leur usage compatible avec l'autonomie. Transparence sur les critères, possibilité de désactiver le profilage et éducation aux médias constituent des pistes. L'enjeu est de préserver la capacité de choisir autrement.",
      ),
      question: {
        level: "C2",
        category: "sciences",
        prompt: "Quel effet à long terme les recommandations peuvent-elles produire ?",
        options: [
          "Réduire la diversité des sources et renforcer les convictions",
          "Améliorer durablement la mémoire des utilisateurs",
          "Supprimer toute publicité en ligne",
          "Garantir l'indépendance des médias",
        ],
        correct: "A",
        explanation:
          "Le texte décrit une boucle qui homogénéise les contenus et conforte les opinions déjà présentes.",
      },
    },
    {
      title: "Le silence en musique",
      text: p(
        "Le silence est rarement pensé comme une composante musicale. On l'associe à l'absence de son, à une pause entre deux phrases, comme si la musique commençait avec la première note. Cette conception néglige pourtant la force expressive des intervalles silencieux.",
        "Chez certains compositeurs, le silence structure l'œuvre autant que les accords. Il crée l'attente, isole un motif, rend perceptible la résonance d'un instrument. Le public éprouve alors une tension que le son seul ne produirait pas. Le silence n'est pas un vide à remplir, mais un espace à habiter.",
        "Cette expérience rejoint une question plus large : notre époque supporte mal les interruptions. Les plateformes remplissent chaque moment disponible, et le silence y apparaît comme un défaut. Pourtant, écouter véritablement suppose des pauses. La musique le rappelle : ce qui compte n'est pas seulement ce qui est joué, mais aussi ce qui est laissé en suspens.",
      ),
      question: {
        level: "C2",
        category: "art",
        prompt: "Quelle conception du silence l'auteur défend-il ?",
        options: [
          "Le silence est un espace expressif à part entière",
          "Le silence est un défaut à corriger",
          "Le silence doit être rempli par du son",
          "Le silence n'a aucun rôle en musique",
        ],
        correct: "A",
        explanation:
          "L'auteur présente le silence comme une composante musicale qui crée attente et tension, et non comme un vide.",
      },
    },
    {
      title: "Savoirs traditionnels et propriété intellectuelle",
      text: p(
        "Les savoirs traditionnels, qu'il s'agisse de remèdes, de techniques agricoles ou de motifs artistiques, sont souvent collectifs et transmis oralement. Le droit de la propriété intellectuelle, conçu pour protéger des œuvres individuelles, peine à les reconnaître. Cette inadéquation expose les communautés à une appropriation sans compensation.",
        "Des entreprises ont ainsi breveté des procédés inspirés de pratiques locales, parfois sans lien avec les populations concernées. Les recours juridiques existent, mais ils supposent des moyens et une preuve d'antériorité difficile à établir. Les communautés disposent rarement de documentation écrite.",
        "Plusieurs pistes sont discutées : bases de données de savoirs, contrats de partage des bénéfices, protections spécifiques. Aucune ne résout entièrement le problème, car il touche à une tension entre innovation et justice. Reconnaître les savoirs collectifs suppose de définir des règles de consentement et de partage.",
      ),
      question: {
        level: "C2",
        category: "droit",
        prompt:
          "Pourquoi le droit de la propriété intellectuelle est-il inadapté aux savoirs traditionnels ?",
        options: [
          "Il protège des œuvres individuelles alors que ces savoirs sont collectifs",
          "Il interdit toute utilisation des savoirs locaux",
          "Il garantit une compensation automatique aux communautés",
          "Il empêche les entreprises de déposer des brevets",
        ],
        correct: "A",
        explanation:
          "Le texte oppose la logique individuelle du droit d'auteur au caractère collectif et oral des savoirs traditionnels.",
      },
    },
    {
      title: "Les quartiers sans voiture",
      text: p(
        "Les projets de quartiers sans voiture séduisent par leur promesse de calme et de sécurité. Ils réduisent la pollution locale et libèrent de l'espace pour les piétons, les commerces et la végétation. Les premières expériences montrent une hausse de la fréquentation des commerces.",
        "Ces résultats ne doivent pas masquer les difficultés. Les habitants qui travaillent loin ou qui ont une mobilité réduite dépendent encore de la voiture. Si les transports publics ne sont pas renforcés, la mesure peut devenir un privilège réservé aux centres bien desservis. Les artisans ont besoin d'accéder aux chantiers avec leurs outils.",
        "La réussite dépend donc de la compensation des pertes d'usage. Parkings relais, navettes, livraisons mutualisées et dérogations ciblées font partie de la solution. Un quartier sans voiture n'est pas un quartier sans déplacements : c'est un espace où l'automobile cesse d'être la norme.",
      ),
      question: {
        level: "C2",
        category: "urbanisme",
        prompt: "De quoi dépend la réussite d'un quartier sans voiture ?",
        options: [
          "De la compensation des pertes d'usage par des alternatives",
          "De l'interdiction totale de circuler pour tous",
          "De la suppression des commerces de proximité",
          "De la construction de parkings en centre-ville",
        ],
        correct: "A",
        explanation:
          "Le texte conditionne la réussite du projet à des solutions de remplacement pour les habitants et les artisans.",
      },
    },
  ],
});
