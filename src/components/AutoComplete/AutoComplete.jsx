import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ManagedSelect, ConditionalRenderer, AutoCompleteItem, MapAutoComplete, Error,
} from '../index';
import styles from '../../styles/styles.less';

export default class AutoComplete extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selections.length !== prevState.items.length) {
      return { items: nextProps.selections };
    } 
    return null;
  }
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      selections: [],
      value: '',
      width: 272,
      activeIdx: -1,
    };
    this.mSelect = React.createRef();
  }

  componentDidMount() {
    // calculate the width of the dropdown list.
    this.setState({ width: this.getWidth() });
  }

  componentDidUpdate() {
    const nextWidth = this.getWidth();
    // calculate the width of the dropdown list, but only update if it changes.
    if (this.state.width !== nextWidth) this.setState({ width: this.getWidth() });
  }

  // get new autocomplete list when a key is pressed. 
  // reset the active idX. 
  handleChange = value => this.setState({ value, activeIdx: -1 }, () =>
    this.props.fetchItems(value).then(selections =>
      this.setState({ selections, }, () => this.props.handleErr(""))
    )
  );

  // push a selection to the list
  handleSelect = selection => {
    const nextItems = [...this.state.items];

    if (!nextItems.includes(selection)) {
      nextItems.push(selection);
      return this.setState({ value: '', activeIdx: -1 }, this.props.handleSelection(nextItems));
    } else {
      this.setState({ value: '', activeIdx: -1 }, () => this.props.handleErr(`${selection} has already been added.`));
    }
    // error handling
  }
  // allow keyboard users to press enter after selecting an option and add it to the list.
  handleKeySelect = () => {
    const { selections, activeIdx } = this.state;
    const selection = selections[activeIdx];
    if (selection) this.handleSelect(selection);
    else this.setState({ value: '', activeIdx: -1 });
  }

  // track the activeIdx equiv when an option is moused over to highlight.
  handleMouseOver = selection => this.setState({ activeIdx: this.state.selections.indexOf(selection) });

  // change activeIdx when keys are pressed. don't let it escape the bounds of the list.
  handleIdx = n => {
    const idx = this.state.activeIdx + n;
    if (idx < this.state.selections.length && idx >= 0) {
      this.setState({ activeIdx: idx });
    }

  }

  // queries the ref which queries another ref on the div in managed input.
  // very messy but gets the job done well.
  getWidth = () => this.mSelect.current.mWrapper.current.offsetWidth;

  render() {
    return (
      <main className={styles.autoWrapper}>
        <Error value={this.props.err} />
        <content className={styles.autoRow}>
          <ManagedSelect
            classNames={this.props.classNames}
            id={this.props.id}
            items={this.state.items}
            value={this.state.value}
            placeholder={this.props.placeholder}
            handleChange={this.handleChange}
            handleEntry={this.handleKeySelect}
            handleListChange={this.props.handleSelection}
            handleKeyNav={this.handleIdx}
            ref={this.mSelect}
          />
          <ConditionalRenderer
            isVisible={this.state.value}
            className={styles.acList}
            style={{ width: `${this.state.width}px` }}
          >
            <MapAutoComplete
              items={this.state.selections}
              handleClick={this.handleSelect}
              handleMouseOver={this.handleMouseOver}
              activeIdx={this.state.activeIdx}
            />
          </ConditionalRenderer>
        </content>

        <span className={styles.instructions}>{'Enter some airlines :)'}</span>
      </main>

    );
  }
}

AutoComplete.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  handleErr: PropTypes.func.isRequired,
  selections: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  classNames: PropTypes.shape({
    wrapperClass: PropTypes.string,
    itemWrapper: PropTypes.string,
    itemHandler: PropTypes.string,
    itemClass: PropTypes.string,
    inputClass: PropTypes.string,
    placeholderClass: PropTypes.string,
  }),
  id: PropTypes.string,
  err: PropTypes.string.isRequired,
};

AutoComplete.defaultProps = {
  classNames: {
    wrapperClass: styles.autoBox,
    itemWrapper: styles.itemWrapper,
    itemHandler: styles.selectHandler,
    itemClass: styles.mSelect,
    inputClass: styles.mInput,
    placeholderClass: styles.mPlaceholder,
  },
  id: 'autoComplete',
};


