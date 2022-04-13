import React, { useState } from 'react';
import { styled } from '@stitches/react';
import { readText, writeText } from '@tauri-apps/api/clipboard';
import { GearFill, Translate as TranslateIcon, Clipboard, ClockHistory, ClipboardPlus } from 'react-bootstrap-icons';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Grid from '/voxeliface/components/Grid';
import Link from '/voxeliface/components/Link/Tauri';
import Range from '/voxeliface/components/Range';
import Header from '../components/Header';
import Button from '/voxeliface/components/Button';
import Divider from '/voxeliface/components/Divider';
import Spinner from '/voxeliface/components/Spinner';
import Navigation from '../components/Navigation';
import Typography from '/voxeliface/components/Typography';

import Translate from '../common/translate';

const TextArea = styled('textarea', {
    color: '#cbcbcb',
    height: '100%',
    resize: 'none',
    border: 'none',
    padding: '12px 1rem',
    outline: 'none',
    fontSize: '.9rem',
    background: 'none',
    fontFamily: 'Nunito',
    whiteSpace: 'pre-line'
});

import DataController from '/src/common/dataController';
const SettingsData = await DataController.getData("settings");
const HistoryData = await DataController.getData("history");

export default function HomePage() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [progress, setProgress] = useState(0);
    const [processes, setProcesses] = useState(5);
    const [translating, setTranslating] = useState(false);
    const translate = async() => {
        setTranslating(true);

        const [transResult, progression] = await Translate(input, processes, setProgress);
        setResult(transResult);
        setTranslating(false);

        if(await SettingsData.get('history.enabled'))
            HistoryData.add({
                date: Date.now(),
                input,
                result: transResult,
                language: 'en',
                progression,
                translations: processes
            });
    };
    const paste = () => readText().then(setInput);
    const copy = () => writeText(result);

    return (
        <App>
            <Header/>
            <Navigation>
                <Link to="/settings" text="Settings" icon={<GearFill/>}/>
                <Link to="/history" text="History" icon={<ClockHistory/>}/>
            </Navigation>
            <Main>
                <Grid width="100%" height="70%" background="#00000026" borderRadius="8px" css={{
                    border: '#ffffff14 solid 1px'
                }}>
                    <Grid width="50%" height="100%" direction="vertical">
                        <Grid width="100%" height="fit-content" padding="8px 14px" justifyContent="space-between" css={{
                            borderBottom: '#ffffff14 solid 1px'
                        }}>
                            <Typography size=".9rem" color="#ffffffcc" weight={400} family="Nunito">
                                Your Input ({input.length}/5000)
                            </Typography>
                            <Button size="smaller" theme="secondary" onClick={paste} disabled={translating}>
                                <ClipboardPlus/>
                                Paste
                            </Button>
                        </Grid>
                        <TextArea
                            value={input}
                            onChange={event => setInput(event.target.value.substring(0, 5000))}
                            placeholder="Type your input here!"
                        />
                    </Grid>
                    <Divider width="1px" height="100%"/>
                    <Grid width="50%" height="100%" direction="vertical">
                        <Grid width="100%" height="fit-content" padding="8px 14px" direction="horizontalReverse" justifyContent="space-between" css={{
                            borderBottom: '#ffffff14 solid 1px'
                        }}>
                            <Typography text="Translation Result" size=".9rem" color="#ffffffcc" weight={400} family="Nunito"/>
                            <Button size="smaller" theme="secondary" onClick={copy} disabled={!result}>
                                <Clipboard/>
                                Copy
                            </Button>
                        </Grid>
                        <TextArea value={result} placeholder="Translation" readOnly/>
                    </Grid>
                </Grid>
                <Grid margin="1rem" spacing="4px" direction="vertical" alignItems="center">
                    <Typography size=".8rem" family="Nunito">
                        Process Amount
                    </Typography>
                    <Range
                        min="1"
                        max="15"
                        value={processes}
                        disabled={translating}
                        onChange={event => setProcesses(event.target.value)}
                    />
                    <Button onClick={translate} disabled={!input || translating} style={{
                        width: '8rem',
                        marginTop: '1rem',
                        background: translating ? `linear-gradient(90deg, #578976 ${(progress * 100) - 1}%, #57897680 ${progress * 100}%)` : undefined
                    }}>
                        {translating ? <Spinner size={14}/> : <TranslateIcon/>}
                        Translate
                    </Button>
                </Grid>
            </Main>
        </App>
    );
};