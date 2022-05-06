import React from 'react';

import Image from '/voxeliface/components/Image';
import DefaultHeader from '/voxeliface/components/Header/Tauri';

export default function Header({ icon, ...props }) {
    return (
        <DefaultHeader brand={<>
            {icon ??
                <Image src="/brand-text.svg" width={96} height={32}/>
            }
        </>} {...props}/>
    );
};