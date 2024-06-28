"use client";
import React, { Suspense, useEffect, useState } from "react";
import ExpandItem from "./ExpandItem";
import PersonalInfoItem from "./PersonalInfoItem";
import ExpEduItem from "./ExpEduItem";
import ExpProItem from "./ExpProItem";
import LangItem from "./LangItem";
import OtherItem from "./OtherItem";
import ProjectItem from "./ProjectItem";
import { Profile } from "@/types/profile";

type request = {
  code: number,
  message: string,
  data: any
}

const Portfolio: React.FC = () => {
  const [Profiles, setProfiles] = useState<Profile[] | []>([]);
  const [selected, setSelected] = useState<string>("");
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [proExp, setProExp] = useState(undefined);
  const [eduExp, setEduExp] = useState(undefined);
  const [lang, setLang] = useState(undefined);
  const [other, setOther] = useState(undefined);
  const [project, setProject] = useState(undefined);

  useEffect(() => { getProfiles(); }, [])

  useEffect(() => {
    setProfile(undefined);
    setEduExp(undefined);
    setLang(undefined);
    setOther(undefined);
    setProject(undefined);
    setProExp(undefined);
    if (selected) getProfile();
  }, [selected]);

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
      setSelected(data.data[0]._id)
    }
  };

  const getProfile = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile/getProfileInfos/${selected}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    });
    const data: request = await response.json();

    if (data.code === 200) {
      setProfile(data.data.profile);
      setProExp(data.data.proExp);
      setEduExp(data.data.eduExp);
      setLang(data.data.lang);
      setOther(data.data.otherInfo);
      setProject(data.data.project);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">

        <select className="p-3 rounded-md dark:text-white text-black dark:bg-primary hover:bg-secondary bg-secondary " value={selected} name="profile" id="profile" onChange={(e) => setSelected(e.target.value)}>
          {Profiles ? (<>
            {Profiles?.map((row: Profile, index: number) => (
              <option className="mt-5 dark:bg-boxdark bg-primary text-white" value={row._id} key={index}>
                {row.name}
              </option>
            ))}
          </>) :
            (<option className="mt-5 dark:bg-boxdark bg-primary text-white" value="" selected key="0">Sem perfis</option>)}
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
          <OtherItem other={other} />
        </ExpandItem>
        <ExpandItem name="Projetos">
          <ProjectItem project={project} />
        </ExpandItem>
      </div>
    </>
  );
};

export default Portfolio;
