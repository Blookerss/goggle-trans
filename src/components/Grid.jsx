import React from 'react';
import styled from 'styled-components';

const GridComponent = styled.div`
    gap: ${props => props.spacing || 0};
    ${props => props.width ? `width: ${props.width};` : ''}
    margin: ${props => props.margin || 0};
    ${props => props.height ? `height: ${props.height};` : ''}
    display: flex;
    padding: ${props => props.padding || 0};
    flex-flow: ${props => props.flow || "row nowrap"};
    flex-wrap: ${props => props.wrap ? {none: "nowrap", wrap: "wrap", reverse: "wrap-reverse"}[props.wrap] : "nowrap"};
    align-items: ${props => props.alignItems || "stretch"};
    align-content: ${props => props.alignContent || "normal"};
    flex-direction: ${props => props.direction ? {horizontal: "row", horizontalReverse: "row-reverse", vertical: "column", verticalReverse: "column-reverse"}[props.direction] || "row" : "row"};
    justify-content: ${props => props.justifyContent || "flex-start"};
`;

class Grid extends React.Component {
    render() {
        return (
            <GridComponent {...this.props}>
                {this.props.children}
            </GridComponent>
        );
    }
}

export default Grid;