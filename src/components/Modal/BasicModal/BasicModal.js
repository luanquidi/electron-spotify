import React from 'react'
import { Modal, Icon } from 'semantic-ui-react';

//Styles
import './BasicModal.scss';

export default function BasicModal(props) {

    const { show, setShow, title, children } = props;

    const onClose = () => {
        setShow(!show);
    }

    return (
        <Modal 
            open={show} 
            onClose={onClose}
            className="basic-modal"
            size="tiny"
        >
            <Modal.Header>
                <h3>{title}</h3>
                <Icon name="close" onClick={onClose}></Icon>
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}
