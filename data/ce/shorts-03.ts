import type { CeShortDocTuple } from "./types";

/** Test 3 : questions courtes A1 -> B2. */
const A1: CeShortDocTuple[] = [
  [
    "Le cabinet du docteur Léon",
    "Le cabinet du docteur Léon est ouvert du lundi au vendredi. Le médecin reçoit les patients de 9 heures à 12 heures. L'après-midi, il visite les patients à domicile. Il faut prendre rendez-vous par téléphone. Le cabinet ferme le week-end.",
    [
      [
        "Quand le cabinet est-il ouvert ?",
        ["Du lundi au vendredi", "Du lundi au samedi", "Tous les jours", "Seulement le matin"],
        "A",
        "Le document indique que le cabinet est ouvert du lundi au vendredi.",
      ],
      [
        "Que fait le médecin l'après-midi ?",
        ["Il reçoit les patients", "Il visite les patients à domicile", "Il ferme le cabinet", "Il travaille à l'hôpital"],
        "B",
        "Le document précise qu'il visite les patients à domicile l'après-midi.",
      ],
    ],
  ],
  [
    "La pharmacie du centre",
    "La pharmacie du centre ouvre à 8 heures 30. Elle ferme le samedi à 19 heures. Le dimanche, la pharmacie est fermée. La pharmacienne prépare les commandes le lundi. Les clients peuvent acheter du matériel médical.",
    [
      [
        "À quelle heure ferme la pharmacie le samedi ?",
        ["À 18 heures", "À 19 heures", "À 20 heures", "À 21 heures"],
        "B",
        "Le document indique que la pharmacie ferme le samedi à 19 heures.",
      ],
      [
        "Que prépare la pharmacienne le lundi ?",
        ["Les commandes", "Le stock", "Les factures", "Les horaires"],
        "A",
        "Le document précise que la pharmacienne prépare les commandes le lundi.",
      ],
    ],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "Le spectacle de marionnettes",
    "Un spectacle de marionnettes sera donné samedi à 16 heures, à la salle des fêtes. Le spectacle dure 45 minutes. Il est destiné aux enfants de plus de 4 ans. Les places sont gratuites, mais il faut réserver au bureau de la mairie. La salle est accessible aux personnes à mobilité réduite.",
    [
      [
        "Où aura lieu le spectacle ?",
        ["À l'école", "À la salle des fêtes", "Au théâtre municipal", "À la médiathèque"],
        "B",
        "Le document indique que le spectacle aura lieu à la salle des fêtes.",
      ],
      [
        "Que faut-il faire pour assister au spectacle ?",
        ["Payer 10 euros", "Réserver au bureau de la mairie", "Apporter un billet", "Rien, c'est libre"],
        "B",
        "Le document précise qu'il faut réserver au bureau de la mairie.",
      ],
    ],
  ],
  [
    "La nouvelle borne de recharge",
    "Une borne de recharge pour vélos électriques sera installée place du Marché. Elle fonctionne avec une carte ou une application. La recharge est gratuite pendant une heure. La borne sera opérationnelle dès le 15 du mois. Les vélos doivent être attachés à gauche.",
    [
      [
        "Comment fonctionne la borne ?",
        ["Avec une pièce", "Avec une carte ou une application", "Avec un code", "Avec une pièce et un téléphone"],
        "B",
        "Le document indique que la borne fonctionne avec une carte ou une application.",
      ],
      [
        "Combien de temps la recharge est-elle gratuite ?",
        ["Trente minutes", "Une heure", "Deux heures", "Toute la journée"],
        "B",
        "Le document précise que la recharge est gratuite pendant une heure.",
      ],
    ],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le festival de théâtre",
    "Le festival de théâtre aura lieu du 2 au 8 juin. Douze compagnies présenteront leurs spectacles. La plupart des représentations sont gratuites. Deux spectacles sont payants, à 12 euros. Les réservations sont possibles en ligne depuis lundi.",
    [
      [
        "Combien de jours dure le festival ?",
        ["Trois jours", "Une semaine", "Deux semaines", "Un mois"],
        "B",
        "Le festival se déroule du 2 au 8 juin, soit une semaine.",
      ],
      [
        "Combien de spectacles sont payants ?",
        ["Aucun", "Un", "Deux", "Douze"],
        "C",
        "Le document indique que deux spectacles sont payants.",
      ],
    ],
  ],
  [
    "Le jardin partagé",
    "Le jardin partagé a été créé en avril sur un terrain municipal. Vingt familles cultivent des légumes. Chaque famille dispose d'une parcelle. Les outils sont communs. Les récoltes sont partagées entre les membres. Le jardin ferme en novembre.",
    [
      [
        "Combien de familles cultivent le jardin ?",
        ["Cinq", "Dix", "Vingt", "Cinquante"],
        "C",
        "Le document indique que vingt familles cultivent des légumes.",
      ],
      [
        "Que se passe-t-il quand le jardin ferme ?",
        [
          "On peut continuer tout l'hiver",
          "Il ferme en novembre",
          "Il ferme en avril",
          "Il n'y a pas de date de fermeture",
        ],
        "B",
        "Le document précise que le jardin ferme en novembre.",
      ],
    ],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La Halle de marché",
    "La halle de marché, construite en 1892, sera rénovée à partir de septembre. Les floristes seront déplacés dans un bâtiment provisoire. Le marché de samedi restera ouvert pendant les travaux. La ville veut réduire la facture énergétique du bâtiment. Les habitants de la commune ont demandé un calendrier précis.",
    [
      [
        "Quand commencent les travaux de rénovation ?",
        ["En avril", "En septembre", "En novembre", "En janvier"],
        "B",
        "Le document indique que la rénovation débutera en septembre.",
      ],
      [
        "Que deviennent les floristes pendant les travaux ?",
        ["Ils ferment boutique", "Ils s'installent dans un bâtiment provisoire", "Ils outdoor sur la place", "Ils partagent un camion"],
        "B",
        "Le document indique que les floristes seront déplacés dans un bâtiment provisoire.",
      ],
      [
        "Comment le texte présente-t-il la rénovation ?",
        [
          "Comme une dépense nécessaire",
          "De façon neutre et factuelle",
          "Avec une forte opposition politique",
          "Comme un projet controversé",
        ],
        "B",
        "Le texte expose les faits et les positions sans les commenter : la présentation est neutre.",
      ],
    ],
  ],
  [
    "La bibliothèque numérique",
    "La bibliothèque numérique propose 40 000 ouvrages en accès libre. Il n'est pas nécessaire de créer un compte pour lire. Les utilisateurs qui le souhaitent peuvent conserver leurs favoris, ce qui exige une inscription. Le site a enregistré 200 000 visites en 2024. Le conseil municipal souhaite élargir l'offre.",
    [
      [
        "Peut-on lire sans créer de compte ?",
        ["Non", "Oui", "Seulement pour les enfants", "Seulement le week-end"],
        "B",
        "Le document indique qu'il n'est pas nécessaire de créer un compte pour lire.",
      ],
      [
        "Pourquoi certains visiteurs créent-ils un compte ?",
        [
          "Pour payer moins cher",
          "Pour conserver leurs favoris",
          "Pour télécharger des livres",
          "Pour commenter les ouvrages",
        ],
        "B",
        "Le document précise que l'inscription est nécessaire pour conserver ses favoris.",
      ],
    ],
  ],
];

export default { A1, A2, B1, B2 };
