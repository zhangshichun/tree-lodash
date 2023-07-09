/* global describe, it, beforeEach */

import 'mocha'
import { expect } from 'chai'
import { find } from '../src/index'
import type { Tree } from '../src/types'

describe('[find]', function () {
  const tree: Tree = {
    key: 1,
    children: [
      {
        key: 11,
        children: [
          {
            key: 111
          }
        ]
      },
      {
        key: 12,
        children: [
          {
            key: 112,
            children: [
              {
                key: 1111
              }
            ]
          }
        ]
      }
    ]
  }

  const treeSubItems: Tree<'subItems'> =  {
    key: 1,
    subItems: [
      {
        key: 11,
        subItems: [
          {
            key: 111
          }
        ]
      },
      {
        key: 12,
        subItems: [
          {
            key: 112,
            subItems: [
              {
                key: 1111
              }
            ]
          }
        ]
      }
    ]
  }

  it('by default strategy (pre)', function () {
    const res: any[] = []
    const newTree: Tree<'children'> | undefined = find(tree, ((t) => {
      res.push(t.key)
      return t.key <= 100 && t.key > 1
    }))
    expect(newTree?.key).to.be.equal(11);
    expect(newTree?.children?.[0]?.key).to.be.equal(111);
    expect(res.length).to.be.equal(2);
    expect(res[0]).to.be.equal(1);
    expect(res[1]).to.be.equal(11);
  })
  it('by post strategy ', function () {
    const res: any[] = []
    const newTree: Tree | undefined = find(tree, ((t) => {
      res.push(t.key)
      return t.key <= 100 && t.key > 1
    }), { strategy: 'post' })
    expect(newTree?.key).to.be.equal(11);
    expect(newTree?.children?.[0]?.key).to.be.equal(111);
    expect(res.length).to.be.equal(2);
    expect(res[0]).to.be.equal(111);
    expect(res[1]).to.be.equal(11);
  })
  it('by breadth strategy ', function () {
    const res: any[] = []
    const newTree: Tree<'children'> | undefined = find(tree, ((t) => {
      res.push(t.key)
      return t.key === 12
    }), { strategy: 'breadth' })
    expect(newTree?.key).to.be.equal(12);
    expect(newTree?.children?.[0]?.key).to.be.equal(112);
    expect(res.length).to.be.equal(3);
    expect(res[0]).to.be.equal(1);
    expect(res[1]).to.be.equal(11);
    expect(res[2]).to.be.equal(12);
  })
  it('by tree childrenKey is "subItems"', function() {
    const res: any[] = []
    const newTree: Tree<'subItems'> | undefined = find(treeSubItems, ((t) => {
      res.push(t.key)
      return t.key <= 100 && t.key > 1
    }), { childrenKey: 'subItems' })
    expect(newTree?.key).to.be.equal(11);
    expect(newTree?.subItems?.[0]?.key).to.be.equal(111);
    expect(res.length).to.be.equal(2);
    expect(res[0]).to.be.equal(1);
    expect(res[1]).to.be.equal(11);
  })
  it('for forest by default strategy (pre)', function () {
    const res: any[] = []
    const newTree: Tree<'children'> | undefined = find([tree], ((t) => {
      res.push(t.key)
      return t.key <= 100 && t.key > 1
    }))
    expect(newTree?.key).to.be.equal(11);
    expect(newTree?.children?.[0]?.key).to.be.equal(111);
    expect(res.length).to.be.equal(2);
    expect(res[0]).to.be.equal(1);
    expect(res[1]).to.be.equal(11);
  })
  it('for forest by post strategy', function () {
    const res: any[] = []
    const newTree: Tree<'children'> | undefined = find(tree, ((t) => {
      res.push(t.key)
      return t.key <= 100 && t.key > 1
    }), { strategy: 'post' })
    expect(newTree?.key).to.be.equal(11);
    expect(newTree?.children?.[0]?.key).to.be.equal(111);
    expect(res.length).to.be.equal(2);
    expect(res[0]).to.be.equal(111);
    expect(res[1]).to.be.equal(11);
  })
  it('for forest by breadth strategy', function () {
    const res: any[] = []
    const matchedItem: Tree<'children'> | undefined = find([tree], ((t) => {
      res.push(t.key)
      return t.key <= 100 && t.key > 1
    }), { strategy: 'breadth' })
    expect(matchedItem?.key).to.be.equal(11);
    expect(matchedItem?.children?.[0]?.key).to.be.equal(111);
    expect(res.length).to.be.equal(2);
    expect(res[0]).to.be.equal(1);
    expect(res[1]).to.be.equal(11);
  })

  it('for forest no-matched item by default strategy (pre)', function () {
    const res: any[] = []
    const matchedItem: Tree<'children'> | undefined = find([tree], ((t) => {
      res.push(t.key)
      return t.key <= 0
    }))
    expect(matchedItem).to.be.equal(undefined);
    expect(res.length).to.be.equal(6);
  })

  it('for forest no-matched item by post strategy', function () {
    const res: any[] = []
    const matchedItem: Tree<'children'> | undefined = find([tree], ((t) => {
      res.push(t.key)
      return t.key <= 0
    }), { strategy: 'post' })
    expect(matchedItem).to.be.equal(undefined);
    expect(res.length).to.be.equal(6);
  })

  it('for forest no-matched item by breadth strategy', function () {
    const res: any[] = []
    const matchedItem: Tree<'children'> | undefined = find([tree], ((t) => {
      res.push(t.key)
      return t.key <= 0
    }), { strategy: 'breadth' })
    expect(matchedItem).to.be.equal(undefined);
    expect(res.length).to.be.equal(6);
  })
})