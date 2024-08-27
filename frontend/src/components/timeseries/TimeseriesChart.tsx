import { ResponsiveLine, Serie } from "@nivo/line";
import { useCallback } from "react";

export default function TimeseriesChart(props: {
  width?: number | string;
  height?: number | string;
  givenData: any;
  targetY: string;
  trigger: number;
  predictionData?: any;
}) {
  const colors = [
    "hsl(230, 70%, 50%)",
    "hsl(201, 70%, 50%)",
    "hsl(201, 70%, 50%, 0.3)",
    "hsl(201, 70%, 50%, 0.3)",
    "hsl(265, 70%, 50%, 0.3)",
  ];

  const Chart = useCallback(() => {
    return (
      <div style={{ width: props.width, height: props.height }}>
        {props.givenData && props.targetY && (
          <ResponsiveLine
            margin={{ right: 150 }}
            colors={colors}
            useMesh={true}
            animate={true}
            curve="linear"
            pointSize={2}
            data={[
              {
                id: "given",
                color: "hsl(230, 70%, 50%)",
                data: props.givenData.map((dot: any, index: number) => {
                  return {
                    x: index,
                    y: dot[props.targetY],
                  };
                }),
              },
              {
                id: "predicted",
                color: "hsl(201, 70%, 50%)",
                data: props.predictionData.map((dot: any, index: number) => {
                  return {
                    x: index + props.givenData.length,
                    y: JSON.parse(dot.result).yhat,
                  };
                }),
              },
              {
                id: "predicted_upper",
                color: "hsl(201, 70%, 50%, 0.05)",
                data: props.predictionData.map((dot: any, index: number) => {
                  return {
                    x: index + props.givenData.length,
                    y: JSON.parse(dot.result).yhat_upper,
                  };
                }),
              },
              {
                id: "predicted_lower",
                color: "hsl(201, 70%, 50%, 0.05)",
                data: props.predictionData.map((dot: any, index: number) => {
                  return {
                    x: index + props.givenData.length,
                    y: JSON.parse(dot.result).yhat_lower,
                  };
                }),
              },
              {
                id: "trend",
                color: "hsl(265, 70%, 50%, 0.05)",
                data: props.predictionData.map((dot: any, index: number) => {
                  return {
                    x: index + props.givenData.length,
                    y: JSON.parse(dot.result).trend,
                  };
                }),
              },
            ]}
            xScale={{
              type: "linear",
              min: "auto",
              max: "auto",
            }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </div>
    );
  }, [props.givenData, props.targetY, props.trigger]);

  return <Chart />;
}
