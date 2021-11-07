const { fs, path } = window.__TAURI__ || {};
const dataDefaults = {
    settings: {
        checkApi: true
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
        //let dataPath, cache;
        console.log(dataController.dataPath);
        //let dataPath = path ? await path.resolve(dataController.dataPath, `/${dataName}.json`) : null;
        let dataPath = dataController.dataPath + `\\${dataName}.json`
        let cache;
        try {
            cache = fs ? JSON.parse(await fs.readTextFile(
                dataPath
            )) : JSON.parse(localStorage.getItem(dataName));
        } catch (err) { }
        return new DataObject(dataController, dataName, dataPath, cache);
    }

    updateStored(cache, def) {
        let defaultKeys = Object.keys(def);
        for (let i = 0; i < defaultKeys.length; i++) {
            let cacheValue = cache[defaultKeys[i]];
            let defaultValue = def[defaultKeys[i]];
            if (defaultValue && !cacheValue)
                cache[defaultKeys[i]] = def[defaultKeys[i]];
            else if (typeof cacheValue == "object") {
                this.updateStored(cacheValue, defaultValue);
            }
        }
        this.save();
    }

    get(path) {

    }

    set(path, value) {

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