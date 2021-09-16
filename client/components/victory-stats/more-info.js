/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react';
import { colors } from '../../../shared/theming';

const MoreInfo = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpened = () => {
        setIsOpen((prev) => !prev);
    }

    return ( 
        <div css={css`
            margin-top: 2rem;
        `}>
            <button 
                css={css`
                    display: block;
                    width: ${isOpen ? '90%' : '25%'};
                    margin: 0 auto;
                    border-width: 0 0 .25rem 0;
                    border-color: ${colors.primary};
                    border-style: solid;
                    color: ${colors.primary};
                    background: none;
                    font-family: 'Roboto', sans-serif;
                    font-size: 1rem;
                    font-weight: bolder;
                    transition-property: width;
                    transition-duration: .2s;
                    transition-timing-function: ease-in;
                `}
                onClick={toggleIsOpened}
            >More Info</button>
            <div css={css`
                height: ${isOpen ? 'auto' : 0};
                transform: ${isOpen ? 'scaleY(1)' : 'scaleY(0)'};
                transition: transform 0.2s ease-in;
                transform-origin: top;
            `}>
                <div css={css`
                    width: 90%;
                    margin: auto;
                    color: #686868;
                    padding: .5rem;
                    text-align: center;
                    
                `}>
                    Adjusted Victories are a measure of how well you do compared to every
                    single team in a given week.<br /><br />If you scored the highest in a given week,
                    you would have beaten every other team if you played them and, thus, receive
                    11 adjusted victories. If you scored the lowest, you receive 0 adjusted victories.
                    <br /><br />The Tough Loss/Lucky Win line shows where you should've lost/won in a given week, even
                    if you had the opposite outcome.
                </div>
            </div>
        </div>
    );
};

export default MoreInfo;