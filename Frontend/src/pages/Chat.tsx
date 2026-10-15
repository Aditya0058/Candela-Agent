import Chatbox from "../components/Chatbox";
import './Chat.css'
import { useLocation } from 'react-router-dom';

function Chat(){

    // extracting data
    const location = useLocation();
    const firstPrompt = location.state?.firstPrompt;
    console.log(firstPrompt); // temp test
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
                <Chatbox /> {/* this error is intersting - i think this is going to change entire chatbox box now. Soon need to make chatbox more dumb */}
            </div>
        </div>
    )
}

export default Chat;