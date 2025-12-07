"use client";

import React from "react";
import PostCard from "../../components/PostCard";
import { useQuery } from "@tanstack/react-query";
const PostsList = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.slice(0, 10).map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
