(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg-library/pages/portfolio-sort/portfolio-sort"],{

/***/ 224:
/*!**************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"subpkg-library%2Fpages%2Fportfolio-sort%2Fportfolio-sort"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _portfolioSort = _interopRequireDefault(__webpack_require__(/*! ./subpkg-library/pages/portfolio-sort/portfolio-sort.vue */ 225));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_portfolioSort.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 225:
/*!*****************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./portfolio-sort.vue?vue&type=template&id=410684fd&scoped=true& */ 226);
/* harmony import */ var _portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./portfolio-sort.vue?vue&type=script&lang=js& */ 228);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./portfolio-sort.vue?vue&type=style&index=0&id=410684fd&lang=scss&scoped=true& */ 230);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "410684fd",
  null,
  false,
  _portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg-library/pages/portfolio-sort/portfolio-sort.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 226:
/*!************************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue?vue&type=template&id=410684fd&scoped=true& ***!
  \************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./portfolio-sort.vue?vue&type=template&id=410684fd&scoped=true& */ 227);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_template_id_410684fd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 227:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue?vue&type=template&id=410684fd&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.sortedList.length
  var l0 = _vm.__map(_vm.sortedList, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var m0 = _vm.getTagCount(item)
    var m1 = m0 > 0 ? _vm.getTagCount(item) : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
    }
  })
  var m2 = _vm.isDragging && _vm.dragItem ? _vm.getTagCount(_vm.dragItem) : null
  var m3 =
    _vm.isDragging && _vm.dragItem && m2 > 0
      ? _vm.getTagCount(_vm.dragItem)
      : null
  var g1 = _vm.sortedList.map(function (item) {
    return item.id
  })
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        m2: m2,
        m3: m3,
        g1: g1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 228:
