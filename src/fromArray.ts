import type { ChildrenKey } from "./types";

type TypeOfKey = string;
export type KeyValue = string | number | undefined | null;

export type ArrayItemWithParentKey<
  P extends TypeOfKey,
  K extends TypeOfKey
> = Record<string, any> & {
  [key in P]?: KeyValue;
} & {
  [key in K]?: KeyValue;
};

export type TreeWithParentKey<
  K extends TypeOfKey,
  P extends TypeOfKey,
  T extends ChildrenKey
> = Record<string, any> & {
  [key in P]?: KeyValue;
} & {
  [key in K]: KeyValue;
} & {
  [key in T]?: TreeWithParentKey<K, P, T>[];
};

export type FromArrayOptions = {
  parentKey?: TypeOfKey;
  itemKey?: TypeOfKey;
  childrenKey?: ChildrenKey;
};

export type FromArray<
  K extends TypeOfKey,
  P extends TypeOfKey,
  T extends ChildrenKey
> = (
  array: ArrayItemWithParentKey<K, P>[],
  options: FromArrayOptions
) => TreeWithParentKey<K, P, T>[];

function fromArray<
  K extends TypeOfKey,
  P extends TypeOfKey,
  T extends ChildrenKey
>(
  array: ArrayItemWithParentKey<K, P>[],
  options?: FromArrayOptions
): TreeWithParentKey<K, P, T>[] {
  const result: TreeWithParentKey<K, P, T>[] = [];
  const {
    parentKey = "pid",
    itemKey = "id",
    childrenKey = "children",
  } = options || {};

  const map: Map<TypeOfKey, TreeWithParentKey<K, P, T>> = new Map();
  array.map((item) => {
    const itemKeyValue = item[itemKey];
    if (!map.get(itemKeyValue)) {
      map.set(itemKeyValue, item);
    }
  });
  array.map((item) => {
    const parentKeyValue = item[parentKey];
    const parentItem = map.get(parentKeyValue);
    if (!parentItem || !parentKeyValue) {
      result.push(item);
      return;
    }
    const siblings = parentItem[childrenKey];
    if (siblings === null || siblings === undefined) {
      // disable eslint tslint
      (parentItem as any)[childrenKey] = [item];
    } else if (Array.isArray(siblings)) {
      siblings.push(item);
    } else {
      const msg = `the key "${childrenKey}" is not an array, please check your data`;
      throw new Error(msg);
    }
  });

  return result;
}

export default fromArray;
