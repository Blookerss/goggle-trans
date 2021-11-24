import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import DataController from "./dataController";
DataController.build().then(dataController => {
    window.$__DATA__ = dataController;

    const { Home, History, Settings, Generator, NotFound } = require('./pages');

    const Tauri = window.__TAURI__;
    const rootElement = document.getElementById('root');
    ReactDOM.render(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/history" element={<History />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/generator" element={<Generator />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>,
        rootElement
    );

    if (Tauri) {
        rootElement.classList.add("root-tauri");
        document.body.classList.add("body-tauri");
    }

    serviceWorker.unregister();
});