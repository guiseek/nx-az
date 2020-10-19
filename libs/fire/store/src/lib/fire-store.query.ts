import { firestore } from 'firebase/app'

export class FireStoreQuery {
  where?: Array<[string | firestore.FieldPath, firestore.WhereFilterOp, any]>
  orderBy?: [string | firestore.FieldPath, firestore.OrderByDirection]
  limit?: number
  startAt?: string
  startAfter?: string
  endAt?: string
  endBefore?: string

  execute(ref: firestore.Query | firestore.CollectionReference) {
    let query: any = ref

    if (this.where) {
      for (const w of this.where) {
        query = query.where(w[0], w[1], w[2])
      }
    }

    if (this.orderBy) query = query.orderBy(this.orderBy[0], this.orderBy[1])

    if (this.limit) query = query.limit(this.limit)

    if (this.startAt) query = query.startAt(this.startAt)

    if (this.startAfter) query = query.startAfter(this.startAfter)

    if (this.endAt) query = query.endAt(this.endAt)

    if (this.endBefore) query = query.endBefore(this.endBefore)

    return query
  }
}
