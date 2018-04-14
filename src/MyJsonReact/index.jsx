/**!
 * My JSON React.
 * @author David Casado <dcasadomartinez@gmail.com>
 * @license MIT
 */
import React from 'react'
import isPlainObject from 'is-plain-object'
import ComponentsSelector, { setComponentsSelector } from './componentsSelector'
import { makeTypeManager } from './TypeManager'
import generateReactComponent from './generateReactComponent'
import ErrorComponent from './ErrorComponent'
import JsonReactException from './JsonReactException'
import TypeManager from './TypeManager'


/**
 * Check which the paramater `jsonData` is a valid plain object or a json string.
 * If it is a json string then it is parsed.
 *
 * @param {string|object} jsonData json object will
 * @return {object} jsonData parsed (if it is a string)
 * @throws {JsonReactException} If `jsonData` is an invalid json string or it isn't a plain object.
 */
function validateParseJson(jsonData) {
  if (typeof jsonData == 'string' || jsonData instanceof String) {
    try {
      jsonData = JSON.parse(jsonData)
    } catch(e) {
      throw new JsonReactException('Invalid json string.')
    }
  }

  if (!isPlainObject(jsonData)) {
    throw new JsonReactException('The json data is not a plain object.')
  }

  return jsonData
}


/**
 * Transform the parameter `jsonData` in a React component.
 * The only react components that you can use in the `jsonData` are defined in the
 * parameter `components`
 *
 * Options is an object to customize the use of the function.
 * All options:
 * - typeManager: Instance of a subclass of TypeManager.
 * This option is used to customize the types of component properties.
 * - errorComponent: React component used in the errors.
 * This component will use if there are an error when render the object `jsonData`
 *
 * @param {object|string} jsonData
 *
 */
function start(jsonData, components, options={}) {
  try {
    setComponentsSelector(new ComponentsSelector(components))
    makeTypeManager(options.typeManager)

    return generateReactComponent(validateParseJson(jsonData))

  } catch(e) {
    if (e instanceof JsonReactException) {
      const CustomErrorComponent = options.errorComponent
      return CustomErrorComponent
        ? <CustomErrorComponent exception={ e }/>
        : <ErrorComponent exception={ e } />
    }

    throw e
  }
}

export default start
export { TypeManager }
