import { findInMap, addMapEntry, getDepth, applyToNodes } from "./day6";

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

it("addMapEntry should build a map", () => {
  const map = {};
  const entry1 = "COM)B";
  const entry2 = "B)C";
  const entry3 = "B)D";
  addMapEntry(map, entry1);
  addMapEntry(map, entry2);
  addMapEntry(map, entry3);
  expect(map.name).toBe("COM");
  expect(map.children).toHaveLength(1);
  expect(map.children[0].children).toHaveLength(2);
});

describe("getDepth", () => {
  let map;
  beforeAll(() => {
    map = {
      name: "A",
      children: [
        {
          name: "B",
          children: [
            {
              name: "C"
            }
          ]
        }
      ]
    };
  });

  it("should return 0 for root", () => {
    const result = getDepth(map, "A");
    expect(result).toBe(0);
  });
  it("should return 1 for child", () => {
    const result = getDepth(map, "B");
    expect(result).toBe(1);
  });
  it("should return 2 for second child", () => {
    const result = getDepth(map, "C");
    expect(result).toBe(2);
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
