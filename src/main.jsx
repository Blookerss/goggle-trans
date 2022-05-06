import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, History, Settings, NotFound } from './pages';

import '/voxeliface/src/index.css';
const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/history" element={<History/>}/>
                <Route exact path="/settings" element={<Settings/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);