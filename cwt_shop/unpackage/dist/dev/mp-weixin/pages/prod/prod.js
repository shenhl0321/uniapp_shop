(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/prod/prod"],{

/***/ 244:
/*!************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/main.js?{"page":"pages%2Fprod%2Fprod"} ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/uni-stat/dist/uni-stat.es.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _prod = _interopRequireDefault(__webpack_require__(/*! ./pages/prod/prod.vue */ 245));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_prod.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 245:
/*!*****************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./prod.vue?vue&type=template&id=58670366& */ 246);
/* harmony import */ var _prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prod.vue?vue&type=script&lang=js& */ 248);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prod.vue?vue&type=style&index=0&lang=css& */ 250);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["render"],
  _prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/prod/prod.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 246:
/*!************************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue?vue&type=template&id=58670366& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./prod.vue?vue&type=template&id=58670366& */ 247);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_template_id_58670366___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 247:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue?vue&type=template&id=58670366& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.activityPrice ? _vm.wxs.parsePrice(_vm.activityPrice) : null
  var g1 = _vm.activityPrice ? _vm.wxs.parsePrice(_vm.activityPrice) : null
  var g2 = !_vm.activityPrice ? _vm.wxs.parsePrice(_vm.price) : null
  var g3 = !_vm.activityPrice ? _vm.wxs.parsePrice(_vm.price) : null
  var g4 = _vm.couponList.length
  var l0 = _vm.__map(_vm.littleCommPage, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var g5 = item.pics.length
    return {
      $orig: $orig,
      g5: g5,
    }
  })
  var g6 = _vm.prodCommPage.records.length
  var l1 = _vm.commentShow
    ? _vm.__map(_vm.prodCommPage.records, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g7 = item.pics.length
        return {
          $orig: $orig,
          g7: g7,
        }
      })
    : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4,
        l0: l0,
        g6: g6,
        l1: l1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 248:
