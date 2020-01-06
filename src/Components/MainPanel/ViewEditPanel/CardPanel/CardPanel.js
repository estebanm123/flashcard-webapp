import React, {useState} from 'react';

import PropTypes from 'prop-types';

const CardPanel = (props) => {
    const [newCardMessage, setNewCardMessage] = useState('');

    function onDelete(e) {
        const cardId = e.target.parentNode.parentNode.parentNode.getAttribute('data-id');
        props.handleDeleteCard(cardId);
    }

    function onSave(e) {
        const cardPanel = e.currentTarget.parentNode.parentNode;
        const cardId = cardPanel.getAttribute('data-id');
        const sideA = cardPanel.children[0].firstChild.value;
        const sideB = cardPanel.children[1].firstChild.value;
        if (!cardId && (!sideA || !sideB)) {
            setNewCardMessage('Error: Please fill both sides');
            return;
        } 
        props.handleSaveCard(cardId, sideA, sideB);
        setNewCardMessage('');
    }

    return(
            <div className='card-panel' data-id={props.cardId}>
                    <div className='card-side side-a'>
                        <textarea defaultValue={props.cardSideA}></textarea>
                    </div>
                    <div className='card-side side-b'>
                        <textarea defaultValue={props.cardSideB}></textarea>
                    </div>
                    <div className='card-options'> 
                        <div className='save-btn' onClick={onSave}>
                            <i className='fa fa-check'></i>
                            <p>Save</p>
                        </div>  
                        <div className='delete-btn' onClick={onDelete}>
                            <i className='fa fa-trash'></i>
                        </div>
                    <div className='new-card-msg'>{newCardMessage}</div>
                    </div>
            </div>
    );
}

CardPanel.propTypes = {
    cardSideA: PropTypes.string,
    cardSideB: PropTypes.string,
    cardId: PropTypes.string,
    handleDeleteCard: PropTypes.func,
    handleSaveCard: PropTypes.func
}

export default CardPanel;