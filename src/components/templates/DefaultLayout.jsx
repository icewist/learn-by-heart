import { useState } from "react";

const DefaultLayout = (props) => {
  //   const [words, setWords] = useState(["word", "remind", "language"]);
  //   const [order, setOrder] = useState(0);
  return (
    <div>
      <header>単語</header>
      {props.children}
    </div>
  );
};

export default DefaultLayout;
