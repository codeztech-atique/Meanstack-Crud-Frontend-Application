import {
  ComponentPortal,
  MatOption,
  MatSelect,
  MatSelectModule,
  OverlayModule,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy
} from "./chunk-VSOMELGG.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-EQXMA2HP.js";
import "./chunk-2SI2F6J3.js";
import "./chunk-XKLON2MD.js";
import {
  CdkScrollableModule,
  ScrollDispatcher
} from "./chunk-X6OEZ36A.js";
import "./chunk-COWBHJFT.js";
import {
  MatFormField
} from "./chunk-SS7NUVYB.js";
import {
  A11yModule,
  AriaDescriber,
  ESCAPE,
  FocusMonitor,
  MediaMatcher,
  _IdGenerator,
  _animationsDisabled,
  hasModifierKey
} from "./chunk-EWQ2SUOQ.js";
import "./chunk-DETYDJJO.js";
import {
  coerceBooleanProperty
} from "./chunk-AIEYJCOW.js";
import "./chunk-HCXBM7FM.js";
import "./chunk-WJENT7DL.js";
import "./chunk-GUGIMSVJ.js";
import {
  BidiModule,
  Directionality
} from "./chunk-RVRLATSR.js";
import {
  Platform,
  coerceNumberProperty
} from "./chunk-ZBTMEH5Q.js";
import "./chunk-HTCJCBGM.js";
import "./chunk-N7B5UONB.js";
import "./chunk-IMKF4BRO.js";
import {
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ReplaySubject,
  Service,
  Subject,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  takeUntil,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefineService,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-AI37SZZ3.js";
import {
  __spreadValues
} from "./chunk-62IWPIGW.js";

// node_modules/@angular/material/fesm2022/_tooltip-chunk.mjs
var _c0 = ["tooltip"];
var SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
var MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken("mat-tooltip-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector, {
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
var MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken("mat-tooltip-default-options", {
  providedIn: "root",
  factory: () => ({
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  })
});
var PANEL_CLASS = "tooltip-panel";
var passiveListenerOptions = {
  passive: true
};
var MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
var UNBOUNDED_ANCHOR_GAP = 8;
var MIN_HEIGHT = 24;
var MAX_WIDTH = 200;
var MatTooltip = class _MatTooltip {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _ariaDescriber = inject(AriaDescriber);
  _focusMonitor = inject(FocusMonitor);
  _dir = inject(Directionality);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _mediaMatcher = inject(MediaMatcher);
  _document = inject(DOCUMENT);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaultOptions = inject(MAT_TOOLTIP_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef = null;
  _tooltipInstance = null;
  _overlayPanelClass;
  _portal;
  _position = "below";
  _positionAtOrigin = false;
  _disabled = false;
  _tooltipClass;
  _viewInitialized = false;
  _pointerExitEventsInitialized = false;
  _tooltipComponent = TooltipComponent;
  _viewportMargin = 8;
  _currentPosition;
  _cssClassPrefix = "mat-mdc";
  _ariaDescriptionPending = false;
  _dirSubscribed = false;
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = coerceBooleanProperty(value);
    this._detach();
    this._overlayRef = null;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const isDisabled = coerceBooleanProperty(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      if (isDisabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
      this._syncAriaDescription(this.message);
    }
  }
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = coerceNumberProperty(value);
  }
  _showDelay;
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = coerceNumberProperty(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  _hideDelay;
  touchGestures = "auto";
  get message() {
    return this._message;
  }
  set message(value) {
    const oldMessage = this._message;
    this._message = value != null ? String(value).trim() : "";
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
    }
    this._syncAriaDescription(oldMessage);
  }
  _message = "";
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  _eventCleanups = [];
  _touchstartTimeout = null;
  _destroyed = new Subject();
  _isDestroyed = false;
  constructor() {
    const defaultOptions = this._defaultOptions;
    if (defaultOptions) {
      this._showDelay = defaultOptions.showDelay;
      this._hideDelay = defaultOptions.hideDelay;
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }
      if (defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = defaultOptions.positionAtOrigin;
      }
      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
      if (defaultOptions.tooltipClass) {
        this.tooltipClass = defaultOptions.tooltipClass;
      }
    }
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === "keyboard") {
        this._ngZone.run(() => this.show());
      }
    });
  }
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    if (this._touchstartTimeout) {
      clearTimeout(this._touchstartTimeout);
    }
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
    this._eventCleanups.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
    this._ariaDescriber.removeDescription(nativeElement, this.message, "tooltip");
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  show(delay = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay);
  }
  hide(delay = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(void 0, origin);
  }
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._injector.get(ScrollDispatcher).getAncestorScrollContainers(this._elementRef);
    const panelClass = `${this._cssClassPrefix}-${PANEL_CLASS}`;
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors).withPopoverLocation("global");
    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = createOverlayRef(this._injector, {
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, panelClass] : panelClass,
      scrollStrategy: this._injector.get(MAT_TOOLTIP_SCROLL_STRATEGY)(),
      disableAnimations: this._animationsDisabled,
      eventPredicate: this._overlayEventPredicate
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      this._ngZone.run(() => this.hide(0));
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    if (!this._dirSubscribed) {
      this._dirSubscribed = true;
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    return this._overlayRef;
  }
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset(__spreadValues(__spreadValues({}, origin.main), overlay.main)), this._addOffset(__spreadValues(__spreadValues({}, origin.fallback), overlay.fallback))]);
  }
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == "ltr";
    if (position.originY === "top") {
      position.offsetY = -offset;
    } else if (position.originY === "bottom") {
      position.offsetY = offset;
    } else if (position.originX === "start") {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === "end") {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let originPosition;
    if (position == "above" || position == "below") {
      originPosition = {
        originX: "center",
        originY: position == "above" ? "top" : "bottom"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      originPosition = {
        originX: "start",
        originY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      originPosition = {
        originX: "end",
        originY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let overlayPosition;
    if (position == "above") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "bottom"
      };
    } else if (position == "below") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "top"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      overlayPosition = {
        overlayX: "end",
        overlayY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      overlayPosition = {
        overlayX: "start",
        overlayY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      afterNextRender(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      }, {
        injector: this._injector
      });
    }
  }
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass instanceof Set ? Array.from(tooltipClass) : tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  _invertPosition(x, y) {
    if (this.position === "above" || this.position === "below") {
      if (y === "top") {
        y = "bottom";
      } else if (y === "bottom") {
        y = "top";
      }
    } else {
      if (x === "end") {
        x = "start";
      } else if (x === "start") {
        x = "end";
      }
    }
    return {
      x,
      y
    };
  }
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === "center") {
      if (this._dir && this._dir.value === "rtl") {
        newPosition = originX === "end" ? "left" : "right";
      } else {
        newPosition = originX === "start" ? "left" : "right";
      }
    } else {
      newPosition = overlayY === "bottom" && originY === "top" ? "above" : "below";
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._eventCleanups.length) {
      return;
    }
    if (!this._isTouchPlatform()) {
      this._addListener("mouseenter", (event) => {
        this._setupPointerExitEventsIfNeeded();
        let point = void 0;
        if (event.x !== void 0 && event.y !== void 0) {
          point = event;
        }
        this.show(void 0, point);
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      this._addListener("touchstart", (event) => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : void 0;
        this._setupPointerExitEventsIfNeeded();
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => {
          this._touchstartTimeout = null;
          this.show(void 0, origin);
        }, this._defaultOptions?.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      });
    }
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    if (!this._isTouchPlatform()) {
      this._addListener("mouseleave", (event) => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      });
      this._addListener("wheel", (event) => {
        if (this._isTooltipVisible()) {
          const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
          const element = this._elementRef.nativeElement;
          if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
            this.hide();
          }
        }
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        this.hide(this._defaultOptions?.touchendHideDelay);
      };
      this._addListener("touchend", touchendListener);
      this._addListener("touchcancel", touchendListener);
    }
  }
  _addListener(name, listener) {
    this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement, name, listener, passiveListenerOptions));
  }
  _isTouchPlatform() {
    const detectHoverCapability = this._defaultOptions?.detectHoverCapability;
    if (typeof detectHoverCapability === "function") {
      return !detectHoverCapability();
    }
    if (this._platform.IOS || this._platform.ANDROID) {
      return true;
    } else if (!this._platform.isBrowser) {
      return false;
    }
    return !!detectHoverCapability && this._mediaMatcher.matchMedia("(any-hover: none)").matches;
  }
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== "off") {
      const element = this._elementRef.nativeElement;
      const style = element.style;
      if (gestures === "on" || element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA") {
        style["userSelect"] = style["msUserSelect"] = style["webkitUserSelect"] = style["MozUserSelect"] = "none";
      }
      if (gestures === "on" || !element.draggable) {
        style["webkitUserDrag"] = "none";
      }
      style["touchAction"] = "none";
      style["webkitTapHighlightColor"] = "transparent";
    }
  }
  _syncAriaDescription(oldMessage) {
    if (this._ariaDescriptionPending) {
      return;
    }
    this._ariaDescriptionPending = true;
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, oldMessage, "tooltip");
    if (!this._isDestroyed) {
      afterNextRender({
        write: () => {
          this._ariaDescriptionPending = false;
          if (this.message && !this.disabled) {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip");
          }
        }
      }, {
        injector: this._injector
      });
    }
  }
  _overlayEventPredicate = (event) => {
    if (event.type === "keydown") {
      return this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event);
    }
    return true;
  };
  static ɵfac = function MatTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltip)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatTooltip,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function MatTooltip_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    inputs: {
      position: [0, "matTooltipPosition", "position"],
      positionAtOrigin: [0, "matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: [0, "matTooltipDisabled", "disabled"],
      showDelay: [0, "matTooltipShowDelay", "showDelay"],
      hideDelay: [0, "matTooltipHideDelay", "hideDelay"],
      touchGestures: [0, "matTooltipTouchGestures", "touchGestures"],
      message: [0, "matTooltip", "message"],
      tooltipClass: [0, "matTooltipClass", "tooltipClass"]
    },
    exportAs: ["matTooltip"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltip, [{
    type: Directive,
    args: [{
      selector: "[matTooltip]",
      exportAs: "matTooltip",
      host: {
        "class": "mat-mdc-tooltip-trigger",
        "[class.mat-mdc-tooltip-disabled]": "disabled"
      }
    }]
  }], () => [], {
    position: [{
      type: Input,
      args: ["matTooltipPosition"]
    }],
    positionAtOrigin: [{
      type: Input,
      args: ["matTooltipPositionAtOrigin"]
    }],
    disabled: [{
      type: Input,
      args: ["matTooltipDisabled"]
    }],
    showDelay: [{
      type: Input,
      args: ["matTooltipShowDelay"]
    }],
    hideDelay: [{
      type: Input,
      args: ["matTooltipHideDelay"]
    }],
    touchGestures: [{
      type: Input,
      args: ["matTooltipTouchGestures"]
    }],
    message: [{
      type: Input,
      args: ["matTooltip"]
    }],
    tooltipClass: [{
      type: Input,
      args: ["matTooltipClass"]
    }]
  });
})();
var TooltipComponent = class _TooltipComponent {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _isMultiline = false;
  message;
  tooltipClass;
  _showTimeoutId;
  _hideTimeoutId;
  _triggerElement;
  _mouseLeaveHideDelay;
  _animationsDisabled = _animationsDisabled();
  _tooltip;
  _closeOnInteraction = false;
  _isVisible = false;
  _onHide = new Subject();
  _showAnimation = "mat-mdc-tooltip-show";
  _hideAnimation = "mat-mdc-tooltip-hide";
  show(delay) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = void 0;
    }, delay);
  }
  hide(delay) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = void 0;
    }, delay);
  }
  afterHidden() {
    return this._onHide;
  }
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = void 0;
  }
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === "function") {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue("animation-duration") === "0s" || styles.getPropertyValue("animation-name") === "none") {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add("_mat-animation-noopable");
      this._finalizeAnimation(isVisible);
    }
  }
  static ɵfac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TooltipComponent,
    selectors: [["mat-tooltip-component"]],
    viewQuery: function TooltipComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._tooltip = _t.first);
      }
    },
    hostAttrs: ["aria-hidden", "true"],
    hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
          return ctx._handleMouseLeave($event);
        });
      }
    },
    decls: 4,
    vars: 5,
    consts: [["tooltip", ""], [1, "mdc-tooltip", "mat-mdc-tooltip", 3, "animationend"], [1, "mat-mdc-tooltip-surface", "mdc-tooltip__surface"]],
    template: function TooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵdomElementStart(0, "div", 1, 0);
        ɵɵdomListener("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
          return ctx._handleAnimationEnd($event);
        });
        ɵɵdomElementStart(2, "div", 2);
        ɵɵtext(3);
        ɵɵdomElementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.tooltipClass);
        ɵɵclassProp("mdc-tooltip--multiline", ctx._isMultiline);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ctx.message);
      }
    },
    styles: ['.mat-mdc-tooltip {\n  position: relative;\n  transform: scale(0);\n  display: inline-flex;\n}\n.mat-mdc-tooltip::before {\n  content: "";\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  position: absolute;\n}\n.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {\n  top: -8px;\n}\n.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {\n  bottom: -8px;\n}\n.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {\n  left: -8px;\n}\n.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {\n  right: -8px;\n}\n.mat-mdc-tooltip._mat-animation-noopable {\n  animation: none;\n  transform: scale(1);\n}\n\n.mat-mdc-tooltip-surface {\n  word-break: normal;\n  overflow-wrap: anywhere;\n  padding: 4px 8px;\n  min-width: 40px;\n  max-width: 200px;\n  min-height: 24px;\n  max-height: 40vh;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n  will-change: transform, opacity;\n  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));\n  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));\n  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));\n  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));\n  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));\n  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));\n  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));\n}\n.mat-mdc-tooltip-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: left;\n}\n[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: right;\n}\n\n.mat-mdc-tooltip-panel {\n  line-height: normal;\n}\n.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {\n  pointer-events: none;\n}\n\n@keyframes mat-mdc-tooltip-show {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes mat-mdc-tooltip-hide {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n.mat-mdc-tooltip-show {\n  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n\n.mat-mdc-tooltip-hide {\n  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "mat-tooltip-component",
      encapsulation: ViewEncapsulation.None,
      host: {
        "(mouseleave)": "_handleMouseLeave($event)",
        "aria-hidden": "true"
      },
      template: '<div\n  #tooltip\n  class="mdc-tooltip mat-mdc-tooltip"\n  [class]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mat-mdc-tooltip-surface mdc-tooltip__surface">{{message}}</div>\n</div>\n',
      styles: ['.mat-mdc-tooltip {\n  position: relative;\n  transform: scale(0);\n  display: inline-flex;\n}\n.mat-mdc-tooltip::before {\n  content: "";\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  position: absolute;\n}\n.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {\n  top: -8px;\n}\n.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {\n  bottom: -8px;\n}\n.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {\n  left: -8px;\n}\n.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {\n  right: -8px;\n}\n.mat-mdc-tooltip._mat-animation-noopable {\n  animation: none;\n  transform: scale(1);\n}\n\n.mat-mdc-tooltip-surface {\n  word-break: normal;\n  overflow-wrap: anywhere;\n  padding: 4px 8px;\n  min-width: 40px;\n  max-width: 200px;\n  min-height: 24px;\n  max-height: 40vh;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n  will-change: transform, opacity;\n  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));\n  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));\n  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));\n  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));\n  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));\n  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));\n  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));\n}\n.mat-mdc-tooltip-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: left;\n}\n[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: right;\n}\n\n.mat-mdc-tooltip-panel {\n  line-height: normal;\n}\n.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {\n  pointer-events: none;\n}\n\n@keyframes mat-mdc-tooltip-show {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes mat-mdc-tooltip-hide {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n.mat-mdc-tooltip-show {\n  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n\n.mat-mdc-tooltip-hide {\n  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n']
    }]
  }], null, {
    _tooltip: [{
      type: ViewChild,
      args: ["tooltip", {
        static: true
      }]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/tooltip.mjs
var MatTooltipModule = class _MatTooltipModule {
  static ɵfac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [A11yModule, OverlayModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/paginator.mjs
function MatPaginator_Conditional_2_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 17);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const pageSizeOption_r3 = ctx.$implicit;
    ɵɵproperty("value", pageSizeOption_r3);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", pageSizeOption_r3, " ");
  }
}
function MatPaginator_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-form-field", 14)(1, "mat-select", 16, 0);
    ɵɵlistener("selectionChange", function MatPaginator_Conditional_2_Conditional_3_Template_mat_select_selectionChange_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1._changePageSize($event.value));
    });
    ɵɵrepeaterCreate(3, MatPaginator_Conditional_2_Conditional_3_For_4_Template, 2, 2, "mat-option", 17, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 18);
    ɵɵlistener("click", function MatPaginator_Conditional_2_Conditional_3_Template_div_click_5_listener() {
      ɵɵrestoreView(_r1);
      const selectRef_r4 = ɵɵreference(2);
      return ɵɵresetView(selectRef_r4.open());
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("appearance", ctx_r1._formFieldAppearance)("color", ctx_r1.color);
    ɵɵadvance();
    ɵɵproperty("value", ctx_r1.pageSize)("disabled", ctx_r1.disabled);
    ɵɵariaProperty("aria-labelledby", ctx_r1._pageSizeLabelId);
    ɵɵproperty("panelClass", ctx_r1.selectConfig.panelClass || "")("disableOptionCentering", ctx_r1.selectConfig.disableOptionCentering);
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r1._displayedPageSizeOptions);
  }
}
function MatPaginator_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.pageSize);
  }
}
function MatPaginator_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3)(1, "div", 13);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵconditionalCreate(3, MatPaginator_Conditional_2_Conditional_3_Template, 6, 7, "mat-form-field", 14);
    ɵɵconditionalCreate(4, MatPaginator_Conditional_2_Conditional_4_Template, 2, 1, "div", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵattribute("id", ctx_r1._pageSizeLabelId);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1._intl.itemsPerPageLabel, " ");
    ɵɵadvance();
    ɵɵconditional(ctx_r1._displayedPageSizeOptions.length > 1 ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1._displayedPageSizeOptions.length <= 1 ? 4 : -1);
  }
}
function MatPaginator_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 19);
    ɵɵlistener("click", function MatPaginator_Conditional_6_Template_button_click_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._buttonClicked(0, ctx_r1._previousButtonsDisabled()));
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 8);
    ɵɵelement(2, "path", 20);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("matTooltip", ctx_r1._intl.firstPageLabel)("matTooltipDisabled", ctx_r1._previousButtonsDisabled())("disabled", ctx_r1._previousButtonsDisabled())("tabindex", ctx_r1._previousButtonsDisabled() ? -1 : null);
    ɵɵattribute("aria-label", ctx_r1._intl.firstPageLabel);
  }
}
function MatPaginator_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 21);
    ɵɵlistener("click", function MatPaginator_Conditional_13_Template_button_click_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._buttonClicked(ctx_r1.getNumberOfPages() - 1, ctx_r1._nextButtonsDisabled()));
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 8);
    ɵɵelement(2, "path", 22);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("matTooltip", ctx_r1._intl.lastPageLabel)("matTooltipDisabled", ctx_r1._nextButtonsDisabled())("disabled", ctx_r1._nextButtonsDisabled())("tabindex", ctx_r1._nextButtonsDisabled() ? -1 : null);
    ɵɵattribute("aria-label", ctx_r1._intl.lastPageLabel);
  }
}
var MatPaginatorIntl = class _MatPaginatorIntl {
  changes = new Subject();
  itemsPerPageLabel = "Items per page:";
  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";
  firstPageLabel = "First page";
  lastPageLabel = "Last page";
  getRangeLabel = (page, pageSize, length) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} of ${length}`;
  };
  static ɵfac = function MatPaginatorIntl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorIntl)();
  };
  static ɵprov = ɵɵdefineService({
    token: _MatPaginatorIntl,
    factory: _MatPaginatorIntl.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorIntl, [{
    type: Service
  }], null, null);
})();
var DEFAULT_PAGE_SIZE = 50;
var PageEvent = class {
  pageIndex;
  previousPageIndex;
  pageSize;
  length;
};
var MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken("MAT_PAGINATOR_DEFAULT_OPTIONS");
var MatPaginator = class _MatPaginator {
  _intl = inject(MatPaginatorIntl);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _formFieldAppearance;
  _pageSizeLabelId = inject(_IdGenerator).getId("mat-paginator-page-size-label-");
  _intlChanges;
  _isInitialized = false;
  _initializedStream = new ReplaySubject(1);
  color;
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = Math.max(value || 0, 0);
    this._changeDetectorRef.markForCheck();
  }
  _pageIndex = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value || 0;
    this._changeDetectorRef.markForCheck();
  }
  _length = 0;
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = Math.max(value || 0, 0);
    this._updateDisplayedPageSizeOptions();
  }
  _pageSize;
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value) {
    this._pageSizeOptions = (value || []).map((p) => numberAttribute(p, 0));
    this._updateDisplayedPageSizeOptions();
  }
  _pageSizeOptions = [];
  hidePageSize = false;
  showFirstLastButtons = false;
  selectConfig = {};
  disabled = false;
  page = new EventEmitter();
  _displayedPageSizeOptions;
  initialized = this._initializedStream;
  constructor() {
    const _intl = this._intl;
    const defaults = inject(MAT_PAGINATOR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    if (defaults) {
      const {
        pageSize,
        pageSizeOptions,
        hidePageSize,
        showFirstLastButtons
      } = defaults;
      if (pageSize != null) {
        this._pageSize = pageSize;
      }
      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }
      if (hidePageSize != null) {
        this.hidePageSize = hidePageSize;
      }
      if (showFirstLastButtons != null) {
        this.showFirstLastButtons = showFirstLastButtons;
      }
    }
    this._formFieldAppearance = defaults?.formFieldAppearance || "outline";
  }
  ngOnInit() {
    this._isInitialized = true;
    this._updateDisplayedPageSizeOptions();
    this._initializedStream.next();
  }
  ngOnDestroy() {
    this._initializedStream.complete();
    this._intlChanges.unsubscribe();
  }
  nextPage() {
    if (this.hasNextPage()) {
      this._navigate(this.pageIndex + 1);
    }
  }
  previousPage() {
    if (this.hasPreviousPage()) {
      this._navigate(this.pageIndex - 1);
    }
  }
  firstPage() {
    if (this.hasPreviousPage()) {
      this._navigate(0);
    }
  }
  lastPage() {
    if (this.hasNextPage()) {
      this._navigate(this.getNumberOfPages() - 1);
    }
  }
  hasPreviousPage() {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }
  hasNextPage() {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }
  getNumberOfPages() {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }
  _changePageSize(pageSize) {
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }
  _updateDisplayedPageSizeOptions() {
    if (!this._isInitialized) {
      return;
    }
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this._displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }
  _emitPageEvent(previousPageIndex) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
  _navigate(index) {
    const previousIndex = this.pageIndex;
    if (index !== previousIndex) {
      this.pageIndex = index;
      this._emitPageEvent(previousIndex);
    }
  }
  _buttonClicked(targetIndex, isDisabled) {
    if (!isDisabled) {
      this._navigate(targetIndex);
    }
  }
  static ɵfac = function MatPaginator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginator)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatPaginator,
    selectors: [["mat-paginator"]],
    hostAttrs: ["role", "group", 1, "mat-mdc-paginator"],
    inputs: {
      color: "color",
      pageIndex: [2, "pageIndex", "pageIndex", numberAttribute],
      length: [2, "length", "length", numberAttribute],
      pageSize: [2, "pageSize", "pageSize", numberAttribute],
      pageSizeOptions: "pageSizeOptions",
      hidePageSize: [2, "hidePageSize", "hidePageSize", booleanAttribute],
      showFirstLastButtons: [2, "showFirstLastButtons", "showFirstLastButtons", booleanAttribute],
      selectConfig: "selectConfig",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      page: "page"
    },
    exportAs: ["matPaginator"],
    decls: 14,
    vars: 14,
    consts: [["selectRef", ""], [1, "mat-mdc-paginator-outer-container"], [1, "mat-mdc-paginator-container"], [1, "mat-mdc-paginator-page-size"], [1, "mat-mdc-paginator-range-actions"], ["aria-atomic", "true", "aria-live", "polite", "role", "status", 1, "mat-mdc-paginator-range-label"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-previous", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["viewBox", "0 0 24 24", "focusable", "false", "aria-hidden", "true", 1, "mat-mdc-paginator-icon"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-next", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["aria-hidden", "true", 1, "mat-mdc-paginator-page-size-label"], [1, "mat-mdc-paginator-page-size-select", 3, "appearance", "color"], [1, "mat-mdc-paginator-page-size-value"], ["hideSingleSelectionIndicator", "", 3, "selectionChange", "value", "disabled", "aria-labelledby", "panelClass", "disableOptionCentering"], [3, "value"], [1, "mat-mdc-paginator-touch-target", 3, "click"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],
    template: function MatPaginator_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 1)(1, "div", 2);
        ɵɵconditionalCreate(2, MatPaginator_Conditional_2_Template, 5, 4, "div", 3);
        ɵɵelementStart(3, "div", 4)(4, "div", 5);
        ɵɵtext(5);
        ɵɵelementEnd();
        ɵɵconditionalCreate(6, MatPaginator_Conditional_6_Template, 3, 5, "button", 6);
        ɵɵelementStart(7, "button", 7);
        ɵɵlistener("click", function MatPaginator_Template_button_click_7_listener() {
          return ctx._buttonClicked(ctx.pageIndex - 1, ctx._previousButtonsDisabled());
        });
        ɵɵnamespaceSVG();
        ɵɵelementStart(8, "svg", 8);
        ɵɵelement(9, "path", 9);
        ɵɵelementEnd()();
        ɵɵnamespaceHTML();
        ɵɵelementStart(10, "button", 10);
        ɵɵlistener("click", function MatPaginator_Template_button_click_10_listener() {
          return ctx._buttonClicked(ctx.pageIndex + 1, ctx._nextButtonsDisabled());
        });
        ɵɵnamespaceSVG();
        ɵɵelementStart(11, "svg", 8);
        ɵɵelement(12, "path", 11);
        ɵɵelementEnd()();
        ɵɵconditionalCreate(13, MatPaginator_Conditional_13_Template, 3, 5, "button", 12);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵconditional(!ctx.hidePageSize ? 2 : -1);
        ɵɵadvance(3);
        ɵɵtextInterpolate1(" ", ctx._intl.getRangeLabel(ctx.pageIndex, ctx.pageSize, ctx.length), " ");
        ɵɵadvance();
        ɵɵconditional(ctx.showFirstLastButtons ? 6 : -1);
        ɵɵadvance();
        ɵɵproperty("matTooltip", ctx._intl.previousPageLabel)("matTooltipDisabled", ctx._previousButtonsDisabled())("disabled", ctx._previousButtonsDisabled())("tabindex", ctx._previousButtonsDisabled() ? -1 : null);
        ɵɵattribute("aria-label", ctx._intl.previousPageLabel);
        ɵɵadvance(3);
        ɵɵproperty("matTooltip", ctx._intl.nextPageLabel)("matTooltipDisabled", ctx._nextButtonsDisabled())("disabled", ctx._nextButtonsDisabled())("tabindex", ctx._nextButtonsDisabled() ? -1 : null);
        ɵɵattribute("aria-label", ctx._intl.nextPageLabel);
        ɵɵadvance(3);
        ɵɵconditional(ctx.showFirstLastButtons ? 13 : -1);
      }
    },
    dependencies: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
    styles: [".mat-mdc-paginator {\n  display: block;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));\n  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));\n  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));\n  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));\n  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);\n  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);\n}\n.mat-mdc-paginator .mat-mdc-select-value {\n  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));\n}\n.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.mat-mdc-paginator .mat-mdc-select {\n  line-height: 1.5;\n}\n\n.mat-mdc-paginator-outer-container {\n  display: flex;\n}\n\n.mat-mdc-paginator-container {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 8px;\n  flex-wrap: wrap;\n  width: 100%;\n  min-height: var(--mat-paginator-container-size, 56px);\n}\n\n.mat-mdc-paginator-page-size {\n  display: flex;\n  align-items: baseline;\n  margin-right: 8px;\n}\n[dir=rtl] .mat-mdc-paginator-page-size {\n  margin-right: 0;\n  margin-left: 8px;\n}\n\n.mat-mdc-paginator-page-size-label {\n  margin: 0 4px;\n}\n\n.mat-mdc-paginator-page-size-select {\n  margin: 0 4px;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n}\n\n.mat-mdc-paginator-range-label {\n  margin: 0 32px 0 24px;\n}\n\n.mat-mdc-paginator-range-actions {\n  display: flex;\n  align-items: center;\n}\n\n.mat-mdc-paginator-icon {\n  display: inline-block;\n  width: 28px;\n  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {\n  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n[dir=rtl] .mat-mdc-paginator-icon {\n  transform: rotate(180deg);\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,\n  .mat-mdc-paginator-icon {\n    fill: currentColor;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {\n    outline: solid 1px;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {\n    color: GrayText;\n  }\n}\n.mat-mdc-paginator-touch-target {\n  display: var(--mat-paginator-touch-target-display, block);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);\n  background-color: transparent;\n  transform: translate(-50%, -50%);\n  cursor: pointer;\n}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginator, [{
    type: Component,
    args: [{
      selector: "mat-paginator",
      exportAs: "matPaginator",
      host: {
        "class": "mat-mdc-paginator",
        "role": "group"
      },
      encapsulation: ViewEncapsulation.None,
      imports: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
      template: '<div class="mat-mdc-paginator-outer-container">\n  <div class="mat-mdc-paginator-container">\n    @if (!hidePageSize) {\n      <div class="mat-mdc-paginator-page-size">\n        <div class="mat-mdc-paginator-page-size-label" [attr.id]="_pageSizeLabelId" aria-hidden="true">\n          {{_intl.itemsPerPageLabel}}\n        </div>\n\n        @if (_displayedPageSizeOptions.length > 1) {\n          <mat-form-field\n            [appearance]="_formFieldAppearance!"\n            [color]="color"\n            class="mat-mdc-paginator-page-size-select">\n            <mat-select\n              #selectRef\n              [value]="pageSize"\n              [disabled]="disabled"\n              [aria-labelledby]="_pageSizeLabelId"\n              [panelClass]="selectConfig.panelClass || \'\'"\n              [disableOptionCentering]="selectConfig.disableOptionCentering"\n              (selectionChange)="_changePageSize($event.value)"\n              hideSingleSelectionIndicator>\n              @for (pageSizeOption of _displayedPageSizeOptions; track pageSizeOption) {\n                <mat-option [value]="pageSizeOption">\n                  {{pageSizeOption}}\n                </mat-option>\n              }\n            </mat-select>\n          <div class="mat-mdc-paginator-touch-target" (click)="selectRef.open()"></div>\n          </mat-form-field>\n        }\n\n        @if (_displayedPageSizeOptions.length <= 1) {\n          <div class="mat-mdc-paginator-page-size-value">{{pageSize}}</div>\n        }\n      </div>\n    }\n\n    <div class="mat-mdc-paginator-range-actions">\n      <div class="mat-mdc-paginator-range-label" aria-atomic="true" aria-live="polite" role="status">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <!--\n      The buttons use `disabledInteractive` so that they can retain focus if they become disabled,\n      otherwise focus is moved to the document body. However, users should not be able to navigate\n      into these buttons, so `tabindex` is set to -1 when disabled.\n      -->\n\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-first"\n                (click)="_buttonClicked(0, _previousButtonsDisabled())"\n                [attr.aria-label]="_intl.firstPageLabel"\n                [matTooltip]="_intl.firstPageLabel"\n                [matTooltipDisabled]="_previousButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_previousButtonsDisabled()"\n                [tabindex]="_previousButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>\n          </svg>\n        </button>\n      }\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-previous"\n              (click)="_buttonClicked(pageIndex - 1, _previousButtonsDisabled())"\n              [attr.aria-label]="_intl.previousPageLabel"\n              [matTooltip]="_intl.previousPageLabel"\n              [matTooltipDisabled]="_previousButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_previousButtonsDisabled()"\n              [tabindex]="_previousButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n        </svg>\n      </button>\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-next"\n              (click)="_buttonClicked(pageIndex + 1, _nextButtonsDisabled())"\n              [attr.aria-label]="_intl.nextPageLabel"\n              [matTooltip]="_intl.nextPageLabel"\n              [matTooltipDisabled]="_nextButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_nextButtonsDisabled()"\n              [tabindex]="_nextButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n        </svg>\n      </button>\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-last"\n                (click)="_buttonClicked(getNumberOfPages() - 1, _nextButtonsDisabled())"\n                [attr.aria-label]="_intl.lastPageLabel"\n                [matTooltip]="_intl.lastPageLabel"\n                [matTooltipDisabled]="_nextButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_nextButtonsDisabled()"\n                [tabindex]="_nextButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>\n          </svg>\n        </button>\n      }\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-paginator {\n  display: block;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));\n  background-color: var(--mat-paginator-container-background-color, var(--mat-sys-surface));\n  font-family: var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));\n  letter-spacing: var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));\n  --mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);\n  --mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px);\n}\n.mat-mdc-paginator .mat-mdc-select-value {\n  font-size: var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size));\n}\n.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.mat-mdc-paginator .mat-mdc-select {\n  line-height: 1.5;\n}\n\n.mat-mdc-paginator-outer-container {\n  display: flex;\n}\n\n.mat-mdc-paginator-container {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 8px;\n  flex-wrap: wrap;\n  width: 100%;\n  min-height: var(--mat-paginator-container-size, 56px);\n}\n\n.mat-mdc-paginator-page-size {\n  display: flex;\n  align-items: baseline;\n  margin-right: 8px;\n}\n[dir=rtl] .mat-mdc-paginator-page-size {\n  margin-right: 0;\n  margin-left: 8px;\n}\n\n.mat-mdc-paginator-page-size-label {\n  margin: 0 4px;\n}\n\n.mat-mdc-paginator-page-size-select {\n  margin: 0 4px;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n}\n\n.mat-mdc-paginator-range-label {\n  margin: 0 32px 0 24px;\n}\n\n.mat-mdc-paginator-range-actions {\n  display: flex;\n  align-items: center;\n}\n\n.mat-mdc-paginator-icon {\n  display: inline-block;\n  width: 28px;\n  fill: var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {\n  fill: var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n[dir=rtl] .mat-mdc-paginator-icon {\n  transform: rotate(180deg);\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,\n  .mat-mdc-paginator-icon {\n    fill: currentColor;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {\n    outline: solid 1px;\n  }\n  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {\n    color: GrayText;\n  }\n}\n.mat-mdc-paginator-touch-target {\n  display: var(--mat-paginator-touch-target-display, block);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--mat-paginator-page-size-select-width, 84px);\n  height: var(--mat-paginator-page-size-select-touch-target-height, 48px);\n  background-color: transparent;\n  transform: translate(-50%, -50%);\n  cursor: pointer;\n}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    pageIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    length: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSizeOptions: [{
      type: Input
    }],
    hidePageSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastButtons: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectConfig: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    page: [{
      type: Output
    }]
  });
})();
var MatPaginatorModule = class _MatPaginatorModule {
  static ɵfac = function MatPaginatorModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatPaginatorModule,
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
    exports: [MatPaginator]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
      exports: [MatPaginator]
    }]
  }], null, null);
})();
export {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent
};
//# sourceMappingURL=@angular_material_paginator.js.map
