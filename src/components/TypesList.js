import React from 'react'

import Button from './Button'
import '../styles/typesList.css'
import ListItem from './ListItem'
class TypesList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: this.props.active,
    }
  }

  toggleDropdown() {
    this.setState({active: !this.state.active})
  }

  handleChange(checked, item) {
    item.active = checked;
    const checkedItems = {};
    checkedItems[this.props.facet] = {
      terms: this.props.list
      .filter(item => item.active)
      .map(item => item.key)
    };

    return this.props.updateFilters(checkedItems);
  }

  renderItems() {
    if ( this.state.active ) {
      return this.props.list
      .sort((a,b) => {
        if (a.key < b.key) { return -1; }
        if (a.key > b.key) { return 1; }
        return 0;
      })
      .map((item, i) => {
        return (
          <ListItem
            key={i}
            id={`${item.key}-${i}`}
            label={item.key}
            checked={item.active}
            badge={item.doc_count}
            onChange={checked => this.handleChange(checked, item)} />
        )
      })
    }
  }

  render() {
    return (
      <div className='c-typesList'>
        <Button
          text={this.props.text}
          icon='arrow'
          flat={true}
          iconPosition='left'
          textAlign='left'
          iconDirection={this.state.active ? 'down' : 'right'}
          onClick={this.toggleDropdown.bind(this)}>
        </Button>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    )
  }

}

TypesList.defaultProps = {
  active: true,
  text: 'Label',
  list: []
}

export default TypesList
