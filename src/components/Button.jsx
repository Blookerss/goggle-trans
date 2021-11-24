import React from 'react';
import styled from 'styled-components';

const Sizes = {
    medium: {
        width: 160,
        height: 48,
        padding: '0 22px'
    },
    small: {
        width: 128,
        height: 36,
        padding: '0 10px'
    }
}

const Themes = {
    primary: {
        color: {
            hover: "#26FF9C",
            normal: "#00E87E",
            active: "#00B864",
            disabled: "#004f2b"
        },
        border: {
            hover: "none",
            normal: "none",
            active: "none",
            disabled: "none"
        },
        textColor: {
            hover: "#121212",
            normal: "#121212",
            active: "#121212",
            disabled: "#121212"
        }
    },
    secondary: {
        color: {
            hover: "#E1E1E1",
            normal: "#FFFFFF",
            active: "#CBCBCB",
            disabled: "#565656"
        },
        border: {
            hover: "none",
            normal: "none",
            active: "none",
            disabled: "none"
        },
        textColor: {
            hover: "#121212",
            normal: "#121212",
            active: "#121212",
            disabled: "#121212"
        }
    },
    tertiary: {
        color: {
            hover: "transparent",
            normal: "transparent",
            active: "transparent",
            disabled: "transparent"
        },
        border: {
            hover: "1px solid #E1E1E1",
            normal: "1px solid #FFFFFF",
            active: "1px solid #CBCBCB",
            disabled: "1px solid #565656"
        },
        textColor: {
            hover: "#E1E1E1",
            normal: "#FFFFFF",
            active: "#CBCBCB",
            disabled: "#565656"
        }
    },
    alert: {
        color: {
            hover: "#F6837E",
            normal: "#F2453D",
            active: "#F2453D",
            disabled: "#7a0d08"
        },
        border: {
            hover: "transparent",
            normal: "transparent",
            active: "transparent",
            disabled: "transparent"
        },
        textColor: {
            hover: "#121212",
            normal: "#121212",
            active: "#121212",
            disabled: "#121212"
        }
    },
};
const ButtonComponent = styled.button`
    width: fit-content;
    color: ${props => Themes[props.theme].textColor.normal};
    margin: 0;
    height: ${props => Sizes[props.size].height}px;
    border: ${props => Themes[props.theme].border.normal};
    cursor: pointer;
    outline: 0;
    padding: ${props => Sizes[props.size].padding};
    display: inline-flex;
    position: relative;
    font-size: 1rem;
    min-width: ${props => Sizes[props.size].width}px;
    box-shadow: none;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    padding-top: 0;
    font-family: HCo Gotham SSm, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
    font-weight: 500;
    line-height: 1.43;
    align-items: center;
    border-radius: 4px;
    padding-bottom: 0;
    text-transform: none;
    vertical-align: middle;
    text-decoration: none;
    justify-content: center;
    background-color: ${props => Themes[props.theme].color.normal};
    -webkit-appearance: none;

    &:active {
        color: ${props => Themes[props.theme].textColor.active};
        border: ${props => Themes[props.theme].border.active};
        background-color: ${props => Themes[props.theme].color.active};
    }
    &:hover {
        color: ${props => Themes[props.theme].textColor.hover};
        border: ${props => Themes[props.theme].border.hover};
        background-color: ${props => Themes[props.theme].color.hover};
    }
    &:disabled {
        color: ${props => Themes[props.theme].textColor.disabled};
        cursor: not-allowed;
        border: ${props => Themes[props.theme].border.disabled};
        background-color: ${props => Themes[props.theme].color.disabled};
    }
`;

const IconComponent = styled.i`
    color: ${props => Themes[props.theme].textColor};
    display: ${props => props.className ? 'block' : 'none'};
    margin-right: 8px;
`;

class Button extends React.Component {
    render() {
        return (
            <ButtonComponent {...this.props} size={this.props.size || "medium"} theme={this.props.theme || "primary"}>
                <IconComponent className={this.props.icon} theme={this.props.theme || "primary"}/>
                {this.props.text || "Button"}
            </ButtonComponent>
        );
    }
}

export default Button;