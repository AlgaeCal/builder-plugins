import { Quill } from "react-quill";

const Inline = Quill.import("blots/inline");

class Tooltip extends Inline {
  static blotName = "tooltip";
  static tagName = "span";

  static create(value) {
    const uniqueId = `tooltip-id-${Math.random().toString(36).slice(2, 9)}`;
    const node = super.create(uniqueId);
    node.setAttribute("data-tooltip-id", value);
    node.setAttribute("id", value);
    return node;
  }

  static formats(node) {
    return node.getAttribute("data-tooltip-id");
  }
}

export default Tooltip;
