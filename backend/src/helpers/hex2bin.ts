export function hex2bin(hex: string) {
  return ('00000000' + parseInt(hex, 16).toString(2)).substr(-8);
}
