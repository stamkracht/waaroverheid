import React from 'react'
import {Link} from 'react-router-dom'

import Button from './Button'
import Container from './Container'
import SearchBox from './SearchBox'
import '../styles/municipalities.css'


class Municipalities extends React.Component {

  handleOnClick() {
    this.props.showLocation()
  }

  handleOnType(q) {
    let query = q.toLowerCase();
    this.props.filter(query)
  }

  handleOnSubmit() {
    if ( this.props.list.length > 0) {
      const item = this.props.list[0];
      this.props.select(item.code, item.name)
    }
  }

  renderHeader() {
    return (
      <div className='c-municipalities--header'>
        <h1>WaarOverheid</h1>
        <div className='c-button--wrapper'>
          <Button
            text='Gebruik mijn locatie'
            textAlign='center'
            icon='location'
            iconPosition='right'
            loading={this.props.loading}
            onClick={this.handleOnClick.bind(this)} />
        </div>
      </div>
    )
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
        <Link to={item.code} key={item.code}>
          <Container shadow={true}>
            <div className='c-municipality'>
              <h4>{item.name}</h4>
            </div>
          </Container>
        </Link>
      )
    })
  }

  render() {
    return (
      <div className='c-municipalities'>
        {this.renderHeader()}
        {this.renderSearch()}
        {this.renderList()}
      </div>
    )
  }
}

Municipalities.defaultProps = {
  loading: false,
  list: [],
  filter: undefined,
  select: undefined,
  showLocation: undefined,
};

export default Municipalities
