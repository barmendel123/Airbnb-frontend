const initialState = {
  entities: null,
  entity: null,
}

export function entityReducer(state = initialState, action) {
  let entity

  switch (action.type) {
    case 'SET_ENTITY':
      entity = state.entities.find((entityInState) => entityInState._id === action.entityId) || null
      state = { ...state, entity }
      break

    case 'REMOVE_ENTITY':
      entity = state.entities.filter((entity) => entity._id !== action.entityId)
      state = { ...state, entities: entity }
      break

    case 'ADD_ENTITY':
      state = { ...state, entities: [...state.entities, action.entity] }
      break

    case 'UPDATE_ENTITY':
      state = { ...state, entity: action.entity }
      break

    case 'UPDATE_ENTITIES':
      entity = state.entities.map((entity) => (entity._id === action.entity._id ? action.entity : entity))
      state = { ...state, entities: entity }
      break

    default:
      return state
  }
  // For debug:
  window.entityState = state
  return state
}
