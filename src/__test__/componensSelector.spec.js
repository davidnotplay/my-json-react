import ComponentsSelector, {
  setComponentsSelector, getComponentsSelector
}  from '../jsonReact/componentsSelector'
import './utils'

test('Test the class ComponentsSelector', () => {
  const components = {
    'component1': 'fake component 1',
    'component2': 'fake component 2'
  }
  const compSelector = new ComponentsSelector(components)

  const throwError = () => {
    compSelector.getComponent('invalid')
  }

  expect(compSelector.getComponents()).toEqual(components)
  expect(compSelector.getComponent('component1')).toBe('fake component 1')
  expect(compSelector.getComponent('component2')).toBe('fake component 2')
  expect(throwError).toThrow('Component "invalid" not found.')
})

test('Functions setComponentsSelector and getComponentsSelector', () => {
  let components = {
    'component1': 'fake component 1',
    'component2': 'fake component 2'
  }
  let componentsSelector = new ComponentsSelector(components)
  setComponentsSelector(componentsSelector)
  expect(getComponentsSelector()).toEqual(componentsSelector)
  expect(getComponentsSelector().getComponents()).toEqual(componentsSelector.getComponents())
  expect(getComponentsSelector() instanceof ComponentsSelector).toBe(true)

  components = {'component3': 'fake component 3'}
  componentsSelector = new ComponentsSelector(components)
  setComponentsSelector(componentsSelector)
  expect(getComponentsSelector()).toEqual(componentsSelector)
  expect(getComponentsSelector().getComponents()).toEqual(componentsSelector.getComponents())
  expect(getComponentsSelector() instanceof ComponentsSelector).toBe(true)
  expect(getComponentsSelector().getComponent('component3')).toBe('fake component 3')
})