import React from 'react'

import Button from './Button'
import Checkbox from './Checkbox'
import Badge from './Badge'
import '../styles/filterList.css'
import ListItem from './ListItem'

class FilterList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checked: false,
      activeBadge: false,
      pointRight: true,
    }
  }

  toggleDropdown = () => {
    this.setState({pointRight: !this.state.pointRight})
  }

  renderItems() {
    return this.props.filters.map((item, id) => {
      return <ListItem key={id} id={`${item}-${id}`} label={item} />
    })
  }

  renderFilters() {
    return (
      <div>
        <Button
          text={this.props.text}
          icon='arrow'
          iconPosition='left'
          textAlign='left'
          hovering={false}
          pointRight={this.state.pointRight}
          onClick={this.toggleDropdown}/>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className='menus'>
        {this.renderFilters()}
      </div>
    )
  }

}

FilterList.defaultProps = {
  text: 'Label',
  filters: [],
}

export default FilterList
