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
import React, { useState, useEffect } from "react";

const { Search } = Input;

const Home = () => {
  const { posts, isLoading, updateQueryParams, page, limit, title, onSearch } =
    usePosts();
  const [searchQuery, setSearchQuery] = useState(title);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setSearchQuery(title);
  }, [title]);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <MainLayout>
      <PostsFormModal open={open} setOpen={setOpen} />
      <div className="w-full flex flex-col gap-6 relative">
        <div className="flex gap-4 items-center justify-between sticky top-0 z-20 bg-white py-4">
          <div className="flex gap-4 items-center w-full max-w-xs">
            <p className="text-xs text-nowrap">Filter by Author :</p>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              className="w-full"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </div>
          <div className="w-full max-w-xs flex items-center gap-2">
            <Search
              placeholder="Search Posts Title..."
              enterButton
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={onSearch}
              allowClear
              onClear={() => {
                setSearchQuery("");
                updateQueryParams({ title: null });
              }}
              className="w-full"
            />
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

        <Row gutter={[16, 16]}>
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <Col span={8} key={index}>
                <Skeleton active />
              </Col>
            ))
          ) : posts?.data?.length ? (
            posts.data.map((post: IPostsField) => (
              <Col span={8} key={post.id}>
                <PostsCard data={post} />
              </Col>
            ))
          ) : (
            <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
              <Typography.Text type="secondary" className="text-lg font-bold">
                Not Found
              </Typography.Text>
            </Col>
          )}
        </Row>

        {posts?.data?.length == 0 || isLoading ? null : (
          <div className="w-full flex justify-center">
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
  );
};

export default Home;
