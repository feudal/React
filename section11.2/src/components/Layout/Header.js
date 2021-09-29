import classes from './Header.module.css';
import img_meals from '../../assets/meals.jpg';

import React from 'react';
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onOpenCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={img_meals} alt="food"/>
            </div>
        </>
    );
};

export default Header;
