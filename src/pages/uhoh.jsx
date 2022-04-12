import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Typography from '/voxeliface/components/Typography';

import React from 'react';

export default class UnknownPage extends React.Component {
    render() {
        return (
            <App>
                <Header/>
                <Navigation>
                    <Link to="/" text="Home"/>
                </Navigation>
                <Main>
                    <Typography text="george not found"/>
                </Main>
            </App>
        );
    }
};