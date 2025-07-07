import { useState, useCallback } from 'react';

/**
 * React-Quill 에디터를 위한 커스텀 훅
 * @param {string} initialValue - 초기값
 * @returns {object} 에디터 상태와 메서드들
 */
export const useRichTextEditor = (initialValue = '') => {
  const [content, setContent] = useState(initialValue);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  // 내용 변경 핸들러
  const handleChange = useCallback((value) => {
    setContent(value);
    
    // HTML 태그를 제거하고 텍스트만 추출
    const textContent = value.replace(/<[^>]*>/g, '');
    setCharacterCount(textContent.length);
    setWordCount(textContent.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, []);

  // 내용 초기화
  const clearContent = useCallback(() => {
    setContent('');
    setWordCount(0);
    setCharacterCount(0);
  }, []);

  // HTML에서 텍스트만 추출
  const getTextContent = useCallback(() => {
    return content.replace(/<[^>]*>/g, '');
  }, [content]);

  // 내용이 비어있는지 확인
  const isEmpty = useCallback(() => {
    const textContent = getTextContent().trim();
    return textContent.length === 0;
  }, [getTextContent]);

  // 특정 텍스트로 설정
  const setContentWithText = useCallback((text) => {
    const htmlContent = `<p>${text}</p>`;
    setContent(htmlContent);
    setCharacterCount(text.length);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, []);

  return {
    content,
    wordCount,
    characterCount,
    handleChange,
    clearContent,
    getTextContent,
    isEmpty,
    setContent,
    setContentWithText
  };
};