import {Redirect, Route, Switch} from "react-router-dom";
import Products from "./pages/Products";
import React from "react";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader/MainHeader";
import ProductDetail from "./pages/ProductDetail";

function App() {
    return (
        <div>
            <header>
                <MainHeader/>
            </header>
            <main>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/welcome'/>
                    </Route>
                    <Route path='/welcome'>
                        <Welcome/>
                    </Route>
                    <Route path='/products' exact>
                        <Products/>
                    </Route>
                    <Route path='/products/:productId'>
                        <ProductDetail/>
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
