import Link from "next/link";

const DefaultLayout = (props) => {
  return (
    <div className="max-w-full">
      <header className="flex justify-between items-center bg-blue-200 p-4">
        <h1>単語</h1>
        <div className="flex">
          <div>
            <Link href={"/"} className="block text-xl mx-2">
              HOME
            </Link>
          </div>
          <div>
            <Link href={"/update"} className="block text-xl mx-2">
              UPDATE
            </Link>
          </div>
        </div>
      </header>
      <div className="max-w-6xl p-6">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
