import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';
import Typography from './Typography';

const CardComponent = styled(Grid)`
    padding: 16px 24px;
    border-radius: 8px;
    background-color: #181818;
`;

class Card extends React.Component {
    render() {
        return (
            <CardComponent
                direction="vertical"
                {...this.props}
            >
                <Typography
                    text={this.props.title || "Card Title"}
                    size="1.2rem"
                    color="#ffffffd9"
                    weight={600}
                    margin="0 0 4px 0"
                />
                <Grid>
                    {this.props.children}
                </Grid>
            </CardComponent>
        );
    }
}

export default Card;