import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Room } from './room.interfaces'
import { RoomService } from './room.service'

@Injectable({
  providedIn: 'root',
})
export class RoomFacade {
  rooms = new BehaviorSubject<Room[]>([])
  rooms$ = this.rooms.asObservable()

  constructor(private service: RoomService) {}

  create(): void {
    this.service.createRoom().then((room) => {
      this.rooms.next([...this.rooms.value, room])
    })
  }
}
