import './sidebar.css';

const Sidebar = ({children}) => {
  return (
    <div className="sidebar">
      {children?.map((child, index) => {
        return <div key={index} className="sidebar-item">{child}</div>;
      })}
    </div>
  )
}

export default Sidebar;
