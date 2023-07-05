/* global describe, it, beforeEach */

import 'mocha'
import { expect } from 'chai'
import { foreach } from '../src/index'

describe('foreach', function () {
  it('foreach by pre strategy', function () {
    const tree: any = {
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
    const res = []
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
})