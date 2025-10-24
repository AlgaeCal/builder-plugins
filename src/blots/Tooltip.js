import { Quill } from "react-quill";

const Inline = Quill.import("blots/inline");

class Tooltip extends Inline {
  static blotName = "tooltip";
  static tagName = "span";

  static create(value) {
    const uniqueId = `tooltip-id-${Math.random().toString(36).slice(2, 9)}`;
    const node = super.create();
    node.style.background = value || "blue";
    node.setAttribute("data-tooltip-id", uniqueId);
    return node;
  }

  static formats(node) {
    return node.style.background ?? "blue";
  }

  format(name, value) {
    if (name === "background" && value) {
      this.domNode.style.background = "blue";
    } else {
      super.format(name, false);
    }
  }
}

export default Tooltip;
