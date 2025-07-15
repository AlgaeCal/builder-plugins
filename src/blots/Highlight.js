
import { Quill } from 'react-quill';

const Inline = Quill.import('blots/inline');

class Highlight extends Inline {
  static blotName = 'highlight';
  static className = 'highlight';
  static tagName = 'mark';
}

export default Highlight;
