import DefaultLayout from "components/templates/DefaultLayout";
import { useAtom } from "jotai";
import { useState } from "react";
import { wordsAtom } from "state/words";

const Update = () => {
  const [words, setWords] = useAtom(wordsAtom);
  const [inputQuestion, setInputQuestion] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [uniqueId, setUniqueId] = useState(words.length);

  const addWord = () => {
    setWords((prevWords) => {
      const nextUniqueId = uniqueId + 1;
      setUniqueId(nextUniqueId);

      return [
        ...prevWords,
        {
          id: nextUniqueId,
          content: { question: inputQuestion, answer: inputAnswer },
          isCleared: false,
        },
      ];
    });
  };

  return (
    <DefaultLayout>
      <div>
        <div>
          <div className="flex justify-between">
            <div className="w-[48%]">
              <input
                type="text"
                onChange={(e) => setInputQuestion(e.target.value)}
                className="w-full text-lg p-2 border-2 rounded-lg"
                placeholder="Question"
              />
            </div>
            <div className="w-[48%]">
              <input
                type="text"
                onChange={(e) => setInputAnswer(e.target.value)}
                className="w-full text-lg p-2 border-2 rounded-lg"
                placeholder="Answer"
              />
            </div>
          </div>

          <div>
            <button
              onClick={addWord}
              className="bg-orange-600 hover:bg-orange-500 text-white rounded px-10 py-2"
            >
              追加
            </button>
          </div>

          <div>
            {words.length ? (
              words.map((word) => (
                <div key={word.id}>
                  {word.id}: {word.content.question}
                </div>
              ))
            ) : (
              <div>No card</div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const singleWordForm = () => {
  return (
    <div>
      <div>
        問題
        <input
          type="text"
          onChange={(e) => setInputQuestion(e.target.value)}
          className="border"
        />
      </div>
      <div>
        回答
        <input
          type="text"
          onChange={(e) => setInputAnswer(e.target.value)}
          className="border"
        />
      </div>
    </div>
  );
};

export default Update;
