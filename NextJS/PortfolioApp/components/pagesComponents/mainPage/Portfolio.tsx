"use client";
import React, { Suspense, useEffect, useState } from "react";
import ExpandItem from "./ExpandItem";
import PersonalInfoItem from "./PersonalInfoItem";
import ExpEduItem from "./ExpEduItem";
import ExpProItem from "./ExpProItem";
import LangItem from "./LangItem";
import Other from "./Other";
import { Profile } from "@/types/profile";
import { ProExp } from "@/types/expPro";
import { EduExp } from "@/types/expEdu";
import { Lang } from "@/types/lang";
import { OtherInfo } from "@/types/other";

type request = {
  code: number,
  message: string,
  data: any
}

const Portfolio: React.FC = () => {
  const [Profiles, setProfiles] = useState<Profile[] | []>([]);
  const [selected, setSelected] = useState<string>("");
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [proExp, setProExp] = useState<ProExp[] | []>([]);
  const [eduExp, setEduExp] = useState<EduExp[] | []>([]);
  const [lang, setLang] = useState<Lang[] | []>([]);
  const [other, setOther] = useState<OtherInfo[] | []>([]);
  useEffect(() => {
    const getProfiles = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile/getProfiles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();

      if (data.code === 200) {
        setProfiles(data.data);
        console.log(data.data[0]._id)
        setSelected(data.data[0]._id)
      }
    }
    getProfiles();
  }, [])

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile/getProfile/${selected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();

      if (data.code === 200) {
        setProfile(data.data);
      }
    }

    const getEduExp = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/eduExp/getEduExpProfile/${selected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code === 200) {
        setEduExp(data.data);
      }
    }

    const getProExp = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/proExp/getProExpProfile/${selected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code === 200) {
        setProExp(data.data);
      }
    }

    const getLang = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/lang/getLangProfile/${selected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code === 200) {
        setLang(data.data);
      }
    }

    const getOther = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/otherInfo/getOtherProfile/${selected}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code === 200) {
        setOther(data.data);
      }
    }
    if (selected) {
      getLang();
      getProExp();
      getEduExp();
      getProfile();
      getOther();
    }

  }, [selected])
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
      <select className="p-3 rounded-md dark:text-white text-black dark:bg-primary hover:bg-secondary bg-secondary " value={selected}  name="profile" id="profile" onChange={(e) => setSelected(e.target.value)}>
        {Profiles ? (<>
          {Profiles?.map((row: Profile, index: number) => (
            <option className="mt-5 dark:bg-boxdark" value={row._id} selected={row._id === selected} key={index}>{row.name}</option>
          ))}
        </>) :
          (<option value="" selected key="0">Sem perfis</option>)}

      </select>
      <ExpandItem name="Dados Pessoais">
        <PersonalInfoItem profile={profile} />
      </ExpandItem>
      <ExpandItem name="Experiência Professional">
        <ExpProItem proExp={proExp} />
      </ExpandItem>
      <ExpandItem name="Educação e Formação">
        <ExpEduItem eduExp={eduExp} />
      </ExpandItem>
      <ExpandItem name="Competências Linguísticas">
        <LangItem lang={lang} />
      </ExpandItem>
      <ExpandItem name="Outras Informações">
        <Other other={other} />
      </ExpandItem>
    </div>
  );
};

export default Portfolio;
