import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';

const AppComponent = styled(Grid)`
    
`;

class App extends React.Component {
    render() {
        return (
            <AppComponent direction="vertical">
                {this.props.children}
            </AppComponent>
        );
    }
}

export default App;