/* global describe, it, beforeEach */

import 'mocha'
import { expect } from 'chai'
import { foreach } from '../src/index'
import type { Tree } from '../src/types'

describe('[foreach]', function () {
  const tree: Tree = {
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
    const res: string[] = []
    foreach(tree, ((t) => {
      res.push(t.key)
    }))
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('by pre strategy', function () {
    const res: string[] = []
    foreach(tree, ((t) => {
      res.push(t.key)
    }), { strategy: 'pre' })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('by post strategy', function () {
    const res: string[] = []
    foreach(tree, ((t) => {
      res.push(t.key)
    }), { strategy: 'post' })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('3');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('5');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('1');
  })
  it('by breadth strategy', function () {
    const res: string[] = []
    foreach(tree, ((t) => {
      res.push(t.key)
    }), { strategy: 'breadth' })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('4');
    expect(res[3]).to.be.equal('3');
    expect(res[4]).to.be.equal('5');
  })
  it('by tree childrenKey is "subItems"', function() {
    const res: string[] = []
    foreach(treeSubItems, ((t) => {
      res.push(t.key)
    }), { childrenKey: 'subItems' })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('for forest by default strategy (pre)', function () {
    const res: string[] = []
    foreach([tree], ((t) => {
      res.push(t.key)
    }))
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('by pre strategy and getChildrenKey', function () {
    const res: string[] = []
    foreach(treeMultiChildrenKey,
    (t) => {
      res.push(t.key)
    },
    {
      getChildrenKey: (tree, meta) => {        
        if (meta.depth === 1) {
          return 'subItems'
        }
      }
    })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('3');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('5');
  })
  it('by post strategy and getChildrenKey', function () {
    const res: string[] = []
    foreach(treeMultiChildrenKey,
    (t) => {
      res.push(t.key)
    },
    {
      getChildrenKey: (tree, meta) => {        
        if (meta.depth === 1) {
          return 'subItems'
        }
      },
      strategy: 'post'
    })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('3');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('5');
    expect(res[3]).to.be.equal('4');
    expect(res[4]).to.be.equal('1');
  })
  it('by breadth strategy and getChildrenKey', function () {
    const res: string[] = []
    foreach(treeMultiChildrenKey,
    (t) => {
      res.push(t.key)
    },
    {
      getChildrenKey: (tree, meta) => {        
        if (meta.depth === 1) {
          return 'subItems'
        }
      },
      strategy: 'breadth'
    })
    expect(res.length).to.be.equal(5);
    expect(res[0]).to.be.equal('1');
    expect(res[1]).to.be.equal('2');
    expect(res[2]).to.be.equal('4');
    expect(res[3]).to.be.equal('3');
    expect(res[4]).to.be.equal('5');
  })
})