/*!******************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./prod.vue?vue&type=script&lang=js& */ 249);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 249:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var config = __webpack_require__(/*! @/config.js */ 55);
var util = __webpack_require__(/*! ../../utils/util.js */ 112);
var customNavi = function customNavi() {
  __webpack_require__.e(/*! require.ensure | components/custom-navi/custom-navi */ "components/custom-navi/custom-navi").then((function () {
    return resolve(__webpack_require__(/*! @/components/custom-navi/custom-navi.vue */ 481));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var shopCartTabToutiao = function shopCartTabToutiao() {
  __webpack_require__.e(/*! require.ensure | pages/category/shop-cart-tabbar-toutiao */ "pages/category/shop-cart-tabbar-toutiao").then((function () {
    return resolve(__webpack_require__(/*! ../category/shop-cart-tabbar-toutiao.vue */ 495));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  data: function data() {
    return {
      naviData: {
        ifGoBack: true
      },
      //当前商品信息
      price: 0,
      imgs: '',
      content: '',
      pic: "",
      prodName: '',
      prodId: 0,
      // prodCount: 0,
      brief: '',
      skuId: 0,
      isSpread: false,
      posterImg: '',
      rebateMoney: '',
      activityOrderFlag: "",
      activityTimesFlag: "",
      activityPrice: null,
      showBasketTab: true,
      //是否展示底部购物车tab
      prodsList: [],
      baskettabAnimation: null,
      //购物车弹窗动画
      couponPopAnimation: null,
      showBasketIcon: true,
      //是否展示 （加入购物车的） 按钮，当当前产品已加购时为true
      showCoupons: false,
      //优惠券弹窗
      evalatImage: '',
      //海报背景图
      bgBanner: '',
      imagePath: "",
      maskHidden: false,
      shopId: 1,
      picDomain: config.picDomain,
      indicatorDots: true,
      indicatorColor: '#f2f2f2',
      indicatorActiveColor: '#eb2444',
      autoplay: true,
      interval: 5000,
      duration: 500,
      totalCartNum: 0,
      popupShow: false,
      // 是否获取过用户领取过的优惠券id
      loadCouponIds: false,
      skuShow: false,
      commentShow: false,
      couponList: [],
      findSku: true,
      defaultSku: undefined,
      prodCommData: {},
      prodCommPage: {
        current: 0,
        pages: 0,
        records: []
      },
      littleCommPage: [],
      evaluate: -1,
      isCollection: false,
      tjr: '',
      //通过分享海报的推荐人
      qrcodePath: '',
      //海报图片
      userName: '',
      ifShowGoHome: false,
      ifShowGoBack: true,
      //佣金
      sharetjr: '',
      extensionWorker: '',
      phoneNumber: '',
      saleMonth: "",
      prodNum: "",
      basketAnimation: ""
    };
  },
  components: {
    customNavi: customNavi,
    shopCartTabToutiao: shopCartTabToutiao
  },
  computed: {
    shopInfo: function shopInfo() {
      return this.$store.getters['shop/shopInfo'];
    },
    mobile: function mobile() {
      return this.$store.state.userInfo.mobile;
    },
    prodCount: function prodCount() {
      var shopCartItems = this.$store.getters['shop/shopCartItems'];
      var prodCount;
      var _iterator = _createForOfIteratorHelper(shopCartItems),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          if (item.prodId == this.prodId) {
            prodCount = item.prodCount;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return prodCount || 0;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    uni.getSetting({
      success: function success(res) {
        if (!res.authSetting['scope.userInfo']) {
          uni.navigateTo({
            url: '/pages/login/login'
          });
        }
      }
    });

    //从我二维码分享进入
    if (options.scene != undefined && options.scene != "") {
      var scene = options.scene;
      this.prodId = scene.split("-")[0];
      this.shopId = scene.split("-")[1]; //将获取到的shopId存入全局变量
      this.tjr = scene.split("-")[2];
      this.naviData.ifGoBack = false;
      this.naviData.ifGoHome = true;
      this.$store.commit('shop/currentShop', shopId);
    } else if (options.isSpread == 'true') {
      //从分享链接进入
      this.naviData.ifGoBack = false;
      this.naviData.ifGoHome = true;
      this.prodId = options.prodId;
      this.shopId = options.shopId;
      this.sharetjr = options.sharetjr; //链接来源人
      this.$store.commit('shop/currentShop', shopId);
    } else {
      this.prodId = options.prodid;
      this.shopId = this.$store.state.shop.currentShop;
    }
    this.getUserId(); // 获取userID，用于分享链接
    this.getProdInfo(); // 加载产品信息
    this.getProdCommData(); // 加载评论项
    this.getLittleProdComm(); // 查看用户是否关注
    //获取用户信息
    this.getUserName();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    var phoneNumber = uni.getStorageSync('phoneNumber');
    this.setData({
      phoneNumber: phoneNumber
    });
    this.qrcode_image(); //背景图
    this.getWxCode(); //二维码

    this.getShopProdsInfo();
    this.getCouponList();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {
    var extensionWorker = this.extensionWorker;
    if (extensionWorker == 0) {
      return {
        title: this.prodName,
        path: "pages/prod/prod?sharetjr=".concat(this.userId, "&prodId=").concat(this.prodId, "&shopId=").concat(this.shopId, "&isSpread=true")
      };
    } else {
      return (0, _defineProperty2.default)({
        title: this.prodName,
        path: 'pages/prod/prod?prodId=' + this.prodId + '&isSpread=true'
      }, "path", "pages/prod/prod?prodId=".concat(this.prodId, "&shopId=").concat(this.shopId, "&isSpread=true"));
    }
  },
  methods: {
    getProdInfo: function getProdInfo() {
      var _this = this;
      this.$request.get("/prod/prodInfo", {
        prodId: this.prodId // userType: 0
      }).then(function (res) {
        var imgStrs = res.imgs;
        var imgs = imgStrs.split(",");
        var Img = imgStrs.split(",")[0];
        var content = util.formatHtml(res.content || '');
        _this.setData({
          imgs: imgs,
          content: content,
          price: res.price,
          prodName: res.prodName,
          prodId: res.prodId,
          brief: res.brief,
          skuId: res.skuList[0].skuId,
          // skuList: res.skuList,
          pic: res.pic,
          posterImg: Img,
          saleMonth: res.salesNumber,
          rebateMoney: res.rebateMoney,
          isSpread: res.isSpread == 0,
          activityOrderFlag: res.activityOrderFlag,
          activityTimesFlag: res.activityTimesFlag,
          activityPrice: res.activityPrice
        });
      });
    },
    getProdCommData: function getProdCommData() {
      var _this2 = this;
      this.$request.get("/prodComm/prodCommData", {
        prodId: this.prodId
      }).then(function (res) {
        _this2.prodCommData = res;
      });
    },
    // 获取部分评论
    getLittleProdComm: function getLittleProdComm() {
      if (this.prodCommPage.records.length) {
        return;
      }
      this.getProdCommPage();
    },
    getMoreCommPage: function getMoreCommPage(e) {
      this.getProdCommPage();
    },
    // 获取分页获取评论
    getProdCommPage: function getProdCommPage(evaluate) {
      var _this3 = this;
      if (evaluate) {
        if (evaluate === this.evaluate) {
          return;
        }
        this.setData({
          prodCommPage: {
            current: 0,
            pages: 0,
            records: []
          },
          evaluate: evaluate
        });
      }
      this.$request.get("/prodComm/prodCommPageByProd", {
        prodId: this.prodId,
        size: 10,
        current: this.prodCommPage.current + 1,
        evaluate: this.evaluate
      }).then(function (res) {
        res.records.forEach(function (item) {
          if (item.pics) {
            item.pics = item.pics.split(',');
          }
        });
        var records = _this3.prodCommPage.records;
        records = records.concat(res.records);
        _this3.setData({
          prodCommPage: {
            current: res.current,
            pages: res.pages,
            records: records
          }
        }); // 如果商品详情中没有评论的数据，截取两条到商品详情页商品详情
        if (!_this3.littleCommPage.length) {
          _this3.littleCommPage = records.slice(0, 2);
        }
      });
    },
    getUserName: function getUserName() {
      var _this4 = this;
      this.$request.get("/prod/getUserInfo").then(function (res) {
        _this4.setData({
          userName: res.userName,
          extensionWorker: res.extensionWorker
        });
      }, function (rej) {
        console.log(rej);
      });
    },
    // 商铺logo加载出错
    handleLogoLoadError: function handleLogoLoadError(e) {
      var shopInfo = this.shopInfo;
      shopInfo.shopLogo = "/static/images/icon/logo.png";
      this.setData({
        shopInfo: shopInfo
      });
    },
    getUserId: function getUserId() {
      var _this5 = this;
      this.$request.get("/prod/getUserId").then(function (res) {
        _this5.userId = res;
      });
    },
    //点击生成海报
    formSubmit: function formSubmit(e) {
      var that = this;
      uni.showToast({
        title: '海报生成中...',
        icon: 'loading',
        duration: 1000
      });
      that.createNewImg();
      setTimeout(function () {
        that.setData({
          maskHidden: true
        });
      }, 1000);
    },
    createNewImg: function createNewImg() {
      var that = this;
      var context = uni.createCanvasContext('mycanvas');
      context.clearRect(0, 0, 375, 660);
      context.setFillStyle("#fff");
      context.fillRect(0, 0, 375, 660);
      context.save();
      var path1 = that.bgBanner;
      var path2 = that.qrcodePath;
      var titl = this.prodName;
      context.setFontSize(18);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      context.font = 'normal bold 18px SimSun';
      that.dealWords({
        ctx: context,
        //画布上下文 canvasID
        fontSize: 18,
        //字体大小
        word: titl,
        //需要处理的文字
        maxWidth: 200,
        //一行文字最大宽度
        x: 15,
        //文字在x轴要显示的位置
        y: 450,
        //文字在y轴要显示的位置
        maxLine: 2 //文字最多显示的行数
      });

      context.stroke();
      context.save();
      var titl = "价格 ：￥" + this.price;
      context.setFontSize(18);
      context.setFillStyle('#ff0000');
      context.setTextAlign('left');
      context.font = 'normal bold 18px SimSun';
      that.dealWords({
        ctx: context,
        //画布上下文 canvasID
        fontSize: 18,
        //字体大小
        word: titl,
        //需要处理的文字
        maxWidth: 200,
        //一行文字最大宽度
        x: 15,
        //文字在x轴要显示的位置
        y: 520,
        //文字在y轴要显示的位置
        maxLine: 2 //文字最多显示的行数
      });

      context.drawImage(path1, 0, 0, 375, 375); //var results = "分
      context.drawImage(path2, 220, 420, 140, 140);
      context.beginPath(); // context.setFontSize(16);
      context.setFillStyle('#fff');
      context.setTextBaseline("top");
      context.setTextAlign('left');
      context.stroke();
      context.closePath();
      context.save(); //保存之前的画布设置
      context.draw(true); //true表示保留之前绘制内容
      setTimeout(function () {
        uni.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function success(res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath
            });
          },
          fail: function fail(res) {}
        });
      }, 1000);
    },
    //文本换行
    dealWords: function dealWords(options) {
      options.ctx.setFontSize(options.fontSize); //设置字体大小

      var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth); //实际总共能分多少行

      var count = allRow >= options.maxLine ? options.maxLine : allRow; //实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

      var endPos = 0; //当前字符串的截断点

      for (var j = 0; j < count; j++) {
        var nowStr = options.word.slice(endPos); //当前剩余的字符串

        var rowWid = 0; //每一行当前宽度    

        if (options.ctx.measureText(nowStr).width > options.maxWidth) {
          //如果当前的字符串宽度大于最大宽度，然后开始截取
          for (var m = 0; m < nowStr.length; m++) {
            rowWid += options.ctx.measureText(nowStr[m]).width; //当前字符串总宽度

            if (rowWid > options.maxWidth) {
              if (j === options.maxLine - 1) {
                //如果是最后一行
                options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * 25); //(j+1)*20这是每一行的高度        
              } else {
                options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 25);
              }
              endPos += m; //下次截断点

              break;
            }
          }
        } else {
          //如果当前的字符串宽度小于最大宽度就直接输出
          options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 25);
        }
      }
    },
    //点击保存到相册
    baocun: function baocun() {
      var that = this;
      uni.saveImageToPhotosAlbum({
        filePath: that.imagePath,
        success: function success(res) {
          uni.showModal({
            content: '图片已保存到相册，赶紧晒一下吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function success(res) {
              if (res.confirm) {
                /* 该隐藏的隐藏 */
                that.setData({
                  maskHidden: false
                });
              }
            },
            fail: function fail(res) {}
          });
        }
      });
    },
    qrcode_image: function qrcode_image() {
      var that = this;
      uni.getImageInfo({
        src: "http://images.51xeld.com/2020/07/126ac97368f94c4cafd1f45493a1c61d.jpg",
        success: function success(res) {
          that.setData({
            evalatImage: res.path
          });
        }
      });
      setTimeout(function () {
        uni.getImageInfo({
          src: that.posterImg + "?/imageView2/1/w/421/h/304/q/75",
          success: function success(res) {
            that.setData({
              bgBanner: res.path
            });
          }
        });
      }, 1000);
    },
    /**
     * 跳转到首页
     */
    toHomePage: function toHomePage() {
      uni.navigateTo({
        url: '/pages/index/index'
      });
    },
    /**
     * 跳转到购物车
     */
    toCartPage: function toCartPage() {
      uni.switchTab({
        url: '/pages/basket/basket'
      });
    },
    /**
     * 加入购物车
     */
    addToCart: function addToCart() {
      var _this6 = this;
      this.$request.post("/p/shopCart/changeItem", {
        basketId: 0,
        count: 1,
        prodId: this.prodId,
        shopId: this.shopId,
        skuId: this.skuId,
        activityOrderFlag: this.activityOrderFlag,
        activityTimesFlag: this.activityTimesFlag
      }).then(function (res) {
        if (res.status == 0) {
          // this.prodCount += 1
          _this6.$store.dispatch('shop/refreshCartItems');
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none'
          });
        }
      });
    },
    showPopup: function showPopup() {
      var _this7 = this;
      if (this.loadCouponIds) {
        this.setData({
          popupShow: true
        });
        return;
      }
      this.$request.get("/p/myCoupon/listCouponIds").then(function (couponIds) {
        var couponList = _this7.couponList;
        couponList.forEach(function (coupon) {
          if (couponIds && couponIds.length) {
            // 领取该优惠券数量
            var couponLimit = 0;
            couponIds.forEach(function (couponId) {
              if (couponId == coupon.couponId) {
                couponLimit++;
              }
            }); // 小于用户领取优惠券上限，可以领取优惠券
            if (couponLimit < coupon.limitNum) {
              coupon.canReceive = true;
            } else {
              coupon.canReceive = false;
            }
          } else {
            coupon.canReceive = true;
          }
        });
        _this7.setData({
          couponList: couponList,
          popupShow: true,
          loadCouponIds: true
        });
      });
    },
    showSku: function showSku() {
      this.setData({
        skuShow: true
      });
    },
    showComment: function showComment() {
      this.setData({
        commentShow: true
      });
    },
    closePopup: function closePopup() {
      this.setData({
        popupShow: false,
        skuShow: false,
        commentShow: false
      });
    },
    showBasketFun: function showBasketFun() {
      var _this8 = this;
      var basketAnimation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease-in-out'
      });
      this.getBasketInfo();
      this.setData({
        popupShow: true,
        basketAnimation: basketAnimation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this8.setData({
          basketAnimation: basketAnimation.translateY(0).step().export()
        });
      });
    },
    closeOrders: function closeOrders() {
      var _this9 = this;
      var basketAnimation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out'
      });
      this.setData({
        basketAnimation: basketAnimation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this9.setData({
          popupShow: false
        });
      }, 300);
    },
    getWxCode: function getWxCode() {
      var self = this;
      this.$request.post("/user/getWxCode", {
        prodId: this.prodId,
        shopId: this.shopId
      }).then(function (res) {
        var save = uni.getFileSystemManager();
        var number = Math.random();
        var filePath = wx.env.USER_DATA_PATH + '/pic' + number + '.png';
        save.writeFile({
          filePath: filePath,
          data: res,
          encoding: 'base64',
          success: function success(res) {
            self.setData({
              qrcodePath: filePath
            });
          }
        });
      });
    },
    /**
     * 改变购物车数量接口
     */
    updateCount: function updateCount(_updateCount) {
      var _this10 = this;
      this.$request.post("/p/shopCart/changeItem", {
        count: _updateCount,
        prodId: this.prodId,
        skuId: this.skuId,
        activityTimesFlag: this.activityTimesFlag,
        activityOrderFlag: this.activityOrderFlag,
        shopId: this.shopId
      }).then(function (res) {
        if (res.status == 0) {
          _this10.$store.dispatch('shop/refreshCartItems');
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none'
          });
        }
      }, function (rej) {
        console.log(rej);
      });
    },
    showCouponPop: function showCouponPop() {
      var _this11 = this;
      var animation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease-in-out'
      });
      this.setData({
        couponPopAnimation: animation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this11.setData({
          showCoupons: true,
          couponPopAnimation: animation.translateY(0).step().export()
        });
      }, 10);
    },
    closeCouponPop: function closeCouponPop() {
      var _this12 = this;
      var animation = uni.createAnimation({
        duration: 300,
        timingFunction: "ease-in-out"
      });
      this.setData({
        couponPopAnimation: animation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this12.setData({
          showCoupons: false
        });
      }, 300);
    },
    // 进店
    enterShop: function enterShop() {
      uni.navigateTo({
        url: "../category/category" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
      });
    },

    //获取店铺商品列表
    getShopProdsInfo: function getShopProdsInfo() {
      var _this13 = this;
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/shop/shop/prodInfo/';
      this.$request.get(url + this.shopId).then(function (res) {
        var list = res.slice(0, 3);
        _this13.prodsList = list;
      }, function (rej) {
        console.log(rej);
      });
    },
    /**
     * 授权获取手机号
     */
    getPhoneNumber: function getPhoneNumber(e) {
      var _this14 = this;
      var that = this;
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        this.$request.get("/p/user/getPhoneNumber", {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }).then(function (res) {
          if (res != undefined && res != null) {
            _this14.$store.commit('updateUserInfo', {
              mobile: res
            });
          }
        }, function (rej) {
          console.log(rej);
        });
        this.toFirmOrder();
      } else {
        this.$showToast('请授权手机号以便为您提供更完整的服务');
      }
    },
    // 获取优惠券信息
    getCouponList: function getCouponList() {
      var _this15 = this;
      this.$request.get('/coupon/coupon/info/', {
        prodId: this.prodId,
        shopId: this.shopId
      }).then(function (couponList) {
        for (var i = 0; i < couponList.length; i++) {
          couponList[i].showStartTime = couponList[i].startTime.split('-').join('.');
          couponList[i].showEndTime = couponList[i].endTime.split('-').join('.');
        }
        _this15.couponList = couponList;
      }, function (rej) {
        console.log(rej);
      });
    },
    //领取优惠券
    handleReceive: function handleReceive(e) {
      var _this16 = this;
      var coupon = this.couponList[e.currentTarget.dataset.index];
      if (coupon.useState == null) {
        this.$request.post('/couponRecord/couponRecord', _objectSpread(_objectSpread({}, coupon), {}, {
          state: 1,
          shopId: this.shopId
        })).then(function (res) {
          if (res.code === 200) {
            _this16.$showToast('领取成功');
          } else {
            _this16.$showToast('领取失败');
          }
        }, function (rej) {
          console.log(rej);
        });
      }
    },
    enterProdFromGuess: function enterProdFromGuess(e) {
      var prodId = e.currentTarget.dataset.prodid;
      if (prodId) {
        uni.navigateTo({
          url: '/pages/prod/prod?prodid=' + prodId
        });
      }
    },
    //页面跳转
    goback: function goback() {
      uni.navigateBack({
        delta: 1
      });
    },
    gohome: function gohome() {
      uni.switchTab({
        url: '../category/category'
      });
    },
    closeImage: function closeImage() {
      this.setData({
        maskHidden: false
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 250:
/*!**************************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./prod.vue?vue&type=style&index=0&lang=css& */ 251);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_prod_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 251:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/prod/prod.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[244,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/prod/prod.js.map