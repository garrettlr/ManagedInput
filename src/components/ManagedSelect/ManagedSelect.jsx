import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/managedInput.less';
import { ManageMap, ManagedItem } from './index.js';
import { ConditionalRenderer } from '../index.js';

/**
* creates a faux input box that allows controlled multiple entries in a single input
* should be rendered inside a HOC or Wrapper class.
* @name {Class} ManagedSelect
* */
export default class ManagedSelect extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, } = nextProps;
    return do {
      if (items.length !== prevState.children.length) {
        ({ children: [...items], showPlaceholder: !items.length, });
      } else null;
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      children: [],
      showPlaceholder: true,
      focused: false,
    };
    this.mInput = React.createRef();
    this.mWrapper = React.createRef();
  }

  // click handler to delete elements
  handleDelete = (e, value) => {
    if (this.state.focused && this.props.value.length) return;
    e.stopPropagation();
    const { children, } = this.state;
    const items = [...children.filter(c => c !== value)];

    this.props.handleListChange(items);
  };
  // keeps track of the value in the input
  handleChange = e => {
    this.props.handleChange(e.target.value);
    !!this.props.handleError && this.props.handleError("");
  };

  // pushes a value to the items array, or remove one, or highlights an element.
  // basically just handles keyboard events
  handleNext = e => {
    switch (e.key) {
      case ('Enter'):
        e.preventDefault();
        return this.props.handleEntry();
      case ('Backspace'):
        if (this.props.value) return;
        e.preventDefault();
        return this.handleDelete(e, this.state.children[this.state.children.length - 1])
      case ('ArrowDown'):
        e.preventDefault();
        return this.props.handleKeyNav(1);
      case ('ArrowUp'):
        e.preventDefault();
        return this.props.handleKeyNav(-1);
      default:
        return;
    }
  }

  // calculates the width needed to display the value in the input
  getInputWidth = () => ({
    width: `${this.props.value.length ? `${this.props.value.length + 2}ch` : '2px'}`,
  });

  // handles DOM work to make the input visible and focused.
  handleActivate = () => {
    const ref = this.mInput.current;
    ref.focus();
  };

  // sets a focus border around the wrapper
  handleFocus = () => {
    this.setState({ focused: true })
  };

  // handle release of focus on input.
  handleBlur = () => {
    // fake the synthetic event to reuse the handler.
    if (this.props.value) this.handleNext({ key: 'Enter', preventDefault: () => { } });
    this.setState({ focused: false });
  }

  render() {
    const { children, showPlaceholder, focused, } = this.state;
    const { value, classNames: { wrapperClass, inputClass, placeholderClass, ...itemClasses } } = this.props;
    const len = children.length;
    const aligner = len <= 3 ? 'alignItems' : 'alignContent';
    const height = len <= 3 ? '56px' : 'auto';

    return (
      <div
        role="button"
        id={this.props.id}
        tabIndex={focused ? -1 : 0}
        className={`${wrapperClass ? wrapperClass : ''} ${styles.managedInputWrapper}`}
        onFocus={this.handleActivate}
        style={{
          paddingLeft: `${showPlaceholder ? '5px' : ''}`,
          outline: `${focused ? '5px auto #3b99fc' : ''}`,
          [aligner]: `${len <= 3 ? 'center' : 'stretch'}`,
          height,
        }}
        ref={this.mWrapper}
      >
        <ManageMap
          list={children}
          handleClick={this.handleDelete}
          classNames={itemClasses}
        />
        <input
          ref={this.mInput}
          className={`${inputClass ? inputClass : ''} ${styles.managedInput}`}
          style={this.getInputWidth()}
          onChange={this.handleChange}
          onKeyDown={this.handleNext}
          onBlur={this.handleBlur}
          value={value}
          onFocus={this.handleFocus}
          tabIndex={-1}
        />

        <ConditionalRenderer
          isVisible={!(children.length || value)}
          className={`${placeholderClass ? placeholderClass : ''} ${styles.placeholder}`}
        >
          {this.props.placeholder}
        </ConditionalRenderer>
      </div>
    );
  }
}

ManagedSelect.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEntry: PropTypes.func.isRequired,
  handleListChange: PropTypes.func.isRequired,
  classNames: PropTypes.object,
  id: PropTypes.string,
};

ManagedSelect.defaultProps = {
  classNames: {
    wrapperClass: '',
    itemWrapper: '',
    itemHandler: '',
    itemClass: '',
    inputClass: '',
    placeholderClass: '',
  },
  id: 'managedInput'
};
