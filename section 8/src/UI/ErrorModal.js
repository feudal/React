import React, {useState} from 'react';
import Card from "./Card";
import classes from './ErrorModal.module.css';

const ErrorModal = props => {
    if(props.error === undefined) {
        return;
    }

    return (
        <div>
            <div onClick={props.closeModal} className={classes.backdrop}/>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <button onClick={props.closeModal}>Okey</button>
                </footer>
            </Card>
        </div>
    );
};

export default ErrorModal;
