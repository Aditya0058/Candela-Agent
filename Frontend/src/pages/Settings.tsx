import './Settings.css'

function Settings() {
    return(
        <div className="main-content">
            <h1>Settings</h1>
            <div className="credentials">
                <div className="select-endpoint">
                    <input type="checkbox" name="" id="" />
                </div>
                <div className="api">
                    <input type="text" placeholder='Enter your api key'/>
                </div>
            </div>
        </div>
    )
}
export default Settings;