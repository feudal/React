import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {useSelector} from "react-redux";
import Order from "./components/Order/Order";

function App() {
    let showCart = useSelector(state => state.showCart);
    let isOrdering = useSelector(state => state.isOrdering);

    return (
        <>
            {showCart && <Cart/>}
            {isOrdering && <Order/>}
            <Header/>
            <main>
                <Meals/>
            </main>
        </>
    );
}

export default App;
