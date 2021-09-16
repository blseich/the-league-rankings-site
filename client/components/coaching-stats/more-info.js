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
                    Your best possible score only accounts for players on your current roster.
                    So it does not calculate who you could have picked up off the waiver wire and started.
                    <br /><br />
                    This chart shows how many points your team could have scored if you would have chosen a bench player
                    to start over someone in your starting lineup.
                    <br /><br />
                    Higher best possible points means your roster has great upside but a high points missed per week means
                    it is difficult to predict who will score the most on any given week.
                </div>
            </div>
        </div>
    );
};

export default MoreInfo;