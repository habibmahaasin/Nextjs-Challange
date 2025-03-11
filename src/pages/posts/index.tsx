import MainLayout from "@/components/layouts/main-layout";
import PostsCard from "@/components/Modules/posts-card";
import PostsFormModal from "@/components/Modules/posts-form-modal";
import { usePosts } from "@/hooks/use-posts";
import { IPostsField } from "@/types/posts-type";
import {
  Col,
  Pagination,
  Row,
  Skeleton,
  Input,
  Select,
  Typography,
} from "antd";
import React from "react";

const { Search } = Input;

const PostsIndex = () => {
  const {
    posts,
    isLoading,
    updateQueryParams,
    page,
    limit,
    title,
    handleSearch,
    searchQuery,
    selectedFilter,
    setSearchQuery,
    setSelectedFilter,
  } = usePosts();

  const onChange = (value: string) => {
    setSelectedFilter(value);
  };
  return (
    <>
      <MainLayout>
        <div className="w-full flex flex-col gap-6 relative">
          <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-between sticky top-0 z-20 bg-white py-4">
            <div
              className="flex flex-col md:flex-row gap-2 items-center w-full md:max-w-md"
              id="search-wrapper"
            >
              <div className="w-full flex items-center gap-2">
                <span className="text-xs font-semibold text-nowrap">
                  Search By:
                </span>
                <Select
                  showSearch
                  placeholder="Search By"
                  optionFilterProp="label"
                  className="w-full"
                  onChange={onChange}
                  value={selectedFilter}
                  options={[
                    {
                      value: "title",
                      label: "Title",
                    },
                    {
                      value: "user_id",
                      label: "User ID",
                    },
                    {
                      value: "body",
                      label: "Body",
                    },
                  ]}
                />
              </div>
              <Search
                placeholder="Search Posts..."
                enterButton
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={() =>
                  handleSearch(searchQuery, selectedFilter, updateQueryParams)
                }
                allowClear
                onClear={() => {
                  setSearchQuery("");
                  updateQueryParams({ [selectedFilter]: null });
                }}
                className="w-full"
              />
            </div>
            <div className="w-full flex justify-end">
              <PostsFormModal type="create" />
            </div>
          </div>
          {title && (
            <div>
              <p>
                Search results for{" "}
                <span className="font-semibold text-lg text-blue-500 italic">
                  {title}
                </span>
              </p>
            </div>
          )}

          <Row gutter={[16, 16]} id="card-layout">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
                  <Skeleton active />
                </Col>
              ))
            ) : posts?.data?.length ? (
              posts.data.map((post: IPostsField) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={post.id}>
                  <PostsCard data={post} />
                </Col>
              ))
            ) : (
              <Col
                span={24}
                style={{ textAlign: "center", marginTop: "25svh" }}
              >
                <Typography.Text type="secondary" className="text-lg font-bold">
                  Not Found
                </Typography.Text>
              </Col>
            )}
          </Row>

          {posts?.data?.length == 0 || isLoading ? null : (
            <div className="w-full flex justify-center" id="pagination-wrapper">
              <Pagination
                current={page}
                total={Number(posts?.meta?.totalItems) || 0}
                pageSize={limit}
                showSizeChanger
                onChange={(page, pageSize) =>
                  updateQueryParams({ page, limit: pageSize })
                }
              />
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default PostsIndex;
