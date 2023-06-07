"use client";
import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft, zoom } from "d3";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 500;
    const height = 300;

    // Create SVG container
    const svg = select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Define scales and axis
    const xScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.value))])
      .range([height, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    // Draw bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "steelblue");

    // Add axis to the chart
    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    svg.append("g").call(yAxis);

    // Enable zooming and panning
    const zoomBehavior = zoom().scaleExtent([1, 10]).on("zoom", zoomed);

    svg.call(zoomBehavior);

    function zoomed(event) {
      const { transform } = event;
      svg.attr("transform", transform);
    }

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data]);

  return <div ref={chartRef} />;
};

export default ChartComponent;
