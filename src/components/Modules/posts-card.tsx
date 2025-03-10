import React from "react";
import { Button, Card } from "antd";
import { IPostsField } from "@/types/posts-type";
import DropdownMenu from "../Elements/dropdown";
import { useRouter } from "nextjs-toploader/app";

const PostsCard = ({ data }: { data: IPostsField }) => {
  const router = useRouter();
  return (
    <Card
      title={data.title}
      className="w-full min-h-full"
      extra={<DropdownMenu data={data} />}
    >
      <div className="flex flex-col gap-6 w-full justify-between min-h-[150px]">
        <p className="line-clamp-3">{data.body}</p>
        <Button
          color="default"
          variant="outlined"
          className="w-fit items-end"
          onClick={() => {
            router.push(`/posts/${data.id}`);
          }}
        >
          Read More
        </Button>
      </div>
    </Card>
  );
};

export default PostsCard;
