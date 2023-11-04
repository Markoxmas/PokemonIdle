export const formatNumber = (num: number): string => {
  if (num < 10000) {
    return num.toString();
  } else if (num < 1000000) {
    const thousands = (num / 1000).toFixed(1);
    return thousands.endsWith(".0")
      ? `${thousands.slice(0, -2)}K`
      : `${thousands}K`;
  } else if (num < 1000000000) {
    const millions = (num / 1000000).toFixed(1);
    return millions.endsWith(".0")
      ? `${millions.slice(0, -2)}M`
      : `${millions}M`;
  } else {
    const billions = (num / 1000000000).toFixed(1);
    return billions.endsWith(".0")
      ? `${billions.slice(0, -2)}B`
      : `${billions}B`;
  }
};
