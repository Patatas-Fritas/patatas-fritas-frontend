/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import downArrow from '../../assets/images/icons/down-arrow.png';
import './Dropdown.css';

function Dropdown({ title, items = [] }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onClick={() => toggle(!open)}
      >
        <div className="dd-header-title">
          {title}
          <img
            src={downArrow}
            className="dd-icon"
            alt="down-arrow"
          />
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <li className="dd-list-item">
              <button
                className="dd-list-item-button"
                type="button"
                onClick={() => {
                  if (item.action) {
                    item.action();
                  }
                  history.push(item.path);
                  toggle();
                }}
              >
                <span>
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  title: propTypes.string.isRequired,
  items: propTypes.array.isRequired,
};

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
