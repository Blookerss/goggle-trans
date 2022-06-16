import React from 'react';
import { styled } from '@stitches/react';
import { useSelector } from 'react-redux';

import Grid from '/voxeliface/components/Grid';
import Spinner from '/voxeliface/components/Spinner';
import Accordion from '../components/Accordion';
import Typography from '/voxeliface/components/Typography';
import TextHeader from '/voxeliface/components/Typography/Header';
const TextArea = styled('textarea', {
    color: '$primaryColor',
    resize: 'none',
    border: 'none',
    padding: '.5rem .75rem',
    outline: 'none',
    maxHeight: '10rem',
    background: '#0000002e',
    fontFamily: '$primaryFont',
    whiteSpace: 'pre-line',
    borderRadius: 8
});

export default function HistoryPage() {
    const history = useSelector(state => state.history.data);
    return <Grid width="100%" height="100%" padding=".75rem 1rem" direction="vertical">
        <TextHeader>Translation History</TextHeader>
        {!history ?
            <React.Fragment>
                <Typography text="Loading History" />
                <Spinner/>
            </React.Fragment>
        : history.length === 0 ?
            <React.Fragment>
                <Typography size="1.4rem" color="$primaryColor" >
                    There's nothing here!
                </Typography>
                <Typography size=".9rem" color="$secondaryColor"  spacing={4}>
                    You haven't translated anything yet, or <b>History Storage</b> is disabled.
                </Typography>
            </React.Fragment>
        :
            <Grid width="100%" spacing={8} direction="verticalReverse">
                {history.map((translation, index) => {
                    const date = new Date(translation.date);
                    return <Accordion key={index} summary={
                        <Grid width="100%" direction="horizontal" alignItems="center" justifyContent="space-between">
                            <Typography color="$primaryColor" weight={600} >
                                Translation {index + 1}
                            </Typography>
                            <Typography size=".9rem" color="$secondaryColor" family="$primaryFontSans">
                                {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {date.toLocaleTimeString('en-us')}
                            </Typography>
                        </Grid>
                    }>
                        <TextHeader>Input</TextHeader>
                        <TextArea rows={6} value={translation.input ?? "Unknown?"} readOnly/>

                        <TextHeader spacious>Result</TextHeader>
                        <TextArea rows={6} value={translation.result ?? "Unknown?"} readOnly/>

                        <Grid spacing={32} direction="horizontal">
                            <Grid spacing={2} direction="vertical">
                                <Typography color="$primaryColor" >
                                    Translation Cycles
                                </Typography>
                                <Typography size=".8rem" color="$secondaryColor" >
                                    {translation.translations ?? "Unknown?"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Accordion title="Translation Progression" color="$secondaryBackground" margin="16px 0 0 0">
                            {translation?.progression?.map(
                                (prog, index) => <Grid key={index} direction="vertical">
                                    <TextHeader spacious={index > 0}>Translation {index + 1}</TextHeader>
                                    <Typography color="$secondaryColor"  margin="0 0 6px">
                                        Input (from {prog.language[0]?.toUpperCase()})
                                    </Typography>
                                    <TextArea rows={2} value={prog.from} readOnly/>

                                    <Typography color="$secondaryColor"  margin="1rem 0 6px">
                                        Result (to {prog.language[1]?.toUpperCase()})
                                    </Typography>
                                    <TextArea rows={2} value={prog.to} readOnly/>
                                </Grid>
                            ) || ["There's nothing here!"]}
                        </Accordion>
                    </Accordion>
                })}
            </Grid>
        }
    </Grid>;
};