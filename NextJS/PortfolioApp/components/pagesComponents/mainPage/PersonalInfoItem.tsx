import React from "react";
import { Profile } from "@/types/profile";
import Image from "next/image";

type Props = {
  profile?: Profile
};

const DetailsItem = (props: Props) => {
  const { profile } = props;
  return (
    <div className="duration-300 ease-in-out p-2py-3">
      {profile ? (<>
        <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
          <div className="flex">
            <Image
              className="rounded-lg"
              width="0"
              height="0"
              priority
              style={{ width: '100px', height: 'auto' }}
              src={profile?.img ? `data:image/png;base64,${profile?.img}` : '/images/placeholder.svg'}
              alt="logo"
            />
            <div className="ml-5">
              <div className="flex mt-2">
                <p className="font-semibold pr-2">Nome:</p>
                <p>{profile?.name}</p>
              </div>
              <div className="flex mt-3">
                <p className="font-semibold pr-2">Nacionalidade:</p>
                <p>{profile?.nationalityPT}</p>
              </div>
              <div className="flex mt-3">
                <p className="font-semibold pr-2">Morada:</p>
                <p>{profile?.address}</p>
              </div>
            </div>
          </div>

        </div>
        <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
              <div className="flex">
                <p className="font-semibold pr-2">E-mail:</p>
                <a className="underline" href={`mailto:${profile?.email_1}`}>{profile?.email_1}</a>
              </div>
            </div>

            {
              profile?.email_2 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                  <div className="flex">
                    <p className="pl-15 underline"><a href={`mailto:${profile?.email_2}`}>{profile?.email_2}</a></p>
                  </div>
                </div>
              )
            }

            {
              profile?.email_3 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                  <div className="flex">
                    <p className="pl-15 underline"><a href={`mailto:${profile?.email_3}`}>{profile?.email_3}</a></p>
                  </div>
                </div>
              )
            }

            {
              profile?.email_4 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                  <div className="flex">
                    <p className="pl-15 underline"><a href={`mailto:${profile?.email_4}`}>{profile?.email_4}</a></p>
                  </div>
                </div>
              )
            }

          </div>
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
              <div className="flex">
                <p className="font-semibold pr-2">Telefone:</p>
                <p>{profile?.phone_1}</p>
              </div>
            </div>

            {
              profile?.phone_2 && (<>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                  <div className="flex">
                    <p className="pl-19">{profile?.phone_2}</p>
                  </div>
                </div>
              </>)
            }

            {
              profile?.phone_3 && (<>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                  <div className="flex">
                    <p className="pl-19">{profile?.phone_3}</p>
                  </div>
                </div>
              </>)
            }
            {
              profile?.phone_4 && (<>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                  <div className="flex">
                    <p className="pl-19">{profile?.phone_4}</p>
                  </div>
                </div>
              </>)
            }
          </div>
        </div>
        <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
          {
            profile?.linkedIn && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="flex">
                  <p className="font-semibold pr-2">LinkedIn:</p>
                  <a className="underline" target="_blank" href={profile?.linkedIn.toLowerCase().includes("http") ? profile?.linkedIn : `https://${profile?.linkedIn}`}>{profile?.linkedIn}</a>
                </div>
              </div>

            </>)
          }
          {
            (profile?.web_1 || profile?.web_2 || profile?.web_3 || profile?.web_4 || profile?.web_5 || profile?.web_6) && (
              <div className="flex">
                <p className="font-semibold pr-2">Páginas Web:</p>
                <div>
                  <div>{profile?.web_1 && (<a target="_blank" className="underline" href={profile?.web_1.toLowerCase().includes("http") ? profile?.web_1 : `https://${profile?.web_1}`}>{profile?.web_1}</a>)}</div>
                  <div>{profile?.web_2 && (<a target="_blank" className="underline" href={profile?.web_2.toLowerCase().includes("http") ? profile?.web_2 : `https://${profile?.web_2}`}>{profile?.web_2}</a>)}</div>
                  <div>{profile?.web_3 && (<a target="_blank" className="underline" href={profile?.web_3.toLowerCase().includes("http") ? profile?.web_3 : `https://${profile?.web_3}`}>{profile?.web_3}</a>)}</div>
                  <div>{profile?.web_4 && (<a target="_blank" className="underline" href={profile?.web_4.toLowerCase().includes("http") ? profile?.web_4 : `https://${profile?.web_4}`}>{profile?.web_4}</a>)}</div>
                  <div>{profile?.web_5 && (<a target="_blank" className="underline" href={profile?.web_5.toLowerCase().includes("http") ? profile?.web_5 : `https://${profile?.web_5}`}>{profile?.web_5}</a>)}</div>
                  <div>{profile?.web_6 && (<a target="_blank" className="underline" href={profile?.web_6.toLowerCase().includes("http") ? profile?.web_6 : `https://${profile?.web_6}`}>{profile?.web_6}</a>)}</div>
                </div>
              </div>
            )
          }
        </div>
      </>) : (
        <div role="status" className=" animate-pulse overflow-hidden shadow-default">

          <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="grid grid-cols-2">
              <svg className="w-15 h-15 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <div className="ml-0">
                <div className="h-4 mt-3 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-3 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-3 dark:bg-white rounded-full bg-black "></div>
              </div>
            </div>
          </div>

          <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
            </div>
      
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
                <div className="h-4 mt-2   dark:bg-white rounded-full bg-black "></div>
              </div>
            </div>
          </div>
          
          <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
              <div className="h-4 dark:bg-white rounded-full bg-black "></div>
            </div>
            <div className="flex">
              <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              <div>
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
                <div className="h-4 mt-2 dark:bg-white rounded-full bg-black "></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DetailsItem;
