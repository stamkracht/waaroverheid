import React from 'react'

import Button from './Button'
import '../styles/filterList.css'
import ListItem from './ListItem'

class FilterList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: this.props.active,
    }
  }

  toggleDropdown() {
    this.setState({active: !this.state.active})
  }

  renderItems() {
    if ( this.state.active ) {
      return this.props.list.map((item, id) => {
        return (
          <ListItem
            key={id}
            id={`${item}-${id}`}
            label={item}
            onChange={(checked) => this.props.onChange(item, checked)} />
        )
      })
    }
  }

  render() {
    return (
      <div className='c-filterList'>
        <Button
          text={this.props.text}
          icon='arrow'
          iconPosition='left'
          textAlign='left'
          shadow={false}
          hovering={false}
          pointRight={this.state.active}
          onClick={this.toggleDropdown.bind(this)}>
        </Button>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    )
  }

}

FilterList.defaultProps = {
  active: false,
  text: 'Label',
  list: [],
  onChange: undefined,
}

export default FilterList
