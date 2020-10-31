import { Inject, Injectable, OnDestroy, Optional } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser'
import { DOCUMENT } from '@angular/common'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { FontIcon, SvgIcon, SvgIconLiteral, SvgIconFromUrl } from './icons'
import { DEFAULT_ICONS } from './default-icons'

export function throwIconNotFoundError(iconName: string) {
  throw Error(`Could not find icon with name ${iconName}`)
}

export class IconFontDefinition {
  constructor(public hostClass: string, public prefix: string = '') {}
}

@Injectable({ providedIn: 'root' })
export class IconRegistry implements OnDestroy {
  private _document: Document
  private _icons = new Map<string, SvgIcon | FontIcon>()
  private _fonts = new Map<string, IconFontDefinition>()

  private _defaultFont!: IconFontDefinition

  constructor(
    @Optional() private _httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    @Optional() @Inject(DOCUMENT) document: any
  ) {
    this._document = document
    // register default icons
    Object.keys(DEFAULT_ICONS).forEach((icon: any) => {
      this.addSvgIconLiteral(
        icon,
        _sanitizer.bypassSecurityTrustHtml((DEFAULT_ICONS as any)[icon])
      )
    })
  }

  /**
   * Registers an icon using an HTML string.
   * @param iconName
   * @param literal
   */
  addSvgIconLiteral(iconName: string, literal: SafeHtml) {
    this._icons.set(
      iconName,
      new SvgIconLiteral(
        literal,
        this._httpClient,
        this._sanitizer,
        this._document
      )
    )
  }

  /**
   * Registers an icon by URL.
   * @param iconName Name under which the icon should be registered.
   * @param url
   */
  addSvgIcon(iconName: string, safeUrl: SafeResourceUrl) {
    if (safeUrl == null) {
      throw Error(`Cannot fetch icon from URL "${safeUrl}".`)
    }

    this._icons.set(
      iconName,
      new SvgIconFromUrl(
        safeUrl,
        this._httpClient,
        this._sanitizer,
        this._document
      )
    )
  }

  /**
   * Only necessary to override an existing svg icon in the registry
   * with a font class. Useful to override the essential library icons.
   * To register an icon font in general use `registerFont` and
   * `setDefaultFontClass`.
   *
   * Example: you want to override the essential svg icon of the library `chevron-down`
   * with an icon from your icon font called 'arrow-down'. You would first register your
   * icon font:
   * `iconRegistry.registerFont('my-icons');`
   * `iconRegistry.setDefaultFontClass('my-icons');`
   * and then override the chevron-down icon in the registry:
   * `iconRegistry.addFontIcon('chevron-down', 'arrow-down');`
   */
  addFontIcon(iconName: string, alias?: string, fontName?: string) {
    let fontDefinition = this.getDefaultFont()
    if (fontName) {
      fontDefinition = this._fonts.get(fontName) as IconFontDefinition
    }

    if (!fontDefinition) {
      throw Error(`Could not find a registered font with name ${fontName}.`)
    }

    this._icons.set(iconName, new FontIcon(alias as string, fontDefinition))
  }

  /** Returns the icon from the registry or undefined if not found. */
  getIcon(iconName: string): SvgIcon | FontIcon | undefined {
    const icon = this._icons.get(iconName)
    return icon
  }

  ngOnDestroy(): void {
    this._icons.clear()
  }

  /**
   * Register an icon font which can be used by the font input on the icon component.
   * @param name
   * @param hostClass The hostClass is the general class like `fa` and an optional prefix can be given.
   * @param prefix The prefix is helpful if your class name for the icon would be prefixed,
   * e.g. my-icons--heart but you still want to only use the name
   * <code>&lt;nx-icon name="heart" font="my-icons"&gt;&lt;/nx-icon&gt;</code>.
   */
  registerFont(name: string, hostClass?: string, prefix?: string) {
    // register the name in a map
    this._fonts.set(
      name,
      new IconFontDefinition(hostClass ? hostClass : name, prefix)
    )
  }

  /**
   * Sets the font as the default font that is used when the font input
   * is omitted.
   */
  setDefaultFont(name: string) {
    const font = this.getFont(name)
    this._defaultFont = font
  }

  /**
   * Returns the registered CSS class name.
   */
  getDefaultFont(): IconFontDefinition {
    return this._defaultFont
  }

  /**
   * Returns the registered font by name.
   */
  getFont(fontName: string) {
    const font = this._fonts.get(fontName)
    if (!font) {
      throw Error(`Cannot find registered font with name ${fontName}`)
    }
    return font
  }
}

/** Clones an SVGElement while preserving type information. */
export function cloneSvg(svg: SVGElement): SVGElement {
  return svg.cloneNode(true) as SVGElement
}
