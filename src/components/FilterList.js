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
      return this.props.list.map((item, i) => {
        return (
          <ListItem
            key={i}
            id={`${item.name}-${i}`}
            label={item.name}
            checked={item.active}
            onChange={checked => item.active = checked} />
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
}

export default FilterList
