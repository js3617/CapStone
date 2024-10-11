import { useState } from "react";
import apiClient from "../apiClient"; // 실제 API 클라이언트 임포트 필요

function useChat() {
    const [message, setMessage] = useState("");
    const [botReplies, setBotReplies] = useState([]);

    const handleChat = async () => {
        if (!message) return; // 빈 메시지 전송 방지

        try {
            //실제 API 클라이언트를 이용한 메시지 전송 로직
            const response = await apiClient.post("/chat", {
                usePrompte: message
            });

            setBotReplies(prevReplies => [...prevReplies, response.data]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
        // 메시지 초기화
        setMessage("");
    };

    // 필요한 상태와 함수 반환
    return {
        message,
        setMessage,
        botReplies,
        handleChat,
    };
};

export default useChat;
