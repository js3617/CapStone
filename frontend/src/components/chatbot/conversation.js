import useChat from "../../hooks/useChat";

function Conversation() {
    // useChat 훅 호출
    const { message, setMessage, botReplies, handleChat } = useChat();

    return (
        <div>
            <h1>Chat Bot</h1>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                {/* 메시지 입력 필드 */}
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                {/* 메시지 전송 버튼 */}
                <button onClick={handleChat}>버튼</button>
            </div>

            {/* 봇 응답 출력 */}
            <div>
                {botReplies.map((reply, index) => (
                    <p key={index}>{reply}</p>
                ))}
            </div>
        </div>
    );
}

export default Conversation;
