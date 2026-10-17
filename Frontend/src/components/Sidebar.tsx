import { Link } from 'react-router-dom';
import './style/Sidebar.css'



interface SidebarProps {
    chats: { id: string; title: string }[];
}
function Sidebar({chats}: SidebarProps) {
  console.log("Sidebar received chats:", chats); //temp
  return (
    <>
        <div className="sidebar">
            <div className="sidebar-header">
              <Link to="/home">
              <div className="logo"> <img src="src/assets/candela_logo.png" alt="" />Candela</div>
              </Link>
            </div>
            <nav className='sidebar-navigation'>
              <ul>
                <li>
                  <Link to="/home">New Chat</Link>
                </li>
                {chats.map(chat => (
                  <li key={chat.id}>
                    <Link to={`/chat/${chat.id}`}>{chat.title}</Link>
                  </li>
                ))}
                <li className='settings'>
                    <Link to="/settings">Settings</Link>
                </li>
              </ul>
            </nav>
        </div>
    </>
  )
}

export default Sidebar;
