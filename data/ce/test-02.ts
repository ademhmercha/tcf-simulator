import { doc, lines, type CeLongDocument } from "./types";

/** Test 2 : art, environnement, societe. */
const TEST2: CeLongDocument[] = [
  doc(
    "T2-ART1",
    "L'école des saltimbanques",
    lines(
      "Dans une impasse du quatorzième arrondissement, on entend",
      "tous les matins la même mélodie de tambour.",
      "Elle vient d'une école qui forme de jeunes artistes de rue",
      "depuis quarante ans, dans la plus stricte des economies.",
      "Le hangar n'a ni chauffage ni vitres.",
      "En hiver, les élèves s'entraînent dehors, sur le trottoir.",
      "Le directeur ne voit pas cela comme une contrainte",
      "mais comme une épreuve : « dans la rue, personne ne s'arrête,",
      "personne ne vous applaudit. Vous devez être justes. »",
      "Cinq anciens élèves sont aujourd'hui sur les grandes scènes.",
      "Deux d'entre eux sont interdits de passage dans le pays.",
      "Le directeur garde leurs photos affichees dans l'entrée du hangar.",
    ),
    [
      [
        [
          "Comment le directeur assume-t-il l'absence de chauffage ?",
          [
            "Il la considère comme une épreuve utile",
            "Il finance un chauffage pour le hangar",
            "Il ferme l'école pendant l'hiver",
            "Il déplace les cours à l'intérieur",
          ],
          "A",
          "Le texte indique que le directeur ne voit pas cela comme une contrainte mais comme une épreuve.",
        ],
        "C1",
      ],
      [
        [
          "Quelle qualité le directeur recherche-t-il chez ses élèves ?",
          [
            "Le succès commercial",
            "L'abilité à tenir la scène face à un public indifférent",
            "La maîtrise de plusieurs instruments",
            "La rapidité d'apprentissage",
          ],
          "B",
          "La rue n'offre ni arrêt ni applaudissements : l'exigence porte sur la justesse du jeu.",
        ],
        "C1",
      ],
      [
        [
          "Le sort des deux élèves interdits de passage",
          [
            "renforce la légitimité de l'école",
            "est présenté comme une faiblesse de la formation",
            "suggère que le succès artistique a un coût",
            "explique le manque de moyens du hangar",
          ],
          "A",
          "Le texte associe la réussite artistique à une sanction politique : la légitimité de l'école en sort renforcée.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T2-ENV1",
    "Le pont et le fleuve",
    lines(
      "Ce pont autoroutier, construit en 1974, a traversé la vallée",
      "sans égard pour le paysage ni pour les habitants des berges.",
      "Quarante ans plus tard, une association a proposé sa dépose.",
      "Le collectif a passé dix ans à refaire les études techniques,",
      "et autant de temps à convaincre les élus locaux, sceptiques.",
      "Le projet ne fait pas l'unanimité : les communes voisines",
      "craignent que la route ne trouve pas son nouvel itinéraire.",
      "Un compromis a finalement été trouvé : le pont sera remplacé",
      "par un ouvrage plus étroit, en bois, et la vallée retrouvera son lit.",
      "Les travaux doivent commencer l'an prochain.",
      "Le coût final sera inférieur de quarante pour cent",
      "à celui de la construction initiale.",
    ),
    [
      [
        [
          "Pourquoi ce pont est-il devenu polémique ?",
          [
            "Il est trop petit pour le trafic",
            "Il a été construit sans considération du paysage ni des habitants",
            "Il est illégal depuis sa construction",
            "Il relie deux régions sans raison",
          ],
          "B",
          "Le texte indique que le pont a été construit sans égard pour le paysage ni pour les berges.",
        ],
        "C1",
      ],
      [
        [
          "Qu'est-ce qui a le plus ralenti la négociation ?",
          [
            "Les études techniques de l'association",
            "Le refus des habitants des berges",
            "La scepticité des élus locaux",
            "L'absence de financement",
          ],
          "C",
          "Le texte indique que les élus locaux étaient sceptiques, ce qui a ralenti la négociation.",
        ],
        "C1",
      ],
      [
        [
          "Quel rôle jouent les studies techniques dans le récit ?",
          [
            "Elles sont évoquées comme un obstacle",
            "Elles sont mentionnées pour montrer la durée de la négociation",
            "Elles sont rejetées par les élus",
            "Elles n'apparaissent pas",
          ],
          "B",
          "Le texte leur consacre une ligne entière, ce qui souligne le temps qu'a pris la négociation.",
        ],
        "C1",
      ],
      [
        [
          "L'expression « un ouvrage plus étroit, en bois » suggère",
          [
            "une solution moins coûteuse et mieux intégrée",
            "un ouvrage de même gabarit",
            "un ouvrage provisoire",
            "un ouvrage imposé par la loi",
          ],
          "A",
          "Les deux adjectifs désignent un ouvrage réduit et d'un matériau plus léger, donc moins coûteux et mieux accepté.",
        ],
        "C1",
      ],
      [
        [
          "La dernière ligne du texte sert principalement à",
          [
            "critiquer le coût du projet",
            "montrer que le projet est plus raisonnable qu'on ne le pensait",
            "contester le choix du bois",
            "préciser la durée des travaux",
          ],
          "B",
          "Un coût inférieur de quarante pour cent relativise les craintes initiales sur la faisabilité.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T2-SOC1",
    "La place du marché",
    lines(
      "Le marché de la place s'est tenu le samedi matin",
      "et le mercredi après-midi. Il existe depuis 1953.",
      "Le samedi, les étals se disputent la place, et la poussière vole.",
      "Depuis 2018, la municipalité a voulu ajouter un marché bio le vendredi.",
      "Les commerçants de longue date ont vu l'idée comme une menace.",
      "« Le public ne vient pas pour des légumes bio, il vient pour le prix »,",
      "a répondu l'un d'eux. « Et il n'a pas changé. »",
      "La mairie a donc retiré sa proposition, puis l'a redéposée trois mois plus tard,",
      "en réduisant de moitié la surface accordée.",
      "Le marché du vendredi existe aujourd'hui.",
      "Il occupe un quart de l'espace, et deux commerçants y vendent.",
      "Le reste de la surface est toujours partagé par les étals du samedi.",
    ),
    [
      [
        [
          "Comment la mairie a-t-elle réagi à l'opposition des commerçants ?",
          [
            "Elle a abandonné définitivement son projet",
            "Elle a maintenu son projet à moitié",
            "Elle a augmenté la surface accordée",
            "Elle a changé de jour pour le marché",
          ],
          "B",
          "Le texte indique que la proposition a été redéposée avec une surface réduite de moitié.",
        ],
        "C1",
      ],
      [
        [
          "Que soutient le commerçant dans sa réponse ?",
          [
            "Que le public cherche uniquement la qualité biologique",
            "Que les pratiques du public n'ont pas changé",
            "Que le marché du vendredi ne sera pas rentable",
            "Que la mairie a raison de proposer un marché bio",
          ],
          "B",
          "Le commerçant oppose le discours sur la qualité à une réalité qu'il juge inchangée.",
        ],
        "C2",
      ],
      [
        [
          "La structure du texte (projet, opposition, compromis) sert à",
          [
            "chroniquer les événements jour par jour",
            "montrer qu'un conflit local peut se résoudre par aménagement",
            "dénoncer l'action de la mairie",
            "comparer deux marchés de villes différentes",
          ],
          "B",
          "Le récit aboutit à un compromis, ce qui illustre une résolution pragmatique du conflit.",
        ],
        "C2",
      ],
      [
        [
          "L'attitude du commerçant évolue surtout parce qu'il",
          [
            "découvre que la mairie a raison sur le fond",
            "tient à préserver une clientèle qui risquerait de partir",
            "est convaincu par l'argument sur la qualité des produits",
            "reçoit une compensation financière",
          ],
          "B",
          "Il annonce songer à laisser un rayon bio, ce qui trahit une préoccupation commerciale avant tout.",
        ],
        "C2",
      ],
      [
        [
          "On peut déduire de l'ensemble du texte que",
          [
            "le marché bio est condamné à disparaître",
            "la répartition des tâches décidée par le compromis reste le cœur du marché",
            "les deux parties continuent de s'opposer",
            "la mairie a entièrement renoncé à son projet",
          ],
          "B",
          "Le texte se termine sur une répartition des tâches, ce qui indique que le dispositif trouvé reste le cœur du marché.",
        ],
        "C2",
      ],
    ],
  ),
];

export default TEST2;
