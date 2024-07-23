import {
  __export
} from "./chunk-B2KS57BG.js";

// node_modules/@cloudinary/url-gen/config/BaseConfig.js
function isObject(a) {
  if (typeof a !== "object" || a instanceof Array) {
    return false;
  } else {
    return true;
  }
}
var Config = class {
  filterOutNonSupportedKeys(userProvidedConfig, validKeys) {
    const obj = /* @__PURE__ */ Object.create({});
    if (isObject(userProvidedConfig)) {
      Object.keys(userProvidedConfig).forEach((key) => {
        if (validKeys.indexOf(key) >= 0) {
          obj[key] = userProvidedConfig[key];
        } else {
          console.warn("Warning - unsupported key provided to configuration: ", key);
        }
      });
      return obj;
    } else {
      return /* @__PURE__ */ Object.create({});
    }
  }
};
var BaseConfig_default = Config;

// node_modules/@cloudinary/url-gen/internal/internalConstants.js
var ALLOWED_URL_CONFIG = [
  "cname",
  "secureDistribution",
  "privateCdn",
  "signUrl",
  "longUrlSignature",
  "shorten",
  "useRootPath",
  "secure",
  "forceVersion",
  "analytics",
  "queryParams"
];
var ALLOWED_CLOUD_CONFIG = [
  "cloudName",
  "apiKey",
  "apiSecret",
  "authToken"
];

// node_modules/@cloudinary/url-gen/config/URLConfig.js
var URLConfig = class _URLConfig extends BaseConfig_default {
  /**
   * @param {IURLConfig} userURLConfig
   */
  constructor(userURLConfig) {
    super();
    const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
    Object.assign(this, {
      secure: true
    }, urlConfig);
  }
  extend(userURLConfig) {
    const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
    return new _URLConfig(Object.assign({}, this, urlConfig));
  }
  /**
   * @param {string} value Sets the cname
   */
  setCname(value) {
    this.cname = value;
    return this;
  }
  /**
   * @param {string} value Sets the secureDistribution
   */
  setSecureDistribution(value) {
    this.secureDistribution = value;
    return this;
  }
  /**
   * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
   */
  setPrivateCdn(value) {
    this.privateCdn = value;
    return this;
  }
  /**
   * @param value Sets whether or not to sign the URL
   */
  setSignUrl(value) {
    this.signUrl = value;
    return this;
  }
  /**
   * @param value Sets whether or not to use a long signature
   */
  setLongUrlSignature(value) {
    this.longUrlSignature = value;
    return this;
  }
  /**
   * @param value Sets whether or not to shorten the URL
   */
  setShorten(value) {
    this.shorten = value;
    return this;
  }
  /**
   * @param value Sets whether or not to use a root path
   */
  setUseRootPath(value) {
    this.useRootPath = value;
    return this;
  }
  /**
   * @param value Sets whether or not to deliver the asset through https
   */
  setSecure(value) {
    this.secure = value;
    return this;
  }
  /**
   * @param value Sets whether to force a version in the URL
   */
  setForceVersion(value) {
    this.forceVersion = value;
    return this;
  }
  /**
   * @param params Sets additional params
   */
  setQueryParams(params) {
    this.queryParams = params;
    return this;
  }
};
var URLConfig_default = URLConfig;

// node_modules/@cloudinary/url-gen/config/CloudConfig.js
var CloudConfig = class _CloudConfig extends BaseConfig_default {
  /**
   * @param {ICloudConfig} userCloudConfig {@link ICloudConfig}
   *
   */
  constructor(userCloudConfig) {
    super();
    const cloudConfig = this.filterOutNonSupportedKeys(userCloudConfig, ALLOWED_CLOUD_CONFIG);
    Object.assign(this, cloudConfig);
    if (!this.cloudName) {
      throw "Missing mandatory field cloudName";
    }
  }
  extend(userCloudConfig) {
    const cloudConfig = this.filterOutNonSupportedKeys(userCloudConfig, ALLOWED_CLOUD_CONFIG);
    return new _CloudConfig(Object.assign({}, this, cloudConfig));
  }
  /**
   * @param {string} value Sets the CloudName
   */
  setCloudName(value) {
    this.cloudName = value;
    return this;
  }
  /**
   * @param {string} value Sets the API Key
   */
  setApiKey(value) {
    this.apiKey = value;
    return this;
  }
  /**
   * @param {string} value Sets the API Secret
   */
  setApiSecret(value) {
    this.apiSecret = value;
    return this;
  }
};
var CloudConfig_default = CloudConfig;

// node_modules/@cloudinary/url-gen/config/CloudinaryConfig.js
var CloudinaryConfig = class {
  constructor(configurations = {}) {
    this.cloud = new CloudConfig_default(configurations.cloud);
    this.url = new URLConfig_default(configurations.url || {});
  }
  /**
   * @description Setter for the cloudConfig
   * @param {ICloudConfig} cld
   */
  setCloudConfig(cld) {
    this.cloud = new CloudConfig_default(cld);
    return this;
  }
  /**
   * @description Setter for the urlConfig
   * @param {IURLConfig} url
   */
  setURLConfig(url) {
    this.url = new URLConfig_default(url);
    return this;
  }
  extend(configurations) {
    this.cloud = this.cloud.extend(configurations.cloud || {});
    this.url = this.url.extend(configurations.url || {});
    return this;
  }
};
var CloudinaryConfig_default = CloudinaryConfig;

