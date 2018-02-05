import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getMunicipalities,
  filterMunicipalities,
  showUserLocation,
  showUserLocationError,
  resetUserLocation,
  getUserLocation
} from '../../actions'
import Municipalities from '../../components/Municipalities'

const chooseMunicipality = municipalities => municipalities.length ? push(`${municipalities[0].code}`) : null;
const mapStateToProps = state => {
  return {
      municipalities: state.municipalities.filtered,
      term: state.municipalities.term,
      loadingLocation: state.municipalities.loadingLocation,
      loadingLocationError: state.municipalities.loadingLocationError,
      code: state.municipalities.location
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (code) => push(`/${code}`),
  getMunicipalities,
  filterMunicipalities,
  chooseMunicipality,
  showUserLocation,
  showUserLocationError,
  resetUserLocation,
  getUserLocation
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Municipalities)