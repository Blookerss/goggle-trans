import React from 'react';

import Grid from '/voxeliface/components/Grid';
import Typography from '/voxeliface/components/Typography';

export default class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        const { color } = this.props;
        return (
            <Grid
                direction="vertical"
                {...this.props}
                css={{
                    background: color ?? '#2C2C2C',

                    '> *': {
                        '&:first-child': {
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4
                        },

                        '&:last-child': {
                            borderBottomLeftRadius: 4,
                            borderBottomRightRadius: 4
                        }
                    },
                    ...this.props.css
                }}
            >
                <Grid onClick={this.onClick.bind(this)} alignItems="center" css={{
                    cursor: 'pointer',
                    padding: '0 24px',
                    minHeight: this.state.open ? 64 : 48,
                    transition: 'min-height 214ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    backgroundColor: color ?? '#2C2C2C'
                }}>
                    {this.props.summary ??
                        <Typography
                            text={this.props.title ?? "Accordion Title"}
                            size={this.props.titleSize ?? "1.2rem"}
                            color={this.props.titleColor ?? "#ffffffd9"}
                            weight={600}
                            lineheight={1.5}
                        />
                    }
                </Grid>
                <Grid direction="vertical" css={{
                    height: this.state.open ? 'auto' : 0,
                    padding: this.state.open ? '12px 24px 24px' : '0 24px',
                    overflow: 'hidden',
                    background: color ?? '#2C2C2C',
                    visibility: this.state.open ? 'visible' : 'hidden',
                    transition: 'all 214ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                }}>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }

    onClick() {
        console.log('accordion onclick');
        this.setState({
            open: this.state.open ? false : true
        });
    }
};