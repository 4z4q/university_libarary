"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUpload = useRef(null);

  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image Uploaded Successfully", {
      description: "Your image has been uploaded successfully",
    });
  };
  const onError = (error: any) => {
    console.log(error);
    toast.error("Image Upload Failed", {
      description: "Your image has not been uploaded successfully",
    });
  };

  const authentcation = async () => {
    try {
      const response = await fetch(
        `${config.env.apiEndpoint}/api/auth/ImageKit`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Requset Filde ${response.status}  ${errorText}`);
      }

      const data = await response.json();

      const { signature, token, expire } = data;

      return { signature, token, expire };
    } catch (error: Error | unknown) {
      throw new Error(
        `Requset Filde ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authentcation}
    >
      <IKUpload
        ref={ikUpload}
        className="hidden"
        onSuccess={onSuccess}
        onError={onError}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUpload.current) ikUpload.current?.click();
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-light-100 text-base">Upload a File</p>
        {file && <p className="upload-filename">{file?.filePath}</p>}
      </button>

      {file && (
        <IKImage
          path={file?.filePath}
          width={500}
          height={300}
          alt={`${file?.filePath}`}
        />
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;
