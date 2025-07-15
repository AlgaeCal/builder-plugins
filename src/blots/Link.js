
import { Quill } from 'react-quill';

const QuillLink = Quill.import('formats/link');

class Link extends QuillLink {
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

export default Link;
