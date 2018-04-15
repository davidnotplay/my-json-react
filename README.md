# My JSON React

Transform a plain javascript object or a json string in a React component.

Basically transform this:
```json
{
  "component": "HelloWorld",
  "props": {
    "text": {
      "value": "hello world!!!"
    }
  },
  "children": [
    {
      "component": "Text",
      "props": {
        "text": {
          "value": "text 1"
        }
      }
    },
    {
      "component": "NumberText",
      "props": {
        "text": {
          "value": "text 2"
        },
        "number": {
          "value": 1
        }
      }
    }
  ]
}
```

in this:
```html
<HelloWorld text="hello world!!!">
  <Text text="text 1" key={ 1 }/>
  <NumberText text="text 2" number={ 1 } key={ 2 }/>
</HelloWorld>
```

## Install
```
$ npm install --save my-json-react
```

## Usage

```js
import myJsonReact from 'my-json-react'
import jsonObj from '../my.json'

const components {
  // list of react components defined in json obj
}

const jsonRendered = myJsonReact(jsonObj, components)

return <div>{ jsonRendered }</div>
```

### `myJsonReact(jsonData, components, options)`

#### `{object|string} jsonData`
Javascript object or json string with the data they will be used to create the React component.

##### Json format
```js
{
  // React component name,
  "component": "CompnentName"
   // Object with the component props. *Optional
  "props": {
    // prop name
    "propName": {
      // prop value
      "value": "prop value",
       // prop type. *optional
      "type": "type prop"
    },
    // more props...
  },
  // List of the children of the component. Children property can be:
  // - An object with another component
  // - An array with a list of object with other components
  "children": {
    "component": "ComponentName"
    "props": {}
    "children": {
      // ...
    }
  }
}
```

* `component (string)`: Is the name of you react component. This should be defined previously in the object `components` of the function.
* `props (object optional)`: Object with the component properties. Each object key is the property name and the object value is another object with:
  * `value` Property value.
  * `type (string optional)`. Property type. You can define and use custom types. See [TypeManager](#class-typemanager) class for more info.

* `children (object|array optional)`
  - If is a object, this must replicate the main structure again (`component`, `props`, `children`)
  - If is an array, each element of the array must be an object with the main structure (`component`, `props`, `children`)

#### `{Object} components`
List with all components that you wan use in the json files. The object keys is the component name inside of the json file. The object values is the react component

#### `{Object} Options`
* `errorComponent (ReactComponent)` React component to customize the possible exceptions generate by the function. This error component has one property `exception`, that has the exception object.

* `typeManager (TypeManager)` Object to define the custom type for the properties.
See [TypeManager](#class-typemanager) class for more info.




#### Example
```js
// javascript plain object with react structure.
const jsonObject = {
  'component': 'ComponentGrandFather',
  'props': {
    'propName1': {
      'value': 'prop value 1'
    }
  },
  'children': {
    'component': 'ComponentFather',
    'props': {
      'propName2': {
        'value': 'prop value 2'
      }
    }
    'children': [
      {
        'component': 'Child',
        'props': { 'propName3': 'child 1' }
      },
      {
        'component': 'Child',
        'props': { 'propName3': 'child 2' }
      }
    ]
  }
}

// list of components used in json object.
const componentsList = {
  ComponentGrandFather, ComponentFather, Child
}

// define a custom error component.
const ErrorComponent = props => (
  <div>
    <h1>Error</h1>
    <p>{ props.exception.message }</p>
  </div>
)

const options = { errorComponent: ErrorComponent }

const jsonRendered = start(jsonObject, componentList, options);
/* the react component rendered is:

<ComponentGrandFather propName1="prop value 1">
  <ComponentFather propName2="prop value 2">
    <Child propName3="child 1" key={ 1 }/>
    <Child propName3="child 2" key={ 2 }/>
  </ComponentFather>
</ComponentGrandFather>

*/
```

### class `TypeManager`
You can define new property types using this class.
It is usefull to customize the react component properties.

To make new property types. First it make a class that extends of the class `TypeManager`.
In this new class you make methods with the name of the property types. This methods recive
the parameter `value` that is the key `value` in the object `props` of the json object;
and return the react property value. Finally you add an instance of the class in the
[options](#object-options) of the function `myJsonReact`.

#### How define new types. Example
```js
import myJsonReact, { TypeManager } from 'my-json-react'

const DummyComponent = props => <div>{ props.name }</div>

// make custom class with the types.
class CustomTypeManager extends TypeManager {
  // Make methods with the type names.
  toLower(value) {
    return value.toLowerCase();
  }

  dummyComponent(value) {
    return <DummyComponent name={ value }/>
  }
}

const jsonObject = {
  'component': 'ComponentTest1'
  'props': {
    'propName1': {
      'value': 'HELLO WORLD',
      // PropName1 is of type toLower. Defined in CustomTypeManager
      'type': 'toLower'
    },
    'propName2': {
      'value': 'name 1',
      // PropName1 is of type dummyComponent. Defined in CustomTypeManager
      'type': 'dummyComponent'
    }
  }
}

const listComponents = { ComponentTest1 }

// Make the option typeManager, that is an instance of the class CustomTypeManager.
const options = { typeManager: new CustomTypeManager() }

const componentRendered = myJsonReact(jsonObject, listComponents, options)
/*
component rendered:
<ComponentTest1 propName1="hello world" propName2={ <DummyComponent name="name 1"/> }/>
*/
```

## LICENSE
This project is licensed under the terms of the MIT license.