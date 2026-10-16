import { Link } from 'react-router-dom';
import './style/Sidebar.css'


const items = [
  { id: 'chat', label: 'New Chat', icon: '#', path: '/home' },
  {id: 'chat1', label: 'Chat 1', icon: '#', path: '/chat'},
  { id: 'settings', label: 'Settings', icon: '#', path: '/settings' },

]

function Sidebar() {
  
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
                {items.map(item => (
                  <li key={item.id} className={item.id}>
                  <Link to={item.path} >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="sidebar-footer">

            </div>
        </div>
    </>
  )
}

export default Sidebar;
