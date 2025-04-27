import BlogsOverview from "@components/blog-overview";
import { BASE_URL } from "@/config/env";

async function fetchListOfBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/api/get-blogs`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Blogs() {
  const blogsList = await fetchListOfBlogs();

  return <BlogsOverview blogsList={blogsList} />;
}
