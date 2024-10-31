import React, { useState } from 'react';
import styled from "styled-components";
import { FiSend, FiMinus, FiX } from "react-icons/fi";
import useChat from "../../hooks/useChat";

// 전체 채팅 인터페이스 래퍼
const ChatWrapper = styled.div`
    display: ${props => props.isHidden ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: space-between;
    background-color: #f5f5f5;
    width: 32vh;
    height: 57vh;
    border-radius: 20px;
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 10px;
    z-index: 9999;
    border: 1px solid #E3E3E3;
`;

// 상단 헤더 스타일
const ChatHeader = styled.div`
    background-color: #FFFFFF;
    color: #667085;
    border-bottom: 1px solid #E3E3E3;
    padding: 10px;
    text-align: center;
    font-size: 1.5vh;
    font-weight: 500;
    border-radius: 20px 20px 0 0;
`;

// 채팅 내역 영역
const ChatArea = styled.div`
    flex-grow: 1;
    margin-top: 20px;
    overflow-y: auto;
    padding: 10px;
`;

// 봇이 응답한 메시지 스타일
const BotMessage = styled.div`
    background-color: #ebebeb;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-self: flex-start;
    max-width: 80%;
`;

// 유저가 보낸 메시지 스타일
const UserMessage = styled.div`
    background-color: #2A4387;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-self: flex-end;
    max-width: 80%;
`;

// 시간 표시 스타일
const MessageTime = styled.span`
    font-size: 12px;
    color: #999;
    display: block;
    margin-top: 5px;
    text-align: right;
`;

// 메시지 입력 영역
const MessageInputContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ccc;
`;

// 메시지 입력 필드 스타일
const MessageInput = styled.input`
    width: 24vh;
    font-size: 1.5vh;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
`;

// 전송 버튼 스타일
const SendButton = styled.button`
    background-color: #2A4387;
    color: #FFFFFF;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4vh;
    height: 4vh;
`;

// 채팅 시작하기 버튼
const StartChatButton = styled.button`
    background-color: #2A4387;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 10px;
    font-size: 1.3vh;
    cursor: pointer;
    margin-top: 20px;
`;

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    z-index: 9999;
`;

const WelcomeMessage = styled.h1`
    font-size: 1.5vh;
    color: #667085;
    margin-bottom: 20px;
`;

const HeaderIcons = styled.div`
    display: flex;
    gap: 10px;
    justify-content: end;
`;

function Conversation({ closeChat, isHidden, setIsHidden }) {
    const [isChatStarted, setIsChatStarted] = useState(false);
    const { message, setMessage, botReplies, handleChat } = useChat();

    return (
    <ChatWrapper isHidden={isHidden}>
      {/* 상단 헤더 */}
        <ChatHeader>
            어디약?
        <HeaderIcons>
                {/* 창내리기 아이콘 */}
                <FiMinus onClick={() => setIsHidden(true)} style={{ cursor: 'pointer' }} />
                {/* 닫기 아이콘 */}
                <FiX onClick={closeChat} style={{ cursor: 'pointer' }} />
            </HeaderIcons>
        </ChatHeader>

        {!isChatStarted ? (
        // 채팅 시작 전 화면
        <WelcomeContainer>
            <WelcomeMessage>안녕하세요 반갑습니다!</WelcomeMessage>
            <StartChatButton onClick={() => setIsChatStarted(true)}>채팅 시작하기</StartChatButton>
        </WelcomeContainer>
        ) : (
        // 채팅이 시작되면 채팅 인터페이스 표시
        <>
        <ChatArea>
            {botReplies.map((reply, index) => (
            <BotMessage key={index}>
                {reply.text}
                <MessageTime>{reply.time}</MessageTime>
            </BotMessage>
            ))}
            {/* 예시: 사용자가 입력한 메시지를 표시하는 곳 */}
            {message && (
            <UserMessage>
                {message}
                <MessageTime>{new Date().toLocaleTimeString()}</MessageTime>
            </UserMessage>
            )}
        </ChatArea>

          {/* 메시지 입력 영역 */}
        <MessageInputContainer>
            <MessageInput
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="입력해주세요."
            />
            <SendButton onClick={handleChat}>
                <FiSend size="20" />
            </SendButton>
        </MessageInputContainer>
        </>
    )}
    </ChatWrapper>
    );
}

export default Conversation;
