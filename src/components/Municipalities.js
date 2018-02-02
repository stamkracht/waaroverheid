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

const Search = ({filterMunicipalities, municipalities, chooseMunicipality}) => {
  return (
    <SearchBox
      onType={(query) => filterMunicipalities(query.toLowerCase(), municipalities)}
      onSubmit={() => chooseMunicipality(municipalities)}>
    </SearchBox>
  )
}

const List = ({municipalities, changePage}) => {
  return municipalities.map((item, i) => {
    return (
      <Container key={i} shadow={true}>
        <div className='c-municipality' onClick={() => changePage(item.code)}>
          <h4>{item.name}</h4>
        </div>
      </Container>
    )
  })
}

const Municipalities =({showUserLocation, filterMunicipalities, municipalities, loadingLocation, chooseMunicipality, changePage}) => {

  return (
    <div className='c-municipalities'>
      <Header 
        showUserLocation={showUserLocation}
        loadingLocation={loadingLocation}/>

      <Search
        filterMunicipalities={filterMunicipalities}      
        municipalities={municipalities}
        chooseMunicipality={chooseMunicipality}/>
      
      <List
        changePage={changePage}
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
