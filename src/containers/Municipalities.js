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
      await this.setState({loadingLocation: true});
      let code = await this.MapService.getUserLocation();
      this.props.history.push(`/${code}`);      
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

  render() {
    return  (
        <Municipalities
          history={this.props.history}
          loading={this.state.loadingLocation}
          list={this.state.municipalities}
          filter={this.filterMunicipalities.bind(this)}
          showLocation={this.showUserLocation.bind(this)} />
      )
  }
}

export default MunicipalitiesContainer
