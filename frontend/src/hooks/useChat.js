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

                        증상이 기록된 [${symptom}]과 관련된 일반의약품 추천 (랜덤으로 최대 3개):
                        약 이름: 타이레놀정 500mg

                        카테고리: 두통, 신경통, 근육통, 월경통, 염좌통, 치통, 관절통, 동통
                        용량: 1회 1~2정, 1일 3-4회
                        주의사항: 매일 세 잔 이상 술을 마시는 경우 복용 전 의사나 약사와 상의 필요

                        약 이름: 어린이 타이레놀 현탄액

                        카테고리: 두통, 신경통, 근육통, 월경통, 염좌통, 치통, 관절통, 동통

                        용량: 1회 권장용량 4-6시간 마다 필요시 복용
                        주의사항: 아세트아미노펜 함유로 일일 최대 용량 초과 시 간 손상 주의

                        약 이름: 제일쿨파프

                        카테고리: 진통, 소염, 항염, 어깨결림, 요통, 허리통, 신경통, 류마티스, 타박상, 염좌, 삠, 근육통, 관절통
                        용량: 1일 1~2회 환부에 붙임
                        주의사항: 피부가 약한 분은 사용 전 팔 안쪽에 시험 사용 권장

                        약 이름: 베아제정

                        카테고리: 소화불량, 식욕감퇴, 식욕부진, 과식, 체함, 소화촉진
                        용량: 성인 1회 1정, 1일 3회 식후 복용
                        주의사항: 용법 용량을 잘 지킬 것

                        약 이름: 닥터베아제정

                        카테고리: 소화불량, 식욕감퇴, 식욕부진, 과식, 체함, 소화촉진
                        용량: 성인 1회 1정, 1일 3회 식후 복용
                        주의사항: 용법 용량을 잘 지킬 것

                        약 이름: 훼스탈골드정

                        카테고리: 소화불량, 식욕감퇴, 식욕부진, 과식, 위체, 체함, 소화촉진
                        용량: 성인 1회 1정, 1일 3회 식사 후 복용
                        주의사항: 용법 용량을 잘 지킬 것

                        약 이름: 훼스탈플러스정

                        카테고리: 소화불량, 식욕감퇴, 식욕부진, 과식, 위체, 체함, 소화촉진
                        용량: 성인 1회 2정, 소아 1회 1정, 1일 3회 식사 후 복용
                        주의사항: 정해진 용법, 용량을 잘 지킬 것

                        약 이름: 판콜에이내복액

                        카테고리: 콧물, 코막힘, 재채기, 인후통, 기침, 가래, 오한, 발열, 두통, 관절통, 근육통
                        용량: 성인 1회 30ml, 1일 3회 식후 30분에 복용
                        주의사항: 술을 매일 마시는 사람은 복용 전 의사 또는 약사와 상의

                        약 이름: 판피린티정

                        카테고리: 콧물, 코막힘, 재채기, 인후통, 오한, 발열, 관절통, 두통, 근육통
                        용량: 성인 1회 30ml, 1일 3회 식후 30분에 복용
                        주의사항: 술을 매일 마시는 사람은 복용 전 의사 또는 약사와 상의

                        약 이름: 신신파스아렉스

                        카테고리: 진통, 소염, 항염, 어깨결림, 요통, 허리통, 신경통, 류마티스, 타박상, 염좌, 삠, 근육통, 관절통
                        용량: 1일 1~2회 환부에 붙임
                        주의사항: 소아는 보호자 감독 하에 사용, 피부 약한 분은 사용 전 시험 사용 권장

                        약 이름: 어린이부루펜시럽

                        카테고리: 골관절염, 발열, 동통, 요통, 월경곤란증, 척추염, 두통, 치통, 근육통, 신경통, 급성통풍, 관절염, 염좌, 좌상
                        용량: 성인 이부프로펜으로서 1회 200-600mg, 1일 3-4회 경구 투여
                        주의사항: 술을 자주 마시는 사람은 위장 출혈의 위험 증가, 의사 또는 약사와 상의 필요

                        병원 추천 (부산 지역):
                        1. [병원 이름1]
                        - 위치: [병원 위치1]
                        - 전문 분야: [전문 분야1]
                        2. [병원 이름2]
                        - 위치: [병원 위치2]
                        - 전문 분야: [전문 분야2]
                        3. [병원 이름3]
                        - 위치: [병원 위치3]
                        - 전문 분야: [전문 분야3]
                        
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
