const ordinaryBoundary = "Our neighborhood science club is organizing a small exhibition at the community center next Saturday. The doors open at ten in the morning, and volunteers should arrive thirty minutes earlier to arrange the tables. Please bring your finished model, a short explanation of how it works, and any batteries it needs. The center can provide extension cords, but every electrical project must be checked by an adult before visitors touch it. Visitors can ask questions and share ideas with the whole team.";
const repeatedForward = "That meeting was helpful. ".repeat(19) + "Hello.";
const repeatedReverse = "That meeting was fire. ".repeat(21) + "That was a big W.";

for (const text of [ordinaryBoundary, repeatedForward, repeatedReverse]) {
  if (text.length !== 500) throw new Error("Boundary smoke fixtures must contain exactly 500 characters.");
}

export const apiSmokeCases = [
  ["factual", "The museum closes at 5 p.m. on Tuesday for maintenance.", "standard-to-alpha"],
  ["profanity", "This fucking printer broke again.", "standard-to-alpha"],
  ["plain-reverse", "The meeting starts at noon.", "alpha-to-standard"],
  ["ordinary-500", ordinaryBoundary, "standard-to-alpha"],
  ["repetitive-forward-500", repeatedForward, "standard-to-alpha"],
  ["repetitive-reverse-500", repeatedReverse, "alpha-to-standard"],
];
