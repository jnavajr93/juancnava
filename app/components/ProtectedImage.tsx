"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ProtectedImageProps = Omit<ImageProps, "draggable" | "onContextMenu">;

export default function ProtectedImage({ style, ...props }: ProtectedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onLoad={() => setLoaded(true)}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}
