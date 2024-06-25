"use client";
import React from "react";
import Image from "next/image";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import useLocalStorage from "@/hooks/useLocalStorage";

const ImgUpdate = () => {
  const [img, setImg] = useLocalStorage("img", "");
  return (
    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
      <div className="relative drop-shadow-2">
        {img && (<Image
          className="rounded-full"
          alt="profile"
          width="0"
          height="0"
          priority
          style={{ width: '7.5rem', height: 'auto' }}
          src={img ? `data:image/png;base64,${img}` : '/images/placeholder.svg'}
        />)}

        <label
          htmlFor="profile"
          className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
        >
          <CameraAltOutlinedIcon />
          <input
            type="file"
            name="profile"
            id="profile"
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
};

export default ImgUpdate;
