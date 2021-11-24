import Grid from './Grid';
import Button from './Button';
import Toggle from './Toggle';
import Accordion from './Accordion';
import Typography from './Typography';
import SpanEditable from './SpanEditable';

import ky from 'ky';
import React from 'react';
import styled, { keyframes } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Tauri = window.__TAURI__;

const MainComponent = styled(Grid)`
    width: 95%;
    height: 80%;
    display: flex;
    border-radius: 0 0 8px 8px;
    background-color: #222222;
`;

const TopComponent = styled(Grid)`
    width: 100%;
    padding: 8px;
    border-radius: 8px 8px 0 0;
    background-color: #2c2c2c;
`;

const BottomComponent = styled(Grid)`
    width: 100%;
    padding: 8px;
`;

const InputComponent = styled.div`
    width: 100%;
`;

const InputHeaderAnim = keyframes`
    0% {
        color: #ffffffcc;
    }
    50% {
        color: #ffffff99;
    }
    100% {
        color: #ffffffcc;
    }
`;

const InputHeaderComponent = styled.p`
    color: #ffffffcc;
    margin: 12px 0 0 12px;

    &:disabled {
        animation: ${InputHeaderAnim} 2s linear infinite;
    }
`;

const InputTextAreaAnim = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const InputTextAreaComponent = styled(SpanEditable)`
    width: 100%;
    color: #ffffff;
    cursor: text;
    margin: 4px 0 0 12px;
    outline: none;
    display: inline-block;
    font-size: 1rem;
    background: none;
    font-weight: 500;
    font-family: HCo Gotham SSm, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;

    &:disabled {
        cursor: not-allowed;
    }

    &:empty:before {
        color: #ffffff4d;
        content: attr(placeholder);
    }

    &:empty:focus:before {
        content: "";
        animation: ${InputTextAreaAnim} 1s steps(1, end) infinite;
        border-left: 1px solid white;
    }
`;

const InputResultComponent = styled.p`
    width: 100%;
    color: #ffffff;
    margin: 4px 0 0 12px;
    font-size: 1rem;
    background: none;
    font-weight: 500;
    white-space: pre-line;

    &.nores {
        color: #ffffff4d;
    }
`;

const ProgressionChild = styled.div`
    border-bottom: 1px solid #ffffff2b;
    padding: 0 0 16px 0;
    margin: 0 0 32px 16px;
`;

const TranslateAmount = styled.input`

`;

