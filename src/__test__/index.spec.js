import React from 'react'
import { mount } from 'enzyme'

import start from '../jsonReact'
import { getComponentsSelector } from '../jsonReact/componentsSelector'
import TypeManager from '../jsonReact/TypeManager'
import ErrorComponent from '../jsonReact/ErrorComponent'
import HelloWorld from '../components/HelloWorld'
import Test from '../components/Test'
import Link from '../components/Link'
import Item from '../components/Item'
import List from '../components/List'
import './utils'

const allComponents = { Test, HelloWorld, Link, Item, List }

test('Component data', () => {
  start({}, allComponents)
  expect(getComponentsSelector().components).toEqual(allComponents)
})


describe('Render json data', () => {
  test('json object', () => {
    const jsonData = {
      'component': 'HelloWorld',
      'props': {
        'name': { value: 'test 1'}
      }
    }

    let wrapper = mount(start(jsonData, allComponents))
    expect(wrapper.type()).toBe(HelloWorld)
    expect(wrapper.props().name).toBe('test 1')
  })

  test('Invalid json data', () => {
    let wrapper = mount(start(3, allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('The json data is not a plain object.')

    wrapper = mount(start(true, allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('The json data is not a plain object.')

    wrapper = mount(start(null, allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('The json data is not a plain object.')

    wrapper = mount(start(undefined, allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('The json data is not a plain object.')

    wrapper = mount(start('3', allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('The json data is not a plain object.')
  })

  test('Json string', () => {
    const jsonData = {
      'component': 'HelloWorld',
      'props': {
        'name': { value: 'test 1'}
      }
    }

    let wrapper = mount(start(JSON.stringify(jsonData), allComponents))
    expect(wrapper.type()).toBe(HelloWorld)
    expect(wrapper.props().name).toBe('test 1')
  })

  test('Invalid Json string', () => {
    let wrapper = mount(start('test', allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('Invalid json string.')

    wrapper = mount(start('[]', allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
    expect(wrapper.props().exception.message).toBe('The json data is not a plain object.')
  })
})

test('Custom type manager', () => {
  class CustomTypeManager extends TypeManager {
    ctype(value) {
      return `v_${value}`
    }
  }

  const jsonData = {
    component: 'HelloWorld',
    props: {
      name: {
        value: 'test',
        type: 'ctype'
      }
    }
  }

  let wrapper = mount(start(jsonData, allComponents, {typeManager: new CustomTypeManager()}))
  expect(wrapper.type()).toEqual(HelloWorld)
  expect(wrapper.props().name).toBe('v_test')
})

describe('Error component', () => {
  test('Default error component', () => {
    const jsonData = {'component': 'Invalid'}
    let wrapper = mount(start(jsonData, allComponents))
    expect(wrapper.type()).toBe(ErrorComponent)
  })

  test('Customm error component', () => {
    class CustomError extends React.Component {
      render() {
        return <div>Error</div>
      }
    }
    const jsonData = {'component': 'Invalid'}
    let wrapper = mount(start(jsonData, allComponents, { errorComponent: CustomError }))
    expect(wrapper.type()).toBe(CustomError)
  })
})
