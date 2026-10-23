import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 4.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_04 = defineFullTest({
  number: 4,
  description:
    "Quatrième examen blanc complet : trois épreuves enchaînées, du niveau A1 au niveau C2, dans les conditions du TCF Tout public.",
  listening: [
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Le marché de Noël ouvre vendredi à dix heures sur la place de l'église. Il sera ouvert tous les jours jusqu'au vingt-quatre décembre. L'entrée est libre.",
      prompt: "Quand le marché de Noël ouvre-t-il ?",
      options: ["Vendredi à dix heures", "Samedi à midi", "Jeudi à neuf heures", "Dimanche à quatorze heures"],
      correct: "A",
      explanation: "L'annonce fixe l'ouverture au vendredi à dix heures, place de l'église.",
    },
    {
      level: "A1",
      category: "services",
      transcription:
        "Bonjour, votre pull sera prêt jeudi après-midi. Le pressing ferme à dix-neuf heures. Merci de présenter votre ticket de dépôt.",
      prompt: "Quand le client peut-il récupérer son pull ?",
      options: ["Jeudi après-midi", "Mercredi matin", "Vendredi soir", "Samedi midi"],
      correct: "A",
      explanation: "Le pressing annonce que le vêtement sera prêt jeudi après-midi.",
    },
    {
      level: "A1",
      category: "études",
      transcription:
        "La réunion parents-professeurs aura lieu mardi à dix-huit heures dans la salle polyvalente. Merci de confirmer votre présence avant lundi.",
      prompt: "À quelle heure commence la réunion ?",
      options: ["À dix-huit heures", "À dix-sept heures", "À dix-neuf heures", "À vingt heures"],
      correct: "A",
      explanation: "La réunion est prévue mardi à dix-huit heures dans la salle polyvalente.",
    },
    {
      level: "A2",
      category: "transports",
      transcription:
        "Le train de huit heures dix pour Lyon est supprimé en raison d'un incident technique. Les voyageurs peuvent prendre le suivant, à neuf heures, sans supplément.",
      prompt: "Que peuvent faire les voyageurs ?",
      options: ["Prendre le train suivant sans payer plus", "Attendre le lendemain", "Demander un remboursement total", "Changer de gare"],
      correct: "A",
      explanation: "Le train suivant est accessible sans supplément après la suppression du huit heures dix.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Le cabinet médical sera fermé vendredi. En cas d'urgence, appelez le quinze ou rendez-vous au service des urgences de l'hôpital. Les ordonnances peuvent être retirées lundi.",
      prompt: "Que faire en cas d'urgence vendredi ?",
      options: ["Appeler le quinze ou aller aux urgences", "Attendre lundi", "Appeler le secrétariat", "Venir samedi matin"],
      correct: "A",
      explanation: "Le message indique d'appeler le quinze ou de se rendre aux urgences de l'hôpital.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "L'appartement sera libre le premier septembre. Il comprend deux chambres et un balcon. La visite est possible dès la semaine prochaine, sur rendez-vous.",
      prompt: "Quand le logement sera-t-il disponible ?",
      options: ["Le premier septembre", "Le premier octobre", "Dès la semaine prochaine", "À la fin de l'été"],
      correct: "A",
      explanation: "L'agence précise que l'appartement sera libre le premier septembre.",
    },
    {
      level: "A2",
      category: "sport",
      transcription:
        "Le cours de natation de mercredi est déplacé à la piscine du stade, car la piscine municipale est en travaux. L'horaire reste le même.",
      prompt: "Où aura lieu le cours ?",
      options: ["À la piscine du stade", "À la piscine municipale", "Au gymnase", "Au bord du lac"],
      correct: "A",
      explanation: "Les travaux de la piscine municipale obligent à déplacer le cours à celle du stade.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "La réunion de service est avancée à quatorze heures, car la salle doit être libérée à seize heures pour une formation. Merci d'apporter vos rapports imprimés.",
      prompt: "Pourquoi la réunion est-elle avancée ?",
      options: ["La salle est réservée ensuite", "Le directeur est absent", "Les rapports sont prêts", "La formation est annulée"],
      correct: "A",
      explanation: "La salle doit être libérée à seize heures pour une formation, d'où l'avancement de la réunion.",
    },
    {
      level: "B1",
      category: "restauration",
      transcription:
        "En raison d'un manque de personnel, le restaurant fermera désormais à vingt-deux heures au lieu de vingt-trois heures. Les clients ayant réservé après vingt et une heures trente sont prévenus par téléphone.",
      prompt: "Pourquoi les horaires changent-ils ?",
      options: ["Par manque de personnel", "À cause de travaux", "Pour une fermeture annuelle", "À la demande des clients"],
      correct: "A",
      explanation: "La fermeture plus tôt s'explique par un manque de personnel.",
    },
    {
      level: "B1",
      category: "logement",
      transcription:
        "Le syndic annonce des travaux de réfection de la toiture à partir de lundi. Les résidents sont priés de ne pas stationner devant l'entrée pendant la journée et de fermer leurs fenêtres.",
      prompt: "Que doivent faire les résidents ?",
      options: ["Fermer leurs fenêtres et libérer l'entrée", "Quitter l'immeuble", "Payer les travaux", "Déplacer leurs boîtes aux lettres"],
      correct: "A",
      explanation: "Les consignes demandent de fermer les fenêtres et de laisser l'entrée libre pendant les travaux.",
    },
    {
      level: "B1",
      category: "culture",
      transcription:
        "La médiathèque propose des ateliers de lecture pour les enfants de six à dix ans. Ils ont lieu le samedi matin et sont gratuits, mais l'inscription est obligatoire car les places sont limitées.",
      prompt: "Quel public est visé par les ateliers ?",
      options: ["Les enfants de six à dix ans", "Les adolescents", "Les adultes débutants", "Les personnes âgées"],
      correct: "A",
      explanation: "Les ateliers de lecture s'adressent aux enfants âgés de six à dix ans.",
    },
    {
      level: "B1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, je déménage samedi et je cherche deux personnes pour m'aider à porter les meubles. En échange, je propose un repas et je peux prêter ma remorque la semaine suivante.",
      prompt: "Que propose le voisin en échange ?",
      options: ["Un repas et le prêt d'une remorque", "Une somme d'argent", "Un logement", "Des meubles"],
      correct: "A",
      explanation: "Le voisin offre un repas et la possibilité d'emprunter sa remorque.",
    },
    {
      level: "B2",
      category: "travail",
      transcription:
        "Notre entreprise expérimente des horaires flexibles : les salariés peuvent commencer entre sept et dix heures. En contrepartie, ils doivent être présents lors de la réunion d'équipe de quinze heures et assurer quatre heures de disponibilité commune.",
      prompt: "Quelle condition accompagne les horaires flexibles ?",
      options: ["Assister à la réunion de quinze heures", "Travailler le samedi", "Prévenir la veille", "Réduire ses heures"],
      correct: "A",
      explanation: "La flexibilité est accordée à condition d'être présent à la réunion de quinze heures.",
    },
    {
      level: "B2",
      category: "transports",
      transcription:
        "À partir du mois prochain, la ligne de bus douze modifiera son itinéraire pour desservir le nouvel hôpital. L'arrêt de la mairie sera supprimé ; les usagers pourront utiliser l'arrêt République, situé à trois cents mètres.",
      prompt: "Quel arrêt sera supprimé ?",
      options: ["L'arrêt de la mairie", "L'arrêt République", "L'arrêt de l'hôpital", "L'arrêt de la gare"],
      correct: "A",
      explanation: "Le nouvel itinéraire supprime l'arrêt de la mairie au profit de celui de l'hôpital.",
    },
    {
      level: "B2",
      category: "environnement",
      transcription:
        "La ville a décidé d'interdire les pailles et couverts en plastique lors des événements publics. Les organisateurs devront utiliser de la vaisselle réutilisable. Une aide financière est prévue pour les petites associations.",
      prompt: "Quelle mesure la ville annonce-t-elle ?",
      options: ["Interdire le plastique à usage unique lors des événements", "Supprimer les événements publics", "Augmenter les taxes sur les associations", "Imposer la vaisselle jetable"],
      correct: "A",
      explanation: "La ville interdit les pailles et couverts en plastique et impose de la vaisselle réutilisable.",
    },
    {
      level: "B2",
      category: "études",
      transcription:
        "L'université met en place un tutorat pour les étudiants de première année. Des étudiants plus avancés les aideront à organiser leur travail et à préparer les examens. Le dispositif est facultatif et se déroule par petits groupes.",
      prompt: "Quel est l'objectif du tutorat ?",
      options: ["Aider à organiser le travail et préparer les examens", "Remplacer les cours magistraux", "Sélectionner les meilleurs étudiants", "Réduire les frais d'inscription"],
      correct: "A",
      explanation: "Le tutorat vise à soutenir l'organisation du travail et la préparation des examens.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "La campagne de vaccination contre la grippe commence lundi. Elle est prioritaire pour les personnes âgées, les femmes enceintes et les personnes atteintes de maladies chroniques. La vaccination est gratuite pour ces publics.",
      prompt: "Qui est prioritaire pour la vaccination ?",
      options: ["Les personnes âgées et les malades chroniques", "Les étudiants", "Les sportifs", "Les touristes"],
      correct: "A",
      explanation: "La campagne cible en priorité les personnes âgées, les femmes enceintes et les malades chroniques.",
    },
    {
      level: "B2",
      category: "consommation",
      transcription:
        "Un nouveau label alimentaire garantit que le produit a été fabriqué dans un rayon de cent kilomètres. Il ne signifie pas que le produit est biologique. Les consommateurs doivent donc lire attentivement la mention complémentaire.",
      prompt: "Que garantit le nouveau label ?",
      options: ["Une fabrication locale", "Une production biologique", "Un prix bas", "Une absence d'emballage"],
      correct: "A",
      explanation: "Le label certifie une fabrication dans un rayon de cent kilomètres, pas le caractère biologique.",
    },
    {
      level: "C1",
      category: "économie",
      transcription:
        "Le télétravail est souvent présenté comme un progrès pour tous. Il améliore effectivement le quotidien des salariés dont les tâches sont facilement dématérialisables. Mais il creuse aussi l'écart avec ceux qui doivent être physiquement présents, souvent moins qualifiés et moins bien rémunérés. L'outil qui libère les uns peut accentuer la contrainte des autres.",
      prompt: "Quel effet paradoxal le texte souligne-t-il ?",
      options: ["Le télétravail libère certains salariés mais accentue l'écart avec les autres", "Le télétravail réduit la productivité", "Le télétravail est refusé par les cadres", "Le télétravail supprime les emplois"],
      correct: "A",
      explanation: "Le texte oppose les salariés libérés par le télétravail à ceux dont la présence physique reste imposée.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "Le musée a restitué plusieurs objets acquis pendant la période coloniale. Ses responsables expliquent que la décision ne vide pas les collections, mais qu'elle en modifie le sens. Les objets ne sont plus seulement des pièces à conserver : ils redeviennent des témoins vivants pour les communautés d'origine. Le débat porte moins sur la propriété que sur la fonction de la mémoire.",
      prompt: "Quel argument les responsables avancent-ils ?",
      options: ["La restitution donne un nouveau sens aux objets", "La restitution vide définitivement le musée", "Les objets n'ont aucune valeur", "La mémoire ne concerne pas les musées"],
      correct: "A",
      explanation: "La restitution est présentée comme un changement de sens : les objets redeviennent des témoins vivants.",
    },
    {
      level: "C1",
      category: "sciences",
      transcription:
        "Les chercheurs s'intéressent de plus en plus aux sols urbains. Longtemps considérés comme des surfaces inertes, ils abritent pourtant une vie microbienne complexe et jouent un rôle dans l'infiltration de l'eau. Leur imperméabilisation aggrave les inondations et empêche la reconstitution de cette vie. Réintroduire la terre dans la ville devient donc un enjeu sanitaire autant qu'écologique.",
      prompt: "Pourquoi les sols urbains intéressent-ils les chercheurs ?",
      options: ["Ils abritent une vie microbienne et limitent les inondations", "Ils sont faciles à construire", "Ils produisent de l'énergie", "Ils remplacent les parcs"],
      correct: "A",
      explanation: "Les sols urbains hébergent une vie microbienne et participent à l'infiltration de l'eau.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Les dispositifs de participation citoyenne se multiplient, mais leur influence reste incertaine. Les habitants consultés disposent rarement des informations techniques nécessaires pour arbitrer entre des solutions complexes. Sans formation ni retour sur les décisions, la participation risque de servir de caution à des choix déjà faits. La qualité du débat dépend donc de la manière dont le pouvoir accepte d'être transformé par lui.",
      prompt: "Quelle limite de la participation citoyenne est évoquée ?",
      options: ["Le manque d'information et de pouvoir réel des habitants", "Le coût trop élevé des réunions", "Le désintérêt total des citoyens", "La suppression des consultations"],
      correct: "A",
      explanation: "Le texte pointe le défaut d'information technique et le risque d'une participation de façade.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "L'attention est devenue une ressource rare, disputée par les plateformes et les publicités. On la décrit souvent comme une propriété individuelle qu'il suffirait de mieux gérer. Cette approche ignore sa dimension collective : l'attention dépend des conditions d'organisation du travail, de l'espace public et des technologies. La protéger suppose donc moins d'exhorter chacun à la concentration que de réduire les sollicitations imposées à tous.",
      prompt: "Quelle thèse l'auteur défend-il ?",
      options: ["L'attention est aussi collective et dépend des conditions imposées", "L'attention est une propriété purement individuelle", "Les technologies améliorent la concentration", "La publicité est nécessaire à l'attention"],
      correct: "A",
      explanation: "L'auteur refuse de réduire l'attention à un effort individuel et la situe dans un cadre collectif.",
    },
    {
      level: "C2",
      category: "politique",
      transcription:
        "La démocratie est souvent jugée à sa capacité à répondre vite aux demandes. Or ses procédures ralentissent délibérément les décisions : elles permettent la discussion, l'examen des alternatives et la protection des minorités. Ce temps n'est pas un défaut de fonctionnement, mais une condition de légitimité. Le conflit est donc structurel entre l'exigence d'efficacité et celle de délibération, et aucune réforme ne peut le supprimer entièrement.",
      prompt: "Quel conflit structurel le texte décrit-il ?",
      options: ["Entre l'efficacité immédiate et la délibération démocratique", "Entre les experts et les citoyens", "Entre les partis politiques", "Entre l'État et les régions"],
      correct: "A",
      explanation: "Le texte oppose la rapidité attendue et le temps nécessaire à la délibération légitime.",
    },
    {
      level: "C2",
      category: "littérature",
      transcription:
        "Le roman ne restitue jamais la mémoire telle qu'elle a été vécue. Il la recompose, sélectionne, invente parfois, et c'est précisément ce travail qui la rend partageable. Une mémoire strictement fidèle resterait privée, faite d'impressions sans forme. En donnant une structure au souvenir, la fiction permet à d'autres de s'y reconnaître sans l'avoir vécu. Son inexactitude n'est donc pas un défaut, mais la condition de sa transmission.",
      prompt: "Quel rôle l'auteur attribue-t-il au roman ?",
      options: ["Recomposer la mémoire pour la rendre partageable", "Restituer la mémoire avec une fidélité totale", "Conserver les souvenirs à l'état privé", "Remplacer l'histoire officielle"],
      correct: "A",
      explanation: "Le roman recompose le souvenir et, par cette mise en forme, le rend transmissible.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "présent",
      prompt: "Chaque matin, elle ___ le journal avant de partir.",
      options: ["lit", "lis", "lisons", "lisez"],
      correct: "A",
      explanation: "Le sujet « elle » impose la troisième personne du singulier : « elle lit ».",
    },
    {
      level: "A2",
      category: "articles",
      prompt: "Il faut acheter ___ légumes pour la soupe.",
      options: ["des", "de", "du", "le"],
      correct: "A",
      explanation: "Devant un nom pluriel, on emploie l'article indéfini « des » : « des légumes ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Nous ___ le film quand l'orage a éclaté.",
      options: ["regardions", "regardons", "avons regardé", "regarderons"],
      correct: "A",
      explanation: "L'imparfait décrit l'action en cours au moment où l'orage a éclaté.",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Les clés, je ___ ai rendues à la concierge.",
      options: ["les", "leur", "lui", "en"],
      correct: "A",
      explanation: "Le pronom COD « les » remplace « ces photos », accordé avec « montrées ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Elle rêve ___ habiter au bord de la mer.",
      options: ["d'", "à", "de", "pour"],
      correct: "A",
      explanation: "Le verbe « rêver » se construit avec « de » : « rêver d'habiter ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce musée est ___ grand que je l'imaginais.",
      options: ["moins", "aussi", "plus", "très"],
      correct: "A",
      explanation: "La comparaison avec « que » exige un comparatif : « moins grand que ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "La ville ___ il nous a parlé se trouve en Bretagne.",
      options: ["dont", "que", "qui", "où"],
      correct: "A",
      explanation: "Le verbe « parler de » appelle le pronom relatif « dont ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Quand tu ___ tes devoirs, tu pourras sortir.",
      options: ["auras fini", "finiras", "finissais", "as fini"],
      correct: "A",
      explanation: "L'action antérieure à un futur après « quand » se met au futur antérieur.",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il faut que nous ___ ce problème avant lundi.",
      options: ["résolvions", "résolvons", "résoudrons", "résoudrions"],
      correct: "A",
      explanation: "« Il faut que » exige le subjonctif présent : « que nous résolvions ».",
    },
    {
      level: "B2",
      category: "connecteurs",
      prompt: "La route est fermée ___ un éboulement.",
      options: ["à cause d'", "grâce à", "malgré", "afin d'"],
      correct: "A",
      explanation: "« À cause de » exprime une cause négative, adaptée à un éboulement.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "La nouvelle ___ par le maire lors de la cérémonie.",
      options: ["a été annoncée", "a annoncé", "annonçait", "annoncera"],
      correct: "A",
      explanation: "Le complément d'agent « par le maire » impose la voix passive : « a été annoncée ».",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "___ son café, il lisait les informations.",
      options: ["En buvant", "Buvant", "Bu", "Boire"],
      correct: "A",
      explanation: "Le gérondif exprime la simultanéité et se forme avec « en » : « en buvant ».",
    },
    {
      level: "B2",
      category: "discours indirect",
      prompt: "Elle a demandé si nous ___ le lendemain.",
      options: ["viendrions", "viendrons", "venions", "viendrait"],
      correct: "A",
      explanation: "Au discours indirect, le futur devient conditionnel : « nous viendrions ».",
    },
    {
      level: "B2",
      category: "pronoms relatifs",
      prompt: "L'exposition ___ nous avons visitée était consacrée à la mer.",
      options: ["que", "dont", "à laquelle", "où"],
      correct: "A",
      explanation: "Le verbe « visiter » est transitif direct : « l'exposition que nous avons visitée ».",
    },
    {
      level: "C1",
      category: "syntaxe",
      prompt: "À peine ___ entrée que le téléphone sonna.",
      options: ["était", "a", "est", "fut"],
      correct: "A",
      explanation: "Après « à peine » en tête de phrase, on emploie l'inversion et le plus-que-parfait : « était-elle entrée ».",
    },
    {
      level: "C1",
      category: "nominalisation",
      prompt: "La ___ de cette loi a nécessité de longues négociations.",
      options: ["promulgation", "promulguer", "promulgué", "promulguant"],
      correct: "A",
      explanation: "Le nom correspondant au verbe « promulguer » est « la promulgation ».",
    },
    {
      level: "C1",
      category: "hypothèse",
      prompt: "Si nous ___ plus tôt, nous aurions évité les embouteillages.",
      options: ["étions partis", "partions", "serions partis", "partirons"],
      correct: "A",
      explanation: "L'hypothèse irréelle au passé exige le plus-que-parfait : « si nous étions partis ».",
    },
    {
      level: "C1",
      category: "lexique",
      prompt: "___ solide, son argumentation ne convainc pas tout le monde.",
      options: ["Quoique", "Bien que", "Même si", "Parce que"],
      correct: "A",
      explanation: "« Quoique » suivi d'un adjectif exprime la concession : « quoique solide ».",
    },
    {
      level: "C2",
      category: "conjugaison",
      prompt: "Il eût été préférable qu'elle ___ plus tôt.",
      options: ["fût prévenue", "soit prévenue", "sera prévenue", "est prévenue"],
      correct: "A",
      explanation: "Dans une phrase au conditionnel passé deuxième forme, le subjonctif plus-que-parfait s'impose : « qu'elle fût prévenue ».",
    },
    {
      level: "C2",
      category: "connecteurs",
      prompt: "___ la complexité du dossier, les négociations ont abouti.",
      options: ["Nonobstant", "En dépit que", "Bien qu'", "Parce qu'"],
      correct: "A",
      explanation: "« Nonobstant » signifie « malgré » et introduit un nom : « nonobstant la complexité ».",
    },
  ],
  reading: [
    {
      title: "Nouveaux horaires de la déchèterie",
      text: p(
        "À compter du mois prochain, la déchèterie ouvrira du mardi au samedi, de neuf heures à midi et de quatorze heures à dix-huit heures. Elle restera fermée le lundi et les jours fériés. Les professionnels devront présenter une carte d'accès à l'entrée.",
      ),
      question: {
        level: "B1",
        prompt: "Quels jours la déchèterie sera-t-elle ouverte ?",
        options: ["Du mardi au samedi", "Du lundi au vendredi", "Uniquement le samedi", "Tous les jours"],
        correct: "A",
        explanation: "Les nouveaux horaires prévoient une ouverture du mardi au samedi, hors jours fériés.",
      },
    },
    {
      title: "Alerte aux vols de vélos",
      text: p(
        "Plusieurs vélos ont été volés dans les garages de l'immeuble. La copropriété recommande de fermer la porte du local avec soin et d'attacher chaque vélo à un point fixe. Un marquage gratuit sera proposé samedi matin par la police municipale.",
      ),
      question: {
        level: "B1",
        prompt: "Que propose la police municipale ?",
        options: ["Un marquage gratuit des vélos", "Une surveillance des garages", "Des vélos de remplacement", "Une réunion de quartier"],
        correct: "A",
        explanation: "La police municipale organise un marquage gratuit des vélos le samedi matin.",
      },
    },
    {
      title: "Cours de secourisme",
      text: p(
        "La maison des associations organise une formation aux premiers secours samedi de neuf heures à dix-sept heures. Elle est ouverte dès seize ans et coûte vingt euros. Les participants doivent apporter un pique-nique ; le certificat est remis le soir.",
      ),
      question: {
        level: "B1",
        prompt: "Que doivent apporter les participants ?",
        options: ["Un pique-nique", "Un certificat médical", "Une tenue de sport", "Un ordinateur"],
        correct: "A",
        explanation: "Il est demandé aux participants d'apporter leur repas de midi.",
      },
    },
    {
      title: "Règlement de la salle de sport",
      text: p(
        "L'accès à la salle est réservé aux personnes inscrites. Une serviette est obligatoire sur les appareils, et les chaussures de ville sont interdites dans la salle. Les mineurs doivent présenter une autorisation signée par leurs parents.",
      ),
      question: {
        level: "B1",
        prompt: "Que doivent présenter les mineurs ?",
        options: ["Une autorisation parentale", "Une carte d'étudiant", "Un certificat de scolarité", "Une pièce d'identité"],
        correct: "A",
        explanation: "Le règlement exige une autorisation signée par les parents pour les mineurs.",
      },
    },
    {
      title: "Fermeture temporaire de la route",
      text: p(
        "La route départementale sera fermée jeudi de huit heures à dix-sept heures pour l'élagage des arbres. Une déviation sera mise en place par le chemin des Vignes. Les riverains pourront accéder à pied à leurs habitations.",
      ),
      question: {
        level: "B1",
        prompt: "Pourquoi la route est-elle fermée ?",
        options: ["Pour l'élagage des arbres", "Pour une course cycliste", "Pour réparer un pont", "Pour un marché"],
        correct: "A",
        explanation: "La fermeture est motivée par des travaux d'élagage le long de la route.",
      },
    },
    {
      title: "Le retour du train de nuit",
      text: p(
        "La région expérimente une ligne de train de nuit entre deux villes universitaires. Les places sont proposées à prix réduit pendant six mois, avec une voiture équipée de couchettes.",
        "Les élus espèrent désengorger les routes et faciliter les trajets des étudiants. Les associations environnementales saluent l'initiative, mais s'inquiètent de la fréquence : trois allers-retours par semaine seulement, alors que la demande pourrait être plus large.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle réserve les associations expriment-elles ?",
        options: ["La fréquence insuffisante des trains", "Le prix trop élevé", "Le manque de couchettes", "La fermeture des routes"],
        correct: "A",
        explanation: "Les associations jugent la fréquence trop faible face à la demande potentielle.",
      },
    },
    {
      title: "Les emballages recyclables",
      text: p(
        "La loi prévoit que tous les emballages plastiques soient recyclables d'ici quelques années. Les industriels doivent adapter leurs matériaux, mais tous les centres de tri n'ont pas les équipements nécessaires.",
        "Les associations de consommateurs demandent une information claire : un logo unique remplacerait les nombreux symboles actuels, souvent mal compris. La transition dépendra autant de la technologie que de la pédagogie.",
      ),
      question: {
        level: "B2",
        prompt: "Que demandent les associations de consommateurs ?",
        options: ["Un logo unique et clair", "La suppression du tri", "Une baisse des prix", "Le retour des emballages en verre"],
        correct: "A",
        explanation: "Elles souhaitent un logo unique pour remplacer des symboles peu compréhensibles.",
      },
    },
    {
      title: "La semaine de quatre jours",
      text: p(
        "Plusieurs entreprises ont testé la semaine de quatre jours sans réduction de salaire. Les directions observent des réunions plus courtes et une meilleure organisation.",
        "Le bilan reste toutefois inégal. Les équipes en contact avec la clientèle doivent rester présentes cinq jours par semaine, ce qui complique l'application du modèle. Les chercheurs invitent donc à ne pas généraliser sans examiner chaque métier.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi le modèle est-il difficile à généraliser ?",
        options: ["Certains métiers exigent une présence cinq jours sur cinq", "Les salariés refusent de travailler moins", "Les arrêts maladie augmentent", "Les réunions sont plus longues"],
        correct: "A",
        explanation: "Les équipes en contact avec la clientèle doivent rester présentes cinq jours par semaine.",
      },
    },
    {
      title: "Bibliothèques et horaires élargis",
      text: p(
        "Plusieurs bibliothèques ouvrent désormais en soirée et le dimanche. La mesure attire un public nouveau, notamment des actifs et des familles. Les équipes doivent toutefois être renforcées et les budgets augmentent.",
        "Les responsables réfléchissent à des partenariats avec des associations pour animer ces créneaux. L'enjeu n'est pas seulement d'allonger les horaires, mais de proposer une offre adaptée aux publics qui fréquentaient peu les lieux.",
      ),
      question: {
        level: "B2",
        prompt: "Quel est l'enjeu principal des horaires élargis ?",
        options: ["Adapter l'offre aux nouveaux publics", "Réduire le personnel", "Fermer le dimanche", "Augmenter les tarifs"],
        correct: "A",
        explanation: "L'objectif est d'adapter les activités aux publics qui venaient peu auparavant.",
      },
    },
    {
      title: "Le bénévolat des jeunes",
      text: p(
        "Les jeunes s'engagent de plus en plus dans des missions courtes et ponctuelles. Les associations y voient une énergie nouvelle, mais peinent à les fidéliser. Les tâches proposées sont peu qualifiées, ce qui limite l'engagement dans la durée.",
        "Pour les retenir, les structures misent sur la formation et la reconnaissance des compétences. Un engagement accompagné peut devenir un atout professionnel, à condition que les missions soient claires.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les associations cherchent-elles à fidéliser les jeunes ?",
        options: ["Par la formation et la reconnaissance des compétences", "Par des rémunérations élevées", "En allongeant les missions", "En supprimant l'accompagnement"],
        correct: "A",
        explanation: "Les structures misent sur la formation et la valorisation des compétences acquises.",
      },
    },
    {
      title: "Réduire le gaspillage alimentaire",
      text: p(
        "Les supermarchés doivent proposer leurs invendus à des associations. La mesure évite de jeter des produits consommables, mais exige une logistique rigoureuse : respect du froid, tri et transport rapide.",
        "Les associations reçoivent davantage de denrées, mais craignent une charge de travail. Certaines réclament des moyens pour stocker et distribuer. La lutte contre le gaspillage exige donc une organisation partagée, pas seulement un don.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté les associations soulignent-elles ?",
        options: ["La charge de travail et le besoin de moyens", "Le refus des supermarchés", "La mauvaise qualité des produits", "L'interdiction des dons"],
        correct: "A",
        explanation: "Les associations redoutent une surcharge et demandent des moyens de stockage et de distribution.",
      },
    },
    {
      title: "Les métiers en tension",
      text: p(
        "Certains secteurs peinent à recruter malgré des offres nombreuses. Les entreprises pointent un manque de candidats qualifiés, alors que des formations existent. Les salaires, les horaires et les conditions de travail expliquent souvent les difficultés.",
        "Les syndicats estiment que la communication ne suffira pas : sans meilleures conditions d'emploi, les candidats resteront rares. Attirer ne suffit pas si l'on ne fidélise pas.",
      ),
      question: {
        level: "B2",
        prompt: "Qu'estiment les syndicats ?",
        options: ["Les conditions d'emploi doivent être améliorées", "Les formations sont inutiles", "Les salaires sont trop élevés", "Les candidats manquent de motivation"],
        correct: "A",
        explanation: "Les syndicats jugent indispensable d'améliorer les conditions d'emploi pour attirer et fidéliser.",
      },
    },
    {
      title: "Le chauffage collectif",
      text: p(
        "Un immeuble a adopté un chauffage collectif alimenté par une pompe à chaleur. Les charges ont baissé la première année. Les copropriétaires doivent voter un budget de maintenance pour garantir la durée de l'installation.",
        "Le système exige une gestion commune : une température élevée dans un logement influence la consommation de tous. Des compteurs individuels responsabilisent les occupants, sans supprimer la solidarité du réseau.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi des compteurs individuels ont-ils été installés ?",
        options: ["Pour responsabiliser les occupants", "Pour augmenter les charges", "Pour remplacer la pompe à chaleur", "Pour chauffer les parties communes"],
        correct: "A",
        explanation: "Les compteurs visent à faire prendre conscience à chacun de sa consommation.",
      },
    },
    {
      title: "Tourisme et trains régionaux",
      text: p(
        "Des lignes ferroviaires régionales proposent des tarifs spéciaux pour les excursionnistes. L'objectif est de désengorger les routes et de prolonger la saison dans les villes d'étape. Les premiers résultats sont bons.",
        "Les élus locaux demandent des horaires adaptés aux retours en fin de journée. Sans train tardif, les visiteurs restent dépendants de la voiture. Le dispositif n'aura plein effet que si l'offre correspond réellement aux usages.",
      ),
      question: {
        level: "B2",
        prompt: "Que demandent les élus locaux ?",
        options: ["Des horaires adaptés aux retours tardifs", "Une baisse des tarifs ferroviaires", "La fermeture des routes", "Plus de places de parking"],
        correct: "A",
        explanation: "Les élus réclament des trains plus tardifs pour éviter la dépendance à la voiture.",
      },
    },
    {
      title: "Les crèches à horaires adaptés",
      text: p(
        "Face aux horaires décalés de nombreux parents, des crèches ouvrent plus tôt et ferment plus tard. Le dispositif améliore la conciliation entre travail et famille, mais coûte cher en personnel.",
        "Les gestionnaires réclament des financements pérennes, car les subventions ne couvrent pas ces amplitudes. Les parents souhaitent surtout une continuité : changer de crèche en cours d'année stresse les enfants comme les adultes.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté financière les crèches rencontrent-elles ?",
        options: ["Les subventions ne couvrent pas les horaires élargis", "Les parents refusent de payer", "Le personnel est trop nombreux", "Les locaux sont inutilisés"],
        correct: "A",
        explanation: "Les subventions actuelles ne suffisent pas à financer l'amplitude horaire supplémentaire.",
      },
    },
    {
      title: "L'intelligence artificielle et le travail",
      text: p(
        "Les outils d'intelligence artificielle transforment moins les métiers qu'ils ne déplacent leurs tâches. Les activités répétitives sont automatisées, tandis que le contrôle, l'interprétation et la relation aux usagers prennent plus de place. Les emplois ne disparaissent pas forcément, mais leur contenu change.",
        "Les salariés les moins qualifiés sont les plus exposés, car leur travail est plus standardisé. Les experts, eux, se concentrent sur des tâches complexes. La formation devient décisive pour développer le jugement que la machine ne fournit pas.",
        "Le risque n'est pas le remplacement brutal, mais la polarisation : quelques emplois qualifiés se renforcent, beaucoup d'autres se fragilisent. Une politique adaptée devrait anticiper ces écarts plutôt que d'accompagner les reconversions après coup.",
      ),
      question: {
        level: "C1",
        prompt: "Quel risque principal l'auteur met-il en avant ?",
        options: ["La polarisation entre emplois qualifiés et fragilisés", "La disparition immédiate de tous les métiers", "La baisse de la productivité", "Le refus des salariés d'utiliser les outils"],
        correct: "A",
        explanation: "L'auteur souligne une polarisation plutôt qu'un remplacement massif et brutal.",
      },
    },
    {
      title: "La réparation comme droit",
      text: p(
        "Plusieurs pays discutent d'un droit à la réparation pour les appareils électroniques. L'objectif est de prolonger la durée de vie des produits et de réduire les déchets. Les fabricants devraient fournir des pièces détachées et des manuels pendant plusieurs années.",
        "Les industriels invoquent les coûts de stockage et les risques des réparations hors réseau. Les associations répondent que l'obsolescence rapide nourrit le gaspillage. Le débat porte moins sur le prix que sur le modèle économique : vendre toujours plus ou entretenir l'existant.",
        "La mise en œuvre soulève une question pratique : qui réparera ? Le métier de réparateur a longtemps été dévalorisé et les formations sont rares. Un droit sans professionnels disponibles resterait théorique.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle question pratique le texte soulève-t-il ?",
        options: ["La disponibilité des réparateurs et des formations", "Le prix des appareils neufs", "La couleur des produits", "La fermeture des usines"],
        correct: "A",
        explanation: "Le texte insiste sur le manque de réparateurs formés, qui rendrait le droit théorique.",
      },
    },
    {
      title: "Les villes et la chaleur",
      text: p(
        "Les épisodes de chaleur frappent plus durement les quartiers densément bâtis, où le béton emmagasine la chaleur et la végétation manque. Les températures y dépassent parfois de plusieurs degrés celles des zones voisines.",
        "Les solutions techniques existent : plantations, toitures claires, fontaines. Leur efficacité dépend de la continuité : un arbre isolé rafraîchit peu, alors qu'un réseau de rues végétalisées modifie le climat local. Les chercheurs parlent d'infrastructures fraîches, non de mesures ponctuelles.",
        "La difficulté est aussi sociale. Les habitants des quartiers exposés disposent souvent de moins de moyens pour se protéger. Végétaliser suppose donc de choisir où investir, et ce choix révèle une conception de l'égalité urbaine. La chaleur n'est pas seulement un phénomène météorologique : elle distribue les vulnérabilités.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi les chercheurs parlent-ils d'infrastructures fraîches ?",
        options: ["Parce que l'effet dépend de la continuité et non de mesures isolées", "Parce que les arbres isolés sont suffisants", "Parce que la technique est inutile", "Parce que les habitants doivent déménager"],
        correct: "A",
        explanation: "Ils insistent sur la continuité des aménagements, plus efficace que des actions ponctuelles.",
      },
    },
    {
      title: "L'information locale",
      text: p(
        "La presse locale traverse une crise durable : moins d'abonnés, moins de journalistes, moins de bureaux en province. Cette baisse a un effet politique. Sans correspondants sur place, les conseils municipaux sont moins suivis et les décisions moins discutées.",
        "Les lecteurs disent pourtant vouloir une information de proximité. Mais ils hésitent à payer des contenus consultés gratuitement en ligne. Les modèles alternatifs se multiplient : sites participatifs, newsletters, partenariats régionaux. Aucun ne remplace totalement une rédaction professionnelle.",
        "L'enjeu dépasse l'économie des médias. Une démocratie locale suppose des citoyens informés des choix qui les concernent. La disparition de la presse locale réduit la capacité de contrôle et de débat, alors que les décisions publiques se complexifient. L'enjeu est institutionnel et culturel.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la disparition de la presse locale a-t-elle un effet politique ?",
        options: ["Elle réduit le suivi et le débat sur les décisions publiques", "Elle augmente le nombre de journalistes", "Elle améliore la transparence", "Elle supprime les élections"],
        correct: "A",
        explanation: "Sans correspondants locaux, les décisions publiques sont moins suivies et moins discutées.",
      },
    },
    {
      title: "L'art public et le débat",
      text: p(
        "Les œuvres d'art installées dans l'espace public suscitent souvent des controverses. Certains habitants les jugent inutiles ou laides, d'autres y voient un signe d'ouverture. Les artistes rappellent que l'art public n'est pas décoratif : il interroge le lieu et ceux qui le traversent.",
        "Les municipalités hésitent entre la commande directe et la consultation des habitants. La première permet une cohérence artistique, la seconde évite le sentiment d'une décision imposée. Mais une consultation ne garantit pas un débat informé : sans médiation, elle privilégie les goûts dominants.",
        "La question n'est donc pas de choisir entre experts et citoyens, mais d'organiser leur rencontre. Une œuvre contestée peut être un échec ou une réussite, selon que la controverse produit réflexion ou rejet. C'est cette qualité du débat qui manque le plus souvent.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle est la position de l'auteur sur les consultations ?",
        options: ["Elles ne suffisent pas sans médiation et débat informé", "Elles doivent remplacer les experts", "Elles sont toujours inutiles", "Elles garantissent l'accord de tous"],
        correct: "A",
        explanation: "L'auteur juge les consultations insuffisantes sans médiation, car elles privilégient les goûts dominants.",
      },
    },
    {
      title: "La liberté et la sécurité",
      text: p(
        "Toute société doit arbitrer entre liberté et sécurité, mais cet arbitrage est souvent présenté comme un simple dosage. Or les deux termes ne sont pas symétriques : la sécurité est une condition de l'exercice des libertés, tandis que certaines libertés sont une condition du contrôle de la sécurité.",
        "Renforcer la surveillance peut protéger des dangers réels, mais elle modifie aussi les rapports entre citoyens et institutions. Une société qui se surveille elle-même pour se rassurer produit une confiance fragile, car elle transforme chacun en suspect potentiel. La sécurité obtenue par la méfiance générale n'est pas la même que celle construite par des institutions solides.",
        "Le débat ne se réduit donc pas à la quantité de liberté à sacrifier. Il porte sur la manière dont la sécurité est produite : par la capacité à agir ensemble ou par la surveillance mutuelle. Choisir entre ces modèles engage une conception de la vie commune, pas seulement un calcul de risques.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi l'auteur refuse-t-il de réduire le débat à un dosage ?",
        options: ["La sécurité et la liberté se conditionnent mutuellement", "La sécurité est toujours prioritaire", "La liberté n'a aucune limite", "Le dosage est techniquement impossible"],
        correct: "A",
        explanation: "L'auteur souligne une relation de condition réciproque, et non un simple échange de quantités.",
      },
    },
    {
      title: "Le sens de l'égalité",
      text: p(
        "L'égalité est souvent comprise comme l'identité des situations. Cette lecture conduit à mesurer les écarts et à vouloir les supprimer. Une autre conception, plus exigeante, considère l'égalité comme la possibilité réelle de choisir sa vie, ce qui suppose de traiter différemment des personnes inégales.",
        "Les deux approches ne s'opposent pas entièrement. Sans un socle commun, la liberté de choisir reste théorique ; sans attention aux situations particulières, l'égalité formelle peut reproduire les dominations qu'elle prétend corriger. La difficulté est de tenir ensemble l'universel et le singulier.",
        "Le risque est de confondre l'égalité avec l'uniformité. Une société qui exige de tous le même parcours confond justice et ressemblance. À l'inverse, une société qui ne reconnaît que des différences renonce à toute commune mesure. Penser l'égalité, c'est accepter cette tension plutôt que la résoudre par un slogan.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle tension l'auteur invite-t-il à tenir ?",
        options: ["Entre l'universel et le singulier", "Entre l'égalité et l'inégalité", "Entre la liberté et la contrainte", "Entre l'État et le marché"],
        correct: "A",
        explanation: "Le texte oppose le socle commun et l'attention aux situations particulières, et refuse de choisir.",
      },
    },
    {
      title: "La traduction et la perte",
      text: p(
        "Traduire, c'est toujours perdre quelque chose : un rythme, une ambiguïté, une connotation. Les traducteurs le savent et compensent ailleurs, par une image ou une tournure qui restitue l'effet plutôt que le mot. Cette compensation n'est pas une trahison, mais une forme de fidélité au texte.",
        "Les lecteurs oublient souvent que la traduction est une interprétation. Ils attendent une transparence impossible, comme si le texte original pouvait apparaître intact dans une autre langue. Cette attente témoigne d'une conception de la langue comme simple outil de transmission, alors qu'elle est aussi une manière de découper le monde.",
        "Reconnaître la perte ne dévalue pas la traduction ; cela permet de comprendre ce qu'elle fait. Une traduction réussie ne restitue pas tout, elle construit une œuvre qui tient debout dans la langue d'arrivée. Sa fidélité est une fidélité à l'expérience de lecture, non à une équivalence mot à mot.",
      ),
      question: {
        level: "C2",
        prompt: "En quel sens une traduction peut-elle être fidèle selon l'auteur ?",
        options: ["Elle reste fidèle à l'expérience de lecture", "Elle reproduit chaque mot de l'original", "Elle supprime toute perte", "Elle adapte le texte au goût du public"],
        correct: "A",
        explanation: "L'auteur définit la fidélité comme celle de l'expérience de lecture, non du mot à mot.",
      },
    },
    {
      title: "L'ennui comme ressource",
      text: p(
        "L'ennui est généralement perçu comme un vide à combler. Pourtant, les moments sans sollicitation permettent à l'esprit de vagabonder, d'établir des liens inattendus et de revenir sur ce qui importe. Les environnements saturés d'écrans suppriment ces temps de latence.",
        "Les psychologues distinguent l'ennui subi, qui accompagne l'absence de sens, de l'ennui fécond, qui ouvre un espace de réflexion. La confusion entre les deux conduit à vouloir supprimer toute inactivité. Or une société qui remplit chaque instant de stimulation prive les individus de la possibilité de découvrir leurs propres désirs.",
        "Réhabiliter l'ennui ne signifie pas imposer l'inaction. Il s'agit de préserver des plages non programmées, où l'attention n'est pas captée par un objectif. C'est dans ces marges que se forment parfois les questions que l'efficacité immédiate empêche de poser.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle distinction l'auteur juge-t-il essentielle ?",
        options: ["Entre ennui subi et ennui fécond", "Entre travail et loisir", "Entre écrans et livres", "Entre adultes et enfants"],
        correct: "A",
        explanation: "Le texte oppose l'ennui subi, dépourvu de sens, à l'ennui fécond qui ouvre la réflexion.",
      },
    },
    {
      title: "La confiance dans les institutions",
      text: p(
        "La confiance institutionnelle ne repose pas sur la conviction que les décisions sont toujours bonnes. Elle suppose la croyance que les procédures permettent de corriger les erreurs et de demander des comptes. Une institution peut être contestée sans être délégitimée, à condition que la contestation ait des effets.",
        "Les crises de confiance surviennent souvent lorsque l'écart entre les règles annoncées et les pratiques observées devient visible. Il ne suffit alors pas de communiquer davantage : la parole publique perd sa valeur si elle n'est pas suivie d'actes vérifiables. La transparence n'est pas un supplément moral, mais une condition de crédibilité.",
        "La confiance se construit donc dans l'épreuve. Une institution qui reconnaît ses erreurs et modifie ses pratiques peut renforcer sa légitimité ; une institution qui nie les faits, même en communiquant habilement, l'affaiblit. La crédibilité n'est pas une image à produire, mais une relation à entretenir.",
      ),
      question: {
        level: "C2",
        prompt: "Sur quoi repose la confiance institutionnelle selon l'auteur ?",
        options: ["Sur des procédures capables de corriger et de rendre des comptes", "Sur la communication habile des dirigeants", "Sur l'absence de contestation", "Sur la certitude que les décisions sont bonnes"],
        correct: "A",
        explanation: "L'auteur lie la confiance à la possibilité de corriger les erreurs et d'exiger des comptes.",
      },
    },
  ],
});
