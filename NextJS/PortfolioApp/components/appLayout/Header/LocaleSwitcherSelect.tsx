
'use client';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { useTransition } from 'react';
import { Locale } from '@/i18n';
import { setUserLocale } from '@/services/locale';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative ">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            'hover:dark:bg-primary hover:bg-secondary relative flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray text-black dark:border-strokedark dark:bg-meta-4 dark:text-white',
            isPending && 'pointer-events-none opacity-60'
          )}
        >
          <Select.Icon>
            <p className="h-6 w-6 transition-colors group-hover:text-slate-900">
              {defaultValue === 'pt' ? 'PT' : defaultValue === 'es' ? 'ES' : defaultValue === 'fr' ? 'FR' : 'EN'}
            </p>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] border dark:border-strokedark border-secondary overflow-hidden rounded-sm bg-white dark:bg-boxdark py-1 shadow-md z-99999"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-pointer hover:dark:bg-primary hover:bg-secondary items-center px-3 py-2 text-base "
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === defaultValue && (
                      <CheckIcon className="h-5 w-5 text-black dark:text-white" />
                    )}
                  </div>
                  <span className="text-slate-900 dark:text-white">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
