(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg-library/pages/visitor-home"],{

/***/ 217:
/*!*******************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"subpkg-library%2Fpages%2Fvisitor-home"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _visitorHome = _interopRequireDefault(__webpack_require__(/*! ./subpkg-library/pages/visitor-home.vue */ 218));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_visitorHome.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 218:
/*!************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visitor-home.vue?vue&type=template&id=6f148560&scoped=true& */ 219);
/* harmony import */ var _visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visitor-home.vue?vue&type=script&lang=js& */ 221);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visitor-home.vue?vue&type=style&index=0&id=6f148560&lang=scss&scoped=true& */ 223);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6f148560",
  null,
  false,
  _visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg-library/pages/visitor-home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 219:
/*!*******************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue?vue&type=template&id=6f148560&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./visitor-home.vue?vue&type=template&id=6f148560&scoped=true& */ 220);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_template_id_6f148560_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 220:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue?vue&type=template&id=6f148560&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = !_vm.isTeamMode ? _vm.bannerList.length : null
  var m0 = !_vm.isTeamMode
    ? _vm.resolveUrl(_vm.userInfo.avatar) || "/static/yunyiku/notAVA.png"
    : null
  var g1 = !_vm.isTeamMode
    ? _vm.showcaseLoading && _vm.showcaseList.length === 0
    : null
  var g2 =
    !_vm.isTeamMode && !g1 && !_vm.showcaseLoadError
      ? _vm.showcaseList.length
      : null
  var l0 =
    !_vm.isTeamMode && !g1 && !_vm.showcaseLoadError && !(g2 === 0)
      ? _vm.__map(_vm.showcaseList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m1 = _vm.getShowcaseCoverUrl(item)
          return {
            $orig: $orig,
            m1: m1,
          }
        })
      : null
  var l3 =
    !_vm.isTeamMode && !(_vm.homeCollections.total === 0)
      ? _vm.__map(_vm.homeCollections.data, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g3 = !item.workCoverUrls || item.workCoverUrls.length <= 1
          var m2 = g3
            ? _vm.buildOssImageUrl(
                item.workCoverUrls && item.workCoverUrls.length > 0
                  ? item.workCoverUrls[0]
                  : item.coverUrl
              )
            : null
          var g4 = !g3 ? item.workCoverUrls.length : null
          var l1 =
            !g3 && g4 === 2
              ? _vm.__map(item.workCoverUrls, function (url, imgIndex) {
                  var $orig = _vm.__get_orig(url)
                  var m3 = _vm.buildOssImageUrl(url)
                  return {
                    $orig: $orig,
                    m3: m3,
                  }
                })
              : null
          var l2 =
            !g3 && !(g4 === 2)
              ? _vm.__map(
                  item.workCoverUrls.slice(0, 3),
                  function (url, imgIndex) {
                    var $orig = _vm.__get_orig(url)
                    var m4 = _vm.buildOssImageUrl(url)
                    return {
                      $orig: $orig,
                      m4: m4,
                    }
                  }
                )
              : null
          return {
            $orig: $orig,
            g3: g3,
            m2: m2,
            g4: g4,
            l1: l1,
            l2: l2,
          }
        })
      : null
  var l4 = !(_vm.allWorks.total === 0)
    ? _vm.__map(_vm.allWorks.worksData, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var m5 = _vm.resolveUrl(_vm.getFirstImageUrl(item.imageUrls))
        return {
          $orig: $orig,
          m5: m5,
        }
      })
    : null
  var l7 = !(_vm.collectionData.total === 0)
    ? _vm.__map(_vm.collectionData.data, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var g5 = !item.workCoverUrls || item.workCoverUrls.length <= 1
        var m6 = g5
          ? _vm.buildOssImageUrl(
              item.workCoverUrls && item.workCoverUrls.length > 0
                ? item.workCoverUrls[0]
                : item.coverUrl
            )
          : null
        var g6 = !g5 ? item.workCoverUrls.length : null
        var l5 =
          !g5 && g6 === 2
            ? _vm.__map(item.workCoverUrls, function (url, imgIndex) {
                var $orig = _vm.__get_orig(url)
                var m7 = _vm.buildOssImageUrl(url)
                return {
                  $orig: $orig,
                  m7: m7,
                }
              })
            : null
        var l6 =
          !g5 && !(g6 === 2)
            ? _vm.__map(
                item.workCoverUrls.slice(0, 3),
                function (url, imgIndex) {
                  var $orig = _vm.__get_orig(url)
                  var m8 = _vm.buildOssImageUrl(url)
                  return {
                    $orig: $orig,
                    m8: m8,
                  }
                }
              )
            : null
        var m9 = _vm.getCollectionTagsCount(item)
        return {
          $orig: $orig,
          g5: g5,
          m6: m6,
          g6: g6,
          l5: l5,
          l6: l6,
          m9: m9,
        }
      })
    : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        m0: m0,
        g1: g1,
        g2: g2,
        l0: l0,
        l3: l3,
        l4: l4,
        l7: l7,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 221:
