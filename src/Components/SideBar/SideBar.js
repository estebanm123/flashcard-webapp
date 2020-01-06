import React, { useState } from 'react';

import Button from '../Button/Button';
import Dropdown from './Dropdown/Dropdown'

import './SideBar.css';

import PropTypes from 'prop-types';


const SideBar = (props) => {
    const [newFolderClicked, setNewFolderClicked] = useState(false);
    const [newFolderMessage, setNewFolderMessage] = useState('');

    function onCreateNewFolder() {
        setNewFolderClicked(true);
    }

    function onSubmitNewFolder(e) {
        e.preventDefault();
        submitNewFolder(e, false);
    }

    function submitNewFolder(e, fromFocusLoss) {
        const msg = props.handleCreateNewFolder((fromFocusLoss)? e.target.value : e.target[0].value);
        if (msg) {
            setNewFolderMessage(msg);
        } else {
            setNewFolderClicked(false);
        }
    }

    function onFolderClick(e) {
        props.handleSelectedFolder(e.target.textContent);
    }

    function onSuboptionClick(e) {
        props.handleSuboptionClick(e.target.textContent);
    }

    function onBlur(e) {
        if (newFolderMessage) {
            setNewFolderMessage('');
            setNewFolderClicked(false);
        } else {
            submitNewFolder(e, true);
        }
    }

    let newFolder;
    if (newFolderClicked) {
        newFolder =
         <li className="new-folder-creation">
            <form name="new-folder-form" onSubmit={onSubmitNewFolder}>
                <input name="new-folder-name" type="text" autoFocus onBlur={onBlur}></input>
                <label className='new-folder-msg'>{newFolderMessage}</label>
            </form>
        </li>
    }

    return (
    <div className="sidebar">
        <div className="new-folder-btn" onClick={onCreateNewFolder}>
            <i className='fa fa-plus'></i>
        </div>
        <h2 className="sidebar-title">Folders:</h2>
        <label className="sidebar-close"></label>
        <ol className="sidebar-list">
            {props.names.map( name => (
                <li key={name}>
                    <Button classId={`folder${(props.selectedFolder === name? ' selected-folder' : '')}`} 
                            value={name} 
                            onClick={onFolderClick}
                             />
                    {props.selectedFolder === name && 
                     <Dropdown onSuboptionClick={onSuboptionClick} selectedOption={props.selectedOption}/>
                    }
                </li>
            ))}
            {newFolder}
        </ol>
    </div>

    );
}

SideBar.propTypes = {
    names: PropTypes.arrayOf(PropTypes.string),
    handleCreateNewFolder: PropTypes.func,
    handleSelectedFolder: PropTypes.func,
    selectedFolder: PropTypes.string,
    handleSuboptionClick: PropTypes.func,
    selectedOption: PropTypes.string,
}



export default SideBar;