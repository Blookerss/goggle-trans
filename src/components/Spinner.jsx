import React from 'react';
import styled, { keyframes } from 'styled-components';

const SpinnerAnimation = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;
const SpinnerComponent = styled.div`
    color: #fff;
    width: ${props => props.size || 48}px;
    margin: ${props => props.margin || 0};
    height: ${props => props.size || 48}px;
    border: calc(${props => props.size || 48}px / 9) solid;
    display: ${props => (props.visible == null ? true : props.visible) ? "inline-block" : "none"};
    border-radius: 50%;
    border-top-color: transparent;
    
    animation: ${SpinnerAnimation} 1s linear infinite;
`;

class Spinner extends React.Component {
    render() {
        return (
            <SpinnerComponent {...this.props}/>
        );
    }
}

export default Spinner;