import { React, useState, useEffect, useContext } from 'react';

import useApi from "../../hooks/useApi";

import * as Api from "../../apis/api";

const ReviewInputForm = (props) => {

  // API 요청에 사용되는 endpoint를 지정해줍니다.
  const endpoint = '/review';

  // 사용자가 선택한 행정구역 정보를 담고 있는 district 상태값을 라우팅 파라미터인 params로써 API 요청에 반영합니다.
  const params = `/${props.selectedPoiId}`;

  // 사용자가 작성한 리뷰 내용을 상태값으로 저장합니다.
  const [data, setData] = useState('');

  // 사용자가 작성한 리뷰 내용을 상태값으로 저장합니다.
  const [postTrigger, setPostTrigger] = useState(false);

  useEffect(() => {
    const addReviewData = async () => {
      try{
        const res = await Api.postData(data, endpoint, params);
        if(res.data.errorMessage){
          alert(`리뷰를 추가하는 도중 오류가 발생했습니다: ${res.data.errorMessage}`);
          return;
        }
      } catch (err) {
          alert(`리뷰를 추가하는 도중 오류가 발생했습니다: ${err}`);
        return;
      }
      finally {
        setPostTrigger(false);
      }
    }

    addReviewData();
  }, [postTrigger]);

  const HandleSubmit = (event) =>{
  
    // onSubmit과 함께 기본적으로 작동하는 브라우저 새로고침을 차단해줍니다.
    event.preventDefault();

    // 사용자가 입력한 리뷰값을 data 변수에 대입합니다.
    const data = {
      "user_id" : "23854283becad19dae464c77",
      "shelter_id" : props.selectedPoiId,
      "description" : event.target.input.value,
    }

    setData(data);
    setPostTrigger(true);
  };

  return(
    <div className="flex my-4">
      <form className="flex flex-row justify-between w-full" onSubmit={HandleSubmit} type="submit">
        <input className="flex-1 w-full bg-slate-100 rounded-lg p-3" type="text" name="input"></input>
        <button className="flex-none bg-green-400 rounded-lg ml-4 p-4">작성</button>
      </form>
    </div>
  )
}

export default ReviewInputForm;