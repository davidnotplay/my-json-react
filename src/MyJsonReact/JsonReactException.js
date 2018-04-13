
export default class JsonReactException{
  constructor(message, jsonObj = undefined) {
    this.message = message
    this.jsonObj = jsonObj
  }

  getJsonObject() {
    return this.jsonObj
  }

  getMessage() {
    return this.message
  }

  setJsonObj(jsonObj) {
    this.jsonObj = jsonObj
  }
}