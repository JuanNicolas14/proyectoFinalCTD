import './sidebar.css';

const Sidebar = ({children}) => {
  return (
    <div className="sidebar">
      {children?.map(child => {
        return <div className="sidebar-item">{child}</div>;
      })}
    </div>
  )
}

export default Sidebar;
