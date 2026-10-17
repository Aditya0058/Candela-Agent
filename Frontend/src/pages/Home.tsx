import './Home.css';
import Chatbox from '../components/Chatbox';
import { useNavigate } from 'react-router-dom';


interface HomeProps{
    onCreateChat: (id: string, firstMessage: string) => void;
}
function Home({onCreateChat}: HomeProps) {
    // declaring navigations
    const navigate = useNavigate();
    // sending prompt to chat.tsx
    async function sendPrompt(message: string) { 
        const newChatId = crypto.randomUUID(); 
        console.log("1. Home: Sending message", message);
        onCreateChat(newChatId, message)
        navigate(`/chat/${newChatId}`, { state: { firstPrompt: message } }); 
    }


// ----- 
    return (
        <div className="main-content">
            <div className="greetings">
                <img src="src/assets/candela_logo.png" alt="logo" className='greeting-logo' />
                <h2 className='greeting'>Welcome Back, Aditya</h2>
            </div>
            <Chatbox 
                onSend={sendPrompt} 
            />
        </div>
    )
}

export default Home;
