const { fs, path } = window.__TAURI__ || {};
const dataDefaults = {
    history: [],
    settings: {
        checkApi: true,
        history: {
            enabled: true
        }
    }
};

class DataObject {
    constructor(dataController, dataName, dataPath, cache) {
        this.dataController = dataController;
        this.dataName = dataName;
        this.dataPath = dataPath;
        this.cache = cache;

        if (!this.cache)
            this.cache = dataDefaults[dataName];
        this.updateStored(this.cache, dataDefaults[dataName]);
    }

    static async build(dataController, dataName) {
        return new Promise(async(resolve, reject) => {
            let cache = await DataObject.getData(dataController, dataName);
            let dataPath = dataController.dataPath + `${dataName}.json`;
            resolve(new DataObject(dataController, dataName, dataPath, cache));
        });
    }

    updateStored(cache, def) {
        let defaultKeys = Object.keys(def);
        for (let i = 0; i < defaultKeys.length; i++) {
            let cacheValue = cache[defaultKeys[i]];
            let defaultValue = def[defaultKeys[i]];
            if (defaultValue !== undefined && cacheValue === undefined) {
                cache[defaultKeys[i]] = def[defaultKeys[i]];
            } else if (typeof cacheValue == "object") {
                this.updateStored(cacheValue, defaultValue);
            }
        }
        this.save();
        return this;
    }

    add(value) {
        if(!this.cache instanceof Array)
            throw new TypeError("DATA_IS_OBJECT");
        this.cache.push(value);
        this.save();
        return this;
    }

    get(path) {
        let pathArray = path.split(".");
        let value = this.cache;
        for (let i = 0; i < pathArray.length; i++) {
            let index = pathArray[i];
            value = value[index];
        }
        return value;
    }

    getAll() {
        return DataObject.getData(this.dataController, this.dataName);
    }

    static async getData(dataController, dataName) {
        return new Promise(async(resolve, reject) => {
            let dataPath = dataController.dataPath + `${dataName}.json`;
            let cache = fs ? JSON.parse(await fs.readTextFile(
                dataPath
            )) : JSON.parse(localStorage.getItem(dataName));
            resolve(cache);
        });
    }

    set(path, newValue) {
        let schema = this.cache;
        let pathArray = path.split(".");
        let length = pathArray.length;
        for (let i = 0; i < length - 1; i++) {
            let index = pathArray[i];
            schema = schema[index];
        }
        schema[pathArray[length - 1]] = newValue;
        this.save();
        return this;
    }

    async save() {
        if (fs) {
            let dir = await fs.readDir(this.dataController.dataPath).catch(e => null);
            if(!dir)
                await fs.createDir(this.dataController.dataPath); 
            fs.writeFile({
                path: this.dataPath,
                contents: JSON.stringify(this.cache)
            });
        } else
            localStorage.setItem(this.dataName, JSON.stringify(this.cache));
        return this;
    }
}

export default class DataController {
    constructor(dataPath) {
        this.dataPath = dataPath;
    }

    static async build() {
        let dataPath = path ? await path.appDir() : "";
        return new DataController(dataPath);
    }

    getData(name) {
        return DataObject.build(this, name);
    }
}