import type { CeShortDocTuple } from "./types";

/** Test 3 : documents courts A1 -> B2 (5 documents par niveau, une question chacun). */
const A1: CeShortDocTuple[] = [
  [
    "Le cabinet du docteur Léon",
    "Le cabinet du docteur Léon est ouvert du lundi au vendredi. Le médecin reçoit les patients de 9 heures à 12 heures. L'après-midi, il visite les patients à domicile. Il faut prendre rendez-vous par téléphone. Le cabinet ferme le week-end.",
    [["Que fait le médecin l'après-midi ?", ["Il reçoit les patients", "Il visite les patients à domicile", "Il ferme le cabinet", "Il travaille à l'hôpital"], "B", "Le document précise qu'il visite les patients à domicile l'après-midi."]],
  ],
  [
    "La pharmacie du centre",
    "La pharmacie du centre ouvre à 8 heures 30. Elle ferme le samedi à 19 heures. Le dimanche, la pharmacie est fermée. La pharmacienne prépare les commandes le lundi. Les clients peuvent acheter du matériel médical.",
    [["Que prépare la pharmacienne le lundi ?", ["Les commandes", "Le stock", "Les factures", "Les horaires"], "A", "Le document précise que la pharmacienne prépare les commandes le lundi."]],
  ],
  [
    "La mairie",
    "La mairie est ouverte du lundi au vendredi, de 8 heures 30 à 17 heures. Elle ferme le week-end. Pour retirer un document, il faut une pièce d'identité. Les services de paiement sont disponible jusqu'à 16 heures 30.",
    [["Jusqu'à quelle heure peut-on payer à la mairie ?", ["À 16 heures 30", "À 17 heures", "À 18 heures", "À 19 heures"], "A", "Le document indique que les services de paiement sont disponibles jusqu'à 16 heures 30."]],
  ],
  [
    "La boulangerie",
    "La boulangerie ouvre à 6 heures 30 et ferme à 19 heures 30. Elle ferme le dimanche après-midi. Les baguettes coûtent 1 euro 30. Les baguettes sont cuites deux fois par jour.",
    [["Combien coûte une baguette ?", ["1 euro 30", "2 euros", "1 euro", "2 euros 50"], "A", "Le document indique que les baguettes coûtent 1 euro 30."]],
  ],
  [
    "La médiathèque",
    "La médiathèque ouvre le mardi, le jeudi et le samedi. Elle ferme le lundi, le mercredi et le vendredi. Les prêts durent trois semaines.",
    [["Quels jours la médiathèque est-elle fermée ?", ["Le lundi, le mercredi et le vendredi", "Le mardi et le jeudi", "Le week-end seulement", "Tous les jours"], "A", "Le document indique qu'elle ferme le lundi, le mercredi et le vendredi."]],
  ],
];

const A2: CeShortDocTuple[] = [
  [
    "Le spectacle de marionnettes",
    "Un spectacle de marionnettes sera donné samedi à 16 heures, à la salle des fêtes. Le spectacle dure 45 minutes. Il est destiné aux enfants de plus de 4 ans. Les places sont gratuites, mais il faut réserver au bureau de la mairie. La salle est accessible aux personnes à mobilité réduite.",
    [["Que faut-il faire pour assister au spectacle ?", ["Payer 10 euros", "Réserver au bureau de la mairie", "Apporter un billet", "Rien, c'est libre"], "B", "Le document précise qu'il faut réserver au bureau de la mairie."]],
  ],
  [
    "La nouvelle borne de recharge",
    "Une borne de recharge pour vélos électriques sera installée place du Marché. Elle fonctionne avec une carte ou une application. La recharge est gratuite pendant une heure. La borne sera opérationnelle dès le 15 du mois. Les vélos doivent être attachés à gauche.",
    [["Combien de temps la recharge est-elle gratuite ?", ["Trente minutes", "Une heure", "Deux heures", "Toute la journée"], "B", "Le document précise que la recharge est gratuite pendant une heure."]],
  ],
  [
    "La collecte de vêtements",
    "Une collecte de vêtements aura lieu devant la mairie, du 10 au 14 mai. Les vêtements doivent être propres et pliés. Les chaussures ne sont pas acceptées. Les sacs sont à déposer dans le conteneur prévu. Les vêtements ne sont pas repris le 14 mai après 16 heures.",
    [["Les chaussures sont-elles acceptées ?", ["Oui, toutes", "Non", "Seulement les chaussures d'enfant", "Seulement les chaussures neuves"], "B", "Le document précise que les chaussures ne sont pas acceptées."]],
  ],
  [
    "La nouvelle salle de sport",
    "Une nouvelle salle de sport ouvrira en octobre. Elle sera réservée aux clubs scolaires le matin. Les adultes pourront l'utiliser le soir. La réservation se fait en ligne.",
    [["Quand la salle sera-t-elle réservée aux clubs scolaires ?", ["Le matin", "Le soir", "Le week-end", "À la fermeture"], "A", "Le document indique que la salle sera réservée aux clubs scolaires le matin."]],
  ],
  [
    "L'exposition de photographies",
    "Une exposition de photographies aura lieu dans le hall de la mairie jusqu'au 20 juin. L'entrée est libre. Certaines photographies montrent des quartiers aujourd'hui disparus. Le vernissage est prévu le premier jour.",
    [["Où aura lieu l'exposition ?", ["Dans la salle des fêtes", "Dans le hall de la mairie", "À la bibliothèque", "Au musée"], "B", "Le document indique que l'exposition aura lieu dans le hall de la mairie."]],
  ],
];

