import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';

const NavComponent = styled(Grid)`
    top: 64px;
    width: 100%;
    height: 48px;
    z-index: 1100;
    padding: 0 24px;
    position: sticky;
    background-color: #181818;
`;

class Navigation extends React.Component {
    render() {
        return (
            <NavComponent spacing="24px" direction="horizontalReverse" alignItems="center">
                {this.props.children}
            </NavComponent>
        );
    }
}

export default Navigation;