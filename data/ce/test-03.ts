import { doc, lines, type CeLongDocument } from "./types";

/** Test 3 : art, environnement, societe. */
const TEST3: CeLongDocument[] = [
  doc(
    "T3-ART1",
    "Le retour du dessin",
    lines(
      "Dans les ateliers d'école d'art, le papier a disparu.",
      "Les étudiants arrivent avec des tablettes, et l'écran a remplacé la feuille.",
      "Un enseignant a décidé, il y a quatre ans, de leur rendre le papier.",
      "« Le papier ne pardonne pas », dit-il. « Un trait faux, on le voit tout de suite.",
      "Sur un écran, on peut tout effacer, tout recommencer. »",
      "À l'ère du tout effaçable, l'impossibilité de corriger",
      "est devenue une denrée rare. »",
      "Le résultat a surpris : les étudiants de première année",
      "dessinent moins vite, mais dessinent autrement.",
      "Ils passent plus de temps à réfléchir avant de commencer.",
      "Aucun n'a demandé à revenir aux tablettes.",
      "Le papier n'a pas disparu ; il est devenu un choix.",
    ),
    [
      [
        [
          "Pourquoi l'enseignant a-t-il rendu le papier aux étudiants ?",
          [
            "Parce qu'il ne pouvait plus équiper la classe",
            "Parce que l'obstacle à corriger lui paraît pédagogique",
            "Parce que les graphiques sont devenus trop complexes",
            "Parce que les étudiants l'avaient demandé",
          ],
          "B",
          "Le texte oppose le papier, où l'erreur est visible, à l'écran, où tout est effaçable.",
        ],
        "C1",
      ],
      [
        [
          "Quel changement l'enseignant a-t-il observé ?",
          [
            "Les étudiants dessinent plus vite",
            "Les étudiants dessinent moins vite mais autrement",
            "Les étudiants dessinent uniquement sur écran",
            "Les étudiants ont abandonné le dessin",
          ],
          "B",
          "Le texte indique que les étudiants dessinent moins vite, mais dessinent autrement.",
        ],
        "C1",
      ],
      [
        [
          "La dernière phrase du texte",
          [
            "signale que le papier est sur le retour",
            "suggère que l'écran avait disparu",
            "critique le choix des étudiants",
            "indique que le papier est devenu interdit",
          ],
          "A",
          "La phrase oppose une disparition à une requalification : le papier a changé de statut.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T3-ENV1",
    "La décharge réemployée",
    lines(
      "La décharge la plus grande d'Europe a fermé il y a cinq ans.",
      "Elle laissait à côté des quartiers entiers pollués.",
      "On aurait pu la laisser en l'état, comme beaucoup d'autres.",
      "Une équipe d'ingénieures a proposé autre chose :",
      "démonter le béton, le trier, le réemployer.",
      "La majorité des gravats ont retrouvé un nouvel emploi : routes, murs, pistes.",
      "Une partie du site accueillera des jardins potagers.",
      "Le procédé n'est pas encore rentable : il coûte plus cher",
      "que l'enfouissement, et une seule usine le pratique.",
      "Mais le bilan carbone de cette usine est trois fois meilleur.",
      "Le projet montre surtout que la démolition n'est pas une fin.",
      "Elle est une occasion, si l'on accepte de la voir autrement.",
    ),
    [
      [
        [
          "Quelle proposition l'équipe d'ingénieures a-t-elle faite ?",
          [
            "De démonter le béton et de le réemployer",
            "De recouvrir la décharge d'un sol imperméable",
            "De compenser les pollutions par des indemnisations",
            "De relocaliser la décharge dans une autre région",
          ],
          "A",
          "Le texte indique que l'équipe a proposé de démonter le béton, de le trier et de le réemployer.",
        ],
        "C1",
      ],
      [
        [
          "Quel obstacle économique l'équipe rencontre-t-elle ?",
          [
            "Le procédé n'est pas rentable à ce jour",
            "Il n'existe pas de marché pour le béton de démolition",
            "L'usine est trop petite pour être rentable",
            "Les collectivités refusent de financer le projet",
          ],
          "A",
          "Le texte précise que le procédé coûte plus cher que l'enfouissement.",
        ],
        "C1",
      ],
      [
        [
          "Le mot « occasion », dans la dernière ligne, est employé pour",
          [
            "souligner que la démolition offre une opportunité si l'on change de regard",
            "indiquer qu'il faut démonter plus vite",
            "contester le bilan carbone annoncé",
            "marquer une opportunité commerciale",
          ],
          "A",
          "La phrase propose une lecture positive de la démolition, à condition de la voir autrement.",
        ],
        "C2",
      ],
    ],
  ),
  doc(
    "T3-SOC1",
    "Le quartier et son nom",
    lines(
      "Le quartier s'appelle aujourd'hui les Hauts-de-Seine.",
      "Il s'appelait, avant, les Chaudières.",
      "Le changement n'a pas été voté à l'unanimité.",
      "Une pétition de 1200 signatures avait été déposée",
      "contre le nouveau nom, choisi par un conseil municipal",
      "qui estimait le nom d'origine « difficile à prononcer ».",
      "Le collectif des signataires n'a pas disparu.",
      "Il a proposé d'installer des signalétiques",
      "qui rappellent l'ancien nom et son histoire.",
      "Le conseil a refusé, en invoquant une règle d'hygiène graphique.",
      "Les signalétiques ont été posées quand même, en mars dernier.",
      "Elles n'ont pas été retirées : le conseil a finalement toléré la démarche.",
    ),
    [
      [
        [
          "Pourquoi la pétition avait-elle été déposée ?",
          [
            "Contre le choix du nouveau nom du quartier",
            "Pour demander un nouveau conseil municipal",
            "Contre une règle d'hygiène graphique",
            "Pour le renommage d'une rue voisine",
          ],
          "A",
          "Le texte indique que 1200 signatures avaient été déposées contre le nouveau nom.",
        ],
        "C1",
      ],
      [
        [
          "Quelle justification le conseil municipal avait-il donnée ?",
          [
            "Le nom d'origine était juridiquement protégé",
            "Le nom d'origine était difficile à prononcer",
            "Les habitants ne connaissaient pas leur quartier",
            "Le nom d'origine ne figurait pas au cadastre",
          ],
          "B",
          "Le texte précise que le conseil estimait le nom d'origine difficile à prononcer.",
        ],
        "C1",
      ],
      [
        [
          "Le conseil municipal refuse d'abord le changement parce qu'il",
          [
            "s'oppose à toute modification du nom",
            "juge que la nouvelle appellation est moins claire",
            "ne dispose d'aucun budget",
            "souhaite consulter la population",
          ],
          "A",
          "Le texte indique que le conseil a d'abord refusé car le nom lui semblait trop long à prononcer.",
        ],
        "C1",
      ],
      [
        [
          "La dernière ligne du texte",
          [
            "annonce la victoire du conseil municipal",
            "suggère une issue pragmatique pour les deux camps",
            "indique une victoire totale du collectif",
            "critique l'action des habitants",
          ],
          "B",
          "Le conseil a toléré la démarche : le texte décrit un compromis, sans vainqueur.",
        ],
        "C2",
      ],
      [
        [
          "Le passage sur l'ancien nom du quartier sert surtout à",
          [
            "expliquer pourquoi les habitants refusent le changement",
            "montrer que la mémoire locale résiste aux décisions administratives",
            "préciser la longueur du nom retenu",
            "justifier le choix de la commission",
          ],
          "B",
          "Le rappel du nom écarté montre que la décision administrative se heurte à un attachement local.",
        ],
        "C2",
      ],
      [
        [
          "La formulation « Tolérer, ce n'est pas cautionner »",
          [
            "distingue deux attitudes proches mais différentes",
            "exprime un désaccord de la commission",
            "résume la position du conseil municipal",
            "introduit un argument juridique",
          ],
          "A",
          "La phrase oppose nettement deux verbes, ce qui permet de définir la position du président de commission.",
        ],
        "C2",
      ],
      [
        [
          "Pourquoi le texte précise-t-il le nombre de signatures ?",
          [
            "Pour montrer que la démarche a recueilli un large soutien",
            "Pour comparer les deux quartiers",
            "Pour indiquer la taille de la commission",
            "Pour dater le vote",
          ],
          "A",
          "La précision chiffrée renforce l'argument du texte, qui présente la demande comme largement partagée.",
        ],
        "C2",
      ],
    ],
  ),
];

export default TEST3;
