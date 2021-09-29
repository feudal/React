import React from 'react';
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import classes from "./MealItem/MealItem.module.css";

const Meals = () => {
    return (
        <div>
            <MealsSummary/>
            <AvailableMeals/>
        </div>
    );
};

export default Meals;
