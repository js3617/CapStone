import { useEffect, useState } from "react";

function useChat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMedicineInfo, setShowMedicineInfo] = useState(false);  // 약 정보 표시 상태
    const [showHospitalInfo, setShowHospitalInfo] = useState(false);  // 병원 정보 표시 상태

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
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
        const prompt = `사람의 현재 증상이 기록된 [${symptom}]과 관련된 병명과 원인을 출력하고, 병명이 기록된 [${symptom}]에 대한 증상을 완화할 수 있는 일반의약품 종류도 함께 출력해줘.
                        병명 및 원인:
                        1. 병명: [병명1]
                        - 원인: [원인 설명1]
                        2. 병명: [병명2]
                        - 원인: [원인 설명2]
                        3. 병명: [병명3]
                        - 원인: [원인 설명3]
                        [병명1], [병명2], [병명3] 중 하나 또는 그 이상이 "증상 불명"으로 표시된 경우:
                        "현재 제공된 정보로는 정확한 진단이 어렵습니다. 증상에 대해 더 자세히 설명해주세요. 예를 들어, 증상의 강도, 동반 증상 등을 추가로 알려주시면 도움이 될 것입니다."

                        일반의약품 추천:
                        1. [약 이름1]
                        - 카테고리: [증상 카테고리]
                        - 용량: [용량 정보]
                        - 주의사항: [주의사항 정보]
                        2. [약 이름2]
                        - 카테고리: [증상 카테고리]
                        - 용량: [용량 정보]
                        - 주의사항: [주의사항 정보]
                        3. [약 이름3]
                        - 카테고리: [증상 카테고리]
                        - 용량: [용량 정보]
                        - 주의사항: [주의사항 정보]

                        병원 추천 (부산 지역):
                        1. 부산대학교병원
                        2. 인제대학교 해운대백병원
                        3. 동아대학교병원

                        이 정보를 바탕으로 증상에 맞는 최적의 치료와 조치를 선택할 수 있습니다. 실제 치료는 전문 의료인의 진단을 받은 후 진행하는 것이 안전합니다.
`;
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
