/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const Graph = ({ data,machinetype,from,to}) => {
  const machinetypes={
    'gcs':'Green Compression Strength',
    'comp':'Compactibility',
    'moist':'Moisture',
    'perm':'Permiability',
    'temp':'Temperature'
  }
  const maxmin={
    'gcs':100,
    'comp':3,
    'moist':0.2,
    'perm':10,
    'temp':3
  }
  const dataFormat={
    name:"",
    SC1:"",
    WL1:"",
    WL2:"",
    SC2:""
  }
  const [thresholdvalues,setThreshold]=useState(dataFormat)

  useEffect(() => {
    async function fetch(){
      try{
        const result=await axios.get(import.meta.env.VITE_API_GETTHRESHOLDDATA_ENDPOINT+'/'+machinetypes[machinetype])
        setThreshold(result.data.data[0])
      }
      catch(err){
        const navigate=useNavigate()
        alert('Error fetching threshold')
        navigate('/analytics')
      }
    }
    fetch()
    

  }, [data]);

  useEffect(()=>{
    plotGraphByVarun()
  },[thresholdvalues])

  function plotGraphByVarun(){
    const plotData = [
      {
        x: data[0],
        y: data[1],
        mode: 'lines+markers',
      },
    ];

    const shapes = [
      {
        type: 'rect',
        x0: from+" 00:00:00",
        x1: to+" 23:59:59",
        y0:( Number(thresholdvalues.SC1)-maxmin[machinetype]),
        y1: Number(thresholdvalues.SC1),
        fillcolor: 'red',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        x0: from+" 00:00:00",
        x1: to+" 23:59:59",
        y0: Number(thresholdvalues.SC1),
        y1: Number(thresholdvalues.WL1),
        fillcolor: 'yellow',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        x0: from+" 00:00:00",
        x1: to+" 23:59:59",
        y0: Number(thresholdvalues.WL1),
        y1: Number(thresholdvalues.WL2),
        fillcolor: 'green',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        x0: from+" 00:00:00",
        x1: to+" 23:59:59",
        y0: Number(thresholdvalues.WL2),
        y1: Number(thresholdvalues.SC2),
        fillcolor: 'yellow',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        x0: from+" 00:00:00",
        x1: to+" 23:59:59",
        y0: Number(thresholdvalues.SC2),
        y1: (Number(thresholdvalues.SC2)+maxmin[machinetype]),
        fillcolor: 'red',
        opacity: 0.5,
        layer: 'below',
      },
    ];

    const annotations = [];
    for (let i = 0; i < data[0].length; i++) {
      const value = data[1][i];
      if (value >= thresholdvalues.SC2 || value <= thresholdvalues.SC1) {
        annotations.push({
          x: data[0][i],
          y: value,
          text: `Value: ${value.toFixed(1)}`,
          showarrow: true,
          arrowhead: 2,
          arrowsize: 1,
          arrowwidth: 2,
          arrowcolor: 'black',
          opacity: 0.7,
          bgcolor: 'lightgray',
          bordercolor: 'black',
          borderwidth: 2,
        });
      }
    }

    const layout = {
      title: 'Run Chart',
      xaxis: { title: 'Date Time' },
      yaxis: {
        title: `${machinetypes[machinetype]}`,
        range: [(Number(thresholdvalues.SC1)-maxmin[machinetype]), (Number(thresholdvalues.SC2)+maxmin[machinetype])],
      },
      showlegend: false,
      shapes,
      annotations,
    };

    Plotly.newPlot('plotlyChart', plotData, layout);
  }

  return (
    <>
    <div id="plotlyChart" />
    </>
  );
};

export default Graph;