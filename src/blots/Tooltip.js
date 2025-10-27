import { Quill } from "react-quill";

const Inline = Quill.import("blots/inline");

class Tooltip extends Inline {
  static blotName = "tooltip";
  static tagName = "span";

  static create(value) {
    const node = super.create();
    node.setAttribute("data-tooltip-id", value?.id);
    node.style.background = value?.background || "blue";
    return node;
  }

  static formats(node) {
    const id = node.getAttribute("data-tooltip-id");
    const background = node.style.background;
    if (!id || !background) return;

    return {
      id: id,
      background: background,
    };
  }

  static value(node) {
    const id = node.getAttribute("data-tooltip-id");
    const background = node.style.background;
    if (!id || !background) return;

    return {
      id: id,
      background: background,
    };
  }

  format(name, value) {
    if (name === "background" && value && value.id && value.background) {
      this.domNode.setAttribute("data-tooltip-id", value.id);
      this.domNode.style.background = value.background;
    } else if (name === "tooltip" && !value) {
      this.domNode.removeAttribute("data-tooltip-id");
      this.domNode.style.background = "";
      super.format(name, false);
    } else {
      super.format(name, value);
    }
  }
}

export default Tooltip;
