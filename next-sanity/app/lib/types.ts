export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  overview: string;
  content: any;
  _createdAt: string;
}
