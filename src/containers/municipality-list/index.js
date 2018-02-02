import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  setInitialMunicipalities,
  filterMunicipalities,
  showUserLocation,
  showUserLocationError,
  resetUserLocation
} from '../../actions'
import Municipalities from '../Municipalities'

const chooseMunicipality = municipalities => municipalities.length ? push(`${municipalities[0].code}`) : null;
const mapStateToProps = state => {
  return {
      municipalities: state.municipalities.filtered,
      term: state.municipalities.term,
      loadingLocation: state.municipalities.loadingLocation,
      loadingLocationError: state.municipalities.loadingLocationError
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (code) => push(`/${code}`),
  setInitialMunicipalities,
  filterMunicipalities,
  chooseMunicipality,
  showUserLocation,
  showUserLocationError,
  resetUserLocation
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Municipalities)