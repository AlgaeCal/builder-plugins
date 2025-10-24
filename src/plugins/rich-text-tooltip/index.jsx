// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from "@emotion/core"; // Important! This line is necessary for the plugin to work with Builder.io
import { Builder } from "@builder.io/react";
import ReactQuill, { Quill } from "react-quill";
import { useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import Toolbar from "./components/Toolbar";
import Highlight from "../../blots/Highlight";
import Color from "../../blots/Color";
import Link from "../../blots/Link";
import Tooltip from "../../blots/Tooltip";

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

  const modules = {
    toolbar: { container: `#${toolbarId}` },
  };

  const insertHighlight = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();
    if (range) {
      const { highlight } = editor.getFormat(range);
      editor.formatText(range.index, range.length, "highlight", highlight);
    }
  }, [editorRef]);

  const insertColor = useCallback(
    (color) => {
      if (!editorRef.current) return;
      const editor = editorRef.current.getEditor();
      const range = editor.getSelection();
      if (range) {
        const { color: currentColor = "red" } = editor.getFormat(range);
        editor.formatText(
          range.index,
          range.length,
          "color",
          currentColor ? false : color
        );
      }
    },
    [editorRef]
  );

  const insertTooltip = useCallback(
    (background) => {
      if (!editorRef.current) return;
      const editor = editorRef.current.getEditor();
      const range = editor.getSelection();
      if (range) {
        const currentFormats = editor.getFormat(range);
        const hasTooltip = !!currentFormats.tooltip;

        editor.formatText(
          range.index,
          range.length,
          "tooltip",
          hasTooltip ? false : background
        );
        editor.formatText(
          range.index,
          range.length,
          "background",
          hasTooltip ? false : background
        );
      }
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
