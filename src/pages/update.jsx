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

const Update = () => {
  const [words, setWords] = useState(INIT_WORDS);
  const [inputQuestion, setInputQuestion] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [uniqueId, setUniqueId] = useState(INIT_WORDS.length);

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
