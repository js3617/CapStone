import React, { useState } from 'react';
import RichTextEditor from '../components/editor/RichTextEditor';
import CommentEditor from '../components/editor/CommentEditor';
import './Editor.css';

const Editor = () => {
  const [basicContent, setBasicContent] = useState('');
  const [blogContent, setBlogContent] = useState(`
    <h2>블로그 포스트 예시</h2>
    <p>이것은 <strong>React-Quill</strong>을 사용한 <em>리치 텍스트 에디터</em> 예시입니다.</p>
    <ul>
      <li>다양한 텍스트 포맷팅</li>
      <li>목록 만들기</li>
      <li>링크 삽입</li>
      <li>이미지 업로드</li>
    </ul>
    <p>더 많은 기능을 사용해보세요!</p>
  `);
  const [previewContent, setPreviewContent] = useState(`
    <h1>미리보기 모드</h1>
    <p>이 에디터는 <span style="color: rgb(230, 0, 0);">읽기 전용</span> 모드입니다.</p>
    <blockquote>
      편집할 수 없지만 내용을 확인할 수 있습니다.
    </blockquote>
  `);
  const [comments, setComments] = useState([]);

  const handleBasicChange = (content) => {
    setBasicContent(content);
  };

  const handleBlogChange = (content) => {
    setBlogContent(content);
  };

  const handleCommentSubmit = (content) => {
    const newComment = {
      id: Date.now(),
      content: content,
      timestamp: new Date().toLocaleString()
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className="editor-page">
      <div className="container">
        <header className="editor-header">
          <h1>React-Quill 리치 텍스트 에디터</h1>
          <p>다양한 형태의 리치 텍스트 에디터 예시를 확인해보세요.</p>
        </header>

        <section className="editor-section">
          <h2>기본 에디터</h2>
          <p>간단한 텍스트 입력을 위한 기본 에디터입니다.</p>
          <RichTextEditor
            value={basicContent}
            onChange={handleBasicChange}
            placeholder="여기에 내용을 입력하세요..."
            height="250px"
          />
          
          {basicContent && (
            <div className="content-preview">
              <h3>입력된 HTML 내용:</h3>
              <pre className="html-preview">{basicContent}</pre>
            </div>
          )}
        </section>

        <section className="editor-section">
          <h2>블로그 포스트 에디터</h2>
          <p>블로그나 게시글 작성을 위한 풀기능 에디터입니다.</p>
          <RichTextEditor
            value={blogContent}
            onChange={handleBlogChange}
            placeholder="블로그 포스트를 작성해보세요..."
            height="400px"
          />
        </section>

        <section className="editor-section">
          <h2>미리보기 모드 (읽기 전용)</h2>
          <p>작성된 내용을 미리보기 형태로 표시하는 읽기 전용 에디터입니다.</p>
          <RichTextEditor
            value={previewContent}
            onChange={() => {}} // 읽기 전용이므로 변경 불가
            readOnly={true}
            height="200px"
          />
        </section>

        <section className="editor-section">
          <h2>컴팩트 에디터</h2>
          <p>공간이 제한된 곳에서 사용할 수 있는 작은 크기의 에디터입니다.</p>
          <RichTextEditor
            value=""
            onChange={() => {}}
            placeholder="간단한 메모나 댓글을 작성하세요..."
            height="150px"
          />
        </section>

        <section className="editor-section">
          <h2>댓글 에디터</h2>
          <p>댓글 작성 기능이 포함된 에디터입니다. 글자수 카운트와 제출/취소 버튼이 포함되어 있습니다.</p>
          <CommentEditor 
            onSubmit={handleCommentSubmit}
            placeholder="댓글을 작성해보세요..."
          />
          
          {comments.length > 0 && (
            <div className="comments-list">
              <h3>작성된 댓글들:</h3>
              {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-timestamp">{comment.timestamp}</div>
                  <div 
                    className="comment-content" 
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="usage-guide">
          <h2>사용 방법</h2>
          <div className="code-example">
            <h3>기본 사용법:</h3>
            <pre>{`import RichTextEditor from './components/editor/RichTextEditor';

function MyComponent() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="내용을 입력하세요..."
      height="300px"
    />
  );
}`}</pre>
          </div>

          <div className="feature-list">
            <h3>주요 기능:</h3>
            <ul>
              <li><strong>텍스트 포맷팅:</strong> 굵게, 기울임, 밑줄, 취소선</li>
              <li><strong>헤더:</strong> H1부터 H6까지 다양한 크기의 제목</li>
              <li><strong>색상:</strong> 글자색과 배경색 변경</li>
              <li><strong>목록:</strong> 순서가 있는 목록과 순서가 없는 목록</li>
              <li><strong>정렬:</strong> 왼쪽, 가운데, 오른쪽 정렬</li>
              <li><strong>링크 및 미디어:</strong> 링크, 이미지, 비디오 삽입</li>
              <li><strong>인용:</strong> 인용구와 코드 블록</li>
              <li><strong>들여쓰기:</strong> 텍스트 들여쓰기 조절</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Editor;