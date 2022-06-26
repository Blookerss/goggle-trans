import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Body } from '@tauri-apps/api/http';
import { open } from '@tauri-apps/api/shell';
import { styled } from '@stitches/react';
import { useTranslation } from 'react-i18next';
import { readText, writeText } from '@tauri-apps/api/clipboard';
import { useSelector, useDispatch } from 'react-redux';
import { Translate as TranslateIcon, Clipboard, ClipboardPlus } from 'react-bootstrap-icons';

import Grid from 'voxelnents/Grid';
import Link from 'voxelnents/Link';
import Button from 'voxelnents/Button';
import Slider from 'voxelnents/Input/Slider';
import Divider from 'voxelnents/Divider';
import Spinner from 'voxelnents/Spinner';
import Typography from 'voxelnents/Typography';

import Util from 'common/util';
import Translate from 'common/translate';
import { addEntry, saveHistory } from 'common/slices/history';
const TextArea = styled('textarea', {
    color: '$primaryColor',
    height: '100%',
    resize: 'none',
    border: 'none',
    padding: '12px 1rem',
    outline: 'none',
    fontSize: '.9rem',
    background: 'none',
    fontFamily: '$primaryFont',
    whiteSpace: 'pre-line',

    '&::placeholder': {
        color: '$secondaryColor'
    }
});

export default function TextGenerator() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const historyEnabled = useSelector(state => state.settings['history.enabled']);
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [length, setLength] = useState([200]);
    const [progress, setProgress] = useState(0);
    const [processes, setProcesses] = useState([5]);
    const [translating, setTranslating] = useState(false);
    const translate = async() => {
        setTranslating(true);

        try {
            const { data } = await Util.makeRequest('https://api.inferkit.com/v1/models/standard/generate', {
                body: Body.json({
                    length: length[0],
                    prompt: {
                        text: input,
                        isContinuation: false
                    }
                }),
                query: { useDemoCredits: 'true' },
                method: 'POST'
            });
            console.log(data);
            const [transResult, progression] = await Translate(input + data.text, processes[0], setProgress);
            setResult(transResult);
            setTranslating(false);

            if(historyEnabled) {
                dispatch(addEntry({
                    date: Date.now(),
                    input,
                    result: transResult,
                    language: 'en',
                    progression,
                    translations: processes
                }));
                dispatch(saveHistory());
            }
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
        <Typography size=".8rem" color="$secondaryColor" weight={400} margin="0 0 1rem" textalign="start">
            {t('app.goggletrans.textgen.note1')}
            <span>
                {t('app.goggletrans.textgen.note2')}
                <Link onClick={() => open('https://app.inferkit.com/demo')}>
                    {t('app.goggletrans.textgen.note_link')}
                </Link>
            </span>
        </Typography>
        <Grid width="100%" height="70%" background="$secondaryBackground2" borderRadius={8} css={{
            border: '$secondaryBorder2 solid 1px'
        }}>
            <Grid width="50%" height="100%" direction="vertical">
                <Grid width="100%" height="fit-content" padding="8px 14px" justifyContent="space-between" css={{
                    borderBottom: '$secondaryBorder2 solid 1px'
                }}>
                    <Typography size=".9rem" color="$primaryColor" weight={400}>
                        {t('app.goggletrans.translator.input.header', {
                            val: input.length,
                            max: 256
                        })}
                    </Typography>
                    <Button size="smaller" theme="secondary" onClick={paste} disabled={translating}>
                        <ClipboardPlus/>
                        {t('app.goggletrans.common:actions.paste')}
                    </Button>
                </Grid>
                <TextArea
                    value={input}
                    readOnly={translating}
                    onChange={event => setInput(event.target.value.substring(0, 256))}
                    placeholder={t('app.goggletrans.translator.input.placeholder')}
                />
            </Grid>
            <Divider width={1} height="100%" color="$secondaryBorder2"/>
            <Grid width="50%" height="100%" direction="vertical">
                <Grid width="100%" height="fit-content" padding="8px 14px" direction="horizontalReverse" justifyContent="space-between" css={{
                    borderBottom: '$secondaryBorder2 solid 1px'
                }}>
                    <Typography size=".9rem" color="$primaryColor" weight={400}>
                        {t('app.goggletrans.translator.result.header')}
                    </Typography>
                    <Button size="smaller" theme="secondary" onClick={copy} disabled={!result}>
                        <Clipboard/>
                        {t('app.goggletrans.common:actions.copy')}
                    </Button>
                </Grid>
                <TextArea
                    value={result}
                    placeholder={t('app.goggletrans.translator.result.placeholder')}
                    readOnly
                />
            </Grid>
        </Grid>
        <Grid margin="1rem 1rem 0" spacing={4} direction="vertical" alignItems="center">
            <Grid spacing={16} direction="horizontal">
                <Grid spacing={4} direction="vertical" alignItems="center">
                    <Typography size=".8rem" color="$primaryColor" weight={400}>
                        {t('app.goggletrans.translator.process_amount', { val: processes })}
                    </Typography>
                    <Slider
                        min={1}
                        max={5}
                        value={processes}
                        disabled={translating}
                        onChange={setProcesses}
                    />
                </Grid>
                <Grid spacing={4} direction="vertical" alignItems="center">
                    <Typography size=".8rem" color="$primaryColor" weight={400}>
                        {t('app.goggletrans.textgen.input_length', { val: length })}
                    </Typography>
                    <Slider
                        min={10}
                        max={1000}
                        step={10}
                        value={length}
                        disabled={translating}
                        onChange={setLength}
                    />
                </Grid>
            </Grid>
            <Button onClick={translate} disabled={!input || translating} style={{
                width: '8rem',
                marginTop: '1rem',
                background: translating ? `linear-gradient(90deg, #578976 ${(progress * 100) - 1}%, #57897680 ${progress * 100}%)` : undefined
            }}>
                {translating ? <Spinner size={14}/> : <TranslateIcon/>}
                {t('app.goggletrans.translator.translate')}
            </Button>
        </Grid>
    </Grid>;
};