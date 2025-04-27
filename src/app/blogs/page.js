import BlogsOverview from "@components/blog-overview";
import { BASE_URL } from "@/config/env";

export default async function Blogs() {
  const data = await fetch(`${BASE_URL}/api/get-blogs`, {
    method: "GET",
    cache: "no-store",
  });
  const jsonData = await data.json();
  const blogsList = jsonData.data;

  return <BlogsOverview blogsList={blogsList} />;
}
