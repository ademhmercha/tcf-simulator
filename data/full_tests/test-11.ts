import { defineFullTest } from "./types";

/** Sépare les paragraphes d'un texte de compréhension écrite. */
const p = (...paragraphs: string[]): string => paragraphs.join("\n");

/**
 * Examen blanc 11.
 *
 * Répartition : CO 25 (A1 3, A2 4, B1 5, B2 6, C1 4, C2 3), structure 20
 * (A2 2, B1 5, B2 7, C1 4, C2 2), CE 25 (B1 5, B2 10, C1 5, C2 5).
 */
export const FULL_TEST_11 = defineFullTest({
  number: 11,
  description:
    "Onzième examen blanc complet : compréhension orale, structure de la langue et compréhension écrite s'enchaînent dans les conditions du TCF Tout public, avec des situations variées et une progression du niveau A1 au niveau C2.",
  listening: [
    {
      level: "A1",
      category: "vie quotidienne",
      transcription:
        "Bonsoir, le restaurant Chez Louise ferme ce soir à vingt-deux heures. La cuisine arrête de servir à vingt et une heures trente. Merci de votre compréhension.",
      prompt: "À quelle heure la cuisine arrête-t-elle de servir ?",
      options: ["À vingt et une heures trente", "À vingt-deux heures", "À vingt heures", "À vingt-trois heures"],
      correct: "A",
      explanation: "Le restaurant ferme à vingt-deux heures, mais la cuisine s'arrête de servir à vingt et une heures trente.",
    },
    {
      level: "A1",
      category: "transports",
      transcription:
        "Attention, le train pour Lyon part du quai numéro quatre. Il part dans dix minutes. Les voyageurs sont priés de monter à bord.",
      prompt: "De quel quai part le train pour Lyon ?",
      options: ["Du quai numéro quatre", "Du quai numéro deux", "Du quai numéro dix", "Du quai numéro quarante"],
      correct: "A",
      explanation: "L'annonce indique que le train pour Lyon part du quai numéro quatre, dans dix minutes.",
    },
    {
      level: "A1",
      category: "achats",
      transcription:
        "Bonjour madame, la baguette coûte un euro vingt et le pain aux céréales deux euros. Voulez-vous autre chose ?",
      prompt: "Combien coûte la baguette ?",
      options: ["Un euro vingt", "Deux euros", "Douze euros", "Un euro deux"],
      correct: "A",
      explanation: "Le boulanger annonce un euro vingt pour la baguette ; deux euros est le prix du pain aux céréales.",
    },
    {
      level: "A2",
      category: "santé",
      transcription:
        "Votre rendez-vous chez le docteur Moreau est déplacé au mercredi quinze, à dix heures. Si cette date ne vous convient pas, rappelez-nous avant lundi.",
      prompt: "Pourquoi faut-il rappeler le cabinet avant lundi ?",
      options: ["Si la nouvelle date ne convient pas", "Pour confirmer le paiement", "Pour apporter une ordonnance", "Pour annuler définitivement"],
      correct: "A",
      explanation: "Le cabinet demande de rappeler avant lundi uniquement si la nouvelle date proposée ne convient pas.",
    },
    {
      level: "A2",
      category: "loisirs",
      transcription:
        "Le cinéma du centre propose ce week-end un tarif réduit pour les enfants de moins de douze ans. Le film commence à quinze heures et dure une heure quarante.",
      prompt: "Qui bénéficie du tarif réduit ce week-end ?",
      options: ["Les enfants de moins de douze ans", "Les étudiants", "Les personnes âgées", "Les abonnés du cinéma"],
      correct: "A",
      explanation: "L'annonce réserve le tarif réduit aux enfants de moins de douze ans.",
    },
    {
      level: "A2",
      category: "logement",
      transcription:
        "Madame Roux, l'électricien passera chez vous demain entre huit et dix heures pour changer le compteur. Il faudra lui laisser l'accès à la cave.",
      prompt: "Que doit faire Mme Roux demain ?",
      options: ["Laisser l'accès à la cave", "Payer l'électricien", "Éteindre le chauffage", "Déménager le compteur"],
      correct: "A",
      explanation: "L'électricien demande simplement un accès à la cave, où se trouve le compteur à changer.",
    },
    {
      level: "A2",
      category: "travail",
      transcription:
        "Bonjour, c'est Marc du service des ressources humaines. Votre contrat est prêt. Passez le signer au bureau cent douze avant vendredi, s'il vous plaît.",
      prompt: "Que doit faire la personne avant vendredi ?",
      options: ["Signer son contrat", "Choisir ses congés", "Remplir un questionnaire", "Visiter l'entreprise"],
      correct: "A",
      explanation: "Marc demande de passer signer le contrat au bureau cent douze avant vendredi.",
    },
    {
      level: "B1",
      category: "transports",
      transcription:
        "En raison de travaux sur la voie, les trains de la ligne B seront remplacés par des autocars entre Villeneuve et Saint-Aubin du lundi au jeudi. Comptez trente minutes de trajet supplémentaires.",
      prompt: "Quelle conséquence les travaux auront-ils pour les voyageurs ?",
      options: ["Un trajet plus long de trente minutes", "La suppression totale de la ligne", "Un billet gratuit", "Un changement de gare à Lyon"],
      correct: "A",
      explanation: "Des autocars remplacent les trains entre deux gares, ce qui ajoute trente minutes au trajet.",
    },
    {
      level: "B1",
      category: "travail",
      transcription:
        "Notre agence propose à partir de septembre une formation gratuite de trois mois pour les demandeurs d'emploi souhaitant devenir aides-soignants. Les inscriptions se font en ligne jusqu'au quinze juillet.",
      prompt: "À qui s'adresse cette formation ?",
      options: ["Aux demandeurs d'emploi", "Aux étudiants en médecine", "Aux salariés de l'hôpital", "Aux retraités"],
      correct: "A",
      explanation: "La formation gratuite est destinée aux demandeurs d'emploi qui veulent devenir aides-soignants.",
    },
    {
      level: "B1",
      category: "environnement",
      transcription:
        "La mairie lance une opération de ramassage des déchets au bord de la rivière samedi matin. Gants et sacs seront fournis. Les volontaires sont attendus à neuf heures devant le pont.",
      prompt: "Que doivent apporter les volontaires ?",
      options: ["Rien, le matériel est fourni", "Leurs propres gants", "Des sacs poubelle", "Un justificatif d'identité"],
      correct: "A",
      explanation: "La mairie précise que les gants et les sacs seront fournis ; les volontaires n'ont rien à apporter.",
    },
    {
      level: "B1",
      category: "santé",
      transcription:
        "Le pharmacien me conseille de prendre ce sirop trois fois par jour, pendant les repas, et de ne pas dépasser une semaine de traitement. Si la toux persiste, il faudra consulter un médecin.",
      prompt: "Que faut-il faire si la toux continue après une semaine ?",
      options: ["Consulter un médecin", "Doubler la dose", "Changer de pharmacie", "Arrêter de manger"],
      correct: "A",
      explanation: "Le pharmacien recommande de voir un médecin si la toux persiste au-delà du traitement d'une semaine.",
    },
    {
      level: "B1",
      category: "vie sociale",
      transcription:
        "On a hésité à t'appeler, mais finalement nous avons décidé d'organiser la fête surprise de Camille chez nous plutôt qu'au restaurant. C'est moins cher et on sera plus tranquilles. Peux-tu apporter un dessert ?",
      prompt: "Pourquoi la fête aura-t-elle lieu à la maison ?",
      options: ["C'est moins cher et plus tranquille", "Le restaurant est complet", "Camille préfère la maison", "Le dessert est déjà prêt"],
      correct: "A",
      explanation: "L'orateur justifie le choix de la maison par un coût moindre et une ambiance plus calme.",
    },
    {
      level: "B2",
      category: "économie",
      transcription:
        "Selon une étude publiée ce matin, le prix moyen du loyer a augmenté de quatre pour cent en un an dans les grandes villes, alors que les salaires n'ont progressé que de deux pour cent. Les associations de locataires réclament un encadrement plus strict.",
      prompt: "Que révèle l'étude sur les loyers et les salaires ?",
      options: ["Les loyers augmentent plus vite que les salaires", "Les salaires augmentent plus vite que les loyers", "Les deux ont augmenté de la même façon", "Les loyers ont baissé dans les grandes villes"],
      correct: "A",
      explanation: "Les loyers progressent de quatre pour cent contre deux pour cent pour les salaires : l'écart se creuse.",
    },
    {
      level: "B2",
      category: "éducation",
      transcription:
        "Le ministère annonce que les élèves de sixième auront désormais une heure d'initiation à l'esprit critique face aux réseaux sociaux. Certains enseignants regrettent toutefois que cette mesure ne s'accompagne pas d'une formation spécifique pour eux.",
      prompt: "Quel reproche certains enseignants formulent-ils ?",
      options: ["L'absence de formation pour les enseignants", "Le nombre d'heures trop élevé", "Le choix des élèves de sixième", "Le coût des réseaux sociaux"],
      correct: "A",
      explanation: "Les enseignants regrettent que la mesure ne soit pas accompagnée d'une formation qui leur serait propre.",
    },
    {
      level: "B2",
      category: "culture",
      transcription:
        "Le festival de cinéma documentaire ouvre ses portes ce soir avec un film sur les derniers pêcheurs de la baie. La directrice espère attirer un public plus jeune grâce à des projections en plein air et à des débats avec les réalisateurs.",
      prompt: "Comment la directrice compte-t-elle attirer un public plus jeune ?",
      options: ["Par des projections en plein air et des débats", "En baissant le prix des places", "Avec des films de fiction", "Par une publicité à la télévision"],
      correct: "A",
      explanation: "Elle mise sur des projections en plein air et sur des rencontres avec les réalisateurs.",
    },
    {
      level: "B2",
      category: "santé",
      transcription:
        "Les médecins constatent une hausse des troubles du sommeil chez les adolescents. Ils pointent l'usage du téléphone le soir, mais aussi des horaires scolaires trop précoces, et recommandent de décaler le début des cours d'une heure.",
      prompt: "Quelle solution les médecins recommandent-ils ?",
      options: ["Décaler le début des cours d'une heure", "Supprimer le téléphone à l'école", "Réduire les devoirs", "Allonger les vacances"],
      correct: "A",
      explanation: "Ils proposent de commencer les cours une heure plus tard pour mieux respecter le rythme des adolescents.",
    },
    {
      level: "B2",
      category: "environnement",
      transcription:
        "La commune a décidé de remplacer la pelouse du parc par des prairies fleuries, moins gourmandes en eau. Si certains habitants apprécient cette initiative, d'autres jugent le résultat négligé et craignent une prolifération des moustiques.",
      prompt: "Quelle est la réaction des habitants face à ce changement ?",
      options: ["Elle est partagée", "Elle est unanimement positive", "Elle est totalement hostile", "Elle est indifférente"],
      correct: "A",
      explanation: "Une partie des habitants approuve, une autre critique : les avis sont donc partagés.",
    },
    {
      level: "B2",
      category: "technologie",
      transcription:
        "Cette application permet de comparer les prix des carburants en temps réel. Ses concepteurs reconnaissent que les données ne sont pas toujours fiables, car elles reposent sur les déclarations des utilisateurs, mais assurent que la précision s'améliore avec le nombre de contributeurs.",
      prompt: "Pourquoi les données de l'application peuvent-elles être imprécises ?",
      options: ["Elles viennent des déclarations des utilisateurs", "Elles datent d'il y a un an", "Elles sont fournies par les stations", "Elles sont payantes"],
      correct: "A",
      explanation: "Les prix sont saisis par les utilisateurs eux-mêmes ; la fiabilité dépend donc du nombre de contributeurs.",
    },
    {
      level: "C1",
      category: "société",
      transcription:
        "Si le télétravail a permis à de nombreux salariés de gagner en autonomie, il a aussi creusé un fossé entre ceux dont les fonctions s'y prêtent et les autres. Les sociologues parlent désormais d'une fracture des conditions de travail, qui recoupe en partie les inégalités sociales préexistantes.",
      prompt: "Que désigne l'expression « fracture des conditions de travail » ?",
      options: ["Un écart entre salariés selon qu'ils peuvent télétravailler ou non", "Une opposition entre patrons et syndicats", "Une baisse générale de la productivité", "Un conflit entre générations"],
      correct: "A",
      explanation: "L'expression désigne la séparation entre salariés télétravailleurs et autres, qui prolonge des inégalités déjà présentes.",
    },
    {
      level: "C1",
      category: "politique",
      transcription:
        "Le projet de loi suscite de vives réserves, y compris au sein de la majorité. Ses détracteurs jugent qu'il confère à l'administration des pouvoirs d'investigation excessifs, tandis que le gouvernement soutient que ces prérogatives seront strictement encadrées par un contrôle judiciaire.",
      prompt: "Quel argument le gouvernement avance-t-il pour défendre le texte ?",
      options: ["Les pouvoirs seront encadrés par un contrôle judiciaire", "Le texte n'a aucune portée concrète", "La majorité l'a déjà approuvé", "L'administration n'en fera pas usage"],
      correct: "A",
      explanation: "Face aux critiques sur des pouvoirs excessifs, le gouvernement invoque un encadrement par un contrôle judiciaire.",
    },
    {
      level: "C1",
      category: "science",
      transcription:
        "Les chercheurs précisent que leurs conclusions demeurent provisoires. L'échantillon étudié, composé de quelques centaines de personnes seulement, ne permet pas de généraliser les résultats, même si la tendance observée mérite d'être approfondie par des travaux de plus grande ampleur.",
      prompt: "Quelle réserve les chercheurs expriment-ils ?",
      options: ["L'échantillon est trop restreint pour généraliser", "Les résultats sont contradictoires", "L'étude n'a pas été financée", "Les participants ont abandonné l'étude"],
      correct: "A",
      explanation: "Les chercheurs jugent leur échantillon trop petit pour tirer des conclusions générales et appellent à des études plus vastes.",
    },
    {
      level: "C1",
      category: "culture",
      transcription:
        "Loin de se contenter d'illustrer un récit, la bande dessinée contemporaine tend à s'affirmer comme un moyen d'enquête, voire de témoignage. Plusieurs auteurs y recourent pour restituer des parcours que le reportage classique peine à rendre sensibles.",
      prompt: "Quelle évolution de la bande dessinée est décrite ?",
      options: ["Elle sert de moyen d'enquête et de témoignage", "Elle abandonne le récit", "Elle remplace les journaux", "Elle s'adresse seulement aux enfants"],
      correct: "A",
      explanation: "La bande dessinée dépasse l'illustration d'un récit et devient un outil d'enquête et de témoignage.",
    },
    {
      level: "C2",
      category: "philosophie",
      transcription:
        "On confond volontiers la liberté avec l'absence de contraintes, comme si l'individu n'était véritablement libre qu'à condition de ne rien devoir à personne. Or c'est précisément cette conception, séduisante mais illusoire, qui occulte les dépendances réciproques dont toute existence sociale est tissée.",
      prompt: "Quelle critique l'orateur adresse-t-il à une certaine conception de la liberté ?",
      options: ["Elle masque les dépendances réciproques de la vie sociale", "Elle supprime toutes les contraintes", "Elle est trop ancienne", "Elle interdit toute solidarité"],
      correct: "A",
      explanation: "L'orateur reproche à cette conception d'occulter les dépendances mutuelles qui fondent la vie en société.",
    },
    {
      level: "C2",
      category: "économie",
      transcription:
        "Que la croissance soit devenue l'étalon quasi exclusif de la prospérité ne va pas de soi : elle agrège des réalités hétérogènes, additionne indifféremment réparations et créations, et demeure muette sur la répartition. C'est moins un instrument de mesure qu'un horizon normatif qui ne dit pas son nom.",
      prompt: "Que reproche l'orateur à la croissance comme indicateur ?",
      options: ["Elle mélange des réalités différentes et ignore la répartition", "Elle est impossible à calculer", "Elle est trop faible aujourd'hui", "Elle profite uniquement aux entreprises"],
      correct: "A",
      explanation: "La croissance additionne des éléments hétérogènes et ne dit rien de la répartition ; elle revêt en outre une dimension normative.",
    },
    {
      level: "C2",
      category: "langue",
      transcription:
        "Les puristes déplorent que la langue se délite sous l'effet des emprunts. Ils omettent pourtant que le français s'est constitué précisément par accrétions successives : ce que l'on tient pour la pureté d'un état de langue n'est, le plus souvent, que la sédimentation d'anciennes innovations devenues invisibles.",
      prompt: "Quelle idée l'orateur défend-il à propos de la pureté de la langue ?",
      options: ["Elle résulte d'innovations anciennes devenues invisibles", "Elle doit être protégée par la loi", "Elle n'a jamais existé en français", "Elle a disparu au dix-neuvième siècle"],
      correct: "A",
      explanation: "Ce que l'on croit pur est en réalité le fruit d'emprunts et d'innovations anciens que l'usage a fait oublier.",
    },
  ],
  structure: [
    {
      level: "A2",
      category: "articles",
      prompt: "Je voudrais ___ café avec un peu de lait, s'il vous plaît.",
      options: ["un", "des", "du", "le"],
      correct: "A",
      explanation: "On commande une unité de boisson : l'article indéfini « un » convient devant « café » accompagné de « avec un peu de lait ».",
    },
    {
      level: "A2",
      category: "conjugaison",
      prompt: "Hier soir, nous ___ au restaurant avec des amis.",
      options: ["sommes allés", "allons", "irons", "allions"],
      correct: "A",
      explanation: "Le repère « hier soir » appelle le passé composé ; « aller » se conjugue avec « être » : « nous sommes allés ».",
    },
    {
      level: "B1",
      category: "pronoms",
      prompt: "Mes clés ? Je ___ ai laissées sur la table de la cuisine.",
      options: ["les", "leur", "en", "y"],
      correct: "A",
      explanation: "Le pronom complément d'objet direct « les » reprend « mes clés » et provoque l'accord du participe : « laissées ».",
    },
    {
      level: "B1",
      category: "pronoms relatifs",
      prompt: "La région ___ nous avons passé nos vacances est magnifique.",
      options: ["où", "que", "dont", "qui"],
      correct: "A",
      explanation: "« Où » reprend un complément de lieu : « nous avons passé nos vacances dans cette région ».",
    },
    {
      level: "B1",
      category: "futur",
      prompt: "Dès que vous ___ à Paris, appelez-moi.",
      options: ["arriverez", "arrivez", "arrivaient", "arrivassiez"],
      correct: "A",
      explanation: "Après « dès que » exprimant l'avenir, on emploie le futur simple : « dès que vous arriverez ».",
    },
    {
      level: "B1",
      category: "conditionnel",
      prompt: "Si j'avais plus de temps, je ___ une langue étrangère.",
      options: ["apprendrais", "apprendrai", "apprenais", "apprends"],
      correct: "A",
      explanation: "La structure « si + imparfait » appelle le conditionnel présent dans la principale : « j'apprendrais ».",
    },
    {
      level: "B1",
      category: "prépositions",
      prompt: "Elle est très douée ___ la photographie.",
      options: ["en", "pour", "à", "sur"],
      correct: "A",
      explanation: "On dit « être doué en » une matière ou une discipline : « douée en photographie ».",
    },
    {
      level: "B2",
      category: "subjonctif",
      prompt: "Il faut que tu ___ ton dossier avant la fin du mois.",
      options: ["rendes", "rends", "rendras", "rendais"],
      correct: "A",
      explanation: "« Il faut que » est suivi du subjonctif présent : « que tu rendes ».",
    },
    {
      level: "B2",
      category: "concession",
      prompt: "___ il pleuve, la randonnée aura lieu comme prévu.",
      options: ["Bien qu'", "Parce qu'", "Pourvu qu'", "Puisqu'"],
      correct: "A",
      explanation: "« Bien que » exprime la concession et gouverne le subjonctif : « bien qu'il pleuve ».",
    },
    {
      level: "B2",
      category: "participe présent",
      prompt: "___ la nouvelle, elle a immédiatement téléphoné à sa sœur.",
      options: ["Apprenant", "Apprendre", "Appris", "À apprendre"],
      correct: "A",
      explanation: "Le participe présent « apprenant » exprime une action simultanée ou immédiatement antérieure à l'action principale.",
    },
    {
      level: "B2",
      category: "discours rapporté",
      prompt: "Il m'a demandé si je ___ libre le lendemain.",
      options: ["serais", "suis", "serai", "sois"],
      correct: "A",
      explanation: "Après un verbe introducteur au passé, le futur du discours direct devient un conditionnel : « si je serais libre » reprend « seras-tu libre ? ».",
    },
    {
      level: "B2",
      category: "pronoms démonstratifs",
      prompt: "Je préfère ce modèle à ___ que tu m'as montré hier.",
      options: ["celui", "ceux", "celle", "ce"],
      correct: "A",
      explanation: "Le pronom démonstratif masculin singulier « celui » reprend « ce modèle » et se construit avec « que ».",
    },
    {
      level: "B2",
      category: "conjugaison",
      prompt: "Quand elle ___ son diplôme, elle partira à l'étranger.",
      options: ["aura obtenu", "obtient", "obtenait", "a obtenu"],
      correct: "A",
      explanation: "L'action antérieure à une action future se met au futur antérieur : « quand elle aura obtenu ».",
    },
    {
      level: "B2",
      category: "expression de la cause",
      prompt: "Le match a été reporté ___ la neige abondante.",
      options: ["à cause de", "afin de", "malgré", "grâce à"],
      correct: "A",
      explanation: "« À cause de » introduit une cause à effet négatif, ce qui convient pour un report de match ; « malgré » exprime l'opposition.",
    },
    {
      level: "C1",
      category: "subjonctif",
      prompt: "Je doute que cette solution ___ à long terme.",
      options: ["soit viable", "est viable", "sera viable", "serait viable"],
      correct: "A",
      explanation: "Le verbe de doute « douter que » à la forme affirmative est suivi du subjonctif : « soit viable ».",
    },
    {
      level: "C1",
      category: "mise en relief",
      prompt: "___ nous a surpris, c'est la rapidité de la décision.",
      options: ["Ce qui", "Ce que", "Ce dont", "Celui qui"],
      correct: "A",
      explanation: "« Ce qui » est sujet du verbe « surprendre » dans la structure de mise en relief « ce qui… c'est… ».",
    },
    {
      level: "C1",
      category: "pronoms relatifs",
      prompt: "Les arguments ___ il s'est appuyé se sont révélés fragiles.",
      options: ["sur lesquels", "auxquels", "dont", "desquels"],
      correct: "A",
      explanation: "« S'appuyer sur » impose « sur lesquels » : le relatif reprend un complément introduit par « sur ».",
    },
    {
      level: "C1",
      category: "conditionnel passé",
      prompt: "Si tu m'avais prévenu, je ___ autrement.",
      options: ["aurais agi", "agirais", "agissais", "avais agi"],
      correct: "A",
      explanation: "L'hypothèse irréelle du passé (« si + plus-que-parfait ») entraîne le conditionnel passé : « j'aurais agi ».",
    },
    {
      level: "C2",
      category: "subjonctif",
      prompt: "Quelque raison qu'il ___ invoquée, rien ne justifiait ce retard.",
      options: ["ait", "avait", "a", "aurait"],
      correct: "A",
      explanation: "« Quelque… que » exprimant la concession est suivi du subjonctif ; ici le subjonctif passé « ait invoquée » s'accorde avec « raison » antécédent.",
    },
    {
      level: "C2",
      category: "registre soutenu",
      prompt: "Il n'est pire sourd que celui qui ne ___ entendre.",
      options: ["veut", "voulait", "voudra", "veuille"],
      correct: "A",
      explanation: "Le proverbe emploie l'indicatif présent après « celui qui » : « celui qui ne veut entendre ».",
    },
  ],
  reading: [
    {
      title: "Piscine municipale : horaires d'été",
      text: p(
        "À partir du 1er juillet, la piscine ouvre de 9 h à 20 h, sept jours sur sept.",
        "Les nocturnes du jeudi (jusqu'à 22 h) sont maintenues. Entrée gratuite pour les enfants de moins de six ans.",
      ),
      question: {
        level: "B1",
        prompt: "Que précise l'affiche sur la gratuité ?",
        options: ["Elle concerne les enfants de moins de six ans", "Elle concerne le jeudi soir", "Elle concerne tous les habitants", "Elle concerne les moins de dix ans"],
        correct: "A",
        explanation: "L'affiche indique une entrée gratuite pour les enfants de moins de six ans.",
      },
    },
    {
      title: "Colis introuvable",
      text: p(
        "Bonjour, mon colis devait arriver mardi mais le suivi indique « livré » alors que je ne l'ai pas reçu.",
        "Pouvez-vous vérifier auprès du transporteur ? Je reste joignable par téléphone toute la semaine.",
      ),
      question: {
        level: "B1",
        prompt: "Quel est le problème de l'auteur du message ?",
        options: ["Son colis est noté livré mais il ne l'a pas reçu", "Son colis est arrivé en retard", "Son colis est abîmé", "Son colis a été envoyé à une mauvaise adresse"],
        correct: "A",
        explanation: "Le suivi indique « livré » alors que l'auteur affirme n'avoir rien reçu.",
      },
    },
    {
      title: "Cours de yoga",
      text: p(
        "Les cours de yoga reprennent lundi à 18 h 30 au gymnase Pasteur. Apportez votre tapis, une serviette et une bouteille d'eau.",
        "L'inscription se fait sur place, avant la première séance.",
      ),
      question: {
        level: "B1",
        prompt: "Que faut-il faire avant la première séance ?",
        options: ["S'inscrire sur place", "Acheter un tapis au gymnase", "Réserver par téléphone", "Présenter un certificat médical"],
        correct: "A",
        explanation: "Le texte précise que l'inscription se fait sur place avant la première séance.",
      },
    },
    {
      title: "Panne d'ascenseur",
      text: p(
        "L'ascenseur du bâtiment C est en panne depuis hier. Le technicien viendra jeudi matin.",
        "Les personnes ayant des difficultés à se déplacer peuvent contacter le gardien pour une aide.",
      ),
      question: {
        level: "B1",
        prompt: "À qui s'adressent les personnes à mobilité réduite ?",
        options: ["Au gardien", "Au technicien", "À la mairie", "Au syndic"],
        correct: "A",
        explanation: "L'avis invite ces personnes à contacter le gardien pour obtenir de l'aide.",
      },
    },
    {
      title: "Bourse aux jouets",
      text: p(
        "Samedi, l'école organise sa bourse aux jouets dans la salle des fêtes, de 10 h à 16 h.",
        "Les bénéfices serviront à financer une sortie scolaire au musée de la ville. Café et gâteaux sur place.",
      ),
      question: {
        level: "B1",
        prompt: "À quoi serviront les bénéfices de la bourse ?",
        options: ["À financer une sortie scolaire", "À acheter des jouets neufs", "À rénover la salle des fêtes", "À payer un spectacle"],
        correct: "A",
        explanation: "Le texte annonce que les bénéfices financeront une sortie scolaire.",
      },
    },
    {
      title: "Le potager partagé",
      text: p(
        "Depuis le printemps, une vingtaine d'habitants cultivent ensemble un potager installé sur un terrain vague du quartier. Chacun donne quelques heures par semaine et repart avec une partie de la récolte.",
        "L'initiative a aussi créé des liens entre des voisins qui ne se connaissaient pas, et plusieurs écoles du secteur y emmènent désormais leurs classes.",
      ),
      question: {
        level: "B2",
        prompt: "Quel effet secondaire le potager a-t-il eu ?",
        options: ["Il a rapproché des voisins", "Il a fait baisser les loyers", "Il a réduit le bruit", "Il a attiré des touristes"],
        correct: "A",
        explanation: "Le texte souligne que l'initiative a créé des liens entre voisins qui ne se connaissaient pas.",
      },
    },
    {
      title: "Un bus à la demande",
      text: p(
        "Dans cette communauté de communes, un minibus circule désormais sur réservation, deux jours par semaine. Il dessert les hameaux isolés où aucune ligne régulière ne passe, avec un arrêt devant la mairie de chaque commune.",
        "Les élus espèrent ainsi limiter l'isolement des personnes âgées, mais le coût du service reste à évaluer après six mois de test.",
      ),
      question: {
        level: "B2",
        prompt: "Quel est l'objectif du minibus ?",
        options: ["Réduire l'isolement des personnes âgées", "Remplacer toutes les lignes de bus", "Attirer des touristes", "Transporter les écoliers"],
        correct: "A",
        explanation: "Les élus espèrent limiter l'isolement des personnes âgées en desservant les hameaux isolés.",
      },
    },
    {
      title: "Les métiers du bois",
      text: p(
        "Les entreprises de menuiserie peinent à recruter des jeunes. Beaucoup d'adolescents ignorent encore que ces métiers combinent savoir-faire manuel et outils numériques, comme les machines à commande numérique, et offrent des salaires de départ corrects.",
        "Des journées découvertes sont organisées dans les ateliers de la région pour corriger cette image dépassée et susciter des vocations.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi organise-t-on des journées découvertes ?",
        options: ["Pour corriger une image dépassée du métier", "Pour vendre des meubles", "Pour fermer des ateliers", "Pour former des retraités"],
        correct: "A",
        explanation: "Les journées visent à corriger l'image dépassée de métiers qui intègrent pourtant le numérique.",
      },
    },
    {
      title: "Un café associatif",
      text: p(
        "Ouvert il y a deux ans, le café du village est géré par des bénévoles. On y prend un thé, on y échange des livres, et chaque mardi un artisan présente son travail.",
        "Les recettes couvrent à peine le loyer, mais les fondateurs jugent que le lieu a redonné vie à la place centrale et aux rencontres entre habitants.",
      ),
      question: {
        level: "B2",
        prompt: "Comment les fondateurs jugent-ils leur projet ?",
        options: ["Utile, malgré des recettes limitées", "Rentable financièrement", "Décevant et à abandonner", "Réservé aux artisans"],
        correct: "A",
        explanation: "Les recettes sont faibles, mais les fondateurs estiment que le café a ranimé la place centrale.",
      },
    },
    {
      title: "Surveillance des plages",
      text: p(
        "Chaque été, les maîtres-nageurs sauveteurs surveillent la plage de Saint-Martin de dix heures à dix-huit heures. En dehors de ces horaires, la baignade est déconseillée.",
        "Un drapeau rouge signale un danger et interdit la baignade ; l'orange indique une baignade dangereuse mais surveillée ; le vert, une baignade surveillée sans danger particulier.",
      ),
      question: {
        level: "B2",
        prompt: "Que signifie le drapeau rouge ?",
        options: ["La baignade est interdite", "La baignade est surveillée", "La plage est fermée définitivement", "Le sauveteur est absent"],
        correct: "A",
        explanation: "Le drapeau rouge signale un danger et interdit la baignade.",
      },
    },
    {
      title: "Livres audio : une nouvelle manière de lire ?",
      text: p(
        "Les ventes de livres audio ont doublé en trois ans. Longtemps considérés comme un substitut destiné aux malvoyants, ils séduisent désormais des actifs qui les écoutent pendant leurs trajets ou en faisant le ménage.",
        "Les éditeurs y voient un moyen de toucher des personnes qui lisent peu, mais certains libraires redoutent une concurrence pour le papier.",
      ),
      question: {
        level: "B2",
        prompt: "Quelle inquiétude certains libraires expriment-ils ?",
        options: ["Une concurrence pour le livre papier", "Une baisse du prix des livres", "Une pénurie de narrateurs", "Une hausse des loyers"],
        correct: "A",
        explanation: "Certains libraires craignent que le livre audio concurrence le livre papier.",
      },
    },
    {
      title: "Un permis de conduire à dix-sept ans",
      text: p(
        "Le gouvernement envisage d'autoriser l'accès au permis de conduire dès dix-sept ans, sous réserve d'être accompagné d'un adulte expérimenté pendant un an. Pour ses promoteurs, la mesure faciliterait l'accès à l'emploi des jeunes dans les zones rurales.",
        "Les associations de sécurité routière, elles, s'inquiètent d'un risque accru d'accidents chez les conducteurs novices.",
      ),
      question: {
        level: "B2",
        prompt: "Quel argument avancent les partisans de la mesure ?",
        options: ["Elle faciliterait l'accès à l'emploi en zone rurale", "Elle réduirait le nombre d'accidents", "Elle supprimerait l'examen", "Elle favoriserait les transports publics"],
        correct: "A",
        explanation: "Selon ses promoteurs, la mesure aiderait les jeunes de zone rurale à trouver un emploi.",
      },
    },
    {
      title: "Le prix des fruits et légumes",
      text: p(
        "Les consommateurs constatent que les fruits et légumes frais coûtent plus cher qu'il y a cinq ans, alors que les agriculteurs affirment ne pas en profiter. Entre la production et le rayon, une chaîne d'intermédiaires prélève sa marge à chaque étape.",
        "Plusieurs coopératives expérimentent la vente directe pour réduire cet écart, mais elles se heurtent à des contraintes de transport.",
      ),
      question: {
        level: "B2",
        prompt: "Pourquoi les agriculteurs ne profitent-ils pas de la hausse ?",
        options: ["Les intermédiaires prélèvent leur marge", "Ils produisent moins", "Les consommateurs achètent moins", "Les exportations ont augmenté"],
        correct: "A",
        explanation: "La marge des intermédiaires à chaque étape explique l'écart entre le prix payé et celui perçu par les producteurs.",
      },
    },
    {
      title: "Le marché de producteurs du jeudi",
      text: p(
        "Chaque jeudi soir, une dizaine de producteurs locaux installent leurs étals sur la place de la mairie. On y trouve des légumes, du miel, des œufs et du pain cuit au feu de bois.",
        "Les habitants apprécient de rencontrer ceux qui cultivent ce qu'ils mangent, et plusieurs commerçants du centre ont noté une hausse de fréquentation ces soirs-là.",
      ),
      question: {
        level: "B2",
        prompt: "Quel effet le marché a-t-il sur les commerces du centre ?",
        options: ["Il augmente leur fréquentation ces soirs-là", "Il les oblige à fermer", "Il fait baisser leurs prix", "Il n'a aucun effet"],
        correct: "A",
        explanation: "Plusieurs commerçants constatent davantage de clients les soirs de marché.",
      },
    },
    {
      title: "Une ligne de tramway très attendue",
      text: p(
        "Après dix ans de débats, la construction de la nouvelle ligne de tramway commencera en mars. Elle reliera l'université au centre-ville en vingt-cinq minutes, contre quarante-cinq en bus aujourd'hui.",
        "Les commerçants craignent que les travaux, prévus sur deux ans, ne fassent fuir leur clientèle ; la métropole a promis une indemnisation.",
      ),
      question: {
        level: "B2",
        prompt: "Que craignent les commerçants ?",
        options: ["Que les travaux éloignent leurs clients", "Que le billet soit trop cher", "Que la ligne soit supprimée", "Que le bus disparaisse"],
        correct: "A",
        explanation: "Ils redoutent que les deux ans de travaux fassent fuir la clientèle, ce qui justifie la promesse d'indemnisation.",
      },
    },
    {
      title: "Urbanisme : la ville du quart d'heure",
      text: p(
        "L'idée est séduisante : permettre à chacun d'accéder à l'essentiel de ses besoins quotidiens (travail, commerces, santé, loisirs) en moins d'un quart d'heure à pied ou à vélo. Plusieurs métropoles s'en réclament pour justifier de nouveaux aménagements cyclables et la piétonnisation de certaines rues.",
        "Pourtant, les urbanistes mettent en garde contre une lecture trop littérale. Une ville ne se réduit pas à la proximité : elle vit aussi de sa capacité à offrir des échanges avec d'autres quartiers, à accueillir des populations variées et à rester accessible à ceux dont les revenus ne leur permettent pas de s'installer dans les centres. Si la proximité devient un argument immobilier, elle risque d'élever les prix, de déplacer les ménages modestes et de produire l'inverse de l'effet recherché.",
      ),
      question: {
        level: "C1",
        prompt: "Quelle mise en garde formulent les urbanistes ?",
        options: ["La proximité peut faire monter les prix et exclure les ménages modestes", "La marche à pied est mauvaise pour la santé", "Les pistes cyclables sont inutiles", "Les centres-villes doivent être fermés aux commerces"],
        correct: "A",
        explanation: "Devenue argument immobilier, la proximité renchérit les prix et peut chasser les ménages modestes.",
      },
    },
    {
      title: "Le droit à la déconnexion",
      text: p(
        "Inscrit dans la loi depuis plusieurs années, le droit à la déconnexion devait protéger les salariés des sollicitations professionnelles en dehors des heures de travail. Son bilan est pourtant contrasté : dans de nombreuses entreprises, la charte censée l'appliquer reste lettre morte, faute de sanctions et de relais managériaux.",
        "Les cadres sont les premiers concernés, car leur autonomie s'accompagne souvent d'une disponibilité implicite. Certains employeurs répondent que la souplesse profite aux deux parties : on peut quitter plus tôt pour une obligation personnelle, quitte à répondre à un courriel en soirée. Les syndicats rétorquent que cette réciprocité n'est qu'apparente, car la charge de travail, elle, ne diminue pas.",
      ),
      question: {
        level: "C1",
        prompt: "Pourquoi les syndicats contestent-ils l'argument de la souplesse ?",
        options: ["La charge de travail ne diminue pas", "Les cadres refusent de quitter plus tôt", "Les chartes sont trop strictes", "Les courriels sont interdits le soir"],
        correct: "A",
        explanation: "Selon eux, la réciprocité n'est qu'apparente puisque la charge de travail demeure inchangée.",
      },
    },
    {
      title: "Les semences paysannes",
      text: p(
        "Pendant des siècles, les agriculteurs ont sélectionné, échangé et resemé leurs propres graines, adaptant peu à peu les variétés à leur terroir. Depuis les années cinquante, la réglementation sur les semences commerciales a progressivement restreint cette pratique, au motif de garantir la qualité et l'homogénéité des cultures.",
        "Des associations plaident aujourd'hui pour un assouplissement. Elles soutiennent que la diversité des semences constitue une assurance face au changement climatique, car les variétés locales supportent mieux les aléas. Leurs opposants invoquent la sécurité sanitaire et le risque de variétés mal contrôlées. Le débat oppose donc deux conceptions du progrès : l'une fondée sur la standardisation, l'autre sur l'adaptation.",
      ),
      question: {
        level: "C1",
        prompt: "Quel argument les associations avancent-elles en faveur des semences locales ?",
        options: ["Elles résistent mieux aux aléas climatiques", "Elles coûtent moins cher à produire", "Elles sont plus homogènes", "Elles sont plus faciles à transporter"],
        correct: "A",
        explanation: "Les variétés locales sont présentées comme une assurance face au changement climatique car elles supportent mieux les aléas.",
      },
    },
    {
      title: "Cinéma : le retour des salles de quartier",
      text: p(
        "Après des années de fermetures, quelques salles de quartier rouvrent, souvent sous forme de coopératives. Leur programmation, mêlant films d'auteur, séances pour enfants et soirées-débats, s'écarte délibérément des superproductions diffusées dans les multiplexes.",
        "Ces lieux misent sur la proximité et sur un rapport plus personnel avec le public : le projectionniste présente le film, les spectateurs prolongent la discussion au bar. Reste que leur équilibre financier est fragile. Sans soutien des collectivités ni abonnés fidèles, la plupart ne tiendraient pas plus de quelques années face à la concurrence des plateformes de streaming. Leur réussite dépend donc autant du lien social qu'elles entretiennent que de la qualité de leur offre.",
      ),
      question: {
        level: "C1",
        prompt: "De quoi dépend la réussite de ces salles selon le texte ?",
        options: ["Du lien social autant que de la qualité de l'offre", "Uniquement du prix des places", "De la diffusion de superproductions", "De la fermeture des plateformes"],
        correct: "A",
        explanation: "Le texte conclut que leur réussite repose autant sur le lien social que sur la qualité de la programmation.",
      },
    },
    {
      title: "La mémoire des lieux",
      text: p(
        "Lorsqu'un immeuble est détruit, la ville y gagne un terrain, mais perd parfois ce que l'on pourrait appeler une mémoire d'usage : les habitudes, les rencontres, les repères que les habitants avaient tissés dans ses murs. Les projets de renouvellement urbain abordent rarement cette dimension, davantage soucieux de surfaces et de coûts.",
        "Certaines municipalités tentent de la préserver en associant les anciens résidents aux nouveaux projets, en conservant un nom de rue ou un élément architectural significatif. Ces gestes, modestes, ne remplacent pas ce qui a disparu, mais ils signifient que la ville reconnaît que son histoire ne se réduit pas à ses bâtiments.",
      ),
      question: {
        level: "C1",
        prompt: "Que cherchent à faire certaines municipalités ?",
        options: ["Préserver une part de la mémoire des habitants", "Reconstruire à l'identique", "Réduire les coûts de démolition", "Interdire les nouveaux projets"],
        correct: "A",
        explanation: "En associant d'anciens résidents ou en conservant un élément symbolique, elles préservent une part de la mémoire d'usage.",
      },
    },
    {
      title: "Le travail et le sens",
      text: p(
        "On entend souvent que les jeunes générations réclament du sens dans leur travail, comme si leurs aînés s'en étaient passés. L'idée mérite d'être nuancée : le sens n'a jamais été absent des métiers, il s'exprimait simplement autrement, à travers la stabilité, l'appartenance à un collectif ou la fierté d'un geste maîtrisé. Ce qui change, c'est le fait que ces repères se sont raréfiés, et que l'on demande désormais à l'activité professionnelle de fournir à elle seule ce que d'autres institutions garantissaient jadis.",
        "Dès lors, la quête de sens ne relève peut-être pas d'un caprice générationnel, mais d'un déplacement de charge : en s'effaçant, des cadres collectifs (syndicats, paroisses, associations de quartier) ont laissé l'entreprise seule face à une attente qu'elle n'a ni vocation ni capacité à satisfaire entièrement.",
      ),
      question: {
        level: "C2",
        prompt: "Comment l'auteur explique-t-il la quête de sens au travail ?",
        options: ["Par le recul d'autres cadres collectifs qui offraient des repères", "Par un caprice propre aux jeunes", "Par une hausse générale des salaires", "Par la disparition des entreprises"],
        correct: "A",
        explanation: "L'auteur y voit un déplacement de charge : d'autres institutions s'effaçant, le travail doit seul combler l'attente de sens.",
      },
    },
    {
      title: "Traduire, c'est trahir ?",
      text: p(
        "La formule italienne qui assimile le traducteur à un traître est devenue un lieu commun. Elle suppose qu'il existerait un texte original intact, dont toute version dans une autre langue ne serait que l'altération. Or cette vision néglige un fait essentiel : un texte n'existe jamais à l'état pur ; il se déploie dans une langue, une époque et un horizon d'attentes, que le traducteur doit à son tour habiter.",
        "Traduire n'est donc pas reproduire, mais refaire, c'est-à-dire déplacer un ensemble de choix dans un autre système, au prix de renoncements assumés. La fidélité qui importe ne consiste pas à conserver chaque mot, mais à restituer l'effet que l'œuvre produisait dans son contexte d'origine. À ce titre, les meilleures traductions sont souvent celles qui trahissent la lettre pour sauver l'esprit.",
      ),
      question: {
        level: "C2",
        prompt: "Quelle conception de la fidélité l'auteur défend-il ?",
        options: ["Restituer l'effet de l'œuvre plutôt que chaque mot", "Conserver chaque mot du texte", "Remplacer l'original par un résumé", "Éviter toute interprétation"],
        correct: "A",
        explanation: "La fidélité essentielle consiste à rendre l'effet de l'œuvre, quitte à s'éloigner de la lettre.",
      },
    },
    {
      title: "La statistique et la décision publique",
      text: p(
        "Les chiffres exercent sur le débat public une autorité singulière : ils donnent l'impression de trancher là où les opinions divergent. Pourtant, une statistique n'est jamais un simple reflet du réel ; elle résulte de choix de catégories, de périmètres et de méthodes qui, sans être arbitraires, ne sont pas neutres. Mesurer le chômage, par exemple, suppose de décider qui est « actif » et qui ne l'est pas, et ces décisions orientent ce que l'on verra, ou non.",
        "Cela ne condamne pas la statistique, mais invite à en user avec lucidité. Il s'agit de rappeler, chaque fois, ce qu'un indicateur mesure et ce qu'il laisse dans l'ombre, afin que la précision apparente des chiffres ne tienne pas lieu de jugement. Un décideur qui oublie ces limites risque de gouverner pour l'indicateur plutôt que pour la réalité qu'il était censé éclairer.",
      ),
      question: {
        level: "C2",
        prompt: "Quel risque l'auteur signale-t-il pour les décideurs ?",
        options: ["Gouverner pour l'indicateur plutôt que pour la réalité", "Ignorer toutes les statistiques", "Multiplier les catégories sans raison", "Cacher volontairement des données"],
        correct: "A",
        explanation: "Un décideur qui oublie les limites d'un indicateur peut agir pour améliorer le chiffre plutôt que la réalité visée.",
      },
    },
    {
      title: "L'oubli et la justice",
      text: p(
        "L'idée d'un droit à l'oubli, inscrite dans plusieurs législations, répond à une intuition simple : nul ne devrait être indéfiniment défini par une erreur ancienne que l'on retrouve en quelques clics. Les moteurs de recherche, en rendant le passé aussi accessible que le présent, abolissent cette distance que le temps interposait naturellement entre l'événement et le jugement qu'on en portait.",
        "Mais ce droit entre en tension avec un autre : celui de savoir. Les historiens, les journalistes, les victimes elles-mêmes peuvent avoir intérêt à ce que certains faits demeurent consultables. La difficulté tient à ce qu'aucune règle générale ne permet de départager ces exigences ; il faut apprécier, au cas par cas, la nature des faits, le rôle public de la personne et le temps écoulé. Le droit à l'oubli est ainsi moins un principe intangible qu'un arbitrage permanent, que chaque société doit renégocier à mesure que ses outils de mémoire évoluent.",
      ),
      question: {
        level: "C2",
        prompt: "Pourquoi l'auteur qualifie-t-il le droit à l'oubli d'arbitrage permanent ?",
        options: ["Il faut concilier cas par cas deux exigences opposées", "Il est appliqué automatiquement", "Il a été supprimé par les moteurs de recherche", "Il concerne uniquement les journalistes"],
        correct: "A",
        explanation: "Aucune règle générale ne départage le droit à l'oubli et le droit de savoir : chaque situation demande un examen particulier.",
      },
    },
    {
      title: "L'hospitalité à l'épreuve",
      text: p(
        "L'hospitalité est souvent célébrée comme une vertu privée : on l'imagine comme l'accueil généreux de l'invité à sa table. Mais lorsqu'elle devient un enjeu collectif, notamment à propos des migrations, elle change de nature. Elle n'est plus seulement affaire de sentiment, mais de règles, de moyens et de limites, qui engagent la communauté tout entière et que ses membres ne partagent pas toujours.",
        "Cette tension ne signifie pas que l'hospitalité soit une illusion. Elle rappelle plutôt que les principes moraux ne s'appliquent jamais sans médiation : il faut des institutions pour les traduire en pratiques, et ces institutions, en fixant des conditions, introduisent inévitablement des exclusions. Reconnaître cette ambivalence, c'est se donner une chance de la discuter honnêtement plutôt que de la masquer sous de grands mots.",
      ),
      question: {
        level: "C2",
        prompt: "Que signifie, pour l'auteur, l'ambivalence de l'hospitalité collective ?",
        options: ["Pour être appliquée, elle suppose des règles qui créent aussi des exclusions", "Elle est impossible à pratiquer", "Elle ne concerne que la vie privée", "Elle disparaît avec les institutions"],
        correct: "A",
        explanation: "L'hospitalité collective exige des institutions et des conditions, qui introduisent nécessairement des exclusions.",
      },
    },
  ],
});
