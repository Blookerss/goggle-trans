import React from 'react';
import styled from 'styled-components';

import Typography from './Typography';
import WindowButtons from './WindowButtons';

const HeaderComponent = styled.header`
    top: 0;
    width: 100%;
    height: 64px;
    z-index: 1100;
    padding: 0 24px;
    position: fixed;
    background-color: #121212;

    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
`;

const BrandComponent = styled.div`
    display: flex;
`;

const IconComponent = styled.img`
    vertical-align: middle;
`;

class Header extends React.Component {
    render() {
        return (
            <HeaderComponent data-tauri-drag-region>
                <BrandComponent>
                    <IconComponent
                        src={this.props.icon}
                        alt="Brand Logo"
                        width={36}
                        height={36}
                    />
                    <Typography
                        size="1.2rem"
                        weight={500}
                        margin="0 0 0 16px"
                        lineHeight={2}
                        text={this.props.text}
                    />
                </BrandComponent>
                <WindowButtons/>
            </HeaderComponent>
        );
    }
}

export default Header;