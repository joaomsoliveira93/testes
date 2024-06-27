"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Breadcrumb from "@/components/appLayout/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Project } from '@/types/project';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import Loader from '@/components/common/Loader';

type Request = {
    code: number,
    message: string,
    data: any
}


const Page = () => {
    const { proj } = useParams();
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    useEffect(() => {
        if (proj) { getProject() }
    }, [proj]);

    const getProject = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/project/getProject/${proj}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
        });
        const data: Request = await response.json();

        if (data.code === 200) {
            setProject(data.data);
            console.log(data.data);
        }
    };

    const handleNextImage = () => {
        if (project && project.imgs) {
            setCurrentImageIndex((currentImageIndex + 1) % project.imgs.length);
        }
    };

    const handlePreviousImage = () => {
        if (project && project.imgs) {
            setCurrentImageIndex((currentImageIndex - 1 + project.imgs.length) % project.imgs.length);
        }
    };

    const openModal = (img: string) => {
        setModalImage(img);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    return (
        <>
            {project ? (
                <>
                    <Breadcrumb pageName="Detalhes do Projecto" />
                    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="px-7 pb-6 lg:pb-8 xl:pb-11.5">
                            <div className="mt-4">
                                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                    {project?.titlePT}
                                </h3>
                                <div>
                                    <h4 className="font-semibold text-black dark:text-white">
                                        {project?.institution}
                                    </h4>
                                    <p className="mt-4.5">
                                        {project?.tecnologies}
                                    </p>
                                    <p className="mt-4.5">
                                        {project?.detailsPT}
                                    </p>
                                </div>
                                {project?.imgs && project?.imgs.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold text-black dark:text-white mb-4">
                                            Imagens
                                        </h4>
                                        <div className="flex justify-between items-center mb-4">
                                            <button
                                                onClick={handlePreviousImage}
                                                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-primary"
                                            >
                                                Anterior
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-primary"
                                            >
                                                Próxima
                                            </button>
                                        </div>
                                        <div className="relative w-full h-125 mb-4" onClick={() => openModal(project.imgs[currentImageIndex])}>
                                            <Image
                                                src={`data:image/jpeg;base64,${project.imgs[currentImageIndex]}`}
                                                alt={`Project image ${currentImageIndex + 1}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-sm"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-90">
                            <div className="relative w-3/4 h-3/4">
                                <Image
                                    src={`data:image/jpeg;base64,${modalImage}`}
                                    alt="Enlarged project image"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-sm"
                                />
                                <button
                                    onClick={closeModal}
                                    className="absolute bg-gray-300 dark:bg-gray-700 text-black dark:text-white "
                                >
                                    <CancelPresentationOutlinedIcon className='h-10 w-10 hover:bg-red-800 hover:rounded-md' />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Page;
