import React from 'react';

import Image from '/voxeliface/components/Image';
import Typography from '/voxeliface/components/Typography';
import DefaultHeader from '/voxeliface/components/Header/Tauri';

export default class Header extends React.Component {
    render() {
        return (
            <DefaultHeader brand={<>
                {this.props.icon ??
                    <Image src="/logo128.png" size={48}/>
                }
                {this.props.text ??
                    <Typography size="1.1rem">
                        goggle trans
                    </Typography>
                }
            </>} {...this.props}/>
        );
    }
};