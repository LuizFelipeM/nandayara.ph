import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { ImagesInColumns } from "./ImagesInColumns";
import { ImagesInMasonry } from "./ImagesInMasonry";
import { getValueOrDefault } from "@/utils/getValueOrDefault";
import { Default } from "./Default";

const VariationSelector: React.FC<{ slice: Content.ImageSlice }> = ({ slice }) => {
  switch (slice.variation) {
    case "imagesInColumns":
      return (
        <ImagesInColumns
          images={slice.primary.images}
          imagesHeight={getValueOrDefault(slice.primary.image_height)}
          cols={getValueOrDefault(slice.primary.col_quantity)}
        />
      )

    case "imagesInMasonry":
      return (
        <ImagesInMasonry
          images={slice.primary.images}
          colsWidth={getValueOrDefault(slice.primary.col_width)}
        />
      )

    default:
      return (
        <Default
          image={slice.primary.image}
          changeImageSize={slice.primary.change_image_size}
          keepAspectRatio={slice.primary.keep_aspect_ratio}
          height={getValueOrDefault(slice.primary.image_height)}
          width={getValueOrDefault(slice.primary.image_width)}
        />
      )
  }
}

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice>;

/**
 * Component for "Image" Slices.
 */
const Image = ({ slice }: ImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <VariationSelector slice={slice} />
    </section>
  );
};

export default Image;
