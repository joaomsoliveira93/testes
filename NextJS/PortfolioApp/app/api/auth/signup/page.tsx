"use client"
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useRouter } from "next/navigation";
import useSwal from "@/hooks/useSwal";
import {useTranslations} from 'next-intl';

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>
};

const SignUp = (props: Props) => {
  const router = useRouter();
  const name = useRef("");
  const email = useRef("");
  const pass = useRef("");
  const rpass = useRef("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { showSwal, showOKSwal } = useSwal();
  const t = useTranslations('SignupScreen');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (pass.current !== rpass.current) {
        setError(true);
        showSwal(t('register'), t('passwordError'), 'error');
      } else {
        if (emailError) {
          showSwal(t('register'), t('emailError'), 'error');
        } else {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            },
            body: JSON.stringify({
              email: email.current,
              name: name.current,
              password: pass.current,
            }),
          });
          if (response?.ok) {
            setError(false);
            showOKSwal(t('register'), 'Your user was created successfuly. Please check your email!', 'success');
            router.push(props.searchParams?.callbackUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}`);
          } else {
            showSwal(t('register'), t('accountSuccess'), 'error');
          }
        }
      }
    } catch (e) {
      showSwal(t('register'), t('accountError'), 'error');
      console.log(e)
    }

  };

  const validateEmail = () => {
    // Define invalid characters
    const invalidChars = /[^a-zA-Z0-9@._-]/;
    if (invalidChars.test(email.current) || !email.current.includes('@')) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <h1 className="text-3xl text-white">{t('sideTitle')}</h1>
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="2xl:px-20">
              {t('sideDesc')}
              </p>

              <span className="mt-15 inline-block">
                {/* Imagem para colocar na lateral */}
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              {t('title')}
              </h2>

              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                  {t('name')}
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => (name.current = e.target.value)}
                      name="name"
                      type="text"
                      placeholder={t('namePlaceholder')}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <PersonOutlineOutlinedIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                  {t('email')}
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => { email.current = e.target.value; validateEmail() }}
                      name="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className={`w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none ${emailError ? 'border-red-800' : 'focus:border-primary border-stroke dark:focus:border-primary dark:border-form-strokedark'}  dark:bg-form-input `}
                    />
                    {emailError && (
                      <p className="mb-2.5 block font-medium text-red-800">
                        {t('emailError')}
                      </p>
                    )}

                    <span className="absolute right-4 top-4">
                      <EmailOutlinedIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                  {t('password')}
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => { pass.current = e.target.value; setError(false) }}
                      name="password"
                      type="password"
                      placeholder={t('passwordPlaceholder')}
                      className={`w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none ${error ? 'border-red-800' : 'focus:border-primary border-stroke dark:focus:border-primary dark:border-form-strokedark'}  dark:bg-form-input `}
                    />
                    {error && (
                      <p className="mb-2.5 block font-medium text-red-800">
                        {t('passwordError')}
                      </p>
                    )}
                    <span className="absolute right-4 top-4">
                      <HttpsOutlinedIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                  {t('rpassword')}
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => { rpass.current = e.target.value; setError(false) }}
                      name="rpassword"
                      type="password"
                      placeholder={t('rpasswordPlaceholder')}
                      className={`w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none ${error ? 'border-red-800' : 'focus:border-primary border-stroke dark:focus:border-primary dark:border-form-strokedark'}  dark:bg-form-input `}
                    />
                    {error && (
                      <p className="mb-2.5 block font-medium text-red-800">
                        {t('passwordError')}
                      </p>
                    )}

                    <span className="absolute right-4 top-4">
                      <HttpsOutlinedIcon />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value={t('signUpBtn')}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                  {t('account')}{" "}
                    <Link href="/api/auth/signin" className="text-primary">
                    {t('signIn')}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
