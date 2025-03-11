import MainLayout from "@/components/layouts/main-layout";
import { usePosts } from "@/hooks/use-posts";
import { Button, Skeleton } from "antd";
import { Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "nextjs-toploader/app";
import { useUsers } from "@/hooks/use-users";
import AuthorCard from "@/components/Modules/author-card";
import { IUserFields } from "@/types/users-type";

const { Title, Text } = Typography;

const PostsDetail = () => {
  const { postDetail, isPostDetailFetching } = usePosts();
  const { userDetail, isFetchingUserDetail } = useUsers({
    user_id: postDetail?.user_id ? String(postDetail?.user_id) : "",
  });
  const router = useRouter();

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 p-0 md:p-6">
        <Button
          onClick={() => router.push("/posts")}
          variant="outlined"
          className="w-fit"
          icon={<LeftOutlined />}
        >
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 w-full">
            {isPostDetailFetching ? (
              <Skeleton active />
            ) : (
              <>
                <Title level={2} className="text-lg md:text-2xl">
                  {postDetail?.title}
                </Title>
                <Text className="text-base md:text-lg">{postDetail?.body}</Text>
              </>
            )}
          </div>

          <div className="w-full md:p-4">
            <AuthorCard
              userDetail={userDetail as IUserFields}
              isPostDetailFetching={isPostDetailFetching}
              isFetchingUserDetail={isFetchingUserDetail}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostsDetail;
