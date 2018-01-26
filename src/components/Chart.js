import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Label,
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
            height={40}
            dataKey='key'
            domain={['auto', 'auto']}
            name='Time'
            tickFormatter={(time) => moment(time).format(`MMM 'YY`)}
            type='number'>
            <Label value="Date of publication" offset={5} height={50} position="insideBottom" />
          </XAxis>
          <YAxis dataKey='doc_count' name='Number of Documents'>
            <Label value='Documents' offset={15} angle={-90} position='insideLeft' style={{textAnchor: 'middle'}} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip labelFormatter = {(time) => moment(time).format(`MMM 'YY`)}/>
          <ReferenceLine y={0} stroke='#000'/>
          <Brush dataKey='key' tickFormatter={(time) => moment(time).format(`MMM 'YY`)} height={30} stroke="#ed6000" onChange={(indexes) => this.props.handleBrushChange(indexes, this.props.chartData)} data={this.props.chartData}/>
          <Bar dataKey= "doc_count" fill="#ed6000" name='Documents'/>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

Chart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      doc_count: PropTypes.number
    })
  ).isRequired,
  handleBrushChange: PropTypes.func.isRequired
}

export default Chart
