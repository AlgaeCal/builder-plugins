// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from "@emotion/core"; // Important! This line is necessary for the plugin to work with Builder.io
import { Builder } from "@builder.io/react";
import ReactQuill, { Quill } from "react-quill";
import { useRef, useCallback, useState, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import PropTypes from "prop-types";
import Highlight from "../../blots/Highlight";
import Color from "../../blots/Color";
import Link from "../../blots/Link";

Quill.register({ "formats/mark": Highlight });
Quill.register({ "formats/color": Color });
Quill.register({ "formats/link": Link });

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

const normalizeValue = (text) => {
  // MobX observable map (MSTMap2)
  if (typeof text?.get === "function") {
    const html = text.get("html") || "";
    const plainText = text.get("plainText") || html.replace(/\n/g, "");
    return { html, plainText };
  }

  // plain string for initial value
  if (typeof text === "string") {
    return {
      html: text,
      plainText: text.replace(/\n/g, ""),
    };
  }

  return { html: "", plainText: "" };
};

const RichTextEditor = (props) => {
  const [toolbarId] = useState(
    () => `toolbar-faq-${Math.random().toString(36).slice(2, 9)}`
  );
  const editorRef = useRef(null);
  const [value, setValue] = useState(() => normalizeValue(props.value));

  const modules = {
    toolbar: { container: `#${toolbarId}` },
  };

  useEffect(() => {
    const normalized = normalizeValue(props.value);
    if (
      normalized.html !== value.html ||
      normalized.plainText !== value.plainText
    ) {
      if (normalized.html || normalized.plainText) setValue(normalized);
    }
  }, [props.value]);

  const insertHighlight = useCallback(() => {
    const editor = editorRef.current?.getEditor?.();
    const range = editor?.getSelection();
    if (range) {
      const { highlight } = editor.getFormat(range);
      editor.formatText(range.index, range.length, "highlight", highlight);
    }
  }, []);

  const insertColor = useCallback((color) => {
    const editor = editorRef.current?.getEditor?.();
    const range = editor?.getSelection();
    if (range) {
      const { color: currentColor = "red" } = editor.getFormat(range);
      editor.formatText(
        range.index,
        range.length,
        "color",
        currentColor ? false : color
      );
    }
  }, []);

  const handleChange = (html, _delta, _source, editor) => {
    const plainText = editor.getText().replace(/\n/g, "");
    setValue({ html, plainText });
    props.onChange({ html, plainText });
  };

  return (
    <div className="text-editor">
      <Toolbar
        id={toolbarId}
        insertHighlight={insertHighlight}
        insertColor={insertColor}
      />
      <ReactQuill
        ref={editorRef}
        onChange={handleChange}
        value={value.html}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
};

Builder.registerEditor({
  name: "RichTextFAQ",
  component: RichTextEditor,
});
RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
