"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  index: number;
  label?: string;
}

export function MultiImageUpload({ images, onChange, index, label }: MultiImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  // Convert file to base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setError(null);
    
    if (file) {
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        setError("Image size must be less than 1MB");
        return;
      }
      
      try {
        const base64String = await fileToBase64(file);
        const newImages = [...images];
        newImages[index] = base64String;
        onChange(newImages);
      } catch (error) {
        console.error("Error converting file to base64:", error);
        setError("Error uploading image");
      }
    }
  };

  const handleRemove = () => {
    setError(null);
    const newImages = [...images];
    newImages[index] = "";
    onChange(newImages);
  };

  // Clean up any object URLs when component unmounts
  useEffect(() => {
    return () => {
      // If any images are object URLs, revoke them to prevent memory leaks
      images.forEach(img => {
        if (img.startsWith('blob:')) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [images]);

  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      <div className="mt-1 w-full flex flex-col items-center">
        {images[index] ? (
          <div className="relative w-[168.61px] h-[130.53px]">
            <button
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
              onClick={handleRemove}
              type="button"
            >
              <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
            </button>
            <Image
              src={images[index]}
              height={130.53}
              width={168.61}
              alt=""
              className="border border-border h-full w-full mx-auto rounded-md object-cover"
            />
          </div>
        ) : (
          <>
            <Dropzone
              onDrop={handleImageUpload}
              accept={{
                "image/*": [".png", ".jpg", ".jpeg", ".webp"],
              }}
              maxFiles={1}
              maxSize={1048576} // 1MB in bytes
            >
              {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed border-[#DBA806] w-[168.61px] h-[130.53px] flex flex-col items-center justify-center rounded-md focus:outline-none hover:border-[#c99905] cursor-pointer",
                    {
                      "border-primary bg-secondary": isDragActive && isDragAccept,
                      "border-destructive bg-destructive/20": isDragActive && isDragReject || error,
                    }
                  )}
                >
                  <input {...getInputProps()} />
                  <ImageIcon className="h-10 w-10 text-[#DBA806] mb-2" strokeWidth={1.25} />
                  <span className="text-xs text-muted-foreground text-center px-2">
                    Click to add image
                    <br />
                    (Max: 1MB)
                  </span>
                </div>
              )}
            </Dropzone>
            {error && (
              <p className="text-destructive text-xs mt-1 text-center">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
} 
