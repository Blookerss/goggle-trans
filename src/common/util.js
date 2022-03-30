import { http, invoke } from '@tauri-apps/api';

export default class Util {
    static async makeRequest(url, options = {}) {
        if(options.query) {
            const keys = Object.keys(options.query);
            for (let i = 0; i < keys.length; i++) {
                const value = options.query[keys[i]];
                if (value !== undefined)
                    options.query[keys[i]] = value.toString();
            }
        }
        const response = await invoke("web_request", {
            url,
            body: options.body ?? http.Body.json({}),
            method: options.method ?? "GET",
            query: options.query ?? {},
            headers: options.headers ?? {},
            responseType: {JSON: 1, Text: 2, Binary: 3}[options.responseType] ?? 1
        });
        return response.data;
    }

    static readTextFile(path) {
        return invoke("fs_read_text_file", { path }).catch(err => {
            console.error(`Failed to read ${path}`);
            throw err;
        });
    }

    static writeFile(path, contents) {
        return invoke("fs_write_file", { path, contents });
    }

    static fileExists(path) {
        return invoke("fs_file_exists", { path });
    }

    static createDir(path) {
        return invoke("fs_create_dir_all", { path });
    }
};