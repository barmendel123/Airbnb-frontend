import { entityService } from '../../services/entity.service.js'

// Action Creators:
export function getActionRemoveBoard(entityId) {
  return {
    type: 'REMOVE_ENTITY',
    entityId,
  }
}

export function getActionAddBoard(entity) {
  return {
    type: 'ADD_ENTITY',
    entity,
  }
}

export function getActionUpdateBoard(entity) {
  return {
    type: 'UPDATE_ENTITY',
    entity,
  }
}

export function loadEntities() {
  return async (dispatch) => {
    try {
      const entities = await entityService.query()
      dispatch({
        type: 'SET_ENTITIES',
        entities: [...entities],
      })
    }
    catch (err) {
      console.log('Cannot load entities', err)
    }
  }
}

export function removeEntity(entityId) {
  return async (dispatch) => {
    try {
      await entityService.remove(entityId)
      console.log('Deleted Succesfully!')
      dispatch(getActionRemoveBoard(entityId))
    }
    catch (err) {
      console.log('Cannot remove entity', err)
    }
  }
}

export function addEntity(entity) {
  return async (dispatch) => {
    try {
      const savedEntity = await entityService.save(entity)
      dispatch(getActionAddBoard({ ...savedEntity }))
    }
    catch (err) {
      console.log(`cannot add entity:`, err)
    }
  }
}

export function getEntity(entityId) {
  return async (dispatch) => {
    try {
      const entity = await entityService.getById(entityId)
      dispatch({ type: 'SET_ENTITY', entity: { ...entity } })
    }
    catch (err) {
      console.log(`cannot add entity:`, err)
    }
  }
}

export function updateEntity(entity) {
  return async (dispatch, getState) => {
    const prevEntity = { ...getState().boardModule.entity }
    dispatch(getActionUpdateBoard({ ...entity }))

    try {
      await entityService.save(entity)
    }
    catch (err) {
      dispatch(getActionUpdateBoard(prevEntity))
      console.log('Cannot update entity', err)
    }
  }
}
