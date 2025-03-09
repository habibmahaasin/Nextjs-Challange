import React from "react";
import { Card } from "antd";
import { IPostsField } from "@/types/posts-type";

const PostsCard = ({ data }: { data: IPostsField }) => {
  return (
    <Card title={data.title} className="w-full">
      <p className="line-clamp-3">{data.body}</p>
    </Card>
  );
};

export default PostsCard;
