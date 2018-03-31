import React from 'react'
import isPlainObject from 'is-plain-object'
import ComponentsSelector, { setComponentsSelector } from './componentsSelector'
import { makeTypeManager } from './TypeManager'
import generateReactComponent from './generateReactComponent'
import ErrorComponent from './ErrorComponent'
import JsonReactException from './JsonReactException'


function validateJson(jsonData) {
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
 * Transform the the object or the json string `jsonData` in a react component.
 * The react components valids are in parameters `components`.
 */
function start(jsonData, components, options={}) {
  try {
    setComponentsSelector(new ComponentsSelector(components))
    makeTypeManager(options.typeManager)

    return generateReactComponent(validateJson(jsonData))

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