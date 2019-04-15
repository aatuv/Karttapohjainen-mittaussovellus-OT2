import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

export class Graafit extends Component {

// lämpötila-graafin ehdot
  getLOption = () => ({
    title: {
      text: 'Lämpötila'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      name: 'aika',
      nameLocation: 'center',
      nameTextStyle: {fontSize: 16, fontWeight: 'bold'}, 
      nameGap: 30,
      data: this.props.ajat
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      min: 'dataMin',
      name: '°C',
      nameRotate: 90,
      nameLocation: 'center',
      nameTextStyle: {fontSize: 16, fontWeight: 'bold'}, 
      nameGap: 45
    },
    series: [{
      data: this.props.lampotilat,
      type: 'line',
      sampling: 'average'
    }]
  })

// ilmanpaine-graafin ehdot
  getPOption = () => ({
    title: {
      text: 'Ilmanpaine'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      name: 'aika',
      nameLocation: 'center',
      nameTextStyle: {fontSize: 16, fontWeight: 'bold'}, 
      nameGap: 30,
      data: this.props.ajat
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      min: 'dataMin',
      name: 'hPa',
      nameRotate: 90,
      nameLocation: 'center',
      nameTextStyle: {fontSize: 16, fontWeight: 'bold'}, 
      nameGap: 45
    },
    series: [{
      data: this.props.paineet,
      type: 'line'
    }]
  })

// ilmankosteus-graafin ehdot
  getKOption = () => ({
    title: {
      text: 'Ilmankosteus'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      name: 'aika',
      nameLocation: 'center',
      nameTextStyle: {fontSize: 16, fontWeight: 'bold'}, 
      nameGap: 30,
      data: this.props.ajat
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      min: 'dataMin',
      name: 'Ilman suhteellinen kosteus %',
      nameRotate: 90,
      nameLocation: 'center',
      nameTextStyle: {fontSize: 16, fontWeight: 'bold'}, 
      nameGap: 45
    },
    series: [{
      data: this.props.kosteudet,
      type: 'line'
    }]
  })
  render() {
    return (
      <div>
        <ReactEcharts option={this.getLOption()} style={{ width: '100%', height: 400 }} />
        <ReactEcharts option={this.getPOption()} style={{ width: '100%', height: 400 }} />
        <ReactEcharts option={this.getKOption()} style={{ width: '100%', height: 400 }} />
      </div>
    )
  }
}

Graafit.propTypes = {
  lampotilat: PropTypes.array,
  ajat: PropTypes.array,
  kosteudet: PropTypes.array,
  paineet: PropTypes.array,
  getMittaukset: PropTypes.func.isRequired
}

export default Graafit
