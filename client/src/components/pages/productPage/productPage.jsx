import { useEffect } from "react";
import { Header } from "../../atomic/templates/Header/Header";
import { ProductItem } from "../../atomic/organisms/productItem/ProductItem";
import { Footer } from "../../atomic/templates/Footer/Footer";
import { useState } from "react";

export const ProductPage = () => {
    const [notification, setNotification] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <Header notification={notification} setNotification={setNotification}/>
            <ProductItem notification={notification} setNotification={setNotification}/>
            <Footer />

        </div>
    )
}