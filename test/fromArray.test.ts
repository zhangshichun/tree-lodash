/* global describe, it, beforeEach */

import "mocha";
import { expect } from "chai";
import { fromArray } from "../src/index";

describe("[fromArray]", function () {
  const commonArray = [
    {
      id: "1",
      name: "1",
    },
    {
      id: "2",
      name: "2",
      pid: "1",
    },
    {
      id: "3",
      name: "3",
      pid: "1",
    },
    {
      id: "4",
      name: "4",
      pid: "2",
    },
    {
      id: "5",
      name: "5",
    },
  ];

  it("default option", function () {
    const res = fromArray(commonArray);
    expect(res.length).to.be.equal(1);
    expect(res[0].id).to.be.equal("1");
    expect(res[0].children[0].id).to.be.equal("2");
    expect(res[0].children[1].id).to.be.equal("3");
    expect(res[0].children[0].children[0].id).to.be.equal("4");
  });
  it("custom keys", function () {
    const customArray = commonArray.map((t) => {
      return {
        name: t.name,
        k: t.id,
        pk: t.pid,
      };
    });
    const res = fromArray(customArray, {
      itemKey: "k",
      parentKey: "pk",
    });
    expect(res.length).to.be.equal(1);
    expect(res[0].k).to.be.equal("1");
    expect(res[0].children[0].k).to.be.equal("2");
    expect(res[0].children[1].k).to.be.equal("3");
    expect(res[0].children[0].children[0].k).to.be.equal("4");
  });
  it("custom childrenKey", function () {
    const res = fromArray(commonArray, { childrenKey: "subItems" });
    expect(res.length).to.be.equal(1);
    expect(res[0].id).to.be.equal("1");
    expect(res[0].subItems[0].id).to.be.equal("2");
    expect(res[0].subItems[1].id).to.be.equal("3");
    expect(res[0].subItems[0].subItems[0].id).to.be.equal("4");
  });
});
