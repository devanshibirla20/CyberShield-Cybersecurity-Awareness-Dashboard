/** Safe hash-based ID — works on any string including non-ASCII URLs */
export function safeId(str = '') {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return Math.abs(h).toString(36).padStart(10, '0')
}
