import Link from "next/link";
import { useState } from "react";

const DefaultLayout = (props) => {
  return (
    <div>
      <header>
        <h1>単語</h1>
        <div className="flex">
          <div>
            <Link href={"/"}>HOME</Link>
          </div>
          <div>
            <Link href={"/update"}>UPDATE</Link>
          </div>
        </div>
      </header>
      {props.children}
    </div>
  );
};

export default DefaultLayout;
