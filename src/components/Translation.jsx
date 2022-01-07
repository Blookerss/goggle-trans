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
        /*await toast.promise(
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
        );*/
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

    _extract(key, res) {
        var re = new RegExp(`"${key}":".*?"`);
        var result = re.exec(res.data);
        if (result !== null) {
            return result[0].replace(`"${key}":"`, '').slice(0, -1);
        }
        return '';
    }

    _translate(options) {
        return Tauri.invoke('web_request', {
            url: 'https://translate.google.com',
            body: Tauri.http.Body.json({}),
            method: 'GET',
            query: {},
            headers: {},
            responseType: 2
        }).then(response => {
            return {
                'rpcids': 'MkEWBc',
                'f.sid': this._extract('FdrFJe', response),
                'bl': this._extract('cfb2h', response),
                'hl': 'en-US',
                'soc-app': '1',
                'soc-platform': '1',
                'soc-device': '1',
                '_reqid': Math.floor(1000 + (Math.random() * 9000)).toString(),
                'rt': 'c'
            };
        }).then(data => {
            return Tauri.invoke('web_request', {
                url: `https://translate.google.com/_/TranslateWebserverUi/data/batchexecute`,
                body: Tauri.http.Body.text(
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
                responseType: 2
            }).then(response => {
                let json = response.data.slice(6);
                let result = {
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

                if (json[1][0][0][5] === undefined || json[1][0][0][5] === null) {
                    // translation not found, could be a hyperlink or gender-specific translation?
                    result.text = json[1][0][0][0];
                } else {
                    result.text = json[1][0][0][5]
                        .map(function (obj) {
                            return obj[0];
                        })
                        .filter(Boolean)
                        // Google api seems to split text per sentences by <dot><space>
                        // So we join text back with spaces.
                        // See: https://github.com/vitalets/google-translate-api/issues/73
                        .join(' ');
                }
                result.pronunciation = json[1][0][0][1];

                // From language
                if (json[0] && json[0][1] && json[0][1][1]) {
                    result.from.language.didYouMean = true;
                    result.from.language.iso = json[0][1][1][0];
                } else if (json[1][3] === 'auto') {
                    result.from.language.iso = json[2];
                } else {
                    result.from.language.iso = json[1][3];
                }

                // Did you mean & autocorrect
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
            });
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

            let result = this.state.input, progression = [];
            if(Tauri) {
                await toast.promise(
                    new Promise(async(resolve, reject) => {
                        for (let i = 0; i < this.state.translations; i++) {
                            let langFrom = Object.keys(languages).random(), langTo = Object.keys(languages).random();
                            let previous = result.toString();
                            let data = await this._translate({
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

                        let langFrom = 'auto', langTo = 'en';
                        let previous = result.toString();
                        let data = await this._translate({
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