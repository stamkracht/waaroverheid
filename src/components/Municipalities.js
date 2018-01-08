import React from 'react'

import Container from './Container'
import SearchBox from './SearchBox'
import '../styles/municipalities.css'


class Municipalities extends React.Component {

  handleOnType(q) {
    this.props.filter(q)
  }

  handleOnSubmit() {
    if ( this.props.list.length === 1 ) {
      this.props.select(this.props.list[0].code)
    }
  }

  renderSearch() {
    return (
      <SearchBox
        onType={this.handleOnType.bind(this)}
        onSubmit={this.handleOnSubmit.bind(this)}>
      </SearchBox>
    )
  }

  renderList() {
    return this.props.list.map(item => {
      return (
        <Container shadow={true} key={item.code}>
          <div className='c-municipality'
            onClick={() => this.props.select(item.code)}>
            <h4>{item.name}</h4>
          </div>
        </Container>
      )
    })
  }

  render() {
    return (
      <div className='c-municipalities'>
        {this.renderSearch()}
        {this.renderList()}
      </div>
    )
  }
}

Municipalities.defaultProps = {
  list: [],
  filter: undefined,
  select: undefined,
}

export default Municipalities
