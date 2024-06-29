"use server"

type request = {
    code: number,
    message: string,
    data: any
}

export async function getProject(proj:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/project/getProject/${proj}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
    });
    const data: request = await response.json();
    if (data.code===200){
        return data.data
    }else{
        return null
    }
}

export async function getProfiles() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile/getProfiles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
    });
    const data: request = await response.json();
    console.log(data)
    if (data.code===200){
        return data.data
    }else{
        return null
    }
}