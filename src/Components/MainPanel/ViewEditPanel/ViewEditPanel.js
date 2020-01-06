import React, {useState, useEffect} from 'react';

import PropTypes from 'prop-types';

import './ViewEditPanel.css';


import CardPanel from './CardPanel/CardPanel';

const ViewEditPanel = (props) => {
    const [addNewCard, setAddNewCard] = useState(false);
    
    useEffect(() => {
        return () => {
            if (addNewCard) setAddNewCard(false);
        };  
    });

    function onAddNewCardClick() {
        setAddNewCard(true);
    }

    function handleDeleteCard(id) {
        if (!id) setAddNewCard(false);
        else props.handleDeleteCard(id);
    }

    return(
    <div className='view-edit-panel'>
        <h1>{props.selectedFolderName}</h1>
        <div className='legend'>
            <h4>Side A</h4>
            <h4>Side B</h4>
            <div className='add-new-card-icon'>
               <i className='fa fa-plus' onClick={onAddNewCardClick}></i>
            </div>
        </div>
       
        {addNewCard && <CardPanel 
                           handleDeleteCard={handleDeleteCard}
                           handleSaveCard={props.handleSaveCard} />}
        {props.cards.map(card => {
                return (<CardPanel  
                           key={card.id}
                           cardId={card.id} 
                           cardSideA={card.sideA}
                           cardSideB={card.sideB}
                           handleDeleteCard={handleDeleteCard}
                           handleSaveCard={props.handleSaveCard}/>);
            })
        }
    </div>
    ); 
}

ViewEditPanel.propTypes = {
    selectedFolderName: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.object),
    handleDeleteCard: PropTypes.func,
    handleSaveCard: PropTypes.func
}

export default ViewEditPanel;