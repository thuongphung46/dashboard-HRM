export const MappingLayoutToTable = (data: any, mapping: any[]) => {
  let result = [];
  if (data) {
    let objectKey = Object.keys(data);
    for (let i = 0; i < objectKey.length; i++) {
      let dataByKey = data[objectKey[i]];
      if (Array.isArray(dataByKey) && dataByKey.length > 0) {
        for (let j = 0; j < dataByKey.length; j++) {
          result.push({
            ...dataByKey[j],
            componentName: mapping.find((x) => x.i === dataByKey[j].i)
              .component,
            componentType: mapping.find((x) => x.i === dataByKey[j].i)
              .componentType,
            type: objectKey[i],
            static: true,
          });
        }
      }
    }
  }
  return result;
};

export const TableToLayoutDataType = (data: any[]) => {
  let result: any = {};
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (item.type in result) {
      result[item.type].push(item);
    } else {
      result[item.type] = [item];
    }
  }
  return result;
};

export function UniqueItemArray(arr: any[], keyProps: any[]) {
  const kvArray: any[] = arr.map((entry) => {
    const key = keyProps.map((k) => entry[k]).join("|");
    return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
}
