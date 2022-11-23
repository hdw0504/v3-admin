import type { MaybeRef } from '@vueuse/core'
/**
 * string to lower case
 * @param str strinng
 * @param startWith string
 * @param endWith string
 * @returns string
 */
export function lowerCaseStr(str: string, startWith = '', endWith = '') {
  str = str.replace(/[A-Z]/g, v => `${startWith}${v.toLocaleLowerCase()}${endWith}`)
  if (startWith !== '' && str.startsWith(startWith))
    str = str.substring(1)
  if (endWith !== '' && str.endsWith(endWith))
    str = str.substring(0, str.length - 1)
  return str
}

export function hump2line(str: MaybeRef<string>) {
  return lowerCaseStr(unref(str), '-')
}
