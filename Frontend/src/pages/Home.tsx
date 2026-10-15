import './Home.css';
import Chatbox from '../components/Chatbox';

function Home() {

    function sendPrompt(message: string){ 
        console.log(message +" Sent Successfully from home");

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