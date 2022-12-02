import DefaultLayout from "components/templates/DefaultLayout";
import { useState } from "react";

const INIT_WORDS = [
  {
    id: 1,
    content: { question: "language", answer: "言語" },
    isCleared: false,
  },
  { id: 2, content: { question: "book", answer: "本" }, isCleared: false },
  { id: 3, content: { question: "clothing", answer: "服" }, isCleared: false },
];

export default function Home() {
  const [words, setWords] = useState(INIT_WORDS);
  const [order, setOrder] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextWord = (isCleared, id) => {
    let updatedWords;

    // 次の単語を表示
    setOrder((prevOrder) => prevOrder + 1);

    // 覚えたら
    if (isCleared) {
      // 覚えた単語のisClearedをtrueに
      updatedWords = words.map((word) => {
        if (word.id === id && !word.isCleared) {
          word.isCleared = true;
          return word;
        }
        return word;
      });
    } else {
      updatedWords = words.map((word) => {
        if (word.id === id && word.isCleared) {
          word.isCleared = false;
          return word;
        }
        return word;
      });
    }

    setShowAnswer(false);
    setWords(updatedWords);
  };

  // 最初から始める
  const restart = () => setOrder(0);

  return (
    <DefaultLayout>
      <div>
        <div>order: {order}</div>
        <div>length: {words.length}</div>
        <div>
          {order < words.length ? (
            !showAnswer ? (
              words[order].content.question
            ) : (
              words[order].content.answer
            )
          ) : (
            <div>Completed</div>
          )}
        </div>

        <div>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
          >
            Meaning
          </button>
        </div>

        <div className="mt-6">
          {order < words.length ? (
            <div>
              <button
                className="bg-red-600 hover:bg-red-500 text-white rounded px-4 py-2"
                onClick={() => nextWord(false, words[order].id)}
              >
                ×
              </button>
              <button
                className="bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2"
                onClick={() => nextWord(true, words[order].id)}
              >
                ◎
              </button>
            </div>
          ) : (
            <button
              onClick={restart}
              className="bg-orange-600 hover:bg-orange-500 text-white rounded px-10 py-2"
            >
              Restart
            </button>
          )}
        </div>

        <hr />

        <div>
          {order < words.length ? (
            <div>
              {order + 1} / {words.length}
            </div>
          ) : null}
        </div>

        <div className="flex space-x-2">
          <div>
            おぼえた
            {words.map((word) =>
              word.isCleared ? (
                <div key={word.id}>
                  {word.id}: {word.content.question}
                </div>
              ) : null
            )}
          </div>

          <div>
            おぼえてない
            {words.map((word) =>
              !word.isCleared ? (
                <div key={word.id}>
                  {word.id}: {word.content.question}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
