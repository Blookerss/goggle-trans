import React from 'react';
import styled from 'styled-components';

const MainComponent = styled.main`
    display: flex;
    padding: 32px 40px 0 40px;
    flex-grow: 1;
    align-items: center;
    align-content: center;
    flex-direction: column;
    background-color: #1D1D1D;
`;

class Main extends React.Component {
    render() {
        return (
            <MainComponent>
                {this.props.children}
            </MainComponent>
        );
    }
}

export default Main;