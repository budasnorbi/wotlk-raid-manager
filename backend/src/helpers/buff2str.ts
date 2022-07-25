export const buff2Str = (buffer: Buffer) => {
  let result = "";
  for (let i = 0; i < buffer.length; i++) {
    result += String.fromCharCode(buffer.readUint8(i));
  }
  return result;
};
