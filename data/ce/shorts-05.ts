import type { CeShortDocTuple } from "./types";

/** Test 5 : questions courtes A1 -> B2. */
const A1: CeShortDocTuple[] = [
  [
    "Le jardin de la ville",
    "Le jardin de la ville est ouvert tous les jours. On y cultive des légumes et des fleurs. Le jardin ferme à la tombée de la nuit. Les animaux ne sont pas autorisés. Un café ouvre ses portes près de l'entrée. Le jardin est situé près de la gare.",
    [
      [
        "Que peut-on faire dans le jardin ?",
        ["Cultiver des légumes et des fleurs", "Jouer au football", "Nager", "Stationner"],
        "A",
        "Le document indique que l'on y cultive des légumes et des fleurs.",
      ],
      [
        "Qu'y a-t-il près de l'entrée du jardin ?",
        ["Un café", "Une piscine", "Une bibliothèque", "Un parking"],
        "A",
        "Le document précise qu'un café ouvre ses portes près de l'entrée.",
      ],
    ],
  ],
  [
    "Les ateliers de bricolage",
    "Les ateliers de bricolage ouvrent le mardi et le jeudi. Les cours commencent à 14 heures. Le nombre de places est limité à dix personnes. Il faut payer 15 euros par séance. Les outils sont fournis par l'atelier.",
    [
      [
        "Combien de personnes peuvent participer ?",
        ["Cinq", "Dix", "Quinze", "Vingt"],
        "B",
        "Le document indique que le nombre de places est limité à dix personnes.",
      ],
      [
        "Combien coûte une séance ?",
        ["5 euros", "10 euros", "15 euros", "Gratuit"],
        "C",
        "Le document précise qu'il faut payer 15 euros par séance.",
      ],
    ],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "La médiathèque",
    "La médiathèque est ouverte du mardi au samedi. Elle ferme le lundi et le dimanche. On y trouve des livres, des disques et des films. Il faut une carte pour emprunter. On peut consulter les journaux sur place. La médiathèque propose des ateliers pour les enfants.",
    [
      [
        "Que peut-on emprunter ?",
        ["Des livres, des disques et des films", "Seulement des livres", "Seulement des journaux", "Des livres et des crayons"],
        "A",
        "Le document énumère les livres, les disques et les films.",
      ],
      [
        "Peut-on consulter les journaux à la maison ?",
        ["Oui, gratuitement", "Non, seulement sur place", "Seulement le samedi", "Seulement avec une carte spéciale"],
        "B",
        "Le document indique que l'on peut consulter les journaux sur place.",
      ],
    ],
  ],
  [
    "Le marché de Noël",
    "Le marché de Noël aura lieu du 12 au 24 décembre, sur la place de l'Église. Une trentaine d'artisans y vendront leurs produits. Il y aura aussi des stands de nourriture. Le marché est ouvert tous les jours de 10 heures à 19 heures. Les enfants entrent gratuitement.",
    [
      [
        "Où aura lieu le marché de Noël ?",
        ["Sur la place de l'Église", "Au parc", "À la gare", "Devant la mairie"],
        "A",
        "Le document indique que le marché aura lieu sur la place de l'Église.",
      ],
      [
        "Qui peut entrer gratuitement ?",
        ["Tout le monde", "Les enfants", "Les personnes âgées", "Les voisins"],
        "B",
        "Le document précise que les enfants entrent gratuitement.",
      ],
    ],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le musée du vélo",
    "Le musée du vélo présente plus de trois cents vélos anciens. La visite dure environ une heure. On y voit des vélos de course, de ville et de course. Un guide explique l'histoire de chaque pièce. Le musée est ouvert le week-end uniquement. L'entrée coûte 6 euros.",
    [
      [
        "Quand le musée est-il ouvert ?",
        ["Tous les jours", "Le week-end uniquement", "Le lundi", "Uniquement en août"],
        "B",
        "Le document indique que le musée est ouvert le week-end uniquement.",
      ],
      [
        "Combien coûte l'entrée ?",
        ["Gratuit", "3 euros", "6 euros", "12 euros"],
        "C",
        "Le document précise que l'entrée coûte 6 euros.",
      ],
    ],
  ],
  [
    "La collecte des meubles",
    "La commune collecte les meubles usagés le premier samedi de chaque mois. Il faut les déposer devant sa maison avant 7 heures. Le camion passe ensuite dans les rues. Les objets trop volumineux ne sont pas acceptés. Le service est gratuit pour les habitants.",
    [
      [
        "Quand la collecte a-t-elle lieu ?",
        ["Chaque samedi", "Le premier samedi du mois", "Le premier jour du mois", "Une fois par an"],
        "B",
        "Le document indique que la collecte a lieu le premier samedi de chaque mois.",
      ],
      [
        "Où faut-il déposer les meubles ?",
        ["À la déchetterie", "Devant sa maison", "À la mairie", "Dans la rue"],
        "B",
        "Le document précise qu'il faut les déposer devant sa maison avant 7 heures.",
      ],
    ],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "L'école de musique",
    "L'école de musique compte 400 élèves, contre 280 il y a cinq ans. Les inscriptions ont augmenté après l'ouverture d'un nouveau bâtiment. L'école propose des cours de jazz, de musique classique et de batterie. La ville finance un tiers du budget. La direction refuse d'augmenter le nombre d'élèves par classe, jugeant le résultat trop juste. Les parents demandent des explications.",
    [
      [
        "Comment le nombre d'élèves a-t-il évolué ?",
        ["Il a diminué", "Il est resté stable", "Il a augmenté", "Il a doublé"],
        "C",
        "Le document indique que l'école compte 400 élèves, contre 280 il y a cinq ans.",
      ],
      [
        "Quelle position défend la direction ?",
        [
          "Une augmentation du nombre d'élèves par classe",
          "Un refus d'augmenter le nombre d'élèves par classe",
          "La fermeture d'un bâtiment",
          "La réduction du budget",
        ],
        "B",
        "La direction refuse d'augmenter le nombre d'élèves par classe, jugeant le résultat trop juste.",
      ],
    ],
  ],
  [
    "La bibliothèque itinérante",
    "La bibliothèque itinérante dessert trois communes rurales. Le bus qui la transporte s'arrête dans chaque village pendant une heure. Les habitants peuvent emprunter jusqu'à quatre ouvrages. Les prêts sont gratuits, et l'inscription demande une simple preuve de domicile. Le service fonctionne depuis dix ans, grâce à des bénévoles et à des dons de livres.",
    [
      [
        "Combien de temps le bus reste-t-il dans chaque village ?",
        ["Une heure", "Deux heures", "Une journée", "Toute la matinée"],
        "A",
        "Le document indique que le bus s'arrête dans chaque village pendant une heure.",
      ],
      [
        "Quelle condition faut-il remplir pour s'inscrire ?",
        [
          "Payer une cotisation",
          "Présenter une preuve de domicile",
          "Habiter dans une des trois communes",
          "Être étudiant",
        ],
        "B",
        "Le document précise que l'inscription demande une simple preuve de domicile.",
      ],
    ],
  ],
  [
    "La plage de l'est",
    "La plage de l'est a été nettoyée par deux cents bénévoles en avril. Le nettoyage avait été reporté deux années de suite faute de volontaires. Cette année, la municipalité a fourni le matériel. Des poubelles ont été installées à l'entrée de la plage. Les bénévoles espèrent que l'opération sera renouvelée chaque printemps.",
    [
      [
        "Pourquoi le nettoyage avait-il été reporté ?",
        [
          "Le manque de bénévoles",
          "Le mauvais temps",
          "Le coût du matériel",
          "L'interdiction de la mairie",
        ],
        "A",
        "Le document indique que le nettoyage a été reporté faute de bénévoles.",
      ],
    ],
  ],
];

export default { A1, A2, B1, B2 };
