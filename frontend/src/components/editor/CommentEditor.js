import React from 'react';
import RichTextEditor from './RichTextEditor';
import { useRichTextEditor } from '../../hooks/useRichTextEditor';
import './CommentEditor.css';

const CommentEditor = ({ onSubmit, onCancel, placeholder = "댓글을 작성하세요..." }) => {
  const {
    content,
    wordCount,
    characterCount,
    handleChange,
    clearContent,
    isEmpty
  } = useRichTextEditor();

  const handleSubmit = () => {
    if (!isEmpty()) {
      onSubmit(content);
      clearContent();
    }
  };

  const handleCancel = () => {
    clearContent();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="comment-editor">
      <div className="editor-container">
        <RichTextEditor
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          height="200px"
        />
      </div>
      
      <div className="editor-footer">
        <div className="editor-stats">
          <span className="stat-item">글자수: {characterCount}</span>
          <span className="stat-item">단어수: {wordCount}</span>
        </div>
        
        <div className="editor-actions">
          <button 
            className="btn btn-cancel" 
            onClick={handleCancel}
            type="button"
          >
            취소
          </button>
          <button 
            className="btn btn-submit" 
            onClick={handleSubmit}
            disabled={isEmpty()}
            type="button"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;