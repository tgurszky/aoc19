export const addMapEntry = (map, entry) => {
  const [center, orbit] = entry.split(")");
  const newChild = {
    name: orbit,
    children: []
  };
  const result = findInMap(map, center);
  if (result) {
    result.children.push(newChild);
  } else {
    map.name = center;
    map.children = [newChild];
  }
};

export const findInMap = (node, name) => {
  if (node.name === name) {
    return node;
  }
  if ((!node.children || node.children.length === 0) && node.name !== name) {
    return null;
  }
  for (let i = 0; i < node.children.length; i++) {
    return findInMap(node.children[i], name);
  }
};

export const getDepth = (node, name) => {
  if (node.name === name) {
    return 0;
  }
  for (let i = 0; i < node.children.length; i++) {
    return 1 + getDepth(node.children[i], name);
  }
};

export const applyToNodes = (node, f) => {
  f(node);
  if (!node.children || node.children.length === 0) {
    return;
  }
  for (let i = 0; i < node.children.length; i++) {
    applyToNodes(node.children[i], f);
  }
};
