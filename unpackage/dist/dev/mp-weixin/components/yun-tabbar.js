(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/yun-tabbar"],{

/***/ 337:
/*!************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./yun-tabbar.vue?vue&type=template&id=2374de98&scoped=true& */ 338);
/* harmony import */ var _yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./yun-tabbar.vue?vue&type=script&lang=js& */ 340);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./yun-tabbar.vue?vue&type=style&index=0&id=2374de98&lang=scss&scoped=true& */ 342);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2374de98",
  null,
  false,
  _yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/yun-tabbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 338:
/*!*******************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue?vue&type=template&id=2374de98&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./yun-tabbar.vue?vue&type=template&id=2374de98&scoped=true& */ 339);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_template_id_2374de98_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 339:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue?vue&type=template&id=2374de98&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showPopup = false
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 340:
/*!*************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./yun-tabbar.vue?vue&type=script&lang=js& */ 341);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 341:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 49));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'yun-tabbar',
  props: {
    selected: {
      type: Number,
      default: 0
    },
    workNumber: {
      type: Number,
      default: 0
    },
    collectionNumber: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      showPopup: false,
      publishMenus: [{
        title: '发布任务',
        desc: '找设计师，发定制需求',
        icon: '/static/publish/发布任务.png',
        url: '/subpkg-task/pages/index'
      }, {
        title: '发布橱窗',
        desc: '上架橱窗赚取佣金',
        icon: '/static/publish/上架橱窗.png',
        url: '/subpkg-showcase/pages/index'
      }, {
        title: '新建作品',
        desc: '你可以在作品中添加图片/视频/简介',
        icon: '/static/publish/新建作品.png',
        url: '/subpkg-library/pages/works/create'
      }, {
        title: '新建作品集',
        desc: '作品集用于打包分享全部或多个作品，你可以在\n作品集中将作品分组',
        icon: '/static/publish/新建作品集.png',
        url: '/subpkg-library/pages/collection/create'
      }],
      list: [{
        pagePath: '/pages/library/home',
        text: '首页',
        iconPath: '/static/tabbar/home_unselected.png',
        selectedIconPath: '/static/tabbar/home_selected.png'
      }, {
        pagePath: '/pages/square/index',
        text: '广场',
        iconPath: '/static/tabbar/square_unselected.png',
        selectedIconPath: '/static/tabbar/square_selected.png'
      }, {
        pagePath: '/pages/publish/index',
        text: '发布',
        iconPath: '/static/tabbar/publish.png',
        selectedIconPath: '/static/tabbar/publish.png'
      }, {
        pagePath: '/pages/library/index',
        text: '云艺库',
        iconPath: '/static/tabbar/yunyiku_unselected.png',
        selectedIconPath: '/static/tabbar/yunyiku_selected.png'
      }, {
        pagePath: '/pages/profile/index',
        text: '我的',
        iconPath: '/static/tabbar/my_unselected.png',
        selectedIconPath: '/static/tabbar/my_selected.png'
      }]
    };
  },
  methods: {
    switchTab: function switchTab(item, index) {
      if (index === 2) {
        this.showPopup = true;
        return;
      }
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      var currentRoute = currentPage ? "/".concat(currentPage.route) : '';
      if (index === 0) {
        if (currentRoute === item.pagePath) {
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 200
          });
          return;
        }
        uni.switchTab({
          url: item.pagePath
        });
        return;
      }
      if (index === 3) {
        if (currentRoute === item.pagePath) {
          uni.setStorageSync('lastHomeTab', 0);
          uni.$emit('home-tab-reset');
          return;
        }
        uni.removeStorageSync('tabIndex');
        uni.removeStorageSync('homeTargetTab');
        uni.switchTab({
          url: item.pagePath
        });
        return;
      }
      if (currentRoute === item.pagePath) {
        return;
      }
      uni.switchTab({
        url: item.pagePath
      });
    },
    navigateTo: function navigateTo(url) {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var path, isLoggedIn, routeHandlerMap, canNavigate, finalUrl, isTeamMode, storedUserInfo, isTeam;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                path = url.split('?')[0];
                isLoggedIn = _this.hasLoginToken();
                routeHandlerMap = {
                  '/subpkg-library/pages/works/create': function () {
                    var _subpkgLibraryPagesWorksCreate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                      var _isTeamMode;
                      return _regenerator.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _isTeamMode = uni.getStorageSync('isTeamMode') || false;
                              if (!_isTeamMode) {
                                _context.next = 7;
                                break;
                              }
                              _context.next = 5;
                              return _this.$request.get('/wechat/basic/hasTeamRight');
                            case 5:
                              _context.next = 7;
                              return _this.$request.get('/wechat/basic/hasOperateRight', {
                                role: 'canManageWorks'
                              });
                            case 7:
                              _context.next = 9;
                              return _this.$request.get('/wechat/basic/hasRight', {
                                operateType: 0,
                                type: 0
                              });
                            case 9:
                              return _context.abrupt("return", true);
                            case 12:
                              _context.prev = 12;
                              _context.t0 = _context["catch"](0);
                              return _context.abrupt("return", false);
                            case 15:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[0, 12]]);
                    }));
                    function subpkgLibraryPagesWorksCreate() {
                      return _subpkgLibraryPagesWorksCreate.apply(this, arguments);
                    }
                    return subpkgLibraryPagesWorksCreate;
                  }(),
                  '/subpkg-library/pages/collection/create': function () {
                    var _subpkgLibraryPagesCollectionCreate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
                      var _isTeamMode2;
                      return _regenerator.default.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.prev = 0;
                              _isTeamMode2 = uni.getStorageSync('isTeamMode') || false;
                              if (!_isTeamMode2) {
                                _context2.next = 7;
                                break;
                              }
                              _context2.next = 5;
                              return _this.$request.get('/wechat/basic/hasTeamRight');
                            case 5:
                              _context2.next = 7;
                              return _this.$request.get('/wechat/basic/hasOperateRight', {
                                role: 'canManageCollections'
                              });
                            case 7:
                              _context2.next = 9;
                              return _this.$request.get('/wechat/basic/hasRight', {
                                operateType: 0,
                                type: 1
                              });
                            case 9:
                              return _context2.abrupt("return", true);
                            case 12:
                              _context2.prev = 12;
                              _context2.t0 = _context2["catch"](0);
                              return _context2.abrupt("return", false);
                            case 15:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2, null, [[0, 12]]);
                    }));
                    function subpkgLibraryPagesCollectionCreate() {
                      return _subpkgLibraryPagesCollectionCreate.apply(this, arguments);
                    }
                    return subpkgLibraryPagesCollectionCreate;
                  }()
                };
                if (!(isLoggedIn && routeHandlerMap[path])) {
                  _context3.next = 10;
                  break;
                }
                _context3.next = 6;
                return routeHandlerMap[path]();
              case 6:
                canNavigate = _context3.sent;
                if (canNavigate) {
                  _context3.next = 10;
                  break;
                }
                _this.showPopup = false;
                return _context3.abrupt("return");
              case 10:
                finalUrl = url;
                isTeamMode = uni.getStorageSync('isTeamMode') || false;
                storedUserInfo = uni.getStorageSync('userInfo') || {};
                isTeam = storedUserInfo.vipLevel == 'team' || false;
                if (isLoggedIn && (isTeamMode || isTeam) && (path === '/subpkg-library/pages/works/create' || path === '/subpkg-library/pages/collection/create')) {
                  finalUrl += url.includes('?') ? '&workType=1' : '?workType=1';
                }
                uni.navigateTo({
                  url: finalUrl
                });
                _this.showPopup = false;
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    handlePublishMenu: function handlePublishMenu(item) {
      if (item.url) {
        this.navigateTo(item.url);
        return;
      }
      this.handleOther(item.title);
    },
    hasLoginToken: function hasLoginToken() {
      return !!uni.getStorageSync('token');
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
    handleOther: function handleOther(name) {
      this.showPopup = false;
      uni.showToast({
        title: "".concat(name, " \u529F\u80FD\u5F00\u53D1\u4E2D"),
        icon: 'none'
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 342:
/*!**********************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue?vue&type=style&index=0&id=2374de98&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./yun-tabbar.vue?vue&type=style&index=0&id=2374de98&lang=scss&scoped=true& */ 343);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_yun_tabbar_vue_vue_type_style_index_0_id_2374de98_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 343:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/components/yun-tabbar.vue?vue&type=style&index=0&id=2374de98&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/yun-tabbar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/yun-tabbar-create-component',
    {
        'components/yun-tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(337))
        })
    },
    [['components/yun-tabbar-create-component']]
]);
