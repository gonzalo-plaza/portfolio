import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import styles from "@/styles/components/ui/organism/post-card.module.scss";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import type { BlogPostMeta } from "@/models/blogPost";
import type { Dictionary } from "@/i18n/types";
import { interpolate } from "@/i18n/interpolate";
import { blogPostPath } from "@/blog/blogPaths";
import { formatBlogDate } from "@/utils/dateUtils/dateUtils";

interface PostCardProps {
  post: BlogPostMeta;
  dict: Dictionary["blog"];
}

/**
 * Blog post card. Deliberately has a single action (the CTA button): the
 * title is plain text and the card itself is not clickable, so there is one
 * obvious way in and no competing affordances.
 */
const PostCard = ({ post, dict }: PostCardProps) => {
  const href = blogPostPath(post.locale, post.slug);

  return (
    <article className={styles.postCard}>
      <ul className={styles.postCard__tags} aria-label={dict.tagsLabel}>
        {post.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="secondary" className={styles.postCard__tag}>
              {tag}
            </Badge>
          </li>
        ))}
      </ul>

      <h2 className={styles.postCard__title}>{post.title}</h2>

      <p className={styles.postCard__description}>{post.description}</p>

      <dl className={styles.postCard__meta}>
        <div className={styles.postCard__metaItem}>
          <CalendarDays aria-hidden size={16} />
          <dt className="visibly-hidden">{dict.publishedOn}</dt>
          <dd>
            <time dateTime={post.date}>
              {formatBlogDate(post.date, post.locale)}
            </time>
          </dd>
        </div>
        <div className={styles.postCard__metaItem}>
          <Clock aria-hidden size={16} />
          <dt className="visibly-hidden">{dict.readingTimeLabel}</dt>
          <dd>
            {interpolate(dict.readingTime, {
              minutes: post.readingTimeMinutes,
            })}
          </dd>
        </div>
      </dl>

      <footer className={styles.postCard__footer}>
        <Button
          asChild
          className={styles.postCard__cta}
          aria-label={interpolate(dict.readMoreAria, { title: post.title })}
        >
          <Link href={href}>{dict.readMore}</Link>
        </Button>
      </footer>
    </article>
  );
};

PostCard.displayName = "PostCard";

export default PostCard;
