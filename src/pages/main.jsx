import Loader from "../components/Loader";
import SignUp from "../components/signup";
import { useState, useEffect, useRef } from "react";
import ChatApp from "./user";
import { getAuth, onAuthStateChanged } from '../firebase/initializetion';

export default function Main() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    const pageContentRef = useRef(null);

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

    useEffect(() => {
        const handleScroll = () => {
            const pageHeight = pageContentRef.current?.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;

            if (scrollPosition >= pageHeight) {
                setShowMessage(true);
            } else {
                setShowMessage(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div ref={pageContentRef}>
            {user ? <ChatApp /> : <SignUp />}
            {showMessage && (
                <div style={messageStyle}>
                    YAHAN KUCK NAHI HEAY BHAI
                </div>
            )}
        </div>
    );
}

const messageStyle = {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: 1000,
};
