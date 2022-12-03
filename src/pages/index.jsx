import DefaultLayout from "components/templates/DefaultLayout";
import { useAtom } from "jotai";
import { useState } from "react";
import { wordsAtom } from "state/words";

export default function Home() {
  const [words, setWords] = useAtom(wordsAtom);
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
      <div className="mx-auto my-0">
        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className="card p-20 shadow-lg rounded-lg border-2"
        >
          <p className="text-3xl text-center">
            {order < words.length ? (
              !showAnswer ? (
                <>{words[order].content.question}</>
              ) : (
                <>{words[order].content.answer}</>
              )
            ) : (
              <>Completed</>
            )}
          </p>
        </div>

        <div className="btns flex justify-between mt-6">
          {order < words.length ? (
            <>
              <button
                className="bg-red-600 hover:bg-red-500 text-white rounded-xl p-4 w-[48%]"
                onClick={() => nextWord(false, words[order].id)}
              >
                ×
              </button>
              <button
                className="bg-green-600 hover:bg-green-500 text-white rounded-xl p-4 w-[48%]"
                onClick={() => nextWord(true, words[order].id)}
              >
                ◎
              </button>
            </>
          ) : (
            <button
              onClick={restart}
              className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl p-4 w-full"
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
