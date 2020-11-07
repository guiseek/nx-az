import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatButtonModule } from '@angular/material/button'
import { MatSliderModule } from '@angular/material/slider'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'

import { FullscreenService, SecondsToTimePipe } from './services'
import { FeatMeetComponent } from './feat-meet'
import {
  VideoComponent,
  PlayButtonComponent,
  FrameControlComponent,
  TimeControlComponent,
  VideoSpinnerComponent,
  ProgressControlComponent,
  VolumeControlComponent,
  FullscreenButtonComponent,
  DownloadButtonComponent,
  QualityControlComponent,
  SliderProgressBarComponent,
} from './components'
import { RoomComponent } from './room/room.component'
import { AudioAnalyserDirective } from './directives/audio-analyser.directive'
import { WaveformComponent } from './components/waveform/waveform.component'
import { FrequencyBarGraphComponent } from './components/frequency-bar-graph/frequency-bar-graph.component'

export * from './feat-meet/feat-meet.component'
export * from './components'
export * from './services'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSliderModule,
  ],
  declarations: [
    FeatMeetComponent,
    RoomComponent,

    SecondsToTimePipe,

    VideoComponent,
    VideoSpinnerComponent,
    VolumeControlComponent,
    TimeControlComponent,

    SliderProgressBarComponent,
    ProgressControlComponent,

    DownloadButtonComponent,
    FrameControlComponent,
    FullscreenButtonComponent,
    PlayButtonComponent,
    QualityControlComponent,
    AudioAnalyserDirective,
    WaveformComponent,
    FrequencyBarGraphComponent,
  ],
  exports: [
    FeatMeetComponent,
    RoomComponent,

    SecondsToTimePipe,
    VideoComponent,

    VolumeControlComponent,

    VideoSpinnerComponent,
    TimeControlComponent,

    SliderProgressBarComponent,
    ProgressControlComponent,

    DownloadButtonComponent,
    FrameControlComponent,
    FullscreenButtonComponent,
    PlayButtonComponent,
    QualityControlComponent,
    AudioAnalyserDirective,
    WaveformComponent,
    FrequencyBarGraphComponent,
  ],
  providers: [FullscreenService],
})
export class FeatMeetModule {}
