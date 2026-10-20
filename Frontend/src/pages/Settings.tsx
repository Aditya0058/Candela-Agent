import { useState } from 'react';
import './Settings.css'

function Settings() {

    const [apiKey, setApiKey] = useState(() => localStorage.getItem('candela_api_key') || '');
    const [proxyUrl, setProxyUrl] = useState(() => localStorage.getItem('candela_proxy_url') || 'http://127.0.0.1:2026/api/chat');
    const [modelName, setModelName] = useState(() => localStorage.getItem('candela_model') || 'gemma4:31b-cloud');  

    const saveSettings = () => {
        localStorage.setItem('candela_api_key', apiKey);
        localStorage.setItem('candela_model', modelName);
        localStorage.setItem('candela_proxy_url', proxyUrl)
        alert("Settings saved successfully!");
    }

    return(
        <div className="main-content">
            <h1>Settings</h1>
                        <div className="credentials">
                
                <div className="input-group">
                    <label>Proxy URL</label>
                    <input 
                        type="text" 
                        placeholder="e.g., https://api.openai.com/v1/chat/completions" 
                        value={proxyUrl}
                        onChange={(e) => setProxyUrl(e.target.value)}
                    />
                </div>

                {/* 2. Model Name Input */}
                <div className="input-group">
                    <label>Model Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g., gpt-4o-mini" 
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                    />
                </div>

                {/* 3. API Key Input */}
                <div className="input-group">
                    <label>API Key</label>
                    <input 
                        type="password" 
                        placeholder="Leave blank if using local Ollama" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>

                <button onClick={saveSettings} className="save-btn">Save Settings</button>
            </div>
        </div>
    )
}
export default Settings;