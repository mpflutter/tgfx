import {
  AffinityEnumValues,
  AlphaTypeEnumValues,
  AnimatedImage,
  BlendModeEnumValues,
  Blender,
  BlenderFactory,
  BlurStyleEnumValues,
  Canvas,
  CanvasKit,
  ClipOpEnumValues,
  ColorChannelEnumValues,
  ColorFilter,
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
  InputCommands,
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
  MaskFilter,
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
  PathEffect,
  PathEffectFactory,
  PathOpEnumValues,
  PictureRecorder,
  PlaceholderAlignmentEnumValues,
  PointModeEnumValues,
  RectHeightStyleEnumValues,
  RectWidthStyleEnumValues,
  ResizePolicyEnumValues,
  RuntimeEffectFactory,
  Shader,
  ShaderFactory,
  SkPicture,
  SkottieAnimation,
  SlottableTextPropertyConstructor,
  SoundMap,
  StrokeCapEnumValues,
  StrokeJoinEnumValues,
  StrokeOpts,
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
  VerbList,
  VertexModeEnumValues,
  VerticalTextAlignEnumValues,
  Vertices,
  WebGLContextHandle,
  WebGLOptions,
  WeightList,
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
  Paint: DefaultConstructor<Paint>; // wip
  Path: PathConstructorAndFactory; // wip
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
  FillType: FillTypeEnumValues; // done
  FilterMode: FilterModeEnumValues;
  FontEdging: FontEdgingEnumValues;
  FontHinting: FontHintingEnumValues;
  GlyphRunFlags: GlyphRunFlagValues;
  ImageFormat: ImageFormatEnumValues;
  MipmapMode: MipmapModeEnumValues;
  PaintStyle: PaintStyleEnumValues; // done
  Path1DEffect: Path1DEffectStyleEnumValues;
  PathOp: PathOpEnumValues; // done
  PointMode: PointModeEnumValues;
  ColorSpace: ColorSpaceEnumValues;
  StrokeCap: StrokeCapEnumValues; // done
  StrokeJoin: StrokeJoinEnumValues; // done
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
    this.StrokeCap = CKAdapterModule.StrokeCap;
    this.StrokeJoin = CKAdapterModule.StrokeJoin;
    this.Paint = AdapterPaint;
    this.Path = AdapterPath as any;
    this.PathOp = CKAdapterModule.PathOp;
    this.FillType = CKAdapterModule.FillType;
    this.TRANSPARENT = this.Color(0, 0, 0, 0);
    this.BLACK = this.Color(0, 0, 0);
    this.WHITE = this.Color(255, 255, 255);
    this.RED = this.Color(255, 0, 0);
    this.GREEN = this.Color(0, 255, 0);
    this.BLUE = this.Color(0, 0, 255);
    this.YELLOW = this.Color(255, 255, 0);
    this.CYAN = this.Color(0, 255, 255);
    this.MAGENTA = this.Color(255, 0, 255);
  }

  webGlContexts: Record<WebGLContextHandle, AdapterContext> = {};

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
    const tgfxContext = new AdapterContext(tgfxView);
    tgfxView.updateSize(2.0); // todo: screen scale
    tgfxView.createWindow();
    this.webGlContexts[handle] = tgfxContext;
    return handle;
  }

  MakeGrContext(handle: WebGLContextHandle): GrDirectContext | null {
    const tgfxContext = this.webGlContexts[handle];
    if (tgfxContext) {
      const grContext = new AdapterGrDirectContext(tgfxContext);
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
    let _ctx = ctx as AdapterGrDirectContext;
    return _ctx.createSurface(width, height);
  }
}

export class AdapterContext {
  constructor(readonly tgfxView: any) {}

  grContext?: AdapterGrDirectContext;

  draw() {
    this.tgfxView.draw();
  }
}