const DataController = window.$__DATA__;
let HistoryData; DataController.getData("history").then(obj => HistoryData = obj);
let SettingsData; DataController.getData("settings").then(obj => SettingsData = obj);
class Translation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            result: '',
            enabled: false,
            embedding: false,
            inputValue: '',
            translating: false,
            translations: 5,
            automaticResult: true,
            translationProgression: []
        };
    }

    async componentDidMount() {
        await toast.promise(
            ky.get("https://goggletrans.blookers.repl.co/api"),
            {
                pending: 'Checking goggle trans API',
                success: 'Translation is now ready',
                error: 'Something went wrong!'
            },
            {
                className: 'gotham',
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: 'dark'
            }
        );
        this.setState({
            enabled: true
        });
        this.forceUpdate();
    }

    onInputChange(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    onTransChange(evt) {
        this.setState({
            translations: parseInt(evt.target.value)
        });
    }

    async translate() {
        if(!this.state.translating) {
            this.setState({
                translationProgression: [],
                translating: true,
                result: ''
            });
            this.state.input = this.state.inputValue.replace(/<br>/g, '\n').replace(/<div>/g, '').replace(/<\/div>/g, '\n');

            let result, progression;
            if(Tauri) {
                let { data } = await toast.promise(
                    Tauri.invoke('translate', {
                        body: Tauri.http.Body.json({
                            input: this.state.input,
                            language: 'en',
                            translateTimes: this.state.translations,
                            outputLanguage: this.state.automaticResult ? 'auto' : 'en'
                        })
                    }),
                    {
                        pending: 'Translating Your Input',
                        success: 'Translation Succeeded!',
                        error: 'Something went wrong!'
                    },
                    {
                        className: 'gotham',
                        position: toast.POSITION.BOTTOM_RIGHT,
                        theme: 'dark'
                    }
                );
                result = data.result;
                progression = data.progression;
            } else {
                let data = await toast.promise(
                    ky.post("https://goggletrans.blookers.repl.co/api/translate", {
                        json: {
                            input: this.state.input,
                            language: 'en',
                            translateTimes: this.state.translations,
                            outputLanguage: this.state.automaticResult ? 'auto' : 'en'
                        },
                        timeout: false
                    }).json(),
                    {
                        pending: 'Translating Your Input',
                        success: 'Translation Succeeded!',
                        error: 'Something went wrong!'
                    },
                    {
                        className: 'gotham',
                        position: toast.POSITION.BOTTOM_RIGHT,
                        theme: 'dark'
                    }
                );
                result = data.result;
                progression = data.progression;
            }

            if(await SettingsData.get('history.enabled')) {
                HistoryData.add({
                    date: Date.now(),
                    input: this.state.input,
                    result,
                    language: 'en',
                    progression,
                    translations: this.state.translations,
                    outputLanguage: this.state.automaticResult ? 'Automatic' : 'English'
                });
            }

            this.setState({
                translationProgression: progression,
                translating: false,
                result
            });
        }
    }

    async embed() {
        this.setState({
            embedding: true
        });

        let { id } = await toast.promise(
            ky.post("https://goggletrans.blookers.repl.co/api/embed", {
                json: {
                    input: this.state.input,
                    output: this.state.result
                },
                timeout: false
            }).json(),
            {
                pending: 'Embedding Translation',
                success: 'Embed Link copied to clipboard!',
                error: 'Something went wrong!'
            },
            {
                className: 'gotham',
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: 'dark'
            }
        );

        let embedLink = `https://goggletrans.blookers.repl.co/embed/${id}`;
        if (Tauri)
            await Tauri.clipboard.writeText(embedLink);
        else
            navigator.clipboard.writeText(embedLink);

        this.setState({
            embedding: false
        });
    }

    render() {
        return (
            <MainComponent direction="vertical">
                <TopComponent spacing="16px" alignItems="center">
                    <Button
                        text="Translate"
                        icon="bi bi-translate"
                        onClick={this.translate.bind(this)}
                        disabled={this.state.enabled && (this.state.inputValue.length === 0 || this.state.translating)}
                    />
                    <Button
                        text="Embed"
                        icon="bi bi-cloud-upload-fill"
                        theme="tertiary"
                        onClick={this.embed.bind(this)}
                        disabled={this.state.result.length === 0 || this.state.embedding}
                    />
                    <Grid direction="vertical">
                        <Grid spacing="16px" alignItems="center">
                            <Typography text={`Process Amount (${this.state.translations})`}/>
                            <TranslateAmount
                                type="range"
                                onChange={this.onTransChange.bind(this)}
                                value={this.state.translations}
                                max="10"
                                min="1"
                            />
                        </Grid>
                        <Grid spacing="16px" alignItems="center">
                            <Typography text="Automatic Result:"/>
                            <Toggle size="small" checked={this.state.automaticResult} changed={v => this.setState({ automaticResult: v })}/>
                        </Grid>
                    </Grid>
                </TopComponent>
                <BottomComponent direction="vertical">
                    <InputComponent>
                        <InputHeaderComponent>
                            Input
                        </InputHeaderComponent>
                        <InputTextAreaComponent
                            contentEditable={!this.state.translating}
                            placeholder="Type your translation input here!"
                            onChange={this.onInputChange.bind(this)}
                            html={this.state.inputValue}
                            role="textbox"
                        />
                    </InputComponent>
                    <InputComponent>
                        <InputHeaderComponent disabled={this.state.translating}>
                            Result
                        </InputHeaderComponent>
                        <InputResultComponent className={this.state.result.length === 0 ? "nores" : ""}>
                            {this.state.result || "The Translation Result will appear here."}
                        </InputResultComponent>
                    </InputComponent>
                    <Accordion title="Translation Progression" margin="16px 0 0 0" titleSize="1rem" titleColor="#ffffffcc">
                        {this.state.translationProgression.map(
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
                        )}
                    </Accordion>
                </BottomComponent>
                <ToastContainer/>
            </MainComponent>
        );
    }
}

export default Translation;