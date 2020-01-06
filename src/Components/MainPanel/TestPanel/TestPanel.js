import React, {useState} from 'react';

import PropTypes from 'prop-types';

import './TestPanel.css';

const TestPanel = (props) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [cards] = useState(props.cards);
    const [cardSideA, setCardSideA] = useState(true);

    function renderCard() {
        const card = cards[currentCardIndex];
        if (!card) return null;
        const content = (cardSideA)? card.sideA : card.sideB;
        return <textarea className='card-view-only' readOnly value={content}/>;
    }   

    function onPrevCardClick(e) {
        const newIndex = (currentCardIndex - 1 < 0)? cards.length - 1 : currentCardIndex - 1;
        setCurrentCardIndex(newIndex);
    }

    function onCardFlip(e) {
        setCardSideA(!cardSideA);
    }

    function onNextCardClick(e) {
        const newIndex = (currentCardIndex + 1 >= cards.length)? 0 : currentCardIndex + 1;
        setCurrentCardIndex(newIndex);
        setCardSideA(true);
    }

    let content;
    if (cards.length) {
        content = <div className='test-panel-card'>
                    <h2>{cards[currentCardIndex].name}</h2>
                    {renderCard()}
                    <div className='nav-buttons'>
                        <div className='prev-card' onClick={onPrevCardClick}>
                            <i className='fa fa-arrow-left'></i>
                        </div>
                        <div className='flip' onClick={onCardFlip}>
                            <i className='fa fa-undo'></i>
                            <p>Flip</p>
                        </div>
                        <div className='next-card' onClick={onNextCardClick}>
                            <i className='fa fa-arrow-right'></i>
                        </div>
                    </div>
                 </div>
    } else {
        content = <h2 className='no-cards-msg'>Folder is empty</h2>
    }

    

    return(
        <div className='test-panel'>
            <h1>{props.selectedFolderName}</h1>
            {content}
        </div>
    );
}

TestPanel.propTypes = {
    selectedFolderName: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.object),
}

export default TestPanel;