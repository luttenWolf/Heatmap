import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function randomNumbers() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 1);
}

const data = [
  { day: "Mon", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
  { day: "Tue", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
  { day: "Wen", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
  { day: "Thu", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
  { day: "Fri", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
  { day: "Sat", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
  { day: "Sun", Frequency: { AM: randomNumbers(), PM: randomNumbers() } },
];


const Heatmap = () => {
  const Chart = useRef();
  const Dimensions = {
    width: 800,
    height: 600,
    margin: { top: 130, left: 50, bottom: 70, right: 50 }
  };
  const rectSize = 30

const colors =[{Range: '1-20', Color: "#FFFFFF"},
   { Range: '20-40', Color: "#FFF7DF"},
    {Range: '40-60', Color: "#FFE7BE"},
    {Range: '60-80', Color: "#FFC140"},
    {Range: '80-100', Color: "#FF0000"}]

    function colorAssign(d){
        if(d <= 100 && d > 80) return '#FF0000'
        else if (d <= 80 && d > 60) return '#FFC14D'
        else if (d <= 60 && d > 40) return '#FFC14D'
        else if (d <= 40 && d > 20) return '#FFC14D'
        else return '#FFFFFF'
     
    }
  
    function generateHeat(){

        
    }

        useEffect(() => {
            // set svg size and position
            const svg = d3
              .select(Chart.current)
              .attr("width", Dimensions.width)
              .attr("height", Dimensions.height)
        
        
            const x = d3
              .scaleLinear()
              .domain([0, data.length])
              .range([0, Dimensions.width]);
        
            // days
             svg.append('g')
             .selectAll('tex')
             .data(data)
             .join('text')
             .text(d => `${d.day}`)
             .attr('x', (d,i) => x(i) + Dimensions.margin.left)
             .attr('y', Dimensions.height - Dimensions.margin.bottom)
             .attr('fill', 'white')
             .style('font-size', 14)
        
            // blocks
        
            data.forEach((day,i)=>{
                // before noon
                svg.append('g')
                .selectAll('rect')
                .data(day.Frequency.AM)
                .join('rect')
                .attr('x', x(i) + Dimensions.margin.left)
                .attr('y', (d,j)=> j*(rectSize + 2) +Dimensions.margin.top)
                .attr('width', rectSize)
                .attr('height', rectSize)
                .attr('fill', d => colorAssign(d))
        
                // afternoon
                svg.append('g')
                .selectAll('rect')
                .data(day.Frequency.PM)
                .join('rect')
                .attr('x', x(i) + Dimensions.margin.left + rectSize + 2)
                .attr('y', (d,j)=> j*(rectSize + 2) +Dimensions.margin.top)
                .attr('width', rectSize)
                .attr('height', rectSize)
                .attr('fill', d => colorAssign(d))
                
                
            })
            
            //Title
            svg.append('text')
            .text('Heatmap Calendar')
            .attr('x', Dimensions.width/2-50)
            .attr('y', Dimensions.height /10)
            .attr('fill', 'white')
            .style('font-size', 20)
              
           
          });

 

  return (
    <div>
      {console.log(data)}
      <svg ref={Chart}> </svg>
    </div>
  );
};
export default Heatmap;
