import type { ImgHTMLAttributes } from "react";
import { getResponsiveImage } from "@/lib/responsive-images";

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  sizes?: string;
};

const ResponsiveImage = ({ src, sizes = "100vw", width, height, ...props }: ResponsiveImageProps) => {
  const responsive = getResponsiveImage(src);

  return (
    <img
      src={responsive?.src ?? src}
      srcSet={responsive?.srcSet}
      sizes={responsive ? sizes : undefined}
      width={width ?? responsive?.width}
      height={height ?? responsive?.height}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default ResponsiveImage;
