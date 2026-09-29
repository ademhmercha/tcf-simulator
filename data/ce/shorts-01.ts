import type { CeShortDocTuple } from "./types";

/** Test 1 : questions courtes A1 -> B2 (17 questions sur 8 documents). */
const A1: CeShortDocTuple[] = [
  [
    "La laverie",
    "La laverie est ouverte du lundi au samedi, de 7 heures à 21 heures. Elle ferme le dimanche. Une machine coûte 4 euros. Le séchage du linge coûte 2 euros.",
    [
      [
        "Quand la laverie ferme-t-elle ?",
        ["Le dimanche", "Le lundi", "Le samedi", "À 21 heures"],
        "A",
        "Le document indique que la laverie ferme le dimanche.",
      ],
      [
        "Combien coûte une machine ?",
        ["2 euros", "3 euros", "4 euros", "5 euros"],
        "C",
        "Une machine coûte 4 euros ; le séchage coûte 2 euros.",
      ],
    ],
  ],
  [
    "Le marché du samedi",
    "Le marché a lieu le samedi matin sur la place du Parc. Madame Roy y vend des légumes. Elle ferme à midi. Il faut apporter un sac.",
    [
      [
        "Où a lieu le marché ?",
        ["À la gare", "Sur la place du Parc", "Au bord de la mer", "À la mairie"],
        "B",
        "Le document indique que le marché a lieu sur la place du Parc.",
      ],
      [
        "Que vend Madame Roy ?",
        ["Des livres", "Des légumes", "Des vêtements", "Des voitures"],
        "B",
        "Le document précise que Madame Roy vend des légumes.",
      ],
    ],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "Le stage de théâtre",
    "Le théâtre municipal propose un stage d'acteurs tous les mercredis soirs, pendant trois mois. Le stage coûte 60 euros. Il faut s'inscrire avant le 10 septembre. Il reste encore quelques places.",
    [
      [
        "À quelle fréquence ont lieu les cours ?",
        ["Tous les mercredis", "Tous les lundis", "Le samedi", "Une fois par mois"],
        "A",
        "Le document indique que les cours ont lieu tous les mercredis soirs.",
      ],
      [
        "Que faut-il faire avant le 10 septembre ?",
        ["Payer le stage", "S'inscrire", "Acheter un livre", "Envoyer une lettre"],
        "B",
        "Le document précise qu'il faut s'inscrire avant cette date.",
      ],
    ],
  ],
  [
    "La panne de l'ascenseur",
    "L'ascenseur de l'immeuble est en panne depuis lundi. Les réparateurs viennent jeudi entre 9 heures et 12 heures. Les habitants âgés doivent prendre l'escalier. L'entreprise s'excuse pour la gêne occasionnée.",
    [
      [
        "Depuis quand l'ascenseur est-il en panne ?",
        ["Depuis lundi", "Depuis jeudi", "Depuis ce matin", "Depuis un mois"],
        "A",
        "Le document indique que la panne dure depuis lundi.",
      ],
      [
        "Que doivent faire les habitants âgés ?",
        ["Attendre jeudi", "Prendre l'escalier", "Appeler un taxi", "Dormir chez un voisin"],
        "B",
        "Le document précise que les habitants âgés doivent prendre l'escalier.",
      ],
    ],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "La nouvelle bibliothèque",
    "La bibliothèque municipale a été inaugurée en mars. Elle propose 40 000 ouvrages, un espace de lecture silencieux et deux salles de travail. On peut garder un ouvrage trois semaines. Elle est ouverte six jours sur sept.",
    [
      [
        "Combien de temps peut-on garder un ouvrage ?",
        ["Trois semaines", "Trois mois", "Trois jours", "Six semaines"],
        "A",
        "Le document indique qu'on peut garder un ouvrage trois semaines.",
      ],
      [
        "Qu'apporte le nouveau bâtiment ?",
        [
          "Il est plus petit que le précédent",
          "Un espace de lecture silencieux et des salles de travail",
          "Il n'a plus d'ouvrages",
          "Il ferme pendant le week-end",
        ],
        "B",
        "Le document présente l'espace de lecture et les salles de travail comme des nouveautés.",
      ],
    ],
  ],
  [
    "Le forum des associations",
    "Le forum des associations aura lieu samedi 14 septembre, de 10 heures à 18 heures, dans le gymnase. Plus de cinquante associations y seront présentes. L'entrée est gratuite, mais il faut s'inscrire à l'accueil pour obtenir un badge.",
    [
      [
        "Où aura lieu le forum ?",
        ["Dans le gymnase", "Sur la place du Parc", "À la mairie", "À la bibliothèque"],
        "A",
        "Le document indique que le forum aura lieu dans le gymnase.",
      ],
      [
        "Que faut-il faire pour entrer ?",
        ["Payer 5 euros", "Obtenir un badge à l'accueil", "Apporter une pièce d'identité", "Rien, l'entrée est libre"],
        "B",
        "Le document précise qu'il faut s'inscrire à l'accueil pour obtenir un badge.",
      ],
    ],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La piscine municipale",
    "Le conseil municipal a voté la fermeture de la piscine pour une rénovation de trois ans. Les écoles proposeront des cours de nage au centre aquatique régional, situé à douze kilomètres. Certains habitants craignent que ce déplacement ne soit trop long pour les enfants.",
    [
      [
        "Pourquoi la piscine ferme-t-elle ?",
        ["Pour une rénovation de trois ans", "Pour un manque de fréquentation", "Parce qu'elle est trop petite", "Pour des raisons économiques"],
        "A",
        "Le document indique que la fermeture est liée à une rénovation de trois ans.",
      ],
      [
        "Où les élèves nageront-ils ?",
        ["Dans une piscine privée", "Au centre aquatique régional", "Dans la même piscine", "Chez eux"],
        "B",
        "Le document indique que les cours se feront au centre aquatique régional.",
      ],
      [
        "Quelle crainte expriment les habitants ?",
        ["Le prix du transport", "La distance pour les enfants", "La fermeture du centre", "Le manque d'enseignants"],
        "B",
        "Le document signale la crainte que le déplacement soit trop long pour les enfants.",
      ],
    ],
  ],
  [
    "Le compostage",
    "Depuis avril, les habitants trient leurs déchets organiques dans des bacs verts installés dans chaque rue. Le compost produit est redistribué aux jardins des écoles. Le dispositif a réduit de 18 % le volume de la poubelle grise. Certains riverains jugent l'odeur désagréable.",
    [
      [
        "Que fait-on du compost produit ?",
        ["On le distribue aux jardins des écoles", "On le brûle", "On le jette à la décharge", "On l'utilise pour les poubelles"],
        "A",
        "Le document indique que le compost est redistribué aux jardins des écoles.",
      ],
      [
        "Quel problème reste malgré les réussites ?",
        ["Le manque de bacs", "L'odeur des bacs", "Le coût de la collecte", "Le refus de la mairie"],
        "B",
        "Le document signale que certains riverains jugent l'odeur désagréable.",
      ],
    ],
  ],
];

export default { A1, A2, B1, B2 };
