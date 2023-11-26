import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../../styles/iconButton.css';

const IconButton  = ({ variant }) => {
    const getClass = () => {
        switch (variant) {
            case 'attachment':
                return ("iconButton");
            case 'send':
                return ("iconButton" + " " + "sendButton");
        }
    }

    const getIcon = () => {
        switch (variant) {
            case 'attachment':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="M18,3c-.55,0-1,.45-1,1v13c0,2.76-2.24,5-5,5s-5-2.24-5-5V5c0-1.65,1.35-3,3-3s3,1.35,3,3v12c0,.55-.45,1-1,1s-1-.45-1-1V6c0-.55-.45-1-1-1s-1,.45-1,1v11c0,1.65,1.35,3,3,3s3-1.35,3-3V5c0-2.76-2.24-5-5-5S5,2.24,5,5v12c0,3.86,3.14,7,7,7s7-3.14,7-7V4c0-.55-.45-1-1-1Z" fill="currentColor"/></svg>
                );
            case 'send':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24"><path d="m21.916,8.727L3.965.282C2.951-.211,1.756-.041.917.713.076,1.47-.216,2.646.172,3.708c.017.043,4.411,8.296,4.411,8.296,0,0-4.313,8.251-4.328,8.293-.387,1.063-.092,2.237.749,2.993.521.467,1.179.708,1.841.708.409,0,.819-.092,1.201-.279l17.872-8.438c1.285-.603,2.083-1.859,2.082-3.278,0-1.42-.801-2.675-2.084-3.275ZM2.032,2.967c-.122-.415.138-.69.223-.768.089-.079.414-.324.838-.116.005.002,17.974,8.455,17.974,8.455.239.112.438.27.591.462H6.315L2.032,2.967Zm19.034,10.504L3.178,21.917c-.425.209-.749-.035-.838-.116-.086-.076-.346-.353-.223-.769l4.202-8.032h15.345c-.153.195-.355.357-.597.471Z" fill="currentColor"/></svg>
                );
            default:
                return;
        }
    }

    return (
        <button class={getClass()}>
            {getIcon()}
        </button>
    );
}

IconButton.propTypes = {
    variant: PropTypes.oneOf(['attachment', 'send']).isRequired
};

export default IconButton;