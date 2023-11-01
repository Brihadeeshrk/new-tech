// ./nextjs-pages/src/pages/index.tsx

import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import Posts from "@/components/Posts";
import Projects from "@/components/Projects";
import { client } from "../../sanity/lib/client";

export const postsQuery = groq`*[_type == "blog" && defined(slug.current)]{
  _id, title, slug
}`;

export const projectQuery = groq`*[_type == "project" && defined(slug.current)]{
  _id, title, slug
}`;

export const getStaticProps = async () => {
  const blogData = await client.fetch(postsQuery);
  const projectData = await client.fetch(projectQuery);

  return { props: { blogData, projectData } };
};

export default function Home({
  blogData,
  projectData,
}: {
  blogData: SanityDocument[];
  projectData: SanityDocument[];
}) {
  return (
    <>
      <Posts posts={blogData} />;
      <Projects posts={projectData} />
    </>
  );
}
