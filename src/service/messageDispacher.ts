import { customObjT } from './types'

function dispatcher(type: string): Function {
  let handler: Function | null = null
  switch (type) {
    case 'createRoom': {
      handler = createRoom
    }
  }
  return handler || function () { }
}

function createRoom(content: customObjT) {
  console.log('create')
}

export default dispatcher