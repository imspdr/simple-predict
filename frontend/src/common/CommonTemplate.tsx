import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { unselectable } from "@src/common/util";
import { ReactComponent as CloseIcon } from "@src/images/close.svg";

export default function CommonTemplate(props: {
  title: string;
  children: JSX.Element;
  width?: number;
}) {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        margin: 2px;
        min-height: 500px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          font-size: 20px;
          ${unselectable}
        `}
      >
        {props.title}
      </div>
      <div
        css={css`
          margin-top: 10px;
        `}
      >
        {props.children}
      </div>
    </div>
  );
}
