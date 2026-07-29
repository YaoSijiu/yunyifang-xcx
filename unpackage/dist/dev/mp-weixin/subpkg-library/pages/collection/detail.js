(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg-library/pages/collection/detail"],{

/***/ 209:
/*!**************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"subpkg-library%2Fpages%2Fcollection%2Fdetail"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./subpkg-library/pages/collection/detail.vue */ 210));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 210:
/*!*****************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=6934f5d0&scoped=true& */ 211);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 213);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=6934f5d0&lang=scss&scoped=true& */ 215);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6934f5d0",
  null,
  false,
  _detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg-library/pages/collection/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 211:
/*!************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue?vue&type=template&id=6934f5d0&scoped=true& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=6934f5d0&scoped=true& */ 212);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_6934f5d0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 212:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue?vue&type=template&id=6934f5d0&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.tagsNum["全部"] || _vm.allWorks.length
  var l0 = _vm.__map(_vm.tagsNum, function (count, tag) {
    var $orig = _vm.__get_orig(count)
    var m0 = tag !== "全部" ? _vm.getTagIndex(tag) : null
    var m1 = tag !== "全部" ? _vm.getTagIndex(tag) : null
    return {
      $orig: $orig,
      m0: m0,
      m1: m1,
    }
  })
  var g1 = !_vm.loading ? _vm.allWorks.length : null
  var l1 =
    !_vm.loading && g1 > 0
      ? _vm.__map(_vm.allWorks, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g2 = JSON.stringify(item)
          var m2 = _vm.getFirstImageUrl(item.imageUrls)
          return {
            $orig: $orig,
            g2: g2,
            m2: m2,
          }
        })
      : null
  var l3 = _vm.__map(_vm.tagsNum, function (count, tag) {
    var $orig = _vm.__get_orig(count)
    var g3 =
      !_vm.loading && tag !== "全部" ? _vm.getWorksByTag(tag).length : null
    var l2 =
      !_vm.loading && tag !== "全部" && g3 > 0
        ? _vm.__map(_vm.getWorksByTag(tag), function (item, itemIndex) {
            var $orig = _vm.__get_orig(item)
            var g4 = JSON.stringify(item)
            var m3 = _vm.getFirstImageUrl(item.imageUrls)
            return {
              $orig: $orig,
              g4: g4,
              m3: m3,
            }
          })
        : null
    return {
      $orig: $orig,
      g3: g3,
      l2: l2,
    }
  })
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      _vm.goToWorkDetail(JSON.parse(JSON.stringify(item)))
    }
    _vm.e1 = function ($event, item) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        item = _temp4.item
      var _temp3, _temp4
      $event.stopPropagation()
      _vm.showWorkOptions(JSON.parse(JSON.stringify(item)))
    }
    _vm.e2 = function ($event, item) {
      var _temp5 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        item = _temp6.item
      var _temp5, _temp6
      _vm.goToWorkDetail(JSON.parse(JSON.stringify(item)))
    }
    _vm.e3 = function ($event, item) {
      var _temp7 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp8 = _temp7.eventParams || _temp7["event-params"],
        item = _temp8.item
      var _temp7, _temp8
      _vm.goToWorkDetail(JSON.parse(JSON.stringify(item)))
    }
    _vm.e4 = function ($event, item) {
      var _temp9 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp10 = _temp9.eventParams || _temp9["event-params"],
        item = _temp10.item
      var _temp9, _temp10
      $event.stopPropagation()
      _vm.showWorkOptions(JSON.parse(JSON.stringify(item)))
    }
    _vm.e5 = function ($event, item) {
      var _temp11 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp12 = _temp11.eventParams || _temp11["event-params"],
        item = _temp12.item
      var _temp11, _temp12
      _vm.goToWorkDetail(JSON.parse(JSON.stringify(item)))
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l0: l0,
        g1: g1,
        l1: l1,
        l3: l3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 213:
/*!******************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 214);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 214:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 40));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  // 团队操作权限常量
  TEAM_OPERATE_ROLES: {
    ADD_MEMBER: 'canAddMember',
    ADD_SEATS: 'canAddSeats',
    MANAGE_WORKS: 'canManageWorks',
    MANAGE_COLLECTIONS: 'canManageCollections'
  },
  data: function data() {
    return {
      statusBarHeight: 20,
      userInfo: {},
      ossUrl: _env.default.aliyunUrl,
      title: '作品集详情',
      currentTag: '全部',
      // 当前选中的标签
      currentTagIndex: 0,
      // 当前标签索引，用于swiper
      tagsNum: {},
      loading: false,
      // 加载状态
      showWorkPopup: false,
      showCollectionPopup: false,
      currentWorkItem: null,
      progress: 0,
      // 下载进度
      stageText: '',
      // 打包状态文字
      taskId: '',
      // 后台任务ID
      userId: null,
      isTeamMode: false,
      // 是否为团队模式
      isShareAccess: false,
      collectId: null,
      scrollToId: '',
      // 用于滚动到指定标签
      // 鼠标拖拽相关
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      works: [{
        id: 1,
        title: '植物书包装设计',
        img: '/static/home/示例.png',
        tags: ['平面设计', '包装设计']
      }, {
        id: 2,
        title: '凤梨酥包装设计',
        img: '/static/home/示例.png',
        tags: ['平面设计', '包装设计', '食品设计']
      }, {
        id: 3,
        title: '展览空间设计',
        img: '/static/home/示例.png',
        tags: ['展览设计', '空间设计']
      }, {
        id: 4,
        title: '粽子包装设计',
        img: '/static/home/示例.png',
        tags: ['平面设计', '包装设计', '食品设计']
      }, {
        id: 5,
        title: '现代简约室内设计',
        img: '/static/home/示例.png',
        tags: ['室内设计', '家装设计']
      }, {
        id: 6,
        title: '办公室工装设计',
        img: '/static/home/示例.png',
        tags: ['工装设计', '室内设计']
      }, {
        id: 7,
        title: '艺术展览策划',
        img: '/static/home/示例.png',
        tags: ['展览设计', '策划设计']
      }, {
        id: 8,
        title: '酒店室内设计',
        img: '/static/home/示例.png',
        tags: ['室内设计', '工装设计', '酒店设计']
      }]
    };
  },
  onLoad: function onLoad(options) {
    var _uni$getStorageSync;
    // 获取状态栏高度
    var windowInfo = uni.getWindowInfo();
    this.statusBarHeight = windowInfo.statusBarHeight;
    this.userId = (_uni$getStorageSync = uni.getStorageSync('userInfo')) === null || _uni$getStorageSync === void 0 ? void 0 : _uni$getStorageSync.id;
    this.isShareAccess = options.fromShare === '1';
    // 处理团队模式参数
    if (options.isTeamMode !== undefined) {
      this.isTeamMode = options.isTeamMode === 'true';
    } else {
      // 检测团队模式
      this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
    }
    // 设置页面标题
    if (options.id) {
      this.collectId = options.id;
      this.getCollectionsInfo(options.id);
    }

    // 初始化页面数据
    this.initPageData();
    uni.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from === 'button' && this.currentWorkItem) {
      var work = this.currentWorkItem;
      if (work.hide === '1') {
        uni.showToast({
          title: '该作品仅自己可见，无法分享给他人',
          icon: 'none'
        });
        return false;
      }
      return {
        title: work.title || '我的作品',
        path: "/subpkg-others/pages/works-detail/detail?id=".concat(work.id, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
        imageUrl: this.buildShareImageUrl(this.getFirstImageUrl(work.imageUrls)) || '/static/yunyiku/bg.png'
      };
    }
    return {
      title: this.getCollectionShareTitle(),
      path: "/subpkg-library/pages/collection/detail?id=".concat(this.collectId, "&title=").concat(encodeURIComponent(this.getCollectionShareTitle()), "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
      imageUrl: this.getCollectionShareImage()
    };
  },
  onShareTimeline: function onShareTimeline() {
    return {
      title: this.getCollectionShareTitle(),
      query: "id=".concat(this.collectId, "&title=").concat(encodeURIComponent(this.getCollectionShareTitle()), "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
      imageUrl: this.getCollectionShareImage()
    };
  },
  computed: {
    isOwner: function isOwner() {
      if (!this.userInfo.id || !this.userId) {
        return false;
      }
      return this.userInfo.id == this.userId;
    },
    hideManageActions: function hideManageActions() {
      return this.isShareAccess && !this.isOwner;
    },
    userAvatarUrl: function userAvatarUrl() {
      if (!this.userInfo.avatarUrl) {
        return '/static/yunyiku/avatar.png';
      }
      if (/^https?:\/\//.test(this.userInfo.avatarUrl)) {
        return this.userInfo.avatarUrl;
      }
      return this.ossUrl + this.userInfo.avatarUrl;
    },
    // 所有有效作品
    allWorks: function allWorks() {
      // 首先确保works是数组
      var validWorks = Array.isArray(this.works) ? this.works : [];
      // 过滤出有效的对象元素
      var filteredValidWorks = validWorks.filter(function (item) {
        return item && (0, _typeof2.default)(item) === 'object';
      });

      // 根据是否是所有者过滤隐藏的作品
      if (!this.isOwner) {
        filteredValidWorks = filteredValidWorks.filter(function (item) {
          return item.hide === '0';
        });
      }
      return filteredValidWorks;
    },
    // 根据当前标签过滤作品，确保只返回有效的对象
    filteredWorks: function filteredWorks() {
      var _this = this;
      // 首先确保works是数组
      var validWorks = Array.isArray(this.works) ? this.works : [];
      // 过滤出有效的对象元素
      var filteredValidWorks = validWorks.filter(function (item) {
        return item && (0, _typeof2.default)(item) === 'object';
      });

      // 根据是否是所有者过滤隐藏的作品
      if (!this.isOwner) {
        filteredValidWorks = filteredValidWorks.filter(function (item) {
          return item.hide === '0';
        });
      }
      if (this.currentTag === '全部') {
        console.log('filteredWorks - 返回所有有效作品', filteredValidWorks.length);
        return filteredValidWorks;
      }

      // 根据标签过滤并兼容tagsList和tags属性
      var result = filteredValidWorks.filter(function (item) {
        var workTags = item.tagsList || item.tags;
        // 解析tags字符串为数组
        if (typeof workTags === 'string') {
          try {
            workTags = JSON.parse(workTags);
          } catch (error) {
            console.error('解析tags失败:', error);
            workTags = [];
          }
        }
        return Array.isArray(workTags) && workTags.includes(_this.currentTag);
      });
      console.log('filteredWorks - 返回过滤后的有效作品', result.length, '当前标签:', this.currentTag);
      return result;
    }
  },
  methods: {
    // 解析 imageUrls 字符串并获取第一张图片
    getFirstImageUrl: function getFirstImageUrl(imageUrlsStr) {
      if (!imageUrlsStr) return '';
      try {
        // 1. 解析 JSON 字符串
        var urlsArray = JSON.parse(imageUrlsStr);

        // 2. 检查是否为数组且不为空
        if (Array.isArray(urlsArray) && urlsArray.length > 0) {
          // 3. 返回第一张图片的 URL
          return urlsArray[0];
        }
        return '';
      } catch (error) {
        console.error('解析 imageUrls 失败:', error, imageUrlsStr);

        // 如果 JSON 解析失败，尝试其他解析方式
        // 例如：处理 "[url1,url2,url3]" 这种格式（不带引号）
        if (typeof imageUrlsStr === 'string') {
          // 移除首尾的方括号
          var cleaned = imageUrlsStr.trim().replace(/^\[/, '').replace(/\]$/, '');

          // 按逗号分割
          var urls = cleaned.split(',').map(function (url) {
            return url.trim();
          });
          if (urls.length > 0 && urls[0]) {
            return urls[0];
          }
        }
        return '';
      }
    },
    buildShareImageUrl: function buildShareImageUrl(url) {
      if (!url) return '';
      if (/^https?:\/\//.test(url)) {
        return url;
      }
      return this.ossUrl + url;
    },
    getCollectionShareTitle: function getCollectionShareTitle() {
      return this.title || '我的作品集';
    },
    getCollectionShareImage: function getCollectionShareImage() {
      var firstWork = this.allWorks[0];
      if (!firstWork) {
        return '/static/yunyiku/bg.png';
      }
      return this.buildShareImageUrl(this.getFirstImageUrl(firstWork.imageUrls)) || '/static/yunyiku/bg.png';
    },
    getCollectionsInfo: function getCollectionsInfo(id) {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _yield$_this2$$reques, code, data, tagsNum, works, collectionName;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.loading = true; // 开始加载，显示加载动画
                _context.prev = 1;
                _context.next = 4;
                return _this2.$request.get("/wechat/works/findUserWorksCollectionsInfo/".concat(id));
              case 4:
                _yield$_this2$$reques = _context.sent;
                code = _yield$_this2$$reques.code;
                data = _yield$_this2$$reques.data;
                if (code == 200) {
                  tagsNum = data['tagsNum'] || {};
                  works = data['works'];
                  collectionName = data['name'] || data['title'] || _this2.title; // 数据验证：确保works是数组且每个元素都是有效的对象
                  if (!Array.isArray(works)) {
                    works = [];
                    console.warn('获取到的works不是数组	', works);
                  } else {
                    // 过滤掉无效的作品项
                    works = works.filter(function (item) {
                      return item && (0, _typeof2.default)(item) === 'object';
                    });
                    console.log('过滤后的有效作品项数量', works.length);
                  }
                  _this2.title = collectionName;
                  uni.setNavigationBarTitle({
                    title: collectionName
                  });
                  _this2.tagsNum = tagsNum;
                  _this2.userInfo = {
                    nickName: data['nickName'],
                    avatarUrl: data['avatarUrl'],
                    id: data['userId']
                  };
                  if (_this2.isOwner) {
                    _this2.works = works;
                  } else {
                    _this2.works = works.filter(function (item) {
                      return item.hide == "0";
                    });
                  }
                }
                console.log('获取到的结果集详情', data);
                _context.next = 15;
                break;
              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                console.error('获取作品集详情失败', _context.t0);
                uni.showToast({
                  title: '加载失败，请重试',
                  icon: 'none'
                });
              case 15:
                _context.prev = 15;
                setTimeout(function () {
                  _this2.loading = false;
                }, 800); // 加载结束，隐藏加载动画
                return _context.finish(15);
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11, 15, 18]]);
      }))();
    },
    // 获取标签索引
    getTagIndex: function getTagIndex(tag) {
      var index = 0;
      for (var key in this.tagsNum) {
        if (key === tag) {
          return index;
        }
        if (key !== '全部') {
          index++;
        }
      }
      return 0;
    },
    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack();
    },
    goToVisitorHome: function goToVisitorHome() {
      if (!this.userInfo.id) return;
      if (!this.isLoggedIn()) {
        this.showLoginModal();
        return;
      }
      uni.navigateTo({
        url: "/subpkg-library/pages/visitor-home?userId=".concat(this.userInfo.id, "&isTeamMode=").concat(this.isTeamMode)
      });
    },
    // 初始化页面数据
    initPageData: function initPageData() {
      // 后续可以在此处添加从服务器获取数据的逻辑
    },
    // 跳转到作品详情页
    goToWorkDetail: function goToWorkDetail(item) {
      // 跳转到作品详情页
      var shareParam = this.isShareAccess ? '&fromShare=1' : '';
      uni.navigateTo({
        url: "/subpkg-others/pages/works-detail/detail?id=".concat(item.id).concat(shareParam)
      });
    },
    // 切换标签
    switchTag: function switchTag(tag, index) {
      var _this3 = this;
      if (this.currentTag === tag) return;
      this.currentTag = tag;
      this.currentTagIndex = index;
      // 当切换到第一个标签或第三个及以后的标签时，执行标签栏的滚动操作
      if (index <= 2 || index >= 2) {
        // 滚动到对应的标签
        this.$nextTick(function () {
          _this3.scrollToId = 'tab_' + index;
        });
      }
    },
    // 根据标签获取作品
    getWorksByTag: function getWorksByTag(tag) {
      // 首先确保works是数组
      var validWorks = Array.isArray(this.works) ? this.works : [];
      // 过滤出有效的对象元素
      var filteredValidWorks = validWorks.filter(function (item) {
        return item && (0, _typeof2.default)(item) === 'object';
      });

      // 根据是否是所有者过滤隐藏的作品
      if (!this.isOwner) {
        filteredValidWorks = filteredValidWorks.filter(function (item) {
          return item.hide === '0';
        });
      }

      // 根据标签过滤并兼容tagsList和tags属性
      var result = filteredValidWorks.filter(function (item) {
        var workTags = item.tagsList || item.tags;
        // 解析tags字符串为数组
        if (typeof workTags === 'string') {
          try {
            workTags = JSON.parse(workTags);
          } catch (error) {
            console.error('解析tags失败:', error);
            workTags = [];
          }
        }
        return Array.isArray(workTags) && workTags.includes(tag);
      });
      return result;
    },
    // 显示作品管理选项
    showWorkOptions: function showWorkOptions(item) {
      this.currentWorkItem = item;
      this.showWorkPopup = true;
    },
    // 关闭作品弹窗
    closeWorkPopup: function closeWorkPopup() {
      this.showWorkPopup = false;
    },
    showCollectionOptions: function showCollectionOptions() {
      this.currentWorkItem = null;
      this.showCollectionPopup = true;
    },
    closeCollectionPopup: function closeCollectionPopup() {
      this.showCollectionPopup = false;
    },
    handleCollectionShareClick: function handleCollectionShareClick() {
      this.currentWorkItem = null;
      this.closeCollectionPopup();
    },
    handleEditCollection: function handleEditCollection() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var ok;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this4.closeCollectionPopup();
                if (_this4.collectId) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                if (_this4.isOwner) {
                  _context2.next = 6;
                  break;
                }
                uni.showToast({
                  title: '只有作品集所有者可以管理',
                  icon: 'none'
                });
                return _context2.abrupt("return");
              case 6:
                if (!_this4.isTeamMode) {
                  _context2.next = 12;
                  break;
                }
                _context2.next = 9;
                return _this4.checkTeamPermissions(_this4.$options.TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
              case 9:
                ok = _context2.sent;
                if (ok) {
                  _context2.next = 12;
                  break;
                }
                return _context2.abrupt("return");
              case 12:
                uni.navigateTo({
                  url: "/subpkg-library/pages/collection/create?id=".concat(_this4.collectId, "&title=").concat(encodeURIComponent(_this4.title || ''), "&workType=").concat(_this4.isTeamMode ? 1 : 0)
                });
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    handleDownloadCollection: function handleDownloadCollection() {
      if (!this.collectId) return;
      this.closeCollectionPopup();
      this.downloadWorks('collection', this.collectId);
    },
    handleDeleteCollection: function handleDeleteCollection() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var ok;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this5.closeCollectionPopup();
                if (_this5.collectId) {
                  _context4.next = 3;
                  break;
                }
                return _context4.abrupt("return");
              case 3:
                if (_this5.isOwner) {
                  _context4.next = 6;
                  break;
                }
                uni.showToast({
                  title: '只有作品集所有者可以删除',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 6:
                if (!_this5.isTeamMode) {
                  _context4.next = 12;
                  break;
                }
                _context4.next = 9;
                return _this5.checkTeamPermissions(_this5.$options.TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
              case 9:
                ok = _context4.sent;
                if (ok) {
                  _context4.next = 12;
                  break;
                }
                return _context4.abrupt("return");
              case 12:
                uni.showModal({
                  title: '提示',
                  content: '确定要删除该作品集吗？',
                  success: function () {
                    var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(modalRes) {
                      var res;
                      return _regenerator.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (modalRes.confirm) {
                                _context3.next = 2;
                                break;
                              }
                              return _context3.abrupt("return");
                            case 2:
                              _context3.prev = 2;
                              _context3.next = 5;
                              return _this5.$request.delete("/wechat/works/deleteWorkCollections/".concat(_this5.collectId));
                            case 5:
                              res = _context3.sent;
                              if (res.code == 200) {
                                uni.setStorageSync('homeCollectionsNeedRefresh', true);
                                uni.showToast({
                                  title: '删除作品集成功',
                                  icon: 'none'
                                });
                                setTimeout(function () {
                                  uni.navigateBack();
                                }, 800);
                              }
                              _context3.next = 13;
                              break;
                            case 9:
                              _context3.prev = 9;
                              _context3.t0 = _context3["catch"](2);
                              console.error('删除作品集失败:', _context3.t0);
                              uni.showToast({
                                title: '删除失败，请重试',
                                icon: 'none'
                              });
                            case 13:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3, null, [[2, 9]]);
                    }));
                    function success(_x) {
                      return _success.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 编辑作品
    handleEditWork: function handleEditWork() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var ok;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('点击编辑作品');
                if (_this6.currentWorkItem) {
                  _context5.next = 3;
                  break;
                }
                return _context5.abrupt("return");
              case 3:
                _this6.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this6.isTeamMode) {
                  _context5.next = 10;
                  break;
                }
                _context5.next = 7;
                return _this6.checkTeamPermissions(_this6.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 7:
                ok = _context5.sent;
                if (ok) {
                  _context5.next = 10;
                  break;
                }
                return _context5.abrupt("return");
              case 10:
                uni.navigateTo({
                  url: "/subpkg-library/pages/works/create?id=".concat(_this6.currentWorkItem.id, "&title=").concat(_this6.currentWorkItem.title, "&workType=").concat(_this6.isTeamMode ? 1 : 0)
                });
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    handleVisableWork: function handleVisableWork() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var ok, newIsHide, actionText, confirmText;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this7.currentWorkItem) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                _this7.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this7.isTeamMode) {
                  _context6.next = 9;
                  break;
                }
                _context6.next = 6;
                return _this7.checkTeamPermissions(_this7.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context6.sent;
                if (ok) {
                  _context6.next = 9;
                  break;
                }
                return _context6.abrupt("return");
              case 9:
                newIsHide = _this7.currentWorkItem.hide === '1' ? '0' : '1';
                actionText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
                confirmText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
                uni.showModal({
                  title: '提示',
                  content: "\u786E\u5B9A\u8981".concat(actionText, "\u5417\uFF1F"),
                  success: function success(modalRes) {
                    if (modalRes.confirm) {
                      var params = {
                        worksId: _this7.currentWorkItem.id,
                        isHide: newIsHide //0:否 1:是
                      };

                      _this7.$request.put("/wechat/works/setWorkHide", params).then(function (res) {
                        if (res.code == 200) {
                          uni.showToast({
                            title: '设置成功',
                            icon: 'none'
                          });
                          _this7.getCollectionsInfo(_this7.collectId);
                        }
                      });
                    }
                  }
                });
              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    handleToggleWorkTop: function handleToggleWorkTop() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var ok, newIsTop, params, res;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!_this8.currentWorkItem || !_this8.collectId)) {
                  _context7.next = 2;
                  break;
                }
                return _context7.abrupt("return");
              case 2:
                _this8.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this8.isTeamMode) {
                  _context7.next = 9;
                  break;
                }
                _context7.next = 6;
                return _this8.checkTeamPermissions(_this8.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context7.sent;
                if (ok) {
                  _context7.next = 9;
                  break;
                }
                return _context7.abrupt("return");
              case 9:
                newIsTop = _this8.currentWorkItem.isTop == 1 ? 0 : 1;
                _context7.prev = 10;
                params = {
                  collectionId: _this8.collectId,
                  workId: _this8.currentWorkItem.id,
                  isTop: newIsTop,
                  sort: 1
                };
                _context7.next = 14;
                return _this8.$request.put('/wechat/works/setCollectionWorkTop', params);
              case 14:
                res = _context7.sent;
                if (res.code == 200) {
                  uni.showToast({
                    title: newIsTop === 1 ? '置顶成功' : '取消置顶成功',
                    icon: 'success'
                  });
                  _this8.getCollectionsInfo(_this8.collectId);
                }
                _context7.next = 22;
                break;
              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](10);
                console.error('设置作品置顶失败:', _context7.t0);
                uni.showToast({
                  title: '操作失败，请重试',
                  icon: 'none'
                });
              case 22:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[10, 18]]);
      }))();
    },
    // 删除作品
    handleDeleteWork: function handleDeleteWork() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var ok;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (_this9.currentWorkItem) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return");
              case 2:
                _this9.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this9.isTeamMode) {
                  _context9.next = 9;
                  break;
                }
                _context9.next = 6;
                return _this9.checkTeamPermissions(_this9.$options.TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context9.sent;
                if (ok) {
                  _context9.next = 9;
                  break;
                }
                return _context9.abrupt("return");
              case 9:
                uni.showModal({
                  title: '提示',
                  content: '确定要删除该作品吗？',
                  success: function () {
                    var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(modalRes) {
                      var res, index;
                      return _regenerator.default.wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              if (!modalRes.confirm) {
                                _context8.next = 12;
                                break;
                              }
                              _context8.prev = 1;
                              _context8.next = 4;
                              return _this9.$request.delete("/wechat/works/deleteWork/".concat(_this9.currentWorkItem.id));
                            case 4:
                              res = _context8.sent;
                              if (res.code == 200) {
                                // 从本地列表中删除
                                index = _this9.works.findIndex(function (work) {
                                  return work.id === _this9.currentWorkItem.id;
                                });
                                if (index !== -1) {
                                  _this9.works.splice(index, 1);
                                }

                                // 更新标签列表
                                _this9.updateTagsAfterDeletion();
                                uni.showToast({
                                  title: '删除成功',
                                  icon: 'success'
                                });
                              }
                              _context8.next = 12;
                              break;
                            case 8:
                              _context8.prev = 8;
                              _context8.t0 = _context8["catch"](1);
                              console.error('删除失败:', _context8.t0);
                              uni.showToast({
                                title: '删除失败，请重试',
                                icon: 'none'
                              });
                            case 12:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      }, _callee8, null, [[1, 8]]);
                    }));
                    function success(_x2) {
                      return _success2.apply(this, arguments);
                    }
                    return success;
                  }()
                });
              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 下载作品
    handleDownloadWork: function handleDownloadWork() {
      if (!this.currentWorkItem) return;
      this.closeWorkPopup();
      this.downloadWorks('work', this.currentWorkItem.id);
    },
    // 判断是否是电脑端
    isPC: function isPC() {
      var deviceInfo = uni.getDeviceInfo();
      return deviceInfo.platform === 'windows' || deviceInfo.platform === 'mac';
    },
    // 判断是否已登录
    isLoggedIn: function isLoggedIn() {
      var token = uni.getStorageSync('token');
      var userInfo = uni.getStorageSync('userInfo');
      return !!token && !!userInfo && !!userInfo.id;
    },
    showLoginModal: function showLoginModal() {
      uni.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        confirmText: '去登录',
        success: function success(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: '/subpkg-others/pages/login/index'
            });
          }
        }
      });
    },
    // 处理压缩包下载
    downloadZip: function downloadZip(resourceType, id) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var userInfo, isTeam, res;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                userInfo = uni.getStorageSync('userInfo') || {};
                isTeam = userInfo.vipLevel === 'team' || false;
                uni.showLoading({
                  title: '生成压缩包...',
                  mask: true
                });
                _context10.next = 5;
                return _this10.$request.post('/wechat/basic/downLoadWorksPc', {
                  id: id,
                  resourceType: resourceType,
                  userName: userInfo.nickName || '',
                  teamMode: isTeam
                });
              case 5:
                res = _context10.sent;
                if (res.code === 200 && res.data) {
                  uni.hideLoading();
                  // 打开下载链接
                  uni.showModal({
                    title: '压缩包下载',
                    content: "\u538B\u7F29\u5305\u751F\u6210\u6210\u529F\uFF0C\u8BF7\u70B9\u51FB\u590D\u5236\u94FE\u63A5\u5230\u6D4F\u89C8\u5668\u4E0B\u8F7D",
                    confirmText: '复制链接',
                    cancelText: '取消',
                    success: function success(modalRes) {
                      if (modalRes.confirm) {
                        // 复制链接到剪贴板
                        uni.setClipboardData({
                          data: res.data,
                          success: function success() {
                            uni.showToast({
                              title: '链接已复制到剪贴板',
                              icon: 'success',
                              duration: 2000
                            });
                          },
                          fail: function fail() {
                            uni.showToast({
                              title: '复制失败',
                              icon: 'none'
                            });
                          }
                        });
                      }
                    }
                  });
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: res.msg || '用户案列暂不支持下载',
                    icon: 'none'
                  });
                }
              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    downloadWorks: function downloadWorks(resourceType, id) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var isPC, isLoggedIn, userInfo, isTeam, res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                // 检查是否是电脑端且已登录
                isPC = _this11.isPC();
                isLoggedIn = _this11.isLoggedIn();
                if (!(isPC && isLoggedIn)) {
                  _context11.next = 6;
                  break;
                }
                // 电脑端且已登录，使用压缩包下载
                _this11.downloadZip(resourceType, id);
                _context11.next = 21;
                break;
              case 6:
                // 移动端或未登录，使用原有的文件下载方式
                userInfo = uni.getStorageSync('userInfo') || {};
                isTeam = userInfo.vipLevel === 'team' || false;
                uni.showLoading({
                  title: '获取文件列表...',
                  mask: true
                });
                _context11.prev = 9;
                _context11.next = 12;
                return _this11.$request.post('/wechat/basic/downLoadWorks', {
                  id: id,
                  resourceType: resourceType,
                  userName: userInfo.nickName || '',
                  teamMode: isTeam
                });
              case 12:
                res = _context11.sent;
                if (res.code === 200 && res.data && res.data.length > 0) {
                  uni.hideLoading();
                  _this11.downloadFiles(res.data);
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: '用户案列暂不支持下载',
                    icon: 'none'
                  });
                }
                _context11.next = 21;
                break;
              case 16:
                _context11.prev = 16;
                _context11.t0 = _context11["catch"](9);
                uni.hideLoading();
                uni.showToast({
                  title: '获取下载内容失败',
                  icon: 'none'
                });
                console.error('获取下载内容失败:', _context11.t0);
              case 21:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[9, 16]]);
      }))();
    },
    downloadFiles: function downloadFiles(filePaths) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var totalFiles, downloadedFiles, savedFiles, _loop, i, toastMessage;
        return _regenerator.default.wrap(function _callee12$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _this12.progress = 0;
                _this12.stageText = '准备下载...';
                totalFiles = filePaths.length;
                downloadedFiles = 0;
                savedFiles = 0;
                _loop = /*#__PURE__*/_regenerator.default.mark(function _loop(i) {
                  var filePath, fullUrl, fileType, tempFilePath;
                  return _regenerator.default.wrap(function _loop$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          filePath = filePaths[i];
                          fullUrl = _this12.ossUrl + filePath;
                          fileType = _this12.getFileType(filePath);
                          _context12.prev = 3;
                          _this12.stageText = "\u4E0B\u8F7D\u4E2D (".concat(i + 1, "/").concat(totalFiles, ")");
                          _context12.next = 7;
                          return new Promise(function (resolve, reject) {
                            uni.downloadFile({
                              url: fullUrl,
                              success: function success(downloadRes) {
                                if (downloadRes.statusCode === 200) {
                                  resolve(downloadRes.tempFilePath);
                                } else {
                                  reject(new Error("\u4E0B\u8F7D\u5931\u8D25: ".concat(downloadRes.statusCode)));
                                }
                              },
                              fail: function fail(err) {
                                reject(err);
                              }
                            });
                          });
                        case 7:
                          tempFilePath = _context12.sent;
                          downloadedFiles++;

                          // 保存到相册（如果是图片或视频）
                          if (!(fileType === 'image' || fileType === 'video')) {
                            _context12.next = 25;
                            break;
                          }
                          _context12.prev = 10;
                          if (!(fileType === 'image')) {
                            _context12.next = 16;
                            break;
                          }
                          _context12.next = 14;
                          return _this12.saveImageToAlbum(tempFilePath);
                        case 14:
                          _context12.next = 19;
                          break;
                        case 16:
                          if (!(fileType === 'video')) {
                            _context12.next = 19;
                            break;
                          }
                          _context12.next = 19;
                          return _this12.saveVideoToAlbum(tempFilePath);
                        case 19:
                          savedFiles++;
                          _context12.next = 25;
                          break;
                        case 22:
                          _context12.prev = 22;
                          _context12.t0 = _context12["catch"](10);
                          console.error("\u4FDD\u5B58\u6587\u4EF6\u5931\u8D25 ".concat(filePath, ":"), _context12.t0);
                          // 继续处理其他文件
                        case 25:
                          _this12.progress = Math.round(downloadedFiles / totalFiles * 100);
                          _context12.next = 31;
                          break;
                        case 28:
                          _context12.prev = 28;
                          _context12.t1 = _context12["catch"](3);
                          console.error("\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25 ".concat(filePath, ":"), _context12.t1);
                          // 继续下载其他文件
                        case 31:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _loop, null, [[3, 28], [10, 22]]);
                });
                i = 0;
              case 7:
                if (!(i < filePaths.length)) {
                  _context13.next = 12;
                  break;
                }
                return _context13.delegateYield(_loop(i), "t0", 9);
              case 9:
                i++;
                _context13.next = 7;
                break;
              case 12:
                _this12.stageText = '下载完成';
                _this12.progress = 100;
                toastMessage = "\u6210\u529F\u4E0B\u8F7D ".concat(downloadedFiles, " \u4E2A\u6587\u4EF6");
                if (savedFiles > 0) {
                  toastMessage += "\uFF0C\u5176\u4E2D ".concat(savedFiles, " \u4E2A\u5DF2\u4FDD\u5B58\u5230\u76F8\u518C");
                }
                uni.showToast({
                  title: toastMessage,
                  icon: 'none'
                });

                // 3秒后重置进度条
                setTimeout(function () {
                  _this12.progress = 0;
                  _this12.stageText = '';
                }, 3000);
              case 18:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee12);
      }))();
    },
    getFileType: function getFileType(filePath) {
      var ext = filePath.split('.').pop().toLowerCase();
      var imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      var videoExts = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv'];
      if (imageExts.includes(ext)) {
        return 'image';
      } else if (videoExts.includes(ext)) {
        return 'video';
      } else {
        return 'other';
      }
    },
    saveImageToAlbum: function saveImageToAlbum(tempFilePath) {
      return new Promise(function (resolve, reject) {
        uni.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: function success() {
            resolve();
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    },
    saveVideoToAlbum: function saveVideoToAlbum(tempFilePath) {
      return new Promise(function (resolve, reject) {
        uni.saveVideoToPhotosAlbum({
          filePath: tempFilePath,
          success: function success() {
            resolve();
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    },
    // 检查团队权限
    checkTeamPermissions: function checkTeamPermissions(role) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        return _regenerator.default.wrap(function _callee13$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return _this13.$request.get('/wechat/basic/hasTeamRight');
              case 3:
                _context14.next = 5;
                return _this13.$request.get('/wechat/basic/hasOperateRight', {
                  role: role
                });
              case 5:
                return _context14.abrupt("return", true);
              case 8:
                _context14.prev = 8;
                _context14.t0 = _context14["catch"](0);
                return _context14.abrupt("return", false);
              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee13, null, [[0, 8]]);
      }))();
    },
    // 鼠标按下事件
    handleMouseDown: function handleMouseDown(e) {
      this.isDragging = true;
      this.startX = e.clientX || e.touches[0].clientX;
      this.scrollLeft = e.currentTarget.scrollLeft;
      // 更改鼠标样式为拖拽状态
      e.currentTarget.style.cursor = 'grabbing';
    },
    // 鼠标移动事件
    handleMouseMove: function handleMouseMove(e) {
      if (!this.isDragging) return;
      var x = e.clientX || e.touches[0].clientX;
      var walk = (x - this.startX) * 2; // 滚动速度
      e.currentTarget.scrollLeft = this.scrollLeft + walk;
      e.preventDefault(); // 防止默认行为
    },
    // 鼠标释放事件
    handleMouseUp: function handleMouseUp(e) {
      this.isDragging = false;
      // 恢复鼠标样式
      if (e.currentTarget) {
        e.currentTarget.style.cursor = 'grab';
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 215:
/*!***************************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue?vue&type=style&index=0&id=6934f5d0&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&id=6934f5d0&lang=scss&scoped=true& */ 216);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_6934f5d0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 216:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/collection/detail.vue?vue&type=style&index=0&id=6934f5d0&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[209,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg-library/pages/collection/detail.js.map