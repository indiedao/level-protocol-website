export const hexToRgba = (hex, opacity = 1) => {
  let parsedHex = hex.replace('#', '');
  parsedHex = parsedHex.match(new RegExp(`(.{${parsedHex.length / 3}})`, 'g'));
  const colors = [];

  parsedHex.forEach((h) => {
    colors.push(parseInt(h.length === 1 ? h + h : h, 16));
  });
  colors.push(opacity);

  return `rgba(${colors.join(',')})`;
};