/*!******************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./portfolio-sort.vue?vue&type=script&lang=js& */ 229);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 229:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 48));
var _imageUtil = _interopRequireDefault(__webpack_require__(/*! @/utils/imageUtil.js */ 65));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var PortfolioSelect = function PortfolioSelect() {
  __webpack_require__.e(/*! require.ensure | components/portfolio-select */ "components/portfolio-select").then((function () {
    return resolve(__webpack_require__(/*! @/components/portfolio-select.vue */ 350));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    PortfolioSelect: PortfolioSelect
  },
  data: function data() {
    return {
      showAddPortfolioPopup: false,
      showItemPopup: false,
      sortedList: [],
      allPortfolios: [],
      currentItem: null,
      // 拖拽核心状态
      draggingIndex: -1,
      // 当前拖动的元素索引
      draggingId: null,
      // 当前拖动的作品集ID
      originalIndex: -1,
      // 拖拽开始时的原始索引
      targetIndex: -1,
      // 当前预计落位索引
      startY: 0,
      // 开始拖动的Y坐标（绝对位置）
      currentY: 0,
      // 当前触摸的Y坐标
      dragStartTop: 0,
      // 拖拽元素初始顶部坐标
      dragTop: 0,
      // 浮层顶部坐标
      dragLeft: 0,
      // 浮层左侧坐标
      dragWidth: 0,
      // 浮层宽度
      dragHeight: 0,
      // 浮层高度
      dragTouchOffsetY: 0,
      // 手指按下位置到元素顶部的距离
      dragItem: null,
      // 当前浮层展示的作品集
      floatingStyle: '',
      dragOffset: 0,
      // 拖动偏移量
      isDragging: false,
      // 是否正在拖动
      isLongPress: false,
      // 是否触发了长按
      itemHeight: 110,
      // 每个item的高度（预估）

      // 触摸相关
      touchTimer: null,
      // 长按定时器
      touchStartTime: 0,
      // 触摸开始时间

      // 状态管理
      originalList: [],
      // 原始列表备份（用于比较）
      itemStyles: [],
      isSaving: false,
      // 是否正在保存中
      isPageClosing: false,
      // 页面是否正在关闭
      pageScrollTop: 0,
      lockScrollTop: 0,
      listScrollTopValue: 0,
      dragStartScrollTop: 0,
      windowHeight: 0,
      autoScrollTimer: null,
      autoScrollDirection: 0,
      isPCDevice: false,
      dragMoveTimer: null,
      pendingDragY: 0,
      filteredPortfolioList: []
    };
  },
  computed: {
    canScrollList: function canScrollList() {
      return !this.isDragging || this.autoScrollDirection !== 0;
    }
  },
  onLoad: function onLoad() {
    var windowInfo = uni.getWindowInfo();
    var deviceInfo = uni.getDeviceInfo();
    this.windowHeight = windowInfo.windowHeight || 0;
    this.isPCDevice = this.checkIsPCDevice(deviceInfo);
    this.loadData();
  },
  onShow: function onShow() {
    this.loadData();
  },
  onReady: function onReady() {
    var _this = this;
    // 页面就绪后获取item高度
    this.$nextTick(function () {
      _this.calculateItemHeight();
    });
  },
  onBackPress: function onBackPress() {
    console.log('onBackPress triggered');
    this.saveBeforeLeave();
  },
  onUnload: function onUnload() {
    console.log('onUnload triggered');
    this.isPageClosing = true;

    // 页面销毁前保存排序
    this.saveSortOrderToServerSync();

    // 清理定时器
    if (this.touchTimer) {
      clearTimeout(this.touchTimer);
      this.touchTimer = null;
    }
    this.clearDragMoveTimer();
    this.stopAutoScroll();
  },
  onHide: function onHide() {
    console.log('onHide triggered');
    this.clearDragMoveTimer();
    this.stopAutoScroll();

    // 页面隐藏时也尝试保存
    this.saveSortOrderToServerSync();
  },
  methods: {
    noop: function noop() {},
    checkIsPCDevice: function checkIsPCDevice(systemInfo) {
      var platform = String(systemInfo && systemInfo.platform || '').toLowerCase();
      var deviceType = String(systemInfo && systemInfo.deviceType || '').toLowerCase();
      return deviceType === 'pc' || platform === 'windows' || platform === 'mac' || platform === 'devtools';
    },
    getTouchClientY: function getTouchClientY(e) {
      var touch = e && e.touches && e.touches[0] || e && e.changedTouches && e.changedTouches[0];
      if (!touch) return 0;
      return touch.clientY || touch.pageY || 0;
    },
    clearDragMoveTimer: function clearDragMoveTimer() {
      if (this.dragMoveTimer) {
        clearTimeout(this.dragMoveTimer);
        this.dragMoveTimer = null;
      }
    },
    safeVibrateShort: function safeVibrateShort(options) {
      if (this.isPCDevice) return;
      uni.vibrateShort(options || {});
    },
    onOptionsTouchStart: function onOptionsTouchStart(e) {
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    handleOptionsTap: function handleOptionsTap(item, e) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
      this.resetDragState();
      this.showItemOptions(item);
    },
    // 计算item高度
    calculateItemHeight: function calculateItemHeight() {
      var _this2 = this;
      var query = uni.createSelectorQuery().in(this);
      query.selectAll('.sortable-item').boundingClientRect(function (res) {
        if (res && res.length > 0) {
          if (res.length > 1) {
            _this2.itemHeight = res[1].top - res[0].top;
          } else {
            _this2.itemHeight = res[0].height;
          }
          console.log('item高度:', _this2.itemHeight);
        }
      }).exec();
    },
    getItemRect: function getItemRect(index) {
      var _this3 = this;
      return new Promise(function (resolve) {
        var query = uni.createSelectorQuery().in(_this3);
        query.select("#sort_item_".concat(index)).boundingClientRect(function (res) {
          resolve(res || null);
        }).exec();
      });
    },
    updateFloatingStyle: function updateFloatingStyle() {
      this.floatingStyle = "top:0;left:0;width:".concat(this.dragWidth, "px;transform:translate3d(").concat(this.dragLeft, "px,").concat(this.dragTop, "px,0) scale(1.02);");
    },
    resetItemStyles: function resetItemStyles() {
      this.itemStyles = this.sortedList.map(function () {
        return '';
      });
    },
    updateItemStyles: function updateItemStyles() {
      var styles = this.sortedList.map(function () {
        return '';
      });
      if (!this.isDragging || this.originalIndex === -1 || this.targetIndex === -1) {
        this.itemStyles = styles;
        return;
      }
      var offset = this.itemHeight;
      if (this.targetIndex > this.originalIndex) {
        for (var i = this.originalIndex + 1; i <= this.targetIndex; i++) {
          styles[i] = "transform:translate3d(0,-".concat(offset, "px,0);");
        }
      } else if (this.targetIndex < this.originalIndex) {
        for (var _i = this.targetIndex; _i < this.originalIndex; _i++) {
          styles[_i] = "transform:translate3d(0,".concat(offset, "px,0);");
        }
      }
      this.itemStyles = styles;
    },
    onListScroll: function onListScroll(e) {
      this.pageScrollTop = e.detail && e.detail.scrollTop || 0;
      if (this.isDragging) {
        if (this.autoScrollDirection !== 0) {
          this.lockScrollTop = this.pageScrollTop;
          this.updateDragPosition();
        }
        return;
      }
      if (!this.isDragging) {
        this.lockScrollTop = this.pageScrollTop;
        this.listScrollTopValue = this.pageScrollTop;
      }
    },
    startAutoScroll: function startAutoScroll(direction) {
      var _this4 = this;
      if (!this.isDragging || this.autoScrollDirection === direction) return;
      this.stopAutoScroll();
      this.autoScrollDirection = direction;
      this.autoScrollTimer = setInterval(function () {
        if (!_this4.isDragging) {
          _this4.stopAutoScroll();
          return;
        }
        var nextScrollTop = Math.max(0, _this4.lockScrollTop + direction * 14);
        if (nextScrollTop === _this4.lockScrollTop && direction < 0) {
          _this4.stopAutoScroll();
          return;
        }
        _this4.lockScrollTop = nextScrollTop;
        _this4.pageScrollTop = nextScrollTop;
        _this4.listScrollTopValue = nextScrollTop;
        _this4.updateDragPosition();
      }, 30);
    },
    stopAutoScroll: function stopAutoScroll() {
      if (this.autoScrollTimer) {
        clearInterval(this.autoScrollTimer);
        this.autoScrollTimer = null;
      }
      this.autoScrollDirection = 0;
    },
    handleDragEdgeScroll: function handleDragEdgeScroll(currentY) {
      if (!this.isDragging) return;
      var height = this.windowHeight || 0;
      if (!height) return;
      var topEdge = 90;
      var bottomEdge = height - 120;
      if (currentY <= topEdge) {
        this.startAutoScroll(-1);
      } else if (currentY >= bottomEdge) {
        this.startAutoScroll(1);
      } else {
        this.stopAutoScroll();
      }
    },
    // 数据加载
    loadData: function loadData() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var allRes;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uni.showLoading({
                  title: '加载中...'
                });
                _context.prev = 1;
                _context.next = 4;
                return _this5.$request.get('/wechat/works/findUserWorksCollectionsPage?pageNum=1&pageSize=100&type=0');
              case 4:
                allRes = _context.sent;
                if (!(allRes.code === 200)) {
                  _context.next = 11;
                  break;
                }
                _this5.filteredPortfolioList = (allRes.rows || []).filter(function (item) {
                  return item.visibility != "1";
                });
                _this5.allPortfolios = allRes.rows || [];
                // 获取已排序的作品集
                _context.next = 10;
                return _this5.loadSortedPortfolios();
              case 10:
                // 保存原始列表备份
                _this5.originalList = (0, _toConsumableArray2.default)(_this5.sortedList);
              case 11:
                _context.next = 16;
                break;
              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                console.error('加载数据失败:', _context.t0);
              case 16:
                _context.prev = 16;
                uni.hideLoading();
                return _context.finish(16);
              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13, 16, 19]]);
      }))();
    },
    // 获取已排序的作品集
    loadSortedPortfolios: function loadSortedPortfolios() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _userInfo$groupSettin, userInfo, params, homeRes;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                userInfo = uni.getStorageSync('userInfo') || {};
                params = {
                  pageNum: 1,
                  pageSize: 10,
                  orderBy: 'sort',
                  orderType: 'asc',
                  type: (userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$groupSettin = userInfo.groupSetting) === null || _userInfo$groupSettin === void 0 ? void 0 : _userInfo$groupSettin.type) || '0',
                  visibility: "1"
                };
                _context2.next = 5;
                return _this6.$request.get("/wechat/works/findUserWorksCollectionsPage", params);
              case 5:
                homeRes = _context2.sent;
                if (homeRes.code === 200) {
                  _this6.sortedList = homeRes.rows || [];
                  _this6.resetItemStyles();
                  _this6.$nextTick(function () {
                    _this6.calculateItemHeight();
                  });
                }
                _context2.next = 15;
                break;
              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.error('获取排序作品集失败:', _context2.t0);
                _this6.sortedList = (0, _toConsumableArray2.default)(_this6.allPortfolios);
                _this6.resetItemStyles();
                _this6.$nextTick(function () {
                  _this6.calculateItemHeight();
                });
              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    getTagCount: function getTagCount(item) {
      if (!item || !item.tags) return 0;
      try {
        var tags = JSON.parse(item.tags);
        return Array.isArray(tags) ? tags.length : 0;
      } catch (e) {
        return 0;
      }
    },
    // ========== 核心拖拽方法 ==========
    // 触摸开始
    onTouchStart: function onTouchStart(e, index, item) {
      var _this7 = this;
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
      e.stopPropagation();

      // 保存开始信息
      this.draggingIndex = index;
      this.draggingId = item && item.id;
      this.originalIndex = index;
      this.targetIndex = index;
      this.startY = this.getTouchClientY(e);
      this.currentY = this.startY;
      this.dragOffset = 0;
      this.isLongPress = false;

      // 设置长按定时器（300ms后触发长按）
      this.touchStartTime = Date.now();
      this.touchTimer = setTimeout(function () {
        _this7.onLongPress(e, index);
      }, 300);
    },
    // 长按事件（正式进入拖拽模式）
    onLongPress: function onLongPress(e, index) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var rect;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this8.draggingIndex !== index)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return _this8.getItemRect(index);
              case 4:
                rect = _context3.sent;
                if (!(!rect || _this8.draggingIndex !== index)) {
                  _context3.next = 7;
                  break;
                }
                return _context3.abrupt("return");
              case 7:
                _this8.isLongPress = true;
                _this8.isDragging = true;
                _this8.dragItem = _this8.sortedList[index];
                _this8.dragStartTop = rect.top;
                _this8.dragTop = rect.top;
                _this8.dragLeft = rect.left;
                _this8.dragWidth = rect.width;
                _this8.dragHeight = rect.height;
                _this8.dragTouchOffsetY = _this8.startY - rect.top;
                _this8.listScrollTopValue = _this8.pageScrollTop;
                _this8.lockScrollTop = _this8.pageScrollTop;
                _this8.dragStartScrollTop = _this8.pageScrollTop;
                _this8.updateFloatingStyle();

                // 保存原始列表状态
                _this8.originalList = (0, _toConsumableArray2.default)(_this8.sortedList);
                _this8.resetItemStyles();

                // 更强的震动反馈
                _this8.safeVibrateShort();
              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 触摸移动
    onTouchMove: function onTouchMove(e, index, item) {
      var _this9 = this;
      var currentY = this.getTouchClientY(e);
      var moveDistance = Math.abs(currentY - this.startY);
      if (!this.isLongPress && !this.isDragging && moveDistance > 8) {
        if (this.touchTimer) {
          clearTimeout(this.touchTimer);
          this.touchTimer = null;
        }
        return;
      }
      if (this.isDragging) {
        e.stopPropagation();
        e.preventDefault();
      }

      // 如果是拖拽状态，处理拖拽逻辑
      if (this.isDragging && item && this.draggingId === item.id) {
        if (this.isPCDevice) {
          this.pendingDragY = currentY;
          if (this.dragMoveTimer) return;
          this.dragMoveTimer = setTimeout(function () {
            _this9.dragMoveTimer = null;
            _this9.handleDragMove(_this9.pendingDragY);
          }, 16);
          return;
        }
        this.handleDragMove(currentY);
      }
    },
    handleDragMove: function handleDragMove(currentY) {
      this.dragOffset = currentY - this.startY;
      this.currentY = currentY;
      this.dragTop = currentY - this.dragTouchOffsetY;
      this.updateFloatingStyle();
      this.handleDragEdgeScroll(currentY);
      this.updateDragPosition();
    },
    // 更新拖拽位置
    updateDragPosition: function updateDragPosition() {
      if (this.originalIndex === -1 || !this.isDragging) return;
      var scrollDelta = this.lockScrollTop - this.dragStartScrollTop;
      var offsetIndex = Math.round((this.dragTop - this.dragStartTop + scrollDelta) / this.itemHeight);
      var targetIndex = this.originalIndex + offsetIndex;
      targetIndex = Math.max(0, Math.min(targetIndex, this.sortedList.length - 1));
      if (targetIndex !== this.targetIndex) {
        this.targetIndex = targetIndex;
        this.updateItemStyles();
        this.safeVibrateShort({
          type: 'light'
        });
      }
    },
    applyDragSort: function applyDragSort() {
      if (this.originalIndex === -1 || this.targetIndex === -1 || this.originalIndex === this.targetIndex) return;
      var newList = (0, _toConsumableArray2.default)(this.sortedList);
      var _newList$splice = newList.splice(this.originalIndex, 1),
        _newList$splice2 = (0, _slicedToArray2.default)(_newList$splice, 1),
        draggedItem = _newList$splice2[0];
      newList.splice(this.targetIndex, 0, draggedItem);
      this.sortedList = newList;
      console.log("\u4ECE ".concat(this.originalIndex, " \u79FB\u52A8\u5230 ").concat(this.targetIndex));
    },
    // 触摸结束
    onTouchEnd: function onTouchEnd(e) {
      // 清理长按定时器
      if (this.touchTimer) {
        clearTimeout(this.touchTimer);
        this.touchTimer = null;
      }
      if (this.isDragging && this.dragMoveTimer) {
        this.clearDragMoveTimer();
        this.handleDragMove(this.pendingDragY);
      }

      // 如果是拖拽状态，执行结束逻辑
      if (this.isDragging) {
        this.applyDragSort();
        this.resetDragState();
      } else {
        // 没有触发拖拽
        this.resetDragState();
      }
    },
    // 重置拖拽状态
    resetDragState: function resetDragState() {
      this.clearDragMoveTimer();
      this.stopAutoScroll();
      this.draggingIndex = -1;
      this.draggingId = null;
      this.originalIndex = -1;
      this.targetIndex = -1;
      this.startY = 0;
      this.currentY = 0;
      this.dragStartTop = 0;
      this.dragTop = 0;
      this.dragLeft = 0;
      this.dragWidth = 0;
      this.dragHeight = 0;
      this.dragTouchOffsetY = 0;
      this.dragStartScrollTop = 0;
      this.dragItem = null;
      this.floatingStyle = '';
      this.resetItemStyles();
      this.dragOffset = 0;
      this.isDragging = false;
      this.isLongPress = false;
    },
    // ========== 离开页面时的保存逻辑 ==========
    // 保存后离开
    saveBeforeLeave: function saveBeforeLeave() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // 显示保存提示
                uni.showLoading({
                  title: '保存中...',
                  mask: true
                });
                _this10.isSaving = true;
                _context4.prev = 2;
                _context4.next = 5;
                return _this10.saveSortOrderToServer();
              case 5:
                // 保存成功后返回
                uni.hideLoading();
                setTimeout(function () {
                  uni.navigateBack();
                }, 300);
                _context4.next = 14;
                break;
              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](2);
                uni.hideLoading();
                _this10.isSaving = false;

                // 保存失败时让用户选择
                uni.showModal({
                  title: '保存失败',
                  content: '排序保存失败，是否放弃更改并返回？',
                  confirmText: '放弃',
                  cancelText: '重试',
                  success: function success(res) {
                    if (res.confirm) {
                      // 放弃更改并返回
                      uni.navigateBack();
                    } else {
                      // 重试保存
                      setTimeout(function () {
                        _this10.saveBeforeLeave();
                      }, 500);
                    }
                  }
                });
              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 9]]);
      }))();
    },
    // 保存排序到服务器（异步）
    saveSortOrderToServer: function saveSortOrderToServer() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var params, res;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this11.sortedList.length === 0)) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                params = {
                  worksCollectionsIds: _this11.sortedList.map(function (item) {
                    return item.id;
                  }),
                  isTop: "1"
                };
                console.log('保存排序数据:', params);
                _context5.next = 6;
                return _this11.$request.put('/wechat/home/setTop', params);
              case 6:
                res = _context5.sent;
                if (!(res.code === 200)) {
                  _context5.next = 14;
                  break;
                }
                // 更新原始列表备份
                _this11.originalList = (0, _toConsumableArray2.default)(_this11.sortedList);
                _this11.loadData();
                _this11.loadSortedPortfolios();
                console.log('排序保存成功');
                _context5.next = 15;
                break;
              case 14:
                throw new Error(res.msg || '保存失败');
              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 同步保存排序（用于页面卸载时）
    saveSortOrderToServerSync: function saveSortOrderToServerSync() {
      var _this12 = this;
      if (this.sortedList.length === 0 || this.isSaving) {
        return;
      }
      var sortData = this.sortedList.map(function (item, index) {
        return {
          worksCollectionsId: item.id,
          sort: index + 1
        };
      });

      // 使用同步方式保存，但实际还是异步
      this.$request.put('/wechat/home/sort', sortData).then(function (res) {
        if (res.code === 200) {
          console.log('排序已保存');
        }
      }).catch(function (error) {
        console.error('保存失败:', error);
      }).finally(function () {
        _this12.isSaving = false;
      });
    },
    // 移除作品集
    removeItem: function removeItem() {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (_this13.currentItem) {
                  _context7.next = 2;
                  break;
                }
                return _context7.abrupt("return");
              case 2:
                uni.showModal({
                  title: '提示',
                  content: '确定要从主页删除吗？',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(res) {
                      var deleteRes, removedId;
                      return _regenerator.default.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              if (!res.confirm) {
                                _context6.next = 16;
                                break;
                              }
                              uni.showLoading({
                                title: '删除中...'
                              });
                              _context6.prev = 2;
                              _context6.next = 5;
                              return _this13.$request.put('/wechat/home/setTop', {
                                worksCollectionsIds: [_this13.currentItem.id],
                                isTop: "0"
                              });
                            case 5:
                              deleteRes = _context6.sent;
                              if (deleteRes.code == 200) {
                                removedId = _this13.currentItem.id;
                                _this13.sortedList = _this13.sortedList.filter(function (item) {
                                  return item.id !== removedId;
                                });
                                _this13.resetItemStyles();
                                uni.setStorageSync('homeCollectionsNeedRefresh', true);
                                _this13.closeItemPopup();
                                uni.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                                });
                                _this13.loadData();
                              } else {
                                uni.showToast({
                                  title: deleteRes.msg || '删除失败',
                                  icon: 'none'
                                });
                              }
                              _context6.next = 13;
                              break;
                            case 9:
                              _context6.prev = 9;
                              _context6.t0 = _context6["catch"](2);
                              console.error('删除失败:', _context6.t0);
                              uni.showToast({
                                title: '网络错误，请稍后重试',
                                icon: 'none'
                              });
                            case 13:
                              _context6.prev = 13;
                              uni.hideLoading();
                              return _context6.finish(13);
                            case 16:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      }, _callee6, null, [[2, 9, 13, 16]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    // 打开添加弹窗
    openAddPortfolioPopup: function openAddPortfolioPopup() {
      this.showAddPortfolioPopup = true;
    },
    // 关闭添加弹窗
    closeAddPortfolioPopup: function closeAddPortfolioPopup() {
      this.showAddPortfolioPopup = false;
    },
    // 处理保存排序作品集
    handleSaveSortedPortfolios: function handleSaveSortedPortfolios(selectedIds) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                uni.showLoading({
                  title: '保存中...'
                });
                _context8.prev = 1;
                // 根据选择的ID更新排序列表
                _this14.sortedList = selectedIds.map(function (id) {
                  return _this14.allPortfolios.find(function (item) {
                    return item.id === id;
                  });
                }).filter(function (item) {
                  return item;
                });

                // 保存排序到服务器
                _context8.next = 5;
                return _this14.saveSortOrderToServer();
              case 5:
                _this14.loadSortedPortfolios();
                _this14.loadData();
                _this14.closeAddPortfolioPopup();
                uni.showToast({
                  title: '保存成功',
                  icon: 'success'
                });
                _context8.next = 15;
                break;
              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](1);
                console.error('保存失败:', _context8.t0);
                uni.showToast({
                  title: '保存失败',
                  icon: 'none'
                });
              case 15:
                _context8.prev = 15;
                uni.hideLoading();
                return _context8.finish(15);
              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 11, 15, 18]]);
      }))();
    },
    // 作品集点击
    handlePortfolioClick: function handlePortfolioClick(item) {
      this.goToDetail(item);
    },
    // 跳转到详情
    goToDetail: function goToDetail(item) {
      uni.navigateTo({
        url: "/subpkg-library/pages/collection/detail?id=".concat(item.id)
      });
    },
    // 显示作品集选项
    showItemOptions: function showItemOptions(item) {
      console.log("我触发了");
      this.currentItem = item;
      this.showItemPopup = true;
    },
    // 关闭作品集选项
    closeItemPopup: function closeItemPopup() {
      this.showItemPopup = false;
      this.currentItem = null;
    },
    // 处理显示选项
    handleShowOptions: function handleShowOptions(item) {
      this.showItemOptions(item);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 230:
/*!***************************************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue?vue&type=style&index=0&id=410684fd&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./portfolio-sort.vue?vue&type=style&index=0&id=410684fd&lang=scss&scoped=true& */ 231);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_portfolio_sort_vue_vue_type_style_index_0_id_410684fd_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 231:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/portfolio-sort/portfolio-sort.vue?vue&type=style&index=0&id=410684fd&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[224,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg-library/pages/portfolio-sort/portfolio-sort.js.map