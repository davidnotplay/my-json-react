import JsonReactException from './JsonReactException'

/**
 * @todo Handler the props type?
 */
class TypeManager {
  getValue(prop, propName) {
    const { type, value } = prop
    if (type === undefined) {
      return value
    }

    if (typeof type != 'string' && !(type instanceof String)) {
      const message = `In property ${propName}, the property type should be a string.`
      throw new JsonReactException(message)
    }

    const formatter = this[type]

    if (formatter) {
      return formatter(value)
    }

    throw new JsonReactException(`Type ${type} not found.`)
  }
}

let typeManagerObj = null

/**
 * only for tests
 */
export const resetTypeManager = () => {
  typeManagerObj = null
}

export const makeTypeManager = (typeManager = undefined) => {
  typeManagerObj = typeManager !== undefined ? typeManager : new TypeManager()

  if (typeManagerObj instanceof TypeManager) {
    return typeManagerObj
  }

  throw new JsonReactException('Invalid type manager.')
}

export const getTypeManager = () => {
  if (typeManagerObj !== null) {
    return typeManagerObj
  }

  throw new JsonReactException('Type manager is not defined.')
}

export default TypeManager
