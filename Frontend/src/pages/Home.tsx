import './Home.css';

function Home() {
    return (
        <div className="main-content">
            <div className="greetings">
                <img src="src/assets/candela_logo.png" alt="logo" className='greeting-logo' />
                <h2 className='greeting'>Welcome Back, Aditya</h2>
            </div>
            <div className="chat-box">
                <input type="text" placeholder="Enter something here..." className="user-input" />
                <div className="chat-box-btns">
                    <button className="attach-files">Attach</button>
                    <button className="llm-model">Gemma</button>
                    <button className="send-user-input">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Home;