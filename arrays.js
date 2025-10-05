/*
====================================================
 JS ARRAYS & ARRAY-METODER – 1H LIVEKODNING
====================================================

 Syfte: Ge en trygg, praktisk genomgång av vanliga array-metoder i JS
 med fokus på vad de gör, när de används och hur de påverkar originaldatan.

 Struktur (förslag, ca 60 min):
  0–5 min   : Intro till arrays + läsa/skriva värden
  5–15 min  : Lägga till / ta bort: push, pop, shift, unshift, splice, slice
 15–25 min  : Hitta & kontrollera: indexOf, includes, find, findIndex
 25–40 min  : Transformera & filtrera: map, filter, reduce (+ some, every)
 40–50 min  : Sortera & jämföra: sort (sträng vs nummer), reverse
 50–60 min  : Kedjor, spridning (...), destrukturering, små uppgifter

 Tips under lektionen:
  - Visa i konsolen vad som returneras OCH hur originalarrayen påverkas.
  - Säg högt om metoden MUTERAR originalet (förändrar arrayen) eller ej.
  - Jämför "imperativt" (for-loop) mot metod-baserat (map/filter).

 Användning: Kör filen i Node (node arrays.js) eller i devtools-konsolen.
*/

console.log("\n==============================");
console.log("INTRO: Skapa och läsa från arrays");
console.log("==============================\n");

// En array är en samling värden i ordning
const frukter = ["äpple", "banan", "citron"]; // [0, 1, 2]

// Läsa ett värde via index (index börjar på 0)
console.log("Första frukten:", frukter[0]); // "äpple"
console.log("Antal frukter:", frukter.length); // 3

// Byta ut ett värde på ett index
frukter[1] = "blåbär"; // ersätter "banan" med "blåbär"
console.log("Uppdaterad lista:", frukter); // ["äpple","blåbär","citron"]

console.log("\n==============================");
console.log("Lägga till / ta bort (MUTERAR)");
console.log("==============================\n");

const lista = ["A", "B", "C"];

// push: lägger till sist, returnerar nya längden. MUTERAR arrayen.
const nyLängdEfterPush = lista.push("D");
console.log("push('D') => ny längd:", nyLängdEfterPush, "=>", lista); // ["A","B","C","D"]

// pop: tar bort sista elementet och returnerar det. MUTERAR.
const sista = lista.pop();
console.log("pop() => tog bort:", sista, "=>", lista); // ["A","B","C"]

// unshift: lägger till först, returnerar nya längden. MUTERAR.
lista.unshift("X");
console.log("unshift('X') =>", lista); // ["X","A","B","C"]

// shift: tar bort första elementet och returnerar det. MUTERAR.
const första = lista.shift();
console.log("shift() => tog bort:", första, "=>", lista); // ["A","B","C"]

// splice: kan ta bort/lägga till mitt i arrayen. MUTERAR.
// Syntax: splice(startIndex, antalSomSkaTasBort, ...nyaSaker)
const siffror = [1, 2, 3, 4, 5];
const borttagna = siffror.splice(2, 1, 99); // ta bort 1 st vid index 2 ("3") och lägg in 99
console.log("splice(2,1,99) => tog bort:", borttagna, "=>", siffror); // [1,2,99,4,5]

// slice: kopierar ut en del av arrayen till en NY array. MUTERAR INTE.
// Syntax: slice(start, end) – end är EXKLUSIVT
const del = siffror.slice(1, 4); // tar index 1..3
console.log("slice(1,4) =>", del, "original kvar:", siffror);

console.log("\n==============================");
console.log("Hitta & kontrollera");
console.log("==============================\n");

const namn = ["Anna", "Bo", "Cecilia", "Daniel"];

// indexOf: ger index för ett värde, eller -1 om det inte finns. (strikt likhet ===)
console.log("indexOf('Bo') =>", namn.indexOf("Bo")); // 1
console.log("indexOf('Eva') =>", namn.indexOf("Eva")); // -1

// includes: true/false om värdet finns
console.log("includes('Cecilia') =>", namn.includes("Cecilia")); // true
console.log("includes('Eva') =>", namn.includes("Eva")); // false

// find: hittar FÖRSTA elementet som matchar ett test (funktion). Returnerar värdet eller undefined.
const personer = [
  { id: 1, namn: "Ada", ålder: 33 },
  { id: 2, namn: "Björn", ålder: 18 },
  { id: 3, namn: "Carin", ålder: 27 },
];
const förstaVuxen = personer.find(p => p.ålder >= 20);
console.log("find(ålder >= 20) =>", förstaVuxen); // {id:1,...}

