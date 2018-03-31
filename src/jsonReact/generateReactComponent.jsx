import React from 'react'
import isPlainObject from 'is-plain-object'
import { getComponentsSelector } from './componentsSelector'
import { getTypeManager } from './TypeManager'
import JsonReactException from './JsonReactException'

/**
 * returns the comopnent `ComponentName` from the components selector
 * identify with the id `componentSelectorId`
 * @param {String} componentName Component name
 * @param {String} componentSelectorId Id it is used to get the `componentSelectorId`
 * @return {ComponentsSelector}
 */
export function getComponent(componentName) {
  return getComponentsSelector().getComponent(componentName)
}

/**
 * Get the props from the json object and transform them in React component props.
 * @param {Object} props Json props
 * @return {Object} Component props.
 */
export function getProps(props) {
  if (!props) {
    return {}
  }

  const propsParsed = {}
  const typeManager = getTypeManager()

  Object.keys(props).forEach(propName => {
    const prop = props[propName]
    propsParsed[propName] = typeManager.getValue(prop, propName)
  })

  return propsParsed
}

export function getChildren(children) {
  if (children === null) {
    return null
  }

  if (Array.isArray(children)) {
    return children.map((child, key) => generateComponent(child, key + 1))
  }

  if (isPlainObject(children)) {
    return generateComponent(children)
  }

  throw new JsonReactException('One of the property "children", in the json data, is invalid.')
}

export default function generateComponent(componentData, key=null) {
  try {
    const componentName = componentData.component
    const Component = getComponent(componentName)
    const props = getProps(componentData.props)
    const children = getChildren(
      componentData.children !== undefined ? componentData.children : null
    )

    if (key) {
      props.key = key
    }

    return children !== null
      ? <Component { ...props }>{ children }</Component>
      : <Component { ...props }/>
  } catch(e) {
    e.setJsonObj(componentData)
    throw e
  }
}