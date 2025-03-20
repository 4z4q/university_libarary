"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
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
  onFileChange}: Props) => {
  const ikUpload = useRef(null);

  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success(`${type} Uploaded Successfully`, {
      description: `Your ${type} has been uploaded successfully`,
    });
  };
  const onError = (error: { message: string }) => {
    console.log(error);
    toast.error(`${type} Upload Failed`, {
      description: `Your ${type} has not been uploaded successfully`,
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

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 2 * 1024 * 1024) {
        toast("File size too large", {
          description: "Please upload a file that is less than 20MB in size",
          // variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 5 * 1024 * 1024) {
        toast("File size too large", {
          description: "Please upload a file that is less than 50MB in size",
          // variant: "destructive",
        });
        return false;
      }
    }

    return true;
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
        useUniqueFileName={true}
        validateFile={onValidate}
        folder={folder}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          // loadded is the bytes of the file uploaded and total is the total bytes of the file
          setProgress((loaded / total) * 100);
        }}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
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
          className="object-cover"
        />
        <p className={cn("text-base text-light-100", styles.placeholder)}>
          {placeholder}
        </p>
        {file && <p className="upload-filename">{file?.filePath}</p>}
      </button>

      {progress > 0 && progress < 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress " style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
