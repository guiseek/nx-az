import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { normalizePath } from './fire-store.utilities'
import { FireStoreDoc } from './fire-store.interfaces'
import { FireStoreQuery } from './fire-store.query'
import { FireStorePath } from './fire-store.types'

@Injectable({
  providedIn: 'root',
})
export class FireStoreService<T extends FireStoreDoc> {
  constructor(protected afs: AngularFirestore) {}

  collection(path: FireStorePath) {
    return this._col(path)
  }

  query(path: FireStorePath, q: FireStoreQuery) {
    return this.afs.collection<T>(normalizePath(path), (ref) => q.execute(ref))
  }

  add(path: FireStorePath, data: T) {
    return this._col(path).add(data)
  }

  set(path: FireStorePath, data: T) {
    data = this._checkId(data)

    return this._col(path).doc(data.id).set(data)
  }

  doc(path: FireStorePath) {
    return this.afs.doc(normalizePath(path))
  }

  del(path: FireStorePath) {
    return this.afs.doc(normalizePath(path)).delete()
  }

  writeBatch(path: string, data: T[]) {
    const batch = this.afs.firestore.batch()

    data.forEach((d) => batch.set(this._createRef(path, d), d))

    return batch.commit()
  }

  private _createRef(path: string, data: T) {
    data = this._checkId(data)

    return this.afs.doc<T>(normalizePath([path, data.id])).ref
  }

  private _checkId(data: T) {
    return { ...data, id: data.id ?? this.afs.createId() }
  }

  private _col(path: FireStorePath) {
    return this.afs.collection<T>(normalizePath(path))
  }
}
