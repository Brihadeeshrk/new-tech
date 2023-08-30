import { client } from "@/app/lib/sanity";
import { Post } from "@/app/lib/types";
import React from "react";

type pageProps = {
  params: { slug: string };
};

async function getPageData(slug: string): Promise<Post> {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;

  const data = await client.fetch(query);

  return data;
}

const Page: React.FC<pageProps> = async ({ params }) => {
  const data = await getPageData(params.slug);
  return <div>{data.title}</div>;
};
export default Page;
