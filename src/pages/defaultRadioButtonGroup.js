import React, { useState } from "react";
import DefaultRadioButton from "./defaultRadioButton";
import "../styles/defaultRadioButtonGroup.css"

const DefaultRadioButtonGroup = () => {
    const [selectedButton, setSelectedButton] = useState('Per month');

    const handleButtonSelect = (buttonLabel) => {
        setSelectedButton(buttonLabel);
    };

    const DefaultRadioButtonGroupFuncion = [
        { buttonLabel: 'Per month' },
        { buttonLabel: 'For the whole period' },
    ];

    return (
        <>
            <div className="rentType">
                {DefaultRadioButtonGroupFuncion.map((current) => (
                    <DefaultRadioButton
                        key={current.buttonLabel}
                        buttonLabel={current.buttonLabel}
                        selected={current.buttonLabel === selectedButton}
                        onSelect={() => handleButtonSelect(current.buttonLabel)}
                    />
                ))}
            </div>
        </>
    );
};

export default DefaultRadioButtonGroup;