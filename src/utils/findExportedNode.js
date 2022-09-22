const _ = require('lodash');

const findExportedNode = (node) => {
    const res = [];
    if(shouldBeExported(node.name)) {
        node.name = node.name.replace(':Export', '');
        res.push(node);
    }

    if(node.children && node.children.length > 0) {
        res.push(..._.flatten(node.children.map(c => findExportedNode(c))));
    }
    return res;
}

const shouldBeExported = (name) => {
    if (typeof name === 'string' || name instanceof String) {
        return name.endsWith(":Export");
    }
    return false;
    
}

module.exports = findExportedNode;