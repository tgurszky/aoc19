export const addListEntry = (entry, list) => {
  const [center, orbit] = entry.split(")");
  list.push({ parent: center, name: orbit });
};

export const createMap = list => {
  let hashMap = {
    COM: { name: "COM", children: [] }
  };
  list.forEach(element => {
    hashMap[element.name] = { ...element, children: [] };
  });
  list.forEach(element => {
    hashMap[element.parent].children.push(hashMap[element.name]);
    hashMap[element.name].parent = hashMap[element.parent];
  });
  return hashMap.COM;
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

export const getDepth = node => {
  if (!node.parent) {
    return 0;
  }
  return 1 + getDepth(node.parent);
};

export const applyToNodes = (node, f) => {
  f(node);
  if (node.children.length === 0) {
    return;
  }
  for (let i = 0; i < node.children.length; i++) {
    applyToNodes(node.children[i], f);
  }
};

export const getSolution = map => {
  let depthCount = 0;
  applyToNodes(map, node => {
    depthCount += getDepth(node);
  });
  return depthCount;
};
