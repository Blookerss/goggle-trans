import ky from 'ky';
import React from 'react';
import { http, clipboard } from '@tauri-apps/api';
import toast, { Toaster } from 'react-hot-toast';
import { styled, keyframes } from '@stitches/react';
import { Translate, CloudUploadFill } from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Button from '/voxeliface/components/Button';
import Toggle from './Toggle';
import Divider from '/voxeliface/components/Divider';
import Accordion from './Accordion';
import Typography from '/voxeliface/components/Typography';
import SpanEditable from './SpanEditable';

const StyledInput = styled('div', {
    width: '100%'
});

const InputHeaderAnim = keyframes({
    '0%': {
        color: '#ffffffcc'
    },
    '50%': {
        color: '#ffffff99'
    },
    '100%': {
        color: '#ffffffcc'
    }
});

const StyledInputHeader = styled('p', {
    color: '#ffffffcc',
    margin: '12px 0 0 12px',

    '&:disabled': {
        animation: `${InputHeaderAnim} 2s linear infinite`
    }
});

const InputTextAreaAnim = keyframes({
    '0%': {
        opacity: 1,
    },
    '50%': {
        opacity: 0,
    },
    '100%': {
        opacity: 1
    }
});

const StyledInputResult = styled('p', {
    width: '100%',
    color: '#fff',
    margin: '4px 0 0 12px',
    fontSize: '1rem',
    fontWeight: 500,
    background: 'none',
    whiteSpace: 'pre-line'
});

const StyledProgress = styled('div', {
    margin: '0 0 32px 16px',
    padding: '0 0 16px 0',
    borderBottom: '1px solid #ffffff2b'
});

const languages = {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'he': 'Hebrew',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'pa': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};
Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
};

import Util from '/src/common/util';
import DataController from '/src/common/dataController';
const SettingsData = await DataController.getData("settings");
const HistoryData = await DataController.getData("history");

