import type { CeShortDocTuple } from "./types";

/** Test 1 : documents courts A1 -> B2 (5 documents par niveau, une question chacun). */
const A1: CeShortDocTuple[] = [
  [
    "La laverie",
    "La laverie est ouverte du lundi au samedi, de 7 heures à 21 heures. Elle ferme le dimanche. Une machine coûte 4 euros. Le séchage du linge coûte 2 euros.",
    [["Quand la laverie ferme-t-elle ?", ["Le dimanche", "Le lundi", "Le samedi", "À 21 heures"], "A", "Le document indique que la laverie ferme le dimanche."]],
  ],
  [
    "Le marché du samedi",
    "Le marché a lieu le samedi matin sur la place du Parc. Madame Roy y vend des légumes. Elle ferme à midi. Il faut apporter un sac.",
    [["Que vend Madame Roy ?", ["Des livres", "Des légumes", "Des vêtements", "Des voitures"], "B", "Le document précise que Madame Roy vend des légumes."]],
  ],
  [
    "La garderie",
    "La garderie ouvre à 8 heures et ferme à 18 heures. Elle accueille les enfants de 2 à 5 ans. Le tarif est de 3 euros par heure. Les parents doivent venir chercher leur enfant avant 18 heures.",
    [["À quelle heure la garderie ferme-t-elle ?", ["À 17 heures", "À 18 heures", "À 19 heures", "À 20 heures"], "B", "Le document indique que la garderie ferme à 18 heures."]],
  ],
  [
    "Le bureau de poste",
    "Le bureau de poste se trouve au 12 rue des Lilas. Il ouvre du lundi au vendredi, de 9 heures à 17 heures. Le samedi, il ouvre seulement le matin. Il ferme le dimanche et le lundi matin.",
    [["Quand le bureau de poste ferme-t-il le lundi ?", ["À 17 heures", "À 9 heures", "À 12 heures", "Le lundi il est ouvert"], "B", "Le document précise qu'il ferme le lundi matin, donc à 9 heures."]],
  ],
  [
    "La piscine",
    "La piscine ouvre en mai. Elle ferme en septembre. Un adulte paie 4 euros. Un enfant de moins de 12 ans paie 2 euros.",
    [["Combien paie un adulte pour entrer ?", ["2 euros", "3 euros", "4 euros", "5 euros"], "C", "Le document indique qu'un adulte paie 4 euros."]],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "Le stage de théâtre",
    "Le théâtre municipal propose un stage d'acteurs tous les mercredis soirs, pendant trois mois. Le stage coûte 60 euros. Il faut s'inscrire avant le 10 septembre. Il reste encore quelques places.",
    [["Que faut-il faire avant le 10 septembre ?", ["Payer le stage", "S'inscrire", "Acheter un livre", "Envoyer une lettre"], "B", "Le document précise qu'il faut s'inscrire avant cette date."]],
  ],
  [
    "La panne de l'ascenseur",
    "L'ascenseur de l'immeuble est en panne depuis lundi. Les réparateurs viennent jeudi entre 9 heures et 12 heures. Les habitants âgés doivent prendre l'escalier. L'entreprise s'excuse pour la gêne occasionnée.",
    [["Que doivent faire les habitants âgés ?", ["Attendre jeudi", "Prendre l'escalier", "Appeler un taxi", "Dormir chez un voisin"], "B", "Le document précise que les habitants âgés doivent prendre l'escalier."]],
  ],
  [
    "La bibliothèque d'été",
    "La bibliothèque ouvre un espace de lecture sur la terrasse pendant l'été. Ce nouvel espace est ouvert de 10 heures à 19 heures. On peut y consulter les journaux du matin. La terrasse sera fermée en cas de pluie.",
    [["Que pourra-t-on consulter dans cet espace ?", ["Des romans", "Les journaux du matin", "Des films", "Des partitions"], "B", "Le document indique qu'on peut y consulter les journaux du matin."]],
  ],
  [
    "L'atelier de bricolage",
    "Un atelier de bricolage est proposé au centre social, chaque samedi de 9 heures à 12 heures. Les participants doivent apporter leur propre matériel. Le nombre de places est limité à dix personnes.",
    [["Que doivent apporter les participants ?", ["Le matériel", "Un pique-nique", "Un ordinateur", "Une carte d'invitation"], "A", "Le document précise que les participants doivent apporter leur propre matériel."]],
  ],
  [
    "La collecte des cartons",
    "La commune organise une collecte des cartons le premier mardi de chaque mois. Les cartons doivent être pliés et empilés devant votre maison. Ils ne sont pas ramassés le jour même. Le camion passe le lendemain matin.",
    [["Quand le camion passe-t-il ?", ["Le premier mardi", "La veille au soir", "Le lendemain matin", "À la fin du mois"], "C", "Le document indique que le camion passe le lendemain matin."]],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "La nouvelle bibliothèque",
    "La bibliothèque municipale a été inaugurée en mars. Elle propose 40 000 ouvrages, un espace de lecture silencieux et deux salles de travail. On peut garder un ouvrage trois semaines. Elle est ouverte six jours sur sept.",
    [["Qu'apporte le nouveau bâtiment ?", ["Il est plus petit que le précédent", "Un espace de lecture silencieux et des salles de travail", "Il n'a plus d'ouvrages", "Il ferme pendant le week-end"], "B", "Le document présente l'espace de lecture et les salles de travail comme des nouveautés."]],
  ],
  [
    "Le forum des associations",
    "Le forum des associations aura lieu samedi 14 septembre, de 10 heures à 18 heures, dans le gymnase. Plus de cinquante associations y seront présentes. L'entrée est gratuite, mais il faut s'inscrire à l'accueil pour obtenir un badge.",
    [["Que faut-il faire pour entrer ?", ["Payer 5 euros", "Obtenir un badge à l'accueil", "Apporter une pièce d'identité", "Rien, l'entrée est libre"], "B", "Le document précise qu'il faut s'inscrire à l'accueil pour obtenir un badge."]],
  ],
  [
    "Le marché des producteurs",
    "Le marché des producteurs se tient le deuxième samedi de chaque mois, sur le parking du stade. Une trentaine de producteurs y proposent légumes, fromages et charcuteries.",
    [["Où se tient ce marché ?", ["Sur le parking du stade", "Dans le gymnase", "Sur la place du Parc", "À la mairie"], "A", "Le document indique que le marché se tient sur le parking du stade."]],
  ],
  [
    "La radio associative",
    "La radio associative émet depuis le centre social, tous les mercredis soirs. Les habitants peuvent proposer des émissions. Les enregistrements restent en archive sur le site de la radio. La rédaction compte une dizaine de bénévoles.",
    [["Qui prépare les émissions ?", ["Des bénévoles", "Des journalistes professionnels uniquement", "La mairie", "Les écoles"], "A", "Le document indique que la rédaction compte une dizaine de bénévoles."]],
  ],
  [
    "Le jardin partagé",
    "Le jardin partagé a été créé en avril sur une parcelle auparavant inutilisée. Chaque famille dispose d'une parcelle de vingt mètres carrés. Les récoltes sont partagées entre les jardiniers. L'eau d'arrosage provient d'un récupérateur de pluie.",
    [["D'où vient l'eau d'arrosage ?", ["D'un forage", "D'un récupérateur de pluie", "Du réseau public", "D'une rivière proche"], "B", "Le document indique que l'eau provient d'un récupérateur de pluie."]],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La piscine municipale",
    "Le conseil municipal a voté la fermeture de la piscine pour une rénovation de trois ans. Les écoles proposeront des cours de nage au centre aquatique régional, situé à douze kilomètres. Certains habitants craignent que ce déplacement ne soit trop long pour les enfants.",
    [["Quelle crainte expriment les habitants ?", ["Le prix du transport", "La distance pour les enfants", "La fermeture du centre", "Le manque d'enseignants"], "B", "Le document signale la crainte que le déplacement soit trop long pour les enfants."]],
  ],
  [
    "Le compostage",
    "Depuis avril, les habitants trient leurs déchets organiques dans des bacs verts installés dans chaque rue. Le compost produit est redistribué aux jardins des écoles. Le dispositif a réduit de 18 % le volume de la poubelle grise. Certains riverains jugent l'odeur désagréable.",
    [["Quel résultat le dispositif a-t-il obtenu ?", ["Une hausse du volume de la poubelle grise", "Une réduction de 18 % du volume de la poubelle grise", "La suppression des bacs verts", "Une hausse de l'odeur"], "B", "Le document indique que le dispositif a réduit de 18 % le volume de la poubelle grise."]],
  ],
  [
    "La déchetterie",
    "La déchetterie est ouverte du mardi au samedi. Elle refuse les produits dangereux et les déchets électroniques. Les particuliers doivent présenter une carte d'identité. Le portail 5 est réservé aux professionnels.",
    [["Qui peut utiliser le portail 5 ?", ["Tous les habitants", "Seuls les particuliers sans carte", "Les professionnels", "Seuls les étudiants"], "C", "Le document précise que le portail 5 est réservé aux professionnels."]],
  ],
  [
    "La brocante du dimanche",
    "Une brocante aura lieu dimanche prochain, de 8 heures à 18 heures, dans la cour de l'école. Les habitants peuvent y vendre leurs objets, à condition que ceux-ci soient en bon état. Les stands sont attribués par ordre d'arrivée. L'entrée est gratuite.",
    [["Que peuvent faire les habitants ?", ["Donner tous leurs objets", "Vendre leurs objets en bon état", "Donner de l'argent", "Rester à la maison"], "B", "Le document précise que les objets vendus doivent être en bon état."]],
  ],
  [
    "La fusion des bibliothèques",
    "Deux bibliothèques de quartier ont fusionné en septembre. L'une ouvre le lundi et le jeudi soir, l'autre le mardi, le mercredi et le samedi. Une navette gratuite relie les deux bâtiments tous les jours d'ouverture. La bibliothèque centrale dispose désormais d'un espace de travail individuel.",
    [["Comment se rendre d'un bâtiment à l'autre ?", ["En bus payaant", "Par une navette gratuite", "À pied uniquement", "En voiture"], "B", "Le document indique qu'une navette gratuite relie les deux bâtiments tous les jours d'ouverture."]],
  ],
];

export default { A1, A2, B1, B2 };
