import { findInMap, applyToNodes, addListEntry, createMap, getSolution } from "./day6";

describe("findInMap", () => {
  let map;
  beforeAll(() => {
    map = {};
  });

  it("should return null if map is empty", () => {
    const result = findInMap(map, "A");
    expect(result).toBe(null);
  });

  it("should return map if name matches", () => {
    map.name = "A";
    const result = findInMap(map, "A");
    expect(result).toBe(map);
  });

  it("should return map's child if name matches", () => {
    map.name = "B";
    const child = {
      name: "A"
    };
    map.children = [child];
    const result = findInMap(map, "A");
    expect(result).toBe(child);
  });

  it("should return map's grandchild if name matches", () => {
    map.name = "C";
    const child = {
      name: "A"
    };
    map.children = [
      {
        name: "B",
        children: [child]
      }
    ];
    const result = findInMap(map, "A");
    expect(result).toBe(child);
  });
});

it("applyToNodes should apply function to all nodes in subtree", () => {
  const map = {
    name: "A",
    children: [
      {
        name: "B",
        children: [
          {
            name: "C",
            children: []
          }
        ]
      }
    ]
  };
  let names = [];
  const f = map => names.push(map.name);
  applyToNodes(map, f);
  expect(names).toHaveLength(3);
  expect(names).toContain("A");
  expect(names).toContain("B");
  expect(names).toContain("C");
});

describe("addListEntry", () => {
  it("should create a list", () => {
    const list = [];
    addListEntry("G)H", list);
    addListEntry("B)G", list);
    addListEntry("COM)B", list);
    expect(list).toHaveLength(3);
  });
});

it("createMap should create a map from a list", () => {
  const list = [
    { parent: "G", name: "H" },
    { parent: "B", name: "G" },
    { parent: "COM", name: "B" },
    { parent: "B", name: "C" }
  ];
  const map = createMap(list);
  expect(map.name).toBe("COM");
  expect(map.children[0].name).toBe("B");
  expect(map.children[0].children).toHaveLength(2);
});

it("getSolution should return 42 for test input", () => {
  const list = [
    { parent: "COM", name: "B" },
    { parent: "B", name: "G" },
    { parent: "G", name: "H" },
    { parent: "B", name: "C" },
    { parent: "C", name: "D" },
    { parent: "D", name: "I" },
    { parent: "D", name: "E" },
    { parent: "E", name: "F" },
    { parent: "E", name: "J" },
    { parent: "J", name: "K" },
    { parent: "K", name: "L" }
  ];
  const map = createMap(list);
  const result = getSolution(map);
  expect(result).toBe(42);
});
