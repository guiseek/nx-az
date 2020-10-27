import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { database } from 'firebase/app'
import { VideoComponent } from '../components'

import { createMeetUid } from '../feat-meet.utilities'

type NxRTCPeerConnection = RTCPeerConnection & {
  addStream: (stream: MediaStream) => {}
  onremovestream: Function
}

@Component({
  selector: 'nx-feat-meet',
  templateUrl: './feat-meet.component.html',
  styleUrls: ['./feat-meet.component.scss'],
})
export class FeatMeetComponent implements OnInit, OnDestroy {
  callActive = false

  pc!: NxRTCPeerConnection

  localStream!: MediaStream

  channel!: AngularFireList<{}>

  database!: database.Reference

  senderId!: string

  @ViewChild('me') me!: VideoComponent
  @ViewChild('remote') remote!: ElementRef<HTMLVideoElement>

  constructor(private afdb: AngularFireDatabase) {}

  ngOnInit(): void {
    this.setUpMeet()
  }

  setUpMeet() {
    this.senderId = createMeetUid()
    const channelName = '/meet'

    this.channel = this.afdb.list(channelName)

    this.database = this.afdb.database.ref(channelName)

    this.database.on('child_added', this.readMessage.bind(this))

    try {
      this.pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.services.mozilla.com' },
          { urls: 'stun:stun.l.google.com:19302' },
        ],
      }) as NxRTCPeerConnection
    } catch (error) {
      console.log(error)

      this.pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.services.mozilla.com' },
          { urls: 'stun:stun.l.google.com:19302' },
        ],
      }) as NxRTCPeerConnection
    }

    this.pc.onicecandidate = (evt) => {
      evt.candidate
        ? this.sendMessage(
            this.senderId,
            JSON.stringify({ ice: evt.candidate })
          )
        : console.log('Sent Allt Ice')
    }

    this.pc.onicecandidate = (event) => {
      event.candidate
        ? this.sendMessage(
            this.senderId,
            JSON.stringify({ ice: event.candidate })
          )
        : console.log('Sent All Ice')
    }

    this.pc.onremovestream = () => {
      console.log('Stream Ended')
    }

    this.pc.ontrack = (event) =>
      (this.remote.nativeElement.srcObject = event.streams[0])

    this.showMe()
  }

  sendMessage(senderId: string, data: any) {
    const msg = this.channel.push({ sender: senderId, message: data })
    msg.remove()
  }

  readMessage(data: any) {
    if (!data) {
      return
    }

    const { message, sender } = data.val()

    try {
      const msg = JSON.parse(message)

      if (sender !== this.senderId) {
        if (msg.ice !== undefined && this.pc !== null) {
          this.pc.addIceCandidate(new RTCIceCandidate(msg.ice))
        } else if (msg.sdp.type === 'offer') {
          this.callActive = true

          this.pc
            .setRemoteDescription(new RTCSessionDescription(msg.sdp))

            .then(() => this.pc.createAnswer())

            .then((answer) => this.pc.setLocalDescription(answer))

            .then(() => {
              this.sendMessage(
                this.senderId,
                JSON.stringify({ sdp: this.pc.localDescription })
              )
            })
        } else if (msg.sdp.type === 'answer') {
          this.callActive = true

          this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  showMe() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })

      .then((stream) => (this.me.video.nativeElement.srcObject = stream))

      .then((stream) => {
        this.pc.addStream(stream)

        this.localStream = stream
      })
  }

  showRemote() {
    try {
      this.pc
        .createOffer()

        .then((offer) => this.pc.setLocalDescription(offer))

        .then(() => {
          this.sendMessage(
            this.senderId,
            JSON.stringify({ sdp: this.pc.localDescription })
          )

          this.callActive = true
        })
    } catch (error) {
      this.setUpMeet()

      console.log(error)
    }
  }

  hangup() {
    this.pc.close()

    const tracks = this.localStream.getTracks()

    for (let i = 0; i < tracks.length; i++) {
      tracks[i].stop()
    }

    this.callActive = false
  }

  ngOnDestroy(): void {
    if (this.pc) {
      this.pc.close()

      const tracks = this.localStream.getTracks()

      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop()
      }
    }
  }
}
