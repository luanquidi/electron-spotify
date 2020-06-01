/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

//Components
import BasicModal from '../Modal/BasicModal/BasicModal';
 
//Styles
import './MenuLeft.scss';

//firebase Api
import { isUserAdmin } from '../../utils/Api';

function MenuLeft(props) {

    const { user } = props;
    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [isAdmin, setIsAdmin] = useState(false);

    //Modal State
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    useEffect(() => {

        isUserAdmin(user.uid).then((res) => {
            setIsAdmin(res);
        });

    }, [user]);

    const handleMenu = (e, menu) => {
        setActiveMenu(menu.to);
    }

    const handleModal = (typeModal) => {
        switch (typeModal) {
            case 'artist':
                setTitleModal('Nuevo Artista')
                setContentModal(<h2>Formulario Nuevo Artista</h2>)
                setShowModal(true)
                break;
            case 'song':
                setTitleModal('Nueva Canción')
                setContentModal(<h2>Formulario Nueva Canción</h2>)
                setShowModal(true)
                break;
        
            default:
                setTitleModal('')
                setContentModal(null)
                setShowModal(false)
                break;
        }
    }


    return (
        <>
            <Menu className="menu-left" vertical>
                
                <div className="top">

                    <Menu.Item  
                        as={Link} 
                        to="/" 
                        active={ activeMenu === '/' } 
                        name="home" 
                        onClick={handleMenu}
                    > 
                        <Icon name="home" /> Inicio
                    </Menu.Item>

                    <Menu.Item 
                        as={Link} 
                        to="/artists" 
                        active={ activeMenu === '/artists' }
                        name="artists"
                        onClick={handleMenu}
                    >
                        <Icon name="music" /> Artistas
                    </Menu.Item>

                </div>

                {isAdmin && (
                    <div className="footer">
                        <Menu.Item
                            onClick={() => handleModal('artist')}
                        > 
                            <Icon name="plus square outline" /> Nuevo Artista
                        </Menu.Item>

                        <Menu.Item
                            onClick={() => handleModal('song')}
                        > 
                            <Icon name="plus square outline" /> Nueva Canción
                        </Menu.Item>
                    </div>
                )}

            </Menu>

            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

export default withRouter(MenuLeft);