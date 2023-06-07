import ChartComponent from "@/app/components/charts/ChartComponent";

const chartData = [
  { label: "A", value: 10 },
  { label: "B", value: 20 },
  { label: "C", value: 15 },
  { label: "D", value: 8 },
  { label: "E", value: 12 },
];

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Page = () => {
  return (
    <div>
      <h3 style={containerStyle}>Custom Chart - You can Drag and Zoom</h3>
      <ChartComponent data={chartData} />
    </div>
  );
};

export default Page;
