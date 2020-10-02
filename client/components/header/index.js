/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const header = css`
    width: 100%;
    height: 10%;
    max-height: 75px;
    background: #b0e4f9;
    color: white;
    font-family: 'Roboto',sans-serif;
    font-weight: bolder;
    border-bottom: .25rem solid #90c4d9;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = () => (
    <div css={header}>
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1rem;
            @media (min-width: 1028px) {
                flex-direction: row;
                justify-content: space-between;
                font-size: 1.5rem;
            }

        `}>
            <i className='fas fa-trophy' css={css`color: gold; margin: 0 .25rem;`}></i><span>Power</span><span>Rankings</span>
        </div>
    </div>
);

export default Header;