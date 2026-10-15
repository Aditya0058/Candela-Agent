import './Home.css';
import Chatbox from '../components/Chatbox';
import { useNavigate } from 'react-router-dom';



function Home() {
    // declaring navigations
    const navigate = useNavigate();
    // sending prompt to chat.tsx
    async function sendPrompt(message: string){ 
        navigate('/chat', { state: { firstPrompt: message } })
    }


// ----- 
    return (
        <div className="main-content">
            <div className="greetings">
                <img src="src/assets/candela_logo.png" alt="logo" className='greeting-logo' />
                <h2 className='greeting'>Welcome Back, Aditya</h2>
            </div>
            <Chatbox 
                onSend={sendPrompt} // I have to create send Prompt function which will navigate to chat page and then send message there and not here
            />
        </div>
    )
}

export default Home;