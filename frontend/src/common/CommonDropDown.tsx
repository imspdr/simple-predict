import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState, useEffect, useCallback, useRef } from "react";
import { ReactComponent as DropIcon } from "@src/images/dropdown.svg";

export default function CommonDropDown(props: {
  nodes: {
    label: string;
    value: string;
  }[];
  selected: string;
  onSelect: (v: string) => void;
  id: string;
  height?: number;
  maxHeight?: number;
  width?: number;
  search?: boolean;
  customCss?: string;
}) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const MINHEIGHT = 20;
  const MINWIDTH = 50;

  useEffect(() => {
    setSearchText("");
  }, [open]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const thisElement = document.getElementById(`common-dropdown-${props.id}`);
      const clickedElement = event.target as HTMLDivElement;
      if (!thisElement?.contains(clickedElement)) setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const RenderNodes = useCallback(() => {
    return (
      <>
        {props.nodes
          .filter((node) => node.label.includes(searchText))
          .map((node) => {
            if (node.value !== props.selected) {
              return (
                <div
                  key={`common-dropdown-${props.id}-${node.label}-${node.value}`}
                  css={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-width: ${MINWIDTH}px;
                    min-height: ${MINHEIGHT}px;
                    ${props.height && `height: ${props.height}px;`}
                    ${props.width && `width: ${props.width}px;`}
                    padding: 5px 10px;
                    border: 1px solid;
                    border-top: 0px;
                  `}
                  onClick={() => {
                    props.onSelect(node.value);
                    setOpen(false);
                  }}
                >
                  {node.label}
                </div>
              );
            } else {
              return <></>;
            }
          })}
      </>
    );
  }, [searchText, props.selected]);

  return (
    <div
      id={`common-dropdown-${props.id}`}
      css={css`
        ${props.customCss && props.customCss}
        display: flex;
        flex-direction: column;
        position: relative;
        ${unselectable}
      `}
    >
      <div
        css={css`
          border: 2px solid;
          padding: 5px 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          min-width: ${MINWIDTH}px;
          min-height: ${MINHEIGHT}px;
          ${props.height && `height: ${props.height}px;`}
          ${props.width && `width: ${props.width}px;`}
          ${unselectable}
        `}
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        {props.nodes.find((node) => node.value === props.selected)?.label}
        <DropIcon width="15px" height="15px" />
      </div>
      {open && (
        <div
          css={css`
            position: absolute;
            top: ${props.height ? `${props.height + 14}px` : "38px"};
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-size: 15px;
            z-index: 9998;
          `}
        >
          {props.search && (
            <input
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                min-width: ${MINWIDTH}px;
                min-height: ${MINHEIGHT}px;
                ${props.height && `height: ${props.height}px;`}
                ${props.width && `width: ${props.width}px;`}
                padding: 5px 10px;
                border: 1px solid;
                border-top: 0px;
                margin-left: 1px;
              `}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="검색"
            />
          )}
          <div
            css={css`
              max-height: ${props.maxHeight ? `${props.maxHeight}px` : "500px"};
              overflow: auto;
              border: 1px solid;
            `}
          >
            <RenderNodes />
          </div>
        </div>
      )}
    </div>
  );
}
