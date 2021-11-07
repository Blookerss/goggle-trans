import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const LinkComponent = styled(RouterLink)`
    color: #c7c6c6;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: HCo Gotham SSm, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    font-weight: 500;
    line-height: 1.43;
    align-items: center;
    text-decoration: none;

    &:active {
        
    }
    &:hover {
        color: white;
    }
    &:disabled {
        
    }
`;

const IconComponent = styled.i`
    color: inherit;
    display: ${props => props.className ? 'block' : 'none'};
    margin-right: 8px;
`;

class Link extends React.Component {
    render() {
        return (
            <LinkComponent {...this.props}>
                <IconComponent className={this.props.icon}/>
                {this.props.text || "Link"}
            </LinkComponent>
        );
    }
}

export default Link;