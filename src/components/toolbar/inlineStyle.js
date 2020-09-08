/* inlineStyles.js */
import React from "react";
import { inlineStyles } from "./constants";
import styled from "styled-components";
import { ToolbarItem, Container } from "./common";
//Rich utils is a utility library for manipulating text (like inlineStyle, blockTypes...)
import { RichUtils } from "draft-js";

export default function RenderInlineStyles(props) {
  const { editorState, updateEditorState } = props;
  //apply stlye using RichUtils 
  const applyStyle = (e, style) => {
    e.preventDefault();
    //Rich utils returns a new editorState with applied style
    //Make sure to update the main editor state 
    updateEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  /*Check if current style is active under text selection (the position of the cursor under text)*/
  const isActive = style => {
    //currentStyle is a map of currently applied style to selected text
    const currentStyle = editorState.getCurrentInlineStyle();
    //check if current style is among the style map.
    return currentStyle.has(style);
  };
 
  /*  
    Loop through the array where we render each ToolbarItem passing it the active state and the react key prop for optimizing the rendering process and we handle the click event to apply style.
  */
  return (
    <Container>
      {inlineStyles.map((item, idx) => {
        return (
          <ToolbarItem
            isActive={isActive(item.style)}
            key={`${item.label}-${idx}`}
            onClick={e => applyStyle(e, item.style)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        );
      })}
    </Container>
  );
}