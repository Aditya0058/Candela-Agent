import Chatbox from "../components/Chatbox";
import './Chat.css'

function Chat(){
    return(
        <div className="chat-content">
            <div className="chat-header">
                <div className="chat-name">Chat Title here</div>
                <div className="chat-controls">
                    <button className="share-btn">Share</button>
                </div>
            </div>
            <div className="chats-content"></div>
            <div className="chat-box-here">
                <Chatbox />
            </div>
        </div>
    )
}

export default Chat;