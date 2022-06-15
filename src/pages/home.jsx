import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { styled } from '@stitches/react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
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
import Toaster from '/voxeliface/components/Toaster';
import Typography from '/voxeliface/components/Typography';

import Translate from '../common/translate';
import { addEntry, saveHistory } from '../common/slices/history';
import { setSetting, saveSettings } from '../common/slices/settings';
const TextArea = styled('textarea', {
    color: '$primaryColor',
    height: '100%',
    resize: 'none',
    border: 'none',
    padding: '12px 1rem',
    outline: 'none',
    fontSize: '.9rem',
    background: 'none',
    fontFamily: 'Nunito',
    whiteSpace: 'pre-line',

    '&::placeholder': {
        color: '$secondaryColor'
    }
});

export default function HomePage() {
    const historyEnabled = useSelector(state => state.settings['history.enabled']);
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [progress, setProgress] = useState(0);
    const [processes, setProcesses] = useState(5);
    const [translating, setTranslating] = useState(false);
    const translate = async() => {
        setTranslating(true);

        try {
            const [transResult, progression] = await Translate(input, processes, setProgress);
            setResult(transResult);
            setTranslating(false);

            if(historyEnabled)
                dispatch(addEntry({
                    date: Date.now(),
                    input,
                    result: transResult,
                    language: 'en',
                    progression,
                    translations: processes
                }));
        } catch(err) {
            console.error(err);
            toast.error("Translation Failed");

            setTranslating(false);
            setProgress(0);
        }
    };
    const paste = () => readText().then(setInput);
    const copy = () => writeText(result);

    return <Grid width="100%" height="100%" padding="2rem 2.5rem" direction="vertical">
        <Grid width="100%" height="70%" background="$secondaryBackground2" borderRadius={8} css={{
            border: '$secondaryBorder2 solid 1px'
        }}>
            <Grid width="50%" height="100%" direction="vertical">
                <Grid width="100%" height="fit-content" padding="8px 14px" justifyContent="space-between" css={{
                    borderBottom: '$secondaryBorder2 solid 1px'
                }}>
                    <Typography size=".9rem" color="$primaryColor" weight={400} family="Nunito">
                        Your Input ({input.length}/5000)
                    </Typography>
                    <Button size="smaller" theme="secondary" onClick={paste} disabled={translating}>
                        <ClipboardPlus/>
                        Paste
                    </Button>
                </Grid>
                <TextArea
                    value={input}
                    readOnly={translating}
                    onChange={event => setInput(event.target.value.substring(0, 5000))}
                    placeholder="Type your input here!"
                />
            </Grid>
            <Divider width={1} height="100%" color="$secondaryBorder2"/>
            <Grid width="50%" height="100%" direction="vertical">
                <Grid width="100%" height="fit-content" padding="8px 14px" direction="horizontalReverse" justifyContent="space-between" css={{
                    borderBottom: '$secondaryBorder2 solid 1px'
                }}>
                    <Typography text="Translation Result" size=".9rem" color="$primaryColor" weight={400} family="Nunito"/>
                    <Button size="smaller" theme="secondary" onClick={copy} disabled={!result}>
                        <Clipboard/>
                        Copy
                    </Button>
                </Grid>
                <TextArea value={result} placeholder="Translation" readOnly/>
            </Grid>
        </Grid>
        <Grid margin="1rem" spacing={4} direction="vertical" alignItems="center">
            <Typography size=".8rem" color="$primaryColor" family="Nunito">
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
    </Grid>;
};