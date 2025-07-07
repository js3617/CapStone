import React, { useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css';

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = '내용을 입력하세요...', 
  height = '300px',
  readOnly = false 
}) => {
  const [editorHtml, setEditorHtml] = useState(value);

  // 툴바 설정
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }), []);

  // 포맷 설정
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'blockquote', 'code-block',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'link', 'image', 'video'
  ];

  // 에디터 내용 변경 핸들러
  const handleChange = (html) => {
    setEditorHtml(html);
    if (onChange) {
      onChange(html);
    }
  };

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{ height: height }}
      />
    </div>
  );
};

export default RichTextEditor;