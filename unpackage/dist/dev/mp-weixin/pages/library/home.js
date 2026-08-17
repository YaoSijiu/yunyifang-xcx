(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/library/home"],{

/***/ 40:
/*!****************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"pages%2Flibrary%2Fhome"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _home = _interopRequireDefault(__webpack_require__(/*! ./pages/library/home.vue */ 41));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_home.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 41:
/*!*********************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/home.vue ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.vue?vue&type=template&id=b6963da8&scoped=true& */ 42);
/* harmony import */ var _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.vue?vue&type=script&lang=js& */ 44);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.vue?vue&type=style&index=0&id=b6963da8&lang=scss&scoped=true& */ 49);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b6963da8",
  null,
  false,
  _home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/library/home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 42:
/*!****************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/home.vue?vue&type=template&id=b6963da8&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=template&id=b6963da8&scoped=true& */ 43);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_b6963da8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 43:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/home.vue?vue&type=template&id=b6963da8&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    yunTabbar: function () {
      return Promise.all(/*! import() | components/yun-tabbar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/yun-tabbar")]).then(__webpack_require__.bind(null, /*! @/components/yun-tabbar.vue */ 336))
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
  var l1 = _vm.__map(_vm.leftColumn, function (card, __i0__) {
    var $orig = _vm.__get_orig(card)
    var m0 = _vm.truncateTitle(card.title)
    var l0 = _vm.splitPriceSegments(card.price)
    return {
      $orig: $orig,
      m0: m0,
      l0: l0,
    }
  })
  var l3 = _vm.__map(_vm.rightColumn, function (card, __i1__) {
    var $orig = _vm.__get_orig(card)
    var m1 = _vm.truncateTitle(card.title)
    var l2 = _vm.splitPriceSegments(card.price)
    return {
      $orig: $orig,
      m1: m1,
      l2: l2,
    }
  })
  var g0 = !_vm.loading && _vm.visibleCards.length === 0
  var g1 = _vm.visibleCards.length
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.tabExpanded = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l1: l1,
        l3: l3,
        g0: g0,
        g1: g1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 44:
