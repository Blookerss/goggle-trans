import historySlice from './slices/history';
import updaterSlice from './slices/updater';
import settingsSlice from './slices/settings';
import { configureStore } from '@reduxjs/toolkit';
export default configureStore({
    reducer: {
        history: historySlice,
        updater: updaterSlice,
        settings: settingsSlice
    }
});