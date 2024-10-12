import React, { useState } from 'react';
import styled from 'styled-components';

import chatbotIcon from '../../images/chatbot.png';

import Conversation from './conversation';

const ChatbotButton = styled.div`
    position: fixed;
    bottom: 70px;
    right: 20px;
    z-index: 10;
    cursor: pointer;
    img{
        width: 13vh;
        height: 13vh;
    }
`;

const ChatContainer = styled.div`
    position: fixed;
    bottom: 50px;
    right: 20px;
    z-index: 11;
`;

function ChatbotIcon() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const toggleChat = () => {
        // 채팅창이 숨겨져 있고 닫혀있는 경우, 채팅창을 열고 숨김을 해제
        if (isHidden && !isChatOpen) {
            setIsHidden(false);  // 숨김 해제
            setIsChatOpen(true);  // 채팅창 열기
        } else if (!isHidden && isChatOpen) {
            // 채팅창이 열려 있고 숨겨져 있지 않은 경우, 창을 닫음
            setIsChatOpen(false);
        } else if (isHidden && isChatOpen) {
            // 채팅창이 열려 있지만 숨겨져 있는 경우
            setIsHidden(false);  // 숨김 해제만 하고, 창은 열려 있음
        } else {
            // 그 외의 경우, 채팅창을 열기
            setIsChatOpen(true);
        }
    };

    return (
        <>
        <ChatbotButton onClick={toggleChat}>
            <img src={chatbotIcon} alt='ChatIcon'/>
        </ChatbotButton>
        {isChatOpen && (
            <ChatContainer>
                <Conversation 
                closeChat={() => 
                setIsChatOpen(false)} 
                isHidden={isHidden} 
                setIsHidden={setIsHidden} 
            />
            </ChatContainer>
        )}
        </> 
    )
}

export default ChatbotIcon;
