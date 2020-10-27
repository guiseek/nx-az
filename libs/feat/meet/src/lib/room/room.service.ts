import { Injectable } from '@angular/core'
import { Room } from './room.interfaces'
import { createRoomConfiguration, createRoomDocument } from './room.utilities'

@Injectable({
  providedIn: 'root',
})
class RoomRepository {
  add(data: Omit<Room, 'id'>): Promise<Room> {
    return new Promise((resolve, reject) => {
      const room = createRoomDocument()
      room.offer = data.offer
    })
  }
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private repository: RoomRepository) {}

  async createRoom() {
    const peerConnection = new RTCPeerConnection(createRoomConfiguration())
    const offer: RTCSessionDescriptionInit = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    return this.repository.add({ offer })
  }
}
