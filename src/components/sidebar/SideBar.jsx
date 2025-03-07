import React, { useState } from "react";
import { FaBars, FaTimes, FaCogs, FaTable, FaList, FaBuilding } from "react-icons/fa";
import "./sidebar.css";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleTrigger = () => setIsOpen(!isOpen);
  
  return (
    <>
      <div className="sidebar__container">
      <div className="page">
        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
          <div className="trigger" onClick={handleTrigger}>
            { isOpen ? <FaTimes /> : < FaBars /> }
          </div>
          <div className="sidebar-position">
            <a className="shelter__link" href="/shelter-contents">
              <FaBuilding />
              <span>Corporativo</span>
            </a>
          </div>
          <div className="sidebar-position">
            <FaCogs />
            <span>Menu item 2</span>
          </div>
          <div className="sidebar-position">
            <FaTable />
            <span>Menu item 3</span>
          </div>
          <div className="sidebar-position">
            <FaList />
            <span>Position 4</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SideBar;
