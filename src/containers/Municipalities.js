import React from 'react'

import MapService from '../services/MapService'
import Municipalities from '../components/Municipalities'


class MunicipalitiesContainer extends React.Component {

  constructor(props) {
    super(props);    
    this.MapService = new MapService();
  }

  async componentDidMount() {
    const municipalities = await this.MapService.getMunicipalities();
    this.props.setInitialMunicipalities(municipalities)
   }

  async showUserLocation() {
    this.props.showUserLocation();
    try {
      let code = await this.MapService.getUserLocation().catch(e => {throw Error(e)})
      this.props.resetUserLocation();
      this.props.changePage(code);      
    } catch(e) {
      this.props.showUserLocationError()      
    }
  }

  render() {
    const {
      changePage,
      history,
      loadingLocation,
      municipalities,
      filterMunicipalities,
      showUserLocation,
      chooseMunicipality
    } = this.props;  

    return  (
        <Municipalities
          changePage={changePage}
          history={history}
          loadingLocation={loadingLocation}
          municipalities={municipalities}
          filterMunicipalities={filterMunicipalities}
          showUserLocation={this.showUserLocation.bind(this)}
          chooseMunicipality={chooseMunicipality}/>
      )
  }
}

MunicipalitiesContainer.defaultProps = {
  showUserLocation: false,
  municipalities: {},
  filterMunicipalities: undefined,
  handleOnSubmit: undefined,
  loadingLocation: false,
};

export default MunicipalitiesContainer
