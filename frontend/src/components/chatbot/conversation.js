import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useChat from "../../hooks/useChat";
import useHospitals from '../../hooks/useHospitals';

import MapImage from '../../images/MapImage.png';

import styled from "styled-components";
import { FiSend, FiMinus, FiX } from "react-icons/fi";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    font-size: 1.4vh;
`;

const BotMessage = styled.div`
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 10px 10px 10px 0;
    margin-bottom: 10px;
    align-self: flex-start;
    max-width: 80%;
    line-height: 1.25rem;
`;

// 유저가 보낸 메시지 스타일
const UserMessage = styled.div`
    background-color: #2A4387;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    align-self: flex-end;
    max-width: 80%;
    margin-left: 10vh;
`;

// 시간 표시 스타일
const MessageTime = styled.span`
    font-size: 1vh;
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
const MessageInput = styled.textarea`
    width: 24vh;
    font-size: 1.3vh;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
    resize: none;
    overflow: auto;
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

const Btnwrapper = styled.div`
    display: flex;
    max-width: 85%;
`;

const ChatBtnWrapper = styled.div`
    display: flex;
    max-width: 100%;
`;

const InfoBtn = styled.button`
    background-color: ${props => props.selected ? '#DDDDDD' : '#1C3988'};
    color: ${props => props.selected ? '#000000' : '#FFFFFF'};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 5px;
    font-size: 1.1vh;
    margin-left: 5px;
    flex: 1;
    cursor: pointer;
`;

const InfoDisplay = styled.div`
    display: flex;

    .swiper-button-prev,
    .swiper-button-next {
        color: rgba(221, 221, 221, 0.85) !important
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 1.6rem !important;
        font-weight: 1000 !important;
    }
    .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
        opacity: 0 !important;
    }
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10vw;
    padding: 10px;
    border: 1px solid #E3E3E3;
    border-radius: 10px;
    background: #FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
`;

const Name = styled.p`
    color; #667085;
    font-size: 1.3vh;
    text-align: center;
    text-weight: 900;
`;
const Img = styled.img`
    width: 14vh;
    height: 7vh;
    border: 1px solid rgba(227, 227, 227, 0.8);
    border-radius: 10px;
`;
// #E3E3E3

const Text = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    color: #667085;
    font-size: 1.1vh;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break:break-all;
    height: 4vh;
    width: 100%;
    cursor: default;
`;

function Conversation({ closeChat, isHidden, setIsHidden }) {
    const [isChatStarted, setIsChatStarted] = useState(false);
    const { messages, userInput, setUserInput, handleSendMessage, setMessages } = useChat();
    const messageAreaRef = useRef(null);

    const [drugs, setDrugs] = useState([]);
    // const [hospitals, setHospitals] = useState([]);

    const navigate = useNavigate();

    const hospitals = useHospitals();

    //스크롤 관련 내용
    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);
    
    const scrollToBottom = () => {
        if (messageAreaRef.current) {
        messageAreaRef.current.scrollTop = messageAreaRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMedicineInfo = (index) => { // 약의 정보 버튼 클릭
        setMessages(messages.map((msg, i) => {
            if (i === index) {
                return { ...msg, showMedicineInfo: !msg.showMedicineInfo, showHospitalInfo: false };
            }
            return msg;
        }));
    };

    const toggleHospitalInfo = (index) => { // 병원 정보 버튼 클릭
        setMessages(messages.map((msg, i) => {
            if (i === index) {
                return { ...msg, showHospitalInfo: !msg.showHospitalInfo, showMedicineInfo: false };
            }
            return msg;
        }));
    };

    useEffect(() => { // 약의 정보를 받아오기 위함
        fetch('/drug')
            .then(response => response.json())
            .then(data => {
                setDrugs(data.drug);
                console.log('Fetched drugs:', data.drug);
            })
            .catch(error => {
                console.error('Error fetching drugs:', error);
            });
    }, []);
    
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
            {messages.map((msg, index) => (
                msg.sender === 'user' ? (
                    <UserMessage key={index}>
                        {msg.message}
                        <MessageTime>{new Date(msg.time).toLocaleTimeString()}</MessageTime>
                    </UserMessage>
                ) : (
                    <>
                        <BotMessage key={index}>
                            {msg.message}
                        </BotMessage>
                        {index !== 0 && ( // 0번째 인덱스가 아닐 때만 Btnwrapper를 표시
                        <Btnwrapper>
                            <InfoBtn onClick={() => toggleMedicineInfo(index)} selected={msg.showMedicineInfo}>약 정보</InfoBtn>
                            <InfoBtn onClick={() => toggleHospitalInfo(index)} selected={msg.showHospitalInfo}>병원 정보</InfoBtn>
                        </Btnwrapper>
                        )}
                        {msg.showMedicineInfo && index !== 0 && (
                            <InfoDisplay>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={70}
                                    slidesPerView={2}
                                    navigation
                                >
                                {drugs.length > 0 ? drugs.slice(0, 4).map(drug => (
                                    <SwiperSlide key={drug._id}>
                                        <InfoBox>
                                            <Name>{drug.drugName}</Name>
                                            <Img src={drug.drugImage} alt="약" />
                                            <Text title={drug.drugDose}>{drug.drugDose}</Text>
                                            <ChatBtnWrapper>
                                                <InfoBtn onClick={() => navigate(`/store/stock/${drug._id}?drugName=${encodeURIComponent(drug.drugName)}`)}>근처 약국/편의점</InfoBtn>
                                            </ChatBtnWrapper>
                                        </InfoBox>
                                    </SwiperSlide>
                                )) : <p>No drugs found</p>}
                                </Swiper>
                            </InfoDisplay>
                        )}
                        {msg.showHospitalInfo && index !== 0 && (
                            <InfoDisplay>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={70}
                                    slidesPerView={2}
                                    navigation
                                >
                                {hospitals.length > 0 ? hospitals.slice(0, 4).map(hospital => (
                                    <SwiperSlide key={hospital._id}>
                                        <InfoBox>
                                            <Name>{hospital.hospitalsName}</Name>
                                            <Img src={MapImage} alt="병원" />
                                            <Text>{hospital.hospitalsAddr}</Text>
                                            <Btnwrapper>
                                                <InfoBtn>병원 상세 정보</InfoBtn>
                                            </Btnwrapper>
                                        </InfoBox>
                                    </SwiperSlide>
                                )) : <p>No hospitals found</p>}
                                </Swiper>
                            </InfoDisplay>
                        )}
                    </>
                )
            ))}
            <div ref={messageAreaRef} ></div>
        </ChatArea>

          {/* 메시지 입력 영역 */}
        <MessageInputContainer>
            <MessageInput
                type="text"
                value={userInput}
                placeholder="메세지를 입력하세요."
                onChange={(e) => setUserInput(e.target.value)}
                // onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 지금 두 개가 보내지는 문제가 발생
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                    }}
            />
            <SendButton onClick={handleSendMessage}>
                <FiSend size="20" />
            </SendButton>
        </MessageInputContainer>
        </>
    )}
    </ChatWrapper>
    );
}

export default Conversation;
