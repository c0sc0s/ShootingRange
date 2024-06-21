import React from "react";
import { Chart, Tooltip, Legend, Facet } from "bizcharts";

const getTypeColor = (type) => {
  return "#A9F475";
};

const data = [
  {
    class: "前5名",
    country: "队伍1",
    type: "1",
    value: 24.7,
  },
  {
    class: "前5名",
    country: "队伍2",
    type: "1",
    value: 24.7,
  },
  {
    class: "前5名",
    country: "队伍3",
    type: "2",
    value: 75.3,
  },
  {
    class: "前5名",
    country: "队伍4",
    type: "1",
    value: 61.6,
  },
  {
    class: "前5名",
    country: "队伍5",
    type: "2",
    value: 38.4,
  },
].sort((a, b) => a.value - b.value);

export default function Demo2() {
  return (
    <div className="-translate-x-4">
      <Chart autoFit data={data} height={300} padding={[20, 20, 20, 70]}>
        <Legend visible={false} />
        <Tooltip showMarkers={false} />
        <Facet
          fields={["class"]}
          type="rect"
          columnTitle={{
            style: {
              fontSize: 14,
              fontWeight: 300,
              fill: "#A9F475",
            },
          }}
          eachView={(view, facet) => {
            view.coordinate().transpose();

            if (facet.columnIndex === 0) {
              view.axis("country", {
                tickLine: null,
                line: null,
              });
              view.axis("value", false);
            } else {
              view.axis(false);
            }
            const color = getTypeColor(facet.columnValue);
            view
              .interval()
              .adjust("stack")
              .position("country*value")
              .color("type", [color])
              .size(20)
              .label("value*type", (value, type) => {
                if (type === "2") {
                  return null;
                }
                const offset = value < 30 ? 10 : -4;
                return {
                  offset,
                };
              });
            view.interaction("element-active");
          }}
        />
      </Chart>
    </div>
  );
}
