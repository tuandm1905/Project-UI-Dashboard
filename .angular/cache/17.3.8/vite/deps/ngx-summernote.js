import {
  NG_VALUE_ACCESSOR
} from "./chunk-6REKY5IE.js";
import {
  HttpClient
} from "./chunk-LLSQ5UXL.js";
import "./chunk-VNOU2PI2.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-MF2O6N6G.js";
import {
  combineLatest,
  map
} from "./chunk-4J25ECOH.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-B2KS57BG.js";

// node_modules/ngx-summernote/fesm2020/ngx-summernote.mjs
var codeBlockButtonStyle = `font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
font-size: 12px;
padding: 14px 12px;
margin-bottom: 12px;
line-height: 1.42857;
word-break: break-all;
overflow-wrap: break-word;
background-color: rgb(250, 251, 253);
border: 1px solid rgb(234, 236, 240);
border-radius: 4px; color: #60a0b0;
white-space: pre-wrap;`;
var codeBlockButton = function(context) {
  const ui = $.summernote.ui;
  const button = ui.button({
    contents: '<i class="note-icon-frame" style="margin-right: 4px"></i> Code block',
    tooltip: "Add code block",
    container: ".note-editor",
    className: "note-btn",
    click: function() {
      let selectedText = null;
      if (window.getSelection) {
        selectedText = window.getSelection().toString().replace(/^\s+|\s+$/g, "");
      }
      const codeText = selectedText ? selectedText : `Place your code here.`;
      const codeBlock = `<pre class="code-block" style="${codeBlockButtonStyle}">${codeText}</pre>`;
      context.invoke("editor.pasteHTML", codeBlock);
    }
  });
  return button.render();
};
var NgxSummernoteDirective = class {
  constructor(el, zone, http) {
    this.el = el;
    this.zone = zone;
    this.http = http;
    this.summernoteModelChange = new EventEmitter();
    this.imageUpload = new EventEmitter();
    this.mediaDelete = new EventEmitter();
    this.blur = new EventEmitter();
    this._options = {};
    this.SPECIAL_TAGS = ["img", "button", "input", "a"];
    this.INNER_HTML_ATTR = "innerHTML";
    this._oldModel = null;
    this.onChange = (_) => {
    };
    this.onTouched = () => {
    };
    const element = el.nativeElement;
    if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) !== -1) {
      this._hasSpecialTag = true;
    }
    this.zone = zone;
  }
  set ngxSummernote(options) {
    if (options) {
      if (!options.buttons) {
        options.buttons = {};
      }
      options.callbacks = __spreadProps(__spreadValues({}, options.callbacks), {
        onImageUpload: (files) => this.uploadImage(files),
        onMediaDelete: (files) => this.mediaDelete.emit({
          url: $(files[0]).attr("src")
        })
      });
      options.buttons.codeBlock = codeBlockButton;
      Object.assign(this._options, options);
    }
  }
  // summernoteModel directive as input: store initial editor content
  set summernoteModel(content) {
    this.updateEditor(content);
  }
  ngOnInit() {
    this.createEditor();
  }
  ngOnChanges(changes) {
    if (this._editorInitialized && changes) {
      if (changes.ngxSummernoteDisabled && !changes.ngxSummernoteDisabled.firstChange && changes.ngxSummernoteDisabled.currentValue !== changes.ngxSummernoteDisabled.previousValue) {
        if (changes.ngxSummernoteDisabled.currentValue) {
          this._$element.summernote("disable");
        } else {
          this._$element.summernote("enable");
        }
      }
    }
  }
  ngOnDestroy() {
    this.destroyEditor();
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
  }
  // Form model content changed.
  writeValue(content) {
    this.updateEditor(content);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  // Update editor with model contents.
  updateEditor(content) {
    if (JSON.stringify(this._oldModel) === JSON.stringify(content)) {
      return;
    }
    this._oldModel = content;
    if (this._editorInitialized) {
      this._$element ? this._$element.summernote("code", content) : void 0;
    } else {
      this._$element ? this._$element.html(content) : void 0;
    }
  }
  // update model if editor contentChanged
  updateModel(content) {
    this.zone.run(() => {
      let modelContent = null;
      if (this._hasSpecialTag) {
        const attributeNodes = this._$element[0].attributes;
        const attrs = {};
        for (let i = 0; i < attributeNodes.length; i++) {
          const attrName = attributeNodes[i].name;
          if (this._options.angularIgnoreAttrs && this._options.angularIgnoreAttrs.indexOf(attrName) !== -1) {
            continue;
          }
          attrs[attrName] = attributeNodes[i].value;
        }
        if (this._$element[0].innerHTML) {
          attrs[this.INNER_HTML_ATTR] = this._$element[0].innerHTML;
        }
        modelContent = attrs;
      } else {
        const returnedHtml = content || "";
        if (typeof returnedHtml === "string") {
          modelContent = returnedHtml;
        }
      }
      if (this._oldModel !== modelContent) {
        this._oldModel = modelContent;
        this.summernoteModelChange.emit(modelContent);
        this.onChange(content);
      }
    });
  }
  initListeners() {
    const self = this;
    if (!this._$element) {
      return;
    }
    this._$element.on("summernote.init", function() {
      setTimeout(function() {
        self.updateModel();
      }, 0);
    });
    this._$element.on("summernote.change", function(event, contents, $editable) {
      setTimeout(function() {
        self.updateModel(contents);
      }, 0);
    });
    this._$element.on("summernote.blur", function() {
      setTimeout(function() {
        self.onTouched();
        self.blur.emit();
      }, 0);
    });
    if (this._options.immediateAngularModelUpdate) {
      this._editor.on("keyup", function() {
        setTimeout(function() {
          self.updateModel();
        }, 0);
      });
    }
  }
  createEditor() {
    if (this._editorInitialized) {
      return;
    }
    this.setContent(true);
    const wait = 50;
    try {
      this._$element = $(this.el.nativeElement);
    } catch (error) {
      console.log(`JQuery seems not te loaded yet! Wait ${wait}ms and try again`);
    }
    if (!this._$element) {
      setTimeout(() => {
        this.createEditor();
      }, wait);
    } else {
      this.zone.runOutsideAngular(() => {
        this._editor = this._$element.summernote(this._options).data("summernote").$note;
        this.initListeners();
        if (this.ngxSummernoteDisabled) {
          this._$element.summernote("disable");
        }
      });
      this._editorInitialized = true;
    }
  }
  setHtml() {
    this._$element.summernote("code", this._model || "", true);
  }
  setContent(firstTime = false) {
    const self = this;
    if (this._model || this._model === "") {
      this._oldModel = this._model;
      if (this._hasSpecialTag) {
        const tags = this._model;
        if (tags) {
          for (const attr in tags) {
            if (tags.hasOwnProperty(attr) && attr !== this.INNER_HTML_ATTR) {
              this._$element.attr(attr, tags[attr]);
            }
          }
          if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
            this._$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
          }
        }
      } else {
        self.setHtml();
      }
    }
  }
  destroyEditor() {
    if (this._editorInitialized) {
      this._editor.off("keyup");
      this._$element.summernote("destroy");
      this._editorInitialized = false;
    }
  }
  // private getEditor() {
  //   if (this._$element) {
  //     return this._$element.summernote.bind(this._$element);
  //   }
  //   return null;
  // }
  uploadImage(files) {
    return __async(this, null, function* () {
      if (this._options.uploadImagePath) {
        this.imageUpload.emit({
          uploading: true
        });
        const requests = [];
        for (const file of files) {
          const data = new FormData();
          data.append("image", file);
          const obs = this.http.post(this._options.uploadImagePath, data, this._options.uploadImageRequestOptions).pipe(map((response) => response && typeof response.path === "string" && response.path));
          requests.push(obs);
        }
        this.uploadSub = combineLatest(requests).subscribe((remotePaths) => {
          for (const remotePath of remotePaths) {
            this._$element.summernote("insertImage", remotePath);
          }
          this.imageUpload.emit({
            uploading: false
          });
        }, (err) => this.insertFromDataURL(files));
      } else {
        this.insertFromDataURL(files);
      }
    });
  }
  insertFromDataURL(files) {
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this._$element.summernote("insertImage", reader.result);
        this.imageUpload.emit({
          uploading: false,
          encoding: "base64"
        });
      };
      reader.onerror = (error) => console.error(error);
    }
  }
};
NgxSummernoteDirective.ɵfac = function NgxSummernoteDirective_Factory(t) {
  return new (t || NgxSummernoteDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(HttpClient));
};
NgxSummernoteDirective.ɵdir = ɵɵdefineDirective({
  type: NgxSummernoteDirective,
  selectors: [["", "ngxSummernote", ""]],
  inputs: {
    ngxSummernote: "ngxSummernote",
    summernoteModel: "summernoteModel",
    ngxSummernoteDisabled: "ngxSummernoteDisabled"
  },
  outputs: {
    summernoteModelChange: "summernoteModelChange",
    imageUpload: "imageUpload",
    mediaDelete: "mediaDelete",
    blur: "blur"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxSummernoteDirective),
    multi: true
  }]), ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSummernoteDirective, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[ngxSummernote]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgxSummernoteDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: NgZone
    }, {
      type: HttpClient
    }];
  }, {
    ngxSummernote: [{
      type: Input
    }],
    summernoteModel: [{
      type: Input
    }],
    summernoteModelChange: [{
      type: Output
    }],
    imageUpload: [{
      type: Output
    }],
    mediaDelete: [{
      type: Output
    }],
    blur: [{
      type: Output
    }],
    ngxSummernoteDisabled: [{
      type: Input
    }]
  });
})();
var NgxSummernoteViewDirective = class {
  constructor(renderer2, element) {
    this.renderer2 = renderer2;
    this._element = element.nativeElement;
  }
  set ngxSummernoteView(content) {
    this._element.innerHTML = content || "";
  }
  ngAfterViewInit() {
    this.renderer2.addClass(this._element, "ngx-summernote-view");
  }
};
NgxSummernoteViewDirective.ɵfac = function NgxSummernoteViewDirective_Factory(t) {
  return new (t || NgxSummernoteViewDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef));
};
NgxSummernoteViewDirective.ɵdir = ɵɵdefineDirective({
  type: NgxSummernoteViewDirective,
  selectors: [["", "ngxSummernoteView", ""]],
  inputs: {
    ngxSummernoteView: "ngxSummernoteView"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSummernoteViewDirective, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[ngxSummernoteView]"
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: ElementRef
    }];
  }, {
    ngxSummernoteView: [{
      type: Input
    }]
  });
})();
var NgxSummernoteModule = class _NgxSummernoteModule {
  static forRoot() {
    return {
      ngModule: _NgxSummernoteModule,
      providers: []
    };
  }
};
NgxSummernoteModule.ɵfac = function NgxSummernoteModule_Factory(t) {
  return new (t || NgxSummernoteModule)();
};
NgxSummernoteModule.ɵmod = ɵɵdefineNgModule({
  type: NgxSummernoteModule,
  declarations: [NgxSummernoteDirective, NgxSummernoteViewDirective],
  exports: [NgxSummernoteDirective, NgxSummernoteViewDirective]
});
NgxSummernoteModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSummernoteModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxSummernoteDirective, NgxSummernoteViewDirective],
      exports: [NgxSummernoteDirective, NgxSummernoteViewDirective]
    }]
  }], null, null);
})();
export {
  NgxSummernoteDirective,
  NgxSummernoteModule,
  NgxSummernoteViewDirective,
  codeBlockButton
};
//# sourceMappingURL=ngx-summernote.js.map
