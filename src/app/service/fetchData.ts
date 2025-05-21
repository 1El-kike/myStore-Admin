import axios from "axios";

export const fetchData = async ({
  pageParam = 1,
  url,
}: {
  pageParam?: number;
  url: string;
}) => {
  return axios.get(`${url}&page=${pageParam}`).then((res: any) => {
    const currentPage = Number(res.info.page);
    const nextCursor = currentPage > 3 ? undefined : currentPage + 1;
    return {
      datos: res.results,
      nextCursor,
    };
  });
};
