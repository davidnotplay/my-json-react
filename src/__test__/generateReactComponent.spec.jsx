import React from 'react'
import { mount } from 'enzyme'
import generateComponent, {
  getComponent, getProps, getChildren
}  from '../jsonReact/generateReactComponent'
import ComponentsSelector, { setComponentsSelector } from '../jsonReact/componentsSelector'
import TypeManager, { makeTypeManager } from '../jsonReact/TypeManager'

import HelloWorld from './components/HelloWorld'
import Test from './components/Test'
import List from './components/List'
import Item from './components/Item'
import Link from './components/Link'
import './utils'

import jsonTest1 from './jsons/test1.json'
import children1 from './jsons/children1.json'
import jsonTest2 from './jsons/test2.json'


class DummyTypeManager extends TypeManager {
  dummyType(value) {
    return `dummy_${value}`
  }
}

makeTypeManager(new DummyTypeManager())


test('Function getComponent', () => {
  const componentsSelector = new ComponentsSelector({ Test, HelloWorld })
  setComponentsSelector(componentsSelector)

  const HelloWorldComponent = getComponent('HelloWorld')
  let wrapper = mount(<HelloWorldComponent name="test"/>)

  expect(wrapper.text()).toBe('Hello world. My name is test')
  expect(wrapper.type()).toEqual(HelloWorld)


  const TestComponent = getComponent('Test')
  wrapper = mount(<Test/>)
  expect(wrapper.type()).toBe(TestComponent)
})

test('Function getProps', () => {
  expect(getProps({})).toEqual({})

  let jsonProps = {
    'prop1': {
      'value': 33
    }
  }
  expect(getProps(jsonProps)).toEqual({'prop1': 33})
  jsonProps.prop2 = {'value': 'new-value'}
  expect(getProps(jsonProps)).toEqual({'prop1': 33, 'prop2': 'new-value'})

  // custom types.
  jsonProps = {
    'prop1': {
      'value': 'normal-value'
    },
    'newType': {
      'value': 'value',
      'type': 'dummyType'
    }
  }
  let results = { 'prop1': 'normal-value', 'newType': 'dummy_value'}
  expect(getProps(jsonProps)).toEqual(results)
})

describe('Function getChildren', () => {
  test('Normal run', () => {
    // pass null
    expect(getChildren(null)).toBe(null)

    // pass object
    let jsonData = {
      'component': 'HelloWorld',
      'props': {
        'name': {
          'value': 'name 1'
        }
      }
    }
    let wrapper = mount(getChildren(jsonData))
    expect(wrapper.type()).toEqual(HelloWorld)
    expect(wrapper.text()).toBe('Hello world. My name is name 1')

    // Pass array. Get the json from `./jsons/children1.json`
    let children = getChildren(children1)
    expect(Array.isArray(children)).toBe(true)
    expect(children.length).toBe(3)
    let wrapperArray = [mount(children[0]), mount(children[1])]
    let wrapperChild3 = mount(children[2])

    wrapperArray.forEach((wrapperChild, i) => {
      expect(wrapperChild.type()).toEqual(HelloWorld)
      expect(wrapperChild.props().name).toBe(`name ${i + 1}`)
      expect(wrapperChild.text()).toBe(`Hello world. My name is name ${i + 1}`)
    })

    expect(wrapperChild3.type()).toBe(Test)
    expect(wrapperChild3.find('div > div').at(0).text()).toBe('Test component name 2, number is 2')
    expect(wrapperChild3.props().name).toBe('name 2')
    expect(wrapperChild3.props().number).toBe(2)
    let wrapperChild = mount(wrapperChild3.props().children)
    expect(wrapperChild.type()).toBe(HelloWorld)
    expect(wrapperChild.props().name).toBe('name 2')
  })

  test('Exception', () => {
    const throwError = jsonData => () => getChildren(jsonData)

    expect(throwError(3)).toThrow('One of the property "children", in the json data, is invalid.')
    expect(throwError(undefined)).toThrow(
      'One of the property "children", in the json data, is invalid.'
    )
  })
})

describe('Function generateComponent', () => {
  test('Normal run', () => {
    const componentsSelector = new ComponentsSelector({ Test, HelloWorld, Link, Item, List })
    setComponentsSelector(componentsSelector)
    let jsonData = {
      'component': 'HelloWorld',
      'props': {
        'name': {
          'value': 'test'
        }
      }
    }
    let Component = generateComponent(jsonData)
    let wrapper = mount(Component)
    expect(wrapper.type()).toEqual(HelloWorld)
    expect(wrapper.text()).toBe('Hello world. My name is test')

    Component = generateComponent(jsonTest1)
    wrapper = mount(Component)

    expect(wrapper.find('div > div').at(0).text()).toBe('Test component name 1, number is 3')
    expect(wrapper.props().name).toBe('name 1')
    expect(wrapper.props().number).toBe(3)
    expect(wrapper.find(HelloWorld).at(0).text()).toBe('Hello world. My name is name 1')
    expect(wrapper.find('div > div').at(1).text()).toBe('Hello world. My name is name 1')


    // another json object.
    Component = generateComponent(jsonTest2)
    wrapper = mount(Component)

    expect(wrapper.type()).toEqual(List)
    const items =wrapper.find(Item)
    expect(items.length).toBe(3)
    expect(items.at(0).type()).toBe(Item)
    expect(items.at(0).props().text).toBe('text 1')

    expect(items.at(1).type()).toBe(Item)
    expect(items.at(1).props().text).toBe('text 2')

    expect(items.at(2).type()).toBe(Item)
    expect(items.at(2).props().children).toBeDefined()
    expect(items.at(2).find(Link).length).toBe(1)
    expect(items.at(2).find(Link).at(0).props().text).toBe('Link 1')
    expect(items.at(2).find(Link).at(0).props().url).toBe('url-1')
  })
})