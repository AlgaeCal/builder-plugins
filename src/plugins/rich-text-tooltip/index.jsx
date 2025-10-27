// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from "@emotion/core"; // Important! This line is necessary for the plugin to work with Builder.io
import { Builder } from "@builder.io/react";
import ReactQuill, { Quill } from "react-quill";
import { useRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Toolbar from "./components/Toolbar";
import Highlight from "../../blots/Highlight";
import Color from "../../blots/Color";
import Link from "../../blots/Link";
import Tooltip from "../../blots/Tooltip";
import "./index.css";

Quill.register({ "formats/mark": Highlight }, true);
Quill.register({ "formats/color": Color }, true);
Quill.register({ "formats/link": Link }, true);
Quill.register({ "formats/tooltip": Tooltip }, true);

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "script",
  "color",
  "highlight",
  "background",
  "tooltip",
];

const RichTextEditor = (props) => {
  const [toolbarId] = useState(
    () => `toolbar-tooltip-${Math.random().toString(36).slice(2, 9)}`
  );
  const editorRef = useRef(null);
  const [hasTooltip, setHasTooltip] = useState(false);

  const modules = {
    toolbar: { container: `#${toolbarId}` },
  };

  const updateTooltipState = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();

    if (range) {
      const formats = editor.getFormat(range);
      const isTooltipActive = !!formats.tooltip;
      setHasTooltip(isTooltipActive);
    } else {
      setHasTooltip(false);
    }
  }, [editorRef]);

  useEffect(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();

    // Listen to selection changes and text changes
    editor.on(Quill.events.SELECTION_CHANGE, updateTooltipState);
    editor.on(Quill.events.TEXT_CHANGE, updateTooltipState);

    updateTooltipState();
    return () => {
      editor.off(Quill.events.SELECTION_CHANGE, updateTooltipState);
      editor.off(Quill.events.TEXT_CHANGE, updateTooltipState);
    };
  }, [updateTooltipState]);

  const insertHighlight = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();
    if (!range) return;

    const { highlight } = editor.getFormat(range);
    editor.formatText(range.index, range.length, "highlight", highlight);
  }, [editorRef]);

  const insertColor = useCallback(
    (color) => {
      if (!editorRef.current) return;
      const editor = editorRef.current.getEditor();
      const range = editor.getSelection();
      if (!range) return;

      const { color: currentColor = "red" } = editor.getFormat(range);
      editor.formatText(
        range.index,
        range.length,
        "color",
        currentColor ? false : color
      );
    },
    [editorRef]
  );

  const insertTooltip = useCallback(
    (background) => {
      if (!editorRef.current) return;
      const editor = editorRef.current.getEditor();
      const range = editor.getSelection();
      if (!range) return;

      const currentFormats = editor.getFormat(range);
      const hasTooltip = !!currentFormats.tooltip;

      editor.formatText(
        range.index,
        range.length,
        "tooltip",
        hasTooltip ? false : { id: "tooltip-id", background }
      );
      editor.formatText(
        range.index,
        range.length,
        "background",
        hasTooltip ? false : { id: "tooltip-id", background }
      );
      setHasTooltip(!hasTooltip);
    },
    [editorRef]
  );

  return (
    <div className="text-editor">
      <Toolbar
        id={toolbarId}
        insertHighlight={insertHighlight}
        insertColor={insertColor}
        insertTooltip={insertTooltip}
        isTooltipActive={hasTooltip}
      />
      <ReactQuill
        ref={editorRef}
        onChange={props.onChange}
        value={props.value}
        modules={modules}
        formats={formats}
        theme={"snow"}
      />
    </div>
  );
};

Builder.registerEditor({
  name: "RichTextTooltip",
  component: RichTextEditor,
});

RichTextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default RichTextEditor;
