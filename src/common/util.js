import { invoke } from '@tauri-apps/api';
import { Body, fetch } from '@tauri-apps/api/http';
export default class Util {
    static async makeRequest(url, options = {}) {
        console.log(options.method ?? 'GET', url, options);
        const response = await fetch(url, {
            body: options.body ?? Body.text(''),
            query: options.query ?? {},
            method: options.method ?? 'get',
            headers: options.headers ?? {},
            responseType: {JSON: 1, Text: 2, Binary: 3}[options.responseType] ?? 2
        });
        console.log(url, options, response);
        if(!response.ok)
            throw new Error(`${response.status} ${response.data}`);
        if((response.headers['content-type']?.includes('application/json') || options.forceJson) && !options.ignoreJson)
            response.data = JSON.parse(response.data);
        return response.data;
    }

    static readTextFile(path) {
        return invoke('fs_read_text_file', { path }).catch(err => {throw new Error(`readTextFile failed: ${err}`)});
    }

    static writeFile(path, contents) {
        return invoke('fs_write_file', { path, contents }).catch(err => {throw new Error(`writeFile failed: ${err}`)});
    }

    static fileExists(path) {
        return invoke('fs_file_exists', { path }).catch(err => {throw new Error(`fileExists failed: ${err}`)});
    }

    static createDir(path) {
        return invoke('fs_create_dir_all', { path }).catch(err => {throw new Error(`createDir failed: ${err}`)});
    }
};