import { useEffect, useState, type ImgHTMLAttributes } from "react";

export type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function SafeImage({
  src,
  fallbackSrc = "/placeholder.svg",
  alt = "",
  className,
  onError,
  loading,
  decoding,
  ...rest
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(
    typeof src === "string" && src.length > 0 ? src : fallbackSrc
  );

  useEffect(() => {
    setCurrentSrc(typeof src === "string" && src.length > 0 ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading ?? "lazy"}
      decoding={decoding ?? "async"}
      className={["bg-muted", className].filter(Boolean).join(" ")}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
