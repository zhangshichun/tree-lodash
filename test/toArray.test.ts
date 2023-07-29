/* global describe, it, beforeEach */

import 'mocha'
import { expect } from 'chai'
import { toArray } from '../src/index'
import type { Tree } from '../src/types'

describe('[toArray]', function () {
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

  it('by default strategy (pre)', function () {
    const res = toArray(tree)
    expect(res.length).to.be.equal(5);
    expect(res[0]?.key).to.be.equal('1');
    expect(res[1]?.key).to.be.equal('2');
    expect(res[2]?.key).to.be.equal('3');
    expect(res[3]?.key).to.be.equal('4');
    expect(res[4]?.key).to.be.equal('5');
  })
  it('by post strategy', function () {
    const res = toArray(tree, { strategy: 'post' })
    expect(res.length).to.be.equal(5);
    expect(res[0]?.key).to.be.equal('3');
    expect(res[1]?.key).to.be.equal('2');
    expect(res[2]?.key).to.be.equal('5');
    expect(res[3]?.key).to.be.equal('4');
    expect(res[4]?.key).to.be.equal('1');
  })
  it('by breadth strategy', function () {
    const res = toArray(tree, { strategy: 'breadth' })
    expect(res.length).to.be.equal(5);
    expect(res[0]?.key).to.be.equal('1');
    expect(res[1]?.key).to.be.equal('2');
    expect(res[2]?.key).to.be.equal('4');
    expect(res[3]?.key).to.be.equal('3');
    expect(res[4]?.key).to.be.equal('5');
  })
  it('by tree childrenKey is "subItems"', function() {
    const res = toArray(treeSubItems, { childrenKey: 'subItems' })
    expect(res.length).to.be.equal(5);
    expect(res[0]?.key).to.be.equal('1');
    expect(res[1]?.key).to.be.equal('2');
    expect(res[2]?.key).to.be.equal('3');
    expect(res[3]?.key).to.be.equal('4');
    expect(res[4]?.key).to.be.equal('5');
  })
  it('for forest by default strategy (pre)', function () {
    const res = toArray([tree])
    expect(res.length).to.be.equal(5);
    expect(res[0]?.key).to.be.equal('1');
    expect(res[1]?.key).to.be.equal('2');
    expect(res[2]?.key).to.be.equal('3');
    expect(res[3]?.key).to.be.equal('4');
    expect(res[4]?.key).to.be.equal('5');
  })
})