import { SvgIcon } from './icons'
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion'
import {
  ElementRef,
  Component,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
} from '@angular/core'
import { IconRegistry, IconFontDefinition, cloneSvg } from './icon-registry'
import { take } from 'rxjs/operators'

/** Types of icon sizes */
export type IconSize = 'auto' | 's' | 'm' | 'l' | 'xl'
@Component({
  selector: 'nx-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./icon.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.nx-icon--outline]': 'outline',
    '[class.nx-icon--fill]': 'fill',
    '[class.nx-icon--auto]': 'size === "auto"',
  },
})
export class IconComponent implements OnChanges {
  /** Keeps track of the elements and attributes that we've prefixed with the current path. */
  private _elementsWithExternalReferences?: Map<
    Element,
    { name: string; value: string }[]
  >
  private _name!: string
  private _previousFontClasses: string[] = []

  /** Sets the name for specifying the icon.*/
  @Input()
  set name(name: string) {
    this._name = name
  }

  get name(): string {
    return this._name
  }

  private _outline = false
  /** Whether the icon has an outline. */
  @Input()
  set outline(value: boolean) {
    this._outline = coerceBooleanProperty(value)
  }
  get outline(): boolean {
    return this._outline
  }

  private _fill = false
  /** Whether the icon is filled. */
  @Input()
  set fill(value: boolean) {
    this._fill = coerceBooleanProperty(value)
  }
  get fill(): boolean {
    return this._fill
  }

  private _size: IconSize = 'auto'

  /** Specifies the size of the icon. */
  @Input()
  set size(value: IconSize) {
    if (this._size === value) {
      return
    }
    this._size = value
    this.el.nativeElement.classList.add('nx-icon--' + this.size)
  }

  get size(): IconSize {
    return this._size
  }

  /** Sets the font name that should be used. */
  @Input() font!: string

  constructor(
    /**@docs-private */
    public el: ElementRef,
    private _iconRegistry: IconRegistry
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'] || changes['font']) {
      this.renderIcon()
    }
  }

  private renderIcon() {
    const icon = this._iconRegistry.getIcon(this.name)
    if (!icon) {
      // here we fall back to the icon class so we look at the `font` input
      // or take the default font
      this._updateFontIconClasses()
    } else {
      if (icon instanceof SvgIcon) {
        // add content
        icon
          .getContent()
          .pipe(take(1))
          .subscribe((content: SVGElement | any) => {
            if (!content) {
              return
            }

            // we need to clone the svg here otherwise when you have the same icon
            // multiple times it would end up only in the last icon that got created
            this._setSvgElement(cloneSvg(content))
          })
      } else {
        // here we have to look at the alias as well that could come from the registry
        this._updateFontIconClassesFromOverride(icon.alias, icon.font)
      }
    }
  }

  private _setSvgElement(svg: SVGElement) {
    this._clearSvgElement()
    // Workaround for IE11 and Edge ignoring `style` tags inside dynamically-created SVGs.
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
    // Do this before inserting the element into the DOM, in order to avoid a style recalculation.
    const styleTags = svg.querySelectorAll('style') as NodeListOf<
      HTMLStyleElement
    >

    for (let i = 0; i < styleTags.length; i++) {
      styleTags[i].textContent += ' '
    }
    this._removePreviousFontClasses()
    this.el.nativeElement.appendChild(svg)
  }

  private _clearSvgElement() {
    const layoutElement: HTMLElement = this.el.nativeElement
    let childCount = layoutElement.childNodes.length

    if (this._elementsWithExternalReferences) {
      this._elementsWithExternalReferences.clear()
    }

    // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
    // we can't use innerHTML, because IE will throw if the element has a data binding.
    while (childCount--) {
      const child = layoutElement.childNodes[childCount]

      // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
      // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        layoutElement.removeChild(child)
      }
    }
  }

  private _updateFontIconClassesFromOverride(
    alias: string,
    font: IconFontDefinition
  ) {
    const name = alias ? alias : this.name
    this._setFontIconClasses([font.hostClass, font.prefix + name])
  }

  private _updateFontIconClasses() {
    const font = this.font
      ? this._iconRegistry.getFont(this.font)
      : this._iconRegistry.getDefaultFont()
    const hostClass = font ? font.hostClass : ''
    const name = font ? font.prefix + this.name : this.name
    this._setFontIconClasses([hostClass, name])
  }

  private _setFontIconClasses(classes: string[]) {
    // filters empty classes as they cannot be added via classList.add
    const filteredClasses = classes.filter((c) => c !== '')

    const elem: HTMLElement = this.el.nativeElement

    this._removePreviousFontClasses()
    this._previousFontClasses = filteredClasses
    filteredClasses.forEach((cl) => elem.classList.add(cl))
  }

  private _removePreviousFontClasses() {
    if (!this._previousFontClasses) {
      return
    }
    this._previousFontClasses.forEach((cl) => {
      // IE11 doesn't support multiple paramaters in remove or add
      // so we can't use the spread operator here
      this.el.nativeElement.classList.remove(cl)
    })
  }

  static ngAcceptInputType_outline: BooleanInput
  static ngAcceptInputType_fill: BooleanInput
}
