import
TypeManager,
{ makeTypeManager, getTypeManager, resetTypeManager } from '../MyJsonReact/TypeManager'
import './utils'

class DummyTypeManager extends TypeManager {
  typeTest(value) {
    return `test_${value}`
  }

  typeTest2(value) {
    return { 'dict1': value }
  }
}

describe('Test class TypeManager', () => {

  const typeManager = new TypeManager()
  const throwType = type => () => typeManager.getValue({ value: '', type }, 'test 1')
  const throwMakeTypeManager = (tm) => () => makeTypeManager(tm)
  const throwGetTypeManager = () => getTypeManager()

  test('Basic run', () => {
    expect(typeManager.getValue({value: 33}, 'test')).toBe(33)
    expect(typeManager.getValue({value: 'aaa', type: undefined}, 'test')).toBe('aaa')
    expect(typeManager.getValue({}, 'test')).toBe(undefined)
  })

  test('Invalid type', () => {
    expect(throwType([])).toThrow(
      'In property test 1, the property type should be a string.'
    )
    expect(throwType(3)).toThrow(
      'In property test 1, the property type should be a string.'
    )
    expect(throwType({})).toThrow(
      'In property test 1, the property type should be a string.'
    )
    expect(throwType(false)).toThrow(
      'In property test 1, the property type should be a string.'
    )
    expect(throwType(null)).toThrow(
      'In property test 1, the property type should be a string.'
    )
  })

  test('Type not found', () => {
    expect(throwType('invalid_type')).toThrow('Type invalid_type not found.')
    expect(throwType('type_2')).toThrow('Type type_2 not found.')
  })

  test('Custom type', () => {
    const dummyTP = new DummyTypeManager()
    expect(dummyTP.getValue({value: 'test1', type: 'typeTest'})).toBe('test_test1')
    expect(dummyTP.getValue({value: 'test1', type: 'typeTest2'})).toEqual({ 'dict1': 'test1' })
  })

  test('Make and get typeManager', () => {
    let typeManager = makeTypeManager()
    expect(typeManager).toEqual(getTypeManager())

    // custom type manager.
    typeManager = makeTypeManager(new DummyTypeManager())
    expect(typeManager).toEqual(getTypeManager())
    expect(typeManager instanceof DummyTypeManager).toBe(true)

    typeManager = makeTypeManager(undefined)
    expect(typeManager).toEqual(getTypeManager())
  })

  test('throw making and getting type manager', () => {
    // throw making
    expect(throwMakeTypeManager(null)).toThrow('Invalid type manager.')
    expect(throwMakeTypeManager('test')).toThrow('Invalid type manager.')
    expect(throwMakeTypeManager(new Object())).toThrow('Invalid type manager.')

    // throw getting
    resetTypeManager()
    expect(throwGetTypeManager).toThrow('Type manager is not defined.')
  })
})