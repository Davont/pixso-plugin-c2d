pixso.showUI(__html__);
function parseDSL(dsl) {
  try {
    return JSON.parse(dsl);
  } catch (error) {
    console.error("Invalid DSL format", error);
    return null;
  }
}
pixso.ui.onmessage = (msg) => {
  if (msg.type === "create-rectangles") {
    const nodes = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = pixso.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      pixso.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    pixso.currentPage.selection = nodes;
    pixso.viewport.scrollAndZoomIntoView(nodes);
  }
  if (msg.type === "create-component") {
    const component = pixso.createComponent();
    const rect = pixso.createRectangle();
    rect.fills = [{ type: "SOLID", color: { r: 0, g: 0.5, b: 1 } }];
    component.appendChild(rect);
    pixso.currentPage.appendChild(component);
    pixso.currentPage.selection = [component];
    pixso.viewport.scrollAndZoomIntoView([component]);
  }
  if (msg.type === "create-from-dsl") {
    const dslData = parseDSL(msg.dsl);
    if (!dslData) return;

    if (dslData.type === "button") {
      const button = pixso.createComponent();
      button.name = "Button";
      button.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.6, b: 0.8 } }];
      button.resize(100, 40);

      console.log(button);
      
      const selectedFrame = pixso.currentPage.selection[0];
      if (selectedFrame && selectedFrame.type === "FRAME") {
        selectedFrame.appendChild(button);
      } else {
        pixso.currentPage.appendChild(button);
      }

      pixso.currentPage.selection = [button];
    }
    // Add more component types as needed


  }

  pixso.closePlugin();
};
