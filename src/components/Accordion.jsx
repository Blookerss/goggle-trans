import React from 'react';
import styled from 'styled-components';

import Grid from './Grid';
import Typography from './Typography';

const AccordionComponent = styled(Grid)`
    background-color: #222222;

    > * {
        &:first-child {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        &:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
`;

const TitleComponent = styled(Grid)`
    cursor: pointer;
    padding: 0 24px;
    min-height: ${props => props.open ? 64 : 48}px;
    transition: min-height 214ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #2C2C2C;
`;

const ChildrenComponent = styled(Grid)`
    height: ${props => props.open ? 'auto' : 0};
    padding: ${props => props.open ? '12px 24px 24px' : '0 24px'};
    overflow: hidden;
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    transition: all 214ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #2C2C2C;
`;

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <AccordionComponent
                direction="vertical"
                {...this.props}
            >
                <TitleComponent open={this.state.open} onClick={this.onClick.bind(this)} alignItems="center">
                    <Typography
                        text={this.props.title || "Accordion Title"}
                        size={this.props.titleSize || "1.2rem"}
                        color={this.props.titleColor || "#ffffffd9"}
                        weight={600}
                        lineHeight={1.5}
                    />
                </TitleComponent>
                <ChildrenComponent open={this.state.open} direction="vertical">
                    {this.props.children}
                </ChildrenComponent>
            </AccordionComponent>
        );
    }

    onClick() {
        console.log(this.state.open);
        this.setState({
            open: this.state.open ? false : true
        });
    }
}

export default Accordion;