const B1: CeShortDocTuple[] = [
  [
    "Le festival de théâtre",
    "Le festival de théâtre aura lieu du 2 au 8 juin. Douze compagnies présenteront leurs spectacles. La plupart des représentations sont gratuites. Deux spectacles sont payants, à 12 euros. Les réservations sont possibles en ligne depuis lundi.",
    [["Combien de spectacles sont payants ?", ["Aucun", "Un", "Deux", "Douze"], "C", "Le document indique que deux spectacles sont payants."]],
  ],
  [
    "Le jardin partagé",
    "Le jardin partagé a été créé en avril sur un terrain municipal. Vingt familles cultivent des légumes. Chaque famille dispose d'une parcelle. Les outils sont communs. Les récoltes sont partagées entre les membres. Le jardin ferme en novembre.",
    [["Que se passe-t-il quand le jardin ferme ?", ["On peut continuer tout l'hiver", "Il ferme en novembre", "Il ferme en avril", "Il n'y a pas de date de fermeture"], "B", "Le document précise que le jardin ferme en novembre."]],
  ],
  [
    "La ruche pédagogique",
    "Une ruche pédagogique a été installée dans le parc public. Les élèves peuvent observer les abeilles depuis l'extérieur. Un panneau explique le cycle des abeilles.",
    [["Que peuvent faire les élèves avec la ruche ?", ["Ouvrir la ruche", "Observer les abeilles depuis l'extérieur", "Récolter le miel", "Installer leurs propres ruches"], "B", "Le document indique que les élèves peuvent observer les abeilles depuis l'extérieur."]],
  ],
  [
    "La Maison de quartier",
    "La Maison de quartier rénovée ouvre ses portes en octobre. Elle accueillera des activités pour les enfants et les adultes. Un espace de travail partagé sera disponible. La réservation se fait à l'accueil. Les habitants peuvent proposer leurs propres activités.",
    [["Comment les activités sont-elles réservées ?", ["Par téléphone", "À l'accueil", "En ligne uniquement", "Par courrier"], "B", "Le document indique que la réservation se fait à l'accueil."]],
  ],
  [
    "La bibliothèque de prêt",
    "Une bibliothèque de prêt ouvre dans un ancien commerce. Les habitants peuvent y emprunter des outils, des livres et des jeux. L'inscription est gratuite. Le matériel rendu doit être propre. Le prêt dure deux semaines.",
    [["Combien de temps dure le prêt ?", ["Deux jours", "Deux semaines", "Deux mois", "Une journée"], "B", "Le document indique que le prêt dure deux semaines."]],
  ],
];

const B2: CeShortDocTuple[] = [
  [
    "La halle de marché",
    "La halle de marché, construite en 1892, sera rénovée à partir de septembre. Les floristes seront déplacés dans un bâtiment provisoire. Le marché de samedi restera ouvert pendant les travaux. La ville veut réduire la facture énergétique du bâtiment. Les habitants de la commune ont demandé un calendrier précis.",
    [["Comment le texte présente-t-il la rénovation ?", ["Comme une dépense nécessaire", "De façon neutre et factuelle", "Avec une forte opposition politique", "Comme un projet controversé"], "B", "Le texte expose les faits et les positions sans les commenter : la présentation est neutre."]],
  ],
  [
    "La bibliothèque numérique",
    "La bibliothèque numérique propose 40 000 ouvrages en accès libre. Il n'est pas nécessaire de créer un compte pour lire. Les utilisateurs qui le souhaitent peuvent conserver leurs favoris, ce qui exige une inscription. Le site a enregistré 200 000 visites en 2024. Le conseil municipal souhaite élargir l'offre.",
    [["Pourquoi certains visiteurs créent-ils un compte ?", ["Pour payer moins cher", "Pour conserver leurs favoris", "Pour télécharger des livres", "Pour commenter les ouvrages"], "B", "Le document précise que l'inscription est nécessaire pour conserver ses favoris."]],
  ],
  [
    "La nouvelle école élémentaire",
    "La nouvelle école élémentaire accueillera 240 élèves à la rentrée prochaine. Les classes seront réparties sur deux étages. Une Bibliothèque sera créée au rez-de-chaussée. Les élèves du quartier ont été consultés sur la conception. Certains craignent que l'école soit trop éloignée du centre.",
    [["Quelle crainte ont exprimée certains habitants ?", ["Une école trop éloignée du centre", "Un manque de places", "Un tarif trop élevé", "L'absence de cour de récréation"], "A", "Le document indique que certains craignent que l'école soit trop éloignée du centre."]],
  ],
  [
    "Le accès à la culture",
    "Le conseil municipal a décidé de réduire le prix d'entrée au musée pour les étudiants. La réduction atteint 25 % pour les étudiants et 50 % pour les élèves. La décision s'applique dès le mois prochain. Le conseil rappelle que le budget du musée est limité.",
    [["Quel est le montant de la réduction ?", ["50 %", "40 %", "25 %", "10 %"], "C", "Le document indique que la réduction atteint 25 % pour les étudiants."]],
  ],
  [
    "Le nouveau planning des marchés",
    "Le planning des marchés a été réorganisé pour mieux répondre aux attentes des habitants. Deux nouveaux marchés ont été créés cette année. Le marché du samedi a été déplacé au dimanche matin. Les horaires ont également été modifiés.",
    [["Quand le marché du samedi a-t-il été déplacé ?", ["Au dimanche matin", "Au lundi matin", "Il n'a pas été déplacé", "Au mardi matin"], "A", "Le document indique que le marché du samedi a été déplacé au dimanche matin."]],
  ],
];

export default { A1, A2, B1, B2 };
