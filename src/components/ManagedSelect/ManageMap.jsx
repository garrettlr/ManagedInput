import React from 'react';
import ManagedItem from './ManagedItem.jsx';

/**
* maps over the list of input items and produces their ManagedItem component
* @name {Component} ManageMap
* @arg props { list, handleClick, ...any valid html prop }
* @returns array an array of (fragments) React Components.
* */
const ManageMap = ({ list, handleClick, classNames, ...props }) =>
  list.map(value =>
    <ManagedItem
      key={value}
      handleClick={handleClick}
      value={value}
      classNames={classNames}
      {...props}
    />
  );

export default ManageMap;
