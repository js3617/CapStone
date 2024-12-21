# CapStone

### ERD 
<div>
    <img width="989" alt="스크린샷 2024-06-11 오후 8 46 57" src="https://github.com/js3617/CapStone/assets/118441496/8a21df51-6b0b-4624-afc9-555eadc1b1d8">
</div>


### Directory Structure

      Capstone / 메인 프로젝트 폴더
      ├── backend / 백엔드
      │   ├── src
      │   │   ├── models / DB 설계 폴더
      │   │   │   ├── drug.model.js / 약품에 관한 DB 설계
      │   │   │   ├── hospital.model.js / 병원에 관한 DB 설계
      │   │   │   ├── pharmacy.model.js / 약국에 관한 DB 설계
      │   │   │   └── store.model.js / 편의점에 관한 DB 설계
      │   │   │
      │   │   ├── routers / 라우터 관련 폴더
      │   │   │   ├── main.router.js / 기본 페이지에 관한 라우터 => 프론트엔드와 연결점
      │   │   │   ├── drug.router.js / 약품 CRUD에 관한 라우터
      │   │   │   ├── hospital.router.js / 병원 CRUD에 관한 라우터
      │   │   │   ├── pharmacy.router.js / 약국 CRUD에 관한 라우터
      │   │   │   └── store.router.js / 편의점 CRUD에 관한 라우터
      │   │   │
      │   │   └── server.js / DB 연결, app 기본 설계, 라우터 연결, 프론트엔드와 연결점
      │   │
      │   └── .env / 환경 변수 파일 (DB URI 존재)
      │
      └── frontend / 프론트엔드
          └── src
              ├── components / 사용자가 볼 수 있게 꾸며주는 폴더
              │   ├── background
              │   │   ├── BackroundImage.js / 2차 구현 삭제
              │   │   └── LongBackroungImage.js / 2차 구현 삭제
              │   │
              │   ├── drug
              │   │   ├── DrugDetail.js / 선택 약 정보 표시
              │   │   └── DrugList.js / 약 List
              │   │
              │   ├── chatbot
              │   │   ├── ChatbotIcon.js / Conversation을 열기 위한 아이콘
              │   │   └── conversation.js / Conversation 수행
              │   │
              │   ├── main
              │   │   └── Posts.js / Main 페이지
              │   │
              │   ├── navbar
              │   │   └── Gnb.js / 상단 Gnb 설정
              │   │
              │   ├── hospital
              │   │   ├── HospitalCategory.js / 병원 Catgory 설정
              │   │   └── HospitalInformation.js / 병원 List
              │   │
              │   ├── loading
              │   │   └── Spinner.js / 페이지 로딩 구현
              │   │
              │   ├── pharmacy
              │   │   └── PharmacyInformation.js / 약국 List
              │   │
              │   ├── search
              │   │   ├── Search.js
              │   │   └── SearchResult.js / 
              │   │
              │   ├── stock_stores
              │   │   └── Stock_StoreList.js / 약, 편의점 List
              │   │
              │   ├── stock
              │   │   └── StockList.js / 약 재고 List
              │   │
              │   └── store
              │       └── StoreInformation.js / 편의점 List
              │ 
              ├── hooks / 페이지의 기능에 대한 폴더
              │   ├── NaverAPI_hospital.js / 병원 NaverMap
              │   ├── NaverAPI_pharmacy.js / 약국 NaverMap
              │   ├── NaverAPI_Stock_Stores.js / 약, 편의점 통합 NaverMap
              │   ├── NaverAPI_stock.js / 약 재고 NaverMap
              │   ├── NaverAPI_store.js / 편의점 NaverMap
              │   ├── NaverAPI.js / 기본 NaverMap 위치 찾기
              │   ├── useChat.js / ChatBot 관련 API 설정
              │   ├── useHospitals.js / 병원 위치 불러오기
              │   ├── usePharmacies.js / 약국 위치 불러오기
              │   ├── useStock_Stores.js / 약국, 편의점 위치 불러오기
              │   ├── useStock.js / 약 재고 및 재고 위치 불러오기
              │   └── useStores.js / 편의점 위치 불러오기
              │
              ├── images / 페이지에 사용되는 이미지들에 대한 폴더
              │   └── (ex) 어디약.png
              │
              ├── pages / 어떤 페이지가 나와야 하는가에 대한 폴더
              │   ├── Drug.js / 약 정보
              │   ├── Drugsearch.js / 약 정보 찾기
              │   ├── Home.js / 메인 정보
              │   ├── index.js / 페이지 매핑
              │   ├── Pharmacy.js / 약국 정보
              │   ├── Store_Stock.js / 약국, 편의점 Category 선택
              │   ├── Store_Stock_All.js / 약국, 편의점 통합 정보
              │   ├── Stock.js / 약 재고 정보
              │   └── Store.js / 편의점 정보
              │
              ├── styles / 각 요소들의 스타일들에 대한 폴더
              │   ├── Drugstyled.js / 약 관련 공통 style
              │   ├── Globalstyle.js / 페이지 전체에 관련된 기초 style
              │   └── styled.js / layout 설정
              │
              ├── apiClient.js / axios 관련 apiClient로 변경
              │
              ├── App.js
              │
              └── index.js / 주소연결에 관한 파일
