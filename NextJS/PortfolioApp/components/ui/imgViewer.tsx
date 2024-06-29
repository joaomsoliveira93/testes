"use client";
import React, { useState } from "react";
import Image from "next/image";
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { useTranslations } from 'next-intl';

type Props = {
    imgs: string[]
}
const ImgViewer = (props: Props) => {
    const { imgs } = props
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const t = useTranslations('dtlProjScreen');

    const handleNextImage = () => {
        if (imgs) {
            setCurrentImageIndex((currentImageIndex + 1) % imgs.length);
        }
    };

    const handlePreviousImage = () => {
        if (imgs ) {
            setCurrentImageIndex((currentImageIndex - 1 + imgs.length) % imgs.length);
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
            {imgs && imgs.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-black dark:text-white mb-4">
                    {t('pictures')}
                    </h4>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handlePreviousImage}
                            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-primary"
                        >
                            {t('prev')}
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded hover:bg-primary"
                        >
                            {t('next')}
                        </button>
                    </div>
                    <div className="relative w-full h-125 mb-4" onClick={() => openModal(imgs[currentImageIndex])}>
                        <Image
                            src={imgs[currentImageIndex] ? `data:image/jpeg;base64,${imgs[currentImageIndex]}` : ''}
                            alt={`Project image ${currentImageIndex + 1}`}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="rounded-sm"
                        />
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-90">
                    <div className="relative w-3/4 h-3/4">
                        <Image
                            src={modalImage ? `data:image/jpeg;base64,${modalImage}` : ''}
                            alt="Enlarged project image"
                            layout="fill"
                            priority
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
    );
};

export default ImgViewer;
