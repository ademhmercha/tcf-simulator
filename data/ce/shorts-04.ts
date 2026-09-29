import type { CeShortDocTuple } from "./types";

/** Test 4 : questions courtes A1 -> B2. */
const A1: CeShortDocTuple[] = [
  [
    "L'office de tourisme",
    "L'office de tourisme est ouvert du mardi au samedi. Il ferme le lundi et le dimanche. On peut y obtenir des plans de la ville et des dépliants. Il faut montrer une pièce d'identité pour demander un document. L'office est situé près de la gare.",
    [
      [
        "Quel jour l'office de tourisme est-il fermé ?",
        ["Le lundi", "Le mardi", "Le samedi", "Le dimanche"],
        "A",
        "Le document indique que l'office ferme le lundi et le dimanche.",
      ],
      [
        "Que faut-il montrer pour obtenir un document ?",
        ["Une pièce d'identité", "Un billet de train", "Une photo", "Rien"],
        "A",
        "Le document précise qu'il faut montrer une pièce d'identité.",
      ],
    ],
  ],
  [
    "La gare routière",
    "La gare routière ouvre à 5 heures 30. Le premier bus part à 6 heures. Il y a des bus pour toutes les grandes villes de la région. Les billets s'achètent au guichet ou en ligne. Le dernier bus part à 21 heures.",
    [
      [
        "À quelle heure part le premier bus ?",
        ["À 5 heures 30", "À 6 heures", "À 7 heures", "À 8 heures"],
        "B",
        "Le document indique que la gare ouvre à 5 heures 30 et que le premier bus part à 6 heures.",
      ],
      [
        "Comment peut-on acheter un billet ?",
        ["Au guichet ou en ligne", "Seulement en ligne", "Seulement au guichet", "Dans un magasin"],
        "A",
        "Le document précise que les billets s'achètent au guichet ou en ligne.",
      ],
    ],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "L'atelier de couture",
    "Un atelier de couture ouvre dans le quartier. Il propose des cours pour les débutants, le mardi et le jeudi. Les cours durent deux heures. Il faut apporter son propre tissu. Les inscriptions se font à l'accueil de la mairie, avant le 20 du mois.",
    [
      [
        "Quels jours les cours ont-ils lieu ?",
        ["Le lundi et le mercredi", "Le mardi et le jeudi", "Le samedi", "Tous les jours"],
        "B",
        "Le document indique que les cours ont lieu le mardi et le jeudi.",
      ],
      [
        "Que faut-il apporter ?",
        ["Du tissu", "Une machine", "Des ciseaux", "Un ordinateur"],
        "A",
        "Le document précise qu'il faut apporter son propre tissu.",
      ],
    ],
  ],
  [
    "Le chantier de la rue Centrale",
    "La rue Centrale sera fermée à la circulation à partir du 3 avril. Les commerces resteront ouverts. Il sera possible de marcher dans la rue pendant les travaux. Les bus prendront un autre itinéraire pendant six semaines. Les riverains ont reçu une lettre d'information.",
    [
      [
        "Que restera-t-il possible de faire ?",
        ["Circuler en voiture", "Marcher dans la rue", "Stationner devant les commerces", "Ouvrir la rue la nuit"],
        "B",
        "Le document indique qu'il sera possible de marcher dans la rue pendant les travaux.",
      ],
      [
        "Combien de temps les bus changeront-ils d'itinéraire ?",
        ["Trois semaines", "Six semaines", "Trois mois", "Six mois"],
        "B",
        "Le document précise que les bus prendront un autre itinéraire pendant six semaines.",
      ],
    ],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le festival du cinéma",
    "Le festival du cinéma aura lieu du 12 au 16 mars. Douze films seront projetés. Les séances sont ouvertes à tous, mais il faut réserver sa place. La projection aura lieu au cinéma Le Palace. Le festival est organisé par l'office de tourisme.",
    [
      [
        "Où aura lieu la projection ?",
        ["À la mairie", "Au cinéma Le Palace", "À la salle des fêtes", "À la bibliothèque"],
        "B",
        "Le document indique que la projection aura lieu au cinéma Le Palace.",
      ],
      [
        "Peut-on assister sans réserver ?",
        ["Oui, toujours", "Non, il faut réserver sa place", "Seulement le lundi", "Seulement pour les enfants"],
        "B",
        "Le document précise qu'il faut réserver sa place.",
      ],
    ],
  ],
  [
    "Les jardins de la ville",
    "La ville a créé six jardins partagés. On peut y cultiver des légumes et des fleurs. Les parcelles sont attribuées par tirage au sort. Il faut s'inscrire à la mairie. Les jardins sont ouverts de mai à octobre. L'eau est fournie gratuitement.",
    [
      [
        "Comment obtient-on une parcelle ?",
        ["Par tirage au sort", "En payant le prix fort", "En arrivant le premier", "Avec un permis de construire"],
        "A",
        "Le document indique que les parcelles sont attribuées par tirage au sort.",
      ],
      [
        "Quand les jardins sont-ils ouverts ?",
        ["De janvier à mars", "De mai à octobre", "Toute l'année", "De juin à août"],
        "B",
        "Le document précise que les jardins sont ouverts de mai à octobre.",
      ],
    ],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La maison de quartier",
    "La maison de quartier a été rénovée l'an dernier. Le bâtiment accueillait un local désaffecté depuis douze ans. La ville a investi 800 000 euros, dont la moitié provenant du fonds européen. Le nouveau lieu accueille des cours de langues, un atelier de réparation et une salle’exposition. Le conseil municipal a voté à l'unanimité. Les habitants demandent maintenant une extension du projet.",
    [
      [
        "Depuis combien de temps le local était-il désaffecté ?",
        ["Trois ans", "Douze ans", "Cinq ans", "Vingt ans"],
        "B",
        "Le document indique que le bâtiment accueillait un local désaffecté depuis douze ans.",
      ],
      [
        "D'où provient la moitié du financement ?",
        ["Des habitants", "Du fonds européen", "De l'agence du tourisme", "D'un mécène"],
        "B",
        "Le document précise que la moitié du financement provient du fonds européen.",
      ],
      [
        "Quelle demande les habitants formulent-ils maintenant ?",
        [
          "La fermeture de la maison",
          "L'extension du projet",
          "La baisse du budget",
          "Le départ des enseignants",
        ],
        "B",
        "Le texte indique que les habitants demandent une extension du projet.",
      ],
    ],
  ],
  [
    "La bibliothèque du soir",
    "La bibliothèque ouvre désormais le soir, jusqu'à 21 heures. L'horaire du soir avait été testé pendant six mois. Les prêts ont augmenté de 34 % sur la période. Le personnel estime que l'extension serait lourde \u00e0 g\u00e9rer, faute d'effectif. La mairie doit décider si l'expérience devient permanente.",
    [
      [
        "Combien de temps l'horaire du soir a-t-il été testé ?",
        ["Trois mois", "Six mois", "Un an", "Deux ans"],
        "B",
        "Le document indique que l'horaire a été testé pendant six mois.",
      ],
      [
        "Quel est le point faible signalé par le personnel ?",
        [
          "Le manque de personnel",
          "Le manque de livres",
          "Le coût de l'électricité",
          "La baisse des prêts",
        ],
        "A",
        "Le personnel estime que l'extension serait lourde \u00e0 g\u00e9rer faute d'effectif.",
      ],
    ],
  ],
];

export default { A1, A2, B1, B2 };
