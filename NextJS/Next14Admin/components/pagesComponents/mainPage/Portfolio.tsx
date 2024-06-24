"use client";
import React, { useEffect, useState } from "react";
import ExpandItem from "./ExpandItem";
import PersonalInfoItem from "./PersonalInfoItem";
import ExpEduItem from "./ExpEduItem";
import ExpProItem from "./ExpProItem";
import { Profile } from "@/types/profile";
import { ProExp } from "@/types/expPro";
import { EduExp } from "@/types/expEdu";

type request = {
  code:string,
  message:string,
  data:any
} 

const Portfolio: React.FC = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [proExp, setProExp] = useState<ProExp[] | []>([]);
  const [eduExp, setEduExp] = useState<EduExp[] | []>([]);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile/getProfile/6679419b6b483572caedb415`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code==="200") {        
        setProfile(data.data);
      }
    }

    const getEduExp = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/eduExp/getEduExpProfile/6679419b6b483572caedb415`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code==="200") {        
        setEduExp(data.data);
      }
    }

    const getProExp = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/proExp/getProExpProfile/6679419b6b483572caedb415`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      const data: request = await response.json();
      if (data.code==="200") {        
        setProExp(data.data);
      }
    }

    getProExp();
    getEduExp();
    getProfile();
  },[])
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <ExpandItem name="Dados Pessoais">
          <PersonalInfoItem profile={profile} />
        </ExpandItem>
        <ExpandItem name="Experiência Professional">
          <ExpProItem proExp={proExp}/>
        </ExpandItem>
        <ExpandItem name="Educação e Formação">
          <ExpEduItem eduExp={eduExp} />
        </ExpandItem>
      </div>
      <div className="space-y-5 py-5">

      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">

        </div>

      </div>
    </>
  );
};

export default Portfolio;
