import { IUserFields } from "@/types/users-type";
import { Card, Skeleton, Typography } from "antd";

const { Title, Text } = Typography;

const AuthorCard = ({
  userDetail,
  isPostDetailFetching,
  isFetchingUserDetail,
}: {
  userDetail: IUserFields;
  isPostDetailFetching: boolean;
  isFetchingUserDetail: boolean;
}) => {
  return (
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
  );
};

export default AuthorCard;
