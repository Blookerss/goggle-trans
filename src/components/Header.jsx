import React from 'react';

import DefaultHeader from '/voxeliface/components/Header';

export default class Header extends React.Component {
    render() {
        return (
            <DefaultHeader brand={<>
                {this.props.text ?? "goggle trans"}
            </>} {...this.props}/>
        );
    }
};