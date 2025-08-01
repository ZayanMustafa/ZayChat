import Loader from "../components/loder";
import SignUp from "../components/signup";
import { useState, useEffect } from "react";
import ChatApp from "./user";
import { getAuth, onAuthStateChanged } from '../firebase/initialization';

export default function Main() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);  
            } else {
                setUser(null);
            }
            setLoading(false); 
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {user ? <ChatApp /> : <SignUp />}
        </>
    );
}


