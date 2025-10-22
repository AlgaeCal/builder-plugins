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

Quill.register({ "formats/mark": Highlight });
Quill.register({ "formats/color": Color });
Quill.register({ "formats/link": Link });
Quill.register({ "formats/tooltip": Tooltip });

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "script",
  "color",
  "highlight",
  "tooltip",
];

const RichTextEditor = (props) => {
  const [toolbarId] = useState(
    () => `toolbar-${Math.random().toString(36).slice(2, 9)}`
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
      console.log("Current formats:", editor.getFormat(range));
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

  const insertTooltip = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();

    const range = editor.getSelection();
    if (range) {
      const currentFormat = editor.getFormat(range);
      const isActive = !!currentFormat.tooltip;

      // Apply the format if not active to trigger the create method
      editor.format(
        "tooltip",
        isActive ? false : "tooltip-target",
        Quill.sources.USER
      );
      editor.formatText(range.index, range.length, "bold", !isActive);
    }
  }, [editorRef]);

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
