import React from "react";
import "./CircleIcon.scss";
import { Link } from "react-router-dom";
const CircleIcon = ({ link, children, href }) => {
  return (
    <Link to={href}>
      <div className="circle-icon">
        <img className='darkfill-lightest' src={link} alt="" />
        {children && (
          <div className="additional-content">
            {children}
          </div>
        )}
      </div>
    </Link>
  );
};



export default CircleIcon;
