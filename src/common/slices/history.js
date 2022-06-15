import { appDir } from '@tauri-apps/api/path';
import { createSlice } from '@reduxjs/toolkit';

import Util from '../util';
const historyPath = `${await appDir()}/history.json`;
const history = await Util.readTextFile(historyPath).then(JSON.parse).catch(console.warn);
export const historySlice = createSlice({
    name: 'history',
    initialState: {
        data: history?.data ?? []
    },
    reducers: {
        addEntry: (state, { payload }) => {
            state.data.push(payload);
        },
        saveHistory: state => {
            Util.writeFile(historyPath, JSON.stringify(state));
        }
    }
});

export const { addEntry, saveHistory } = historySlice.actions;
export default historySlice.reducer;