// findIndex: samma logik som find, men returnerar index istället för värde
const indexVuxen = personer.findIndex(p => p.ålder >= 20);
console.log("findIndex(ålder >= 20) =>", indexVuxen); // 0

console.log("\n==============================");
console.log("Transformera & filtrera");
console.log("==============================\n");

const tal = [1, 2, 3, 4, 5];

// map: skapar en NY array genom att omvandla varje element. MUTERAR INTE.
// Här dubblar vi varje tal.
const dubbla = tal.map(n => n * 2);
console.log("map(*2) =>", dubbla, "original kvar:", tal);

// filter: skapar en NY array med de element som passerar ett test.
// Här behåller vi bara jämna tal.
const jämna = tal.filter(n => n % 2 === 0);
console.log("filter(jämna) =>", jämna, "original kvar:", tal);

// some: returnerar true om NÅGOT element uppfyller testet.
console.log("some(n>4) =>", tal.some(n => n > 4)); // true

// every: returnerar true om ALLA element uppfyller testet.
console.log("every(n<10) =>", tal.every(n => n < 10)); // true

// forEach: loopar igenom (utan att skapa ny array). Används för sidoeffekter (logga, ändra DOM, etc.)
console.log("forEach – skriver varje tal:");
tal.forEach(n => {
  // OBS: forEach returnerar inte en ny array – den används för att GÖRA något per element
  process.stdout.write(n + " ");
});
console.log("\n");

console.log("\n==============================");
console.log("reduce – från lista till ett värde");
console.log("==============================\n");

// reduce: "kokar ner" en array till ETT värde (summa, medel, objekt, etc.)
// Syntax: arr.reduce((ackumulator, nuvarandeVärde) => nyAck, startvärde)

// 1) Summa
const summa = tal.reduce((ack, n) => ack + n, 0); // starta på 0
console.log("reduce(summa) =>", summa); // 15

// 2) Medelvärde
const medel = tal.reduce((ack, n, i, arr) => ack + n / arr.length, 0);
console.log("reduce(medel) =>", medel); // 3

// 3) Räkna förekomster (frekvens-tabell)
const bokstäver = ["a", "b", "a", "c", "b", "a"];
const frekvens = bokstäver.reduce((map, bokstav) => {
  map[bokstav] = (map[bokstav] || 0) + 1;
  return map;
}, {});
console.log("reduce(frekvens) =>", frekvens); // { a: 3, b: 2, c: 1 }

console.log("\n==============================");
console.log("sort & reverse – viktigt om nummer!");
console.log("==============================\n");

const blandat = [10, 2, 5, 1];

// sort MUTERAR originalet och sorterar som STRÄNGAR som standard!
console.log("FEL sortsättning (standard, sträng):", [...blandat].sort()); // [1,10,2,5]

// RÄTT sortsättning för nummer: skicka en jämförelsefunktion
const stigande = [...blandat].sort((a, b) => a - b);
const fallande = [...blandat].sort((a, b) => b - a);
console.log("Rätt (stigande):", stigande); // [1,2,5,10]
console.log("Rätt (fallande):", fallande); // [10,5,2,1]

// reverse MUTERAR originalet (vänd ordningen)
const arr = [1, 2, 3];
arr.reverse();
console.log("reverse() =>", arr); // [3,2,1]

console.log("\n==============================");
console.log("Kedjor, spridning (...), destrukturering");
console.log("==============================\n");

// Kedja metoder: filter -> map -> reduce
const medelAvJämnaDubbla = tal
  .filter(n => n % 2 === 0) // behåll bara jämna (2,4)
  .map(n => n * 2)          // dubbla (4,8)
  .reduce((ack, n, i, arr) => ack + n / arr.length, 0); // medel (6)
console.log("Kedja filter→map→reduce =>", medelAvJämnaDubbla);

// Spread ( ... ) – kopiera/bygga nya arrays utan att mutera original
const original = [1, 2, 3];
const kopia = [...original]; // ytlig kopia
const medExtra = [...original, 4, 5];
console.log("spread kopia:", kopia, "medExtra:", medExtra, "original kvar:", original);

// Destrukturering – plocka ut värden snabbt
const färger = ["röd", "grön", "blå"];
const [primär, sekundär] = färger; // primär = "röd", sekundär = "grön"
console.log("destrukturering:", primär, sekundär);

console.log("\n==============================");
console.log("Några fler nyttiga metoder");
console.log("==============================\n");

