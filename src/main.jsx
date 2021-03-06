import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { checkUpdate } from '@tauri-apps/api/updater';

import store from './common/store';
import Navigation from './pages/navigation';

import './localization';
import '/voxeliface/src/index.css';
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Navigation/>
        </Provider>
    </React.StrictMode>
);

setInterval(() => checkUpdate(), 5 * 60000);