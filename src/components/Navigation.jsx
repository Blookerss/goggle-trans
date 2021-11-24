import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';
import Typography from './Typography';

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
            <NavComponent direction="horizontal" alignItems="center" justifyContent="space-between">
                <Grid spacing="24px" direction="horizontal" alignItems="center">
                    <Typography text={this.props.title} color="#cbcbcb"/>
                </Grid>
                <Grid spacing="24px" direction="horizontalReverse" alignItems="center">
                    {this.props.children}
                </Grid>
            </NavComponent>
        );
    }
}

export default Navigation;