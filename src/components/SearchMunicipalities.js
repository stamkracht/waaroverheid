import React from 'react'
import SearchBox from './SearchBox'

const SearchMunicipalities = ({filterMunicipalities, municipalities, chooseMunicipality}) => {
    return (
      <SearchBox
        onType={(query) => filterMunicipalities(query.toLowerCase(), municipalities)}
        onSubmit={() => chooseMunicipality(municipalities)}>
      </SearchBox>
    )
  }
  

  SearchMunicipalities.defaultProps = {
    filterMunicipalities: null,
    municipalities: [],
    chooseMunicipality: null
  };
  
  export default SearchMunicipalities
  