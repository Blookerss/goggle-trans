import Store from '../store';
import { listen } from '@tauri-apps/api/event';
import { createSlice } from '@reduxjs/toolkit';
import { checkUpdate } from '@tauri-apps/api/updater';
export const updaterSlice = createSlice({
    name: 'updater',
    initialState: {
        data: null
    },
    reducers: {
        setData: (state, { payload }) => {
            state.data = payload;
        },
        ignoreUpdate: state => {
            state.data = null;
        }
    }
});

listen('tauri://update-available', ({ payload }) => {
    console.log('New version available: ', payload);
    Store.dispatch(updaterSlice.actions.setData(payload));
}).then(() => checkUpdate());

export const { ignoreUpdate } = updaterSlice.actions;
export default updaterSlice.reducer;