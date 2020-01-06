import React, { useState } from 'react';

import MainPanel from '../MainPanel/MainPanel';
import SideBar from '../SideBar/SideBar';

const App = () => {
    const foldersPlaceholder = [{name: 'French Nouns', cards: [{id: '1', sideA: 'Banane', sideB: 'Banana'},
                                {id: '2', sideA: 'Pomme', sideB: 'Apple'}]},
                            {name: 'French Verbs', cards: []}, {name:'CPSC 304', cards:[]}];

    const [folders, setFolders] = useState(foldersPlaceholder);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    
    function getListOfKey(arr, key) {
        let arrNames = []; 
        arr.forEach(item => {
            arrNames.push(item[key]);
        });
        return arrNames;
    }

    function getFolderNames() {
        return getListOfKey(folders, 'name');
    }
 
    function getCards() {
        if (selectedFolder) {
            const index = getFolderNames().indexOf(selectedFolder);
            return folders[index].cards;
        } else {
            return [];
        }
    }

    function updateCards(newCards) {
        if (selectedFolder) {
            const index = getFolderNames().indexOf(selectedFolder);
            let foldersCopy = folders.slice();
            foldersCopy[index].cards = newCards;
            setFolders(foldersCopy);
        }
    }
    
    function handleCreateNewFolder(name) {
        name = name.trim();
        console.log(name);
        if (name === '') return 'Error: Empty name';
        if (getFolderNames().includes(name)) return 'Error: Name in use';
        setFolders([...folders, {name: name, cards: []}]);
        return null;
    }

    function handleSelectedFolder(name) {
        setSelectedFolder(name);
        setSelectedOption('View/edit');
    }

    function handleSuboptionClick(name) {
        setSelectedOption(name);
    }


    function handleDeleteCard(id) {
        let curCards = getCards();
        let index = getListOfKey(curCards, 'id').indexOf(id);
        curCards.splice(index, 1);
        updateCards(curCards);
    }

    function handleSaveCard(id, sideA, sideB) {
        console.log(sideB);
        let curCards = getCards();
        let cardIds = getListOfKey(curCards, 'id');
        if (!id) {  
            let id = generateCardId(cardIds);
            curCards = [{id: id, sideA: sideA, sideB: sideB}, ...getCards()];
        } else {
            let index = cardIds.indexOf(id);
            curCards[index] = {id: id, sideA: sideA, sideB: sideB};
        }
        updateCards(curCards);
    }

    function generateCardId(cardIds) {
        let noId = true;
        let id;
        while (noId) {
            id = Math.random().toString(36).substr(2, 10);
            if (!cardIds.includes(id)) noId = false;
        }

        return id;
    }

    return(
    <React.Fragment>
        <SideBar names={getFolderNames()} 
                 handleCreateNewFolder={handleCreateNewFolder} 
                 handleSelectedFolder={handleSelectedFolder}
                 selectedFolder={selectedFolder}
                 handleSuboptionClick={handleSuboptionClick}
                 selectedOption={selectedOption}/>
        <MainPanel selectedFolderName={selectedFolder}
                   selectedOption={selectedOption}
                   cards={getCards()}
                   handleSaveCard={handleSaveCard}
                   handleDeleteCard={handleDeleteCard}/>
    </React.Fragment>
    );
}



export default App;