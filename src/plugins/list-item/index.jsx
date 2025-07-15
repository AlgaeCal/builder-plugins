// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'; // Important! This line is necessary for the plugin to work with Builder.io 
import { Builder } from '@builder.io/react';
import ReactQuill, { Quill } from 'react-quill';
import { useRef, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import Link from '../../blots/Link';
import Highlight from '../../blots/Highlight';
import Color from '../../blots/Color';

const modules = {
  toolbar: {
    container: "#toolbar",
  }
};

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'script',
  'color',
  'highlight',
  'list',
  'bullet',
  'indent',
];

Quill.register({ 'formats/mark': Highlight })
Quill.register({ 'formats/color': Color });
Quill.register({ 'formats/link': Link });

const RichTextEditor = (props) => {
  const editorRef = useRef(null);

  const insertHighlight = useCallback(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();
    if (range) {
      const { highlight } = editor.getFormat(range);
      editor.formatText(range.index, range.length, 'highlight', highlight);
    }
  }, [editorRef]);

  const insertColor = useCallback((color) => {
    if (!editorRef.current) return;
    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();
    if (range) {
      const { color: currentColor = 'red' } = editor.getFormat(range);
      editor.formatText(range.index, range.length, 'color', currentColor ? false : color);
    }
  }, [editorRef]);


  return <div className="text-editor">
    <Toolbar insertHighlight={insertHighlight} insertColor={insertColor} />
    <ReactQuill
      ref={editorRef}
      onChange={props.onChange}
      value={props.value}
      modules={modules}
      formats={formats}
      theme={"snow"}
    />
  </div>
}

Builder.registerEditor({
  name: 'ListRichText',
  component: RichTextEditor,
});

export default RichTextEditor;