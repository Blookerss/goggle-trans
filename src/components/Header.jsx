import React from 'react';

import Image from '/voxeliface/components/Image';
import DefaultHeader from '/voxeliface/components/Header/Tauri';
export default function Header({ icon, ...props }) {
    return (
        <DefaultHeader brand={<>
            {icon ??
                <Image src="img/banners/brand_text.svg" width={112} height={48}/>
            }
        </>} {...props}/>
    );
};