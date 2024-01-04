/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useEffect} from 'react'

import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

const Graph = ({ data, WL1, LCL, UCL, SC1, SC2 }) => {
  useEffect(() => {
    const plotData = [
      {
        x: data['shift'],
        y: data['avg'],
        mode: 'lines+markers',
      },
    ];

    const shapes = [
      {
        type: 'rect',
        y0: 0,
        y1: WL1,
        fillcolor: 'red',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        y0: WL1,
        y1: LCL,
        fillcolor: 'yellow',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        y0: LCL,
        y1: UCL,
        fillcolor: 'green',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        y0: UCL,
        y1: SC1,
        fillcolor: 'yellow',
        opacity: 0.5,
        layer: 'below',
      },
      {
        type: 'rect',
        y0: SC1,
        y1: SC2,
        fillcolor: 'red',
        opacity: 0.5,
        layer: 'below',
      },
    ];

    const annotations = [];
    for (let i = 0; i < data['shift'].length; i++) {
      const value = data['avg'][i];
      if (value >= 46 || value <= 38) {
        annotations.push({
          x: data['shift'][i],
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
      xaxis: { title: 'G.C Strength' },
      yaxis: {
        title: 'Batch',
        range: [1000, 1500],
        tickvals: Array.from({ length: 32 }, (_, i) => i * 50),
      },
      showlegend: false,
      shapes,
      annotations,
    };

    Plotly.newPlot('plotlyChart', plotData, layout);
  }, [data, WL1, LCL, UCL, SC1, SC2]);

  return <div id="plotlyChart" />;
};

export default Graph;