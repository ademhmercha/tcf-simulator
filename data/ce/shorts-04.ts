import type { CeShortDocTuple } from "./types";

/** Test 4 : documents courts A1 -> B2 (5 documents par niveau, une question chacun). */
const A1: CeShortDocTuple[] = [
  [
    "L'office de tourisme",
    "L'office de tourisme est ouvert du mardi au samedi. Il ferme le lundi et le dimanche. On peut y obtenir des plans de la ville et des dépliants. Il faut montrer une pièce d'identité pour demander un document. L'office est situé près de la gare.",
    [["Que faut-il montrer pour obtenir un document ?", ["Une pièce d'identité", "Un billet de train", "Une photo", "Rien"], "A", "Le document précise qu'il faut montrer une pièce d'identité."]],
  ],
  [
    "La gare routière",
    "La gare routière ouvre à 5 heures 30. Le premier bus part à 6 heures. Il y a des bus pour toutes les grandes villes de la région. Les billets s'achètent au guichet ou en ligne. Le dernier bus part à 21 heures.",
    [["À quelle heure part le premier bus ?", ["À 5 heures 30", "À 6 heures", "À 7 heures", "À 8 heures"], "B", "Le document indique que le premier bus part à 6 heures."]],
  ],
  [
    "Le commissariat",
    "Le commissariat est ouvert du lundi au vendredi, de 9 heures à 18 heures. Le guichet ferme à 17 heures. Il faut prendre rendez-vous pour certains documents. Le commissariat ferme le week-end. L'accueil des urgences fonctionne 24 heures sur 24.",
    [["Comment sont prises les demandes de documents ?", ["Sur place sans rendez-vous", "Sur rendez-vous", "Par courrier uniquement", "Par téléphone"], "B", "Le document précise qu'il faut prendre rendez-vous pour certains documents."]],
  ],
  [
    "La laverie automatique",
    "La laverie automatique est située rue du Moulin. Elle compte six machines. Une machine coûte 4 euros. Le séchage coûte 2 euros. La laverie est ouverte tous les jours, même le dimanche.",
    [["Combien de machines compte la laverie ?", ["Quatre", "Cinq", "Six", "Huit"], "C", "Le document indique que la laverie compte six machines."]],
  ],
  [
    "Le marché de Noël",
    "Le marché de Noël aura lieu du 20 au 24 décembre, sur la place de l'Église. Il ferme à 19 heures chaque jour. Une trentaine d'artisans y proposent leurs créations.",
    [["À quelle heure ferme le marché chaque jour ?", ["À 18 heures", "À 19 heures", "À 20 heures", "À 21 heures"], "B", "Le document indique que le marché ferme à 19 heures chaque jour."]],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "L'atelier de couture",
    "Un atelier de couture ouvre dans le quartier. Il propose des cours pour les débutants, le mardi et le jeudi. Les cours durent deux heures. Il faut apporter son propre tissu. Les inscriptions se font à l'accueil de la mairie, avant le 20 du mois.",
    [["Que faut-il apporter ?", ["Du tissu", "Une machine", "Des ciseaux", "Un ordinateur"], "A", "Le document précise qu'il faut apporter son propre tissu."]],
  ],
  [
    "Le chantier de la rue Centrale",
    "La rue Centrale sera fermée à la circulation à partir du 3 avril. Les commerces resteront ouverts. Il sera possible de marcher dans la rue pendant les travaux. Les bus prendront un autre itinéraire pendant six semaines. Les riverains ont reçu une lettre d'information.",
    [["Combien de temps les bus changeront-ils d'itinéraire ?", ["Trois semaines", "Six semaines", "Trois mois", "Six mois"], "B", "Le document précise que les bus prendront un autre itinéraire pendant six semaines."]],
  ],
  [
    "La nouvelle aire de jeux",
    "Une nouvelle aire de jeux sera aménagée dans le parc public. Elle sera adaptée aux enfants de 2 à 12 ans. Le chantier débutera après les vacances d'été. Le parc sera partiellement fermé pendant les travaux.",
    [["Pour quels enfants l'aire sera-t-elle adaptée ?", ["De 2 à 12 ans", "De 5 à 10 ans", "De 12 à 18 ans", "Pour tous les âges"], "A", "Le document indique que l'aire sera adaptée aux enfants de 2 à 12 ans."]],
  ],
  [
    "La réservation des salles",
    "Les salles de la maison de quartier peuvent être réservées par les associations. La réservation se fait par téléphone ou par courriel. Elle est gratuite pour les associations. Elle est payante pour les particuliers. Les créneaux sont limits à trois heures.",
    [["Quelle est la durée maximale d'une réservation ?", ["Une heure", "Trois heures", "Six heures", "Une journée"], "B", "Le document précise que les créneaux sont limités à trois heures."]],
  ],
  [
    "La collecte des piles",
    "Une collecte des piles aura lieu le premier samedi de chaque mois, devant la mairie. Les piles doivent être déposées dans un conteneur prévu. Les accumulateurs sont acceptés aussi.",
    [["Où faut-il déposer les piles ?", ["À la déchetterie uniquement", "Dans un conteneur devant la mairie", "Dans une poubelle ordinaire", "Au magasin"], "B", "Le document indique que les piles doivent être déposées dans un conteneur prévu."]],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le festival du cinéma",
    "Le festival du cinéma aura lieu du 12 au 16 mars. Douze films seront projetés. Les séances sont ouvertes à tous, mais il faut réserver sa place. La projection aura lieu au cinéma Le Palace. Le festival est organisé par l'office de tourisme.",
    [["Peut-on assister sans réserver ?", ["Oui, toujours", "Non, il faut réserver sa place", "Seulement le lundi", "Seulement pour les enfants"], "B", "Le document précise qu'il faut réserver sa place."]],
  ],
  [
    "Les jardins de la ville",
    "La ville a créé six jardins partagés. On peut y cultiver des légumes et des fleurs. Les parcelles sont attribuées par tirage au sort. Il faut s'inscrire à la mairie. Les jardins sont ouverts de mai à octobre. L'eau est fournie gratuitement.",
    [["Comment obtient-on une parcelle ?", ["Par tirage au sort", "En payant le prix fort", "En arrivant le premier", "Avec un permis de construire"], "A", "Le document indique que les parcelles sont attribuées par tirage au sort."]],
  ],
  [
    "L'atelier de menuiserie",
    "Un atelier de menuiserie ouvre dans la maison de quartier. Les cours ont lieu le samedi après-midi. Les participants doivent apporter le bois et les outils. Le nombre de places est limité à huit personnes.",
    [["Que doivent apporter les participants ?", ["Le bois", "Le bois et les outils", "Rien", "Un ordinateur"], "B", "Le document indique que les participants doivent apporter le bois et les outils."]],
  ],
  [
    "La station de vélos",
    "Une station de vélos sera installée près de la gare. On pourra y prendre un vélo avec une carte ou un téléphone. La location coûte 2 euros pour une heure. Les vélos sont rendus à l'une des stations du centre. Le service fonctionne de 6 heures à 22 heures.",
    [["Combien coûte une heure de location ?", ["2 euros", "5 euros", "8 euros", "Gratuit"], "A", "Le document indique que la location coûte 2 euros pour une heure."]],
  ],
  [
    "L'assemblée générale",
    "L'assemblée générale de l'association se tiendra le 14 décembre à 19 heures, dans la salle communale. Tous les adhérents peuvent y assister. Le rapport moral et le rapport financier seront présentés. Un vote aura lieu pour renouveler le bureau. Les documents sont envoyés par courriel une semaine avant.",
    [["Qui peut assister à l'assemblée générale ?", ["Seulement le bureau", "Tous les adhérents", "Seulement les élus", "Le public uniquement"], "B", "Le document précise que tous les adhérents peuvent y assister."]],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La maison de quartier",
    "La maison de quartier a été rénovée l'an dernier. Le bâtiment accueillait un local désaffecté depuis douze ans. La ville a investi 800 000 euros, dont la moitié provenant du fonds européen. Le nouveau lieu accueille des cours de langues, un atelier de réparation et une salle d'exposition. Le conseil municipal a voté à l'unanimité. Les habitants demandent maintenant une extension du projet.",
    [["Quelle demande les habitants formulent-ils maintenant ?", ["La fermeture de la maison", "L'extension du projet", "La baisse du budget", "Le départ des enseignants"], "B", "Le texte indique que les habitants demandent une extension du projet."]],
  ],
  [
    "La bibliothèque du soir",
    "La bibliothèque ouvre désormais le soir, jusqu'à 21 heures. L'horaire du soir avait été testé pendant six mois. Les prêts ont augmenté de 34 % sur la période. Le personnel estime que l'extension serait lourde à gérer, faute d'effectif. La mairie doit décider si l'expérience devient permanente.",
    [["Quel est le point faible signalé par le personnel ?", ["Le manque de personnel", "Le manque de livres", "Le coût de l'électricité", "La baisse des prêts"], "A", "Le personnel estime que l'extension serait lourde à gérer faute d'effectif."]],
  ],
  [
    "La nouvelle médiathèque",
    "La médiathèque actuelle ferme à la fin du mois. Elle sera transférée dans un bâtiment plus grand, ouvert 7 jours sur 7. Le prêt sera prolongé à un mois. Les horaires d'ouverture ont été élargis.",
    [["Quelle sera la durée maximale d'un prêt ?", ["Trois semaines", "Un mois", "Trois mois", "Six mois"], "B", "Le document indique que le prêt sera prolongé à un mois."]],
  ],
  [
    "La tarification du théâtre",
    "Le théâtre municipal a modifié sa grille tarifaire. Le prix des places varie désormais selon la catégorie de la place. Le tarif réduit s'applique aux étudiants et aux seniors. Ces changements font l'objet d'un débat au conseil municipal.",
    [["Comment le prix des places est-il désormais fixé ?", ["Toujours de la même façon", "Selon la catégorie de la place", "Selon l'âge du spectateur uniquement", "Au hasard"], "B", "Le document indique que le prix des places varie désormais selon la catégorie de la place."]],
  ],
  [
    "La requalification du centre-ville",
    "Le centre-ville fait l'objet d'une étude qui pourrait modifier la circulation. L'étude propose de supprimer le stationnement de surface afin d'agrandir la zone piétonne. Le projet sera soumis au vote des élus. Les commerçants demandent un délai de transition.",
    [["Que propose l'étude sur le centre-ville ?", ["De supprimer les parkings", "De supprimer le stationnement de surface et d'agrandir la zone piétonne", "De construire un nouveau pont", "De fermer les commerces le week-end"], "B", "L'étude propose de supprimer le stationnement de surface afin d'agrandir la zone piétonne."]],
  ],
];

export default { A1, A2, B1, B2 };
