import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return (
        <div
            onClick={props.onClick}
            className={classes.backdrop}/>
    );
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    );
};

const Modal = props => {
    const locationOfElement = document.getElementById('overlays');

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClickClose}/>, locationOfElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                locationOfElement)}
        </>
    );
};

export default Modal;
