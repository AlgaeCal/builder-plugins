// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from "@emotion/core"; // Important! This line is necessary for the plugin to work with Builder.io
import { Builder } from "@builder.io/react";
import ReactQuill, { Quill } from "react-quill";
import { useRef, useCallback, useState } from "react";
import Toolbar from "./components/Toolbar";
import Highlight from "../../blots/Highlight";
import Color from "../../blots/Color";
import Link from "../../blots/Link";

const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "script",
  "color",
  "highlight",
];

Quill.register({ "formats/mark": Highlight });
Quill.register({ "formats/color": Color });
Quill.register({ "formats/link": Link });

const RichTextEditor = (props) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState({
    html: props.value,
    plainText: props.value,
  });

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

  const handleChange = (html, delta, source, editor) => {
    setValue({ html: html, plainText: editor.getText() });
    props.onChange({ html: html, plainText: editor.getText() });
  };

  return (
    <div className="text-editor">
      <Toolbar insertHighlight={insertHighlight} insertColor={insertColor} />
      <ReactQuill
        ref={editorRef}
        onChange={handleChange}
        value={value.html}
        modules={modules}
        formats={formats}
        theme={"snow"}
      />
    </div>
  );
};

Builder.registerEditor({
  name: "RichTextFAQ",
  component: RichTextEditor,
});

export default RichTextEditor;
