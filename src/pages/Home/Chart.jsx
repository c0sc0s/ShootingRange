import React from "react";
import {
  Chart,
  Interval,
  Coordinate,
  Legend,
  View,
  Annotation,
} from "bizcharts";

export default function Ring() {
  const data = [
    { type: "已完成", percent: 0.6666 },
    { type: "未完成", percent: 0.3334 },
  ];

  return (
    <div className="w-[300px] h-[300px]">
      <Chart height={200} width={200} padding="auto">
        <Legend />
        <View
          data={data}
          scale={{
            percent: {
              formatter: (val) => {
                return (val * 100).toFixed(2) + "%";
              },
            },
          }}
        >
          <Coordinate type="theta" innerRadius={0.75} />
          <Interval
            position="percent"
            adjust="stack"
            color={["type", ["#1470FB", "#fff"]]}
            size={16}
          />
          <Annotation.Text
            position={["50%", "25%"]}
            content={"排名"}
            style={{
              lineHeight: "240px",
              fontSize: "12",
              fill: "#fff",
              textAlign: "center",
            }}
          />
          <Annotation.Text
            position={["50%", "38%"]}
            content={"3/16"}
            style={{
              lineHeight: "240px",
              fontSize: "16",
              fill: "#1470FB",
              textAlign: "center",
            }}
          />
          <Annotation.Text
            position={["50%", "53%"]}
            content={"完成度"}
            style={{
              lineHeight: "240px",
              fontSize: "12",
              fill: "#fff",
              textAlign: "center",
            }}
          />
          <Annotation.Text
            position={["50%", "66%"]}
            content={"60%"}
            style={{
              lineHeight: "240px",
              fontSize: "24",
              fill: "#1470FB",
              textAlign: "center",
            }}
          />
        </View>
      </Chart>
    </div>
  );
}
