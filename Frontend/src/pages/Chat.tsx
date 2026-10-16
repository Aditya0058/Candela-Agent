import { useEffect, useRef, useState } from "react";
import Chatbox from "../components/Chatbox";
import './Chat.css'
import { useLocation } from 'react-router-dom';


//defining props
// interface setMessagesProps {
//     onSend: (message: string) => void;
// }

function Chat(){

    // extracting data
    const location = useLocation();
    const firstPrompt = location.state?.firstPrompt;
    const hasSentFirstPrompt = useRef(false);
    const [messages, setMessages] = useState<{ id: number; role: string; content: string }[]>([]);

    useEffect(() => {
        if(!hasSentFirstPrompt || hasSentFirstPrompt.current) return;
        hasSentFirstPrompt.current = true;
        sendPrompt(firstPrompt);
    }, [firstPrompt]);
    
    async function sendPrompt(message: string) {
        setMessages(prev => [...prev, {id:  Date.now(), role: 'user', content: message}]);

        const response = await fetch("http://127.0.0.1:5000/chats", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        });

        const data = await response.json();

        // console.log(data);
        // console.log(data.response);
        setMessages(prev => [...prev, {id:  Date.now(), role: 'assistant', content: data.response }]);
        console.log(messages);
    }

    // messages.map((msg) => {
    //     return (
    //         <div key={msg.id} className={`message ${msg.role}`}>
    //             {msg.content}
    //         </div>
    //     )
    // })
    return(


        <div className="chat-content">
            <div className="chat-header">
                <div className="chat-name">Chat Title here</div>
                <div className="chat-controls">
                    <button className="share-btn">Share</button>
                </div>
            </div>
            <div className="chats-content">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-box-here">
                <Chatbox onSend={sendPrompt}/> 
            </div>
        </div>
    )
}

export default Chat;