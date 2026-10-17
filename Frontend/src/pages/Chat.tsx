import { useEffect, useRef, useState } from "react";
import Chatbox from "../components/Chatbox";
import './Chat.css'
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';



function Chat(){

    // extracting data
    const location = useLocation();
    const firstPrompt = location.state?.firstPrompt;
    const hasSentFirstPrompt = useRef(false);
    const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if(!hasSentFirstPrompt || hasSentFirstPrompt.current) return;
        hasSentFirstPrompt.current = true;
        sendPrompt(firstPrompt);
    }, [firstPrompt]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    async function sendPrompt(message: string) {
        const userMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: message

        }
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        const response = await fetch("http://127.0.0.1:5000/chats", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updatedMessages }),
        })
        const data = await response.json();
        console.log("data from backend:", data);

        setMessages(prev => [
            ...prev,
            { id: crypto.randomUUID(), role: 'assistant', content: data.response }
        ])
    }
    const firstUser = messages.find(m => m.role === 'user')?.content;
    const title = firstUser
    ? firstUser.length > 40 ? firstUser.slice(0, 40) + '…' : firstUser
    : 'New Chat';

    return (


        <div className="chat-content">
            <div className="chat-header">
                <div className="chat-name">{title}</div>
                <div className="chat-controls">
                    <button className="share-btn">Share</button>
                </div>
            </div>
            <div className="actual-chats">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.role}`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                        
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="chat-box-here">
                <Chatbox onSend={sendPrompt}/> 
            </div>
        </div>
    )
}

export default Chat;