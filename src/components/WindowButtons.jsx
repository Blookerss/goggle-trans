import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';

const Tauri = window.__TAURI__;

const WindowButtonsComponent = styled(Grid)`
    height: 100%;
`;

const WindowButtonComponent = styled.button`
    color: #cccbcb;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 1rem;
    background: none;
    transition: color 0.2s;

    &:hover {
        color: ${props => props.color};
    }
`;

class WindowButtons extends React.Component {
    closeWindow() {
        Tauri.window.getCurrent().close();
    }

    async maximizeWindow() {
        const window = Tauri.window.getCurrent();
        if (await window.isMaximized())
            window.unmaximize();
        else
            window.maximize();
    }

    minimizeWindow() {
        Tauri.window.getCurrent().minimize();
    }

    render() {
        return (
            <WindowButtonsComponent spacing="16px" direction="horizontalReverse" alignItems="center">
                <WindowButtonComponent color="#ff7070" onClick={this.closeWindow.bind(this)}>
                    <i className="bi bi-x-lg" />
                </WindowButtonComponent>
                <WindowButtonComponent color="#ffffff" onClick={this.maximizeWindow.bind(this)}>
                    <i className="bi bi-fullscreen" />
                </WindowButtonComponent>
                <WindowButtonComponent color="#ffffff" onClick={this.minimizeWindow.bind(this)}>
                    <i className="bi bi-fullscreen-exit" />
                </WindowButtonComponent>
            </WindowButtonsComponent>
        );
    }
}

export default WindowButtons;