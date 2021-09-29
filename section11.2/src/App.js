import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {useState} from "react";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsOpen, setCartIsShown] = useState(false);

    function closeCart() {
        setCartIsShown(false);
    }

    function openCart() {
        setCartIsShown(true);
    }

    return (
        <CartProvider>
            {cartIsOpen && <Cart closeCart={closeCart}/>}
            <Header onOpenCart={openCart}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
