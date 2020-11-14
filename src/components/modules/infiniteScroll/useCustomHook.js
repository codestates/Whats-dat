import { useEffect, useState } from "react";

export default function useBookSearch(isMyRankClicked, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listData, setListData] = useState([]);
  // server에서 전달받은 data
  const [hasMore, setHasMore] = useState(false);
  // 더 로딩할 result가 없을 경우 사용

  useEffect(() => {
    setListData([]);
  }, [isMyRankClicked]);
  // myRank를 render시 list를 지우고 해당 rank 범위만 다시 render한다

  useEffect(() => {
    setLoading(true);
    setError(false);

    try {
      // fetchdata testcode
      const newListData = [];
      for (let i = 0; i < 10; i += 1) {
        newListData.push({
          isCurrentUser: false,
          avatarColor: "green",
          icon: "AVATAR_KIWI",
          score: 1000,
          nickname: `nickName ${i}`,
          ranking: i,
        });
      }
      // testcode end
      // then
      setLoading(true);
      // 서버로부터 page에 해당하는 data를 전달받아 ListData에 추가
      setListData([...listData, ...newListData]);
      // fetch시 마다 다음 list가 있는지의 여부를 hasMore에 set해야 함
      setHasMore(true);
    } catch (e) {
      setError(true);
    }
  }, [isMyRankClicked, pageNumber]);

  return { loading, error, listData, hasMore };
}
