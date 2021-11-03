import React from 'react';
import styled from 'styled-components';

const AppComponent = styled.div`
    
`;

class App extends React.Component {
    render() {
        return (
            <AppComponent>
                {this.props.children}
            </AppComponent>
        );
    }
}

export default App;