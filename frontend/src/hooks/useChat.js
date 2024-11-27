import { useEffect, useState } from "react";

function useChat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMedicineInfo, setShowMedicineInfo] = useState(false);  // 약 정보 표시 상태
    const [showHospitalInfo, setShowHospitalInfo] = useState(false);  // 병원 정보 표시 상태

    const apiKey = process.env.OPENAI_API_KEY;
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

    useEffect(() => {
        setMessages([
            {
                message: "현재 느끼고 있는 증상을 알려주세요! ex)'두통이 있어요', '열이 나요', '복통이 심해요'와 같이 입력해주세요.",
                sender: 'bot',
            },
        ]);
    }, []);

    const addMessage = (sender, message) => {
        const currentTime = new Date().toLocaleTimeString();  // 현재 시간을 저장
        setMessages(prevMessages => [...prevMessages, { sender, message, time: currentTime }]);
    };

    const handleSendMessage = async () => {
        const message = userInput.trim();
        if (message.length === 0) return;

        const newMessage = {
            message: userInput,
            sender: 'user',
            time: new Date()  // 메시지를 보낼 때의 시간을 저장
        };
    
        setMessages([...messages, newMessage]);
        setUserInput('');
        setLoading(true);

        const extractSymptom = (input) => {
            // 간단한 키워드 매칭 (정규식으로 확장 가능)
            const symptoms = ['두통', '발열', '복통', '기침', '피로']; // 예시 증상 키워드
            for (const symptom of symptoms) {
                if (input.includes(symptom)) {
                    return symptom;
                }
            }
            return null; // 추출된 증상이 없으면 null 반환
        };

        const symptom = extractSymptom(message) || '증상 불명'; // 증상이 없으면 기본값 사용
        const prompt = `사람의 현재 증상이 기록된 [${symptom}]과 관련된 병명과 원인을 출력하고, 
                    병명이 기록된 [${symptom}]에 대한 증상을 완화할 수 있는 일반의약품 종류도 함께 출력해줘
                    병명: 해당 문제에 대한  
                    ...
                    이 형식을 준수하여 3개 이상의 결과를 제공하십시오.
                    각 결과는 반드시 줄 바꿈(\n)으로 구분되어야 합니다.`;
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
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

            if (aiResponse.includes("명칭:")) {
                setShowMedicineInfo(false);
                setShowHospitalInfo(false);
            }
        } catch (error) {
            console.error('오류 발생!', error);
            addMessage('bot', '오류 발생!');
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        setMessages,
        userInput,
        setUserInput,
        handleSendMessage,
    };
}

export default useChat;
