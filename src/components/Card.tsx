import Datetime from "./Datetime";
import type { Frontmatter } from "src/types";
import Tag from "@components/Tag.astro";
// import { Image, Picture } from '@astrojs/image/components';

export interface Props {
  href?: string;
  post: Frontmatter;
  secHeading?: boolean;
}

const styles = {
  cardContainer: "my-6",
  titleLink:
    "text-skin-accent font-medium text-lg underline-offset-4 decoration-dashed focus-visible:no-underline focus-visible:underline-offset-0 inline-block",
  titleHeading: "font-medium text-lg decoration-dashed hover:underline",
  tagContainer: "my-8;",
  link: "underline decoration-dashed hover:text-skin-accent relative hover:-top-0.5 focus-visible:p-1",
  linkIconsvg: "w-6 h-6 text-skin-base scale-95 opacity-80 -mr-5 group-hover:fill-skin-accent"

};

export default function Card({ href, post, secHeading = true }: Props) {
  return (
    <li className={styles.cardContainer}>
      <a href={href} className={styles.titleLink}>
        {secHeading ? (
          <h2 className={styles.titleHeading}>{post.title}</h2>
        ) : (
          <h3 className={styles.titleHeading}>{post.title}</h3>
        )}
      </a>
      <Datetime datetime={post.datetime} />
      <p>{post.description}</p>
      {/* 
      <ul className={styles.tagContainer}>
        {post.tags.map((name) => 
          <li
            className={"inline-block my-1 underline-offset-4"}
          >
            <a
              href={`/tags/${name}`}
              className={"pr-1 text-sm group"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={"scale-75"}
                ><path
                  d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z"
                ></path>
              </svg>
              &nbsp;<span>{name}</span>
            </a>
          </li>
        )}
      </ul>
      */}
    </li>
  );
}
