"use client";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import useColorMode from "@/hooks/useColorMode";
import useSwal from "@/hooks/useSwal";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>
};

const SignIn = (props: Props) => {
  const [colorMode] = useColorMode();
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { showSwal } = useSwal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError) {
      showSwal('Login!', 'The email is no valid', 'error');
    } else {
      const res = await signIn("credentials", {
        email: email.current,
        password: pass.current,
        redirect: false,
      });

      if (!res?.error) {
        router.push(props.searchParams?.callbackUrl ?? "http://localhost:3000");
      } else {
        showSwal('Login!', 'Authentication Failed', 'error');
        setError(true);
      }
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
                <h1 className="text-2xl font-semibold text-white">Shakib Admin</h1>
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
              </p>
              <span className="mt-15 inline-block">
                {/* Imagem para colocar na lateral */}
              </span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to ShakibAdmin
              </h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => { email.current = e.target.value; validateEmail() }}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full rounded-lg border  bg-transparent py-4 pl-6 pr-10 outline-none focus-visible:shadow-none ${emailError ? 'border-red-800' : 'focus:border-primary border-stroke dark:focus:border-primary dark:border-form-strokedark'}  dark:bg-form-input `}
                    />
                    {emailError && (
                      <p className="mb-2.5 block font-medium text-red-800">
                        The email is invalid!
                      </p>
                    )}
                    <span className="absolute right-4 top-4">
                      <EmailOutlinedIcon />
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => (pass.current = e.target.value)}
                      name="password"
                      type="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-4">
                      <HttpsOutlinedIcon />
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                  {error && (
                    <p className="bg-red-100 text-red-600 text-center p-2">
                      Authentication Failed
                    </p>
                  )}
                </div>
              </form>
              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link href="/api/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
