import Loader from "../components/loader";
import Form from "./form";
import { useState, useEffect } from "react";


export default function Main() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? <Loader /> : <Form />}
        </div>
    );
}