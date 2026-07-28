(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/profile/index"],{

/***/ 70:
/*!*****************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"pages%2Fprofile%2Findex"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/profile/index.vue */ 71));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 71:
/*!**********************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/profile/index.vue ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=14bc1b43&scoped=true& */ 72);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 74);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=14bc1b43&scoped=true&lang=css& */ 77);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "14bc1b43",
  null,
  false,
  _index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/profile/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 72:
/*!*****************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/profile/index.vue?vue&type=template&id=14bc1b43&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=14bc1b43&scoped=true& */ 73);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_14bc1b43_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 73:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/profile/index.vue?vue&type=template&id=14bc1b43&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
      return Promise.all(/*! import() | components/yun-tabbar */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/yun-tabbar")]).then(__webpack_require__.bind(null, /*! @/components/yun-tabbar.vue */ 337))
    },
    yunStorageWarning: function () {
      return __webpack_require__.e(/*! import() | components/yun-storage-warning */ "components/yun-storage-warning").then(__webpack_require__.bind(null, /*! @/components/yun-storage-warning.vue */ 344))
    },
    yunUserSwitch: function () {
      return __webpack_require__.e(/*! import() | components/yun-user-switch */ "components/yun-user-switch").then(__webpack_require__.bind(null, /*! @/components/yun-user-switch.vue */ 358))
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
  var m0 = _vm.resolveAvatar(
    _vm.isTeamMode && _vm.teamInfo ? _vm.teamInfo.avatar : _vm.userInfo.avatar
  )
  var m1 = _vm.formatStorage(_vm.userInfo.cloudUsedMb)
  var m2 = _vm.formatStorage(_vm.userInfo.cloudTotalMb)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 74:
/*!***********************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/profile/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 75);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 75:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/profile/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 47));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 49));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 40));
var _permissionCode = _interopRequireDefault(__webpack_require__(/*! @/utils/permissionCode.js */ 76));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TitleBar = function TitleBar() {
  __webpack_require__.e(/*! require.ensure | components/title */ "components/title").then((function () {
    return resolve(__webpack_require__(/*! @/components/title.vue */ 365));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var YunUserSwitch = function YunUserSwitch() {
  __webpack_require__.e(/*! require.ensure | components/yun-user-switch */ "components/yun-user-switch").then((function () {
    return resolve(__webpack_require__(/*! @/components/yun-user-switch.vue */ 358));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var createDefaultProfileUserInfo = function createDefaultProfileUserInfo() {
  return {
    avatar: '/static/default-avatar.png',
    nickName: '未登录',
    cloudUsedMb: 0,
    cloudTotalMb: 0,
    worksNum: 0,
    collectionsNum: 0,
    visitorNum: 0,
    followCount: 0,
    fansCount: 0,
    vipLevel: 'none',
    id: 0
  };
};
var _default = {
  components: {
    TitleBar: TitleBar,
    YunUserSwitch: YunUserSwitch
  },
  data: function data() {
    return {
      userInfo: createDefaultProfileUserInfo(),
      teamInfo: null,
      ossBaseUrl: _env.default.aliyunUrl,
      showUserSwitch: false,
      isTeamMode: false,
      loggedIn: false,
      menuItems: [{
        icon: '/static/profile/标签.png',
        text: '标签',
        url: '/subpkg-library/pages/tags/edit'
      }, {
        icon: '/static/profile/访客.png',
        text: '访客',
        url: '/subpkg-profile/pages/visitor/index'
      }, {
        icon: '/static/profile/外包.svg',
        text: '我的外包',
        url: '/subpkg-profile/pages/outsourcing/index'
      }, {
        icon: '/static/profile/订单.svg',
        text: '我的订单',
        url: '/subpkg-task/pages/taskOrder/index'
      }, {
        icon: '/static/profile/钱包.svg',
        text: '提现中心',
        url: '/subpkg-profile/pages/withdrawalcenter/index'
      }, {
        icon: '/static/profile/团队.png',
        text: '团队',
        url: '/subpkg-profile/pages/team/index'
      }, {
        icon: '/static/profile/橱窗.png',
        text: '我的橱窗',
        url: '/subpkg-showcase/pages/my/index'
      }, {
        icon: '/static/profile/收藏.svg',
        text: '收藏',
        url: '/subpkg-showcase/pages/favorite/index'
      }, {
        icon: '/static/profile/会员中心.png',
        text: '会员中心',
        url: '/subpkg-profile/pages/member/index'
      }, {
        icon: '/static/profile/问题反馈.png',
        text: '问题反馈',
        url: '/subpkg-profile/pages/feedback/index'
      }, {
        icon: '/static/profile/设置.png',
        text: '设置',
        url: '/subpkg-profile/pages/settings/index'
      }]
    };
  },
  computed: {
    storagePercentage: function storagePercentage() {
      if (!this.userInfo.cloudTotalMb) return 0;
      var percentage = this.userInfo.cloudUsedMb / this.userInfo.cloudTotalMb * 100;
      return Math.min(percentage, 100).toFixed(1);
    },
    isStorageWarning: function isStorageWarning() {
      if (!this.userInfo.cloudTotalMb) return false;
      var percentage = this.userInfo.cloudUsedMb / this.userInfo.cloudTotalMb * 100;
      return percentage >= 90;
    }
  },
  onShow: function onShow() {
    // 隐藏原生 TabBar，使用自定义的
    uni.hideTabBar({
      animation: false
    });
    this.loggedIn = this.hasLoginToken();
    if (!this.loggedIn) {
      this.resetGuestState();
      return;
    }
    // 从缓存中读取团队模式状态
    this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
    this.fetchUserInfo();
  },
  methods: {
    hasLoginToken: function hasLoginToken() {
      return !!uni.getStorageSync('token');
    },
    resetGuestState: function resetGuestState() {
      this.loggedIn = false;
      this.userInfo = createDefaultProfileUserInfo();
      this.teamInfo = null;
      this.showUserSwitch = false;
      this.isTeamMode = false;
    },
    promptLogin: function promptLogin() {
      var redirectUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (redirectUrl) {
        uni.setStorageSync('login_redirect', redirectUrl);
      }
      uni.showModal({
        title: '提示',
        content: '登录后可使用该功能',
        confirmText: '去登录',
        cancelText: '取消',
        success: function success(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: '/subpkg-others/pages/login/index'
            });
          }
        }
      });
    },
    ensureLoggedIn: function ensureLoggedIn() {
      var redirectUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (this.loggedIn || this.hasLoginToken()) {
        this.loggedIn = true;
        return true;
      }
      this.promptLogin(redirectUrl);
      return false;
    },
    gotoTabIndex: function gotoTabIndex(index) {
      uni.setStorageSync('homeTargetTab', index);
      uni.switchTab({
        url: "/pages/library/index"
      });
    },
    gotoVistor: function gotoVistor() {
      if (!this.ensureLoggedIn('/subpkg-profile/pages/visitor/index')) {
        return;
      }
      if (this.isTeamMode) {
        return;
      }
      uni.navigateTo({
        url: '/subpkg-profile/pages/visitor/index'
      });
    },
    fetchTeamInfo: function fetchTeamInfo() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.loggedIn) {
                  _context.next = 3;
                  break;
                }
                _this.teamInfo = null;
                return _context.abrupt("return");
              case 3:
                _context.prev = 3;
                _context.next = 6;
                return _this.$request.get("/wechat/team/getSwitchAccount/".concat(_this.userInfo.id));
              case 6:
                res = _context.sent;
                if (res.code === 200 && res.data) {
                  // 接口只返回团长信息，直接使用
                  _this.teamInfo = {
                    id: res.data.id,
                    nickName: res.data.nickName,
                    avatar: res.data.avatarUrl || res.data.avatar,
                    role: 'owner',
                    status: res.data.status || 0 // 0 正常 1 异常
                  };
                  // 更新 teamOwnerId 到存储，供团队模式下使用
                  uni.setStorageSync('teamInfo', _this.teamInfo);
                  uni.setStorageSync('teamOwnerId', res.data.id);
                } else {
                  _this.teamInfo = null;
                }
                _context.next = 14;
                break;
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                console.error('获取团队信息失败:', _context.t0);
                _this.teamInfo = null;
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }))();
    },
    resolveAvatar: function resolveAvatar(avatar) {
      if (!avatar || avatar === '/static/default-avatar.png') return '/static/default-avatar.png';
      // 如果是完整路径，直接返回
      if (/^(http|https|wxfile|data):/.test(avatar)) {
        return avatar;
      }
      // 否则拼接 OSS 前缀
      return this.ossBaseUrl + avatar;
    },
    fetchUserInfo: function fetchUserInfo() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var teamOwnerId, storedUserInfo, isTeam, url, userRes, teamsPaceNumInfo, targetId, paceNumRes, personal;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.loggedIn) {
                  _context2.next = 3;
                  break;
                }
                _this2.userInfo = createDefaultProfileUserInfo();
                return _context2.abrupt("return");
              case 3:
                teamOwnerId = uni.getStorageSync('teamOwnerId');
                storedUserInfo = uni.getStorageSync('userInfo') || {};
                isTeam = storedUserInfo.vipLevel == 'team' || false; // 构建请求URL，团队模式下传递团长的id
                // 如果 teamInfo 存在，使用 teamInfo 中的 id 作为团长 ID
                if (_this2.teamInfo) {
                  teamOwnerId = _this2.teamInfo.id;
                  uni.setStorageSync('teamOwnerId', teamOwnerId);
                }
                url = '/wechat/user/getUserInfo';
                if (_this2.isTeamMode && teamOwnerId) {
                  url += "?userId=".concat(teamOwnerId);
                }
                _context2.prev = 9;
                _context2.next = 12;
                return _this2.$request.get(url);
              case 12:
                userRes = _context2.sent;
                teamsPaceNumInfo = {}; // 团队模式和团长模式下获取团队作品数
                if (!(_this2.isTeamMode && teamOwnerId || isTeam)) {
                  _context2.next = 20;
                  break;
                }
                targetId = _this2.isTeamMode ? teamOwnerId : userRes.data.id || _this2.userInfo.id;
                _context2.next = 18;
                return _this2.$request.get("/wechat/user/getTeamsPaceNumInfo/".concat(targetId));
              case 18:
                paceNumRes = _context2.sent;
                if (paceNumRes.code == 200) {
                  teamsPaceNumInfo = paceNumRes.data;
                }
              case 20:
                if (_this2.isTeamMode && teamOwnerId) {
                  // 团队模式下只更新云存储相关字段
                  personal = uni.getStorageSync('userInfo');
                  _this2.userInfo = _objectSpread(_objectSpread(_objectSpread({}, _this2.userInfo), userRes.data), {}, {
                    cloudUsedMb: userRes.data.cloudUsedMb || _this2.userInfo.cloudUsedMb,
                    cloudTotalMb: userRes.data.cloudTotalMb || _this2.userInfo.cloudTotalMb,
                    vipLevel: userRes.data.vipLevel || 'none',
                    avatar: personal.avatarUrl,
                    nickName: personal.nickName,
                    id: personal.id
                  }, teamsPaceNumInfo);
                } else if (isTeam) {
                  // 团长模式
                  _this2.userInfo = _objectSpread(_objectSpread(_objectSpread({}, _this2.userInfo), userRes.data), {}, {
                    avatar: userRes.data.avatarUrl || _this2.userInfo.avatar,
                    nickName: userRes.data.nickName || '用户',
                    vipLevel: userRes.data.vipLevel || 'none'
                  }, teamsPaceNumInfo);
                } else {
                  // 非团队模式下更新所有字段
                  _this2.userInfo = _objectSpread(_objectSpread(_objectSpread({}, _this2.userInfo), userRes.data), {}, {
                    avatar: userRes.data.avatarUrl || _this2.userInfo.avatar,
                    nickName: userRes.data.nickName || '用户',
                    vipLevel: userRes.data.vipLevel || 'none'
                  });
                }
                // 获取团队信息
                _this2.fetchTeamInfo();
                _context2.next = 27;
                break;
              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](9);
                console.error('获取用户信息失败:', _context2.t0);
              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 24]]);
      }))();
    },
    handleMenuClick: function handleMenuClick(item) {
      if (!item.url) {
        uni.showToast({
          title: "".concat(item.text, "\u529F\u80FD\u5F00\u53D1\u4E2D"),
          icon: 'none'
        });
        return;
      }
      if (!this.ensureLoggedIn(item.url)) {
        return;
      }
      uni.navigateTo({
        url: item.url
      });
    },
    gotoMember: function gotoMember() {
      if (!this.ensureLoggedIn('/subpkg-profile/pages/member/index')) {
        return;
      }
      uni.navigateTo({
        url: '/subpkg-profile/pages/member/index'
      });
    },
    goToEdit: function goToEdit() {
      if (!this.ensureLoggedIn('/subpkg-profile/pages/edit')) {
        return;
      }
      if (this.isTeamMode) {
        uni.showToast({
          title: '团队模式下暂不支持编辑头像和昵称',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: '/subpkg-profile/pages/edit'
      });
    },
    goToStorageManagement: function goToStorageManagement() {
      if (!this.ensureLoggedIn('/subpkg-profile/pages/storage-management')) {
        return;
      }
      if (this.isTeamMode) {
        return;
      }
      uni.navigateTo({
        url: '/subpkg-profile/pages/storage-management'
      });
    },
    goToFollowList: function goToFollowList(tab) {
      if (!this.ensureLoggedIn('/subpkg-profile/pages/follow-list')) {
        return;
      }
      uni.navigateTo({
        url: "/subpkg-profile/pages/follow-list?tab=".concat(tab)
      });
    },
    formatStorage: function formatStorage(mb) {
      if (!mb && mb !== 0) return '0KB';
      if (mb < 1) {
        var kb = mb * 1024;
        return kb.toFixed(0) + 'KB';
      }
      if (mb < 1024) {
        return mb.toFixed(2) + 'MB';
      } else {
        return (mb / 1024).toFixed(2) + 'GB';
      }
    },
    openUserSwitch: function openUserSwitch() {
      if (!this.ensureLoggedIn()) {
        return;
      }
      this.showUserSwitch = true;
    },
    handleUserSwitch: function handleUserSwitch(accountType) {
      // 处理用户切换逻辑
      console.log('切换到账号类型:', accountType);
      // 更新团队模式状态
      this.isTeamMode = accountType === 'team';
      uni.setStorageSync('accountModeChanged', true);
      // 可以在这里添加切换后的业务逻辑
      // 例如重新获取用户信息等
      this.fetchUserInfo();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 77:
/*!*******************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/profile/index.vue?vue&type=style&index=0&id=14bc1b43&scoped=true&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=14bc1b43&scoped=true&lang=css& */ 78);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_14bc1b43_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 78:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/profile/index.vue?vue&type=style&index=0&id=14bc1b43&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[70,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/index.js.map