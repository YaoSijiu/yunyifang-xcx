(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg-others/pages/works-detail/detail"],{

/***/ 289:
/*!***************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"subpkg-others%2Fpages%2Fworks-detail%2Fdetail"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./subpkg-others/pages/works-detail/detail.vue */ 290));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 290:
/*!******************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=35730b60&scoped=true& */ 291);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 293);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=35730b60&lang=scss&scoped=true& */ 295);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "35730b60",
  null,
  false,
  _detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg-others/pages/works-detail/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 291:
/*!*************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue?vue&type=template&id=35730b60&scoped=true& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=35730b60&scoped=true& */ 292);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_35730b60_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 292:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue?vue&type=template&id=35730b60&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    yunShareBtn: function () {
      return Promise.all(/*! import() | components/yun-share-btn */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/yun-share-btn")]).then(__webpack_require__.bind(null, /*! @/components/yun-share-btn.vue */ 427))
    },
    yunStorageWarning: function () {
      return __webpack_require__.e(/*! import() | components/yun-storage-warning */ "components/yun-storage-warning").then(__webpack_require__.bind(null, /*! @/components/yun-storage-warning.vue */ 344))
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
  var g0 = !_vm.loading
    ? _vm.productInfo.tags && _vm.productInfo.tags.length > 0
    : null
  var m0 = !_vm.loading ? _vm.getCurrentLayoutIcon() : null
  var l0 =
    !_vm.loading && _vm.currentLayout === "mixed"
      ? _vm.__map(_vm.productInfo.imageUrls, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m1 =
            !_vm.isVideo(item) && !_vm.isPdfFile(item) && !_vm.isPptxFile(item)
          var m2 = m1 ? _vm.buildOssImageUrl(item) : null
          var m3 = m1 ? _vm.buildOssImageUrl(item) : null
          var m4 = m1
            ? !_vm.isVideo(item) &&
              !_vm.isPdfFile(item) &&
              !_vm.isPptxFile(item) &&
              !_vm.loadedImages[index]
            : null
          var m5 = !m1 ? _vm.isVideo(item) : null
          var m6 = !m1 && !m5 ? _vm.isPdfFile(item) : null
          var g1 = !m1 && !m5 && m6 ? item.split("/").pop() : null
          var m7 = !m1 && !m5 && !m6 ? _vm.isPptxFile(item) : null
          var g2 = !m1 && !m5 && !m6 && m7 ? item.split("/").pop() : null
          return {
            $orig: $orig,
            m1: m1,
            m2: m2,
            m3: m3,
            m4: m4,
            m5: m5,
            m6: m6,
            g1: g1,
            m7: m7,
            g2: g2,
          }
        })
      : null
  var l1 =
    !_vm.loading &&
    !(_vm.currentLayout === "mixed") &&
    _vm.currentLayout === "large"
      ? _vm.__map(_vm.productInfo.imageUrls, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m8 =
            !_vm.isVideo(item) && !_vm.isPdfFile(item) && !_vm.isPptxFile(item)
          var m9 = m8 ? _vm.buildOssImageUrl(item) : null
          var m10 = m8 ? _vm.buildOssImageUrl(item) : null
          var m11 = m8
            ? !_vm.isVideo(item) &&
              !_vm.isPdfFile(item) &&
              !_vm.isPptxFile(item) &&
              !_vm.loadedImages[index]
            : null
          var m12 = !m8 ? _vm.isVideo(item) : null
          var m13 = !m8 && !m12 ? _vm.isPdfFile(item) : null
          var g3 = !m8 && !m12 && m13 ? item.split("/").pop() : null
          var m14 = !m8 && !m12 && !m13 ? _vm.isPptxFile(item) : null
          var g4 = !m8 && !m12 && !m13 && m14 ? item.split("/").pop() : null
          return {
            $orig: $orig,
            m8: m8,
            m9: m9,
            m10: m10,
            m11: m11,
            m12: m12,
            m13: m13,
            g3: g3,
            m14: m14,
            g4: g4,
          }
        })
      : null
  var l2 =
    !_vm.loading &&
    !(_vm.currentLayout === "mixed") &&
    !(_vm.currentLayout === "large") &&
    _vm.currentLayout === "small"
      ? _vm.__map(_vm.productInfo.imageUrls, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m15 =
            !_vm.isVideo(item) && !_vm.isPdfFile(item) && !_vm.isPptxFile(item)
          var m16 = m15 ? _vm.buildOssImageUrl(item) : null
          var m17 = m15 ? _vm.buildOssImageUrl(item) : null
          var m18 = m15
            ? !_vm.isVideo(item) &&
              !_vm.isPdfFile(item) &&
              !_vm.isPptxFile(item) &&
              !_vm.loadedImages[index]
            : null
          var m19 = !m15 ? _vm.isVideo(item) : null
          var m20 = !m15 && !m19 ? _vm.isPdfFile(item) : null
          var g5 = !m15 && !m19 && m20 ? item.split("/").pop() : null
          var m21 = !m15 && !m19 && !m20 ? _vm.isPptxFile(item) : null
          var g6 = !m15 && !m19 && !m20 && m21 ? item.split("/").pop() : null
          return {
            $orig: $orig,
            m15: m15,
            m16: m16,
            m17: m17,
            m18: m18,
            m19: m19,
            m20: m20,
            g5: g5,
            m21: m21,
            g6: g6,
          }
        })
      : null
  var l3 =
    !_vm.loading &&
    !(_vm.currentLayout === "mixed") &&
    !(_vm.currentLayout === "large") &&
    !(_vm.currentLayout === "small") &&
    _vm.currentLayout === "long"
      ? _vm.__map(_vm.productInfo.imageUrls, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m22 =
            !_vm.isVideo(item) && !_vm.isPdfFile(item) && !_vm.isPptxFile(item)
          var m23 = m22 ? _vm.buildOssImageUrl(item) : null
          var m24 = m22 ? _vm.buildOssImageUrl(item) : null
          var m25 = m22
            ? !_vm.isVideo(item) &&
              !_vm.isPdfFile(item) &&
              !_vm.isPptxFile(item) &&
              !_vm.loadedImages[index]
            : null
          var m26 = !m22 ? _vm.isVideo(item) : null
          var m27 = !m22 && !m26 ? _vm.isPdfFile(item) : null
          var g7 = !m22 && !m26 && m27 ? item.split("/").pop() : null
          var m28 = !m22 && !m26 && !m27 ? _vm.isPptxFile(item) : null
          var g8 = !m22 && !m26 && !m27 && m28 ? item.split("/").pop() : null
          return {
            $orig: $orig,
            m22: m22,
            m23: m23,
            m24: m24,
            m25: m25,
            m26: m26,
            m27: m27,
            g7: g7,
            m28: m28,
            g8: g8,
          }
        })
      : null
  var g9 = !_vm.loading && _vm.showTagPopup ? _vm.editTagsList.length : null
  var g10 =
    !_vm.loading && _vm.showTagPopup && g9 > 0 ? _vm.editTagsList.length : null
  var g11 = !_vm.loading && _vm.showTagPopup ? _vm.myTags.length : null
  var l4 =
    !_vm.loading && _vm.showTagPopup
      ? _vm.__map(_vm.myTags, function (tag, index) {
          var $orig = _vm.__get_orig(tag)
          var g12 = _vm.editTagsList.some(function (t) {
            return t.tagName === tag.tagName
          })
          return {
            $orig: $orig,
            g12: g12,
          }
        })
      : null
  var g13 =
    !_vm.loading && _vm.showDescPopup ? _vm.editDescriptionText.length : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.showDescPopup = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        m0: m0,
        l0: l0,
        l1: l1,
        l2: l2,
        l3: l3,
        g9: g9,
        g10: g10,
        g11: g11,
        l4: l4,
        g13: g13,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 293:
