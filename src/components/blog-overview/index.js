"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
const initialBlogFormData = {
  title: "",
  description: "",
};

import AddNewBlog from "../add-new-blog";
import { useRouter } from "next/navigation";

export default function BlogOverview({ blogsList }) {
  const router = useRouter();
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);

  useEffect(() => {
    router.refresh();
  }, []);

  const handleAddNewBlog = async () => {
    try {
      setLoading(true);

      const response =
        currentEditedBlogId !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(blogFormData),
            });

      const result = await response.json();

      if (result?.success) {
        setLoading(false);
        setOpenBlogDialog(false);
        setBlogFormData(initialBlogFormData);
        router.refresh(); // <-- Refresh AFTER success
      } else {
        setLoading(false);
        console.log("Failed to add/update blog", result);
      }
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) router.refresh();
    } catch (error) {
      console.log("Error on handle delete", error);
    }
  };

  const handleEditBlog = async (getCurrentBlog) => {
    setCurrentEditedBlogId(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 pt-[20px] px-[20px]">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleAddNewBlog={handleAddNewBlog}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogsList && blogsList.length > 0 ? (
          blogsList.map((blogItem, index) => (
            <Card key={index} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>

                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center">
                  <Button onClick={() => handleEditBlog(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlog(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            No Blog found! Please add one
          </Label>
        )}
      </div>
    </div>
  );
}
