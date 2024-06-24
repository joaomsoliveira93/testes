import React from "react";
import { Profile } from "@/types/profile";
import Image from "next/image";

type Props = {
  profile?: Profile
};

const DetailsItem = (props: Props) => {
  const { profile } = props;
  return (
    <div className="py-3">


      <div className="pt-5 grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <div className="flex">
          <Image
            className="rounded-lg"
            width={100}
            height={100}
            src={`data:image/png;base64,${profile?.img}`}
            alt="User"
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
      <div className="pt-5 grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <div className="flex">
              <p className="font-semibold pr-2">E-mail:</p>
              <p>{profile?.email_1}</p>
            </div>
          </div>

          {
            profile?.email_2 && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="flex">
                  <p className="pl-15">{profile?.email_2}</p>
                </div>
              </div>
            </>)
          }

          {
            profile?.email_3 && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="flex">
                  <p className="pl-15">{profile?.email_3}</p>
                </div>
              </div>
            </>)
          }
          {
            profile?.email_4 && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="flex">
                  <p className="pl-15">{profile?.email_4}</p>
                </div>
              </div>
            </>)
          }
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
            <div className="flex">
              <p className="font-semibold pr-2">Telefone:</p>
              <p>{profile?.phone_1}</p>
            </div>
          </div>

          {
            profile?.phone_2 && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="flex">
                  <p className="pl-19">{profile?.phone_2}</p>
                </div>
              </div>
            </>)
          }

          {
            profile?.phone_3 && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="flex">
                  <p className="pl-19">{profile?.phone_3}</p>
                </div>
              </div>
            </>)
          }
          {
            profile?.phone_4 && (<>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                <div className="flex">
                  <p className="pl-19">{profile?.phone_4}</p>
                </div>
              </div>
            </>)
          }
        </div>
      </div>
      <div className="pt-5 grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {
          profile?.linkedIn && (<>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
              <div className="flex">
                <p className="font-semibold pr-2">LinkedIn:</p>
                <a className="underline" target="_blank" href={profile?.linkedIn}>{profile?.linkedIn}</a>
              </div>
            </div>

          </>)
        }
        {
          (profile?.web_1 || profile?.web_2 || profile?.web_3 || profile?.web_4 || profile?.web_5 || profile?.web_6) && (
            <div className="flex">
              <p className="font-semibold pr-2">Páginas Web:</p>
              <div>
                <div>{profile?.web_1 && (<a target="_blank" className="underline" href={profile?.web_1}>{profile?.web_1}</a>)}</div>
                <div>{profile?.web_2 && (<a target="_blank" className="underline" href={profile?.web_2}>{profile?.web_2}</a>)}</div>
                <div>{profile?.web_3 && (<a target="_blank" className="underline" href={profile?.web_3}>{profile?.web_3}</a>)}</div>
                <div>{profile?.web_4 && (<a target="_blank" className="underline" href={profile?.web_4}>{profile?.web_4}</a>)}</div>
                <div>{profile?.web_5 && (<a target="_blank" className="underline" href={profile?.web_5}>{profile?.web_5}</a>)}</div>
                <div>{profile?.web_6 && (<a target="_blank" className="underline" href={profile?.web_6}>{profile?.web_6}</a>)}</div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default DetailsItem;
