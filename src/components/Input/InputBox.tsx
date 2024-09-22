"use client";
import React, { useCallback, useState, useEffect, useRef, use } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Image as ImageJS } from "image-js";
import type { Image as ImageJSType } from "image-js";

import Progress from "../UtilComponents/Progress";

import uploadImg from "@/assets/div-display-upload.png";
import uploadingImg from "@/assets/div-display-uploading.gif";
import loaderSvg from "@/assets/loader.svg";

type InputBoxProps = {
  setFile: React.Dispatch<React.SetStateAction<ImageJSType | undefined>>;
  setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
};

export default function InputBox({
  setFile,
  setIsFileUploaded,
  reset,
}: InputBoxProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoaindg, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const onDragEnter = () => {
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsLoading(true);
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result;
      if (result === null) {
        setError(true);
        return;
      }
      ImageJS.load(result).then((image) => {
        setFile(image);
        console.log(image);
      });
    };
    reader.readAsArrayBuffer(file);

    setIsDragOver(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setTimeout(() => {
      setIsLoading(false);
      setIsFileUploaded(true);
      clearInterval(interval);
    }, 3000);
  }, []);

  useEffect(() => {
    if (reset) {
      setIsFileUploaded(false);
      setFile(undefined);
      setProgress(0);
      setError(false);
    }
  }, [reset]);

  const { getRootProps, getInputProps, rootRef, inputRef } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-[260px] aspect-video sm:w-[450px] md:w-[600px] border-2 border-dashed border-gray-300 rounded-lg p-4 mx-auto cursor-pointer relative bg-background transition-all duration-300 ease-in-out ${
        isDragOver ? "box border-animation" : ""
      }`}
    >
      <input {...getInputProps()} />
      <div className="w-full h-full flex flex-col justify-center items-center gap-3">
        {isDragOver ? (
          <Image
            src={uploadingImg}
            alt="Uploading Image"
            width={130}
            height={130}
            className="mx-auto"
          />
        ) : (
          <Image
            src={uploadImg}
            alt="Upload Image"
            width={130}
            height={130}
            className="mx-auto"
          />
        )}
        {isDragOver ? (
          <p className="text-center text-md text-gray-500">
            Drop the files here
          </p>
        ) : !isLoaindg ? (
          <p className="text-center text-md text-gray-500">
            Drag 'n' drop some files here, <br />
            or click to select files.
          </p>
        ) : (
          <div className="">
            <div className="h-10 flex flex-col gap-1 justify-center items-center">
              <Image src={loaderSvg} alt="Loader" width={50} height={50} />
              <Progress progress={progress} />
              <p className="text-sm">
                Processing <span className="text-blue-500">{progress}%</span>
              </p>
            </div>
          </div>
        )}
        {error ? (
          <p className="text-center text-md text-red-500">Error loading file</p>
        ) : null}
      </div>
    </div>
  );
}
