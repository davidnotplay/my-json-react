import JsonReactException from './JsonReactException'

class ComponentsSelector {

  constructor(components) {
    this.components = components
  }

  getComponents() {
    return this.components
  }

  getComponent(name) {
    const component = this.components[name]
    if (component) {
      return component
    }

    throw new JsonReactException(`Component "${name}" not found.`)
  }
}

let componentsSelector = null

export function setComponentsSelector(newComponentsSelector) {
  componentsSelector = newComponentsSelector
}

export function getComponentsSelector() {
  return componentsSelector
}

export default ComponentsSelector