import { useEffect, useRef } from "react";
import Chatbox from "../components/Chatbox";
import './Chat.css'
import { useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {id: string; role: string; content: string};
interface chatProps{
    chats: { 
        id: string; 
        title: string; 
        messages: Message[];
    }[];
    updateChatMessages: (chatId: string, newMessages: Message[]) => void;
};

function Chat({chats, updateChatMessages}: chatProps){

    // extracting data
    const location = useLocation();
    const firstPrompt = location.state?.firstPrompt;
    const hasSentFirstPrompt = useRef(false);
    const bottomRef = useRef<HTMLDivElement>(null); 
    const {chatId} = useParams();

    const currentChat = chats.find(c => c.id === chatId);
    useEffect(() => {
        if(!firstPrompt || hasSentFirstPrompt.current || (currentChat?.messages.length ?? 0) > 0) return;
        hasSentFirstPrompt.current = true;
        sendPrompt(firstPrompt);
    }, [firstPrompt]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentChat?.messages]);
    
    async function sendPrompt(message: string) {
        if(!chatId) return;
        const existingMessages = currentChat?.messages ?? [];
        const userMessage = { id: crypto.randomUUID(), role: 'user', content: message };
        const updatedMessages = [...existingMessages, userMessage];

        updateChatMessages(chatId, updatedMessages);

        const response = await fetch("http://127.0.0.1:5000/chats", {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updatedMessages }),
        })
        const data = await response.json();
        const assistantMessage = {
            id: crypto.randomUUID(), 
            role: 'assistant', 
            content: data.response 
        }
        const finalMessages = [...updatedMessages, assistantMessage];
        updateChatMessages(chatId, finalMessages);
    }

    const firstUser = currentChat?.title ?? 'New Chat';
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
                {currentChat?.messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.role}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                        
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