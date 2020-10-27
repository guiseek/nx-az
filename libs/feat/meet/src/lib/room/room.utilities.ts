import { Room, RoomConfiguration } from './room.interfaces'

export function generateRoomId(): string {
  function S4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return S4() + S4()
}

export const createRoomConfiguration = ({
  iceServers,
  iceCandidatePoolSize,
}: Partial<RoomConfiguration> = {}) => ({
  iceServers: iceServers || [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: iceCandidatePoolSize || 10,
})

export const createRoomDocument = (): Room => ({
  id: generateRoomId(),
  created: new Date(),
  updated: new Date(),
})

/**
 * @example
 * try {
 *  const stream = openMediaDevices({'video':true,'audio':true});
 *  console.log('Got MediaStream:', stream);
 * } catch(error) {
 *  console.error('Error accessing media devices.', error);
 * }
 * @param {MediaStreamConstraints} constraints
 */
export const openMediaDevices = async (constraints: MediaStreamConstraints) => {
  return await navigator.mediaDevices.getUserMedia(constraints)
}

/**
 * @example const videoCameras = getConnectedDevices('videoinput');
 * @param {MediaDeviceKind} type
 */
export const getConnectedDevices = async (type: MediaDeviceKind) => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.filter((device) => device.kind === type)
}

/**
 * Open camera with at least minWidth and minHeight capabilities
 *
 * @param {string} cameraId
 * @param {number} minWidth
 * @param {number} minHeight
 * @returns
 */
export const openCamera = async (
  cameraId: string,
  minWidth: number,
  minHeight: number
) => {
  const constraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  }

  return await navigator.mediaDevices.getUserMedia(constraints)
}

export const makeCall = async (signalingChannel: any) => {
  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  }
  const peerConnection = new RTCPeerConnection(configuration)
  signalingChannel.addEventListener('message', async (message: any) => {
    if (message.answer) {
      const remoteDesc = new RTCSessionDescription(message.answer)
      await peerConnection.setRemoteDescription(remoteDesc)
    }
  })
  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)
  signalingChannel.send({ offer: offer })
}
