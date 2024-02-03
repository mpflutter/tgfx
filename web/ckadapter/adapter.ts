import {
  AffinityEnumValues,
  AlphaTypeEnumValues,
  AnimatedImage,
  BlendModeEnumValues,
  BlenderFactory,
  BlurStyleEnumValues,
  Canvas,
  CanvasKit,
  ClipOpEnumValues,
  ColorChannelEnumValues,
  ColorFilterFactory,
  ColorIntArray,
  ColorMatrixHelpers,
  ColorSpace,
  ColorSpaceEnumValues,
  ColorTypeEnumValues,
  ContourMeasureIterConstructor,
  CubicResampler,
  DecorationStyleEnumValues,
  DefaultConstructor,
  EmbindEnumEntity,
  EmbindObject,
  EmulatedCanvas2D,
  FillTypeEnumValues,
  FilterModeEnumValues,
  FilterOptions,
  Font,
  FontCollectionFactory,
  FontConstructor,
  FontEdgingEnumValues,
  FontHintingEnumValues,
  FontMgrFactory,
  FontSlantEnumValues,
  FontWeightEnumValues,
  FontWidthEnumValues,
  GlyphRunFlagValues,
  GrDirectContext,
  Image,
  ImageDataConstructor,
  ImageFilter,
  ImageFilterFactory,
  ImageFormatEnumValues,
  ImageInfo,
  InputColor,
  InputFlattenedPointArray,
  InputFlattenedRSXFormArray,
  InputFlattenedRectangleArray,
  InputGlyphIDArray,
  InputIRect,
  InputMatrix,
  InputRRect,
  InputRect,
  InputStateEnumValues,
  InputVector3,
  MallocObj,
  ManagedSkottieAnimation,
  MaskFilterFactory,
  Matrix3x3Helpers,
  Matrix4x4Helpers,
  MipmapModeEnumValues,
  ModifierKeyEnumValues,
  Paint,
  PaintStyleEnumValues,
  Paragraph,
  ParagraphBuilderFactory,
  ParagraphStyleConstructor,
  PartialImageInfo,
  Path,
  Path1DEffectStyleEnumValues,
  PathConstructorAndFactory,
  PathEffectFactory,
  PathOpEnumValues,
  PictureRecorder,
  PlaceholderAlignmentEnumValues,
  PointModeEnumValues,
  RectHeightStyleEnumValues,
  RectWidthStyleEnumValues,
  ResizePolicyEnumValues,
  RuntimeEffectFactory,
  ShaderFactory,
  SkPicture,
  SkottieAnimation,
  SlottableTextPropertyConstructor,
  SoundMap,
  StrokeCapEnumValues,
  StrokeJoinEnumValues,
  Surface,
  TextAlignEnumValues,
  TextBaselineEnumValues,
  TextBlob,
  TextBlobFactory,
  TextDirectionEnumValues,
  TextHeightBehaviorEnumValues,
  TextStyleConstructor,
  TextureSource,
  TileModeEnumValues,
  TonalColorsInput,
  TonalColorsOutput,
  TypedArrayConstructor,
  TypefaceFactory,
  TypefaceFontProviderFactory,
  VectorHelpers,
  VertexModeEnumValues,
  VerticalTextAlignEnumValues,
  Vertices,
  WebGLContextHandle,
  WebGLOptions,
} from "./canvaskit";

const handleSet = new Set();

function generateUniqueHandle(): number {
  let handle;
  do {
    handle = Math.floor(Math.random() * 10000000);
  } while (handleSet.has(handle));
  handleSet.add(handle);
  return handle;
}

export class Adapter implements CanvasKit {
  static CKAdapterModule: any;

  // Not support methods
  MakeSWCanvasSurface(canvas: string | HTMLCanvasElement): Surface | null {
    throw new Error("Use MakeOnScreenGLSurface!");
  }

  MakeSurface(width: number, height: number): Surface | null {
    throw new Error("Use MakeOnScreenGLSurface!");
  }

  // Adapted methods

