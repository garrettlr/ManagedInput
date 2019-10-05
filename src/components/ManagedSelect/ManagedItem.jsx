import React from 'react';
import styles from '../../styles/managedInput.less';

/**
* list item to display managed entry.
* @name {Component} ManagedItem
* @arg {object} props the props passed down.
* @returns {jsx} returns a react component.
* */
const ManagedItem = ({ value, handleClick, classNames: { itemWrapper, itemHandler, itemClass, }, ...props }) =>
  <div className={`${itemWrapper ? itemWrapper : ''} ${styles.managedItemWrapper}`} {...props}>
    <span
      role="button"
      tabIndex={-1}
      onClick={e => handleClick(e, value)}
      className={`${itemHandler ? itemHandler : ''} ${styles.managedItemHandler}`}
    >
      x
    </span>
    <span className={`${itemClass ? itemClass : ''} ${styles.managedItem}`}>{value}</span>
  </div>;

export default ManagedItem;
