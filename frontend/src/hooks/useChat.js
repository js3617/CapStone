import { useState } from "react";

function useChat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = 'sk-proj-ZNbGh0zCXNC06KSNdcjJT3BlbkFJrDHRJBVMPca3SONWU0gy';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

    const addMessage = (sender, message) => {
        const currentTime = new Date().toLocaleTimeString();  // 현재 시간을 저장
        setMessages(prevMessages => [...prevMessages, { sender, message, time: currentTime }]);
    };

    const handleSendMessage = async () => {
        const message = userInput.trim();
        if (message.length === 0) return;

        addMessage('user', message);
        setUserInput('');
        setLoading(true);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 1024, //답변 최대 글자 수
                    top_p: 1, // 다음 단어를 선택할 때 상위 p%만 고려
                    temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
                    frequency_penalty: 0.5, // 전문적 단어의 빈도, 낮을수록 전문적(0~1)
                    presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음(0~1)
                    stop: ['문장 생성 중단 단어'],
                }),
            });

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || 'No response';
            addMessage('bot', aiResponse);
        } catch (error) {
            console.error('오류 발생!', error);
            addMessage('bot', '오류 발생!');
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        userInput,
        setUserInput,
        handleSendMessage,
        loading,
        setLoading,
    };
}

export default useChat;