/*!*******************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 294);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 294:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 40));
var _imageUtil = _interopRequireDefault(__webpack_require__(/*! @/utils/imageUtil.js */ 66));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var portfolioSelect = function portfolioSelect() {
  __webpack_require__.e(/*! require.ensure | components/portfolio-select */ "components/portfolio-select").then((function () {
    return resolve(__webpack_require__(/*! @/components/portfolio-select.vue */ 351));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var TEAM_OPERATE_ROLES = {
  ADD_MEMBER: 'canAddMember',
  ADD_SEATS: 'canAddSeats',
  MANAGE_WORKS: 'canManageWorks',
  MANAGE_COLLECTIONS: 'canManageCollections'
};
var _default = {
  components: {
    portfolioSelect: portfolioSelect
  },
  data: function data() {
    return {
      watermarkText: '',
      user: {
        isVip: false
      },
      ossUrl: _env.default.aliyunUrl,
      productId: '',
      loading: true,
      productInfo: {},
      currentLayout: 'large',
      // 当前布局模式：'mixed'混合布局，'large'大图布局
      loadedImages: [],
      // 跟踪已加载的图片索引
      scrolledToBottom: false,
      // 标记是否滚动到底部
      userId: null,
      isTeamMode: false,
      // 是否为团队模式
      isShareAccess: false,
      // 编辑相关状态
      showTitleEditPopup: false,
      titleEditConfig: {
        title: '编辑标题',
        placeholder: '请输入作品标题',
        value: '',
        type: 'text'
      },
      showTagPopup: false,
      editTagsList: [],
      tagInput: '',
      myTags: [],
      showDescPopup: false,
      editDescriptionText: ''
    };
  },
  computed: {
    isOwner: function isOwner() {
      if (!this.productInfo.userId || !this.userId) {
        return false;
      }
      return this.productInfo.userId == this.userId;
    },
    hideManageActions: function hideManageActions() {
      return this.isShareAccess && !this.isOwner;
    }
  },
  onLoad: function onLoad(options) {
    if (options.id) {
      this.productId = options.id;
      this.isShareAccess = options.fromShare === '1';
      console.log("传参", options.id);
      // 处理团队模式参数
      this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
      if (this.isTeamMode) {
        this.userId = uni.getStorageSync('teamOwnerId');
      } else {
        var _uni$getStorageSync;
        this.userId = (_uni$getStorageSync = uni.getStorageSync('userInfo')) === null || _uni$getStorageSync === void 0 ? void 0 : _uni$getStorageSync.id;
      }
      this.loadProductDetail();
      uni.showShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      });
      setTimeout(function () {
        uni.navigateBack();
      }, 1500);
    }
  },
  onShow: function onShow() {
    var _this = this;
    // 监听来自编辑页面的刷新事件
    uni.$on('refreshWorkDetail', function () {
      _this.loadProductDetail();
    });
  },
  onUnload: function onUnload() {
    // 移除事件监听器，避免内存泄漏
    uni.$off('refreshWorkDetail');
  },
  methods: {
    buildOssImageUrl: _imageUtil.default,
    buildShareImageUrl: function buildShareImageUrl(url) {
      if (!url || typeof url !== 'string') return '';
      var imageUrl = url.trim();
      if (!imageUrl) return '';
      if (/^https?:\/\//.test(imageUrl)) {
        return imageUrl;
      }
      return this.ossUrl + imageUrl.replace(/^\/+/, '');
    },
    getShareImageUrl: function getShareImageUrl() {
      var _this2 = this;
      var imageUrls = Array.isArray(this.productInfo.imageUrls) ? this.productInfo.imageUrls : [];
      var candidates = [this.productInfo.coverUrl].concat((0, _toConsumableArray2.default)(imageUrls));
      var shareImage = candidates.find(function (item) {
        return typeof item === 'string' && item.trim() && !_this2.isVideo(item) && !_this2.isPdfFile(item) && !_this2.isPptxFile(item);
      });
      return this.buildShareImageUrl(shareImage) || '/static/yunyiku/bg.png';
    },
    // 模拟调用接口获取详情数据
    loadProductDetail: function loadProductDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _yield$_this3$$reques, code, data;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.loading = true;
                _context.prev = 1;
                _context.next = 4;
                return _this3.$request.get("/wechat/works/findWorks/".concat(_this3.productId));
              case 4:
                _yield$_this3$$reques = _context.sent;
                code = _yield$_this3$$reques.code;
                data = _yield$_this3$$reques.data;
                if (!data) {
                  _context.next = 13;
                  break;
                }
                _this3.productInfo = _objectSpread(_objectSpread({}, data), {}, {
                  imageUrls: JSON.parse(data.imageUrls),
                  tags: data.tagsList || []
                });
                console.log("productInfo", _this3.productInfo);
                uni.setNavigationBarTitle({
                  title: data.title
                });
                _context.next = 14;
                break;
              case 13:
                throw new Error('商品不存在');
              case 14:
                _context.next = 20;
                break;
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);
                console.error('加载商品详情失败:', _context.t0);
                uni.showToast({
                  title: '加载失败',
                  icon: 'none'
                });
              case 20:
                _context.prev = 20;
                _this3.loading = false;
                return _context.finish(20);
              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 16, 20, 23]]);
      }))();
    },
    // 格式化日期
    formatDate: function formatDate(dateStr) {
      return dateStr;
    },
    // 判断是否为视频文件
    isVideo: function isVideo(url) {
      var videoExtensions = ['.mp4', '.mov', '.avi', '.flv', '.wmv', '.mkv'];
      var lowercaseUrl = url.toLowerCase();
      return videoExtensions.some(function (ext) {
        return lowercaseUrl.endsWith(ext);
      });
    },
    // 判断是否为PDF文件
    isPdfFile: function isPdfFile(url) {
      if (!url || typeof url !== 'string') {
        return false;
      }
      return url.toLowerCase().endsWith('.pdf');
    },
    // 判断是否为PPTX文件
    isPptxFile: function isPptxFile(url) {
      if (!url || typeof url !== 'string') {
        return false;
      }
      return url.toLowerCase().endsWith('.pptx') || url.toLowerCase().endsWith('.ppt');
    },
    refreshWorkDetail: function refreshWorkDetail() {
      console.log('触发作品更新，重新加载详情');
      this.loadProductDetail();
      uni.showToast({
        title: '作品已更新',
        icon: 'success',
        duration: 1500
      });
    },
    // 分享功能
    showShareActions: function showShareActions() {
      var _this4 = this;
      uni.showActionSheet({
        itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
        success: function success(res) {
          switch (res.tapIndex) {
            case 0:
              uni.showToast({
                title: '分享到微信',
                icon: 'none'
              });
              break;
            case 1:
              uni.showToast({
                title: '分享到朋友圈',
                icon: 'none'
              });
              break;
            case 2:
              _this4.copyShareLink();
              break;
          }
        }
      });
    },
    // 复制分享链接
    copyShareLink: function copyShareLink() {
      var shareUrl = "\u4F5C\u54C1\u8BE6\u60C5: ".concat(this.productInfo.title);
      uni.setClipboardData({
        data: shareUrl,
        success: function success() {
          uni.showToast({
            title: '链接已复制',
            icon: 'success'
          });
        }
      });
    },
    // 点击左侧用户区域跳转
    goToAbout: function goToAbout() {
      uni.switchTab({
        url: "/subpkg-library/pages/visitor-home/".concat(this.productInfo)
      });
    },
    // 点击右侧分享
    handleShare: function handleShare() {
      uni.showShareMenu();
      console.log('触发分享');
    },
    // 切换布局
    changeLayout: function changeLayout(layout) {
      this.currentLayout = layout;
      // 提示当前的布局模式
      var modeText = '';
      switch (layout) {
        case 'large':
          modeText = '已切换为大图展示';
          break;
        case 'small':
          modeText = '已切换为小图展示';
          break;
        case 'mixed':
          modeText = '已切换为混合展示';
          break;
        case 'long':
          modeText = '已切换为长图展示';
          break;
      }
      uni.showToast({
        title: modeText,
        icon: 'none',
        duration: 1500
      });
    },
    // 切换到下一个布局
    toggleLayout: function toggleLayout() {
      var layouts = ['large', 'small', 'mixed', 'long'];
      var currentIndex = layouts.indexOf(this.currentLayout);
      var nextIndex = (currentIndex + 1) % layouts.length;
      this.changeLayout(layouts[nextIndex]);
    },
    // 获取当前布局图标
    getCurrentLayoutIcon: function getCurrentLayoutIcon() {
      switch (this.currentLayout) {
        case 'large':
          return '/static/layout/大图.png';
        case 'small':
          return '/static/layout/小图.png';
        case 'mixed':
          return '/static/layout/混合.png';
        case 'long':
          return '/static/layout/长图.png';
        default:
          return '/static/layout/大图.png';
      }
    },
    // 处理图片加载完成
    imageLoaded: function imageLoaded(index) {
      this.$set(this.loadedImages, index, true);
    },
    // 图片预览
    previewImage: function previewImage(current, index) {
      var _this5 = this;
      // 构建完整的媒体URL数组，包括图片和视频
      var urls = this.productInfo.imageUrls.map(function (item) {
        if (_this5.isVideo(item)) {
          return _this5.ossUrl + item;
        } else {
          return _this5.buildOssImageUrl(item);
        }
      });

      // 跳转到新的图片预览页面，传递 productId 参数
      uni.navigateTo({
        url: "/subpkg-others/pages/works-detail/image-preview?urls=".concat(encodeURIComponent(JSON.stringify(urls)), "&index=").concat(index, "&productId=").concat(this.productId, "&isOwner=").concat(this.isOwner)
      });
    },
    // 文档预览
    openDocument: function openDocument(fileUrl) {
      // 显示加载提示
      uni.showLoading({
        title: '加载中...',
        mask: true
      });

      // 构建完整的文档URL
      var fullUrl = this.ossUrl + fileUrl;

      // 下载文件
      uni.downloadFile({
        url: fullUrl,
        success: function success(res) {
          // 隐藏加载提示
          uni.hideLoading();
          if (res.statusCode === 200) {
            // 打开文档
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: function success(res) {
                console.log('文档打开成功');
              },
              fail: function fail(err) {
                console.error('文档打开失败', err);
                uni.showToast({
                  title: '文档打开失败',
                  icon: 'none'
                });
              }
            });
          } else {
            uni.showToast({
              title: '文件下载失败',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          // 隐藏加载提示
          uni.hideLoading();
          console.error('文件下载失败', err);
          uni.showToast({
            title: '文件下载失败',
            icon: 'none'
          });
        }
      });
    },
    // 滚动到底部触发
    onScrollToLower: function onScrollToLower() {
      this.scrolledToBottom = true;
    },
    checkTeamPermissions: function checkTeamPermissions(role) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this6.$request.get('/wechat/basic/hasTeamRight');
              case 3:
                _context2.next = 5;
                return _this6.$request.get('/wechat/basic/hasOperateRight', {
                  role: role
                });
              case 5:
                return _context2.abrupt("return", true);
              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", false);
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    },
    // 编辑标题
    editTitle: function editTitle() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var ok;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this7.isOwner) {
                  _context3.next = 3;
                  break;
                }
                uni.showToast({
                  title: '只有作品所有者可以编辑',
                  icon: 'none'
                });
                return _context3.abrupt("return");
              case 3:
                if (!_this7.isTeamMode) {
                  _context3.next = 9;
                  break;
                }
                _context3.next = 6;
                return _this7.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context3.sent;
                if (ok) {
                  _context3.next = 9;
                  break;
                }
                return _context3.abrupt("return");
              case 9:
                _this7.titleEditConfig = {
                  title: '编辑标题',
                  placeholder: '请输入作品标题',
                  value: _this7.productInfo.title || '',
                  type: 'text'
                };
                _this7.showTitleEditPopup = true;
              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 关闭标题编辑弹窗
    closeTitleEditPopup: function closeTitleEditPopup() {
      this.showTitleEditPopup = false;
    },
    // 保存标题
    handleSaveTitle: function handleSaveTitle(value) {
      if (!value || !value.trim()) {
        uni.showToast({
          title: '标题不能为空',
          icon: 'none'
        });
        return;
      }
      this.updateWork({
        title: value.trim()
      });
      this.showTitleEditPopup = false;
    },
    // 编辑标签
    editTags: function editTags() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var ok;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_this8.isOwner) {
                  _context4.next = 3;
                  break;
                }
                uni.showToast({
                  title: '只有作品所有者可以编辑',
                  icon: 'none'
                });
                return _context4.abrupt("return");
              case 3:
                if (!_this8.isTeamMode) {
                  _context4.next = 9;
                  break;
                }
                _context4.next = 6;
                return _this8.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context4.sent;
                if (ok) {
                  _context4.next = 9;
                  break;
                }
                return _context4.abrupt("return");
              case 9:
                _this8.editTagsList = (0, _toConsumableArray2.default)(_this8.productInfo.tags || []);
                _this8.getUserTags();
                _this8.showTagPopup = true;
              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 关闭标签弹窗
    closeTagPopup: function closeTagPopup() {
      this.showTagPopup = false;
    },
    // 保存标签
    confirmTags: function confirmTags() {
      if (this.tagInput.trim()) {
        this.addTag();
      }
      this.updateWork({
        addTags: this.editTagsList
      });
      this.showTagPopup = false;
    },
    // 添加标签
    addTag: function addTag() {
      var tag = this.tagInput.trim();
      if (!tag) return;
      if (!this.editTagsList.includes(tag)) {
        this.editTagsList.push(tag);
      } else {
        uni.showToast({
          title: '标签已存在',
          icon: 'none'
        });
      }
      this.tagInput = '';
    },
    // 切换标签
    toggleTag: function toggleTag(tag) {
      var index = this.editTagsList.findIndex(function (t) {
        return t.tagName === tag.tagName;
      });
      if (index > -1) {
        this.editTagsList.splice(index, 1);
      } else {
        this.editTagsList.push(tag);
      }
    },
    // 移除标签
    removeTag: function removeTag(index) {
      this.editTagsList.splice(index, 1);
    },
    // 管理标签
    manageTags: function manageTags() {
      uni.navigateTo({
        url: '/subpkg-library/pages/tags/edit'
      });
    },
    // 获取用户标签
    getUserTags: function getUserTags() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var userId, req, _yield$_this9$$reques, data, code;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = uni.getStorageSync("teamOwnerId");
                console.log("userId", uni.getStorageSync("teamOwnerId"));
                req = {
                  userId: _this9.isTeamMode ? uni.getStorageSync("teamOwnerId") : ''
                };
                _context5.next = 5;
                return _this9.$request.get("/wechat/tag/list", req);
              case 5:
                _yield$_this9$$reques = _context5.sent;
                data = _yield$_this9$$reques.data;
                code = _yield$_this9$$reques.code;
                if (code == 200) {
                  _this9.myTags = data;
                }
              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 编辑描述
    editDescription: function editDescription() {
      if (!this.isOwner) {
        uni.showToast({
          title: '只有作品所有者可以编辑',
          icon: 'none'
        });
        return;
      }
      this.editDescriptionText = this.productInfo.description || '';
      this.showDescPopup = true;
    },
    // 保存描述
    saveDescription: function saveDescription() {
      this.updateWork({
        description: this.editDescriptionText
      });
      this.showDescPopup = false;
    },
    // 更新作品
    updateWork: function updateWork(updatedFields) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var params, res;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                uni.showLoading({
                  title: '保存中...',
                  mask: true
                });
                _context6.prev = 1;
                params = {
                  id: _this10.productId,
                  title: _this10.productInfo.title,
                  description: _this10.productInfo.description,
                  coverUrl: _this10.productInfo.coverUrl,
                  images: _this10.productInfo.imageUrls,
                  addTags: _this10.productInfo.tags,
                  workType: _this10.productInfo.workType || 0,
                  teamId: _this10.productInfo.teamId
                }; // 合并更新的字段
                Object.assign(params, updatedFields);
                _context6.next = 6;
                return _this10.$request.put("/wechat/works/editWorks", params);
              case 6:
                res = _context6.sent;
                if (res.code == 200) {
                  uni.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1500
                  });
                  // 刷新作品详情
                  _this10.loadProductDetail();
                } else {
                  uni.showToast({
                    title: res.msg || '修改失败',
                    icon: 'none'
                  });
                }
                _context6.next = 14;
                break;
              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](1);
                console.error('修改作品失败:', _context6.t0);
                uni.showToast({
                  title: '修改失败',
                  icon: 'none'
                });
              case 14:
                _context6.prev = 14;
                uni.hideLoading();
                return _context6.finish(14);
              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 10, 14, 17]]);
      }))();
    }
  },
  // 微信小程序分享功能
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: this.productInfo.title || '我的作品',
      path: "/subpkg-others/pages/works-detail/detail?id=".concat(this.productId, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
      imageUrl: this.getShareImageUrl()
    };
  },
  onShareTimeline: function onShareTimeline() {
    return {
      title: this.productInfo.title || '我的作品',
      query: "id=".concat(this.productId, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
      imageUrl: this.getShareImageUrl()
    };
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 295:
/*!****************************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue?vue&type=style&index=0&id=35730b60&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&id=35730b60&lang=scss&scoped=true& */ 296);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_35730b60_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 296:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-others/pages/works-detail/detail.vue?vue&type=style&index=0&id=35730b60&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[289,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg-others/pages/works-detail/detail.js.map