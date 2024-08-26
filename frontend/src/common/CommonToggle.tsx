import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState } from "react";

export default function CommonToggle(props: {
  value: number;
  labels: string[];
  setValue: (v: number) => void;
  width?: number;
  height?: number;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        ${unselectable}
      `}
    >
      {props.labels.map((label, index) => {
        return (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;

              width: ${props.width ? props.width : props.labels.length * 100}px;
              height: ${props.height ? props.height : 30}px;
              border: ${index === props.value ? "3px solid" : "1px solid"};
              padding: ${index === props.value ? "3px 8px" : "5px 10px"};
            `}
            onClick={() => props.setValue(index)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
