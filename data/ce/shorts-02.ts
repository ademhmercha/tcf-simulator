import type { CeShortDocTuple } from "./types";

/** Test 2 : documents courts A1 -> B2 (5 documents par niveau, une question chacun). */
const A1: CeShortDocTuple[] = [
  [
    "Le club de natation",
    "Le club de natation ouvre ses portes le 3 mars. Les cours ont lieu le lundi et le mercredi. Les cours commencent à 18 heures. L'entrée coûte 25 euros par mois.",
    [["À quelle heure commencent les cours ?", ["À 9 heures", "À 14 heures", "À 18 heures", "À 20 heures"], "C", "Le document indique que les cours commencent à 18 heures."]],
  ],
  [
    "Le cinéma Le Palace",
    "Le cinéma Le Palace ouvre à 14 heures. Le film commence à 20 heures 30. Un billet coûte 8 euros. Les enfants de moins de 12 ans paient 4 euros. Le cinéma est fermé le lundi.",
    [["Combien paie un enfant de 10 ans ?", ["4 euros", "6 euros", "8 euros", "Gratuit"], "A", "Les enfants de moins de 12 ans paient 4 euros."]],
  ],
  [
    "La boulangerie",
    "La boulangerie ouvre à 7 heures et ferme à 19 heures 30. Elle ferme le dimanche. Les croissants coûtent 1 euro 20. Le pain est fabriqué sur place.",
    [["Que fabrique la boulangerie sur place ?", ["Des pâtes", "Des pizzas", "Du pain", "Des gâteaux"], "C", "Le document indique que le pain est fabriqué sur place."]],
  ],
  [
    "La Poste",
    "La poste se trouve place de l'Église, ouverte du lundi au vendredi de 9 heures à 18 heures. Elle ferme le week-end. On peut y envoyer des lettres et des colis. L'envoi d'un colis à l'étranger coûte 12 euros.",
    [["Combien coûte l'envoi d'un colis à l'étranger ?", ["6 euros", "9 euros", "12 euros", "18 euros"], "C", "Le document indique que l'envoi d'un colis à l'étranger coûte 12 euros."]],
  ],
  [
    "Le parc municipal",
    "Le parc municipal ferme à 21 heures en été. Il y a des balançoires, une aire de pique-nique et un terrain de basket. Les chiens sont autorisés, mais tenus en laisse. Les jardins sont interdits au public.",
    [["Que doivent faire les chiens dans le parc ?", ["Rester à la maison", "Être tenus en laisse", "Nager librement", "Entrer dans les jardins"], "B", "Le document indique que les chiens sont autorisés mais doivent être tenus en laisse."]],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "La bibliothèque de voyage",
    "La bibliothèque de voyage ouvre en juin. On peut y emprunter des livres, des cartes et des guides. On peut garder les documents un mois. Il faut une carte de lecteur pour emprunter. La bibliothèque ferme au mois d'août.",
    [["Que peut-on emprunter ?", ["Seulement des livres", "Des livres, des cartes et des guides", "Seulement des cartes", "Des cassettes et des dictionnaires"], "B", "Le document énumère les livres, les cartes et les guides."]],
  ],
  [
    "La nouvelle gare routière",
    "La gare routière sera déplacée le 12 octobre. Les bus partiront de la place Voltaire. Les horaires ne changent pas. Pendant les travaux, un bus provisoire assurera la liaison. Les tickets resteront valables.",
    [["Quand la gare sera-t-elle déplacée ?", ["Le 12 septembre", "Le 12 octobre", "Le 20 octobre", "Le 1 novembre"], "B", "Le document indique que le déplacement aura lieu le 12 octobre."]],
  ],
  [
    "Le cours de cuisine",
    "Un cours de cuisine est proposé au centre social, le mardi soir pendant deux mois. Les places sont limitées à douze personnes. Le prix est de 60 euros pour les deux mois. Les ingrédients sont fournis.",
    [["Quel jour le cours a-t-il lieu ?", ["Le mardi", "Le mercredi", "Le samedi", "Le dimanche"], "A", "Le document indique que le cours a lieu le mardi soir."]],
  ],
  [
    "La nouvelle pharmacie",
    "La pharmacie du centre-ville aura une nouvelle adresse à partir du 3 mars. Elle ouvre à 8 heures 30 et ferme à 19 heures 30. Le service de garde est assuré par une autre pharmacie chaque nuit.",
    [["Qui assure le service de garde la nuit ?", ["La pharmacie du centre-ville", "Une autre pharmacie", "La mairie", "Le médecin"], "B", "Le document indique qu'une autre pharmacie assure le service de garde chaque nuit."]],
  ],
  [
    "La randonnée guidée",
    "Une randonnée guidée est organisée samedi prochain, départ à 9 heures du matin. Le parcours fait douze kilomètres. Les participants doivent porter des chaussures adaptées. En cas de pluie, la randonnée est reportée au dimanche.",
    [["Que doit porter chaque participant ?", ["Des chaussures adaptées", "Un maillot de bain", "Un parapluie", "Des gants de neige"], "A", "Le document indique que les participants doivent porter des chaussures adaptées."]],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le marché bio du vendredi",
    "Le marché bio ouvre le vendredi de 16 heures à 20 heures, sur la place Jean-Jaurès. Douze producteurs viennent chaque semaine. Les produits sont vendus dans des cagettes consignées. Il faut ramener la cagette la semaine suivante.",
    [["Combien de producteurs viennent chaque semaine ?", ["Trois", "Six", "Douze", "Vingt"], "C", "Le document précise que douze producteurs viennent chaque semaine."]],
  ],
  [
    "L'atelier de réparation de vélos",
    "L'atelier de réparation de vélos est ouvert du mardi au samedi. Il répare les vélos. L'accès est gratuit, mais il faut prendre rendez-vous le matin. L'atelier ferme le week-end. Les pièces sont vendues sur place.",
    [["Que faut-il faire avant de venir ?", ["Payer d'avance", "Prendre rendez-vous le matin", "Acheter une pièce", "venir le dimanche"], "B", "Le document précise qu'il faut prendre rendez-vous le matin."]],
  ],
  [
    "La bibliothèque numérique",
    "La bibliothèque numérique ouvre ses services le 1er janvier. Elle permet d'emprunter des livres et des documentaires. Les prêts durent trois semaines. Certains ouvrages ne sont accessibles que sur place. Le prêt n'est possible que depuis le centre.",
    [["Où doit-on se trouver pour emprunter un ouvrage numérique ?", ["Chez soi", "Au centre", "À la gare", "N'importe où"], "B", "Le document indique que certains ouvrages ne sont accessibles que sur place et que le prêt se fait depuis le centre."]],
  ],
  [
    "Le centre de santé",
    "Le centre de santé ouvre ses portes du lundi au vendredi, de 8 heures à 17 heures. Les rendez-vous se prennent par téléphone. Le centre propose un service d'interprétation gratuit. Les patients sans rendez-vous sont refusés.",
    [["Comment les rendez-vous sont-ils pris ?", ["Par téléphone", "Sur place", "En ligne uniquement", "Par courrier"], "A", "Le document indique que les rendez-vous se prennent par téléphone."]],
  ],
  [
    "La ludothèque",
    "La ludothèque ouvre ses portes le samedi après-midi, de 14 heures à 18 heures. Elle prête des jeux de société pour enfants et adultes. L'emprunt dure trois semaines. Les jeux sont à rendre avant 18 heures.",
    [["Combien de temps peut-on garder les jeux empruntés ?", ["Trois jours", "Trois semaines", "Trois mois", "Une journée"], "B", "Le document indique que l'emprunt dure trois semaines."]],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La nouvelle école maternelle",
    "L'école maternelle a été agrandie l'an dernier. Elle accueille maintenant cent vingt enfants dans six classes. L'extension a coûté deux millions d'euros, pris en charge par la région. La mairie voudrait construire une seconde extension, mais la cour serait alors trop petite. Les enseignants considèrent que le manque d'espace gêne l'activité.",
    [["Pourquoi la mairie hésite-t-elle à construire une seconde extension ?", ["Il n'y a pas assez d'argent", "La cour deviendrait trop petite", "Les enseignants s'y opposent", "La région a refusé ce projet"], "B", "Le document indique que la cour serait trop petite après une seconde extension."]],
  ],
  [
    "Le tri des déchets",
    "Le tri des déchets a changé en janvier. Les emballages en plastique sont désormais acceptés dans les bacs jaunes. Le tri du verre reste inchangé. La ville distribue des sacs en tissu loués, qui coûtent quatre euros. Le taux de tri est passé de 29 % à 34 % en un an.",
    [["Comment le texte présente-t-il le résultat du nouveau tri ?", ["De façon critique", "De façon neutre", "Avec un fort enthousiasme", "Sans commenter"], "B", "Le texte donne un chiffre et un constat, sans commentaire de valeur : la présentation est neutre."]],
  ],
  [
    "La halle du marché",
    "La halle du marché va être rénovée pendant six mois. Les étals seront fermés pendant les travaux. Un marché provisoire s'installera sur la place, avec uniquement des produits frais. Les prix resteront inchangés pendant la période de transition.",
    [["Que pourra-t-on trouver sur le marché provisoire ?", ["Uniquement des produits frais", "Tous les produits habituels", "Uniquement des vêtements", "Rien du tout"], "A", "Le document indique que le marché provisoire accueillera uniquement des produits frais."]],
  ],
  [
    "L'initiation à l'informatique",
    "Le centre social propose une initiation à l'informatique pour les débutants. Les cours ont lieu une fois par semaine pendant trois mois. Il faut savoir lire et écrire pour suivre la formation. Le matériel est fourni par le centre. Le nombre de places est limité.",
    [["Quelle condition faut-il remplir pour suivre la formation ?", ["Savoir programmer", "Savoir lire et écrire", "Avoir un ordinateur", "Avoir plus de 60 ans"], "B", "Le document précise qu'il faut savoir lire et écrire pour suivre la formation."]],
  ],
  [
    "Le déplacement du marché",
    "Le marché forain quittera la place du Centre à la fin du mois, car il manque de place pour l'y installer. Il sera transféré sur le parking du stade. Les étals seront plus petits. Les prix resteront inchangés.",
    [["Pourquoi le marché quitte-t-il la place du Centre ?", ["Il est trop petit", "Il manque de place", "Il y a trop de circulation", "Les étals ne sont pas conformes"], "B", "Le document indique que le marché quitte la place car il manque de place pour l'installer."]],
  ],
];

export default { A1, A2, B1, B2 };
