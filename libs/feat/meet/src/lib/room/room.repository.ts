import { Injectable } from '@angular/core'
import { Room } from './room.interfaces'
import { createRoomDocument } from './room.utilities'

@Injectable({
  providedIn: 'root',
})
export class RoomRepository {
  add(data: Omit<Room, 'id'>): Promise<Room> {
    return new Promise((resolve, reject) => {
      const room = createRoomDocument()
      room.offer = data.offer
    })
  }
}
