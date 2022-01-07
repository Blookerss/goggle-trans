import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Accordion from '../components/Accordion';
import Navigation from '../components/Navigation';
import Typography from '../components/Typography';

import React from 'react';
import styled from 'styled-components';

const ListComponent = styled(Grid)`
    width: 100%;
`;

const ProgressionChild = styled.div`
    border-bottom: 1px solid #ffffff2b;
    padding: 0 0 16px 0;
    margin: 0 0 32px 16px;
`;

const InputHeaderComponent = styled.p`
    color: #ffffffcc;
    margin: 12px 0 0 12px;
`;

const InputResultComponent = styled.p`
    width: 100%;
    color: #ffffff;
    margin: 4px 0 0 12px;
    font-size: 1rem;
    background: none;
    font-weight: 500;
    white-space: pre-line;
`;

const DataController = window.$__DATA__;
let HistoryData; DataController.getData("history").then(_ => HistoryData = _);
class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    render() {
        if(HistoryData instanceof Promise) {
            HistoryData.then(_ => this.forceUpdate());
            return (
                <App>
                    <Header text="goggle trans" icon={"/favicon.ico"} />
                </App>
            );
        }
        let history = this.state.history;
        if(history.length === 0)
            return <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation title="Translation History">
                    <Link to="/" text="Home" icon="bi bi-house-door-fill"/>
                </Navigation>
                <Main>
                    <Grid width="100%" spacing="8px" direction="vertical">
                        <Typography text="There's nothing here!" size="1.6rem"/>
                        <Typography text="You haven't translated anything yet, or you've disabled history saving!" color="#cbcbcb"/>
                    </Grid>
                </Main>
            </App>
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Navigation title="Translation History">
                    <Link to="/" text="Home" icon="bi bi-house-door-fill"/>
                </Navigation>
                <Main>
                    <ListComponent spacing="8px" direction="verticalReverse">
                        {history.map((translation, index) => {
                            let date = new Date(translation.date);
                            return <Accordion summary={
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
                                        (prog, index) => <ProgressionChild>
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
                    </ListComponent>
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

export default HistoryPage;