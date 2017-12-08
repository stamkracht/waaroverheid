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

  render() {
    return (
      <div className='menus'>
        <Button
          text='Soorten'
          icon='arrow'
          iconPosition='left'
          textAlign='left'
          hovering={false}
          pointRight={this.state.pointRight}
          onClick={this.toggleDropdown}/>
        <ul className='soortenList'>
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <Button
          text='Partijen'
          icon='arrow'
          iconPosition='left'
          textAlign='left'
          hovering={false}
          pointRight={this.state.pointRight}
          onClick={this.toggleDropdown}/>
        <ul className='soortenList'>
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
      </div>
    )
  }

}

export default FilterList
