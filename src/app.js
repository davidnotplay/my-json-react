import start from './jsonReact/index'
import { render } from 'react-dom'
import jsonData from './json/test.json'
import Test from './components/Test.jsx'

const componentsList = { Test: Test }


const Component = start(jsonData, componentsList)

render(Component, document.getElementById('app'))