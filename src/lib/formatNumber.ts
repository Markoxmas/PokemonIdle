export const formatNumber = (num: number): string => {
  if (num < 10000) {
    return num.toString();
  } else if (num < 1000000) {
    const thousands = (num / 1000).toFixed(1);
    return thousands.endsWith(".0")
      ? `${thousands.slice(0, -2)}k`
      : `${thousands}k`;
  } else if (num < 1000000000) {
    const millions = (num / 1000000).toFixed(1);
    return millions.endsWith(".0")
      ? `${millions.slice(0, -2)}m`
      : `${millions}m`;
  } else {
    const billions = (num / 1000000000).toFixed(1);
    return billions.endsWith(".0")
      ? `${billions.slice(0, -2)}b`
      : `${billions}b`;
  }
};