/*!*************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./visitor-home.vue?vue&type=script&lang=js& */ 222);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 222:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _imageUtil = _interopRequireDefault(__webpack_require__(/*! @/utils/imageUtil.js */ 66));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 40));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      ossUrl: _env.default.aliyunUrl,
      currentTab: 0,
      // 0:主页, 1:作品, 2:作品集
      isSingleColumn: false,
      // 控制作品列表单双列
      portfolioLayout: {
        isSingleColumn: false // 控制作品集列表单双列
      },

      isFollowing: false,
      // 是否已关注

      userId: '',
      isTeamMode: false,
      // 是否处于团队模式
      userInfo: {
        nickName: '',
        avatar: '',
        title: '',
        // 职称
        background: ''
      },
      pageNum: 1,
      pageSize: 10,
      // 搜索关键词
      workSearchKeyword: '',
      collectionSearchKeyword: '',
      // Tab 0: 主页推荐
      // homeWork: {
      // 	data: [],
      // 	total: 0
      // },
      homeCollections: {
        data: [],
        total: 0
      },
      showcaseList: [],
      showcaseTotal: 0,
      showcaseLoading: false,
      showcaseLoadError: false,
      // Tab 1: 所有作品
      allWorks: {
        worksData: [],
        total: 0
      },
      // Tab 2: 作品集
      collectionData: {
        data: [],
        total: 0
      },
      progress: 0,
      loading: false,
      stageText: '处理中...',
      taskId: '',
      message: '',
      timer: null,
      shareUrl: '',
      // 新增：作品管理弹窗相关
      showWorkPopup: false,
      currentWorkItem: null,
      // 新增：作品集管理弹窗相关
      showCollectionPopup: false,
      currentCollectionItem: null,
      // 筛选弹窗
      showFilterPopup: false,
      showCollectionFilterPopup: false,
      // 排序状态
      isWorksSorted: false,
      isCollectionsSorted: false
    };
  },
  computed: {
    bannerList: function bannerList() {
      var _this = this;
      var list = this.getBackgroundList(this.userInfo.background);
      if (list.length === 0) {
        return ['https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg.jpg', 'https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg2.jpg'];
      }
      return list.map(function (url) {
        return _this.resolveUrl(url);
      });
    },
    currentIsSingleColumn: function currentIsSingleColumn() {
      if (this.currentTab === 0) {
        // 主页使用主页布局设置
        return this.userInfo.groupSetting && this.userInfo.groupSetting.sort === 0;
      }
    },
    showcaseCount: function showcaseCount() {
      return Number(this.showcaseTotal) || this.showcaseList.length;
    }
  },
  onLoad: function onLoad(options) {
    if (!this.isLoggedIn()) {
      this.showLoginModal();
    }
    if (options.userId) {
      this.userId = options.userId;
      this.isTeamMode = options.isTeamMode == 'true'; // 转换为布尔值
      // 在团队模式下默认选中作品标签
      if (this.isTeamMode) {
        this.currentTab = 1;
      }
      // 获取数据
      this.getVisitorInfo();
      this.getHomeWorkList();
      this.getUserWorksData();
      this.getUserCollections();
      this.addVisitor();
      this.getHomeCollections();
      this.getVisitorShowcases();
    } else {
      uni.showToast({
        title: '用户参数错误',
        icon: 'none'
      });
    }
  },
  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from === 'button') {
      // 主页分享（点击右上角分享按钮）
      if (this.currentTab === 0 && !this.currentWorkItem && !this.currentCollectionItem) {
        // 获取背景图第一张作为封面
        var _bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
        return {
          title: "".concat(this.userInfo.nickName || '用户', "\u7684\u4E3B\u9875"),
          path: "/subpkg-library/pages/visitor-home?userId=".concat(this.userId, "&isTeamMode=").concat(this.isTeamMode),
          imageUrl: _bgImg
        };
      }
      // 作品分享
      if (this.currentWorkItem) {
        var work = this.currentWorkItem;
        return {
          title: work.title || '我的作品',
          path: "/subpkg-others/pages/works-detail/detail?id=".concat(work.id, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
          imageUrl: this.buildOssImageUrl(this.getFirstImageUrl(work.imageUrl))
        };
      }
      // 作品集分享
      if (this.currentCollectionItem) {
        var collection = this.currentCollectionItem;
        // 作品集可能有多张封面，取第一张或默认
        var imgUrl = collection.coverUrl;
        if (collection.workCoverUrls && collection.workCoverUrls.length > 0) {
          imgUrl = collection.workCoverUrls[0];
        }
        return {
          title: collection.name || '我的作品集',
          path: "/subpkg-library/pages/collection/detail?id=".concat(collection.id, "&title=").concat(collection.name || collection.title, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1"),
          imageUrl: this.resolveUrl(imgUrl) || '/static/yunyiku/bg.png'
        };
      }
    }

    // 默认分享整个主页
    var bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
    return {
      title: "".concat(this.userInfo.nickName || '用户', "\u7684\u4E3B\u9875"),
      path: "/subpkg-library/pages/visitor-home?userId=".concat(this.userId, "&isTeamMode=").concat(this.isTeamMode),
      imageUrl: bgImg
    };
  },
  // 分享到朋友圈
  onShareTimeline: function onShareTimeline() {
    // 获取背景图第一张作为封面
    var bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
    return {
      title: "".concat(this.userInfo.nickName || '用户', "\u7684\u4E3B\u9875"),
      query: "userId=".concat(this.userId, "&isTeamMode=").concat(this.isTeamMode),
      imageUrl: bgImg
    };
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
    getHomeCollections: function getHomeCollections() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var userInfo, params, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userInfo = uni.getStorageSync('userInfo') || {};
                params = {
                  pageNum: 1,
                  pageSize: 10,
                  orderBy: 'sort',
                  orderType: 'asc',
                  type: _this2.isTeamMode ? '1' : userInfo && userInfo.groupSetting && userInfo.groupSetting.type || '0',
                  visibility: "1",
                  userId: _this2.userId
                };
                _context.next = 5;
                return _this2.$request.get("/wechat/works/findUserWorksCollectionsPage", params);
              case 5:
                res = _context.sent;
                if (res.code === 200) {
                  _this2.homeCollections.data = res.rows || res.data || [];
                  _this2.homeCollections.total = res.total || _this2.homeCollections.data.length;
                }
                _context.next = 12;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.error('获取主页作品集失败:', _context.t0);
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }))();
    },
    getVisitorShowcases: function getVisitorShowcases() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res, pageData;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!_this3.userId || _this3.isTeamMode || _this3.showcaseLoading)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _this3.showcaseLoading = true;
                _this3.showcaseLoadError = false;
                _context2.prev = 4;
                _context2.next = 7;
                return _this3.$request.get('/wechat/showCase/myShowcase/list', {
                  pageNum: 1,
                  pageSize: 20,
                  status: 1,
                  userId: _this3.userId
                });
              case 7:
                res = _context2.sent;
                pageData = _this3.extractPageData(res);
                _this3.showcaseList = pageData.rows;
                _this3.showcaseTotal = Number(pageData.total) || pageData.rows.length;
                _context2.next = 19;
                break;
              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](4);
                console.error('获取访客橱窗列表失败:', _context2.t0);
                _this3.showcaseList = [];
                _this3.showcaseTotal = 0;
                _this3.showcaseLoadError = true;
              case 19:
                _context2.prev = 19;
                _this3.showcaseLoading = false;
                return _context2.finish(19);
              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 13, 19, 22]]);
      }))();
    },
    extractPageData: function extractPageData(res) {
      var candidates = [res, res && res.data, res && res.data && res.data.data];
      var pageData = candidates.find(function (item) {
        return item && Array.isArray(item.rows);
      });
      if (pageData) {
        return {
          rows: pageData.rows,
          total: pageData.total
        };
      }
      var list = candidates.find(function (item) {
        return Array.isArray(item);
      });
      return {
        rows: list || [],
        total: undefined
      };
    },
    normalizeShowcaseCoverList: function normalizeShowcaseCoverList(value) {
      if (!value) {
        return [];
      }
      if (Array.isArray(value)) {
        return value.filter(Boolean);
      }
      if (typeof value === 'string') {
        var text = value.trim();
        if (!text) {
          return [];
        }
        if (text.startsWith('[') && text.endsWith(']')) {
          try {
            var parsed = JSON.parse(text);
            return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
          } catch (e) {
            return [text];
          }
        }
        return text.split(',').map(function (item) {
          return item.trim();
        }).filter(Boolean);
      }
      return [];
    },
    getShowcaseCoverUrl: function getShowcaseCoverUrl(item) {
      var coverList = this.normalizeShowcaseCoverList(item && item.coverList);
      var fallbackList = this.normalizeShowcaseCoverList(item && item.coverImage);
      var cover = (coverList.length > 0 ? coverList : fallbackList)[0] || '';
      return this.resolveUrl(cover) || '/static/yunyiku/bg.png';
    },
    goToShowcaseDetail: function goToShowcaseDetail(event) {
      var showcaseId = event && event.currentTarget && event.currentTarget.dataset ? event.currentTarget.dataset.id : '';
      if (!showcaseId) {
        uni.showToast({
          title: '橱窗ID不存在',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url: "/subpkg-showcase/pages/detail/index?id=".concat(showcaseId)
      });
    },
    buildOssImageUrl: _imageUtil.default,
    getCollectionTagsCount: function getCollectionTagsCount(item) {
      if (!item) return 0;
      if (typeof item.tagsCount === 'number') return item.tagsCount;
      if (typeof item.tags === 'number') return item.tags;
      if (Array.isArray(item.tags)) return item.tags.length;
      if (typeof item.tags !== 'string') return 0;
      var tags = item.tags.trim();
      if (!tags) return 0;
      if (/^\d+$/.test(tags)) return Number(tags);
      try {
        var parsedTags = JSON.parse(tags);
        if (Array.isArray(parsedTags)) return parsedTags.length;
        if (typeof parsedTags === 'number') return parsedTags;
      } catch (e) {
        return tags.split(',').filter(function (tag) {
          return tag.trim();
        }).length;
      }
      return 0;
    },
    // 解析背景图数据为数组
    getBackgroundList: function getBackgroundList(bg) {
      if (!bg) return [];
      if (Array.isArray(bg)) return bg;
      if (typeof bg === 'string') {
        bg = bg.trim();
        // 尝试解析 JSON 字符串
        if (bg.startsWith('[') && bg.endsWith(']')) {
          try {
            var parsed = JSON.parse(bg);
            if (Array.isArray(parsed)) return parsed;
          } catch (e) {
            console.error('解析背景图JSON失败', e);
          }
        }
        // 兼容逗号分隔
        return bg.split(',').map(function (s) {
          return s.trim();
        }).filter(function (s) {
          return s;
        });
      }
      return [];
    },
    resolveUrl: function resolveUrl(url) {
      if (!url) return '';
      if (/^(http|https|wxfile|data):/.test(url)) {
        return url;
      }
      return this.ossUrl + url;
    },
    addVisitor: function addVisitor() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var currentUser;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                currentUser = uni.getStorageSync('userInfo');
                if (!(currentUser && currentUser.id)) {
                  _context3.next = 8;
                  break;
                }
                if (!(String(currentUser.id) === String(_this4.userId))) {
                  _context3.next = 6;
                  break;
                }
                console.log('自己访问自己，不记录访客记录');
                return _context3.abrupt("return");
              case 6:
                _context3.next = 8;
                return _this4.$request.post('/wechat/visitor', {
                  intervieweeId: _this4.userId,
                  visitorId: currentUser.id
                });
              case 8:
                _context3.next = 13;
                break;
              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                // 静默失败，不打扰用户
                console.error('添加访客记录失败', _context3.t0);
              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }))();
    },
    // 获取访客用户信息
    getVisitorInfo: function getVisitorInfo() {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var res;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _this5.$request.get("/wechat/user/getUserInfo?userId=".concat(_this5.userId));
              case 3:
                res = _context4.sent;
                if (res.code === 200 && res.data) {
                  _this5.userInfo = _objectSpread(_objectSpread(_objectSpread({}, _this5.userInfo), res.data), {}, {
                    avatar: res.data.avatarUrl || res.data.avatar || _this5.userInfo.avatar,
                    background: res.data.homeBackground || res.data.background || ''
                  });

                  // 如果接口返回了昵称，更新标题
                  if (res.data.nickName) {
                    uni.setNavigationBarTitle({
                      title: "".concat(res.data.nickName, "\u7684\u4E3B\u9875")
                    });
                  }
                }
                _context4.next = 10;
                break;
              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                console.error('获取访客信息失败', _context4.t0);
              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }))();
    },
    // 获取用户设为常用的作品列表 (主页推荐)
    getHomeWorkList: function getHomeWorkList() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var workType, _yield$_this6$$reques, code, rows, total;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                workType = _this6.isTeamMode ? '1' : '0';
                _context5.next = 3;
                return _this6.$request.get("/wechat/works/findUserWorksPage?pageNum=1&pageSize=10&status=1&userId=".concat(_this6.userId));
              case 3:
                _yield$_this6$$reques = _context5.sent;
                code = _yield$_this6$$reques.code;
                rows = _yield$_this6$$reques.rows;
                total = _yield$_this6$$reques.total;
                if (code == 200) {
                  // this.homeWork.data = rows
                  // this.homeWork.total = total
                }
              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 获取用户作品列表
    getUserWorksData: function getUserWorksData() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var url, _yield$_this7$$reques, code, rows, total;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = "/wechat/works/findUserWorksPage?pageNum=".concat(_this7.pageNum, "&pageSize=").concat(_this7.pageSize, "&userId=").concat(_this7.userId);
                if (_this7.workSearchKeyword.trim()) {
                  url += "&title=".concat(encodeURIComponent(_this7.workSearchKeyword.trim()));
                }
                _context6.next = 4;
                return _this7.$request.get(url);
              case 4:
                _yield$_this7$$reques = _context6.sent;
                code = _yield$_this7$$reques.code;
                rows = _yield$_this7$$reques.rows;
                total = _yield$_this7$$reques.total;
                if (code == 200) {
                  // 过滤仅自己可见的作品
                  _this7.allWorks.worksData = rows.filter(function (item) {
                    return item.hide == "0";
                  });
                  _this7.allWorks.total = _this7.allWorks.worksData.length;
                }
              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 获取用户的作品集
    getUserCollections: function getUserCollections() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var url, _yield$_this8$$reques, code, rows, total;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = "/wechat/works/findUserWorksCollectionsPage?pageNum=".concat(_this8.pageNum, "&pageSize=").concat(_this8.pageSize, "&type=0&userId=").concat(_this8.userId);
                if (_this8.collectionSearchKeyword.trim()) {
                  url += "&name=".concat(encodeURIComponent(_this8.collectionSearchKeyword.trim()));
                }
                _context7.next = 4;
                return _this8.$request.get(url);
              case 4:
                _yield$_this8$$reques = _context7.sent;
                code = _yield$_this8$$reques.code;
                rows = _yield$_this8$$reques.rows;
                total = _yield$_this8$$reques.total;
                if (code == 200) {
                  _this8.collectionData.data = rows;
                  _this8.collectionData.total = total;
                }
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    toggleFollow: function toggleFollow() {
      this.isFollowing = !this.isFollowing;
      uni.showToast({
        title: this.isFollowing ? '已关注' : '已取消关注',
        icon: 'none'
      });
    },
    changeTab: function changeTab(index) {
      this.currentTab = index;
    },
    handleSwiperChange: function handleSwiperChange(e) {
      var _this9 = this;
      var newTab = e.detail.current;
      // 团队模式下，主页标签（index=0）不存在，自动切换到作品标签（index=1）
      if (this.isTeamMode && newTab === 0) {
        // 先设置为 2，然后再设置为 1，强制 swiper 组件重新渲染
        this.currentTab = 2;
        this.$nextTick(function () {
          _this9.currentTab = 1;
        });
      } else {
        this.currentTab = newTab;
      }
    },
    // 处理列表项点击
    handleItemClick: function handleItemClick(item) {
      this.goToWorkDetail(item);
    },
    goToWorkDetail: function goToWorkDetail(item) {
      uni.navigateTo({
        url: "/subpkg-others/pages/works-detail/detail?id=".concat(item.id, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1")
      });
    },
    goToWorkListDetail: function goToWorkListDetail(item) {
      uni.navigateTo({
        url: "/subpkg-library/pages/collection/detail?id=".concat(item.id, "&title=").concat(item.name || item.title, "&isTeamMode=").concat(this.isTeamMode, "&fromShare=1")
      });
    },
    // 作品管理选项
    showWorkOptions: function showWorkOptions(item) {
      this.currentCollectionItem = null;
      this.currentWorkItem = item;
      this.showWorkPopup = true;
    },
    closeWorkPopup: function closeWorkPopup() {
      this.showWorkPopup = false;
      // 延迟清空，避免弹窗关闭动画时内容消失（可选，视动画效果而定，这里暂不延迟）
      // this.currentWorkItem = null; 
    },
    handleDownloadWork: function handleDownloadWork() {
      var id = this.currentWorkItem.id;
      this.closeWorkPopup();
      this.downloadWorks('work', id);
    },
    handleDownloadCollection: function handleDownloadCollection() {
      var id = this.currentCollectionItem.id;
      this.closeCollectionPopup();
      this.downloadWorks('collection', id);
    },
    // 判断是否是电脑端
    isPC: function isPC() {
      var systemInfo = uni.getSystemInfoSync();
      return systemInfo.platform === 'windows' || systemInfo.platform === 'mac';
    },
    // 判断是否已登录
    isLoggedIn: function isLoggedIn() {
      var token = uni.getStorageSync('token');
      var userInfo = uni.getStorageSync('userInfo');
      return !!token && !!userInfo && !!userInfo.id;
    },
    showLoginModal: function showLoginModal() {
      var _this10 = this;
      uni.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: false,
        confirmText: '去登录',
        success: function success(res) {
          if (res.confirm) {
            var redirectUrl = "/subpkg-library/pages/visitor-home?userId=".concat(_this10.userId, "&isTeamMode=").concat(_this10.isTeamMode);
            uni.setStorageSync('login_redirect', redirectUrl);
            uni.navigateTo({
              url: '/subpkg-others/pages/login/index'
            });
          }
        }
      });
    },
    // 处理压缩包下载
    downloadZip: function downloadZip(resourceType, id) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var userInfo, res;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userInfo = uni.getStorageSync('userInfo') || {};
                uni.showLoading({
                  title: '生成压缩包...',
                  mask: true
                });
                _context8.next = 4;
                return _this11.$request.post('/wechat/basic/downLoadWorksPc', {
                  id: id,
                  resourceType: resourceType,
                  userName: userInfo.nickName || ''
                });
              case 4:
                res = _context8.sent;
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
              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    downloadWorks: function downloadWorks(resourceType, id) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var isPC, isLoggedIn, userInfo, isTeam, res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                // 检查是否是电脑端且已登录
                isPC = _this12.isPC();
                isLoggedIn = _this12.isLoggedIn();
                if (!(isPC && isLoggedIn)) {
                  _context9.next = 6;
                  break;
                }
                // 电脑端且已登录，使用压缩包下载
                _this12.downloadZip(resourceType, id);
                _context9.next = 21;
                break;
              case 6:
                // 移动端或未登录，使用原有的文件下载方式
                userInfo = uni.getStorageSync('userInfo') || {};
                isTeam = userInfo.vipLevel === 'team' || false;
                uni.showLoading({
                  title: '获取文件列表...',
                  mask: true
                });
                _context9.prev = 9;
                _context9.next = 12;
                return _this12.$request.post('/wechat/basic/downLoadWorks', {
                  id: id,
                  resourceType: resourceType,
                  userName: userInfo.nickName || '',
                  teamMode: isTeam
                });
              case 12:
                res = _context9.sent;
                if (res.code === 200 && res.data && res.data.length > 0) {
                  uni.hideLoading();
                  _this12.downloadFiles(res.data);
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: '用户案列暂不支持下载',
                    icon: 'none'
                  });
                }
                _context9.next = 21;
                break;
              case 16:
                _context9.prev = 16;
                _context9.t0 = _context9["catch"](9);
                uni.hideLoading();
                uni.showToast({
                  title: '获取下载内容失败',
                  icon: 'none'
                });
                console.error('获取下载内容失败:', _context9.t0);
              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[9, 16]]);
      }))();
    },
    downloadFiles: function downloadFiles(filePaths) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var totalFiles, downloadedFiles, savedFiles, _loop, i, toastMessage;
        return _regenerator.default.wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this13.progress = 0;
                _this13.stageText = '准备下载...';
                totalFiles = filePaths.length;
                downloadedFiles = 0;
                savedFiles = 0;
                _loop = /*#__PURE__*/_regenerator.default.mark(function _loop(i) {
                  var filePath, fullUrl, fileType, tempFilePath;
                  return _regenerator.default.wrap(function _loop$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          filePath = filePaths[i];
                          fullUrl = _this13.resolveUrl(filePath);
                          fileType = _this13.getFileType(filePath);
                          _context10.prev = 3;
                          _this13.stageText = "\u4E0B\u8F7D\u4E2D (".concat(i + 1, "/").concat(totalFiles, ")");
                          _context10.next = 7;
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
                          tempFilePath = _context10.sent;
                          downloadedFiles++;

                          // 保存到相册（如果是图片或视频）
                          if (!(fileType === 'image' || fileType === 'video')) {
                            _context10.next = 25;
                            break;
                          }
                          _context10.prev = 10;
                          if (!(fileType === 'image')) {
                            _context10.next = 16;
                            break;
                          }
                          _context10.next = 14;
                          return _this13.saveImageToAlbum(tempFilePath);
                        case 14:
                          _context10.next = 19;
                          break;
                        case 16:
                          if (!(fileType === 'video')) {
                            _context10.next = 19;
                            break;
                          }
                          _context10.next = 19;
                          return _this13.saveVideoToAlbum(tempFilePath);
                        case 19:
                          savedFiles++;
                          _context10.next = 25;
                          break;
                        case 22:
                          _context10.prev = 22;
                          _context10.t0 = _context10["catch"](10);
                          console.error("\u4FDD\u5B58\u6587\u4EF6\u5931\u8D25 ".concat(filePath, ":"), _context10.t0);
                          // 继续处理其他文件
                        case 25:
                          _this13.progress = Math.round(downloadedFiles / totalFiles * 100);
                          _context10.next = 31;
                          break;
                        case 28:
                          _context10.prev = 28;
                          _context10.t1 = _context10["catch"](3);
                          console.error("\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25 ".concat(filePath, ":"), _context10.t1);
                          // 继续下载其他文件
                        case 31:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _loop, null, [[3, 28], [10, 22]]);
                });
                i = 0;
              case 7:
                if (!(i < filePaths.length)) {
                  _context11.next = 12;
                  break;
                }
                return _context11.delegateYield(_loop(i), "t0", 9);
              case 9:
                i++;
                _context11.next = 7;
                break;
              case 12:
                _this13.stageText = '下载完成';
                _this13.progress = 100;
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
                  _this13.progress = 0;
                }, 3000);
              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10);
      }))();
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
    // 弹出筛选菜单
    showFilterMenu: function showFilterMenu() {
      this.showFilterPopup = true;
    },
    closeFilterPopup: function closeFilterPopup() {
      this.showFilterPopup = false;
    },
    handleSingleColumn: function handleSingleColumn() {
      this.isSingleColumn = true;
      this.closeFilterPopup();
    },
    handleDoubleColumn: function handleDoubleColumn() {
      this.isSingleColumn = false;
      this.closeFilterPopup();
    },
    handleSortWorkDate: function handleSortWorkDate() {
      this.sortWorksByDate();
      this.closeFilterPopup();
    },
    // 弹出作品集筛选菜单
    showCollectionFilterMenu: function showCollectionFilterMenu() {
      this.showCollectionFilterPopup = true;
    },
    closeCollectionFilterPopup: function closeCollectionFilterPopup() {
      this.showCollectionFilterPopup = false;
    },
    handleCollectionSingleColumn: function handleCollectionSingleColumn() {
      this.portfolioLayout.isSingleColumn = true;
      this.closeCollectionFilterPopup();
    },
    handleCollectionDoubleColumn: function handleCollectionDoubleColumn() {
      this.portfolioLayout.isSingleColumn = false;
      this.closeCollectionFilterPopup();
    },
    handleSortCollectionDate: function handleSortCollectionDate() {
      this.sortCollectionsByDate();
      this.closeCollectionFilterPopup();
    },
    // 作品搜索功能
    searchWorks: function searchWorks() {
      this.pageNum = 1;
      this.getUserWorksData();
    },
    // 作品集搜索功能
    searchCollections: function searchCollections() {
      this.pageNum = 1;
      this.getUserCollections();
    },
    // 作品集排序
    sortCollectionsByDate: function sortCollectionsByDate() {
      if (this.isCollectionsSorted) {
        // 如果已经排序，重新请求数据
        this.isCollectionsSorted = false;
        this.getUserCollections();
        uni.showToast({
          title: '已取消排序',
          icon: 'none'
        });
      } else {
        if (this.collectionData.data.length === 0) {
          uni.showToast({
            title: '暂无作品集可排序',
            icon: 'none'
          });
          return;
        }
        // 按创建时间倒序
        this.collectionData.data.sort(function (a, b) {
          var timeA = new Date(a.createTime).getTime();
          var timeB = new Date(b.createTime).getTime();
          return timeB - timeA;
        });
        this.isCollectionsSorted = true;
        uni.showToast({
          title: '已按时间排序',
          icon: 'none'
        });
      }
    },
    // 作品集管理选项
    showCollectionOptions: function showCollectionOptions(item) {
      this.currentWorkItem = null;
      this.currentCollectionItem = item;
      this.showCollectionPopup = true;
    },
    closeCollectionPopup: function closeCollectionPopup() {
      this.showCollectionPopup = false;
      // this.currentCollectionItem = null;
    },
    shareItem: function shareItem(item) {
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 0,
        href: "http://uniapp.dcloud.io/",
        title: item.title || item.name,
        summary: "我分享了一个作品给你",
        imageUrl: this.resolveUrl(item.coverUrl || item.img),
        success: function success(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function fail(err) {
          console.log("fail:" + JSON.stringify(err));
          uni.showToast({
            title: '触发分享',
            icon: 'none'
          });
        }
      });
    },
    // 按时间排序
    sortWorksByDate: function sortWorksByDate() {
      if (this.isWorksSorted) {
        // 如果已经排序，重新请求数据
        this.isWorksSorted = false;
        this.getUserWorksData();
        uni.showToast({
          title: '已取消排序',
          icon: 'none'
        });
      } else {
        if (this.allWorks.worksData.length === 0) {
          uni.showToast({
            title: '暂无作品可排序',
            icon: 'none'
          });
          return;
        }
        // 按创建时间倒序
        this.allWorks.worksData.sort(function (a, b) {
          var timeA = new Date(a.createTime).getTime();
          var timeB = new Date(b.createTime).getTime();
          return timeB - timeA;
        });
        this.isWorksSorted = true;
        uni.showToast({
          title: '已按时间排序',
          icon: 'none'
        });
      }
    },
    copyWechat: function copyWechat() {
      if (!this.userInfo.wxNumber) {
        uni.showToast({
          title: '未绑定微信号',
          icon: 'none'
        });
        return;
      }
      uni.setClipboardData({
        data: this.userInfo.wxNumber,
        success: function success() {
          uni.showToast({
            title: '微信号已复制',
            icon: 'success'
          });
        }
      });
    },
    makePhoneCall: function makePhoneCall() {
      if (this.userInfo.phone) {
        uni.makePhoneCall({
          phoneNumber: this.userInfo.phone
        });
      } else {
        uni.showToast({
          title: '未绑定手机号',
          icon: 'none'
        });
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 223:
/*!**********************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue?vue&type=style&index=0&id=6f148560&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./visitor-home.vue?vue&type=style&index=0&id=6f148560&lang=scss&scoped=true& */ 224);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_visitor_home_vue_vue_type_style_index_0_id_6f148560_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 224:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-library/pages/visitor-home.vue?vue&type=style&index=0&id=6f148560&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[217,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg-library/pages/visitor-home.js.map