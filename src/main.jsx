import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, History, Settings, NotFound } from './pages';

const Tauri = window.__TAURI__;
const rootElement = document.getElementById('root');

import '/voxeliface/src/index.css';
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/history" element={<History/>}/>
            <Route exact path="/settings" element={<Settings/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>,
    rootElement
);

if (Tauri) {
    rootElement.classList.add("root-tauri");
    document.body.classList.add("body-tauri");
}