import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'exp-meet-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  peerSockets = new Set()
  topic
  localStream
  peerConnection
  uuid: string
  videoDevice
  audioDevice

  peerConnectionConfig = {
    iceServers: [
      { urls: 'stun:stun.stunprotocol.org:3478' },
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  }

  constructor() {}

  ngOnInit(): void {}
  // pageReady() {
  //   console.log('running setup')
  //   this.uuid = createUUID()

  //   // let peerEvents = beaker.peersockets.watch()
  //   // peerEvents.addEventListener('join', (e) => {
  //   //   console.log('join', e)
  //   //   peerSockets.add(e.peerId)
  //   // })
  //   // peerEvents.addEventListener('leave', (e) => {
  //   //   console.log('leave', e)
  //   //   peerSockets.delete(e.peerId)
  //   // })
  //   // topic = beaker.peersockets.join('signalling')
  //   // topic.addEventListener('message', gotMessageFromPeersocket)

  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then(getUserMediaSuccess)
  //     .catch(errorHandler)

  //   try {
  //     const devices = await navigator.mediaDevices.enumerateDevices()
  //     for (const device of devices) {
  //       const opt = document.createElement('option')
  //       opt.value = device.deviceId
  //       opt.textContent = device.label
  //       if (device.kind === 'videoinput') {
  //         videoSelect.append(opt)
  //       } else if (device.kind === 'audioinput') {
  //         audioSelect.append(opt)
  //       }
  //     }
  //     videoSelect.addEventListener('change', onChangeDevice)
  //     audioSelect.addEventListener('change', onChangeDevice)
  //   } catch (e) {
  //     videoSelect.remove()
  //     audioSelect.remove()
  //   }

  //   console.log('setup finished')
  // }

  // function onChangeDevice() {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       video: { deviceId: videoSelect.value },
  //       audio: { deviceId: audioSelect.value },
  //     })
  //     .then(getUserMediaSuccess)
  //     .catch(errorHandler)
  // }

  // function sendToAllPeersockets(message) {
  //   console.log('sent', { message })
  //   message = new TextEncoder('utf-8').encode(JSON.stringify(message))
  //   for (let peer of peerSockets) {
  //     topic.send(peer, message)
  //   }
  // }

  // function getUserMediaSuccess(stream) {
  //   localStream = stream
  //   localVideo.srcObject = stream
  // }

  // function start(isCaller) {
  //   peerConnection = new RTCPeerConnection(peerConnectionConfig)
  //   peerConnection.onicecandidate = gotIceCandidate
  //   peerConnection.ontrack = gotRemoteStream
  //   peerConnection.addStream(localStream)

  //   if (isCaller) {
  //     peerConnection
  //       .createOffer()
  //       .then(createdDescription)
  //       .catch(errorHandler)
  //   }
  // }
  // startButton.addEventListener('click', start)

  // function gotMessageFromPeersocket({ peerId, message }) {
  //   console.log('received', { peerId, message })
  //   if (!peerConnection) start(false)

  //   var signal = JSON.parse(new TextDecoder().decode(message))

  //   // Ignore messages from ourself
  //   if (signal.uuid == uuid) return

  //   if (signal.sdp) {
  //     peerConnection
  //       .setRemoteDescription(new RTCSessionDescription(signal.sdp))
  //       .then(function () {
  //         // Only create answers in response to offers
  //         if (signal.sdp.type == 'offer') {
  //           peerConnection
  //             .createAnswer()
  //             .then(createdDescription)
  //             .catch(errorHandler)
  //         }
  //       })
  //       .catch(errorHandler)
  //   } else if (signal.ice) {
  //     peerConnection
  //       .addIceCandidate(new RTCIceCandidate(signal.ice))
  //       .catch(errorHandler)
  //   }
  // }

  // function gotIceCandidate(event) {
  //   if (event.candidate != null) {
  //     sendToAllPeersockets({ ice: event.candidate, uuid: uuid })
  //   }
  // }

  // function createdDescription(description) {
  //   console.log('got description')

  //   peerConnection
  //     .setLocalDescription(description)
  //     .then(function () {
  //       sendToAllPeersockets({
  //         sdp: peerConnection.localDescription,
  //         uuid: uuid,
  //       })
  //     })
  //     .catch(errorHandler)
  // }

  // function gotRemoteStream(event) {
  //   console.log('got remote stream')
  //   remoteVideo.srcObject = event.streams[0]
  // }

  // function errorHandler(error) {
  //   console.log(error)
  // }

  // // Taken from http://stackoverflow.com/a/105074/515584
  // // Strictly speaking, it's not a real UUID, but it gets the job done here
  // function createUUID() {
  //   function s4() {
  //     return Math.floor((1 + Math.random()) * 0x10000)
  //       .toString(16)
  //       .substring(1)
  //   }

  //   return (
  //     s4() +
  //     s4() +
  //     '-' +
  //     s4() +
  //     '-' +
  //     s4() +
  //     '-' +
  //     s4() +
  //     '-' +
  //     s4() +
  //     s4() +
  //     s4()
  //   )
  // }
}
