import { Quill } from "react-quill";

const Inline = Quill.import("blots/inline");

class Color extends Inline {
  static blotName = "color";
  static className = "color";
  static tagName = "span";

  static create(value) {
    const node = super.create();
    node.style.color = value;
    return node;
  }

  static formats(node) {
    return node.style.color ?? "";
  }

  format(name, value) {
    if (name === "color" && value) {
      this.domNode.style.color = "red";
    } else {
      super.format(name, false);
    }
  }

  formats() {
    const formats = super.formats();
    formats["color"] = Color.formats(this.domNode);
    return formats;
  }
}

export default Color;
