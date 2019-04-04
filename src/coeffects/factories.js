export function injectApiUrl() {
  return "apiUrl";
}

export function injectFromState(...extractions) {
  return { id: 'state', data: extractions };
}

export function injectDateTime() {
  return "datetime";
}