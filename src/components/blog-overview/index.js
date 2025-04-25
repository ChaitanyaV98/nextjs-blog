"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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

  useEffect(() => {
    router.refresh();
  }, []);

  const handleAddNewBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      router.refresh();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogsList && blogsList.length > 0 ? (
          blogsList.map((blogItem, index) => (
            <Card key={index} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>

                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center">
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>
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
