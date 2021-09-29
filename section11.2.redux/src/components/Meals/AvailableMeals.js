import React, {useEffect} from 'react';
import classes from './AvalableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useDispatch, useSelector} from "react-redux";
import {mealsAction} from "../../store/meals";


const AvailableMeals = () => {
    const meals = useSelector(state => state.menuList);

    const MealsList = meals.map(meal => {
        return <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    })
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {MealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;