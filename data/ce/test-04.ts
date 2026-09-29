import { doc, lines, type CeLongDocument } from "./types";

/** Test 4 : art, environnement, societe. */
const TEST4: CeLongDocument[] = [
  doc(
    "T4-ART1",
    "Le musée des sons disparus",
    lines(
      "Un musée a couvert un hangar entier de machines anciennes.",
      "Il y conserve des atmosphères, des bruits de ville, des craquements.",
      "Le principe est simple : enregistrer ce qui n'existe plus.",
      "Avant de disparaître, un métier voyait ses gestes filmés et notés.",
      "Des visiteurs sont venus de partout écouter ces bandes.",
      "La plupart découvrent des sons qu'ils n'avaient jamais entendus.",
      "« Je croyais connaître ma rue », a dit une visiteuse.",
      "Le musée ne prétend pas reconstruire le passé.",
      "Il montre seulement ce qu'il advient quand on oublie d'écouter.",
      "Chaque salle est insonorisée, et pourtant tout s'entend d'une pièce à l'autre.",
      "C'est le reproche que les spécialistes adressent au lieu.",
      "Sans doute le seul endroit où l'on vient chercher du silence.",
    ),
    [
      [
        [
          "Quel est le principe du musée ?",
          [
            "Enregistrer des sons qui ont disparu",
            "Restaurer des machines anciennes",
            "Filmer les métiers d'aujourd'hui",
            "Préserver le silence des villes",
          ],
          "A",
          "Le texte indique que le musée enregistre ce qui n'existe plus.",
        ],
        "C1",
      ],
      [
        [
          "Que ressent la visiteuse citée ?",
          [
            "De la colère",
            "De l'étonnement",
            "De l'indifférence",
            "De la satisfaction",
          ],
          "B",
          "Sa phrase traduit la surprise d'un sonore découvert qu'elle croyait connaître.",
        ],
        "C1",
      ],
      [
        [
          "La dernière phrase du texte est",
          [
            "une critique de l'acoustique du lieu",
            "une conclusion ironique",
            "une information sur le prix de l'entrée",
            "une invitation à venir",
          ],
          "B",
          "Le silence attendu dans un musée de sons constitue une chute ironique.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T4-ENV1",
    "L'étable dans le ciel",
    lines(
      "À quarante kilomètres au nord de la ville,",
      "on a installé une étable en hauteur, quatre étages plus haut.",
      "Les étables sont équipées de panneaux solaires, de precipitateurs",
      "et de bacs de compostage qui tournent en permanence.",
      "L'architecture repose sur un principe : la vache monte, pas l'homme.",
      "Le bétail ne descend que deux fois par jour.",
      "Les monte-charge descendent chargés, les ascenseurs de service montent à vide.",
      "C'est ce qui rend le système rentable : rien ne remonte.",
      "La ferme consomme 40 % d'énergie de moins qu'une ferme classique.",
      "Elle produit aussi 30 % de lait en plus.",
      "Le problème n'est pas technique : il est social.",
      "Le métier d'éleveur d'étage n'existe pas encore dans les manuels.",
    ),
    [
      [
        [
          "Sur quel principe repose l'architecture ?",
          [
            "Faire monter le bétail plutôt que faire descendre les humains",
            "Répartir le travail entre plusieurs étages",
            "Utiliser des panneaux solaires",
            "Réduire la taille du troupeau",
          ],
          "A",
          "Le texte énonce le principe : la vache monte, pas l'homme.",
        ],
        "C1",
      ],
      [
        [
          "Pourquoi le système est-il rentable ?",
          [
            "Parce que les monte-charge montent à vide",
            "Parce que rien ne remonte dans les ascenseurs",
            "Parce que la main-d'œuvre est peu nombreuse",
            "Parce que l'énergie solaire est gratuite",
          ],
          "B",
          "Le texte précise que rien ne remonte, ce qui évite les trajets à vide.",
        ],
        "C1",
      ],
      [
        [
          "L'expression « le problème n'est pas technique : il est social » annonce",
          [
            "que l'élevage en hauteur est voué à l'échec",
            "que l'obstacle réside dans l'organisation du travail et des métiers",
            "que les techniques employées sont dépassées",
            "que le financement fait défaut",
          ],
          "B",
          "La mention d'un métier qui n'existe pas encore situe l'obstacle dans l'organisation humaine.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T4-SOC1",
    "Le quartier qui s'école",
    lines(
      "La population de ce quartier a changé en dix ans.",
      "Les ateliers ont fermé, les étudiants sont venus, les loyers ont suivi.",
      "Le centre culturel, fermé depuis 2011, a repris son activité en mai.",
      "Le projet est porté par une coopérative d'habitants.",
      "Elle a racheté l'ancien bâtiment avec un emprunt de la ville.",
      "La ville ne l'a pas fait par principe : le quartier compte deux cent habitants.",
      "Elle a fait un calcul : le quartier produisait trop de surface commerciale.",
      "La coopérative a proposé autre chose.",
      "Elle a offert aux écoles du quartier un lieu, sans payer de loyer.",
      "Le centre accueille des ateliers le matin, des spectacles le soir.",
      "Le soir, il affiche complet plus souvent qu'avant la fermeture.",
      "Reste une question : qui décidera, dans vingt ans, de ce que devient le lieu ?",
    ),
    [
      [
        [
          "Pourquoi la ville a-t-elle soutenu ce projet ?",
          [
            "Parce qu'elle cherchait à remplacer un excès de surface commerciale",
            "Parce que le quartier manquait de services",
            "Parce que le bâtiment était disponible gratuitement",
            "Parce que les habitants l'avaient réclamé il y a dix ans",
          ],
          "A",
          "Le texte indique que la ville voulait remplacer un excès de surface commerciale.",
        ],
        "C1",
      ],
      [
        [
          "Quel rôle joue la coopérative ?",
          [
            "Elle organise les activités du quartier",
            "Elle finance les travaux de rénovation",
            "Elle remplace le conseil municipal",
            "Elle vend le bâtiment à la ville",
          ],
          "A",
          "Le texte décrit la coopérative comme porteuse du projet et organisatrice des activités.",
        ],
        "C1",
      ],
      [
        [
          "La coopérative a obtenu la vente du bâtiment",
          [
            "en obtenant l'accord de la ville",
            "en rassemblant des dons",
            "grâce à une subvention de l'État",
            "après une action judiciaire",
          ],
          "A",
          "Le texte indique que la ville a cédé le bâtiment à la coopérative, qui a payé une somme modérée.",
        ],
        "C1",
      ],
      [
        [
          "La dernière question du texte (« qui décidera, dans vingt ans ? »)",
          [
            "marque une ouverture sur l'incertitude",
            "suggère que la coopérative va disparaître",
            "signale un désaccord entre la ville et les habitants",
            "annonce une future vente du bâtiment",
          ],
          "A",
          "La question finale laisse le devenir du lieu ouvert, sans trancher.",
        ],
        "C2",
      ],
      [
        [
          "Le contraste entre le prêt de vingt ans et l'occupation visée par la coopérative",
          [
            "met en évidence la fragilité du projet",
            "explique l'urgence des travaux",
            "justifie le prix du loyer",
            "montre que la ville refuse de s'engager",
          ],
          "A",
          "La coopérative veut s'installer durablement alors que la ville ne s'engage que pour vingt ans : l'écart souligne la précarité de l'avenir.",
        ],
        "C2",
      ],
      [
        [
          "La réserve formulée par la ville",
          [
            "porte sur un point juridique précis",
            "trahit une opposition politique à la coopérative",
            "exprime une prudence administrative",
            "met en cause le sérieux du projet",
          ],
          "C",
          "La ville évoque une « précaution » liée à la future loi sur les baux, sans s'opposer au projet.",
        ],
        "C2",
      ],
      [
        [
          "Ce que le texte montre surtout, c'est",
          [
            "l'échec d'un projet associatif",
            "la capacité d'un collectif à porter un projet de long terme",
            "l'absence de soutien de la part de la ville",
            "la nécessité de rénover un bâtiment désaffecté",
          ],
          "B",
          "Les actions menées par la coopérative et la conclusion du texte montrent un projet qui surmonte les obstacles.",
        ],
        "C2",
      ],
    ],
  ),
];

export default TEST4;
