import Util from '../util';
import { appDir } from '@tauri-apps/api/path';
import { createSlice } from '@reduxjs/toolkit';

const settingsPath = `${await appDir()}/settings.json`;
const settings = await Util.readTextFile(settingsPath).then(JSON.parse).catch(console.warn);
export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        theme: settings?.theme ?? 'default',
        uiStyle: settings?.uiStyle ?? 'default',
        language: settings?.language ?? 'en',
        'history.enabled': settings?.['history.enabled'] ?? true
    },
    reducers: {
        setSetting: (state, { payload: [key, value] }) => {
            state[key] = value;
        },
        saveSettings: state => {
            Util.writeFile(settingsPath, JSON.stringify(state));
            console.warn('[Store]: Saved Settings to settings.json successfully');
        }
    }
});

export const { setSetting, saveSettings } = settingsSlice.actions;
export default settingsSlice.reducer;