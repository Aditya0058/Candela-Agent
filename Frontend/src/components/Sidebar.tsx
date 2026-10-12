import './style/Sidebar.css'

const items = [
  { id: 'chat', label: 'Chat', icon: '#', path: '/chat' },
  { id: 'settings', label: 'Settings', icon: '#', path: '/settings' },

]

function Sidebar() {
  
  return (
    <>
        <div className="sidebar">
            <div className="sidebar-header">
              <div className="logo">Candela</div>
            </div>
            <nav className='sidebar-navigation'>
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                  <a href="#" className={item.id}>{item.icon}    {item.label}</a>
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

export default Sidebar
