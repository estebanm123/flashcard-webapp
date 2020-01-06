import React from 'react';

import PropTypes from 'prop-types';

import './MainPanel.css';

import WelcomePanel from './WelcomePanel/WelcomePanel';
import ViewEditPanel from './ViewEditPanel/ViewEditPanel';

import TestPanel from './TestPanel/TestPanel';

const MainPanel = (props) => {

    let renderPanel;
    if (props.selectedFolderName && props.selectedOption === 'View/edit') {
        renderPanel = <ViewEditPanel 
                        selectedFolderName={props.selectedFolderName}
                        cards={props.cards} 
                        handleDeleteCard={props.handleDeleteCard}
                        handleSaveCard={props.handleSaveCard} />
    } else if (props.selectedFolderName) {
        renderPanel = <TestPanel 
                        selectedFolderName={props.selectedFolderName}
                        cards={props.cards} />
    } else {
        renderPanel = <WelcomePanel />
    }

    return(
    <main>
        {renderPanel}
    </main>
    );
}





MainPanel.propTypes = {
    selectedFolderName: PropTypes.string,
    selectedOption: PropTypes.string,
    cards: PropTypes.arrayOf(PropTypes.object),
    handleDeleteCard: PropTypes.func,
    handleSaveCard: PropTypes.func
}

export default MainPanel;