/* ============================================================
   Données du site d'entraînement — basées sur le cours TBIn212
   CM01 Introduction · CM02 Types · CM03 Pointeurs · CM04 Allocation
   dynamique · CM05 Structures · CM06 Chaînes · CM07 Fichiers
   ============================================================
   Types de questions :
   - qcm    : choix multiple (une seule bonne réponse, index "bonne")
   - vf     : vrai / faux (bonne = true/false)
   - sortie : "que va afficher ce code ?" (réponse à taper)
   - bug    : trouver / expliquer l'erreur (fonctionne comme un qcm)
   ============================================================ */

const CHAPITRES = [

  /* ==================== CM01 — INTRODUCTION ==================== */
  {
    id: "cm01",
    numero: "CM01",
    titre: "Introduction au C",
    description: "Compilation, structure d'un programme, variables, printf/scanf, conditions, boucles et fonctions.",
    icone: "🚀",
    fiche: [
      {
        titre: "Le C, un langage compilé",
        html: "<p>Le C (Kernighan &amp; Ritchie, années 1970) est un langage <strong>compilé</strong> : le code source doit être traduit en langage machine avant de pouvoir être exécuté. La chaîne de compilation comporte 4 étapes :</p><ul><li><strong>Préprocesseur</strong> : traite les directives commençant par <code>#</code> (<code>#include</code>, <code>#define</code>…)</li><li><strong>Compilation</strong> : traduit le code C en assembleur puis en code objet</li><li><strong>Édition de liens</strong> : assemble les fichiers objets et les bibliothèques en un exécutable</li></ul>",
        code: "gcc -Wall main.c -o prog     # compile main.c en un exécutable nommé prog\n./prog                       # exécute le programme"
      },
      {
        titre: "Structure minimale d'un programme",
        html: "<p>Tout programme C commence son exécution par la fonction <code>main</code>. Le <code>return 0;</code> signale au système que tout s'est bien passé.</p>",
        code: "#include <stdio.h>\n\nint main(void) {\n    printf(\"Bonjour le monde !\\n\");\n    return 0;\n}"
      },
      {
        titre: "Variables et entrées / sorties",
        html: "<p>Une variable doit être <strong>déclarée avec son type</strong> avant utilisation. Les formats principaux : <code>%d</code> (int), <code>%f</code> (float/double avec printf), <code>%lf</code> (double avec scanf), <code>%c</code> (char), <code>%s</code> (chaîne). <strong>Attention :</strong> <code>scanf</code> a besoin de l'<strong>adresse</strong> de la variable, d'où le <code>&amp;</code>.</p>",
        code: "int age;\nprintf(\"Quel age avez-vous ? \");\nscanf(\"%d\", &age);          /* & obligatoire ! */\nprintf(\"Vous avez %d ans\\n\", age);"
      },
      {
        titre: "Opérateurs : pièges classiques",
        html: "<ul><li><code>/</code> entre deux entiers = <strong>division entière</strong> : <code>7 / 2</code> vaut <code>3</code></li><li><code>%</code> = reste de la division : <code>7 % 2</code> vaut <code>1</code></li><li><code>=</code> est l'<strong>affectation</strong>, <code>==</code> est la <strong>comparaison</strong> : ne pas les confondre dans un <code>if</code> !</li><li>Logique : <code>&amp;&amp;</code> (ET), <code>||</code> (OU), <code>!</code> (NON)</li></ul>"
      },
      {
        titre: "Structures de contrôle",
        html: "<p><code>if / else</code>, <code>switch</code> (ne pas oublier <code>break</code> !), <code>while</code>, <code>do…while</code> (s'exécute <strong>au moins une fois</strong>) et <code>for</code>.</p>",
        code: "for (int i = 0; i < 5; i++) {\n    printf(\"%d \", i);       /* affiche : 0 1 2 3 4 */\n}\n\nswitch (choix) {\n    case 1:  printf(\"un\\n\");   break;\n    case 2:  printf(\"deux\\n\"); break;\n    default: printf(\"autre\\n\");\n}"
      },
      {
        titre: "Fonctions et passage par valeur",
        html: "<p>Une fonction se déclare avec un <strong>prototype</strong>, puis se définit. En C, les arguments sont passés <strong>par valeur</strong> : la fonction travaille sur une <strong>copie</strong>, la variable de l'appelant n'est jamais modifiée (il faudra des pointeurs pour ça → CM03).</p>",
        code: "int carre(int x);            /* prototype */\n\nint main(void) {\n    printf(\"%d\\n\", carre(4));   /* 16 */\n    return 0;\n}\n\nint carre(int x) {           /* définition */\n    return x * x;\n}"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Quelle commande compile le fichier main.c en un exécutable nommé prog ?",
        choix: [
          "gcc -Wall main.c -o prog",
          "gcc -Wall prog -o main.c",
          "gcc main.c prog",
          "run main.c -o prog"
        ],
        bonne: 0,
        explication: "L'option -o précise le nom du fichier de sortie (l'exécutable). -Wall active tous les avertissements, très utile pour détecter les erreurs."
      },
      {
        type: "qcm",
        q: "Quel est le rôle du préprocesseur ?",
        choix: [
          "Traiter les directives commençant par # avant la compilation",
          "Traduire le code C en langage machine",
          "Exécuter le programme ligne par ligne",
          "Vérifier l'orthographe des commentaires"
        ],
        bonne: 0,
        explication: "Le préprocesseur remplace les directives (#include recopie le contenu du fichier d'en-tête, #define substitue les macros) avant que le compilateur ne traduise le code."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "printf(\"%d\", 7 / 2);",
        reponses: ["3"],
        affichage: "3",
        explication: "7 et 2 sont des entiers : la division est donc une division entière, la partie décimale est tronquée. 7 / 2 = 3."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "printf(\"%d\", 7 % 2);",
        reponses: ["1"],
        affichage: "1",
        explication: "L'opérateur % (modulo) donne le reste de la division entière : 7 = 2 × 3 + 1, le reste est 1."
      },
      {
        type: "qcm",
        q: "Pourquoi écrit-on scanf(\"%d\", &age) avec un & devant la variable ?",
        choix: [
          "scanf a besoin de l'adresse de la variable pour pouvoir y écrire la valeur lue",
          "Le & convertit la variable en entier",
          "C'est une décoration facultative",
          "Le & protège la variable contre les erreurs de saisie"
        ],
        bonne: 0,
        explication: "scanf doit modifier la variable de l'appelant : on lui transmet donc son adresse (&age). Sans le &, le comportement est indéfini."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ? (sépare les valeurs par des espaces)",
        code: "for (int i = 0; i < 3; i++) {\n    printf(\"%d \", i);\n}",
        reponses: ["0 1 2"],
        affichage: "0 1 2",
        explication: "La boucle démarre à i = 0 et s'arrête dès que la condition i < 3 est fausse : elle affiche donc 0, 1 et 2."
      },
      {
        type: "vf",
        q: "Une boucle do…while exécute toujours son corps au moins une fois.",
        bonne: true,
        explication: "Vrai : la condition est testée APRÈS le corps de la boucle, contrairement au while classique qui teste avant."
      },
      {
        type: "bug",
        q: "Ce code affiche toujours « gagné », quelle que soit la valeur de n. Pourquoi ?",
        code: "int n = 3;\nif (n = 5) {\n    printf(\"gagné\");\n}",
        choix: [
          "n = 5 est une affectation : n reçoit 5, et la condition vaut 5 (vrai). Il fallait écrire n == 5",
          "Le if ne fonctionne pas avec des entiers",
          "Il manque un else",
          "printf ne peut pas être appelé dans un if"
        ],
        bonne: 0,
        explication: "= affecte, == compare. Ici n = 5 affecte 5 à n et l'expression vaut 5, considéré comme « vrai » en C (tout ce qui est différent de 0 est vrai)."
      },
      {
        type: "sortie",
        q: "Que va afficher ce programme ?",
        code: "void double_valeur(int x) {\n    x = x * 2;\n}\n\nint main(void) {\n    int a = 10;\n    double_valeur(a);\n    printf(\"%d\", a);\n    return 0;\n}",
        reponses: ["10"],
        affichage: "10",
        explication: "Passage par valeur : la fonction reçoit une COPIE de a. Elle modifie sa copie locale x, mais a reste inchangé dans main."
      },
      {
        type: "qcm",
        q: "Quel format utilise-t-on avec scanf pour lire un double ?",
        choix: [
          "%lf",
          "%d",
          "%c",
          "%s"
        ],
        bonne: 0,
        explication: "Avec scanf : %f pour un float, %lf pour un double. (Avec printf, %f suffit pour les deux car le float est automatiquement promu en double.)"
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "int x = 8;\nif (x > 10)\n    printf(\"grand\");\nelse\n    printf(\"petit\");",
        reponses: ["petit"],
        affichage: "petit",
        explication: "8 > 10 est faux, donc c'est la branche else qui s'exécute."
      },
      {
        type: "qcm",
        q: "Que signifie le return 0; à la fin de main ?",
        choix: [
          "Le programme signale au système qu'il s'est terminé sans erreur",
          "Le programme recommence depuis le début",
          "La variable 0 est libérée de la mémoire",
          "Rien, c'est purement décoratif"
        ],
        bonne: 0,
        explication: "La valeur de retour de main est le code de sortie du programme : 0 = succès, une valeur non nulle = erreur. Ce code peut être testé par le système ou un script."
      },
      {
        type: "qcm",
        q: "Dans un switch, à quoi sert l'instruction break ?",
        choix: [
          "À sortir du switch pour ne pas exécuter les cas suivants",
          "À arrêter tout le programme",
          "À revenir au début du switch",
          "À ignorer le cas default"
        ],
        bonne: 0,
        explication: "Sans break, l'exécution « tombe » dans le cas suivant (fall-through) et enchaîne les instructions des cas d'après. C'est une source de bug classique."
      },
      {
        type: "vf",
        q: "En C, une instruction simple se termine par un point-virgule.",
        bonne: true,
        explication: "Vrai : chaque instruction (affectation, appel de fonction, return…) se termine par ; — l'oublier est l'erreur de compilation la plus fréquente."
      }
    ]
  },

  /* ==================== CM02 — COMPLÉMENT SUR LES TYPES ==================== */
  {
    id: "cm02",
    numero: "CM02",
    titre: "Complément sur les types",
    description: "Tailles et limites des types, signé/non signé, complément à 2, flottants, conversions et cast.",
    icone: "🔢",
    fiche: [
      {
        titre: "Les types entiers et leurs tailles",
        html: "<p>L'opérateur <code>sizeof</code> donne la taille d'un type en octets. <code>sizeof(char)</code> vaut <strong>toujours 1</strong>. Les tailles typiques : <code>short</code> 2 octets, <code>int</code> 4, <code>long long</code> 8 — mais elles peuvent varier selon la machine (d'où l'intérêt de <code>sizeof</code>). Les constantes de <code>&lt;limits.h&gt;</code> (<code>INT_MAX</code>, <code>INT_MIN</code>…) donnent les bornes.</p>",
        code: "printf(\"%zu\\n\", sizeof(int));      /* 4 sur la plupart des machines  */\nprintf(\"%d\\n\", INT_MAX);           /* 2147483647 pour un int 32 bits */"
      },
      {
        titre: "Signé, non signé et complément à 2",
        html: "<p>Un type <code>unsigned</code> ne stocke que des valeurs <strong>positives ou nulles</strong> : sur 8 bits, un <code>unsigned char</code> va de 0 à <strong>255</strong>. Les entiers signés sont représentés en <strong>complément à 2</strong> : le bit de poids fort porte le signe, et <code>-1</code> s'écrit avec tous les bits à 1 (<code>11111111</code> sur 8 bits). Dépasser la capacité d'un entier (<em>overflow</em>) donne des résultats faux, voire un comportement indéfini pour les signés.</p>"
      },
      {
        titre: "Les flottants",
        html: "<p><code>float</code> (4 octets, ~7 chiffres significatifs) et <code>double</code> (8 octets, ~15 chiffres) stockent des <strong>valeurs approchées</strong> (norme IEEE 754). Conséquence : ne jamais comparer deux flottants avec <code>==</code>, mais tester si leur écart est inférieur à un petit epsilon.</p>",
        code: "double a = 0.1 + 0.2;              /* vaut 0.30000000000000004... */\nif (fabs(a - 0.3) < 1e-9) {\n    printf(\"quasiment egaux\\n\");    /* la bonne façon de comparer  */\n}"
      },
      {
        titre: "Le char est un entier",
        html: "<p>Un <code>char</code> stocke en réalité un <strong>code (ASCII)</strong> : <code>'A'</code> vaut 65, <code>'a'</code> vaut 97, <code>'0'</code> vaut 48. On peut donc faire de l'arithmétique sur les caractères : <code>'A' + 1</code> donne <code>'B'</code>.</p>",
        code: "char c = 'A';\nprintf(\"%c vaut %d\\n\", c, c);      /* A vaut 65 */\nprintf(\"%c\\n\", c + 1);             /* B */"
      },
      {
        titre: "Conversions implicites et cast",
        html: "<p>Dans une expression mixte, le type « le plus petit » est converti vers le plus grand (<code>int</code> → <code>double</code>). <strong>Piège n°1 du cours :</strong> dans <code>somme / n</code> avec deux int, la division entière est faite <em>avant</em> toute conversion. Le <strong>cast explicite</strong> <code>(type)</code> force la conversion :</p>",
        code: "int somme = 7, n = 2;\ndouble mauvais = somme / n;          /* 3.0  : division entiere d'abord ! */\ndouble bon = (double)somme / n;      /* 3.5  : somme converti avant la division */\nint tronque = (int)3.9;              /* 3    : le cast vers int TRONQUE */"
      },
      {
        titre: "typedef, enum, const",
        html: "<ul><li><code>typedef</code> crée un <strong>alias</strong> de type : <code>typedef unsigned int uint;</code></li><li><code>enum</code> définit des constantes entières nommées, numérotées à partir de <strong>0</strong> par défaut</li><li><code>const</code> déclare une valeur non modifiable</li></ul>",
        code: "enum Jour { LUNDI, MARDI, MERCREDI };   /* LUNDI=0, MARDI=1, MERCREDI=2 */\nconst double PI = 3.14159;"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Que vaut sizeof(char) ?",
        choix: [
          "Toujours 1 octet, quelle que soit la machine",
          "2 octets",
          "4 octets",
          "Cela dépend du compilateur"
        ],
        bonne: 0,
        explication: "La norme du C garantit sizeof(char) == 1. Les autres types (int, long…) peuvent varier selon la machine."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "printf(\"%d\", (int)3.9);",
        reponses: ["3"],
        affichage: "3",
        explication: "Le cast vers int TRONQUE la partie décimale (il n'arrondit pas) : (int)3.9 vaut 3."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "int a = 1, b = 2;\nprintf(\"%.1f\", (float)a / b);",
        reponses: ["0.5", "0,5"],
        affichage: "0.5",
        explication: "Le cast (float)a est appliqué AVANT la division : b est alors converti aussi, et la division devient flottante : 1.0 / 2 = 0.5."
      },
      {
        type: "qcm",
        q: "Quelle est la plus grande valeur stockable dans un unsigned char (8 bits) ?",
        choix: [
          "255",
          "127",
          "256",
          "65535"
        ],
        bonne: 0,
        explication: "8 bits permettent 2⁸ = 256 valeurs. En non signé, elles vont de 0 à 255."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "char c = 'A';\nprintf(\"%d\", c);",
        reponses: ["65"],
        affichage: "65",
        explication: "Un char est un entier : il stocke le code ASCII du caractère. 'A' vaut 65, et %d l'affiche sous forme numérique."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "printf(\"%c\", 'A' + 2);",
        reponses: ["C"],
        affichage: "C",
        explication: "'A' vaut 65, donc 'A' + 2 vaut 67, soit le code ASCII de 'C'. Le format %c affiche le caractère correspondant."
      },
      {
        type: "vf",
        q: "Un double offre une meilleure précision qu'un float.",
        bonne: true,
        explication: "Vrai : un double occupe 8 octets (~15 chiffres significatifs) contre 4 octets (~7 chiffres) pour un float. En pratique on utilise presque toujours double."
      },
      {
        type: "qcm",
        q: "Pourquoi est-il déconseillé de comparer deux flottants avec == ?",
        choix: [
          "Les flottants sont stockés de façon approchée : deux calculs « égaux » peuvent différer d'un infime écart",
          "L'opérateur == n'est pas défini pour les flottants",
          "Cela provoque une erreur de compilation",
          "C'est plus lent que la comparaison d'entiers"
        ],
        bonne: 0,
        explication: "0.1 + 0.2 ne vaut pas exactement 0.3 en binaire. On compare avec un epsilon : fabs(a - b) < 1e-9."
      },
      {
        type: "qcm",
        q: "En complément à 2, comment s'écrit -1 sur 8 bits ?",
        choix: [
          "11111111",
          "10000001",
          "00000001",
          "10000000"
        ],
        bonne: 0,
        explication: "En complément à 2, -1 a tous ses bits à 1. (10000001 serait la représentation « signe + valeur absolue », qui n'est pas utilisée.)"
      },
      {
        type: "qcm",
        q: "Que se passe-t-il si on ajoute 1 à un int qui vaut déjà INT_MAX ?",
        choix: [
          "Un débordement (overflow) : résultat faux, comportement indéfini pour les entiers signés",
          "La valeur reste bloquée à INT_MAX",
          "Le programme affiche un message d'erreur clair",
          "L'int est automatiquement converti en long"
        ],
        bonne: 0,
        explication: "Le C ne vérifie rien à l'exécution : le calcul déborde silencieusement (en pratique on observe souvent un passage à INT_MIN, une valeur très négative)."
      },
      {
        type: "bug",
        q: "Ce code affiche 3.0 au lieu de 3.5. Quelle est la correction ?",
        code: "int somme = 7, n = 2;\ndouble moyenne = somme / n;\nprintf(\"%f\", moyenne);",
        choix: [
          "Caster un opérande : moyenne = (double)somme / n;",
          "Changer le format : printf(\"%d\", moyenne);",
          "Déclarer moyenne en int",
          "Écrire moyenne = (double)(somme / n);"
        ],
        bonne: 0,
        explication: "somme / n est calculé ENTRE ENTIERS (résultat 3) avant d'être converti en double. Il faut caster un opérande AVANT la division. Attention : (double)(somme / n) caste le résultat déjà tronqué, ça ne corrige rien !"
      },
      {
        type: "qcm",
        q: "À quoi sert typedef ?",
        choix: [
          "À créer un alias (un synonyme) pour un type existant",
          "À créer un nouveau type avec de nouvelles capacités",
          "À convertir une variable d'un type vers un autre",
          "À définir une constante"
        ],
        bonne: 0,
        explication: "typedef unsigned int uint; permet ensuite d'écrire uint x;. C'est très utilisé avec les structures : typedef struct {...} Point;"
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "enum Jour { LUNDI, MARDI, MERCREDI };\nprintf(\"%d\", MERCREDI);",
        reponses: ["2"],
        affichage: "2",
        explication: "Les valeurs d'un enum sont numérotées à partir de 0 par défaut : LUNDI = 0, MARDI = 1, MERCREDI = 2."
      },
      {
        type: "vf",
        q: "Une variable unsigned int peut stocker des valeurs négatives.",
        bonne: false,
        explication: "Faux : unsigned signifie « non signé ». Tous les bits servent à la valeur, qui va de 0 à UINT_MAX. Affecter -1 à un unsigned donne en réalité la valeur maximale !"
      }
    ]
  },

  /* ==================== CM03 — POINTEURS ==================== */
  {
    id: "cm03",
    numero: "CM03",
    titre: "Introduction aux pointeurs",
    description: "Adresses, opérateurs & et *, passage par adresse, pointeurs et tableaux, arithmétique des pointeurs.",
    icone: "🎯",
    fiche: [
      {
        titre: "Adresse et pointeur",
        html: "<p>Chaque variable occupe une case mémoire repérée par une <strong>adresse</strong>. Un <strong>pointeur</strong> est une variable qui contient une adresse. Deux opérateurs clés :</p><ul><li><code>&amp;x</code> : « l'adresse de x »</li><li><code>*p</code> : « la valeur pointée par p » (déréférencement)</li></ul>",
        code: "int a = 5;\nint *p = &a;            /* p contient l'adresse de a          */\nprintf(\"%d\\n\", *p);     /* 5 : valeur lue A TRAVERS le pointeur */\n*p = 12;                /* modifie a via le pointeur           */\nprintf(\"%d\\n\", a);      /* 12                                  */\nprintf(\"%p\\n\", (void*)p); /* affiche l'adresse avec %p         */"
      },
      {
        titre: "Règles de sécurité",
        html: "<ul><li>Un pointeur <strong>non initialisé</strong> pointe n'importe où : le déréférencer est un comportement indéfini (souvent un crash)</li><li><code>NULL</code> est la valeur « ne pointe sur rien » : initialiser ses pointeurs à NULL et tester avant de déréférencer</li></ul>",
        code: "int *p = NULL;          /* bon reflexe                        */\nif (p != NULL) {\n    printf(\"%d\\n\", *p); /* on ne déréférence que si valide    */\n}"
      },
      {
        titre: "Passage par adresse",
        html: "<p>Pour qu'une fonction <strong>modifie une variable de l'appelant</strong>, on lui passe l'adresse de cette variable. C'est exactement ce que fait <code>scanf</code> ! L'exemple canonique du cours est l'échange de deux valeurs :</p>",
        code: "void echange(int *x, int *y) {\n    int tmp = *x;\n    *x = *y;\n    *y = tmp;\n}\n\nint main(void) {\n    int a = 1, b = 2;\n    echange(&a, &b);        /* on passe les ADRESSES */\n    printf(\"%d %d\\n\", a, b); /* 2 1 : vraiment échangés */\n    return 0;\n}"
      },
      {
        titre: "Pointeurs et tableaux",
        html: "<p>Le nom d'un tableau utilisé seul équivaut à <strong>l'adresse de son premier élément</strong> : <code>tab</code> ≡ <code>&amp;tab[0]</code>. On en déduit l'équivalence fondamentale : <code>tab[i]</code> ≡ <code>*(tab + i)</code>. L'<strong>arithmétique des pointeurs</strong> tient compte du type : si <code>p</code> est un <code>int*</code>, alors <code>p + 1</code> avance de <code>sizeof(int)</code> octets, pas de 1 octet.</p>",
        code: "int t[3] = {10, 20, 30};\nint *p = t;               /* p pointe sur t[0]        */\nprintf(\"%d\\n\", *p);       /* 10                       */\nprintf(\"%d\\n\", *(p + 2)); /* 30, comme t[2]           */\np++;                      /* p pointe maintenant sur t[1] */\nprintf(\"%d\\n\", *p);       /* 20                       */"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Après int a = 5; int *p = &a; que vaut *p ?",
        choix: [
          "5, la valeur de a",
          "L'adresse de a",
          "L'adresse de p",
          "0"
        ],
        bonne: 0,
        explication: "*p déréférence le pointeur : on lit la valeur stockée à l'adresse contenue dans p, c'est-à-dire la valeur de a."
      },
      {
        type: "qcm",
        q: "Que désigne l'expression &a ?",
        choix: [
          "L'adresse mémoire de la variable a",
          "La valeur de a",
          "Le double de a",
          "Un ET logique appliqué à a"
        ],
        bonne: 0,
        explication: "& est l'opérateur « adresse de ». Il donne l'emplacement mémoire de la variable, que l'on peut stocker dans un pointeur ou passer à scanf."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "int a = 5;\nint *p = &a;\n*p = 12;\nprintf(\"%d\", a);",
        reponses: ["12"],
        affichage: "12",
        explication: "*p = 12 écrit 12 à l'adresse pointée par p, c'est-à-dire dans a. C'est tout l'intérêt des pointeurs : modifier une variable à distance."
      },
      {
        type: "qcm",
        q: "Quelle est la déclaration correcte d'un pointeur vers un int ?",
        choix: [
          "int *p;",
          "int p*;",
          "pointer int p;",
          "*int p;"
        ],
        bonne: 0,
        explication: "L'étoile se place entre le type et le nom : int *p; (ou int* p;, équivalent). Elle signifie « p est un pointeur vers un int »."
      },
      {
        type: "sortie",
        q: "Que va afficher ce programme ? (sépare les valeurs par un espace)",
        code: "void echange(int *x, int *y) {\n    int tmp = *x;\n    *x = *y;\n    *y = tmp;\n}\n\nint main(void) {\n    int a = 1, b = 2;\n    echange(&a, &b);\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
        reponses: ["2 1"],
        affichage: "2 1",
        explication: "Grâce au passage par adresse, la fonction manipule directement a et b (et non des copies) : l'échange est réellement effectué."
      },
      {
        type: "qcm",
        q: "À quelle expression tab[i] est-il équivalent ?",
        choix: [
          "*(tab + i)",
          "&tab + i",
          "tab + *i",
          "*tab + i"
        ],
        bonne: 0,
        explication: "C'est l'équivalence fondamentale entre tableaux et pointeurs : tab[i] ≡ *(tab + i). Note : *tab + i vaudrait tab[0] + i, ce qui est différent !"
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "int t[3] = {10, 20, 30};\nint *p = t;\nprintf(\"%d\", *(p + 2));",
        reponses: ["30"],
        affichage: "30",
        explication: "p pointe sur t[0]. L'arithmétique des pointeurs fait que p + 2 pointe sur t[2] : *(p + 2) vaut donc 30."
      },
      {
        type: "bug",
        q: "Quel est le problème de ce code ?",
        code: "int *p;\n*p = 42;",
        choix: [
          "p n'est pas initialisé : on écrit à une adresse inconnue (comportement indéfini, crash probable)",
          "42 est trop grand pour un pointeur",
          "Il manque un & devant 42",
          "Aucun problème, ce code est correct"
        ],
        bonne: 0,
        explication: "p contient une adresse aléatoire. Écrire à cette adresse corrompt la mémoire ou fait planter le programme. Il faut d'abord faire pointer p sur une variable existante ou sur de la mémoire allouée."
      },
      {
        type: "vf",
        q: "Le nom d'un tableau utilisé seul équivaut à l'adresse de son premier élément.",
        bonne: true,
        explication: "Vrai : tab ≡ &tab[0]. C'est pourquoi on peut écrire int *p = t; sans & et pourquoi les tableaux passés aux fonctions sont modifiables."
      },
      {
        type: "qcm",
        q: "Quel format printf utilise-t-on pour afficher une adresse ?",
        choix: [
          "%p",
          "%d",
          "%a",
          "%x"
        ],
        bonne: 0,
        explication: "%p affiche une adresse (généralement en hexadécimal). On caste le pointeur en (void*) pour être rigoureux : printf(\"%p\", (void*)p);"
      },
      {
        type: "qcm",
        q: "Si p est un int* et que sizeof(int) vaut 4, de combien d'octets avance p + 1 par rapport à p ?",
        choix: [
          "4 octets : l'arithmétique des pointeurs tient compte de la taille du type pointé",
          "1 octet, toujours",
          "8 octets, la taille d'une adresse",
          "Cela dépend de la valeur pointée"
        ],
        bonne: 0,
        explication: "p + 1 désigne « l'élément suivant », donc l'adresse augmente de sizeof(int) octets. C'est ce qui rend *(p + i) équivalent à p[i]."
      },
      {
        type: "qcm",
        q: "Comment permettre à une fonction de modifier une variable de l'appelant ?",
        choix: [
          "Lui passer l'adresse de la variable (un pointeur) et la modifier via *",
          "Déclarer la variable en majuscules",
          "Utiliser return dans la fonction appelante",
          "C'est impossible en C"
        ],
        bonne: 0,
        explication: "C'est le passage par adresse : f(&x) transmet l'adresse, et la fonction écrit *ptr = ... pour modifier la variable d'origine. return ne permet de renvoyer qu'une seule valeur."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "int a = 3;\nint *p = &a;\nprintf(\"%d\", *p + 1);",
        reponses: ["4"],
        affichage: "4",
        explication: "Attention à la priorité : *p est évalué d'abord (3), puis on ajoute 1. *p + 1 vaut 4 — à ne pas confondre avec *(p + 1) qui pointerait sur la case suivante !"
      },
      {
        type: "vf",
        q: "NULL est une valeur spéciale signifiant que le pointeur ne pointe sur rien.",
        bonne: true,
        explication: "Vrai : NULL sert à initialiser un pointeur qui ne pointe sur rien de valide et à signaler les échecs (malloc, fopen…). Toujours tester != NULL avant de déréférencer."
      }
    ]
  },

  /* ==================== CM04 — ALLOCATION DYNAMIQUE ==================== */
  {
    id: "cm04",
    numero: "CM04",
    titre: "Allocation dynamique",
    description: "Pile vs tas, malloc, calloc, realloc, free, fuites mémoire et tableaux dynamiques.",
    icone: "🧠",
    fiche: [
      {
        titre: "Pile et tas",
        html: "<p>Deux zones mémoire à distinguer :</p><ul><li>La <strong>pile</strong> (stack) : variables locales et paramètres, gérée automatiquement, libérée à la sortie de la fonction, taille limitée</li><li>Le <strong>tas</strong> (heap) : mémoire demandée <strong>explicitement</strong> avec <code>malloc</code>, qui survit à la fonction et doit être libérée <strong>manuellement</strong> avec <code>free</code></li></ul><p>L'allocation dynamique sert quand la taille n'est connue qu'à l'exécution (ex : tableau dont l'utilisateur choisit la taille).</p>"
      },
      {
        titre: "malloc, calloc, realloc, free",
        html: "<ul><li><code>malloc(n)</code> : alloue n octets, contenu <strong>non initialisé</strong>, retourne <code>void*</code> (ou <code>NULL</code> si échec)</li><li><code>calloc(nb, taille)</code> : alloue nb × taille octets <strong>initialisés à zéro</strong></li><li><code>realloc(p, n)</code> : redimensionne un bloc déjà alloué (en conservant le contenu)</li><li><code>free(p)</code> : libère le bloc — obligatoire pour chaque allocation !</li></ul><p><strong>Réflexe systématique :</strong> toujours tester le retour contre <code>NULL</code>.</p>",
        code: "#include <stdlib.h>\n\nint n = 10;\nint *t = malloc(n * sizeof(int));   /* tableau de 10 int sur le tas */\nif (t == NULL) {\n    printf(\"Echec d'allocation\\n\");\n    return 1;\n}\nfor (int i = 0; i < n; i++) {\n    t[i] = i * i;\n}\nfree(t);                            /* liberation obligatoire */\nt = NULL;                           /* bon reflexe anti « dangling pointer » */"
      },
      {
        titre: "Les 3 erreurs mortelles",
        html: "<ul><li><strong>Fuite de mémoire</strong> : bloc alloué jamais libéré (ou pointeur perdu) — le programme consomme de plus en plus de mémoire</li><li><strong>Use after free</strong> : utiliser un pointeur après <code>free</code> — comportement indéfini</li><li><strong>Double free</strong> : libérer deux fois le même bloc — comportement indéfini / crash</li></ul>"
      },
      {
        titre: "Tableau 2D dynamique",
        html: "<p>Une matrice dynamique se construit comme un <strong>tableau de pointeurs</strong> (<code>int **</code>) : on alloue d'abord le tableau de lignes, puis chaque ligne. La libération se fait dans l'ordre inverse : chaque ligne, puis le tableau de pointeurs → <strong>N + 1 free pour N lignes</strong>.</p>",
        code: "int **m = malloc(nl * sizeof(int *));\nfor (int i = 0; i < nl; i++) {\n    m[i] = malloc(nc * sizeof(int));\n}\nm[1][2] = 42;                    /* utilisation comme un tableau 2D */\n\nfor (int i = 0; i < nl; i++) {\n    free(m[i]);                  /* liberer chaque ligne...  */\n}\nfree(m);                         /* ... puis le tableau de pointeurs */"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Que retourne malloc ?",
        choix: [
          "Un pointeur (void*) vers la zone allouée, ou NULL en cas d'échec",
          "Le nombre d'octets alloués",
          "Toujours l'adresse 0",
          "Un entier valant 0 en cas de succès"
        ],
        bonne: 0,
        explication: "malloc renvoie l'adresse du bloc alloué sur le tas, sous forme de void* (convertible vers n'importe quel type de pointeur). NULL signale un échec — d'où le test obligatoire."
      },
      {
        type: "qcm",
        q: "Comment allouer dynamiquement un tableau de 10 int ?",
        choix: [
          "int *t = malloc(10 * sizeof(int));",
          "int *t = malloc(10);",
          "int t[10] = malloc();",
          "int *t = new int[10];"
        ],
        bonne: 0,
        explication: "Il faut demander 10 × sizeof(int) OCTETS. malloc(10) n'allouerait que 10 octets (2 int et demi sur une machine 32 bits !). new est du C++, pas du C."
      },
      {
        type: "qcm",
        q: "Quelle est la différence entre calloc et malloc ?",
        choix: [
          "calloc initialise la mémoire allouée à zéro, malloc laisse un contenu indéterminé",
          "calloc alloue sur la pile, malloc sur le tas",
          "calloc est réservé aux chaînes de caractères",
          "Aucune, ce sont des synonymes"
        ],
        bonne: 0,
        explication: "calloc(nb, taille) alloue et met tous les octets à 0. Après malloc, le contenu du bloc est indéterminé (résidus mémoire)."
      },
      {
        type: "qcm",
        q: "Que doit-on systématiquement faire juste après un malloc ?",
        choix: [
          "Vérifier que le pointeur retourné n'est pas NULL",
          "Appeler free immédiatement",
          "Initialiser le pointeur à NULL",
          "Appeler realloc pour confirmer l'allocation"
        ],
        bonne: 0,
        explication: "Si le système ne peut pas allouer, malloc retourne NULL. Déréférencer NULL fait planter le programme : on teste donc toujours avant d'utiliser la mémoire."
      },
      {
        type: "vf",
        q: "Les variables locales d'une fonction sont stockées sur le tas.",
        bonne: false,
        explication: "Faux : les variables locales vivent sur la PILE et disparaissent à la sortie de la fonction. Le tas est réservé à l'allocation dynamique (malloc/calloc/realloc)."
      },
      {
        type: "qcm",
        q: "À quoi sert realloc ?",
        choix: [
          "À redimensionner un bloc déjà alloué en conservant son contenu",
          "À libérer puis réallouer la même adresse",
          "À réinitialiser un bloc à zéro",
          "À convertir une variable de la pile vers le tas"
        ],
        bonne: 0,
        explication: "realloc(p, nouvelle_taille) agrandit ou réduit le bloc (quitte à le déplacer en mémoire : il faut récupérer le pointeur retourné). Idéal pour un tableau qui grandit."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ? (sépare les valeurs par un espace)",
        code: "int *t = calloc(3, sizeof(int));\nt[0] = 7;\nprintf(\"%d %d\", t[0], t[2]);\nfree(t);",
        reponses: ["7 0"],
        affichage: "7 0",
        explication: "calloc initialise toute la mémoire à zéro : t[2] vaut 0 même si on ne l'a jamais affecté. Avec malloc, t[2] aurait eu une valeur indéterminée."
      },
      {
        type: "bug",
        q: "Quel est le problème de ce code ?",
        code: "int *p = malloc(sizeof(int));\n*p = 5;\nfree(p);\nprintf(\"%d\", *p);",
        choix: [
          "Utilisation après libération (use after free) : *p est lu alors que le bloc a été rendu au système",
          "malloc est appelé sans calloc",
          "free doit être appelé avant *p = 5",
          "Il manque un & devant p dans free"
        ],
        bonne: 0,
        explication: "Après free(p), la mémoire ne nous appartient plus : la lire est un comportement indéfini. Bon réflexe : p = NULL; juste après le free."
      },
      {
        type: "qcm",
        q: "Qu'est-ce qu'une fuite de mémoire ?",
        choix: [
          "De la mémoire allouée qui n'est jamais libérée (souvent parce que le pointeur est perdu)",
          "Un pointeur qui pointe en dehors du programme",
          "Une variable déclarée mais jamais utilisée",
          "L'écrasement d'une variable par une autre"
        ],
        bonne: 0,
        explication: "Chaque malloc doit avoir son free. Si on perd le pointeur (écrasé, fonction quittée…) sans libérer, le bloc reste occupé jusqu'à la fin du programme."
      },
      {
        type: "qcm",
        q: "Une matrice dynamique int **m de 5 lignes a été allouée (le tableau de pointeurs + chaque ligne). Combien d'appels à free faut-il pour tout libérer ?",
        choix: [
          "6 : un par ligne, puis un pour le tableau de pointeurs",
          "1 : free(m) suffit",
          "5 : un par ligne",
          "2 : free(m[0]) puis free(m)"
        ],
        bonne: 0,
        explication: "Chaque malloc a son free : les 5 lignes m[i] d'abord, PUIS le tableau de pointeurs m. Dans cet ordre (l'inverse ferait perdre l'accès aux lignes)."
      },
      {
        type: "vf",
        q: "La mémoire allouée avec malloc est automatiquement libérée quand on sort de la fonction.",
        bonne: false,
        explication: "Faux : c'est justement l'intérêt (et le danger) du tas. Le bloc survit à la fonction — pratique pour retourner un tableau, mais il faut penser au free."
      },
      {
        type: "qcm",
        q: "Pourquoi écrit-on malloc(n * sizeof(int)) plutôt que malloc(n * 4) ?",
        choix: [
          "Parce que la taille d'un int dépend de la machine : sizeof garantit la portabilité",
          "Parce que malloc n'accepte pas les constantes numériques",
          "Parce que sizeof est plus rapide à l'exécution",
          "Les deux écritures sont interdites"
        ],
        bonne: 0,
        explication: "Rien ne garantit qu'un int fasse 4 octets partout. sizeof(int) est évalué à la compilation pour la machine cible : le code reste juste partout."
      },
      {
        type: "qcm",
        q: "Que se passe-t-il si on appelle free deux fois sur le même pointeur ?",
        choix: [
          "Comportement indéfini : corruption du gestionnaire de mémoire, crash probable",
          "Rien, le deuxième appel est ignoré",
          "La mémoire est libérée « deux fois plus »",
          "Une erreur de compilation"
        ],
        bonne: 0,
        explication: "Le double free est une erreur grave détectée seulement à l'exécution. Mettre p = NULL après free protège : free(NULL) est sans effet, donc inoffensif."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "int *p = malloc(sizeof(int));\nif (p != NULL) {\n    *p = 21;\n    printf(\"%d\", *p * 2);\n    free(p);\n}",
        reponses: ["42"],
        affichage: "42",
        explication: "Le schéma parfait : allouer, tester NULL, utiliser, libérer. *p vaut 21, donc *p * 2 affiche 42."
      }
    ]
  },

  /* ==================== CM05 — STRUCTURES ==================== */
  {
    id: "cm05",
    numero: "CM05",
    titre: "Les structures",
    description: "Définir des types composés : struct, typedef, accès . et ->, structures et fonctions, tableaux de structures.",
    icone: "🧱",
    fiche: [
      {
        titre: "Définir et utiliser une structure",
        html: "<p>Une <strong>structure</strong> regroupe plusieurs variables (les <strong>champs</strong>) de types éventuellement différents sous un même type. On accède aux champs avec l'opérateur <strong>point</strong> <code>.</code></p>",
        code: "struct Point {\n    int x;\n    int y;\n};                          /* ne pas oublier ce point-virgule ! */\n\nstruct Point p = {3, 7};    /* initialisation                    */\np.x = 10;                   /* acces a un champ                  */\nprintf(\"(%d, %d)\\n\", p.x, p.y);"
      },
      {
        titre: "typedef struct : l'écriture du cours",
        html: "<p>Avec <code>typedef</code>, on évite de répéter le mot-clé <code>struct</code> à chaque déclaration :</p>",
        code: "typedef struct {\n    char nom[30];\n    int age;\n} Personne;\n\nPersonne p1 = {\"Alice\", 20};   /* plus besoin d'ecrire struct */"
      },
      {
        titre: "Pointeurs de structures et opérateur ->",
        html: "<p>Via un pointeur, on accède aux champs avec la <strong>flèche</strong> <code>-&gt;</code> : <code>p-&gt;x</code> est un raccourci strictement équivalent à <code>(*p).x</code>. Les parenthèses sont indispensables dans la version longue car <code>.</code> est prioritaire sur <code>*</code>.</p>",
        code: "Personne *ptr = &p1;\nprintf(\"%s\\n\", ptr->nom);      /* equivalent a (*ptr).nom */\nptr->age = 21;                 /* modifie p1.age          */\n\n/* allocation dynamique d'une structure : */\nPersonne *q = malloc(sizeof(Personne));\nif (q != NULL) {\n    q->age = 30;\n    free(q);\n}"
      },
      {
        titre: "Structures et fonctions",
        html: "<p>Passée <strong>par valeur</strong>, une structure est <strong>entièrement copiée</strong> : les modifications sont perdues et la copie peut coûter cher. Pour modifier (ou éviter la copie), on passe un <strong>pointeur de structure</strong>.</p>",
        code: "void anniversaire(Personne *p) {\n    p->age = p->age + 1;        /* modifie l'original */\n}\n\nanniversaire(&p1);"
      },
      {
        titre: "Tableaux de structures et imbrication",
        html: "<p>On combine librement : tableaux de structures, structures contenant des tableaux ou d'autres structures. <em>Remarque du cours :</em> à cause de l'<strong>alignement mémoire</strong>, <code>sizeof(struct …)</code> peut être supérieur à la somme des tailles des champs.</p>",
        code: "Personne promo[30];\npromo[0].age = 19;\nstrcpy(promo[0].nom, \"Basile\");\n\ntypedef struct {\n    Point centre;              /* structure imbriquee */\n    double rayon;\n} Cercle;\n\nCercle c;\nc.centre.x = 0;                /* acces en cascade    */"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Comment accéder au champ x d'une variable structure s ?",
        choix: [
          "s.x",
          "s->x",
          "s(x)",
          "x.s"
        ],
        bonne: 0,
        explication: "L'opérateur point s'utilise sur une VARIABLE structure : s.x. La flèche -> est réservée aux POINTEURS de structure."
      },
      {
        type: "qcm",
        q: "Comment accéder au champ x via un pointeur de structure p ?",
        choix: [
          "p->x",
          "p.x",
          "*p.x",
          "&p.x"
        ],
        bonne: 0,
        explication: "Via un pointeur : p->x, équivalent à (*p).x. Attention, *p.x ne marche pas : le . étant prioritaire, cela signifierait *(p.x)."
      },
      {
        type: "vf",
        q: "(*p).x est strictement équivalent à p->x.",
        bonne: true,
        explication: "Vrai : la flèche est un raccourci de « déréférencer puis accéder au champ ». Les parenthèses de (*p).x sont indispensables car . est prioritaire sur *."
      },
      {
        type: "sortie",
        q: "Que va afficher ce programme ?",
        code: "struct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    struct Point p = {3, 7};\n    printf(\"%d\", p.x + p.y);\n    return 0;\n}",
        reponses: ["10"],
        affichage: "10",
        explication: "L'initialisation {3, 7} affecte les champs dans l'ordre de leur déclaration : x = 3, y = 7. Donc p.x + p.y = 10."
      },
      {
        type: "qcm",
        q: "Quel est l'intérêt d'écrire typedef struct {...} Point; ?",
        choix: [
          "Pouvoir déclarer des variables avec « Point p; » sans répéter le mot-clé struct",
          "Rendre la structure modifiable à l'exécution",
          "Allouer automatiquement la structure sur le tas",
          "Rendre les champs privés"
        ],
        bonne: 0,
        explication: "typedef crée l'alias Point pour ce type structure : les déclarations deviennent plus lisibles (Point p; au lieu de struct Point p;)."
      },
      {
        type: "qcm",
        q: "Une structure est passée par valeur à une fonction. Que se passe-t-il ?",
        choix: [
          "La fonction reçoit une copie complète : les modifications ne sont pas répercutées sur l'original",
          "La fonction modifie directement la structure d'origine",
          "Seul le premier champ est copié",
          "Le compilateur refuse : on ne peut passer que des pointeurs de structures"
        ],
        bonne: 0,
        explication: "Comme pour les int : passage par valeur = copie. Pour modifier l'original (ou éviter de copier une grosse structure), on passe un pointeur."
      },
      {
        type: "sortie",
        q: "Que va afficher ce programme ?",
        code: "typedef struct {\n    char nom[20];\n    int age;\n} Personne;\n\nint main(void) {\n    Personne p = {\"Alice\", 20};\n    p.age = p.age + 1;\n    printf(\"%s a %d ans\", p.nom, p.age);\n    return 0;\n}",
        reponses: ["Alice a 21 ans"],
        affichage: "Alice a 21 ans",
        explication: "p.age passe de 20 à 21, et %s affiche la chaîne stockée dans le champ nom."
      },
      {
        type: "qcm",
        q: "Comment allouer dynamiquement une structure de type Point (défini par typedef) ?",
        choix: [
          "Point *p = malloc(sizeof(Point));",
          "Point p = malloc(Point);",
          "Point *p = malloc(Point);",
          "malloc Point *p;"
        ],
        bonne: 0,
        explication: "On demande sizeof(Point) octets et on récupère le pointeur. On accède ensuite aux champs avec p->x, et on n'oublie pas le free(p) final."
      },
      {
        type: "bug",
        q: "Quel est le problème de ce code ?",
        code: "typedef struct {\n    int x;\n    int y;\n} Point;\n\nint main(void) {\n    Point *p;\n    p->x = 3;\n    return 0;\n}",
        choix: [
          "p ne pointe sur rien : il faut d'abord l'associer à une structure existante ou allouée (malloc)",
          "Il faut écrire p.x au lieu de p->x",
          "Une structure ne peut pas contenir deux int",
          "Il manque un return dans la structure"
        ],
        bonne: 0,
        explication: "Déclarer un pointeur ne crée aucune structure ! p contient une adresse aléatoire : écrire p->x est un comportement indéfini. Il faut p = malloc(sizeof(Point)); ou p = &unPointExistant;"
      },
      {
        type: "qcm",
        q: "promo est un tableau de structures Etudiant possédant un champ note. Comment accéder à la note du i-ème étudiant ?",
        choix: [
          "promo[i].note",
          "promo.note[i]",
          "promo->note[i]",
          "note.promo[i]"
        ],
        bonne: 0,
        explication: "On indexe d'abord le tableau (promo[i] est une structure), puis on accède au champ avec le point."
      },
      {
        type: "vf",
        q: "Une structure peut contenir un tableau, ou même une autre structure.",
        bonne: true,
        explication: "Vrai : les champs peuvent être de n'importe quel type — char nom[30], une struct Point, un pointeur… On accède alors en cascade : c.centre.x."
      },
      {
        type: "sortie",
        q: "Que va afficher ce programme ? (sépare les valeurs par un espace)",
        code: "typedef struct {\n    int x;\n    int y;\n} Point;\n\nvoid deplace(Point *p) {\n    p->x = p->x + 1;\n}\n\nint main(void) {\n    Point a = {1, 1};\n    deplace(&a);\n    printf(\"%d %d\", a.x, a.y);\n    return 0;\n}",
        reponses: ["2 1"],
        affichage: "2 1",
        explication: "La fonction reçoit l'ADRESSE de a : p->x modifie donc réellement a.x, qui passe de 1 à 2. a.y n'est pas touché."
      },
      {
        type: "vf",
        q: "sizeof d'une structure est toujours exactement égal à la somme des tailles de ses champs.",
        bonne: false,
        explication: "Faux : le compilateur peut insérer des octets de remplissage (padding) pour aligner les champs en mémoire. sizeof peut donc être supérieur à la somme des champs."
      }
    ]
  },

  /* ==================== CM06 — CHAÎNES DE CARACTÈRES ==================== */
  {
    id: "cm06",
    numero: "CM06",
    titre: "Chaînes de caractères",
    description: "Tableaux de char, le '\\0' final, la bibliothèque string.h, lecture sécurisée et pièges classiques.",
    icone: "🔤",
    fiche: [
      {
        titre: "Une chaîne = un tableau de char + '\\0'",
        html: "<p>En C, une chaîne est un <strong>tableau de char terminé par le caractère nul</strong> <code>'\\0'</code>. C'est lui qui marque la fin : toutes les fonctions de <code>string.h</code> s'en servent. Conséquence : <code>\"Bonjour\"</code> occupe <strong>8 octets</strong> (7 lettres + <code>'\\0'</code>).</p>",
        code: "char s1[] = \"Info\";        /* {'I','n','f','o','\\0'} : 5 octets     */\nchar s2[10] = \"Info\";      /* 10 octets reserves, 5 utilises        */\nchar *s3 = \"Info\";         /* pointeur vers un litteral NON MODIFIABLE */\ns1[0] = 'X';               /* OK : s1 est un tableau modifiable      */\n/* s3[0] = 'X';               INTERDIT : comportement indefini !     */"
      },
      {
        titre: "Les fonctions de string.h",
        html: "<ul><li><code>strlen(s)</code> : longueur <strong>sans compter le '\\0'</strong></li><li><code>strcpy(dest, src)</code> : copie src dans dest (dest doit être assez grand !)</li><li><code>strcat(dest, src)</code> : concatène src à la fin de dest</li><li><code>strcmp(s1, s2)</code> : compare — retourne <strong>0 si égales</strong>, négatif si s1 &lt; s2, positif sinon</li><li><code>strchr(s, c)</code> / <code>strstr(s, sub)</code> : cherche un caractère / une sous-chaîne</li></ul>",
        code: "#include <string.h>\n\nchar a[20] = \"Bon\";\nstrcat(a, \"jour\");                 /* a contient \"Bonjour\"        */\nprintf(\"%zu\\n\", strlen(a));        /* 7                            */\nif (strcmp(a, \"Bonjour\") == 0) {   /* comparaison CORRECTE         */\n    printf(\"egales\\n\");\n}"
      },
      {
        titre: "Les deux pièges majeurs",
        html: "<ul><li><strong>Comparer avec ==</strong> : <code>s1 == s2</code> compare les <strong>adresses</strong> des tableaux, jamais leur contenu → utiliser <code>strcmp</code></li><li><strong>Débordement de tampon</strong> : <code>strcpy(s, \"trop long\")</code> dans un tableau trop petit écrit hors du tableau → comportement indéfini. Vérifier les tailles (ou utiliser <code>strncpy</code>)</li></ul>"
      },
      {
        titre: "Lire une chaîne au clavier",
        html: "<p><code>scanf(\"%s\", mot)</code> s'arrête au premier espace et <strong>ne vérifie pas la taille</strong> (danger !). Préférer <code>fgets</code>, qui limite la lecture et accepte les espaces. Remarque : pas de <code>&amp;</code> devant le nom du tableau — c'est déjà une adresse.</p>",
        code: "char ligne[100];\nfgets(ligne, 100, stdin);   /* lit au plus 99 caracteres + '\\0' */\n/* fgets conserve le '\\n' final s'il y a la place              */"
      },
      {
        titre: "Parcourir une chaîne",
        html: "<p>Le parcours idiomatique s'arrête sur le <code>'\\0'</code> :</p>",
        code: "char s[] = \"code\";\nint i = 0;\nwhile (s[i] != '\\0') {\n    printf(\"%c-\", s[i]);    /* c-o-d-e- */\n    i++;\n}"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Combien d'octets occupe la chaîne \"Bonjour\" en mémoire ?",
        choix: [
          "8 : les 7 caractères + le '\\0' final",
          "7 : un octet par caractère",
          "14 : deux octets par caractère",
          "9 : 7 caractères + 2 octets de contrôle"
        ],
        bonne: 0,
        explication: "Toute chaîne C se termine par le caractère nul '\\0', qui occupe un octet. \"Bonjour\" = 7 lettres + '\\0' = 8 octets."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "char s[] = \"chat\";\nprintf(\"%d\", (int)strlen(s));",
        reponses: ["4"],
        affichage: "4",
        explication: "strlen compte les caractères jusqu'au '\\0' EXCLU : \"chat\" a une longueur de 4 (même si le tableau occupe 5 octets)."
      },
      {
        type: "qcm",
        q: "Comment tester correctement que deux chaînes s1 et s2 ont le même contenu ?",
        choix: [
          "if (strcmp(s1, s2) == 0)",
          "if (s1 == s2)",
          "if (strcmp(s1, s2) == 1)",
          "if (s1.equals(s2))"
        ],
        bonne: 0,
        explication: "strcmp retourne 0 quand les contenus sont identiques. s1 == s2 comparerait les ADRESSES des deux tableaux, qui sont toujours différentes."
      },
      {
        type: "bug",
        q: "Ce code affiche « differentes » alors que les deux chaînes contiennent bien « oui ». Pourquoi ?",
        code: "char s1[10] = \"oui\";\nchar s2[10] = \"oui\";\nif (s1 == s2) {\n    printf(\"egales\");\n} else {\n    printf(\"differentes\");\n}",
        choix: [
          "s1 == s2 compare les adresses des deux tableaux, pas leur contenu : il faut strcmp(s1, s2) == 0",
          "Les tableaux sont trop grands (10 au lieu de 4)",
          "Il manque un '\\0' dans s2",
          "== ne fonctionne qu'avec des chaînes de même longueur"
        ],
        bonne: 0,
        explication: "s1 et s2 sont deux tableaux distincts, donc à deux adresses différentes : s1 == s2 est toujours faux. La comparaison de contenu passe par strcmp."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "char s[] = \"Info\";\nprintf(\"%c\", s[1]);",
        reponses: ["n"],
        affichage: "n",
        explication: "Les indices commencent à 0 : s[0]='I', s[1]='n', s[2]='f', s[3]='o'."
      },
      {
        type: "qcm",
        q: "Quel est le rôle du caractère '\\0' ?",
        choix: [
          "Marquer la fin de la chaîne : toutes les fonctions de string.h s'arrêtent dessus",
          "Représenter le chiffre zéro dans la chaîne",
          "Séparer les mots d'une phrase",
          "Indiquer un retour à la ligne"
        ],
        bonne: 0,
        explication: "'\\0' (code ASCII 0) est la sentinelle de fin de chaîne. Sans lui, strlen, printf %s, strcpy… continueraient à lire la mémoire au-delà du texte."
      },
      {
        type: "qcm",
        q: "Pourquoi préférer fgets à scanf(\"%s\") pour lire une chaîne au clavier ?",
        choix: [
          "fgets limite le nombre de caractères lus (pas de débordement) et accepte les espaces",
          "fgets est plus rapide",
          "scanf ne fonctionne pas avec les chaînes",
          "fgets convertit automatiquement en majuscules"
        ],
        bonne: 0,
        explication: "scanf(\"%s\") s'arrête au premier espace et écrit sans limite de taille (risque de débordement). fgets(s, taille, stdin) est borné et lit la ligne entière."
      },
      {
        type: "bug",
        q: "Quel est le problème de ce code ?",
        code: "char s[5];\nstrcpy(s, \"Bonjour\");",
        choix: [
          "Débordement : \"Bonjour\" nécessite 8 octets mais s n'en a que 5 — strcpy écrit hors du tableau",
          "strcpy ne fonctionne qu'avec des tableaux de taille 10 minimum",
          "Il faut écrire strcpy(\"Bonjour\", s)",
          "Aucun problème, le C ajuste la taille automatiquement"
        ],
        bonne: 0,
        explication: "strcpy copie 7 caractères + '\\0' = 8 octets dans un tableau de 5 : les 3 octets excédentaires écrasent la mémoire voisine (comportement indéfini). Toujours dimensionner dest, ou utiliser strncpy."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "char s[] = \"abc\";\ns[0] = 'A';\nprintf(\"%s\", s);",
        reponses: ["Abc"],
        affichage: "Abc",
        explication: "char s[] = \"abc\" crée un TABLEAU modifiable initialisé avec la chaîne : on peut changer ses caractères. (Différent de char *s = \"abc\", littéral non modifiable !)"
      },
      {
        type: "qcm",
        q: "Que se passe-t-il avec ce code : char *s = \"abc\"; s[0] = 'A'; ?",
        choix: [
          "Comportement indéfini : s pointe vers un littéral de chaîne, non modifiable",
          "s contient \"Abc\", tout va bien",
          "Erreur de compilation systématique",
          "Le littéral est automatiquement copié avant modification"
        ],
        bonne: 0,
        explication: "Un littéral de chaîne est stocké dans une zone en lecture seule : tenter de le modifier plante généralement le programme. Pour modifier, utiliser un tableau : char s[] = \"abc\";"
      },
      {
        type: "qcm",
        q: "Que retourne strcmp(\"arbre\", \"banane\") ?",
        choix: [
          "Un nombre négatif, car « arbre » précède « banane » dans l'ordre lexicographique",
          "0, car les deux chaînes ont un sens",
          "Un nombre positif",
          "La longueur commune des deux chaînes"
        ],
        bonne: 0,
        explication: "strcmp compare caractère par caractère (codes ASCII) : 'a' < 'b', donc résultat négatif. Positif dans l'autre sens, 0 si contenu identique."
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "char a[20] = \"Bon\";\nstrcat(a, \"jour\");\nprintf(\"%s\", a);",
        reponses: ["Bonjour"],
        affichage: "Bonjour",
        explication: "strcat colle \"jour\" à la suite de \"Bon\" (en écrasant le '\\0' de \"Bon\" et en en remettant un à la fin). Le tableau de 20 octets a largement la place."
      },
      {
        type: "vf",
        q: "strlen compte le caractère '\\0' final dans la longueur.",
        bonne: false,
        explication: "Faux : strlen(\"chat\") vaut 4. Mais attention, pour STOCKER une chaîne il faut strlen + 1 octets — piège classique lors d'un malloc !"
      },
      {
        type: "sortie",
        q: "Que va afficher ce code ?",
        code: "char s[] = \"code\";\nint i = 0;\nwhile (s[i] != '\\0') {\n    i++;\n}\nprintf(\"%d\", i);",
        reponses: ["4"],
        affichage: "4",
        explication: "C'est une réimplémentation de strlen : on avance jusqu'au '\\0'. i vaut 4 à la sortie de la boucle (\"code\" a 4 caractères)."
      }
    ]
  },

  /* ==================== CM07 — FICHIERS ==================== */
  {
    id: "cm07",
    numero: "CM07",
    titre: "Les fichiers",
    description: "fopen/fclose, modes d'ouverture, lecture/écriture texte et binaire, position dans le fichier.",
    icone: "📁",
    fiche: [
      {
        titre: "Ouvrir et fermer un fichier",
        html: "<p>On manipule un fichier via un pointeur <code>FILE *</code> obtenu avec <code>fopen(nom, mode)</code>. <strong>fopen retourne NULL en cas d'échec</strong> (fichier inexistant, droits insuffisants…) : le test est obligatoire. <code>fclose</code> vide les tampons d'écriture et libère les ressources — à ne jamais oublier.</p>",
        code: "FILE *f = fopen(\"data.txt\", \"r\");\nif (f == NULL) {\n    printf(\"Impossible d'ouvrir le fichier\\n\");\n    return 1;\n}\n/* ... lecture ... */\nfclose(f);"
      },
      {
        titre: "Les modes d'ouverture",
        html: "<ul><li><code>\"r\"</code> : lecture — <strong>échoue (NULL) si le fichier n'existe pas</strong></li><li><code>\"w\"</code> : écriture — crée le fichier ou <strong>écrase</strong> son contenu</li><li><code>\"a\"</code> : ajout (append) — écrit <strong>à la fin</strong> sans effacer</li><li><code>\"r+\"</code>, <code>\"w+\"</code>, <code>\"a+\"</code> : lecture ET écriture</li><li>suffixe <code>b</code> (<code>\"rb\"</code>, <code>\"wb\"</code>…) : mode <strong>binaire</strong></li></ul>"
      },
      {
        titre: "Lire et écrire en mode texte",
        html: "<p>Les fonctions miroir de printf/scanf, avec le fichier en premier argument :</p><ul><li>Écriture : <code>fprintf(f, \"%d\\n\", n)</code>, <code>fputs</code>, <code>fputc</code></li><li>Lecture : <code>fscanf(f, \"%d\", &amp;n)</code>, <code>fgets(ligne, taille, f)</code>, <code>fgetc</code></li></ul><p><code>fgetc</code> retourne un <strong>int</strong> et vaut <code>EOF</code> en fin de fichier. <code>fgets</code> retourne <code>NULL</code> en fin de fichier — idéal pour lire ligne par ligne :</p>",
        code: "char ligne[100];\nwhile (fgets(ligne, 100, f) != NULL) {\n    printf(\"%s\", ligne);        /* traite chaque ligne */\n}\n\nint c;\nwhile ((c = fgetc(f)) != EOF) { /* lecture caractere par caractere */\n    putchar(c);\n}"
      },
      {
        titre: "Lire et écrire en binaire",
        html: "<p><code>fwrite</code> et <code>fread</code> transfèrent des blocs d'octets bruts — parfait pour sauvegarder des tableaux ou des structures :</p>",
        code: "int t[10];\nFILE *f = fopen(\"data.bin\", \"wb\");\nfwrite(t, sizeof(int), 10, f);   /* ecrit 10 blocs de sizeof(int) octets */\nfclose(f);\n\nf = fopen(\"data.bin\", \"rb\");\nfread(t, sizeof(int), 10, f);    /* relit les 10 entiers                */\nfclose(f);"
      },
      {
        titre: "Se déplacer dans le fichier",
        html: "<ul><li><code>ftell(f)</code> : position courante du curseur (en octets)</li><li><code>fseek(f, offset, origine)</code> : déplace le curseur (<code>SEEK_SET</code> début, <code>SEEK_CUR</code> position courante, <code>SEEK_END</code> fin)</li><li><code>rewind(f)</code> : revient au début</li><li><code>feof(f)</code> : vrai <strong>seulement après</strong> une lecture qui a atteint la fin — d'où la boucle sur le retour de fgets/fgetc plutôt que <code>while (!feof(f))</code></li></ul>"
      }
    ],
    questions: [
      {
        type: "qcm",
        q: "Comment ouvrir le fichier data.txt en lecture (mode texte) ?",
        choix: [
          "FILE *f = fopen(\"data.txt\", \"r\");",
          "FILE f = fopen(\"data.txt\", \"r\");",
          "FILE *f = open(\"data.txt\", \"read\");",
          "fopen(f, \"data.txt\", \"r\");"
        ],
        bonne: 0,
        explication: "fopen retourne un FILE* (un pointeur !) qui identifie le fichier ouvert. Le mode \"r\" signifie lecture seule en mode texte."
      },
      {
        type: "qcm",
        q: "Que retourne fopen si l'ouverture échoue ?",
        choix: [
          "NULL",
          "-1",
          "0 (le fichier vide)",
          "EOF"
        ],
        bonne: 0,
        explication: "fopen retourne NULL en cas d'échec (fichier inexistant en \"r\", droits insuffisants…). Il faut TOUJOURS tester avant d'utiliser le fichier."
      },
      {
        type: "qcm",
        q: "Qu'arrive-t-il au contenu existant d'un fichier ouvert en mode \"w\" ?",
        choix: [
          "Il est effacé : \"w\" écrase le fichier (ou le crée s'il n'existe pas)",
          "Il est conservé, l'écriture se fait à la fin",
          "Il est conservé, l'écriture se fait au début par insertion",
          "Le fichier devient en lecture seule"
        ],
        bonne: 0,
        explication: "\"w\" tronque le fichier à zéro : tout le contenu précédent est perdu. Pour ajouter à la fin sans effacer, c'est le mode \"a\" (append)."
      },
      {
        type: "qcm",
        q: "Quel mode permet d'ajouter du texte à la fin d'un fichier sans effacer l'existant ?",
        choix: [
          "\"a\"",
          "\"w\"",
          "\"r\"",
          "\"x\""
        ],
        bonne: 0,
        explication: "\"a\" comme append : le curseur est placé en fin de fichier et toutes les écritures s'y ajoutent. Le fichier est créé s'il n'existe pas."
      },
      {
        type: "qcm",
        q: "Pourquoi faut-il appeler fclose après avoir écrit dans un fichier ?",
        choix: [
          "Pour vider les tampons (garantir que tout est écrit sur le disque) et libérer les ressources",
          "Pour chiffrer le fichier",
          "Uniquement par convention, cela n'a aucun effet",
          "Pour supprimer le fichier temporaire créé par fopen"
        ],
        bonne: 0,
        explication: "Les écritures passent par un tampon en mémoire : sans fclose (qui force le vidage), les dernières données peuvent ne jamais atteindre le disque."
      },
      {
        type: "qcm",
        q: "Quelle fonction lit une ligne entière dans un fichier ?",
        choix: [
          "fgets(ligne, 100, f)",
          "fgetc(f)",
          "fscanf(f, \"%c\", ligne)",
          "readline(f)"
        ],
        bonne: 0,
        explication: "fgets lit jusqu'au '\\n' inclus (ou 99 caractères max ici), et retourne NULL en fin de fichier — parfait pour une boucle de lecture ligne par ligne."
      },
      {
        type: "qcm",
        q: "Que retourne fgetc en fin de fichier ?",
        choix: [
          "EOF (c'est pourquoi on stocke son retour dans un int, pas un char)",
          "'\\0'",
          "NULL",
          "-0"
        ],
        bonne: 0,
        explication: "fgetc retourne le caractère lu sous forme d'int, ou la constante EOF (souvent -1) en fin de fichier. Un int est nécessaire pour distinguer EOF de tous les caractères valides."
      },
      {
        type: "vf",
        q: "Le mode \"r\" crée le fichier s'il n'existe pas.",
        bonne: false,
        explication: "Faux : en lecture, un fichier inexistant fait échouer fopen, qui retourne NULL. Seuls les modes d'écriture (\"w\", \"a\"…) créent le fichier."
      },
      {
        type: "qcm",
        q: "Comment écrire l'entier n suivi d'un retour à la ligne dans un fichier f ?",
        choix: [
          "fprintf(f, \"%d\\n\", n);",
          "printf(f, \"%d\\n\", n);",
          "fwrite(f, \"%d\\n\", n);",
          "fputs(n, f);"
        ],
        bonne: 0,
        explication: "fprintf fonctionne exactement comme printf, avec le FILE* en premier argument. fputs n'écrit que des chaînes, et fwrite sert au binaire."
      },
      {
        type: "bug",
        q: "Quel est le problème principal de ce code ?",
        code: "FILE *f = fopen(\"notes.txt\", \"r\");\nfprintf(f, \"%d\\n\", 15);\nfclose(f);",
        choix: [
          "Le fichier est ouvert en LECTURE (\"r\") mais on tente d'y ÉCRIRE — et le retour de fopen n'est même pas testé",
          "fprintf ne peut écrire que des chaînes de caractères",
          "fclose doit être appelé avant fprintf",
          "Il manque un & devant 15"
        ],
        bonne: 0,
        explication: "Écrire dans un fichier ouvert en \"r\" échoue. Il fallait \"w\" ou \"a\". Et si notes.txt n'existe pas, f vaut NULL : fprintf(NULL, ...) plante. Toujours tester fopen !"
      },
      {
        type: "qcm",
        q: "Que fait l'appel fread(t, sizeof(int), 10, f) ?",
        choix: [
          "Il lit 10 blocs de sizeof(int) octets depuis f et les range dans le tableau t",
          "Il lit 10 octets et les convertit en int",
          "Il lit tout le fichier dans t",
          "Il lit 10 lignes de texte"
        ],
        bonne: 0,
        explication: "fread(destination, taille_bloc, nb_blocs, fichier) : ici 10 int bruts (binaire). fread retourne le nombre de blocs effectivement lus — utile pour détecter une fin de fichier."
      },
      {
        type: "qcm",
        q: "Que fait rewind(f) ?",
        choix: [
          "Il replace le curseur de lecture/écriture au début du fichier",
          "Il efface le contenu du fichier",
          "Il ferme puis rouvre le fichier",
          "Il lit le fichier à l'envers"
        ],
        bonne: 0,
        explication: "rewind(f) équivaut à fseek(f, 0, SEEK_SET) : on repart du début, par exemple pour relire un fichier qu'on vient de parcourir."
      },
      {
        type: "vf",
        q: "feof(f) devient vrai seulement APRÈS une tentative de lecture qui a atteint la fin du fichier.",
        bonne: true,
        explication: "Vrai : c'est pour cela que while (!feof(f)) traite souvent une ligne de trop. La bonne pratique : boucler sur le retour de fgets (NULL) ou fgetc (EOF)."
      },
      {
        type: "qcm",
        q: "Quel couple de fonctions utilise-t-on pour les fichiers binaires ?",
        choix: [
          "fread et fwrite",
          "fscanf et fprintf",
          "fgets et fputs",
          "fgetc et fputc"
        ],
        bonne: 0,
        explication: "fread/fwrite transfèrent des octets bruts (tableaux, structures…) sans conversion en texte. Les autres couples travaillent en mode texte. Ne pas oublier le b dans le mode : \"rb\", \"wb\"."
      }
    ]
  }
];

/* Configuration du mode examen */
const EXAMEN = {
  nbQuestions: 20,
  titre: "Examen blanc",
  description: "20 questions tirées au hasard dans les 7 chapitres, comme un vrai contrôle."
};
