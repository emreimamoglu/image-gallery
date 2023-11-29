// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: unknown[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }