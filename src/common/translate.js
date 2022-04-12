import { Body } from '@tauri-apps/api/http';

import Util from './util';
import Languages from './languages';

function extract(key, data) {
    const re = new RegExp(`"${key}":".*?"`);
    const result = re.exec(data);
    if (result !== null) {
        return result[0].replace(`"${key}":"`, '').slice(0, -1);
    }
    return '';
}

function translateText({ input, from, to }) {
    if(input.length > 5000)
        throw new Error("input length is greater than 5000");
    
    return Util.makeRequest('https://translate.google.com', {
        responseType: 'Text'
    }).then(data => ({
        'rpcids': 'MkEWBc',
        'f.sid': extract('FdrFJe', data),
        'bl': extract('cfb2h', data),
        'hl': 'en-US',
        'soc-app': '1',
        'soc-platform': '1',
        'soc-device': '1',
        '_reqid': Math.floor(1000 + (Math.random() * 9000)).toString(),
        'rt': 'c'
    })).then(data =>
        Util.makeRequest('https://translate.google.com/_/TranslateWebserverUi/data/batchexecute', {
            body: Body.text(
                'f.req=' + encodeURIComponent(
                    JSON.stringify([
                        [['MkEWBc', JSON.stringify([[input, from, to, true], [null]]), null, 'generic']]
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
            console.log(json);
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
            else
                result.text = json[1][0][0][5]
                    .map(function (obj) {
                        return obj[0];
                    })
                    .filter(Boolean)
                    .join(' ');
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

                if (json[0][1][0][2] === 1)
                    result.from.text.autoCorrected = true;
                else
                    result.from.text.didYouMean = true;
            }

            return result;
        })
    );
}

function rand(array) {
    return array[Math.floor((Math.random() * array.length))];
};

export default async function translate(input, processes, setProgress) {
    const progression = [];
    let result = input;

    for (let i = 0; i < processes; i++) {
        const previous = result.toString();
        const langFrom = rand(Object.keys(Languages)), langTo = rand(Object.keys(Languages));
        await translateText({
            input: result,
            from: langFrom,
            to: langTo
        }).then(({ text }) => result = text);

        progression.push({
            language: [langFrom, langFrom],
            from: previous,
            to: result
        });
        setProgress(i / processes);
    }

    const finalResult = await translateText({
        input: result,
        from: 'auto',
        to: 'en'
    }).then(({ text }) => text);
    setProgress(1);

    progression.push({
        language: ['auto', 'en'],
        from: result,
        to: finalResult
    });

    return [finalResult, progression];
};