import React from 'react';
import { useTranslation } from 'react-i18next';
import { HouseDoorFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import App from '../components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link/Tauri';
import Grid from '/voxeliface/components/Grid';
import Header from '../components/Header';
import Toggle from '../components/Toggle';
import Typography from '/voxeliface/components/Typography';
import TextHeader from '/voxeliface/components/Typography/Header';
import * as Select from '/voxeliface/components/Input/Select';

import { setSetting, saveSettings } from '../common/slices/settings';
export default function SettingsPage() {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const theme = useSelector(state => state.settings.theme);
    const language = useSelector(state => state.settings.language);
    const historyEnabled = useSelector(state => state.settings['history.enabled']);
    const changeLanguage = value => {
        changeSetting('language', value);
        i18n.changeLanguage(value);
    };
    const changeSetting = (key, value) => {
        dispatch(setSetting([key, value]));
        dispatch(saveSettings());
    };
    return <Grid width="100%" height="100%" padding=".75rem 1rem" direction="vertical">
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
                <Typography size=".8rem" color="$secondaryColor" family="Nunito">
                    {historyEnabled ? 'On' : 'Off'}
                </Typography>
            </Setting>
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
            <Typography color="$primaryColor" family="Nunito" lineheight={1}>
                {t(stringBase)}
            </Typography>
            {!noSummary &&
                <Typography size=".8rem" color="$secondaryColor" weight={400} family="Nunito" lineheight={1.2} whitespace="pre-wrap" textalign="start">
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