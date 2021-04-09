function replaceNonDash(str) {
  return str.replaceAll(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function convertErrorToKey(key, values) {
  key = replaceNonDash(key);
  if (!Array.isArray(values)) {
    values = [values];
  }

  values = values.map(replaceNonDash);

  return `error__${key}__${values.join("_")}`;
}

export { convertErrorToKey };
