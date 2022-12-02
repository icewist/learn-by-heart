import DefaultLayout from "components/templates/DefaultLayout";
import { useCallback, useState } from "react";

const INIT_WORDS = [
  { id: 1, word: "language", isCleared: false },
  { id: 2, word: "remind", isCleared: false },
  { id: 3, word: "English", isCleared: false },
];

export default function Home() {
  const [words, setWords] = useState(INIT_WORDS);
  const [inputWord, setInputWord] = useState("");
  const [uniqueId, setUniqueId] = useState(INIT_WORDS.length);
  const [order, setOrder] = useState(0);

  const nextWord = (isCleared, id) => {
    let updatedWords;

    // 次の単語を表示
    setOrder((prevOrder) => prevOrder + 1);

    // 覚えたら
    if (isCleared) {
      // 覚えた単語のisClearedをtrueに
      updatedWords = words.map((word) => {
        if (word.id === id && !word.isCleared) {
          return { id: id, word: word.word, isCleared: true };
        }
        return word;
      });
    } else {
      updatedWords = words.map((word) => {
        if (word.id === id && word.isCleared) {
          return { id: id, word: word.word, isCleared: false };
        }
        return word;
      });
    }

    setWords(updatedWords);
  };

  // 最初から始める
  const restart = () => setOrder(0);

  const addWord = () => {
    setWords((prevWords) => {
      const nextUniqueId = uniqueId + 1;
      setUniqueId(nextUniqueId);
      return [
        ...prevWords,
        { id: nextUniqueId, word: inputWord, isCleared: false },
      ];
    });
  };
  return (
    <DefaultLayout>
      <div>
        <div>order: {order}</div>
        <div>length: {words.length}</div>
        <div>
          {order < words.length ? words[order].word : <div>Completed</div>}
        </div>

        <div>
          {order < words.length ? (
            <div>
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2"
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
                  {word.id}: {word.word}
                </div>
              ) : null
            )}
          </div>

          <div>
            おぼえてない
            {words.map((word) =>
              !word.isCleared ? (
                <div key={word.id}>
                  {word.id}: {word.word}
                </div>
              ) : null
            )}
          </div>
        </div>

        <div>
          <div>
            <input type="text" onChange={(e) => setInputWord(e.target.value)} />
          </div>
          <div>
            <button onClick={addWord}>追加</button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
