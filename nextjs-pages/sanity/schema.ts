import { type SchemaTypeDefinition } from "sanity";
import project from "./schemas/project";
import blog from "./schemas/blog";
import blockContent from "./schemas/blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, blog, blockContent],
};
