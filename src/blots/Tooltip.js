import { Quill } from "react-quill";

const Inline = Quill.import("blots/inline");

class Tooltip extends Inline {
  static blotName = "tooltip";
  static tagName = "span";

  static create(value) {
    const node = super.create();
    node.setAttribute("data-tooltip-id", value?.id || "missing-tooltip-id");
    node.style.background = value?.background || "blue";
    return node;
  }

  static formats(node) {
    return {
      id: node.getAttribute("data-tooltip-id"),
      background: node.style.background,
    };
  }

  static value(node) {
    return {
      id: node.getAttribute("data-tooltip-id"),
      background: node.style.background,
    };
  }

  format(name, value) {
    if (name === "background" && value) {
      this.domNode.setAttribute("data-tooltip-id", value.id);
      this.domNode.style.background = value.background;
    } else {
      super.format(name, value);
    }
  }
}

export default Tooltip;