/*!**********************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/home.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=script&lang=js& */ 45);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 45:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/home.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 46));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 48));
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 38));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 39));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var PRICE_OPTIONS = [{
  label: '0-1000',
  minPrice: '0',
  maxPrice: '1000'
}, {
  label: '1000-2000',
  minPrice: '1000',
  maxPrice: '2000'
}, {
  label: '2000-3000',
  minPrice: '2000',
  maxPrice: '3000'
}, {
  label: '3000-4000',
  minPrice: '3000',
  maxPrice: '4000'
}, {
  label: '4000-5000',
  minPrice: '4000',
  maxPrice: '5000'
}, {
  label: '5000以上',
  minPrice: '5000',
  maxPrice: ''
}];
var _default = {
  data: function data() {
    return {
      statusBarHeight: 0,
      searchKeyword: '',
      activePrimaryTab: 1,
      activeSecondaryTab: 0,
      pageNo: 1,
      pageSize: 6,
      loading: false,
      finished: false,
      total: 0,
      searchTimer: null,
      requestSeq: 0,
      hasCheckedProfessionPush: false,
      areaTree: [],
      areaColumns: [[], []],
      areaIndexes: [0, 0],
      tempAreaIndexes: [0, 0],
      areaLoading: false,
      areaPopupVisible: false,
      tabExpanded: false,
      tabPanelTop: 0,
      selectedRegionId: '',
      selectedRegionText: '',
      selectedRegionPath: [],
      priceOptions: PRICE_OPTIONS,
      selectedPriceIndex: -1,
      pricePopupVisible: false,
      tempSelectedPriceIndex: -1,
      tempCustomMinPrice: '',
      tempCustomMaxPrice: '',
      isCustomPrice: false,
      primaryTabs: [{
        label: '关注',
        key: 'fixed_follow',
        type: 'follow'
      }, {
        label: '推荐',
        key: 'fixed_recommend',
        type: 'recommend'
      }],
      secondaryTabs: [{
        label: '最受欢迎',
        key: 'popular',
        type: 'popular'
      }, {
        label: '新入驻',
        key: 'latest'
      }, {
        label: '地理位置',
        key: 'location'
      }, {
        label: '价格',
        key: 'price'
      }],
      visibleCards: [],
      leftColumn: [],
      rightColumn: [],
      translateX: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartTranslate: 0,
      maxScroll: 0,
      hasDragged: false,
      preventClick: false,
      refreshing: false,
      pcPullStartY: 0,
      pcPullDistance: 0,
      pcPulling: false,
      pcPullTriggered: false,
      pcPullThreshold: 70,
      pcScrollTop: 0
    };
  },
  computed: {
    selectedPriceLabel: function selectedPriceLabel() {
      if (this.isCustomPrice) {
        var min = this.tempCustomMinPrice || '0';
        var max = this.tempCustomMaxPrice || '不限';
        return "".concat(min, "-").concat(max);
      }
      if (this.selectedPriceIndex < 0) {
        return '价格区间';
      }
      var option = this.priceOptions[this.selectedPriceIndex];
      return option ? option.label : '价格';
    },
    emptyStateText: function emptyStateText() {
      var activeTab = this.primaryTabs[this.activePrimaryTab];
      return activeTab && activeTab.type === 'follow' ? '暂无关注' : '暂无橱窗';
    },
    pcPullTranslateY: function pcPullTranslateY() {
      if (this.refreshing) {
        return this.pcPullThreshold;
      }
      if (!this.pcPulling || this.pcPullDistance <= 0) {
        return 0;
      }
      return Math.min(this.pcPullDistance, this.pcPullThreshold * 2.2);
    },
    pcPullTip: function pcPullTip() {
      if (this.refreshing) {
        return '正在刷新...';
      }
      return this.pcPullDistance >= this.pcPullThreshold ? '松开立即刷新' : '下拉可以刷新';
    }
  },
  created: function created() {
    var windowInfo = uni.getWindowInfo();
    this.statusBarHeight = windowInfo.statusBarHeight || 20;
    this.loadTaskTypeTabs();
    this.loadAreaTree();
    this.resetCards();
  },
  onShow: function onShow() {
    uni.hideTabBar({
      animation: false
    });
    this.checkProfessionPushPreference();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
  },
  methods: {
    checkProfessionPushPreference: function checkProfessionPushPreference() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.hasCheckedProfessionPush) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (uni.getStorageSync('token')) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                _this.hasCheckedProfessionPush = true;
                _context.prev = 5;
                _context.next = 8;
                return _request.default.get('/wechat/professionCategory/hasTaskType');
              case 8:
                res = _context.sent;
                if (!(res.data === true)) {
                  _context.next = 11;
                  break;
                }
                return _context.abrupt("return");
              case 11:
                uni.navigateTo({
                  url: '/subpkg-others/pages/professionCategory/select'
                });
                _context.next = 17;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](5);
                _this.hasCheckedProfessionPush = false;
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 14]]);
      }))();
    },
    switchPrimaryTab: function switchPrimaryTab(index) {
      if (this.preventClick) return;
      this.activePrimaryTab = index;
      this.scrollActiveTabIntoView(index);
      this.resetCards();
    },
    onTabExpandSelect: function onTabExpandSelect(index) {
      var _this2 = this;
      this.activePrimaryTab = index;
      this.tabExpanded = false;
      this.$nextTick(function () {
        _this2.scrollActiveTabIntoView(index);
      });
      this.resetCards();
    },
    scrollActiveTabIntoView: function scrollActiveTabIntoView(index) {
      var _this3 = this;
      var targetIndex = typeof index === 'number' ? index : this.activePrimaryTab;
      var query = uni.createSelectorQuery().in(this);
      query.select('.primary-tabs').boundingClientRect();
      query.selectAll('.primary-tab').boundingClientRect();
      query.exec(function (res) {
        var viewport = res && res[0];
        var tabs = res && res[1];
        if (!viewport || !tabs || !tabs[targetIndex]) return;
        var tab = tabs[targetIndex];
        var containerWidth = viewport.width;
        var tabCenter = tab.left + tab.width / 2 - (viewport.left || 0);
        var viewportCenter = containerWidth / 2;
        var delta = tabCenter - viewportCenter;
        var targetX = _this3.translateX - delta;
        var maxX = -_this3.maxScroll;
        _this3.translateX = Math.max(maxX, Math.min(0, targetX));
      });
    },
    toggleTabDropdown: function toggleTabDropdown() {
      var _this4 = this;
      if (this.tabExpanded) {
        this.tabExpanded = false;
        return;
      }
      var query = uni.createSelectorQuery().in(this);
      query.select('.primary-tabs-wrapper').boundingClientRect();
      query.exec(function (res) {
        if (res && res[0]) {
          _this4.tabPanelTop = res[0].bottom;
        }
        _this4.tabExpanded = true;
      });
    },
    loadTaskTypeTabs: function loadTaskTypeTabs() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res, tags;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _request.default.get('/wechat/homePage/taskTypeTags');
              case 3:
                res = _context2.sent;
                tags = _this5.extractTaskTypeTags(res);
                _this5.primaryTabs = _this5.buildPrimaryTabs(tags);
                _context2.next = 11;
                break;
              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                _this5.primaryTabs = _this5.buildPrimaryTabs([]);
              case 11:
                _context2.prev = 11;
                _this5.$nextTick(function () {
                  _this5.updateScrollBounds();
                });
                return _context2.finish(11);
              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8, 11, 14]]);
      }))();
    },
    updateScrollBounds: function updateScrollBounds() {
      var _this6 = this;
      var query = uni.createSelectorQuery().in(this);
      query.select('.primary-tabs').boundingClientRect();
      query.select('.primary-tabs-track').boundingClientRect();
      query.exec(function (res) {
        if (res && res[0] && res[1]) {
          _this6.maxScroll = Math.max(0, res[1].width - res[0].width);
          if (_this6.translateX < -_this6.maxScroll) {
            _this6.translateX = -_this6.maxScroll;
          }
        }
      });
    },
    onDragStart: function onDragStart(e) {
      this.isDragging = true;
      this.hasDragged = false;
      var point = e.touches && e.touches[0] ? e.touches[0] : e;
      this.dragStartX = point.clientX || 0;
      this.dragStartTranslate = this.translateX;
    },
    onDragMove: function onDragMove(e) {
      if (!this.isDragging) return;
      var point = e.touches && e.touches[0] ? e.touches[0] : e;
      var delta = (point.clientX || 0) - this.dragStartX;
      if (Math.abs(delta) > 5) {
        this.hasDragged = true;
      }
      var newX = this.dragStartTranslate + delta;
      newX = Math.max(-this.maxScroll, Math.min(0, newX));
      this.translateX = newX;
    },
    onDragEnd: function onDragEnd() {
      var _this7 = this;
      this.isDragging = false;
      if (this.hasDragged) {
        this.preventClick = true;
        setTimeout(function () {
          _this7.preventClick = false;
        }, 100);
      }
    },
    extractTaskTypeTags: function extractTaskTypeTags(res) {
      if (Array.isArray(res)) {
        return res;
      }
      if (Array.isArray(res && res.rows)) {
        return res.rows;
      }
      var data = res && res.data;
      if (Array.isArray(data)) {
        return data;
      }
      if (Array.isArray(data && data.rows)) {
        return data.rows;
      }
      if (Array.isArray(data && data.list)) {
        return data.list;
      }
      if (Array.isArray(data && data.records)) {
        return data.records;
      }
      return [];
    },
    buildPrimaryTabs: function buildPrimaryTabs(tags) {
      var _this8 = this;
      var fixedTabs = [{
        label: '关注',
        key: 'fixed_follow',
        type: 'follow'
      }, {
        label: '推荐',
        key: 'fixed_recommend',
        type: 'recommend'
      }];
      var seenKeys = {};
      var dynamicTabs = (tags || []).reduce(function (result, item) {
        var categoryName = _this8.resolveProfessionCategoryName(item);
        var categoryKey = _this8.resolveProfessionCategoryKey(item);
        if (!categoryName || !categoryKey || seenKeys[categoryKey]) {
          return result;
        }
        seenKeys[categoryKey] = true;
        result.push({
          label: categoryName,
          key: "category_".concat(categoryKey),
          professionCategoryId: _this8.resolveProfessionCategoryId(item),
          categoryCode: item && item.categoryCode ? String(item.categoryCode) : ''
        });
        return result;
      }, []);
      return fixedTabs.concat(dynamicTabs);
    },
    resolveProfessionCategoryName: function resolveProfessionCategoryName(item) {
      if (!item) {
        return '';
      }
      return String(item.categoryName || item.professionCategoryName || item.name || item.label || '').trim();
    },
    resolveProfessionCategoryKey: function resolveProfessionCategoryKey(item) {
      if (!item) {
        return '';
      }
      var id = this.resolveProfessionCategoryId(item);
      if (id) {
        return "id_".concat(id);
      }
      var categoryCode = item.categoryCode ? String(item.categoryCode).trim() : '';
      if (categoryCode) {
        return "code_".concat(categoryCode);
      }
      var categoryName = this.resolveProfessionCategoryName(item);
      return categoryName ? "name_".concat(categoryName) : '';
    },
    resolveProfessionCategoryId: function resolveProfessionCategoryId(item) {
      if (!item) {
        return '';
      }
      var id = item.professionCategoryId || item.categoryId || item.id;
      if (id) {
        return id;
      }
      var categoryCode = item.categoryCode ? String(item.categoryCode) : '';
      return /^\d+$/.test(categoryCode) ? categoryCode : '';
    },
    switchSecondaryTab: function switchSecondaryTab(index) {
      this.activeSecondaryTab = index;
      this.resetCards();
    },
    loadAreaTree: function loadAreaTree() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var res, tree;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this9.areaLoading) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _this9.areaLoading = true;
                _context3.prev = 3;
                _context3.next = 6;
                return _request.default.get('/wechat/basic/areaTree');
              case 6:
                res = _context3.sent;
                tree = _this9.normalizeAreas(res && res.data ? res.data : res);
                _this9.areaTree = tree;
                _this9.areaIndexes = [0, 0];
                _this9.updateAreaColumns(_this9.areaIndexes);
                _context3.next = 18;
                break;
              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](3);
                _this9.areaTree = [];
                _this9.areaColumns = [[], []];
                _this9.areaIndexes = [0, 0];
              case 18:
                _context3.prev = 18;
                _this9.areaLoading = false;
                return _context3.finish(18);
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 13, 18, 21]]);
      }))();
    },
    normalizeAreas: function normalizeAreas(list) {
      var _this10 = this;
      return (Array.isArray(list) ? list : []).map(function (item) {
        return {
          id: item.id || item.regionId || item.value || '',
          name: item.name || item.regionName || item.label || '',
          children: _this10.normalizeAreas(item.children || item.childList || item.child || [])
        };
      }).filter(function (item) {
        return item.id || item.name;
      });
    },
    prepareAreaPicker: function prepareAreaPicker() {
      if (!this.areaTree.length) {
        this.loadAreaTree();
      }
      this.tempAreaIndexes = this.areaIndexes.slice();
      this.updateAreaColumns(this.tempAreaIndexes);
      this.areaPopupVisible = true;
    },
    onAreaColumnChange: function onAreaColumnChange(event) {
      var newValue = event.detail.value;
      var indexes = Array.isArray(newValue) ? newValue.slice() : [0, 0];
      if (indexes[0] !== this.tempAreaIndexes[0]) {
        indexes[1] = 0;
      }
      this.tempAreaIndexes = indexes;
      this.updateAreaColumns(indexes);
    },
    updateAreaColumns: function updateAreaColumns(indexes) {
      var provinceIndex = indexes[0] || 0;
      var provinces = this.areaTree;
      var realProvince = provinceIndex > 0 ? provinces[provinceIndex - 1] : null;
      var cities = realProvince && realProvince.children && realProvince.children.length ? realProvince.children : [];
      var provinceCol = provinces.length ? [{
        id: '',
        name: '全部'
      }].concat(provinces) : [];
      var cityCol = cities.length ? [{
        id: '',
        name: '全部'
      }].concat(cities) : [{
        id: '',
        name: '全部'
      }];
      this.areaColumns = [provinceCol, cityCol];
    },
    confirmAreaSelection: function confirmAreaSelection() {
      this.areaIndexes = this.tempAreaIndexes.slice();
      var path = this.getSelectedRegionPath(this.areaIndexes);
      var locationIndex = this.secondaryTabs.findIndex(function (item) {
        return item.key === 'location';
      });
      this.selectedRegionPath = path;
      if (path.length === 0) {
        this.selectedRegionId = '';
        this.selectedRegionText = '';
        if (this.activeSecondaryTab === locationIndex) {
          this.activeSecondaryTab = 0;
        }
      } else {
        var selected = path[path.length - 1];
        this.selectedRegionId = String(selected.id);
        this.selectedRegionText = path.map(function (item) {
          return item.name;
        }).filter(Boolean).join('');
        this.activeSecondaryTab = locationIndex;
      }
      this.areaPopupVisible = false;
      this.resetCards();
    },
    cancelAreaSelection: function cancelAreaSelection() {
      this.areaPopupVisible = false;
    },
    getSelectedRegionPath: function getSelectedRegionPath(indexes) {
      var provinceIndex = indexes[0] || 0;
      var cityIndex = indexes[1] || 0;
      if (provinceIndex === 0) {
        return [];
      }
      var provinces = this.areaTree;
      var province = provinces[provinceIndex - 1];
      if (!province) {
        return [];
      }
      if (cityIndex === 0) {
        return [province];
      }
      var cities = province.children || [];
      var city = cities[cityIndex - 1];
      if (!city) {
        return [province];
      }
      return [province, city];
    },
    clearRegionFilter: function clearRegionFilter() {
      this.selectedRegionId = '';
      this.selectedRegionText = '';
      this.selectedRegionPath = [];
      this.areaIndexes = [0, 0];
      this.tempAreaIndexes = [0, 0];
      this.updateAreaColumns(this.areaIndexes);
      var locationIndex = this.secondaryTabs.findIndex(function (item) {
        return item.key === 'location';
      });
      if (this.activeSecondaryTab === locationIndex) {
        this.activeSecondaryTab = 0;
      }
      this.resetCards();
    },
    openPricePopup: function openPricePopup() {
      this.tempSelectedPriceIndex = this.isCustomPrice ? -1 : this.selectedPriceIndex;
      this.tempCustomMinPrice = this.isCustomPrice ? this.tempCustomMinPrice : '';
      this.tempCustomMaxPrice = this.isCustomPrice ? this.tempCustomMaxPrice : '';
      this.pricePopupVisible = true;
    },
    closePricePopup: function closePricePopup() {
      this.pricePopupVisible = false;
    },
    selectPriceOption: function selectPriceOption(idx) {
      this.tempSelectedPriceIndex = idx;
      this.isCustomPrice = false;
      this.tempCustomMinPrice = '';
      this.tempCustomMaxPrice = '';
    },
    onCustomMinInput: function onCustomMinInput(e) {
      this.tempCustomMinPrice = e.detail.value;
      if (this.tempCustomMinPrice || this.tempCustomMaxPrice) {
        this.isCustomPrice = true;
        this.tempSelectedPriceIndex = -1;
      }
    },
    onCustomMaxInput: function onCustomMaxInput(e) {
      this.tempCustomMaxPrice = e.detail.value;
      if (this.tempCustomMinPrice || this.tempCustomMaxPrice) {
        this.isCustomPrice = true;
        this.tempSelectedPriceIndex = -1;
      }
    },
    resetPricePopup: function resetPricePopup() {
      this.tempSelectedPriceIndex = -1;
      this.tempCustomMinPrice = '';
      this.tempCustomMaxPrice = '';
      this.isCustomPrice = false;
    },
    clearPriceFilter: function clearPriceFilter() {
      this.tempSelectedPriceIndex = -1;
      this.tempCustomMinPrice = '';
      this.tempCustomMaxPrice = '';
      this.isCustomPrice = false;
      this.selectedPriceIndex = -1;
      this.pricePopupVisible = false;
      this.resetCards();
    },
    confirmPricePopup: function confirmPricePopup() {
      this.selectedPriceIndex = this.tempSelectedPriceIndex;
      if (this.isCustomPrice) {
        this.selectedPriceIndex = -1;
      } else {
        this.tempCustomMinPrice = '';
        this.tempCustomMaxPrice = '';
      }
      this.pricePopupVisible = false;
      this.resetCards();
    },
    resetCards: function resetCards() {
      this.pageNo = 1;
      this.finished = false;
      this.visibleCards = [];
      this.leftColumn = [];
      this.rightColumn = [];
      return this.fetchShowcaseList(1, true);
    },
    handleRefresh: function handleRefresh() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this11.searchTimer) {
                  clearTimeout(_this11.searchTimer);
                  _this11.searchTimer = null;
                }
                _this11.refreshing = true;
                _context4.prev = 2;
                _context4.next = 5;
                return _this11.resetCards();
              case 5:
                _context4.prev = 5;
                _this11.refreshing = false;
                return _context4.finish(5);
              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2,, 5, 8]]);
      }))();
    },
    loadMoreCards: function loadMoreCards() {
      if (this.loading || this.finished) {
        return;
      }
      this.fetchShowcaseList(this.pageNo + 1, false);
    },
    handleContentScroll: function handleContentScroll(e) {
      var detail = e && e.detail ? e.detail : {};
      this.pcScrollTop = typeof detail.scrollTop === 'number' ? detail.scrollTop : 0;
    },
    getPointerY: function getPointerY(e) {
      if (!e) return 0;
      var touch = e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0];
      if (touch && typeof touch.clientY === 'number') return touch.clientY;
      if (typeof e.clientY === 'number') return e.clientY;
      return 0;
    },
    onPcPullStart: function onPcPullStart(e) {
      if (this.refreshing) return;
      var y = this.getPointerY(e);
      if (this.pcScrollTop > 0) {
        this.pcPulling = false;
        return;
      }
      this.pcPulling = true;
      this.pcPullTriggered = false;
      this.pcPullStartY = y;
      this.pcPullDistance = 0;
    },
    onPcPullMove: function onPcPullMove(e) {
      if (!this.pcPulling || this.refreshing) return;
      var y = this.getPointerY(e);
      var delta = y - this.pcPullStartY;
      if (delta <= 0) {
        this.pcPullDistance = 0;
        return;
      }
      var max = this.pcPullThreshold * 2.2;
      if (delta > max) {
        delta = max + (delta - max) * 0.3;
      }
      this.pcPullDistance = delta;
      if (delta >= this.pcPullThreshold) {
        this.pcPullTriggered = true;
      }
    },
    onPcPullEnd: function onPcPullEnd() {
      if (!this.pcPulling) return;
      var triggered = this.pcPullTriggered;
      this.pcPulling = false;
      this.pcPullTriggered = false;
      this.pcPullDistance = 0;
      if (triggered && !this.refreshing) {
        this.handleRefresh();
      }
    },
    fetchShowcaseList: function fetchShowcaseList(pageNo, isRefresh) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var requestSeq, newCards, res, rows;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                requestSeq = ++_this12.requestSeq;
                _this12.loading = true;
                newCards = [];
                _context5.prev = 3;
                _context5.next = 6;
                return _request.default.get('/wechat/homePage/showCase/list', _this12.buildQueryParams(pageNo));
              case 6:
                res = _context5.sent;
                if (requestSeq === _this12.requestSeq) {
                  rows = Array.isArray(res.rows) ? res.rows : [];
                  newCards = rows.map(function (item) {
                    return _this12.normalizeShowcaseCard(item);
                  });
                  _this12.total = Number(res.total) || 0;
                  _this12.pageNo = pageNo;
                  _this12.visibleCards = isRefresh ? newCards : _this12.visibleCards.concat(newCards);
                  _this12.finished = rows.length < _this12.pageSize || _this12.visibleCards.length >= _this12.total;
                  if (isRefresh) {
                    _this12.leftColumn = [];
                    _this12.rightColumn = [];
                  }
                }
                _context5.next = 13;
                break;
              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](3);
                if (requestSeq === _this12.requestSeq) {
                  _this12.finished = isRefresh;
                }
              case 13:
                _context5.prev = 13;
                if (requestSeq === _this12.requestSeq) {
                  _this12.loading = false;
                }
                return _context5.finish(13);
              case 16:
                if (requestSeq === _this12.requestSeq && newCards.length > 0) {
                  _this12.distributeCards(newCards, requestSeq);
                }
              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 10, 13, 16]]);
      }))();
    },
    buildQueryParams: function buildQueryParams(pageNo) {
      var params = {
        pageNum: pageNo,
        pageSize: this.pageSize
      };
      var keyword = this.searchKeyword.trim();
      if (keyword) {
        params.showcaseTitle = keyword;
      }
      var activeTab = this.primaryTabs[this.activePrimaryTab];
      if (activeTab) {
        if (activeTab.categoryCode) {
          params.categoryCode = activeTab.categoryCode;
        } else if (activeTab.type !== undefined) {
          params.type = activeTab.type;
        }
      }
      var activeSecondary = this.secondaryTabs[this.activeSecondaryTab];
      if (activeSecondary && activeSecondary.type && !(activeTab && activeTab.type === 'follow')) {
        params.type = activeSecondary.type;
      }
      if (activeSecondary && activeSecondary.key === 'location' && this.selectedRegionId) {
        params.regionId = this.selectedRegionId;
      }
      if (this.isCustomPrice) {
        if (this.tempCustomMinPrice) {
          params.minPrice = this.tempCustomMinPrice;
        }
        if (this.tempCustomMaxPrice) {
          params.maxPrice = this.tempCustomMaxPrice;
        }
      } else if (this.selectedPriceIndex >= 0) {
        var priceOption = this.priceOptions[this.selectedPriceIndex];
        if (priceOption) {
          if (priceOption.minPrice !== '') {
            params.minPrice = priceOption.minPrice;
          }
          if (priceOption.maxPrice !== '') {
            params.maxPrice = priceOption.maxPrice;
          }
        }
      }
      return params;
    },
    normalizeShowcaseCard: function normalizeShowcaseCard(item) {
      return {
        id: item.id,
        title: item.showcaseTitle,
        author: item.nickName || '未命名用户',
        price: this.formatPrice(item.price, item.priceUnit),
        sold: "\u5DF2\u552E".concat(Number(item.salesCount) || 0),
        cover: this.buildImageUrl(item.coverImage),
        avatar: this.buildImageUrl(item.avatarUrl) || '/static/yunyiku/avatar.png',
        coverHeight: 346,
        raw: item
      };
    },
    distributeCards: function distributeCards(cards, seq) {
      var _iterator = _createForOfIteratorHelper(cards),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var card = _step.value;
          if (seq !== this.requestSeq) return;
          var baseIndex = this.leftColumn.length + this.rightColumn.length;
          if (baseIndex % 2 === 0) {
            this.leftColumn.push(card);
          } else {
            this.rightColumn.push(card);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    truncateTitle: function truncateTitle(title) {
      var maxLen = 11; // 最多显示字数，可调整
      if (!title) return '';
      return title.length > maxLen ? title.slice(0, maxLen) : title;
    },
    formatPrice: function formatPrice(price, unit) {
      var amount = price === null || price === undefined || price === '' ? '0' : price;
      return "\xA5 ".concat(amount).concat(unit ? '/' + unit : '');
    },
    splitPriceSegments: function splitPriceSegments(price) {
      if (!price) return [{
        text: '',
        num: false
      }];
      var segments = [];
      var parts = price.split(/(\d+)/);
      var _iterator2 = _createForOfIteratorHelper(parts),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var part = _step2.value;
          if (part === '') continue;
          segments.push({
            text: part,
            num: /\d/.test(part)
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return segments;
    },
    buildImageUrl: function buildImageUrl(url) {
      if (!url) {
        return '';
      }
      if (/^(https?:|wxfile:|data:|\/static\/)/.test(url)) {
        return url;
      }
      return _env.default.aliyunUrl + url + '?x-oss-process=image/resize,w_750/quality,q_65/format,webp';
    },
    handleSearch: function handleSearch() {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.resetCards();
    },
    handleSearchInput: function handleSearchInput(event) {
      var _this13 = this;
      this.searchKeyword = event.detail.value;
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(function () {
        _this13.resetCards();
      }, 300);
    },
    previewCard: function previewCard(card) {
      if (!card || !card.id) {
        uni.showToast({
          title: '橱窗信息缺失',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: "/subpkg-showcase/pages/detail/index?id=".concat(card.id)
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 49:
/*!*******************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/home.vue?vue&type=style&index=0&id=b6963da8&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=style&index=0&id=b6963da8&lang=scss&scoped=true& */ 50);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_id_b6963da8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 50:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/home.vue?vue&type=style&index=0&id=b6963da8&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[40,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/library/home.js.map