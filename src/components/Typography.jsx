import React from 'react';
import styled from 'styled-components';

const TextComponent = styled.p`
    color: ${props => props.color || "white"};
    margin: ${props => props.margin || 0};
    font-size: ${props => props.size || "1rem"};
    font-weight: ${props => props.weight || 500};
    line-height: ${props => props.lineHeight || 1.43};
`;

class Typography extends React.Component {
    render() {
        return (
            <TextComponent {...this.props}>
                {this.props.text}
            </TextComponent>
        );
    }
}

export default Typography;