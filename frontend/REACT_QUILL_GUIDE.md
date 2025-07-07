# React-Quill 리치 텍스트 에디터 가이드

이 프로젝트에서는 React-Quill 라이브러리를 사용하여 다양한 형태의 리치 텍스트 에디터를 구현했습니다.

## 📦 설치된 패키지

```bash
npm install react-quill quill
```

## 🏗️ 구현된 컴포넌트들

### 1. RichTextEditor (기본 에디터)
**위치**: `src/components/editor/RichTextEditor.js`

기본적인 리치 텍스트 에디터 컴포넌트입니다.

#### 사용법:
```jsx
import RichTextEditor from './components/editor/RichTextEditor';

function MyComponent() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="내용을 입력하세요..."
      height="300px"
      readOnly={false}
    />
  );
}
```

#### Props:
- `value` (string): 에디터의 현재 내용 (HTML)
- `onChange` (function): 내용 변경 시 호출되는 함수
- `placeholder` (string): 플레이스홀더 텍스트
- `height` (string): 에디터 높이 (기본값: '300px')
- `readOnly` (boolean): 읽기 전용 모드 여부

### 2. CommentEditor (댓글 에디터)
**위치**: `src/components/editor/CommentEditor.js`

댓글 작성용 에디터로, 글자수 카운트와 제출/취소 버튼이 포함되어 있습니다.

#### 사용법:
```jsx
import CommentEditor from './components/editor/CommentEditor';

function CommentSection() {
  const handleCommentSubmit = (content) => {
    console.log('새 댓글:', content);
    // 댓글 저장 로직
  };

  return (
    <CommentEditor 
      onSubmit={handleCommentSubmit}
      onCancel={() => console.log('취소됨')}
      placeholder="댓글을 작성하세요..."
    />
  );
}
```

#### Props:
- `onSubmit` (function): 댓글 제출 시 호출되는 함수
- `onCancel` (function): 취소 버튼 클릭 시 호출되는 함수
- `placeholder` (string): 플레이스홀더 텍스트

### 3. useRichTextEditor (커스텀 훅)
**위치**: `src/hooks/useRichTextEditor.js`

React-Quill을 더 쉽게 사용할 수 있도록 도와주는 커스텀 훅입니다.

#### 사용법:
```jsx
import { useRichTextEditor } from './hooks/useRichTextEditor';

function MyEditor() {
  const {
    content,
    wordCount,
    characterCount,
    handleChange,
    clearContent,
    getTextContent,
    isEmpty,
    setContentWithText
  } = useRichTextEditor('초기 내용');

  return (
    <div>
      <RichTextEditor
        value={content}
        onChange={handleChange}
      />
      <div>
        글자수: {characterCount} | 단어수: {wordCount}
        <button onClick={clearContent}>초기화</button>
      </div>
    </div>
  );
}
```

#### 반환값:
- `content`: 현재 에디터 내용 (HTML)
- `wordCount`: 단어 수
- `characterCount`: 글자 수 
- `handleChange`: 내용 변경 핸들러
- `clearContent`: 내용 초기화 함수
- `getTextContent`: HTML에서 텍스트만 추출하는 함수
- `isEmpty`: 내용이 비어있는지 확인하는 함수
- `setContentWithText`: 텍스트를 HTML로 변환하여 설정하는 함수

## 🎨 주요 기능

### 텍스트 포맷팅
- **굵게, 기울임, 밑줄, 취소선**
- **글자색과 배경색 변경**
- **다양한 폰트 크기**

### 구조화된 콘텐츠
- **헤더 (H1-H6)**
- **순서가 있는/없는 목록**
- **인용구**
- **코드 블록**

### 정렬 및 들여쓰기
- **왼쪽/가운데/오른쪽 정렬**
- **텍스트 들여쓰기**

### 미디어
- **링크 삽입**
- **이미지 업로드**
- **비디오 삽입**

## 🔧 커스터마이징

### 툴바 커스터마이징
`RichTextEditor.js`의 `modules` 객체를 수정하여 툴바를 커스터마이징할 수 있습니다:

```jsx
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};
```

### 스타일 커스터마이징
각 컴포넌트의 CSS 파일을 수정하여 디자인을 변경할 수 있습니다:
- `RichTextEditor.css`
- `CommentEditor.css`

## 📱 데모 페이지

실제 동작을 확인하려면 브라우저에서 `/editor` 경로로 접속하세요.

데모 페이지에서는 다음과 같은 예시를 확인할 수 있습니다:
- 기본 에디터
- 블로그 포스트 에디터
- 읽기 전용 모드
- 컴팩트 에디터  
- 댓글 에디터

## 🚀 실행 방법

1. 개발 서버 시작:
```bash
cd frontend
npm start
```

2. 브라우저에서 `http://localhost:3000/editor` 접속

## 📝 참고사항

- React-Quill은 Quill.js를 React용으로 래핑한 라이브러리입니다.
- 에디터 내용은 HTML 형태로 저장됩니다.
- 이미지 업로드 기능을 사용하려면 별도의 이미지 서버나 클라우드 스토리지 연동이 필요합니다.
- 프로덕션 환경에서는 XSS 공격을 방지하기 위해 HTML 내용을 검증하고 sanitize하는 것이 중요합니다.

## 🔗 참고 링크

- [React-Quill 공식 문서](https://github.com/zenoamaro/react-quill)
- [Quill.js 공식 문서](https://quilljs.com/)