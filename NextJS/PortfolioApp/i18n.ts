import {getRequestConfig} from 'next-intl/server';
import {getUserLocale} from './services/locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
 
  return {
    locale,
    messages: (await import(`/lang/${locale}.json`)).default
  };
});
export type Locale = (typeof locales)[number];

export const locales = ['en', 'pt'] as const;
export const defaultLocale: Locale = 'pt';