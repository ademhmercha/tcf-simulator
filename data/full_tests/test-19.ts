import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 19.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_19 = defineFullTest({
  number: 19,
  description:
    "Dix-neuvième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonjour, je m'appelle Karim. J'ai trente ans. J'habite à Marseille avec ma femme et notre fille. Elle a deux ans.",
      prompt: "Quel âge a la fille de Karim ?",
      options: ["Deux ans", "Trente ans", "Douze ans", "Vingt ans"],
      correct: "A",
      explanation: "Karim précise que sa fille a deux ans ; trente ans est son propre âge.",
    },
    {
      level: "A1",
      category: "transports",
      transcription:
        "Le métro est très pratique pour aller au travail. Je prends la ligne deux à huit heures. J'arrive au bureau en vingt minutes.",
      prompt: "Combien de temps dure le trajet ?",
      options: ["Vingt minutes", "Huit minutes", "Deux heures", "Une heure"],
      correct: "A",
      explanation: "La personne arrive au bureau en vingt minutes grâce à la ligne deux.",
    },
    {
      level: "A1",
      category: "restaurant",
      transcription:
        "Bonsoir, vous avez choisi ? Je prends une salade et du poisson. Et comme boisson ? De l'eau, s'il vous plaît.",
      prompt: "Quelle boisson le client commande-t-il ?",
      options: ["De l'eau", "Du vin", "Du jus d'orange", "Du café"],
      correct: "A",
      explanation: "Le client choisit de l'eau comme boisson.",
    },
    {
      level: "A2",
      category: "voyages",
      transcription:
        "Attention, le vol à destination de Rome est retardé de quarante minutes. Les passagers sont invités à patienter en salle d'embarquement, porte douze.",
      prompt: "De combien de temps le vol est-il retardé ?",
      options: ["Quarante minutes", "Quatorze minutes", "Une heure", "Douze minutes"],
      correct: "A",
      explanation: "L'annonce indique un retard de quarante minutes pour le vol vers Rome.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Madame Girard, votre mammographie est prévue jeudi à neuf heures. Merci de ne pas utiliser de crème ou de parfum ce jour-là et d'apporter vos anciens examens.",
      prompt: "Que doit apporter Mme Girard ?",
      options: ["Ses anciens examens", "Une carte de voyage", "Un justificatif de domicile", "Une photo"],
      correct: "A",
      explanation: "La patiente doit apporter ses anciens examens et éviter crème et parfum.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Je cherche un appartement avec deux chambres, près du centre. Je voudrais un balcon et un ascenseur. Mon budget maximum est de neuf cents euros.",
      prompt: "Quel est le budget maximum de la personne ?",
      options: ["Neuf cents euros", "Cent euros", "Mille euros", "Quatre cent cinquante euros"],
      correct: "A",
      explanation: "La personne annonce un budget de neuf cents euros au maximum.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Le centre sportif propose un nouveau cours de gym douce le lundi à dix-huit heures. Il est destiné aux personnes de plus de soixante ans. Le tarif est de vingt euros par mois.",
      prompt: "À qui s'adresse le cours ?",
      options: ["Aux personnes de plus de soixante ans", "Aux enfants", "Aux sportifs de haut niveau", "Aux étudiants"],
      correct: "A",
      explanation: "Le cours de gym douce est destiné aux personnes de plus de soixante ans.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Bonjour, je vous contacte car j'ai vu votre annonce pour un poste de serveur. J'ai deux ans d'expérience dans un restaurant de ma ville. Je suis disponible le soir et le week-end.",
      prompt: "Quand la personne est-elle disponible ?",
      options: ["Le soir et le week-end", "Le matin uniquement", "En semaine", "Seulement l'été"],
      correct: "A",
      explanation: "Elle indique être disponible le soir et le week-end.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Les résultats du concours d'entrée seront affichés vendredi à midi à l'entrée de l'école et publiés sur le site internet. Les candidats admis devront confirmer leur inscription sous une semaine.",
      prompt: "Que doivent faire les candidats admis ?",
      options: ["Confirmer leur inscription sous une semaine", "Repasser le concours", "Payer les frais le jour même", "Attendre un courrier en juin"],
      correct: "A",
      explanation: "Les admis ont une semaine pour confirmer leur inscription.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "On a fait connaissance avec nos nouveaux voisins hier soir. Ils sont très sympathiques, ils viennent d'Espagne. Ils nous ont invités à manger chez eux la semaine prochaine, et ils vont nous apprendre à faire de la paella.",
      prompt: "Que vont apprendre les voisins à la personne ?",
      options: ["À faire de la paella", "À parler espagnol", "À danser", "À jardiner"],
      correct: "A",
      explanation: "Les voisins espagnols lui apprendront à préparer une paella.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La station de ski ouvrira ses pistes samedi, mais seulement le matin car la neige est encore peu abondante. Les canons à neige fonctionnent depuis trois jours pour assurer l'enneigement.",
      prompt: "Pourquoi les pistes n'ouvrent-elles que le matin ?",
      options: ["La neige est encore peu abondante", "Les remontées sont en panne", "Les skieurs sont peu nombreux", "Il y a une tempête"],
      correct: "A",
      explanation: "L'enneigement est insuffisant, d'où une ouverture limitée au matin.",
    },
    {
      level: "B1",
      category: "achats",
      transcription:
        "Vous avez acheté un canapé en ligne ? Il sera livré mercredi entre quatorze et dix-huit heures. Le livreur vous appellera trente minutes avant son passage et le montera dans la pièce de votre choix.",
      prompt: "Que fera le livreur avant de passer ?",
      options: ["Appeler trente minutes avant", "Envoyer un courriel", "Déposer un avis dans la boîte aux lettres", "Passer sans prévenir"],
      correct: "A",
      explanation: "Le livreur téléphone une demi-heure avant son arrivée.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Le pays a enregistré une baisse du chômage pour le troisième trimestre consécutif. Les économistes se montrent toutefois prudents : cette amélioration repose en partie sur une hausse des contrats précaires, dont la durée limitée ne garantit pas une embellie durable.",
      prompt: "Pourquoi les économistes sont-ils prudents ?",
      options: ["Beaucoup de nouveaux contrats sont précaires", "Le chômage a augmenté", "Les salaires ont baissé de moitié", "Les entreprises ont fermé"],
      correct: "A",
      explanation: "L'amélioration s'appuie en partie sur des contrats précaires, peu durables.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Les enseignants du primaire témoignent d'une hétérogénéité croissante dans leurs classes : des élèves de niveaux très différents cohabitent, parfois avec des besoins éducatifs particuliers. Ils réclament davantage de moyens pour adapter leur pédagogie à chacun.",
      prompt: "Que réclament les enseignants du primaire ?",
      options: ["Davantage de moyens pour adapter leur pédagogie", "Moins d'élèves en difficulté", "Un programme unique", "La suppression des devoirs"],
      correct: "A",
      explanation: "Face à des classes hétérogènes, ils demandent plus de moyens pour individualiser l'enseignement.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "L'exposition consacrée à la photographie animalière rencontre un franc succès. Les visiteurs sont surpris par la qualité des clichés, souvent pris après des semaines d'attente, et par les textes qui soulignent la fragilité de certaines espèces menacées.",
      prompt: "Qu'est-ce qui surprend les visiteurs ?",
      options: ["La qualité des clichés pris après de longues attentes", "Le prix des billets", "La taille de la salle", "Le nombre d'animaux vivants"],
      correct: "A",
      explanation: "Les visiteurs sont frappés par la qualité des photos, fruit de longues patiences.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les médecins généralistes alertent sur l'augmentation des consultations liées au stress et à l'anxiété chez les jeunes adultes. Ils recommandent de ne pas attendre l'aggravation des symptômes pour en parler, et rappellent l'existence de lignes d'écoute gratuites.",
      prompt: "Que recommandent les médecins ?",
      options: ["En parler sans attendre l'aggravation", "Attendre que le stress passe", "Éviter les consultations", "Changer d'emploi"],
      correct: "A",
      explanation: "Ils conseillent d'évoquer ces troubles dès leurs débuts et d'utiliser les lignes d'écoute.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Le télétravail a fait exploser l'usage des visioconférences. Si ces outils facilitent les échanges à distance, des chercheurs observent qu'ils sont à l'origine d'une fatigue spécifique, liée à l'obligation de rester concentré face à l'écran et de contrôler son image.",
      prompt: "D'où vient la fatigue liée aux visioconférences ?",
      options: ["De la concentration prolongée et du contrôle de son image", "Du bruit des appareils", "De la durée des trajets", "Du coût des abonnements"],
      correct: "A",
      explanation: "Rester concentré face à l'écran et surveiller son image épuise particulièrement.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "La proportion de célibataires augmente dans les grandes villes, surtout parmi les trentenaires diplômés. Les sociologues y voient moins un rejet du couple qu'une exigence accrue envers la relation et un allongement de la période d'exploration affective et professionnelle.",
      prompt: "Comment les sociologues interprètent-ils cette évolution ?",
      options: ["Comme une exigence accrue envers la relation", "Comme un rejet du couple", "Comme un manque de diplômes", "Comme une crise économique"],
      correct: "A",
      explanation: "Ils y voient une attente plus élevée envers le couple, et non un refus de la vie à deux.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "La montée des mouvements populistes est souvent attribuée à des facteurs économiques. Pourtant, des travaux récents suggèrent que le sentiment de déclassement symbolique, c'est-à-dire la perception de ne plus être reconnu, pèse tout autant que la situation matérielle dans le vote protestataire.",
      prompt: "Quel facteur les travaux récents mettent-ils en avant ?",
      options: ["Le sentiment de déclassement symbolique", "Le niveau de vie moyen", "L'âge des électeurs", "Le nombre de candidats"],
      correct: "A",
      explanation: "Le sentiment de ne plus être reconnu compterait autant que la situation matérielle.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "La protection de la biodiversité se heurte à un paradoxe : les politiques qui visent à créer des réserves naturelles peuvent exclure des populations locales qui, depuis des générations, gèrent ces territoires de façon durable. De plus en plus de spécialistes plaident donc pour associer ces communautés aux décisions.",
      prompt: "Quel paradoxe est évoqué ?",
      options: ["Les réserves peuvent exclure ceux qui gèrent durablement ces espaces", "Les réserves détruisent les espèces", "Les populations refusent toute protection", "Les spécialistes ignorent la nature"],
      correct: "A",
      explanation: "Créer des réserves peut écarter des populations qui géraient déjà bien ces territoires.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "La reproductibilité des résultats est au cœur de la démarche scientifique, mais de nombreuses études, notamment en psychologie, n'ont pas pu être répliquées. Cette crise de la réplication a conduit à des réformes : pré-enregistrement des hypothèses, partage des données, encouragement de la publication de résultats négatifs.",
      prompt: "Quelle réforme a été adoptée face à cette crise ?",
      options: ["Le pré-enregistrement des hypothèses et le partage des données", "L'arrêt des études en psychologie", "La suppression des revues", "La réduction du nombre de chercheurs"],
      correct: "A",
      explanation: "Les réformes incluent le pré-enregistrement des hypothèses, le partage des données et la publication des résultats négatifs.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "L'essor des plateformes de livraison a transformé le travail urbain. Leurs défenseurs soulignent la flexibilité offerte aux coursiers, tandis que leurs détracteurs dénoncent l'absence de protection sociale et la dépendance économique vis-à-vis d'algorithmes qui fixent les tarifs et les temps de livraison.",
      prompt: "Que dénoncent les détracteurs des plateformes de livraison ?",
      options: ["L'absence de protection sociale et la dépendance aux algorithmes", "Le prix trop bas des repas", "La lenteur des livraisons", "Le nombre de restaurants"],
      correct: "A",
      explanation: "Ils critiquent le manque de protection des coursiers et le pouvoir des algorithmes sur leurs conditions.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "La sagesse populaire célèbre la patience comme une vertu, mais l'on oublie qu'elle suppose une confiance dans l'avenir, c'est-à-dire la conviction que l'attente a un sens. Là où cette confiance s'effondre, la patience devient résignation, et la vertu se mue en un renoncement que rien ne justifie.",
      prompt: "Quand la patience se transforme-t-elle en résignation ?",
      options: ["Quand la confiance dans l'avenir disparaît", "Quand l'attente est courte", "Quand on agit vite", "Quand on est entouré"],
      correct: "A",
      explanation: "La patience repose sur la confiance en un avenir qui a du sens ; sans elle, elle devient résignation.",
    },
    {
      level: "C2",
      category: "économie",
      transcription:
        "Le discours sur la compétitivité présente les nations comme des entreprises rivales, mais cette analogie trompe : un pays n'est pas contraint de disparaître faute de rentabilité, et ses échanges avec d'autres ne se jouent pas dans un jeu à somme nulle. Confondre ces plans, c'est risquer d'orienter les politiques publiques par des métaphores plutôt que par des analyses.",
      prompt: "Que reproche l'orateur à l'analogie entre nations et entreprises ?",
      options: ["Elle oriente les politiques par des métaphores plutôt que des analyses", "Elle est trop technique", "Elle est ancienne", "Elle ignore les entreprises"],
      correct: "A",
      explanation: "L'orateur dénonce une comparaison qui obscurcit l'analyse et pèse sur les décisions publiques.",
    },
    {
      level: "C2",
      category: "art",
      transcription:
        "On célèbre souvent l'originalité de l'artiste comme une rupture avec toute tradition. Or l'invention véritable naît rarement du vide : elle procède d'un dialogue avec des œuvres antérieures, qu'elle poursuit, déplace ou conteste. La singularité d'un créateur se mesure donc moins à son isolement qu'à la manière dont il reprend un héritage pour le transformer.",
      prompt: "Comment se mesure la singularité d'un créateur selon l'orateur ?",
      options: ["À sa manière de transformer un héritage", "À son isolement total", "À sa popularité", "À son refus de toute tradition"],
      correct: "A",
      explanation: "L'orateur voit l'originalité dans la reprise transformée d'un héritage, non dans la rupture absolue.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "négation",
      prompt: "Je ne veux ___ de sucre dans mon café.",
      options: ["pas", "plus", "jamais", "rien"],
      correct: "A",
      explanation: "La négation d'une quantité avec « de » se construit avec « ne… pas de ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Nous ___ nos vacances à la montagne chaque hiver.",
      options: ["passons", "passez", "passent", "passe"],
      correct: "A",
      explanation: "Le sujet « nous » impose la forme « passons ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Ces fleurs sont magnifiques ! Qui ___ a offertes ?",
      options: ["te les", "les te", "leur les", "t'en"],
      correct: "A",
      explanation: "Le pronom COI « te » précède le COD « les » : « Qui te les a offertes ? ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "L'homme ___ nous avons rencontré hier est écrivain.",
      options: ["que", "qui", "dont", "où"],
      correct: "A",
      explanation: "« Que » est complément d'objet direct de « avons rencontré ».",
    },
    {
      level: "B1",
      category: "temps du passé",
      prompt: "Quand elle ___ jeune, elle rêvait de devenir actrice.",
      options: ["était", "a été", "sera", "serait"],
      correct: "A",
      explanation: "L'état passé durable se met à l'imparfait : « quand elle était jeune ».",
    },
    {
      level: "B1",
      category: "comparaison",
      prompt: "Ce restaurant est ___ cher que celui d'en face.",
      options: ["moins", "plus bien", "meilleur", "très"],
      correct: "A",
      explanation: "La comparaison d'infériorité s'exprime avec « moins… que ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Elle s'intéresse beaucoup ___ la photographie.",
      options: ["à", "de", "en", "pour"],
      correct: "A",
      explanation: "« S'intéresser à quelque chose » se construit avec la préposition « à ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Elle exige que tout le monde ___ à l'heure demain.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation: "Après un verbe de volonté comme « exiger que », on emploie le subjonctif : « soit ».",
    },
    {
      level: "B2",
      category: "expression de la cause",
      prompt: "___ il pleuvait, nous avons annulé le pique-nique.",
      options: ["Comme", "Bien que", "Pour que", "Pourvu qu'"],
      correct: "A",
      explanation: "« Comme » en tête de phrase introduit la cause : il pleuvait, donc nous avons annulé.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Le contrat ___ par les deux parties avant la fin du mois.",
      options: ["sera signé", "signera", "signait", "a signé"],
      correct: "A",
      explanation: "Le contrat subit l'action : passif au futur, « sera signé ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Il ___ le message avant que tu ne l'appelles.",
      options: ["aura lu", "lisait", "a lu", "lira"],
      correct: "A",
      explanation: "Pour exprimer l'antériorité par rapport à un événement futur, on emploie le futur antérieur.",
    },
    {
      level: "B2",
      category: "gérondif",
      prompt: "Il a trouvé un emploi ___ son CV sur un site spécialisé.",
      options: ["en déposant", "déposant", "à déposer", "déposé"],
      correct: "A",
      explanation: "Le gérondif « en déposant » exprime le moyen par lequel il a trouvé un emploi.",
    },
    {
      level: "B2",
      category: "pronoms possessifs",
      prompt: "Mon appartement est plus petit que ___ de mes parents.",
      options: ["celui", "le leur", "ceux", "celle"],
      correct: "A",
      explanation: "« Celui de mes parents » reprend « appartement », masculin singulier.",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Elle a dit qu'elle ___ de l'aide pour déménager.",
      options: ["avait besoin", "aura besoin", "a besoin", "avoir besoin"],
      correct: "A",
      explanation: "Après un verbe introducteur au passé, le présent devient imparfait : « avait besoin ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Il est regrettable que personne ne ___ prévenu les habitants.",
      options: ["ait", "a", "avait", "aura"],
      correct: "A",
      explanation: "« Il est regrettable que » exige le subjonctif : « que personne n'ait prévenu ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Les amis chez ___ nous avons dormi nous ont très bien accueillis.",
      options: ["qui", "lesquels", "dont", "où"],
      correct: "A",
      explanation: "« Chez » est suivi de « qui » lorsque l'antécédent désigne des personnes.",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "C'est de ce professeur ___ je tiens ma passion pour l'histoire.",
      options: ["que", "dont", "qui", "où"],
      correct: "A",
      explanation: "Dans la structure « c'est… que », le complément mis en valeur est suivi de « que ».",
    },
    {
      level: "C1",
      category: "concession",
      prompt: "Quelque difficiles ___ soient les circonstances, nous devons avancer.",
      options: ["que", "qu'elles", "qui", "dont"],
      correct: "A",
      explanation: "La structure « quelque… que » + subjonctif exprime la concession : « quelque difficiles que soient… ».",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Je ne connais personne qui ___ résister à une telle offre.",
      options: ["puisse", "peut", "pourra", "pourrait"],
      correct: "A",
      explanation: "Après une principale négative, la relative qui exprime une possibilité appelle le subjonctif : « puisse ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Soit qu'il ___ peur, soit qu'il manque de temps, il a renoncé à partir.",
      options: ["ait", "a", "aura", "avait"],
      correct: "A",
      explanation: "« Soit que… soit que » exprime une alternative de causes et se construit avec le subjonctif.",
    },
  ],
  reading: [
    {
      title: "Résultat de votre candidature",
      text: p(
        "Madame, nous avons bien reçu votre candidature pour le poste de secrétaire. Nous vous proposons de venir passer un entretien le jeudi 8 mai à 10 h.",
        "Merci de confirmer votre venue par retour de courriel avant mardi, et d'apporter une copie de vos diplômes.",
      ),
      question: {
        level: "B1",
        prompt: "Que faut-il apporter à l'entretien ?",
        options: ["Une copie de ses diplômes", "Une lettre de recommandation", "Une carte d'identité", "Un CV supplémentaire"],
        correct: "A",
        explanation: "L'employeur demande d'apporter une copie des diplômes à l'entretien.",
      },
    },
    {
      title: "Cours de dessin pour enfants",
      text: p(
        "Chaque mercredi après-midi, l'atelier municipal propose un cours de dessin pour les enfants de 7 à 12 ans, de 15 h à 16 h 30.",
        "Le matériel est fourni. Une exposition des travaux aura lieu à la fin de l'année dans le hall de la mairie.",
      ),
      question: {
        level: "B1",
        prompt: "Où seront exposés les dessins des enfants ?",
        options: ["Dans le hall de la mairie", "À l'école", "À la bibliothèque", "À l'atelier municipal"],
        correct: "A",
        explanation: "L'exposition de fin d'année se tiendra dans le hall de la mairie.",
      },
    },
    {
      title: "Message d'une voisine",
      text: p(
        "Bonjour, je pars en vacances du 5 au 20 août. Pourriez-vous récupérer mon courrier et arroser mes plantes de temps en temps ?",
        "Je vous laisse un double de mes clés et je vous rapporterai un petit souvenir. Merci beaucoup d'avance.",
      ),
      question: {
        level: "B1",
        prompt: "Que laisse la voisine à son interlocuteur ?",
        options: ["Un double de ses clés", "Une liste de courses", "Un chèque", "Son chat"],
        correct: "A",
        explanation: "La voisine laisse un double de ses clés pour qu'on récupère son courrier et arrose ses plantes.",
      },
    },
    {
      title: "Réunion d'information",
      text: p(
        "La mairie invite les habitants à une réunion d'information sur les futurs travaux de la rue Victor-Hugo, mardi à 18 h 30 à la salle des fêtes.",
        "Les ingénieurs présenteront le calendrier et répondront à vos questions. L'entrée est libre.",
      ),
      question: {
        level: "B1",
        prompt: "Qui présentera le calendrier des travaux ?",
        options: ["Les ingénieurs", "Le maire", "Les commerçants", "Les habitants"],
        correct: "A",
        explanation: "Les ingénieurs exposeront le calendrier et répondront aux questions.",
      },
    },
    {
      title: "Vente de vélos d'occasion",
      text: p(
        "L'association Roue Libre organise une vente de vélos d'occasion remis en état, dimanche de 10 h à 17 h sur la place du marché.",
        "Les prix vont de 40 à 150 euros. Une garantie de trois mois est offerte pour chaque vélo.",
      ),
      question: {
        level: "B1",
        prompt: "Quelle garantie est offerte ?",
        options: ["Trois mois", "Un an", "Un mois", "Aucune garantie"],
        correct: "A",
        explanation: "Chaque vélo vendu est garanti trois mois.",
      },
    },
    {
      title: "Une cantine zéro déchet",
      text: p(
        "Depuis la rentrée, la cantine du lycée expérimente un menu sans déchets : les élèves se servent eux-mêmes, finissent leur assiette et trient les restes. Les quantités de nourriture jetées ont diminué de moitié.",
        "Les cuisiniers se félicitent de ce changement, mais soulignent que le temps de service s'est allongé, ce qui complique l'organisation des pauses.",
      ),
      question: {
        level: "B2",
        prompt: "Quel inconvénient les cuisiniers soulignent-ils ?",
        options: ["Le temps de service plus long", "Un coût plus élevé", "Un manque de nourriture", "La fatigue des élèves"],
        correct: "A",
        explanation: "Le nouveau système rallonge le service et perturbe les pauses.",
      },
    },
    {
      title: "Des bibliothèques à l'hôpital",
      text: p(
        "Plusieurs hôpitaux ont installé de petites bibliothèques à l'attention des patients et des familles. Les livres, offerts par des particuliers, sont à disposition dans les halls et les salles d'attente.",
        "Le personnel soignant constate que la lecture aide à se détendre, mais s'inquiète de l'hygiène des ouvrages, qui passent de main en main.",
      ),
      question: {
        level: "B2",
        prompt: "De quoi le personnel soignant s'inquiète-t-il ?",
        options: ["De l'hygiène des livres", "Du bruit des patients", "Du manque de place", "Du prix des livres"],
        correct: "A",
        explanation: "Les ouvrages circulant d'un patient à l'autre, l'hygiène devient une préoccupation.",
      },
    },
    {
      title: "Le retour des saisons dans l'assiette",
      text: p(
        "De plus en plus de restaurants proposent des cartes qui changent avec les saisons. Les chefs travaillent directement avec des producteurs locaux et adaptent leurs plats aux récoltes.",
        "Les clients apprécient la fraîcheur des produits, même si certains regrettent de ne plus retrouver leurs plats favoris tout au long de l'année.",
      ),
      question: {
        level: "B2",
        prompt: "Que regrettent certains clients ?",
        options: ["Ne plus retrouver leurs plats favoris toute l'année", "Le prix des produits locaux", "La taille des assiettes", "Le manque de producteurs"],
        correct: "A",
        explanation: "La carte saisonnière retire parfois des plats que les clients aimaient.",
      },
    },
    {
      title: "Les femmes dans les métiers du bâtiment",
      text: p(
        "Les femmes restent très minoritaires dans les métiers du bâtiment, malgré des besoins importants en main-d'œuvre. Beaucoup de jeunes filles ignorent ces carrières, ou redoutent un milieu qu'elles imaginent peu accueillant.",
        "Des entreprises organisent des stages de découverte et valorisent les parcours de femmes réussissant dans ces métiers, afin de modifier les représentations.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les entreprises organisent-elles des stages de découverte ?",
        options: ["Pour changer les représentations de ces métiers", "Pour réduire les effectifs", "Pour fermer des chantiers", "Pour vendre du matériel"],
        correct: "A",
        explanation: "Ces stages et témoignages visent à modifier l'image du secteur auprès des jeunes filles.",
      },
    },
    {
      title: "La reconversion d'un village",
      text: p(
        "Ce village de montagne, en perte d'habitants depuis des décennies, a misé sur le télétravail pour renaître. Un espace de coworking, une connexion à très haut débit et des logements à prix modéré attirent de jeunes familles.",
        "Les anciens apprécient le retour des enfants à l'école, mais s'inquiètent de voir augmenter les prix de l'immobilier et de perdre l'esprit du village.",
      ),
      question: {
        level: "B2",
        prompt: "Que craignent les anciens du village ?",
        options: ["La hausse des prix et la perte de l'esprit du village", "Un nouveau départ des familles", "Une fermeture de l'école", "Le manque d'internet"],
        correct: "A",
        explanation: "Ils redoutent que la renaissance du village fasse monter l'immobilier et change son identité.",
      },
    },
    {
      title: "La retraite des sportifs de haut niveau",
      text: p(
        "La carrière d'un sportif professionnel s'achève souvent avant quarante ans. Beaucoup peinent à se reconvertir, faute de diplômes ou de réseau en dehors de leur discipline, et se retrouvent confrontés à un vide autant financier que psychologique.",
        "Des fédérations proposent désormais un accompagnement pendant la carrière, pour que la préparation de l'après-sport ne soit plus reléguée au second plan.",
      ),
      question: {
        level: "B2",
        prompt: "Que proposent désormais certaines fédérations ?",
        options: ["Un accompagnement pendant la carrière pour préparer l'après-sport", "Une retraite précoce", "Des salaires plus élevés", "La fin des compétitions"],
        correct: "A",
        explanation: "Elles aident les sportifs à préparer leur reconversion dès qu'ils sont en activité.",
      },
    },
    {
      title: "Les marchés couverts",
      text: p(
        "Les marchés couverts retrouvent leur public dans plusieurs villes. On y vient pour la qualité des produits, mais aussi pour l'ambiance, le dialogue avec les commerçants et la possibilité de goûter avant d'acheter.",
        "Pourtant, leur fréquentation reste fragile : les horaires, souvent limités à la matinée, conviennent mal aux actifs, que séduisent davantage les drives et les supermarchés.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi la fréquentation des marchés couverts reste-t-elle fragile ?",
        options: ["Leurs horaires conviennent mal aux actifs", "Leurs produits sont de mauvaise qualité", "Ils sont trop nombreux", "Ils sont fermés l'hiver"],
        correct: "A",
        explanation: "Les horaires matinaux ne conviennent pas à ceux qui travaillent, qui préfèrent drives et supermarchés.",
      },
    },
    {
      title: "Des quartiers sans voitures le dimanche",
      text: p(
        "Plusieurs communes testent la fermeture de certaines rues à la circulation le dimanche, pour laisser la place aux promeneurs, aux cyclistes et aux jeux d'enfants. L'initiative remporte un vif succès auprès des familles.",
        "Les commerçants, partagés, remarquent que leur chiffre d'affaires ne baisse pas, tandis que certains habitants regrettent d'être gênés pour accéder à leur domicile.",
      ),
      question: {
        level: "B2",
        prompt: "Que remarquent les commerçants ?",
        options: ["Leur chiffre d'affaires ne baisse pas", "Leur chiffre d'affaires double", "Ils doivent fermer", "Les clients sont mécontents"],
        correct: "A",
        explanation: "Malgré leurs craintes, les ventes se maintiennent le dimanche.",
      },
    },
    {
      title: "La médiation familiale",
      text: p(
        "Quand un couple se sépare, la médiation familiale propose d'organiser les modalités de la séparation avec l'aide d'un professionnel neutre. Garde des enfants, résidence, pension : les parents cherchent ensemble des solutions, sans passer par un juge.",
        "Les médiateurs soulignent que cette démarche réduit les conflits et protège les enfants, mais qu'elle suppose que les deux parents acceptent de venir et d'écouter l'autre.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle condition la médiation suppose-t-elle ?",
        options: ["Que les deux parents acceptent de venir et d'écouter", "Que le juge soit présent", "Que les enfants choisissent", "Que la séparation soit déjà jugée"],
        correct: "A",
        explanation: "La médiation ne fonctionne que si les deux parents participent et s'écoutent.",
      },
    },
    {
      title: "Des classes passerelles pour les élèves allophones",
      text: p(
        "Dans plusieurs collèges, des classes spéciales accueillent des élèves récemment arrivés en France qui ne maîtrisent pas encore le français. Ils y suivent un enseignement intensif de la langue, tout en rejoignant progressivement les cours ordinaires.",
        "Les enseignants constatent des progrès rapides, mais regrettent que le nombre de places reste insuffisant face à l'afflux de nouveaux arrivants.",
      ),
      question: {
        level: "B2",
        prompt: "Quel regret les enseignants des classes passerelles expriment-ils ?",
        options: ["Le nombre de places insuffisant", "Le rythme trop lent des progrès", "Le refus des élèves de participer", "Le manque de cours ordinaires"],
        correct: "A",
        explanation: "Malgré des progrès rapides, les classes ne peuvent pas accueillir tous les élèves qui en auraient besoin.",
      },
    },
    {
      title: "La désinformation en ligne",
      text: p(
        "La diffusion de fausses informations sur les réseaux sociaux inquiète les autorités, qui y voient une menace pour le débat public. Des rumeurs, parfois fabriquées, se propagent plus vite que leurs démentis, et façonnent les opinions avant que les faits ne soient vérifiés.",
        "Face à ce phénomène, des initiatives de vérification des faits se multiplient, mais leur portée reste limitée : ceux qui adhèrent à une rumeur lisent rarement les corrections. Ce constat conduit à repenser la lutte contre la désinformation, qui ne peut reposer sur la seule rectification a posteriori, mais suppose aussi d'agir sur les mécanismes de diffusion et de former les citoyens à évaluer la fiabilité de ce qu'ils lisent.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi la rectification a posteriori est-elle insuffisante ?",
        options: ["Ceux qui croient une rumeur lisent rarement les corrections", "Les démentis sont interdits", "Les rumeurs sont rares", "Les réseaux sont fermés"],
        correct: "A",
        explanation: "Les personnes convaincues par une rumeur consultent peu les démentis, d'où la portée limitée des vérifications.",
      },
    },
    {
      title: "La justice et le numérique",
      text: p(
        "La dématérialisation touche aussi la justice : dépôt de plainte en ligne, audiences en visioconférence, suivi électronique des dossiers. Ces évolutions promettent de désengorger les tribunaux et de faciliter l'accès au droit, notamment pour ceux qui vivent loin des juridictions.",
        "Mais elles suscitent des inquiétudes. Les personnes peu à l'aise avec l'informatique risquent d'être exclues d'une procédure qu'elles ne parviennent pas à suivre, et la distance imposée par l'écran peut altérer la qualité des échanges avec le juge. Les avocats rappellent que la justice ne se limite pas à un traitement de dossiers : elle repose sur une rencontre, où se jouent l'écoute, la compréhension et la reconnaissance de celui qui comparaît.",
      ),
      question: {
        level: "C1",
        prompt: "Qu'est-ce qui, selon les avocats, ne doit pas se perdre ?",
        options: ["La rencontre où se jouent l'écoute et la reconnaissance", "La rapidité des audiences", "Le nombre de dossiers traités", "La numérisation des pièces"],
        correct: "A",
        explanation: "Ils insistent sur la dimension de rencontre humaine propre à la justice, que l'écran peut affaiblir.",
      },
    },
    {
      title: "L'avenir des centres commerciaux",
      text: p(
        "Les grands centres commerciaux, longtemps symboles de la consommation de masse, voient leur fréquentation baisser sous l'effet du commerce en ligne et d'un changement de comportements. Certains ferment, laissant des friches de béton en périphérie des villes.",
        "Pour ne pas condamner ces espaces, des collectivités et des promoteurs imaginent de nouveaux usages : logements, bureaux, espaces culturels, jardins. Ces transformations supposent toutefois d'inventer une mixité que ces lieux, conçus pour la voiture et l'achat, n'avaient jamais prévue. Elles posent aussi la question de ce que devient la périphérie lorsqu'elle cesse de se définir par la consommation, et peut-être, enfin, de ce qu'on veut en faire.",
      ),
      question: {
        level: "C1",
        prompt: "Quel défi pose la transformation des centres commerciaux ?",
        options: ["Inventer une mixité d'usages que ces lieux n'avaient pas prévue", "Les fermer définitivement", "Les remplir de voitures", "Les vendre à l'étranger"],
        correct: "A",
        explanation: "Ces espaces, pensés pour l'achat et la voiture, doivent accueillir des usages variés pour lesquels ils n'étaient pas conçus.",
      },
    },
    {
      title: "Les aides à la mobilité des étudiants",
      text: p(
        "La mobilité internationale est présentée comme un atout majeur dans un cursus universitaire. Pourtant, l'accès aux bourses de mobilité reste inégal : les étudiants issus de milieux modestes hésitent à partir, par crainte des coûts supplémentaires et de la perte d'un emploi étudiant indispensable.",
        "Pour corriger ces écarts, certaines universités majorent les aides en fonction des revenus et proposent des destinations moins coûteuses. Ces mesures améliorent la situation, mais elles ne suffisent pas à lever tous les freins, notamment symboliques, car partir suppose aussi de se sentir légitime à saisir ces opportunités, sentiment inégalement partagé selon les milieux d'origine.",
      ),
      question: {
        level: "C1",
        prompt: "Quel frein symbolique le texte mentionne-t-il ?",
        options: ["Le sentiment de ne pas être légitime pour saisir ces opportunités", "Le manque de destinations", "Le refus des universités", "L'absence de langues étrangères"],
        correct: "A",
        explanation: "Partir suppose de se sentir autorisé à le faire, sentiment moins répandu chez les étudiants de milieux modestes.",
      },
    },
    {
      title: "La lenteur comme alternative",
      text: p(
        "Dans un monde qui valorise la vitesse, des mouvements prônent la lenteur : cuisine lente, villes lentes, lecture lente. Ils ne refusent pas la modernité, mais contestent l'idée que gagner du temps soit toujours un progrès, rappelant que certaines expériences exigent précisément de ne pas se presser.",
        "Ce plaidoyer est séduisant, mais il se heurte à une objection : prendre son temps est un luxe que tous ne peuvent pas se permettre. Pour ceux qui cumulent plusieurs emplois ou de longs trajets, la lenteur relève de l'utopie. Ses partisans répondent que l'enjeu est politique, et qu'il s'agit de repenser l'organisation collective du temps de travail, de manière à ce que le droit à la lenteur ne soit pas réservé à quelques privilégiés.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle objection est faite à l'éloge de la lenteur ?",
        options: ["Tout le monde ne peut pas se permettre de prendre son temps", "La lenteur est interdite", "La modernité l'a supprimée", "Elle coûte moins cher"],
        correct: "A",
        explanation: "Prendre son temps est un luxe inaccessible à ceux qui jonglent entre emplois et trajets.",
      },
    },
    {
      title: "L'éducation à la pensée critique",
      text: p(
        "Apprendre à penser par soi-même est un objectif constamment réaffirmé par les systèmes éducatifs, mais ce qu'il recouvre reste souvent flou. S'agit-il de douter de tout, de contester les autorités, ou plutôt d'apprendre à évaluer des arguments, à reconnaître des biais, à distinguer ce qui relève des faits de ce qui relève des opinions ?",
        "La pensée critique ne se réduit pas à un scepticisme généralisé, qui n'est qu'une autre manière de renoncer à comprendre. Elle suppose au contraire un respect de la connaissance établie, assorti de la capacité de la questionner lorsque de bonnes raisons existent. Former à cette exigence demande du temps et des occasions de pratique : débattre, argumenter, se tromper, se corriger. Autant d'expériences que ne remplace aucun cours magistral, aussi brillant soit-il.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur définit-il la pensée critique ?",
        options: ["Respecter le savoir établi tout en pouvant le questionner avec de bonnes raisons", "Douter systématiquement de tout", "Contester toutes les autorités", "Refuser le débat"],
        correct: "A",
        explanation: "La pensée critique associe respect de la connaissance et capacité de la remettre en question à bon escient.",
      },
    },
    {
      title: "Le sens du travail bien fait",
      text: p(
        "Les artisans parlent volontiers du plaisir du travail bien fait, c'est-à-dire d'une exigence qui n'est dictée ni par le client ni par le patron, mais par la chose elle-même. Cette fierté, difficile à mesurer, constitue pourtant l'une des sources les plus profondes de satisfaction professionnelle, et son effacement est souvent à l'origine d'un malaise que les indicateurs de performance ne saisissent pas.",
        "Or l'organisation contemporaine du travail, soumise à la quantification et à la rapidité, laisse peu de place à cette exigence interne. On demande de produire vite et de façon conforme, au détriment d'un soin que nul tableau de bord ne valorise. Reconnaître la valeur du travail bien fait, ce serait admettre que certaines qualités, la minutie, la patience, l'attention à l'autre, échappent à l'évaluation chiffrée sans pour autant être négligeables.",
      ),
      question: {
        level: "C2",
        prompt: "Que montrerait la reconnaissance du travail bien fait ?",
        options: ["Que certaines qualités échappent à l'évaluation chiffrée sans être négligeables", "Que seule la rapidité compte", "Que les artisans sont mal formés", "Que les tableaux de bord sont inutiles"],
        correct: "A",
        explanation: "Minutie, patience et attention aux autres ne se mesurent pas mais ont une réelle valeur.",
      },
    },
    {
      title: "La fabrique du consensus",
      text: p(
        "Dans les démocraties contemporaines, la recherche du consensus est souvent présentée comme une vertu, signe d'une société apaisée. Pourtant, un consensus trop rapidement obtenu peut dissimuler des désaccords que l'on a préféré ne pas voir, ou des voix que l'on n'a pas écoutées. Le calme apparent n'est pas toujours le signe d'une justice réalisée.",
        "À l'inverse, le conflit, lorsqu'il est bien conduit, joue un rôle fécond : il révèle des tensions, oblige à expliciter des intérêts et peut aboutir à des compromis plus solides parce qu'ils ont été disputés. Il ne s'agit pas de célébrer le désordre, mais de reconnaître que la démocratie vit de la capacité à tenir ensemble des positions irréductibles sans prétendre les fondre dans une unanimité de façade, qui ne ferait que repousser les désaccords à plus tard et les rendre plus violents lorsqu'ils éclateraient enfin.",
      ),
      question: {
        level: "C2",
        prompt: "Quel rôle l'auteur attribue-t-il au conflit bien conduit ?",
        options: ["Il révèle des tensions et mène à des compromis plus solides", "Il détruit la démocratie", "Il produit une unanimité", "Il évite tout débat"],
        correct: "A",
        explanation: "Un conflit bien mené fait apparaître les désaccords et débouche sur des compromis disputés donc plus durables.",
      },
    },
    {
      title: "La mémoire des sons",
      text: p(
        "Les paysages sonores d'une ville, cloches, marchés, machines, voix d'artisans, constituent une part de son identité que l'on évoque rarement. Ils disparaissent sans bruit, remplacés par d'autres sons que l'on ne remarque guère, ce qui rend leur conservation d'autant plus difficile que personne n'en a fait un objet de patrimoine.",
        "Des chercheurs et des artistes entreprennent pourtant de collecter ces sons, de les archiver et d'en faire des œuvres. Leur démarche pose une question plus large : qu'est-ce qui mérite d'être gardé ? Ce que l'on a l'habitude de protéger, monuments, objets, textes, tient à une hiérarchie des sens qui privilégie la vue. Reconnaître le son comme mémoire, c'est élargir notre manière de nous rapporter au passé, et accepter que ce qui s'entend, aussi fugitif soit-il, puisse dire autant de nous que ce qui se voit ou s'écrit.",
      ),
      question: {
        level: "C2",
        prompt: "Qu'implique la reconnaissance du son comme mémoire selon l'auteur ?",
        options: ["Élargir notre manière de nous rapporter au passé", "Supprimer les monuments", "Réduire le bruit", "Abandonner l'archivage"],
        correct: "A",
        explanation: "En reconnaissant la mémoire sonore, on dépasse une hiérarchie des sens qui privilégie la vue.",
      },
    },
    {
      title: "L'argent et la dignité",
      text: p(
        "Parler d'argent reste, dans de nombreuses cultures, un sujet délicat, voire tabou. Cette réserve tient en partie à l'idée que la valeur d'une personne ne saurait se mesurer en euros. Pourtant, l'argent conditionne bien des possibilités d'action, et son manque, outre les difficultés matérielles qu'il engendre, produit un sentiment d'indignité que les statistiques ne rendent pas.",
        "Dès lors, vouloir lutter contre la pauvreté suppose de ne pas se limiter à des transferts financiers, aussi nécessaires soient-ils. Il faut aussi s'attaquer à ce qui rend la pauvreté humiliante : le regard de défiance, la complexité des démarches, la nécessité de se justifier sans cesse. Une politique digne de ce nom tient ensemble la question des ressources et celle de la reconnaissance, sans quoi elle soulage sans réparer.",
      ),
      question: {
        level: "C2",
        prompt: "Que doit réunir une politique de lutte contre la pauvreté selon l'auteur ?",
        options: ["La question des ressources et celle de la reconnaissance", "Uniquement des transferts financiers", "Seulement des contrôles", "Une réduction des démarches administratives sans aide"],
        correct: "A",
        explanation: "Il faut à la fois des ressources et la lutte contre l'humiliation, sinon la politique soulage sans réparer.",
      },
    },
  ],
});
