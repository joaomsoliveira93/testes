"use client"
import React from 'react';
import Arrow from '@mui/icons-material/TrendingFlatOutlined';

type OpenPdfButtonProps = {
  base64Pdf: string;
}

const OpenPdfButton: React.FC<OpenPdfButtonProps> = ({ base64Pdf }) => {
  const handleClick = () => {

    const pdfBlob = base64ToBlob(base64Pdf, 'application/pdf');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  const base64ToBlob = (base64: string, mime: string): Blob => {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  };

  return (
    <button className='hover:underline text-black dark:text-white' onClick={handleClick}>
      Ver Documento <Arrow />
    </button>
  );
};

export default OpenPdfButton;
