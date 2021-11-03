import App from '../components/App';
import Main from '../components/Main';
import Header from '../components/Header';
import Translation from '../components/Translation';

import React from 'react';

class IndexPage extends React.Component {
    render() {
        return (
            <App>
                <Header text="goggle trans" icon={"/favicon.ico"} />
                <Main>
                    <Translation/>
                </Main>
            </App>
        );
    }
};

export default IndexPage;