  ColorAsInt(r: number, g: number, b: number, a?: number | undefined): number {
    throw new Error("Method not implemented.");
  }
  getColorComponents(c: Float32Array): number[] {
    throw new Error("Method not implemented.");
  }
  parseColorString(
    color: string,
    colorMap?: Record<string, Float32Array> | undefined
  ): Float32Array {
    throw new Error("Method not implemented.");
  }
  multiplyByAlpha(c: Float32Array, alpha: number): Float32Array {
    throw new Error("Method not implemented.");
  }
  computeTonalColors(colors: TonalColorsInput): TonalColorsOutput {
    throw new Error("Method not implemented.");
  }
  getShadowLocalBounds(
    ctm: InputMatrix,
    path: Path,
    zPlaneParams: InputVector3,
    lightPos: InputVector3,
    lightRadius: number,
    flags: number,
    dstRect?: Float32Array | undefined
  ): Float32Array | null {
    throw new Error("Method not implemented.");
  }
  Malloc(typedArray: TypedArrayConstructor, len: number): MallocObj {
    throw new Error("Method not implemented.");
  }
  MallocGlyphIDs(len: number): MallocObj {
    throw new Error("Method not implemented.");
  }
  Free(m: MallocObj): void {
    throw new Error("Method not implemented.");
  }
  MakeRasterDirectSurface(
    ii: ImageInfo,
    pixels: MallocObj,
    bytesPerRow: number
  ): Surface | null {
    throw new Error("Method not implemented.");
  }
  MakeRenderTarget(
    ctx: GrDirectContext,
    width: number,
    height: number
  ): Surface | null;
  MakeRenderTarget(ctx: GrDirectContext, info: ImageInfo): Surface | null;
  MakeRenderTarget(
    ctx: unknown,
    width: unknown,
    height?: unknown
  ): import("./canvaskit").Surface | null {
    throw new Error("Method not implemented.");
  }
  MakeLazyImageFromTextureSource(
    src: TextureSource,
    info?: ImageInfo | PartialImageInfo | undefined,
    srcIsPremul?: boolean | undefined
  ): Image {
    throw new Error("Method not implemented.");
  }
  getDecodeCacheLimitBytes(): number {
    throw new Error("Method not implemented.");
  }
  getDecodeCacheUsedBytes(): number {
    throw new Error("Method not implemented.");
  }
  setDecodeCacheLimitBytes(size: number): void {
    throw new Error("Method not implemented.");
  }
  MakeAnimatedImageFromEncoded(
    bytes: Uint8Array | ArrayBuffer
  ): AnimatedImage | null {
    throw new Error("Method not implemented.");
  }
  MakeCanvas(width: number, height: number): EmulatedCanvas2D {
    throw new Error("Method not implemented.");
  }
  MakeImage(
    info: ImageInfo,
    bytes: number[] | Uint8Array | Uint8ClampedArray,
    bytesPerRow: number
  ): Image | null {
    throw new Error("Method not implemented.");
  }
  MakeImageFromEncoded(bytes: Uint8Array | ArrayBuffer): Image | null {
    throw new Error("Method not implemented.");
  }
  MakeImageFromCanvasImageSource(src: CanvasImageSource): Image {
    throw new Error("Method not implemented.");
  }
  MakePicture(bytes: Uint8Array | ArrayBuffer): SkPicture | null {
    throw new Error("Method not implemented.");
  }
  MakeVertices(
    mode: EmbindEnumEntity,
    positions: InputFlattenedPointArray,
    textureCoordinates?: InputFlattenedPointArray | null | undefined,
    colors?: Float32Array | ColorIntArray | null | undefined,
    indices?: number[] | null | undefined,
    isVolatile?: boolean | undefined
  ): Vertices {
    throw new Error("Method not implemented.");
  }
  MakeAnimation(json: string): SkottieAnimation {
    throw new Error("Method not implemented.");
  }
  MakeManagedAnimation(
    json: string,
    assets?: Record<string, ArrayBuffer> | undefined,
    filterPrefix?: string | undefined,
    soundMap?: SoundMap | undefined
  ): ManagedSkottieAnimation {
    throw new Error("Method not implemented.");
  }
  ImageData: ImageDataConstructor;
  ParagraphStyle: ParagraphStyleConstructor;
  ContourMeasureIter: ContourMeasureIterConstructor;
  Font: FontConstructor;
  Paint: DefaultConstructor<Paint>;
  Path: PathConstructorAndFactory;
  PictureRecorder: DefaultConstructor<PictureRecorder>;
  TextStyle: TextStyleConstructor;
  SlottableTextProperty: SlottableTextPropertyConstructor;
  ParagraphBuilder: ParagraphBuilderFactory;
  Blender: BlenderFactory;
  ColorFilter: ColorFilterFactory;
  FontCollection: FontCollectionFactory;
  FontMgr: FontMgrFactory;
  ImageFilter: ImageFilterFactory;
  MaskFilter: MaskFilterFactory;
  PathEffect: PathEffectFactory;
  RuntimeEffect: RuntimeEffectFactory;
  Shader: ShaderFactory;
  TextBlob: TextBlobFactory;
  Typeface: TypefaceFactory;
  TypefaceFontProvider: TypefaceFontProviderFactory;
  ColorMatrix: ColorMatrixHelpers;
  Matrix: Matrix3x3Helpers;
  M44: Matrix4x4Helpers;
  Vector: VectorHelpers;
  AlphaType: AlphaTypeEnumValues;
  BlendMode: BlendModeEnumValues;
  BlurStyle: BlurStyleEnumValues;
  ClipOp: ClipOpEnumValues;
  ColorChannel: ColorChannelEnumValues;
  ColorType: ColorTypeEnumValues;
  FillType: FillTypeEnumValues;
  FilterMode: FilterModeEnumValues;
  FontEdging: FontEdgingEnumValues;
  FontHinting: FontHintingEnumValues;
  GlyphRunFlags: GlyphRunFlagValues;
  ImageFormat: ImageFormatEnumValues;
  MipmapMode: MipmapModeEnumValues;
  PaintStyle: PaintStyleEnumValues;
  Path1DEffect: Path1DEffectStyleEnumValues;
  PathOp: PathOpEnumValues;
  PointMode: PointModeEnumValues;
  ColorSpace: ColorSpaceEnumValues;
  StrokeCap: StrokeCapEnumValues;
  StrokeJoin: StrokeJoinEnumValues;
  TileMode: TileModeEnumValues;
  VertexMode: VertexModeEnumValues;
  InputState: InputStateEnumValues;
  ModifierKey: ModifierKeyEnumValues;
  TRANSPARENT: Float32Array;
  BLACK: Float32Array;
  WHITE: Float32Array;
  RED: Float32Array;
  GREEN: Float32Array;
  BLUE: Float32Array;
  YELLOW: Float32Array;
  CYAN: Float32Array;
  MAGENTA: Float32Array;
  MOVE_VERB: number;
  LINE_VERB: number;
  QUAD_VERB: number;
  CONIC_VERB: number;
  CUBIC_VERB: number;
  CLOSE_VERB: number;
  SaveLayerInitWithPrevious: number;
  SaveLayerF16ColorType: number;
  ShadowTransparentOccluder: number;
  ShadowGeometricOnly: number;
  ShadowDirectionalLight: number;
  gpu?: boolean | undefined;
  managed_skottie?: boolean | undefined;
  rt_effect?: boolean | undefined;
  skottie?: boolean | undefined;
  Affinity: AffinityEnumValues;
  DecorationStyle: DecorationStyleEnumValues;
  FontSlant: FontSlantEnumValues;
  FontWeight: FontWeightEnumValues;
  FontWidth: FontWidthEnumValues;
  PlaceholderAlignment: PlaceholderAlignmentEnumValues;
  RectHeightStyle: RectHeightStyleEnumValues;
  RectWidthStyle: RectWidthStyleEnumValues;
  TextAlign: TextAlignEnumValues;
  TextBaseline: TextBaselineEnumValues;
  TextDirection: TextDirectionEnumValues;
  TextHeightBehavior: TextHeightBehaviorEnumValues;
  VerticalTextAlign: VerticalTextAlignEnumValues;
  ResizePolicy: ResizePolicyEnumValues;
  NoDecoration: number;
  UnderlineDecoration: number;
  OverlineDecoration: number;
  LineThroughDecoration: number;

