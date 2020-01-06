import React from 'react';

import PropTypes from 'prop-types';

const Button = (props) => {
    return (<button className={props.classId} onClick={props.onClick}>{props.value}</button>);
}

Button.propTypes = {
    classId: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;