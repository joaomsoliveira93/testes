import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LanguageSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en')
        },
        {
          value: 'pt',
          label: t('pt')
        },
        {
          value: 'fr',
          label: t('fr')
        },
        {
          value: 'es',
          label: t('es')
        }
      ]}
      label={t('label')}
    />
  );
}