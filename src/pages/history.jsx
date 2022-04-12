import React, { useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import { HouseDoorFill } from 'react-bootstrap-icons';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link/Tauri';
import Grid from '/voxeliface/components/Grid';
import Header from '../components/Header';
import Spinner from '/voxeliface/components/Spinner';
import Divider from '/voxeliface/components/Divider';
import Accordion from '../components/Accordion';
import Navigation from '../components/Navigation';
import Typography from '/voxeliface/components/Typography';

const TextArea = styled('textarea', {
    color: '#cbcbcb',
    resize: 'none',
    border: 'none',
    padding: 8,
    outline: 'none',
    marginTop: 4,
    maxHeight: '10rem',
    background: '#0000002e',
    fontFamily: 'Nunito',
    whiteSpace: 'pre-line',
    borderRadius: 8
});

const ProgressionChild = styled('div', {
    margin: '0 0 32px 16px',
    padding: '0 0 16px 0',
    borderBottom: '1px solid #ffffff2b'
});

const InputHeaderComponent = styled('p', {
    color: '#ffffffcc',
    margin: '12px 0 0 12px'
});

const InputResultComponent = styled('p', {
    width: '100%',
    color: '#ffffff',
    margin: '4px 0 0 12px',
    fontSize: '1rem',
    fontWeight: 500,
    background: 'none',
    whiteSpace: 'pre-line'
});

import DataController from '/src/common/dataController';
const HistoryData = await DataController.getData("history");

export default function HistoryPage() {
    const [history, setHistory] = useState();
    useEffect(() => {
        if(!history)
            HistoryData.getAll().then(setHistory);
    });

    return (
        <App>
            <Header/>
            <Navigation title="Translation History">
                <Link to="/" text="Home" icon={<HouseDoorFill/>}/>
            </Navigation>
            <Main>
                {!history ?
                    <React.Fragment>
                        <Typography text="Loading History" family="Nunito"/>
                        <Spinner/>
                    </React.Fragment>
                : history.length === 0 ?
                    <React.Fragment>
                        <Typography text="There's nothing here!" size="1.6rem"/>
                        <Typography text="You haven't translated anything yet, or you've disabled history saving!" color="#cbcbcb"/>
                    </React.Fragment>
                :
                    <Grid width="100%" spacing="8px" direction="verticalReverse">
                        {history.map((translation, index) => {
                            const date = new Date(translation.date);
                            return <Accordion key={index} summary={
                                <Grid width="100%" direction="horizontal" alignItems="center" justifyContent="space-between">
                                    <Typography text={`Translation ${index + 1}`} weight={600} family="Nunito"/>
                                    <Typography size=".9rem" color="#cbcbcb">
                                        {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {date.toLocaleTimeString('en-us')}
                                    </Typography>
                                </Grid>
                            }>
                                <Typography text="Input" size="1.1rem" family="Nunito"/>
                                <TextArea rows="6" value={translation.input ?? "Unknown?"} readOnly/>

                                <Divider width="100%" margin="1rem 0"/>

                                <Typography text="Result" size="1.1rem" family="Nunito"/>
                                <TextArea rows="6" value={translation.result ?? "Unknown?"} readOnly/>

                                <Divider width="100%" margin="1rem 0"/>

                                <Grid spacing="32px" direction="horizontal">
                                    <Grid spacing="2px" direction="vertical">
                                        <Typography text="Translation Cycles" family="Nunito"/>
                                        <Typography size=".8rem" color="#cbcbcb" family="Nunito">
                                            {translation.translations ?? "Unknown?"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Accordion title="Translation Progression" color="#1D1D1D" margin="16px 0 0 0">
                                    {translation?.progression?.map(
                                        (prog, index) => <ProgressionChild key={index}>
                                            <Typography text={`Translation ${index + 1}`}/>
                                            <InputHeaderComponent>
                                                Input (from {prog.language[0]?.toUpperCase()})
                                            </InputHeaderComponent>
                                            <InputResultComponent>
                                                {prog.from}
                                            </InputResultComponent>

                                            <InputHeaderComponent>
                                                Result (to {prog.language[1]?.toUpperCase()})
                                            </InputHeaderComponent>
                                            <InputResultComponent>
                                                {prog.to}
                                            </InputResultComponent>
                                        </ProgressionChild>
                                    ) || ["There's nothing here!"]}
                                </Accordion>
                            </Accordion>
                        })}
                    </Grid>
                }
            </Main>
        </App>
    );
};