import { Link } from "react-router-dom";

export default function Title(lable) {
    return (
        <>
            <Link to={"/"}>
                <div className="select-none bg-yellow-400 text-black p-4 font-bold">
                    ZayChat
                </div>
            </Link>
        </>
    )
}