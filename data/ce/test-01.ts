import { doc, lines, type CeLongDocument } from "./types";

/** Test 1 : art, environnement, societe. */
const TEST1: CeLongDocument[] = [
  doc(
    "T1-ART1",
    "La copie plutôt que l'original",
    lines(
      "Le musée municipal a choisi de n'exposer plus que des copies.",
      "Les originaux ont été déplacés dans un dépôt à température dirigée.",
      "L'opération a provoqué un scandale, puis une fréquentation record.",
      "La direction assume : « l'original n'est pas plus beau que la copie ».",
      "Elle ajoute : « il est seulement plus vieux, et c'est tout ce qu'on lui demande. »",
      "Les visiteurs sont restés perplexes devant les reproductions.",
      "Ils ne retrouvaient pas les tableaux qu'ils avaient vus en ligne.",
      "« En vrai, dit une visiteuse, on regarde autrement. »",
      "Le musée a installé un écran pour comparer la copie et l'original.",
      "Les deux images sont affichées côte à côte, à la même échelle.",
      "L'écart est minime, et c'est précisément ce qui frappe.",
      "Depuis, le musée prête davantage d'originaux qu'il n'expose de copies.",
    ),
    [
      [
        [
          "Quelle opération le musée a-t-il effectuée ?",
          [
            "Il a remplacé ses originaux par des copies fidèles",
            "Il a vendu ses originaux pour financer le bâtiment",
            "Il a restauré les tableaux sur place",
            "Il a exposé ses originaux dans plusieurs musées",
          ],
          "A",
          "Le texte indique que le musée n'expose plus que des copies des œuvres.",
        ],
        "C1",
      ],
      [
        [
          "Comment les visiteurs ont-ils réagi dans l'ensemble ?",
          [
            "Ils ont approuvé l'opération sans réserve",
            "Ils sont restés perplexes",
            "Ils n'ont rien remarqué",
            "Ils ont exigé le retour des originaux",
          ],
          "B",
          "Le texte indique que les visiteurs sont restés perplexes devant les reproductions.",
        ],
        "C1",
      ],
      [
        [
          "Pourquoi l'écran de comparaison est-il significatif ?",
          [
            "Il rend l'original plus attractif",
            "Il permet de constater que la copie est aussi exacte que l'original",
            "Il confirme que l'original est abîmé",
            "Il montre que la copie est une œuvre différente",
          ],
          "B",
          "La comparaison côte à côte, à la même échelle, souligne l'exactitude de la copie.",
        ],
        "C2",
      ],
      [
        [
          "La dernière ligne du texte",
          [
            "contredit l'argument développé dans le texte",
            "confirme que les originaux n'intéressent plus personne",
            "porte uniquement sur la fréquentation du musée",
            "annonce un retour à l'exposition des originaux",
          ],
          "A",
          "Après l'argument de la copie, la phrase finale réintroduit l'original, ce qui renverse la position défendue.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T1-ENV1",
    "La forêt qui pousse à l'envers",
    lines(
      "À quarante kilomètres de la ville, une forêt de sapins",
      "a changé de direction de croissance en une seule nuit.",
      "Les arbres, âgés de quinze ans, se sont courbés vers le sol,",
      "puis ont repris leur position verticale le lendemain matin.",
      "Le phénomène a été observé dans d'autres régions du monde.",
      "Les botanistes l'expliquent par la sécheresse prolongée :",
      "pour survivre, l'arbre ferme ses stomates, puis redistribue son eau.",
      "Mais la flexibilité du bois des jeunes arbres est aussi en jeu.",
      "Ce qui alarmait les sylviculteurs, ce n'est pas le phénomène lui-même,",
      "mais le fait qu'il s'accélère : en 1980, on recensait un cas par décennie.",
      "Aujourd'hui, on en compte sept par an.",
      "Aucun plan d'action n'a encore été élaboré.",
    ),
    [
      [
        [
          "Quelle explication les botanistes donnent-ils du phénomène ?",
          [
            "Une maladie qui touche les jeunes arbres",
            "La sécheresse prolongée et la redistribution de l'eau",
            "La coupe illégale de la forêt",
            "Un changement de composition du sol",
          ],
          "B",
          "Le texte indique que les botanistes l'expliquent par la sécheresse prolongée.",
        ],
        "C1",
      ],
      [
        [
          "Qu'est-ce qui inquiète les sylviculteurs ?",
          [
            "La disparition complète des sapins",
            "Le coût de la recherche scientifique",
            "L'accélération du phénomène",
            "Le manque de moyens des botanistes",
          ],
          "C",
          "Le texte précise que l'inquiétude porte sur l'accélération, non sur le phénomène lui-même.",
        ],
        "C1",
      ],
      [
        [
          "Que montre le passage de 1980 à aujourd'hui ?",
          [
            "Une baisse du nombre de cas",
            "Une multiplication du nombre de cas",
            "Une stabilisation du phénomène",
            "Une amélioration de la météo",
          ],
          "B",
          "Le texte passe d'un cas par décennie à sept cas par an, ce qui constitue une multiplication.",
        ],
        "C1",
      ],
      [
        [
          "Le mot « stomates » est donné parce que",
          [
            "il explique la souplesse du bois",
            "il rend compte de la manière dont l'arbre économise son eau",
            "il désigne la période de croissance",
            "il nomme l'espèce d'arbre concernée",
          ],
          "B",
          "L'auteur détaille la mécanisme biologique pour étayer l'explication de la sécheresse.",
        ],
        "C1",
      ],
      [
        [
          "On peut déduire de la dernière ligne que",
          [
            "les pouvoirs publics ont décidé d'agir",
            "le problème est majeur mais encore sans réponse",
            "les sylviculteurs ignorent la cause du phénomène",
            "le phénomène a reculé depuis 1980",
          ],
          "B",
          "L'absence de plan d'action indique un problème reconnu mais non traité.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T1-SOC1",
    "La bibliothèque qui se passe de livres",
    lines(
      "La bibliothèque de quartier a fermé ses rayonnages l'an dernier.",
      "Elle n'a pas fermé ses portes : elle a changé de mission.",
      "Le bâtiment accueille des conférences, des cours du soir",
      "et un espace de travail que les étudiants réservent le matin.",
      "Les livres, eux, ont été déplacés dans une annexe excentrique.",
      "La directrice assume ce choix et le défend avec force.",
      "« Un livre demande du temps, et le temps est devenu un luxe »,",
      "explique-t-elle. « Nous préférons supprimer le livre plutôt que",
      "supprimer ceux qui viennent le lire. »",
      "Les habitués, eux, ne sont pas tous d'accord.",
      "Une ancienne retraitée a résumé la situation en une phrase :",
      "« C'est plus accueillant, mais c'est moins une bibliothèque. »",
    ),
    [
      [
        [
          "Pourquoi les livres ont-ils été déplacés ?",
          [
            "Parce que le bâtiment a besoin d'espace",
            "Parce qu'ils étaient humides",
            "Parce que la direction veut réduire les coûts",
            "Parce qu'ils ne sont plus consultés sur place",
          ],
          "A",
          "Le texte indique que l'espace est désormais occupé par des conférences et des cours.",
        ],
        "C1",
      ],
      [
        [
          "Que signifie la formule de la directrice ?",
          [
            "Qu'il faut supprimer les livres",
            "Que lire exige un temps que les habitants n'ont plus",
            "Que les bibliothèques ne servent plus à rien",
            "Que les étudiants perturbent le fonctionnement",
          ],
          "B",
          "La directrice oppose le livre, qui demande du temps, à des habitants dont le temps est devenu rare.",
        ],
        "C2",
      ],
      [
        [
          "Comment l'auteur présente-t-il l'argument de la directrice ?",
          [
            "Comme une conviction personnelle",
            "Comme une position défendue, mais contestée par les habitués",
            "Comme un argument constaté par la recherche",
            "Comme une opinion minoritaire",
          ],
          "B",
          "Le texte rapporte l'argument puis fait entendre une objection par la voix d'une habituée.",
        ],
        "C2",
      ],
      [
        [
          "La réaction de l'ancienne retraitée est surtout",
          [
            "hostile",
            "nuancée",
            "indifférente",
            "enthousiaste",
          ],
          "B",
          "Elle reconnaît un gain tout en signalant une perte : sa réaction est nuancée.",
        ],
        "C2",
      ],
    ],
  ),
];

export default TEST1;
