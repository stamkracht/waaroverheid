import React from 'react'

import Checkbox from './Checkbox'
import Badge from './Badge'
import '../styles/filterList.css'

class ListItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checked: false,
      activeBadge: false,

    }
  }

  handleChange = () => {
    console.log('hey')
    this.setState({checked: !this.state.checked})
  }

  render() {
    return (
        <li>
          <Checkbox
            label='Filter 1'
            active={this.state.checked}
            onChange={this.handleChange} />
          <Badge />
        </li>
    )
  }
}

export default ListItem
