(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.treeLodash = {}));
})(this, (function (exports) { 'use strict';

  var __defProp$3 = Object.defineProperty;
  var __defProps$3 = Object.defineProperties;
  var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
  var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
  var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$3 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    if (__getOwnPropSymbols$3)
      for (var prop of __getOwnPropSymbols$3(b)) {
        if (__propIsEnum$3.call(b, prop))
          __defNormalProp$3(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
  const preImpl$3 = (treeItem, callback, options) => {
    callback(treeItem, options);
    const children = treeItem[options.childrenKey];
    if (children && Array.isArray(children)) {
      children.forEach((childItem) => {
        preImpl$3(childItem, callback, __spreadProps$3(__spreadValues$3({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      });
    }
  };
  const postImpl$3 = (treeItem, callback, options) => {
    const children = treeItem[options.childrenKey];
    if (children && Array.isArray(children)) {
      children.forEach((childItem) => {
        postImpl$3(childItem, callback, __spreadProps$3(__spreadValues$3({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      });
    }
    callback(treeItem, options);
  };
  const breadthImpl$3 = (treeItem, callback, options) => {
    const queue = [
      {
        tree: treeItem,
        options
      }
    ];
    const runQueue = () => {
      if (queue.length === 0) {
        return;
      }
      const queueItem = queue.shift();
      const treeItem2 = queueItem.tree;
      if (treeItem2[options.childrenKey] && Array.isArray(treeItem2[options.childrenKey])) {
        const subQueueItems = treeItem2[options.childrenKey].map((subTree) => ({
          tree: subTree,
          options: __spreadProps$3(__spreadValues$3({}, queueItem.options), {
            parents: [...queueItem.options.parents, treeItem2],
            depth: queueItem.options.depth + 1
          })
        }));
        queue.push(...subQueueItems);
      }
      callback(treeItem2, queueItem.options);
      runQueue();
    };
    runQueue();
  };
  const strategies$3 = {
    "pre": preImpl$3,
    "post": postImpl$3,
    "breadth": breadthImpl$3
  };
  function foreach(tree, callback, options) {
    var _a, _b;
    const childrenKey = (_a = options == null ? void 0 : options.childrenKey) != null ? _a : "children";
    const strategy = (_b = options == null ? void 0 : options.strategy) != null ? _b : "pre";
    const isForest = Array.isArray(tree);
    const method = strategies$3[strategy];
    const innerOptions = {
      childrenKey,
      depth: 0,
      parents: []
    };
    isForest ? tree.forEach((tree2) => {
      method(tree2, callback, innerOptions);
    }) : method(tree, callback, innerOptions);
  }

  var __defProp$2 = Object.defineProperty;
  var __defProps$2 = Object.defineProperties;
  var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
  var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
  var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$2 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    if (__getOwnPropSymbols$2)
      for (var prop of __getOwnPropSymbols$2(b)) {
        if (__propIsEnum$2.call(b, prop))
          __defNormalProp$2(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
  const preImpl$2 = (treeItem, callback, options) => {
    const res = callback(treeItem, options);
    const children = treeItem[options.childrenKey];
    let newChildren;
    if (children && Array.isArray(children)) {
      newChildren = children.map((childItem) => {
        return preImpl$2(childItem, callback, __spreadProps$2(__spreadValues$2({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      });
    }
    return __spreadProps$2(__spreadValues$2({}, res), {
      [options.childrenKey]: newChildren
    });
  };
  const postImpl$2 = (treeItem, callback, options) => {
    const children = treeItem[options.childrenKey];
    let newChildren;
    if (children && Array.isArray(children)) {
      newChildren = children.map((childItem) => {
        return postImpl$2(childItem, callback, __spreadProps$2(__spreadValues$2({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      });
    }
    const res = callback(treeItem, options);
    return __spreadProps$2(__spreadValues$2({}, res), {
      [options.childrenKey]: newChildren
    });
  };
  const breadthImpl$2 = (treeItem, callback, options) => {
    const queue = [
      {
        tree: treeItem,
        options
      }
    ];
    let result;
    const cache = /* @__PURE__ */ new WeakMap();
    const runQueue = () => {
      if (queue.length === 0) {
        return result;
      }
      const queueItem = queue.shift();
      const treeItem2 = queueItem.tree;
      if (treeItem2[options.childrenKey] && Array.isArray(treeItem2[options.childrenKey])) {
        const subQueueItems = treeItem2[options.childrenKey].map((subTree) => ({
          tree: subTree,
          options: __spreadProps$2(__spreadValues$2({}, queueItem.options), {
            parents: [...queueItem.options.parents, treeItem2],
            depth: queueItem.options.depth + 1
          })
        }));
        queue.push(...subQueueItems);
      }
      const res = callback(treeItem2, queueItem.options);
      cache.set(queueItem.tree, res);
      const parent = queueItem.options.parents.length > 0 ? queueItem.options.parents[queueItem.options.parents.length - 1] : void 0;
      if (parent) {
        const newParent = cache.get(parent);
        if (newParent[options.childrenKey]) {
          newParent[options.childrenKey].push(res);
        } else {
          newParent[options.childrenKey] = [res];
        }
      }
      if (queueItem.options.depth === 0) {
        result = res;
      }
      return runQueue();
    };
    return runQueue();
  };
  const strategies$2 = {
    "pre": preImpl$2,
    "post": postImpl$2,
    "breadth": breadthImpl$2
  };
  function map(tree, callback, options = {}) {
    var _a, _b;
    const childrenKey = (_a = options.childrenKey) != null ? _a : "children";
    const strategy = (_b = options.strategy) != null ? _b : "pre";
    const isForest = Array.isArray(tree);
    const method = strategies$2[strategy];
    const innerOptions = {
      childrenKey,
      depth: 0,
      parents: []
    };
    return isForest ? tree.map((tree2) => {
      return method(tree2, callback, innerOptions);
    }) : method(tree, callback, innerOptions);
  }

  var __defProp$1 = Object.defineProperty;
  var __defProps$1 = Object.defineProperties;
  var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
  var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
  var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
  var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues$1 = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    if (__getOwnPropSymbols$1)
      for (var prop of __getOwnPropSymbols$1(b)) {
        if (__propIsEnum$1.call(b, prop))
          __defNormalProp$1(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
  const preImpl$1 = (treeItem, callback, options) => {
    const res = callback(treeItem, options);
    if (!res) {
      return void 0;
    }
    const children = treeItem[options.childrenKey];
    let newChildren;
    if (children && Array.isArray(children)) {
      newChildren = children.map((childItem) => {
        return preImpl$1(childItem, callback, __spreadProps$1(__spreadValues$1({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      }).filter((t) => !!t);
    }
    return __spreadProps$1(__spreadValues$1({}, treeItem), {
      [options.childrenKey]: newChildren
    });
  };
  const postImpl$1 = (treeItem, callback, options) => {
    const children = treeItem[options.childrenKey];
    let newChildren;
    if (children && Array.isArray(children)) {
      newChildren = children.map((childItem) => {
        return postImpl$1(childItem, callback, __spreadProps$1(__spreadValues$1({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      }).filter((t) => !!t);
    }
    const res = callback(treeItem, options);
    if (!res) {
      return void 0;
    }
    return __spreadProps$1(__spreadValues$1({}, treeItem), {
      [options.childrenKey]: newChildren
    });
  };
  function genNewNoChildrenNode(node, childrenKey) {
    const newNode = __spreadValues$1({}, node);
    delete newNode[childrenKey];
    return newNode;
  }
  const breadthImpl$1 = (treeItem, callback, options) => {
    const queue = [
      {
        tree: treeItem,
        options
      }
    ];
    let result;
    const resultCache = /* @__PURE__ */ new WeakMap();
    const newNodeCache = /* @__PURE__ */ new WeakMap();
    const runQueue = () => {
      var _a, _b;
      if (queue.length === 0) {
        return result;
      }
      const queueItem = queue.shift();
      const treeItem2 = queueItem.tree;
      if (treeItem2[options.childrenKey] && Array.isArray(treeItem2[options.childrenKey])) {
        const subQueueItems = treeItem2[options.childrenKey].map((subTree) => ({
          tree: subTree,
          options: __spreadProps$1(__spreadValues$1({}, queueItem.options), {
            parents: [...queueItem.options.parents, treeItem2],
            depth: queueItem.options.depth + 1
          })
        }));
        queue.push(...subQueueItems);
      }
      const parent = queueItem.options.parents.length > 0 ? queueItem.options.parents[queueItem.options.parents.length - 1] : void 0;
      const isTopNode = queueItem.options.depth === 0;
      const parentResult = parent && resultCache.get(parent);
      if (!isTopNode && !parentResult) {
        return runQueue();
      }
      const callbackResult = callback(treeItem2, queueItem.options);
      if (isTopNode && !callbackResult) {
        return void 0;
      }
      let newNode = genNewNoChildrenNode(treeItem2, queueItem.options.childrenKey);
      if (isTopNode) {
        result = newNode;
      }
      resultCache.set(queueItem.tree, callbackResult);
      newNodeCache.set(queueItem.tree, newNode);
      if (callbackResult) {
        const parentNewNode = newNodeCache.get(parent);
        if (parentNewNode && !parentNewNode[queueItem.options.childrenKey]) {
          parentNewNode[queueItem.options.childrenKey] = [];
        }
        (_b = (_a = parentNewNode == null ? void 0 : parentNewNode[queueItem.options.childrenKey]) == null ? void 0 : _a.push) == null ? void 0 : _b.call(_a, newNode);
      }
      return runQueue();
    };
    return runQueue();
  };
  const strategies$1 = {
    "pre": preImpl$1,
    "post": postImpl$1,
    "breadth": breadthImpl$1
  };
  function filter(tree, callback, options = {}) {
    var _a, _b;
    const childrenKey = (_a = options.childrenKey) != null ? _a : "children";
    const strategy = (_b = options.strategy) != null ? _b : "pre";
    const isForest = Array.isArray(tree);
    const method = strategies$1[strategy];
    const innerOptions = {
      childrenKey,
      depth: 0,
      parents: []
    };
    return isForest ? tree.map((tree2) => {
      return method(tree2, callback, innerOptions);
    }).filter((t) => !!t) : method(tree, callback, innerOptions);
  }

  function toArray(tree, options) {
    const results = [];
    foreach(tree, (t) => {
      results.push(t);
    }, options);
    return results;
  }

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  const preImpl = (treeItem, callback, options) => {
    const callbackResult = callback(treeItem, options);
    if (callbackResult) {
      return treeItem;
    }
    const children = treeItem[options.childrenKey];
    if (!children || !Array.isArray(children)) {
      return void 0;
    }
    return children.find((childItem) => {
      return preImpl(childItem, callback, __spreadProps(__spreadValues({}, options), {
        parents: [...options.parents, treeItem],
        depth: options.depth + 1
      }));
    });
  };
  const postImpl = (treeItem, callback, options) => {
    const children = treeItem[options.childrenKey];
    if (children && Array.isArray(children)) {
      const findOne = children.find((childItem) => {
        return postImpl(childItem, callback, __spreadProps(__spreadValues({}, options), {
          parents: [...options.parents, treeItem],
          depth: options.depth + 1
        }));
      });
      if (findOne) {
        return findOne;
      }
    }
    const callbackResult = callback(treeItem, options);
    if (callbackResult) {
      return treeItem;
    }
    return void 0;
  };
  const breadthImpl = (treeItem, callback, options) => {
    const queue = [
      {
        tree: treeItem,
        options
      }
    ];
    const runQueue = () => {
      if (queue.length === 0) {
        return void 0;
      }
      const queueItem = queue.shift();
      const treeItem2 = queueItem.tree;
      if (treeItem2[options.childrenKey] && Array.isArray(treeItem2[options.childrenKey])) {
        const subQueueItems = treeItem2[options.childrenKey].map((subTree) => ({
          tree: subTree,
          options: __spreadProps(__spreadValues({}, queueItem.options), {
            parents: [...queueItem.options.parents, treeItem2],
            depth: queueItem.options.depth + 1
          })
        }));
        queue.push(...subQueueItems);
      }
      const callbackResult = callback(treeItem2, queueItem.options);
      if (callbackResult) {
        return treeItem2;
      }
      return runQueue();
    };
    return runQueue();
  };
  const strategies = {
    "pre": preImpl,
    "post": postImpl,
    "breadth": breadthImpl
  };
  function find(tree, callback, options) {
    var _a, _b;
    const childrenKey = (_a = options == null ? void 0 : options.childrenKey) != null ? _a : "children";
    const strategy = (_b = options == null ? void 0 : options.strategy) != null ? _b : "pre";
    const method = strategies[strategy];
    const innerOptions = {
      childrenKey,
      depth: 0,
      parents: []
    };
    if (Array.isArray(tree)) {
      for (let i = 0, count = tree.length; i < count; i++) {
        const treeItem = tree[i];
        const result = method(treeItem, callback, innerOptions);
        if (result) {
          return result;
        }
      }
      return void 0;
    }
    return method(tree, callback, innerOptions);
  }

  var index = {
    foreach,
    map,
    filter,
    toArray,
    find
  };

  exports["default"] = index;
  exports.filter = filter;
  exports.find = find;
  exports.foreach = foreach;
  exports.map = map;
  exports.toArray = toArray;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
