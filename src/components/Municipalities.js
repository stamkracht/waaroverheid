import React from 'react'
import '../styles/municipalities.css'
import MunicipalitiesHeader from './MunicipalitiesHeader'
import MunicipalitiesSearch from './SearchMunicipalities'
import MunicipalitiesList from './ListMunicipalities'


class Municipalities extends React.Component {

  componentWillMount() {
    this.props.getMunicipalities()
  }

  componentWillUpdate(props) {
    if(props.code) {
      this.props.changePage(props.code)
    }
  }

  async showUserLocation() {
    this.props.getUserLocation()
    // this.props.showUserLocation();
    // try {
    //   let code = await this.MapService.getUserLocation().catch(e => {throw Error(e)})
    //   this.props.resetUserLocation();
    //   this.props.changePage(code);      
    // } catch(e) {
    //   this.props.showUserLocationError()      
    // }
  }

  render() {
    const {
      changePage,
      loadingLocation,
      municipalities,
      filterMunicipalities,
      getUserLocation,
      chooseMunicipality
    } = this.props;  

    return  (
      <div className='c-municipalities'>
        <MunicipalitiesHeader 
          showUserLocation={getUserLocation}
          loadingLocation={loadingLocation}/>

        <MunicipalitiesSearch
          filterMunicipalities={filterMunicipalities}      
          municipalities={municipalities}
          chooseMunicipality={chooseMunicipality}/>
        
        <MunicipalitiesList
          changePage={changePage}
          municipalities={municipalities} />    
      </div>     
    )
  }
}

Municipalities.defaultProps = {
  showUserLocation: false,
  municipalities: {},
  filterMunicipalities: undefined,
  handleOnSubmit: undefined,
  loadingLocation: false,
};

export default Municipalities
