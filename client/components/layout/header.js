/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Link from 'next/link';

const header = css`
    width: 100%;
    height: 75px;
    background: #b0e4f9;
    color: white;
    font-family: 'Roboto',sans-serif;
    font-weight: bolder;
    border-bottom: .25rem solid #90c4d9;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    @media(min-width: 1028px) {
        position: absolute;
    }
`;

const Header = () => (
    <div css={header}>
        <Link href={'/'}>
            <div css={css`
                cursor: pointer;
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
        </Link>
    </div>
);

export default Header;