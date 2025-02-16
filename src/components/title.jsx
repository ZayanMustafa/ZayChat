import { Link } from "react-router-dom";
import { Setting } from "./setting";

export default function Title() {
  return (
    <>
      <Link to={"/"} className="relative">
        <div className="select-none bg-yellow-400 text-black p-4 font-bold">
          ZayChat
        </div>
        <Setting />
      </Link>
    </>
  );
}
