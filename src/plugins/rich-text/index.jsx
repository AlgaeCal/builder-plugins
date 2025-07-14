// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'; // Important! This line is necessary for the plugin to work with Builder.io 
import { Builder } from '@builder.io/react';
import ReactQuill, { Quill } from 'react-quill';
import { useRef, useCallback } from 'react';
import Toolbar from './components/Toolbar';

const Inline = Quill.import('blots/inline');
const Link = Quill.import('formats/link');

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

class CustomLink extends Link {
  static create(value) {
    const node = super.create(value);
    if (value && value.startsWith('#')) {
      node.removeAttribute('target');
    } else {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
    return node;
  }
}
class Highlight extends Inline {
  static blotName = 'highlight';
  static className = 'highlight';
  static tagName = 'mark';
}

class Color extends Inline {
  static blotName = 'color';
  static className = 'color';
  static tagName = 'span';

  static create(value) {
    const node = super.create();
    node.style.color = value;
    return node;
  }

  static formats(node) {
    return node.style.color ?? '';
  }

  format(name, value) {
    if (name === 'color' && value) {
      this.domNode.style.color = 'red';
    } else {
      super.format(name, false);
    }
  }

  formats() {
    const formats = super.formats();
    formats['color'] = Color.formats(this.domNode);
    return formats;
  }
}


Quill.register({ 'formats/mark': Highlight })
Quill.register({ 'formats/color': Color });
Quill.register({ 'formats/link': CustomLink });

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
      console.log("getFormat", editor.getFormat(range));
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
  id: '@algeacal/rich-text',
  name: 'RichTextTest',
  component: RichTextEditor,
});

export default RichTextEditor;