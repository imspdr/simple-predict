import { ResponsiveLine } from "@nivo/line";
import { TimeseriesDatas, PredictionData, TimeseriesData } from "@src/store/types";
import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";

export default function TimeseriesChart(props: {
  width: number;
  height: number;
  selectedCode: string;
  data: TimeseriesDatas;
}) {
  const givenData = props.data.given;
  const predictionData = props.data.predicted;
  const colors = [
    "hsl(230, 70%, 50%)",
    "hsl(201, 70%, 50%)",
    "hsl(201, 70%, 50%, 0.3)",
    "hsl(201, 70%, 50%, 0.3)",
    "hsl(265, 70%, 50%, 0.3)",
  ];

  return (
    <div
      css={css`
        width: ${props.width}px;
        height: ${props.height}px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {givenData && predictionData && (
        <>
          {props.data.status === "success" ? (
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
                  data: givenData.map((dot: TimeseriesData, index: number) => {
                    return {
                      x: index,
                      y: dot.y,
                    };
                  }),
                },
                {
                  id: "predicted",
                  color: "hsl(201, 70%, 50%)",
                  data: predictionData.map((dot: PredictionData, index: number) => {
                    return {
                      x: index + givenData.length,
                      y: dot.yhat,
                    };
                  }),
                },
                {
                  id: "predicted_upper",
                  color: "hsl(201, 70%, 50%, 0.05)",
                  data: predictionData.map((dot: PredictionData, index: number) => {
                    return {
                      x: index + givenData.length,
                      y: dot.yhat_upper,
                    };
                  }),
                },
                {
                  id: "predicted_lower",
                  color: "hsl(201, 70%, 50%, 0.05)",
                  data: predictionData.map((dot: PredictionData, index: number) => {
                    return {
                      x: index + givenData.length,
                      y: dot.yhat_lower,
                    };
                  }),
                },
                {
                  id: "trend",
                  color: "hsl(265, 70%, 50%, 0.05)",
                  data: predictionData.map((dot: PredictionData, index: number) => {
                    return {
                      x: index + givenData.length,
                      y: dot.trend,
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
          ) : (
            <CircularProgress />
          )}
        </>
      )}
    </div>
  );
}
