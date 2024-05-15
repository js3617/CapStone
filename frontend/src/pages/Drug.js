import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import DrugList from '../components/drug/DrugList';

function Drug() {
  const [drugList, setDrugList] = useState([]);

  useEffect(() => {
    const fetchDrugList = async () => {
      try {
        const response = await fetch('/drug'); // API 엔드포인트에 따라 URL을 수정해야 합니다.
        if (!response.ok) {
          throw new Error('API 호출에 실패했습니다.');
        }
        const data = await response.json();
        setDrugList(data.drug);
      } catch (error) {
        console.error(error);
        // 에러 처리 로직 추가
      }
    };

    fetchDrugList();
  }, []);
  return (
    <div>
      {/* DrugList 컴포넌트에 약품 목록을 전달하여 렌더링 */}
      <DrugList drugList={drugList} />
    </div>
  );
}

export default Drug;
