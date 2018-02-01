import React from 'react'
import {Link} from 'react-router-dom'

import Button from './Button'
import Container from './Container'
import SearchBox from './SearchBox'
import '../styles/municipalities.css'

const Header = ({loadingLocation, showUserLocation}) => {
  return (
    <div className='c-municipalities--header'>
      <h1>WaarOverheid</h1>
      <div className='c-button--wrapper'>
        <Button
          text='Gebruik mijn locatie'
          textAlign='center'
          icon='location'
          iconPosition='right'
          loading={loadingLocation}
          onClick={showUserLocation} />
      </div>
    </div>
  )
}

const Search = ({filterMunicipalities, municipalities, handleOnSubmit}) => {
  return (
    <SearchBox
      onType={(query) => filterMunicipalities(query.toLowerCase())}
      onSubmit={() => handleOnSubmit(municipalities)}>
    </SearchBox>
  )
}

const List = ({municipalities}) => {
  return municipalities.map(item => {
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

const Municipalities =({showUserLocation, filterMunicipalities, municipalities, loadingLocation, handleOnSubmit}) => {
  return (
    <div className='c-municipalities'>
      <Header 
        showUserLocation={showUserLocation}
        loadingLocation={loadingLocation}/>

      <Search
        filterMunicipalities={filterMunicipalities}      
        municipalities={municipalities}
        handleOnSubmit={handleOnSubmit}/>
      
      <List
        municipalities={municipalities} />    
    </div>
  )
}

Municipalities.defaultProps = {
  showUserLocation: false,
  municipalities: [],
  filterMunicipalities: undefined,
  handleOnSubmit: undefined,
  loadingLocation: false,
};

export default Municipalities
