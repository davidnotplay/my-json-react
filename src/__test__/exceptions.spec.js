import { mount } from 'enzyme'
import start from '../MyJsonReact'

import HelloWorld from './components/HelloWorld'
import Test from './components/Test'
import List from './components/List'
import Item from './components/Item'
import Link from './components/Link'
import './utils'

const allComponents = { Test, HelloWorld, Link, Item, List }

const message = component => component.props().exception.message
const json = component => component.props().exception.json


test('Invalid json data', () => {
  let wrapper = mount(start('33', allComponents))
  expect(message(wrapper)).toBe('The json data is not a plain object.')
  expect(json(wrapper)).toBeUndefined()

  wrapper = mount(start('{test', allComponents))
  expect(message(wrapper)).toBe('Invalid json string.')
  expect(json(wrapper)).toBeUndefined()
})


test('Invalid children', () => {
  const jsonData = {component: 'HelloWorld', children: 'test'}
  let wrapper = mount(start(jsonData, allComponents))
  expect(message(wrapper)).toBe('One of the property "children", in the json data, is invalid.')
})

test('Component not found', () => {
  const jsonData = {component: 'Hello', children: 'test'}
  let wrapper = mount(start(jsonData, allComponents))
  expect(message(wrapper)).toBe('Component "Hello" not found.')
})

test('Invalid React property type', () => {
  let jsonData = { component: 'Test', props: {name: {type: 33, value: 3}}}
  let wrapper = mount(start(jsonData, allComponents))
  expect(message(wrapper)).toBe('In property name, the property type should be a string.')

  jsonData = { component: 'Test', props: {name: {type: 'invalid_type', value: 3}}}
  wrapper = mount(start(jsonData, allComponents))
  expect(message(wrapper)).toBe('Type invalid_type not found.')
})


test('Handle type manager', () => {
  let jsonData =  { component: 'HelloWorld' }
  let options = { typeManager: 'invalid' }
  let wrapper = mount(start(jsonData, allComponents, options))

  expect(message(wrapper)).toBe('Invalid type manager.')
})