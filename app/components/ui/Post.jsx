import { Fragment } from "react";
import { Link } from "@remix-run/react";

import Anchor from "./Anchor";
import Button from "./Button";
import Chip from "./Chip";

import Cash from "../icons/Cash";
import Location from "../icons/Location";
import External from "../icons/External";
import Sparkles from "../icons/Sparkles";
import Like from "../icons/Like";
import Chat from "../icons/Chat";
import Mail from "../icons/Mail";
import Office from "../icons/Office";

export function Post({ post, expanded = false }) {
  return (
    <PostCard
      as={Anchor}
      styled={false}
      href={`/p/${post.slug}`}
      className={[
        "flex flex-col items-stretch justify-start rounded-xl gap-4 bg-white/5",
      ].join(" ")}
    >
      <div className="flex flex-row items-start justify-start gap-4">
        {post?.logoURL ? (
          <img
            src={post.logoURL}
            alt={`logo ${post.name}`}
            className="w-[32px] h-[32px] text-xs truncate rounded object-cover"
            loading="lazy"
            width={48}
            height={48}
          />
        ) : (
          <Office width={48} height={48} className="text-neutral-400" />
        )}

        <div className="flex-1 flex flex-col items-stretch justify-start gap-2">
          <div className="flex flex-col items-stretch justify-start">
            <p className="text-3xl font-bold">{post.title}</p>
          </div>
          {!expanded ? (
            <p className="text-neutral-400">{post.content.slice(0, 160)}...</p>
          ) : null}
          <div className="flex flex-row items-center justify-start gap-4">
            <div className="flex flex-row items-center justify-start gap-1">
              <Like className="text-pink-400" />
              <p className="text-sm font-medium text-indigo-200">
                {post._count.likes}
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-1">
              <Chat className="text-yellow-400" />
              <p className="text-sm font-medium text-yellow-200">
                {post._count.comments}
              </p>
            </div>
          </div>
          {post.tags?.length ? (
            <div className="mt-2 flex flex-row items-baseline justify-start flex-wrap gap-x-2 gap-y-1">
              {post.tags.map(function (tag) {
                return <Chip key={tag.id}>{tag.name}</Chip>;
              })}
            </div>
          ) : null}
        </div>
      </div>
      {expanded ? (
        <Fragment>
          {post?.description ? (
            <div className="flex flex-col items-stretch justify-start gap-2">
              <p className="font-medium text-lg text-neutral-400">
                About company
              </p>
              <p className="whitespace-pre text-sm">{post.batch.description}</p>
            </div>
          ) : null}
          {post?.description ? (
            <div className="flex flex-col items-stretch justify-start gap-2">
              <p className="font-medium text-lg text-neutral-400">
                Job description
              </p>
              <p className="whitespace-pre-wrap text-sm">{post.description}</p>
            </div>
          ) : null}
        </Fragment>
      ) : null}
    </PostCard>
  );
}

export function PostCardWrapper({ className = "", children, ...otherProps }) {
  return (
    <div
      className={[
        "flex flex-col items-stretch justify-start gap-2 divide-neutral-800",
        className,
      ].join(" ")}
      {...otherProps}
    >
      {children}
    </div>
  );
}

export function PostCard({
  as: As = "article",
  className = "",
  children,
  ...otherProps
}) {
  return (
    <As className={["p-4", className].join(" ")} {...otherProps}>
      {children}
    </As>
  );
}
