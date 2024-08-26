(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/category/category"],{

/***/ 131:
/*!********************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/main.js?{"page":"pages%2Fcategory%2Fcategory"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
__webpack_require__(/*! @dcloudio/uni-stat/dist/uni-stat.es.js */ 27);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _category = _interopRequireDefault(__webpack_require__(/*! ./pages/category/category.vue */ 132));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_category.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 132:
/*!*************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./category.vue?vue&type=template&id=682a9774& */ 133);
/* harmony import */ var _category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category.vue?vue&type=script&lang=js& */ 135);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category.vue?vue&type=style&index=0&lang=css& */ 138);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 38);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["render"],
  _category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/category/category.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 133:
/*!********************************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue?vue&type=template&id=682a9774& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./category.vue?vue&type=template&id=682a9774& */ 134);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_template_id_682a9774___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 134:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue?vue&type=template&id=682a9774& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    tabbar: function () {
      return __webpack_require__.e(/*! import() | components/tabbar/tabbar */ "components/tabbar/tabbar").then(__webpack_require__.bind(null, /*! @/components/tabbar/tabbar.vue */ 474))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.showOrder ? _vm.couponList_type0.length : null
  var g1 = _vm.showOrder ? _vm.couponList_type0.length : null
  var l0 = _vm.showOrder
    ? _vm.__map(_vm.productList, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g2 = item.isGroupProd === "1" ? _vm.wxs.parsePrice(item.ptj) : null
        var g3 = item.isGroupProd === "1" ? _vm.wxs.parsePrice(item.ptj) : null
        var g4 =
          item.isGroupProd === "1" ? _vm.wxs.parsePrice(item.oriPrice) : null
        var g5 =
          item.isGroupProd === "1" ? _vm.wxs.parsePrice(item.oriPrice) : null
        var g6 =
          !(item.isGroupProd === "1") && item.activityPrice
            ? _vm.wxs.parsePrice(item.activityPrice)
            : null
        var g7 =
          !(item.isGroupProd === "1") && item.activityPrice
            ? _vm.wxs.parsePrice(item.activityPrice)
            : null
        var g8 =
          !(item.isGroupProd === "1") && item.activityPrice
            ? _vm.wxs.parsePrice(item.price)
            : null
        var g9 =
          !(item.isGroupProd === "1") && item.activityPrice
            ? _vm.wxs.parsePrice(item.price)
            : null
        var g10 =
          !(item.isGroupProd === "1") &&
          !item.activityPrice &&
          !item.activityPrice
            ? _vm.wxs.parsePrice(item.price)
            : null
        var g11 =
          !(item.isGroupProd === "1") &&
          !item.activityPrice &&
          !item.activityPrice
            ? _vm.wxs.parsePrice(item.price)
            : null
        var g12 =
          !(item.isGroupProd === "1") &&
          !item.activityPrice &&
          !item.activityPrice
            ? _vm.wxs.parsePrice(item.oriPrice)
            : null
        var g13 =
          !(item.isGroupProd === "1") &&
          !item.activityPrice &&
          !item.activityPrice
            ? _vm.wxs.parsePrice(item.oriPrice)
            : null
        return {
          $orig: $orig,
          g2: g2,
          g3: g3,
          g4: g4,
          g5: g5,
          g6: g6,
          g7: g7,
          g8: g8,
          g9: g9,
          g10: g10,
          g11: g11,
          g12: g12,
          g13: g13,
        }
      })
    : null
  var l1 =
    _vm.popupShow && !_vm.ifInToutiao
      ? _vm.__map(_vm.shopCartItems, function (prod, index) {
          var $orig = _vm.__get_orig(prod)
          var g14 = !prod.activityPrice ? _vm.wxs.parsePrice(prod.price) : null
          var g15 = !prod.activityPrice ? _vm.wxs.parsePrice(prod.price) : null
          return {
            $orig: $orig,
            g14: g14,
            g15: g15,
          }
        })
      : null
  var g16 = _vm.popupShow && !_vm.ifInToutiao ? _vm.shopCartItems.length : null
  var g17 =
    _vm.popupShow && !_vm.ifInToutiao && g16 > 0
      ? _vm.wxs.parsePrice(_vm.priceInfo.finalMoney)
      : null
  var g18 =
    _vm.popupShow && !_vm.ifInToutiao && g16 > 0
      ? _vm.wxs.parsePrice(_vm.priceInfo.finalMoney)
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showMiniPop = !_vm.showMiniPop
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        l1: l1,
        g16: g16,
        g17: g17,
        g18: g18,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 135:
