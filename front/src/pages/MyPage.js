import { React, useEffect, useState } from "react";
import LoginForm from "../components/MyPage/LoginForm";
import UserProfile from "../components/MyPage/UserProfile";
import * as Api from "../apis/api";

const MOCKUP_USER = {
  _id: 1,
  email: "elice@test.com",
  name: "홍길동",
  nickname: "엘리스",
  password: "1234",
  address: "서울 성수낙낙",
  count_visit: 0,
  description: "안녕하세요🥕",
  profileImage:
    "https://velog.velcdn.com/images/xiu_8/post/1fe5206b-f226-46b1-8f8a-6ed9d29a55bf/image.png",
}

const REVIEW_LEVEL = [
  { title: "새싹", icon: "🌱" },
  { title: "가지", icon: "🌿" },
  { title: "열매", icon: "🍒" },
  { title: "나무", icon: "🌲" },
  { title: "숲", icon: "🌳🌳🌳" },
  { title: "지구 지킴이", icon: "👑" },
];

function MyPage() {
  /** 유저를 저장하는 상태값입니다. 현재는 목업 데이터를 저장해두었습니다. 유저 로그인 기능 완성시 목업데이터 대신 null값을 넣어줍니다.*/
  const [user, setUser] = useState(null);

  /** 프로필을 수정중인지 검사하는 상태값입니다.*/
  const [isEdit, setIsEdit] = useState(false);

  /** 리뷰 개수별 레벨을 매기는 상태값입니다. */
  const [reviewLevel, setReviewLevel] = useState({
    title: "새싹",
    icon: "🌱",
  });

  /** 리뷰 list를 저장하는 상태값입니다. */
  const [reviews, setReviews] = useState([]);

  /** 북마크 list를 저장하는 상태값입니다. */
  const [bookmarkShleters, setBookmarkShelters] = useState([]);

  /** 유저가 작성한 리뷰 리스트를 가지고 오는 목업 API입니다.*/
  const fetchReviews = async () => {
    try {
      const endpoint = "/review";
      const res = await Api.getData(endpoint);
      // setReviews(res.data); // 유저 로그인 기능 완성시 주석해제하시면 됩니다.
    } catch (e) {
      console.log(e.response.message);
    }
  };

  /** 내가 찜한 쉼터 리스트를 가져오는 목업 API입니다. */
  const fetchBookmarkShelter = async () => {
    try {
      const endpoint = "/bookmark/user_id/:shelter_id";
      const res = await Api.getData(endpoint);
      // setBookmarkShelters(res.data); // 유저 로그인 기능 완성시 주석해제하시면 됩니다.
    } catch (e) {
      console.log(e.response.message);
    }
  };

  /** 유저 정보를 받아오는 목업 API입니다.*/
  const fetchUserInfo = async () => {
    try {
      const endpoint = "/user/mypage";
      const res = await Api.getData(endpoint);
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  /** 유저 정보를 업데이트 하는 목업 API입니다.*/
  const fetchUserUpdate = async ({
    nickname,
    description,
    address,
    profileImage,
  }) => {
    try {
      const endpoint = "/user/mypage";

      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("profileImage", profileImage);

      const res = await Api.putMulter(endpoint, formData);
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  /** 유저 프로필 수정 상태를 변경하는 함수입니다. */
  const handleChangeEdit = () => {
    setIsEdit((prev) => !prev);
  };

  /** 리뷰 레벨을 계산하는 함수입니다. */
  const handleChangeReviewLevel = () => {
    const levelIndex = reviews.length < 5 ? reviews.length : 5;
    setReviewLevel(REVIEW_LEVEL[levelIndex]);
  };

  /** MyPage가 마운트 될 때 호출되는 API입니다. */
  useEffect(() => {
    // fetchUserInfo(); // 유저 로그인 기능 완성시 주석 해제하시면 됩니다.
    // fetchReviews();
    // fetchBookmarkShelter();
  }, []);

  useEffect(() => {
    handleChangeReviewLevel();
  }, [reviews]);

  if (!user) return <LoginForm />;
  return (
    <div className="flex flex-row overflow-y-auto min-h-full p-8 justify-between ">
      <div className="flex flex-col bg-slate-100 w-5/12 p-8 items-center rounded-xl">
        <UserProfile
          user={user}
          isEdit={isEdit}
          fetchUserUpdate={fetchUserUpdate}
          handleChangeEdit={handleChangeEdit}
          setReviewLevel={setReviewLevel}
          reviewLevel={reviewLevel}
          reviewLength={reviews.length}
        />
      </div>
      <div className="flex flex-col w-6/12 rounded-xl">
        <div className="flex bg-slate-100 w-full h-48 p-8">
          <p className="text-xl font-bold">쉼터 즐겨찾기 목록</p>
        </div>
        {/* <BookmarkList list={bookmarkShlters} /> Bookmark리스트 컴포넌트 들어갈 자리입니다. 본인이 작업한 컴포넌트명과 props에 맞춰 수정해주세요. */}
        <div className="flex bg-slate-100 w-full h-full mt-10 p-8 rounded-xl">
          <p className="text-xl font-bold">내가 남긴 쉼터 후기</p>
        </div>
        {/* <ReviewList list={reviewList}  /> Review리스트 컴포넌트 들어갈 자리입니다. 본인이 작업한 컴포넌트명과 props에 맞춰 수정해주세요. */}
      </div>
    </div>
  );
}

export default MyPage;
