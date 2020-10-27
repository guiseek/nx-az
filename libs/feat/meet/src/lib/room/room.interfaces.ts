export interface IceServers {
  urls: string[]
}

export interface RoomConfiguration {
  iceServers: IceServers[]
  iceCandidatePoolSize: number
}

export interface Room {
  id: string
  offer?: RTCSessionDescriptionInit
  answer?: RTCSessionDescriptionInit
  created?: Date
  updated?: Date
}
