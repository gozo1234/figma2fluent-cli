const transformNode = (node) => {
    node.visible = true;
    Object.assign(node, node.style);
    if(node.children && node.children.length > 0) {
        node.children.forEach(c => transformNode(c));
    }
}

module.exports = transformNode;