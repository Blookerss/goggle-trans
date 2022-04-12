import React, { useState } from 'react';

import Grid from '/voxeliface/components/Grid';
import Divider from '/voxeliface/components/Divider';
import Typography from '/voxeliface/components/Typography';

export default function Accordion({ css, color, title, summary, children, titleSize, titleColor, ...props }) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    return (
        <Grid
            direction="vertical"
            borderRadius="8px"
            {...props}
            css={{
                overflow: 'hidden',
                background: color ?? '#2C2C2C',
                ...css
            }}
        >
            <Grid onClick={toggle} alignItems="center" css={{
                cursor: 'pointer',
                padding: '0 24px',
                minHeight: open ? 64 : 48,
                userSelect: 'none',
                transition: 'min-height 214ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                backgroundColor: color ?? '#2C2C2C'
            }}>
                {summary ??
                    <Typography
                        text={title ?? "Accordion Title"}
                        size={titleSize ?? "1rem"}
                        color={titleColor ?? "#ffffff"}
                        weight={600}
                        family="Nunito"
                        lineheight={1.5}
                    />
                }
            </Grid>
            {open && <Divider width="100%" margin="0 0 8px 0"/>}
            <Grid direction="vertical" css={{
                height: open ? 'auto' : 0,
                padding: open ? '12px 24px 24px' : '0 24px',
                overflow: 'hidden',
                background: color ?? '#2C2C2C',
                visibility: open ? 'visible' : 'hidden',
                transition: 'all 214ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            }}>
                {children}
            </Grid>
        </Grid>
    );
};