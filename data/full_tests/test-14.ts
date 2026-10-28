import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 14.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_14 = defineFullTest({
  number: 14,
  description:
    "Quatorzième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Allô, bonjour Sophie. C'est Thomas. Je suis en retard, j'arrive dans quinze minutes. Commence le repas sans moi, s'il te plaît.",
      prompt: "Dans combien de temps Thomas arrive-t-il ?",
      options: ["Dans quinze minutes", "Dans cinq minutes", "Dans une heure", "Dans trente minutes"],
      correct: "A",
      explanation: "Thomas annonce qu'il arrive dans quinze minutes et demande de commencer le repas sans lui.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Au rayon fruits, les pommes sont à deux euros le kilo et les bananes à un euro cinquante. Les oranges sont en promotion aujourd'hui.",
      prompt: "Combien coûtent les pommes ?",
      options: ["Deux euros le kilo", "Un euro cinquante le kilo", "Vingt euros le kilo", "Cinq euros le kilo"],
      correct: "A",
      explanation: "Les pommes coûtent deux euros le kilo ; un euro cinquante est le prix des bananes.",
    },
    {
      level: "A1",
      category: "loisirs",
      transcription:
        "Le samedi, j'aime faire du vélo avec mon frère. Le dimanche, nous allons au cinéma. Nous regardons souvent des films comiques.",
      prompt: "Que fait la personne le samedi ?",
      options: ["Du vélo", "Du cinéma", "De la natation", "Du football"],
      correct: "A",
      explanation: "La personne fait du vélo avec son frère le samedi ; le cinéma, c'est le dimanche.",
    },
    {
      level: "A2",
      category: "voyages",
      transcription:
        "Bonjour, l'hôtel Beau Rivage vous informe que votre chambre est disponible dès quatorze heures. Le petit déjeuner est servi de sept heures à dix heures, au rez-de-chaussée.",
      prompt: "Où est servi le petit déjeuner ?",
      options: ["Au rez-de-chaussée", "Au premier étage", "Dans la chambre", "Sur la terrasse"],
      correct: "A",
      explanation: "Le petit déjeuner est servi au rez-de-chaussée, de sept à dix heures.",
    },
    {
      level: "A2",
      category: "travail",
      transcription:
        "Madame Lefèvre, votre entretien d'embauche est fixé à mardi, neuf heures trente. Présentez-vous à l'accueil avec votre CV et une pièce d'identité.",
      prompt: "Que doit apporter Mme Lefèvre à l'entretien ?",
      options: ["Son CV et une pièce d'identité", "Une lettre de recommandation", "Des diplômes originaux", "Un justificatif de domicile"],
      correct: "A",
      explanation: "L'employeur demande le CV et une pièce d'identité à l'accueil.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Le médecin vous prescrit un médicament à prendre le matin et le soir, pendant cinq jours. Évitez de conduire si vous vous sentez fatigué.",
      prompt: "Combien de temps dure le traitement ?",
      options: ["Cinq jours", "Une semaine", "Deux jours", "Un mois"],
      correct: "A",
      explanation: "Le médicament doit être pris matin et soir pendant cinq jours.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Je cherche un petit appartement près de la gare. Mon budget est de cinq cents euros par mois. Je préfère un appartement meublé, avec une connexion internet.",
      prompt: "Quel logement la personne préfère-t-elle ?",
      options: ["Un appartement meublé", "Une maison avec jardin", "Une chambre chez l'habitant", "Un studio sans meubles"],
      correct: "A",
      explanation: "Elle recherche un appartement meublé, avec internet, près de la gare.",
    },
    {
      level: "B1",
      category: "transports",
      transcription:
        "La ligne de métro numéro trois sera interrompue ce week-end entre République et Nation pour des travaux. Des bus de remplacement circuleront toutes les dix minutes, aux mêmes horaires que le métro.",
      prompt: "Comment les voyageurs pourront-ils se déplacer ce week-end ?",
      options: ["Avec des bus de remplacement", "À pied uniquement", "Par un autre métro gratuit", "En taxi remboursé"],
      correct: "A",
      explanation: "Des bus de remplacement circuleront toutes les dix minutes entre les deux stations.",
    },
    {
      level: "B1",
      category: "éducation",
      transcription:
        "Cette année, l'école de langues propose des cours du soir, de dix-huit à vingt heures, ainsi que des cours intensifs le samedi matin. Les inscriptions sont ouvertes jusqu'à la fin du mois.",
      prompt: "Quand ont lieu les cours intensifs ?",
      options: ["Le samedi matin", "Le soir, en semaine", "Le dimanche", "Pendant les vacances"],
      correct: "A",
      explanation: "L'école propose des cours intensifs le samedi matin, en plus des cours du soir.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "J'ai rencontré notre ancien voisin ce matin, il m'a dit qu'il déménageait à Bordeaux pour son travail. Il organise un dîner d'adieu samedi prochain et nous a invités. Je lui ai dit que nous viendrions avec un gâteau.",
      prompt: "Qu'a promis d'apporter la personne ?",
      options: ["Un gâteau", "Des fleurs", "Une bouteille de vin", "Un cadeau d'adieu"],
      correct: "A",
      explanation: "Elle a dit qu'ils viendraient avec un gâteau au dîner d'adieu du voisin.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "Pour économiser l'eau, la commune demande de ne plus arroser les pelouses entre dix heures et dix-huit heures. Les contrevenants s'exposent à une amende de soixante euros.",
      prompt: "Que risquent ceux qui arrosent à ces heures-là ?",
      options: ["Une amende de soixante euros", "Une coupure d'eau", "Un avertissement oral", "Une taxe annuelle"],
      correct: "A",
      explanation: "Les personnes qui arrosent pendant la plage interdite risquent une amende de soixante euros.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Je vous contacte au sujet de votre candidature. Votre profil nous intéresse, mais nous aimerions savoir si vous seriez disponible dès le début du mois prochain. Merci de me répondre avant jeudi.",
      prompt: "Que demande la recruteuse à la candidate ?",
      options: ["Si elle est disponible le mois prochain", "Combien elle souhaite gagner", "Où elle habite", "Si elle parle anglais"],
      correct: "A",
      explanation: "La recruteuse veut savoir si la candidate peut commencer dès le début du mois suivant.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Le gouvernement envisage de plafonner le prix de certains produits alimentaires de base. Les économistes sont partagés : ils reconnaissent que la mesure aiderait les ménages modestes à court terme, mais craignent qu'elle ne décourage les producteurs et ne provoque des pénuries.",
      prompt: "Quel risque les économistes évoquent-ils ?",
      options: ["Un découragement des producteurs et des pénuries", "Une hausse générale des salaires", "Une baisse du chômage", "Une inflation incontrôlable"],
      correct: "A",
      explanation: "Selon eux, plafonner les prix pourrait décourager les producteurs et entraîner des pénuries.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "À l'université, le taux d'échec en première année reste préoccupant : près de quatre étudiants sur dix abandonnent avant la fin de l'année. Les enseignants attribuent ce phénomène à un manque d'orientation et à des difficultés à s'organiser seul.",
      prompt: "Comment les enseignants expliquent-ils l'échec en première année ?",
      options: ["Par un manque d'orientation et d'organisation", "Par des cours trop faciles", "Par un excès de bourses", "Par le départ des professeurs"],
      correct: "A",
      explanation: "Ils pointent le manque d'orientation et la difficulté à s'organiser de façon autonome.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le prix littéraire de l'automne a été attribué à une jeune romancière pour son premier livre, une fresque familiale se déroulant sur trois générations. Le jury a salué la finesse de l'écriture, tout en regrettant une fin un peu précipitée.",
      prompt: "Quel reproche le jury formule-t-il ?",
      options: ["Une fin un peu précipitée", "Un style trop complexe", "Un sujet trop banal", "Une trop grande longueur"],
      correct: "A",
      explanation: "Le jury loue l'écriture mais regrette que la fin du roman soit trop rapide.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "L'activité physique régulière réduit le risque de nombreuses maladies. Les médecins recommandent trente minutes de marche rapide par jour, mais soulignent que l'essentiel est de commencer doucement, afin d'éviter les blessures et de garder la motivation.",
      prompt: "Quel conseil les médecins donnent-ils aux débutants ?",
      options: ["Commencer doucement", "S'entraîner intensément", "Éviter la marche", "Faire du sport tous les soirs"],
      correct: "A",
      explanation: "Les médecins conseillent de débuter progressivement pour limiter les blessures et conserver la motivation.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Les achats en ligne représentent désormais près d'un cinquième du commerce de détail. Les petits commerçants s'adaptent en proposant le retrait en magasin, un service qui attire des clients soucieux d'éviter les frais de livraison et de soutenir les boutiques de proximité.",
      prompt: "Pourquoi le retrait en magasin séduit-il les clients ?",
      options: ["Il évite les frais de livraison", "Il est plus lent", "Il remplace les commerçants", "Il offre un prix plus élevé"],
      correct: "A",
      explanation: "Il permet d'éviter les frais de livraison tout en soutenant les commerces de proximité.",
    },
    {
      level: "B2",
      category: "société",
      transcription:
        "La colocation séduit de plus en plus de personnes de plus de quarante ans, que les loyers élevés ou une séparation ont conduites à partager leur logement. Les sociologues y voient moins une étape qu'une solution durable, qui prévient l'isolement.",
      prompt: "Que voient les sociologues dans la colocation chez les plus de quarante ans ?",
      options: ["Une solution durable contre l'isolement", "Une phase provisoire", "Un signe de pauvreté absolue", "Un refus de la famille"],
      correct: "A",
      explanation: "Les sociologues la considèrent comme une solution pérenne, qui limite l'isolement.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "La décentralisation a transféré aux collectivités de nombreuses compétences, mais sans toujours leur donner les moyens financiers de les exercer. Les élus locaux dénoncent un jeu de dupes, dans lequel l'État se défausse de ses responsabilités tout en conservant la maîtrise des ressources.",
      prompt: "Que dénoncent les élus locaux ?",
      options: ["L'État se défausse sans leur donner les moyens", "Un excès de pouvoir des collectivités", "La suppression des communes", "Un surplus de ressources financières"],
      correct: "A",
      explanation: "Ils reprochent à l'État de leur transférer des compétences sans les ressources correspondantes.",
    },
    {
      level: "C1",
      category: "environnement",
      transcription:
        "La rénovation énergétique des logements est présentée comme un levier essentiel de la transition écologique. Elle suppose néanmoins des investissements que les ménages modestes, pourtant les plus exposés à la précarité énergétique, ne peuvent assumer sans un soutien public à la hauteur.",
      prompt: "Quel paradoxe est souligné à propos de la rénovation énergétique ?",
      options: ["Les plus concernés sont les moins capables d'investir", "Elle ne sert pas à économiser l'énergie", "Elle coûte moins cher aux ménages modestes", "Elle est interdite aux locataires"],
      correct: "A",
      explanation: "Les ménages les plus touchés par la précarité énergétique sont ceux qui ont le moins de moyens pour rénover.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "Les progrès de la génétique soulèvent des questions éthiques inédites. S'il devient possible de corriger certaines anomalies avant la naissance, où fixer la limite entre prévention des maladies graves et sélection de caractères jugés désirables, sachant que cette frontière n'est pas toujours évidente ?",
      prompt: "Quelle question éthique est posée ?",
      options: ["Où tracer la limite entre prévention et sélection", "Comment financer les laboratoires", "Pourquoi arrêter les recherches", "Quand rendre la génétique obligatoire"],
      correct: "A",
      explanation: "L'orateur s'interroge sur la frontière entre éviter des maladies graves et choisir des caractéristiques souhaitables.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "La notion d'engagement a évolué : là où l'on s'affiliait autrefois à un parti ou à un syndicat pour de longues années, les citoyens, notamment les jeunes, préfèrent désormais soutenir des causes précises, de manière souple et parfois éphémère, souvent par l'intermédiaire des réseaux sociaux.",
      prompt: "Comment l'engagement des jeunes a-t-il changé ?",
      options: ["Il est plus ponctuel et centré sur des causes précises", "Il a complètement disparu", "Il est plus long qu'avant", "Il passe par des syndicats uniquement"],
      correct: "A",
      explanation: "Les jeunes soutiennent des causes précises de façon souple et souvent éphémère, grâce aux réseaux sociaux.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "On oppose volontiers la raison aux émotions, comme si l'une devait nécessairement dominer les autres. Or les recherches contemporaines suggèrent que les émotions ne sont pas des perturbations de la pensée, mais l'une de ses conditions : sans elles, nous serions incapables de hiérarchiser, donc de décider.",
      prompt: "Quelle idée l'orateur défend-il sur les émotions ?",
      options: ["Elles sont une condition de la pensée et de la décision", "Elles empêchent toute décision", "Elles doivent être supprimées", "Elles sont inutiles à la raison"],
      correct: "A",
      explanation: "Les émotions permettent de hiérarchiser, donc de décider : elles font partie du raisonnement.",
    },
    {
      level: "C2",
      category: "économie",
      transcription:
        "La notion de dette publique, souvent brandie comme une menace, mérite d'être nuancée : tout dépend de ce à quoi elle sert et de la capacité de l'économie à la porter. Un endettement qui finance des investissements durables n'a pas la même portée qu'un déficit alimentant des dépenses courantes sans contrepartie productive.",
      prompt: "Quelle nuance l'orateur apporte-t-il sur la dette ?",
      options: ["Sa portée dépend de ce qu'elle finance", "Elle est toujours néfaste", "Elle n'a aucun effet", "Elle doit être supprimée"],
      correct: "A",
      explanation: "Une dette qui finance des investissements durables ne se juge pas comme un déficit courant sans contrepartie.",
    },
    {
      level: "C2",
      category: "médias",
      transcription:
        "À l'ère de l'information en continu, la rapidité tend à supplanter la vérification. Les rédactions, soumises à la concurrence des réseaux sociaux, hésitent entre prudence et réactivité ; mais c'est précisément dans ce dilemme que se joue leur crédibilité, laquelle repose moins sur la vitesse de publication que sur la fiabilité à long terme.",
      prompt: "Sur quoi repose la crédibilité des rédactions selon l'orateur ?",
      options: ["Sur la fiabilité à long terme", "Sur la vitesse de publication", "Sur le nombre d'abonnés", "Sur la concurrence des réseaux"],
      correct: "A",
      explanation: "La crédibilité d'un média dépend de la fiabilité durable de ses informations plus que de sa rapidité.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "adjectifs",
      prompt: "Nous avons visité une ___ maison au bord de la mer.",
      options: ["belle", "beau", "bel", "beaux"],
      correct: "A",
      explanation: "« Maison » est féminin singulier : l'adjectif « beau » devient « belle ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Hier, tu ___ ton sac dans le train, n'est-ce pas ?",
      options: ["as oublié", "oublie", "oublieras", "oubliais"],
      correct: "A",
      explanation: "« Hier » indique un fait passé accompli : passé composé avec avoir, « tu as oublié ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Il a besoin de conseils ; je vais ___ en donner.",
      options: ["lui", "le", "y", "leur"],
      correct: "A",
      explanation: "« Donner quelque chose à quelqu'un » : « lui » remplace le complément indirect masculin singulier.",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "Le film ___ je t'ai parlé passe ce soir à la télévision.",
      options: ["dont", "que", "qui", "où"],
      correct: "A",
      explanation: "« Parler de » impose le relatif « dont » qui remplace « de ce film ».",
    },
    {
      level: "B1",
      category: "futur",
      prompt: "Quand j'aurai fini mes études, je ___ un tour du monde.",
      options: ["ferai", "fais", "ferais", "faisais"],
      correct: "A",
      explanation: "La principale exprime un projet futur : futur simple, « je ferai ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Elle est partie ___ vacances sans prévenir personne.",
      options: ["en", "à", "dans", "sur"],
      correct: "A",
      explanation: "On dit « partir en vacances » : la préposition « en » est figée dans cette expression.",
    },
    {
      level: "B1",
      category: "adverbes",
      prompt: "Il parle trop ___ ; je ne comprends rien.",
      options: ["vite", "vif", "rapides", "bon"],
      correct: "A",
      explanation: "Il faut un adverbe pour modifier le verbe « parle » : « vite ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Je ne pense pas qu'il ___ le temps de venir ce soir.",
      options: ["ait", "a", "aura", "avait"],
      correct: "A",
      explanation: "Après « ne pas penser que » (négation), on emploie le subjonctif : « qu'il ait ».",
    },
    {
      level: "B2",
      category: "cause",
      prompt: "Il a réussi son examen ___ ses efforts constants.",
      options: ["grâce à", "à cause de", "malgré", "en dépit de"],
      correct: "A",
      explanation: "« Grâce à » exprime une cause positive : les efforts expliquent la réussite.",
    },
    {
      level: "B2",
      category: "voix passive",
      prompt: "Ce pont ___ au dix-neuvième siècle par un ingénieur célèbre.",
      options: ["a été construit", "construisait", "a construit", "est construisant"],
      correct: "A",
      explanation: "Le sujet « pont » subit l'action ; le passif au passé composé est « a été construit ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Si tu ___ plus attentif, tu ne ferais pas autant d'erreurs.",
      options: ["étais", "serais", "seras", "es"],
      correct: "A",
      explanation: "Après « si » exprimant une hypothèse irréelle du présent, on emploie l'imparfait : « si tu étais ».",
    },
    {
      level: "B2",
      category: "concession",
      prompt: "Il continue à travailler ___ il soit très fatigué.",
      options: ["bien qu'", "pourvu qu'", "afin qu'", "avant qu'"],
      correct: "A",
      explanation: "« Bien que » exprime la concession et gouverne le subjonctif : « bien qu'il soit fatigué ».",
    },
    {
      level: "B2",
      category: "pronoms démonstratifs",
      prompt: "Ma voiture est plus petite que ___ de mon voisin.",
      options: ["celle", "celui", "ceux", "cela"],
      correct: "A",
      explanation: "Le pronom démonstratif reprend « voiture », féminin singulier : « celle de mon voisin ».",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Elle m'a demandé ___ je pensais de son projet.",
      options: ["ce que", "ce qui", "qu'est-ce que", "ce dont"],
      correct: "A",
      explanation: "En discours indirect, « qu'est-ce que » devient « ce que » : « elle m'a demandé ce que je pensais ».",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Quoi qu'il ___, nous maintiendrons la réunion à la date prévue.",
      options: ["arrive", "arrivera", "arrive que", "arrivait"],
      correct: "A",
      explanation: "« Quoi que » (en deux mots) est suivi du subjonctif : « quoi qu'il arrive ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "La raison pour ___ il a refusé reste obscure.",
      options: ["laquelle", "lequel", "laquelle que", "dont"],
      correct: "A",
      explanation: "« Pour » impose « laquelle » après un antécédent féminin singulier : « la raison pour laquelle ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ nous préoccupe, ce n'est pas le coût, mais le délai.",
      options: ["Ce qui", "Ce que", "Ce dont", "Celui qui"],
      correct: "A",
      explanation: "« Ce qui » est sujet du verbe « préoccupe » dans la tournure « ce qui… ce n'est pas… ».",
    },
    {
      level: "C1",
      category: "conditionnel passé",
      prompt: "Sans votre intervention, nous ___ le contrat.",
      options: ["aurions perdu", "perdrions", "avons perdu", "avions perdu"],
      correct: "A",
      explanation: "« Sans » exprime une hypothèse irréelle du passé : conditionnel passé « aurions perdu ».",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Je n'ai jamais vu quelqu'un qui ___ aussi bien l'art de convaincre.",
      options: ["maîtrise", "maîtrisait", "maîtrisera", "a maîtrisé"],
      correct: "A",
      explanation: "Après un antécédent à portée restrictive (« jamais… quelqu'un qui »), on emploie le subjonctif : « maîtrise ».",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Pour autant qu'il ___ en mesure de nous répondre, nous l'écouterons.",
      options: ["soit", "est", "sera", "serait"],
      correct: "A",
      explanation: "« Pour autant que » exprime une condition restrictive et se construit avec le subjonctif : « soit ».",
    },
  ],
  reading: [
    {
      title: "Annulation du cours de piano",
      text: p(
        "Chers parents, le cours de piano de mercredi est annulé car la professeure est malade. Il sera rattrapé samedi matin à 10 h.",
        "Merci de confirmer votre présence par courriel avant jeudi.",
      ),
      question: {
        level: "B1",
        prompt: "Quand le cours sera-t-il rattrapé ?",
        options: ["Samedi matin", "Mercredi soir", "Jeudi matin", "Dimanche"],
        correct: "A",
        explanation: "Le message annonce un rattrapage samedi matin à 10 h.",
      },
    },
    {
      title: "Promotion sur les chaussures",
      text: p(
        "Du 5 au 12 juin, profitez de trente pour cent de réduction sur toutes les chaussures de sport.",
        "Offre valable en magasin uniquement, sur présentation de la carte de fidélité. Non cumulable avec d'autres promotions.",
      ),
      question: {
        level: "B1",
        prompt: "Que faut-il présenter pour profiter de l'offre ?",
        options: ["La carte de fidélité", "Un justificatif de domicile", "Un bon d'achat", "Une pièce d'identité"],
        correct: "A",
        explanation: "L'offre est réservée aux clients qui présentent leur carte de fidélité.",
      },
    },
    {
      title: "Demande de congé",
      text: p(
        "Bonjour, je souhaiterais poser deux jours de congé, les 14 et 15 mars, pour déménager. Mon collègue accepte de me remplacer.",
        "Je terminerai mes dossiers en cours avant mon départ. Merci d'avance de votre réponse.",
      ),
      question: {
        level: "B1",
        prompt: "Pourquoi l'auteur demande-t-il des congés ?",
        options: ["Pour déménager", "Pour partir en vacances", "Pour se reposer", "Pour passer un examen"],
        correct: "A",
        explanation: "L'auteur explique qu'il veut deux jours de congé pour déménager.",
      },
    },
    {
      title: "Stage de théâtre",
      text: p(
        "Un stage de théâtre pour adolescents aura lieu pendant les vacances de février, du lundi au vendredi, de 14 h à 17 h.",
        "Le tarif est de 80 euros pour la semaine. Une représentation aura lieu le dernier jour, devant les familles.",
      ),
      question: {
        level: "B1",
        prompt: "Que se passera-t-il le dernier jour du stage ?",
        options: ["Une représentation devant les familles", "Un examen final", "Une sortie au théâtre", "Un pique-nique"],
        correct: "A",
        explanation: "Le texte indique une représentation le dernier jour, devant les familles.",
      },
    },
    {
      title: "Objets trouvés",
      text: p(
        "Un sac de sport noir a été retrouvé dans les vestiaires de la piscine mardi dernier. Il contient une serviette bleue et une paire de lunettes.",
        "Son propriétaire peut le réclamer à l'accueil avant la fin du mois, en décrivant son contenu.",
      ),
      question: {
        level: "B1",
        prompt: "Comment réclamer le sac ?",
        options: ["À l'accueil, en décrivant son contenu", "Par courrier avec une photo", "Au vestiaire, sans formalité", "Sur le site de la piscine"],
        correct: "A",
        explanation: "Le propriétaire doit se présenter à l'accueil et décrire le contenu du sac.",
      },
    },
    {
      title: "Un nouveau parc à chiens",
      text: p(
        "La ville a ouvert un espace clôturé réservé aux chiens, où ils peuvent courir sans laisse. Les propriétaires sont tenus de ramasser les déjections et de surveiller leurs animaux.",
        "Les riverains saluent l'initiative, mais certains craignent des aboiements en soirée, que la mairie surveillera pendant l'été.",
      ),
      question: {
        level: "B2",
        prompt: "Que fera la mairie pendant l'été ?",
        options: ["Surveiller les nuisances sonores", "Fermer le parc", "Interdire les chiens", "Installer des caméras"],
        correct: "A",
        explanation: "La mairie surveillera les aboiements en soirée dont certains riverains s'inquiètent.",
      },
    },
    {
      title: "Du bénévolat pour les personnes âgées",
      text: p(
        "Une association propose à des étudiants de rendre visite chaque semaine à des personnes âgées isolées. Ils discutent, jouent aux cartes ou aident pour de petites démarches, en échange d'une réduction sur leur loyer.",
        "Les deux parties y trouvent leur compte : les aînés rompent leur solitude et les jeunes bénéficient d'un logement moins cher.",
      ),
      question: {
        level: "B2",
        prompt: "Que gagnent les étudiants dans ce dispositif ?",
        options: ["Une réduction de loyer", "Un salaire mensuel", "Des repas gratuits", "Un diplôme"],
        correct: "A",
        explanation: "En échange de leurs visites, les étudiants bénéficient d'un loyer réduit.",
      },
    },
    {
      title: "Le retour du cinéma en plein air",
      text: p(
        "Chaque été, des projections de films sont organisées dans les parcs et sur les places des villes. Les spectateurs apportent leurs chaises, parfois leur pique-nique, et profitent d'une soirée gratuite en famille.",
        "Les organisateurs, soutenus par les communes, assurent que le succès ne se dément pas, même si la météo reste leur principale inquiétude.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle est la principale inquiétude des organisateurs ?",
        options: ["La météo", "Le coût des films", "Le manque de public", "Les chaises"],
        correct: "A",
        explanation: "Malgré le succès, la météo reste leur principal souci.",
      },
    },
    {
      title: "Des cours de langues pour les seniors",
      text: p(
        "Les cours de langues pour seniors connaissent un succès croissant. Les retraités y voient un moyen de voyager plus facilement et de garder l'esprit actif, au contact d'autres participants.",
        "Les animateurs notent que les apprenants âgés posent beaucoup de questions et sont très assidus, même si le rythme est plus lent que dans les cours classiques.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les animateurs décrivent-ils les apprenants âgés ?",
        options: ["Curieux et assidus", "Distraits et lents", "Pressés et indisciplinés", "Peu motivés"],
        correct: "A",
        explanation: "Ils posent beaucoup de questions et sont très assidus aux cours.",
      },
    },
    {
      title: "Un boulanger engagé",
      text: p(
        "Dans ce village, le boulanger a décidé de proposer chaque jour des invendus à prix réduit en fin de journée. L'initiative évite le gaspillage et permet à des familles modestes d'acheter du pain à moindre coût.",
        "Ses collègues hésitent à l'imiter, redoutant que cette pratique n'incite les clients à n'acheter qu'à l'heure de la réduction.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi ses collègues hésitent-ils à l'imiter ?",
        options: ["Ils craignent que les clients attendent la réduction", "Ils manquent de farine", "Ils refusent de vendre du pain", "Ils n'ont pas d'invendus"],
        correct: "A",
        explanation: "Ils redoutent que les clients n'achètent plus qu'à l'heure des réductions.",
      },
    },
    {
      title: "Les quartiers en transition",
      text: p(
        "Dans plusieurs villes, des associations se regroupent pour devenir des quartiers en transition : jardins partagés, ateliers de réparation, achats groupés. L'objectif est de réduire l'empreinte écologique en renforçant les liens entre voisins.",
        "Les premiers résultats sont encourageants, mais ces initiatives dépendent largement de quelques militants très actifs, ce qui les rend fragiles à long terme.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi ces initiatives sont-elles fragiles ?",
        options: ["Elles reposent sur quelques militants actifs", "Elles manquent d'idées", "Elles sont interdites", "Elles coûtent trop cher"],
        correct: "A",
        explanation: "Leur dépendance à un petit nombre de militants les rend vulnérables dans la durée.",
      },
    },
    {
      title: "Le métier d'infirmier à domicile",
      text: p(
        "Les infirmiers libéraux se déplacent chez des patients âgés ou isolés pour des soins quotidiens. Leur présence permet de réduire les séjours à l'hôpital et de maintenir les patients dans leur environnement familier.",
        "Mais ils déplorent des tournées de plus en plus longues et des déplacements coûteux, qui pèsent sur leurs revenus et leur vie personnelle.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle difficulté les infirmiers à domicile déplorent-ils ?",
        options: ["Des tournées longues et coûteuses", "Un manque de patients", "L'absence de matériel", "Un trop grand nombre de collègues"],
        correct: "A",
        explanation: "Ils dénoncent des tournées de plus en plus longues et des déplacements onéreux.",
      },
    },
    {
      title: "Des livres pour tous les budgets",
      text: p(
        "Les librairies d'occasion se multiplient dans les centres-villes. On y trouve des romans, des bandes dessinées et des manuels scolaires à des prix très bas, ce qui attire étudiants, familles et collectionneurs.",
        "Les éditeurs observent le phénomène avec nuance : il favorise la lecture, mais prive auteurs et maisons d'édition de revenus sur les livres revendus.",
      ),
      question: {
        level: "B2",
        prompt: "Quel inconvénient les éditeurs voient-ils dans ce marché ?",
        options: ["Les auteurs ne perçoivent rien sur les livres revendus", "Les prix sont trop élevés", "Les librairies ferment", "Les lecteurs disparaissent"],
        correct: "A",
        explanation: "Sur les livres d'occasion, ni les auteurs ni les éditeurs ne touchent de revenus.",
      },
    },
    {
      title: "Zéro déchet : un défi de famille",
      text: p(
        "Une famille de quatre personnes raconte comment elle a réduit ses déchets à un seul bocal par an. Achats en vrac, produits ménagers faits maison, compostage : les gestes sont simples, mais demandent de l'organisation.",
        "Elle reconnaît que le temps passé et l'accès limité aux commerces en vrac rendent la démarche difficile pour des familles aux emplois du temps chargés.",
      ),
      question: {
        level: "B2",
        prompt: "Quel obstacle la famille reconnaît-elle ?",
        options: ["Le temps et l'accès aux commerces en vrac", "Le prix des bocaux", "L'interdiction du compostage", "Le refus des enfants"],
        correct: "A",
        explanation: "Le temps nécessaire et le peu de commerces en vrac compliquent la démarche pour beaucoup de familles.",
      },
    },
    {
      title: "Des transports gratuits pour les jeunes",
      text: p(
        "Plusieurs villes ont décidé de rendre les bus et tramways gratuits pour les moins de vingt-cinq ans. La mesure vise à faciliter l'accès aux études, aux loisirs et à l'emploi, tout en réduisant l'usage de la voiture chez les jeunes.",
        "Les premiers chiffres montrent une hausse de la fréquentation, mais les opérateurs de transport demandent que cette gratuité soit compensée par des financements stables.",
      ),
      question: {
        level: "B2",
        prompt: "Que demandent les opérateurs de transport ?",
        options: ["Des financements stables pour compenser la gratuité", "La fin de la gratuité immédiatement", "Plus de jeunes dans les bus", "La suppression des tramways"],
        correct: "A",
        explanation: "Ils acceptent la mesure à condition qu'elle soit compensée financièrement de manière durable.",
      },
    },
    {
      title: "L'avenir des petites gares",
      text: p(
        "Dans de nombreuses communes, les petites gares ferment ou sont désertées, faute de trains. Pourtant, plusieurs régions ont décidé de rouvrir des lignes jugées peu rentables, au nom de l'aménagement du territoire et de la lutte contre l'isolement des habitants.",
        "Ces choix suscitent des débats. Les partisans de la réouverture soulignent que le train, moins polluant que la voiture, offre une alternative à ceux qui n'ont pas de véhicule. Les sceptiques rappellent que ces lignes nécessitent des subventions importantes et que leur fréquentation reste incertaine. Entre rentabilité et service public, les élus doivent arbitrer, en tenant compte à la fois du coût immédiat et des bénéfices diffus, plus difficiles à mesurer, sur l'attractivité des territoires.",
      ),
      question: {
        level: "C1",
        prompt: "Quel argument avancent les partisans de la réouverture des lignes ?",
        options: ["Le train est une alternative moins polluante pour ceux sans voiture", "Les lignes sont très rentables", "La voiture est plus économique", "Les gares sont plus anciennes"],
        correct: "A",
        explanation: "Ils soulignent que le train, moins polluant, aide ceux qui n'ont pas de véhicule.",
      },
    },
    {
      title: "Les jeunes agriculteurs",
      text: p(
        "Le monde agricole vieillit : près d'un tiers des exploitants approche de la retraite, et la relève n'est pas assurée. Les jeunes qui s'installent, parfois issus de familles non agricoles, doivent affronter le coût du foncier et des machines, alors que leurs revenus restent incertains.",
        "Pour faciliter leur installation, des dispositifs de portage foncier ont été créés : des organismes achètent des terres et les louent à de jeunes agriculteurs, qui peuvent ensuite les racheter progressivement. Cette solution allège l'investissement initial, mais elle ne règle pas la question de fond : celle de la juste rémunération d'un métier exigeant, dont dépend pourtant la souveraineté alimentaire d'un pays.",
      ),
      question: {
        level: "C1",
        prompt: "Que ne règle pas le portage foncier ?",
        options: ["La question de la rémunération du métier", "L'accès aux terres", "L'âge des exploitants", "Le coût des machines"],
        correct: "A",
        explanation: "Le portage allège l'investissement de départ mais pas la question de fond de la rémunération des agriculteurs.",
      },
    },
    {
      title: "Les écrans et la concentration",
      text: p(
        "De nombreuses études suggèrent que l'usage fréquent du smartphone fragmente l'attention, en habituant le cerveau à des sollicitations brèves et constantes. Les enseignants constatent que des élèves, pourtant brillants, éprouvent des difficultés croissantes à lire un texte long ou à suivre un raisonnement complexe.",
        "Face à ce constat, certains établissements interdisent les téléphones pendant les cours. D'autres préfèrent éduquer à leur usage, estimant que la prohibition ne prépare pas les jeunes à vivre dans un monde saturé d'écrans. Dans les deux cas, la question dépasse l'école : elle concerne la manière dont une société entend protéger la capacité de ses membres à se concentrer, bien commun fragile et pourtant indispensable à tout apprentissage.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi certains établissements préfèrent-ils éduquer à l'usage des écrans ?",
        options: ["L'interdiction ne prépare pas à un monde saturé d'écrans", "Les téléphones sont gratuits", "Les élèves refusent les cours", "Les enseignants aiment les écrans"],
        correct: "A",
        explanation: "Ils estiment que l'interdiction seule ne prépare pas les jeunes à vivre avec des écrans omniprésents.",
      },
    },
    {
      title: "Le patrimoine religieux en danger",
      text: p(
        "Les petites églises de campagne, nombreuses en France, sont de plus en plus délaissées. Faute de fidèles et de moyens, certaines se dégradent, voire s'effondrent. Leur entretien incombe souvent aux communes, qui n'ont ni les ressources ni toujours la volonté de les préserver.",
        "Des solutions émergent : financement participatif, reconversion en salles culturelles, ouverture aux visiteurs. Elles soulèvent toutefois des interrogations. Peut-on accueillir des concerts dans un lieu de culte sans en altérer le sens ? Faut-il restaurer à tout prix des édifices dont la fréquentation est quasi nulle ? Ces questions engagent moins l'art que la manière dont une collectivité arbitre entre mémoire, usages et coûts.",
      ),
      question: {
        level: "C1",
        prompt: "Quel type de question ces solutions soulèvent-elles ?",
        options: ["Un arbitrage entre mémoire, usages et coûts", "Un débat sur l'architecture seulement", "Une querelle entre fidèles", "Un problème de transport"],
        correct: "A",
        explanation: "Les questions posées relèvent d'un arbitrage collectif entre mémoire, usages et coûts.",
      },
    },
    {
      title: "Les maisons de retraite en question",
      text: p(
        "Le vieillissement de la population pose avec acuité la question de l'accueil des personnes âgées dépendantes. Les établissements spécialisés manquent de places et de personnel, et leurs tarifs, souvent supérieurs aux retraites perçues, laissent à la charge des familles un reste à payer parfois considérable.",
        "Face à ces limites, d'autres formules se développent : habitat partagé, services à domicile renforcés, résidences intergénérationnelles. Elles répondent au souhait de la plupart des personnes âgées de rester chez elles aussi longtemps que possible. Pour autant, elles supposent une coordination des soins et un soutien aux aidants que les politiques publiques peinent encore à organiser de manière cohérente.",
      ),
      question: {
        level: "C1",
        prompt: "Que supposent les formules alternatives à la maison de retraite ?",
        options: ["Une coordination des soins et un soutien aux aidants", "La fermeture des établissements", "Une hausse des tarifs", "Le départ des familles"],
        correct: "A",
        explanation: "Elles nécessitent une organisation des soins et une aide aux aidants, que les politiques publiques n'assurent pas encore bien.",
      },
    },
    {
      title: "Le cinéma documentaire et la réalité",
      text: p(
        "Le documentaire se définit souvent par opposition à la fiction : il montrerait le réel tel qu'il est. Cette distinction paraît pourtant fragile. Dès qu'un cinéaste choisit un cadre, un moment, un montage, il fait des choix qui orientent ce que le spectateur perçoit. Le réel que l'on filme n'est jamais brut : il est déjà interprété.",
        "Cela n'ôte pas au documentaire sa valeur, mais modifie son rapport à la vérité. Plus que de reproduire le monde, il peut chercher à le comprendre, en assumant sa subjectivité. Les spectateurs, de leur côté, gagnent à interroger ce qu'on leur montre : ni confiance aveugle ni soupçon systématique, mais une attention aux choix qui fabriquent le regard. Le documentaire devient alors moins un témoin neutre qu'une invitation à penser, ce qui, loin de l'affaiblir, pourrait bien constituer sa plus grande force.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur redéfinit-il le documentaire ?",
        options: ["Comme une invitation à penser, non un témoin neutre", "Comme une copie fidèle du réel", "Comme une fiction déguisée", "Comme un genre sans valeur"],
        correct: "A",
        explanation: "Puisque le réel filmé est interprété, le documentaire est une démarche assumée de compréhension, qui invite à réfléchir.",
      },
    },
    {
      title: "Le travail domestique invisible",
      text: p(
        "Une grande part du travail nécessaire au fonctionnement de la société n'est pas rémunérée : tâches ménagères, soins aux enfants, accompagnement des proches âgés. Ce travail, assumé majoritairement par des femmes, échappe aux statistiques économiques classiques, bien qu'il représente un volume d'heures considérable et qu'il rende possible l'activité professionnelle de tous.",
        "Son invisibilité n'est pas fortuite : elle tient à une conception de l'économie qui ne valorise que ce qui s'échange sur un marché. Rendre ce travail visible ne signifie pas nécessairement le rémunérer, mais en reconnaître la valeur et en répartir plus équitablement la charge. C'est une question de justice, mais aussi de lucidité : une société qui ignore ce sur quoi elle repose se prive des moyens de le préserver, et donc de penser les politiques de l'emploi, de la famille et de la retraite avec justesse.",
      ),
      question: {
        level: "C2",
        prompt: "Que signifie rendre ce travail visible selon l'auteur ?",
        options: ["En reconnaître la valeur et mieux en répartir la charge", "Le rémunérer obligatoirement", "L'interdire aux femmes", "Le confier aux entreprises"],
        correct: "A",
        explanation: "Il s'agit de lui reconnaître une valeur et de répartir plus équitablement son poids, sans passer forcément par un salaire.",
      },
    },
    {
      title: "La mondialisation et les identités",
      text: p(
        "On annonce régulièrement que la mondialisation effacerait les différences culturelles au profit d'une uniformité planétaire. Le constat est pourtant plus nuancé. Si certains produits et certaines références circulent partout, les sociétés s'en emparent en les réinterprétant, et de nouvelles formes hybrides apparaissent, que ni la tradition ni l'importation seules n'auraient pu produire.",
        "Parallèlement, la circulation accélérée des idées suscite, chez certains, un réflexe de repli identitaire. Face à l'impression de perdre ses repères, on tend à figer ce que l'on croit authentique, en oubliant que les identités ont toujours été le fruit d'échanges. Ainsi, loin de s'opposer, mondialisation et attachement local se nourrissent mutuellement, chaque pôle définissant l'autre par contraste, dans une dynamique de transformation continue que ni les nostalgiques ni les enthousiastes ne parviennent tout à fait à saisir.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle relation l'auteur établit-il entre mondialisation et attachement local ?",
        options: ["Ils se nourrissent mutuellement", "Ils s'excluent complètement", "L'un supprime l'autre", "Ils n'ont aucun lien"],
        correct: "A",
        explanation: "L'auteur soutient que chacun se définit par contraste avec l'autre : ils se renforcent plutôt que de s'opposer.",
      },
    },
    {
      title: "L'économie de l'attention",
      text: p(
        "Les plateformes numériques ne vendent pas seulement des services : elles monnaient l'attention de leurs utilisateurs auprès d'annonceurs. Cette logique les pousse à concevoir des dispositifs qui captent le regard le plus longtemps possible : défilement infini, notifications, recommandations personnalisées. L'utilisateur croit consommer un service gratuit, alors que c'est son temps de cerveau qui est la marchandise.",
        "Or l'attention n'est pas une ressource comme les autres : elle conditionne la capacité à penser, à apprendre, à s'engager. Qu'elle soit devenue l'objet d'une compétition commerciale ne relève donc pas du simple détail économique, mais d'un enjeu de société. Réguler ces pratiques suppose d'admettre que la liberté de choix, tant vantée, s'exerce dans des environnements conçus pour l'infléchir, ce qui en relativise singulièrement la portée.",
      ),
      question: {
        level: "C2",
        prompt: "Que relativise l'auteur à propos de la liberté de choix ?",
        options: ["Sa portée, car les environnements sont conçus pour l'infléchir", "Son existence légale", "Son prix", "Son ancienneté"],
        correct: "A",
        explanation: "Les dispositifs étant conçus pour orienter l'attention, la liberté de choix de l'utilisateur est en pratique limitée.",
      },
    },
    {
      title: "Le droit à la ville",
      text: p(
        "L'expression « droit à la ville » désigne l'idée que les habitants devraient pouvoir participer à la fabrication de l'espace urbain, et non seulement y habiter. Elle recouvre des revendications variées : accéder à des logements abordables, disposer d'espaces publics ouverts, influer sur les décisions d'aménagement. Elle suppose que la ville n'est pas qu'un ensemble d'équipements, mais un projet collectif.",
        "Ce principe se heurte à des logiques concurrentes. L'investissement immobilier, la recherche de rentabilité et la compétition entre métropoles tendent à faire de la ville un produit. Les habitants, eux, y cherchent d'abord un cadre de vie. Entre ces deux conceptions, la tension est durable ; la tâche politique consiste moins à la résoudre qu'à garantir que les voix de ceux qui vivent la ville y trouvent une place réelle.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle est la tâche politique décrite dans le texte ?",
        options: ["Garantir une place réelle à la voix des habitants", "Supprimer toute logique économique", "Interdire l'investissement immobilier", "Réduire la taille des villes"],
        correct: "A",
        explanation: "La tension ne se résout pas ; il faut assurer que les habitants soient réellement entendus.",
      },
    },
  ],
});
