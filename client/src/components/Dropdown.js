import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ items }) => {
  return (
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li key={index}>
          <Link to={item.path} className="dropdown-item">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;