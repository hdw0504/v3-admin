import { typeIs } from '@/utils/is'

export function deepClone<T>(obj: T): T {
  const copiedObjects = new WeakMap<object, any>()
  const copy = (obj: T): T => {
    const result: any = {}
    switch (typeIs(obj)) {
      case 'Array':
        return (obj as T[]).map(copy) as T
      case 'Date':
        return new Date((obj as Date).getTime()) as T
      case 'Object':
        if (copiedObjects.has(obj as object))
          return copiedObjects.get(obj as object)

        copiedObjects.set(obj as object, result)
        for (const key in obj) {
        // if(obj.hasOwnProperty(key)){
          if (Object.prototype.hasOwnProperty.call(obj, key))
            result[key] = copy(obj[key] as any)
        }
        return result
      default:
        return obj
    }
  }
  return copy(obj)
}

