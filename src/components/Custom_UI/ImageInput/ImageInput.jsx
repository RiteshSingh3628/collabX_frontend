"use client";

import { IcoBin, IcoCameraLine } from "@/assets";
import { InlineError } from "@/components/talent-ui";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { Controller } from "react-hook-form";

const ImageInput = ({
  className = "",
  control,
  label,
  name,
  size = "h-36 w-36",
  isRequired = false,
  ...props
}) => {
  const fileInputRef = useRef(null);
  const previewUrl = useCallback((file) => {
    if (!file) return null;
    if (typeof file === "string") return file;
    if (file instanceof File) return URL.createObjectURL(file);
    return null;
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState }) => {
        const hasError = !!fieldState.error;
        const imageUrl = value ? previewUrl(value) : null;

        const handleImageUpload = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          onChange(file);
        };

        const handleImageDelete = (e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        };

        const handleInputClick = () => {
          fileInputRef.current?.click();
        };

        return (
          <div className={cn("flex flex-col items-center", className)}>
            <div className="relative">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                onChange={handleImageUpload}
                ref={(e) => {
                  fileInputRef.current = e;
                  ref(e);
                }}
                required={isRequired}
                {...props}
              />

              <div
                className={cn(
                  "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-sky-100 shadow-sm",
                  size,
                  {
                    "border-red-500": hasError,
                  }
                )}
                onClick={handleInputClick}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={label || "Profile"}
                    className="h-full w-full object-cover"
                    fill
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <IcoCameraLine />
                  </div>
                )}
              </div>
              {value && (
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute top-0 right-0 cursor-pointer rounded-full bg-red-50 p-3 text-base text-red-500 shadow-sm hover:bg-red-100 focus:outline-none"
                >
                  <IcoBin className="text-red-700" />
                </button>
              )}
            </div>

            {label && (
              <p
                className="text-primary mt-2 cursor-pointer text-base font-medium"
                onClick={handleInputClick}
              >
                {label}
              </p>
            )}
            {hasError && <InlineError error={fieldState.error.message} />}
          </div>
        );
      }}
    />
  );
};

export default ImageInput;
