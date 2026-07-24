(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/library/works/create"],{

/***/ 78:
/*!**************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"pages%2Flibrary%2Fworks%2Fcreate"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _create = _interopRequireDefault(__webpack_require__(/*! ./pages/library/works/create.vue */ 79));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_create.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 79:
/*!*****************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.vue?vue&type=template&id=7e690276&scoped=true& */ 80);
/* harmony import */ var _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create.vue?vue&type=script&lang=js& */ 82);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create.vue?vue&type=style&index=0&id=7e690276&lang=scss&scoped=true& */ 84);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7e690276",
  null,
  false,
  _create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/library/works/create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 80:
/*!************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue?vue&type=template&id=7e690276&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./create.vue?vue&type=template&id=7e690276&scoped=true& */ 81);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_template_id_7e690276_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 81:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue?vue&type=template&id=7e690276&scoped=true& ***!
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
  var g0 = _vm.tags.length
  var g1 = _vm.imageItems.length
  var g2 = g1 === 0 ? _vm.imageItems.length : null
  var l0 = !(g1 === 0)
    ? _vm.__map(_vm.imageItems, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g3 = _vm.imageItems.length
        var m0 =
          item.url &&
          typeof item.url === "string" &&
          !_vm.isPdfFile(item.url) &&
          !_vm.isPptFile(item.url) &&
          !_vm.isVideoFile(item.url)
        var m1 = m0 ? _vm.getFullUrlWithProcess(item.url) : null
        var m2 = !m0
          ? item.url &&
            typeof item.url === "string" &&
            _vm.isVideoFile(item.url)
          : null
        var m3 = !m0 && m2 ? _vm.getFullUrl(item.url) : null
        var m4 =
          !m0 && !m2
            ? item.url &&
              typeof item.url === "string" &&
              _vm.isPdfFile(item.url)
            : null
        var m5 = !m0 && !m2 && m4 ? _vm.getFileName(item.url) : null
        var m6 =
          !m0 && !m2 && !m4
            ? item.url &&
              typeof item.url === "string" &&
              _vm.isPptFile(item.url)
            : null
        var m7 = !m0 && !m2 && !m4 && m6 ? _vm.getFileName(item.url) : null
        return {
          $orig: $orig,
          g3: g3,
          m0: m0,
          m1: m1,
          m2: m2,
          m3: m3,
          m4: m4,
          m5: m5,
          m6: m6,
          m7: m7,
        }
      })
    : null
  var g4 = _vm.showDescPopup ? _vm.description.length : null
  var g5 = _vm.showTagPopup ? _vm.tags.length : null
  var g6 = _vm.showTagPopup && g5 > 0 ? _vm.tags.length : null
  var g7 = _vm.showTagPopup ? _vm.myTags.length : null
  var l1 = _vm.showTagPopup
    ? _vm.__map(_vm.myTags, function (tag, index) {
        var $orig = _vm.__get_orig(tag)
        var g8 = _vm.tags.some(function (t) {
          return t.tagName === tag.tagName
        })
        return {
          $orig: $orig,
          g8: g8,
        }
      })
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function (item, index) {
      var args = [],
        len = arguments.length - 2
      while (len-- > 0) args[len] = arguments[len + 2]

      var _temp = args[args.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item,
        index = _temp2.index
      var _temp, _temp2
      return _vm.onLongPress(item.id, index)
    }
    _vm.e1 = function (index) {
      var args = [],
        len = arguments.length - 1
      while (len-- > 0) args[len] = arguments[len + 1]

      var _temp3 = args[args.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        index = _temp4.index
      var _temp3, _temp4
      return _vm.onTap(index)
    }
    _vm.e2 = function (e, item, index) {
      var args = [],
        len = arguments.length - 3
      while (len-- > 0) args[len] = arguments[len + 3]

      var _temp5 = args[args.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        item = _temp6.item,
        index = _temp6.index
      var _temp5, _temp6
      return _vm.onTouchStart(e, item.id, index)
    }
    _vm.e3 = function ($event, item, index) {
      var _temp7 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp8 = _temp7.eventParams || _temp7["event-params"],
        item = _temp8.item,
        index = _temp8.index
      var _temp7, _temp8
      $event.stopPropagation()
      $event.preventDefault()
      return (function (e) {
        return _vm.onTouchMove(e, item.id, index)
      })($event)
    }
    _vm.e4 = function (e, item, index) {
      var args = [],
        len = arguments.length - 3
      while (len-- > 0) args[len] = arguments[len + 3]

      var _temp9 = args[args.length - 1].currentTarget.dataset,
        _temp10 = _temp9.eventParams || _temp9["event-params"],
        item = _temp10.item,
        index = _temp10.index
      var _temp9, _temp10
      return _vm.onTouchEnd(e, item.id, index)
    }
    _vm.e5 = function ($event) {
      _vm.showUploadPopup = false
    }
    _vm.e6 = function ($event) {
      _vm.showDescPopup = false
    }
    _vm.e7 = function ($event) {
      _vm.showDescPopup = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        l0: l0,
        g4: g4,
        g5: g5,
        g6: g6,
        g7: g7,
        l1: l1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 82:
/*!******************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./create.vue?vue&type=script&lang=js& */ 83);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 83:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 47));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 49));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 40));
var _uploadUtil = __webpack_require__(/*! @/utils/uploadUtil.js */ 67);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var yunStorageWarningVue = function yunStorageWarningVue() {
  __webpack_require__.e(/*! require.ensure | components/yun-storage-warning */ "components/yun-storage-warning").then((function () {
    return resolve(__webpack_require__(/*! ../../../components/yun-storage-warning.vue */ 344));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    yunStorageWarningVue: yunStorageWarningVue
  },
  data: function data() {
    return {
      warringVisible: false,
      id: null,
      title: '',
      description: '',
      coverImage: '',
      // 封面图
      teamId: null,
      // 团队id
      tags: [],
      workType: 0,
      // 0:个人 1:团队
      uploadType: 'works',
      // 'works' | 'cover'
      showUploadPopup: false,
      showDescPopup: false,
      images: [],
      // 存放上传的图片路径
      imageItems: [],
      // 带唯一ID的图片项数组
      ossUrl: _env.default.aliyunUrl,
      uploadProgress: {},
      // 存储上传进度，key为临时文件路径，value为进度值(0-100)
      // 拖拽相关状态
      isDragging: false,
      draggingId: null,
      placeholderIndex: -1,
      startPosition: null,
      currentPosition: null,
      originalIndex: -1,
      dragOffset: {
        x: 0,
        y: 0
      },
      imageGridRect: null,
      gridInfo: null,
      itemSize: 0,
      transformAnimations: [],
      // 标签弹窗相关
      showTagPopup: false,
      tagInput: '',
      myTags: [],
      // 存储我的标签列表
      teamUserId: 0
    };
  },
  onShow: function onShow() {
    if (this.hasLoginToken()) {
      this.getUserTags();
    } else {
      this.myTags = [];
    }
  },
  onBackPress: function onBackPress() {
    this.clearData();
  },
  onUnload: function onUnload() {
    this.clearData();
  },
  computed: {
    canSubmit: function canSubmit() {
      // 检查是否有标题
      if (!this.title || !this.title.trim()) {
        return false;
      }
      // 检查是否有图片
      if (!this.imageItems || this.imageItems.length === 0) {
        return false;
      }
      // 检查是否有正在上传的文件
      if (this.uploadProgress && Object.keys(this.uploadProgress).length > 0) {
        return false;
      }
      return true;
    } // images() {
    // 	return this.imageItems.map(i => i.url);
    // }
  },
  onLoad: function onLoad(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _yield$_this$$request, code, data;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (options.workType) {
                _this.workType = parseInt(options.workType);
              }
              if (!options.id) {
                _context.next = 19;
                break;
              }
              if (_this.hasLoginToken()) {
                _context.next = 5;
                break;
              }
              _this.promptLogin(_this.buildCurrentPageUrl());
              return _context.abrupt("return");
            case 5:
              uni.setNavigationBarTitle({
                title: '修改作品'
              });
              _context.next = 8;
              return _this.$request.get("/wechat/works/findWorks/".concat(options.id));
            case 8:
              _yield$_this$$request = _context.sent;
              code = _yield$_this$$request.code;
              data = _yield$_this$$request.data;
              _this.id = data['id'];
              _this.title = data['title'];
              _this.description = data['description'];
              _this.coverImage = data['coverUrl'];
              _this.teamId = data['teamId'];
              _this.tags = data['tagsList'] || [];

              // 确保 imageUrls 存在且是字符串
              if (data['imageUrls']) {
                try {
                  _this.images = JSON.parse(data['imageUrls']);
                  // 确保 images 是一个数组
                  if (!Array.isArray(_this.images)) {
                    _this.images = [];
                  }
                } catch (error) {
                  console.error('解析 imageUrls 失败:', error);
                  _this.images = [];
                }
              } else {
                _this.images = [];
              }

              // console.log("获取images", this.images)
              // 初始化带唯一ID的图片项数组 
              _this.imageItems = _this.images.map(function (url, index) {
                return {
                  id: "".concat(Date.now(), "_").concat(index),
                  url: url || '' // 确保 url 不是 null 或 undefined
                };
              });
              // console.log("this.imageItems", this.imageItems)
            case 19:
              if (options.isShowUploadPopup && _this.hasLoginToken()) {
                setTimeout(function () {
                  _this.showUploadPopup = true;
                }, 500);
              }
            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // computed: {
  // 	canSubmit() {
  // 		// 检查是否有标题
  // 		if (!this.title.trim()) {
  // 			console.log("111")
  // 			return false;
  // 		}
  // 		// 检查是否有图片
  // 		if (this.images.length === 0) {
  // 			console.log("222")
  // 			return false;
  // 		}
  // 		// 检查是否有正在上传的文件
  // 		if (Object.keys(this.uploadProgress).length > 0) {
  // 			console.log("333")
  // 			return false;
  // 		}
  // 		return true;
  // 	}
  // },
  onReady: function onReady() {
    this.initGridInfo();
  },
  methods: {
    hasLoginToken: function hasLoginToken() {
      return !!uni.getStorageSync('token');
    },
    buildCurrentPageUrl: function buildCurrentPageUrl() {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (!currentPage) {
        return '/pages/library/works/create';
      }
      var route = "/".concat(currentPage.route);
      var options = currentPage.options || {};
      var query = Object.keys(options).map(function (key) {
        return "".concat(key, "=").concat(encodeURIComponent(options[key]));
      }).join('&');
      return query ? "".concat(route, "?").concat(query) : route;
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
              url: '/pages/login/index'
            });
          }
        }
      });
    },
    ensureLoggedIn: function ensureLoggedIn() {
      if (this.hasLoginToken()) {
        return true;
      }
      this.promptLogin(this.buildCurrentPageUrl());
      return false;
    },
    // 安全函数：获取文件名
    getFileName: function getFileName(url) {
      if (!url || typeof url !== 'string') return '';
      return url.split('/').pop();
    },
    // 安全函数：获取完整URL
    getFullUrl: function getFullUrl(url) {
      if (!url || typeof url !== 'string') return '';
      return url.startsWith('http') ? url : this.ossUrl + url;
    },
    // 安全函数：获取带处理参数的完整URL
    getFullUrlWithProcess: function getFullUrlWithProcess(url) {
      if (!url || typeof url !== 'string') return '';
      var fullUrl = this.getFullUrl(url);
      return fullUrl + '?x-oss-process=image/resize,w_750/quality,q_50/format,webp';
    },
    getUserTags: function getUserTags() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var userId, isTeamMode, req, _yield$_this2$$reques, data, code;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.hasLoginToken()) {
                  _context2.next = 3;
                  break;
                }
                _this2.myTags = [];
                return _context2.abrupt("return");
              case 3:
                _context2.prev = 3;
                userId = uni.getStorageSync("teamOwnerId");
                isTeamMode = uni.getStorageSync("isTeamMode"); // console.log("userId",uni.getStorageSync("teamOwnerId"))
                // console.log("this.isTeamMode",this.isTeamMode)
                req = {
                  userId: isTeamMode ? userId : ''
                };
                _context2.next = 9;
                return _this2.$request.get("/wechat/tag/list", req);
              case 9:
                _yield$_this2$$reques = _context2.sent;
                data = _yield$_this2$$reques.data;
                code = _yield$_this2$$reques.code;
                if (code == 200) {
                  _this2.myTags = data;
                }
                _context2.next = 19;
                break;
              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](3);
                console.error("获取标签失败:", _context2.t0);
                _this2.myTags = [];
              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 15]]);
      }))();
    },
    confirm: function confirm() {
      this.warringVisible = false;
      uni.navigateTo({
        url: '/pages/profile/member/index'
      });
    },
    cancel: function cancel() {
      this.warringVisible = false;
    },
    openWorksUpload: function openWorksUpload() {
      if (!this.ensureLoggedIn()) {
        return;
      }
      this.uploadType = 'works';
      this.showUploadPopup = true;
    },
    openCoverUpload: function openCoverUpload() {
      if (!this.ensureLoggedIn()) {
        return;
      }
      this.uploadType = 'cover';
      this.showUploadPopup = true;
    },
    handleCoverUpload: function handleCoverUpload(type) {
      var _this3 = this;
      if (!this.ensureLoggedIn()) {
        return;
      }
      var allowedExtensions = ['jpg', 'jpeg', 'png'];
      var successHandler = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(res) {
          var filePath, lastDotIndex, ext, formData, result;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  filePath = '';
                  if (type === 'album') {
                    filePath = res.tempFiles[0].tempFilePath;
                  } else {
                    filePath = res.tempFiles[0].path;
                  }

                  // 确保 filePath 是字符串且不为空
                  if (!(!filePath || typeof filePath !== 'string')) {
                    _context3.next = 5;
                    break;
                  }
                  uni.showToast({
                    title: '文件路径无效',
                    icon: 'none'
                  });
                  return _context3.abrupt("return");
                case 5:
                  // 确保文件路径包含扩展名
                  lastDotIndex = filePath.lastIndexOf('.');
                  if (!(lastDotIndex === -1)) {
                    _context3.next = 9;
                    break;
                  }
                  uni.showToast({
                    title: '文件格式无效',
                    icon: 'none'
                  });
                  return _context3.abrupt("return");
                case 9:
                  ext = filePath.substring(lastDotIndex + 1).toLowerCase();
                  if (allowedExtensions.includes(ext)) {
                    _context3.next = 13;
                    break;
                  }
                  uni.showToast({
                    title: '仅支持 jpg, jpeg, png 格式的图片',
                    icon: 'none'
                  });
                  return _context3.abrupt("return");
                case 13:
                  uni.showLoading({
                    title: '上传中 0%',
                    mask: true
                  });
                  _context3.prev = 14;
                  formData = {
                    isVerify: "true"
                  };
                  if (String(_this3.workType) === '1') {
                    formData.isTeam = "true";
                  }
                  _context3.next = 19;
                  return (0, _uploadUtil.uploadFile)({
                    url: _env.default.baseUrl + "/wechat/basic/upload",
                    filePath: filePath,
                    formData: formData,
                    onProgressUpdate: function onProgressUpdate(progress) {
                      uni.showLoading({
                        title: "\u4E0A\u4F20\u4E2D ".concat(progress.progress, "%"),
                        mask: true
                      });
                    }
                  });
                case 19:
                  result = _context3.sent;
                  if (result.code == 200) {
                    _this3.coverImage = result.msg;
                    uni.showToast({
                      title: '封面上传成功',
                      icon: 'success'
                    });
                  } else {
                    uni.showToast({
                      title: '封面上传失败',
                      icon: 'none'
                    });
                  }
                  _context3.next = 27;
                  break;
                case 23:
                  _context3.prev = 23;
                  _context3.t0 = _context3["catch"](14);
                  console.error("封面上传失败:", _context3.t0);
                  uni.showToast({
                    title: '封面上传失败',
                    icon: 'none'
                  });
                case 27:
                  _context3.prev = 27;
                  uni.hideLoading();
                  return _context3.finish(27);
                case 30:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[14, 23, 27, 30]]);
        }));
        return function successHandler(_x) {
          return _ref.apply(this, arguments);
        };
      }();
      if (type === 'album') {
        uni.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType: ['album', 'camera'],
          success: successHandler
        });
      } else if (type === 'chat') {
        wx.chooseMessageFile({
          count: 1,
          type: 'all',
          success: successHandler,
          fail: function fail(err) {
            console.error("选择聊天记录文件失败:", err);
          }
        });
      }
    },
    openTags: function openTags() {
      if (!this.ensureLoggedIn()) {
        return;
      }
      this.showTagPopup = true;
    },
    closeTagPopup: function closeTagPopup() {
      this.showTagPopup = false;
    },
    confirmTags: function confirmTags() {
      if (this.tagInput.trim()) {
        this.addTag();
      }
      this.showTagPopup = false;
    },
    addTag: function addTag() {
      var tagName = this.tagInput.trim();
      if (!tagName) return;

      // 检查标签是否在我的标签中存在
      var existingTag = this.myTags.find(function (t) {
        return t.tagName === tagName;
      });
      if (!existingTag) {
        uni.showToast({
          title: '标签不存在，请先在标签管理中添加',
          icon: 'none'
        });
        return;
      }
      if (!this.tags.some(function (t) {
        return t.tagName === tagName;
      })) {
        // 使用myTags中已存在的标签对象
        this.tags.push(existingTag);
      } else {
        uni.showToast({
          title: '标签已存在',
          icon: 'none'
        });
      }
      this.tagInput = '';
    },
    toggleTag: function toggleTag(tag) {
      var tagName = tag.tagName;
      var index = this.tags.findIndex(function (t) {
        return t.tagName === tagName;
      });
      if (index > -1) {
        this.tags.splice(index, 1);
      } else {
        this.tags.push(tag);
      }
    },
    removeTag: function removeTag(index) {
      this.tags.splice(index, 1);
    },
    manageTags: function manageTags() {
      if (!this.ensureLoggedIn()) {
        return;
      }
      uni.navigateTo({
        url: '/pages/library/tags/edit'
      });
    },
    updateTags: function updateTags(newTags) {
      this.tags = newTags;
    },
    chooseImage: function chooseImage(type) {
      var _this4 = this;
      if (!this.ensureLoggedIn()) {
        return;
      }
      this.showUploadPopup = false;
      if (this.uploadType === 'cover') {
        this.handleCoverUpload(type);
        return;
      }
      var allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'pptx', 'ppt', 'mp4', 'mov', 'avi', 'flv', 'wmv', 'mkv'];
      if (type === 'album') {
        // 选择图片
        uni.chooseMedia({
          count: 20,
          mediaType: ['image', "video"],
          // 仅支持图片 和视频
          sourceType: ['album', 'camera'],
          sizeType: ['original', 'compressed'],
          // 支持原图和压缩图
          success: function () {
            var _success = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(res) {
              var _iterator, _step, _loop, _ret;
              return _regenerator.default.wrap(function _callee4$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      // console.log("选择媒体结果->", res);
                      // console.log("tempFiles结构->", res.tempFiles);
                      // 遍历选择的文件
                      _iterator = _createForOfIteratorHelper(res.tempFiles);
                      _context5.prev = 1;
                      _loop = /*#__PURE__*/_regenerator.default.mark(function _loop() {
                        var tempFile, filePath, lastDotIndex, ext, uniqueId, currentId, formData, result, index, _index;
                        return _regenerator.default.wrap(function _loop$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                tempFile = _step.value;
                                filePath = tempFile.tempFilePath; // 确保 filePath 是字符串且不为空
                                if (!(!filePath || typeof filePath !== 'string')) {
                                  _context4.next = 5;
                                  break;
                                }
                                uni.showToast({
                                  title: '文件路径无效',
                                  icon: 'none'
                                });
                                return _context4.abrupt("return", "continue");
                              case 5:
                                // 确保文件路径包含扩展名
                                lastDotIndex = filePath.lastIndexOf('.');
                                if (!(lastDotIndex === -1)) {
                                  _context4.next = 9;
                                  break;
                                }
                                uni.showToast({
                                  title: '文件格式无效',
                                  icon: 'none'
                                });
                                return _context4.abrupt("return", "continue");
                              case 9:
                                ext = filePath.substring(lastDotIndex + 1).toLowerCase();
                                if (allowedExtensions.includes(ext)) {
                                  _context4.next = 13;
                                  break;
                                }
                                uni.showToast({
                                  title: '不支持的文件格式',
                                  icon: 'none'
                                });
                                return _context4.abrupt("return", "continue");
                              case 13:
                                // console.log("ext", ext)
                                // 生成唯一ID
                                uniqueId = "".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9)); // console.log("uniqueId", uniqueId)
                                // 先将临时文件路径添加到imageItems数组
                                currentId = uniqueId;
                                _this4.imageItems.push({
                                  id: uniqueId,
                                  url: filePath,
                                  status: 'uploading'
                                });

                                // 初始化进度为0
                                _this4.$set(_this4.uploadProgress, uniqueId, 0);
                                _context4.prev = 17;
                                formData = {
                                  isVerify: "true"
                                };
                                if (String(_this4.workType) === '1') {
                                  formData.isTeam = "true";
                                }
                                _context4.next = 22;
                                return (0, _uploadUtil.uploadFile)({
                                  url: _env.default.baseUrl + "/wechat/basic/upload",
                                  filePath: filePath,
                                  name: "file",
                                  formData: formData,
                                  onProgressUpdate: function onProgressUpdate(progress) {
                                    // 更新进度
                                    _this4.$set(_this4.uploadProgress, uniqueId, progress.progress);
                                  }
                                });
                              case 22:
                                result = _context4.sent;
                                if (result.code == 200) {
                                  index = _this4.imageItems.findIndex(function (item) {
                                    return item.id === currentId;
                                  });
                                  if (index !== -1) {
                                    _this4.$set(_this4.imageItems[index], 'url', result.msg);
                                    _this4.$set(_this4.imageItems[index], 'status', 'completed');
                                  }
                                  // 移除进度记录
                                  _this4.$delete(_this4.uploadProgress, uniqueId);
                                } else if (result.code == 601) {
                                  _this4.warringVisible = true;
                                  _index = _this4.imageItems.findIndex(function (item) {
                                    return item.id === currentId;
                                  });
                                  if (_index !== -1) {
                                    _this4.$set(_this4.imageItems[_index], 'status', 'completed');
                                  }
                                  _this4.$delete(_this4.uploadProgress, uniqueId);
                                } else {
                                  // 上传失败，移除临时文件
                                  _this4.$nextTick(function () {
                                    var index = _this4.imageItems.findIndex(function (item) {
                                      return item.id === currentId;
                                    });
                                    if (index !== -1) {
                                      if (_this4.draggingId === currentId) {
                                        _this4.draggingId = null;
                                      }
                                      _this4.imageItems.splice(index, 1);
                                    }
                                    _this4.$delete(_this4.uploadProgress, uniqueId);
                                  });
                                  uni.showToast({
                                    title: '上传失败',
                                    icon: 'none'
                                  });
                                }
                                _context4.next = 31;
                                break;
                              case 26:
                                _context4.prev = 26;
                                _context4.t0 = _context4["catch"](17);
                                console.error("上传失败:", _context4.t0);
                                // 上传失败，移除临时文件
                                _this4.$nextTick(function () {
                                  var index = _this4.imageItems.findIndex(function (item) {
                                    return item.id === currentId;
                                  });
                                  if (index !== -1) {
                                    if (_this4.draggingId === currentId) {
                                      _this4.draggingId = null;
                                    }
                                    _this4.imageItems.splice(index, 1);
                                  }
                                  _this4.$delete(_this4.uploadProgress, uniqueId);
                                });
                                uni.showToast({
                                  title: '上传失败',
                                  icon: 'none'
                                });
                              case 31:
                              case "end":
                                return _context4.stop();
                            }
                          }
                        }, _loop, null, [[17, 26]]);
                      });
                      _iterator.s();
                    case 4:
                      if ((_step = _iterator.n()).done) {
                        _context5.next = 11;
                        break;
                      }
                      return _context5.delegateYield(_loop(), "t0", 6);
                    case 6:
                      _ret = _context5.t0;
                      if (!(_ret === "continue")) {
                        _context5.next = 9;
                        break;
                      }
                      return _context5.abrupt("continue", 9);
                    case 9:
                      _context5.next = 4;
                      break;
                    case 11:
                      _context5.next = 16;
                      break;
                    case 13:
                      _context5.prev = 13;
                      _context5.t1 = _context5["catch"](1);
                      _iterator.e(_context5.t1);
                    case 16:
                      _context5.prev = 16;
                      _iterator.f();
                      return _context5.finish(16);
                    case 19:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee4, null, [[1, 13, 16, 19]]);
            }));
            function success(_x2) {
              return _success.apply(this, arguments);
            }
            return success;
          }()
        });
      } else if (type === 'chat') {
        // 微信聊天记录选择文件

        wx.chooseMessageFile({
          count: 20,
          type: 'all',
          // 支持所有类型
          extension: allowedExtensions,
          // 支持的文件类型
          success: function () {
            var _success2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(res) {
              var _iterator2, _step2, _loop2, _ret2;
              return _regenerator.default.wrap(function _callee5$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      // console.log("选择聊天记录文件结果->", res);
                      // console.log("聊天记录tempFiles结构->", res.tempFiles);

                      // 显示上传中提示
                      uni.showLoading({
                        title: '上传中...',
                        mask: true
                      });

                      // 遍历选择的文件
                      _iterator2 = _createForOfIteratorHelper(res.tempFiles);
                      _context7.prev = 2;
                      _loop2 = /*#__PURE__*/_regenerator.default.mark(function _loop2() {
                        var tempFile, filePath, lastDotIndex, ext, uniqueId, currentId, formData, result, index;
                        return _regenerator.default.wrap(function _loop2$(_context6) {
                          while (1) {
                            switch (_context6.prev = _context6.next) {
                              case 0:
                                tempFile = _step2.value;
                                filePath = tempFile.path; // 确保 filePath 是字符串且不为空
                                if (!(!filePath || typeof filePath !== 'string')) {
                                  _context6.next = 5;
                                  break;
                                }
                                uni.showToast({
                                  title: '文件路径无效',
                                  icon: 'none'
                                });
                                return _context6.abrupt("return", "continue");
                              case 5:
                                // 确保文件路径包含扩展名
                                lastDotIndex = filePath.lastIndexOf('.');
                                if (!(lastDotIndex === -1)) {
                                  _context6.next = 9;
                                  break;
                                }
                                uni.showToast({
                                  title: '文件格式无效',
                                  icon: 'none'
                                });
                                return _context6.abrupt("return", "continue");
                              case 9:
                                ext = filePath.substring(lastDotIndex + 1).toLowerCase();
                                if (allowedExtensions.includes(ext)) {
                                  _context6.next = 13;
                                  break;
                                }
                                uni.showToast({
                                  title: '不支持的文件格式',
                                  icon: 'none'
                                });
                                return _context6.abrupt("return", "continue");
                              case 13:
                                // 生成唯一ID
                                uniqueId = "".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9)); // 先将临时文件路径添加到imageItems数组
                                currentId = uniqueId;
                                _this4.imageItems.push({
                                  id: uniqueId,
                                  url: filePath,
                                  status: 'uploading'
                                });

                                // 初始化进度为0
                                _this4.$set(_this4.uploadProgress, uniqueId, 0);
                                _context6.prev = 17;
                                formData = {
                                  isVerify: "true"
                                };
                                if (String(_this4.workType) === '1') {
                                  formData.isTeam = "true";
                                }
                                _context6.next = 22;
                                return (0, _uploadUtil.uploadFile)({
                                  url: _env.default.baseUrl + "/wechat/basic/upload",
                                  filePath: filePath,
                                  name: "file",
                                  formData: formData,
                                  onProgressUpdate: function onProgressUpdate(progress) {
                                    // 更新进度
                                    _this4.$set(_this4.uploadProgress, uniqueId, progress.progress);
                                  }
                                });
                              case 22:
                                result = _context6.sent;
                                if (result.code == 200) {
                                  index = _this4.imageItems.findIndex(function (item) {
                                    return item.id === currentId;
                                  });
                                  if (index !== -1) {
                                    _this4.$set(_this4.imageItems[index], 'url', result.msg);
                                    _this4.$set(_this4.imageItems[index], 'status', 'completed');
                                  }
                                  // 移除进度记录
                                  _this4.$delete(_this4.uploadProgress, uniqueId);
                                } else {
                                  // 上传失败，移除临时文件
                                  _this4.$nextTick(function () {
                                    var index = _this4.imageItems.findIndex(function (item) {
                                      return item.id === currentId;
                                    });
                                    if (index !== -1) {
                                      if (_this4.draggingId === currentId) {
                                        _this4.draggingId = null;
                                      }
                                      _this4.imageItems.splice(index, 1);
                                    }
                                    _this4.$delete(_this4.uploadProgress, uniqueId);
                                  });
                                  uni.showToast({
                                    title: '上传失败',
                                    icon: 'none'
                                  });
                                }
                                _context6.next = 31;
                                break;
                              case 26:
                                _context6.prev = 26;
                                _context6.t0 = _context6["catch"](17);
                                console.error("上传失败:", _context6.t0);
                                // 上传失败，移除临时文件
                                _this4.$nextTick(function () {
                                  var index = _this4.imageItems.findIndex(function (item) {
                                    return item.id === currentId;
                                  });
                                  if (index !== -1) {
                                    if (_this4.draggingId === currentId) {
                                      _this4.draggingId = null;
                                    }
                                    _this4.imageItems.splice(index, 1);
                                  }
                                  _this4.$delete(_this4.uploadProgress, uniqueId);
                                });
                                uni.showToast({
                                  title: '上传失败',
                                  icon: 'none'
                                });
                              case 31:
                              case "end":
                                return _context6.stop();
                            }
                          }
                        }, _loop2, null, [[17, 26]]);
                      });
                      _iterator2.s();
                    case 5:
                      if ((_step2 = _iterator2.n()).done) {
                        _context7.next = 12;
                        break;
                      }
                      return _context7.delegateYield(_loop2(), "t0", 7);
                    case 7:
                      _ret2 = _context7.t0;
                      if (!(_ret2 === "continue")) {
                        _context7.next = 10;
                        break;
                      }
                      return _context7.abrupt("continue", 10);
                    case 10:
                      _context7.next = 5;
                      break;
                    case 12:
                      _context7.next = 17;
                      break;
                    case 14:
                      _context7.prev = 14;
                      _context7.t1 = _context7["catch"](2);
                      _iterator2.e(_context7.t1);
                    case 17:
                      _context7.prev = 17;
                      _iterator2.f();
                      return _context7.finish(17);
                    case 20:
                      // 隐藏上传提示
                      uni.hideLoading();
                    case 21:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee5, null, [[2, 14, 17, 20]]);
            }));
            function success(_x3) {
              return _success2.apply(this, arguments);
            }
            return success;
          }(),
          fail: function fail(err) {
            console.error("选择聊天记录文件失败:", err);
            uni.hideLoading();
            uni.showToast({
              title: '取消选择或失败',
              icon: 'none'
            });
          }
        });
      }
    },
    // 判断是否为PDF文件
    isPdfFile: function isPdfFile(file) {
      if (!file || typeof file !== 'string') {
        return false;
      }
      return file.toLowerCase().includes('.pdf');
    },
    // 判断是否为PPT/PPTX文件
    isPptFile: function isPptFile(file) {
      if (!file || typeof file !== 'string') {
        return false;
      }
      var lower = file.toLowerCase();
      return lower.includes('.pptx') || lower.includes('.ppt');
    },
    // 判断是否为视频文件
    isVideoFile: function isVideoFile(file) {
      if (!file || typeof file !== 'string') {
        return false;
      }
      var lower = file.toLowerCase();
      var videoExtensions = ['.mp4', '.mov', '.avi', '.flv', '.wmv', '.mkv'];
      return videoExtensions.some(function (ext) {
        return lower.includes(ext);
      });
    },
    // 图片加载完成事件
    onImageLoad: function onImageLoad() {
      // 图片加载完成后可以在这里添加额外的处理
    },
    // 预览图片或文档
    previewMedia: function previewMedia(index) {
      var _this5 = this;
      var currentItem = this.imageItems[index];
      // 检查currentItem是否有效
      if (!currentItem || !currentItem.url) {
        return;
      }
      var isPdf = this.isPdfFile(currentItem.url);
      var isPpt = this.isPptFile(currentItem.url);
      var isVideo = this.isVideoFile(currentItem.url);
      if (isPdf || isPpt) {
        // 打开文档文件
        var filePath = this.getFullUrl(currentItem.url);
        uni.showLoading({
          title: '加载中...'
        });
        uni.downloadFile({
          url: filePath,
          success: function success(res) {
            uni.hideLoading();
            if (res.statusCode === 200) {
              // 打开文档
              uni.openDocument({
                filePath: res.tempFilePath,
                title: _this5.getFileName(currentItem.url),
                success: function success(res) {
                  // console.log('打开文档成功');
                },
                fail: function fail(err) {
                  console.error('打开文档失败', err);
                  uni.showToast({
                    title: '打开文档失败',
                    icon: 'none'
                  });
                }
              });
            } else {
              uni.showToast({
                title: '下载文档失败',
                icon: 'none'
              });
            }
          },
          fail: function fail(err) {
            uni.hideLoading();
            console.error('下载文档失败', err);
            uni.showToast({
              title: '下载文档失败',
              icon: 'none'
            });
          }
        });
      } else if (isVideo) {
        // 预览视频
        var videoUrl = this.getFullUrl(currentItem.url);
        uni.navigateTo({
          url: "/pages/works-detail/image-preview?urls=".concat(encodeURIComponent(JSON.stringify([videoUrl])), "&index=0&canDownload=", true, "&isOwner=", true)
        });
      } else {
        // 预览图片
        // 预览时需要拼接完整的图片URL
        var fullImageUrls = this.imageItems.map(function (item) {
          // 确保item和item.url是有效的
          if (!item || !item.url || typeof item.url !== 'string') {
            return '';
          }
          return _this5.getFullUrl(item.url);
        });
        uni.previewImage({
          urls: fullImageUrls,
          current: index
        });
      }
    },
    // 删除图片
    deleteImage: function deleteImage(currentId) {
      var _this6 = this;
      this.$nextTick(function () {
        var index = _this6.imageItems.findIndex(function (item) {
          return item.id === currentId;
        });
        if (index !== -1) {
          // 先获取要删除的项
          var itemToDelete = _this6.imageItems[index];
          if (_this6.draggingId === currentId) {
            _this6.draggingId = null;
          }
          _this6.imageItems.splice(index, 1);
          // 移除进度记录 - 使用唯一ID作为key
          _this6.$delete(_this6.uploadProgress, currentId);
        }
      });
    },
    // 初始化网格信息
    initGridInfo: function initGridInfo() {
      var _this7 = this;
      // 使用 setTimeout 确保 DOM 已经渲染完成
      setTimeout(function () {
        uni.createSelectorQuery().in(_this7).select('.image-grid').boundingClientRect(function (data) {
          if (data) {
            _this7.imageGridRect = data;
            var gap = uni.upx2px(12);
            var itemSize = (data.width - gap * 2) / 3;
            _this7.gridInfo = {
              itemSize: itemSize,
              gap: gap,
              columns: 3
            };
            _this7.itemSize = itemSize;
          }
        }).exec();
      }, 100);
    },
    // 长按事件 - 进入拖拽模式
    onLongPress: function onLongPress(currentId, index) {
      // console.log("触发onLongPress", currentId)
      if (this.draggingId !== null) {
        this.resetDragState();
        return;
      }

      // 确保网格信息已初始化
      if (!this.gridInfo) {
        this.initGridInfo();
        // 如果初始化后仍为空，提示用户
        if (!this.gridInfo) {
          uni.showToast({
            title: '请先上传图片',
            icon: 'none'
          });
          return;
        }
      }
      this.isDragging = true;
      this.draggingId = currentId;
      this.placeholderIndex = index;
      this.originalIndex = index;
      uni.vibrateShort();
      uni.showToast({
        title: '拖动图片调整顺序',
        icon: 'none',
        duration: 1500
      });
    },
    // 点击事件 - 预览图片/视频
    onTap: function onTap(index) {
      this.previewMedia(index);
    },
    onTouchStart: function onTouchStart(e, currentId, index) {
      var touch = e.touches[0];
      this.startPosition = {
        x: touch.pageX,
        y: touch.pageY
      };
      this.currentPosition = {
        x: touch.pageX,
        y: touch.pageY
      };
    },
    onTouchMove: function onTouchMove(e, currentId, index) {
      // 添加对 e 参数的检查
      if (!e || !e.touches || e.touches.length === 0) {
        return;
      }

      // 如果不是拖拽状态，完全允许默认行为（页面滚动）
      if (this.draggingId === null) {
        return;
      }

      // 如果是拖拽状态但不是当前元素，也允许默认行为
      if (this.draggingId !== currentId) {
        return;
      }

      // 确保 gridInfo 和 imageItems 存在
      if (!this.gridInfo || !this.imageItems || this.imageItems.length === 0) {
        return;
      }
      var touch = e.touches[0];
      this.currentPosition = {
        x: touch.pageX,
        y: touch.pageY
      };
      if (!this.startPosition) {
        this.startPosition = _objectSpread({}, this.currentPosition);
        return;
      }

      // 计算移动距离
      var deltaX = Math.abs(this.currentPosition.x - this.startPosition.x);
      var deltaY = Math.abs(this.currentPosition.y - this.startPosition.y);

      // 定义一个最小移动距离阈值，避免微小的触摸抖动影响判断
      var minMoveThreshold = 5;

      // 如果移动距离很小，不做任何处理，避免影响滚动
      if (deltaX < minMoveThreshold && deltaY < minMoveThreshold) {
        return;
      }

      // 阻止默认行为，允许拖拽
      e.preventDefault();
      var moveDeltaX = this.currentPosition.x - this.startPosition.x;
      var moveDeltaY = this.currentPosition.y - this.startPosition.y;

      // 确保 originalIndex 有效
      if (this.originalIndex < 0 || this.originalIndex >= this.imageItems.length) {
        return;
      }
      var originRow = Math.floor(this.originalIndex / 3);
      var originCol = this.originalIndex % 3;
      var originLeft = originCol * (this.gridInfo.itemSize + this.gridInfo.gap);
      var originTop = originRow * (this.gridInfo.itemSize + this.gridInfo.gap);
      var currentCenterX = originLeft + moveDeltaX + this.gridInfo.itemSize / 2;
      var currentCenterY = originTop + moveDeltaY + this.gridInfo.itemSize / 2;
      var col = Math.floor(currentCenterX / (this.gridInfo.itemSize + this.gridInfo.gap));
      var row = Math.floor(currentCenterY / (this.gridInfo.itemSize + this.gridInfo.gap));
      col = Math.max(0, Math.min(col, 2));
      row = Math.max(0, row);
      var targetIndex = row * 3 + col;
      var maxIndex = this.imageItems.length - 1;
      targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
      if (targetIndex !== this.placeholderIndex) {
        this.placeholderIndex = targetIndex;
        // 只在真机上震动，PC端跳过，避免PC端拖拽卡顿

        var systemInfo = uni.getSystemInfoSync();
        if (systemInfo.platform !== 'windows' && systemInfo.platform !== 'mac') {
          uni.vibrateShort();
        }
      }
    },
    // 计算非拖拽元素的transform动画
    getNonDraggingTransform: function getNonDraggingTransform(index) {
      return 'none';
    },
    // 触摸结束事件
    onTouchEnd: function onTouchEnd(e, currentId, index) {
      // console.log("结束拖拽", currentId)
      // 添加对 e 参数的检查
      if (!e) {
        this.resetDragState();
        return;
      }

      // 结束拖拽模式
      if (this.draggingId === currentId) {
        // 检查是否有有效的位置变化
        if (this.originalIndex !== this.placeholderIndex && this.placeholderIndex >= 0 && this.placeholderIndex < this.imageItems.length && this.originalIndex >= 0 && this.originalIndex < this.imageItems.length) {
          // 直接更新数据数组，不使用 $nextTick
          // 创建新数组（插入到新位置，而不是交换）
          var newImageItems = (0, _toConsumableArray2.default)(this.imageItems);

          // 移除拖拽的元素
          var draggedItem = newImageItems.splice(this.originalIndex, 1)[0];

          // 插入到新位置
          newImageItems.splice(this.placeholderIndex, 0, draggedItem);

          // 一次性更新数据数组
          this.imageItems = newImageItems;
          uni.vibrateShort();
        }

        // 重置所有拖拽状态
        this.resetDragState();
      }
    },
    resetDragState: function resetDragState() {
      this.draggingId = null;
      this.startPosition = null;
      this.currentPosition = null;
      this.isDragging = false;
      this.dragOffset = {
        x: 0,
        y: 0
      };
      this.originalIndex = -1;
      this.placeholderIndex = -1;
      this.transformAnimations = [];
    },
    // 提交发布
    submitPublish: function submitPublish() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var reqImage, isTeamMode, params, res;
        return _regenerator.default.wrap(function _callee6$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (_this8.ensureLoggedIn()) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return");
              case 2:
                if (_this8.title.trim()) {
                  _context8.next = 5;
                  break;
                }
                uni.showToast({
                  title: '请输入标题',
                  icon: 'none'
                });
                return _context8.abrupt("return");
              case 5:
                if (!(_this8.imageItems.length === 0)) {
                  _context8.next = 8;
                  break;
                }
                uni.showToast({
                  title: '请上传至少一张图片',
                  icon: 'none'
                });
                return _context8.abrupt("return");
              case 8:
                uni.showLoading({
                  title: '发布中...',
                  mask: true
                });
                reqImage = _this8.imageItems.map(function (i) {
                  return i.url;
                });
                isTeamMode = uni.getStorageSync('isTeamMode') || false;
                _this8.teamUserId = uni.getStorageSync('teamOwnerId');
                params = {
                  id: _this8.id,
                  title: _this8.title,
                  description: _this8.description,
                  coverUrl: _this8.coverImage,
                  //作品封面图
                  images: reqImage,
                  //作品
                  addTags: _this8.tags,
                  workType: _this8.workType,
                  //0：个人: 1：团队
                  teamId: _this8.teamId //团队id
                };

                if (isTeamMode) {
                  params.userId = uni.getStorageSync('teamOwnerId');
                  // console.log('isTeamMode,userId', isTeamMode, this.teamUserId)
                }
                if (params.id) {
                  _context8.next = 20;
                  break;
                }
                _context8.next = 17;
                return _this8.$request.post("/wechat/works/addWorks", params);
              case 17:
                res = _context8.sent;
                _context8.next = 23;
                break;
              case 20:
                _context8.next = 22;
                return _this8.$request.put("/wechat/works/editWorks", params);
              case 22:
                res = _context8.sent;
              case 23:
                uni.hideLoading();
                if (res.code == 200) {
                  uni.showToast({
                    title: params.id ? '修改作品成功' : '新增作品成功',
                    icon: 'success',
                    duration: 1500
                  });
                  setTimeout(function () {
                    // 触发页面刷新事件，通知详情页刷新数据
                    uni.$emit('refreshWorkDetail');
                    uni.navigateBack();
                  }, 1500);
                } else {
                  uni.showToast({
                    title: res.msg || '发布失败',
                    icon: 'none'
                  });
                }
              case 25:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee6);
      }))();
    },
    clearData: function clearData() {
      this.id = null;
      this.title = null;
      this.description = null;
      this.coverImage = null;
      this.images = [];
      this.imageItems = [];
      this.uploadProgress = {};
    },
    // 电脑上传指引
    showComputerGuide: function showComputerGuide() {
      uni.showModal({
        title: '电脑上传指引',
        content: '1. 登录电脑版微信\n2. 打开本小程序\n3. 进入发布页点击上传\n4. 选择"从聊天记录选择"\n5. 选择电脑发送到手机的文件',
        showCancel: false,
        confirmText: '知道了'
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 84:
/*!***************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue?vue&type=style&index=0&id=7e690276&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./create.vue?vue&type=style&index=0&id=7e690276&lang=scss&scoped=true& */ 85);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_create_vue_vue_type_style_index_0_id_7e690276_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 85:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/works/create.vue?vue&type=style&index=0&id=7e690276&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[78,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/library/works/create.js.map