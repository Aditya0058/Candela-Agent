import './style/Chatbox.css'
import { useState, useEffect, useRef } from 'react';

function Chatbox() {
    const[message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if(!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px'; 
    }, [message]);
    // send Message function
    function sendMessage(){
        console.log("Aditya Rajput here");
    }
    // entering to send and shift + enter to new line
    function onkeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
    
    return (
        <div className="chat-box">
            <textarea 
            placeholder="Enter Something here...." 
            className="user-input" 
            ref={textareaRef} 
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onkeyDown}
            />
            <div className="chat-box-btns">
                <button className="attach-files">Attach</button>
                <button className="llm-model">Gemma</button>
                <button className="send-user-input" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
export default Chatbox;