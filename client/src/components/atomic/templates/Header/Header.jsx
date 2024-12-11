import { useNavigate } from "react-router-dom";
import { BurgerMenuButton } from "../../molecules/BurgerMenuButton/BurgerMenuButton"
import { useSelector } from "react-redux";
import { RightHeaderElement } from "../../molecules/RightHeaderElement/RightHeaderElement"
import { SearchLoupe } from "../../atoms/Header/SearchLoupe/SearchLoupe"
import ClientLoginForm from "../../organisms/ClientLoginForm/ClientLoginForm"
import ClientRegistrationForm from "../../organisms/ClientRegistrationForm/ClientRegistrationForm"
import { Logo } from "../../atoms/Header/Logo/Logo"
import { Link } from "react-router-dom"
import { MobileSearchModal } from "../../organisms/MobileSearchModal/MobileSearchModal";
import { useState } from "react"
import { CartPage } from "../../../pages/cartPage/CartPage"
import { useEffect } from "react";
import CategoryList from "../categoryList/CategoryList"
import './Header.css'

import SearchBar from "../../molecules/SearchBar/SearchBar"
import LogoImg from '../../../../assets/svg/Logo-Wixi.svg'
import CartImg from '../../../../assets/svg/cart.svg'
import PersonalCabinetImg from '../../../../assets/svg/person.svg'
import HeartImg from '../../../../assets/svg/little-heart-2.svg'
import HeartImg2 from '../../../../assets/svg/little-heart-3.svg'
import PhoneImg from '../../../../assets/svg/phone.svg'
import SearchLoupeImg from '../../../../assets/svg/loupe.svg'


export const Header = ({ notification, setNotification, viewMobileFilter, setViewMobileFilter }) => {
    const [overlayVisible, setOverlayVisible] = useState(false);

    const [viewCategories, setViewCategories] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const [isModalOpenReg, setIsModalOpenReg] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    const navigate = useNavigate();
    const userId = localStorage.getItem("token");
    const products = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);
    // Обновление wishlist при загрузке компонента и изменениях
    useEffect(() => {
        const updateWishlist = () => {
            const wishlistFromStorage = JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlist(wishlistFromStorage);
        };
        updateWishlist();
        window.addEventListener("storage", updateWishlist);

        return () => {
            window.removeEventListener("storage", updateWishlist);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {

            setIsBouncing(true);
            setTimeout(() => setIsBouncing(false), 500);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleToggleCategories = () => {
        setViewCategories(!viewCategories);
        setOverlayVisible(true)
        setViewMobileFilter(false)
    };

    const handleAccountClick = () => {
        if (userId) {
            navigate("/profile");
        } else {
            setIsModalOpenLogin(true);
            setOverlayVisible(false)
            setViewCategories(false)
            setIsModalOpen(false)
            setViewMobileFilter(false)
        }
    };

    return (
        <div className="header">
            <div className="header-top">
                <p>Безкоштовна доставка при повній оплаті на замовлення від 3000 грн</p>
            </div>
            <div className="header-bottom-block">
                <div className="header-bottom">
                    <div className="left-elements-block">
                        <BurgerMenuButton
                            handleToggleCategories={handleToggleCategories}
                            viewCategories={viewCategories}
                        />
                        <div className="search-block">
                            <SearchLoupe setIsModalSearchOpen={setIsModalSearchOpen} src={SearchLoupeImg} />
                            <SearchBar />
                        </div>
                    </div>
                    <div className="logo-block">
                        <Link to={"/"}>
                            <Logo src={LogoImg} />
                        </Link>
                    </div>
                    <div className="right-elements-block">
                        <RightHeaderElement
                            src={PersonalCabinetImg}
                            label={"Акаунт"}
                            onClick={handleAccountClick}
                        />
                        <Link to={"/wishlist"}>
                            <RightHeaderElement
                                src={HeartImg}
                                label={"Вішлист"}
                                products={wishlistItems}
                            />
                        </Link>
                        <RightHeaderElement
                            src={CartImg}
                            label={"Кошик"}
                            onClick={() => { setIsModalOpen(true); setIsModalOpenLogin(false); setOverlayVisible(false); setViewCategories(false); setViewMobileFilter(false) }}
                            notification={notification}
                            setNotification={setNotification}
                            products={products}
                            className={`cart-icon ${isBouncing && products.length > 0 ? "cart-bounce" : ""}`}
                        />
                    </div>
                </div>

                <CartPage isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <div className="mobile-search">
                    <MobileSearchModal isModalOpen={isModalSearchOpen} setIsModalOpen={setIsModalSearchOpen} isOpenSearch={isModalSearchOpen} />
                </div>
                <div className="client-login-form-block">
                    <ClientLoginForm
                        isModalOpen={isModalOpenLogin}
                        setIsModalOpen={setIsModalOpenLogin}
                        setIsModalOpenLogin={setIsModalOpenLogin}
                        setIsModalOpenReg={setIsModalOpenReg}
                    />
                </div>
                <div className="client-reg-form-block">
                    <ClientRegistrationForm
                        isModalOpen={isModalOpenReg}
                        setIsModalOpen={setIsModalOpenReg}
                        setIsModalOpenLogin={setIsModalOpenLogin}
                        setIsModalOpenReg={setIsModalOpenReg}
                    />
                </div>
            </div>
            {viewCategories && <CategoryList overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} setViewCategories={setViewCategories} />}
        </div>
    );
};