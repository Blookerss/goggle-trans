import React from 'react';

import Grid from '/voxeliface/components/Grid';
import Typography from '/voxeliface/components/Typography';

export default class Navigation extends React.Component {
    render() {
        return (
            <Grid direction="horizontal" alignItems="center" justifyContent="space-between" css={{
                top: 64,
                width: '100%',
                zIndex: 1100,
                padding: '0 24px',
                position: 'sticky',
                minHeight: 32,
                background: '#181818'
            }}>
                <Grid spacing="24px" direction="horizontal" alignItems="center">
                    <Typography size=".85rem" text={this.props.title} color="#cbcbcb" family="Nunito"/>
                </Grid>
                <Grid spacing="24px" direction="horizontalReverse" alignItems="center" css={{
                    '& *': {
                        color: '#c7c6c6',
                        fontSize: '.8rem',
                        fontFamily: 'Nunito'
                    }
                }}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
};