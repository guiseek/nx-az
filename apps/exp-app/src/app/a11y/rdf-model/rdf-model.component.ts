import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'nx-az-rdf-model',
  templateUrl: './rdf-model.component.svg',
  styleUrls: ['./rdf-model.component.scss'],
})
export class RdfModelComponent implements OnInit, AfterViewInit {
  @ViewChild('model') modelRef: ElementRef<SVGElement>
  @ViewChild('roletype') roletype: ElementRef<SVGGElement>

  modelEl: SVGElement

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.roletype)
    console.log(this.modelRef)
    this.modelEl = this.modelRef.nativeElement
    console.log(this.modelEl)
    const modelNodes: NodeList = this.modelEl.querySelectorAll('[id]')
    // Array.from(modelNodes).map((value, i) => {
    //   console.log(value, i);
    // })
    // window.addEventListener('wheel', ({ deltaX, deltaZ, deltaY }: WheelEvent) => {
    //   console.log({ deltaX, deltaZ, deltaY });
    //   if (deltaX !== -0) {
    //     this.modelEl.style.transform = `scale(${deltaX / 10})`;
    //   }
    // });
  }
}