  // === Adapter Begin ===

  constructor(readonly CKAdapterModule: any) {
    Adapter.CKAdapterModule = CKAdapterModule;
    this.PaintStyle = CKAdapterModule.PaintStyle;
    this.Paint = CKAdapterModule.Paint;
  }

  webGlContexts: Record<WebGLContextHandle, TGFXContext> = {};

  Color(r: number, g: number, b: number, a?: number | undefined): Float32Array {
    return this.CKAdapterModule.Color.FromRGBA(r, g, b, a ?? 255);
  }

  Color4f(
    r: number,
    g: number,
    b: number,
    a?: number | undefined
  ): Float32Array {
    return this.Color(r * 255, g * 255, b * 255, (a ?? 1) * 255);
  }

  LTRBRect(
    left: number,
    top: number,
    right: number,
    bottom: number
  ): Float32Array {
    return this.CKAdapterModule.Rect.MakeLTRB(left, top, right, bottom);
  }

  LTRBiRect(
    left: number,
    top: number,
    right: number,
    bottom: number
  ): Int32Array {
    return this.CKAdapterModule.Rect.MakeLTRB(left, top, right, bottom);
  }

  XYWHRect(x: number, y: number, width: number, height: number): Float32Array {
    return this.CKAdapterModule.Rect.MakeXYWH(x, y, width, height);
  }

