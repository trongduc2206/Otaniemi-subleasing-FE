import React, { useState } from "react";
import '../styles/defaultRadioButton.css';


const DefaultRadioButton = ({ selected, onSelect, buttonLabel }) => {
    return (
        <div className={`defaultRadioButton ${selected ? 'radioSelected' : ''}`} onClick={onSelect}>
            <div className="radioSelectionCircle">
                {selected ? (
                    <span className="radioSelectionIndicator"></span>
                    ) : null
                }
            </div>
            <div className="defaultRadioButtonLabel">{buttonLabel}</div>
        </div>
    );
};

export default DefaultRadioButton;