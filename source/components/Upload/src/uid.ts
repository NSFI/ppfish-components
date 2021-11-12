const now = +new Date();
let index = 0;

export default function uid(): string {
  return `rc-upload-${now}-${++index}`;
}