  XYWHiRect(x: number, y: number, width: number, height: number): Int32Array {
    return this.CKAdapterModule.Rect.MakeXYWH(x, y, width, height);
  }

  RRectXY(rect: InputRect, rx: number, ry: number): any {
    return { rect: rect, radiusX: rx, radiusY: ry };
  }

  GetWebGLContext(
    canvas: HTMLCanvasElement,
    attrs?: WebGLOptions | undefined
  ): WebGLContextHandle {
    const tgfxView = this.CKAdapterModule.TGFXView.MakeFrom("#" + canvas.id);
    const handle = generateUniqueHandle();
    const tgfxContext = new TGFXContext(tgfxView);
    tgfxView.updateSize(2.0); // todo: screen scale
    tgfxView.createWindow();
    this.webGlContexts[handle] = tgfxContext;
    return handle;
  }

  MakeGrContext(handle: WebGLContextHandle): GrDirectContext | null {
    const tgfxContext = this.webGlContexts[handle];
    if (tgfxContext) {
      const grContext = new TGFXGrDirectContext(tgfxContext);
      tgfxContext.grContext = grContext;
      return grContext;
    }
    return null;
  }

  MakeWebGLContext(handle: number): GrDirectContext | null {
    return this.MakeGrContext(handle);
  }

  deleteContext(handle: WebGLContextHandle): void {
    delete this.webGlContexts[handle];
  }

  MakeCanvasSurface(canvas: string | HTMLCanvasElement): Surface | null {
    throw new Error("Method not implemented.");
  }

  MakeWebGLCanvasSurface(
    canvas: string | HTMLCanvasElement,
    colorSpace?: ColorSpace | undefined,
    opts?: WebGLOptions | undefined
  ): Surface | null {
    throw new Error("Method not implemented.");
  }

  MakeOnScreenGLSurface(
    ctx: GrDirectContext,
    width: number,
    height: number,
    colorSpace: ColorSpace,
    sampleCount?: number | undefined,
    stencil?: number | undefined
  ): Surface | null {
    let _ctx = ctx as TGFXGrDirectContext;
    return _ctx.createSurface(width, height);
  }
}

export class TGFXContext {
  constructor(readonly tgfxView: any) {}

  grContext?: TGFXGrDirectContext;

  draw() {
    this.tgfxView.draw();
  }
}

export class TGFXEmbindObject<T extends string> implements EmbindObject<T> {
  _type: T;

  private _deleted = false;

  delete(): void {
    this._deleted = true;
  }
  deleteLater(): void {
    this._deleted = true;
  }
  isAliasOf(other: any): boolean {
    return false;
  }
  isDeleted(): boolean {
    return this._deleted;
  }
}

export class TGFXGrDirectContext
  extends TGFXEmbindObject<"GrDirectContext">
  implements GrDirectContext
{
  constructor(readonly tgfxContext: TGFXContext) {
    super();
  }

  createSurface(width: number, height: number): TGFXSurface {
    const tgfxSurface = this.tgfxContext.tgfxView.getSurface();
    return new TGFXSurface(this.tgfxContext, tgfxSurface, { width, height });
  }

  getResourceCacheLimitBytes(): number {
    return 1024 * 1024 * 20;
  }
  getResourceCacheUsageBytes(): number {
    return 0;
  }
  releaseResourcesAndAbandonContext(): void {
    throw new Error("releaseResourcesAndAbandonContextMethod not implemented.");
  }
  setResourceCacheLimitBytes(bytes: number): void {
    throw new Error("setResourceCacheLimitBytes Method not implemented.");
  }
}

