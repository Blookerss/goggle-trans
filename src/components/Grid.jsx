import React from 'react';
import styled from 'styled-components';

const GridComponent = styled.div`
    gap: ${props => props.spacing || 0};
    margin: ${props => props.margin || 0};
    display: flex;
    flex-flow: ${props => props.flow || "row nowrap"};
    flex-wrap: ${props => props.wrap ? {none: "nowrap", wrap: "wrap", reverse: "wrap-reverse"}[props.wrap] : "nowrap"};
    align-items: ${props => props.alignItems || "stretch"};
    align-content: ${props => props.alignContent || "normal"};
    flex-direction: ${props => props.direction ? {horizontal: "row", horizontalReverse: "row-reverse", vertical: "column", verticalReverse: "column"}[props.direction] || "row" : "row"};
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