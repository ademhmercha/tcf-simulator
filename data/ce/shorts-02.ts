import type { CeShortDocTuple } from "./types";

/** Test 2 : questions courtes A1 -> B2. */
const A1: CeShortDocTuple[] = [
  [
    "Le club de natation",
    "Le club de natation ouvre ses portes le 3 mars. Les cours ont lieu le lundi et le mercredi. Les cours commencent à 18 heures. L'entrée coûte 25 euros par mois.",
    [
      [
        "À quelle heure commencent les cours ?",
        ["À 9 heures", "À 14 heures", "À 18 heures", "À 20 heures"],
        "C",
        "Le document indique que les cours commencent à 18 heures.",
      ],
      [
        "Combien coûte l'entrée par mois ?",
        ["15 euros", "20 euros", "25 euros", "30 euros"],
        "C",
        "Le document indique que l'entrée coûte 25 euros par mois.",
      ],
    ],
  ],
  [
    "Le cinéma Le Palace",
    "Le cinéma Le Palace ouvre à 14 heures. Le film commence à 20 heures 30. Un billet coûte 8 euros. Les enfants de moins de 12 ans paient 4 euros. Le cinéma est fermé le lundi.",
    [
      [
        "À quelle heure commence le film ?",
        ["À 18 heures", "À 19 heures", "À 20 heures 30", "À 21 heures"],
        "C",
        "Le document indique que le film commence à 20 heures 30.",
      ],
      [
        "Combien paie un enfant de 10 ans ?",
        ["4 euros", "6 euros", "8 euros", "Gratuit"],
        "A",
        "Les enfants de moins de 12 ans paient 4 euros.",
      ],
    ],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "La bibliothèque de voyage",
    "La bibliothèque de voyage ouvre en juin. On peut y emprunter des livres, des cartes et des guides. On peut garder les documents un mois. Il faut une carte de lecteur pour emprunter. La bibliothèque ferme au mois d'août.",
    [
      [
        "Que peut-on emprunter ?",
        ["Seulement des livres", "Des livres, des cartes et des guides", "Seulement des cartes", "Des cassettes et des dictionnaires"],
        "B",
        "Le document énumère les livres, les cartes et les guides.",
      ],
      [
        "Que faut-il avoir pour emprunter un document ?",
        ["Une carte de lecteur", "Un passeport", "Une photo", "Rien du tout"],
        "A",
        "Le document précise qu'il faut une carte de lecteur.",
      ],
    ],
  ],
  [
    "La nouvelle gare routière",
    "La gare routière sera déplacée le 12 octobre. Les bus partiront de la place Voltaire. Les horaires ne changent pas. Pendant les travaux, un bus provisoire assurera la liaison. Lesisseur tickets restera valable.",
    [
      [
        "Quand la gare sera-t-elle déplacée ?",
        ["Le 12 septembre", "Le 12 octobre", "Le 20 octobre", "Le 1 novembre"],
        "B",
        "Le document indique que le déplacement aura lieu le 12 octobre.",
      ],
      [
        "Que se passe-t-il pendant les travaux ?",
        [
          "Il n'y a pas de bus",
          "Un bus provisoire assure la liaison",
          "Les bus partent de la gare",
          "Les horaires sont supprimés",
        ],
        "B",
        "Le document indique qu'un bus provisoire assurera la liaison pendant les travaux.",
      ],
    ],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le marché bio du vendredi",
    "Le marché bio ouvre le vendredi de 16 heures à 20 heures, sur la place Jean-Jaurès. Douze producteurs viennent chaque semaine. Les produits sont vendus dans des cagettes consignées. Il faut ramener la cagette la semaine suivante.",
    [
      [
        "Quand le marché bio est-il ouvert ?",
        ["Le vendredi de 16 heures à 20 heures", "Le samedi matin", "Le mercredi soir", "Tous les jours"],
        "A",
        "Le document indique que le marché ouvre le vendredi de 16 heures à 20 heures.",
      ],
      [
        "Combien de producteurs viennent chaque semaine ?",
        ["Trois", "Six", "Douze", "Vingt"],
        "C",
        "Le document précise que douze producteurs viennent chaque semaine.",
      ],
    ],
  ],
  [
    "L'atelier de réparation de vélos",
    "L'atelier de réparation de vélos est ouvert du mardi au samedi. Il répare les vélos. L'accès est gratuit, mais il faut prendre rendez-vous le matin. L'atelier ferme le week-end. Les pièces sont vendues sur place.",
    [
      [
        "Quel est le prix de la réparation ?",
        ["10 euros", "L'accès est gratuit", "20 euros", "5 euros"],
        "B",
        "Le document indique que l'accès à l'atelier est gratuit.",
      ],
      [
        "Que faut-il faire avant de venir ?",
        ["Payer d'avance", "Prendre rendez-vous le matin", "Acheter une pièce", "venir le dimanche"],
        "B",
        "Le document précise qu'il faut prendre rendez-vous le matin.",
      ],
    ],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La nouvelle école maternelle",
    "L'école maternelle a été agrandie l'an dernier. Elle accueille maintenant cent vingt enfants dans six classes. L'extension a coûté deux millions d'euros, pris en charge par la région. La mairie voudrait construire une seconde extension, mais la cour serait alors trop petite. Les enseignants considèrent que le manque d'espace gêne l'activité.",
    [
      [
        "Combien d'enfants l'école accueille-t-elle ?",
        ["Soixante", "Cent", "Cent vingt", "Deux cents"],
        "C",
        "Le document indique que l'école accueille cent vingt enfants.",
      ],
      [
        "Qui a financé l'extension ?",
        ["La commune", "La région", "L'État", "Les parents"],
        "B",
        "Le document précise que la région a pris en charge le coût de l'extension.",
      ],
      [
        "Pourquoi la mairie hésite-t-elle à construire une seconde extension ?",
        [
          "Il n'y a pas assez d'argent",
          "La cour deviendrait trop petite",
          "Les enseignants s'y opposent",
          "La région a refusé ce projet",
        ],
        "B",
        "Le document indique que la cour serait trop petite après une seconde extension.",
      ],
    ],
  ],
  [
    "Le tri des déchets",
    "Le tri des déchets a changé en janvier. Les emballages en plastique sont désormais acceptés dans les bacs jaunes. Le tri du verre reste inchangé. La ville distribue des sacs en tissu loués, qui coûtent quatre euros. Le taux de tri est passé de 29 % à 34 % en un an.",
    [
      [
        "Que peut-on mettre dans le bac jaune ?",
        [
          "Le verre uniquement",
          "Les emballages en plastique",
          "Le papier et le carton",
          "Les déchets de cuisine",
        ],
        "B",
        "Le document indique que les emballages en plastique sont désormais acceptés dans les bacs jaunes.",
      ],
      [
        "Comment le texte présente-t-il le résultat du nouveau tri ?",
        [
          "De façon critique",
          "De façon neutre",
          "Avec un fort enthousiasme",
          "Sans commenter",
        ],
        "B",
        "Le texte donne un chiffre et un constat, sans commentaire de valeur : la présentation est neutre.",
      ],
    ],
  ],
];

export default { A1, A2, B1, B2 };
