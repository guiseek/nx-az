import { AngularFirestore } from '@angular/fire/firestore'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { firestore } from 'firebase/app'
import { fromEvent } from 'rxjs'
import { RoomFacade } from './room.facade'

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}

interface RoomOffer {
  offer: RTCSessionDescriptionInit
}

interface Room {
  id?: string
  offer: RTCSessionDescriptionInit
  answer?: RTCSessionDescriptionInit
}

@Component({
  selector: 'nx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit {
  peerConnection!: RTCPeerConnection
  localStream!: MediaStream
  remoteStream!: MediaStream

  // roomDialog = null
  @ViewChild('roomDialog') roomDialog!: TemplateRef<HTMLElement>
  roomDialogRef!: MatDialogRef<HTMLElement>

  @ViewChild('roomId') roomId!: ElementRef<HTMLInputElement>
  @ViewChild('currentRoom') currentRoom!: ElementRef<HTMLHeadingElement>

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>

  el = this._elRef.nativeElement

  @ViewChild('cameraBtn') cameraBtn!: ElementRef<HTMLButtonElement>
  @ViewChild('hangupBtn') hangupBtn!: ElementRef<HTMLButtonElement>
  @ViewChild('createBtn') createBtn!: ElementRef<HTMLButtonElement>
  @ViewChild('joinBtn') joinBtn!: ElementRef<HTMLButtonElement>
  @ViewChild('confirmJoinBtn') confirmJoinBtn!: ElementRef<HTMLButtonElement>

  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _firestore: AngularFirestore,
    private _dialog: MatDialog,
    private _facade: RoomFacade
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.cameraBtn.nativeElement?.addEventListener('click', this.openUserMedia)
    this.hangupBtn.nativeElement?.addEventListener('click', this.hangUp)
    this.createBtn.nativeElement?.addEventListener('click', this.createRoom)
    this.joinBtn.nativeElement?.addEventListener('click', this.joinRoom)

    // this.roomDialogRef = this._dialog.open(this.roomDialog)

    console.log(this.cameraBtn.nativeElement)

    console.log(this.roomDialogRef)
  }

  createRoom = async () => {
    this.createBtn.nativeElement.disabled = true
    this.joinBtn.nativeElement.disabled = true

    // const db = firestore()

    console.log('Create PeerConnection with configuration: ', configuration)
    this.peerConnection = new RTCPeerConnection(configuration)

    this.registerPeerConnectionListeners()

    // Add code for creating a room here
    const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer)

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    }
    const roomRef = await this._firestore
      .collection<Room>('rooms')
      .add(roomWithOffer)
    const roomId = roomRef.id
    this.currentRoom.nativeElement.innerText = `Current room is ${roomId} - You are the caller!`

    // Code for creating room above

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream)
    })

    // Code for creating a room below

    // Code for creating a room above

    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates')

    this.peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!')
        return
      }
      console.log('Got candidate: ', event.candidate)
      callerCandidatesCollection.add(event.candidate.toJSON())
    })
    // Code for collecting ICE candidates above

    this.peerConnection.addEventListener('track', (event) => {
      console.log('Got remote track:', event.streams[0])
      event.streams[0].getTracks().forEach((track) => {
        console.log('Add a track to the remoteStream:', track)
        this.remoteStream.addTrack(track)
      })
    })

    // Listening for remote session description below
    roomRef.onSnapshot(async (snapshot) => {
      console.log('Got updated room:', snapshot.data())
      const data: any = snapshot.data()
      if (!this.peerConnection.currentRemoteDescription && data.answer) {
        console.log('Set remote description: ', data.answer)
        const answer = new RTCSessionDescription(data.answer)
        await this.peerConnection.setRemoteDescription(answer)
      }
    })
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const data = change.doc.data()
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
        }
      })
    })
    // Listen for remote ICE candidates above
  }

  joinRoom = () => {
    this.createBtn.nativeElement.disabled = true
    this.joinBtn.nativeElement.disabled = true

    this.confirmJoinBtn.nativeElement.addEventListener(
      'click',
      async () => {
        const roomId = this.roomId.nativeElement.value
        console.log('Join room: ', roomId)
        this.currentRoom.nativeElement.innerText = `Current room is ${roomId} - You are the callee!`
        await this.joinRoomById(roomId)
      },
      { once: true }
    )

    this.roomDialogRef = this._dialog.open(this.roomDialog)
    // this.roomDialog.open()
  }

  joinRoomById = async (roomId: string) => {
    // const db = firestore()
    const roomRef = this._firestore
      .collection<Room>('rooms')
      .doc<Room>(`${roomId}`)
    const roomSnapshot = await roomRef.get().toPromise()

    console.log('Got room:', roomSnapshot.exists)

    if (roomSnapshot.exists) {
      console.log('Create PeerConnection with configuration: ', configuration)
      this.peerConnection = new RTCPeerConnection(configuration)

      this.registerPeerConnectionListeners()

      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream)
      })

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = roomRef.collection('calleeCandidates')
      this.peerConnection.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!')
          return
        }
        console.log('Got candidate: ', event.candidate)
        calleeCandidatesCollection.add(event.candidate.toJSON())
      })
      // Code for collecting ICE candidates above

      this.peerConnection.addEventListener('track', (event) => {
        console.log('Got remote track:', event.streams[0])
        event.streams[0].getTracks().forEach((track) => {
          console.log('Add a track to the remoteStream:', track)
          this.remoteStream.addTrack(track)
        })
      })

      // Code for creating SDP answer below
      const { offer } = roomSnapshot.data() as Room
      console.log('Got offer:', offer)
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      )
      const answer = await this.peerConnection.createAnswer()
      console.log('Created answer:', answer)
      await this.peerConnection.setLocalDescription(answer)

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      }
      await roomRef.update(roomWithAnswer)
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      roomRef.snapshotChanges().subscribe(async (snapshot) => {
        if (snapshot.type === 'added') {
          const data = snapshot.payload.data()
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
          await this.peerConnection.addIceCandidate(
            new RTCIceCandidate(data as any)
          )
        }
      })
      // roomRef.collection('callerCandidates').snapshotChanges();
      // Listening for remote ICE candidates above
    }
  }

  openUserMedia = async (e: Event) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    this.localVideo.nativeElement.srcObject = stream
    this.localStream = stream

    this.remoteStream = new MediaStream()

    this.remoteVideo.nativeElement.srcObject = this.remoteStream

    console.log('Stream:', this.localVideo.nativeElement.srcObject)

    this.cameraBtn.nativeElement.disabled = true
    this.joinBtn.nativeElement.disabled = false
    this.createBtn.nativeElement.disabled = false
    this.hangupBtn.nativeElement.disabled = false
  }

  hangUp = async (e: Event) => {
    const tracks = (this.localVideo.nativeElement
      .srcObject as MediaStream).getTracks()
    tracks.forEach((track) => {
      track.stop()
    })

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach((track) => track.stop())
    }

    if (this.peerConnection) {
      this.peerConnection.close()
    }

    this.localVideo.nativeElement.srcObject = null
    this.remoteVideo.nativeElement.srcObject = null
    this.cameraBtn.nativeElement.disabled = false
    this.joinBtn.nativeElement.disabled = true
    this.createBtn.nativeElement.disabled = true
    this.hangupBtn.nativeElement.disabled = true
    this.currentRoom.nativeElement.innerText = ''

    // Delete room on hangup
    if (this.roomId) {
      const db = firestore()
      const roomRef = db
        .collection('rooms')
        .doc(this.roomId.nativeElement.value)
      const calleeCandidates = await roomRef
        .collection('calleeCandidates')
        .get()
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete()
      })
      const callerCandidates = await roomRef
        .collection('callerCandidates')
        .get()
      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete()
      })
      await roomRef.delete()
    }

    // document.location.reload(true)
  }

  registerPeerConnectionListeners() {
    this.peerConnection.addEventListener('icegatheringstatechange', () => {
      console.log(
        `ICE gathering state changed: ${this.peerConnection.iceGatheringState}`
      )
    })

    this.peerConnection.addEventListener('connectionstatechange', () => {
      console.log(
        `Connection state change: ${this.peerConnection.connectionState}`
      )
    })

    this.peerConnection.addEventListener('signalingstatechange', () => {
      console.log(
        `Signaling state change: ${this.peerConnection.signalingState}`
      )
    })

    this.peerConnection.addEventListener('iceconnectionstatechange ', () => {
      console.log(
        `ICE connection state change: ${this.peerConnection.iceConnectionState}`
      )
    })
  }
}
