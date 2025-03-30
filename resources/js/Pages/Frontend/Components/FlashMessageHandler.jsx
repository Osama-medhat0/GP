// FlashMessageHandler.jsx
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";

const FlashMessageHandler = () => {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.message) {
            toast[flash?.type || "success"](flash.message);
        }
    }, [flash]);

    return <ToastContainer position="top-right" autoClose={3000} />;
};

export default FlashMessageHandler;
