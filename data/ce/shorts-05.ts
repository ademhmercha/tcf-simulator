import type { CeShortDocTuple } from "./types";

/** Test 5 : documents courts A1 -> B2 (5 documents par niveau, une question chacun). */
const A1: CeShortDocTuple[] = [
  [
    "Le jardin de la ville",
    "Le jardin de la ville est ouvert tous les jours. On y cultive des légumes et des fleurs. Le jardin ferme à la tombée de la nuit. Les animaux ne sont pas autorisés. Un café ouvre ses portes près de l'entrée. Le jardin est situé près de la gare.",
    [["Qu'y a-t-il près de l'entrée du jardin ?", ["Un café", "Une piscine", "Une bibliothèque", "Un parking"], "A", "Le document précise qu'un café ouvre ses portes près de l'entrée."]],
  ],
  [
    "Les ateliers de bricolage",
    "Les ateliers de bricolage ouvrent le mardi et le jeudi. Les cours commencent à 14 heures. Le nombre de places est limité à dix personnes. Il faut payer 15 euros par séance. Les outils sont fournis par l'atelier.",
    [["Combien coûte une séance ?", ["5 euros", "10 euros", "15 euros", "Gratuit"], "C", "Le document précise qu'il faut payer 15 euros par séance."]],
  ],
  [
    "La station-service",
    "La station-service est ouverte 24 heures sur 24. Elle se trouve à l'entrée du village. Elle vend de l'essence et du diesel. Un lave-glace est disponible. La station est fermée le premier mardi du mois.",
    [["Quand la station-service est-elle fermée ?", ["Le dimanche", "Le premier mardi du mois", "Le lundi matin", "Elle n'est jamais fermée"], "B", "Le document précise que la station est fermée le premier mardi du mois."]],
  ],
  [
    "Le cours de gymnastique douce",
    "Un cours de gymnastique douce est proposé le mardi matin, à la salle communale. Il est destiné aux personnes âgées. La séance dure quarante-cinq minutes. Il faut s'inscrire à l'accueil. Les tarifs sont réduits le jeudi.",
    [["À qui le cours est-il destiné ?", ["Aux enfants", "Aux personnes âgées", "Aux adultes en bonne santé", "À tous les âges"], "B", "Le document précise que le cours est destiné aux personnes âgées."]],
  ],
  [
    "La médiathèque musicale",
    "La médiathèque musicale ouvre ses portes en mars. On peut y emprunter des instruments. Le prêt dure un mois. Il faut une pièce d'identité pour s'inscrire. La médiathèque ferme le lundi.",
    [["Combien de temps peut-on garder un instrument ?", ["Une semaine", "Un mois", "Trois mois", "Une journée"], "B", "Le document indique que le prêt dure un mois."]],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "La médiathèque",
    "La médiathèque est ouverte du mardi au samedi. Elle ferme le lundi et le dimanche. On y trouve des livres, des disques et des films. Il faut une carte pour emprunter. On peut consulter les journaux sur place. La médiathèque propose des ateliers pour les enfants.",
    [["Peut-on consulter les journaux à la maison ?", ["Oui, gratuitement", "Non, seulement sur place", "Seulement le samedi", "Seulement avec une carte spéciale"], "B", "Le document indique que l'on peut consulter les journaux sur place."]],
  ],
  [
    "Le marché de Noël",
    "Le marché de Noël aura lieu du 12 au 24 décembre, sur la place de l'Église. Une trentaine d'artisans y vendront leurs produits. Il y aura aussi des stands de nourriture. Le marché est ouvert tous les jours de 10 heures à 19 heures. Les enfants entrent gratuitement.",
    [["Qui peut entrer gratuitement ?", ["Tout le monde", "Les enfants", "Les personnes âgées", "Les voisins"], "B", "Le document précise que les enfants entrent gratuitement."]],
  ],
  [
    "L'atelier de poterie",
    "Un atelier de poterie est proposé le mercredi soir, pendant six semaines. Il est destiné aux adultes débutants. Le nombre de places est limité à dix personnes. La terre et lefour" ,
    [["À qui l'atelier est-il destiné ?", ["Aux enfants", "Aux adultes débutants", "Aux experts uniquement", "À tous les âges"], "B", "Le document précise que l'atelier est destiné aux adultes débutants."]],
  ],
  [
    "La promenade culturelle",
    "Une promenade culturelle aura lieu le premier dimanche du mois, à 10 heures. Le départ se fait devant l'église. La promenade dure deux heures. Un guide accompagne le groupe. Elle est gratuite, mais le nombre de places est limité.",
    [["Où se fait le départ de la promenade ?", ["À la gare", "Devant l'église", "Au parc", "À la mairie"], "B", "Le document indique que le départ se fait devant l'église."]],
  ],
  [
    "Le concours de pétanque",
    "Un concours de pétanque aura lieu le 15 août, sur le boulodrome municipal. Les inscriptions sont ouvertes à 9 heures. Le concours commence à 10 heures. La participation est gratuite. Les équipes sont tirées au sort.",
    [["Quand le concours commence-t-il ?", ["À 9 heures", "À 10 heures", "À 14 heures", "À 18 heures"], "B", "Le document indique que le concours commence à 10 heures."]],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le musée du vélo",
    "Le musée du vélo présente plus de trois cents vélos anciens. La visite dure environ une heure. On y voit des vélos de course, de ville et de course. Un guide explique l'histoire de chaque pièce. Le musée est ouvert le week-end uniquement. L'entrée coûte 6 euros.",
    [["Quand le musée est-il ouvert ?", ["Tous les jours", "Le week-end uniquement", "Le lundi", "Uniquement en août"], "B", "Le document indique que le musée est ouvert le week-end uniquement."]],
  ],
  [
    "La collecte des meubles",
    "La commune collecte les meubles usagés le premier samedi de chaque mois. Il faut les déposer devant sa maison avant 7 heures. Le camion passe ensuite dans les rues. Les objets trop volumineux ne sont pas acceptés. Le service est gratuit pour les habitants.",
    [["Où faut-il déposer les meubles ?", ["À la déchetterie", "Devant sa maison", "À la mairie", "Dans la rue"], "B", "Le document précise qu'il faut les déposer devant sa maison avant 7 heures."]],
  ],
  [
    "L'initiation à la photographie",
    "Une initiation à la photographie est proposée le samedi, pendant quatre séances. Le matériel est prêté sur place. Les participants apprendront à régler l'appareil et la lumière. Le nombre de places est limité à dix personnes. Les séances sont gratuites.",
    [["Combien de séances sont prévues ?", ["Deux", "Quatre", "Six", "Dix"], "B", "Le document indique que l'initiation comprend quatre séances."]],
  ],
  [
    "L'atelier d'écriture",
    "Un atelier d'écriture est proposé le premier mardi du mois, à la bibliothèque. Chaque participant écrit un court texte. Le groupe lit ensuite les textes à voix haute. L'animateur donne des conseils. L'atelier est gratuit et ouvert à tous.",
    [["À quelle fréquence l'atelier a-t-il lieu ?", ["Tous les jours", "Le premier mardi du mois", "Une fois par an", "Le week-end"], "B", "Le document indique que l'atelier est proposé le premier mardi du mois."]],
  ],
  [
    "La lecture à voix haute",
    "Un groupe de lecture à voix haute se réunit chaque jeudi, à la bibliothèque. Les participants lisent un texte à tour de rôle. Aucune préparation n'est nécessaire. Le groupe est ouvert à tous. La séance dure une heure et demie.",
    [["Quelle préparation est nécessaire pour participer ?", ["Lire le texte à l'avance", "Aucune", "Écrire un commentaire", "Apporter un livre"], "B", "Le document précise qu'aucune préparation n'est nécessaire."]],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "L'école de musique",
    "L'école de musique compte 400 élèves, contre 280 il y a cinq ans. Les inscriptions ont augmenté après l'ouverture d'un nouveau bâtiment. L'école propose des cours de jazz, de musique classique et de batterie. La ville finance un tiers du budget. La direction refuse d'augmenter le nombre d'élèves par classe, jugeant le résultat trop juste. Les parents demandent des explications.",
    [["Quelle position défend la direction ?", ["Une augmentation du nombre d'élèves par classe", "Un refus d'augmenter le nombre d'élèves par classe", "La fermeture d'un bâtiment", "La réduction du budget"], "B", "La direction refuse d'augmenter le nombre d'élèves par classe, jugeant le résultat trop juste."]],
  ],
  [
    "La bibliothèque itinérante",
    "La bibliothèque itinérante dessert trois communes rurales. Le bus qui la transporte s'arrête dans chaque village pendant une heure. Les habitants peuvent emprunter jusqu'à quatre ouvrages. Les prêts sont gratuits, et l'inscription demande une simple preuve de domicile. Le service fonctionne depuis dix ans, grâce à des bénévoles et à des dons de livres.",
    [["Quelle condition faut-il remplir pour s'inscrire ?", ["Payer une cotisation", "Présenter une preuve de domicile", "Habiter dans une des trois communes", "Être étudiant"], "B", "Le document précise que l'inscription demande une simple preuve de domicile."]],
  ],
  [
    "La plage de l'est",
    "La plage de l'est a été nettoyée par deux cents bénévoles en avril. Le nettoyage avait été reporté deux années de suite faute de volontaires. Cette année, la municipalité a fourni le matériel. Des poubelles ont été installées à l'entrée de la plage. Les bénévoles espèrent que l'opération sera renouvelée chaque printemps.",
    [["Pourquoi le nettoyage avait-il été reporté ?", ["Le manque de bénévoles", "Le mauvais temps", "Le coût du matériel", "L'interdiction de la mairie"], "A", "Le document indique que le nettoyage a été reporté faute de bénévoles."]],
  ],
  [
    "Le nouveau regulateur des loyers",
    "La commune a adopté un nouveau règlement des loyers. Le taux maximal d'augmentation est fixé chaque année. Les propriétaires doivent en informer les locataires. Le dispositif s'applique aux logements vides depuis plus de deux ans. Un examen par une commission permet de vérifier les hausses déclarées.",
    [["Qui peut vérifier les hausses déclarées ?", ["Le propriétaire seul", "Une commission", "Le locataire seul", "La police"], "B", "Le document indique qu'un examen par une commission permet de vérifier les hausses déclarées."]],
  ],
  [
    "La réouverture du cinéma",
    "Le cinéma Le Palace va rouvrir après deux ans de travaux. La salle sera agrandie et l'écran remplacé. Le nombre de places passera de 120 à 180. Le cinéma veut programmer des films classiques et des films récents.",
    [["Combien de places la salle aura-t-elle après les travaux ?", ["120", "150", "180", "200"], "C", "Le document indique que le nombre de places passera de 120 à 180."]],
  ],
];

export default { A1, A2, B1, B2 };
