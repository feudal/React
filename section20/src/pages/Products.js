import React from 'react';
import {NavLink} from "react-router-dom";

const Products = () => {
    return (
        <section>
            <h2>Products</h2>
            <ul>
                <li>
                    <NavLink to='/products/p1'>Book</NavLink>
                </li>
                <li>
                    <NavLink to='/products/p2'>Car</NavLink>
                </li>
                <li>
                    <NavLink to='/products/p3'>Mobile</NavLink>
                </li>
            </ul>
        </section>
    )
};

export default Products;
