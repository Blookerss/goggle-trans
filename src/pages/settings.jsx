import React, { useState } from 'react';
import { open } from '@tauri-apps/api/shell';
import { checkUpdate } from '@tauri-apps/api/updater';
import { useTranslation } from 'react-i18next';
import { Github, EnvelopeOpen, CloudArrowDown } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getName, getVersion, getTauriVersion } from '@tauri-apps/api/app';

import Grid from '/voxeliface/components/Grid';
import Image from '/voxeliface/components/Image';
import Toggle from '../components/Toggle';
import Button from '/voxeliface/components/Button';
import Typography from '/voxeliface/components/Typography';
import TextHeader from '/voxeliface/components/Typography/Header';
import * as Select from '/voxeliface/components/Input/Select';
import BasicSpinner from '/voxeliface/components/BasicSpinner';

import { setSetting, saveSettings } from '../common/slices/settings';

const appName = await getName();
const appVersion = await getVersion();
const tauriVersion = await getTauriVersion();
export default function SettingsPage() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const theme = useSelector(state => state.settings.theme);
    const language = useSelector(state => state.settings.language);
    const historyEnabled = useSelector(state => state.settings['history.enabled']);
    const [updating, setUpdating] = useState(false);
    const changeLanguage = value => {
        changeSetting('language', value);
        i18n.changeLanguage(value);
    };
    const changeSetting = (key, value) => {
        dispatch(setSetting([key, value]));
        dispatch(saveSettings());
    };
    const updateCheck = () => {
        setUpdating(true);
        checkUpdate().then(({ shouldUpdate }) => {
            if (!shouldUpdate)
                toast('No updates available!', { duration: 5000 });
            setUpdating(false);
        });
    };
    const reportIssue = () => open('https://github.com/Blookerss/goggle-trans/issues/new');
    const openGithub = () => open('https://github.com/Blookerss/goggle-trans');
    return <Grid width="100%" height="fit-content" padding=".75rem 1rem" direction="vertical">
        <TextHeader>{t('app.goggletrans.settings.general')}</TextHeader>
        <Grid spacing={8} padding="0 1rem" direction="vertical">
            <Setting name="general.theme">
                <Select.Root value={theme} onChange={v => changeSetting('theme', v)}>
                    <Select.Group name={t('app.goggletrans.settings.general.theme.category')}>
                        <Select.Item value="default">
                            {t('app.goggletrans.settings.general.theme.items.default')}
                        </Select.Item>
                        <Select.Item value="light">
                            {t('app.goggletrans.settings.general.theme.items.light')}
                        </Select.Item>
                        <Select.Item value="dark">
                            {t('app.goggletrans.settings.general.theme.items.dark')}
                        </Select.Item>
                        <Select.Item value="purple">
                            {t('app.goggletrans.settings.general.theme.items.purple')}
                        </Select.Item>
                    </Select.Group>
                </Select.Root>
            </Setting>
            <Setting name="general.language" noSummary>
                <Select.Root value={language} onChange={changeLanguage}>
                    <Select.Group name={t('app.goggletrans.settings.general.language.category')}>
                        <Select.Item value="en">
                            {t('app.goggletrans.common:locales:en')}
                        </Select.Item>
                        <Select.Item value="lv">
                            {t('app.goggletrans.common:locales:lv')}
                        </Select.Item>
                        <Select.Item value="ru">
                            {t('app.goggletrans.common:locales:ru')}
                        </Select.Item>
                    </Select.Group>
                </Select.Root>
            </Setting>
        </Grid>

        <TextHeader spacious>{t('app.goggletrans.settings.history')}</TextHeader>
        <Grid spacing={8} padding="0 1rem" direction="vertical">
            <Setting name="history.enabled" direction="horizontal">
                <Toggle
                    size="small"
                    checked={historyEnabled}
                    changed={v => changeSetting('history.enabled', v)}
                />
                <Typography size=".8rem" color="$secondaryColor" >
                    {historyEnabled ? 'On' : 'Off'}
                </Typography>
            </Setting>
        </Grid>

        <TextHeader spacious>{t('app.goggletrans.settings.about')}</TextHeader>
        <Grid spacing={8} padding="0 1rem" direction="vertical">
            <Grid spacing={8} alignItems="center">
                <Image src="img/icons/brand_default.svg" size={48}/>
                <Grid spacing={2} direction="vertical">
                    <Typography color="$primaryColor"  lineheight={1}>
                        {appName} v{appVersion}
                    </Typography>
                    <Typography size=".7rem" color="$secondaryColor"  lineheight={1}>
                        {t('app.goggletrans.settings.about.tauri', {
                            val: tauriVersion
                        })}
                    </Typography>
                </Grid>
            </Grid>
            <Grid spacing={8}>
                <Button theme="accent" onClick={updateCheck} disabled={updating}>
                    {updating ? <BasicSpinner size={16}/> : <CloudArrowDown size={14}/>}
                    {t('app.goggletrans.settings.about.check_for_updates')}
                </Button>
                <Button theme="accent" onClick={reportIssue}>
                    <EnvelopeOpen size={14}/>
                    {t('app.goggletrans.settings.about.report_bug')}
                </Button>
                <Button theme="secondary" onClick={openGithub}>
                    <Github size={14}/>
                    {t('app.goggletrans.settings.about.github')}
                </Button>
            </Grid>
        </Grid>
    </Grid>;
};

function Setting({ name, children, direction, noSummary }) {
    const { t } = useTranslation();
    const stringBase = `app.goggletrans.settings.${name ?? 'placeholder'}`;
    return <Grid css={{
        marginBottom: 8
    }}>
        <Grid spacing={4} padding=".5rem .6rem" direction="vertical">
            <Typography color="$primaryColor"  lineheight={1}>
                {t(stringBase)}
            </Typography>
            {!noSummary &&
                <Typography size=".8rem" color="$secondaryColor" weight={400}  lineheight={1.2} whitespace="pre-wrap" textalign="start">
                    {t(`${stringBase}.summary`)}
                </Typography>
            }
            <Grid margin=".5rem 0 0" spacing={8} direction={direction ?? 'vertical'} css={{
                minWidth: 196,
                position: 'relative'
            }}>
                {children}
            </Grid>
        </Grid>
    </Grid>
};