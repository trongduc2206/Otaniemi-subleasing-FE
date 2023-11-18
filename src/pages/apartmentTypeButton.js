import React, { useState } from "react";
import '../styles/apartmentTypeButton.css';

const ApartmentTypeButton = ({ buttonLabel, selected, onSelect }) => {
    return (
        <div className={`apartmentTypeButton ${selected ? 'selected' : ''}`} onClick={onSelect}>
            {buttonLabel}
        </div>
    );
};

export default ApartmentTypeButton;