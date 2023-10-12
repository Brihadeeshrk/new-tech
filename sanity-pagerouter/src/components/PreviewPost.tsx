// ./nextjs-pages/src/components/PreviewPost.tsx

import { useRouter } from "next/router";
import type { SanityDocument } from "@sanity/client";
import { useLiveQuery } from "@sanity/preview-kit";
import { postQuery } from "@/pages/blog/[slug]";
import Post from "./Post";

export default function PreviewPost({ post }: { post: SanityDocument }) {
  const params = useRouter().query;
  const [data] = useLiveQuery(post, postQuery, params);

  return <Post post={data} />;
}
