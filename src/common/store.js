import historySlice from './slices/history';
import settingsSlice from './slices/settings';
import { configureStore } from '@reduxjs/toolkit';
export default configureStore({
    reducer: {
        history: historySlice,
        settings: settingsSlice
    }
});