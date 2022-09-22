const transformNode = (node, components) => {
    node.visible = true;
    Object.assign(node, node.style);

    if(node.componentId) {
        const component = components[node.componentId];
        node.mainComponent = component;
    }

    if(node.children && node.children.length > 0) {
        node.children.forEach(c => transformNode(c, components));
    }
}

module.exports = transformNode;