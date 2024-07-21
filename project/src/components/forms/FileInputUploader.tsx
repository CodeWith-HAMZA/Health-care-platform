"use client";
import { useDropzone } from "react-dropzone";

import React, { useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { storage } from "@/appwrite.config";
import { ID } from "node-appwrite";
type FileUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
};
export default function FileInputUploader({
  files,
  onChange,
}: FileUploaderProps) {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    // onChange(acceptedFiles);
    console.log("first", acceptedFiles[0]);
    // Do something with the files
    storage
      .createFile("668f463c0025777bc532", ID.unique(), acceptedFiles[0])
      .then((_) => console.log(_, "shaddu"))
      .catch((s) => console.log(s, " err"));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="pt-2">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {files && files?.length > 0 ? (
          <>
            <Image
              src={convertFileToUrl(files[0])}
              width={1000}
              height={1000}
              className="overflow-hidden max-h-[400px] object-cover"
              alt="Upload file"
            />
          </>
        ) : null}

        {isDragActive ? (
          <div className="flex flex-col items-center justify-center bg-muted/40">
            <div className="w-full  bg-background rounded-3xl shadow-lg">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="flex flex-col items-center justify-center w-full h-48  border-2 border-dashed border-primary rounded-lg transition-colors duration-300 hover:border-white group">
                  {files && files?.length > 0 ? (
                    <></>
                  ) : (
                    <Image
                      src={"/assets/icons/upload.svg"}
                      width={40}
                      height={40}
                      alt="Upload file"
                    />
                  )}
                  <h2 className=" text-2xl font-bold text-primary group-hover:text-white">
                    Now Drop Here
                  </h2>
                  <p className="mt-2 text-muted-foreground group-hover:text-foreground">
                    or click to select files
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-muted/40">
            <div className="w-full  bg-background rounded-3xl shadow-lg">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="flex flex-col items-center justify-center w-full h-48  border-2 border-dashed border-primary rounded-lg transition-colors duration-300 hover:border-white group">
                  {files && files?.length > 0 ? (
                    <></>
                  ) : (
                    <Image
                      src={"/assets/icons/upload.svg"}
                      width={40}
                      height={40}
                      alt="Upload file"
                    />
                  )}
                  <h2 className=" text-2xl font-bold text-primary group-hover:text-white">
                    Drop Files here
                  </h2>
                  <p className="mt-2 text-muted-foreground group-hover:text-foreground">
                    or click to select files
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
