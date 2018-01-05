import React from 'react'

import Button from './Button'
import '../styles/filterList.css'
import ListItem from './ListItem'

class FilterList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      pointRight: true,
    }
  }

  toggleDropdown() {
    this.setState({pointRight: !this.state.pointRight})
  }

  renderItems() {
    return this.props.filters.map((item, id) => {
      return <ListItem key={id} id={`${item}-${id}`} label={item} />
    })
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
          pointRight={this.state.pointRight}
          onClick={this.toggleDropdown.bind(this)}>
        </Button>
        <ul>
          {!this.state.pointRight && this.renderItems()}
        </ul>
      </div>
    )
  }

}

FilterList.defaultProps = {
  text: 'Label',
  filters: [],
}

export default FilterList
