import './Home.css';
import Chatbox from '../components/Chatbox';

function Home() {


    return (
        <div className="main-content">
            <div className="greetings">
                <img src="src/assets/candela_logo.png" alt="logo" className='greeting-logo' />
                <h2 className='greeting'>Welcome Back, Aditya</h2>
            </div>
            <Chatbox />
        </div>
    )
}

export default Home;