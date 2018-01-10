import React from 'react'

import Checkbox from './Checkbox'
import Badge from './Badge'
import '../styles/filterList.css'

class ListItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    }, () => this.props.onChange(this.state.checked))
  }

  render() {
    return (
      <li>
        <Checkbox
          id={this.props.id}
          label={this.props.label}
          active={this.state.checked}
          onChange={this.handleChange} />
        <Badge active={this.state.checked} />
      </li>
    )
  }
}

ListItem.defaultProps = {
  id: Math.round(Math.random()*1000),
  label: 'this is a label',
  onChange: undefined,
}

export default ListItem
