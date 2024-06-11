# CapStone

### ERD 
    <img width="989" alt="스크린샷 2024-04-04 오후 1 56 37" src="https://github.com/js3617/CapStone/assets/118441496/4c435fc7-037e-44f9-81c8-b30c588dd13d">

### Directory Structure

  Capstone / 메인 프로젝트 폴더
  ├── backend / 백엔드
  │   ├── src
  │   │   ├── models / DB 설계 폴더
  │   │   │   ├── drug.model.js / 약품에 관한 DB 설계
  │   │   │   ├── pharmacy.model.js / 약국에 관한 DB 설계
  │   │   │   └── store.model.js / 편의점에 관한 DB 설계
  │   │   ├── routers / 라우터 관련 폴더
  │   │   │   ├── main.router.js / 기본 페이지에 관한 라우터
  │   │   │   ├── drug.router.js / 약품에 관한 라우터
  │   │   │   ├── pharmacy.router.js / 약국에 관한 라우터
  │   │   │   └── store.router.js / 편의점에 관한 라우터
  │   │   └── server.js / DB 연결, app 기본 설계, 라우터 연결
  │   └── .env / 환경 변수 파일 (DB URI 존재)
  └── frontend / 프론트엔드
      └── src
          ├── components / 사용자가 볼 수 있게 꾸며주는 폴더
          │   ├── background
          │   │   ├── BackroundImage.js
          │   │   └── LongBackroungImage.js
          │   ├── drug
          │   │   ├── DrugDetail.js
          │   │   └── DrugList.js
          │   ├── main
          │   │   └── Posts.js
          │   ├── navbar
          │   │   └── Gnb.js
          │   ├── pharmacy
          │   │   └── PharmacyInformation.js
          │   ├── search
          │   │   ├── Search.js
          │   │   └── SearchResult.js
          │   ├── stock
          │   │   └── StockList.js
          │   └── store
          │       └── StoreInformation.js
          ├── hooks / 페이지의 기능에 대한 폴더
          │   ├── NaverAPI_pharmacy.js
          │   ├── NaverAPI_stock.js
          │   ├── NaverAPI_store.js
          │   ├── usePharmacies.js
          │   ├── useStock.js
          │   └── useStores.js
          ├── images
          │   └── (ex) 어디약.png
          ├── pages / 어떤 페이지가 나와야 하는가에 대한 폴더
          │   ├── Drug.js
          │   ├── Drugsearch.js
          │   ├── Home.js
          │   ├── index.js
          │   ├── Pharmacy.js
          │   ├── Stock.js
          │   └── Store.js
          ├── styles
          │   ├── Drugstyled.js
          │   ├── Globalstyle.js
          │   └── styled.js
          ├── App.js
          └── index.js
