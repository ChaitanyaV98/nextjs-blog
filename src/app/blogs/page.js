import BlogsOverview from "@components/blog-overview";

async function fetchListOfBlogs() {
  try {
    const res = await fetch("http://localhost:3000/api/get-blogs", {
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
