import React, { useState } from "react";
import ApartmentTypeButton from "./apartmentTypeButton";

const ApartmentTypeButtonGroup = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonSelect = (buttonLabel) => {setSelectedButton
    (buttonLabel);};

    const ApartmentTypeButtonGroupFunction = [
        { buttonLabel: 'Single Room Apartment' },
        { buttonLabel: 'Double Room Apartment' },
        { buttonLabel: 'Room in a shared Apartment' },
        { buttonLabel: 'Studio' }
    ];

    return (
        <>
            {ApartmentTypeButtonGroupFunction.map((current) => (
                <ApartmentTypeButton key={current.buttonLabel} buttonLabel={current.buttonLabel} selected={current.buttonLabel === selectedButton} onSelect={() => handleButtonSelect(current.buttonLabel)} />
            ))}
        </>
    );
};

export default ApartmentTypeButtonGroup;