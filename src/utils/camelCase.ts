import map from "lodash/map";
import mapKeys from "lodash/mapKeys";
import isArray from "lodash/isArray";
import cloneDeep from "lodash/cloneDeep";
import mapValues from "lodash/mapValues";
import camelCase from "lodash/camelCase";
import isPlainObject from "lodash/isPlainObject";
import isString from "lodash/isString";

export const camelCaseKeysDeep = (
  object: Record<string, string> | string
): unknown => {
  let camelCaseObject = cloneDeep(object);

  if (isString(camelCaseObject)) {
    return camelCaseObject;
  }

  if (isArray(camelCaseObject)) {
    return map(camelCaseObject, camelCaseKeysDeep);
  }
  camelCaseObject = mapKeys(camelCaseObject, (_value, key) => camelCase(key));

  return mapValues(camelCaseObject, (value) => {
    if (isPlainObject(value)) {
      return camelCaseKeysDeep(value);
    }
    if (isArray(value)) {
      return map(value, camelCaseKeysDeep);
    }

    return value;
  });
};
