"use client";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import uploadImg from "@/assets/div-display-upload.png";
import uploadingImg from "@/assets/div-display-uploading.gif";

export default function InputBox() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoaindg, setIsLoading] = useState(false);

  const onDragEnter = () => {
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        setIsDragOver(false);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

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
        ) : (
          <p className="text-center text-md text-gray-500">
            Drag 'n' drop some files here, <br />
            or click to select files
          </p>
        )}
      </div>
    </div>
  );
}
