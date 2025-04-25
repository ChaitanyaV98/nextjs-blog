"use client";
import { useEffect, useState } from "react";
const initialBlogFormData = {
  title: "",
  description: "",
};

import AddNewBlog from "../add-new-blog";
export default function BlogOverview() {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const handleAddNewBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await response.json();

      if (result?.success) {
        setLoading(false);
        setOpenBlogDialog(false);
        setBlogFormData(initialBlogFormData);
      }
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleAddNewBlog={handleAddNewBlog}
      />
      <div>Blogs List</div>
    </div>
  );
}