// Array.from – skapa array från något "array-liknande" (t.ex. sträng)
const frånSträng = Array.from("hej");
console.log("Array.from('hej') =>", frånSträng); // ["h","e","j"]

// join – slå ihop till en sträng
console.log(["Stockholm", "Göteborg", "Malmö"].join(" → "));

// flat – platta ut nästlade arrayer (endast ett djup som standard)
const nest = [1, [2, 3], [[4]]];
console.log("flat(1) =>", nest.flat(1)); // [1,2,3,[4]]
console.log("flat(2) =>", nest.flat(2)); // [1,2,3,4]

// flatMap – kombinerar map + flat(1)
const ord = ["hej", "du"];
const tecken = ord.flatMap(o => o.split(""));
console.log("flatMap(split) =>", tecken);

console.log("\n==============================");
console.log("Miniuppgifter (för klassdiskussion / egen träning)");
console.log("==============================\n");

/*
1) Sista elementet
   - Skriv en funktion last(arr) som returnerar sista elementet eller undefined om tom.
*/
function last(arr) {
  // Om arr.length är 0 (tom), finns inget sista – returnera undefined
  if (arr.length === 0) return undefined;
  return arr[arr.length - 1];
}
console.log("last([10,20,30]) =>", last([10, 20, 30]));

/*
2) Unika värden
   - Skriv unique(arr) som returnerar en NY array med unika värden (utan dubbletter).
   - Tips: använd reduce ELLER Set.
*/
function unique(arr) {
  // 1-radare med Set: Array.from(new Set(arr))
  return Array.from(new Set(arr));
}
console.log("unique([1,2,2,3,3,3]) =>", unique([1, 2, 2, 3, 3, 3]));

/*
3) Ordräkning
   - Givet en text, räkna förekomster av varje ord (skiftläges-okänsligt).
*/
function wordCount(text) {
  return text
    .toLowerCase()
    .split(/\W+/) // dela på icke-bokstav/nummer
    .filter(Boolean)
    .reduce((map, ord) => {
      map[ord] = (map[ord] || 0) + 1;
      return map;
    }, {});
}
console.log("wordCount('Hej hej du DU!') =>", wordCount("Hej hej du DU!"));

/*
4) Topplista
   - Givet en array av objekt {namn, poäng}, returnera de 3 bästa namnen i fallande ordning.
*/
function top3(spelare) {
  return [...spelare]
    .sort((a, b) => b.poäng - a.poäng) // sortera NY kopia, mutera inte original
    .slice(0, 3)                       // ta första 3
    .map(s => s.namn);                 // extrahera bara namn
}
console.log(
  "top3 =>",
  top3([
    { namn: "Alva", poäng: 12 },
    { namn: "Bo", poäng: 18 },
    { namn: "Cia", poäng: 7 },
    { namn: "Dan", poäng: 22 },
  ])
);

/*
5) Pipeline (kedja)
   - Givet en lista av transaktioner (positivt = intäkt, negativt = kostnad),
     räkna ut summan av ALLA kostnader vars belopp är större än 100.
*/
function sumLargeCosts(transaktioner) {
  return transaktioner
    .filter(t => t < 0 && Math.abs(t) > 100)
    .map(t => Math.abs(t))
    .reduce((ack, n) => ack + n, 0);
}
console.log("sumLargeCosts =>", sumLargeCosts([200, -50, -300, 40, -120])); // 420

/*
6) Gruppindelning med reduce
   - Givet personer med "roll" – gruppera dem i ett objekt { roll: [personer] }.
*/
function groupBy(arr, nyckelFn) {
  return arr.reduce((map, item) => {
    const key = nyckelFn(item);
    if (!map[key]) map[key] = [];
    map[key].push(item);
    return map;
  }, {});
}

const team = [
  { namn: "Anna", roll: "dev" },
  { namn: "Bo", roll: "designer" },
  { namn: "Cia", roll: "dev" },
  { namn: "Dan", roll: "tester" },
];
console.log("groupBy(team, p=>p.roll) =>", groupBy(team, p => p.roll));

/*
==============================
 Avslutning / takeaways
==============================
 - Muterande metoder: push, pop, shift, unshift, splice, sort, reverse
 - Icke-muterande: slice, map, filter, reduce, some, every, flat, flatMap, join
 - sort behöver en jämförelsefunktion för tal
 - reduce är en schweizisk armékniv: summa, grupperingar, uppbyggnad
 - Föredra nya arrayer (immutabilitet) i större appar för färre bieffekter
*/

console.log("\nKlar! Testa att ändra exempel och kör om filen för att se skillnader.");
