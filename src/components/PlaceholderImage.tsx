import Image from "next/image";

interface PlaceholderImageProps {
  placeholder: string;
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Production stand-in for the design tool's <image-slot>: shows a captioned
 * placeholder until a real `src` is supplied, at which point it renders an
 * optimized next/image in the same box.
 */
export function PlaceholderImage({
  placeholder,
  src,
  alt,
  className,
  sizes,
  priority,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={className}
        style={{ objectFit: "cover" }}
      />
    );
  }
  return (
    <div className={`slot ${className ?? ""}`} role="img" aria-label={alt}>
      <p className="slot__caption">{placeholder}</p>
    </div>
  );
}
