import { generateUID } from './fire-store.utilities'

export interface FireStoreDoc {
  id: string
  created?: firebase.firestore.Timestamp
  updated?: firebase.firestore.Timestamp
}

export class CreateDocument {
  id: string = generateUID()
  created: Date = new Date()
  updated: Date = new Date()
}
