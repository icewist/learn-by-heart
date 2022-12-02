const { atom } = require("jotai");

export const wordsAtom = atom([
  {
    id: 1,
    content: { question: "language", answer: "言語" },
    isCleared: false,
  },
  { id: 2, content: { question: "book", answer: "本" }, isCleared: false },
  { id: 3, content: { question: "clothing", answer: "服" }, isCleared: false },
]);
