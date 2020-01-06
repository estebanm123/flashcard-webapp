import React from 'react';

import Button from '../../Button/Button';

import PropTypes from 'prop-types';

const Dropdown = (props) => {
    
    return (
        <div className="drop-down ">
            <Button classId={`drop-down-btn drop-down-view${props.selectedOption === "View/edit"? " selected" : ""}`} onClick={props.onSuboptionClick} value="View/edit"/>
            <Button classId={`drop-down-btn drop-down-test${props.selectedOption === "Test"? " selected" : ""}`} onClick={props.onSuboptionClick} value="Test"/>
        </div>
    );
}

Dropdown.propTypes = {
    onSubOptionClick: PropTypes.func,
    selectedOption: PropTypes.string
}

export default Dropdown;