// node_modules/@cloudinary/transformation-builder-sdk/internal/qualifier/QualifierValue.js
var QualifierValue = class {
  /**
   *
   * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
   */
  constructor(qualifierValue) {
    this.values = [];
    this.delimiter = ":";
    if (this.hasValue(qualifierValue)) {
      this.addValue(qualifierValue);
    }
  }
  /**
   * @description Joins the provided values with the provided delimiter
   */
  toString() {
    return this.values.join(this.delimiter);
  }
  /**
   * @description Checks if the provided argument has a value
   * @param {any} v
   * @private
   * @return {boolean}
   */
  hasValue(v) {
    return typeof v !== "undefined" && v !== null && v !== "";
  }
  /**
   * @desc Adds a value for the this qualifier instance
   * @param {any} value
   * @return {this}
   */
  addValue(value) {
    if (Array.isArray(value)) {
      this.values = this.values.concat(value);
    } else {
      this.values.push(value);
    }
    this.values = this.values.filter((v) => this.hasValue(v));
    return this;
  }
  /**
   * @description Sets the delimiter for this instance
   * @param delimiter
   */
  setDelimiter(delimiter) {
    this.delimiter = delimiter;
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/unsupportedError.js
var UnsupportedError = class extends Error {
  constructor(message = "Unsupported") {
    super(message);
  }
};
function createUnsupportedError(message) {
  return new UnsupportedError(message);
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/qualifierToJson.js
function qualifierToJson() {
  return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/QualifierModel.js
var QualifierModel = class {
  constructor() {
    this._qualifierModel = {};
  }
  toJson() {
    return qualifierToJson.apply(this);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/qualifier/Qualifier.js
var Qualifier = class extends QualifierModel {
  constructor(key, qualifierValue) {
    super();
    this.delimiter = "_";
    this.key = key;
    if (qualifierValue instanceof QualifierValue) {
      this.qualifierValue = qualifierValue;
    } else {
      this.qualifierValue = new QualifierValue();
      this.qualifierValue.addValue(qualifierValue);
    }
  }
  toString() {
    const { key, delimiter, qualifierValue } = this;
    return `${key}${delimiter}${qualifierValue.toString()}`;
  }
  addValue(value) {
    this.qualifierValue.addValue(value);
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/flag/FlagQualifier.js
var FlagQualifier = class extends Qualifier {
  constructor(flagType, flagValue) {
    let qualifierValue;
    if (flagValue) {
      qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(":");
    } else {
      qualifierValue = flagType;
    }
    super("fl", qualifierValue);
    this.flagValue = flagValue;
  }
  toString() {
    return super.toString().replace(/\./g, "%2E");
  }
  getFlagValue() {
    return this.flagValue;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/dataStructureUtils.js
function mapToSortedArray(map, flags) {
  const array = Array.from(map.entries());
  flags.forEach((flag) => {
    array.push(["fl", flag]);
  });
  return array.sort().map((v) => v[1]);
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/actionToJson.js
function actionToJson() {
  var _a, _b, _c;
  const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
  const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
  if (sourceTransformationError && sourceTransformationError instanceof Error) {
    return { error: sourceTransformationError };
  }
  if (actionModelIsNotEmpty) {
    return this._actionModel;
  }
  return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/ActionModel.js
var ActionModel = class {
  constructor() {
    this._actionModel = {};
  }
  toJson() {
    return actionToJson.apply(this);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/Action.js
var Action = class extends ActionModel {
  constructor() {
    super(...arguments);
    this.qualifiers = /* @__PURE__ */ new Map();
    this.flags = [];
    this.delimiter = ",";
    this.actionTag = "";
  }
  prepareQualifiers() {
  }
  /**
   * @description Returns the custom name tag that was given to this action
   * @return {string}
   */
  getActionTag() {
    return this.actionTag;
  }
  /**
   * @description Sets the custom name tag for this action
   * @return {this}
   */
  setActionTag(tag) {
    this.actionTag = tag;
    return this;
  }
  /**
   * @description Calls toString() on all child qualifiers (implicitly by using .join()).
   * @return {string}
   */
  toString() {
    this.prepareQualifiers();
    return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
  }
  /**
   * @description Adds the parameter to the action.
   * @param {SDK.Qualifier} qualifier
   * @return {this}
   */
  addQualifier(qualifier) {
    if (typeof qualifier === "string") {
      const [key, value] = qualifier.toLowerCase().split("_");
      if (key === "fl") {
        this.flags.push(new FlagQualifier(value));
      } else {
        this.qualifiers.set(key, new Qualifier(key, value));
      }
    } else {
      this.qualifiers.set(qualifier.key, qualifier);
    }
    return this;
  }
  /**
   * @description Adds a flag to the current action.
   * @param {Qualifiers.Flag} flag
   * @return {this}
   */
  addFlag(flag) {
    if (typeof flag === "string") {
      this.flags.push(new FlagQualifier(flag));
    } else {
      if (flag instanceof FlagQualifier) {
        this.flags.push(flag);
      }
    }
    return this;
  }
  addValueToQualifier(qualifierKey, qualifierValue) {
    this.qualifiers.get(qualifierKey).addValue(qualifierValue);
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/prepareColor.js
function prepareColor(color2) {
  if (color2) {
    return color2.match(/^#/) ? `rgb:${color2.substr(1)}` : color2;
  } else {
    return color2;
  }
}

// node_modules/@cloudinary/transformation-builder-sdk/actions/background/actions/BackgroundColor.js
var BackgroundColor = class extends Action {
  constructor(color2) {
    super();
    this._actionModel = {};
    this.addQualifier(new Qualifier("b", new QualifierValue(prepareColor(color2)).setDelimiter("_")));
    this._actionModel.color = color2;
    this._actionModel.actionType = "backgroundColor";
  }
  static fromJson(actionModel) {
    const { color: color2 } = actionModel;
    const result = new this(color2);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/RawAction.js
var RawAction = class {
  constructor(raw) {
    this.raw = raw;
  }
  toString() {
    return this.raw;
  }
  toJson() {
    return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/IErrorObject.js
function isErrorObject(obj) {
  const errorObj = obj;
  return "error" in errorObj && !!errorObj.error;
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/flag.js
function animated() {
  return new FlagQualifier("animated");
}
function animatedWebP() {
  return new FlagQualifier("awebp");
}
function clip() {
  return new FlagQualifier("clip");
}
function clipEvenOdd() {
  return new FlagQualifier("clip_evenodd");
}
function ignoreInitialAspectRatio() {
  return new FlagQualifier("ignore_aspect_ratio");
}
function lossy() {
  return new FlagQualifier("lossy");
}
function noOverflow() {
  return new FlagQualifier("no_overflow");
}
function preserveTransparency() {
  return new FlagQualifier("preserve_transparency");
}
function progressive(mode2) {
  return new FlagQualifier("progressive", mode2);
}
function regionRelative() {
  return new FlagQualifier("region_relative");
}
function relative() {
  return new FlagQualifier("relative");
}
function tiled() {
  return new FlagQualifier("tiled");
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/format/FormatQualifier.js
var FormatQualifier = class extends QualifierValue {
  constructor(val) {
    super(val);
    this.val = val;
  }
  getValue() {
    return this.val;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/objectFlip.js
function objectFlip(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[obj[key]] = key;
  });
  return result;
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/internalConstants.js
var CONDITIONAL_OPERATORS = {
  "=": "eq",
  "!=": "ne",
  "<": "lt",
  ">": "gt",
  "<=": "lte",
  ">=": "gte",
  "&&": "and",
  "||": "or",
  "*": "mul",
  "/": "div",
  "+": "add",
  "-": "sub",
  "^": "pow"
};
var RESERVED_NAMES = {
  "aspect_ratio": "ar",
  "aspectRatio": "ar",
  "current_page": "cp",
  "currentPage": "cp",
  "duration": "du",
  "face_count": "fc",
  "faceCount": "fc",
  "height": "h",
  "initial_aspect_ratio": "iar",
  "initial_height": "ih",
  "initial_width": "iw",
  "initialAspectRatio": "iar",
  "initialHeight": "ih",
  "initialWidth": "iw",
  "initial_duration": "idu",
  "initialDuration": "idu",
  "page_count": "pc",
  "page_x": "px",
  "page_y": "py",
  "pageCount": "pc",
  "pageX": "px",
  "pageY": "py",
  "tags": "tags",
  "width": "w",
  "trimmed_aspect_ratio": "tar",
  "current_public_id": "cpi",
  "initial_density": "idn",
  "page_names": "pgnames"
};
var ACTION_TYPE_TO_CROP_MODE_MAP = {
  limitFit: "limit",
  limitFill: "lfill",
  minimumFit: "mfit",
  thumbnail: "thumb",
  limitPad: "lpad",
  minimumPad: "mpad",
  autoPad: "auto_pad"
};
var ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
  colorSpace: "cs",
  dpr: "dpr",
  density: "dn",
  defaultImage: "d",
  format: "f",
  quality: "q"
};
var ACTION_TYPE_TO_EFFECT_MODE_MAP = {
  redEye: "redeye",
  advancedRedEye: "adv_redeye",
  oilPaint: "oil_paint",
  unsharpMask: "unsharp_mask",
  makeTransparent: "make_transparent",
  generativeRestore: "gen_restore",
  upscale: "upscale"
};
var ACTION_TYPE_TO_QUALITY_MODE_MAP = {
  autoBest: "auto:best",
  autoEco: "auto:eco",
  autoGood: "auto:good",
  autoLow: "auto:low",
  jpegminiHigh: "jpegmini:1",
  jpegminiMedium: "jpegmini:2",
  jpegminiBest: "jpegmini:0"
};
var ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
  fullHd: "full_hd",
  fullHdWifi: "full_hd_wifi",
  fullHdLean: "full_hd_lean",
  hdLean: "hd_lean"
};
var CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
  444: "CHROMA_444",
  420: "CHROMA_420"
};
var COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
  "noCmyk": "no_cmyk",
  "keepCmyk": "keep_cmyk",
  "tinySrgb": "tinysrgb",
  "srgbTrueColor": "srgb:truecolor"
};
var ACTION_TYPE_TO_BLEND_MODE_MAP = {
  "antiRemoval": "anti_removal"
};
var CHROMA_MODEL_ENUM_TO_CHROMA_VALUE = objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
var COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP = objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
var CROP_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
var DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
var EFFECT_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
var QUALITY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
var STREAMING_PROFILE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery/DeliveryAction.js
var DeliveryAction = class extends Action {
  /**
   * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
   * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
   * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
   * @see Visit {@link Actions.Delivery|Delivery} for an example
   */
  constructor(deliveryKey, deliveryType, modelProperty) {
    super();
    this._actionModel = {};
    let deliveryTypeValue;
    if (deliveryType instanceof FormatQualifier) {
      deliveryTypeValue = deliveryType.getValue();
    } else {
      deliveryTypeValue = deliveryType;
    }
    this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
    this._actionModel[modelProperty] = deliveryTypeValue;
    this.addQualifier(new Qualifier(deliveryKey, deliveryType));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/progressive.js
var ProgressiveQualifier = class extends FlagQualifier {
  constructor(mode2) {
    super("progressive", mode2);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery/DeliveryFormatAction.js
var DeliveryFormatAction = class extends DeliveryAction {
  constructor(deliveryKey, deliveryType) {
    super(deliveryKey, deliveryType, "formatType");
  }
  /**
   * @description Uses lossy compression when delivering animated GIF files.
   * @return {this}
   */
  lossy() {
    this._actionModel.lossy = true;
    this.addFlag(lossy());
    return this;
  }
  /**
   * @description Uses progressive compression when delivering JPG file format.
   * @return {this}
   */
  progressive(mode2) {
    if (mode2 instanceof ProgressiveQualifier) {
      this._actionModel.progressive = { mode: mode2.getFlagValue() };
      this.addFlag(mode2);
    } else {
      this._actionModel.progressive = { mode: mode2 };
      this.addFlag(progressive(mode2));
    }
    return this;
  }
  /**
   * @description Ensures that images with a transparency channel are delivered in PNG format.
   */
  preserveTransparency() {
    this._actionModel.preserveTransparency = true;
    this.addFlag(preserveTransparency());
    return this;
  }
  static fromJson(actionModel) {
    const { formatType, lossy: lossy2, progressive: progressive2, preserveTransparency: preserveTransparency2 } = actionModel;
    let result;
    if (formatType) {
      result = new this("f", formatType);
    } else {
      result = new this("f");
    }
    if (progressive2) {
      if (progressive2.mode) {
        result.progressive(progressive2.mode);
      } else {
        result.progressive();
      }
    }
    lossy2 && result.lossy();
    preserveTransparency2 && result.preserveTransparency();
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/transformation/Transformation.js
var Transformation = class _Transformation {
  constructor() {
    this.actions = [];
  }
  /**
   * @param {SDK.Action | string} action
   * @return {this}
   */
  addAction(action) {
    let actionToAdd;
    if (typeof action === "string") {
      if (action.indexOf("/") >= 0) {
        throw "addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead";
      } else {
        actionToAdd = new RawAction(action);
      }
    } else {
      actionToAdd = action;
    }
    this.actions.push(actionToAdd);
    return this;
  }
  /**
   * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
   * @param {string | SDK.Transformation} tx
   * @example
   * import {Transformation} from "@cloudinary/url-gen";
   *
   * const transformation = new Transformation();
   * transformation.addTransformation('w_100/w_200/w_300');
   * @return {this}
   */
  addTransformation(tx) {
    if (tx instanceof _Transformation) {
      this.actions = this.actions.concat(tx.actions);
    } else {
      this.actions.push(new RawAction(tx));
    }
    return this;
  }
  /**
   * @return {string}
   */
  toString() {
    return this.actions.map((action) => {
      return action.toString();
    }).filter((a) => a).join("/");
  }
  /**
   * @description Delivers an animated GIF.
   * @param {AnimatedAction} animatedAction
   * @return {this}
   */
  animated(animatedAction) {
    return this.addAction(animatedAction);
  }
  /**
   * @description Adds a border around the image.
   * @param {Border} borderAction
   * @return {this}
   */
  border(borderAction) {
    return this.addAction(borderAction);
  }
  /**
   * @description Adjusts the shape of the delivered image. </br>
   * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
   * @param {IReshape} reshapeAction
   * @return {this}
   */
  reshape(reshapeAction) {
    return this.addAction(reshapeAction);
  }
  /**
   * @description Resize the asset using provided resize action
   * @param {ResizeSimpleAction} resizeAction
   * @return {this}
   */
  resize(resizeAction) {
    return this.addAction(resizeAction);
  }
  /**
   * @desc An alias to Action Delivery.quality
   * @param {string|number} quality
   * @return {this}
   */
  quality(quality2) {
    this.addAction(new DeliveryFormatAction("q", quality2));
    return this;
  }
  /**
   * @desc An alias to Action Delivery.format
   * @param {string} format
   * @return {this}
   */
  format(format2) {
    this.addAction(new DeliveryFormatAction("f", format2));
    return this;
  }
  /**
   * @description Rounds the specified corners of an image.
   * @param roundCornersAction
   * @return {this}
   */
  roundCorners(roundCornersAction) {
    return this.addAction(roundCornersAction);
  }
  /**
   * @description Adds an overlay over the base image.
   * @param {LayerAction} overlayAction
   * @return {this}
   */
  overlay(overlayAction) {
    return this.addAction(overlayAction);
  }
  /**
   * @description Adds an underlay under the base image.
   * @param {LayerAction} underlayAction
   * @return {this}
   */
  underlay(underlayAction) {
    underlayAction.setLayerType("u");
    return this.addAction(underlayAction);
  }
  /**
   * @description Defines an new user variable.
   * @param {VariableAction} variableAction
   * @return {this}
   */
  addVariable(variableAction) {
    return this.addAction(variableAction);
  }
  /**
   * @description Specifies a condition to be met before applying a transformation.
   * @param {ConditionalAction} conditionAction
   * @return {this}
   */
  conditional(conditionAction) {
    return this.addAction(conditionAction);
  }
  /**
   * @description Applies a filter or an effect on an asset.
   * @param {SimpleEffectAction} effectAction
   * @return {this}
   */
  effect(effectAction) {
    return this.addAction(effectAction);
  }
  /**
   * @description Applies adjustment effect on an asset.
   * @param action
   * @return {this}
   */
  adjust(action) {
    return this.addAction(action);
  }
  /**
   * @description Rotates the asset by the given angle.
   * @param {RotateAction} rotateAction
   * @return {this}
   */
  rotate(rotateAction) {
    return this.addAction(rotateAction);
  }
  /**
   * @description Applies a pre-defined named transformation of the given name.
   * @param {NamedTransformation} namedTransformation
   * @return {this}
   */
  namedTransformation(namedTransformation) {
    return this.addAction(namedTransformation);
  }
  /**
   * @description Applies delivery action.
   * @param deliveryAction
   * @return {this}
   */
  delivery(deliveryAction) {
    return this.addAction(deliveryAction);
  }
  /**
   * @description Sets the color of the background.
   * @param {Qualifiers.Color} color
   * @return {this}
   */
  backgroundColor(color2) {
    return this.addAction(new BackgroundColor(color2));
  }
  /**
   * @description Adds a layer in a Photoshop document.
   * @param action
   * @return {this}
   */
  psdTools(action) {
    return this.addAction(action);
  }
  /**
   * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
   * @param action
   * @return {this}
   */
  extract(action) {
    return this.addAction(action);
  }
  /**
   * @description Adds a flag as a separate action.
   * @param {Qualifiers.Flag | string} flagQualifier
   * @return {this}
   */
  addFlag(flagQualifier) {
    const action = new Action();
    let flagToAdd = flagQualifier;
    if (typeof flagQualifier === "string") {
      flagToAdd = new FlagQualifier(flagQualifier);
    }
    action.addQualifier(flagToAdd);
    return this.addAction(action);
  }
  /**
   * @description Inject a custom function into the image transformation pipeline.
   * @return {this}
   */
  customFunction(customFunction) {
    return this.addAction(customFunction);
  }
  /**
   * Transcodes the video (or audio) to another format.
   * @param {Action} action
   * @return {this}
   */
  transcode(action) {
    return this.addAction(action);
  }
  /**
   * Applies the specified video edit action.
   *
   * @param {videoEditType} action
   * @return {this}
   */
  videoEdit(action) {
    return this.addAction(action);
  }
  toJson() {
    const actions = [];
    for (const action of this.actions) {
      const json = action.toJson();
      if (isErrorObject(json)) {
        return json;
      }
      actions.push(json);
    }
    return { actions };
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/transformation/ImageTransformation.js
var ImageTransformation = class extends Transformation {
};

// node_modules/@cloudinary/transformation-builder-sdk/transformation/VideoTransformation.js
var VideoTransformation = class extends Transformation {
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/base64Encode.js
function base64Encode(input) {
  let encodedResult = "";
  if (typeof window !== "undefined") {
    encodedResult = btoa(encodeURI(decodeURI(input)));
  } else {
    encodedResult = global.Buffer.from(input).toString("base64");
  }
  return encodedResult.replace(/\+/g, "-").replace(/\//g, "_");
}

// node_modules/@cloudinary/transformation-builder-sdk/backwards/consts.js
var NUMBER_PATTERN = "([0-9]*)\\.([0-9]+)|([0-9]+)";
var OFFSET_ANY_PATTERN = `(${NUMBER_PATTERN})([%pP])?`;
var RANGE_VALUE_RE = RegExp(`^${OFFSET_ANY_PATTERN}$`);
var OFFSET_ANY_PATTERN_RE = RegExp(`(${OFFSET_ANY_PATTERN})\\.\\.(${OFFSET_ANY_PATTERN})`);

// node_modules/@cloudinary/transformation-builder-sdk/backwards/utils/snakeCase.js
var snakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/cloneDeep.js
var LARGE_ARRAY_SIZE = 200;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var argsTag = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var promiseTag = "[object Promise]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var symbolTag = "[object Symbol]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function isHostObject(value) {
  var result = false;
  if (value != null && typeof value.toString != "function") {
    try {
      result = !!`${value}`;
    } catch (e) {
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var arrayProto = Array.prototype;
var funcProto = Function.prototype;
var objectProto = Object.prototype;
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? `Symbol(src)_1.${uid}` : "";
}();
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectToString = objectProto.toString;
var reIsNative = RegExp(`^${funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?")}$`);
var Buffer = moduleExports ? root.Buffer : void 0;
var Symbol = root.Symbol;
var Uint8Array = root.Uint8Array;
var getPrototype = overArg(Object.getPrototypeOf, Object);
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var splice = arrayProto.splice;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var nativeKeys = overArg(Object.keys, Object);
var DataView = getNative(root, "DataView");
var Map2 = getNative(root, "Map");
var Promise2 = getNative(root, "Promise");
var Set = getNative(root, "Set");
var WeakMap = getNative(root, "WeakMap");
var nativeCreate = getNative(Object, "create");
var dataViewCtorString = toSource(DataView);
var mapCtorString = toSource(Map2);
var promiseCtorString = toSource(Promise2);
var setCtorString = toSource(Set);
var weakMapCtorString = toSource(WeakMap);
var symbolProto = Symbol ? Symbol.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function Hash(entries) {
  var index = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : void 0;
}
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
}
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function ListCache(entries) {
  var index = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
function listCacheClear() {
  this.__data__ = [];
}
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function MapCache(entries) {
  var index = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
function mapCacheClear() {
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map2 || ListCache)(),
    "string": new Hash()
  };
}
function mapCacheDelete(key) {
  return getMapData(this, key).delete(key);
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}
function stackClear() {
  this.__data__ = new ListCache();
}
function stackDelete(key) {
  return this.__data__.delete(key);
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}
Stack.prototype.clear = stackClear;
Stack.prototype.delete = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
function baseGetTag(value) {
  return objectToString.call(value);
}
function baseIsNative(value) {
  if (!isObject3(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
var getTag = baseGetTag;
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function(value) {
    var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return `${func}`;
    } catch (e) {
    }
  }
  return "";
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var isArray = Array.isArray;
function isFunction(value) {
  var tag = isObject3(value) ? objectToString.call(value) : "";
  return tag == funcTag || tag == genTag;
}
function isObject3(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function stubArray() {
  return [];
}

// node_modules/@cloudinary/transformation-builder-sdk/backwards/configuration.js
var DEFAULT_CONFIGURATION_PARAMS = {
  responsive_class: "cld-responsive",
  responsive_use_breakpoints: true,
  round_dpr: true,
  secure: (typeof window !== "undefined" && window !== null ? window.location ? window.location.protocol : void 0 : void 0) === "https:"
};
var CONFIG_PARAMS = [
  "api_key",
  "api_secret",
  "callback",
  "cdn_subdomain",
  "cloud_name",
  "cname",
  "private_cdn",
  "protocol",
  "resource_type",
  "responsive",
  "responsive_class",
  "responsive_use_breakpoints",
  "responsive_width",
  "round_dpr",
  "secure",
  "secure_cdn_subdomain",
  "secure_distribution",
  "shorten",
  "type",
  "upload_preset",
  "url_suffix",
  "use_root_path",
  "version",
  "externalLibraries",
  "max_timeout_ms"
];

// node_modules/@cloudinary/transformation-builder-sdk/backwards/utils/legacyBaseUtil.js
var reWords = function() {
  var lower, upper;
  upper = "[A-Z]";
  lower = "[a-z]+";
  return RegExp(upper + "+(?=" + upper + lower + ")|" + upper + "?" + lower + "|" + upper + "+|[0-9]+", "g");
}();

// node_modules/@cloudinary/transformation-builder-sdk/backwards/transformation.js
var number_pattern = "([0-9]*)\\.([0-9]+)|([0-9]+)";
var offset_any_pattern = "(" + number_pattern + ")([%pP])?";
var methods = [
  "angle",
  "audioCodec",
  "audioFrequency",
  "aspectRatio",
  "background",
  "bitRate",
  "border",
  "color",
  "colorSpace",
  "crop",
  "customFunction",
  "customPreFunction",
  "defaultImage",
  "delay",
  "density",
  "duration",
  "dpr",
  "effect",
  "else",
  "endIf",
  "endOffset",
  "fallbackContent",
  "fetchFormat",
  "format",
  "flags",
  "gravity",
  "fps",
  "height",
  "htmlHeight",
  "htmlWidth",
  "if",
  "keyframeInterval",
  "ocr",
  "offset",
  "opacity",
  "overlay",
  "page",
  "poster",
  "prefix",
  "quality",
  "radius",
  "rawTransformation",
  "size",
  "sourceTypes",
  "sourceTransformation",
  "startOffset",
  "streamingProfile",
  "transformation",
  "underlay",
  "variable",
  "variables",
  "videoCodec",
  "videoSampling",
  "width",
  "x",
  "y",
  "zoom"
];
var PARAM_NAMES = methods.map(snakeCase).concat(CONFIG_PARAMS);

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/toFloatAsString.js
function toFloatAsString(value) {
  const returnValue = value.toString();
  if (returnValue.match(/[A-Z]/gi)) {
    return returnValue;
  }
  if (returnValue.length > 1 && returnValue[0] === "0") {
    return returnValue;
  }
  const isNumberLike3 = !isNaN(parseFloat(returnValue)) && returnValue.indexOf(":") === -1;
  if (isNumberLike3 && returnValue.indexOf(".") === -1) {
    return `${returnValue}.0`;
  } else {
    return returnValue;
  }
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/aspectRatio/AspectRatioQualifierValue.js
var AspectRatioQualifierValue = class extends QualifierValue {
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeSimpleAction.js
var ResizeSimpleAction = class extends Action {
  /**
   * @param {string} cropType
   * @param {number | string} cropWidth The required width of a transformed asset.
   * @param {number | string} cropHeight The required height of a transformed asset.
   */
  constructor(cropType, cropWidth, cropHeight) {
    super();
    this._actionModel = { dimensions: {} };
    this._actionModel.actionType = CROP_MODE_TO_ACTION_TYPE_MAP[cropType] || cropType;
    this.addQualifier(new Qualifier("c", cropType));
    cropWidth && this.width(cropWidth);
    cropHeight && this.height(cropHeight);
  }
  /**
   * @description Sets the height of the resize
   * @param {string | number} x The height in pixels (if an integer is specified) or as a percentage (if a float is specified).
   */
  height(x) {
    this._actionModel.dimensions.height = x;
    return this.addQualifier(new Qualifier("h", x));
  }
  /**
   * @description Sets the width of the resize
   * @param {string | number} x The width in pixels (if an integer is specified) or as a percentage (if a float is specified).
   */
  width(x) {
    this._actionModel.dimensions.width = x;
    return this.addQualifier(new Qualifier("w", x));
  }
  /**
   * @description Sets the aspect ratio of the asset.
   * For a list of supported types see {@link Qualifiers.AspectRatio|
    * AspectRatio values}
   * @param {AspectRatioType|number|string} ratio The new aspect ratio, specified as a percentage or ratio.
   * @return {this}
   */
  aspectRatio(ratio) {
    if (ratio instanceof AspectRatioQualifierValue) {
      this._actionModel.dimensions.aspectRatio = `${ratio}`;
      return this.addQualifier(new Qualifier("ar", ratio));
    }
    if (typeof ratio === "number" || typeof ratio === "string") {
      this._actionModel.dimensions.aspectRatio = toFloatAsString(ratio);
      return this.addQualifier(new Qualifier("ar", toFloatAsString(ratio)));
    }
    if (ratio instanceof FlagQualifier) {
      this._actionModel.dimensions.aspectRatio = `${ratio.qualifierValue}`;
      return this.addFlag(ratio);
    }
  }
  /**
   * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the containing image instead of the added layer.
   * @return {this}
   */
  relative() {
    this._actionModel.relative = true;
    return this.addFlag(relative());
  }
  /**
   * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the overlaid region
   * @return {this}
   */
  regionRelative() {
    this._actionModel.regionRelative = true;
    return this.addFlag(regionRelative());
  }
  static fromJson(actionModel) {
    const { actionType, dimensions, relative: relative2, regionRelative: regionRelative2 } = actionModel;
    const { aspectRatio, width, height } = dimensions;
    const cropMode = ACTION_TYPE_TO_CROP_MODE_MAP[actionType] || actionType;
    const result = new this(cropMode, width, height);
    aspectRatio && result.aspectRatio(aspectRatio === "ignore_aspect_ratio" ? ignoreInitialAspectRatio() : aspectRatio);
    relative2 && result.relative();
    regionRelative2 && result.regionRelative();
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/GravityQualifier.js
var GravityQualifier = class extends Qualifier {
  /**
   * @param value, an array containing (GravityObject | AutoGravity | string) or a string;
   */
  constructor(value) {
    super("g", new QualifierValue(value));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/autoGravity/AutoGravity.js
var AutoGravity = class extends GravityQualifier {
  constructor() {
    super("auto");
  }
  /**
   * @description Autofocuses on objects, allowing their priority within the algorithm to be configured.
   * @param {AutoFocus} AutoFocusObjects
   */
  autoFocus(...AutoFocusObjects) {
    this.addValue(AutoFocusObjects);
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/focusOnGravity/FocusOnGravity.js
var FocusOnGravity = class extends GravityQualifier {
  constructor(FocusOnObjects) {
    super(FocusOnObjects);
  }
  /**
   * @description Specifies the gravity to use if none of the other gravity objects are found.
   * @param {Qualifiers.Gravity.AutoGravity} val
   */
  fallbackGravity(val) {
    this.addValue(val.qualifierValue);
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/compassGravity/CompassGravity.js
var CompassGravity = class extends GravityQualifier {
  constructor(dir) {
    super(dir);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/xyCenterGravity/XYCenterGravity.js
var XYCenterGravity = class extends GravityQualifier {
  constructor() {
    super("xy_center");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity.js
function compass(direction) {
  return new CompassGravity(direction);
}
function focusOn(...args) {
  const res = [...args];
  return new FocusOnGravity(res);
}
function autoGravity() {
  return new AutoGravity();
}
function xyCenter() {
  return new XYCenterGravity();
}
var Gravity = {
  compass,
  autoGravity,
  focusOn,
  xyCenter
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/qualifiers/focusOn/FocusOnValue.js
var FocusOnValue = class extends QualifierValue {
  constructor(name2) {
    super();
    this.name = name2;
  }
  toString() {
    return this.name;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/focusOn.js
function ocr() {
  return new FocusOnValue("ocr_text");
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createGravityModel.js
function isIAutoGravityString(gravity) {
  return gravity && `${gravity}`.split(":")[0] === "auto";
}
function isCompassGravity(gravity) {
  const gravityValue = getGravityValue(gravity);
  return ["north", "center", "east", "west", "south", "north_west", "south_east", "south_west", "north_east"].includes(gravityValue);
}
function getGravityValue(gravity) {
  return `${gravity}`.replace("g_", "");
}
function createCompassGravityModel(gravity) {
  return {
    compass: getGravityValue(gravity),
    gravityType: "direction"
  };
}
function isOcrGravity(gravity) {
  return getGravityValue(gravity) === "ocr_text";
}
function createOcrGravityModel() {
  return {
    gravityType: "ocr"
  };
}
function isAutoGravity(gravity) {
  return `${gravity.qualifierValue}`.split(":")[0] === "auto";
}
function createIAutoFocusObject(gravity) {
  const gravityString = gravity.toString();
  const values = gravityString.split("_");
  const result = {
    object: values[0]
  };
  if (values.length > 1) {
    if (values[1] === "avoid") {
      result.avoid = true;
    } else {
      result.weight = +values[1];
    }
  }
  return result;
}
function createAutoGravityModel(gravity) {
  let values;
  const gravityQualifier = gravity === "auto" ? new AutoGravity() : gravity;
  if (`${gravity}`.startsWith("auto:")) {
    values = `${gravity}`.split(":").filter((v) => v !== "auto");
  } else {
    values = gravityQualifier.qualifierValue.values.filter((v) => v !== "auto");
  }
  const autoFocus = values.map(createIAutoFocusObject);
  return {
    gravityType: "auto",
    autoFocus
  };
}
function createFocusOnGravityModel(gravity) {
  const hasAutoGravity = `${gravity}`.split(":").includes("auto");
  const values = gravity.qualifierValue.values;
  const focusOnValues = hasAutoGravity ? values.slice(0, values.length - 1) : values;
  const result = {
    gravityType: "object",
    focusOnObjects: focusOnValues.map((v) => `${v}`)
  };
  if (hasAutoGravity) {
    const autoFocusObjects = values[values.length - 1].values.slice(1);
    const autoGravityInstance = autoGravity().autoFocus(...autoFocusObjects);
    result.fallbackGravity = createAutoGravityModel(autoGravityInstance);
  }
  return result;
}
function createFocusOnGravity(gravity) {
  const values = gravity.split(":");
  const focusOnValues = values.map((g) => new FocusOnValue(g));
  return new FocusOnGravity(focusOnValues);
}
function createGravityModel(gravity) {
  if (isCompassGravity(gravity)) {
    return createCompassGravityModel(gravity);
  }
  if (isOcrGravity(gravity)) {
    return createOcrGravityModel();
  }
  if (isIAutoGravityString(gravity) || isAutoGravity(gravity)) {
    return createAutoGravityModel(gravity);
  }
  return createFocusOnGravityModel(typeof gravity === "string" ? createFocusOnGravity(gravity) : gravity);
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/autoFocus.js
var AutoFocus = class _AutoFocus extends QualifierValue {
  constructor(focusOn3, weight) {
    super();
    this._weight = weight;
    this.focusOn = focusOn3;
    this.shouldAvoid = false;
  }
  /**
   * @summary qualifier
   * @description Specifies the object to focus on automatically
   * Accepts an AutoFocusObject (which is just a wrapper for a FocusOn object, but with extra method: avoid, weight)
   * @param {Qualifiers.FocusOn} obj The object to focus on.
   * @param {number} weight
   */
  static focusOn(obj, weight) {
    return new _AutoFocus(obj, weight);
  }
  shouldAddWeight() {
    return typeof this._weight === "number" || typeof this._weight === "string" || this.shouldAvoid;
  }
  /**
   * @summary qualifier
   * @desc Get the name of the of the object
   */
  getName() {
    return this.focusOn.name;
  }
  /**
   * @summary qualifier
   * @desc Get the weight for the object
   */
  getWeight() {
    if (this.shouldAvoid) {
      return "avoid";
    } else {
      return this._weight;
    }
  }
  /**
   * @summary qualifier
   * @desc Return the string representation of this QualifierValue
   */
  toString() {
    if (this.shouldAddWeight()) {
      return `${this.getName()}_${this.getWeight()}`;
    } else {
      return `${this.getName()}`;
    }
  }
  /**
   * @summary qualifier
   * @description Sets the importance level of the object within the automatic gravity algorithm
   * @param {numebr} w The focus weight for the object
   * @return {this}
   */
  weight(w) {
    this._weight = w;
    return this;
  }
  /**
   * @summary qualifier
   * @description Attempts to avoid the detected object in the image
   * @return {this}
   */
  avoid() {
    this.shouldAvoid = true;
    return this;
  }
};
var focusOn2 = AutoFocus.focusOn;

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gravity/qualifiers/compass/CompassQualifier.js
var CompassQualifier = class extends QualifierValue {
  constructor(val) {
    super();
    this.val = val;
  }
  toString() {
    return this.val;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createGravityFromModel.js
function isCompassGravityModel(gravityModel) {
  return gravityModel.gravityType === "direction";
}
function isOcrGravityModel(gravityModel) {
  return gravityModel.gravityType === "ocr";
}
function isAutoGravityModel(gravityModel) {
  return gravityModel.gravityType === "auto";
}
function createAutoFocusFromModel(autoGravityObjectModel) {
  const { object, weight, avoid } = autoGravityObjectModel;
  const autoFocus = new AutoFocus(new FocusOnValue(object));
  (weight || weight === 0) && autoFocus.weight(weight);
  avoid && autoFocus.avoid();
  return autoFocus;
}
function createAutoGravityFromModel(gravityModel) {
  const autoFocusModel = gravityModel.autoFocus || [];
  const autoFocus = autoFocusModel.map(createAutoFocusFromModel);
  return autoGravity().autoFocus(...autoFocus);
}
function createFocusOnGravityFromModel(gravityModel) {
  const focusOnObjects = (gravityModel.focusOnObjects || []).map((str) => new FocusOnValue(str));
  const result = focusOn(...focusOnObjects);
  if (gravityModel.fallbackGravity) {
    const autoGravity2 = createAutoGravityFromModel(gravityModel.fallbackGravity);
    result.fallbackGravity(autoGravity2);
  }
  return result;
}
function createGravityFromModel(gravityModel) {
  if (isCompassGravityModel(gravityModel)) {
    return new CompassGravity(new CompassQualifier(gravityModel.compass));
  }
  if (isOcrGravityModel(gravityModel)) {
    return focusOn(ocr());
  }
  if (isAutoGravityModel(gravityModel)) {
    return createAutoGravityFromModel(gravityModel);
  }
  return createFocusOnGravityFromModel(gravityModel);
}

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeAdvancedAction.js
var ResizeAdvancedAction = class extends ResizeSimpleAction {
  /**
   * @description Which part of the original image to include.
   * @param {Qualifiers.Gravity} gravity
   */
  gravity(gravity) {
    this._actionModel.gravity = createGravityModel(gravity);
    const gravityQualifier = typeof gravity === "string" ? new Qualifier("g", gravity) : gravity;
    return this.addQualifier(gravityQualifier);
  }
  static fromJson(actionModel) {
    const result = super.fromJson.apply(this, [actionModel]);
    if (actionModel.gravity) {
      result.gravity(createGravityFromModel(actionModel.gravity));
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/base/BackgroundQualifier.js
var BackgroundQualifier = class extends Qualifier {
  constructor(backgroundValue) {
    super("b");
    if (backgroundValue) {
      this.addValue(backgroundValue);
    }
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/BlurredBackgroundAction.js
var DEFAULT_INTENSITY = 100;
var DEFAULT_BRIGHTNESS = 0;
var BlurredBackgroundAction = class extends BackgroundQualifier {
  /**
   * @description Sets the intensity of the blur.
   * @param {number} value - The intensity of the blur.
   */
  intensity(value) {
    this.intensityLevel = value;
    return this;
  }
  /**
   * @description Sets the brightness of the background.
   * @param {number} value - The brightness of the background.
   */
  brightness(value) {
    this.brightnessLevel = value;
    return this;
  }
  /**
   * @description
   * Stringify the qualifier
   * BackgroundQualifiers don't have a value, but instead override the toString() function
   */
  toString() {
    const intensity = this.intensityLevel !== void 0 ? `:${this.intensityLevel}` : "";
    const brightness2 = this.brightnessLevel !== void 0 ? this.intensityLevel !== void 0 ? `:${this.brightnessLevel}` : `:${DEFAULT_INTENSITY}:${this.brightnessLevel}` : "";
    return `b_blurred${intensity}${brightness2}`;
  }
};
var BlurredBackgroundAction_default = BlurredBackgroundAction;

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/base/BaseCommonBackground.js
var BaseCommonBackground = class extends BackgroundQualifier {
  constructor() {
    super();
    this._palette = [];
  }
  /**
   * @description Selects the strongest contrasting color to use for padding.
   * @return {this}
   */
  contrast() {
    this._contrast = true;
    return this;
  }
  /**
   * @description Defines the custom colors to use when resizing using content-aware padding.
   * @param {...string} colors One or more colors - Example: palette('green', 'red', blue')
   * @return {this}
   */
  palette(...colors) {
    this._palette = colors.map((color2) => {
      return prepareColor(color2);
    });
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/auto/BackgroundAutoBorderQualifier.js
var BackgroundAutoBorderQualifier = class extends BaseCommonBackground {
  /**
   * @description
   * Stringify the qualifier
   * BackgroundQualifiers don't have a value, but instead override the toString() function.
   */
  toString() {
    return `
    b_auto:border
    ${this._contrast ? "_contrast" : ""}
    ${this._palette.length ? `:palette_${this._palette.join("_")}` : ""}
    `.replace(/\s+/g, "");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/base/BaseGradientBackground.js
var BaseGradientBackground = class extends BaseCommonBackground {
  /**
   *
   * @description Sets the number of predominant colors to use (2 or 4).
   * @param {number} num
   * @return {this}
   */
  gradientColors(num2) {
    this._gradientColors = num2;
    return this;
  }
  /**
   * @description Sets the direction for a background gradient fade effect.
   * @param {Qualifiers.GradientDirection | GradientDirectionType | string} direction Use one of these functions
   * provided by {@link Qualifiers.GradientDirection|GradientDirection}
   * @return {this}
   */
  gradientDirection(direction) {
    this._gradientDirection = direction;
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/gradient/BackgroundBorderGradientQualifier.js
var BackgroundBorderGradientQualifier = class extends BaseGradientBackground {
  /**
   * @description
   * Stringify the qualifier
   * BackgroundQualifiers don't have a value, but instead override the toString() function.
   */
  toString() {
    return `
    b_auto:border_gradient
    ${this._contrast ? "_contrast" : ""}
    ${this._gradientColors ? `:${this._gradientColors}` : ""}
    ${this._gradientDirection ? `:${this._gradientDirection}` : ""}
    ${this._palette.length ? `:palette_${this._palette.join("_")}` : ""}
    `.replace(/\s+/g, "");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/gradient/BackgroundPredominantGradientQualifier.js
var BackgroundPredominantGradientQualifier = class extends BaseGradientBackground {
  /**
   * @description
   * Stringify the qualifier
   * BackgroundQualifiers don't have a value, but instead override the toString() function.
   */
  toString() {
    return `
    b_auto:predominant_gradient
    ${this._contrast ? "_contrast" : ""}
    ${this._gradientColors ? `:${this._gradientColors}` : ""}
    ${this._gradientDirection ? `:${this._gradientDirection}` : ""}
    ${this._palette.length ? `:palette_${this._palette.join("_")}` : ""}
    `.replace(/\s+/g, "");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/auto/BackgroundAutoPredominantQualifier.js
var BackgroundAutoPredominantQualifier = class extends BaseCommonBackground {
  /**
   * @description
   * Stringify the qualifier
   * BackgroundQualifiers don't have a value, but instead override the toString() function.
   */
  toString() {
    return `
    b_auto:predominant
    ${this._contrast ? "_contrast" : ""}
    ${this._palette.length ? `:palette_${this._palette.join("_")}` : ""}
    `.replace(/\s+/g, "");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background/shared/BackgroundGenerativeFillQualifier.js
var BackgroundGenerativeFillQualifier = class extends BackgroundQualifier {
  constructor() {
    super("gen_fill");
    this._backgroundType = "generativeFill";
  }
  prompt(prompt) {
    this._prompt = prompt;
    return this;
  }
  getPrompt() {
    return this._prompt;
  }
  getBackgroundType() {
    return this._backgroundType;
  }
  /**
   * @description
   * Override the toString() function to explicitly stringify the qualifier.
   */
  toString() {
    return `b_gen_fill${this._prompt ? `:prompt_${this._prompt}` : ""}`;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createBackgroundModel.js
function getBackgroundValue(background) {
  return `${background}`.replace("b_", "");
}
function createAutoBackgroundModel() {
  return { backgroundType: "auto" };
}
function createBlurredBackgroundModel(background) {
  const { intensityLevel, brightnessLevel } = background;
  const result = {
    backgroundType: "blurred"
  };
  if (intensityLevel || intensityLevel === 0) {
    result.intensity = intensityLevel;
  }
  if (brightnessLevel || brightnessLevel === 0) {
    result.brightness = brightnessLevel;
  }
  return result;
}
function createContrastPaletteBackgroundModel(background) {
  const contrast2 = background._contrast;
  const palette = background._palette;
  const result = {
    backgroundType: ""
  };
  if (contrast2) {
    result.contrast = true;
  }
  if (palette) {
    result.palette = palette;
  }
  return result;
}
function createBorderBackgroundModel(background) {
  return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: "border" });
}
function createBaseGradientBackgroundModel(background) {
  const gradientColors = background._gradientColors;
  const gradientDirection = `${background._gradientDirection}`;
  const result = createContrastPaletteBackgroundModel(background);
  if (gradientColors) {
    result.gradientColors = gradientColors;
  }
  if (gradientDirection) {
    result.gradientDirection = gradientDirection;
  }
  return result;
}
function createBorderGradientBackgroundModel(background) {
  return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: "borderGradient" });
}
function createColorBackgroundModel(background) {
  return {
    backgroundType: "color",
    color: getBackgroundValue(background)
  };
}
function createPredominantBackgroundModel(background) {
  return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: "predominant" });
}
function createPredominantGradientBackgroundModel(background) {
  return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: "predominantGradient" });
}
function createGenerativeFillBackgroundModel(background) {
  return Object.assign({ backgroundType: background.getBackgroundType() }, background.getPrompt() ? { prompt: background.getPrompt() } : {});
}
function createBackgroundModel(background) {
  if (getBackgroundValue(background) === "auto") {
    return createAutoBackgroundModel();
  }
  if (background instanceof BlurredBackgroundAction_default) {
    return createBlurredBackgroundModel(background);
  }
  if (background instanceof BackgroundAutoBorderQualifier) {
    return createBorderBackgroundModel(background);
  }
  if (background instanceof BackgroundBorderGradientQualifier) {
    return createBorderGradientBackgroundModel(background);
  }
  if (background instanceof BackgroundAutoPredominantQualifier) {
    return createPredominantBackgroundModel(background);
  }
  if (background instanceof BackgroundPredominantGradientQualifier) {
    return createPredominantGradientBackgroundModel(background);
  }
  if (background instanceof BackgroundGenerativeFillQualifier) {
    return createGenerativeFillBackgroundModel(background);
  }
  return createColorBackgroundModel(background);
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/textDecoration.js
function normal() {
  return "";
}
function underline() {
  return "underline";
}
function strikethrough() {
  return "strikethrough";
}
var TextDecoration = { normal, underline, strikethrough };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/textAlignment.js
function left() {
  return "left";
}
function right() {
  return "right";
}
function center() {
  return "center";
}
function start() {
  return "start";
}
function end() {
  return "end";
}
function justify() {
  return "justify";
}
var TextAlignment = { left, right, center, end, justify, start };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/textStroke.js
function solid(width, color2) {
  return `bo_${width}px_solid_${color2}`;
}
var Stroke = { solid };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/streamingProfile.js
function fullHd() {
  return "full_hd";
}
function hd() {
  return "hd";
}
function sd() {
  return "sd";
}
function fullHdWifi() {
  return "full_hd_wifi";
}
function fullHdLean() {
  return "full_hd_lean";
}
function hdLean() {
  return "hd_lean";
}
var StreamingProfile = {
  hd,
  sd,
  hdLean,
  fullHd,
  fullHdLean,
  fullHdWifi
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/simulateColorBlind.js
function deuteranopia() {
  return "deuteranopia";
}
function protanopia() {
  return "protanopia";
}
function tritanopia() {
  return "tritanopia";
}
function tritanomaly() {
  return "tritanomaly";
}
function deuteranomaly() {
  return "deuteranomaly";
}
function coneMonochromacy() {
  return "cone_monochromacy";
}
function rodMonochromacy() {
  return "rod_monochromacy";
}
var SimulateColorBlind = {
  coneMonochromacy,
  deuteranomaly,
  deuteranopia,
  protanopia,
  rodMonochromacy,
  tritanomaly,
  tritanopia
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/rotate/RotationModeQualifierValue.js
var RotationModeQualifierValue = class extends QualifierValue {
  constructor(val) {
    super();
    this.val = val;
  }
  toString() {
    return this.val;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/rotationMode.js
function autoRight() {
  return new RotationModeQualifierValue("auto_right");
}
function autoLeft() {
  return new RotationModeQualifierValue("auto_left");
}
function verticalFlip() {
  return new RotationModeQualifierValue("vflip");
}
function horizontalFlip() {
  return new RotationModeQualifierValue("hflip");
}
function ignore() {
  return new RotationModeQualifierValue("ignore");
}
var RotationMode = { autoLeft, autoRight, horizontalFlip, ignore, verticalFlip };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/region/NamedRegion.js
var NamedRegion = class extends Action {
  constructor(type) {
    super();
    this.regionType = type;
    this._actionModel.regionType = type;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/region/CustomRegion.js
var CustomRegion = class _CustomRegion extends NamedRegion {
  constructor() {
    super("custom");
  }
  /**
   * @description The x position in pixels.
   * @param {number | string} x
   */
  x(x) {
    this._actionModel.x = x;
    this.addQualifier(new Qualifier("x", x));
    return this;
  }
  /**
   * @description The y position in pixels.
   * @param {number | string} y
   */
  y(y) {
    this._actionModel.y = y;
    this.addQualifier(new Qualifier("y", y));
    return this;
  }
  /**
   * @description The width of the region in pixels.
   * @param {number | string} width
   */
  width(width) {
    this._actionModel.width = width;
    this.addQualifier(new Qualifier("w", width));
    return this;
  }
  /**
   * @description The height of the region in pixels.
   * @param {number | string} height
   */
  height(height) {
    this._actionModel.height = height;
    this.addQualifier(new Qualifier("h", height));
    return this;
  }
  static fromJson(model) {
    const customRegion = new _CustomRegion();
    if (model.width) {
      customRegion.width(model.width);
    }
    if (model.height) {
      customRegion.height(model.height);
    }
    if (model.x) {
      customRegion.x(model.x);
    }
    if (model.y) {
      customRegion.y(model.y);
    }
    return customRegion;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/region/RectangleRegion.js
var RectangleRegion = class extends Action {
  /**
   * Rectangle defines a region where action will be applied
   *
   * @param {number} x The x position in pixels
   * @param {number} y The y position in pixels
   * @param {number} width The width in pixels
   * @param {number} height The height in pixels
   */
  constructor(x, y, width, height) {
    super();
    this.addQualifier(new Qualifier("x", x));
    this.addQualifier(new Qualifier("y", y));
    this.addQualifier(new Qualifier("w", width));
    this.addQualifier(new Qualifier("h", height));
    this._actionModel = {
      x,
      y,
      width,
      height
    };
  }
  toString() {
    const { x, y, width, height } = this._actionModel;
    return `(x_${x};y_${y};w_${width};h_${height})`;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/region.js
function custom() {
  return new CustomRegion();
}
function faces() {
  return new NamedRegion("faces");
}
function ocr2() {
  return new NamedRegion("ocr_text");
}
function rectangle(x, y, width, height) {
  return new RectangleRegion(x, y, width, height);
}
var Region = { ocr: ocr2, faces, custom, rectangle };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/quality.js
function auto() {
  return "auto";
}
function autoBest() {
  return "auto:best";
}
function autoEco() {
  return "auto:eco";
}
function autoGood() {
  return "auto:good";
}
function autoLow() {
  return "auto:low";
}
function jpegmini() {
  return "jpegmini";
}
function jpegminiBest() {
  return "jpegmini:0";
}
function jpegminiHigh() {
  return "jpegmini:1";
}
function jpegminiMedium() {
  return "jpegmini:2";
}
var Quality = { auto, autoBest, autoEco, autoGood, autoLow, jpegmini, jpegminiBest, jpegminiHigh, jpegminiMedium };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/position/PositionQualifier.js
var PositionQualifier = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
  }
  gravity(gravityQualifier) {
    this.addQualifier(gravityQualifier);
    this._actionModel.gravity = createGravityModel(gravityQualifier);
    return this;
  }
  /**
   * @description Tiles the overlay across your image.
   * <b>Learn more:</b> {@link https://cloudinary.com/documentation/layers#automatic_tiling|Tiling overlay}
   */
  tiled() {
    this.addFlag(tiled());
    this._actionModel.tiled = true;
    return this;
  }
  /**
   * TODO - This should accept a boolean value
   * @description Prevents an image or text overlay from extending a delivered image canvas beyond the dimensions of the base image
   * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#fl_no_overflow|Overflow in overlays}
   */
  allowOverflow(bool = true) {
    if (bool === false) {
      this.addFlag(noOverflow());
    }
    this._actionModel.allowOverflow = bool;
    return this;
  }
  /**
   * @description Set the X Offset
   * @param {number | string} offsetX
   * @return {this}
   */
  offsetX(offsetX) {
    this.addQualifier(new Qualifier("x", offsetX));
    this._actionModel.offsetX = offsetX;
    return this;
  }
  /**
   * @description Set the Y Offset
   * @param {number | string} offsetY
   * @return {this}
   */
  offsetY(offsetY) {
    this.addQualifier(new Qualifier("y", offsetY));
    this._actionModel.offsetY = offsetY;
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/outlineMode.js
function fill() {
  return "fill";
}
function inner() {
  return "inner";
}
function innerFill() {
  return "inner_fill";
}
function outer() {
  return "outer";
}
var OutlineMode = {
  outer,
  inner,
  innerFill,
  fill
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/improveMode.js
function outdoor() {
  return "outdoor";
}
function indoor() {
  return "indoor";
}
var ImproveMode = {
  indoor,
  outdoor
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gradientDirection/GradientDirectionQualifierValue.js
var GradientDirectionQualifierValue = class extends QualifierValue {
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/gradientDirection.js
function horizontal() {
  return new GradientDirectionQualifierValue("horizontal");
}
function vertical() {
  return new GradientDirectionQualifierValue("vertical");
}
function diagonalDesc() {
  return new GradientDirectionQualifierValue("diagonal_desc");
}
function diagonalAsc() {
  return new GradientDirectionQualifierValue("diagonal_asc");
}
var GradientDirection = {
  horizontal,
  vertical,
  diagonalDesc,
  diagonalAsc
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/format.js
function heic() {
  return new FormatQualifier("heic");
}
function flif() {
  return new FormatQualifier("flif");
}
function ai() {
  return new FormatQualifier("ai");
}
function wdp() {
  return new FormatQualifier("wdp");
}
function svg() {
  return new FormatQualifier("svg");
}
function webp() {
  return new FormatQualifier("webp");
}
function psd() {
  return new FormatQualifier("psd");
}
function jp2() {
  return new FormatQualifier("jp2");
}
function jpc() {
  return new FormatQualifier("jpc");
}
function eps() {
  return new FormatQualifier("eps");
}
function tiff() {
  return new FormatQualifier("tiff");
}
function pdf() {
  return new FormatQualifier("pdf");
}
function ico() {
  return new FormatQualifier("ico");
}
function bmp() {
  return new FormatQualifier("bmp");
}
function png() {
  return new FormatQualifier("png");
}
function gif() {
  return new FormatQualifier("gif");
}
function auto2() {
  return new FormatQualifier("auto");
}
function jpg() {
  return new FormatQualifier("jpg");
}
function djvu() {
  return new FormatQualifier("djvu");
}
function ps() {
  return new FormatQualifier("ps");
}
function ept() {
  return new FormatQualifier("ept");
}
function eps3() {
  return new FormatQualifier("eps3");
}
function fxb() {
  return new FormatQualifier("fxb");
}
function gltf() {
  return new FormatQualifier("gltf");
}
function heif() {
  return new FormatQualifier("heif");
}
function indd() {
  return new FormatQualifier("indd");
}
function jpe() {
  return new FormatQualifier("jpe");
}
function jpeg() {
  return new FormatQualifier("jpeg");
}
function jxr() {
  return new FormatQualifier("jxr");
}
function hdp() {
  return new FormatQualifier("hdp");
}
function spd() {
  return new FormatQualifier("spd");
}
function arw() {
  return new FormatQualifier("arw");
}
function cr2() {
  return new FormatQualifier("cr2");
}
function tga() {
  return new FormatQualifier("tga");
}
function tif() {
  return new FormatQualifier("tif");
}
function avif() {
  return new FormatQualifier("avif");
}
function usdz() {
  return new FormatQualifier("usdz");
}
function video3g2() {
  return new FormatQualifier("3g2");
}
function video3gp() {
  return new FormatQualifier("3gp");
}
function videoAvi() {
  return new FormatQualifier("avi");
}
function videoFlv() {
  return new FormatQualifier("flv");
}
function videoM3u8() {
  return new FormatQualifier("m3u8");
}
function videoTs() {
  return new FormatQualifier("ts");
}
function videoMov() {
  return new FormatQualifier("mov");
}
function videoMkv() {
  return new FormatQualifier("mkv");
}
function videoMp4() {
  return new FormatQualifier("mp4");
}
function videoMpeg() {
  return new FormatQualifier("mpeg");
}
function videoMpd() {
  return new FormatQualifier("mpd");
}
function videoMxf() {
  return new FormatQualifier("mxf");
}
function videoOgv() {
  return new FormatQualifier("ogv");
}
function videoWebm() {
  return new FormatQualifier("webm");
}
function videoWmv() {
  return new FormatQualifier("wmv");
}
function videoM2ts() {
  return new FormatQualifier("m2ts");
}
function videoMts() {
  return new FormatQualifier("mts");
}
function audioAac() {
  return new FormatQualifier("aac");
}
function audioAiff() {
  return new FormatQualifier("aiff");
}
function audioAmr() {
  return new FormatQualifier("amr");
}
function audioFlac() {
  return new FormatQualifier("flac");
}
function audioM4a() {
  return new FormatQualifier("m4a");
}
function audioMp3() {
  return new FormatQualifier("mp3");
}
function audioOgg() {
  return new FormatQualifier("ogg");
}
function audioOpus() {
  return new FormatQualifier("opus");
}
function audioWav() {
  return new FormatQualifier("wav");
}
function glb() {
  return new FormatQualifier("glb");
}
var Format = { usdz, jp2, ai, auto: auto2, bmp, eps, flif, gif, heic, ico, jpc, jpg, pdf, png, psd, svg, tiff, wdp, webp, arw, audioAac, audioAiff, audioAmr, audioFlac, audioM4a, audioMp3, audioOgg, audioOpus, audioWav, avif, cr2, djvu, eps3, ept, fxb, gltf, hdp, heif, indd, jpe, jpeg, jxr, ps, spd, tga, tif, video3g2, video3gp, videoAvi, videoFlv, videoM2ts, videoM3u8, videoMkv, videoMov, videoMp4, videoMpd, videoMpeg, videoMts, videoMxf, videoOgv, videoTs, videoWebm, videoWmv, glb };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/fontWeight.js
function thin() {
  return "thin";
}
function light() {
  return "light";
}
function normal2() {
  return "normal";
}
function bold() {
  return "bold";
}
var FontWeight = { bold, light, normal: normal2, thin };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/fontStyle.js
function normal3() {
  return "normal";
}
function italic() {
  return "italic";
}
var FontStyle = { normal: normal3, italic };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/fontHinting.js
function none() {
  return "";
}
function slight() {
  return "slight";
}
function medium() {
  return "medium";
}
function full() {
  return "full";
}
var FontHinting = { full, none, medium, slight };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/expression/ExpressionQualifier.js
var ExpressionQualifier = class extends QualifierValue {
  constructor(value) {
    super();
    this.value = value;
  }
  toString() {
    return this.value;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/expression.js
function expression(exp) {
  const reservedOperatorList = Object.keys(CONDITIONAL_OPERATORS).map((key) => {
    return `\\s${key.replace(/(\*|\+|\^|\|)/g, "\\$1")}\\s`;
  });
  const regexSafeOperatorList = reservedOperatorList.join("|");
  const operatorsReplaceRE = new RegExp(`(${regexSafeOperatorList})`, "g");
  const stringWithOperators = exp.toString().replace(operatorsReplaceRE, (match) => {
    return `_${CONDITIONAL_OPERATORS[match.trim()]}_`;
  });
  const ReservedNames = Object.keys(RESERVED_NAMES);
  const regexSafeReservedNameList = ReservedNames.join("|");
  const reservedNamesRE = new RegExp(`(\\$_*[^_ ]+)|${regexSafeReservedNameList}`, "g");
  const stringWithVariables = stringWithOperators.replace(reservedNamesRE, (match) => {
    if (match.startsWith("$")) {
      return match;
    } else {
      return RESERVED_NAMES[match] || match;
    }
  });
  const finalExpressionString = stringWithVariables.replace(/\s/g, "_");
  return new ExpressionQualifier(finalExpressionString);
}
var Expression = {
  expression
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/dither.js
function threshold1x1Nondither() {
  return 0;
}
function checkerboard2x1Dither() {
  return 1;
}
function ordered2x2Dispersed() {
  return 2;
}
function ordered3x3Dispersed() {
  return 3;
}
function ordered4x4Dispersed() {
  return 4;
}
function ordered8x8Dispersed() {
  return 5;
}
function halftone4x4Angled() {
  return 6;
}
function halftone6x6Angled() {
  return 7;
}
function halftone8x8Angled() {
  return 8;
}
function halftone4x4Orthogonal() {
  return 9;
}
function halftone6x6Orthogonal() {
  return 10;
}
function halftone8x8Orthogonal() {
  return 11;
}
function halftone16x16Orthogonal() {
  return 12;
}
function circles5x5Black() {
  return 13;
}
function circles5x5White() {
  return 14;
}
function circles6x6Black() {
  return 15;
}
function circles6x6White() {
  return 16;
}
function circles7x7Black() {
  return 17;
}
function circles7x7White() {
  return 18;
}
var Dither = {
  checkerboard2x1Dither,
  circles5x5Black,
  circles5x5White,
  circles6x6Black,
  circles6x6White,
  circles7x7Black,
  circles7x7White,
  halftone4x4Angled,
  halftone4x4Orthogonal,
  halftone6x6Angled,
  halftone6x6Orthogonal,
  halftone8x8Angled,
  halftone8x8Orthogonal,
  halftone16x16Orthogonal,
  ordered2x2Dispersed,
  ordered3x3Dispersed,
  ordered4x4Dispersed,
  ordered8x8Dispersed,
  threshold1x1Nondither
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/colorSpace.js
function srgb() {
  return "srgb";
}
function trueColor() {
  return "srgb:truecolor";
}
function tinySrgb() {
  return "tinysrgb";
}
function cmyk() {
  return "cmyk";
}
function noCmyk() {
  return "no_cmyk";
}
function keepCmyk() {
  return "keep_cmyk";
}
var ColorSpace = {
  cmyk,
  keepCmyk,
  noCmyk,
  srgb,
  tinySrgb,
  trueColor
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/color.js
var Color = {
  SNOW: "snow",
  SNOW1: "snow1",
  SNOW2: "snow2",
  ROSYBROWN1: "rosybrown1",
  ROSYBROWN2: "rosybrown2",
  SNOW3: "snow3",
  LIGHTCORAL: "lightcoral",
  INDIANRED1: "indianred1",
  ROSYBROWN3: "rosybrown3",
  INDIANRED2: "indianred2",
  ROSYBROWN: "rosybrown",
  BROWN1: "brown1",
  FIREBRICK1: "firebrick1",
  BROWN2: "brown2",
  INDIANRED: "indianred",
  INDIANRED3: "indianred3",
  FIREBRICK2: "firebrick2",
  SNOW4: "snow4",
  BROWN3: "brown3",
  RED: "red",
  RED1: "red1",
  ROSYBROWN4: "rosybrown4",
  FIREBRICK3: "firebrick3",
  RED2: "red2",
  FIREBRICK: "firebrick",
  BROWN: "brown",
  RED3: "red3",
  INDIANRED4: "indianred4",
  BROWN4: "brown4",
  FIREBRICK4: "firebrick4",
  DARKRED: "darkred",
  RED4: "red4",
  LIGHTPINK1: "lightpink1",
  LIGHTPINK3: "lightpink3",
  LIGHTPINK4: "lightpink4",
  LIGHTPINK2: "lightpink2",
  LIGHTPINK: "lightpink",
  PINK: "pink",
  CRIMSON: "crimson",
  PINK1: "pink1",
  PINK2: "pink2",
  PINK3: "pink3",
  PINK4: "pink4",
  PALEVIOLETRED4: "palevioletred4",
  PALEVIOLETRED: "palevioletred",
  PALEVIOLETRED2: "palevioletred2",
  PALEVIOLETRED1: "palevioletred1",
  PALEVIOLETRED3: "palevioletred3",
  LAVENDERBLUSH: "lavenderblush",
  LAVENDERBLUSH1: "lavenderblush1",
  LAVENDERBLUSH3: "lavenderblush3",
  LAVENDERBLUSH2: "lavenderblush2",
  LAVENDERBLUSH4: "lavenderblush4",
  MAROON: "maroon",
  HOTPINK3: "hotpink3",
  VIOLETRED3: "violetred3",
  VIOLETRED1: "violetred1",
  VIOLETRED2: "violetred2",
  VIOLETRED4: "violetred4",
  HOTPINK2: "hotpink2",
  HOTPINK1: "hotpink1",
  HOTPINK4: "hotpink4",
  HOTPINK: "hotpink",
  DEEPPINK: "deeppink",
  DEEPPINK1: "deeppink1",
  DEEPPINK2: "deeppink2",
  DEEPPINK3: "deeppink3",
  DEEPPINK4: "deeppink4",
  MAROON1: "maroon1",
  MAROON2: "maroon2",
  MAROON3: "maroon3",
  MAROON4: "maroon4",
  MEDIUMVIOLETRED: "mediumvioletred",
  VIOLETRED: "violetred",
  ORCHID2: "orchid2",
  ORCHID: "orchid",
  ORCHID1: "orchid1",
  ORCHID3: "orchid3",
  ORCHID4: "orchid4",
  THISTLE1: "thistle1",
  THISTLE2: "thistle2",
  PLUM1: "plum1",
  PLUM2: "plum2",
  THISTLE: "thistle",
  THISTLE3: "thistle3",
  PLUM: "plum",
  VIOLET: "violet",
  PLUM3: "plum3",
  THISTLE4: "thistle4",
  FUCHSIA: "fuchsia",
  MAGENTA: "magenta",
  MAGENTA1: "magenta1",
  PLUM4: "plum4",
  MAGENTA2: "magenta2",
  MAGENTA3: "magenta3",
  DARKMAGENTA: "darkmagenta",
  MAGENTA4: "magenta4",
  PURPLE: "purple",
  MEDIUMORCHID: "mediumorchid",
  MEDIUMORCHID1: "mediumorchid1",
  MEDIUMORCHID2: "mediumorchid2",
  MEDIUMORCHID3: "mediumorchid3",
  MEDIUMORCHID4: "mediumorchid4",
  DARKVIOLET: "darkviolet",
  DARKORCHID: "darkorchid",
  DARKORCHID1: "darkorchid1",
  DARKORCHID3: "darkorchid3",
  DARKORCHID2: "darkorchid2",
  DARKORCHID4: "darkorchid4",
  INDIGO: "indigo",
  BLUEVIOLET: "blueviolet",
  PURPLE2: "purple2",
  PURPLE3: "purple3",
  PURPLE4: "purple4",
  PURPLE1: "purple1",
  MEDIUMPURPLE: "mediumpurple",
  MEDIUMPURPLE1: "mediumpurple1",
  MEDIUMPURPLE2: "mediumpurple2",
  MEDIUMPURPLE3: "mediumpurple3",
  MEDIUMPURPLE4: "mediumpurple4",
  DARKSLATEBLUE: "darkslateblue",
  LIGHTSLATEBLUE: "lightslateblue",
  MEDIUMSLATEBLUE: "mediumslateblue",
  SLATEBLUE: "slateblue",
  SLATEBLUE1: "slateblue1",
  SLATEBLUE2: "slateblue2",
  SLATEBLUE3: "slateblue3",
  SLATEBLUE4: "slateblue4",
  GHOSTWHITE: "ghostwhite",
  LAVENDER: "lavender",
  BLUE: "blue",
  BLUE1: "blue1",
  BLUE2: "blue2",
  BLUE3: "blue3",
  MEDIUMBLUE: "mediumblue",
  BLUE4: "blue4",
  DARKBLUE: "darkblue",
  MIDNIGHTBLUE: "midnightblue",
  NAVY: "navy",
  NAVYBLUE: "navyblue",
  ROYALBLUE: "royalblue",
  ROYALBLUE1: "royalblue1",
  ROYALBLUE2: "royalblue2",
  ROYALBLUE3: "royalblue3",
  ROYALBLUE4: "royalblue4",
  CORNFLOWERBLUE: "cornflowerblue",
  LIGHTSTEELBLUE: "lightsteelblue",
  LIGHTSTEELBLUE1: "lightsteelblue1",
  LIGHTSTEELBLUE2: "lightsteelblue2",
  LIGHTSTEELBLUE3: "lightsteelblue3",
  LIGHTSTEELBLUE4: "lightsteelblue4",
  SLATEGRAY4: "slategray4",
  SLATEGRAY1: "slategray1",
  SLATEGRAY2: "slategray2",
  SLATEGRAY3: "slategray3",
  LIGHTSLATEGRAY: "lightslategray",
  LIGHTSLATEGREY: "lightslategrey",
  SLATEGRAY: "slategray",
  SLATEGREY: "slategrey",
  DODGERBLUE: "dodgerblue",
  DODGERBLUE1: "dodgerblue1",
  DODGERBLUE2: "dodgerblue2",
  DODGERBLUE4: "dodgerblue4",
  DODGERBLUE3: "dodgerblue3",
  ALICEBLUE: "aliceblue",
  STEELBLUE4: "steelblue4",
  STEELBLUE: "steelblue",
  STEELBLUE1: "steelblue1",
  STEELBLUE2: "steelblue2",
  STEELBLUE3: "steelblue3",
  SKYBLUE4: "skyblue4",
  SKYBLUE1: "skyblue1",
  SKYBLUE2: "skyblue2",
  SKYBLUE3: "skyblue3",
  LIGHTSKYBLUE: "lightskyblue",
  LIGHTSKYBLUE4: "lightskyblue4",
  LIGHTSKYBLUE1: "lightskyblue1",
  LIGHTSKYBLUE2: "lightskyblue2",
  LIGHTSKYBLUE3: "lightskyblue3",
  SKYBLUE: "skyblue",
  LIGHTBLUE3: "lightblue3",
  DEEPSKYBLUE: "deepskyblue",
  DEEPSKYBLUE1: "deepskyblue1",
  DEEPSKYBLUE2: "deepskyblue2",
  DEEPSKYBLUE4: "deepskyblue4",
  DEEPSKYBLUE3: "deepskyblue3",
  LIGHTBLUE1: "lightblue1",
  LIGHTBLUE2: "lightblue2",
  LIGHTBLUE: "lightblue",
  LIGHTBLUE4: "lightblue4",
  POWDERBLUE: "powderblue",
  CADETBLUE1: "cadetblue1",
  CADETBLUE2: "cadetblue2",
  CADETBLUE3: "cadetblue3",
  CADETBLUE4: "cadetblue4",
  TURQUOISE1: "turquoise1",
  TURQUOISE2: "turquoise2",
  TURQUOISE3: "turquoise3",
  TURQUOISE4: "turquoise4",
  CADETBLUE: "cadetblue",
  DARKTURQUOISE: "darkturquoise",
  AZURE: "azure",
  AZURE1: "azure1",
  LIGHTCYAN1: "lightcyan1",
  LIGHTCYAN: "lightcyan",
  AZURE2: "azure2",
  LIGHTCYAN2: "lightcyan2",
  PALETURQUOISE1: "paleturquoise1",
  PALETURQUOISE: "paleturquoise",
  PALETURQUOISE2: "paleturquoise2",
  DARKSLATEGRAY1: "darkslategray1",
  AZURE3: "azure3",
  LIGHTCYAN3: "lightcyan3",
  DARKSLATEGRAY2: "darkslategray2",
  PALETURQUOISE3: "paleturquoise3",
  DARKSLATEGRAY3: "darkslategray3",
  AZURE4: "azure4",
  LIGHTCYAN4: "lightcyan4",
  AQUA: "aqua",
  CYAN: "cyan",
  CYAN1: "cyan1",
  PALETURQUOISE4: "paleturquoise4",
  CYAN2: "cyan2",
  DARKSLATEGRAY4: "darkslategray4",
  CYAN3: "cyan3",
  CYAN4: "cyan4",
  DARKCYAN: "darkcyan",
  TEAL: "teal",
  DARKSLATEGRAY: "darkslategray",
  DARKSLATEGREY: "darkslategrey",
  MEDIUMTURQUOISE: "mediumturquoise",
  LIGHTSEAGREEN: "lightseagreen",
  TURQUOISE: "turquoise",
  AQUAMARINE4: "aquamarine4",
  AQUAMARINE: "aquamarine",
  AQUAMARINE1: "aquamarine1",
  AQUAMARINE2: "aquamarine2",
  AQUAMARINE3: "aquamarine3",
  MEDIUMAQUAMARINE: "mediumaquamarine",
  MEDIUMSPRINGGREEN: "mediumspringgreen",
  MINTCREAM: "mintcream",
  SPRINGGREEN: "springgreen",
  SPRINGGREEN1: "springgreen1",
  SPRINGGREEN2: "springgreen2",
  SPRINGGREEN3: "springgreen3",
  SPRINGGREEN4: "springgreen4",
  MEDIUMSEAGREEN: "mediumseagreen",
  SEAGREEN: "seagreen",
  SEAGREEN3: "seagreen3",
  SEAGREEN1: "seagreen1",
  SEAGREEN4: "seagreen4",
  SEAGREEN2: "seagreen2",
  MEDIUMFORESTGREEN: "mediumforestgreen",
  HONEYDEW: "honeydew",
  HONEYDEW1: "honeydew1",
  HONEYDEW2: "honeydew2",
  DARKSEAGREEN1: "darkseagreen1",
  DARKSEAGREEN2: "darkseagreen2",
  PALEGREEN1: "palegreen1",
  PALEGREEN: "palegreen",
  HONEYDEW3: "honeydew3",
  LIGHTGREEN: "lightgreen",
  PALEGREEN2: "palegreen2",
  DARKSEAGREEN3: "darkseagreen3",
  DARKSEAGREEN: "darkseagreen",
  PALEGREEN3: "palegreen3",
  HONEYDEW4: "honeydew4",
  GREEN1: "green1",
  LIME: "lime",
  LIMEGREEN: "limegreen",
  DARKSEAGREEN4: "darkseagreen4",
  GREEN2: "green2",
  PALEGREEN4: "palegreen4",
  GREEN3: "green3",
  FORESTGREEN: "forestgreen",
  GREEN4: "green4",
  GREEN: "green",
  DARKGREEN: "darkgreen",
  LAWNGREEN: "lawngreen",
  CHARTREUSE: "chartreuse",
  CHARTREUSE1: "chartreuse1",
  CHARTREUSE2: "chartreuse2",
  CHARTREUSE3: "chartreuse3",
  CHARTREUSE4: "chartreuse4",
  GREENYELLOW: "greenyellow",
  DARKOLIVEGREEN3: "darkolivegreen3",
  DARKOLIVEGREEN1: "darkolivegreen1",
  DARKOLIVEGREEN2: "darkolivegreen2",
  DARKOLIVEGREEN4: "darkolivegreen4",
  DARKOLIVEGREEN: "darkolivegreen",
  OLIVEDRAB: "olivedrab",
  OLIVEDRAB1: "olivedrab1",
  OLIVEDRAB2: "olivedrab2",
  OLIVEDRAB3: "olivedrab3",
  YELLOWGREEN: "yellowgreen",
  OLIVEDRAB4: "olivedrab4",
  IVORY: "ivory",
  IVORY1: "ivory1",
  LIGHTYELLOW: "lightyellow",
  LIGHTYELLOW1: "lightyellow1",
  BEIGE: "beige",
  IVORY2: "ivory2",
  LIGHTGOLDENRODYELLOW: "lightgoldenrodyellow",
  LIGHTYELLOW2: "lightyellow2",
  IVORY3: "ivory3",
  LIGHTYELLOW3: "lightyellow3",
  IVORY4: "ivory4",
  LIGHTYELLOW4: "lightyellow4",
  YELLOW: "yellow",
  YELLOW1: "yellow1",
  YELLOW2: "yellow2",
  YELLOW3: "yellow3",
  YELLOW4: "yellow4",
  OLIVE: "olive",
  DARKKHAKI: "darkkhaki",
  KHAKI2: "khaki2",
  LEMONCHIFFON4: "lemonchiffon4",
  KHAKI1: "khaki1",
  KHAKI3: "khaki3",
  KHAKI4: "khaki4",
  PALEGOLDENROD: "palegoldenrod",
  LEMONCHIFFON: "lemonchiffon",
  LEMONCHIFFON1: "lemonchiffon1",
  KHAKI: "khaki",
  LEMONCHIFFON3: "lemonchiffon3",
  LEMONCHIFFON2: "lemonchiffon2",
  MEDIUMGOLDENROD: "mediumgoldenrod",
  CORNSILK4: "cornsilk4",
  GOLD: "gold",
  GOLD1: "gold1",
  GOLD2: "gold2",
  GOLD3: "gold3",
  GOLD4: "gold4",
  LIGHTGOLDENROD: "lightgoldenrod",
  LIGHTGOLDENROD4: "lightgoldenrod4",
  LIGHTGOLDENROD1: "lightgoldenrod1",
  LIGHTGOLDENROD3: "lightgoldenrod3",
  LIGHTGOLDENROD2: "lightgoldenrod2",
  CORNSILK3: "cornsilk3",
  CORNSILK2: "cornsilk2",
  CORNSILK: "cornsilk",
  CORNSILK1: "cornsilk1",
  GOLDENROD: "goldenrod",
  GOLDENROD1: "goldenrod1",
  GOLDENROD2: "goldenrod2",
  GOLDENROD3: "goldenrod3",
  GOLDENROD4: "goldenrod4",
  DARKGOLDENROD: "darkgoldenrod",
  DARKGOLDENROD1: "darkgoldenrod1",
  DARKGOLDENROD2: "darkgoldenrod2",
  DARKGOLDENROD3: "darkgoldenrod3",
  DARKGOLDENROD4: "darkgoldenrod4",
  FLORALWHITE: "floralwhite",
  WHEAT2: "wheat2",
  OLDLACE: "oldlace",
  WHEAT: "wheat",
  WHEAT1: "wheat1",
  WHEAT3: "wheat3",
  ORANGE: "orange",
  ORANGE1: "orange1",
  ORANGE2: "orange2",
  ORANGE3: "orange3",
  ORANGE4: "orange4",
  WHEAT4: "wheat4",
  MOCCASIN: "moccasin",
  PAPAYAWHIP: "papayawhip",
  NAVAJOWHITE3: "navajowhite3",
  BLANCHEDALMOND: "blanchedalmond",
  NAVAJOWHITE: "navajowhite",
  NAVAJOWHITE1: "navajowhite1",
  NAVAJOWHITE2: "navajowhite2",
  NAVAJOWHITE4: "navajowhite4",
  ANTIQUEWHITE4: "antiquewhite4",
  ANTIQUEWHITE: "antiquewhite",
  TAN: "tan",
  BISQUE4: "bisque4",
  BURLYWOOD: "burlywood",
  ANTIQUEWHITE2: "antiquewhite2",
  BURLYWOOD1: "burlywood1",
  BURLYWOOD3: "burlywood3",
  BURLYWOOD2: "burlywood2",
  ANTIQUEWHITE1: "antiquewhite1",
  BURLYWOOD4: "burlywood4",
  ANTIQUEWHITE3: "antiquewhite3",
  DARKORANGE: "darkorange",
  BISQUE2: "bisque2",
  BISQUE: "bisque",
  BISQUE1: "bisque1",
  BISQUE3: "bisque3",
  DARKORANGE1: "darkorange1",
  LINEN: "linen",
  DARKORANGE2: "darkorange2",
  DARKORANGE3: "darkorange3",
  DARKORANGE4: "darkorange4",
  PERU: "peru",
  TAN1: "tan1",
  TAN2: "tan2",
  TAN3: "tan3",
  TAN4: "tan4",
  PEACHPUFF: "peachpuff",
  PEACHPUFF1: "peachpuff1",
  PEACHPUFF4: "peachpuff4",
  PEACHPUFF2: "peachpuff2",
  PEACHPUFF3: "peachpuff3",
  SANDYBROWN: "sandybrown",
  SEASHELL4: "seashell4",
  SEASHELL2: "seashell2",
  SEASHELL3: "seashell3",
  CHOCOLATE: "chocolate",
  CHOCOLATE1: "chocolate1",
  CHOCOLATE2: "chocolate2",
  CHOCOLATE3: "chocolate3",
  CHOCOLATE4: "chocolate4",
  SADDLEBROWN: "saddlebrown",
  SEASHELL: "seashell",
  SEASHELL1: "seashell1",
  SIENNA4: "sienna4",
  SIENNA: "sienna",
  SIENNA1: "sienna1",
  SIENNA2: "sienna2",
  SIENNA3: "sienna3",
  LIGHTSALMON3: "lightsalmon3",
  LIGHTSALMON: "lightsalmon",
  LIGHTSALMON1: "lightsalmon1",
  LIGHTSALMON4: "lightsalmon4",
  LIGHTSALMON2: "lightsalmon2",
  CORAL: "coral",
  ORANGERED: "orangered",
  ORANGERED1: "orangered1",
  ORANGERED2: "orangered2",
  ORANGERED3: "orangered3",
  ORANGERED4: "orangered4",
  DARKSALMON: "darksalmon",
  SALMON1: "salmon1",
  SALMON2: "salmon2",
  SALMON3: "salmon3",
  SALMON4: "salmon4",
  CORAL1: "coral1",
  CORAL2: "coral2",
  CORAL3: "coral3",
  CORAL4: "coral4",
  TOMATO4: "tomato4",
  TOMATO: "tomato",
  TOMATO1: "tomato1",
  TOMATO2: "tomato2",
  TOMATO3: "tomato3",
  MISTYROSE4: "mistyrose4",
  MISTYROSE2: "mistyrose2",
  MISTYROSE: "mistyrose",
  MISTYROSE1: "mistyrose1",
  SALMON: "salmon",
  MISTYROSE3: "mistyrose3",
  WHITE: "white",
  GRAY100: "gray100",
  GREY100: "grey100",
  GRAY99: "gray99",
  GREY99: "grey99",
  GRAY98: "gray98",
  GREY98: "grey98",
  GRAY97: "gray97",
  GREY97: "grey97",
  GRAY96: "gray96",
  GREY96: "grey96",
  WHITESMOKE: "whitesmoke",
  GRAY95: "gray95",
  GREY95: "grey95",
  GRAY94: "gray94",
  GREY94: "grey94",
  GRAY93: "gray93",
  GREY93: "grey93",
  GRAY92: "gray92",
  GREY92: "grey92",
  GRAY91: "gray91",
  GREY91: "grey91",
  GRAY90: "gray90",
  GREY90: "grey90",
  GRAY89: "gray89",
  GREY89: "grey89",
  GRAY88: "gray88",
  GREY88: "grey88",
  GRAY87: "gray87",
  GREY87: "grey87",
  GAINSBORO: "gainsboro",
  GRAY86: "gray86",
  GREY86: "grey86",
  GRAY85: "gray85",
  GREY85: "grey85",
  GRAY84: "gray84",
  GREY84: "grey84",
  GRAY83: "gray83",
  GREY83: "grey83",
  LIGHTGRAY: "lightgray",
  LIGHTGREY: "lightgrey",
  GRAY82: "gray82",
  GREY82: "grey82",
  GRAY81: "gray81",
  GREY81: "grey81",
  GRAY80: "gray80",
  GREY80: "grey80",
  GRAY79: "gray79",
  GREY79: "grey79",
  GRAY78: "gray78",
  GREY78: "grey78",
  GRAY77: "gray77",
  GREY77: "grey77",
  GRAY76: "gray76",
  GREY76: "grey76",
  SILVER: "silver",
  GRAY75: "gray75",
  GREY75: "grey75",
  GRAY74: "gray74",
  GREY74: "grey74",
  GRAY73: "gray73",
  GREY73: "grey73",
  GRAY72: "gray72",
  GREY72: "grey72",
  GRAY71: "gray71",
  GREY71: "grey71",
  GRAY70: "gray70",
  GREY70: "grey70",
  GRAY69: "gray69",
  GREY69: "grey69",
  GRAY68: "gray68",
  GREY68: "grey68",
  GRAY67: "gray67",
  GREY67: "grey67",
  DARKGRAY: "darkgray",
  DARKGREY: "darkgrey",
  GRAY66: "gray66",
  GREY66: "grey66",
  GRAY65: "gray65",
  GREY65: "grey65",
  GRAY64: "gray64",
  GREY64: "grey64",
  GRAY63: "gray63",
  GREY63: "grey63",
  GRAY62: "gray62",
  GREY62: "grey62",
  GRAY61: "gray61",
  GREY61: "grey61",
  GRAY60: "gray60",
  GREY60: "grey60",
  GRAY59: "gray59",
  GREY59: "grey59",
  GRAY58: "gray58",
  GREY58: "grey58",
  GRAY57: "gray57",
  GREY57: "grey57",
  GRAY56: "gray56",
  GREY56: "grey56",
  GRAY55: "gray55",
  GREY55: "grey55",
  GRAY54: "gray54",
  GREY54: "grey54",
  GRAY53: "gray53",
  GREY53: "grey53",
  GRAY52: "gray52",
  GREY52: "grey52",
  GRAY51: "gray51",
  GREY51: "grey51",
  FRACTAL: "fractal",
  GRAY50: "gray50",
  GREY50: "grey50",
  GRAY: "gray",
  GREY: "grey",
  GRAY49: "gray49",
  GREY49: "grey49",
  GRAY48: "gray48",
  GREY48: "grey48",
  GRAY47: "gray47",
  GREY47: "grey47",
  GRAY46: "gray46",
  GREY46: "grey46",
  GRAY45: "gray45",
  GREY45: "grey45",
  GRAY44: "gray44",
  GREY44: "grey44",
  GRAY43: "gray43",
  GREY43: "grey43",
  GRAY42: "gray42",
  GREY42: "grey42",
  DIMGRAY: "dimgray",
  DIMGREY: "dimgrey",
  GRAY41: "gray41",
  GREY41: "grey41",
  GRAY40: "gray40",
  GREY40: "grey40",
  GRAY39: "gray39",
  GREY39: "grey39",
  GRAY38: "gray38",
  GREY38: "grey38",
  GRAY37: "gray37",
  GREY37: "grey37",
  GRAY36: "gray36",
  GREY36: "grey36",
  GRAY35: "gray35",
  GREY35: "grey35",
  GRAY34: "gray34",
  GREY34: "grey34",
  GRAY33: "gray33",
  GREY33: "grey33",
  GRAY32: "gray32",
  GREY32: "grey32",
  GRAY31: "gray31",
  GREY31: "grey31",
  GRAY30: "gray30",
  GREY30: "grey30",
  GRAY29: "gray29",
  GREY29: "grey29",
  GRAY28: "gray28",
  GREY28: "grey28",
  GRAY27: "gray27",
  GREY27: "grey27",
  GRAY26: "gray26",
  GREY26: "grey26",
  GRAY25: "gray25",
  GREY25: "grey25",
  GRAY24: "gray24",
  GREY24: "grey24",
  GRAY23: "gray23",
  GREY23: "grey23",
  GRAY22: "gray22",
  GREY22: "grey22",
  GRAY21: "gray21",
  GREY21: "grey21",
  GRAY20: "gray20",
  GREY20: "grey20",
  GRAY19: "gray19",
  GREY19: "grey19",
  GRAY18: "gray18",
  GREY18: "grey18",
  GRAY17: "gray17",
  GREY17: "grey17",
  GRAY16: "gray16",
  GREY16: "grey16",
  GRAY15: "gray15",
  GREY15: "grey15",
  GRAY14: "gray14",
  GREY14: "grey14",
  GRAY13: "gray13",
  GREY13: "grey13",
  GRAY12: "gray12",
  GREY12: "grey12",
  GRAY11: "gray11",
  GREY11: "grey11",
  GRAY10: "gray10",
  GREY10: "grey10",
  GRAY9: "gray9",
  GREY9: "grey9",
  GRAY8: "gray8",
  GREY8: "grey8",
  GRAY7: "gray7",
  GREY7: "grey7",
  GRAY6: "gray6",
  GREY6: "grey6",
  GRAY5: "gray5",
  GREY5: "grey5",
  GRAY4: "gray4",
  GREY4: "grey4",
  GRAY3: "gray3",
  GREY3: "grey3",
  GRAY2: "gray2",
  GREY2: "grey2",
  GRAY1: "gray1",
  GREY1: "grey1",
  BLACK: "black",
  GRAY0: "gray0",
  GREY0: "grey0",
  OPAQUE: "opaque",
  NONE: "none",
  TRANSPARENT: "transparent"
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/background.js
function border() {
  return new BackgroundAutoBorderQualifier();
}
function auto3() {
  return new BackgroundQualifier("auto");
}
function borderGradient() {
  return new BackgroundBorderGradientQualifier();
}
function predominantGradient() {
  return new BackgroundPredominantGradientQualifier();
}
function predominant() {
  return new BackgroundAutoPredominantQualifier();
}
function color(colorStr) {
  return new BackgroundQualifier(prepareColor(colorStr));
}
function blurred() {
  return new BlurredBackgroundAction_default();
}
function generativeFill() {
  return new BackgroundGenerativeFillQualifier();
}
var Background = {
  auto: auto3,
  border,
  borderGradient,
  predominantGradient,
  predominant,
  color,
  blurred,
  generativeFill
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/audioFrequency.js
function ORIGINAL() {
  return "iaf";
}
function FREQ192000() {
  return 192e3;
}
function FREQ176400() {
  return 176400;
}
function FREQ96000() {
  return 96e3;
}
function FREQ88200() {
  return 88200;
}
function FREQ48000() {
  return 48e3;
}
function FREQ8000() {
  return 8e3;
}
function FREQ11025() {
  return 11025;
}
function FREQ16000() {
  return 16e3;
}
function FREQ22050() {
  return 22050;
}
function FREQ32000() {
  return 32e3;
}
function FREQ37800() {
  return 37800;
}
function FREQ44056() {
  return 44056;
}
function FREQ44100() {
  return 44100;
}
function FREQ47250() {
  return 47250;
}
var AudioFrequency = {
  FREQ8000,
  FREQ11025,
  FREQ16000,
  FREQ22050,
  FREQ32000,
  FREQ37800,
  FREQ44056,
  FREQ44100,
  FREQ47250,
  FREQ48000,
  FREQ88200,
  FREQ96000,
  FREQ176400,
  FREQ192000,
  ORIGINAL
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/audioCodec.js
function none2() {
  return "none";
}
function aac() {
  return "aac";
}
function vorbis() {
  return "vorbis";
}
function mp3() {
  return "mp3";
}
function opus() {
  return "opus";
}
var AudioCodec = {
  aac,
  mp3,
  opus,
  none: none2,
  vorbis
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/aspectRatio.js
function ar1X1() {
  return new AspectRatioQualifierValue("1:1");
}
function ar5X4() {
  return new AspectRatioQualifierValue("5:4");
}
function ar4X3() {
  return new AspectRatioQualifierValue("4:3");
}
function ar3X2() {
  return new AspectRatioQualifierValue("3:2");
}
function ar16X9() {
  return new AspectRatioQualifierValue("16:9");
}
function ar3X1() {
  return new AspectRatioQualifierValue("3:1");
}
function ignoreInitialAspectRatio2() {
  return ignoreInitialAspectRatio();
}
var AspectRatio = {
  ar1X1,
  ar5X4,
  ar3X1,
  ar3X2,
  ar4X3,
  ar16X9,
  ignoreInitialAspectRatio: ignoreInitialAspectRatio2
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/artisticFilter.js
function alDente() {
  return "al_dente";
}
function athena() {
  return "athena";
}
function audrey() {
  return "audrey";
}
function aurora() {
  return "aurora";
}
function daguerre() {
  return "daguerre";
}
function eucalyptus() {
  return "eucalyptus";
}
function fes() {
  return "fes";
}
function frost() {
  return "frost";
}
function hairspray() {
  return "hairspray";
}
function hokusai() {
  return "hokusai";
}
function incognito() {
  return "incognito";
}
function linen() {
  return "linen";
}
function peacock() {
  return "peacock";
}
function primavera() {
  return "primavera";
}
function quartz() {
  return "quartz";
}
function redRock() {
  return "red_rock";
}
function refresh() {
  return "refresh";
}
function sizzle() {
  return "sizzle";
}
function sonnet() {
  return "sonnet";
}
function ukulele() {
  return "ukulele";
}
function zorro() {
  return "zorro";
}
var ArtisticFilter = {
  alDente,
  athena,
  audrey,
  aurora,
  daguerre,
  eucalyptus,
  hairspray,
  hokusai,
  peacock,
  primavera,
  quartz,
  incognito,
  redRock,
  sizzle,
  fes,
  linen,
  refresh,
  sonnet,
  ukulele,
  frost,
  zorro
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/animatedFormat/AnimatedFormatQualifierValue.js
var AnimatedFormatQualifierValue = class extends QualifierValue {
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/animatedFormat.js
function auto4() {
  return new AnimatedFormatQualifierValue("auto");
}
function gif2() {
  return new AnimatedFormatQualifierValue("gif");
}
function webp2() {
  return new AnimatedFormatQualifierValue("webp");
}
function png2() {
  return new AnimatedFormatQualifierValue("png");
}
var AnimatedFormat = { auto: auto4, gif: gif2, webp: webp2, png: png2 };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/chromaSubSampling.js
function chroma444() {
  return 444;
}
function chroma420() {
  return 420;
}
var ChromaSubSampling = {
  chroma444,
  chroma420
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/dpr.js
function auto5() {
  return "auto";
}
var Dpr = {
  auto: auto5
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/BaseSource.js
var BaseSource = class extends QualifierModel {
  /**
   * @description Utility function to encode an asset publicID in an overlay
   * @protected
   * @example
   * encodeAssetPublicID('foo/bar'); // -> foo:bar
   */
  encodeAssetPublicID(publicID) {
    return publicID.replace(/\//g, ":");
  }
  /**
   * @description
   * Apply a transformation on the image source of the layer
   * @param {SDK.ImageTransformation} t An image transformation to apply to the layer
   * @returns {this}
   */
  transformation(t) {
    this._qualifierModel.transformation = t.toJson();
    this._transformation = t;
    return this;
  }
  /**
   * @description Returns the Transformation of the source
   * @return {SDK.Transformation}
   */
  getTransformation() {
    return this._transformation;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/VideoSource.js
var VideoSource = class extends BaseSource {
  constructor(publicID) {
    super();
    this._publicID = publicID;
    this._qualifierModel = {
      publicId: publicID,
      sourceType: "video"
    };
  }
  /**
   * @description
   * Returns the opening string of the layer,
   * This method is used internally within {@link SDK.LayerAction|LayerAction}
   * @returns {string}
   */
  getOpenSourceString(layerType) {
    const encodedPublicID = this.encodeAssetPublicID(this._publicID);
    return `${layerType}_video:${encodedPublicID}`;
  }
  static fromJson(qualifierModel, transformationFromJson) {
    const { publicId, transformation } = qualifierModel;
    const result = new this(publicId);
    if (transformation) {
      result.transformation(transformationFromJson(transformation));
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/ImageSource.js
var ImageSource = class extends BaseSource {
  constructor(publicID) {
    super();
    this._publicID = publicID;
    this._qualifierModel = {
      publicId: publicID,
      sourceType: "image"
    };
  }
  /**
   * @description
   * Returns the opening string of the layer,
   * This method is used internally within {@link SDK.LayerAction|LayerAction}
   * @returns {string}
   */
  getOpenSourceString(layerType) {
    const encodedPublicID = this.encodeAssetPublicID(this._publicID);
    if (this._format) {
      return `${layerType}_${encodedPublicID}.${this._format.toString()}`;
    } else {
      return `${layerType}_${encodedPublicID}`;
    }
  }
  /**
   * @description
   * Apply a format for the image source of the layer
   * @param {FormatQualifier} format A to apply to the layered image, see more {@link Qualifiers.Format|here}
   * @returns {this}
   */
  format(format2) {
    this._format = format2;
    return this;
  }
  toJson() {
    const result = super.toJson();
    if (result.publicId && this._format) {
      result.publicId = `${result.publicId}.${this._format.toString()}`;
    }
    return result;
  }
  static fromJson(qualifierModel, transformationFromJson) {
    const { publicId, transformation } = qualifierModel;
    const result = new this(publicId);
    if (transformation) {
      result.transformation(transformationFromJson(transformation));
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/utils/serializeCloudinaryCharacters.js
function serializeCloudinaryCharacters(str = "") {
  return str.replace(/,/g, "%2C").replace(/\//g, "%2F");
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/IStrokeModel.js
function isISolidStrokeModel(obj) {
  return typeof obj === "object" && obj.width != null && obj.color != null;
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/textStyle.js
var TextStyle = class extends QualifierModel {
  /**
   * @param {string} fontFamily The font family
   * @param {number | string} fontSize The font size
   */
  constructor(fontFamily, fontSize) {
    super();
    if (!fontFamily || !fontSize) {
      throw `You must provide a fontFamily and fontSize to a TextStyle`;
    }
    this._qualifierModel.fontFamily = fontFamily;
    this._qualifierModel.fontSize = fontSize;
  }
  /**
   * @param {number} spacing The spacing between multiple lines in pixels.
   */
  lineSpacing(spacing) {
    this._qualifierModel.lineSpacing = spacing;
    return this;
  }
  /**
   * @param spacing The spacing between the letters, in pixels.
   */
  letterSpacing(spacing) {
    this._qualifierModel.letterSpacing = spacing;
    return this;
  }
  /**
   * The antialias setting to apply to the text. When this parameter is not specified, the default antialiasing for the subsystem and target device are applied.
   * @param {FontAntialiasType|string} antiAlias
   */
  fontAntialias(antiAlias) {
    this._qualifierModel.fontAntialias = antiAlias;
    return this;
  }
  /**
   * The name of any universally available font or a custom font, specified as the public ID of a raw, authenticated font in your account.
   * For details on custom fonts, see {@link https://cloudinary.com/documentation/layers#custom_fonts|Using custom fonts for text overlays}.
   * @param {string} fontFamilyName
   */
  fontFamily(fontFamilyName) {
    this._qualifierModel.fontFamily = fontFamilyName;
    return this;
  }
  /**
   * @param {number} fontSize The font size
   */
  fontSize(fontSize) {
    this._qualifierModel.fontSize = fontSize;
    return this;
  }
  /**
   * @param {FontWeightType|string} fontWeight The font weight
   */
  fontWeight(fontWeight) {
    this._qualifierModel.fontWeight = fontWeight;
    return this;
  }
  /**
   *
   * @param {string} fontStyle The font style.
   */
  fontStyle(fontStyle) {
    this._qualifierModel.fontStyle = fontStyle;
    return this;
  }
  /**
   * @param {string} fontHinting The outline hinting style to apply to the text. When this parameter is not specified, the default hint style for the font and target device are applied.
   */
  fontHinting(fontHinting) {
    this._qualifierModel.fontHinting = fontHinting;
    return this;
  }
  /**
   *
   * @param {TextDecorationType|string} textDecoration The font decoration type.
   */
  textDecoration(textDecoration) {
    this._qualifierModel.textDecoration = textDecoration;
    return this;
  }
  /**
   * @param {TextAlignmentType|string} textAlignment The text alignment
   */
  textAlignment(textAlignment) {
    this._qualifierModel.textAlignment = textAlignment;
    return this;
  }
  /**
   * @description Whether to include an outline stroke. Set the color and weight of the stroke
   */
  stroke(textStroke) {
    if (textStroke) {
      const strokeStyle = textStroke.split("_");
      this._qualifierModel.stroke = {
        width: +strokeStyle[1].replace("px", ""),
        color: strokeStyle[strokeStyle.length - 1]
      };
    } else {
      this._qualifierModel.stroke = true;
    }
    return this;
  }
  toString() {
    const { stroke } = this._qualifierModel;
    let strokeStr = "";
    if (stroke) {
      strokeStr = isISolidStrokeModel(stroke) ? `stroke_${solid(stroke.width, stroke.color)}` : "stroke";
    }
    return [
      `${serializeCloudinaryCharacters(this._qualifierModel.fontFamily)}_${this._qualifierModel.fontSize}`,
      this._qualifierModel.fontWeight !== normal2() && this._qualifierModel.fontWeight,
      this._qualifierModel.fontStyle !== normal3() && this._qualifierModel.fontStyle,
      this._qualifierModel.textDecoration !== normal() && this._qualifierModel.textDecoration,
      this._qualifierModel.textAlignment,
      strokeStr,
      this._qualifierModel.letterSpacing && `letter_spacing_${this._qualifierModel.letterSpacing}`,
      this._qualifierModel.lineSpacing && `line_spacing_${this._qualifierModel.lineSpacing}`,
      this._qualifierModel.fontAntialias && `antialias_${this._qualifierModel.fontAntialias}`,
      this._qualifierModel.fontHinting && `hinting_${this._qualifierModel.fontHinting}`
    ].filter((a) => a).join("_");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/BaseTextSource.js
var BaseTextSource = class extends BaseSource {
  constructor(text2, textStyle2) {
    super();
    this.type = "text";
    this.text = text2;
    this._textStyle = textStyle2;
    this._qualifierModel.sourceType = "text";
    this._qualifierModel.text = text2;
    if (textStyle2 instanceof TextStyle) {
      this._qualifierModel.textStyle = textStyle2.toJson();
    }
  }
  encodeText(text2) {
    return serializeCloudinaryCharacters(text2);
  }
  textColor(color2) {
    this._textColor = color2;
    this._qualifierModel.textColor = color2;
    return this;
  }
  backgroundColor(bgColor) {
    this._backgroundColor = bgColor;
    this._qualifierModel.backgroundColor = bgColor;
    return this;
  }
  textFit(textFit) {
    this._textFit = textFit;
    return this;
  }
  /**
   * @description
   * Returns the opening string of the layer,
   * This method is used internally within {@link SDK.LayerAction|LayerAction}
   * @returns {string}
   */
  getOpenSourceString(layerType) {
    const layerParam = [
      this.type,
      this._textStyle && this._textStyle.toString(),
      this.encodeText(this.text)
    ].filter((a) => a).join(":");
    const tmpAction = new Action();
    tmpAction.addQualifier(new Qualifier(layerType, layerParam));
    this._textColor && tmpAction.addQualifier(new Qualifier("co", prepareColor(this._textColor)));
    this._backgroundColor && tmpAction.addQualifier(new Qualifier("b", prepareColor(this._backgroundColor)));
    this._textFit && tmpAction.addQualifier(this._textFit);
    return tmpAction.toString();
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/SubtitlesSource.js
var SubtitlesSource = class extends BaseTextSource {
  constructor(fileName) {
    super(fileName);
    this.type = "subtitles";
    this._qualifierModel = {
      sourceType: "subtitles",
      publicId: fileName
    };
  }
  /**
   * @description Set the textStyle for the subtitles layer
   * @param {TextStyle} textStyle
   */
  textStyle(textStyle2) {
    this._textStyle = textStyle2;
    this._qualifierModel.textStyle = textStyle2.toJson();
    return this;
  }
  /**
   *
   * @description Used within getOpenSourceString of TextSource, this function overwrites the default encoding behaviour
   * Subtitle file names require a different encoding than texts
   * @param text
   * @example
   * encodeText('foo/bar'); // -> foo:bar
   */
  encodeText(text2) {
    return text2.replace(/\//g, ":");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/FetchSource.js
var FetchSource = class extends BaseSource {
  constructor(remoteURL) {
    super();
    this._qualifierModel = {
      sourceType: "fetch",
      url: remoteURL
    };
    this._remoteURL = remoteURL;
  }
  /**
   * @description
   * Returns the opening string of the layer,
   * This method is used internally within {@link SDK.LayerAction|LayerAction}
   * @returns {string}
   */
  getOpenSourceString(layerType) {
    if (this._format) {
      return `${layerType}_fetch:${base64Encode(this._remoteURL)}.${this._format.toString()}`;
    } else {
      return `${layerType}_fetch:${base64Encode(this._remoteURL)}`;
    }
  }
  /**
   * @description
   * Apply a format for the image source of the layer
   * @param {FormatQualifier} format A to apply to the layered image, see more {@link Qualifiers.Format|here}
   * @returns {this}
   */
  format(format2) {
    this._qualifierModel.format = format2.toString();
    this._format = format2;
    return this;
  }
  static fromJson(qualifierModel, transformationFromJson) {
    const { url, transformation, format: format2 } = qualifierModel;
    const result = new this(url);
    if (transformation) {
      result.transformation(transformationFromJson(transformation));
    }
    if (format2) {
      result.format(new FormatQualifier(format2));
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createTextStyleFromModel.js
function createTextStyleFromModel(textStyleModel) {
  const { fontFamily, fontSize, fontWeight, fontStyle, fontAntialias, fontHinting, textDecoration, textAlignment, stroke, letterSpacing, lineSpacing } = textStyleModel;
  const result = new TextStyle(fontFamily, fontSize);
  if (fontWeight) {
    result.fontWeight(fontWeight);
  }
  if (fontStyle) {
    result.fontStyle(fontStyle);
  }
  if (fontAntialias) {
    result.fontAntialias(fontAntialias);
  }
  if (fontHinting) {
    result.fontHinting(fontHinting);
  }
  if (textDecoration) {
    result.textDecoration(textDecoration);
  }
  if (textAlignment) {
    result.textAlignment(textAlignment);
  }
  if (stroke) {
    result.stroke();
    if (typeof stroke !== "boolean") {
      result.stroke(solid(stroke.width, stroke.color));
    }
  }
  if (letterSpacing) {
    result.letterSpacing(letterSpacing);
  }
  if (lineSpacing) {
    result.lineSpacing(lineSpacing);
  }
  return result;
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/TextSource.js
var TextSource = class extends BaseTextSource {
  constructor(fileName, textStyle2) {
    super(fileName, textStyle2);
  }
  static fromJson(qualifierModel, transformationFromJson) {
    const { text: text2, textStyle: textStyle2, textColor, backgroundColor, transformation } = qualifierModel;
    const result = new this(text2, textStyle2 ? createTextStyleFromModel(textStyle2) : void 0);
    if (transformation) {
      result.transformation(transformationFromJson(transformation));
    }
    if (textColor) {
      result.textColor(textColor);
    }
    if (backgroundColor) {
      result.backgroundColor(backgroundColor);
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source/sourceTypes/AudioSource.js
var AudioSource = class extends BaseSource {
  constructor(publicId) {
    super();
    this._qualifierModel = {
      sourceType: "audio",
      publicId
    };
  }
  /**
   * @description
   * Returns the opening string of the layer,
   * This method is used internally within {@link SDK.LayerAction|LayerAction}
   * @returns {string}
   */
  getOpenSourceString(layerType) {
    const encodedPublicID = this.encodeAssetPublicID(this._qualifierModel.publicId);
    return `${layerType}_audio:${encodedPublicID}`;
  }
  static fromJson(qualifierModel, transformationFromJson) {
    const { publicId, transformation } = qualifierModel;
    const result = new this(publicId);
    if (transformation) {
      result.transformation(transformationFromJson(transformation));
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/source.js
function image(publicID) {
  return new ImageSource(publicID);
}
function text(text2, textStyle2) {
  return new TextSource(text2, textStyle2);
}
function video(publicID) {
  return new VideoSource(publicID);
}
function audio(publicID) {
  return new AudioSource(publicID);
}
function subtitles(fileName) {
  return new SubtitlesSource(fileName);
}
function fetch(remoteURL) {
  return new FetchSource(remoteURL);
}
var Source = { image, text, video, subtitles, fetch, audio };

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/GradientFade.js
function symmetric() {
  return "symmetric";
}
function symmetricPad() {
  return "symmetric_pad";
}
var GradientFade = {
  symmetric,
  symmetricPad
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createBackgroundFromModel.js
function createBlurredBackground(backgroundModel) {
  const { brightness: brightness2, intensity } = backgroundModel;
  const result = Background.blurred();
  result.brightness(brightness2 !== null && brightness2 !== void 0 ? brightness2 : DEFAULT_BRIGHTNESS);
  result.intensity(intensity !== null && intensity !== void 0 ? intensity : DEFAULT_INTENSITY);
  return result;
}
function createGradientBackground(background, backgroundModel) {
  const { gradientColors, gradientDirection, contrast: contrast2, palette } = backgroundModel;
  if (contrast2) {
    background.contrast();
  }
  if (palette) {
    background.palette(...palette);
  }
  if (gradientColors) {
    background.gradientColors(+gradientColors);
  }
  if (gradientDirection) {
    background.gradientDirection(gradientDirection);
  }
  return background;
}
function createContrastPaletteBackground(background, backgroundModel) {
  const { contrast: contrast2, palette } = backgroundModel;
  if (contrast2) {
    background.contrast();
  }
  if (palette) {
    background.palette(...palette);
  }
  return background;
}
function createGenerativeFillBackground(background, backgroundModel) {
  const { prompt } = backgroundModel;
  if (prompt) {
    background.prompt(prompt);
  }
  return background;
}
function createBackgroundFromModel(backgroundModel) {
  const { backgroundType } = backgroundModel;
  switch (backgroundType) {
    case "auto":
      return auto3();
    case "blurred":
      return createBlurredBackground(backgroundModel);
    case "border":
      return createContrastPaletteBackground(border(), backgroundModel);
    case "borderGradient":
      return createGradientBackground(borderGradient(), backgroundModel);
    case "predominant":
      return createContrastPaletteBackground(predominant(), backgroundModel);
    case "predominantGradient":
      return createGradientBackground(predominantGradient(), backgroundModel);
    case "generativeFill":
      return createGenerativeFillBackground(generativeFill(), backgroundModel);
    default:
      return color(backgroundModel.color);
  }
}

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizePadAction.js
var ResizePadAction = class extends ResizeAdvancedAction {
  /**
   * @description Sets the background.
   * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
   * transparent background areas or when resizing with padding.
   */
  background(backgroundQualifier) {
    this._actionModel.background = createBackgroundModel(backgroundQualifier);
    return this.addQualifier(backgroundQualifier);
  }
  /**
   * @description Horizontal position for custom-coordinates based padding.
   * @param {number} x The x position.
   */
  offsetX(x) {
    this._actionModel.x = x;
    return this.addQualifier(new Qualifier("x", x));
  }
  /**
   * @description Vertical position for custom-coordinates based padding
   * @param {number} y The y position.
   */
  offsetY(y) {
    this._actionModel.y = y;
    return this.addQualifier(new Qualifier("y", y));
  }
  static fromJson(actionModel) {
    const result = super.fromJson.apply(this, [actionModel]);
    actionModel.background && result.background(createBackgroundFromModel(actionModel.background));
    actionModel.x && result.offsetX(actionModel.x);
    actionModel.y && result.offsetY(actionModel.y);
    actionModel.zoom && result.zoom(actionModel.zoom);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeScaleAction.js
var ResizeScaleAction = class extends ResizeSimpleAction {
  /**
   * @description Changes the aspect ratio of an image while retaining all important content and avoiding unnatural
   * distortions.
   * @return {this}
   */
  liquidRescaling() {
    return this.addQualifier(new GravityQualifier("liquid"));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ThumbnailAction.js
var ThumbResizeAction = class extends ResizeAdvancedAction {
  /**
   * @description Controls how much of the original image surrounding the face to keep when using either the 'crop' or 'thumb' cropping modes with face detection.
   * @param {number | string} z The zoom factor. (Default: 1.0)
   */
  zoom(z) {
    this._actionModel.zoom = z;
    return this.addQualifier(new Qualifier("z", z));
  }
  static fromJson(actionModel) {
    const result = super.fromJson.apply(this, [actionModel]);
    actionModel.zoom && result.zoom(actionModel.zoom);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeCropAction.js
var ResizeCropAction = class extends ResizeAdvancedAction {
  /**
   * @description Horizontal position for custom-coordinates based cropping.
   * @param {number} x The x position.
   */
  x(x) {
    this._actionModel.x = x;
    return this.addQualifier(new Qualifier("x", x));
  }
  /**
   * @description Vertical position for custom-coordinates based cropping
   * @param {number} y The y position.
   */
  y(y) {
    this._actionModel.y = y;
    return this.addQualifier(new Qualifier("y", y));
  }
  /**
   * @description Controls how much of the original image surrounding the face to keep when using either the 'crop' or 'thumb' cropping modes with face detection.
   * @param {number | string} z The zoom factor. (Default: 1.0)
   */
  zoom(z) {
    this._actionModel.zoom = z;
    return this.addQualifier(new Qualifier("z", z));
  }
  static fromJson(actionModel) {
    const result = super.fromJson.apply(this, [actionModel]);
    actionModel.x && result.x(actionModel.x);
    actionModel.y && result.y(actionModel.y);
    actionModel.zoom && result.zoom(actionModel.zoom);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeFillAction.js
var ResizeFillAction = class extends ResizeAdvancedAction {
  /**
   * @description Absolute X position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
   * @param {number} x The x position.
   */
  x(x) {
    this._actionModel.x = x;
    return this.addQualifier(new Qualifier("x", x));
  }
  /**
   * @description Absolute Y position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
   * @param {number} y The y position.
   */
  y(y) {
    this._actionModel.y = y;
    return this.addQualifier(new Qualifier("y", y));
  }
  static fromJson(actionModel) {
    const result = super.fromJson.apply(this, [actionModel]);
    actionModel.x && result.x(actionModel.x);
    actionModel.y && result.y(actionModel.y);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeLimitFitAction.js
var ResizeLimitFitAction = class extends ResizeSimpleAction {
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeLimitFillAction.js
var ResizeLimitFillAction = class extends ResizeFillAction {
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeLimitPadAction.js
var ResizeLimitPadAction = class extends ResizePadAction {
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeMinimumPadAction.js
var ResizeMinimumPadAction = class extends ResizePadAction {
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize/ResizeAutoPadAction.js
var ResizeAutoPadAction = class extends ResizeSimpleAction {
  constructor(cropType, cropWidth, cropHeight) {
    super(cropType, cropWidth, cropHeight);
    this.addQualifier(new Qualifier("g", "auto"));
  }
  /**
   * @description Sets the background.
   * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
   * transparent background areas or when resizing with padding.
   */
  background(backgroundQualifier) {
    this._actionModel.background = createBackgroundModel(backgroundQualifier);
    return this.addQualifier(backgroundQualifier);
  }
  gravity(gravity) {
    return this;
  }
  static fromJson(actionModel) {
    const result = super.fromJson.apply(this, [actionModel]);
    actionModel.background && result.background(createBackgroundFromModel(actionModel.background));
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/resize.js
function scale(width, height) {
  return new ResizeScaleAction("scale", width, height);
}
function imaggaScale(width, height) {
  return new ResizeSimpleAction("imagga_scale", width, height);
}
function imaggaCrop(width, height) {
  return new ResizeSimpleAction("imagga_crop", width, height);
}
function crop(width, height) {
  return new ResizeCropAction("crop", width, height);
}
function fill2(width, height) {
  return new ResizeFillAction("fill", width, height);
}
function fit(width, height) {
  return new ResizeSimpleAction("fit", width, height);
}
function pad(width, height) {
  return new ResizePadAction("pad", width, height);
}
function limitFill(width, height) {
  return new ResizeLimitFillAction("lfill", width, height);
}
function limitFit(width, height) {
  return new ResizeLimitFitAction("limit", width, height);
}
function minimumPad(width, height) {
  return new ResizeMinimumPadAction("mpad", width, height);
}
function minimumFit(width, height) {
  return new ResizeSimpleAction("mfit", width, height);
}
function fillPad(width, height) {
  return new ResizePadAction("fill_pad", width, height);
}
function thumbnail(width, height) {
  return new ThumbResizeAction("thumb", width, height);
}
function auto6(width, height) {
  return new ResizeAdvancedAction("auto", width, height);
}
function limitPad(width, height) {
  return new ResizeLimitPadAction("lpad", width, height);
}
function autoPad(width, height) {
  return new ResizeAutoPadAction("auto_pad", width, height);
}
var Resize = {
  imaggaScale,
  imaggaCrop,
  crop,
  fill: fill2,
  scale,
  minimumPad,
  fit,
  pad,
  limitFit,
  thumbnail,
  limitFill,
  minimumFit,
  limitPad,
  fillPad,
  auto: auto6,
  autoPad
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/roundCorners/RoundCornersAction.js
var RoundCornersAction = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "roundCorners";
  }
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} d
   * @return {RoundCornersAction}
   */
  radius(a, b, c, d) {
    const qualifierValue = new QualifierValue();
    a !== void 0 && qualifierValue.addValue(a);
    b !== void 0 && qualifierValue.addValue(b);
    c !== void 0 && qualifierValue.addValue(c);
    d !== void 0 && qualifierValue.addValue(d);
    const definedRadiuses = [a, b, c, d].filter((r) => r !== void 0);
    this._radius = definedRadiuses;
    this._actionModel.radius = definedRadiuses;
    this.addQualifier(new Qualifier("r").addValue(qualifierValue));
    return this;
  }
  /**
   * @description Applies maximum rounding to the corners of the asset. An asset with square dimensions becomes a circle.
   */
  max() {
    this._radius = "max";
    this._actionModel.radius = "max";
    return this.addQualifier(new Qualifier("r", "max"));
  }
  getRadius() {
    return this._radius;
  }
  static fromJson(actionModel) {
    const { radius } = actionModel;
    const result = new this();
    if (Array.isArray(radius)) {
      result.radius(radius[0], radius[1], radius[2], radius[3]);
    }
    if (radius === "max") {
      result.max();
    }
    return result;
  }
};
var RoundCornersAction_default = RoundCornersAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/border.js
var BorderAction = class extends Action {
  /**
   * @description Adds a border of the specified type around an image or video.
   * @param {'solid'} borderType The type of border (currently only 'solid' is supported). Use values in {@link Qualifiers.Border|Border Values}.
   * @param {string} color The color of the border.
   * @param {number} borderWidth The width in pixels.
   */
  constructor(borderType, color2, borderWidth) {
    super();
    this._actionModel = {};
    this.borderType = borderType;
    this.borderColor = prepareColor(color2);
    this.borderWidth = borderWidth;
    this._actionModel = {
      color: prepareColor(color2),
      width: borderWidth,
      actionType: "border"
    };
  }
  /**
   * @description Sets the width of the border
   * @param {number | string} borderWidth The width in pixels.
   */
  width(borderWidth) {
    this.borderWidth = borderWidth;
    this._actionModel.width = borderWidth;
    return this;
  }
  /**
   * @description Sets the color of the border.
   * @param {string} borderColor The color of the border.
   */
  color(borderColor) {
    this.borderColor = prepareColor(borderColor);
    this._actionModel.color = prepareColor(borderColor);
    return this;
  }
  /**
   * @description Rounds the specified corners of an image.
   * @param {RoundCornersAction} roundCorners
   * @return {this}
   */
  roundCorners(roundCorners2) {
    this._roundCorners = roundCorners2;
    this._actionModel.radius = roundCorners2.getRadius();
    return this;
  }
  /**
   * @description Sets the style of the border.
   * @param {number | string} width The width in pixels.
   * @param {string} color The color of the border, e.g 'green', 'yellow'.
   * @return {this}
   */
  solid(width, color2) {
    this.borderType = "solid";
    this.borderColor = prepareColor(color2);
    this.borderWidth = width;
    this._actionModel.color = prepareColor(color2);
    this._actionModel.width = width;
    return this;
  }
  prepareQualifiers() {
    const qualifierValue = new QualifierValue([`${this.borderWidth}px`, this.borderType, `${this.borderColor}`]).setDelimiter("_");
    this.addQualifier(new Qualifier("bo", qualifierValue));
    if (this._roundCorners) {
      this.addQualifier(this._roundCorners.qualifiers.get("r"));
    }
  }
  static fromJson(actionModel) {
    const { width, color: color2, radius } = actionModel;
    const result = new this("solid", color2, width);
    if (radius) {
      const roundCornersAction = (() => {
        if (radius === "max") {
          return new RoundCornersAction_default().max();
        }
        if (Array.isArray(radius)) {
          return new RoundCornersAction_default().radius(...radius);
        }
        return void 0;
      })();
      if (roundCornersAction) {
        result.roundCorners(roundCornersAction);
      }
    }
    return result;
  }
};
function solid2(width, color2) {
  return new BorderAction("solid", color2, width);
}
function roundCorners(roundCorners2) {
  const borderActionInstance = new BorderAction("solid", "transparent", 0);
  borderActionInstance.roundCorners(roundCorners2);
  return borderActionInstance;
}
var Border = {
  solid: solid2,
  roundCorners
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/roundCorners.js
function max() {
  return new RoundCornersAction_default().max();
}
function byRadius(a, b, c, d) {
  return new RoundCornersAction_default().radius(a, b, c, d);
}
var RoundCorners = { byRadius, max };

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Blur.js
var BlurAction = class extends Action {
  constructor(strength) {
    super();
    this._actionModel = {};
    this._strength = strength;
    this._actionModel.actionType = "blur";
    this._actionModel.strength = strength;
  }
  /**
   * @description Specifies the region to blur.
   * @param {NamedRegion} blurRegion
   */
  region(blurRegion) {
    this._region = blurRegion;
    this._actionModel.region = blurRegion.toJson();
    return this;
  }
  /**
   * @description Sets the strength of the blur effect.
   * @param {number | string} strength
   */
  strength(strength) {
    this._strength = strength;
    this._actionModel.strength = strength;
    return this;
  }
  prepareQualifiers() {
    const strength = this._strength ? `:${this._strength}` : "";
    if ("_region" in this) {
      const qualifiers = this._region.qualifiers;
      qualifiers.forEach((q) => this.addQualifier(q));
      if (this._region.regionType === "custom") {
        this.addQualifier(new Qualifier("e", `blur_region${strength}`));
      }
      if (this._region.regionType === "ocr_text") {
        this.addQualifier(new Qualifier("e", `blur_region${strength}`));
        this.addQualifier(new Qualifier("g", `ocr_text`));
      }
      if (this._region.regionType === "faces") {
        this.addQualifier(new Qualifier("e", `blur_faces${strength}`));
      }
    } else {
      this.addQualifier(new Qualifier("e", `blur${strength}`));
    }
  }
  static fromJson(actionModel) {
    const { strength, region } = actionModel;
    const result = new this(strength);
    strength && result.strength(strength);
    if (region && region.regionType === "faces") {
      result.region(faces());
    }
    if (region && region.regionType === "ocr_text") {
      result.region(ocr2());
    }
    if (region && region.regionType === "custom") {
      result.region(CustomRegion.fromJson(region));
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/Accelerate.js
var AccelerationEffectAction = class extends Action {
  constructor(rate) {
    super();
    this._actionModel = { actionType: "accelerate" };
    rate && this.rate(rate);
  }
  rate(rate) {
    this._actionModel.rate = rate;
    this._rate = rate;
    return this;
  }
  prepareQualifiers() {
    const qualifierValue = new QualifierValue(["accelerate", this._rate]).setDelimiter(":");
    this.addQualifier(new Qualifier("e", qualifierValue));
    return this;
  }
  static fromJson(actionModel) {
    const { rate } = actionModel;
    const result = new this();
    rate && result.rate(rate);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/EffectActions/SimpleEffectAction.js
var SimpleEffectAction = class extends Action {
  constructor(effectType, level) {
    super();
    this._actionModel = {};
    this._actionModel.actionType = EFFECT_MODE_TO_ACTION_TYPE_MAP[effectType] || effectType;
    const qualifierEffect = this.createEffectQualifier(effectType, level);
    this.addQualifier(qualifierEffect);
  }
  createEffectQualifier(effectType, level) {
    let qualifierValue;
    if (level) {
      qualifierValue = new QualifierValue([effectType, `${level}`]).setDelimiter(":");
    } else {
      qualifierValue = new QualifierValue(effectType);
    }
    return new Qualifier("e", qualifierValue);
  }
  static fromJson(actionModel) {
    const { actionType, level, strength } = actionModel;
    const effectType = ACTION_TYPE_TO_EFFECT_MODE_MAP[actionType] || actionType;
    const result = new this(effectType, level ? level : strength);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/EffectActions/LeveledEffectAction.js
var LeveledEffectAction = class extends SimpleEffectAction {
  constructor(effectType, level) {
    super(effectType, level);
    this.LEVEL_NAME = "level";
    this._actionModel = {};
    this.effectType = effectType;
    this._actionModel.actionType = EFFECT_MODE_TO_ACTION_TYPE_MAP[effectType] || effectType;
    if (level) {
      this.setLevel(level);
    }
  }
  /**
   *
   * @description Sets the effect level for the action
   * @param {string | number} level - The strength of the effect
   * @protected
   */
  setLevel(level) {
    this._actionModel[this.LEVEL_NAME] = level;
    const qualifierEffect = this.createEffectQualifier(this.effectType, level);
    this.addQualifier(qualifierEffect);
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/Loop.js
var LoopEffectAction = class extends LeveledEffectAction {
  additionalIterations(value) {
    this._actionModel.iterations = value;
    const qualifierEffect = this.createEffectQualifier(this.effectType, value);
    this.addQualifier(qualifierEffect);
    return this;
  }
  static fromJson(actionModel) {
    const { actionType, iterations } = actionModel;
    const result = new this(actionType, iterations);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Cartoonify.js
var CartoonifyEffect = class extends Action {
  constructor(effectName, strength) {
    super();
    this._actionModel = {};
    this.cartoonifyStrength = strength;
    this.effectName = effectName;
    this._actionModel.actionType = effectName;
  }
  /**
   * @description Sets the thickness of the lines.
   * @param {number} lineStrength The thickness of the lines. (Range: 0 to 100, Server default: 50)
   * @return {this}
   */
  lineStrength(lineStrength) {
    this.cartoonifyStrength = lineStrength;
    this._actionModel.lineStrength = lineStrength;
    return this;
  }
  /**
   * @description Achieves a black and white cartoon effect.
   * @return {this}
   */
  blackwhite() {
    this._actionModel.blackAndWhite = true;
    this.colorReduction = "bw";
    return this;
  }
  /**
   * @description
   * Sets the decrease in the number of colors and corresponding saturation boost of the remaining colors. <br/>
   * Higher reduction values result in a less realistic look.
   * @param {number } level The decrease in the number of colors and corresponding saturation boost of the remaining colors. (Range: 0 to 100, Server default: automatically adjusts according to the line_strength value). Set to 'bw' for a black and white cartoon effect.
   * @return {this}
   */
  colorReductionLevel(level) {
    this._actionModel.colorReductionLevel = level;
    this.colorReduction = level;
    return this;
  }
  prepareQualifiers() {
    this.addQualifier(new Qualifier("e", new QualifierValue([this.effectName, this.cartoonifyStrength, this.colorReduction])));
    return;
  }
  static fromJson(actionModel) {
    const { actionType, lineStrength, blackAndWhite, colorReductionLevel } = actionModel;
    const result = new this(actionType, lineStrength);
    blackAndWhite && result.blackwhite();
    colorReductionLevel && result.colorReductionLevel(colorReductionLevel);
    lineStrength && result.lineStrength(lineStrength);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Outline.js
var EffectOutline = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "outline";
  }
  /**
   * @description
   * How to apply the outline effect which can be one of the following values:
   * inner, inner_fill, outer, fill.
   * @param {OutlineModeType|string} mode  The type of outline effect. Use the constants defined in Outline.
   * @return {this}
   */
  mode(mode2) {
    this._actionModel.mode = mode2;
    this._mode = mode2;
    return this;
  }
  /**
   * The thickness of the outline in pixels. (Range: 1 to 100, Server default: 5)
   * @param {number} width
   * @return {this}
   */
  width(width) {
    this._actionModel.width = width;
    this._width = width;
    return this;
  }
  /**
   * @description
   * The level of blur of the outline.
   * Range: 0 to 2000, Server default: 0
   * @param {number | string} lvl
   * @return {this}
   */
  blurLevel(lvl) {
    this._actionModel.blurLevel = lvl;
    this._blurLevel = lvl;
    return this;
  }
  /**
   * @param {string | Qualifiers.Color} color One of the SDK Color values, string, or rgba: '#fff'
   * @return {this}
   */
  color(color2) {
    this._actionModel.color = color2;
    return this.addQualifier(new Qualifier("co", prepareColor(color2)));
  }
  prepareQualifiers() {
    this.addQualifier(new Qualifier("e", new QualifierValue(["outline", this._mode, this._width, this._blurLevel]).setDelimiter(":")));
  }
  static fromJson(actionModel) {
    const { actionType, mode: mode2, color: color2, blurLevel, width } = actionModel;
    const result = new this();
    mode2 && result.mode(mode2);
    color2 && result.color(color2);
    blurLevel && result.blurLevel(blurLevel);
    width && result.width(width);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/MakeTransparent.js
var MakeTransparentEffectAction = class extends LeveledEffectAction {
  constructor() {
    super(...arguments);
    this._actionModel = { actionType: "makeTransparent" };
  }
  /**
   * @description Sets the tolerance used to accommodate variance in the background color.
   * @param {number | string} value The tolerance used to accommodate variance in the background color. (Range: 0 to 100, Server default: 10)
   */
  tolerance(value) {
    this._actionModel.tolerance = value;
    const qualifierEffect = this.createEffectQualifier(this.effectType, value);
    this.addQualifier(qualifierEffect);
    return this;
  }
  /**
   * @description Sets the color to make transparent.
   * @param {string} color The HTML name of the color (red, green, etc.) or RGB hex code.
   * @return {this}
   */
  colorToReplace(color2) {
    this._actionModel.color = color2;
    return this.addQualifier(new Qualifier("co", new QualifierValue(prepareColor(color2))));
  }
  static fromJson(actionModel) {
    const { actionType, tolerance, color: color2 } = actionModel;
    const result = new this(ACTION_TYPE_TO_EFFECT_MODE_MAP[actionType], tolerance);
    tolerance && result.tolerance(tolerance);
    color2 && result.colorToReplace(color2);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Vectorize.js
var VectorizeEffectAction = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "vectorize";
  }
  /**
   * @description The number of colors. (Range: 2 to 30, Server default: 10)
   * @param {number | string} num
   * @return {this}
   */
  numOfColors(num2) {
    this._actionModel.numOfColors = num2;
    this._numOfColors = num2;
    return this;
  }
  /**
   * @description The level of detail. Specify either a percentage of the original image (Range: 0.0 to 1.0) or an absolute number of pixels (Range: 0 to 1000). (Server default: 300)
   * @param {number | string} num
   * @return {this}
   */
  detailsLevel(num2) {
    this._actionModel.detailLevel = num2;
    this._detailsLevel = num2;
    return this;
  }
  /**
   * @description The size of speckles to suppress. Specify either a percentage of the original image (Range: 0.0 to 1.0) or an absolute number of pixels (Range: 0 to 100, Server default: 2)
   * @param {number | string} num
   * @return {this}
   */
  despeckleLevel(num2) {
    this._actionModel.despeckleLevel = num2;
    this._despeckleLevel = num2;
    return this;
  }
  /**
   * @description The corner threshold. Specify 100 for no smoothing (polygon corners), 0 for completely smooth corners. (Range: 0 to 100, Default: 25)
   * @param {number | string} num
   * @return {this}
   */
  cornersLevel(num2) {
    this._actionModel.cornersLevel = num2;
    this._cornersLevel = num2;
    return this;
  }
  /**
   * @description The optimization value. Specify 100 for least optimization and the largest file. (Range: 0 to 100, Server default: 100).
   * @param {number} num
   * @return {this}
   */
  paths(num2) {
    this._actionModel.paths = num2;
    this._paths = num2;
    return this;
  }
  prepareQualifiers() {
    let str = "vectorize";
    if (this._numOfColors) {
      str += `:${new QualifierValue(`colors:${this._numOfColors}`).toString()}`;
    }
    if (this._detailsLevel) {
      str += `:${new QualifierValue(`detail:${this._detailsLevel}`).toString()}`;
    }
    if (this._despeckleLevel) {
      str += `:${new QualifierValue(`despeckle:${this._despeckleLevel}`).toString()}`;
    }
    if (this._paths) {
      str += `:${new QualifierValue(`paths:${this._paths}`).toString()}`;
    }
    if (this._cornersLevel) {
      str += `:${new QualifierValue(`corners:${this._cornersLevel}`).toString()}`;
    }
    this.addQualifier(new Qualifier("e", str));
  }
  static fromJson(actionModel) {
    const { actionType, paths, cornersLevel, despeckleLevel, detailLevel, numOfColors } = actionModel;
    const result = new this();
    paths && result.paths(paths);
    cornersLevel && result.cornersLevel(cornersLevel);
    despeckleLevel && result.despeckleLevel(despeckleLevel);
    detailLevel && result.detailsLevel(detailLevel);
    numOfColors && result.numOfColors(numOfColors);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/SimulateColorBlind.js
var SimulateColorBlindEffectAction = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "simulateColorblind";
    this.addQualifier(new Qualifier("e", `simulate_colorblind`));
  }
  setQualifier(val) {
    const strToAppend = `:${val}`;
    if (val) {
      this.addQualifier(new Qualifier("e", `simulate_colorblind${strToAppend}`));
    }
    return this;
  }
  /**
   * @description Sets the color blind condition to simulate.
   * @param {Qualifiers.simulateColorBlindValues | SimulateColorBlindType | string} cond
   * @return {this}
   */
  condition(cond) {
    this._actionModel.condition = cond;
    return this.setQualifier(cond);
  }
  static fromJson(actionModel) {
    const { actionType, condition } = actionModel;
    const result = new this();
    condition && result.condition(condition);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/EffectActions/EffectActionWithLevel.js
var EffectActionWithLevel = class extends LeveledEffectAction {
  level(value) {
    this._actionModel.level = value;
    return this.setLevel(value);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/AssistColorBlind.js
var AssistColorBlindEffectAction = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "assistColorblind";
    this.addQualifier(new Qualifier("e", new QualifierValue("assist_colorblind")));
  }
  /**
   * @description Replaces problematic colors with colors that are easier to differentiate.
   * @return {this}
   */
  xray() {
    this._actionModel.type = "xray";
    return this.addQualifier(new Qualifier("e", new QualifierValue(["assist_colorblind", "xray"]).setDelimiter(":")));
  }
  /**
   * @description Applies stripes of the specified intensity to help people with common color blind conditions to differentiate between colors that are similar for them.
   * @param {number | string} strength The intensity of the stripes. (Range: 1 to 100, Server default: 10)
   * @return {this}
   */
  stripesStrength(strength) {
    this._actionModel.type = "stripes";
    this._actionModel.stripesStrength = strength;
    return this.addQualifier(new Qualifier("e", new QualifierValue(["assist_colorblind", strength]).setDelimiter(":")));
  }
  static fromJson(actionModel) {
    const { actionType, type, stripesStrength } = actionModel;
    const result = new this();
    if (type === "xray") {
      result.xray();
    }
    if (type === "stripes") {
      stripesStrength && result.stripesStrength(stripesStrength);
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/GradientFade.js
var GradientFadeEffectAction = class extends Action {
  constructor() {
    super(...arguments);
    this._actionModel = { actionType: "gradientFade" };
  }
  /**
   * @description Sets the strength of the fade effect.
   * @param {number} strength The strength of the fade effect. (Range: 0 to 100, Server default: 20)
   */
  strength(strength) {
    this._actionModel.strength = strength;
    this._strength = strength;
    return this;
  }
  /**
   * @description Sets the mode of gradient fade.
   * @param {string | Qualifiers.GradientFade} type The mode of gradient fade.
   */
  type(type) {
    this._actionModel.type = type;
    this._type = type;
    return this;
  }
  /**
   * @description Sets the x dimension of the start point.
   * @param {number | string} x The x dimension of the start point.
   */
  horizontalStartPoint(x) {
    this._actionModel.horizontalStartPoint = x;
    return this.addQualifier(new Qualifier("x", x));
  }
  /**
   * @description Sets the y dimension of the start point.
   * @param {number | string} y The y dimension of the start point.
   */
  verticalStartPoint(y) {
    this._actionModel.verticalStartPoint = y;
    return this.addQualifier(new Qualifier("y", y));
  }
  prepareQualifiers() {
    let str = "gradient_fade";
    if (this._type) {
      str += `:${this._type}`;
    }
    if (this._strength) {
      str += `:${this._strength}`;
    }
    this.addQualifier(new Qualifier("e", str));
  }
  static fromJson(actionModel) {
    const { actionType, verticalStartPoint, horizontalStartPoint, type, strength } = actionModel;
    const result = new this();
    verticalStartPoint && result.verticalStartPoint(verticalStartPoint);
    horizontalStartPoint && result.horizontalStartPoint(horizontalStartPoint);
    type && result.type(type);
    strength && result.strength(strength);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/FadeOut.js
var FadeOutEffectAction = class extends Action {
  constructor(duration) {
    super();
    this._actionModel = { actionType: "fadeOut" };
    this.addQualifier(new Qualifier("e", new QualifierValue(["fade", `-${duration}`]).setDelimiter(":")));
    duration && (this._actionModel.length = duration);
  }
  /**
   *
   * @description Sets the duration level for the action
   * @param {string | number} duration - The duration of the effect
   */
  duration(duration) {
    this._actionModel.length = duration;
    return this.addQualifier(new Qualifier("e", new QualifierValue(["fade", `-${duration}`]).setDelimiter(":")));
  }
  static fromJson(actionModel) {
    const { length } = actionModel;
    if (length === void 0) {
      return new this(1e3);
    }
    const result = new this(length);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Colorize.js
var ColorizeEffectAction = class extends EffectActionWithLevel {
  /**
   * @description The color to use for colorization. Specify HTML name or RGB hex code. (Server default: gray)
   * @param {string} color HTML name(red, green, etc.) or RGB hex code. (Server default: gray)
   * @return {this}
   */
  color(color2) {
    this._actionModel.color = color2;
    return this.addQualifier(new Qualifier("co", new QualifierValue(prepareColor(color2))));
  }
  static fromJson(actionModel) {
    const { actionType, level, color: color2 } = actionModel;
    const result = new this(actionType, level);
    color2 && result.color(color2);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Shadow.js
var ShadowEffectAction = class extends Action {
  constructor(effectType, strength) {
    super();
    this._actionModel = {};
    this._actionModel.actionType = effectType;
    this.effectType = effectType;
    this.addQualifier(new Qualifier("e", new QualifierValue(["shadow", strength])));
  }
  /**
   * @description The strength of the shadow. (Range: 0 to 100, Server default: 40)
   * @param {number} strength
   * @return {this}
   */
  strength(strength) {
    this._actionModel.strength = strength;
    return this.addQualifier(new Qualifier("e", new QualifierValue(["shadow", strength])));
  }
  /**
   * @description The X offset the shadow
   * @param {number | SDK.ExpressionQualifier} x
   * @return {this}
   */
  offsetX(x) {
    this._actionModel.offsetX = x;
    return this.addQualifier(new Qualifier("x", new QualifierValue(x)));
  }
  /**
   * @description The Y offset the shadow
   * @param {number | SDK.ExpressionQualifier} y
   * @return {this}
   */
  offsetY(y) {
    this._actionModel.offsetY = y;
    return this.addQualifier(new Qualifier("y", new QualifierValue(y)));
  }
  /**
   * @description The color of the shadow (Server default: gray)
   * @param color
   * @return {this}
   */
  color(color2) {
    this._actionModel.color = color2;
    return this.addQualifier(new Qualifier("co", new QualifierValue(prepareColor(color2))));
  }
  static fromJson(actionModel) {
    const { actionType, strength, offsetX, offsetY, color: color2 } = actionModel;
    const result = new this(actionType, strength);
    offsetX && result.offsetX(offsetX);
    offsetY && result.offsetY(offsetY);
    color2 && result.color(color2);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/StyleTransfer.js
var StyleTransfer = class extends Action {
  /**
   * The Image Source used to create the style transfer,
   * Use the Image Source builder to quickly create a source:
   * </br>Import: {@link Qualifiers.Source|import Sources from '@cloudinary/url-gen/qualifiers/sources';}
   * </br>Create: `Source.image('dog')`
   * @param {ImageSource} imageSource
   */
  constructor(imageSource) {
    super();
    this.imageSource = imageSource;
  }
  /**
   * Determines the strength in which the styleTransfer is applied.
   * @param {number} [effectStrength] - The strength level, 1-100, default: 100
   * @return {this}
   */
  strength(effectStrength = null) {
    this.effectStrength = effectStrength;
    return this;
  }
  /**
   * More aggressively preserves the colors of the the target photo,
   * Can be used with `strength()` to enhance this behaviour
   * @param {boolean} bool
   * @return {this}
   */
  preserveColor(bool = true) {
    this.preserve = bool;
    return this;
  }
  /**
   * The `build` phase of the Action, used internally to concat all the options received into a single string.
   * The result of this method is the toString() of the imageLayer provided in the constructor.
   * @return {string}
   */
  toString() {
    const NAME = "style_transfer";
    const PRES = this.preserve ? "preserve_color" : null;
    const STRENGTH = this.effectStrength;
    const styleEffect = new Qualifier("e", new QualifierValue([NAME, PRES, STRENGTH]));
    const sourceOpenString = this.imageSource.getOpenSourceString("l");
    const imgTx = this.imageSource.getTransformation();
    const sourceTransformation = imgTx ? imgTx.toString() : "";
    return [
      sourceOpenString,
      sourceTransformation,
      `${styleEffect},fl_layer_apply`
    ].filter((a) => a).join("/");
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Dither.js
var DitherEffectAction = class extends LeveledEffectAction {
  constructor() {
    super(...arguments);
    this._actionModel = { actionType: "dither" };
  }
  /**
   *
   * @param {Qualifiers.Dither} ditherType - The dither type applied to the image
   * @return {this}
   */
  type(ditherType) {
    this._actionModel.type = ditherType;
    const qualifierEffect = this.createEffectQualifier(this.effectType, ditherType);
    this.addQualifier(qualifierEffect);
    return this;
  }
  static fromJson(actionModel) {
    const { actionType, type } = actionModel;
    const result = new this(actionType);
    type && result.type(type);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/Deshake.js
var DeshakeEffectAction = class extends LeveledEffectAction {
  constructor() {
    super(...arguments);
    this._actionModel = { actionType: "deshake" };
  }
  /**
   * The maximum number of pixels in the horizontal and vertical direction that will be addressed. (Possible values: 16, 32, 48, 64. Server default: 16)
   * @param value Possible values: 16, 32, 48, 64.  Server default: 16.
   */
  shakeStrength(value) {
    this._actionModel.pixels = value;
    const qualifierEffect = this.createEffectQualifier(this.effectType, value);
    this.addQualifier(qualifierEffect);
    return this;
  }
  static fromJson(actionModel) {
    const { actionType, pixels } = actionModel;
    const result = new this(actionType, pixels);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/pixelate/Pixelate.js
var Pixelate = class extends Action {
  constructor(squareSize) {
    super();
    this._actionModel = {};
    this._squareSize = squareSize;
    this._actionModel.actionType = "pixelate";
    this._actionModel.squareSize = squareSize;
  }
  /**
   * @description Specifies the region to piexlate.
   * @param {NamedRegion} pixelateRegion
   */
  region(pixelateRegion) {
    this._region = pixelateRegion;
    this._actionModel.region = { regionType: this._region.regionType };
    return this;
  }
  /**
   * @description Sets the squareSize of the pixelate effect.
   * @param {number | string} squareSize
   */
  squareSize(squareSize) {
    this._squareSize = squareSize;
    this._actionModel.squareSize = squareSize;
    return this;
  }
  prepareQualifiers() {
    const str = this._squareSize ? `:${this._squareSize}` : "";
    if ("_region" in this) {
      const qualifiers = this._region.qualifiers;
      qualifiers.forEach((q) => this.addQualifier(q));
      if (this._region.regionType === "custom") {
        this.addQualifier(new Qualifier("e", `pixelate_region${str}`));
      }
      if (this._region.regionType === "ocr_text") {
        this.addQualifier(new Qualifier("e", `pixelate_region${str}`));
        this.addQualifier(new Qualifier("g", `ocr_text`));
      }
      if (this._region.regionType === "faces") {
        this.addQualifier(new Qualifier("e", `pixelate_faces${str}`));
      }
    } else {
      this.addQualifier(new Qualifier("e", `pixelate${str}`));
    }
  }
  static fromJson(actionModel) {
    const { region, squareSize } = actionModel;
    const result = new this(squareSize);
    squareSize && result.squareSize(squareSize);
    if (region && region.regionType === "faces") {
      result.region(faces());
    }
    if (region && region.regionType === "custom") {
      result.region(custom());
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/EffectActions/EffectActionWithStrength.js
var EffectActionWithStrength = class extends LeveledEffectAction {
  constructor() {
    super(...arguments);
    this.LEVEL_NAME = "strength";
  }
  strength(value) {
    return this.setLevel(value);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/Blackwhite.js
var BlackwhiteEffectAction = class extends LeveledEffectAction {
  threshold(value) {
    return this.setLevel(value);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/leveled/FadeIn.js
var FadeInEffectAction = class extends Action {
  constructor(duration) {
    super();
    this._actionModel = { actionType: "fadeIn" };
    this.addQualifier(new Qualifier("e", new QualifierValue(["fade", `${duration}`]).setDelimiter(":")));
    duration && (this._actionModel.length = duration);
  }
  /**
   *
   * @description Sets the duration level for the action
   * @param {string | number} duration - The duration of the effect
   */
  duration(duration) {
    this._actionModel.length = duration;
    return this.addQualifier(new Qualifier("e", new QualifierValue(["fade", `${duration}`]).setDelimiter(":")));
  }
  static fromJson(actionModel) {
    const { length } = actionModel;
    if (length === void 0) {
      return new this(1e3);
    }
    const result = new this(length);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/RemoveBackgroundAction.js
var RemoveBackgroundAction = class extends Action {
  constructor() {
    super();
    this.overwriteQualifier();
  }
  /**
   * @description Everytime this method is called, it will overwrite the e_bgremoval qualifier with new values
   * @private
   */
  overwriteQualifier() {
    const value = ["bgremoval", this._screen ? "screen" : "", (this._colorToRemove || "").replace("#", "")];
    return this.addQualifier(new Qualifier("e", new QualifierValue(value)));
  }
  /**
   * @description The strength of the shadow. (Range: 0 to 100, Server default: 40)
   * @param {number} useScreen Boolean, defaults to true
   * @return {this}
   */
  screen(useScreen = true) {
    this._screen = useScreen;
    return this.overwriteQualifier();
  }
  /**
   * @description The color to remove from the background
   * @param {SystemColors} color
   * @return {this}
   */
  colorToRemove(color2) {
    this._colorToRemove = color2;
    return this.overwriteQualifier();
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/Theme.js
var ThemeEffect = class extends Action {
  constructor(color2) {
    super();
    this.effectName = "theme";
    this.color = color2;
  }
  /**
   * @description The sensitivity to photographic elements of an image.
   *              A value of 0 treats the whole image as non-photographic.
   *              A value of 200 treats the whole image as photographic, so no theme change is applied.
   * @param {number} photosensitivity
   * @return {this}
   */
  photosensitivity(photosensitivity) {
    this._photosensitivity = photosensitivity;
    return this;
  }
  prepareQualifiers() {
    const sensitivity = this._photosensitivity ? `:photosensitivity_${this._photosensitivity}` : "";
    const val = `${this.effectName}:color_${this.color.replace("#", "")}${sensitivity}`;
    this.addQualifier(new Qualifier("e", new QualifierValue(val)));
    return;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/BackgroundRemoval.js
var BackgroundRemoval = class extends Action {
  constructor() {
    super();
    this._actionModel.actionType = "backgroundRemoval";
  }
  fineEdges(value = true) {
    this._fineEdges = value;
    this._actionModel.fineEdges = this._fineEdges;
    return this;
  }
  hints(...values) {
    if (values.length === 1 && Array.isArray(values[0])) {
      this._hints = values[0];
    } else if (values.length) {
      this._hints = values;
    }
    if (this._hints) {
      this._actionModel.hints = this._hints;
    }
    return this;
  }
  prepareQualifiers() {
    var _a;
    let str = "background_removal";
    const params = [];
    if (this._fineEdges !== void 0) {
      params.push(new QualifierValue(`fineedges_${this._fineEdges ? "y" : "n"}`).toString());
    }
    if ((_a = this._hints) === null || _a === void 0 ? void 0 : _a.length) {
      params.push(new QualifierValue(`hints_(${this._hints.join(";")})`).toString());
    }
    if (params.length > 0) {
      str += `:${params.join(";")}`;
    }
    this.addQualifier(new Qualifier("e", str));
  }
  static fromJson(actionModel) {
    const { fineEdges, hints } = actionModel;
    const result = new this();
    if (fineEdges !== void 0) {
      result.fineEdges(fineEdges);
    }
    if (hints === null || hints === void 0 ? void 0 : hints.length) {
      result.hints(hints);
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/DropShadow.js
var DropShadow = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "dropshadow";
  }
  /**
   * @description
   * The direction the light is coming from to cause the shadow effect. (Range: 0 to 360, Server default: 215)
   * @param {number} azimuth
   * @return {this}
   */
  azimuth(azimuth) {
    this._actionModel.azimuth = azimuth;
    this._azimuth = azimuth;
    return this;
  }
  /**
   * @description
   * The height of the light source above the 'ground' to cause the shadow effect. (Range: 0 to 90, Server default: 45)
   * @param {number} elevation
   * @return {this}
   */
  elevation(elevation) {
    this._actionModel.elevation = elevation;
    this._elevation = elevation;
    return this;
  }
  /**
   * @description
   * The spread of the light source. A small number means 'point' light. A larger number means 'area' light. (Range: 0 to 100, Server default: 50)
   * @param {number} spread
   * @return {this}
   */
  spread(spread) {
    this._actionModel.spread = spread;
    this._spread = spread;
    return this;
  }
  prepareQualifiers() {
    const paramNames = ["azimuth", "elevation", "spread"];
    const paramValues = [this._azimuth, this._elevation, this._spread];
    const paramString = paramValues.map((value, index) => value !== void 0 ? `${paramNames[index]}_${value}` : "").filter(Boolean).join(";");
    this.addQualifier(new Qualifier("e", new QualifierValue(["dropshadow", paramString]).setDelimiter(":")));
  }
  static fromJson(actionModel) {
    const { azimuth, elevation, spread } = actionModel;
    const result = new this();
    azimuth && result.azimuth(azimuth);
    elevation && result.elevation(elevation);
    spread && result.spread(spread);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/GenerativeRemove.js
var GenerativeRemove = class extends Action {
  constructor() {
    super();
    this._prompts = [];
    this._regions = [];
    this._detectMultiple = false;
    this._removeShadow = false;
    this._actionModel.actionType = "generativeRemove";
  }
  prompt(...value) {
    this._prompts = value;
    if (this._prompts.length > 0) {
      this._actionModel.prompts = this._prompts;
    }
    return this;
  }
  region(...value) {
    this._regions = value;
    if (this._regions.length > 0) {
      this._actionModel.regions = this._regions.map((region) => region.toJson());
    }
    return this;
  }
  detectMultiple(value = true) {
    this._detectMultiple = value;
    if (this._detectMultiple) {
      this._actionModel.detectMultiple = this._detectMultiple;
    }
    return this;
  }
  removeShadow(value = true) {
    this._removeShadow = value;
    if (this._removeShadow) {
      this._actionModel.removeShadow = this._removeShadow;
    }
    return this;
  }
  prepareQualifiers() {
    const qualifierValue = new QualifierValue().setDelimiter(";");
    switch (true) {
      case this._prompts.length > 0: {
        qualifierValue.addValue(this.preparePromptValue());
        break;
      }
      case this._regions.length > 0: {
        qualifierValue.addValue(this.prepareRegionValue());
        break;
      }
    }
    if (this._detectMultiple) {
      qualifierValue.addValue("multiple_true");
    }
    if (this._removeShadow) {
      qualifierValue.addValue("remove-shadow_true");
    }
    this.addQualifier(new Qualifier("e", `gen_remove:${qualifierValue.toString()}`));
  }
  preparePromptValue() {
    const prompts = this._prompts;
    const qualifierValue = new QualifierValue().setDelimiter(";");
    if (prompts.length === 1) {
      qualifierValue.addValue(`prompt_${prompts[0]}`);
    } else {
      qualifierValue.addValue(`prompt_(${prompts.join(";")})`);
    }
    return qualifierValue;
  }
  prepareRegionValue() {
    const regions = this._regions;
    const qualifierValue = new QualifierValue();
    if (regions.length === 1) {
      const singleRegion = regions[0].toString();
      qualifierValue.addValue(`region_${singleRegion}`);
    } else {
      const regionList = regions.map((region) => region.toString());
      qualifierValue.addValue(`region_(${regionList.join(";")})`);
    }
    return qualifierValue;
  }
  static fromJson(actionModel) {
    const { prompts, regions, detectMultiple, removeShadow } = actionModel;
    const result = new this();
    if (regions) {
      result.region(...regions.map(({ x, y, width, height }) => new RectangleRegion(x, y, width, height)));
    }
    if (prompts) {
      result.prompt(...prompts);
    }
    if (detectMultiple) {
      result.detectMultiple(detectMultiple);
    }
    if (removeShadow) {
      result.removeShadow(removeShadow);
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/GenerativeReplace.js
var GenerativeReplace = class extends Action {
  constructor() {
    super();
    this._preserveGeometry = false;
    this._detectMultiple = false;
    this._actionModel.actionType = "generativeReplace";
  }
  from(value) {
    this._from = value;
    this._actionModel.from = value;
    return this;
  }
  to(value) {
    this._to = value;
    this._actionModel.to = value;
    return this;
  }
  preserveGeometry(value = true) {
    this._preserveGeometry = value;
    if (value) {
      this._actionModel.preserveGeometry = true;
    }
    return this;
  }
  detectMultiple(value = true) {
    this._detectMultiple = value;
    if (this._detectMultiple) {
      this._actionModel.detectMultiple = this._detectMultiple;
    }
    return this;
  }
  prepareQualifiers() {
    let str = `gen_replace:from_${this._from};to_${this._to}`;
    if (this._preserveGeometry) {
      str += `;preserve-geometry_true`;
    }
    if (this._detectMultiple) {
      str += `;multiple_true`;
    }
    this.addQualifier(new Qualifier("e", str));
  }
  static fromJson(actionModel) {
    const { from, to, preserveGeometry, detectMultiple } = actionModel;
    const result = new this();
    result.from(from);
    result.to(to);
    if (preserveGeometry) {
      result.preserveGeometry();
    }
    if (detectMultiple) {
      result.detectMultiple();
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/GenerativeRecolor.js
var GenerativeRecolor = class extends Action {
  constructor(prompts, color2) {
    super();
    this._prompts = [];
    this._detectMultiple = false;
    this.multiple = this.detectMultiple.bind(this);
    this._prompts = Array.isArray(prompts) ? prompts : [prompts];
    this._toColor = color2;
    this._actionModel.actionType = "generativeRecolor";
    this._actionModel.prompts = this._prompts;
    this._actionModel.toColor = this._toColor;
  }
  detectMultiple(value = true) {
    this._detectMultiple = value;
    if (this._detectMultiple) {
      this._actionModel.detectMultiple = this._detectMultiple;
    }
    return this;
  }
  prepareQualifiers() {
    const qualifierValue = new QualifierValue().setDelimiter(";");
    if (this._prompts.length) {
      qualifierValue.addValue(this.preparePromptValue());
    }
    if (this._toColor) {
      const formattedColor = this._toColor.match(/^#/) ? this._toColor.substr(1) : this._toColor;
      qualifierValue.addValue(`to-color_${formattedColor}`);
    }
    if (this._detectMultiple) {
      qualifierValue.addValue("multiple_true");
    }
    this.addQualifier(new Qualifier("e", `gen_recolor:${qualifierValue.toString()}`));
  }
  preparePromptValue() {
    const prompts = this._prompts;
    const qualifierValue = new QualifierValue().setDelimiter(";");
    if (prompts.length === 1) {
      qualifierValue.addValue(`prompt_${prompts[0]}`);
    } else {
      qualifierValue.addValue(`prompt_(${prompts.join(";")})`);
    }
    return qualifierValue;
  }
  static fromJson(actionModel) {
    const { prompts, detectMultiple, toColor } = actionModel;
    const result = new this(prompts, toColor);
    if (detectMultiple) {
      result.detectMultiple(detectMultiple);
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect.js
function blur(blurLevel) {
  return new BlurAction(blurLevel);
}
function grayscale() {
  return new SimpleEffectAction("grayscale");
}
function sepia(level) {
  return new EffectActionWithLevel("sepia", level);
}
function shadow(shadowLevel) {
  return new ShadowEffectAction("shadow", shadowLevel);
}
function colorize(colorizeLevel) {
  return new ColorizeEffectAction("colorize", colorizeLevel);
}
function oilPaint(oilPaintLevel) {
  return new EffectActionWithStrength("oil_paint", oilPaintLevel);
}
function artisticFilter(artisticFilterType) {
  return new SimpleEffectAction("art", artisticFilterType);
}
function cartoonify(cartoonifyLevel) {
  return new CartoonifyEffect("cartoonify", cartoonifyLevel);
}
function outline() {
  return new EffectOutline();
}
function styleTransfer(imageSource) {
  return new StyleTransfer(imageSource);
}
function boomerang() {
  return new SimpleEffectAction("boomerang");
}
function advancedRedEye() {
  return new SimpleEffectAction("adv_redeye");
}
function blackwhite(level) {
  return new BlackwhiteEffectAction("blackwhite", level);
}
function negate() {
  return new SimpleEffectAction("negate");
}
function redEye() {
  return new SimpleEffectAction("redeye");
}
function reverse() {
  return new SimpleEffectAction("reverse");
}
function accelerate(speedIncreasePercent) {
  return new AccelerationEffectAction(speedIncreasePercent);
}
function fadeIn(fadeLength) {
  return new FadeInEffectAction(fadeLength);
}
function fadeOut(fadeLength) {
  return new FadeOutEffectAction(fadeLength);
}
function loop(additionalLoops) {
  return new LoopEffectAction("loop", additionalLoops);
}
function makeTransparent(tolerance) {
  return new MakeTransparentEffectAction("make_transparent", tolerance);
}
function noise(percentage) {
  return new EffectActionWithLevel("noise", percentage);
}
function vignette(strength) {
  return new EffectActionWithStrength("vignette", strength);
}
function dither(ditherType) {
  return new DitherEffectAction("ordered_dither", ditherType);
}
function vectorize() {
  return new VectorizeEffectAction();
}
function gradientFade() {
  return new GradientFadeEffectAction();
}
function assistColorBlind() {
  return new AssistColorBlindEffectAction();
}
function simulateColorBlind() {
  return new SimulateColorBlindEffectAction();
}
function deshake(pixels) {
  return new DeshakeEffectAction("deshake", pixels);
}
function transition() {
  return new SimpleEffectAction("transition");
}
function pixelate(squareSize) {
  return new Pixelate(squareSize);
}
function removeBackground() {
  return new RemoveBackgroundAction();
}
function backgroundRemoval() {
  return new BackgroundRemoval();
}
function dropShadow() {
  return new DropShadow();
}
function generativeRemove() {
  return new GenerativeRemove();
}
function generativeReplace() {
  return new GenerativeReplace();
}
function generativeRecolor(prompts, color2) {
  return new GenerativeRecolor(prompts, color2);
}
function generativeRestore() {
  return new SimpleEffectAction("gen_restore");
}
function upscale() {
  return new SimpleEffectAction("upscale");
}
function theme(color2) {
  return new ThemeEffect(color2);
}
function enhance() {
  return new SimpleEffectAction("enhance");
}
var Effect = {
  pixelate,
  deshake,
  boomerang,
  advancedRedEye,
  blackwhite,
  negate,
  redEye,
  reverse,
  accelerate,
  fadeIn,
  fadeOut,
  loop,
  makeTransparent,
  noise,
  vignette,
  blur,
  grayscale,
  sepia,
  shadow,
  colorize,
  oilPaint,
  artisticFilter,
  cartoonify,
  outline,
  styleTransfer,
  gradientFade,
  vectorize,
  assistColorBlind,
  simulateColorBlind,
  transition,
  dither,
  removeBackground,
  backgroundRemoval,
  dropShadow,
  generativeRemove,
  generativeReplace,
  generativeRecolor,
  generativeRestore,
  upscale,
  theme,
  enhance
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/rotate/RotateAction.js
var QUALIFIER_KEY = "a";
var RotateAction = class extends Action {
  constructor(angle) {
    super();
    this._actionModel = {};
    this.addQualifier(new Qualifier(QUALIFIER_KEY, angle));
    if (angle) {
      this._actionModel.actionType = "rotateByAngle";
      this._actionModel.angle = angle;
    }
  }
  /**
   * @description Rotates an asset using a defined mode.
   * @param {Qualifiers.RotationMode | RotationModeType | string} rotationMode
   * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
   * possible values
   * @return {this}
   */
  mode(rotationMode) {
    this._actionModel.actionType = "rotateByMode";
    this._actionModel.mode = rotationMode;
    return this.addValueToQualifier(QUALIFIER_KEY, rotationMode);
  }
  /**
   * @description Rotates an asset by the specified degrees.
   * @param {number} degrees rotation in degrees e.g 90, 45, 33
   * @return {this}
   */
  angle(degrees) {
    this._actionModel.actionType = "rotateByAngle";
    this._actionModel.angle = degrees;
    return this.addValueToQualifier(QUALIFIER_KEY, degrees);
  }
  static fromJson(actionModel) {
    const { angle, mode: mode2 } = actionModel;
    const result = mode2 ? new this().mode(mode2) : new this(angle);
    return result;
  }
};
var RotateAction_default = RotateAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/rotate.js
function mode(rotationMode) {
  return new RotateAction_default().mode(rotationMode);
}
function byAngle(angle) {
  return new RotateAction_default(angle);
}
var Rotate = { byAngle, mode };

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/FillLightAction.js
var FillLightAction = class extends Action {
  constructor() {
    super();
  }
  /**
   * @description Sets the level of adjustment
   * @param {number} lvl How much to blend the adjusted fill light, where 0 means only use the original and 100 means only use the adjusted fill light result. (Range: 0 to 100, Server default: 100)
   */
  blend(blend) {
    this.lvl = blend;
    return this;
  }
  /**
   * @description Sets the level of the bias
   * @param {number} biasLvl The bias to apply to the fill light effect (Range: -100 to 100, Server default: 0).
   */
  bias(biasLvl) {
    this.biasLvl = biasLvl;
    return this;
  }
  prepareQualifiers() {
    const qualifierValue = new QualifierValue(["fill_light", this.lvl, this.biasLvl]).setDelimiter(":");
    this.addQualifier(new Qualifier("e", qualifierValue));
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/RecolorAction.js
var RecolorAction = class extends Action {
  constructor(recolorMatrix) {
    super();
    this.matrix = recolorMatrix;
    const flat = [];
    for (let row = 0; row < recolorMatrix.length; row++) {
      for (let col = 0; col < recolorMatrix[row].length; col++) {
        flat.push(recolorMatrix[row][col].toString());
      }
    }
    const qualifierValue = new QualifierValue(["recolor", ...flat]).setDelimiter(":");
    this.addQualifier(new Qualifier("e", qualifierValue));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/OpacityAdjustAction.js
var OpacityAdjustAction = class extends Action {
  constructor(level) {
    super();
    this._actionModel = { actionType: "opacity" };
    this.level = level;
    this._actionModel.level = level;
    this.addQualifier(new Qualifier("o", level));
  }
  static fromJson(actionModel) {
    const { level } = actionModel;
    return new this(level);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/By3dLutAction.js
var By3dLutAction = class extends Action {
  constructor(publicId) {
    super();
    this.publicId = publicId;
  }
  /**
   * Returns a string representation of the action
   * @return {string}
   */
  toString() {
    return `l_lut:${this.publicId}/fl_layer_apply`;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/ImproveAction.js
var ImproveAction = class extends Action {
  constructor() {
    super();
    this._actionModel = { actionType: "improve" };
  }
  /**
   *
   * @description The improve mode.
   * @param {Qualifiers.ImproveMode | string} value
   */
  mode(value) {
    this.modeValue = value;
    this._actionModel.mode = value;
    return this;
  }
  /**
   * @description How much to blend the improved result with the original image, where 0 means only use the original and 100 means only use the improved result. (Range: 0 to 100, Server default: 100)
   * @param {number} value
   */
  blend(value) {
    this.blendValue = value;
    this._actionModel.blend = value;
    return this;
  }
  prepareQualifiers() {
    const qualifierValue = new QualifierValue(["improve", this.modeValue, this.blendValue]).setDelimiter(":");
    this.addQualifier(new Qualifier("e", qualifierValue));
    return this;
  }
  static fromJson(actionModel) {
    const { mode: mode2, blend } = actionModel;
    const result = new this();
    mode2 && result.mode(mode2);
    blend && result.blend(blend);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/ReplaceColorAction.js
var ReplaceColorAction = class extends Action {
  /**
   * @description Sets the target output color.
   * @param {string} toColor - The HTML name or RGB/A hex code of the target output color.
   */
  constructor(toColor) {
    super();
    this.targetColor = toColor;
  }
  /**
   * @description Sets the tolerance threshold.
   * @param {number} toleranceLevel - The tolerance threshold (a radius in the LAB color space) from the input color, </br>
   *                                  representing the span of colors that should be replaced with a correspondingly adjusted version of the target output color. </br>
   *                                  Larger values result in replacing more colors within the image. </br>
   *                                  The more saturated the original input color, the more a change in value will impact the result (Server default: 50).
   * @return {this}
   */
  tolerance(toleranceLevel) {
    this.toleranceLevel = toleranceLevel;
    return this;
  }
  /**
   * @description Sets the base input color to map.
   * @param {string} baseColor - The HTML name or RGB/A hex code of the base input color to map (Server default: the most prominent high-saturation color in the image).
   * @return {this}
   */
  fromColor(baseColor) {
    this.baseColor = baseColor;
    return this;
  }
  prepareQualifiers() {
    const targetColor = this.targetColor && this.targetColor.toString().replace("#", "");
    const baseColor = this.baseColor && this.baseColor.toString().replace("#", "");
    const qualifierValue = new QualifierValue(["replace_color", targetColor, this.toleranceLevel, baseColor]);
    this.addQualifier(new Qualifier("e", qualifierValue));
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/effect/EffectActions/EffectActionWithBlend.js
var EffectActionWithBlend = class extends LeveledEffectAction {
  blend(value) {
    return this.setLevel(value);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust/simple/ViesusCorrectAdjustAction.js
var ViesusCorrectAdjustAction = class extends Action {
  /**
   * @description Enhances the image without correcting for red eye.
   */
  noRedEye() {
    this._noRedEye = true;
    return this;
  }
  /**
   * @description Applies saturation to the skin tones in the image.
   * @param level The saturation level. (Range: -100 to 100, Server default: 50).
   */
  skinSaturation(level) {
    this._skinSaturation = true;
    if (level) {
      this._skinSaturationLevel = level;
    }
    return this;
  }
  prepareQualifiers() {
    let value = "viesus_correct";
    if (this._noRedEye) {
      value += ":no_redeye";
    }
    if (this._skinSaturation) {
      value += ":skin_saturation";
      if (typeof this._skinSaturationLevel !== "undefined") {
        value += `_${this._skinSaturationLevel}`;
      }
    }
    this.addQualifier(new Qualifier("e", value));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/adjust.js
function tint(value = "") {
  return new SimpleEffectAction("tint", value);
}
function brightness(level) {
  return new EffectActionWithLevel("brightness", level);
}
function viesusCorrect() {
  return new ViesusCorrectAdjustAction();
}
function red(level) {
  return new EffectActionWithLevel("red", level);
}
function sharpen(strength) {
  return new EffectActionWithStrength("sharpen", strength);
}
function saturation(level) {
  return new EffectActionWithLevel("saturation", level);
}
function contrast(level) {
  return new EffectActionWithLevel("contrast", level);
}
function gamma(level) {
  return new EffectActionWithLevel("gamma", level);
}
function blue(level) {
  return new EffectActionWithLevel("blue", level);
}
function brightnessHSB(level) {
  return new EffectActionWithLevel("brightness_hsb", level);
}
function opacityThreshold(level) {
  return new EffectActionWithLevel("opacity_threshold", level);
}
function autoColor(blend) {
  return new EffectActionWithBlend("auto_color", blend);
}
function autoBrightness(blend) {
  return new EffectActionWithBlend("auto_brightness", blend);
}
function hue(level) {
  return new EffectActionWithLevel("hue", level);
}
function green(level) {
  return new EffectActionWithLevel("green", level);
}
function unsharpMask(strength) {
  return new EffectActionWithStrength("unsharp_mask", strength);
}
function vibrance(strength) {
  return new EffectActionWithStrength("vibrance", strength);
}
function autoContrast(blend) {
  return new EffectActionWithBlend("auto_contrast", blend);
}
function opacity(level) {
  return new OpacityAdjustAction(level);
}
function improve() {
  return new ImproveAction();
}
function replaceColor(toColor) {
  return new ReplaceColorAction(toColor);
}
function recolor(matrix) {
  return new RecolorAction(matrix);
}
function fillLight() {
  return new FillLightAction();
}
function by3dLut(publicId) {
  return new By3dLutAction(publicId);
}
var Adjust = {
  brightness,
  viesusCorrect,
  opacity,
  red,
  sharpen,
  improve,
  saturation,
  contrast,
  gamma,
  green,
  blue,
  brightnessHSB,
  hue,
  autoBrightness,
  autoColor,
  autoContrast,
  vibrance,
  unsharpMask,
  opacityThreshold,
  replaceColor,
  recolor,
  fillLight,
  by3dLut,
  tint
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/blendMode/BlendModeQualifier.js
var BlendModeQualifier = class extends Action {
  constructor(blendMode, level) {
    super();
    this.addQualifier(new Qualifier("e", new QualifierValue([blendMode, level])));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/IImageSourceModel.js
function isIImageSourceModel(obj) {
  return obj && obj.sourceType === "image";
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/IFetchSourceModel.js
function isIFetchSourceModel(obj) {
  return obj && obj.sourceType === "fetch";
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/ITextSourceModel.js
function isITextSourceModel(obj) {
  return obj && obj.sourceType === "text";
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/IAudioSourceModel.js
function isIAudioSourceModel(obj) {
  return obj && obj.sourceType === "audio";
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createSourceFromModel.js
function createSourceFromModel(source3, transformationFromJson) {
  if (isITextSourceModel(source3)) {
    return TextSource.fromJson(source3, transformationFromJson);
  } else if (isIImageSourceModel(source3)) {
    return ImageSource.fromJson(source3, transformationFromJson);
  } else if (isIFetchSourceModel(source3)) {
    return FetchSource.fromJson(source3, transformationFromJson);
  } else if (isIAudioSourceModel(source3)) {
    return AudioSource.fromJson(source3, transformationFromJson);
  } else {
    return VideoSource.fromJson(source3, transformationFromJson);
  }
}

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createPositionFromModel.js
function createPositionFromModel(position) {
  const { offsetX, offsetY, tiled: tiled2, allowOverflow, gravity } = position;
  const result = new PositionQualifier();
  if (offsetX) {
    result.offsetX(offsetX);
  }
  if (offsetY) {
    result.offsetY(offsetY);
  }
  if (tiled2) {
    result.tiled();
  }
  if (allowOverflow != null) {
    result.allowOverflow(allowOverflow);
  }
  if (gravity) {
    result.gravity(createGravityFromModel(gravity));
  }
  return result;
}

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/video/TimelinePosition.js
var TimelinePosition = class extends Action {
  constructor() {
    super();
    this._actionModel = {};
  }
  /**
   * @param {string | number} startOffset
   */
  startOffset(startOffset) {
    const startOffsetQualifier = new Qualifier("so", startOffset);
    this.addQualifier(startOffsetQualifier);
    this._actionModel.startOffset = startOffsetQualifier.qualifierValue.toString();
    return this;
  }
  /**
   * @param {string | number} endOffset
   */
  endOffset(endOffset) {
    const endOffsetQualifier = new Qualifier("eo", endOffset);
    this.addQualifier(endOffsetQualifier);
    this._actionModel.endOffset = endOffsetQualifier.qualifierValue.toString();
    return this;
  }
  /**
   * @param {string | number} duration
   */
  duration(duration) {
    const durationQualifier = new Qualifier("du", duration);
    this.addQualifier(durationQualifier);
    this._actionModel.duration = durationQualifier.qualifierValue.toString();
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/internal/models/createTimelinePositionFromModel.js
function createTimelinePositionFromModel(timelinePosition) {
  const { startOffset, endOffset, duration } = timelinePosition;
  const result = new TimelinePosition();
  if (startOffset) {
    result.startOffset(startOffset);
  }
  if (endOffset) {
    result.endOffset(endOffset);
  }
  if (duration) {
    result.duration(duration);
  }
  return result;
}

// node_modules/@cloudinary/transformation-builder-sdk/actions/layer/LayerAction.js
var LayerAction = class extends Action {
  /**
   * @description Creates a LayerAction to be used with overlays and underlays
   * @param {ImageSource | TextSource | VideoSource} layerSource The Source used for the layer, use the builders provided {@link Qualifiers.Source|here}
   */
  constructor(layerSource) {
    super();
    this.source = layerSource;
    this._actionModel = {
      actionType: "overlay",
      source: layerSource.toJson()
    };
  }
  /**
   * @description Sets the layerType to 'u' (underlay) or 'l' (overlay).
   * @param {'u' | 'l'} type
   * @return {this}
   */
  setLayerType(type) {
    this.layerType = type;
    this._actionModel.actionType = type === "u" ? "underlay" : "overlay";
    return this;
  }
  /**
   * @description Sets the timeline position of the video layer
   * @param {Qualifiers.TimelinePosition} timelinePosition
   * @return {this}
   */
  timeline(timelinePosition) {
    this._timelinePosition = timelinePosition;
    this._actionModel.timelinePosition = timelinePosition.toJson();
    return this;
  }
  /**
   * @description Sets the position of the layer
   * @param {Qualifiers.Position} position
   * @return {this}
   */
  position(position) {
    this._position = position;
    this._actionModel.position = position.toJson();
    return this;
  }
  /**
   * @description Specifies how to blend the image overlay with the base overlay
   * @param {Qualifiers.BlendMode|BlendModeType} blendMode
   * @return {this}
   */
  blendMode(blendMode) {
    this._blendMode = blendMode;
    const [mode2, level] = `${blendMode}`.replace("e_", "").split(":");
    if (mode2 === "anti_removal") {
      this._actionModel.blendMode = level ? { blendModeType: "antiRemoval", level } : { blendModeType: "antiRemoval" };
    } else {
      this._actionModel.blendMode = { blendModeType: mode2 };
    }
    return this;
  }
  /**
   * @private
   * @description
   * Closes a layer (layers are built in three stages -> /Open/Transform/Close).
   * @return {SDK.Action}
   */
  closeLayer() {
    var _a, _b, _c, _d;
    const bit = new Action().addFlag(new FlagQualifier("layer_apply"));
    (_a = this._position) === null || _a === void 0 ? void 0 : _a.qualifiers.forEach((qualifier) => {
      bit.addQualifier(qualifier);
    });
    (_b = this._position) === null || _b === void 0 ? void 0 : _b.flags.forEach((flag) => {
      bit.addFlag(flag);
    });
    if (typeof this._blendMode === "string") {
      bit.addQualifier(new Qualifier("e", this._blendMode));
    } else {
      (_c = this._blendMode) === null || _c === void 0 ? void 0 : _c.qualifiers.forEach((qualifier) => {
        bit.addQualifier(qualifier);
      });
    }
    (_d = this._timelinePosition) === null || _d === void 0 ? void 0 : _d.qualifiers.forEach((qualifier) => {
      bit.addQualifier(qualifier);
    });
    return bit;
  }
  /**
   * @private
   * @description
   * Opens a layer (layers are built in three stages -> /Open/Transform/Close).
   * @return string
   */
  openLayer() {
    return `${this.source.getOpenSourceString(this.layerType)}`;
  }
  /**
   * @description
   * Serializes the Layer to a string
   * @return {string}
   */
  toString() {
    return [
      this.openLayer(),
      this.source.getTransformation() && this.source.getTransformation().toString(),
      this.closeLayer()
    ].filter((a) => a).join("/");
  }
  static fromJson(actionModel, transformationFromJson) {
    const { source: source3, actionType, position, timelinePosition, blendMode } = actionModel;
    const sourceInstance = createSourceFromModel(source3, transformationFromJson);
    const result = new this(sourceInstance);
    const layerType = actionType === "overlay" ? "l" : "u";
    result.setLayerType(layerType);
    if (position) {
      result.position(createPositionFromModel(position));
    }
    if (timelinePosition) {
      result.timeline(createTimelinePositionFromModel(timelinePosition));
    }
    if (blendMode) {
      const blendModeType = ACTION_TYPE_TO_BLEND_MODE_MAP[blendMode.blendModeType] || blendMode.blendModeType;
      if (blendMode === null || blendMode === void 0 ? void 0 : blendMode.level) {
        result.blendMode(new BlendModeQualifier(blendModeType, blendMode.level));
      } else {
        result.blendMode(new BlendModeQualifier(blendModeType));
      }
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/overlay.js
function source(source3) {
  return new LayerAction(source3).setLayerType("l");
}
var Overlay = { source };

// node_modules/@cloudinary/transformation-builder-sdk/actions/underlay.js
function source2(source3) {
  return new LayerAction(source3).setLayerType("u");
}
var Underlay = { source: source2 };

// node_modules/@cloudinary/transformation-builder-sdk/actions/namedTransformation/NamedTransformationAction.js
var NamedTransformationAction = class extends Action {
  /**
   *
   * @param {string} name The name of the named transformation
   */
  constructor(name2) {
    super();
    this.addQualifier(new Qualifier("t", name2));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/namedTransformation.js
function name(name2) {
  return new NamedTransformationAction(name2);
}
var NamedTransformation = { name };

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery/DeliveryQualityAction.js
var DeliveryQualityAction = class extends DeliveryAction {
  /**
   * @param {Qualifiers.Quality} qualityValue a Quality value
   */
  constructor(qualityValue) {
    super("q", qualityValue.toString(), "level");
  }
  /**
   * Selet the Chroma sub sampling</br>
   * <b>Learn more</b>: {@link https://cloudinary.com/documentation/image_optimization#toggle_chroma_subsampling|Toggling chroma subsampling}
   * @param {420 | 444 | number} type The chroma sub sampling type
   */
  chromaSubSampling(type) {
    this._actionModel.chromaSubSampling = CHROMA_VALUE_TO_CHROMA_MODEL_ENUM[type];
    const qualityWithSubSampling = new QualifierValue([this._actionModel.level, type]);
    qualityWithSubSampling.setDelimiter(":");
    return this.addQualifier(new Qualifier("q", qualityWithSubSampling));
  }
  /**
   * Controls the final quality by setting a maximum quantization percentage
   * @param {number} val
   */
  quantization(val) {
    this._actionModel.quantization = val;
    const qualityWithQuantization = new QualifierValue([this._actionModel.level, `qmax_${val}`]).setDelimiter(":");
    return this.addQualifier(new Qualifier("q", qualityWithQuantization));
  }
  static fromJson(actionModel) {
    const { level, chromaSubSampling, quantization } = actionModel;
    const levelType = ACTION_TYPE_TO_QUALITY_MODE_MAP[level] || level;
    const result = new this(levelType);
    if (chromaSubSampling) {
      const chromaValue = CHROMA_MODEL_ENUM_TO_CHROMA_VALUE[chromaSubSampling.toUpperCase()];
      chromaValue && result.chromaSubSampling(+chromaValue);
    }
    quantization && result.quantization(quantization);
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery/DeliveryColorSpaceFromICCAction.js
var DeliveryColorSpaceFromICCAction = class extends Action {
  /**
   * @param {string} publicId
   */
  constructor(publicId) {
    super();
    this._actionModel = {};
    this._actionModel.actionType = "colorSpaceFromICC";
    this._actionModel.publicId = publicId;
    const qualifierValue = new QualifierValue(["icc", publicId]).setDelimiter(":");
    this.addQualifier(new Qualifier("cs", qualifierValue));
  }
  static fromJson(actionModel) {
    const { publicId } = actionModel;
    return new this(publicId);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery/DeliveryColorSpaceAction.js
var DeliveryColorSpaceAction = class extends Action {
  /**
   * Create a new DeliveryColorSpaceAction
   * @param mode
   */
  constructor(mode2) {
    super();
    this._actionModel = {};
    this._actionModel = {
      actionType: "colorSpace",
      mode: COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP[mode2] || mode2
    };
    this.addQualifier(new Qualifier("cs", ColorSpace[mode2] ? ColorSpace[mode2]() : mode2));
  }
  static fromJson(actionModel) {
    const { mode: mode2 } = actionModel;
    const colorSpaceMode = COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP[mode2] || mode2;
    return new this(colorSpaceMode);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery/DeliveryDPRAction.js
var DeliveryDPRAction = class extends Action {
  /**
   * Create a new DeliveryDPRAction
   * @param dprValue
   */
  constructor(dprValue) {
    super();
    this._actionModel = { actionType: "dpr" };
    const dprAsFloat = toFloatAsString(dprValue);
    this._actionModel.dpr = dprAsFloat;
    this.addQualifier(new Qualifier("dpr", dprAsFloat));
  }
  static fromJson(actionModel) {
    const { dpr: dpr2 } = actionModel;
    return new this(dpr2);
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/delivery.js
function format(format2) {
  return new DeliveryFormatAction("f", format2);
}
function dpr(dpr2) {
  return new DeliveryDPRAction(dpr2);
}
function quality(qualityType) {
  return new DeliveryQualityAction(qualityType);
}
function density(value) {
  return new DeliveryAction("dn", value, "density");
}
function defaultImage(publicIdWithExtension) {
  return new DeliveryAction("d", publicIdWithExtension, "defaultImage");
}
function colorSpace(mode2) {
  return new DeliveryColorSpaceAction(mode2);
}
function colorSpaceFromICC(publicId) {
  return new DeliveryColorSpaceFromICCAction(publicId);
}
var Delivery = {
  format,
  dpr,
  density,
  defaultImage,
  colorSpace,
  colorSpaceFromICC,
  quality
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/customFunction/CustomFunctionAction.js
var CustomFunctionAction = class extends Action {
  /**
   *
   * @param {string} fn The custom function to use, can be a URL or a publicID
   */
  constructor(fn) {
    super();
    this.fn = fn;
  }
  encodeCustomFunctionString(fn) {
    const encodedSource = base64Encode(fn);
    return encodedSource;
  }
  /**
   * Use a WASM as a custom function,
   * Used with the builders of `remote` and `wasm` from {@link Actions.CustomFunction|Custom functions}
   */
  asWasm() {
    this.mode = "wasm";
    return this;
  }
  /**
   * Use a remote URL as a custom function
   * Used with the builders of `remote` and `wasm` from {@link Actions.CustomFunction|Custom functions}
   */
  asRemote() {
    this.mode = "remote";
    return this;
  }
  prepareQualifiers() {
    this.encodedFn = this.fn;
    if (this.mode === "remote") {
      this.encodedFn = this.encodeCustomFunctionString(this.fn);
    }
    return this.addQualifier(new Qualifier("fn", new QualifierValue([this.pre, this.mode, this.encodedFn])));
  }
  toString() {
    return super.toString().replace(/\//g, ":");
  }
};
var CustomFunctionAction_default = CustomFunctionAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/customFunction/RemoteAction.js
var RemoteAction = class extends CustomFunctionAction_default {
  constructor(fn) {
    super(fn);
  }
  preprocess() {
    this.pre = "pre";
    return this;
  }
};
var RemoteAction_default = RemoteAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/customFunction.js
function remote(path) {
  return new RemoteAction_default(path).asRemote();
}
function wasm(publicID) {
  return new CustomFunctionAction_default(publicID).asWasm();
}
var CustomFunction = { remote, wasm };

// node_modules/@cloudinary/transformation-builder-sdk/actions/videoEdit/TrimAction.js
var TrimAction = class extends Action {
  constructor() {
    super();
    this._actionModel = {
      actionType: "trimVideo"
    };
  }
  /**
   *
   * @description Support Percentages in values (30% -> 30p)
   * @param {string|number} val
   * @private
   * @return {string}
   */
  parseVal(val) {
    return typeof val === "number" ? val : val.replace("%", "p");
  }
  /**
   * @description Sets the starting position of the part of the video to keep when trimming videos.
   *
   * @param {string|number} offset The starting position of the part of the video to keep. This can be specified as a
   *                           float representing the time in seconds or a string representing the percentage of the
   *                           video length (for example, "30%" or "30p").
   * @return {this}
   */
  startOffset(offset) {
    this._actionModel.startOffset = getAuto(offset) || +offset;
    return this.addQualifier(new Qualifier("so", this.parseVal(offset)));
  }
  /**
   * @description Sets the end position of the part of the video to keep when trimming videos.
   *
   * @param {string|number} offset The end position of the part of the video to keep. This can be specified as a
   *                         float representing the time in seconds or a string representing the percentage of the
   *                         video length (for example, "30%" or "30p").
   * @return {this}
   */
  endOffset(offset) {
    this._actionModel.endOffset = getAuto(offset) || +offset;
    return this.addQualifier(new Qualifier("eo", this.parseVal(offset)));
  }
  /**
   * @description Sets the duration of the video to keep.
   *
   * @param {string|number} duration The length of the part of the video to keep. This can be specified as a float
   *                        representing the time in seconds or a string representing the percentage of the
   *                        video length (for example, "30%" or "30p").
   * @return {this}
   */
  duration(duration) {
    this._actionModel.duration = duration;
    return this.addQualifier(new Qualifier("du", this.parseVal(duration)));
  }
  static fromJson(actionModel) {
    const { duration, startOffset, endOffset } = actionModel;
    const result = new this();
    if (duration != null) {
      result.duration(duration);
    }
    if (startOffset != null) {
      result.startOffset(startOffset);
    }
    if (endOffset != null) {
      result.endOffset(endOffset);
    }
    return result;
  }
};
var getAuto = (value) => value === "auto" ? value : null;
var TrimAction_default = TrimAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/videoEdit/ConcatenateAction.js
var ConcatenateAction = class extends Action {
  /**
   *
   * @param {Qualifiers.Source.VideoSource | Qualifiers.Source.ImageSource | Qualifiers.Source.FetchSource} source
   *         the Source to concatenate
   */
  constructor(source3) {
    super();
    this._actionModel = {
      actionType: "concatenate",
      source: source3.toJson()
    };
    this.concatSource = source3;
  }
  /**
   * @description Sets the transition between a video and a concatenated source
   * @param {Qualifiers.Transition.VideoSource} source The source to concatenate.
   * @return {this}
   */
  transition(source3) {
    this._actionModel.transition = source3.toJson();
    this._transition = source3;
    return this;
  }
  /**
   * @description Prepend the concatenated video - Adds the video before the original
   * @return {this}
   */
  prepend() {
    this._actionModel.prepend = true;
    this._prepend = true;
    return this;
  }
  /**
   * The duration in seconds
   * @param {number} sec
   * @return {this}
   */
  duration(sec) {
    this._actionModel.duration = sec;
    this._duration = sec;
    return this;
  }
  /**
   * @description Get the transitionString for the toString() method
   * @return {string}
   */
  getTransitionString() {
    const transTx = this._transition.getTransformation();
    return [
      `e_transition,${this._transition.getOpenSourceString("l")}`,
      transTx && transTx.toString(),
      "fl_layer_apply"
    ].filter((a) => a).join("/");
  }
  /**
   * @description Get the string representation of the Concatenation action
   */
  toString() {
    const open = [
      this._duration && `du_${this._duration}`,
      !this._transition && `fl_splice`,
      `${this.concatSource.getOpenSourceString("l")}`
    ].filter((a) => a).join(",");
    const close = [
      "fl_layer_apply",
      this._prepend && "so_0"
    ].filter((a) => a).join(",");
    let concatSourceTx;
    if (this.concatSource.getTransformation()) {
      concatSourceTx = this.concatSource.getTransformation();
    } else {
      concatSourceTx = new Transformation();
    }
    if (this._transition) {
      concatSourceTx.addTransformation(this.getTransitionString());
    }
    return [
      open,
      concatSourceTx.toString(),
      close
    ].filter((a) => a).join("/");
  }
  static fromJson(actionModel, transformationFromJson) {
    const { source: source3, transition: transition2, prepend, duration } = actionModel;
    const sourceInstance = createSourceFromModel(source3, transformationFromJson);
    const result = new this(sourceInstance);
    if (transition2) {
      result.transition(VideoSource.fromJson(transition2, transformationFromJson));
    }
    if (prepend) {
      result.prepend();
    }
    if (duration) {
      result.duration(duration);
    }
    return result;
  }
};
var ConcatenateAction_default = ConcatenateAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/videoEdit/VolumeAction.js
var VolumeAction = class extends Action {
  constructor(volumeValue) {
    super();
    let volumeValueModel = { mode: "mute" };
    if (volumeValue !== "mute") {
      volumeValueModel = {
        mode: `${volumeValue}`.endsWith("db") ? "decibels" : "percent",
        value: +`${volumeValue}`.replace("db", "")
      };
    }
    this._actionModel = {
      actionType: "volume",
      volumeValue: volumeValueModel
    };
    const qualifierValue = new QualifierValue(["volume", volumeValue]).setDelimiter(":");
    this.addQualifier(new Qualifier("e", qualifierValue));
  }
  static fromJson(actionModel) {
    const { volumeValue } = actionModel;
    const { mode: mode2 } = volumeValue;
    const value = mode2 === "mute" ? mode2 : volumeValue.value;
    const suffix = mode2 === "mute" || mode2 === "percent" ? "" : "db";
    return new this(`${value}${suffix}`);
  }
};
var VolumeAction_default = VolumeAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/videoEdit/PreviewAction.js
var PreviewAction = class extends Action {
  constructor() {
    super();
    this._actionModel = {
      actionType: "preview"
    };
  }
  /**
   * @description Control the duration of the video segments
   * @param {string|number} minSegDuration The duration of a video segment
   * @return {this}
   */
  minimumSegmentDuration(minSegDuration) {
    this._actionModel.minimumSegmentDuration = +minSegDuration;
    this._minSeg = minSegDuration;
    return this;
  }
  /**
   * @description Control the number of the video segments
   * @param {string|number} maxSeg The number of the video segments.
   * @return {this}
   */
  maximumSegments(maxSeg) {
    this._actionModel.maximumSegments = +maxSeg;
    this._maxSeg = maxSeg;
    return this;
  }
  /**
   * @description control the length of the generated preview
   * @param {string|number} duration The duration in seconds such as 1.2, or 5.0
   * @return {this}
   */
  duration(duration) {
    this._actionModel.duration = +duration;
    this._duration = duration;
    return this;
  }
  toString() {
    return [
      "e_preview",
      this._duration && `duration_${toFloatAsString(this._duration)}`,
      this._maxSeg && `max_seg_${this._maxSeg}`,
      this._minSeg && `min_seg_dur_${toFloatAsString(this._minSeg)}`
    ].filter((a) => a).join(":");
  }
  static fromJson(actionModel) {
    const { duration, maximumSegments, minimumSegmentDuration } = actionModel;
    const result = new this();
    if (duration != null) {
      result.duration(duration);
    }
    if (maximumSegments != null) {
      result.maximumSegments(maximumSegments);
    }
    if (minimumSegmentDuration != null) {
      result.minimumSegmentDuration(minimumSegmentDuration);
    }
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/videoEdit.js
function concatenate(source3) {
  return new ConcatenateAction_default(source3);
}
function trim() {
  return new TrimAction_default();
}
function volume(volumeValue) {
  return new VolumeAction_default(volumeValue);
}
function preview() {
  return new PreviewAction();
}
var VideoEdit = { concatenate, trim, volume, preview };

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/BitRateAction.js
var BitRateAction = class extends Action {
  constructor(bitRate2) {
    super();
    this.isConstant = false;
    this._actionModel = { actionType: "bitRate" };
    this.bitRate = bitRate2;
    this._actionModel.bitRate = bitRate2;
  }
  /**
   * @description video plays with a constant bitrate (CBR).
   */
  constant() {
    this.isConstant = true;
    this._actionModel.constant = true;
    return this;
  }
  prepareQualifiers() {
    let qualifierValue;
    if (this.isConstant) {
      qualifierValue = new QualifierValue([this.bitRate, "constant"]).setDelimiter(":");
    } else {
      qualifierValue = new QualifierValue(this.bitRate);
    }
    this.addQualifier(new Qualifier("br", qualifierValue));
    return this;
  }
  static fromJson(actionModel) {
    const { bitRate: bitRate2, constant } = actionModel;
    const result = new this(bitRate2);
    constant && result.constant();
    return result;
  }
};
var BitRateAction_default = BitRateAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/AudioCodecAction.js
var AudioCodecAction = class extends Action {
  constructor(codec) {
    super();
    this._actionModel = { actionType: "audioCodec" };
    this.addQualifier(new Qualifier("ac", codec));
    this._actionModel.audioCodec = codec;
  }
  static fromJson(actionModel) {
    const { audioCodec: audioCodec2 } = actionModel;
    const result = new this(audioCodec2);
    return result;
  }
};
var AudioCodecAction_default = AudioCodecAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/AudioFrequencyAction.js
var AudioFrequencyAction = class extends Action {
  constructor(freq) {
    super();
    this._actionModel = { actionType: "audioFrequency" };
    this.addQualifier(new Qualifier("af", freq));
    this._actionModel.audioFrequencyType = freq;
  }
  static fromJson(actionModel) {
    const { audioFrequencyType } = actionModel;
    const result = new this(audioFrequencyType.replace("freq", ""));
    return result;
  }
};
var AudioFrequencyAction_default = AudioFrequencyAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/FPSRangeAction.js
var FPSRangeAction = class extends Action {
  constructor(from, to) {
    super();
    this._actionModel = {};
    this.from = from;
    this._actionModel = {
      actionType: "fps",
      fps: { from }
    };
    if (to != null) {
      this.to = to;
      this._actionModel.fps.to = to;
    }
  }
  prepareQualifiers() {
    let qualifierValue;
    if (this.from && this.to) {
      qualifierValue = new QualifierValue(`${this.from}-${this.to}`);
    } else {
      qualifierValue = new QualifierValue(`${this.from}-`);
    }
    this.addQualifier(new Qualifier("fps", qualifierValue));
    return this;
  }
};
var FPSRangeAction_default = FPSRangeAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/FPSAction.js
var FPSAction = class extends Action {
  constructor(from) {
    super();
    this._actionModel = { actionType: "fps" };
    this._actionModel.fps = from;
    this.addQualifier(new Qualifier("fps", from));
  }
  static fromJson(actionModel) {
    const { fps: fps2 } = actionModel;
    let result;
    if (typeof fps2 === "object") {
      result = new FPSRangeAction_default(fps2.from, fps2.to);
    } else {
      result = new this(fps2);
    }
    return result;
  }
};
var FPSAction_default = FPSAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/KeyframeIntervalsAction.js
var KeyframeIntervalsAction = class extends Action {
  constructor(interval) {
    super();
    this._actionModel = { actionType: "keyframeInterval" };
    this._actionModel.interval = interval;
    this.addQualifier(new Qualifier("ki", toFloatAsString(interval)));
  }
  static fromJson(actionModel) {
    const { interval } = actionModel;
    const result = new this(interval);
    return result;
  }
};
var KeyframeIntervalsAction_default = KeyframeIntervalsAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/StreamingProfile.js
var StreamingProfileAction = class extends Action {
  constructor(profile) {
    super();
    this._actionModel = { actionType: "streamingProfile" };
    this.addQualifier(new Qualifier("sp", profile));
    this._actionModel.profile = STREAMING_PROFILE_TO_ACTION_TYPE_MAP[profile] || profile;
  }
  static fromJson(actionModel) {
    const { profile } = actionModel;
    const profileType = ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP[profile] || profile;
    const result = new this(profileType);
    return result;
  }
};
var StreamingProfile_default = StreamingProfileAction;

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/ToAnimatedAction.js
var ToAnimatedAction = class extends Action {
  constructor(animatedFormat = "") {
    super();
    this._actionModel = { actionType: "toAnimated" };
    if (animatedFormat.toString() === "webp") {
      this.addFlag(animatedWebP());
    }
    this.addFlag(animated());
    if (animatedFormat) {
      this.addQualifier(new Qualifier("f", animatedFormat));
    }
    this._actionModel.animatedFormat = animatedFormat;
  }
  /**
   * @description Sets the time between frames.
   * @param delayValue The time in milliseconds.
   */
  delay(delayValue) {
    this.addQualifier(new Qualifier("dl", delayValue));
    this._actionModel.delay = delayValue;
    return this;
  }
  /**
   * @description Sets the frequency at which the video is sampled.
   * @param sampling As a string (e.g. '2.3s'), samples one frame every 2.3 seconds.<br>As a number (e.g. 20),
   * samples that many equally spaced frames over the duration of the video.
   */
  sampling(sampling) {
    this.addQualifier(new Qualifier("vs", sampling));
    this._actionModel.sampling = sampling;
    return this;
  }
  static fromJson(actionModel) {
    const { animatedFormat, sampling, delay } = actionModel;
    const result = new this(animatedFormat);
    sampling && result.sampling(sampling);
    delay && result.delay(delay);
    return result;
  }
};
var ToAnimatedAction_default = ToAnimatedAction;

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/videoCodecType/VideoCodecType.js
var VideoCodecType = class extends Qualifier {
  constructor(type) {
    super("vc");
    this._type = type;
    this.addValue(type);
  }
  getType() {
    return this._type;
  }
};
var AdvVideoCodecType = class extends Qualifier {
  constructor(type) {
    super("vc");
    this._type = type;
  }
  getType() {
    return this._type;
  }
  /**
   * @description Specifies the profile to use with the h264 codec.
   * @param {Qualifiers.VideoCodecProfile | string} profile Sets the profile of the video codec
   * @example new AdvVideoCodecType('h264').profile(VideoCodecProfile.baseline())
   * @return this;
   */
  profile(profile) {
    this._prof = profile;
    return this;
  }
  getProfile() {
    return this._prof;
  }
  /**
   * @description Specifies the level to use with the h264 codec and specified profile.
   * @param {Qualifiers.VideoCodecLevel | number | string} lvl
   * @example new AdvVideoCodecType('h264').profile(VideoCodecLevel.baseline())
   * @return this;
   */
  level(lvl) {
    this._lvl = lvl;
    return this;
  }
  getLevel() {
    return this._lvl;
  }
  /**
   * @description returns a toString representation of this qualifier
   * @return string;
   */
  toString() {
    return `vc_${this._type}:${this._prof}:${this._lvl}`;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/qualifiers/videoCodec.js
function auto7() {
  return new VideoCodecType("auto");
}
function h264() {
  return new AdvVideoCodecType("h264");
}
function h265() {
  return new VideoCodecType("h265");
}
function proRes() {
  return new VideoCodecType("prores");
}
function theora() {
  return new VideoCodecType("theora");
}
function vp8() {
  return new VideoCodecType("vp8");
}
function vp9() {
  return new VideoCodecType("vp9");
}
var VIDEO_CODEC_TO_TRANSFORMATION = {
  "auto": auto7(),
  "h264": h264(),
  "h265": h265(),
  "prores": proRes(),
  "theora": theora(),
  "vp8": vp8(),
  "vp9": vp9()
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode/VideoCodecAction.js
var VideoCodecAction = class extends Action {
  constructor(videoCodecTypeQualifier) {
    super();
    this._actionModel = { actionType: "videoCodec" };
    this._actionModel.videoCodec = { videoCodecName: videoCodecTypeQualifier.getType() };
    if (videoCodecTypeQualifier instanceof AdvVideoCodecType) {
      if (videoCodecTypeQualifier.getProfile()) {
        this._actionModel.videoCodec = Object.assign({ profile: videoCodecTypeQualifier.getProfile() }, this._actionModel.videoCodec);
      }
      if (videoCodecTypeQualifier.getLevel()) {
        this._actionModel.videoCodec = Object.assign({ level: videoCodecTypeQualifier.getLevel() }, this._actionModel.videoCodec);
      }
    }
    this.addQualifier(videoCodecTypeQualifier);
  }
  static fromJson(actionModel) {
    const { videoCodec: videoCodec2 } = actionModel;
    const result = new this(VIDEO_CODEC_TO_TRANSFORMATION[videoCodec2.videoCodecName]);
    videoCodec2.profile && new this(VIDEO_CODEC_TO_TRANSFORMATION[videoCodec2.videoCodecName].profile(videoCodec2.profile));
    videoCodec2.level && new this(VIDEO_CODEC_TO_TRANSFORMATION[videoCodec2.videoCodecName].level(videoCodec2.level));
    return result;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/transcode.js
function audioFrequency(freq) {
  return new AudioFrequencyAction_default(freq);
}
function audioCodec(codec) {
  return new AudioCodecAction_default(codec);
}
function bitRate(bitRate2) {
  return new BitRateAction_default(bitRate2);
}
function fps(from) {
  return new FPSAction_default(from);
}
function fpsRange(from, to) {
  return new FPSRangeAction_default(from, to);
}
function keyframeInterval(interval) {
  return new KeyframeIntervalsAction_default(interval);
}
function streamingProfile(profile) {
  return new StreamingProfile_default(profile);
}
function toAnimated(animatedFormat = "") {
  return new ToAnimatedAction_default(animatedFormat);
}
function videoCodec(videoCodecType) {
  return new VideoCodecAction(videoCodecType);
}
var Transcode = { bitRate, audioCodec, audioFrequency, fps, fpsRange, keyframeInterval, streamingProfile, toAnimated, videoCodec };

// node_modules/@cloudinary/transformation-builder-sdk/actions/psdTools/ClipAction.js
var ClipAction = class extends Action {
  constructor() {
    super();
    this.isEvenOdd = false;
  }
  /**
   * @description The name of the path to clip by
   * @param {string} path
   * @return {this}
   */
  byName(path) {
    this.path = path;
    return this;
  }
  /**
   * @description The index of the path to clip by
   * @param {number} path
   * @return {this}
   */
  byIndex(path) {
    this.path = path;
    return this;
  }
  /**
   * @description Trims pixels according to a clipping path included in the original image using an evenodd clipping rule.
   * @return {this}
   */
  evenOdd() {
    this.isEvenOdd = true;
    return this;
  }
  prepareQualifiers() {
    let qualifierValue;
    if (typeof this.path === "string") {
      qualifierValue = new QualifierValue(["name", this.path]).setDelimiter(":");
    } else {
      qualifierValue = new QualifierValue(this.path);
    }
    if (this.isEvenOdd) {
      this.addFlag(clipEvenOdd());
    } else {
      this.addFlag(clip());
    }
    this.addQualifier(new Qualifier("pg", qualifierValue));
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/psdTools/GetLayerAction.js
var GetLayerAction = class extends Action {
  constructor() {
    super();
    this.qualifierValue = new QualifierValue();
    this.qualifierValue.delimiter = ";";
  }
  /**
   * @description deliver an image containing only specified layer of a Photoshop image from The layer index
   * @param {string|number} from the index of the layer
   */
  byIndex(from) {
    this.qualifierValue.addValue(from);
    return this;
  }
  /**
   * @description deliver an image containing only specified range of layers of a Photoshop image
   * @param {string|number} from The layer number
   * @param {string|number} to The layer number
   */
  byRange(from, to) {
    const range = new QualifierValue(from);
    range.addValue(to);
    range.delimiter = "-";
    this.qualifierValue.addValue(range);
    return this;
  }
  /**
   * @description deliver an image containing only specified layer by name of a Photoshop image
   * @param {string|number} name The layer by name
   */
  byName(name2) {
    this.name = name2;
    this.qualifierValue.addValue(name2);
    return this;
  }
  prepareQualifiers() {
    let qualifierValue = this.qualifierValue;
    if (this.name) {
      qualifierValue = new QualifierValue(["name", this.qualifierValue]).setDelimiter(":");
    }
    this.addQualifier(new Qualifier("pg", qualifierValue));
    return this;
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/psdTools/SmartObjectAction.js
var SmartObjectAction = class extends Action {
  constructor() {
    super();
    this.qualifierValue = new QualifierValue();
    this.useName = false;
    this.qualifierValue.delimiter = ";";
  }
  /**
   * @description Creates a new instance using the specified number.
   * @param index The number.
   */
  byIndex(index) {
    this.smartObjectValue = index;
    this.qualifierValue.addValue(index);
    return this;
  }
  /**
   * @description Creates an instance using the name.
   * @param {string} layerName The name of the layer
   */
  byLayerName(layerName) {
    this.useName = true;
    this.qualifierValue.addValue(layerName);
    return this;
  }
  prepareQualifiers() {
    let qualifierValue;
    if (this.useName) {
      qualifierValue = new QualifierValue(["embedded:name", this.qualifierValue]);
    } else {
      qualifierValue = new QualifierValue(["embedded", this.qualifierValue]);
    }
    this.addQualifier(new Qualifier("pg", qualifierValue));
  }
};

// node_modules/@cloudinary/transformation-builder-sdk/actions/psdTools.js
function clip2() {
  return new ClipAction();
}
function getLayer() {
  return new GetLayerAction();
}
function smartObject() {
  return new SmartObjectAction();
}
var PSDTools = { clip: clip2, getLayer, smartObject };

// node_modules/@cloudinary/transformation-builder-sdk/actions/animated.js
var AnimatedAction = class extends Action {
  constructor() {
    super();
  }
  /**
   * @description Controls the time delay between the frames of an animated image, in milliseconds.
   * @param {number} delayValue The delay in milliseconds
   * @return {this}
   */
  delay(delayValue) {
    this.addQualifier(new Qualifier("dl", delayValue));
    return this;
  }
  /**
   * @description Delivers an animated GIF that contains additional loops of the GIF.
   * @param {number} additionalLoops The additional number of times to play the animated GIF.
   * @return {this}
   */
  loop(additionalLoops) {
    const qualifierValue = new QualifierValue(["loop", additionalLoops]).setDelimiter(":");
    this.addQualifier(new Qualifier("e", qualifierValue));
    return this;
  }
};
function edit() {
  return new AnimatedAction();
}
var Animated = {
  edit
};

// node_modules/@cloudinary/url-gen/internal/url/urlUtils/isUrl.js
function isUrl(publicID) {
  return publicID.match(/^https?:\//);
}

// node_modules/@cloudinary/url-gen/internal/url/urlUtils/isFileName.js
function isFileName(publicID) {
  return publicID.indexOf("/") < 0;
}

// node_modules/@cloudinary/url-gen/internal/url/urlUtils/publicIDContainsVersion.js
function publicIDContainsVersion(publicID) {
  return publicID.match(/^v[0-9]+/);
}

// node_modules/@cloudinary/url-gen/internal/url/cloudinaryURL.js
function getUrlPrefix(cloudName, urlConfig) {
  const secure = urlConfig.secure;
  const privateCDN = urlConfig.privateCdn;
  const cname = urlConfig.cname;
  const secureDistribution = urlConfig.secureDistribution;
  if (!secure && !cname) {
    return `http://res.cloudinary.com/${cloudName}`;
  }
  if (secure && !secureDistribution && privateCDN) {
    return `https://${cloudName}-res.cloudinary.com`;
  }
  if (secure && !secureDistribution) {
    return `https://res.cloudinary.com/${cloudName}`;
  }
  if (secure && secureDistribution && privateCDN) {
    return `https://${secureDistribution}`;
  }
  if (secure && secureDistribution) {
    return `https://${secureDistribution}/${cloudName}`;
  }
  if (!secure && cname) {
    return `http://${cname}/${cloudName}`;
  } else {
    return "ERROR";
  }
}
function handleAssetType(assetType) {
  if (!assetType) {
    return "image";
  }
  return assetType;
}
function handleDeliveryType(deliveryType) {
  if (!deliveryType) {
    return "upload";
  }
  return deliveryType;
}
function getUrlVersion(publicID, version, forceVersion) {
  const shouldForceVersion = forceVersion !== false;
  if (version) {
    return `v${version}`;
  }
  if (publicIDContainsVersion(publicID) || isUrl(publicID) || isFileName(publicID)) {
    return "";
  }
  return shouldForceVersion ? "v1" : "";
}

// node_modules/@cloudinary/url-gen/sdkAnalytics/stringPad.js
function stringPad(value, _targetLength, _padString) {
  let targetLength = _targetLength >> 0;
  let padString = String(typeof _padString !== "undefined" ? _padString : " ");
  if (value.length > targetLength) {
    return String(value);
  } else {
    targetLength = targetLength - value.length;
    if (targetLength > padString.length) {
      padString += repeatStringNumTimes(padString, targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(value);
  }
}
function repeatStringNumTimes(string, _times) {
  let times = _times;
  let repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}

// node_modules/@cloudinary/url-gen/sdkAnalytics/base64Map.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64Map = {};
var num = 0;
chars.split("").forEach((char) => {
  let key = num.toString(2);
  key = stringPad(key, 6, "0");
  base64Map[key] = char;
  num++;
});

// node_modules/@cloudinary/url-gen/sdkAnalytics/reverseVersion.js
function reverseVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").reverse().join(".");
}

// node_modules/@cloudinary/url-gen/sdkAnalytics/padVersion.js
function padVersion(semVer) {
  if (semVer.split(".").length < 2) {
    throw new Error("invalid semVer, must have at least two segments");
  }
  return semVer.split(".").map((segment) => {
    const asNumber = +segment;
    if (isNaN(asNumber) || asNumber < 0) {
      throw "Invalid version number provided";
    }
    return stringPad(segment, 2, "0");
  }).join(".");
}

// node_modules/@cloudinary/url-gen/sdkAnalytics/encodeVersion.js
function encodeVersion(semVer) {
  let strResult = "";
  const parts = semVer.split(".").length;
  const paddedStringLength = parts * 6;
  const reversedSemver = reverseVersion(semVer);
  const paddedSemver = padVersion(reversedSemver);
  const num2 = parseInt(paddedSemver.split(".").join(""));
  let paddedBinary = num2.toString(2);
  paddedBinary = stringPad(paddedBinary, paddedStringLength, "0");
  if (paddedBinary.length % 6 !== 0) {
    throw "Version must be smaller than 43.21.26)";
  }
  paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
    strResult += base64Map[bitString];
  });
  return strResult;
}

// node_modules/@cloudinary/url-gen/sdkAnalytics/getAnalyticsOptions.js
function getAnalyticsOptions(options) {
  const analyticsOptions = {
    sdkSemver: options.sdkSemver,
    techVersion: options.techVersion,
    sdkCode: options.sdkCode,
    product: options.product,
    feature: "0",
    osType: options.osType,
    osVersion: options.osVersion
  };
  if (options.accessibility) {
    analyticsOptions.feature = "D";
  }
  if (options.lazyload) {
    analyticsOptions.feature = "C";
  }
  if (options.responsive) {
    analyticsOptions.feature = "A";
  }
  if (options.placeholder) {
    analyticsOptions.feature = "B";
  }
  return analyticsOptions;
}

// node_modules/@cloudinary/url-gen/internal/utils/packageVersion.js
var packageVersion = "1.19.0";

// node_modules/@cloudinary/url-gen/sdkAnalytics/encodeOSVersion.js
function encodeOSVersion(semVer) {
  const [major, minor] = semVer.split(".");
  const binaryMajorVersion = parseInt(major).toString(2);
  const binaryMinorVersion = parseInt(minor).toString(2);
  const paddedMajor = binaryMajorVersion.padStart(6, "0");
  const paddedMinor = binaryMinorVersion.padStart(6, "0");
  return base64Map[paddedMajor] + base64Map[paddedMinor];
}

// node_modules/@cloudinary/url-gen/sdkAnalytics/getSDKAnalyticsSignature.js
function getNodeVersion() {
  const failedVersion = "0.0.0";
  if (typeof window !== "undefined") {
    return failedVersion;
  } else {
    try {
      return process.versions.node || failedVersion;
    } catch (e) {
      return failedVersion;
    }
  }
}
function ensureShapeOfTrackedProperties(trackedAnalytics) {
  const defaults = {
    techVersion: getNodeVersion(),
    sdkCode: "T",
    sdkSemver: packageVersion.split("-")[0],
    product: "A",
    osType: "Z",
    osVersion: "0.0",
    responsive: false,
    placeholder: false,
    lazyload: false,
    accessibility: false
  };
  if (!trackedAnalytics) {
    return defaults;
  } else {
    return Object.assign(Object.assign({}, defaults), trackedAnalytics);
  }
}
function getSDKAnalyticsSignature(_trackedAnalytics) {
  const trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
  const analyticsOptions = getAnalyticsOptions(trackedAnalytics);
  try {
    const twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
    const encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
    const encodedTechVersion = encodeVersion(twoPartVersion);
    const encodedOSVersion = encodeOSVersion(analyticsOptions.osVersion);
    const featureCode = analyticsOptions.feature;
    const SDKCode = analyticsOptions.sdkCode;
    const { product, osType } = analyticsOptions;
    const algoVersion = "D";
    return `${algoVersion}${product}${SDKCode}${encodedSDKVersion}${encodedTechVersion}${osType}${encodedOSVersion}${featureCode}`;
  } catch (e) {
    return "E";
  }
}
function removePatchFromSemver(semVerStr) {
  const parts = semVerStr.split(".");
  return `${parts[0]}.${parts[1]}`;
}

// node_modules/@cloudinary/url-gen/assets/CloudinaryFile.js
var SEO_TYPES = {
  "image/upload": "images",
  "image/private": "private_images",
  "image/authenticated": "authenticated_images",
  "raw/upload": "files",
  "video/upload": "videos"
};
var CloudinaryFile = class {
  constructor(publicID, cloudConfig = {}, urlConfig) {
    this.setPublicID(publicID);
    this.setCloudConfig(cloudConfig);
    this.setURLConfig(urlConfig);
  }
  /**
   * @description Sets the URL Config for this asset
   * @param urlConfig
   * @return {this}
   */
  setURLConfig(urlConfig) {
    this.urlConfig = new URLConfig_default(urlConfig);
    return this;
  }
  /**
   * @description Sets the Cloud Config for this asset
   * @param urlConfig
   * @return {this}
   */
  setCloudConfig(cloudConfig) {
    this.cloudName = cloudConfig.cloudName;
    this.apiKey = cloudConfig.apiKey;
    this.apiSecret = cloudConfig.apiSecret;
    this.authToken = cloudConfig.authToken;
    return this;
  }
  /**
   * @description Sets the public ID of the asset.
   * @param {string} publicID The public ID of the asset.
   * @return {this}
   */
  setPublicID(publicID) {
    this.publicID = publicID ? publicID.toString() : "";
    return this;
  }
  /**
   * @description Sets the delivery type of the asset.
   * @param {DELIVERY_TYPE | string} newType The type of the asset.
   * @return {this}
   */
  setDeliveryType(newType) {
    this.deliveryType = newType;
    return this;
  }
  /**
   * @description Sets the URL SEO suffix of the asset.
   * @param {string} newSuffix The SEO suffix.
   * @return {this}
   */
  setSuffix(newSuffix) {
    this.suffix = newSuffix;
    return this;
  }
  /**
   * @description Sets the signature of the asset.
   * @param {string} signature The signature.
   * @return {this}
   */
  setSignature(signature) {
    this.signature = signature;
    return this;
  }
  /**
   * @description Sets the version of the asset.
   * @param {string} newVersion The version of the asset.
   * @return {this}
   */
  setVersion(newVersion) {
    if (newVersion) {
      this.version = newVersion;
    }
    return this;
  }
  /**
   * @description Sets the asset type.
   * @param {string} newType The type of the asset.
   * @return {this}
   */
  setAssetType(newType) {
    if (newType) {
      this.assetType = newType;
    }
    return this;
  }
  sign() {
    return this;
  }
  /**
   * @description Serializes to URL string
   * @param overwriteOptions
   */
  toURL(overwriteOptions = {}) {
    return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
  }
  /**
   * @description Validate various options before attempting to create a URL
   * The function will throw in case a violation
   * @throws Validation errors
   */
  validateAssetForURLCreation() {
    if (typeof this.cloudName === "undefined") {
      throw "You must supply a cloudName when initializing the asset";
    }
    const suffixContainsDot = this.suffix && this.suffix.indexOf(".") >= 0;
    const suffixContainsSlash = this.suffix && this.suffix.indexOf("/") >= 0;
    if (suffixContainsDot || suffixContainsSlash) {
      throw "`suffix`` should not include . or /";
    }
  }
  /**
   * @description return an SEO friendly name for a combination of asset/delivery, some examples:
   * * image/upload -> images
   * * video/upload -> videos
   * If no match is found, return `{asset}/{delivery}`
   */
  getResourceType() {
    const assetType = handleAssetType(this.assetType);
    const deliveryType = handleDeliveryType(this.deliveryType);
    const hasSuffix = !!this.suffix;
    const regularSEOType = `${assetType}/${deliveryType}`;
    const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
    const useRootPath = this.urlConfig.useRootPath;
    const shorten = this.urlConfig.shorten;
    if (useRootPath) {
      if (regularSEOType === "image/upload") {
        return "";
      } else {
        throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
      }
    }
    if (shorten && regularSEOType === "image/upload") {
      return "iu";
    }
    if (hasSuffix) {
      if (shortSEOType) {
        return shortSEOType;
      } else {
        throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(", ")}, Provided: ${regularSEOType} instead`);
      }
    }
    return regularSEOType;
  }
  getSignature() {
    if (this.signature) {
      return `s--${this.signature}--`;
    } else {
      return "";
    }
  }
  /**
   *
   * @description Creates a fully qualified CloudinaryURL
   * @return {string} CloudinaryURL
   * @throws Validation Errors
   */
  createCloudinaryURL(transformation, trackedAnalytics) {
    if (!this.publicID) {
      return "";
    }
    this.validateAssetForURLCreation();
    const prefix = getUrlPrefix(this.cloudName, this.urlConfig);
    const transformationString = transformation ? transformation.toString() : "";
    const version = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
    const publicID = this.publicID;
    if (typeof transformation === "string") {
      const url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version, publicID.replace(/,/g, "%2C"), this.suffix].filter((a) => a).join("/");
      return url;
    } else {
      const safeURL = [
        encodeURI(prefix),
        this.getResourceType(),
        this.getSignature(),
        encodeURI(transformationString),
        version,
        encodeURI(publicID).replace(/,/g, "%2C"),
        this.suffix && encodeURI(this.suffix)
      ].filter((a) => a).join("/").replace(/\?/g, "%3F").replace(/=/g, "%3D");
      const shouldAddAnalytics = this.urlConfig.analytics !== false && !publicID.includes("?");
      let queryParamsString = "";
      if (typeof this.urlConfig.queryParams === "object") {
        try {
          const queryParams = new URLSearchParams(this.urlConfig.queryParams);
          if (shouldAddAnalytics) {
            queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
          }
          queryParamsString = queryParams.toString();
        } catch (err) {
          console.error("Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string");
        }
      } else {
        queryParamsString = this.urlConfig.queryParams || "";
        if (shouldAddAnalytics) {
          queryParamsString += `${queryParamsString.length > 0 ? "&" : ""}_a=${getSDKAnalyticsSignature(trackedAnalytics)}`;
        }
      }
      if (queryParamsString) {
        return `${safeURL}?${queryParamsString}`;
      } else {
        return safeURL;
      }
    }
  }
};

// node_modules/@cloudinary/url-gen/assets/CloudinaryTransformable.js
var CloudinaryTransformable = class extends CloudinaryFile {
  constructor(publicID, cloudConfig, urlConfig, transformation) {
    super(publicID, cloudConfig, urlConfig);
    this.transformation = transformation;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Animated} animated
   * @return {this}
   */
  animated(animated2) {
    this.transformation.animated(animated2);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Border} border
   * @return {this}
   */
  border(border2) {
    this.transformation.border(border2);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Reshape} reshape
   * @return {this}
   */
  reshape(reshape) {
    this.transformation.reshape(reshape);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Resize} resize
   * @return {this}
   */
  resize(resize) {
    this.transformation.resize(resize);
    return this;
  }
  /**
   * @desc An alias to Action Delivery.quality
   * @param {string|number} quality
   * @return {this}
   */
  quality(quality2) {
    this.addAction(new DeliveryFormatAction("q", quality2));
    return this;
  }
  /**
   * @desc An alias to Action Delivery.format
   * @param {string} format
   * @return {this}
   */
  format(format2) {
    this.addAction(new DeliveryFormatAction("f", format2));
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.RoundCorners} roundCorners
   * @return {this}
   */
  roundCorners(roundCorners2) {
    this.transformation.roundCorners(roundCorners2);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  overlay(overlayAction) {
    this.transformation.overlay(overlayAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Variable} variableAction
   * @return {this}
   */
  addVariable(variableAction) {
    this.transformation.addVariable(variableAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Condition} conditionalAction
   * @return {this}
   */
  conditional(conditionalAction) {
    this.transformation.conditional(conditionalAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Effect} effect
   * @return {this}
   */
  effect(effect) {
    this.transformation.effect(effect);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Adjust} action
   * @return {this}
   */
  adjust(action) {
    this.transformation.adjust(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Rotate} rotate
   * @return {this}
   */
  rotate(rotate) {
    this.transformation.rotate(rotate);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.NamedTransformation} namedTransformation
   * @return {this}
   */
  namedTransformation(namedTransformation) {
    this.transformation.namedTransformation(namedTransformation);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Delivery} deliveryAction
   * @return {this}
   */
  delivery(deliveryAction) {
    this.transformation.delivery(deliveryAction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Qualifiers.color} color
   * @return {this}
   */
  backgroundColor(color2) {
    this.transformation.backgroundColor(color2);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.PSDTools} action
   * @return {this}
   */
  psdTools(action) {
    this.transformation.psdTools(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Extract} action
   * @return {this}
   */
  extract(action) {
    this.transformation.extract(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Qualifiers.Flag | string} flagQualifier
   * @return {this}
   */
  addFlag(flagQualifier) {
    this.transformation.addFlag(flagQualifier);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.CustomFunction} customFunction
   * @return {this}
   */
  customFunction(customFunction) {
    this.transformation.customFunction(customFunction);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {SDK.Action | string} action
   * @return {this}
   */
  addAction(action) {
    this.transformation.addAction(action);
    return this;
  }
  /**
   * @description Extend your transformation with another transformation
   * @param { string | SDK.Transformation } tx
   */
  addTransformation(tx) {
    this.transformation.addTransformation(tx);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {string}
   */
  toString() {
    return this.transformation.toString();
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  underlay(underlayAction) {
    this.transformation.underlay(underlayAction);
    return this;
  }
  toURL(overwriteOptions = {}) {
    return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === void 0 ? void 0 : overwriteOptions.trackedAnalytics);
  }
};

// node_modules/@cloudinary/url-gen/assets/CloudinaryImage.js
var CloudinaryImage = class extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new ImageTransformation());
  }
};

// node_modules/@cloudinary/url-gen/assets/CloudinaryVideo.js
var CloudinaryVideo = class extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new VideoTransformation());
    this.assetType = "video";
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Transcode} action
   * @return {this}
   */
  transcode(action) {
    this.transformation.transcode(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.VideoEdit} action
   * @return {this}
   */
  videoEdit(action) {
    this.transformation.videoEdit(action);
    return this;
  }
};

// node_modules/@cloudinary/url-gen/internal/utils/cloneDeep.js
var LARGE_ARRAY_SIZE2 = 200;
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
var MAX_SAFE_INTEGER = 9007199254740991;
var argsTag2 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var errorTag2 = "[object Error]";
var funcTag2 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag2 = "[object Map]";
var numberTag2 = "[object Number]";
var objectTag2 = "[object Object]";
var promiseTag2 = "[object Promise]";
var regexpTag2 = "[object RegExp]";
var setTag2 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag2 = "[object Symbol]";
var weakMapTag2 = "[object WeakMap]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag2 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
var reFlags = /\w*$/;
var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
var reIsUint = /^(?:0|[1-9]\d*)$/;
var cloneableTags2 = {};
cloneableTags2[argsTag2] = cloneableTags2[arrayTag2] = cloneableTags2[arrayBufferTag2] = cloneableTags2[dataViewTag2] = cloneableTags2[boolTag2] = cloneableTags2[dateTag2] = cloneableTags2[float32Tag2] = cloneableTags2[float64Tag2] = cloneableTags2[int8Tag2] = cloneableTags2[int16Tag2] = cloneableTags2[int32Tag2] = cloneableTags2[mapTag2] = cloneableTags2[numberTag2] = cloneableTags2[objectTag2] = cloneableTags2[regexpTag2] = cloneableTags2[setTag2] = cloneableTags2[stringTag2] = cloneableTags2[symbolTag2] = cloneableTags2[uint8Tag2] = cloneableTags2[uint8ClampedTag2] = cloneableTags2[uint16Tag2] = cloneableTags2[uint32Tag2] = true;
cloneableTags2[errorTag2] = cloneableTags2[funcTag2] = cloneableTags2[weakMapTag2] = false;
var freeGlobal2 = typeof global == "object" && global && global.Object === Object && global;
var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
function addMapEntry(map, pair) {
  map.set(pair[0], pair[1]);
  return map;
}
function addSetEntry(set, value) {
  set.add(value);
  return set;
}
function arrayEach(array, iteratee) {
  var index = -1, length = array ? array.length : 0;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array ? array.length : 0;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
function getValue2(object, key) {
  return object == null ? void 0 : object[key];
}
function isHostObject2(value) {
  var result = false;
  if (value != null && typeof value.toString != "function") {
    try {
      result = !!`${value}`;
    } catch (e) {
    }
  }
  return result;
}
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function overArg2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var arrayProto2 = Array.prototype;
var funcProto2 = Function.prototype;
var objectProto2 = Object.prototype;
var coreJsData2 = root2["__core-js_shared__"];
var maskSrcKey2 = function() {
  var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
  return uid ? `Symbol(src)_1.${uid}` : "";
}();
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto2.hasOwnProperty;
var objectToString2 = objectProto2.toString;
var reIsNative2 = RegExp(`^${funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?")}$`);
var Buffer2 = moduleExports2 ? root2.Buffer : void 0;
var Symbol2 = root2.Symbol;
var Uint8Array2 = root2.Uint8Array;
var getPrototype2 = overArg2(Object.getPrototypeOf, Object);
var objectCreate = Object.create;
var propertyIsEnumerable2 = objectProto2.propertyIsEnumerable;
var splice2 = arrayProto2.splice;
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var nativeIsBuffer2 = Buffer2 ? Buffer2.isBuffer : void 0;
var nativeKeys2 = overArg2(Object.keys, Object);
var DataView2 = getNative2(root2, "DataView");
var Map3 = getNative2(root2, "Map");
var Promise3 = getNative2(root2, "Promise");
var Set2 = getNative2(root2, "Set");
var WeakMap2 = getNative2(root2, "WeakMap");
var nativeCreate2 = getNative2(Object, "create");
var dataViewCtorString2 = toSource2(DataView2);
var mapCtorString2 = toSource2(Map3);
var promiseCtorString2 = toSource2(Promise3);
var setCtorString2 = toSource2(Set2);
var weakMapCtorString2 = toSource2(WeakMap2);
var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0;
var symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
function Hash2(entries) {
  var index = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
function hashClear2() {
  this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
}
function hashDelete2(key) {
  return this.has(key) && delete this.__data__[key];
}
function hashGet2(key) {
  var data = this.__data__;
  if (nativeCreate2) {
    var result = data[key];
    return result === HASH_UNDEFINED2 ? void 0 : result;
  }
  return hasOwnProperty2.call(data, key) ? data[key] : void 0;
}
function hashHas2(key) {
  var data = this.__data__;
  return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
}
function hashSet2(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
Hash2.prototype.clear = hashClear2;
Hash2.prototype.delete = hashDelete2;
Hash2.prototype.get = hashGet2;
Hash2.prototype.has = hashHas2;
Hash2.prototype.set = hashSet2;
function ListCache2(entries) {
  var index = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
function listCacheClear2() {
  this.__data__ = [];
}
function listCacheDelete2(key) {
  var data = this.__data__, index = assocIndexOf2(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice2.call(data, index, 1);
  }
  return true;
}
function listCacheGet2(key) {
  var data = this.__data__, index = assocIndexOf2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas2(key) {
  return assocIndexOf2(this.__data__, key) > -1;
}
function listCacheSet2(key, value) {
  var data = this.__data__, index = assocIndexOf2(data, key);
  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
ListCache2.prototype.clear = listCacheClear2;
ListCache2.prototype.delete = listCacheDelete2;
ListCache2.prototype.get = listCacheGet2;
ListCache2.prototype.has = listCacheHas2;
ListCache2.prototype.set = listCacheSet2;
function MapCache2(entries) {
  var index = -1, length = entries ? entries.length : 0;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
function mapCacheClear2() {
  this.__data__ = {
    "hash": new Hash2(),
    "map": new (Map3 || ListCache2)(),
    "string": new Hash2()
  };
}
function mapCacheDelete2(key) {
  return getMapData2(this, key).delete(key);
}
function mapCacheGet2(key) {
  return getMapData2(this, key).get(key);
}
function mapCacheHas2(key) {
  return getMapData2(this, key).has(key);
}
function mapCacheSet2(key, value) {
  getMapData2(this, key).set(key, value);
  return this;
}
MapCache2.prototype.clear = mapCacheClear2;
MapCache2.prototype.delete = mapCacheDelete2;
MapCache2.prototype.get = mapCacheGet2;
MapCache2.prototype.has = mapCacheHas2;
MapCache2.prototype.set = mapCacheSet2;
function Stack2(entries) {
  this.__data__ = new ListCache2(entries);
}
function stackClear2() {
  this.__data__ = new ListCache2();
}
function stackDelete2(key) {
  return this.__data__.delete(key);
}
function stackGet2(key) {
  return this.__data__.get(key);
}
function stackHas2(key) {
  return this.__data__.has(key);
}
function stackSet2(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache2) {
    var pairs = cache.__data__;
    if (!Map3 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache2(pairs);
  }
  cache.set(key, value);
  return this;
}
Stack2.prototype.clear = stackClear2;
Stack2.prototype.delete = stackDelete2;
Stack2.prototype.get = stackGet2;
Stack2.prototype.has = stackHas2;
Stack2.prototype.set = stackSet2;
function arrayLikeKeys(value, inherited) {
  var result = isArray2(value) || isArguments(value) ? baseTimes(value.length, String) : [];
  var length = result.length, skipIndexes = !!length;
  for (var key in value) {
    if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value)) || value === void 0 && !(key in object)) {
    object[key] = value;
  }
}
function assocIndexOf2(array, key) {
  var length = array.length;
  while (length--) {
    if (eq2(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
function baseAssign(object, source3) {
  return object && copyObject(source3, keys(source3), object);
}
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject4(value)) {
    return value;
  }
  var isArr = isArray2(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag2(value), isFunc = tag == funcTag2 || tag == genTag2;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag2 || tag == argsTag2 || isFunc && !object) {
      if (isHostObject2(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags2[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  stack || (stack = new Stack2());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
  });
  return result;
}
function baseCreate(proto) {
  return isObject4(proto) ? objectCreate(proto) : {};
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
}
function baseGetTag2(value) {
  return objectToString2.call(value);
}
function baseIsNative2(value) {
  if (!isObject4(value) || isMasked2(value)) {
    return false;
  }
  var pattern = isFunction3(value) || isHostObject2(value) ? reIsNative2 : reIsHostCtor2;
  return pattern.test(toSource2(value));
}
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys2(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor());
}
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor());
}
function cloneSymbol(symbol) {
  return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function copyArray(source3, array) {
  var index = -1, length = source3.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source3[index];
  }
  return array;
}
function copyObject(source3, props, object, customizer) {
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source3[key], key, object, source3) : void 0;
    assignValue(object, key, newValue === void 0 ? source3[key] : newValue);
  }
  return object;
}
function copySymbols(source3, object) {
  return copyObject(source3, getSymbols2(source3), object);
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols2);
}
function getMapData2(map, key) {
  var data = map.__data__;
  return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function getNative2(object, key) {
  var value = getValue2(object, key);
  return baseIsNative2(value) ? value : void 0;
}
var getSymbols2 = nativeGetSymbols2 ? overArg2(nativeGetSymbols2, Object) : stubArray2;
var getTag2 = baseGetTag2;
if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map3 && getTag2(new Map3()) != mapTag2 || Promise3 && getTag2(Promise3.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
  getTag2 = function(value) {
    var result = objectToString2.call(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : void 0;
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString2:
          return dataViewTag2;
        case mapCtorString2:
          return mapTag2;
        case promiseCtorString2:
          return promiseTag2;
        case setCtorString2:
          return setTag2;
        case weakMapCtorString2:
          return weakMapTag2;
      }
    }
    return result;
  };
}
function initCloneArray(array) {
  var length = array.length, result = array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype2(object)) : {};
}
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag2:
      return cloneDataView(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray(object, isDeep);
    case mapTag2:
      return cloneMap(object, isDeep, cloneFunc);
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp(object);
    case setTag2:
      return cloneSet(object, isDeep, cloneFunc);
    case symbolTag2:
      return cloneSymbol(object);
  }
}
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function isKeyable2(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function isMasked2(func) {
  return !!maskSrcKey2 && maskSrcKey2 in func;
}
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
  return value === proto;
}
function toSource2(func) {
  if (func != null) {
    try {
      return funcToString2.call(func);
    } catch (e) {
    }
    try {
      return `${func}`;
    } catch (e) {
    }
  }
  return "";
}
function cloneDeep2(value) {
  return baseClone(value, true, true);
}
function eq2(value, other) {
  return value === other || value !== value && other !== other;
}
function isArguments(value) {
  return isArrayLikeObject(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable2.call(value, "callee") || objectToString2.call(value) == argsTag2);
}
var isArray2 = Array.isArray;
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction3(value);
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
var isBuffer = nativeIsBuffer2 || stubFalse;
function isFunction3(value) {
  var tag = isObject4(value) ? objectToString2.call(value) : "";
  return tag == funcTag2 || tag == genTag2;
}
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isObject4(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function stubArray2() {
  return [];
}
function stubFalse() {
  return false;
}

// node_modules/@cloudinary/url-gen/assets/CloudinaryMedia.js
var CloudinaryMedia = class extends CloudinaryTransformable {
  constructor(publicID, cloudConfig, urlConfig) {
    super(publicID, cloudConfig, urlConfig, new Transformation());
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.Transcode} action
   * @return {this}
   */
  transcode(action) {
    this.transformation.transcode(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @param {Actions.VideoEdit} action
   * @return {this}
   */
  videoEdit(action) {
    this.transformation.videoEdit(action);
    return this;
  }
  /**
   * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
   * @return {this}
   */
  underlay(underlayAction) {
    this.transformation.underlay(underlayAction);
    return this;
  }
  clone() {
    return cloneDeep2(this);
  }
};

// node_modules/@cloudinary/url-gen/instance/Cloudinary.js
var Cloudinary = class {
  constructor(cloudinaryConfig) {
    if (cloudinaryConfig) {
      this.cloudinaryConfig = cloudinaryConfig;
    }
  }
  image(publicID) {
    return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
  }
  video(publicID) {
    return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
  }
  setConfig(cloudinaryConfig) {
    this.cloudinaryConfig = cloudinaryConfig;
    return this;
  }
  getConfig() {
    return this.cloudinaryConfig;
  }
  extendConfig() {
  }
};

// node_modules/@cloudinary/url-gen/backwards/utils/isObject.js
function isObject5(a) {
  return typeof a === "object" && a !== null;
}

// node_modules/@cloudinary/url-gen/internal/utils/base64Encode.js
function base64Encode2(input) {
  let encodedResult = "";
  if (typeof window !== "undefined") {
    encodedResult = btoa(encodeURI(decodeURI(input)));
  } else {
    encodedResult = global.Buffer.from(input).toString("base64");
  }
  return encodedResult.replace(/\+/g, "-").replace(/\//g, "_");
}

// node_modules/@cloudinary/url-gen/backwards/consts.js
var LEGACY_CONDITIONAL_OPERATORS2 = {
  "=": "eq",
  "!=": "ne",
  "<": "lt",
  ">": "gt",
  "<=": "lte",
  ">=": "gte",
  "&&": "and",
  "||": "or",
  "*": "mul",
  "/": "div",
  "+": "add",
  "-": "sub",
  "^": "pow"
};
var OLD_AKAMAI_SHARED_CDN2 = "cloudinary-a.akamaihd.net";
var AKAMAI_SHARED_CDN = "res.cloudinary.com";
var SHARED_CDN2 = AKAMAI_SHARED_CDN;
var LEGACY_PREDEFINED_VARS2 = {
  "aspect_ratio": "ar",
  "aspectRatio": "ar",
  "current_page": "cp",
  "currentPage": "cp",
  "duration": "du",
  "face_count": "fc",
  "faceCount": "fc",
  "height": "h",
  "initial_aspect_ratio": "iar",
  "initial_height": "ih",
  "initial_width": "iw",
  "initialAspectRatio": "iar",
  "initialHeight": "ih",
  "initialWidth": "iw",
  "initial_duration": "idu",
  "initialDuration": "idu",
  "page_count": "pc",
  "page_x": "px",
  "page_y": "py",
  "pageCount": "pc",
  "pageX": "px",
  "pageY": "py",
  "tags": "tags",
  "width": "w"
};
var NUMBER_PATTERN2 = "([0-9]*)\\.([0-9]+)|([0-9]+)";
var OFFSET_ANY_PATTERN2 = `(${NUMBER_PATTERN2})([%pP])?`;
var RANGE_VALUE_RE2 = RegExp(`^${OFFSET_ANY_PATTERN2}$`);
var OFFSET_ANY_PATTERN_RE2 = RegExp(`(${OFFSET_ANY_PATTERN2})\\.\\.(${OFFSET_ANY_PATTERN2})`);
var LAYER_KEYWORD_PARAMS2 = {
  font_weight: "normal",
  font_style: "normal",
  text_decoration: "none",
  text_align: "",
  stroke: "none"
};

// node_modules/@cloudinary/url-gen/backwards/utils/smartEscape.js
function smartEscape2(string, unsafe = /([^a-zA-Z0-9_.\-\/:]+)/g) {
  return string.replace(unsafe, function(match) {
    return match.split("").map(function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    }).join("");
  });
}

// node_modules/@cloudinary/url-gen/backwards/utils/snakeCase.js
var snakeCase2 = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// node_modules/@cloudinary/url-gen/backwards/legacyLayer/layer.js
var Layer = class _Layer {
  /**
   * Layer
   * @constructor Layer
   * @param {Object} options - layer parameters
   */
  constructor(options) {
    this.options = {};
    if (options != null) {
      ["resourceType", "type", "publicId", "format"].forEach((key) => {
        var ref;
        return this.options[key] = (ref = options[key]) != null ? ref : options[snakeCase2(key)];
      });
    }
  }
  resourceType(value) {
    this.options.resourceType = value;
    return this;
  }
  type(value) {
    this.options.type = value;
    return this;
  }
  publicId(value) {
    this.options.publicId = value;
    return this;
  }
  /**
   * Get the public ID, formatted for layer parameter
   * @function Layer#getPublicId
   * @return {String} public ID
   */
  getPublicId() {
    var ref;
    return (ref = this.options.publicId) != null ? ref.replace(/\//g, ":") : void 0;
  }
  /**
   * Get the public ID, with format if present
   * @function Layer#getFullPublicId
   * @return {String} public ID
   */
  getFullPublicId() {
    if (this.options.format != null) {
      return this.getPublicId() + "." + this.options.format;
    } else {
      return this.getPublicId();
    }
  }
  format(value) {
    this.options.format = value;
    return this;
  }
  /**
   * generate the string representation of the layer
   * @function Layer#toString
   */
  toString() {
    let components = [];
    if (this.options.publicId == null) {
      throw "Must supply publicId";
    }
    if (!(this.options.resourceType === "image")) {
      components.push(this.options.resourceType);
    }
    if (!(this.options.type === "upload")) {
      components.push(this.options.type);
    }
    components.push(this.getFullPublicId());
    return components.filter((x) => !!x).join(":");
  }
  clone() {
    return new _Layer(this.options);
  }
};
var layer_default2 = Layer;

// node_modules/@cloudinary/url-gen/backwards/utils/isEmpty.js
function isEmpty2(value) {
  return value === void 0 || value === null || typeof value === "object" && Object.keys(value).length === 0 || typeof value === "string" && value.trim().length === 0;
}

// node_modules/@cloudinary/url-gen/backwards/utils/isNumberLike.js
var isNumberLike2 = function(value) {
  return value != null && !isNaN(parseFloat(value));
};

// node_modules/@cloudinary/url-gen/backwards/legacyLayer/textlayer.js
var TextLayer = class extends layer_default2 {
  /**
   * @constructor TextLayer
   * @param {Object} options - layer parameters
   */
  constructor(options) {
    let keys2;
    super(options);
    keys2 = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "fontHinting", "fontAntialiasing", "text"];
    if (options != null) {
      keys2.forEach((key) => {
        var ref;
        return this.options[key] = (ref = options[key]) != null ? ref : options[snakeCase2(key)];
      });
    }
    this.options.resourceType = "text";
  }
  //@ts-ignore
  resourceType(resourceType) {
    throw "Cannot modify resourceType for text layers";
  }
  //@ts-ignore
  type(type) {
    throw "Cannot modify type for text layers";
  }
  format(format2) {
    throw "Cannot modify format for text layers";
  }
  fontFamily(fontFamily) {
    this.options.fontFamily = fontFamily;
    return this;
  }
  fontSize(fontSize) {
    this.options.fontSize = fontSize;
    return this;
  }
  fontWeight(fontWeight) {
    this.options.fontWeight = fontWeight;
    return this;
  }
  fontStyle(fontStyle) {
    this.options.fontStyle = fontStyle;
    return this;
  }
  textDecoration(textDecoration) {
    this.options.textDecoration = textDecoration;
    return this;
  }
  textAlign(textAlign) {
    this.options.textAlign = textAlign;
    return this;
  }
  stroke(stroke) {
    this.options.stroke = stroke;
    return this;
  }
  letterSpacing(letterSpacing) {
    this.options.letterSpacing = letterSpacing;
    return this;
  }
  lineSpacing(lineSpacing) {
    this.options.lineSpacing = lineSpacing;
    return this;
  }
  fontHinting(fontHinting) {
    this.options.fontHinting = fontHinting;
    return this;
  }
  fontAntialiasing(fontAntialiasing) {
    this.options.fontAntialiasing = fontAntialiasing;
    return this;
  }
  text(text2) {
    this.options.text = text2;
    return this;
  }
  /**
   * generate the string representation of the layer
   * @function TextLayer#toString
   * @return {String}
   */
  toString() {
    var components, hasPublicId, hasStyle, publicId, re, res, start2, style, text2, textSource;
    style = this.textStyleIdentifier();
    if (this.options.publicId != null) {
      publicId = this.getFullPublicId();
    }
    if (this.options.text != null) {
      hasPublicId = !isEmpty2(publicId);
      hasStyle = !isEmpty2(style);
      if (hasPublicId && hasStyle || !hasPublicId && !hasStyle) {
        throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
      }
      re = /\$\([a-zA-Z]\w*\)/g;
      start2 = 0;
      textSource = smartEscape2(this.options.text, /[,\/]/g);
      text2 = "";
      while (res = re.exec(textSource)) {
        text2 += smartEscape2(textSource.slice(start2, res.index));
        text2 += res[0];
        start2 = res.index + res[0].length;
      }
      text2 += smartEscape2(textSource.slice(start2));
    }
    components = [this.options.resourceType, style, publicId, text2];
    return components.filter((x) => !!x).join(":");
  }
  textStyleIdentifier() {
    var components;
    components = [];
    if (this.options.fontWeight !== "normal") {
      components.push(this.options.fontWeight);
    }
    if (this.options.fontStyle !== "normal") {
      components.push(this.options.fontStyle);
    }
    if (this.options.textDecoration !== "none") {
      components.push(this.options.textDecoration);
    }
    components.push(this.options.textAlign);
    if (this.options.stroke !== "none") {
      components.push(this.options.stroke);
    }
    if (!(isEmpty2(this.options.letterSpacing) && !isNumberLike2(this.options.letterSpacing))) {
      components.push("letter_spacing_" + this.options.letterSpacing);
    }
    if (!(isEmpty2(this.options.lineSpacing) && !isNumberLike2(this.options.lineSpacing))) {
      components.push("line_spacing_" + this.options.lineSpacing);
    }
    if (!isEmpty2(this.options.fontAntialiasing)) {
      components.push("antialias_" + this.options.fontAntialiasing);
    }
    if (!isEmpty2(this.options.fontHinting)) {
      components.push("hinting_" + this.options.fontHinting);
    }
    if (!isEmpty2(components.filter((x) => !!x))) {
      if (isEmpty2(this.options.fontFamily)) {
        throw `Must supply fontFamily. ${components}`;
      }
      if (isEmpty2(this.options.fontSize) && !isNumberLike2(this.options.fontSize)) {
        throw "Must supply fontSize.";
      }
    }
    components.unshift(this.options.fontFamily, this.options.fontSize);
    components = components.filter((x) => !!x).join("_");
    return components;
  }
};
var textlayer_default2 = TextLayer;

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processLayer.js
function textStyle(layer) {
  const keywords = [];
  let style = "";
  Object.keys(LAYER_KEYWORD_PARAMS2).forEach((attr) => {
    let default_value = LAYER_KEYWORD_PARAMS2[attr];
    let attr_value = layer[attr] || default_value;
    if (attr_value !== default_value) {
      keywords.push(attr_value);
    }
  });
  Object.keys(layer).forEach((attr) => {
    if (attr === "letter_spacing" || attr === "line_spacing") {
      keywords.push(`${attr}_${layer[attr]}`);
    }
    if (attr === "font_hinting") {
      keywords.push(`${attr.split("_").pop()}_${layer[attr]}`);
    }
    if (attr === "font_antialiasing") {
      keywords.push(`antialias_${layer[attr]}`);
    }
  });
  if (layer.hasOwnProperty("font_size") || !keywords || keywords.length === 0) {
    if (!layer.font_size)
      throw `Must supply font_size for text in overlay/underlay`;
    if (!layer.font_family)
      throw `Must supply font_family for text in overlay/underlay`;
    keywords.unshift(layer.font_size);
    keywords.unshift(layer.font_family);
    style = keywords.filter((a) => a).join("_");
  }
  return style;
}
function processLayer2(layer) {
  if (layer instanceof textlayer_default2 || layer instanceof layer_default2) {
    return layer.toString();
  }
  let result = "";
  if (isObject5(layer)) {
    if (layer.resource_type === "fetch" || layer.url != null) {
      result = `fetch:${base64Encode2(layer.url)}`;
    } else {
      let public_id = layer.public_id;
      let format2 = layer.format;
      let resource_type = layer.resource_type || "image";
      let type = layer.type || "upload";
      let text2 = layer.text;
      let style = null;
      let components = [];
      const noPublicId = !public_id || public_id.length === 0;
      if (!noPublicId) {
        public_id = public_id.replace(new RegExp("/", "g"), ":");
        if (format2 != null) {
          public_id = `${public_id}.${format2}`;
        }
      }
      if ((!text2 || text2.length === 0) && resource_type !== "text") {
        if (noPublicId) {
          throw "Must supply public_id for resource_type layer_parameter";
        }
        if (resource_type === "subtitles") {
          style = textStyle(layer);
        }
      } else {
        resource_type = "text";
        type = null;
        style = textStyle(layer);
        if (text2 && text2.length >= 0) {
          const noStyle = !style;
          if (!(noPublicId || noStyle) || noPublicId && noStyle) {
            throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay";
          }
          let re = /\$\([a-zA-Z]\w*\)/g;
          let start2 = 0;
          let textSource = smartEscape2(decodeURIComponent(text2), /[,\/]/g);
          text2 = "";
          for (let res = re.exec(textSource); res; res = re.exec(textSource)) {
            text2 += smartEscape2(textSource.slice(start2, res.index));
            text2 += res[0];
            start2 = res.index + res[0].length;
          }
          text2 += encodeURIComponent(textSource.slice(start2));
        }
      }
      if (resource_type !== "image") {
        components.push(resource_type);
      }
      if (type !== "upload") {
        components.push(type);
      }
      components.push(style);
      components.push(public_id);
      components.push(text2);
      result = components.filter((a) => a).join(":");
    }
  } else if (/^fetch:.+/.test(layer)) {
    result = `fetch:${base64Encode2(layer.substr(6))}`;
  } else {
    result = layer;
  }
  return result;
}

// node_modules/@cloudinary/url-gen/backwards/utils/legacyNormalizeExpression.js
function legacyNormalizeExpression2(expression2) {
  if (typeof expression2 !== "string" || expression2.length === 0 || expression2.match(/^!.+!$/)) {
    if (expression2) {
      return expression2.toString();
    } else {
      return expression2;
    }
  }
  expression2 = String(expression2);
  const operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*|\\^";
  const operatorsPattern = "((" + operators + ")(?=[ _]))";
  const operatorsReplaceRE = new RegExp(operatorsPattern, "g");
  expression2 = expression2.replace(operatorsReplaceRE, (match) => {
    return LEGACY_CONDITIONAL_OPERATORS2[match];
  });
  const predefinedVarsPattern = "(" + Object.keys(LEGACY_PREDEFINED_VARS2).join("|") + ")";
  const userVariablePattern = "(\\$_*[^_ ]+)";
  const variablesReplaceRE = new RegExp(`${userVariablePattern}|${predefinedVarsPattern}`, "g");
  expression2 = expression2.replace(variablesReplaceRE, (match) => LEGACY_PREDEFINED_VARS2[match] || match);
  return expression2.replace(/[ _]+/g, "_");
}

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processIf.js
function process_if2(ifValue) {
  return ifValue ? "if_" + legacyNormalizeExpression2(ifValue) : ifValue;
}

// node_modules/@cloudinary/url-gen/backwards/utils/toArray.js
function toArray2(arg) {
  switch (true) {
    case arg == null:
      return [];
    case Array.isArray(arg):
      return arg;
    default:
      return [arg];
  }
}

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processRadius.js
function processRadius2(_radius) {
  let radius = _radius;
  if (!radius) {
    return radius;
  }
  if (!Array.isArray(radius)) {
    radius = [radius];
  }
  if (radius.length === 0 || radius.length > 4) {
    throw new Error("Radius array should contain between 1 and 4 values");
  }
  if (radius.findIndex((x) => x === null) >= 0) {
    throw new Error("Corner: Cannot be null");
  }
  return radius.map(legacyNormalizeExpression2).join(":");
}

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processCustomFunction.js
function processCustomFunction2(customFunction) {
  if (!isObject5(customFunction)) {
    return customFunction;
  }
  if (customFunction.function_type === "remote") {
    const encodedSource = base64Encode2(customFunction.source).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return [customFunction.function_type, encodedSource].join(":");
  }
  return [customFunction.function_type, customFunction.source].join(":");
}

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processCustomPreFunction.js
function processCustomPreFunction2(customPreFunction) {
  const result = processCustomFunction2(customPreFunction);
  return typeof result === "string" ? `pre:${result}` : null;
}

// node_modules/@cloudinary/url-gen/backwards/utils/splitRange.js
function splitRange2(range) {
  switch (range && range.constructor) {
    case String:
      if (!OFFSET_ANY_PATTERN_RE2.test(range)) {
        return range;
      }
      return range.split("..");
    case Array:
      return [[range], range[range.length - 1]];
    default:
      return [null, null];
  }
}

// node_modules/@cloudinary/url-gen/backwards/utils/norm_range_values.js
function normRangeValues2(value) {
  const offset = String(value).match(RANGE_VALUE_RE2);
  if (offset) {
    const modifier = offset[5] ? "p" : "";
    return `${offset[1] || offset[4]}${modifier}`;
  } else {
    return value;
  }
}

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processVideoParams.js
function processVideoParams2(param) {
  switch (param && param.constructor) {
    case Object: {
      let video2 = "";
      if ("codec" in param) {
        video2 = param.codec;
        if ("profile" in param) {
          video2 += ":" + param.profile;
          if ("level" in param) {
            video2 += ":" + param.level;
          }
        }
      }
      return video2;
    }
    case String:
      return param;
    default:
      return null;
  }
}

// node_modules/@cloudinary/url-gen/backwards/expression.js
var Expression2 = class _Expression {
  constructor(expressionStr) {
    this.expressions = [];
    if (expressionStr != null) {
      this.expressions.push(_Expression.normalize(expressionStr));
    }
  }
  /**
   * Convenience constructor method
   * @function Expression.new
   */
  static new(expressionStr) {
    return new this(expressionStr);
  }
  /**
   * Normalize a string expression
   * @function Cloudinary#normalize
   * @param {string} expression a expression, e.g. "w gt 100", "width_gt_100", "width > 100"
   * @return {string} the normalized form of the value expression, e.g. "w_gt_100"
   */
  static normalize(expression2) {
    var operators, operatorsPattern, operatorsReplaceRE, predefinedVarsPattern, predefinedVarsReplaceRE;
    if (expression2 == null) {
      return expression2;
    }
    expression2 = String(expression2);
    operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*|\\^";
    operatorsPattern = "((" + operators + ")(?=[ _]))";
    operatorsReplaceRE = new RegExp(operatorsPattern, "g");
    expression2 = expression2.replace(operatorsReplaceRE, (match) => OPERATORS[match]);
    predefinedVarsPattern = "(" + Object.keys(PREDEFINED_VARS).join("|") + ")";
    predefinedVarsReplaceRE = new RegExp(predefinedVarsPattern, "g");
    expression2 = expression2.replace(predefinedVarsReplaceRE, (match, p1, offset) => expression2[offset - 1] === "$" ? match : PREDEFINED_VARS[match]);
    return expression2.replace(/[ _]+/g, "_");
  }
  /**
   * Serialize the expression
   * @return {string} the expression as a string
   */
  serialize() {
    return _Expression.normalize(this.expressions.join("_"));
  }
  toString() {
    return this.serialize();
  }
  /**
   * Get the parent transformation of this expression
   * @return Transformation
   */
  getParent() {
    return this.parent;
  }
  /**
   * Set the parent transformation of this expression
   * @param {Transformation} the parent transformation
   * @return {Expression} this expression
   */
  setParent(parent) {
    this.parent = parent;
    return this;
  }
  /**
   * Add a expression
   * @function Expression#predicate
   * @internal
   */
  predicate(name2, operator, value) {
    if (OPERATORS[operator] != null) {
      operator = OPERATORS[operator];
    }
    this.expressions.push(`${name2}_${operator}_${value}`);
    return this;
  }
  /**
   * @function Expression#and
   */
  and() {
    this.expressions.push("and");
    return this;
  }
  /**
   * @function Expression#or
   */
  or() {
    this.expressions.push("or");
    return this;
  }
  /**
   * Conclude expression
   * @function Expression#then
   * @return {Transformation} the transformation this expression is defined for
   */
  then() {
    return this.getParent().if(this.toString());
  }
  /**
   * @function Expression#height
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Expression} this expression
   */
  height(operator, value) {
    return this.predicate("h", operator, value);
  }
  /**
   * @function Expression#width
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Expression} this expression
   */
  width(operator, value) {
    return this.predicate("w", operator, value);
  }
  /**
   * @function Expression#aspectRatio
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Expression} this expression
   */
  aspectRatio(operator, value) {
    return this.predicate("ar", operator, value);
  }
  /**
   * @function Expression#pages
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Expression} this expression
   */
  pageCount(operator, value) {
    return this.predicate("pc", operator, value);
  }
  /**
   * @function Expression#faces
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Expression} this expression
   */
  faceCount(operator, value) {
    return this.predicate("fc", operator, value);
  }
  value(value) {
    this.expressions.push(value);
    return this;
  }
  /**
   */
  static variable(name2, value) {
    return new this(name2).value(value);
  }
  /**
   * @returns Expression a new expression with the predefined variable "width"
   * @function Expression.width
   */
  static width() {
    return new this("width");
  }
  /**
   * @returns Expression a new expression with the predefined variable "height"
   * @function Expression.height
   */
  static height() {
    return new this("height");
  }
  /**
   * @returns Expression a new expression with the predefined variable "initialWidth"
   * @function Expression.initialWidth
   */
  static initialWidth() {
    return new this("initialWidth");
  }
  /**
   * @returns Expression a new expression with the predefined variable "initialHeight"
   * @function Expression.initialHeight
   */
  static initialHeight() {
    return new this("initialHeight");
  }
  /**
   * @returns Expression a new expression with the predefined variable "aspectRatio"
   * @function Expression.aspectRatio
   */
  static aspectRatio() {
    return new this("aspectRatio");
  }
  /**
   * @returns Expression a new expression with the predefined variable "initialAspectRatio"
   * @function Expression.initialAspectRatio
   */
  static initialAspectRatio() {
    return new this("initialAspectRatio");
  }
  /**
   * @returns Expression a new expression with the predefined variable "pageCount"
   * @function Expression.pageCount
   */
  static pageCount() {
    return new this("pageCount");
  }
  /**
   * @returns Expression new expression with the predefined variable "faceCount"
   * @function Expression.faceCount
   */
  static faceCount() {
    return new this("faceCount");
  }
  /**
   * @returns Expression a new expression with the predefined variable "currentPage"
   * @function Expression.currentPage
   */
  static currentPage() {
    return new this("currentPage");
  }
  /**
   * @returns Expression a new expression with the predefined variable "tags"
   * @function Expression.tags
   */
  static tags() {
    return new this("tags");
  }
  /**
   * @returns Expression a new expression with the predefined variable "pageX"
   * @function Expression.pageX
   */
  static pageX() {
    return new this("pageX");
  }
  /**
   * @returns Expression a new expression with the predefined variable "pageY"
   * @function Expression.pageY
   */
  static pageY() {
    return new this("pageY");
  }
};
var OPERATORS = {
  "=": "eq",
  "!=": "ne",
  "<": "lt",
  ">": "gt",
  "<=": "lte",
  ">=": "gte",
  "&&": "and",
  "||": "or",
  "*": "mul",
  "/": "div",
  "+": "add",
  "-": "sub",
  "^": "pow"
};
var PREDEFINED_VARS = {
  "aspect_ratio": "ar",
  "aspectRatio": "ar",
  "current_page": "cp",
  "currentPage": "cp",
  "preview:duration": "preview:duration",
  "duration": "du",
  "face_count": "fc",
  "faceCount": "fc",
  "height": "h",
  "initial_aspect_ratio": "iar",
  "initial_duration": "idu",
  "initial_height": "ih",
  "initial_width": "iw",
  "initialAspectRatio": "iar",
  "initialDuration": "idu",
  "initialHeight": "ih",
  "initialWidth": "iw",
  "page_count": "pc",
  "page_x": "px",
  "page_y": "py",
  "pageCount": "pc",
  "pageX": "px",
  "pageY": "py",
  "tags": "tags",
  "width": "w"
};
var expression_default2 = Expression2;

// node_modules/@cloudinary/url-gen/backwards/condition.js
var Condition = class extends expression_default2 {
  constructor(conditionStr) {
    super(conditionStr);
  }
  /**
   * @function Condition#height
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  height(operator, value) {
    return this.predicate("h", operator, value);
  }
  /**
   * @function Condition#width
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  width(operator, value) {
    return this.predicate("w", operator, value);
  }
  /**
   * @function Condition#aspectRatio
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  aspectRatio(operator, value) {
    return this.predicate("ar", operator, value);
  }
  /**
   * @function Condition#pages
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  pageCount(operator, value) {
    return this.predicate("pc", operator, value);
  }
  /**
   * @function Condition#faces
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  faceCount(operator, value) {
    return this.predicate("fc", operator, value);
  }
  /**
   * @function Condition#duration
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  duration(operator, value) {
    return this.predicate("du", operator, value);
  }
  /**
   * @function Condition#initialDuration
   * @param {string} operator the comparison operator (e.g. "<", "lt")
   * @param {string|number} value the right hand side value
   * @return {Condition} this condition
   */
  initialDuration(operator, value) {
    return this.predicate("idu", operator, value);
  }
};
var condition_default2 = Condition;

// node_modules/@cloudinary/url-gen/backwards/configuration.js
var DEFAULT_CONFIGURATION_PARAMS2 = {
  responsive_class: "cld-responsive",
  responsive_use_breakpoints: true,
  round_dpr: true,
  secure: (typeof window !== "undefined" && window !== null ? window.location ? window.location.protocol : void 0 : void 0) === "https:"
};
var CONFIG_PARAMS2 = [
  "api_key",
  "api_secret",
  "callback",
  "cdn_subdomain",
  "cloud_name",
  "cname",
  "private_cdn",
  "protocol",
  "resource_type",
  "responsive",
  "responsive_class",
  "responsive_use_breakpoints",
  "responsive_width",
  "round_dpr",
  "secure",
  "secure_cdn_subdomain",
  "secure_distribution",
  "shorten",
  "type",
  "upload_preset",
  "url_suffix",
  "use_root_path",
  "version",
  "externalLibraries",
  "max_timeout_ms"
];

// node_modules/@cloudinary/url-gen/backwards/utils/legacyBaseUtil.js
var withCamelCaseKeys2 = function(source3) {
  return convertKeys(source3, camelCase2);
};
var camelCase2 = function(source3) {
  let words = source3.match(reWords2);
  words = words.map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase());
  words[0] = words[0].toLocaleLowerCase();
  return words.join("");
};
var convertKeys = function(source3, converter) {
  var result, value;
  result = {};
  for (let key in source3) {
    value = source3[key];
    if (converter) {
      key = converter(key);
    }
    if (!isEmpty2(key)) {
      result[key] = value;
    }
  }
  return result;
};
var reWords2 = function() {
  var lower, upper;
  upper = "[A-Z]";
  lower = "[a-z]+";
  return RegExp(upper + "+(?=" + upper + lower + ")|" + upper + "?" + lower + "|" + upper + "+|[0-9]+", "g");
}();
function identity2(x) {
  return x;
}
function contains2(a, obj) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}
function difference2(arr1, arr2) {
  return arr1.filter((x) => !arr2.includes(x));
}

// node_modules/@cloudinary/url-gen/backwards/legacyLayer/subtitleslayer.js
var SubtitlesLayer = class extends textlayer_default2 {
  /**
   * Represent a subtitles layer
   * @constructor SubtitlesLayer
   * @param {Object} options - layer parameters
   */
  constructor(options) {
    super(options);
    this.options.resourceType = "subtitles";
  }
};
var subtitleslayer_default2 = SubtitlesLayer;

// node_modules/@cloudinary/url-gen/internal/utils/dataStructureUtils.js
function isString2(value) {
  return typeof value === "string" || value instanceof String;
}

// node_modules/@cloudinary/url-gen/backwards/legacyLayer/fetchlayer.js
var FetchLayer = class extends layer_default2 {
  /**
   * @class FetchLayer
   * @classdesc Creates an image layer using a remote URL.
   * @param {Object|string} options - layer parameters or a url
   * @param {string} options.url the url of the image to fetch
   */
  constructor(options) {
    super(options);
    if (isString2(options)) {
      this.options.url = options;
    } else if (options != null ? options.url : void 0) {
      this.options.url = options.url;
    }
  }
  url(url) {
    this.options.url = url;
    return this;
  }
  /**
   * generate the string representation of the layer
   * @function FetchLayer#toString
   * @return {String}
   */
  toString() {
    return `fetch:${base64Encode2(this.options.url)}`;
  }
};
var fetchlayer_default2 = FetchLayer;

// node_modules/@cloudinary/url-gen/backwards/utils/isFunction.js
function isFunction4(variableToCheck) {
  return variableToCheck instanceof Function;
}

// node_modules/@cloudinary/url-gen/backwards/transformation.js
var URL_KEYS = [
  "accessibility",
  "api_secret",
  "auth_token",
  "cdn_subdomain",
  "cloud_name",
  "cname",
  "format",
  "placeholder",
  "private_cdn",
  "resource_type",
  "secure",
  "secure_cdn_subdomain",
  "secure_distribution",
  "shorten",
  "sign_url",
  "signature",
  "ssl_detected",
  "type",
  "url_suffix",
  "use_root_path",
  "version"
];
function assignNotNull(target, ...sources) {
  sources.forEach((source3) => {
    Object.keys(source3).forEach((key) => {
      if (source3[key] != null) {
        target[key] = source3[key];
      }
    });
  });
  return target;
}
var allStrings = function(list) {
  return list.length && list.every(isString2);
};
var Param = class {
  /**
   * Represents a single parameter.
   * @class Param
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} shortName - The name of the serialized form of the parameter.
   *                         If a value is not provided, the parameter will not be serialized.
   * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
   * @ignore
   */
  constructor(name2, shortName, process2 = identity2) {
    this.name = name2;
    this.shortName = shortName;
    this.process = process2;
  }
  /**
   * Set a (unprocessed) value for this parameter
   * @function Param#set
   * @param {*} origValue - the value of the parameter
   * @return {Param} self for chaining
   */
  set(origValue) {
    this.origValue = origValue;
    return this;
  }
  /**
   * Generate the serialized form of the parameter
   * @function Param#serialize
   * @return {string} the serialized form of the parameter
   */
  serialize() {
    var val, valid;
    val = this.value();
    valid = Array.isArray(val) || isObject5(val) || isString2(val) ? !isEmpty2(val) : val != null;
    if (this.shortName != null && valid) {
      return `${this.shortName}_${val}`;
    } else {
      return "";
    }
  }
  /**
   * Return the processed value of the parameter
   * @function Param#value
   */
  value() {
    return this.process(this.origValue);
  }
  static norm_color(value) {
    return value != null ? value.replace(/^#/, "rgb:") : void 0;
  }
  static build_array(arg) {
    if (arg == null) {
      return [];
    } else if (Array.isArray(arg)) {
      return arg;
    } else {
      return [arg];
    }
  }
  /**
   * Covert value to video codec string.
   *
   * If the parameter is an object,
   * @param {(string|Object)} param - the video codec as either a String or a Hash
   * @return {string} the video codec string in the format codec:profile:level
   * @example
   * vc_[ :profile : [level]]
   * or
   { codec: 'h264', profile: 'basic', level: '3.1' }
   * @ignore
   */
  static process_video_params(param) {
    var video2;
    switch (param.constructor) {
      case Object:
        video2 = "";
        if ("codec" in param) {
          video2 = param.codec;
          if ("profile" in param) {
            video2 += ":" + param.profile;
            if ("level" in param) {
              video2 += ":" + param.level;
            }
          }
        }
        return video2;
      case String:
        return param;
      default:
        return null;
    }
  }
};
var ArrayParam = class extends Param {
  /**
   * A parameter that represents an array.
   * @param {string} name - The name of the parameter in snake_case.
   * @param {string} shortName - The name of the serialized form of the parameter
   *                         If a value is not provided, the parameter will not be serialized.
   * @param {string} [sep='.'] - The separator to use when joining the array elements together
   * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
   * @class ArrayParam
   * @extends Param
   * @ignore
   */
  constructor(name2, shortName, sep = ".", process2 = void 0) {
    super(name2, shortName, process2);
    this.sep = sep;
  }
  serialize() {
    if (this.shortName != null) {
      let arrayValue = this.value();
      if (isEmpty2(arrayValue)) {
        return "";
      } else if (isString2(arrayValue)) {
        return `${this.shortName}_${arrayValue}`;
      } else {
        let flat = arrayValue.map((t) => isFunction4(t.serialize) ? t.serialize() : t).join(this.sep);
        return `${this.shortName}_${flat}`;
      }
    } else {
      return "";
    }
  }
  value() {
    if (Array.isArray(this.origValue)) {
      return this.origValue.map((v) => this.process(v));
    } else {
      return this.process(this.origValue);
    }
  }
  set(origValue) {
    if (origValue == null || Array.isArray(origValue)) {
      return super.set(origValue);
    } else {
      return super.set([origValue]);
    }
  }
};
var TransformationParam = class extends Param {
  /**
   * A parameter that represents a transformation
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} [shortName='t'] - The name of the serialized form of the parameter
   * @param {string} [sep='.'] - The separator to use when joining the array elements together
   * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
   * @class TransformationParam
   * @extends Param
   * @ignore
   */
  constructor(name2, shortName = "t", sep = ".", process2 = void 0) {
    super(name2, shortName, process2);
    this.sep = sep;
  }
  /**
   * Generate string representations of the transformation.
   * @returns {*} Returns either the transformation as a string, or an array of string representations.
   */
  serialize() {
    let result = "";
    const val = this.value();
    if (isEmpty2(val)) {
      return result;
    }
    if (allStrings(val)) {
      const joined = val.join(this.sep);
      if (!isEmpty2(joined)) {
        result = `${this.shortName}_${joined}`;
      }
    } else {
      result = val.map((t) => {
        if (isString2(t) && !isEmpty2(t)) {
          return `${this.shortName}_${t}`;
        }
        if (isFunction4(t.serialize)) {
          return t.serialize();
        }
        if (isObject5(t) && !isEmpty2(t)) {
          return new Transformation2(t).serialize();
        }
        return void 0;
      }).filter((t) => t);
    }
    return result;
  }
  set(origValue1) {
    this.origValue = origValue1;
    if (Array.isArray(this.origValue)) {
      return super.set(this.origValue);
    } else {
      return super.set([this.origValue]);
    }
  }
};
var number_pattern2 = "([0-9]*)\\.([0-9]+)|([0-9]+)";
var offset_any_pattern2 = "(" + number_pattern2 + ")([%pP])?";
var RangeParam = class _RangeParam extends Param {
  /**
   * A parameter that represents a range
   * @param {string} name - The name of the parameter in snake_case
   * @param {string} shortName - The name of the serialized form of the parameter
   *                         If a value is not provided, the parameter will not be serialized.
   * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
   * @class RangeParam
   * @extends Param
   * @ignore
   */
  constructor(name2, shortName, process2 = _RangeParam.norm_range_value) {
    super(name2, shortName, process2);
  }
  static norm_range_value(value) {
    let offset = String(value).match(new RegExp("^" + offset_any_pattern2 + "$"));
    if (offset) {
      let modifier = offset[5] != null ? "p" : "";
      value = (offset[1] || offset[4]) + modifier;
    }
    return value;
  }
};
var RawParam = class extends Param {
  constructor(name2, shortName, process2 = identity2) {
    super(name2, shortName, process2);
  }
  serialize() {
    return this.value();
  }
};
var LayerParam = class extends Param {
  // Parse layer options
  // @return [string] layer transformation string
  // @private
  value() {
    if (this.origValue == null) {
      return "";
    }
    let result;
    if (this.origValue instanceof layer_default2) {
      result = this.origValue;
    } else if (isObject5(this.origValue)) {
      let layerOptions = withCamelCaseKeys2(this.origValue);
      if (layerOptions.resourceType === "text" || layerOptions.text != null) {
        result = new textlayer_default2(layerOptions);
      } else {
        if (layerOptions.resourceType === "subtitles") {
          result = new subtitleslayer_default2(layerOptions);
        } else {
          if (layerOptions.resourceType === "fetch" || layerOptions.url != null) {
            result = new fetchlayer_default2(layerOptions);
          } else {
            result = new layer_default2(layerOptions);
          }
        }
      }
    } else if (isString2(this.origValue)) {
      if (/^fetch:.+/.test(this.origValue)) {
        result = new fetchlayer_default2(this.origValue.substr(6));
      } else {
        result = this.origValue;
      }
    } else {
      result = "";
    }
    return result.toString();
  }
  static textStyle(layer) {
    return new textlayer_default2(layer).textStyleIdentifier();
  }
};
var TransformationBase = class _TransformationBase {
  /**
   * The base class for transformations.
   * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
   * @class TransformationBase
   */
  constructor(options) {
    let parent;
    let trans;
    parent = void 0;
    trans = {};
    this.toOptions = (withChain) => {
      let opt = {};
      if (withChain == null) {
        withChain = true;
      }
      Object.keys(trans).forEach((key) => opt[key] = trans[key].origValue);
      assignNotNull(opt, this.otherOptions);
      if (withChain && !isEmpty2(this.chained)) {
        let list = this.chained.map((tr) => tr.toOptions());
        list.push(opt);
        opt = {};
        assignNotNull(opt, this.otherOptions);
        opt.transformation = list;
      }
      return opt;
    };
    this.setParent = (object) => {
      parent = object;
      if (object != null) {
        this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
      }
      return this;
    };
    this.getParent = () => {
      return parent;
    };
    this.param = (value, name2, abbr, defaultValue, process2) => {
      if (process2 == null) {
        if (isFunction4(defaultValue)) {
          process2 = defaultValue;
        } else {
          process2 = identity2;
        }
      }
      trans[name2] = new Param(name2, abbr, process2).set(value);
      return this;
    };
    this.rawParam = function(value, name2, abbr, defaultValue, process2) {
      process2 = lastArgCallback(arguments);
      trans[name2] = new RawParam(name2, abbr, process2).set(value);
      return this;
    };
    this.rangeParam = function(value, name2, abbr, defaultValue, process2) {
      process2 = lastArgCallback(arguments);
      trans[name2] = new RangeParam(name2, abbr, process2).set(value);
      return this;
    };
    this.arrayParam = function(value, name2, abbr, sep = ":", defaultValue = [], process2 = void 0) {
      process2 = lastArgCallback(arguments);
      trans[name2] = new ArrayParam(name2, abbr, sep, process2).set(value);
      return this;
    };
    this.transformationParam = function(value, name2, abbr, sep = ".", defaultValue = void 0, process2 = void 0) {
      process2 = lastArgCallback(arguments);
      trans[name2] = new TransformationParam(name2, abbr, sep, process2).set(value);
      return this;
    };
    this.layerParam = function(value, name2, abbr) {
      trans[name2] = new LayerParam(name2, abbr).set(value);
      return this;
    };
    this.getValue = function(name2) {
      let value = trans[name2] && trans[name2].value();
      return value != null ? value : this.otherOptions[name2];
    };
    this.get = function(name2) {
      return trans[name2];
    };
    this.remove = function(name2) {
      var temp;
      switch (false) {
        case trans[name2] == null:
          temp = trans[name2];
          delete trans[name2];
          return temp.origValue;
        case this.otherOptions[name2] == null:
          temp = this.otherOptions[name2];
          delete this.otherOptions[name2];
          return temp;
        default:
          return null;
      }
    };
    this.keys = function() {
      var key;
      return function() {
        var results;
        results = [];
        for (key in trans) {
          if (key != null) {
            results.push(key.match(VAR_NAME_RE) ? key : snakeCase2(key));
          }
        }
        return results;
      }().sort();
    };
    this.toPlainObject = function() {
      var hash, key, list;
      hash = {};
      for (key in trans) {
        hash[key] = trans[key].value();
        if (isObject5(hash[key])) {
          hash[key] = cloneDeep2(hash[key]);
        }
      }
      if (!isEmpty2(this.chained)) {
        list = this.chained.map((tr) => tr.toPlainObject());
        list.push(hash);
        hash = {
          transformation: list
        };
      }
      return hash;
    };
    this.chain = function() {
      var names, tr;
      names = Object.getOwnPropertyNames(trans);
      if (names.length !== 0) {
        tr = new this.constructor(this.toOptions(false));
        this.resetTransformations();
        this.chained.push(tr);
      }
      return this;
    };
    this.resetTransformations = function() {
      trans = {};
      return this;
    };
    this.otherOptions = {};
    this.chained = [];
    this.fromOptions(options);
  }
  /**
   * Merge the provided options with own's options
   * @param {Object} [options={}] key-value list of options
   * @returns {Transformation} Returns this instance for chaining
   */
  fromOptions(options = {}) {
    if (options instanceof _TransformationBase) {
      this.fromTransformation(options);
    } else {
      if (isString2(options) || Array.isArray(options)) {
        options = {
          transformation: options
        };
      }
      options = cloneDeep2(options);
      if (options["if"]) {
        this.set("if", options["if"]);
        delete options["if"];
      }
      for (let key in options) {
        let opt = options[key];
        if (opt != null) {
          if (key.match(VAR_NAME_RE)) {
            if (key !== "$attr") {
              this.set("variable", key, opt);
            }
          } else {
            this.set(key, opt);
          }
        }
      }
    }
    return this;
  }
  fromTransformation(other) {
    if (other instanceof _TransformationBase) {
      other.keys().forEach((key) => this.set(key, other.get(key).origValue));
    }
    return this;
  }
  /**
   * Set a parameter.
   * The parameter name `key` is converted to
   * @param {string} key - the name of the parameter
   * @param {*} values - the value of the parameter
   * @returns {Transformation} Returns this instance for chaining
   */
  set(key, ...values) {
    let camelKey;
    camelKey = camelCase2(key);
    if (contains2(methods2, camelKey)) {
      this[camelKey].apply(this, values);
    } else {
      this.otherOptions[key] = values[0];
    }
    return this;
  }
  hasLayer() {
    return this.getValue("overlay") || this.getValue("underlay");
  }
  /**
   * Generate a string representation of the transformation.
   * @function Transformation#serialize
   * @return {string} Returns the transformation as a string
   */
  serialize() {
    var ifParam, j, len, paramList, ref, ref1, ref2, ref3, ref4, resultArray, t, transformationList, transformationString, transformations, value, variables, vars;
    resultArray = this.chained.map((tr) => tr.serialize());
    paramList = this.keys();
    transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
    ifParam = (ref1 = this.get("if")) != null ? ref1.serialize() : void 0;
    variables = processVar((ref2 = this.get("variables")) != null ? ref2.value() : void 0);
    paramList = difference2(paramList, ["transformation", "if", "variables"]);
    vars = [];
    transformationList = [];
    for (j = 0, len = paramList.length; j < len; j++) {
      t = paramList[j];
      if (t.match(VAR_NAME_RE)) {
        vars.push(t + "_" + expression_default2.normalize((ref3 = this.get(t)) != null ? ref3.value() : void 0));
      } else {
        transformationList.push((ref4 = this.get(t)) != null ? ref4.serialize() : void 0);
      }
    }
    switch (false) {
      case !isString2(transformations):
        transformationList.push(transformations);
        break;
      case !Array.isArray(transformations):
        resultArray = resultArray.concat(transformations);
    }
    transformationList = function() {
      var k, len1, results;
      results = [];
      for (k = 0, len1 = transformationList.length; k < len1; k++) {
        value = transformationList[k];
        if (Array.isArray(value) && !isEmpty2(value) || !Array.isArray(value) && value) {
          results.push(value);
        }
      }
      return results;
    }();
    transformationList = vars.sort().concat(variables).concat(transformationList.sort());
    if (ifParam === "if_end") {
      transformationList.push(ifParam);
    } else if (!isEmpty2(ifParam)) {
      transformationList.unshift(ifParam);
    }
    transformationString = transformationList.filter((x) => !!x).join(param_separator);
    if (!isEmpty2(transformationString)) {
      resultArray.push(transformationString);
    }
    return resultArray.filter((x) => !!x).join(trans_separator);
  }
  /**
   * Provide a list of all the valid transformation option names
   * @function Transformation#listNames
   * @private
   * @return {Array<string>} a array of all the valid option names
   */
  static listNames() {
    return methods2;
  }
  /**
   * Returns the attributes for an HTML tag.
   * @function Cloudinary.toHtmlAttributes
   * @return PlainObject
   */
  toHtmlAttributes() {
    let attrName, height, options, ref2, ref3, value, width;
    options = {};
    let snakeCaseKey;
    Object.keys(this.otherOptions).forEach((key) => {
      value = this.otherOptions[key];
      snakeCaseKey = snakeCase2(key);
      if (!contains2(PARAM_NAMES2, snakeCaseKey) && !contains2(URL_KEYS, snakeCaseKey)) {
        attrName = /^html_/.test(key) ? key.slice(5) : key;
        options[attrName] = value;
      }
    });
    this.keys().forEach((key) => {
      if (/^html_/.test(key)) {
        options[camelCase2(key.slice(5))] = this.getValue(key);
      }
    });
    if (!(this.hasLayer() || this.getValue("angle") || contains2(["fit", "limit", "lfill"], this.getValue("crop")))) {
      width = (ref2 = this.get("width")) != null ? ref2.origValue : void 0;
      height = (ref3 = this.get("height")) != null ? ref3.origValue : void 0;
      if (parseFloat(width) >= 1) {
        if (options.width == null) {
          options.width = width;
        }
      }
      if (parseFloat(height) >= 1) {
        if (options.height == null) {
          options.height = height;
        }
      }
    }
    return options;
  }
  static isValidParamName(name2) {
    return methods2.indexOf(camelCase2(name2)) >= 0;
  }
  /**
   * Delegate to the parent (up the call chain) to produce HTML
   * @function Transformation#toHtml
   * @return {string} HTML representation of the parent if possible.
   * @example
   * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
   * // ImageTag {name: "img", publicId: "sample"}
   * tag.toHtml()
   * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
   * tag.transformation().crop("fit").width(300).toHtml()
   * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
   */
  toHtml() {
    var ref;
    return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
  }
  toString() {
    return this.serialize();
  }
  clone() {
    return new _TransformationBase(this.toOptions(true));
  }
};
var VAR_NAME_RE = /^\$[a-zA-Z0-9]+$/;
var trans_separator = "/";
var param_separator = ",";
function lastArgCallback(args) {
  var callback;
  callback = args != null ? args[args.length - 1] : void 0;
  if (isFunction4(callback)) {
    return callback;
  } else {
    return void 0;
  }
}
function processVar(varArray) {
  var j, len, name2, results, v;
  if (Array.isArray(varArray)) {
    results = [];
    for (j = 0, len = varArray.length; j < len; j++) {
      [name2, v] = varArray[j];
      results.push(`${name2}_${expression_default2.normalize(v)}`);
    }
    return results;
  } else {
    return varArray;
  }
}
function processCustomFunction3({ function_type, source: source3 }) {
  if (function_type === "remote") {
    return [function_type, btoa(source3)].join(":");
  } else if (function_type === "wasm") {
    return [function_type, source3].join(":");
  }
}
var Transformation2 = class _Transformation extends TransformationBase {
  /**
   * Represents a single transformation.
   * @class Transformation
   * @example
   * t = new cloudinary.Transformation();
   * t.angle(20).crop("scale").width("auto");
   *
   * // or
   *
   * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
   * @see <a href="https://cloudinary.com/documentation/image_transformation_reference"
   *  target="_blank">Available image transformations</a>
   * @see <a href="https://cloudinary.com/documentation/video_transformation_reference"
   *  target="_blank">Available video transformations</a>
   */
  constructor(options) {
    super(options);
  }
  /**
   * Convenience constructor
   * @param {Object} options
   * @return {Transformation}
   * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
   */
  static new(options) {
    return new _Transformation(options);
  }
  /*
    Transformation Parameters
  */
  angle(value) {
    this.arrayParam(value, "angle", "a", ".", expression_default2.normalize);
    return this;
  }
  audioCodec(value) {
    this.param(value, "audio_codec", "ac");
    return this;
  }
  audioFrequency(value) {
    this.param(value, "audio_frequency", "af");
    return this;
  }
  aspectRatio(value) {
    this.param(value, "aspect_ratio", "ar", expression_default2.normalize);
    return this;
  }
  background(value) {
    this.param(value, "background", "b", Param.norm_color);
    return this;
  }
  bitRate(value) {
    this.param(value, "bit_rate", "br");
    return this;
  }
  border(value) {
    return this.param(value, "border", "bo", (border2) => {
      if (isObject5(border2)) {
        border2 = Object.assign({}, {
          color: "black",
          width: 2
        }, border2);
        return `${border2.width}px_solid_${Param.norm_color(border2.color)}`;
      } else {
        return border2;
      }
    });
  }
  color(value) {
    this.param(value, "color", "co", Param.norm_color);
    return this;
  }
  colorSpace(value) {
    this.param(value, "color_space", "cs");
    return this;
  }
  crop(value) {
    this.param(value, "crop", "c");
    return this;
  }
  customFunction(value) {
    return this.param(value, "custom_function", "fn", () => {
      return processCustomFunction3(value);
    });
  }
  customPreFunction(value) {
    if (this.get("custom_function")) {
      return;
    }
    return this.rawParam(value, "custom_function", "", () => {
      value = processCustomFunction3(value);
      return value ? `fn_pre:${value}` : value;
    });
  }
  defaultImage(value) {
    this.param(value, "default_image", "d");
    return this;
  }
  delay(value) {
    this.param(value, "delay", "dl");
    return this;
  }
  density(value) {
    this.param(value, "density", "dn");
    return this;
  }
  duration(value) {
    this.rangeParam(value, "duration", "du");
    return this;
  }
  dpr(value) {
    return this.param(value, "dpr", "dpr", (dpr2) => {
      dpr2 = dpr2.toString();
      if (dpr2 != null ? dpr2.match(/^\d+$/) : void 0) {
        return dpr2 + ".0";
      } else {
        return expression_default2.normalize(dpr2);
      }
    });
  }
  effect(value) {
    this.arrayParam(value, "effect", "e", ":", expression_default2.normalize);
    return this;
  }
  else() {
    return this.if("else");
  }
  endIf() {
    return this.if("end");
  }
  endOffset(value) {
    this.rangeParam(value, "end_offset", "eo");
    return this;
  }
  fallbackContent(value) {
    this.param(value, "fallback_content");
    return this;
  }
  fetchFormat(value) {
    this.param(value, "fetch_format", "f");
    return this;
  }
  format(value) {
    this.param(value, "format");
    return this;
  }
  flags(value) {
    this.arrayParam(value, "flags", "fl", ".");
    return this;
  }
  gravity(value) {
    this.param(value, "gravity", "g");
    return this;
  }
  fps(value) {
    return this.param(value, "fps", "fps", (fps2) => {
      if (isString2(fps2)) {
        return fps2;
      } else if (Array.isArray(fps2)) {
        return fps2.join("-");
      } else {
        return fps2;
      }
    });
  }
  height(value) {
    return this.param(value, "height", "h", () => {
      if (this.getValue("crop") || this.getValue("overlay") || this.getValue("underlay")) {
        return expression_default2.normalize(value);
      } else {
        return null;
      }
    });
  }
  htmlHeight(value) {
    this.param(value, "html_height");
    return this;
  }
  htmlWidth(value) {
    this.param(value, "html_width");
    return this;
  }
  if(value = "") {
    var i, ifVal, j, ref, trIf, trRest;
    switch (value) {
      case "else":
        this.chain();
        return this.param(value, "if", "if");
      case "end":
        this.chain();
        for (i = j = ref = this.chained.length - 1; j >= 0; i = j += -1) {
          ifVal = this.chained[i].getValue("if");
          if (ifVal === "end") {
            break;
          } else if (ifVal != null) {
            trIf = _Transformation.new().if(ifVal);
            this.chained[i].remove("if");
            trRest = this.chained[i];
            this.chained[i] = _Transformation.new().transformation([trIf, trRest]);
            if (ifVal !== "else") {
              break;
            }
          }
        }
        return this.param(value, "if", "if");
      case "":
        return condition_default2.new().setParent(this);
      default:
        return this.param(value, "if", "if", (value2) => {
          return condition_default2.new(value2).toString();
        });
    }
  }
  keyframeInterval(value) {
    this.param(value, "keyframe_interval", "ki");
    return this;
  }
  ocr(value) {
    this.param(value, "ocr", "ocr");
    return this;
  }
  offset(value) {
    var end_o, start_o;
    [start_o, end_o] = isFunction4(value != null ? value.split : void 0) ? value.split("..") : Array.isArray(value) ? value : [null, null];
    if (start_o != null) {
      this.startOffset(start_o);
    }
    if (end_o != null) {
      return this.endOffset(end_o);
    }
  }
  opacity(value) {
    this.param(value, "opacity", "o", expression_default2.normalize);
    return this;
  }
  overlay(value) {
    this.layerParam(value, "overlay", "l");
    return this;
  }
  page(value) {
    this.param(value, "page", "pg");
    return this;
  }
  poster(value) {
    this.param(value, "poster");
    return this;
  }
  prefix(value) {
    this.param(value, "prefix", "p");
    return this;
  }
  quality(value) {
    this.param(value, "quality", "q", expression_default2.normalize);
    return this;
  }
  radius(value) {
    this.arrayParam(value, "radius", "r", ":", expression_default2.normalize);
    return this;
  }
  rawTransformation(value) {
    this.rawParam(value, "raw_transformation");
    return this;
  }
  size(value) {
    let height, width;
    if (isFunction4(value != null ? value.split : void 0)) {
      [width, height] = value.split("x");
      this.width(width);
      return this.height(height);
    }
  }
  sourceTypes(value) {
    this.param(value, "source_types");
    return this;
  }
  sourceTransformation(value) {
    return this.param(value, "source_transformation");
  }
  startOffset(value) {
    this.rangeParam(value, "start_offset", "so");
    return this;
  }
  streamingProfile(value) {
    this.param(value, "streaming_profile", "sp");
    return this;
  }
  transformation(value) {
    this.transformationParam(value, "transformation", "t");
    return this;
  }
  underlay(value) {
    this.layerParam(value, "underlay", "u");
    return this;
  }
  variable(name2, value) {
    this.param(value, name2, name2);
    return this;
  }
  variables(values) {
    this.arrayParam(values, "variables");
    return this;
  }
  videoCodec(value) {
    this.param(value, "video_codec", "vc", Param.process_video_params);
    return this;
  }
  videoSampling(value) {
    this.param(value, "video_sampling", "vs");
    return this;
  }
  width(value) {
    this.param(value, "width", "w", () => {
      if (this.getValue("crop") || this.getValue("overlay") || this.getValue("underlay")) {
        return expression_default2.normalize(value);
      } else {
        return null;
      }
    });
    return this;
  }
  x(value) {
    this.param(value, "x", "x", expression_default2.normalize);
    return this;
  }
  y(value) {
    this.param(value, "y", "y", expression_default2.normalize);
    return this;
  }
  zoom(value) {
    this.param(value, "zoom", "z", expression_default2.normalize);
    return this;
  }
};
var methods2 = [
  "angle",
  "audioCodec",
  "audioFrequency",
  "aspectRatio",
  "background",
  "bitRate",
  "border",
  "color",
  "colorSpace",
  "crop",
  "customFunction",
  "customPreFunction",
  "defaultImage",
  "delay",
  "density",
  "duration",
  "dpr",
  "effect",
  "else",
  "endIf",
  "endOffset",
  "fallbackContent",
  "fetchFormat",
  "format",
  "flags",
  "gravity",
  "fps",
  "height",
  "htmlHeight",
  "htmlWidth",
  "if",
  "keyframeInterval",
  "ocr",
  "offset",
  "opacity",
  "overlay",
  "page",
  "poster",
  "prefix",
  "quality",
  "radius",
  "rawTransformation",
  "size",
  "sourceTypes",
  "sourceTransformation",
  "startOffset",
  "streamingProfile",
  "transformation",
  "underlay",
  "variable",
  "variables",
  "videoCodec",
  "videoSampling",
  "width",
  "x",
  "y",
  "zoom"
];
var PARAM_NAMES2 = methods2.map(snakeCase2).concat(CONFIG_PARAMS2);
var transformation_default2 = Transformation2;

// node_modules/@cloudinary/url-gen/backwards/transformationProcessing/processDpr.js
function processDpr2(value) {
  let dpr2 = value.toString();
  if (dpr2 != null ? dpr2.match(/^\d+$/) : void 0) {
    return dpr2 + ".0";
  } else {
    return expression_default2.normalize(dpr2);
  }
}

// node_modules/@cloudinary/url-gen/backwards/generateTransformationString.js
function generateTransformationString2(transformationOptions) {
  if (typeof transformationOptions === "string") {
    return transformationOptions;
  }
  if (transformationOptions instanceof transformation_default2) {
    return transformationOptions.toString();
  }
  if (Array.isArray(transformationOptions)) {
    return transformationOptions.map((singleTransformation) => {
      return generateTransformationString2(singleTransformation);
    }).filter((a) => {
      return a;
    }).join("/");
  }
  let width;
  let height;
  const size = transformationOptions.size;
  const hasLayer = transformationOptions.overlay || transformationOptions.underlay;
  const crop2 = transformationOptions.crop;
  const angle = toArray2(transformationOptions.angle).join(".");
  const background = (transformationOptions.background || "").replace(/^#/, "rgb:");
  const color2 = (transformationOptions.color || "").replace(/^#/, "rgb:");
  const flags = toArray2(transformationOptions.flags || []).join(".");
  const dpr2 = transformationOptions.dpr === void 0 ? transformationOptions.dpr : processDpr2(transformationOptions.dpr);
  const overlay = processLayer2(transformationOptions.overlay);
  const radius = processRadius2(transformationOptions.radius);
  const underlay = processLayer2(transformationOptions.underlay);
  const ifValue = process_if2(transformationOptions.if);
  const custom_function = processCustomFunction2(transformationOptions.custom_function);
  const custom_pre_function = processCustomPreFunction2(transformationOptions.custom_pre_function);
  let fps2 = transformationOptions.fps;
  let namedTransformations = [];
  let childTransformations = toArray2(transformationOptions.transformation || []);
  let effect = transformationOptions.effect;
  const no_html_sizes = hasLayer || angle || crop2 === "fit" || crop2 === "limit";
  if (size) {
    const [sizeWidth, sizeHeight] = size.split("x");
    width = sizeWidth;
    height = sizeHeight;
  } else {
    width = transformationOptions.width;
    height = transformationOptions.height;
  }
  if (width && (width.toString().indexOf("auto") === 0 || no_html_sizes || parseFloat(width.toString()) < 1)) {
    delete transformationOptions.width;
  }
  if (height && (no_html_sizes || parseFloat(height.toString()) < 1)) {
    delete transformationOptions.height;
  }
  const isAnyChildAnObject = childTransformations.some((transformation) => typeof transformation === "object");
  if (isAnyChildAnObject) {
    childTransformations = childTransformations.map((transformation) => {
      if (isObject5(transformation)) {
        return generateTransformationString2(transformation);
      } else {
        return generateTransformationString2({ transformation });
      }
    }).filter((a) => a);
  } else {
    namedTransformations = childTransformations.join(".");
    childTransformations = [];
  }
  if (Array.isArray(effect)) {
    effect = effect.join(":");
  } else if (isObject5(effect)) {
    effect = Object.entries(effect).map(([key, value]) => `${key}:${value}`);
  }
  let border2 = transformationOptions.border;
  if (isObject5(border2)) {
    border2 = `${border2.width != null ? border2.width : 2}px_solid_${(border2.color != null ? border2.color : "black").replace(/^#/, "rgb:")}`;
  } else {
    if (/^\d+$/.exec(border2)) {
      transformationOptions.border = border2;
      border2 = void 0;
    }
  }
  if (Array.isArray(fps2)) {
    fps2 = fps2.join("-");
  }
  const urlParams = {
    a: legacyNormalizeExpression2(angle),
    ar: legacyNormalizeExpression2(transformationOptions.aspect_ratio),
    b: background,
    bo: border2,
    c: crop2,
    co: color2,
    dpr: legacyNormalizeExpression2(dpr2),
    e: legacyNormalizeExpression2(effect),
    fl: flags,
    fn: custom_function || custom_pre_function,
    fps: fps2,
    h: legacyNormalizeExpression2(height),
    ki: legacyNormalizeExpression2(transformationOptions.keyframe_interval),
    l: overlay,
    o: legacyNormalizeExpression2(transformationOptions.opacity),
    q: legacyNormalizeExpression2(transformationOptions.quality),
    r: radius,
    t: namedTransformations,
    u: underlay,
    w: legacyNormalizeExpression2(width),
    x: legacyNormalizeExpression2(transformationOptions.x),
    y: legacyNormalizeExpression2(transformationOptions.y),
    z: legacyNormalizeExpression2(transformationOptions.zoom),
    ac: transformationOptions.audio_codec,
    af: transformationOptions.audio_frequency,
    br: transformationOptions.bit_rate,
    cs: transformationOptions.color_space,
    d: transformationOptions.default_image,
    dl: transformationOptions.delay,
    dn: transformationOptions.density,
    du: normRangeValues2(transformationOptions.duration),
    eo: normRangeValues2(transformationOptions.end_offset || isNumberLike2(transformationOptions.end_offset) ? transformationOptions.end_offset : splitRange2(transformationOptions.offset)[1]),
    f: transformationOptions.fetch_format,
    g: transformationOptions.gravity,
    pg: transformationOptions.page,
    p: transformationOptions.prefix,
    so: normRangeValues2(transformationOptions.start_offset || isNumberLike2(transformationOptions.start_offset) ? transformationOptions.start_offset : splitRange2(transformationOptions.offset)[0]),
    sp: transformationOptions.streaming_profile,
    vc: processVideoParams2(transformationOptions.video_codec),
    vs: transformationOptions.video_sampling
  };
  const variables = Object.entries(transformationOptions).filter(([key, value]) => key.startsWith("$")).map(([key, value]) => {
    return `${key}_${legacyNormalizeExpression2(value)}`;
  }).sort().concat(
    // @ts-ignore
    (transformationOptions.variables || []).map(([name2, value]) => `${name2}_${legacyNormalizeExpression2(value)}`)
  ).join(",");
  const urlImageTransfomrations = Object.entries(urlParams).filter(([key, value]) => {
    if (typeof value === "undefined" || value === null) {
      return false;
    }
    if (typeof value === "string" && value.length === 0) {
      return false;
    }
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    return true;
  }).map(([key, value]) => `${key}_${value}`).sort().join(",");
  const finalTransformationString = [
    ifValue,
    variables,
    urlImageTransfomrations,
    transformationOptions.raw_transformation
  ].filter((a) => a).join(",");
  if (finalTransformationString) {
    childTransformations.push(finalTransformationString);
  }
  return childTransformations.join("/");
}
var transformationStringFromObject = generateTransformationString2;

// node_modules/@cloudinary/url-gen/backwards/utils/finalizeResourceType.js
function finalize_resource_type2(resource_type, type, url_suffix, use_root_path, shorten) {
  if (type == null) {
    type = "upload";
  }
  if (url_suffix != null) {
    if (resource_type === "image" && type === "upload") {
      resource_type = "images";
      type = null;
    } else if (resource_type === "image" && type === "private") {
      resource_type = "private_images";
      type = null;
    } else if (resource_type === "image" && type === "authenticated") {
      resource_type = "authenticated_images";
      type = null;
    } else if (resource_type === "raw" && type === "upload") {
      resource_type = "files";
      type = null;
    } else if (resource_type === "video" && type === "upload") {
      resource_type = "videos";
      type = null;
    } else {
      throw new Error("URL Suffix only supported for image/upload, image/private, image/authenticated, video/upload and raw/upload");
    }
  }
  if (use_root_path) {
    if (resource_type === "image" && type === "upload" || resource_type === "images" && type == null) {
      resource_type = null;
      type = null;
    } else {
      throw new Error("Root path only supported for image/upload");
    }
  }
  if (shorten && resource_type === "image" && type === "upload") {
    resource_type = "iu";
    type = null;
  }
  return [resource_type, type];
}

// node_modules/@cloudinary/url-gen/backwards/utils/finalize_source.js
function finalize_source2(source3, format2, url_suffix) {
  let source_to_sign;
  source3 = source3.replace(/([^:])\/\//g, "$1/");
  if (source3.match(/^https?:\//i)) {
    source3 = smartEscape2(source3);
    source_to_sign = source3;
  } else {
    source3 = encodeURIComponent(decodeURIComponent(source3)).replace(/%3A/g, ":").replace(/%2F/g, "/");
    source_to_sign = source3;
    if (url_suffix) {
      if (url_suffix.match(/[\.\/]/)) {
        throw new Error("url_suffix should not include . or /");
      }
      source3 = source3 + "/" + url_suffix;
    }
    if (format2 != null) {
      source3 = source3 + "." + format2;
      source_to_sign = source_to_sign + "." + format2;
    }
  }
  return [source3, source_to_sign];
}

// node_modules/@cloudinary/url-gen/backwards/utils/unsigned_url_prefix.js
function unsigned_url_prefix2(source3, cloud_name, private_cdn, cdn_subdomain, secure_cdn_subdomain, cname, secure, secure_distribution) {
  let prefix;
  if (cloud_name.indexOf("/") === 0) {
    return "/res" + cloud_name;
  }
  let shared_domain = !private_cdn;
  if (secure) {
    if (secure_distribution == null || secure_distribution === OLD_AKAMAI_SHARED_CDN2) {
      secure_distribution = private_cdn ? cloud_name + "-res.cloudinary.com" : SHARED_CDN2;
    }
    if (shared_domain == null) {
      shared_domain = secure_distribution === SHARED_CDN2;
    }
    prefix = "https://" + secure_distribution;
  } else if (cname) {
    prefix = "http://" + cname;
  } else {
    let cdn_part = private_cdn ? cloud_name + "-" : "";
    let host = [cdn_part, "res", ".cloudinary.com"].join("");
    prefix = "http://" + host;
  }
  if (shared_domain) {
    prefix += "/" + cloud_name;
  }
  return prefix;
}

// node_modules/@cloudinary/url-gen/backwards/createCloudinaryLegacyURL.js
function createCloudinaryLegacyURL2(public_id, transformationOptions) {
  if (transformationOptions.type === "fetch") {
    if (transformationOptions.fetch_format == null) {
      transformationOptions.fetch_format = transformationOptions.format;
    }
  }
  let source_to_sign;
  let type = transformationOptions.type;
  let resource_type = transformationOptions.resource_type || "image";
  let version = transformationOptions.version;
  const force_version = typeof transformationOptions.force_version === "boolean" ? transformationOptions.force_version : true;
  const long_url_signature = !!transformationOptions.long_url_signature;
  const format2 = transformationOptions.format;
  const cloud_name = transformationOptions.cloud_name;
  if (!cloud_name) {
    throw "cloud_name must be provided in the configuration";
  }
  const private_cdn = transformationOptions.private_cdn;
  const secure_distribution = transformationOptions.secure_distribution;
  const secure = transformationOptions.secure;
  const cdn_subdomain = transformationOptions.cdn_subdomain;
  const secure_cdn_subdomain = transformationOptions.secure_cdn_subdomain;
  const cname = transformationOptions.cname;
  const shorten = transformationOptions.shorten;
  const sign_url = transformationOptions.sign_url;
  const api_secret = transformationOptions.api_secret;
  const url_suffix = transformationOptions.url_suffix;
  const use_root_path = transformationOptions.use_root_path;
  const auth_token = transformationOptions.auth_token;
  const preloaded = /^(image|raw)\/([a-z0-9_]+)\/v(\d+)\/([^#]+)$/.exec(public_id);
  if (preloaded) {
    resource_type = preloaded[1];
    type = preloaded[2];
    version = preloaded[3];
    public_id = preloaded[4];
  }
  const original_source = public_id;
  if (public_id == null) {
    return original_source;
  }
  public_id = public_id.toString();
  if (type === null && public_id.match(/^https?:\//i)) {
    return original_source;
  }
  [resource_type, type] = finalize_resource_type2(resource_type, type, url_suffix, use_root_path, shorten);
  [public_id, source_to_sign] = finalize_source2(public_id, format2, url_suffix);
  if (version == null && force_version && source_to_sign.indexOf("/") >= 0 && !source_to_sign.match(/^v[0-9]+/) && !source_to_sign.match(/^https?:\//)) {
    version = 1;
  }
  if (version != null) {
    version = `v${version}`;
  } else {
    version = null;
  }
  const transformation = generateTransformationString2(cloneDeep2(transformationOptions)).replace(/([^:])\/\//g, "$1/");
  ;
  if (sign_url && !auth_token) {
    let to_sign = [transformation, source_to_sign].filter(function(part) {
      return part != null && part !== "";
    }).join("/");
    try {
      for (let i = 0; to_sign !== decodeURIComponent(to_sign) && i < 10; i++) {
        to_sign = decodeURIComponent(to_sign);
      }
    } catch (error) {
    }
  }
  const prefix = unsigned_url_prefix2(public_id, cloud_name, private_cdn, cdn_subdomain, secure_cdn_subdomain, cname, secure, secure_distribution);
  const resultUrl = [prefix, resource_type, type, transformation, version, public_id].filter(function(part) {
    return part != null && part !== "";
  }).join("/").replace(" ", "%20");
  return resultUrl;
}

// node_modules/@cloudinary/url-gen/actions.js
var actions_exports2 = {};
__export(actions_exports2, {
  Adjust: () => Adjust,
  Animated: () => Animated,
  Border: () => Border,
  CustomFunction: () => CustomFunction,
  Delivery: () => Delivery,
  Effect: () => Effect,
  NamedTransformation: () => NamedTransformation,
  Overlay: () => Overlay,
  PSDTools: () => PSDTools,
  Resize: () => Resize,
  Rotate: () => Rotate,
  RoundCorners: () => RoundCorners,
  Transcode: () => Transcode,
  Underlay: () => Underlay,
  VideoEdit: () => VideoEdit
});

// node_modules/@cloudinary/url-gen/qualifiers.js
var qualifiers_exports2 = {};
__export(qualifiers_exports2, {
  AnimatedFormat: () => AnimatedFormat,
  ArtisticFilter: () => ArtisticFilter,
  AspectRatio: () => AspectRatio,
  AudioCodec: () => AudioCodec,
  AudioFrequency: () => AudioFrequency,
  Background: () => Background,
  ChromaSubSampling: () => ChromaSubSampling,
  Color: () => Color,
  ColorSpace: () => ColorSpace,
  Dither: () => Dither,
  Dpr: () => Dpr,
  Expression: () => Expression,
  FontHinting: () => FontHinting,
  FontStyle: () => FontStyle,
  FontWeight: () => FontWeight,
  Format: () => Format,
  GradientDirection: () => GradientDirection,
  GradientFade: () => GradientFade,
  Gravity: () => Gravity,
  ImproveMode: () => ImproveMode,
  OutlineMode: () => OutlineMode,
  Position: () => PositionQualifier,
  Quality: () => Quality,
  Region: () => Region,
  RotationMode: () => RotationMode,
  SimulateColorBlind: () => SimulateColorBlind,
  Source: () => Source,
  StreamingProfile: () => StreamingProfile,
  Stroke: () => Stroke,
  TextAlignment: () => TextAlignment,
  TextDecoration: () => TextDecoration
});

export {
  Transformation,
  ImageTransformation,
  URLConfig_default,
  CloudinaryFile,
  CloudinaryImage,
  CloudConfig_default,
  CloudinaryConfig_default,
  VideoTransformation,
  CloudinaryVideo,
  CloudinaryMedia,
  Cloudinary,
  transformationStringFromObject,
  createCloudinaryLegacyURL2 as createCloudinaryLegacyURL,
  actions_exports2 as actions_exports,
  qualifiers_exports2 as qualifiers_exports
};
//# sourceMappingURL=chunk-PMS47Y3M.js.map
