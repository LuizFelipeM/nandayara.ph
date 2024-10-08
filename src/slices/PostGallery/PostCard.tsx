import { LinkButton } from "@/components/LinkButton";
import { Heading } from "@/components/Heading";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Content, asLinkAttrs, isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";

/**
 * Components map for `PrismicRichText`.
 */
const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h3" size="sm">
      {children}
    </Heading>
  ),
};

/**
 * Props for `PostCard`.
 */
type PostCardProps = {
  post: Content.PostDocument<string>
  showTitle: boolean
}

/**
 * Component "PostCard".
 */
export const PostCard: React.FC<PostCardProps> = ({ post, showTitle }): JSX.Element => {
  const { href, ...attributes } = asLinkAttrs(post)

  return (
    <div className="img-group text-center">
      <PrismicNextLink {...attributes} href={href!} className="text-center">
        {isFilled.image(post.data.thumbnail) &&
          <PrismicNextImage
            field={post.data.thumbnail}
            className="mb-4 rounded-lg object-cover min-w-[180px]"
          />}
        {showTitle &&
          <PrismicRichText
            field={post.data.title}
            components={components}
          />}
      </PrismicNextLink>
      <LinkButton href={href!} className="mt-3">
        Confira
        <FontAwesomeIcon icon={faArrowRight} className="ml-1.5" />
      </LinkButton>
    </div>
  )
}