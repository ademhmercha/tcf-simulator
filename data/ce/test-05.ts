import { doc, lines, type CeLongDocument } from "./types";

/** Test 5 : art, environnement, societe. */
const TEST5: CeLongDocument[] = [
  doc(
    "T5-ART1",
    "Le roman en courtes pièces",
    lines(
      "Écrire un livre demande de plus en plus de temps.",
      "Le temps d'écriture a triplé en vingt ans.",
      "Les primo-romancières témoignent d'une lenteur qui les décourage.",
      "Les éditeurs ont donc changé de format : moins de pages, plus de ventes.",
      "Un chapitre doit tenir en six lectures de six minutes.",
      "Ces lectures se font dans le métro, entre deux stations.",
      "Cette logique a produit des livres impossibles à suivre.",
      "Elle a aussi produit des livres que l'on lit en une nuit.",
      "Le succès commercial ne garantit pas la qualité littéraire.",
      "Mais il détermine ce qui sera écrit demain.",
      "Le temps long, celui de l'écriture, n'est pas compté.",
      "Seul le temps court, celui de la lecture, l'est.",
    ),
    [
      [
        [
          "Quelle conséquence a la multiplication par trois du temps d'écriture ?",
          [
            "Les écrivains écrivent moins longtemps",
            "Les primo-romancières se découragent",
            "Les lecteurs lisent plus vite",
            "Les éditeurs ont moins de marge",
          ],
          "B",
          "Le texte indique que les primo-romancières témoignent d'une lenteur qui les décourage.",
        ],
        "C1",
      ],
      [
        [
          "Comment les éditeurs ont-ils réagi ?",
          [
            "En allongeant les chapitres",
            "En imposant des formats plus courts",
            "En refusant de publier les primo-romancières",
            "En organisant des conf\u00e9rences de six heures",
          ],
          "B",
          "Le texte indique que les éditeurs ont changé de format pour des livres plus courts.",
        ],
        "C1",
      ],
      [
        [
          "La phrase « le succès commercial ne garantit pas la qualité littéraire »",
          [
            "critique directement les lecteurs",
            "distingue deux logiques de valeur sans les opposer",
            "défend l'éditeur contre l'écrivain",
            "annonce le retour du temps long",
          ],
          "B",
          "La phrase reconnaît deux références distinctes, dont elle ne nie pas la coexistence.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T5-ENV1",
    "La rivière rendue aux poissons",
    lines(
      "La rivière traversait la ville en béton.",
      "On y naviguait en barque jusqu'au milieu des années 1990.",
      "Puis le canal s'est bouché, les poissons ont disparu,",
      "et la ville a baissé les yeux sur un fossé gris.",
      "La déconstruction a commencé il y a huit ans.",
      "Elle a été plus longue et plus coûteuse que la construction.",
      "La rivière n'a pas immédiatement repris ses berges.",
      "Elle a repris son lit lentement, comme une cicatrice.",
      "Aujourd'hui, on y voit des fouines et deux hérons.",
      "Les poissons sont revenus, mais pas ceux d'il y a trente ans.",
      "On a gagné un espace, et perdu un écosystème.",
      "Les urbanistes appellent cela une restauration.",
      "Les associations de riverains appellent cela un retour.",
    ),
    [
      [
        [
          "Qu'a changé la déconstruction de la rivière ?",
          [
            "Elle a rendu un espace aux espèces",
            "Elle a supprimé tous les poissons",
            "Elle a accéléré le retour des poissons",
            "Elle n'a rien changé",
          ],
          "A",
          "Le texte indique qu'on a gagné un espace, malgré la perte d'un écosystème.",
        ],
        "C1",
      ],
      [
        [
          "Comment le texte décrit-il le rythme du retour ?",
          [
            "Rapide et spectaculaire",
            "Lent, comme une cicatrice",
            "Régulier et prévisible",
            "Intermittent et confus",
          ],
          "B",
          "La comparaison avec une cicatrice décrit une reprise progressive.",
        ],
        "C1",
      ],
      [
        [
          "La différence de vocabulaire entre les urbanistes et les associations",
          [
            "trahit un désaccord sur l'ampleur du résultat",
            "reflète deux façons de nommer une même réalité",
            "indique que les associations se trompent",
            "montre que les urbanistes ignorent l'état de la rivière",
          ],
          "B",
          "« restauration » et « retour » désignent le même processus avec deux projections opposées.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T5-SOC1",
    "Le bus de six heures du matin",
    lines(
      "Le bus de six heures passe trois fois par semaine.",
      "Il emporte une vingtaine de personnes : des infirmières, des agents de nettoyage,",
      "et ceux qui commencent à l'aube dans les entrepôts de la périphérie.",
      "Ces personnes ne sont pas des adeptes du ralentissement.",
      "Elles ont choisi cette ligne parce que c'est la seule ligne",
      "dont les horaires correspondent à ceux de leur travail.",
      "La ville a étudié ce bus pendant un an.",
      "Elle cherche à supprimer cette ligne, chaque année, depuis 1998.",
      "Les arguments sont connus : peu de voyageurs, fort coût de revient.",
      "Les arguments des voyageurs sont moins produits.",
      "Aucune étude n'a jamais mesuré ce que représentait cette ligne",
      "pour ceux qui ne pouvaient pas faire autrement.",
    ),
    [
      [
        [
          "Quelle est la situation des voyageurs de cette ligne ?",
          [
            "Ils choisissent cet horaire par commodité",
            "Ils n'ont pas le choix de cet horaire",
            "Ils le préfèrent à une autre ligne",
            "Ils ignorent les horaires de leur travail",
          ],
          "B",
          "Le texte indique que c'est la seule ligne dont les horaires correspondent à ceux du travail.",
        ],
        "C1",
      ],
      [
        [
          "Pourquoi la ville veut-elle supprimer cette ligne ?",
          [
            "Parce que le bus est vieux et pollue",
            "Parce que la ligne est rentable",
            "Parce que la ligne est déficitaire et peu utilisée",
            "Parce que la loi l'impose",
          ],
          "C",
          "Le texte avance l'argument du peu de voyageurs et du fort coût de revient.",
        ],
        "C1",
      ],
      [
        [
          "La phrase « aucune étude n'a jamais mesuré » sert à",
          [
            "accuser la ville d'inaction",
            "montrer qu'un critère de décision fait défaut",
            "proposer une nouvelle méthode de mesure",
            "justifier la suppression du bus",
          ],
          "B",
          "La phrase souligne une absence de données sur un critère qui devrait peser dans la décision.",
        ],
        "C2",
      ],
      [
        [
          "Les revenus locatifs sont présentés comme",
          [
            "une solution définitive au déficit",
            "une ressource complémentaire, loin de couvrir les besoins",
            "la principale ressource de financement",
            "un obstacle à la réalisation du projet",
          ],
          "B",
          "Le texte précise que ces revenus ne couvriraient qu'une petite partie du budget nécessaire.",
        ],
        "C1",
      ],
      [
        [
          "La dernière ligne du texte a une fonction",
          [
            "explicative",
            "conclusive et fermée",
            "suspendante et ouverte",
            "descriptive",
          ],
          "C",
          "Le texte s'interrompt sur une interrogation non résolue, laissant la décision ouverte.",
        ],
        "C2",
      ],
      [
        [
          "La phrase « on ne peut pas à la fois » marque une objection",
          [
            "de principe, avant tout autre argument",
            "portant sur le rapport entre le projet et les moyens disponibles",
            "dirigée contre la personnalité du maire",
            "fondée sur une expérience personnelle",
          ],
          "B",
          "La phrase oppose deux exigences que l'auteur juge incompatibles dans les circonstances décrites.",
        ],
        "C2",
      ],
      [
        [
          "L'opposition entre les deux parties du texte est",
          [
            "juridique",
            "économique",
            "culturelle",
            "idéologique",
          ],
          "B",
          "Les arguments de part et d'autre portent sur les coûts supportés et les recettes attendues.",
        ],
        "C2",
      ],
    ],
  ),
];

export default TEST5;
