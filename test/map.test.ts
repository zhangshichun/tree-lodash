/* global describe, it, beforeEach */

import 'mocha'
import { expect } from 'chai'
import { map } from '../src/index'
import type { Tree } from '../src/types'

describe('[map]', function () {
  const tree: Tree<'children'> = {
    key: '1',
    children: [
      {
        key: '2',
        children: [
          {
            key: '3'
          }
        ]
      },
      {
        key: '4',
        children: [
          {
            key: '5'
          }
        ]
      }
    ]
  }

  const treeSubItems: Tree<'subItems'> =  {
    key: '1',
    subItems: [
      {
        key: '2',
        subItems: [
          {
            key: '3'
          }
        ]
      },
      {
        key: '4',
        subItems: [
          {
            key: '5'
          }
        ]
      }
    ]
  }

  const treeMultiChildrenKey: Tree = {
    key: '1',
    children: [
      {
        key: '2',
        subItems: [
          {
            key: '3'
          }
        ]
      },
      {
        key: '4',
        subItems: [
          {
            key: '5'
          }
        ]
      }
    ]
  }

  it('by default strategy (pre)', function () {
    const res: any[] = []
    const newTree: Tree<'children'> = map(tree, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }))
    expect(newTree.key).to.be.equal('11');
    expect(newTree.children?.[0]?.key).to.be.equal('21');
    expect(newTree.children?.[0]?.children?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('by post strategy ', function () {
    const res: any[] = []
    const newTree: Tree<'children'> = map(tree, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }), { strategy: 'post' })
    expect(newTree.key).to.be.equal('11');
    expect(newTree.children?.[0]?.key).to.be.equal('21');
    expect(newTree.children?.[0]?.children?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('3');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('5');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('1');
  })
  it('by breadth strategy ', function () {
    const res: any[] = []
    const newTree: Tree<'children'> = map(tree, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }), { strategy: 'breadth' })
    expect(newTree.key).to.be.equal('11');
    expect(newTree.children?.[0]?.key).to.be.equal('21');
    expect(newTree.children?.[0]?.children?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('4');
    expect(res[3]).to.be.equal('3');
    expect(res[4]).to.be.equal('5');
  })
  it('by tree childrenKey is "subItems"', function() {
    const res: string[] = []
    const newTree: Tree<'subItems'> = map(treeSubItems, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }), { childrenKey: 'subItems' })
    expect(newTree.key).to.be.equal('11');
    expect(newTree.subItems?.[0]?.key).to.be.equal('21');
    expect(newTree.subItems?.[0]?.subItems?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('for forest by default strategy (pre)', function () {
    const res: string[] = []
    const forest = map([tree], ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }))
    expect(forest?.[0].key).to.be.equal('11');
    expect(forest?.[0].children?.[0]?.key).to.be.equal('21');
    expect(forest?.[0].children?.[0]?.children?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('for forest by post strategy', function () {
    const res: string[] = []
    const forest = map([tree], ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }), { strategy: 'post' })
    expect(forest?.[0].key).to.be.equal('11');
    expect(forest?.[0].children?.[0]?.key).to.be.equal('21');
    expect(forest?.[0].children?.[0]?.children?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('3');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('5');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('1');
  })
  it('for forest by breadth strategy', function () {
    const res: string[] = []
    const forest = map([tree], ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }), { strategy: 'breadth' })
    expect(forest?.[0].key).to.be.equal('11');
    expect(forest?.[0].children?.[0]?.key).to.be.equal('21');
    expect(forest?.[0].children?.[0]?.children?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('4');
    expect(res[3]).to.be.equal('3');
    expect(res[4]).to.be.equal('5');
  })
  it('by default strategy (pre) and getChildrenKey', function () {
    const res: any[] = []
    const newTree: Tree = map(treeMultiChildrenKey, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }),
    {
      getChildrenKey: (tree, meta) => {        
        if (meta.depth === 1) {
          return 'subItems'
        }
      },
    })
    expect(newTree.key).to.be.equal('11');
    expect(newTree.children?.[0]?.key).to.be.equal('21');
    expect(newTree.children?.[0]?.subItems?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('by post strategy and getChildrenKey', function () {
    const res: any[] = []
    const newTree: Tree = map(treeMultiChildrenKey, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }),
    {
      getChildrenKey: (tree, meta) => {        
        if (meta.depth === 1) {
          return 'subItems'
        }
      },
      strategy: 'post'
    })
    expect(newTree.key).to.be.equal('11');
    expect(newTree.children?.[0]?.key).to.be.equal('21');
    expect(newTree.children?.[0]?.subItems?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('3');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('5');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('1');
  })
  it('by breadth strategy and getChildrenKey', function () {
    const res: any[] = []
    const newTree: Tree = map(treeMultiChildrenKey, ((t) => {
      res.push(t.key)
      return {
        key: t.key + '1'
      }
    }),
    {
      getChildrenKey: (tree, meta) => {        
        if (meta.depth === 1) {
          return 'subItems'
        }
      },
      strategy: 'breadth'
    })
    expect(newTree.key).to.be.equal('11');
    expect(newTree.children?.[0]?.key).to.be.equal('21');
    expect(newTree.children?.[0]?.subItems?.[0]?.key).to.be.equal('31');
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('4');
    expect(res[3]).to.be.equal('3');
    expect(res[4]).to.be.equal('5');
  })
})
