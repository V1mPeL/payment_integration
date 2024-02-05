export function utf8_to_b64(str: string) {
  if (typeof window !== 'undefined' && window.btoa) {
    // Browser environment
    return window.btoa(unescape(encodeURIComponent(str)));
  } else {
    // Node.js environment or other non-browser environment
    return Buffer.from(str, 'utf-8').toString('base64');
  }
}

export function b64_to_utf8(str: string) {
  if (typeof window !== 'undefined' && window.atob) {
    // Browser environment
    return decodeURIComponent(escape(window.atob(str)));
  } else {
    // Node.js environment or other non-browser environment
    return Buffer.from(str, 'base64').toString('utf-8');
  }
}
