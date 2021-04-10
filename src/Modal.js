import React from 'react'
import { useState, useEffect } from 'react'
import {useGlobalContext} from './context'
const Modal = ({img}) => {
    const {isModalOpen,closeModal} = useGlobalContext();

    return (
        <div>
             <div className={`${isModalOpen?'modal show':'modal'}`}>
                <div className="modal-content">
                    <img src={img} title="click to close" className="modal-img" onClick={closeModal} />
                </div>
            </div>
        </div>
    )
}

export default Modal
