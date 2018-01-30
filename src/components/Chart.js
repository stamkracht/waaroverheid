import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/nl';

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

const Chart = ({chartData, handleBrushChange}) => {
    return (
      <ResponsiveContainer width='90%' height={200}>
        <BarChart data = {chartData} maxBarSize={20}>
          <XAxis
            height={40}
            dataKey='key'
            domain={['auto', 'auto']}
            name='Time'
            tickFormatter={(time) => moment(time).format(`MMM 'YY`)}
            type='number'>
            <Label value="Publicatiedatum" offset={5} height={50} position="insideBottom" />
          </XAxis>
          <YAxis dataKey='doc_count' name='Aantal zoekresultaten'>
            <Label value='Documenten' offset={12} angle={-90} position='insideLeft' style={{textAnchor: 'middle'}} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip labelFormatter = {(time) => moment(time).format(`MMM 'YY`)}/>
          <ReferenceLine y={0} stroke='#000'/>
          <Brush 
            dataKey='key' 
            tickFormatter={(time) => moment(time).format(`MMM 'YY`)} 
            height={30} 
            stroke="#ed6000"
            onChange={(indexes) => handleBrushChange(indexes, chartData)} 
            data={chartData}/>
          <Bar dataKey= "doc_count" fill="#ed6000" name='Documenten'/>
        </BarChart>
      </ResponsiveContainer>
    )
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
