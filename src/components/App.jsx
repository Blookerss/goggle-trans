import React from 'react';

import App from '/voxeliface/components/App/Tauri';

export default class App extends React.Component {
    render() {
        return (
            <App
                title="goggle trans"
            {...this.props}/>
        );
    }
};