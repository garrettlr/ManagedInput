import React, { Component } from 'react';
import styles from '../../styles/styles.less';


const AutoCompleteItem = ({ value, handleClick, handleMouseOver, activeIdx, idx }) => (
  <li
    className={activeIdx === idx ? styles.activeItem : null}
    onClick={() => handleClick(value)}
    onMouseOver={() => handleMouseOver(value)}
  >
    {value}
  </li>
);

export default AutoCompleteItem;