/*!**************************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./category.vue?vue&type=script&lang=js& */ 136);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 136:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 40));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 42));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// const wxs = require('../../utils/number.js')
var couponList = __webpack_require__(/*! ./couponList.js */ 137).couponList;
var customNavi = function customNavi() {
  __webpack_require__.e(/*! require.ensure | components/custom-navi/custom-navi */ "components/custom-navi/custom-navi").then((function () {
    return resolve(__webpack_require__(/*! @/components/custom-navi/custom-navi.vue */ 481));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var shopCartTabToutiao = function shopCartTabToutiao() {
  __webpack_require__.e(/*! require.ensure | pages/category/shop-cart-tabbar-toutiao */ "pages/category/shop-cart-tabbar-toutiao").then((function () {
    return resolve(__webpack_require__(/*! ./shop-cart-tabbar-toutiao.vue */ 495));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var shopCartTabWeixin = function shopCartTabWeixin() {
  __webpack_require__.e(/*! require.ensure | pages/category/shop-cart-tabbar-toutiao */ "pages/category/shop-cart-tabbar-toutiao").then((function () {
    return resolve(__webpack_require__(/*! ./shop-cart-tabbar-toutiao.vue */ 495));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  data: function data() {
    return {
      // wxs: wxs,
      naviData: {
        ifGoBack: true
      },
      movableView: {
        //movable-view位置
        x: 0,
        y: 200
      },
      selMainMenuIndex: '1',
      basketAnimation: null,
      orderAnimation: null,
      shopInfoAnimation: null,
      basketIconAnimation: null,
      popupShow: false,
      //购物车弹窗
      selIndex: 0,
      //左侧分类选中索引
      categoryList: [],
      //分类列表
      productList: [],
      showOrder: true,
      //商品分类页
      showShopInfo: false,
      //店铺信息也
      mobile: '',
      noticeList: [],
      showCouponPop: false,
      //店铺优惠券
      couponList: couponList,
      couponList_type0: [],
      couponList_type1: [],
      couponPopAnimation: "",
      showCoupons: false,
      showMiniPop: true,
      ifInToutiao: false
    };
  },
  components: {
    customNavi: customNavi,
    shopCartTabToutiao: shopCartTabToutiao,
    shopCartTabWeixin: shopCartTabWeixin
  },
  props: {},
  computed: {
    shopId: function shopId() {
      return this.$store.state.currentShop.shopId;
    },
    shopInfo: function shopInfo() {
      return this.$store.getters['shop/shopInfo'];
    },
    customBar: function customBar() {
      return this.$store.getters['sysInfo/customBarHeight'];
    },
    screenHeight: function screenHeight() {
      return this.$store.state.sysInfo.sysInfo.screenHeight;
    },
    //购物车数量
    basketCount: function basketCount() {
      var count = this.$store.getters['shop/shopCartTotalCount'];
      if (count == 0) this.hideBasket();
      return count;
    },
    //是否显示movable-view 购物车图标
    basketHide: function basketHide() {
      if (this.basketCount && !this.popupShow) {
        return true;
      }
      return false;
    },
    //标记从产品分类加入购物车的产品数量，加购成功累计数量，重新获取shopCartItem则重置为0，以此减少请求数量
    tempCount: {
      get: function get() {
        return this.$store.getters['shop/tempCount'];
      },
      set: function set(newValue, oldValue) {
        this.$store.commit('shop/updateTempCount', newValue);
      }
    },
    shopCartItems: function shopCartItems() {
      return this.$store.getters['shop/shopCartItems'];
    },
    priceInfo: function priceInfo() {
      return this.$store.getters['shop/priceInfo'];
    }
  },
  onLoad: function onLoad(options) {
    this.mobile = this.$store.state.userInfo.mobile;
    // if(options.shopId) {
    // 	this.$store.dispatch('currentShop/getShopInfo', options.shopId)
    // }
  },
  onShow: function onShow() {
    // this.selIndex = 0
    this.loadData();
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadData();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: "小象智慧门店美食商城",
      path: '/pages/home/home',
      success: function success(res) {}
    };
  },
  methods: {
    loadData: function loadData() {
      var _this = this;
      this.$request.get("/category/categoryInfo", {
        shopId: this.shopId
      }).then(function (res) {
        if (res.length !== 0) {
          _this.categoryList = res;
          _this.onMenuTab(_this.selIndex);
        }
      });
      this.getNoticeList();
      this.getCouponList();
    },
    closeMiniPop: function closeMiniPop() {
      this.showMiniPop = false;
    },
    getCouponList: function getCouponList() {
      var _this2 = this;
      this.$request.get('/coupon/coupon/shopCoupon/' + this.shopId).then(function (res) {
        var couponList_type0 = [];
        var couponList_type1 = [];
        res.forEach(function (item) {
          if (item.couponType == 0) {
            couponList_type0.push(item);
          } else if (item.couponType == 1) {
            couponList_type1.push(item);
          }
        });
        _this2.setData({
          couponList_type0: couponList_type0,
          couponList_type1: couponList_type1,
          couponList: res
        });
      }, function (rej) {
        console.log(rej);
      });
    },
    getNoticeList: function getNoticeList() {
      var _this3 = this;
      this.$request.get('/shop/notice/noticeList', {
        shopId: this.shopId
      }).then(function (res) {
        _this3.noticeList = res;
      }, function (rej) {
        console.log(rej);
      });
    },
    basketMove: function basketMove(e) {
      var windowWidth = this.$store.state.sysInfo.sysInfo.windowWidth;
      var x = e.changedTouches[0].pageX > windowWidth / 2 ? windowWidth - 50 : 0;
      this.movableView.x = x;
      this.movableView.y = e.changedTouches[0].pageY - 90;
    },
    // 主菜单 点单/商家 点击事件
    mainMenuTap: function mainMenuTap(e) {
      var _this4 = this;
      var shopInfoAnimation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out'
      });
      var orderAnimation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out'
      });
      var selMainMenuIndex = e ? e.currentTarget.dataset.index : 99;
      if (this.selMainMenuIndex == 1 && selMainMenuIndex == 2) {
        this.setData({
          shopInfoAnimation: shopInfoAnimation.translateX(450).opacity(0).step().export(),
          showShopInfo: true,
          orderAnimation: orderAnimation.translateX(-450).step().export(),
          selMainMenuIndex: selMainMenuIndex
        });
        setTimeout(function () {
          _this4.setData({
            showOrder: false,
            shopInfoAnimation: shopInfoAnimation.translateX(0).opacity(1).step().export()
          });
        }, 100);
      } else if (this.selMainMenuIndex == 2 && selMainMenuIndex == 1) {
        // }else if ((this.data.selMainMenuIndex == 2 && selMainMenuIndex == 1) || selMainMenuIndex == 99) {
        this.setData({
          selMainMenuIndex: '1',
          shopInfoAnimation: shopInfoAnimation.translateX(450).step().export(),
          showOrder: true
        });
        setTimeout(function () {
          _this4.setData({
            showShopInfo: false,
            orderAnimation: orderAnimation.translateX(0).step().export()
          });
        }, 50);
      } else {}
    },
    /**
     * 分类点击事件
     */
    onMenuTab: function onMenuTab(index) {
      this.selIndex = index;
      var category = this.categoryList[index];
      if (category.productList) {
        this.productList = category.productList;
        return;
      }
      var id = category.categoryId;
      var name = category.categoryName;
      if (name == '活动专区') {
        this.getDiscountedProd(index);
      } else {
        this.getProdList(id, index);
      }
    },
    getDiscountedProd: function getDiscountedProd() {
      var _this5 = this;
      this.$request.get('/prod/getActivityProd', {
        shopId: this.shopId
      }).then(function (res) {
        var productList = res.records;
        productList.forEach(function (prod, index) {
          productList[index].prodCount = 0;
          _this5.shopCartItems.forEach(function (item) {
            if (prod.prodId == item.prodId) {
              productList[index].prodCount = item.prodCount;
            }
          });
        });
        _this5.productList = productList;
      }, function (rej) {
        console.log(rej);
      });
    },
    getProdList: function getProdList(categoryId, index) {
      var _this6 = this;
      //加载产品列表
      this.$request.get("/prod/pageProd", {
        categoryId: categoryId,
        shopId: this.shopId
      }).then(function (res) {
        _this6.productList = res.records;
        _this6.categoryList[index].productList = res.records;
      }, function (rej) {
        console.log(rej);
      });
    },
    // 展开购物车弹窗
    showBasket: function showBasket() {
      var _this7 = this;
      if (!this.popupShow) {
        var basketAnimation = uni.createAnimation({
          duration: 400,
          timingFunction: 'ease-in-out'
        });
        // this.getBasketInfo();
        this.setData({
          popupShow: true,
          basketAnimation: basketAnimation.translateY(1000).step().export()
        });
        setTimeout(function () {
          _this7.setData({
            basketAnimation: basketAnimation.translateY(0).step().export()
          });
        });
      }
    },
    // 关闭购物车弹窗
    hideBasket: function hideBasket() {
      var _this8 = this;
      var basketAnimation = uni.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out'
      });
      this.setData({
        basketAnimation: basketAnimation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this8.setData({
          popupShow: false
        });
      }, 300);
    },
    addToCart_: function addToCart_(prod, index) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var prodId, activityorderflag, activitytimesflag, defaultSku, _res, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                prodId = prod.prodId;
                activityorderflag = prod.activityorderflag;
                activitytimesflag = prod.activitytimesflag;
                if (prod.defaultSku) {
                  _context.next = 10;
                  break;
                }
                _context.next = 6;
                return _this9.$request.get("/prod/prodInfo", {
                  prodId: prodId
                });
              case 6:
                _res = _context.sent;
                if (_res.skuList.length !== 0) {
                  defaultSku = _res.skuList[0].skuId;
                  prod.defaultSku = defaultSku;
                  _this9.$set(_this9.productList, index, prod);
                }
                _context.next = 11;
                break;
              case 10:
                defaultSku = prod.defaultSku;
              case 11:
                _context.next = 13;
                return _this9.$request.post("/p/shopCart/changeItem", {
                  basketId: 0,
                  count: 1,
                  prodId: prodId,
                  activityTimesFlag: activitytimesflag,
                  activityOrderFlag: activityorderflag,
                  shopId: _this9.shopId,
                  skuId: defaultSku
                });
              case 13:
                res = _context.sent;
                if (res.status == 0) {
                  _this9.$showToast(res.message, 2000);
                  _this9.$store.dispatch('shop/refreshCartItems');
                  if (_this9.basketHide) {
                    _this9.addCarAnimation();
                  }
                } else if (res.status == 1) {
                  _this9.$showToast(res.message, null, 2000);
                } else {
                  _this9.$showToast('网络出错，请稍后重试');
                }
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    addCarAnimation: function addCarAnimation() {
      var _this10 = this;
      var animation = uni.createAnimation({
        duration: 100,
        timingFunction: 'ease-in-out'
      });
      animation.scale(1.5).step().scale(1).step();
      this.basketIconAnimation = animation;
      setTimeout(function () {
        _this10.basketIconAnimation = null;
      }, 200);
    },
    //判断数组是否包含某对象
    array_contain: function array_contain(array, obj) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == obj)
          //如果要求数据类型也一致，这里可使用恒等号===
          return true;
      }
      return false;
    },
    // 购物车详情
    // getBasketInfo() {
    // 	//加载购物车
    // 	if(this.tempCount!==0) {
    // 		this.$store.dispatch('shop/refreshCartItems')
    // 	}
    // },
    //跳转商品详情页
    toProdPage: function toProdPage(e) {
      var prodid = e.currentTarget.dataset.prodid;
      var isGroupProd = e.currentTarget.dataset.isgroupprod;
      if (isGroupProd == 1) {
        uni.navigateTo({
          url: '/pages/groupbuy/groupbuy?prodid=' + prodid
        });
        return;
      }
      uni.navigateTo({
        url: '/pages/prod/prod?prodid=' + prodid
      });
    },
    // 输入产品数量
    onBasketCountChange: function onBasketCountChange(e) {
      var newCount = Number(e.detail.value);
      var index = e.currentTarget.dataset.index;
      var oldCount = e.currentTarget.dataset.oldcount;
      var shopCartItems = this.shopCartItems;
      if (newCount === "0") {
        this.updateCount(shopCartItems, index, 0 - oldCount);
      } else if (newCount > 0 && newCount !== oldCount) {
        this.updateCount(shopCartItems, index, newCount - oldCount);
      } else {
        shopCartItems[index].count = oldCount;
      }
    },
    updateCount: function updateCount(prod, index, updateNum) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this11.$request.post('/p/shopCart/changeItem', {
                  count: updateNum,
                  prodId: prod.prodId,
                  skuId: prod.skuId,
                  shopId: _this11.shopId,
                  activityOrderFlag: prod.activityOrderFlag,
                  activityTimesFlag: prod.activityTimesFlag
                });
              case 2:
                res = _context2.sent;
                //res== 0 更改成功
                //res== 1 更改失败
                if (res.status == 0) {
                  // this.$store.commit('shop/updateGoodsCount', {index, prodId: prod.prodId, updateNum })
                  _this11.$store.dispatch('shop/refreshCartItems');
                } else if (res.status == 1) {
                  _this11.$showToast(res.message, null, 2000);
                } else {
                  _this11.$showToast('网络出错，请稍后重试');
                }
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    /**
     * 清空购物车
     */
    onDelBasket: function onDelBasket() {
      var shopCartItems = this.shopCartItems;
      var self = this;
      var basketIds = [];
      for (var i = 0; i < shopCartItems.length; i++) {
        basketIds.push(shopCartItems[i].basketId);
      }
      uni.showModal({
        title: '',
        content: '确认要删除选中的商品吗？',
        confirmColor: "#eb2444",
        success: function success(res) {
          return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
            var _res2;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!res.confirm) {
                      _context3.next = 9;
                      break;
                    }
                    _context3.next = 3;
                    return self.$request.delete("/p/shopCart/deleteItem", basketIds);
                  case 3:
                    _res2 = _context3.sent;
                    self.$showToast(_res2);
                    self.shopCartItems = [];
                    console.log('pre running clear shopcart');
                    self.$store.commit('shop/clearShopCartItems');
                    self.hideBasket();
                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }))();
        }
      });
    },
    /**
     * 授权获取手机号
     */
    getPhoneNumber: function getPhoneNumber(e) {
      var _this12 = this;
      console.log(e);
      var that = this;
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        this.$request.get("/p/user/getPhoneNumber", {
          encryptedData: e.detail.encryptedData,
          //加密数据
          iv: e.detail.iv //向量
        }).then(function (res) {
          if (res != undefined && res != null) {
            _this12.$store.commit('updateUserInfo', {
              mobile: res
            });
          }
        }, function (rej) {
          console.log(rej);
        });
        this.toFirmOrder();
      } else {
        this.$showToast('请授权手机号以便为您提供更好的服务');
      }
    },
    makephonecall: function makephonecall() {
      var _this13 = this;
      uni.makePhoneCall({
        phoneNumber: this.shopInfo.mobile,
        //这个是我的手机号，模拟测试
        success: function success() {
          uni.nextTick(function () {
            _this13.setData({
              showShopInfo: true,
              showOrder: false
            });
          });
        },
        fail: function fail() {
          uni.nextTick(function () {
            _this13.setData({
              showShopInfo: true,
              showOrder: false
            });
          });
        }
      });
    },
    /**
     * 去结算
     */
    toFirmOrder: function toFirmOrder() {
      var _this$priceInfo = this.priceInfo,
        startPrice = _this$priceInfo.startPrice,
        finalMoney = _this$priceInfo.finalMoney;
      if (startPrice > finalMoney) {
        return;
      }
      var shopCartItems = this.shopCartItems;
      var basketIds = [];
      shopCartItems.forEach(function (shopCartItem) {
        basketIds.push(shopCartItem.basketId);
      });
      uni.setStorageSync("basketIds", JSON.stringify(basketIds));
      uni.navigateTo({
        url: '/pages/submit-order/submit-order?orderEntry=0'
      });
    },
    goLicense: function goLicense() {
      uni.navigateTo({
        url: "/pages/show-license/show-license?bussinessLicense=".concat(this.shopInfo.bussinessLicense, "&hygienicLicense=").concat(this.shopInfo.hygienicLicense)
      });
    },
    // 开关优惠券弹窗
    showCouponPopFun: function showCouponPopFun() {
      var _this14 = this;
      var animation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease-in-out'
      });
      this.setData({
        couponPopAnimation: animation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this14.setData({
          showCoupons: true,
          couponPopAnimation: animation.translateY(0).step().export()
        });
      }, 10);
    },
    closeCouponPop: function closeCouponPop() {
      var _this15 = this;
      var animation = uni.createAnimation({
        duration: 300,
        timingFunction: "ease-in-out"
      });
      this.setData({
        couponPopAnimation: animation.translateY(1000).step().export()
      });
      setTimeout(function () {
        _this15.setData({
          showCoupons: false
        });
      }, 300);
    },
    //领取优惠券
    handleReceive: function handleReceive(e) {
      var _this16 = this;
      var coupon = this.couponList[e.currentTarget.dataset.index];
      if (coupon.useState == null) {
        this.$request.post('/couponRecord/couponRecord', _objectSpread(_objectSpread({}, coupon), {}, {
          state: 1,
          shopId: getApp().shopId
        })).then(function (res) {
          if (res.code === 200) {
            _this16.$showToast('领取成功');
          } else {
            _this16.$showToast('领取成功');
          }
          _this16.getCouponList();
        }, function (rej) {
          console.log(rej);
        });
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 138:
/*!**********************************************************************************************************************!*\
  !*** /Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./category.vue?vue&type=style&index=0&lang=css& */ 139);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_category_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 139:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/hongliangshen/Desktop/uniapp_shop/cwt_shop/pages/category/category.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[131,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/category/category.js.map