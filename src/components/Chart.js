import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Brush,
  ReferenceLine
} from 'recharts'

class Chart extends React.Component {

  render() {
    return (
      <ResponsiveContainer width='90%' height={200}>
        <BarChart data = {this.props.chartData} maxBarSize={20}>
          <XAxis
            dataKey = 'time'
            domain = {['auto', 'auto']}
            name = 'Time'
            tickFormatter = {(time) => moment(time).format('YY')}
            type = 'number'
          />
          <YAxis dataKey = 'count' name = 'Count' />
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip labelFormatter = {(time) => moment(time).format('MM-YY')}/>
          <ReferenceLine y={0} stroke='#000'/>
          <Brush dataKey='time' height={30} stroke="#ed6000"/>
          <Bar dataKey = "count" fill="#ed6000" name = 'Values'/>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

Chart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number
    })
  ).isRequired
}

export default Chart
