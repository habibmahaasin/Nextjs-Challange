import MainLayout from "@/components/layouts/main-layout";
import { usePosts } from "@/hooks/use-posts";
import { Button, Card, Col, Row, Skeleton } from "antd";
import { Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "nextjs-toploader/app";
import { useUsers } from "@/hooks/use-users";

const { Title, Text } = Typography;

const PostsDetail = () => {
  const { postDetail, isPostDetailFetching } = usePosts();
  const { userDetail, isFetchingUserDetail } = useUsers({
    user_id: postDetail?.user_id ? String(postDetail?.user_id) : "",
  });
  const router = useRouter();

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => router.push("/posts")}
          variant="outlined"
          className="w-fit"
          icon={<LeftOutlined />}
        >
          Back
        </Button>
        <Row>
          <Col span={14} className="p-2">
            <div className="w-full flex flex-col gap-4">
              {isPostDetailFetching ? (
                <Skeleton active />
              ) : (
                <>
                  <Title level={2}>{postDetail?.title}</Title>
                  <Text>{postDetail?.body}</Text>
                </>
              )}
            </div>
          </Col>
          <Col span={10} className="p-2">
            <div className="w-full">
              <Card style={{ width: "100%" }}>
                <Title level={5} className="border-b pb-4">
                  Author Detail :{" "}
                </Title>
                <div className="w-full flex flex-col gap-2 mt-4">
                  {isPostDetailFetching || isFetchingUserDetail ? (
                    <Skeleton active paragraph={{ rows: 4 }} />
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">Name</p>
                        <p>{userDetail?.name || "Not Found"}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">Email</p>
                        <p className="line-clamp-1 text-ellipsis text-end">
                          {userDetail?.email || "Not Found"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">Gender</p>
                        <p>{userDetail?.gender || "Not Found"}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">Satatus</p>
                        <p>{userDetail?.status || "Not Found"}</p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default PostsDetail;