export default class Translation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            result: '',
            enabled: true,
            embedding: false,
            inputValue: '',
            translating: false,
            translations: 5,
            automaticResult: true,
            translationProgression: []
        };
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

    _extract(key, data) {
        var re = new RegExp(`"${key}":".*?"`);
        var result = re.exec(data);
        if (result !== null) {
            return result[0].replace(`"${key}":"`, '').slice(0, -1);
        }
        return '';
    }

    _translate(options) {
        return Util.makeRequest('https://translate.google.com', {
            responseType: 'Text'
        }).then(data => ({
            'rpcids': 'MkEWBc',
            'f.sid': this._extract('FdrFJe', data),
            'bl': this._extract('cfb2h', data),
            'hl': 'en-US',
            'soc-app': '1',
            'soc-platform': '1',
            'soc-device': '1',
            '_reqid': Math.floor(1000 + (Math.random() * 9000)).toString(),
            'rt': 'c'
        })).then(data =>
            Util.makeRequest('https://translate.google.com/_/TranslateWebserverUi/data/batchexecute', {
                body: http.Body.text(
                    'f.req=' + encodeURIComponent(
                        JSON.stringify([
                            [['MkEWBc', JSON.stringify([[options.input, options.from, options.to, true], [null]]), null, 'generic']]
                        ])
                    ) + '&'
                ),
                method: 'POST',
                query: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                responseType: 'Text'
            }).then(data => {
                let json = data.slice(6);
                const result = {
                    text: '',
                    pronunciation: '',
                    from: {
                        language: {
                            didYouMean: false,
                            iso: ''
                        },
                        text: {
                            autoCorrected: false,
                            value: '',
                            didYouMean: false
                        }
                    },
                    raw: ''
                };
                let length = '';

                try {
                    length = /^\d+/.exec(json)[0];
                    json = JSON.parse(json.slice(length.length, parseInt(length, 10) + length.length));
                    json = JSON.parse(json[0][2]);
                    result.raw = json;
                } catch (err) {
                    console.log(err);
                    return result;
                }

                if (json[1][0][0][5] === undefined || json[1][0][0][5] === null)
                    result.text = json[1][0][0][0];
                else {
                    result.text = json[1][0][0][5]
                        .map(function (obj) {
                            return obj[0];
                        })
                        .filter(Boolean)
                        .join(' ');
                }
                result.pronunciation = json[1][0][0][1];

                if (json[0] && json[0][1] && json[0][1][1]) {
                    result.from.language.didYouMean = true;
                    result.from.language.iso = json[0][1][1][0];
                } else if (json[1][3] === 'auto')
                    result.from.language.iso = json[2];
                else
                    result.from.language.iso = json[1][3];

                if (json[0] && json[0][1] && json[0][1][0]) {
                    var str = json[0][1][0][0][1];

                    str = str.replace(/<b>(<i>)?/g, '[');
                    str = str.replace(/(<\/i>)?<\/b>/g, ']');

                    result.from.text.value = str;

                    if (json[0][1][0][2] === 1) {
                        result.from.text.autoCorrected = true;
                    } else {
                        result.from.text.didYouMean = true;
                    }
                }

                return result;
            })
        );
    }

    async translate() {
        if(!this.state.translating) {
            this.setState({
                translationProgression: [],
                translating: true,
                result: ''
            });
            this.state.input = this.state.inputValue.replace(/<br>/g, '\n').replace(/<div>/g, '').replace(/<\/div>/g, '\n');

            let result = this.state.input, progression = [];
            await toast.promise(
                new Promise(async(resolve) => {
                    for (let i = 0; i < this.state.translations; i++) {
                        const langFrom = Object.keys(languages).random(), langTo = Object.keys(languages).random();
                        const previous = result.toString();
                        const data = await this._translate({
                            input: result,
                            from: langFrom,
                            to: langTo
                        });
                        result = data.text;
                        progression.push({
                            language: [langFrom, langFrom],
                            from: previous,
                            to: data.text
                        });
                    }

                    const langFrom = 'auto', langTo = 'en';
                    const previous = result.toString();
                    const data = await this._translate({
                        input: result,
                        from: langFrom,
                        to: langTo
                    });
                    result = data.text;
                    progression.push({
                        language: [langFrom, langFrom],
                        from: previous,
                        to: data.text
                    });

                    resolve();
                }),
                {
                    loading: 'Translating Your Input',
                    success: 'Translation Succeeded!',
                    error: 'Something went wrong!'
                },
                {
                    className: 'gotham',
                    position: 'bottom-right'
                }
            );

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
                loading: 'Embedding Translation',
                success: 'Embed Link copied to clipboard!',
                error: 'Something went wrong!'
            },
            {
                className: 'gotham',
                position: 'bottom-right'
            }
        );

        const embedLink = `https://goggletrans.blookers.repl.co/embed/${id}`;
        await clipboard.writeText(embedLink);

        this.setState({
            embedding: false
        });
    }

    render() {
        return (
            <Grid width="95%" background="#222222" direction="vertical" css={{
                minHeight: '80%',
                borderRadius: '0 0 8px 8px'
            }}>
                <Grid width="100%" padding={8} spacing="16px" alignItems="center" css={{
                    borderRadius: '8px 8px 0 0',
                    background: '#2c2c2c'
                }}>
                    <Button
                        onClick={this.translate.bind(this)}
                        disabled={this.state.enabled && (this.state.inputValue.length === 0 || this.state.translating)}
                        css={{
                            height: '100%',
                            padding: '0 1rem',
                            fontSize: '.9rem'
                        }}
                    >
                        <Translate/>
                        Translate
                    </Button>
                    <Button
                        theme="tertiary"
                        onClick={this.embed.bind(this)}
                        disabled={this.state.result.length === 0 || this.state.embedding}
                        css={{
                            height: '100%',
                            padding: '0 1rem',
                            fontSize: '.9rem'
                        }}
                    >
                        <CloudUploadFill/>
                        Embed
                    </Button>
                    <Grid direction="vertical" css={{
                        marginLeft: 'auto'
                    }}>
                        <Grid spacing="16px" alignItems="center">
                            <Typography text={`Process Amount (${this.state.translations})`}/>
                            <input
                                type="range"
                                disabled={this.state.translating}
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
                </Grid>
                <Grid width="100%" padding={8} direction="vertical">
                    <StyledInput>
                        <StyledInputHeader>
                            Input
                        </StyledInputHeader>
                        <SpanEditable
                            contentEditable={!this.state.translating}
                            placeholder="Type your translation input here!"
                            onChange={this.onInputChange.bind(this)}
                            html={this.state.inputValue}
                            role="textbox"
                            css={{
                                width: '100%',
                                color: '#fff',
                                cursor: 'text',
                                margin: '4px 0 0 12px',
                                outline: 'none',
                                display: 'inline-block',
                                fontSize: '1rem',
                                fontWeight: 500,
                                background: 'none',
                                fontFamily: 'Gotham',

                                '&:disabled': {
                                    cursor: 'not-allowed'
                                },

                                '&:empty:before': {
                                    color: '#ffffff4d',
                                    content: 'attr(placeholder)'
                                },

                                '&:empty:focus:before': {
                                    content: "",
                                    animation: `${InputTextAreaAnim} 1s steps(1, end) infinite`,
                                    borderLeft: '1px solid #fff'
                                }
                            }}
                        />
                    </StyledInput>
                    <Divider width="100%" margin="1rem -8px 8px"/>
                    <StyledInput>
                        <StyledInputHeader disabled={this.state.translating}>
                            Result
                        </StyledInputHeader>
                        <StyledInputResult css={{
                            color: this.state.result.length === 0 ? '#ffffff4d' : undefined
                        }}>
                            {this.state.result || "Translation"}
                        </StyledInputResult>
                    </StyledInput>
                    <Accordion title="Translation Progression" margin="16px 0 0 0" titleSize="1rem" titleColor="#ffffffcc">
                        {this.state.translationProgression.map(
                            (prog, index) => <StyledProgress key={index}>
                                <Typography text={`Translation ${index + 1}`}/>
                                <StyledInputHeader>
                                    Input (from {prog.language[0]?.toUpperCase()})
                                </StyledInputHeader>
                                <StyledInputResult>
                                    {prog.from}
                                </StyledInputResult>

                                <StyledInputHeader>
                                    Result (to {prog.language[1]?.toUpperCase()})
                                </StyledInputHeader>
                                <StyledInputResult>
                                    {prog.to}
                                </StyledInputResult>
                            </StyledProgress>
                        )}
                    </Accordion>
                </Grid>
                <Toaster/>
            </Grid>
        );
    }
};