export class AdapterEmbindObject<T extends string> implements EmbindObject<T> {
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

export class AdapterGrDirectContext
  extends AdapterEmbindObject<"GrDirectContext">
  implements GrDirectContext
{
  constructor(readonly tgfxContext: AdapterContext) {
    super();
  }

  createSurface(width: number, height: number): AdapterSurface {
    const tgfxSurface = this.tgfxContext.tgfxView.getSurface();
    return new AdapterSurface(this.tgfxContext, tgfxSurface, { width, height });
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

export class AdapterSurface
  extends AdapterEmbindObject<"Surface">
  implements Surface
{
  constructor(
    readonly tgfxContext: AdapterContext,
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
    return new AdapterCanvas(tgfxCanvas);
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
    return true;
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

export class AdapterCanvas
  extends AdapterEmbindObject<"Canvas">
  implements Canvas
{
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
    this.tgfxCanvas.drawPath(
      path instanceof AdapterPath ? path.tgfxPath : path,
      paint instanceof AdapterPaint ? paint.tgfxPaint : paint
    );
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
    this.tgfxCanvas.drawRect(
      rect,
      paint instanceof AdapterPaint ? paint.tgfxPaint : paint
    );
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
    const _rrect: AdapterRRect = rrect as any;
    const path = new Adapter.CKAdapterModule.Path();
    path.addRoundRect(_rrect.rect, _rrect.radiusX, _rrect.radiusY, false, 0);
    this.drawPath(path, paint);
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

export class AdapterPaint
  extends AdapterEmbindObject<"Paint">
  implements Paint
{
  constructor(readonly tgfxPaint: any = new Adapter.CKAdapterModule.Paint()) {
    super();
  }
  copy(): Paint {
    const paint = new AdapterPaint();
    paint.setColor(this.getColor());
    paint.setStrokeCap(this.getStrokeCap());
    paint.setStrokeJoin(this.getStrokeJoin());
    paint.setStrokeMiter(this.getStrokeMiter());
    paint.setStrokeWidth(this.getStrokeWidth());
    paint.setAlphaf(this.getAlpha());
    paint.setStyle(this.getStyle());
    return paint;
  }
  getColor(): Float32Array {
    return this.tgfxPaint.getColor();
  }
  getStrokeCap(): EmbindEnumEntity {
    return this.tgfxPaint.getStrokeCap();
  }
  getStrokeJoin(): EmbindEnumEntity {
    return this.tgfxPaint.getStrokeJoin();
  }
  getStrokeMiter(): number {
    return this.tgfxPaint.getStrokeMiter();
  }
  getStrokeWidth(): number {
    return this.tgfxPaint.getStrokeWidth();
  }
  getAlpha(): number {
    return this.tgfxPaint.getAlpha();
  }
  setAlphaf(alpha: number): void {
    return this.tgfxPaint.setAlphaf(alpha);
  }
  setAntiAlias(aa: boolean): void {
    throw new Error("Method not implemented.");
  }
  setBlendMode(mode: EmbindEnumEntity): void {
    throw new Error("Method not implemented.");
  }
  setBlender(blender: Blender): void {
    throw new Error("Method not implemented.");
  }
  setColor(color: InputColor, colorSpace?: ColorSpace | undefined): void {
    return this.tgfxPaint.setColor(color);
  }
  setColorComponents(
    r: number,
    g: number,
    b: number,
    a: number,
    colorSpace?: ColorSpace | undefined
  ): void {
    return this.setColor(Adapter.CKAdapterModule.Color(r, g, b, a));
  }
  setColorFilter(filter: ColorFilter | null): void {
    throw new Error("Method not implemented.");
  }
  setColorInt(color: number, colorSpace?: ColorSpace | undefined): void {
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;
    const a = (color >> 24) & 0xff;
    return this.setColorComponents(r, g, b, a);
  }
  setDither(shouldDither: boolean): void {
    throw new Error("Method not implemented.");
  }
  setImageFilter(filter: ImageFilter | null): void {
    throw new Error("Method not implemented.");
  }
  setMaskFilter(filter: MaskFilter | null): void {
    throw new Error("Method not implemented.");
  }
  setPathEffect(effect: PathEffect | null): void {
    throw new Error("Method not implemented.");
  }
  setShader(shader: Shader | null): void {
    throw new Error("Method not implemented.");
  }
  setStrokeCap(cap: EmbindEnumEntity): void {
    return this.tgfxPaint.setStrokeCap(cap);
  }
  setStrokeJoin(join: EmbindEnumEntity): void {
    return this.tgfxPaint.setStrokeJoin(join);
  }
  setStrokeMiter(limit: number): void {
    return this.tgfxPaint.setStrokeMiter(limit);
  }
  setStrokeWidth(width: number): void {
    return this.tgfxPaint.setStrokeWidth(width);
  }
  getStyle(): EmbindEnumEntity {
    return this.tgfxPaint.getStyle();
  }
  setStyle(style: EmbindEnumEntity): void {
    return this.tgfxPaint.setStyle(style);
  }
}

class AdapterPath extends AdapterEmbindObject<"Path"> implements Path {
  constructor(readonly tgfxPath: any = new Adapter.CKAdapterModule.Path()) {
    super();
  }
  static CanInterpolate(path1: Path, path2: Path): boolean {
    throw new Error("Method not implemented.");
  }
  static MakeFromCmds(cmds: InputCommands): Path | null {
    throw new Error("Method not implemented.");
  }
  static MakeFromOp(one: Path, two: Path, op: EmbindEnumEntity): Path | null {
    throw new Error("Method not implemented.");
  }
  static MakeFromPathInterpolation(
    start: Path,
    end: Path,
    weight: number
  ): Path | null {
    throw new Error("Method not implemented.");
  }
  static MakeFromSVGString(str: string): Path | null {
    throw new Error("Not support SVG");
  }
  static MakeFromVerbsPointsWeights(
    verbs: VerbList,
    points: InputFlattenedPointArray,
    weights?: WeightList | undefined
  ): Path {
    throw new Error("Method not implemented.");
  }
  addArc(oval: InputRect, startAngle: number, sweepAngle: number): Path {
    return this.tgfxPath.addArc(oval, startAngle, sweepAngle);
  }
  addCircle(
    x: number,
    y: number,
    r: number,
    isCCW?: boolean | undefined
  ): Path {
    this.tgfxPath.addOval(
      Adapter.CKAdapterModule.Rect.MakeXYWH(x - r, y - r, r * 2, r * 2),
      isCCW,
      0
    );
    return this;
  }
  addOval(
    oval: InputRect,
    isCCW?: boolean | undefined,
    startIndex?: number | undefined
  ): Path {
    this.tgfxPath.addOval(oval, isCCW, startIndex);
    return this;
  }
  addPath(...args: any[]): Path | null {
    if (args[0]) {
      const p = args[0];
      const op = args[1] ?? Adapter.CKAdapterModule.PathOp.Append;
      this.tgfxPath.addPath(p instanceof AdapterPath ? p.tgfxPath : p, op);
    }
    return this;
  }
  addPoly(points: InputFlattenedPointArray, close: boolean): Path {
    throw new Error("Method not implemented.");
  }
  addRect(rect: InputRect, isCCW?: boolean | undefined): Path {
    this.tgfxPath.addRect(rect, isCCW, 0);
    return this;
  }
  addRRect(rrect: InputRRect, isCCW?: boolean | undefined): Path {
    const _rrect: AdapterRRect = rrect as any;
    this.tgfxPath.addRoundRect(
      _rrect.rect,
      _rrect.radiusX,
      _rrect.radiusY,
      isCCW ?? false,
      0
    );
    return this;
  }
  addVerbsPointsWeights(
    verbs: VerbList,
    points: InputFlattenedPointArray,
    weights?: WeightList | undefined
  ): Path {
    throw new Error("Method not implemented.");
  }
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    isCCW?: boolean | undefined
  ): Path {
    throw new Error("Method not implemented.");
  }
  arcToOval(
    oval: InputRect,
    startAngle: number,
    endAngle: number,
    forceMoveTo: boolean
  ): Path {
    throw new Error("Method not implemented.");
  }
  arcToRotated(
    rx: number,
    ry: number,
    xAxisRotate: number,
    useSmallArc: boolean,
    isCCW: boolean,
    x: number,
    y: number
  ): Path {
    throw new Error("Method not implemented.");
  }
  arcToTangent(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radius: number
  ): Path {
    throw new Error("Method not implemented.");
  }
  close(): Path {
    this.tgfxPath.close();
    return this;
  }
  computeTightBounds(outputArray?: Float32Array | undefined): Float32Array {
    throw new Error("Method not implemented.");
  }
  conicTo(x1: number, y1: number, x2: number, y2: number, w: number): Path {
    throw new Error("Method not implemented.");
  }
  contains(x: number, y: number): boolean {
    return this.tgfxPath.contains(x, y);
  }
  copy(): Path {
    const newPath = new AdapterPath();
    newPath.addPath(this);
    return newPath;
  }
  countPoints(): number {
    return this.tgfxPath.countPoints();
  }
  cubicTo(
    cpx1: number,
    cpy1: number,
    cpx2: number,
    cpy2: number,
    x: number,
    y: number
  ): Path {
    this.tgfxPath.cubicTo(cpx1, cpy1, cpx2, cpy2, x, y);
    return this;
  }
  dash(on: number, off: number, phase: number): boolean {
    throw new Error("Method not implemented.");
  }
  equals(other: Path): boolean {
    return this.tgfxPath.equals(
      this.tgfxPath,
      other instanceof AdapterPath ? other.tgfxPath : other
    );
  }
  getBounds(outputArray?: Float32Array | undefined): Float32Array {
    return this.tgfxPath.getBounds();
  }
  getFillType(): EmbindEnumEntity {
    return this.getFillType();
  }
  getPoint(
    index: number,
    outputArray?: Float32Array | undefined
  ): Float32Array {
    throw new Error("Method not implemented.");
  }
  isEmpty(): boolean {
    return this.tgfxPath.isEmpty();
  }
  isVolatile(): boolean {
    throw new Error("Method not implemented.");
  }
  lineTo(x: number, y: number): Path {
    this.tgfxPath.lineTo(x, y);
    return this;
  }
  makeAsWinding(): Path | null {
    throw new Error("Method not implemented.");
  }
  moveTo(x: number, y: number): Path {
    this.tgfxPath.moveTo(x, y);
    return this;
  }
  offset(dx: number, dy: number): Path {
    throw new Error("Method not implemented.");
  }
  op(other: Path, op: EmbindEnumEntity): boolean {
    throw new Error("Method not implemented.");
  }
  quadTo(x1: number, y1: number, x2: number, y2: number): Path {
    this.tgfxPath.quadTo(x1, y1, x2, y2);
    return this;
  }
  rArcTo(
    rx: number,
    ry: number,
    xAxisRotate: number,
    useSmallArc: boolean,
    isCCW: boolean,
    dx: number,
    dy: number
  ): Path {
    throw new Error("Method not implemented.");
  }
  rConicTo(
    dx1: number,
    dy1: number,
    dx2: number,
    dy2: number,
    w: number
  ): Path {
    throw new Error("Method not implemented.");
  }
  rCubicTo(
    cpx1: number,
    cpy1: number,
    cpx2: number,
    cpy2: number,
    x: number,
    y: number
  ): Path {
    throw new Error("Method not implemented.");
  }
  reset(): void {
    this.tgfxPath.reset();
  }
  rewind(): void {
    throw new Error("Method not implemented.");
  }
  rLineTo(x: number, y: number): Path {
    throw new Error("Method not implemented.");
  }
  rMoveTo(x: number, y: number): Path {
    throw new Error("Method not implemented.");
  }
  rQuadTo(x1: number, y1: number, x2: number, y2: number): Path {
    throw new Error("Method not implemented.");
  }
  setFillType(fill: EmbindEnumEntity): void {
    this.tgfxPath.setFillType(fill);
  }
  setIsVolatile(volatile: boolean): void {
    throw new Error("Method not implemented.");
  }
  simplify(): boolean {
    throw new Error("Method not implemented.");
  }
  stroke(opts?: StrokeOpts | undefined): Path | null {
    throw new Error("Method not implemented.");
  }
  toCmds(): Float32Array {
    throw new Error("Method not implemented.");
  }
  toSVGString(): string {
    throw new Error("Not support SVG");
  }
  transform(...args: any[]): Path {
    throw new Error("Method not implemented.");
  }
  trim(startT: number, stopT: number, isComplement: boolean): Path | null {
    throw new Error("Method not implemented.");
  }
}

interface AdapterRRect {
  rect: InputRect;
  radiusX: number;
  radiusY: number;
}
