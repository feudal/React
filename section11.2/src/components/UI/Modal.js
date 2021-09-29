import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return (
        <div className={classes.backdrop} onClick={props.onClose}/>
    );
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const Modal = props => {
    const locationOfElement = document.getElementById('overlays');

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, locationOfElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                locationOfElement)}
        </>
    );
};

export default Modal;
