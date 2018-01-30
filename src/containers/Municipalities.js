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

  cacheNames(geoResponse) {
    if (geoResponse.properties) {
      // eslint-disable-next-line
      ['GM', 'WK', 'BU'].map(prefix => {
        const name = geoResponse.properties[`${prefix}_NAAM`];
        const code = geoResponse.properties[`${prefix}_CODE`];
        if (name) {
          this.state.namesByCode.set(code, name);
        }
      });
    } else {
      // eslint-disable-next-line
      geoResponse.features.map(feature => {
          // eslint-disable-next-line
          ['GM', 'WK', 'BU'].map(prefix => {
            const name = feature.properties[`${prefix}_NAAM`];
            const code = feature.properties[`${prefix}_CODE`];
            if (name) {
              this.state.namesByCode.set(code, name);
            }
          })
        }
      )
    }
  }

  async showUserLocation() {
      await this.setState({loadingLocation: true});
      let [code, name] = await this.MapService.getUserLocation();
      const geo = await this.MapService.getFeatures(code);
      this.cacheNames(geo);
      const adjacent = await this.MapService.getAdjacentFeatures(code);
      this.setState({loadingLocation: false, geo, adjacent, code, name})
  }

  filterMunicipalities(q) {
    let municipalities = this.allMunicipalities.filter(item => {
      let name = item.name.toLowerCase();
      return name.indexOf(q) >= 0 || levenshtein(name, q) <= 2
    }).sort((a, b) => {
      if ( a.name < b.name ) { return -1 }
      if ( a.name > b.name ) { return 1 }
      return 0
    });
    this.setState({municipalities})
  }

  render() {
    return  (
        <Municipalities
          loading={this.state.loadingLocation}
          list={this.state.municipalities}
          filter={this.filterMunicipalities.bind(this)}
          showLocation={this.showUserLocation.bind(this)} />
      )
  }
}

export default MunicipalitiesContainer
