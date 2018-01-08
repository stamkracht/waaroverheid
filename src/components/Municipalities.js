import React from 'react'

import Container from './Container'
import SearchBox from './SearchBox'
import '../styles/municipalities.css'


class Municipalities extends React.Component {

  renderSearch() {
    return (
      <SearchBox />
    )
  }

  renderList() {
    return this.props.list.map(item => {
      return (
        <Container shadow={true} key={item.code}>
          <div className='c-municipality' key={item.code}>
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
}

export default Municipalities
