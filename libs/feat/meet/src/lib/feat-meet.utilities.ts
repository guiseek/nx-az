export function createMeetUid(): string {
  function S4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

export function connect(
  source?: AudioNode | null,
  destination?: AudioNode | AudioParam | null
) {
  if (source && destination) {
    // @ts-ignore TS does not have a union override for connect method
    source.connect(destination)
  }
}