export class TGFXSurface
  extends TGFXEmbindObject<"Surface">
  implements Surface
{
  constructor(
    readonly tgfxContext: TGFXContext,
    readonly tgfxSurface: any,
    readonly screenSize: { width: number; height: number }
  ) {
    super();
  }

  drawOnce(drawFrame: (_: Canvas) => void): void {
    drawFrame(this.getCanvas());
  }

  dispose(): void {
    throw new Error("Method not implemented.");
  }

  flush(): void {
    this.tgfxSurface._flushAndSubmit(false);
  }

  getCanvas(): Canvas {
    const tgfxCanvas = this.tgfxSurface._getCanvas();
    return new TGFXCanvas(tgfxCanvas);
  }

  height(): number {
    return this.screenSize.height;
  }

  imageInfo(): ImageInfo {
    throw new Error("Method not implemented.");
  }

  makeImageFromTexture(tex: WebGLTexture, info: ImageInfo): Image | null {
    throw new Error("Method not implemented.");
  }

  makeImageFromTextureSource(
    src: TextureSource,
    info?: ImageInfo | PartialImageInfo | undefined,
    srcIsPremul?: boolean | undefined
  ): Image | null {
    throw new Error("Method not implemented.");
  }

  makeImageSnapshot(bounds?: InputIRect | undefined): Image {
    throw new Error("Method not implemented.");
  }

  makeSurface(info: ImageInfo): Surface {
    throw new Error("Method not implemented.");
  }

  reportBackendTypeIsGPU(): boolean {
    throw new Error("Method not implemented.");
  }

  requestAnimationFrame(drawFrame: (_: Canvas) => void): number {
    if (typeof window === "object" && (window as any).requestAnimationFrame) {
      return (window as any).requestAnimationFrame(() => {
        drawFrame(this.getCanvas());
      }) as number;
    } else {
      return -1;
    }
  }

  sampleCnt(): number {
    throw new Error("Method not implemented.");
  }

  updateTextureFromSource(
    img: Image,
    src: TextureSource,
    srcIsPremul?: boolean | undefined
  ): void {
    throw new Error("Method not implemented.");
  }

  width(): number {
    return this.screenSize.width;
  }
}

export class TGFXCanvas extends TGFXEmbindObject<"Canvas"> implements Canvas {
  constructor(readonly tgfxCanvas: any) {
    super();
  }

