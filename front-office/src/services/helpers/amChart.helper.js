export function formatDataForAmChartBar(data) {}
export function formatDataForAmChartPie(object) {
  const dataFormated = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      dataFormated.push({
        label: key,
        nombre: object[key].length,
      });
    }
  }
  return dataFormated;
}
