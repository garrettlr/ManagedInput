import React, { Component } from 'react';
import AutoCompleteItem from './AutoCompleteItem.jsx';

const MapAutoComplete = ({ items, handleClick, handleMouseOver, activeIdx, }) => items.map((item, idx) =>
  <AutoCompleteItem
    key={item}
    value={item}
    handleClick={handleClick}
    handleMouseOver={handleMouseOver}
    activeIdx={activeIdx}
    idx={idx}
  />);

export default MapAutoComplete;