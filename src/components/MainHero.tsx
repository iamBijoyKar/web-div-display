"use client";
import { useState, useEffect, useMemo } from "react";
import InputBox from "./Input/InputBox";
import type { Image as ImageJSType } from "image-js";

export default function MainHero() {
  const [file, setFile] = useState<ImageJSType>();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [reset, setReset] = useState(false);

  const resetHandle = () => {
    if (!isFileUploaded) return;
    setReset(true);
    setFile(undefined);
    setIsFileUploaded(false);
  };

  return (
    <div className="main-hero">
      <div className="">
        <h1 className="text-2xl font-bold text-center mb-4">
          <span className="font-extrabold text-[#003f5c]  ">Div</span>
          <span className="text-blue-500">Display</span>
        </h1>
      </div>
      <div className="">
        {isFileUploaded ? (
          <p className="">Uploaded</p>
        ) : (
          <InputBox
            setFile={setFile}
            setIsFileUploaded={setIsFileUploaded}
            reset={reset}
          />
        )}
      </div>
      <div className="">
        <button onClick={resetHandle} className="">
          Reset
        </button>
      </div>
    </div>
  );
}
