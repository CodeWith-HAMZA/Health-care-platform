"use client";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { BUCKET_ID, storage } from "@/appwrite.config";
import { ID } from "node-appwrite";
import { FileIcon } from "lucide-react";

type FileUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

export default function FileInputUploader({
  files,
  onChange,
}: FileUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
      // Perform any additional actions with the files
      // Example:
      // storage.createFile(BUCKET_ID, ID.unique(), acceptedFiles[0])
      //   .then(response => console.log(response))
      //   .catch(error => console.log(error));
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const renderFilePreview = (file: File) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      );
    }

    if (fileType === "application/pdf") {
      return (
        <div className="flex items-center justify-center">
          <FileIcon width={100} height={100} />{" "}
          {/* Replace with actual PDF icon */}
          <p className="mt-2 text-muted-foreground">PDF Document</p>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <FileIcon width={100} height={100} />{" "}
        {/* Replace with a generic file icon */}
        <p className="mt-2 text-muted-foreground">Unsupported file</p>
      </div>
    );
  };

  return (
    <div className="pt-2">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {files && files.length > 0 ? (
          <div>
            {files.map((file) => (
              <div key={file.name} className="mb-4">
                {renderFilePreview(file)}
              </div>
            ))}
          </div>
        ) : null}

        {isDragActive ? (
          <div className="flex flex-col items-center justify-center bg-muted/40">
            <div className="w-full bg-background rounded-3xl shadow-lg">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary rounded-lg transition-colors duration-300 hover:border-white group">
                  <h2 className="text-2xl font-bold text-primary group-hover:text-white">
                    Now Drop Here
                  </h2>
                  <p className="mt-2 text-muted-foreground group-hover:text-foreground">
                    Now Release Kindly
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-muted/40">
            <div className="w-full bg-background rounded-3xl shadow-lg">
              <div className="flex flex-col items-center justify-center space-y-3">
                {!(files && files.length > 0) ? (
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary rounded-lg transition-colors duration-300 hover:border-white group">
                    <h2 className="text-2xl font-bold text-primary group-hover:text-white">
                      Drop Files here
                    </h2>
                    <p className="mt-2 text-muted-foreground group-hover:text-foreground">
                      or click to select files
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
