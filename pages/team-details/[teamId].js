/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { Fragment, useState } from 'react';
import absoluteUrl from 'next-absolute-url';
import { colors } from '../../shared/theming';
import PowerRankingStats from '../../client/components/power-ranking-stats';
import VictoryStats from '../../client/components/victory-stats';
import CoachingStats from '../../client/components/coaching-stats';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        css={css`
            padding: 1rem 0;
            background: #fff;
        `}
      >
        {value === index && (
            children
        )}
      </div>
    );
  }

const overrideMui = css`
    .MuiTabs-root {
        background: ${colors.secondary};
        color: #434343;
    }
    .MuiTab-textColorPrimary {
        color: #526769;
    }
    .Mui-selected {
        color: ${colors.primary};
    }
    .MuiTabs-indicator {
        background-color: ${colors.primary};
    }
`;
export default function TeamDetails({ team }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <div css={css`
                display: flex;
                justify-content: space-evenly;
                padding: 0 1rem;
                max-width: 786px;
                width: 100%;
                margin: auto;
                box-sizing: border-box;
            `}>
                <img 
                    css={css`
                        border: .25rem solid ${colors.primary};
                        border-radius: 100%;
                        height: 4rem;
                        width: 4rem;
                        background: white;
                        @media(min-width: 1028px) {
                            height: 6rem;
                            width: 6rem;
                        }
                    `}
                    src={team.logo} 
                />
                <div css={css`
                    font-size: 2rem;
                    font-weight: bolder;
                    font-family: 'Patua One', sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    @media (min-width: 1028px) {
                        font-size: 2rem;
                    }
                `}>
                    <h1 css={css`margin: 0;font-size:inherit;`}>{team.location}<br />{team.nickname}</h1>
                </div>
            </div>
            <div
                css={[css`
                    margin-top: 1rem;
                    box-sizing: border-box;
                    padding: 0 .5rem;
                    @media(min-width: 1028px) {
                        width: 60%;
                        margin-left: auto;
                        margin-right: auto;
                    }
                `,
                overrideMui]}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                >
                    <Tab label="Ranking" />
                    <Tab label="Victories" />
                    <Tab label="Scoring" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <PowerRankingStats team={team} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <VictoryStats team={team} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CoachingStats team={team} />
                </TabPanel>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps({ req, query }) {
    const { protocol, host } = absoluteUrl(req, 'localhost:3000');

    const { teamId } = query;
    const teamReq = await fetch(`${protocol}//${host}/api/team/${teamId}`);
    const team = await teamReq.json();
    return {
      props: { team },
    };
  }
  