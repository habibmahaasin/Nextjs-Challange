import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/posts",
      permanent: false,
    },
  };
};

// redirect karena ternyata tidak ada halaman home
export default function Home() {
  return null;
}
