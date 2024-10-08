import { RichText } from "@/components/RichText";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import { PostGrid } from "./PostGrid";

/**
 * Props for `PostGallery`.
 */
export type PostGalleryProps = SliceComponentProps<Content.PostGallerySlice>;

/**
 * Component for "PostGallery" Slices.
 */
const PostGallery = async ({ slice }: PostGalleryProps): Promise<JSX.Element> => {
  const client = createClient();
  const posts = await client
    .getAllByType("post", {
      graphQuery: `{
        post {
          title
          thumbnail
        }
      }`
    })
    .catch(() => console.error("Error getting posts list"));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-8 lg:px-16"
    >
      <div className="text-center mb-6">
        {isFilled.richText(slice.primary.title) && <RichText field={slice.primary.title} />}
        {isFilled.richText(slice.primary.subtitle) && <RichText field={slice.primary.subtitle} />}
      </div>
      <PostGrid
        posts={posts!}
        showPostTitles={slice.primary.show_post_titles}
        cols={isFilled.number(slice.primary.cols) ? slice.primary.cols : undefined}
      />
    </section>
  );
};

export default PostGallery;
