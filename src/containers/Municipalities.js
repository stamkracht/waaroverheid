import React from 'react'
import levenshtein from 'js-levenshtein'
import MapService from '../services/MapService'
import Municipalities from '../components/Municipalities'
import SearchService from '../services/SearchService'
import FiltersService from '../services/FiltersService'

class MunicipalitiesContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      municipalities: [],
      loadingLocationError: false,
      loadingLocation: false
    };

    this.MapService = new MapService();
    this.allMunicipalities = [];
  }

  async componentDidMount() {
    const municipalities = await this.MapService.getMunicipalities();
    this.allMunicipalities = municipalities;
    this.setState({municipalities})
  }

  async showUserLocation() {
      await this.setState({loadingLocation: true, loadingLocationError: false});
      try {
        let code = await this.MapService.getUserLocation().catch(e => {throw Error(e)})
        this.props.history.push(`/${code}`);      
      } catch(e) {
        //TODO: handle error
        await this.setState({loadingLocation: false, loadingLocationError: true});
      }
  }

  filterMunicipalities(q) {
    let municipalities = this.allMunicipalities
    .filter(item => {
      let name = item.name.toLowerCase();
      return name.indexOf(q) >= 0 || levenshtein(name, q) <= 2
    })
    .sort((a, b) => {
      if ( a.name < b.name ) { return -1 }
      if ( a.name > b.name ) { return 1 }
      return 0
    });
    
    this.setState({municipalities})
  }

  handleOnSubmit(municipalities) {
    if(municipalities.length > 0) {
      const code = municipalities[0].code;
      this.props.history.push(`/${code}`);
    }
  }

  render() {
    return  (
        <Municipalities
          history={this.props.history}
          loadingLocation={this.state.loadingLocation}
          municipalities={this.state.municipalities}
          filterMunicipalities={this.filterMunicipalities.bind(this)}
          showUserLocation={this.showUserLocation.bind(this)} 
          handleOnSubmit={this.handleOnSubmit.bind(this)}/>
      )
  }
}

export default MunicipalitiesContainer