  clear(color: InputColor): void {
    throw new Error("Method not implemented.");
  }
  clipPath(path: Path, op: EmbindEnumEntity, doAntiAlias: boolean): void {
    throw new Error("Method not implemented.");
  }
  clipRect(rect: InputRect, op: EmbindEnumEntity, doAntiAlias: boolean): void {
    throw new Error("Method not implemented.");
  }
  clipRRect(
    rrect: InputRRect,
    op: EmbindEnumEntity,
    doAntiAlias: boolean
  ): void {
    throw new Error("Method not implemented.");
  }
  concat(m: InputMatrix): void {
    throw new Error("Method not implemented.");
  }
  drawArc(
    oval: InputRect,
    startAngle: number,
    sweepAngle: number,
    useCenter: boolean,
    paint: Paint
  ): void {
    throw new Error("Method not implemented.");
  }
  drawAtlas(
    atlas: Image,
    srcRects: InputFlattenedRectangleArray,
    dstXforms: InputFlattenedRSXFormArray,
    paint: Paint,
    blendMode?: EmbindEnumEntity | null | undefined,
    colors?: ColorIntArray | null | undefined,
    sampling?: CubicResampler | FilterOptions | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawCircle(cx: number, cy: number, radius: number, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawColor(color: InputColor, blendMode?: EmbindEnumEntity | undefined): void {
    throw new Error("Method not implemented.");
  }
  drawColorComponents(
    r: number,
    g: number,
    b: number,
    a: number,
    blendMode?: EmbindEnumEntity | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawColorInt(color: number, blendMode?: EmbindEnumEntity | undefined): void {
    throw new Error("Method not implemented.");
  }
  drawDRRect(outer: InputRRect, inner: InputRRect, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawGlyphs(
    glyphs: InputGlyphIDArray,
    positions: InputFlattenedPointArray,
    x: number,
    y: number,
    font: Font,
    paint: Paint
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImage(
    img: Image,
    left: number,
    top: number,
    paint?: Paint | null | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImageCubic(
    img: Image,
    left: number,
    top: number,
    B: number,
    C: number,
    paint?: Paint | null | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImageOptions(
    img: Image,
    left: number,
    top: number,
    fm: EmbindEnumEntity,
    mm: EmbindEnumEntity,
    paint?: Paint | null | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImageNine(
    img: Image,
    center: InputIRect,
    dest: InputRect,
    filter: EmbindEnumEntity,
    paint?: Paint | null | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImageRect(
    img: Image,
    src: InputRect,
    dest: InputRect,
    paint: Paint,
    fastSample?: boolean | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImageRectCubic(
    img: Image,
    src: InputRect,
    dest: InputRect,
    B: number,
    C: number,
    paint?: Paint | null | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawImageRectOptions(
    img: Image,
    src: InputRect,
    dest: InputRect,
    fm: EmbindEnumEntity,
    mm: EmbindEnumEntity,
    paint?: Paint | null | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawLine(x0: number, y0: number, x1: number, y1: number, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawOval(oval: InputRect, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawPaint(paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawParagraph(p: Paragraph, x: number, y: number): void {
    throw new Error("Method not implemented.");
  }
  drawPath(path: Path, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawPatch(
    cubics: InputFlattenedPointArray,
    colors?: ColorIntArray | Float32Array[] | null | undefined,
    texs?: InputFlattenedPointArray | null | undefined,
    mode?: EmbindEnumEntity | null | undefined,
    paint?: Paint | undefined
  ): void {
    throw new Error("Method not implemented.");
  }
  drawPicture(skp: SkPicture): void {
    throw new Error("Method not implemented.");
  }
  drawPoints(
    mode: EmbindEnumEntity,
    points: InputFlattenedPointArray,
    paint: Paint
  ): void {
    throw new Error("Method not implemented.");
  }

  drawRect(rect: InputRect, paint: Paint): void {
    this.tgfxCanvas.drawRect(rect, paint);
  }

  drawRect4f(
    left: number,
    top: number,
    right: number,
    bottom: number,
    paint: Paint
  ): void {
    const rect = Adapter.CKAdapterModule.Rect.MakeLTRB(
      left,
      top,
      right,
      bottom
    );
    this.drawRect(rect, paint);
  }

  drawRRect(rrect: InputRRect, paint: Paint): void {
    const _rrect: TGFXRRect = rrect as any;
    const path = new Adapter.CKAdapterModule.Path();
    path.addRoundRect(_rrect.rect, _rrect.radiusX, _rrect.radiusY, false, 0);
    this.tgfxCanvas.drawPath(path, paint);
  }

  drawShadow(
    path: Path,
    zPlaneParams: InputVector3,
    lightPos: InputVector3,
    lightRadius: number,
    ambientColor: InputColor,
    spotColor: InputColor,
    flags: number
  ): void {
    throw new Error("Method not implemented.");
  }
  drawText(str: string, x: number, y: number, paint: Paint, font: Font): void {
    throw new Error("Method not implemented.");
  }
  drawTextBlob(blob: TextBlob, x: number, y: number, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  drawVertices(verts: Vertices, mode: EmbindEnumEntity, paint: Paint): void {
    throw new Error("Method not implemented.");
  }
  getDeviceClipBounds(output?: Int32Array | undefined): Int32Array {
    throw new Error("Method not implemented.");
  }
  getLocalToDevice(): Float32Array {
    throw new Error("Method not implemented.");
  }
  getSaveCount(): number {
    throw new Error("Method not implemented.");
  }
  getTotalMatrix(): number[] {
    throw new Error("Method not implemented.");
  }
  makeSurface(info: ImageInfo): Surface | null {
    throw new Error("Method not implemented.");
  }
  readPixels(
    srcX: number,
    srcY: number,
    imageInfo: ImageInfo,
    dest?: MallocObj | undefined,
    bytesPerRow?: number | undefined
  ): Float32Array | Uint8Array | null {
    throw new Error("Method not implemented.");
  }
  restore(): void {
    throw new Error("Method not implemented.");
  }
  restoreToCount(saveCount: number): void {
    throw new Error("Method not implemented.");
  }
  rotate(rot: number, rx: number, ry: number): void {
    throw new Error("Method not implemented.");
  }
  save(): number {
    throw new Error("Method not implemented.");
  }
  saveLayer(
    paint?: Paint | undefined,
    bounds?: InputRect | null | undefined,
    backdrop?: ImageFilter | null | undefined,
    flags?: number | undefined
  ): number {
    throw new Error("Method not implemented.");
  }
  scale(sx: number, sy: number): void {
    throw new Error("Method not implemented.");
  }
  skew(sx: number, sy: number): void {
    throw new Error("Method not implemented.");
  }
  translate(dx: number, dy: number): void {
    throw new Error("Method not implemented.");
  }
  writePixels(
    pixels: Uint8Array | number[],
    srcWidth: number,
    srcHeight: number,
    destX: number,
    destY: number,
    alphaType?: EmbindEnumEntity | undefined,
    colorType?: EmbindEnumEntity | undefined,
    colorSpace?: ColorSpace | undefined
  ): boolean {
    throw new Error("Method not implemented.");
  }
}

interface TGFXRRect {
  rect: InputRect;
  radiusX: number;
  radiusY: number;
}
