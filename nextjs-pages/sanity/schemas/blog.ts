import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "authorName",
      title: "Author's Name",
      type: "string",
    },
    {
      name: "authorImage",
      title: "Author Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [{ type: "text", name: "alt", title: "Alt Text" }],
        },
        // defineField({
        //   type: "code",
        //   name: "code",
        //   title: "Code",
        //   options: {
        //     language: "typescript",
        //     languageAlternatives: [
        //       { title: "Python", value: "python" },
        //       { title: "typescript", value: "typescript" },
        //       { title: "Javascript", value: "javascript" },
        //       { title: "HTML", value: "html" },
        //       { title: "CSS", value: "css" },
        //     ],
        //     withFilename: true,
        //   },
        // }),
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
