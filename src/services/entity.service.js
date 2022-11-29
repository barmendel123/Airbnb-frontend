import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'entity'
const BASE_URL = `entity/`

export const entityService = {
   query,
   getById,
   save,
   remove,
}

let gEntities = []

async function query(filterBy) {
   try {
      // return httpService.get(BASE_URL, filterBy)
      let entities = await storageService.query(STORAGE_KEY)
      if (!entities || !entities.length) {
         storageService.postMany(STORAGE_KEY, gEntities)
         entities = gEntities
      }
      return entities
   } catch (err) {
      console.log('err: Cannot get entities ', err)
   }
}

async function getById(entityId) {
   try {
      //return httpService.get(BASE_URL + entityId)
      return storageService.get(STORAGE_KEY, entityId)
   } catch (err) {
      console.log('Cannot get entity', err)
   }
}

async function remove(entityId) {
   try {
      return storageService.remove(STORAGE_KEY, entityId)
      // return httpService.delete(BASE_URL + entityId)
   } catch (err) {
      console.log('Cannot remove entity', err)
   }
}

async function save(entity) {
   if (entity._id) {
      console.log('INSIDE PUT')

      try {
         // return httpService.put(BASE_URL + entity._id, entity)
         return storageService.put(STORAGE_KEY, entity)
      } catch (err) {
         console.log('Cannot edit entities', err)
      }
   } else {
      console.log('INSIDE POST')
      try {
         // return httpService.post(BASE_URL, entity)
         return storageService.post(STORAGE_KEY, entity)
      } catch (err) {
         console.log('Cannot add entities', err)
      }
   }
}
