import i18n from 'i18next';
import { settingsSlice } from '../common/slices/settings';
import { initReactI18next } from 'react-i18next';

await i18n
.use(initReactI18next)
.init({
    resources: {
        en: {
            translation: (await import('./locales/en')).default,
            'app.goggletrans.common': (await import('./locales/en/common')).default
        }
    },
    lng: settingsSlice.getInitialState().language,
    fallbackLng: 'en'
});