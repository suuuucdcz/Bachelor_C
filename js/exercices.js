/* ============================================================
   Exercices de rédaction de code C — atelier TBIn212
   ============================================================
   Deux types d'exercices :
   - "programme" : l'étudiant écrit un programme complet.
     Chaque test fournit une entrée (stdin) et compare la sortie.
   - "fonction"  : l'étudiant écrit UNIQUEMENT une fonction.
     Un main de test caché (harnais) est ajouté à la compilation,
     et sa sortie est comparée à "attendu".
   Difficulté : 1, 2 ou 3 étoiles.
   Les fichiers de données éventuels (CM07) sont dans "fichiers".
   ============================================================ */

const EXERCICES = [

  /* ==================== CM01 — INTRODUCTION ==================== */
  {
    id: "ex-cm01-01",
    chapitre: "cm01",
    titre: "Bonjour le monde",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Le grand classique : écris un programme qui affiche exactement <code>Bonjour le monde !</code> suivi d'un retour à la ligne.</p>",
    exemple: "Sortie attendue :\nBonjour le monde !",
    depart: "#include <stdio.h>\n\nint main() {\n    /* Affiche : Bonjour le monde ! */\n\n    return 0;\n}\n",
    indice: "printf(\"...\\n\"); — n'oublie pas le \\n final et l'espace avant le !",
    solution: "#include <stdio.h>\n\nint main() {\n    printf(\"Bonjour le monde !\\n\");\n    return 0;\n}\n",
    tests: [
      { stdin: "", attendu: "Bonjour le monde !" }
    ]
  },
  {
    id: "ex-cm01-02",
    chapitre: "cm01",
    titre: "Le double",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Lis un entier au clavier avec <code>scanf</code>, puis affiche son double.</p>",
    exemple: "Entrée : 7\nSortie : 14",
    depart: "#include <stdio.h>\n\nint main() {\n    int n;\n    /* 1. lire n avec scanf   */\n    /* 2. afficher son double */\n\n    return 0;\n}\n",
    indice: "scanf(\"%d\", &n); — le & est indispensable ! Puis printf(\"%d\\n\", 2 * n);",
    solution: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%d\\n\", 2 * n);\n    return 0;\n}\n",
    tests: [
      { stdin: "7", attendu: "14" },
      { stdin: "-3", attendu: "-6" }
    ]
  },
  {
    id: "ex-cm01-03",
    chapitre: "cm01",
    titre: "Somme et produit",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Lis deux entiers <code>a</code> et <code>b</code> (sur la même ligne), puis affiche leur somme et leur produit, au format exact ci-dessous (deux lignes).</p>",
    exemple: "Entrée : 3 4\nSortie :\nSomme : 7\nProduit : 12",
    depart: "#include <stdio.h>\n\nint main() {\n    int a, b;\n    /* lire a et b, puis afficher :\n       Somme : ...\n       Produit : ...       */\n\n    return 0;\n}\n",
    indice: "scanf(\"%d %d\", &a, &b); lit les deux entiers d'un coup. Attention aux espaces autour du : dans l'affichage.",
    solution: "#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"Somme : %d\\n\", a + b);\n    printf(\"Produit : %d\\n\", a * b);\n    return 0;\n}\n",
    tests: [
      { stdin: "3 4", attendu: "Somme : 7\nProduit : 12" },
      { stdin: "5 0", attendu: "Somme : 5\nProduit : 0" }
    ]
  },
  {
    id: "ex-cm01-04",
    chapitre: "cm01",
    titre: "Pair ou impair",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Lis un entier et affiche <code>pair</code> s'il est pair, <code>impair</code> sinon. Utilise l'opérateur modulo <code>%</code>.</p>",
    exemple: "Entrée : 8\nSortie : pair",
    depart: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    /* pair ou impair ? */\n\n    return 0;\n}\n",
    indice: "n % 2 == 0 signifie que n est divisible par 2. Attention : == pour comparer, pas = !",
    solution: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    if (n % 2 == 0) {\n        printf(\"pair\\n\");\n    } else {\n        printf(\"impair\\n\");\n    }\n    return 0;\n}\n",
    tests: [
      { stdin: "8", attendu: "pair" },
      { stdin: "7", attendu: "impair" },
      { stdin: "0", attendu: "pair" }
    ]
  },
  {
    id: "ex-cm01-05",
    chapitre: "cm01",
    titre: "Table de multiplication",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Lis un entier <code>n</code> et affiche sa table de multiplication de 1 à 10, une ligne par produit, au format exact <code>n x i = r</code>.</p>",
    exemple: "Entrée : 3\nSortie :\n3 x 1 = 3\n3 x 2 = 6\n...\n3 x 10 = 30",
    depart: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    /* une boucle for de 1 a 10 */\n\n    return 0;\n}\n",
    indice: "for(int i = 1; i <= 10; i++) { printf(\"%d x %d = %d\\n\", n, i, n * i); }",
    solution: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    for(int i = 1; i <= 10; i++) {\n        printf(\"%d x %d = %d\\n\", n, i, n * i);\n    }\n    return 0;\n}\n",
    tests: [
      { stdin: "3", attendu: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30" },
      { stdin: "7", attendu: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" }
    ]
  },
  {
    id: "ex-cm01-06",
    chapitre: "cm01",
    titre: "Compte à rebours",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Lis un entier <code>n</code> positif et affiche le compte à rebours de <code>n</code> jusqu'à <code>0</code> (un nombre par ligne), puis la ligne <code>Partez !</code></p>",
    exemple: "Entrée : 3\nSortie :\n3\n2\n1\n0\nPartez !",
    depart: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    /* boucle while(ou for) descendante */\n\n    return 0;\n}\n",
    indice: "while(n >= 0) { printf(\"%d\\n\", n); n--; } puis le printf final.",
    solution: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    while(n >= 0) {\n        printf(\"%d\\n\", n);\n        n--;\n    }\n    printf(\"Partez !\\n\");\n    return 0;\n}\n",
    tests: [
      { stdin: "3", attendu: "3\n2\n1\n0\nPartez !" },
      { stdin: "1", attendu: "1\n0\nPartez !" }
    ]
  },
  {
    id: "ex-cm01-07",
    chapitre: "cm01",
    titre: "Le maximum de trois",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris la fonction <code>int max3(int a, int b, int c)</code> qui retourne le plus grand des trois entiers. <strong>N'écris pas de main</strong> : le testeur appellera ta fonction lui-même.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint max3(int a, int b, int c) {\n    /* ... */\n}\n",
    indice: "Commence par comparer a et b dans une variable m, puis compare m avec c.",
    solution: "int max3(int a, int b, int c) {\n    int m = a;\n    if (b > m) {\n        m = b;\n    }\n    if (c > m) {\n        m = c;\n    }\n    return m;\n}\n",
    harnais: "int main() {\n    printf(\"%d\\n\", max3(1, 2, 3));\n    printf(\"%d\\n\", max3(9, 2, 3));\n    printf(\"%d\\n\", max3(4, 7, 5));\n    printf(\"%d\\n\", max3(-1, -5, -3));\n    printf(\"%d\\n\", max3(2, 2, 2));\n    return 0;\n}\n",
    attendu: "3\n9\n7\n-1\n2"
  },
  {
    id: "ex-cm01-08",
    chapitre: "cm01",
    titre: "FizzBuzz",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Le test d'embauche le plus célèbre du monde ! Lis un entier <code>n</code>, puis pour chaque nombre de 1 à <code>n</code> (un par ligne) : affiche <code>FizzBuzz</code> s'il est multiple de 15, <code>Fizz</code> s'il est multiple de 3, <code>Buzz</code> s'il est multiple de 5, et le nombre lui-même sinon.</p>",
    exemple: "Entrée : 5\nSortie :\n1\n2\nFizz\n4\nBuzz",
    depart: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    /* attention a l'ORDRE des tests ! */\n\n    return 0;\n}\n",
    indice: "Teste d'abord i % 15 == 0, sinon i % 3, sinon i % 5, sinon le nombre. Si tu testes %3 en premier, 15 affichera Fizz !",
    solution: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    for(int i = 1; i <= n; i++) {\n        if (i % 15 == 0) {\n            printf(\"FizzBuzz\\n\");\n        } else if (i % 3 == 0) {\n            printf(\"Fizz\\n\");\n        } else if (i % 5 == 0) {\n            printf(\"Buzz\\n\");\n        } else {\n            printf(\"%d\\n\", i);\n        }\n    }\n    return 0;\n}\n",
    tests: [
      { stdin: "15", attendu: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
      { stdin: "5", attendu: "1\n2\nFizz\n4\nBuzz" }
    ]
  },
  {
    id: "ex-cm01-09",
    chapitre: "cm01",
    titre: "Mini-calculatrice",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Lis une opération au format <code>a op b</code> (par exemple <code>7 + 3</code>) où <code>op</code> est <code>+</code>, <code>-</code>, <code>*</code> ou <code>/</code>. Affiche le résultat (division entière). Si l'utilisateur demande une division par zéro, affiche <code>Erreur : division par zero</code>. Utilise un <code>switch</code> !</p>",
    exemple: "Entrée : 7 + 3\nSortie : 10",
    depart: "#include <stdio.h>\n\nint main() {\n    int a, b;\n    char op;\n    scanf(\"%d %c %d\", &a, &op, &b);\n    /* switch (op) { ... } */\n\n    return 0;\n}\n",
    indice: "switch (op) { case '+': ... break; ... } — pour la division, teste b == 0 AVANT de calculer a / b.",
    solution: "#include <stdio.h>\n\nint main() {\n    int a, b;\n    char op;\n    scanf(\"%d %c %d\", &a, &op, &b);\n    switch (op) {\n        case '+':\n            printf(\"%d\\n\", a + b);\n            break;\n        case '-':\n            printf(\"%d\\n\", a - b);\n            break;\n        case '*':\n            printf(\"%d\\n\", a * b);\n            break;\n        case '/':\n            if (b == 0) {\n                printf(\"Erreur : division par zero\\n\");\n            } else {\n                printf(\"%d\\n\", a / b);\n            }\n            break;\n    }\n    return 0;\n}\n",
    tests: [
      { stdin: "7 + 3", attendu: "10" },
      { stdin: "8 / 0", attendu: "Erreur : division par zero" },
      { stdin: "9 * -2", attendu: "-18" }
    ]
  },

  /* ==================== CM02 — TYPES ==================== */
  {
    id: "ex-cm02-01",
    chapitre: "cm02",
    titre: "La vraie moyenne",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Lis deux entiers et affiche leur moyenne <strong>réelle</strong> avec exactement une décimale (<code>%.1f</code>). Attention au piège de la division entière : il faut un cast !</p>",
    exemple: "Entrée : 7 2\nSortie : 4.5",
    depart: "#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    /* attention : (a + b) / 2 serait une division entiere ! */\n\n    return 0;\n}\n",
    indice: "(a + b) / 2.0 ou (double)(a + b) / 2 — il faut qu'UN des opérandes soit flottant AVANT la division.",
    solution: "#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"%.1f\\n\", (a + b) / 2.0);\n    return 0;\n}\n",
    tests: [
      { stdin: "7 2", attendu: "4.5" },
      { stdin: "4 4", attendu: "4.0" }
    ]
  },
  {
    id: "ex-cm02-02",
    chapitre: "cm02",
    titre: "Celsius vers Fahrenheit",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Lis une température en degrés Celsius (un <code>double</code>, format <code>%lf</code> pour scanf) et affiche sa conversion en Fahrenheit avec une décimale. Formule : <code>F = C × 9/5 + 32</code>. Attention : si tu écris <code>9/5</code> entre entiers, ça vaut 1 !</p>",
    exemple: "Entrée : 100\nSortie : 212.0",
    depart: "#include <stdio.h>\n\nint main() {\n    double c;\n    scanf(\"%lf\", &c);\n    /* F = C * 9/5 + 32 ... mais 9/5 vaut 1 en entier ! */\n\n    return 0;\n}\n",
    indice: "Écris c * 9.0 / 5.0 + 32 (ou c * 1.8 + 32).",
    solution: "#include <stdio.h>\n\nint main() {\n    double c;\n    scanf(\"%lf\", &c);\n    printf(\"%.1f\\n\", c * 9.0 / 5.0 + 32);\n    return 0;\n}\n",
    tests: [
      { stdin: "0", attendu: "32.0" },
      { stdin: "100", attendu: "212.0" },
      { stdin: "37.5", attendu: "99.5" }
    ]
  },
  {
    id: "ex-cm02-03",
    chapitre: "cm02",
    titre: "Le code secret des caractères",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Lis un caractère (<code>%c</code>) et affiche son code ASCII au format exact <code>Le code de X est N</code>. Souviens-toi : un char EST un entier !</p>",
    exemple: "Entrée : A\nSortie : Le code de A est 65",
    depart: "#include <stdio.h>\n\nint main() {\n    char c;\n    scanf(\"%c\", &c);\n    /* affiche le caractere (%c) ET son code (%d) */\n\n    return 0;\n}\n",
    indice: "printf(\"Le code de %c est %d\\n\", c, c); — la même variable, deux formats différents !",
    solution: "#include <stdio.h>\n\nint main() {\n    char c;\n    scanf(\"%c\", &c);\n    printf(\"Le code de %c est %d\\n\", c, c);\n    return 0;\n}\n",
    tests: [
      { stdin: "A", attendu: "Le code de A est 65" },
      { stdin: "z", attendu: "Le code de z est 122" },
      { stdin: "0", attendu: "Le code de 0 est 48" }
    ]
  },
  {
    id: "ex-cm02-04",
    chapitre: "cm02",
    titre: "Majuscule maison",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris la fonction <code>char en_majuscule(char c)</code> qui retourne la version majuscule de <code>c</code> si c'est une lettre minuscule, et <code>c</code> inchangé sinon. <strong>Interdit d'utiliser toupper</strong> : sers-toi de l'arithmétique sur les codes ASCII ('a' vaut 97, 'A' vaut 65).</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nchar en_majuscule(char c) {\n    /* si c est entre 'a' et 'z' ... */\n}\n",
    indice: "if (c >= 'a' && c <= 'z') return c - ('a' - 'A'); — l'écart entre minuscule et majuscule est constant (32).",
    solution: "char en_majuscule(char c) {\n    if (c >= 'a' && c <= 'z') {\n        return c - ('a' - 'A');\n    }\n    return c;\n}\n",
    harnais: "int main() {\n    printf(\"%c%c%c%c\\n\", en_majuscule('a'), en_majuscule('Z'), en_majuscule('!'), en_majuscule('m'));\n    return 0;\n}\n",
    attendu: "AZ!M"
  },
  {
    id: "ex-cm02-05",
    chapitre: "cm02",
    titre: "Voyelle ou consonne ?",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris la fonction <code>int est_voyelle(char c)</code> qui retourne <code>1</code> si <code>c</code> est une voyelle minuscule (a, e, i, o, u, y) et <code>0</code> sinon.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint est_voyelle(char c) {\n    /* ... */\n}\n",
    indice: "Une longue condition avec || (OU logique), ou un switch avec des case qui « tombent » les uns dans les autres.",
    solution: "int est_voyelle(char c) {\n    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'y') {\n        return 1;\n    }\n    return 0;\n}\n",
    harnais: "int main() {\n    printf(\"%d\\n\", est_voyelle('a'));\n    printf(\"%d\\n\", est_voyelle('b'));\n    printf(\"%d\\n\", est_voyelle('y'));\n    printf(\"%d\\n\", est_voyelle('e'));\n    printf(\"%d\\n\", est_voyelle('t'));\n    return 0;\n}\n",
    attendu: "1\n0\n1\n1\n0"
  },
  {
    id: "ex-cm02-06",
    chapitre: "cm02",
    titre: "Conversion de secondes",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Lis un nombre de secondes (entier) et affiche l'équivalent au format exact <code>H h M min S s</code>. C'est un exercice de division entière (<code>/</code>) et de modulo (<code>%</code>).</p>",
    exemple: "Entrée : 3661\nSortie : 1 h 1 min 1 s",
    depart: "#include <stdio.h>\n\nint main() {\n    int total;\n    scanf(\"%d\", &total);\n    /* heures = ? minutes = ? secondes = ? */\n\n    return 0;\n}\n",
    indice: "heures = total / 3600 ; minutes = (total % 3600) / 60 ; secondes = total % 60.",
    solution: "#include <stdio.h>\n\nint main() {\n    int total;\n    scanf(\"%d\", &total);\n    int h = total / 3600;\n    int m = (total % 3600) / 60;\n    int s = total % 60;\n    printf(\"%d h %d min %d s\\n\", h, m, s);\n    return 0;\n}\n",
    tests: [
      { stdin: "3661", attendu: "1 h 1 min 1 s" },
      { stdin: "7325", attendu: "2 h 2 min 5 s" },
      { stdin: "59", attendu: "0 h 0 min 59 s" }
    ]
  },
  {
    id: "ex-cm02-07",
    chapitre: "cm02",
    titre: "L'écriture binaire",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Lis un entier entre 0 et 255 et affiche son écriture binaire sur exactement 8 bits (avec les zéros de tête). Rappel du cours : chaque bit correspond à une puissance de 2 (128, 64, 32, 16, 8, 4, 2, 1).</p>",
    exemple: "Entrée : 5\nSortie : 00000101",
    depart: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    /* parcours les puissances de 2 : 128, 64, 32, ... 1 */\n\n    return 0;\n}\n",
    indice: "for(int bit = 128; bit >= 1; bit = bit / 2) { printf(\"%d\", (n / bit) % 2); } — (n / bit) % 2 extrait le bit correspondant.",
    solution: "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    for(int bit = 128; bit >= 1; bit = bit / 2) {\n        printf(\"%d\", (n / bit) % 2);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
    tests: [
      { stdin: "5", attendu: "00000101" },
      { stdin: "255", attendu: "11111111" },
      { stdin: "200", attendu: "11001000" }
    ]
  },

  /* ==================== CM03 — POINTEURS ==================== */
  {
    id: "ex-cm03-01",
    chapitre: "cm03",
    titre: "L'échange classique",
    difficulte: 1,
    type: "fonction",
    enonce: "<p>L'exercice emblématique du cours sur les pointeurs : écris <code>void echange(int *a, int *b)</code> qui échange les valeurs des deux variables pointées.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid echange(int *a, int *b) {\n    /* il te faut une variable temporaire */\n}\n",
    indice: "int tmp = *a; *a = *b; *b = tmp; — on manipule les VALEURS pointées, jamais les adresses.",
    solution: "void echange(int *a, int *b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\n",
    harnais: "int main() {\n    int x = 3, y = 8;\n    echange(&x, &y);\n    printf(\"%d %d\\n\", x, y);\n    int a = -1, b = 7;\n    echange(&a, &b);\n    printf(\"%d %d\\n\", a, b);\n    return 0;\n}\n",
    attendu: "8 3\n7 -1"
  },
  {
    id: "ex-cm03-02",
    chapitre: "cm03",
    titre: "Doubler à distance",
    difficulte: 1,
    type: "fonction",
    enonce: "<p>Écris <code>void doubler(int *n)</code> qui double la valeur de la variable pointée. C'est le principe du « passage par adresse » : la fonction modifie une variable qui ne lui appartient pas.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid doubler(int *n) {\n    /* ... */\n}\n",
    indice: "*n = *n * 2; ou *n *= 2; — le * déréférence le pointeur pour atteindre la valeur.",
    solution: "void doubler(int *n) {\n    *n = *n * 2;\n}\n",
    harnais: "int main() {\n    int v = 21;\n    doubler(&v);\n    printf(\"%d\\n\", v);\n    int w = -5;\n    doubler(&w);\n    printf(\"%d\\n\", w);\n    return 0;\n}\n",
    attendu: "42\n-10"
  },
  {
    id: "ex-cm03-03",
    chapitre: "cm03",
    titre: "Min et max d'un coup",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Une fonction ne peut retourner qu'une seule valeur avec <code>return</code>… mais grâce aux pointeurs elle peut en « rendre » plusieurs ! Écris <code>void min_max(int a, int b, int *min, int *max)</code> qui range la plus petite des deux valeurs dans <code>*min</code> et la plus grande dans <code>*max</code>.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid min_max(int a, int b, int *min, int *max) {\n    /* ... */\n}\n",
    indice: "if (a < b) { *min = a; *max = b; } else { ... } — on écrit dans les variables de l'appelant via les pointeurs.",
    solution: "void min_max(int a, int b, int *min, int *max) {\n    if (a < b) {\n        *min = a;\n        *max = b;\n    } else {\n        *min = b;\n        *max = a;\n    }\n}\n",
    harnais: "int main() {\n    int mn, mx;\n    min_max(3, 8, &mn, &mx);\n    printf(\"%d %d\\n\", mn, mx);\n    min_max(9, 2, &mn, &mx);\n    printf(\"%d %d\\n\", mn, mx);\n    min_max(4, 4, &mn, &mx);\n    printf(\"%d %d\\n\", mn, mx);\n    return 0;\n}\n",
    attendu: "3 8\n2 9\n4 4"
  },
  {
    id: "ex-cm03-04",
    chapitre: "cm03",
    titre: "Somme d'un tableau",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>int somme(const int *t, int n)</code> qui retourne la somme des <code>n</code> éléments du tableau. Rappelle-toi : un tableau passé à une fonction arrive sous forme de pointeur vers son premier élément.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint somme(const int *t, int n) {\n    /* ... */\n}\n",
    indice: "Un accumulateur initialisé à 0, puis une boucle : s += t[i]; (t[i] fonctionne aussi sur un pointeur !)",
    solution: "int somme(const int *t, int n) {\n    int s = 0;\n    for(int i = 0; i < n; i++) {\n        s += t[i];\n    }\n    return s;\n}\n",
    harnais: "int main() {\n    int t1[] = {1, 2, 3, 4};\n    printf(\"%d\\n\", somme(t1, 4));\n    int t2[] = {-5, 5};\n    printf(\"%d\\n\", somme(t2, 2));\n    int t3[] = {7};\n    printf(\"%d\\n\", somme(t3, 1));\n    return 0;\n}\n",
    attendu: "10\n0\n7"
  },
  {
    id: "ex-cm03-05",
    chapitre: "cm03",
    titre: "+1 pour tout le monde",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>void incrementer(int *t, int n)</code> qui ajoute 1 à chaque élément du tableau. Contrairement à une variable simple, un tableau passé à une fonction est <strong>réellement modifié</strong> — sais-tu pourquoi ?</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid incrementer(int *t, int n) {\n    /* ... */\n}\n",
    indice: "t[i] = t[i] + 1; dans une boucle. La fonction reçoit l'ADRESSE du tableau : elle modifie donc l'original.",
    solution: "void incrementer(int *t, int n) {\n    for(int i = 0; i < n; i++) {\n        t[i] = t[i] + 1;\n    }\n}\n",
    harnais: "int main() {\n    int t[] = {1, 2, 3};\n    incrementer(t, 3);\n    for(int i = 0; i < 3; i++) {\n        printf(\"%d \", t[i]);\n    }\n    printf(\"\\n\");\n    int u[] = {-1, 0, 9, 41};\n    incrementer(u, 4);\n    for(int i = 0; i < 4; i++) {\n        printf(\"%d \", u[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
    attendu: "2 3 4\n0 1 10 42"
  },
  {
    id: "ex-cm03-06",
    chapitre: "cm03",
    titre: "Division euclidienne complète",
    difficulte: 3,
    type: "fonction",
    enonce: "<p>Écris <code>void divmod(int a, int b, int *quotient, int *reste)</code> qui calcule d'un seul coup le quotient et le reste de la division entière de <code>a</code> par <code>b</code> (on suppose <code>b &gt; 0</code>). C'est exactement le genre de fonction « à double résultat » que permettent les pointeurs.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid divmod(int a, int b, int *quotient, int *reste) {\n    /* ... */\n}\n",
    indice: "*quotient = a / b; *reste = a % b; — deux résultats déposés directement chez l'appelant.",
    solution: "void divmod(int a, int b, int *quotient, int *reste) {\n    *quotient = a / b;\n    *reste = a % b;\n}\n",
    harnais: "int main() {\n    int q, r;\n    divmod(17, 5, &q, &r);\n    printf(\"%d %d\\n\", q, r);\n    divmod(8, 2, &q, &r);\n    printf(\"%d %d\\n\", q, r);\n    divmod(3, 7, &q, &r);\n    printf(\"%d %d\\n\", q, r);\n    return 0;\n}\n",
    attendu: "3 2\n4 0\n0 3"
  },
  {
    id: "ex-cm03-07",
    chapitre: "cm03",
    titre: "Retournement sur place",
    difficulte: 3,
    type: "fonction",
    enonce: "<p>Écris <code>void inverser(int *t, int n)</code> qui inverse l'ordre des éléments du tableau <strong>sur place</strong> (sans créer de deuxième tableau). Technique classique : deux indices qui partent des deux extrémités et se rapprochent en échangeant.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid inverser(int *t, int n) {\n    /* deux indices : i au debut, j a la fin */\n}\n",
    indice: "int i = 0, j = n - 1; while(i < j) { echange t[i] et t[j] avec une variable tmp; i++; j--; }",
    solution: "void inverser(int *t, int n) {\n    int i = 0;\n    int j = n - 1;\n    while(i < j) {\n        int tmp = t[i];\n        t[i] = t[j];\n        t[j] = tmp;\n        i++;\n        j--;\n    }\n}\n",
    harnais: "int main() {\n    int t[] = {1, 2, 3, 4, 5};\n    inverser(t, 5);\n    for(int i = 0; i < 5; i++) {\n        printf(\"%d \", t[i]);\n    }\n    printf(\"\\n\");\n    int u[] = {7, 9};\n    inverser(u, 2);\n    printf(\"%d %d\\n\", u[0], u[1]);\n    return 0;\n}\n",
    attendu: "5 4 3 2 1\n9 7"
  },

  /* ==================== CM04 — ALLOCATION DYNAMIQUE ==================== */
  {
    id: "ex-cm04-01",
    chapitre: "cm04",
    titre: "Premier malloc",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Le rituel complet de l'allocation dynamique en 4 étapes : alloue un <code>int</code> sur le tas avec <code>malloc</code>, vérifie que l'allocation a réussi, stocke <code>42</code> dedans et affiche la valeur, puis libère la mémoire avec <code>free</code>.</p>",
    exemple: "Sortie attendue :\n42",
    depart: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    /* 1. allouer un int          */\n    /* 2. tester si NULL          */\n    /* 3. stocker 42 et afficher  */\n    /* 4. liberer                 */\n\n    return 0;\n}\n",
    indice: "int *p = malloc(sizeof(int)); if (p == NULL) return 1; *p = 42; printf... free(p);",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = malloc(sizeof(int));\n    if (p == NULL) {\n        return 1;\n    }\n    *p = 42;\n    printf(\"%d\\n\", *p);\n    free(p);\n    return 0;\n}\n",
    tests: [
      { stdin: "", attendu: "42" }
    ]
  },
  {
    id: "ex-cm04-02",
    chapitre: "cm04",
    titre: "Tableau à la demande",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Lis un entier <code>n</code>, alloue dynamiquement un tableau de <code>n</code> entiers, lis les <code>n</code> valeurs, affiche leur somme, puis libère le tableau. C'est LE cas d'usage de malloc : la taille n'est connue qu'à l'exécution.</p>",
    exemple: "Entrée :\n3\n1 2 3\nSortie : 6",
    depart: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    /* allouer, lire n valeurs, sommer, afficher, liberer */\n\n    return 0;\n}\n",
    indice: "int *t = malloc(n * sizeof(int)); puis une boucle de scanf(\"%d\", &t[i]); puis la somme, puis free(t);",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    int *t = malloc(n * sizeof(int));\n    if (t == NULL) {\n        return 1;\n    }\n    for(int i = 0; i < n; i++) {\n        scanf(\"%d\", &t[i]);\n    }\n    int s = 0;\n    for(int i = 0; i < n; i++) {\n        s += t[i];\n    }\n    printf(\"%d\\n\", s);\n    free(t);\n    return 0;\n}\n",
    tests: [
      { stdin: "3\n1 2 3", attendu: "6" },
      { stdin: "5\n10 20 30 40 50", attendu: "150" }
    ]
  },
  {
    id: "ex-cm04-03",
    chapitre: "cm04",
    titre: "Fabrique de tableaux",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>int *cree_tableau(int n, int valeur)</code> qui alloue un tableau de <code>n</code> entiers, initialise toutes les cases à <code>valeur</code>, et retourne le pointeur (ou <code>NULL</code> si l'allocation échoue). La mémoire du tas survit à la fonction : c'est ce qui permet de « retourner un tableau ».</p>",
    depart: "#include <stdlib.h>\n\n/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint *cree_tableau(int n, int valeur) {\n    /* ... */\n}\n",
    indice: "malloc, test NULL, boucle de remplissage, return t; — c'est l'appelant qui fera le free.",
    solution: "#include <stdlib.h>\n\nint *cree_tableau(int n, int valeur) {\n    int *t = malloc(n * sizeof(int));\n    if (t == NULL) {\n        return NULL;\n    }\n    for(int i = 0; i < n; i++) {\n        t[i] = valeur;\n    }\n    return t;\n}\n",
    harnais: "int main() {\n    int *t = cree_tableau(4, 7);\n    if (t == NULL) {\n        printf(\"NULL\\n\");\n        return 1;\n    }\n    printf(\"%d %d\\n\", t[0], t[3]);\n    free(t);\n    int *u = cree_tableau(2, -1);\n    printf(\"%d %d\\n\", u[0], u[1]);\n    free(u);\n    return 0;\n}\n",
    attendu: "7 7\n-1 -1"
  },
  {
    id: "ex-cm04-04",
    chapitre: "cm04",
    titre: "La photocopieuse",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>int *copier(const int *t, int n)</code> qui retourne une <strong>copie indépendante</strong> du tableau (allouée dynamiquement). Le test vérifie que modifier la copie ne touche pas l'original !</p>",
    depart: "#include <stdlib.h>\n\n/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint *copier(const int *t, int n) {\n    /* allouer PUIS recopier case par case */\n}\n",
    indice: "Un simple c = t ne copierait que l'adresse ! Il faut allouer un nouveau bloc et recopier les valeurs une par une.",
    solution: "#include <stdlib.h>\n\nint *copier(const int *t, int n) {\n    int *c = malloc(n * sizeof(int));\n    if (c == NULL) {\n        return NULL;\n    }\n    for(int i = 0; i < n; i++) {\n        c[i] = t[i];\n    }\n    return c;\n}\n",
    harnais: "int main() {\n    int orig[] = {1, 2, 3};\n    int *c = copier(orig, 3);\n    if (c == NULL) {\n        printf(\"NULL\\n\");\n        return 1;\n    }\n    c[0] = 99;\n    printf(\"%d %d %d\\n\", orig[0], c[0], c[2]);\n    free(c);\n    return 0;\n}\n",
    attendu: "1 99 3"
  },
  {
    id: "ex-cm04-05",
    chapitre: "cm04",
    titre: "Le tableau qui grandit",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Lis des entiers jusqu'à rencontrer la sentinelle <code>-1</code>, et stocke-les dans un tableau dynamique dont tu ne connais pas la taille à l'avance : commence avec une capacité de 2, et <strong>double-la avec realloc</strong> à chaque fois qu'elle est pleine. Affiche ensuite <code>N valeurs :</code> suivi des valeurs sur la même ligne, puis libère.</p>",
    exemple: "Entrée : 5 8 2 9 -1\nSortie : 4 valeurs : 5 8 2 9",
    depart: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int capacite = 2;\n    int n = 0;\n    int *t = malloc(capacite * sizeof(int));\n    /* lire jusqu'a -1, realloc quand n == capacite */\n\n    return 0;\n}\n",
    indice: "if (n == capacite) { capacite *= 2; t = realloc(t, capacite * sizeof(int)); } puis t[n] = valeur; n++;",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int capacite = 2;\n    int n = 0;\n    int *t = malloc(capacite * sizeof(int));\n    if (t == NULL) {\n        return 1;\n    }\n    int v;\n    scanf(\"%d\", &v);\n    while(v != -1) {\n        if (n == capacite) {\n            capacite = capacite * 2;\n            t = realloc(t, capacite * sizeof(int));\n            if (t == NULL) {\n                return 1;\n            }\n        }\n        t[n] = v;\n        n++;\n        scanf(\"%d\", &v);\n    }\n    printf(\"%d valeurs :\", n);\n    for(int i = 0; i < n; i++) {\n        printf(\" %d\", t[i]);\n    }\n    printf(\"\\n\");\n    free(t);\n    return 0;\n}\n",
    tests: [
      { stdin: "5 8 2 9 -1", attendu: "4 valeurs : 5 8 2 9" },
      { stdin: "1 2 3 4 5 6 7 -1", attendu: "7 valeurs : 1 2 3 4 5 6 7" }
    ]
  },
  {
    id: "ex-cm04-06",
    chapitre: "cm04",
    titre: "La matrice dynamique",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Lis deux entiers <code>n</code> (lignes) et <code>m</code> (colonnes). Alloue une matrice dynamique <code>int **</code> (un tableau de <code>n</code> pointeurs, puis chaque ligne de <code>m</code> entiers). Remplis-la avec <code>mat[i][j] = i * m + j</code>, affiche-la ligne par ligne (valeurs séparées par des espaces), puis libère TOUT (n free + 1 !).</p>",
    exemple: "Entrée : 2 3\nSortie :\n0 1 2\n3 4 5",
    depart: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, m;\n    scanf(\"%d %d\", &n, &m);\n    /* 1. allouer le tableau de n pointeurs      */\n    /* 2. allouer chaque ligne de m entiers      */\n    /* 3. remplir : mat[i][j] = i * m + j        */\n    /* 4. afficher                               */\n    /* 5. liberer chaque ligne PUIS le tableau   */\n\n    return 0;\n}\n",
    indice: "int **mat = malloc(n * sizeof(int *)); puis mat[i] = malloc(m * sizeof(int)); dans une boucle. Libération : d'abord les mat[i], ensuite mat.",
    solution: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, m;\n    scanf(\"%d %d\", &n, &m);\n    int **mat = malloc(n * sizeof(int *));\n    if (mat == NULL) {\n        return 1;\n    }\n    for(int i = 0; i < n; i++) {\n        mat[i] = malloc(m * sizeof(int));\n        if (mat[i] == NULL) {\n            return 1;\n        }\n    }\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < m; j++) {\n            mat[i][j] = i * m + j;\n        }\n    }\n    for(int i = 0; i < n; i++) {\n        for(int j = 0; j < m; j++) {\n            printf(\"%d \", mat[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    for(int i = 0; i < n; i++) {\n        free(mat[i]);\n    }\n    free(mat);\n    return 0;\n}\n",
    tests: [
      { stdin: "2 3", attendu: "0 1 2\n3 4 5" },
      { stdin: "3 2", attendu: "0 1\n2 3\n4 5" }
    ]
  },

  /* ==================== CM05 — STRUCTURES ==================== */
  {
    id: "ex-cm05-01",
    chapitre: "cm05",
    titre: "Mon premier struct",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Définis une structure <code>Point</code> avec deux champs entiers <code>x</code> et <code>y</code>. Lis deux entiers, range-les dans un Point, et affiche-le au format exact <code>(x, y)</code>.</p>",
    exemple: "Entrée : 3 7\nSortie : (3, 7)",
    depart: "#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nint main() {\n    Point p;\n    /* lire p.x et p.y puis afficher (x, y) */\n\n    return 0;\n}\n",
    indice: "scanf(\"%d %d\", &p.x, &p.y); — on prend l'adresse du CHAMP. Puis printf(\"(%d, %d)\\n\", p.x, p.y);",
    solution: "#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nint main() {\n    Point p;\n    scanf(\"%d %d\", &p.x, &p.y);\n    printf(\"(%d, %d)\\n\", p.x, p.y);\n    return 0;\n}\n",
    tests: [
      { stdin: "3 7", attendu: "(3, 7)" },
      { stdin: "-2 0", attendu: "(-2, 0)" }
    ]
  },
  {
    id: "ex-cm05-02",
    chapitre: "cm05",
    titre: "Le point du milieu",
    difficulte: 1,
    type: "fonction",
    enonce: "<p>Le typedef <code>Point</code> (champs <code>double x, y</code>) est fourni : <strong>garde-le tel quel</strong> et écris en dessous la fonction <code>Point milieu(Point a, Point b)</code> qui retourne le point situé au milieu du segment [a, b].</p>",
    depart: "typedef struct {\n    double x;\n    double y;\n} Point;\n\n/* Ecris la fonction ci-dessous (pas de main !) */\nPoint milieu(Point a, Point b) {\n    /* ... */\n}\n",
    indice: "Déclare un Point m; puis m.x = (a.x + b.x) / 2; idem pour y; return m;",
    solution: "typedef struct {\n    double x;\n    double y;\n} Point;\n\nPoint milieu(Point a, Point b) {\n    Point m;\n    m.x = (a.x + b.x) / 2;\n    m.y = (a.y + b.y) / 2;\n    return m;\n}\n",
    harnais: "int main() {\n    Point a = {0, 0};\n    Point b = {4, 2};\n    Point m = milieu(a, b);\n    printf(\"%.1f %.1f\\n\", m.x, m.y);\n    Point c = {1, 2};\n    Point d = {2, 5};\n    Point n = milieu(c, d);\n    printf(\"%.1f %.1f\\n\", n.x, n.y);\n    return 0;\n}\n",
    attendu: "2.0 1.0\n1.5 3.5"
  },
  {
    id: "ex-cm05-03",
    chapitre: "cm05",
    titre: "Joyeux anniversaire",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Le typedef <code>Personne</code> est fourni. Écris <code>void anniversaire(Personne *p)</code> qui augmente l'âge de 1. La fonction reçoit un <strong>pointeur</strong> : c'est l'occasion d'utiliser la flèche <code>-&gt;</code> !</p>",
    depart: "typedef struct {\n    char nom[30];\n    int age;\n} Personne;\n\n/* Ecris la fonction ci-dessous (pas de main !) */\nvoid anniversaire(Personne *p) {\n    /* ... */\n}\n",
    indice: "p->age = p->age + 1; (ou p->age += 1;) — la flèche remplace le duo (*p).age",
    solution: "typedef struct {\n    char nom[30];\n    int age;\n} Personne;\n\nvoid anniversaire(Personne *p) {\n    p->age = p->age + 1;\n}\n",
    harnais: "int main() {\n    Personne alice = {\"Alice\", 20};\n    anniversaire(&alice);\n    printf(\"%s a %d ans\\n\", alice.nom, alice.age);\n    Personne bob = {\"Bob\", 41};\n    anniversaire(&bob);\n    printf(\"%s a %d ans\\n\", bob.nom, bob.age);\n    return 0;\n}\n",
    attendu: "Alice a 21 ans\nBob a 42 ans"
  },
  {
    id: "ex-cm05-04",
    chapitre: "cm05",
    titre: "Géométrie du rectangle",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Le typedef <code>Rectangle</code> (champs <code>largeur</code> et <code>hauteur</code>, entiers) est fourni. Écris DEUX fonctions : <code>int aire(Rectangle r)</code> et <code>int perimetre(Rectangle r)</code>. Ici la structure est passée <strong>par valeur</strong> : pas besoin de pointeur puisqu'on ne la modifie pas.</p>",
    depart: "typedef struct {\n    int largeur;\n    int hauteur;\n} Rectangle;\n\n/* Ecris les DEUX fonctions ci-dessous (pas de main !) */\n",
    indice: "aire : r.largeur * r.hauteur — périmètre : 2 * (r.largeur + r.hauteur). Accès avec le point, c'est une valeur, pas un pointeur.",
    solution: "typedef struct {\n    int largeur;\n    int hauteur;\n} Rectangle;\n\nint aire(Rectangle r) {\n    return r.largeur * r.hauteur;\n}\n\nint perimetre(Rectangle r) {\n    return 2 * (r.largeur + r.hauteur);\n}\n",
    harnais: "int main() {\n    Rectangle r1 = {4, 3};\n    printf(\"%d %d\\n\", aire(r1), perimetre(r1));\n    Rectangle r2 = {5, 5};\n    printf(\"%d %d\\n\", aire(r2), perimetre(r2));\n    return 0;\n}\n",
    attendu: "12 14\n25 20"
  },
  {
    id: "ex-cm05-05",
    chapitre: "cm05",
    titre: "Le major de promo",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Définis une structure <code>Etudiant</code> (nom : chaîne de 30, note : entier). Lis un entier <code>n</code>, puis <code>n</code> lignes au format <code>nom note</code>. Affiche le major au format exact <code>Major : NOM (NOTE)</code>. Utilise un <strong>tableau de structures</strong>.</p>",
    exemple: "Entrée :\n3\nAlice 15\nBob 17\nChloe 12\nSortie : Major : Bob (17)",
    depart: "#include <stdio.h>\n\ntypedef struct {\n    char nom[30];\n    int note;\n} Etudiant;\n\nint main() {\n    Etudiant promo[100];\n    int n;\n    scanf(\"%d\", &n);\n    /* lire les n etudiants : scanf(\"%s %d\", ...) */\n    /* chercher celui qui a la meilleure note      */\n\n    return 0;\n}\n",
    indice: "scanf(\"%s %d\", promo[i].nom, &promo[i].note); — pas de & devant le nom (c'est déjà un tableau). Puis garde l'indice du meilleur.",
    solution: "#include <stdio.h>\n\ntypedef struct {\n    char nom[30];\n    int note;\n} Etudiant;\n\nint main() {\n    Etudiant promo[100];\n    int n;\n    scanf(\"%d\", &n);\n    for(int i = 0; i < n; i++) {\n        scanf(\"%s %d\", promo[i].nom, &promo[i].note);\n    }\n    int meilleur = 0;\n    for(int i = 1; i < n; i++) {\n        if (promo[i].note > promo[meilleur].note) {\n            meilleur = i;\n        }\n    }\n    printf(\"Major : %s (%d)\\n\", promo[meilleur].nom, promo[meilleur].note);\n    return 0;\n}\n",
    tests: [
      { stdin: "3\nAlice 15\nBob 17\nChloe 12", attendu: "Major : Bob (17)" },
      { stdin: "2\nMax 8\nZoe 19", attendu: "Major : Zoe (19)" }
    ]
  },
  {
    id: "ex-cm05-06",
    chapitre: "cm05",
    titre: "Fractions simplifiées",
    difficulte: 3,
    type: "fonction",
    enonce: "<p>Le typedef <code>Fraction</code> (champs <code>num</code> et <code>den</code>, positifs) est fourni. Écris <code>Fraction simplifier(Fraction f)</code> qui retourne la fraction réduite : divise numérateur et dénominateur par leur PGCD (algorithme d'Euclide : tant que b ≠ 0, remplacer (a, b) par (b, a % b)).</p>",
    depart: "typedef struct {\n    int num;\n    int den;\n} Fraction;\n\n/* Ecris la fonction ci-dessous (pas de main !).\n   Tu peux ecrire une fonction pgcd en plus si tu veux. */\nFraction simplifier(Fraction f) {\n    /* ... */\n}\n",
    indice: "int a = f.num, b = f.den; while(b != 0) { int r = a % b; a = b; b = r; } — à la fin, a est le PGCD.",
    solution: "typedef struct {\n    int num;\n    int den;\n} Fraction;\n\nFraction simplifier(Fraction f) {\n    int a = f.num;\n    int b = f.den;\n    while(b != 0) {\n        int r = a % b;\n        a = b;\n        b = r;\n    }\n    Fraction resultat;\n    resultat.num = f.num / a;\n    resultat.den = f.den / a;\n    return resultat;\n}\n",
    harnais: "int main() {\n    Fraction f1 = {6, 8};\n    Fraction r1 = simplifier(f1);\n    printf(\"%d/%d\\n\", r1.num, r1.den);\n    Fraction f2 = {10, 5};\n    Fraction r2 = simplifier(f2);\n    printf(\"%d/%d\\n\", r2.num, r2.den);\n    Fraction f3 = {7, 13};\n    Fraction r3 = simplifier(f3);\n    printf(\"%d/%d\\n\", r3.num, r3.den);\n    return 0;\n}\n",
    attendu: "3/4\n2/1\n7/13"
  },

  /* ==================== CM06 — CHAÎNES ==================== */
  {
    id: "ex-cm06-01",
    chapitre: "cm06",
    titre: "strlen maison",
    difficulte: 1,
    type: "fonction",
    enonce: "<p>Écris <code>int longueur(const char *s)</code> qui retourne la longueur de la chaîne <strong>sans utiliser strlen</strong>. Rappelle-toi : une chaîne se termine toujours par <code>'\\0'</code>.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !)\n   strlen est INTERDIT ici :) */\nint longueur(const char *s) {\n    /* ... */\n}\n",
    indice: "int i = 0; while(s[i] != '\\0') { i++; } return i;",
    solution: "int longueur(const char *s) {\n    int i = 0;\n    while(s[i] != '\\0') {\n        i++;\n    }\n    return i;\n}\n",
    harnais: "int main() {\n    printf(\"%d\\n\", longueur(\"chat\"));\n    printf(\"%d\\n\", longueur(\"\"));\n    printf(\"%d\\n\", longueur(\"Bonjour !\"));\n    return 0;\n}\n",
    attendu: "4\n0\n9"
  },
  {
    id: "ex-cm06-02",
    chapitre: "cm06",
    titre: "Compteur de lettres",
    difficulte: 1,
    type: "fonction",
    enonce: "<p>Écris <code>int compter(const char *s, char c)</code> qui retourne le nombre d'occurrences du caractère <code>c</code> dans la chaîne <code>s</code>.</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint compter(const char *s, char c) {\n    /* ... */\n}\n",
    indice: "Parcours la chaîne jusqu'au '\\0' et incrémente un compteur quand s[i] == c.",
    solution: "int compter(const char *s, char c) {\n    int nb = 0;\n    for(int i = 0; s[i] != '\\0'; i++) {\n        if (s[i] == c) {\n            nb++;\n        }\n    }\n    return nb;\n}\n",
    harnais: "int main() {\n    printf(\"%d\\n\", compter(\"ananas\", 'a'));\n    printf(\"%d\\n\", compter(\"hello\", 'z'));\n    printf(\"%d\\n\", compter(\"mississippi\", 's'));\n    return 0;\n}\n",
    attendu: "3\n0\n4"
  },
  {
    id: "ex-cm06-03",
    chapitre: "cm06",
    titre: "CRIER",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>void en_majuscules(char *s)</code> qui transforme la chaîne <strong>sur place</strong> : chaque lettre minuscule devient majuscule, les autres caractères restent inchangés. (Arithmétique ASCII, comme au CM02 !)</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid en_majuscules(char *s) {\n    /* ... */\n}\n",
    indice: "Boucle sur s[i] jusqu'au '\\0' ; si s[i] est entre 'a' et 'z', fais s[i] = s[i] - ('a' - 'A');",
    solution: "void en_majuscules(char *s) {\n    for(int i = 0; s[i] != '\\0'; i++) {\n        if (s[i] >= 'a' && s[i] <= 'z') {\n            s[i] = s[i] - ('a' - 'A');\n        }\n    }\n}\n",
    harnais: "int main() {\n    char s1[] = \"Salut toi !\";\n    en_majuscules(s1);\n    printf(\"%s\\n\", s1);\n    char s2[] = \"abc123\";\n    en_majuscules(s2);\n    printf(\"%s\\n\", s2);\n    return 0;\n}\n",
    attendu: "SALUT TOI !\nABC123"
  },
  {
    id: "ex-cm06-04",
    chapitre: "cm06",
    titre: "strcpy maison",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>void ma_strcpy(char *dest, const char *src)</code> qui copie la chaîne <code>src</code> dans <code>dest</code>, <strong>y compris le '\\0' final</strong> (c'est lui qu'on oublie toujours…). Sans utiliser strcpy, évidemment !</p>",
    depart: "/* Ecris UNIQUEMENT la fonction (pas de main !)\n   strcpy est INTERDIT ici :) */\nvoid ma_strcpy(char *dest, const char *src) {\n    /* ... */\n}\n",
    indice: "Copie src[i] dans dest[i] tant que src[i] != '\\0', puis ajoute dest[i] = '\\0'; après la boucle.",
    solution: "void ma_strcpy(char *dest, const char *src) {\n    int i = 0;\n    while(src[i] != '\\0') {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n}\n",
    harnais: "int main() {\n    char buf[50];\n    ma_strcpy(buf, \"pointeur\");\n    printf(\"%s\\n\", buf);\n    ma_strcpy(buf, \"ok\");\n    printf(\"%s\\n\", buf);\n    return 0;\n}\n",
    attendu: "pointeur\nok"
  },
  {
    id: "ex-cm06-05",
    chapitre: "cm06",
    titre: "Le mot à l'envers",
    difficulte: 2,
    type: "fonction",
    enonce: "<p>Écris <code>void inverser_chaine(char *s)</code> qui inverse la chaîne <strong>sur place</strong> (« code » devient « edoc »). Même technique que pour le tableau du CM03, mais il faut d'abord trouver la longueur !</p>",
    depart: "#include <string.h>\n\n/* Ecris UNIQUEMENT la fonction (pas de main !) */\nvoid inverser_chaine(char *s) {\n    /* ... */\n}\n",
    indice: "int i = 0, j = strlen(s) - 1; puis échange s[i] et s[j] tant que i < j.",
    solution: "#include <string.h>\n\nvoid inverser_chaine(char *s) {\n    int i = 0;\n    int j = strlen(s) - 1;\n    while(i < j) {\n        char tmp = s[i];\n        s[i] = s[j];\n        s[j] = tmp;\n        i++;\n        j--;\n    }\n}\n",
    harnais: "int main() {\n    char s1[] = \"code\";\n    inverser_chaine(s1);\n    printf(\"%s\\n\", s1);\n    char s2[] = \"a\";\n    inverser_chaine(s2);\n    printf(\"%s\\n\", s2);\n    char s3[] = \"ab\";\n    inverser_chaine(s3);\n    printf(\"%s\\n\", s3);\n    return 0;\n}\n",
    attendu: "edoc\na\nba"
  },
  {
    id: "ex-cm06-06",
    chapitre: "cm06",
    titre: "Palindrome",
    difficulte: 3,
    type: "fonction",
    enonce: "<p>Écris <code>int est_palindrome(const char *s)</code> qui retourne <code>1</code> si la chaîne se lit pareil dans les deux sens (« radar », « kayak »…), <code>0</code> sinon. La chaîne vide est un palindrome.</p>",
    depart: "#include <string.h>\n\n/* Ecris UNIQUEMENT la fonction (pas de main !) */\nint est_palindrome(const char *s) {\n    /* ... */\n}\n",
    indice: "Deux indices depuis les extrémités : si s[i] != s[j] à un moment, retourne 0 tout de suite. Si la boucle se termine, retourne 1.",
    solution: "#include <string.h>\n\nint est_palindrome(const char *s) {\n    int i = 0;\n    int j = strlen(s) - 1;\n    while(i < j) {\n        if (s[i] != s[j]) {\n            return 0;\n        }\n        i++;\n        j--;\n    }\n    return 1;\n}\n",
    harnais: "int main() {\n    printf(\"%d\\n\", est_palindrome(\"radar\"));\n    printf(\"%d\\n\", est_palindrome(\"kayak\"));\n    printf(\"%d\\n\", est_palindrome(\"chat\"));\n    printf(\"%d\\n\", est_palindrome(\"\"));\n    printf(\"%d\\n\", est_palindrome(\"aa\"));\n    return 0;\n}\n",
    attendu: "1\n1\n0\n1\n1"
  },
  {
    id: "ex-cm06-07",
    chapitre: "cm06",
    titre: "Compte les mots",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Lis une ligne entière avec <code>fgets</code> et compte le nombre de mots (groupes de caractères séparés par des espaces — il peut y en avoir plusieurs d'affilée !). Affiche <code>N mot(s)</code>. Astuce : compte les <strong>débuts</strong> de mots, c'est-à-dire les caractères non-espace précédés d'un espace (ou du début de ligne).</p>",
    exemple: "Entrée : Bonjour tout le monde\nSortie : 4 mot(s)",
    depart: "#include <stdio.h>\n\nint main() {\n    char ligne[200];\n    fgets(ligne, 200, stdin);\n    /* parcourir la ligne caractere par caractere */\n\n    return 0;\n}\n",
    indice: "Garde un drapeau dansMot (0 ou 1). Quand tu vois un caractère qui n'est ni ' ' ni '\\n' ni '\\t' alors que dansMot vaut 0 : nouveau mot ! (compteur++ et dansMot = 1). Sur un espace : dansMot = 0.",
    solution: "#include <stdio.h>\n\nint main() {\n    char ligne[200];\n    fgets(ligne, 200, stdin);\n    int nb = 0;\n    int dansMot = 0;\n    for(int i = 0; ligne[i] != '\\0'; i++) {\n        char c = ligne[i];\n        if (c == ' ' || c == '\\n' || c == '\\t') {\n            dansMot = 0;\n        } else {\n            if (dansMot == 0) {\n                nb++;\n            }\n            dansMot = 1;\n        }\n    }\n    printf(\"%d mot(s)\\n\", nb);\n    return 0;\n}\n",
    tests: [
      { stdin: "Bonjour tout le monde", attendu: "4 mot(s)" },
      { stdin: "   du    vide   partout   ", attendu: "3 mot(s)" },
      { stdin: "salut", attendu: "1 mot(s)" }
    ]
  },

  /* ==================== CM07 — FICHIERS ==================== */
  {
    id: "ex-cm07-01",
    chapitre: "cm07",
    titre: "Écrire puis relire",
    difficulte: 1,
    type: "programme",
    enonce: "<p>Le cycle complet : ouvre <code>message.txt</code> en écriture (<code>\"w\"</code>), écris-y la ligne <code>Bonjour fichier</code>, ferme. Puis rouvre-le en lecture (<code>\"r\"</code>), lis la ligne avec <code>fgets</code> et affiche-la à l'écran. N'oublie pas de tester les retours de fopen !</p>",
    exemple: "Sortie attendue :\nBonjour fichier",
    depart: "#include <stdio.h>\n\nint main() {\n    /* 1. fopen en \"w\", fprintf, fclose  */\n    /* 2. fopen en \"r\", fgets, printf    */\n\n    return 0;\n}\n",
    indice: "fprintf(f, \"Bonjour fichier\\n\"); pour écrire — fgets(ligne, 100, f); puis printf(\"%s\", ligne); pour relire.",
    solution: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"message.txt\", \"w\");\n    if (f == NULL) {\n        return 1;\n    }\n    fprintf(f, \"Bonjour fichier\\n\");\n    fclose(f);\n\n    f = fopen(\"message.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    char ligne[100];\n    fgets(ligne, 100, f);\n    printf(\"%s\", ligne);\n    fclose(f);\n    return 0;\n}\n",
    tests: [
      { stdin: "", attendu: "Bonjour fichier" }
    ]
  },
  {
    id: "ex-cm07-02",
    chapitre: "cm07",
    titre: "Les carrés dans un fichier",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Écris les carrés de 1 à 5 dans <code>carres.txt</code> (un par ligne, avec <code>fprintf</code>), ferme le fichier. Rouvre-le en lecture, relis les 5 nombres avec <code>fscanf</code> et affiche leur somme (qui doit valoir 55).</p>",
    exemple: "Sortie attendue :\n55",
    depart: "#include <stdio.h>\n\nint main() {\n    /* phase 1 : ecrire 1, 4, 9, 16, 25 dans carres.txt */\n    /* phase 2 : relire avec fscanf et sommer           */\n\n    return 0;\n}\n",
    indice: "Écriture : fprintf(f, \"%d\\n\", i * i); — Lecture : fscanf(f, \"%d\", &v) dans une boucle, comme scanf mais avec le fichier en premier.",
    solution: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"carres.txt\", \"w\");\n    if (f == NULL) {\n        return 1;\n    }\n    for(int i = 1; i <= 5; i++) {\n        fprintf(f, \"%d\\n\", i * i);\n    }\n    fclose(f);\n\n    f = fopen(\"carres.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    int somme = 0;\n    int v;\n    for(int i = 0; i < 5; i++) {\n        fscanf(f, \"%d\", &v);\n        somme += v;\n    }\n    fclose(f);\n    printf(\"%d\\n\", somme);\n    return 0;\n}\n",
    tests: [
      { stdin: "", attendu: "55" }
    ]
  },
  {
    id: "ex-cm07-03",
    chapitre: "cm07",
    titre: "La somme du fichier",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Un fichier <code>nombres.txt</code> est fourni dans le dossier d'exécution (un entier par ligne, nombre de lignes inconnu !). Lis tous les entiers avec <code>fscanf</code> <strong>jusqu'à ce que la lecture échoue</strong>, puis affiche la somme et le nombre de valeurs au format exact de l'exemple.</p>",
    exemple: "Sortie attendue :\nSomme : 100\nNombre de valeurs : 5",
    depart: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"nombres.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    /* boucle : tant que fscanf(f, \"%d\", &v) == 1 */\n\n    fclose(f);\n    return 0;\n}\n",
    indice: "fscanf retourne le nombre de valeurs lues avec succès : while(fscanf(f, \"%d\", &v) == 1) { somme += v; nb++; }",
    solution: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"nombres.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    int somme = 0;\n    int nb = 0;\n    int v;\n    while(fscanf(f, \"%d\", &v) == 1) {\n        somme += v;\n        nb++;\n    }\n    fclose(f);\n    printf(\"Somme : %d\\n\", somme);\n    printf(\"Nombre de valeurs : %d\\n\", nb);\n    return 0;\n}\n",
    fichiers: [
      { nom: "nombres.txt", contenu: "12\n7\n30\n1\n50\n" }
    ],
    tests: [
      { stdin: "", attendu: "Somme : 100\nNombre de valeurs : 5" }
    ]
  },
  {
    id: "ex-cm07-04",
    chapitre: "cm07",
    titre: "Compteur de lignes",
    difficulte: 2,
    type: "programme",
    enonce: "<p>Un fichier <code>poeme.txt</code> est fourni. Compte son nombre de lignes en le lisant avec <code>fgets</code> (chaque appel réussi = une ligne), et affiche <code>N lignes</code>.</p>",
    exemple: "Sortie attendue :\n4 lignes",
    depart: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"poeme.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    char ligne[200];\n    /* tant que fgets(...) != NULL : compter */\n\n    fclose(f);\n    return 0;\n}\n",
    indice: "while(fgets(ligne, 200, f) != NULL) { nb++; } — fgets retourne NULL quand il n'y a plus rien à lire.",
    solution: "#include <stdio.h>\n\nint main() {\n    FILE *f = fopen(\"poeme.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    char ligne[200];\n    int nb = 0;\n    while(fgets(ligne, 200, f) != NULL) {\n        nb++;\n    }\n    fclose(f);\n    printf(\"%d lignes\\n\", nb);\n    return 0;\n}\n",
    fichiers: [
      { nom: "poeme.txt", contenu: "Le C est rapide\nLe C est puissant\nLe C est partout\nVive le C\n" }
    ],
    tests: [
      { stdin: "", attendu: "4 lignes" }
    ]
  },
  {
    id: "ex-cm07-05",
    chapitre: "cm07",
    titre: "La photocopie de fichier",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Un fichier <code>source.txt</code> est fourni. Copie-le caractère par caractère vers <code>copie.txt</code> avec <code>fgetc</code> / <code>fputc</code>, en comptant les caractères copiés. Pour prouver que la copie a fonctionné : rouvre <code>copie.txt</code>, affiche son contenu, puis affiche <code>N caracteres copies</code>.</p>",
    exemple: "Sortie attendue :\nLe C, c'est du sport !\n23 caracteres copies",
    depart: "#include <stdio.h>\n\nint main() {\n    /* 1. ouvrir source.txt en \"r\" et copie.txt en \"w\"  */\n    /* 2. boucle : c = fgetc(src) ; tant que c != EOF     */\n    /* 3. fermer les deux                                 */\n    /* 4. relire copie.txt et l'afficher                  */\n    /* 5. afficher le compteur                            */\n\n    return 0;\n}\n",
    indice: "int c; while((c = fgetc(src)) != EOF) { fputc(c, dst); nb++; } — c doit être un int pour pouvoir contenir EOF !",
    solution: "#include <stdio.h>\n\nint main() {\n    FILE *src = fopen(\"source.txt\", \"r\");\n    FILE *dst = fopen(\"copie.txt\", \"w\");\n    if (src == NULL || dst == NULL) {\n        return 1;\n    }\n    int c;\n    int nb = 0;\n    while((c = fgetc(src)) != EOF) {\n        fputc(c, dst);\n        nb++;\n    }\n    fclose(src);\n    fclose(dst);\n\n    FILE *verif = fopen(\"copie.txt\", \"r\");\n    if (verif == NULL) {\n        return 1;\n    }\n    while((c = fgetc(verif)) != EOF) {\n        putchar(c);\n    }\n    fclose(verif);\n    printf(\"%d caracteres copies\\n\", nb);\n    return 0;\n}\n",
    fichiers: [
      { nom: "source.txt", contenu: "Le C, c'est du sport !\n" }
    ],
    tests: [
      { stdin: "", attendu: "Le C, c'est du sport !\n23 caracteres copies" }
    ]
  },
  {
    id: "ex-cm07-06",
    chapitre: "cm07",
    titre: "Le meilleur score",
    difficulte: 3,
    type: "programme",
    enonce: "<p>Un fichier <code>scores.txt</code> est fourni, au format <code>nom score</code> (une paire par ligne, nombre de lignes inconnu). Lis-le avec <code>fscanf(f, \"%s %d\", ...)</code> et affiche la ligne du meilleur au format exact <code>Meilleur : NOM (SCORE)</code>. C'est la synthèse du cours : fichiers + chaînes + comparaisons !</p>",
    exemple: "Sortie attendue :\nMeilleur : Chloe (19)",
    depart: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    FILE *f = fopen(\"scores.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    char nom[50];\n    int score;\n    /* boucle de lecture + memoriser le meilleur     */\n    /* (il faudra strcpy pour memoriser le nom !)    */\n\n    fclose(f);\n    return 0;\n}\n",
    indice: "while(fscanf(f, \"%s %d\", nom, &score) == 2) { if (score > meilleurScore) { meilleurScore = score; strcpy(meilleurNom, nom); } }",
    solution: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    FILE *f = fopen(\"scores.txt\", \"r\");\n    if (f == NULL) {\n        return 1;\n    }\n    char nom[50];\n    char meilleurNom[50];\n    int score;\n    int meilleurScore = -1;\n    while(fscanf(f, \"%s %d\", nom, &score) == 2) {\n        if (score > meilleurScore) {\n            meilleurScore = score;\n            strcpy(meilleurNom, nom);\n        }\n    }\n    fclose(f);\n    printf(\"Meilleur : %s (%d)\\n\", meilleurNom, meilleurScore);\n    return 0;\n}\n",
    fichiers: [
      { nom: "scores.txt", contenu: "Alice 15\nBob 8\nChloe 19\nDavid 11\n" }
    ],
    tests: [
      { stdin: "", attendu: "Meilleur : Chloe (19)" }
    ]
  }
];
