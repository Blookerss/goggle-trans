import React from 'react';
import { styled } from '@stitches/react';
import { HouseDoorFill } from 'react-bootstrap-icons';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link/Tauri';
import Grid from '/voxeliface/components/Grid';
import Header from '../components/Header';
import Accordion from '../components/Accordion';
import Navigation from '../components/Navigation';
import Typography from '/voxeliface/components/Typography';

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

export default class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    render() {
        const { history } = this.state;
        return (
            <App>
                <Header/>
                <Navigation title="Translation History">
                    <Link to="/" text="Home" icon={<HouseDoorFill/>} color="#c7c6c6"/>
                </Navigation>
                <Main>
                    {history.length === 0 ?
                        <Grid width="100%" spacing="8px" direction="vertical">
                            <Typography text="There's nothing here!" size="1.6rem"/>
                            <Typography text="You haven't translated anything yet, or you've disabled history saving!" color="#cbcbcb"/>
                        </Grid>
                    :
                        <Grid width="100%" spacing="8px" direction="verticalReverse">
                            {history.map((translation, index) => {
                                const date = new Date(translation.date);
                                return <Accordion key={index} summary={
                                    <Grid width="100%" direction="horizontal" alignItems="center" justifyContent="space-between">
                                        <Typography text={`Translation ${index + 1}`}/>
                                        <Typography text={`${date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ${date.toLocaleTimeString('en-us')}`} color="#cbcbcb"/>
                                    </Grid>
                                }>
                                    <Typography text="Input" size="1.3rem" margin="0 0 4px 0"/>
                                    <Typography text={translation.input || "UNKNOWN"} color="#cbcbcb"/>

                                    <Typography text="Result" size="1.3rem" margin="24px 0 4px 0"/>
                                    <Typography text={translation.result || "UNKNOWN"} color="#cbcbcb"/>

                                    <Grid margin="24px 0 0 0" spacing="32px" direction="horizontal">
                                        <Grid spacing="4px" direction="vertical">
                                            <Typography text="Translation Cycles" size="1.1rem"/>
                                            <Typography text={translation.translations || "UNKNOWN"} color="#cbcbcb"/>
                                        </Grid>
                                        <Grid spacing="4px" direction="vertical">
                                            <Typography text="Result Translation" size="1.1rem"/>
                                            <Typography text={translation.outputLanguage || "UNKNOWN"} color="#cbcbcb"/>
                                        </Grid>
                                    </Grid>
                                    <Accordion title="Translation Progression" color="#1D1D1D" margin="16px 0 0 0" titleSize="1rem" titleColor="#ffffffcc">
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
    }

    async componentDidMount() {
        if(HistoryData) {
            this.setState({
                history: await HistoryData.getAll()
            });
        }
    }
};