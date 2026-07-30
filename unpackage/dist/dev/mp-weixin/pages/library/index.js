(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/library/index"],{

/***/ 59:
/*!*****************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"pages%2Flibrary%2Findex"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/library/index.vue */ 60));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 60:
/*!**********************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/index.vue ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=462487d5&scoped=true& */ 61);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 63);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=462487d5&lang=scss&scoped=true& */ 67);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "462487d5",
  null,
  false,
  _index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/library/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 61:
/*!*****************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/index.vue?vue&type=template&id=462487d5&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=462487d5&scoped=true& */ 62);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_462487d5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 62:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/index.vue?vue&type=template&id=462487d5&scoped=true& ***!
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
    yunStorageWarning: function () {
      return __webpack_require__.e(/*! import() | components/yun-storage-warning */ "components/yun-storage-warning").then(__webpack_require__.bind(null, /*! @/components/yun-storage-warning.vue */ 343))
    },
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
  var m0 = !_vm.isTeamMode ? _vm.shouldRenderTab(0) && !_vm.isTeamMode : null
  var g0 = !_vm.isTeamMode && m0 ? _vm.bannerList.length : null
  var m1 =
    !_vm.isTeamMode && m0
      ? _vm.resolveUrl(_vm.userInfo.avatar) || "/static/yunyiku/notAVA.png"
      : null
  var g1 =
    !_vm.isTeamMode && m0 && !_vm.isTeamMode && _vm.loggedIn
      ? _vm.showcaseLoading && _vm.showcaseList.length === 0
      : null
  var g2 =
    !_vm.isTeamMode && m0 && !_vm.isTeamMode && _vm.loggedIn && !g1
      ? _vm.showcaseList.length
      : null
  var l0 =
    !_vm.isTeamMode &&
    m0 &&
    !_vm.isTeamMode &&
    _vm.loggedIn &&
    !g1 &&
    !(g2 === 0)
      ? _vm.__map(_vm.showcaseList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m2 = _vm.getShowcaseCoverUrl(item)
          return {
            $orig: $orig,
            m2: m2,
          }
        })
      : null
  var l3 =
    !_vm.isTeamMode &&
    m0 &&
    _vm.homeCollections.data &&
    !(_vm.homeCollections.total === 0)
      ? _vm.__map(_vm.homeCollections.data, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g3 = !item.workCoverUrls || item.workCoverUrls.length <= 1
          var m3 = g3
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
                  var m4 = _vm.buildOssImageUrl(url)
                  return {
                    $orig: $orig,
                    m4: m4,
                  }
                })
              : null
          var l2 =
            !g3 && !(g4 === 2)
              ? _vm.__map(
                  item.workCoverUrls.slice(0, 3),
                  function (url, imgIndex) {
                    var $orig = _vm.__get_orig(url)
                    var m5 = _vm.buildOssImageUrl(url)
                    return {
                      $orig: $orig,
                      m5: m5,
                    }
                  }
                )
              : null
          return {
            $orig: $orig,
            g3: g3,
            m3: m3,
            g4: g4,
            l1: l1,
            l2: l2,
          }
        })
      : null
  var m6 = !_vm.isTeamMode && !m0 ? _vm.shouldRenderTab(0) : null
  var m7 = _vm.shouldRenderTab(1)
  var l4 =
    m7 && !(_vm.allWorks.total === 0)
      ? _vm.__map(_vm.allWorks.worksData, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m8 = !(item.type === "create")
            ? _vm.buildOssImageUrl(_vm.getFirstImageUrl(item.imageUrls))
            : null
          return {
            $orig: $orig,
            m8: m8,
          }
        })
      : null
  var m9 = _vm.shouldRenderTab(2)
  var l7 =
    m9 && !(_vm.collectionData.total == 0)
      ? _vm.__map(_vm.collectionData.data, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g5 = !item.workCoverUrls || item.workCoverUrls.length <= 1
          var m10 = g5
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
                  var m11 = _vm.buildOssImageUrl(url)
                  return {
                    $orig: $orig,
                    m11: m11,
                  }
                })
              : null
          var l6 =
            !g5 && !(g6 === 2)
              ? _vm.__map(
                  item.workCoverUrls.slice(0, 3),
                  function (url, imgIndex) {
                    var $orig = _vm.__get_orig(url)
                    var m12 = _vm.buildOssImageUrl(url)
                    return {
                      $orig: $orig,
                      m12: m12,
                    }
                  }
                )
              : null
          return {
            $orig: $orig,
            g5: g5,
            m10: m10,
            g6: g6,
            l5: l5,
            l6: l6,
          }
        })
      : null
  var m13 = Number(_vm.homeWork.total)
  var m14 = Number(_vm.collectionData.total)
  var g7 = _vm.showBgManagerPopup ? _vm.bgImages.length : null
  var l8 = _vm.showBgManagerPopup
    ? _vm.__map(_vm.bgImageItems, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var m15 = _vm.resolveUrl(item.url)
        return {
          $orig: $orig,
          m15: m15,
        }
      })
    : null
  var g8 = _vm.showBgManagerPopup ? _vm.bgImages.length : null
  if (!_vm._isMounted) {
    _vm.e0 = function () {}
    _vm.e1 = function () {}
    _vm.e2 = function (index) {
      var args = [],
        len = arguments.length - 1
      while (len-- > 0) args[len] = arguments[len + 1]

      var _temp = args[args.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        index = _temp2.index
      var _temp, _temp2
      return _vm.onLongPress(index)
    }
    _vm.e3 = function (e, index) {
      var args = [],
        len = arguments.length - 2
      while (len-- > 0) args[len] = arguments[len + 2]

      var _temp3 = args[args.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        index = _temp4.index
      var _temp3, _temp4
      return _vm.onTouchStart(e, index)
    }
    _vm.e4 = function ($event, index) {
      var _temp5 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        index = _temp6.index
      var _temp5, _temp6
      $event.stopPropagation()
      $event.preventDefault()
      return (function (e) {
        return _vm.onTouchMove(e, index)
      })($event)
    }
    _vm.e5 = function (e, index) {
      var args = [],
        len = arguments.length - 2
      while (len-- > 0) args[len] = arguments[len + 2]

      var _temp7 = args[args.length - 1].currentTarget.dataset,
        _temp8 = _temp7.eventParams || _temp7["event-params"],
        index = _temp8.index
      var _temp7, _temp8
      return _vm.onTouchEnd(e, index)
    }
    _vm.e6 = function ($event) {
      _vm.showUploadTypePopup = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        g0: g0,
        m1: m1,
        g1: g1,
        g2: g2,
        l0: l0,
        l3: l3,
        m6: m6,
        m7: m7,
        l4: l4,
        m9: m9,
        l7: l7,
        m13: m13,
        m14: m14,
        g7: g7,
        l8: l8,
        g8: g8,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 63:
/*!***********************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 64);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 64:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 46));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 48));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 39));
var _imageUtil = _interopRequireDefault(__webpack_require__(/*! @/utils/imageUtil.js */ 65));
var _uploadUtil = __webpack_require__(/*! @/utils/uploadUtil.js */ 66);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var PortfolioSelect = function PortfolioSelect() {
  __webpack_require__.e(/*! require.ensure | components/portfolio-select */ "components/portfolio-select").then((function () {
    return resolve(__webpack_require__(/*! @/components/portfolio-select.vue */ 350));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var createDefaultHomeUserInfo = function createDefaultHomeUserInfo() {
  return {
    avatar: '',
    background: '',
    nickName: '未登录',
    title: '登录后可编辑个人主页',
    groupSetting: {
      titleCn: '作品集',
      titleEn: 'Portfolio',
      sort: 1,
      type: '0'
    }
  };
};
var TEAM_OPERATE_ROLES = {
  ADD_MEMBER: 'canAddMember',
  ADD_SEATS: 'canAddSeats',
  MANAGE_WORKS: 'canManageWorks',
  MANAGE_COLLECTIONS: 'canManageCollections'
};
var _default = {
  components: {
    PortfolioSelect: PortfolioSelect
  },
  data: function data() {
    return {
      systemBarHeight: 0,
      ossUrl: _env.default.aliyunUrl,
      currentTab: 0,
      // 0:主页, 1:作品, 2:作品集
      currentSwiperIndex: 0,
      // 记录swiper组件的当前索引，确保布局状态与显示的内容保持一致
      isSingleColumn: false,
      // 控制作品列表单双列
      portfolioLayout: {
        isSingleColumn: false // 控制作品集列表单双列
      },

      homeLayout: {
        isSingleColumn: false // 主页推荐作品集的布局
      },

      isTeamMode: false,
      // 是否处于团队模式
      isPCDevice: false,
      // 是否为 PC 端
      fromTabBar: false,
      // 是否通过底部tab栏进入
      // 排序状态
      isWorksSorted: false,
      isCollectionsSorted: false,
      loggedIn: false,
      wechatId: 'your_wechat_id',
      phoneNumber: '13800138000',
      pageNum: 1,
      pageSize: 6,
      // 作品分页状态
      worksPageNum: 1,
      worksNoMore: false,
      worksLoadingMore: false,
      // 作品集分页状态
      collectionsPageNum: 1,
      collectionsNoMore: false,
      collectionsLoadingMore: false,
      userInfo: createDefaultHomeUserInfo(),
      // 搜索关键词
      workSearchKeyword: '',
      collectionSearchKeyword: '',
      progress: 0,
      // 进度条
      loading: false,
      // 按钮状态
      stageText: '处理中...',
      // 打包/下载文字
      taskId: '',
      // 后台任务ID
      message: '',
      // 错误或提示
      timer: null,
      // 轮询定时器
      tabChangeTimer: null,
      // 延后处理 tab 切换后的重任务
      scrollRestoreTimer: null,
      // 延后恢复列表滚动位置
      homeInitTimer: null,
      // 首屏主页数据初始化兜底
      shareUrl: '',
      // 用于分享的下载链接
      // 滚动位置保存
      worksScrollTop: 0,
      collectionsScrollTop: 0,
      // 用于强制更新 scroll-top 的值，初始为 null 让 scroll-view 不受控制
      worksScrollTopValue: null,
      collectionsScrollTopValue: null,
      // 下拉刷新状态
      worksRefreshing: false,
      // Tab1 作品列表是否正在刷新
      collectionsRefreshing: false,
      // Tab2 作品集列表是否正在刷新
      // 新增：作品管理弹窗相关
      showWorkPopup: false,
      currentWorkItem: null,
      // 新增：作品集管理弹窗相关
      showCollectionPopup: false,
      currentCollectionItem: null,
      // 筛选弹窗
      showFilterPopup: false,
      showCollectionFilterPopup: false,
      showHomeCollectionPopup: false,
      // 背景图管理弹窗相关
      showBgManagerPopup: false,
      showUploadTypePopup: false,
      bgImages: [],
      // 存放上传的图片路径
      bgImageItems: [],
      // 带唯一ID的图片项数组
      uploadProgress: {},
      // 存储上传进度
      // 拖拽相关状态
      isDragging: false,
      draggingIndex: -1,
      placeholderIndex: -1,
      startPosition: null,
      currentPosition: null,
      originalIndex: -1,
      gridInfo: null,
      // 主页弹窗属性
      showAddPortfolioPopup: false,
      // Tab 0: 主页推荐
      homeCollections: {
        data: [],
        total: 0
      },
      homeCollectionsLoading: false,
      homeCollectionsLoaded: false,
      showcaseList: [],
      showcaseTotal: 0,
      showcaseLoading: false,
      showcaseLoaded: false,
      // Tab 1: 所有作品
      allWorks: {
        worksData: [],
        total: 0
      },
      // 			所有的作品集
      collectionData: {
        data: [],
        total: 0
      },
      // 标题编辑相关
      showTitleEditPopup: false,
      titleEditConfig: {
        title: '',
        placeholder: '',
        value: '',
        type: 'text',
        field: '' // 用于标识编辑哪个字段
      },

      homeWork: {
        data: [],
        total: 0
      },
      // 布局显示
      layoutType: 0,
      selectedPortfolios: [],
      // 切换团队的userId
      teamUserId: 0,
      currentAccountKey: '',
      // 标记是否已经显示了流量不足弹窗
      isFlowWarningShown: false
    };
  },
  computed: {
    swiperCurrentIndex: function swiperCurrentIndex() {
      if (!this.isTeamMode) {
        return this.currentTab;
      }
      return this.currentTab === 2 ? 1 : 0;
    },
    bannerList: function bannerList() {
      var _this = this;
      var list = this.getBackgroundList(this.userInfo.background || '');
      if (list.length === 0) {
        return ['https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg.jpg', 'https://yunyifang-test.oss-cn-beijing.aliyuncs.com/static/bg2.jpg'];
      }
      return list.map(function (url) {
        return _this.resolveUrl(url);
      });
    },
    showcaseCount: function showcaseCount() {
      return Number(this.showcaseTotal) || this.showcaseList.length;
    },
    currentIsSingleColumn: function currentIsSingleColumn() {
      // 使用 currentSwiperIndex 来获取当前实际显示的标签页索引
      // 这样可以确保在滑动过程中布局状态与显示的内容保持一致
      var currentIndex = this.currentSwiperIndex;
      if (currentIndex === 0) {
        return this.userInfo.groupSetting && this.userInfo.groupSetting.sort === 0;
      } else if (currentIndex === 1) {
        return this.isSingleColumn;
      } else if (currentIndex === 2) {
        return this.portfolioLayout.isSingleColumn;
      }
      // 回退到基于currentTab的计算
      if (this.currentTab === 0) {
        return this.userInfo.groupSetting && this.userInfo.groupSetting.sort === 0;
      } else if (this.currentTab === 1) {
        return this.isSingleColumn;
      } else if (this.currentTab === 2) {
        return this.portfolioLayout.isSingleColumn;
      }
      return this.isSingleColumn; // 默认
    },
    filteredPortfolioList: function filteredPortfolioList() {
      return this.collectionData.data.filter(function (item) {
        return item.visibility != "1";
      });
    }
  },
  onLoad: function onLoad(options) {
    var _this2 = this;
    this.loggedIn = this.hasLoginToken();
    this.getSysteminfo();
    // 优先从缓存获取用户信息
    var cachedUserInfo = uni.getStorageSync('userInfo');
    if (this.loggedIn && cachedUserInfo) {
      this.updateUserInfo(cachedUserInfo);
    } else if (!this.loggedIn) {
      this.resetGuestState();
    }
    // 处理分享参数
    if (options.shareUrl) {
      // 解码并保存分享链接
      this.shareUrl = decodeURIComponent(options.shareUrl);
      // 提示用户有分享的下载链接
      uni.showModal({
        title: '分享提示',
        content: '您收到了一个作品压缩包分享，是否需要下载？',
        confirmText: '立即下载',
        cancelText: '稍后再说',
        success: function success(res) {
          if (res.confirm) {
            // 直接调用下载方法
            _this2.downloadZip(_this2.shareUrl);
          }
        }
      });
    }
    // 处理团队模式参数
    if (options.isTeamMode !== undefined) {
      this.isTeamMode = options.isTeamMode === 'true';
    }
  },
  onHide: function onHide() {
    this.saveHomeTab();
    clearTimeout(this.tabChangeTimer);
    clearTimeout(this.scrollRestoreTimer);
    clearTimeout(this.homeInitTimer);
    uni.$off('home-tab-reset');
  },
  onReady: function onReady() {
    this.scheduleCurrentTabInitialLoad(80);
  },
  onShow: function onShow() {
    var _this3 = this;
    // 隐藏原生 TabBar，使用自定义的
    uni.hideTabBar({
      animation: false
    });
    this.loggedIn = this.hasLoginToken();
    // 重置流量警告标记
    this.isFlowWarningShown = false;
    if (this.loggedIn) {
      // 检测是否处于团队模式
      this.checkTeamMode();
    } else {
      this.resetGuestState();
    }
    var accountModeChanged = this.checkAccountContextChanged();
    var needRefreshHomeCollections = uni.getStorageSync('homeCollectionsNeedRefresh');
    if (needRefreshHomeCollections) {
      uni.removeStorageSync('homeCollectionsNeedRefresh');
    }
    uni.$off('home-tab-reset');
    uni.$on('home-tab-reset', function () {
      _this3.checkTeamMode();
      var targetTab = _this3.isTeamMode ? 1 : 0;
      _this3.currentTab = targetTab;
      _this3.currentSwiperIndex = targetTab;
      _this3.saveHomeTab(targetTab);
      if (_this3.loggedIn) {
        _this3.resetAccountScopedData();
        _this3.refreshData();
      }
    });
    if (this.loggedIn && accountModeChanged) {
      var targetTab = this.isTeamMode ? 1 : 0;
      this.currentTab = targetTab;
      this.currentSwiperIndex = targetTab;
      this.saveHomeTab(targetTab);
      this.refreshData();
      return;
    }
    var savedHomeTab = uni.getStorageSync('lastHomeTab');
    uni.removeStorageSync('tabIndex');
    // 从底部 tabbar 切换回来：读取持久化的最后选中 tab
    console.log('onShow else分支, lastHomeTab:', savedHomeTab, 'currentTab:', this.currentTab);
    var restoredTab = this.normalizeHomeTab(savedHomeTab !== undefined && savedHomeTab !== null && savedHomeTab !== '' ? savedHomeTab : this.currentTab);
    this.currentTab = restoredTab;
    this.currentSwiperIndex = restoredTab;
    this.saveHomeTab(restoredTab);
    // 主页 tab 首次进入时，必须确保代表作品集请求已执行
    if (this.loggedIn && restoredTab === 0) {
      this.ensureHomeTabData();
    } else if (this.loggedIn && this.allWorks.worksData.length === 0 && this.collectionData.data.length === 0) {
      this.loadTabData(restoredTab);
    }
    if (this.loggedIn && needRefreshHomeCollections) {
      this.homeCollectionsLoaded = false;
      this.getHomeCollections();
      if (restoredTab === 2) {
        this.getUserCollections();
      }
    }
    this.scheduleCurrentTabInitialLoad(120);
  },
  // 从子页面返回时强制刷新当前 tab 第一页（重置分页和滚动位置）
  forceRefreshCurrentTab: function forceRefreshCurrentTab(index) {
    var _this4 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this4.loggedIn) {
                _context.next = 3;
                break;
              }
              _this4.resetGuestState();
              return _context.abrupt("return");
            case 3:
              _context.next = 5;
              return _this4.fetchUserInfo();
            case 5:
              if (_this4.homeCollectionsLoaded) {
                _context.next = 8;
                break;
              }
              _context.next = 8;
              return _this4.getHomeCollections();
            case 8:
              if (index === 1) {
                _this4.worksScrollTop = 0;
                _this4.worksScrollTopValue = 0;
                if (_this4.isTeamMode) {
                  _this4.getTeamWorksData();
                } else {
                  _this4.getUserWorksData();
                }
              } else if (index === 2) {
                _this4.collectionsScrollTop = 0;
                _this4.collectionsScrollTopValue = 0;
                if (_this4.isTeamMode) {
                  _this4.getTeamCollections();
                } else {
                  _this4.getUserCollections();
                }
              }
              // index === 0 主页：fetchUserInfo 和 getHomeCollections 已在上面调用，无需额外处理
            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // 下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    var _this5 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var dataPromises;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _this5.loggedIn = _this5.hasLoginToken();
              if (_this5.loggedIn) {
                _context2.next = 5;
                break;
              }
              _this5.resetGuestState();
              return _context2.abrupt("return");
            case 5:
              // 重置流量警告标记
              _this5.isFlowWarningShown = false;
              // 重新检测团队模式
              _this5.checkTeamMode();

              // 主动下拉刷新：重置滚动记录，从头开始
              _this5.worksScrollTop = 0;
              _this5.worksScrollTopValue = 0;
              _this5.collectionsScrollTop = 0;
              _this5.collectionsScrollTopValue = 0;

              // 根据团队模式获取对应数据
              dataPromises = [_this5.fetchUserInfo(), _this5.getHomeCollections()];
              if (_this5.isTeamMode) {
                dataPromises.push(_this5.getTeamWorksData());
                dataPromises.push(_this5.getTeamCollections());
              } else {
                dataPromises.push(_this5.getUserWorksData());
                dataPromises.push(_this5.getUserCollections());
              }
              _context2.next = 15;
              return Promise.all(dataPromises);
            case 15:
              _context2.next = 20;
              break;
            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
            case 20:
              _context2.prev = 20;
              uni.stopPullDownRefresh();
              return _context2.finish(20);
            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 17, 20, 23]]);
    }))();
  },
  methods: {
    hasLoginToken: function hasLoginToken() {
      return !!uni.getStorageSync('token');
    },
    normalizeHomeTab: function normalizeHomeTab(tab) {
      var nextTab = Number(tab);
      if (![0, 1, 2].includes(nextTab)) {
        nextTab = this.isTeamMode ? 1 : 0;
      }
      if (this.isTeamMode && nextTab === 0) {
        nextTab = 1;
      }
      return nextTab;
    },
    saveHomeTab: function saveHomeTab() {
      var tab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentTab;
      uni.setStorageSync('lastHomeTab', this.normalizeHomeTab(tab));
    },
    resetGuestState: function resetGuestState() {
      this.loggedIn = false;
      this.isTeamMode = false;
      this.teamUserId = 0;
      this.currentAccountKey = '';
      this.userInfo = createDefaultHomeUserInfo();
      this.homeCollections = {
        data: [],
        total: 0
      };
      this.homeCollectionsLoading = false;
      this.homeCollectionsLoaded = false;
      this.showcaseList = [];
      this.showcaseTotal = 0;
      this.showcaseLoading = false;
      this.showcaseLoaded = false;
      this.allWorks = {
        worksData: [],
        total: 0
      };
      this.collectionData = {
        data: [],
        total: 0
      };
    },
    getAccountContextKey: function getAccountContextKey() {
      var userInfo = uni.getStorageSync('userInfo') || {};
      var teamOwnerId = uni.getStorageSync('teamOwnerId') || '';
      if (this.isTeamMode) {
        return "team:".concat(teamOwnerId);
      }
      return "personal:".concat(userInfo.id || '');
    },
    checkAccountContextChanged: function checkAccountContextChanged() {
      if (!this.loggedIn) {
        this.currentAccountKey = '';
        uni.removeStorageSync('accountModeChanged');
        return false;
      }
      var nextAccountKey = this.getAccountContextKey();
      var hasSwitchFlag = !!uni.getStorageSync('accountModeChanged');
      var hasKeyChanged = !!this.currentAccountKey && this.currentAccountKey !== nextAccountKey;
      this.currentAccountKey = nextAccountKey;
      if (hasSwitchFlag || hasKeyChanged) {
        uni.removeStorageSync('accountModeChanged');
        this.resetAccountScopedData();
        return true;
      }
      return false;
    },
    resetAccountScopedData: function resetAccountScopedData() {
      this.homeCollections = {
        data: [],
        total: 0
      };
      this.homeCollectionsLoading = false;
      this.homeCollectionsLoaded = false;
      this.showcaseList = [];
      this.showcaseTotal = 0;
      this.showcaseLoading = false;
      this.showcaseLoaded = false;
      this.allWorks = {
        worksData: [],
        total: 0
      };
      this.collectionData = {
        data: [],
        total: 0
      };
      this.homeWork = {
        data: [],
        total: 0
      };
      this.worksPageNum = 1;
      this.collectionsPageNum = 1;
      this.worksNoMore = false;
      this.collectionsNoMore = false;
      this.worksLoadingMore = false;
      this.collectionsLoadingMore = false;
      this.worksScrollTop = 0;
      this.collectionsScrollTop = 0;
      this.worksScrollTopValue = 0;
      this.collectionsScrollTopValue = 0;
      this.currentWorkItem = null;
      this.currentCollectionItem = null;
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
    checkTeamMode: function checkTeamMode() {
      if (!this.loggedIn) {
        this.isTeamMode = false;
        this.teamUserId = 0;
        return;
      }
      this.isTeamMode = uni.getStorageSync('isTeamMode') || false;
      this.teamUserId = uni.getStorageSync('teamOwnerId');
    },
    // 检查流量是否足够
    checkFlowStatus: function checkFlowStatus() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var flowRes, flowData, usedFlow, totalFlow, remainingFlow;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _this6.$request.get('/wechat/flow/findUserFlow');
              case 3:
                flowRes = _context3.sent;
                if (flowRes.code === 200 && flowRes.data) {
                  flowData = flowRes.data;
                  usedFlow = flowData.usedFlow || 0;
                  totalFlow = flowData.totalFlow || 0;
                  remainingFlow = totalFlow > usedFlow ? totalFlow - usedFlow : 0; // console.log('remainingFlow', remainingFlow)
                  // 如果流量不足，显示流量不足的弹窗
                  if (remainingFlow <= 0 && !_this6.isFlowWarningShown) {
                    uni.$emit('show-storage-warning', {
                      msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                      data: '/subpkg-profile/pages/storage-management'
                    });
                  }
                }
                _context3.next = 10;
                break;
              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.error('获取流量数据失败:', _context3.t0);
              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    refreshData: function refreshData() {
      if (!this.loggedIn) {
        this.resetGuestState();
        return;
      }
      var storedUserInfo = uni.getStorageSync('userInfo') || {};
      var isTeam = storedUserInfo.vipLevel == 'team' || false;
      if (this.isTeamMode) {
        // 团队模式下获取团队数据
        this.getTeamWorksData();
        this.getTeamCollections();
      } else {
        // 个人模式下获取个人数据
        this.getUserWorksData();
        this.getUserCollections();
        // 当流量不足时 接口返回状态601 不需要额外调用接口判断
        // this.checkFlowStatus();
      }

      this.fetchUserInfo();
      this.getHomeCollections();
      this.getHomeShowcases();
      // 检查流量是否足够
    },
    scheduleCurrentTabInitialLoad: function scheduleCurrentTabInitialLoad() {
      var _this7 = this;
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      clearTimeout(this.homeInitTimer);
      this.homeInitTimer = setTimeout(function () {
        _this7.initCurrentTabData();
      }, delay);
    },
    initCurrentTabData: function initCurrentTabData() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var currentTab;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this8.loggedIn = _this8.hasLoginToken();
                if (_this8.loggedIn) {
                  _context4.next = 4;
                  break;
                }
                _this8.resetGuestState();
                return _context4.abrupt("return");
              case 4:
                _this8.checkTeamMode();
                currentTab = _this8.isTeamMode && Number(_this8.currentTab) === 0 ? 1 : Number(_this8.currentTab || 0);
                _this8.currentTab = currentTab;
                _this8.currentSwiperIndex = currentTab;
                if (!(currentTab === 0)) {
                  _context4.next = 12;
                  break;
                }
                _context4.next = 11;
                return _this8.ensureHomeTabData();
              case 11:
                return _context4.abrupt("return");
              case 12:
                if (!(_this8.allWorks.worksData.length === 0 && _this8.collectionData.data.length === 0)) {
                  _context4.next = 15;
                  break;
                }
                _context4.next = 15;
                return _this8.loadTabData(currentTab);
              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    ensureHomeTabData: function ensureHomeTabData() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!_this9.loggedIn || _this9.isTeamMode)) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                _context5.next = 4;
                return _this9.fetchUserInfo();
              case 4:
                if (_this9.homeCollectionsLoaded) {
                  _context5.next = 7;
                  break;
                }
                _context5.next = 7;
                return _this9.getHomeCollections();
              case 7:
                if (_this9.showcaseLoaded) {
                  _context5.next = 10;
                  break;
                }
                _context5.next = 10;
                return _this9.getHomeShowcases();
              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
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
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var res, data, rows, total;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this10.loggedIn) {
                  _context6.next = 5;
                  break;
                }
                _this10.homeCollections.data = [];
                _this10.homeCollections.total = 0;
                _this10.homeCollectionsLoaded = false;
                return _context6.abrupt("return");
              case 5:
                if (!_this10.homeCollectionsLoading) {
                  _context6.next = 7;
                  break;
                }
                return _context6.abrupt("return");
              case 7:
                _this10.homeCollectionsLoading = true;
                _context6.prev = 8;
                _context6.next = 11;
                return _this10.$request.get("/wechat/works/findUserWorksCollectionsPage?pageNum=1&pageSize=10&orderBy=sort&orderType=asc&type=0&visibility=1");
              case 11:
                res = _context6.sent;
                if (res.code === 200) {
                  data = res.data || {};
                  rows = Array.isArray(res.rows) ? res.rows : Array.isArray(res.data) ? res.data : Array.isArray(data.rows) ? data.rows : Array.isArray(data.list) ? data.list : [];
                  total = res.total !== undefined ? res.total : data.total !== undefined ? data.total : rows.length;
                  _this10.homeCollections.data = rows;
                  _this10.homeCollections.total = Number(total) || rows.length;
                  _this10.homeCollectionsLoaded = true;
                } else if (res.code === 601 && !_this10.isFlowWarningShown) {
                  // 流量不足，显示流量不足弹窗
                  _this10.isFlowWarningShown = true;
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
                _context6.next = 18;
                break;
              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](8);
                console.error('获取主页作品集失败:', _context6.t0);
              case 18:
                _context6.prev = 18;
                _this10.homeCollectionsLoading = false;
                return _context6.finish(18);
              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[8, 15, 18, 21]]);
      }))();
    },
    getHomeShowcases: function getHomeShowcases() {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var res, rows;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!_this11.loggedIn || _this11.isTeamMode)) {
                  _context7.next = 5;
                  break;
                }
                _this11.showcaseList = [];
                _this11.showcaseTotal = 0;
                _this11.showcaseLoaded = false;
                return _context7.abrupt("return");
              case 5:
                if (!_this11.showcaseLoading) {
                  _context7.next = 7;
                  break;
                }
                return _context7.abrupt("return");
              case 7:
                _this11.showcaseLoading = true;
                _context7.prev = 8;
                _context7.next = 11;
                return _this11.$request.get('/wechat/showCase/myShowcase/list', {
                  pageNum: 1,
                  pageSize: 20,
                  status: 1
                });
              case 11:
                res = _context7.sent;
                rows = Array.isArray(res.rows) ? res.rows : [];
                _this11.showcaseList = rows;
                _this11.showcaseTotal = Number(res.total) || rows.length;
                _this11.showcaseLoaded = true;
                _context7.next = 23;
                break;
              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](8);
                console.error('获取橱窗列表失败:', _context7.t0);
                _this11.showcaseList = [];
                _this11.showcaseTotal = 0;
              case 23:
                _context7.prev = 23;
                _this11.showcaseLoading = false;
                return _context7.finish(23);
              case 26:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[8, 18, 23, 26]]);
      }))();
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
        if (text[0] === '[') {
          try {
            var parsed = JSON.parse(text);
            return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
          } catch (e) {
            return [];
          }
        }
        return [text];
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
    // 从主页移除作品集
    removeHome: function removeHome() {
      var _this12 = this;
      uni.showModal({
        title: '提示',
        content: '确定要从主页删除吗？',
        success: function success(res) {
          if (res.confirm) {
            _this12.$request.delete('/wechat/home/delete').then(function (response) {
              if (response.code == 200) {
                uni.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                _this12.showHomeCollectionPopup = false;
                _this12.getHomeCollections();
                _this12.getUserCollections();
              } else {
                uni.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
                _this12.showHomeCollectionPopup = false;
                _this12.getHomeCollections();
                _this12.getUserCollections();
              }
            });
          }
        }
      });
    },
    handlePortfolio: function handlePortfolio() {
      this.saveHomeTab();
      uni.navigateTo({
        url: '/subpkg-library/pages/portfolio-sort/portfolio-sort'
      });
      this.showHomeCollectionPopup = false;
    },
    // 显示中文标题编辑弹窗
    showHomeChinese: function showHomeChinese() {
      this.titleEditConfig = {
        title: '标题(中文)',
        placeholder: '请输入中文标题',
        value: this.userInfo.groupSetting.titleCn,
        type: 'text',
        field: 'chinese'
      };
      this.showTitleEditPopup = true;
      this.showHomeCollectionPopup = false;
    },
    // 显示英文标题编辑弹窗  
    showHomeEnglish: function showHomeEnglish() {
      this.titleEditConfig = {
        title: '标题(英文)',
        placeholder: '请输入英文标题',
        value: this.userInfo.groupSetting.titleEn,
        type: 'text',
        field: 'english'
      };
      this.showTitleEditPopup = true;
      this.showHomeCollectionPopup = false;
    },
    // 关闭标题编辑弹窗
    closeTitleEditPopup: function closeTitleEditPopup() {
      this.showTitleEditPopup = false;
    },
    // 保存标题编辑
    handleSaveTitle: function handleSaveTitle(value) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var requestData, res;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!value || !value.trim())) {
                  _context8.next = 3;
                  break;
                }
                uni.showToast({
                  title: '标题不能为空',
                  icon: 'none'
                });
                return _context8.abrupt("return");
              case 3:
                // 显示加载
                uni.showLoading({
                  title: '保存中...'
                });
                _context8.prev = 4;
                // 1. 更新本地数据
                if (_this13.titleEditConfig.field === 'chinese') {
                  _this13.userInfo.groupSetting.titleCn = value;
                } else if (_this13.titleEditConfig.field === 'english') {
                  _this13.userInfo.groupSetting.titleEn = value;
                }

                // 2. 调用接口保存到后端
                requestData = {
                  titleCn: _this13.userInfo.groupSetting.titleCn,
                  titleEn: _this13.userInfo.groupSetting.titleEn,
                  sort: _this13.layoutType
                };
                _context8.next = 9;
                return _this13.$request.put('/wechat/home/updateSet', requestData);
              case 9:
                res = _context8.sent;
                if (res.code === 200) {
                  // 保存成功
                  uni.hideLoading();
                  _this13.closeTitleEditPopup();
                  _this13.fetchUserInfo();
                  uni.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1500
                  });
                } else {
                  // 保存失败
                  uni.hideLoading();
                  uni.showToast({
                    title: res.msg || '保存失败',
                    icon: 'none'
                  });
                }
                _context8.next = 18;
                break;
              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8["catch"](4);
                console.error('保存标题失败:', _context8.t0);
                uni.hideLoading();
                uni.showToast({
                  title: '网络错误，请稍后重试',
                  icon: 'none'
                });
              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[4, 13]]);
      }))();
    },
    // 请求页面布局设置
    layout: function layout(value) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var params, res;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = {
                  titleCn: _this14.userInfo.groupSetting.titleCn,
                  titleEn: _this14.userInfo.groupSetting.titleEn,
                  sort: value
                };
                _context9.next = 3;
                return _this14.$request.put('/wechat/home/updateSet', params);
              case 3:
                res = _context9.sent;
                if (res.code == 200) {
                  _this14.fetchUserInfo();
                  _this14.getHomeCollections();
                }
              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    addPortfolioLink: function addPortfolioLink() {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var storedUserInfo, isTeam;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (_this15.ensureLoggedIn()) {
                  _context10.next = 2;
                  break;
                }
                return _context10.abrupt("return");
              case 2:
                // 确保有作品集数据
                storedUserInfo = uni.getStorageSync('userInfo') || {};
                isTeam = storedUserInfo.vipLevel == 'team' || false;
                if (_this15.isTeamMode || isTeam) {
                  _this15.getTeamCollections();
                }
                _context10.next = 7;
                return _this15.getUserCollections();
              case 7:
                _this15.showAddPortfolioPopup = true;
              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    // 保存作品集选择
    handleSavePortfolios: function handleSavePortfolios(selectedIds) {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var res;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                // console.log('selectedIds', selectedIds)
                uni.showLoading({
                  title: '保存中...'
                });
                _context11.prev = 1;
                _context11.next = 4;
                return _this16.$request.put('/wechat/home/setTop', {
                  worksCollectionsIds: selectedIds,
                  isTop: "1"
                });
              case 4:
                res = _context11.sent;
                if (res.code === 200) {
                  uni.showToast({
                    title: '保存成功',
                    icon: 'success'
                  });
                  _this16.closeAddPortfolioPopup();

                  // 重新获取主页作品集显示
                  _this16.getHomeCollections();
                } else {
                  uni.showToast({
                    title: res.msg || '保存失败',
                    icon: 'none'
                  });
                }
                _context11.next = 12;
                break;
              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](1);
                console.error('保存失败:', _context11.t0);
                uni.showToast({
                  title: '保存失败，请稍后重试',
                  icon: 'none'
                });
              case 12:
                _context11.prev = 12;
                uni.hideLoading();
                return _context11.finish(12);
              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 8, 12, 15]]);
      }))();
    },
    // 关闭弹窗
    closeAddPortfolioPopup: function closeAddPortfolioPopup() {
      this.showAddPortfolioPopup = false;
      this.selectedPortfolios = [];
    },
    buildOssImageUrl: _imageUtil.default,
    getCollectionTagsCount: function getCollectionTagsCount(item) {
      if (!item) return 0;
      if (typeof item.tagsCount === 'number') {
        return item.tagsCount;
      }
      if (typeof item.tags === 'number') {
        return item.tags;
      }
      if (Array.isArray(item.tags)) {
        return item.tags.length;
      }
      if (typeof item.tags !== 'string') {
        return 0;
      }
      var tags = item.tags.trim();
      if (!tags) {
        return 0;
      }
      if (/^\d+$/.test(tags)) {
        return Number(tags);
      }
      try {
        var parsedTags = JSON.parse(tags);
        if (Array.isArray(parsedTags)) {
          return parsedTags.length;
        }
        if (typeof parsedTags === 'number') {
          return parsedTags;
        }
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
    // 获取系统栏高度
    getSysteminfo: function getSysteminfo() {
      var _this17 = this;
      // uni.getSystemInfo({
      // 	success: res => {
      // 		this.systemBarHeight = res.statusBarHeight;
      // 		// 检测是否为 PC 端
      // 		this.isPC = res.platform === 'devtools' || res.deviceType === 'pc';
      // 	}
      // });
      uni.getSystemInfo({
        success: function success(res) {
          _this17.systemBarHeight = res.statusBarHeight;
          // 检测是否为 PC 端
          _this17.isPCDevice = res.platform === 'devtools' || res.platform === 'windows' || res.platform === 'mac';
        }
      });
    },
    // 更改背景图 - 打开管理弹窗
    changeBackground: function changeBackground() {
      if (!this.ensureLoggedIn()) {
        return;
      }
      if (this.isTeamMode) {
        return;
      }
      this.openBgManager();
    },
    openBgManager: function openBgManager() {
      var _this18 = this;
      this.showBgManagerPopup = true;
      // 初始化数据
      this.bgImages = this.getBackgroundList(this.userInfo.background);
      this.bgImageItems = this.bgImages.map(function (url, index) {
        return {
          id: "bg_".concat(Date.now(), "_").concat(index),
          url: url,
          status: 'completed'
        };
      });
      this.$nextTick(function () {
        _this18.initGridInfo();
      });
    },
    closeBgManager: function closeBgManager() {
      this.showBgManagerPopup = false;
      this.resetDragState();
    },
    saveBgManager: function saveBgManager() {
      var _this19 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var newBackground;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!_this19.bgImageItems.some(function (item) {
                  return item.status === 'uploading';
                })) {
                  _context12.next = 3;
                  break;
                }
                uni.showToast({
                  title: '图片正在上传中，请稍后',
                  icon: 'none'
                });
                return _context12.abrupt("return");
              case 3:
                if (_this19.bgImages.length === 0) {
                  // 如果没有图片，可能需要确认是否清空，或者设置默认图
                  // 这里假设允许为空，或者你可以保留最后一张不让删
                }

                // 后端接收 List<String>，直接传递数组
                newBackground = _this19.bgImages;
                uni.showLoading({
                  title: '保存中...'
                });
                _context12.prev = 6;
                _context12.next = 9;
                return _this19.updateUserBackground(newBackground);
              case 9:
                _this19.showBgManagerPopup = false;
                uni.showToast({
                  title: '背景更新成功',
                  icon: 'success'
                });
                _context12.next = 16;
                break;
              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12["catch"](6);
                uni.showToast({
                  title: '保存失败',
                  icon: 'none'
                });
              case 16:
                _context12.prev = 16;
                uni.hideLoading();
                return _context12.finish(16);
              case 19:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[6, 13, 16, 19]]);
      }))();
    },
    openUploadType: function openUploadType() {
      if (this.bgImages.length >= 5) {
        uni.showToast({
          title: '最多上传5张背景图',
          icon: 'none'
        });
        return;
      }
      this.showUploadTypePopup = true;
    },
    chooseBgImage: function chooseBgImage(type) {
      var _this20 = this;
      this.showUploadTypePopup = false;
      var allowedExtensions = ['jpg', 'jpeg', 'png'];
      var successHandler = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(res) {
          var files, _iterator, _step, _loop, _ret;
          return _regenerator.default.wrap(function _callee13$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  // 处理选中的文件
                  files = [];
                  if (type === 'album') {
                    files = res.tempFiles.map(function (f) {
                      return f.tempFilePath;
                    });
                  } else {
                    // 微信聊天记录
                    files = res.tempFiles.map(function (f) {
                      return f.path;
                    });
                  }
                  _iterator = _createForOfIteratorHelper(files);
                  _context14.prev = 3;
                  _loop = /*#__PURE__*/_regenerator.default.mark(function _loop() {
                    var filePath, ext, uniqueId, formData, result, idx, bgIdx, _idx, _idx2;
                    return _regenerator.default.wrap(function _loop$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            filePath = _step.value;
                            ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
                            if (allowedExtensions.includes(ext)) {
                              _context13.next = 5;
                              break;
                            }
                            uni.showToast({
                              title: '不支持的文件格式',
                              icon: 'none'
                            });
                            return _context13.abrupt("return", "continue");
                          case 5:
                            // 添加到列表（临时）
                            uniqueId = "bg_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
                            _this20.bgImages.push(filePath);
                            _this20.bgImageItems.push({
                              id: uniqueId,
                              url: filePath,
                              status: 'uploading',
                              tempUrl: filePath
                            });
                            _this20.$set(_this20.uploadProgress, filePath, 0);
                            _context13.prev = 9;
                            formData = {
                              isVerify: "true"
                            };
                            _context13.next = 13;
                            return (0, _uploadUtil.uploadFile)({
                              url: _env.default.baseUrl + "/wechat/basic/upload",
                              filePath: filePath,
                              name: "file",
                              formData: formData,
                              onProgressUpdate: function onProgressUpdate(progress) {
                                _this20.$set(_this20.uploadProgress, filePath, progress.progress);
                              }
                            });
                          case 13:
                            result = _context13.sent;
                            if (result.code == 200) {
                              // 更新为真实URL
                              idx = _this20.bgImageItems.findIndex(function (item) {
                                return item.id === uniqueId;
                              });
                              if (idx !== -1) {
                                _this20.bgImageItems[idx].url = result.msg;
                                _this20.bgImageItems[idx].status = 'completed';
                                // Sync bgImages: 确保使用更新后的url（服务端路径）
                                bgIdx = _this20.bgImages.indexOf(filePath);
                                if (bgIdx !== -1) {
                                  _this20.bgImages[bgIdx] = result.msg;
                                }
                              }
                              _this20.$delete(_this20.uploadProgress, filePath);
                            } else {
                              // 失败处理
                              _idx = _this20.bgImageItems.findIndex(function (item) {
                                return item.id === uniqueId;
                              });
                              if (_idx !== -1) {
                                _this20.bgImageItems.splice(_idx, 1);
                                _this20.bgImages = _this20.bgImageItems.map(function (i) {
                                  return i.url;
                                });
                              }
                              _this20.$delete(_this20.uploadProgress, filePath);
                              uni.showToast({
                                title: '上传失败',
                                icon: 'none'
                              });
                            }
                            _context13.next = 24;
                            break;
                          case 17:
                            _context13.prev = 17;
                            _context13.t0 = _context13["catch"](9);
                            console.error(_context13.t0);
                            _idx2 = _this20.bgImageItems.findIndex(function (item) {
                              return item.id === uniqueId;
                            });
                            if (_idx2 !== -1) {
                              _this20.bgImageItems.splice(_idx2, 1);
                              _this20.bgImages = _this20.bgImageItems.map(function (i) {
                                return i.url;
                              });
                            }
                            _this20.$delete(_this20.uploadProgress, filePath);
                            uni.showToast({
                              title: '上传失败',
                              icon: 'none'
                            });
                          case 24:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _loop, null, [[9, 17]]);
                  });
                  _iterator.s();
                case 6:
                  if ((_step = _iterator.n()).done) {
                    _context14.next = 13;
                    break;
                  }
                  return _context14.delegateYield(_loop(), "t0", 8);
                case 8:
                  _ret = _context14.t0;
                  if (!(_ret === "continue")) {
                    _context14.next = 11;
                    break;
                  }
                  return _context14.abrupt("continue", 11);
                case 11:
                  _context14.next = 6;
                  break;
                case 13:
                  _context14.next = 18;
                  break;
                case 15:
                  _context14.prev = 15;
                  _context14.t1 = _context14["catch"](3);
                  _iterator.e(_context14.t1);
                case 18:
                  _context14.prev = 18;
                  _iterator.f();
                  return _context14.finish(18);
                case 21:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee13, null, [[3, 15, 18, 21]]);
        }));
        return function successHandler(_x) {
          return _ref.apply(this, arguments);
        };
      }();
      if (type === 'album') {
        uni.chooseMedia({
          count: 5 - this.bgImages.length,
          mediaType: ['image'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            return successHandler(res);
          }
        });
      } else if (type === 'chat') {
        wx.chooseMessageFile({
          count: 5 - this.bgImages.length,
          type: 'image',
          success: function success(res) {
            return successHandler(res);
          },
          fail: console.error
        });
      }
    },
    deleteBgImage: function deleteBgImage(index) {
      this.bgImages.splice(index, 1);
      this.bgImageItems.splice(index, 1);
    },
    // 拖拽相关方法
    initGridInfo: function initGridInfo() {
      var _this21 = this;
      var query = uni.createSelectorQuery().in(this);
      query.select('.bg-image-grid').boundingClientRect(function (data) {
        if (data) {
          // 假设是3列，计算itemSize
          // 这里的计算方式需要和CSS保持一致
          // padding 20rpx, gap 12rpx
          // totalWidth = data.width
          // itemSize = (totalWidth - 2*padding - 2*gap) / 3
          // padding=20rpx approx 10px? No, depends on screen.
          // simpler: itemSize = width of first item
          _this21.imageGridRect = data;
        }
      }).exec();
      query.select('.bg-image-item').boundingClientRect(function (data) {
        if (data) {
          // 如果有多个，data可能是数组（如果使用selectAll），但select只返回第一个
          _this21.itemSize = data.width; // 假设正方形
          _this21.gridInfo = {
            itemSize: data.width,
            gap: (_this21.imageGridRect.width - 40 / 750 * uni.getWindowInfo().windowWidth - 3 * data.width) / 2 // 估算gap，或者直接读取
            // 更好的方式是硬编码gap值，因为CSS里写死了
          };
          // 重新计算精确的gap
          // CSS: gap: 12rpx -> 6px (approx)
          // padding: 20rpx -> 10px
          var rpxToPx = uni.getWindowInfo().windowWidth / 750;
          _this21.gridInfo = {
            itemSize: data.width,
            gap: 12 * rpxToPx,
            padding: 20 * rpxToPx
          };
        }
      }).exec();
    },
    onLongPress: function onLongPress(index) {
      var _this22 = this;
      if (this.draggingIndex !== -1) {
        this.resetDragState();
        return;
      }
      // 确保gridInfo已初始化
      if (!this.gridInfo || !this.gridInfo.itemSize) {
        // 尝试再次初始化
        var rpxToPx = uni.getWindowInfo().windowWidth / 750;
        var query = uni.createSelectorQuery().in(this);
        query.select('.bg-image-item').boundingClientRect(function (data) {
          if (data) {
            _this22.gridInfo = {
              itemSize: data.width,
              gap: 12 * rpxToPx,
              padding: 20 * rpxToPx
            };
            _this22.startDrag(index);
          }
        }).exec();
        return;
      }
      this.startDrag(index);
    },
    startDrag: function startDrag(index) {
      this.isDragging = true;
      this.draggingIndex = index;
      this.placeholderIndex = index;
      this.originalIndex = index;
      uni.vibrateShort();
    },
    onTouchStart: function onTouchStart(e, index) {
      if (e.touches.length > 1) return;
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
    onTouchMove: function onTouchMove(e, index) {
      if (this.draggingIndex === -1 || this.draggingIndex !== index) return;
      var touch = e.touches[0];
      this.currentPosition = {
        x: touch.pageX,
        y: touch.pageY
      };
      if (!this.gridInfo) return;
      var deltaX = this.currentPosition.x - this.startPosition.x;
      var deltaY = this.currentPosition.y - this.startPosition.y;

      // 计算原始位置 (row, col)
      var originRow = Math.floor(this.originalIndex / 3);
      var originCol = this.originalIndex % 3;
      var originLeft = originCol * (this.gridInfo.itemSize + this.gridInfo.gap);
      var originTop = originRow * (this.gridInfo.itemSize + this.gridInfo.gap);

      // 当前中心点
      var currentCenterX = originLeft + deltaX + this.gridInfo.itemSize / 2;
      var currentCenterY = originTop + deltaY + this.gridInfo.itemSize / 2;

      // 计算新的行列
      var col = Math.floor(currentCenterX / (this.gridInfo.itemSize + this.gridInfo.gap));
      var row = Math.floor(currentCenterY / (this.gridInfo.itemSize + this.gridInfo.gap));
      col = Math.max(0, Math.min(col, 2));
      row = Math.max(0, row); // 限制row >= 0，上限取决于图片数量

      var targetIndex = row * 3 + col;
      var maxIndex = this.bgImageItems.length - 1;
      targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
      if (targetIndex !== this.placeholderIndex) {
        this.placeholderIndex = targetIndex;
        uni.vibrateShort();
      }
    },
    onTouchEnd: function onTouchEnd(e, index) {
      if (this.draggingIndex === index) {
        if (this.originalIndex !== this.placeholderIndex && this.placeholderIndex !== -1) {
          // 交换位置
          var tempItems = (0, _toConsumableArray2.default)(this.bgImageItems);
          var tempImages = (0, _toConsumableArray2.default)(this.bgImages);
          var item = tempItems[this.originalIndex];
          var img = tempImages[this.originalIndex];

          // 移除旧位置
          tempItems.splice(this.originalIndex, 1);
          tempImages.splice(this.originalIndex, 1);

          // 插入新位置
          tempItems.splice(this.placeholderIndex, 0, item);
          tempImages.splice(this.placeholderIndex, 0, img);
          this.bgImageItems = tempItems;
          this.bgImages = tempImages;
        }
        this.resetDragState();
      }
    },
    resetDragState: function resetDragState() {
      this.draggingIndex = -1;
      this.startPosition = null;
      this.currentPosition = null;
      this.isDragging = false;
      this.originalIndex = -1;
      this.placeholderIndex = -1;
    },
    // 更新用户背景图字段
    updateUserBackground: function updateUserBackground(backgroundList) {
      var _this23 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var queryString, res;
        return _regenerator.default.wrap(function _callee14$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                // 后端接收 List<String> 形式的 homeBackground
                // 注意：后端使用了 @RequestParam，所以参数需要拼接到 URL 上
                // 对于 List<String>，Spring MVC 默认支持 ?background=url1&background=url2 的形式
                // 或者逗号分隔 ?background=url1,url2
                queryString = backgroundList.map(function (url) {
                  return "background=".concat(encodeURIComponent(url));
                }).join('&'); // 发送请求
                _context15.next = 4;
                return _this23.$request.put("/wechat/user/editUserBackground?".concat(queryString));
              case 4:
                res = _context15.sent;
                if (res.code === 200) {
                  uni.showToast({
                    title: '背景更新成功',
                    icon: 'success'
                  });
                  // 刷新用户信息
                  _this23.fetchUserInfo();
                } else {
                  uni.showToast({
                    title: res.msg || '更新失败',
                    icon: 'none'
                  });
                }
                _context15.next = 11;
                break;
              case 8:
                _context15.prev = 8;
                _context15.t0 = _context15["catch"](0);
                uni.showToast({
                  title: '网络错误',
                  icon: 'none'
                });
              case 11:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee14, null, [[0, 8]]);
      }))();
    },
    goToEditProfile: function goToEditProfile() {
      if (!this.ensureLoggedIn('/subpkg-profile/pages/edit')) {
        return;
      }
      if (this.isTeamMode) {
        return;
      }
      this.saveHomeTab();
      uni.navigateTo({
        url: '/subpkg-profile/pages/edit'
      });
    },
    updateUserInfo: function updateUserInfo(data) {
      this.userInfo = _objectSpread(_objectSpread(_objectSpread({}, this.userInfo), data), {}, {
        // 兼容处理：优先使用 avatarUrl/homeBackground，如果没有则回退到 avatar/background
        avatar: data.avatarUrl || data.avatar || '',
        background: data.homeBackground || data.background || ''
      });
    },
    resolveUrl: function resolveUrl(url) {
      if (!url) return '';
      if (/^(http|https|wxfile|data):/.test(url)) {
        return url;
      }
      return this.ossUrl + url;
    },
    // 获取最新用户信息并更新缓存
    fetchUserInfo: function fetchUserInfo() {
      var _this24 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var teamOwnerId, url, res, oldUserInfo, newUserInfo;
        return _regenerator.default.wrap(function _callee15$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (_this24.loggedIn) {
                  _context16.next = 3;
                  break;
                }
                _this24.userInfo = createDefaultHomeUserInfo();
                return _context16.abrupt("return");
              case 3:
                _context16.prev = 3;
                teamOwnerId = uni.getStorageSync('teamOwnerId');
                url = '/wechat/user/getUserInfo';
                if (_this24.isTeamMode && teamOwnerId) {
                  url += "?userId=".concat(teamOwnerId);
                }
                _context16.next = 9;
                return _this24.$request.get(url);
              case 9:
                res = _context16.sent;
                if (!(res.code === 200 && res.data)) {
                  _context16.next = 21;
                  break;
                }
                if (!(_this24.isTeamMode && teamOwnerId)) {
                  _context16.next = 14;
                  break;
                }
                _this24.updateUserInfo(res.data);
                return _context16.abrupt("return");
              case 14:
                // 更新本地 userInfo，保留 token
                oldUserInfo = uni.getStorageSync('userInfo') || {};
                newUserInfo = _objectSpread(_objectSpread({}, oldUserInfo), res.data);
                if (res.data.groupSetting) {
                  // 将数据库中的 sort 值映射到布局
                  // sort 0: 单列，1: 双列
                  _this24.homeLayout.isSingleColumn = res.data.groupSetting.sort === 0;
                  // 保存当前的布局类型
                  _this24.layoutType = res.data.groupSetting.sort || 0;
                }
                uni.setStorageSync('userInfo', newUserInfo);
                _this24.updateUserInfo(newUserInfo);
                _context16.next = 22;
                break;
              case 21:
                if (res.code === 601 && !_this24.isFlowWarningShown) {
                  // 流量不足，显示流量不足弹窗
                  _this24.isFlowWarningShown = true;
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
              case 22:
                _context16.next = 27;
                break;
              case 24:
                _context16.prev = 24;
                _context16.t0 = _context16["catch"](3);
                console.error('刷新用户信息失败', _context16.t0);
              case 27:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee15, null, [[3, 24]]);
      }))();
    },
    // 获取用户设为常用的作品列表
    getHomeWorkList: function getHomeWorkList() {
      var _this25 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var _yield$_this25$$reque, code, rows, total;
        return _regenerator.default.wrap(function _callee16$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return _this25.$request.get("/wechat/works/findUserWorksPage?pageNum=".concat(_this25.pageNum, "&pageSize=").concat(_this25.pageSize, "&status=1"));
              case 2:
                _yield$_this25$$reque = _context17.sent;
                code = _yield$_this25$$reque.code;
                rows = _yield$_this25$$reque.rows;
                total = _yield$_this25$$reque.total;
                if (code == 200) {
                  _this25.homeWork.data = rows;
                  _this25.homeWork.total = total;
                } else if (code === 601 && !_this25.isFlowWarningShown) {
                  // 流量不足，显示流量不足弹窗
                  _this25.isFlowWarningShown = true;
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
              case 7:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee16);
      }))();
    },
    // 获取用户作品列表
    getUserWorksData: function getUserWorksData() {
      var _arguments = arguments,
        _this26 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var isLoadMore, url, _yield$_this26$$reque, code, rows, total;
        return _regenerator.default.wrap(function _callee17$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                isLoadMore = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;
                if (_this26.loggedIn) {
                  _context18.next = 7;
                  break;
                }
                _this26.allWorks.worksData = [];
                _this26.allWorks.total = 0;
                _this26.worksLoadingMore = false;
                _this26.worksNoMore = false;
                return _context18.abrupt("return");
              case 7:
                if (!isLoadMore) {
                  _context18.next = 14;
                  break;
                }
                if (!(_this26.worksNoMore || _this26.worksLoadingMore)) {
                  _context18.next = 10;
                  break;
                }
                return _context18.abrupt("return");
              case 10:
                _this26.worksLoadingMore = true;
                _this26.worksPageNum++;
                _context18.next = 16;
                break;
              case 14:
                _this26.worksPageNum = 1;
                _this26.worksNoMore = false;
              case 16:
                // 构建请求参数，包含搜索关键词
                url = "/wechat/works/findUserWorksPage?pageNum=".concat(_this26.worksPageNum, "&pageSize=").concat(_this26.pageSize);
                if (_this26.workSearchKeyword.trim()) {
                  url += "&title=".concat(encodeURIComponent(_this26.workSearchKeyword.trim()));
                }
                _context18.next = 20;
                return _this26.$request.get(url);
              case 20:
                _yield$_this26$$reque = _context18.sent;
                code = _yield$_this26$$reque.code;
                rows = _yield$_this26$$reque.rows;
                total = _yield$_this26$$reque.total;
                if (code == 200) {
                  if (isLoadMore) {
                    _this26.allWorks.worksData = _this26.allWorks.worksData.concat(rows);
                  } else {
                    _this26.allWorks.worksData = rows;
                  }
                  _this26.allWorks.total = total;
                  // 判断是否已加载全部
                  if (_this26.allWorks.worksData.length >= total || rows.length < _this26.pageSize) {
                    _this26.worksNoMore = true;
                  }
                } else if (code === 601) {
                  // 流量不足，显示流量不足弹窗
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
                _this26.worksLoadingMore = false;
              case 26:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee17);
      }))();
    },
    // 检查团队权限
    checkTeamPermissions: function checkTeamPermissions(role) {
      var _this27 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        return _regenerator.default.wrap(function _callee18$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (_this27.loggedIn) {
                  _context19.next = 2;
                  break;
                }
                return _context19.abrupt("return", false);
              case 2:
                _context19.prev = 2;
                _context19.next = 5;
                return _this27.$request.get('/wechat/basic/hasTeamRight');
              case 5:
                _context19.next = 7;
                return _this27.$request.get('/wechat/basic/hasOperateRight', {
                  role: role
                });
              case 7:
                return _context19.abrupt("return", true);
              case 10:
                _context19.prev = 10;
                _context19.t0 = _context19["catch"](2);
                return _context19.abrupt("return", false);
              case 13:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee18, null, [[2, 10]]);
      }))();
    },
    // 获取用户的作品集
    getUserCollections: function getUserCollections() {
      var _arguments2 = arguments,
        _this28 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19() {
        var isLoadMore, url, _yield$_this28$$reque, code, rows, total;
        return _regenerator.default.wrap(function _callee19$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                isLoadMore = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : false;
                if (_this28.loggedIn) {
                  _context20.next = 7;
                  break;
                }
                _this28.collectionData.data = [];
                _this28.collectionData.total = 0;
                _this28.collectionsLoadingMore = false;
                _this28.collectionsNoMore = false;
                return _context20.abrupt("return");
              case 7:
                if (!isLoadMore) {
                  _context20.next = 14;
                  break;
                }
                if (!(_this28.collectionsNoMore || _this28.collectionsLoadingMore)) {
                  _context20.next = 10;
                  break;
                }
                return _context20.abrupt("return");
              case 10:
                _this28.collectionsLoadingMore = true;
                _this28.collectionsPageNum++;
                _context20.next = 16;
                break;
              case 14:
                _this28.collectionsPageNum = 1;
                _this28.collectionsNoMore = false;
              case 16:
                // 构建请求参数，包含搜索关键词
                url = "/wechat/works/findUserWorksCollectionsPage?pageNum=".concat(_this28.collectionsPageNum, "&pageSize=").concat(_this28.pageSize, "&type=0");
                if (_this28.collectionSearchKeyword.trim()) {
                  url += "&name=".concat(encodeURIComponent(_this28.collectionSearchKeyword.trim()));
                }
                _context20.next = 20;
                return _this28.$request.get(url);
              case 20:
                _yield$_this28$$reque = _context20.sent;
                code = _yield$_this28$$reque.code;
                rows = _yield$_this28$$reque.rows;
                total = _yield$_this28$$reque.total;
                if (code == 200) {
                  if (isLoadMore) {
                    _this28.collectionData.data = _this28.collectionData.data.concat(rows);
                  } else {
                    _this28.collectionData.data = rows;
                  }
                  _this28.collectionData.total = total;
                  // 判断是否已加载全部
                  if (_this28.collectionData.data.length >= total || rows.length < _this28.pageSize) {
                    _this28.collectionsNoMore = true;
                  }
                } else if (code === 601) {
                  // 流量不足，显示流量不足弹窗
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
                _this28.collectionsLoadingMore = false;
              case 26:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee19);
      }))();
    },
    // 获取团队作品数据
    getTeamWorksData: function getTeamWorksData() {
      var _arguments3 = arguments,
        _this29 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20() {
        var isLoadMore, url, res, processedRows;
        return _regenerator.default.wrap(function _callee20$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                isLoadMore = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : false;
                if (_this29.loggedIn) {
                  _context21.next = 7;
                  break;
                }
                _this29.allWorks.worksData = [];
                _this29.allWorks.total = 0;
                _this29.worksLoadingMore = false;
                _this29.worksNoMore = false;
                return _context21.abrupt("return");
              case 7:
                if (!isLoadMore) {
                  _context21.next = 14;
                  break;
                }
                if (!(_this29.worksNoMore || _this29.worksLoadingMore)) {
                  _context21.next = 10;
                  break;
                }
                return _context21.abrupt("return");
              case 10:
                _this29.worksLoadingMore = true;
                _this29.worksPageNum++;
                _context21.next = 16;
                break;
              case 14:
                _this29.worksPageNum = 1;
                _this29.worksNoMore = false;
              case 16:
                url = "/wechat/works/findUserWorksPage?pageNum=".concat(_this29.worksPageNum, "&pageSize=").concat(_this29.pageSize, "&userId=").concat(_this29.teamUserId);
                if (_this29.workSearchKeyword.trim()) {
                  url += "&title=".concat(encodeURIComponent(_this29.workSearchKeyword.trim()));
                }
                _context21.next = 20;
                return _this29.$request.get(url);
              case 20:
                res = _context21.sent;
                if (res.code == 200) {
                  processedRows = res.rows.map(function (item) {
                    var componentCount = 0;
                    try {
                      if (item.imageUrls) {
                        var images = JSON.parse(item.imageUrls);
                        if (Array.isArray(images)) {
                          componentCount = images.length;
                        }
                      }
                    } catch (e) {
                      console.warn('Failed to parse imageUrls for work item:', item.id, e);
                    }
                    return _objectSpread(_objectSpread({}, item), {}, {
                      componentCount: componentCount
                    });
                  });
                  if (isLoadMore) {
                    _this29.allWorks.worksData = _this29.allWorks.worksData.concat(processedRows);
                  } else {
                    _this29.allWorks.worksData = processedRows;
                  }
                  _this29.allWorks.total = res.total;
                  // 判断是否已加载全部
                  if (_this29.allWorks.worksData.length >= res.total || processedRows.length < _this29.pageSize) {
                    _this29.worksNoMore = true;
                  }
                } else if (res.code === 601) {
                  // 流量不足，显示流量不足弹窗
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
                _this29.worksLoadingMore = false;
              case 23:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee20);
      }))();
    },
    // 获取团队作品集数据
    getTeamCollections: function getTeamCollections() {
      var _arguments4 = arguments,
        _this30 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21() {
        var isLoadMore, url, res, processedRows;
        return _regenerator.default.wrap(function _callee21$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                isLoadMore = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : false;
                if (_this30.loggedIn) {
                  _context22.next = 7;
                  break;
                }
                _this30.collectionData.data = [];
                _this30.collectionData.total = 0;
                _this30.collectionsLoadingMore = false;
                _this30.collectionsNoMore = false;
                return _context22.abrupt("return");
              case 7:
                if (!isLoadMore) {
                  _context22.next = 14;
                  break;
                }
                if (!(_this30.collectionsNoMore || _this30.collectionsLoadingMore)) {
                  _context22.next = 10;
                  break;
                }
                return _context22.abrupt("return");
              case 10:
                _this30.collectionsLoadingMore = true;
                _this30.collectionsPageNum++;
                _context22.next = 16;
                break;
              case 14:
                _this30.collectionsPageNum = 1;
                _this30.collectionsNoMore = false;
              case 16:
                // Using workType=1 based on assumption and pattern in create page
                url = "/wechat/works/findUserWorksCollectionsPage?pageNum=".concat(_this30.collectionsPageNum, "&pageSize=").concat(_this30.pageSize, "&type=0&userId=").concat(_this30.teamUserId);
                if (_this30.collectionSearchKeyword.trim()) {
                  url += "&name=".concat(encodeURIComponent(_this30.collectionSearchKeyword.trim()));
                }
                _context22.next = 20;
                return _this30.$request.get(url);
              case 20:
                res = _context22.sent;
                if (res.code == 200) {
                  processedRows = res.rows.map(function (item) {
                    var tagsCount = 0;
                    try {
                      if (item.tags) {
                        var tags = JSON.parse(item.tags);
                        if (Array.isArray(tags)) {
                          tagsCount = tags.length;
                        }
                      }
                    } catch (e) {
                      console.warn('Failed to parse tags for collection item:', item.id, e);
                    }
                    return _objectSpread(_objectSpread({}, item), {}, {
                      tagsCount: tagsCount
                    });
                  });
                  if (isLoadMore) {
                    _this30.collectionData.data = _this30.collectionData.data.concat(processedRows);
                  } else {
                    _this30.collectionData.data = processedRows;
                  }
                  _this30.collectionData.total = res.total;
                  // 判断是否已加载全部
                  if (_this30.collectionData.data.length >= res.total || processedRows.length < _this30.pageSize) {
                    _this30.collectionsNoMore = true;
                  }
                } else if (res.code === 601) {
                  // 流量不足，显示流量不足弹窗
                  uni.$emit('show-storage-warning', {
                    msg: '您的流量已用完，请及时购买流量包，否则将影响账户正常使用。',
                    data: '/subpkg-profile/pages/storage-management'
                  });
                }
                _this30.collectionsLoadingMore = false;
              case 23:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee21);
      }))();
    },
    changeTab: function changeTab(index) {
      // 团队模式下，主页标签（index=0）不存在，自动切换到作品标签（index=1）
      if (this.isTeamMode && index === 0) {
        index = 1;
      }
      if (this.currentTab === index) {
        return;
      }
      // 点击 tab 只驱动 swiper 切换，数据加载放到 change 后执行，避免动画期间卡顿
      this.currentTab = index;
      // 持久化记录当前 tab，确保从 tabbar 切换回来后能恢复
      this.saveHomeTab(index);
    },
    shouldRenderTab: function shouldRenderTab(index) {
      if (this.isTeamMode && index === 0) {
        return false;
      }
      return Math.abs(index - this.currentSwiperIndex) <= 1 || index === this.currentTab;
    },
    // 根据标签页加载对应数据
    loadTabData: function loadTabData(index) {
      var _this31 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22() {
        return _regenerator.default.wrap(function _callee22$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                if (_this31.loggedIn) {
                  _context23.next = 2;
                  break;
                }
                return _context23.abrupt("return");
              case 2:
                if (!(index === 0 || !_this31.userInfo.id)) {
                  _context23.next = 5;
                  break;
                }
                _context23.next = 5;
                return _this31.fetchUserInfo();
              case 5:
                if (_this31.homeCollectionsLoaded) {
                  _context23.next = 8;
                  break;
                }
                _context23.next = 8;
                return _this31.getHomeCollections();
              case 8:
                // 根据不同标签页加载对应数据
                if (index === 1) {
                  // 作品标签
                  // 有数据时不重新请求，保留已加载的多页数据和滚动位置
                  if (_this31.allWorks.worksData.length === 0) {
                    if (_this31.isTeamMode) {
                      _this31.getTeamWorksData();
                    } else {
                      _this31.getUserWorksData();
                    }
                  }
                } else if (index === 2) {
                  // 作品集标签
                  // 有数据时不重新请求，保留已加载的多页数据和滚动位置
                  if (_this31.collectionData.data.length === 0) {
                    if (_this31.isTeamMode) {
                      _this31.getTeamCollections();
                    } else {
                      _this31.getUserCollections();
                    }
                  }
                }
              case 9:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee22);
      }))();
    },
    handleSwiperChange: function handleSwiperChange(e) {
      var _this32 = this;
      var swiperIndex = e.detail.current;
      var newTab = this.isTeamMode ? swiperIndex + 1 : swiperIndex;
      var oldTab = this.currentSwiperIndex;
      if (oldTab !== newTab && !this.isPCDevice) {
        uni.vibrateShort({
          type: 'light',
          fail: function fail() {}
        });
      }
      this.currentTab = newTab;
      this.currentSwiperIndex = newTab;
      this.saveHomeTab(newTab);
      clearTimeout(this.tabChangeTimer);
      clearTimeout(this.scrollRestoreTimer);
      this.tabChangeTimer = setTimeout(function () {
        _this32.loadTabData(newTab);
        _this32.scrollRestoreTimer = setTimeout(function () {
          if (newTab === 1) {
            _this32.restoreWorksScrollPosition();
          } else if (newTab === 2) {
            _this32.restoreCollectionsScrollPosition();
          }
        }, 120);
      }, 260);
    },
    navigateTo: function navigateTo(url) {
      var _this33 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23() {
        var path, isLoggedIn, checkMap, ok, hasRightParams, finalUrl;
        return _regenerator.default.wrap(function _callee23$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                path = url.split('?')[0];
                isLoggedIn = _this33.loggedIn || _this33.hasLoginToken();
                checkMap = {
                  '/subpkg-library/pages/works/create': {
                    role: 'canManageWorks',
                    operateType: 0,
                    type: 0
                  },
                  '/subpkg-library/pages/collection/create': {
                    role: 'canManageCollections',
                    operateType: 0,
                    type: 1
                  }
                }; // 检查权限
                if (!(isLoggedIn && checkMap[path])) {
                  _context24.next = 19;
                  break;
                }
                _context24.prev = 4;
                if (!_this33.isTeamMode) {
                  _context24.next = 11;
                  break;
                }
                _context24.next = 8;
                return _this33.checkTeamPermissions(checkMap[path].role);
              case 8:
                ok = _context24.sent;
                if (ok) {
                  _context24.next = 11;
                  break;
                }
                return _context24.abrupt("return");
              case 11:
                // 检查操作权限
                hasRightParams = {
                  operateType: checkMap[path].operateType,
                  type: checkMap[path].type
                };
                _context24.next = 14;
                return _this33.$request.get('/wechat/basic/hasRight', hasRightParams);
              case 14:
                _context24.next = 19;
                break;
              case 16:
                _context24.prev = 16;
                _context24.t0 = _context24["catch"](4);
                return _context24.abrupt("return");
              case 19:
                // 如果是团队模式，添加 workType=1 参数
                finalUrl = url;
                if (_this33.isTeamMode && (path === '/subpkg-library/pages/works/create' || path === '/subpkg-library/pages/collection/create')) {
                  if (url.includes('?')) {
                    finalUrl += '&workType=1';
                  } else {
                    finalUrl += '?workType=1';
                  }
                }
                _this33.saveHomeTab();
                uni.navigateTo({
                  url: finalUrl
                });
              case 23:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee23, null, [[4, 16]]);
      }))();
    },
    // 处理列表项点击
    handleItemClick: function handleItemClick(item) {
      if (item.type === 'create') {
        // 跳转到新建发布页
        this.saveHomeTab();
        uni.navigateTo({
          url: "/pages/library/publish?title=".concat(item.title)
        });
      } else {
        // 跳转到详情页
        this.goToWorkDetail(item);
      }
    },
    goToWorkDetail: function goToWorkDetail(item) {
      this.saveHomeTab();
      uni.navigateTo({
        url: "/subpkg-others/pages/works-detail/detail?id=".concat(item.id)
      });
    },
    goToWorkListDetail: function goToWorkListDetail(item) {
      this.saveHomeTab();
      uni.navigateTo({
        url: "/subpkg-library/pages/collection/detail?id=".concat(item.id)
      });
    },
    // 作品管理选项
    showWorkOptions: function showWorkOptions(item) {
      this.currentWorkItem = item;
      this.showWorkPopup = true;
    },
    closeWorkPopup: function closeWorkPopup() {
      this.showWorkPopup = false;
    },
    // 处理分享点击
    handleShareClick: function handleShareClick() {
      // 关闭弹窗
      this.closeWorkPopup();
      uni.showToast({
        title: '该作品仅自己可见，无法分享给他人',
        icon: 'none'
      });
    },
    handleEditWork: function handleEditWork() {
      var _this34 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee24() {
        var ok;
        return _regenerator.default.wrap(function _callee24$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                if (_this34.currentWorkItem) {
                  _context25.next = 2;
                  break;
                }
                return _context25.abrupt("return");
              case 2:
                _this34.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this34.isTeamMode) {
                  _context25.next = 9;
                  break;
                }
                _context25.next = 6;
                return _this34.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context25.sent;
                if (ok) {
                  _context25.next = 9;
                  break;
                }
                return _context25.abrupt("return");
              case 9:
                _this34.saveHomeTab();
                uni.navigateTo({
                  url: "/subpkg-library/pages/works/create?id=".concat(_this34.currentWorkItem.id, "&title=").concat(_this34.currentWorkItem.title).concat(_this34.isTeamMode ? '&workType=1' : '')
                });
              case 11:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee24);
      }))();
    },
    handleVisableWork: function handleVisableWork() {
      var _this35 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee25() {
        var ok, newIsHide, actionText, confirmText;
        return _regenerator.default.wrap(function _callee25$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (_this35.currentWorkItem) {
                  _context26.next = 2;
                  break;
                }
                return _context26.abrupt("return");
              case 2:
                _this35.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this35.isTeamMode) {
                  _context26.next = 9;
                  break;
                }
                _context26.next = 6;
                return _this35.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context26.sent;
                if (ok) {
                  _context26.next = 9;
                  break;
                }
                return _context26.abrupt("return");
              case 9:
                newIsHide = _this35.currentWorkItem.hide === '1' ? '0' : '1';
                actionText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
                confirmText = newIsHide === '1' ? '设为仅自己可见' : '设为公开';
                uni.showModal({
                  title: '提示',
                  content: "\u786E\u5B9A\u8981".concat(actionText, "\u5417\uFF1F"),
                  success: function success(modalRes) {
                    if (modalRes.confirm) {
                      var params = {
                        worksId: _this35.currentWorkItem.id,
                        isHide: newIsHide //0:否 1:是
                      };

                      _this35.$request.put("/wechat/works/setWorkHide", params).then(function (res) {
                        if (res.code == 200) {
                          // 直接更新本地对应项的 hide 字段
                          var id = _this35.currentWorkItem.id;
                          var item = _this35.allWorks.worksData.find(function (w) {
                            return w.id === id;
                          });
                          if (item) item.hide = newIsHide;
                          _this35.getHomeCollections();
                          uni.showToast({
                            title: '设置成功',
                            icon: 'none'
                          });
                        }
                      });
                    }
                  }
                });
              case 13:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee25);
      }))();
    },
    handleDeleteWork: function handleDeleteWork() {
      var _this36 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee26() {
        var ok;
        return _regenerator.default.wrap(function _callee26$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (_this36.currentWorkItem) {
                  _context27.next = 2;
                  break;
                }
                return _context27.abrupt("return");
              case 2:
                _this36.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this36.isTeamMode) {
                  _context27.next = 9;
                  break;
                }
                _context27.next = 6;
                return _this36.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context27.sent;
                if (ok) {
                  _context27.next = 9;
                  break;
                }
                return _context27.abrupt("return");
              case 9:
                uni.showModal({
                  title: '提示',
                  content: '确定要删除该作品吗？',
                  success: function success(modalRes) {
                    if (modalRes.confirm) {
                      _this36.$request.delete("/wechat/works/deleteWork/".concat(_this36.currentWorkItem.id)).then(function (res) {
                        if (res.code == 200) {
                          // 直接从本地数组移除，不重新请求接口，不重置分页
                          var id = _this36.currentWorkItem.id;
                          _this36.allWorks.worksData = _this36.allWorks.worksData.filter(function (item) {
                            return item.id !== id;
                          });
                          _this36.allWorks.total = Math.max(0, _this36.allWorks.total - 1);
                          // 主页作品集数据仍需刷新（因为封面可能变化）
                          _this36.getHomeCollections();
                          // 如果是在推荐列表，也刷新推荐列表
                          if (_this36.currentTab === 0) {
                            _this36.getHomeWorkList();
                          }
                          uni.showToast({
                            title: res.msg,
                            icon: 'none'
                          });
                        }
                      });
                    }
                  }
                });
              case 10:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee26);
      }))();
    },
    handleToggleFrequent: function handleToggleFrequent() {
      var _this37 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee27() {
        var ok, newStatus, param;
        return _regenerator.default.wrap(function _callee27$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (_this37.currentWorkItem) {
                  _context28.next = 2;
                  break;
                }
                return _context28.abrupt("return");
              case 2:
                _this37.closeWorkPopup();
                // 团队模式下检查权限
                if (!_this37.isTeamMode) {
                  _context28.next = 9;
                  break;
                }
                _context28.next = 6;
                return _this37.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_WORKS);
              case 6:
                ok = _context28.sent;
                if (ok) {
                  _context28.next = 9;
                  break;
                }
                return _context28.abrupt("return");
              case 9:
                // 切换状态：如果当前是置顶(1)，则取消置顶(0)；否则设置为置顶(1)
                newStatus = _this37.currentWorkItem.status == '1' ? 0 : 1;
                param = {
                  status: newStatus,
                  id: _this37.currentWorkItem.id
                };
                _this37.$request.put("/wechat/works/setWorkStatus", param).then(function (res) {
                  if (res.code == 200) {
                    // 直接更新本地对应项的 status 字段
                    var id = _this37.currentWorkItem.id;
                    var item = _this37.allWorks.worksData.find(function (w) {
                      return w.id === id;
                    });
                    if (item) item.status = String(newStatus);
                    _this37.getHomeWorkList();
                    uni.showToast({
                      title: newStatus == 1 ? '置顶成功' : '取消置顶成功',
                      icon: 'success'
                    });
                  }
                });
              case 12:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee27);
      }))();
    },
    handleCollectionFrequent: function handleCollectionFrequent() {
      var _this38 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee28() {
        var ok, newStatus, param;
        return _regenerator.default.wrap(function _callee28$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                if (_this38.currentCollectionItem) {
                  _context29.next = 2;
                  break;
                }
                return _context29.abrupt("return");
              case 2:
                _this38.closeCollectionPopup();
                // 团队模式下检查权限
                if (!_this38.isTeamMode) {
                  _context29.next = 9;
                  break;
                }
                _context29.next = 6;
                return _this38.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
              case 6:
                ok = _context29.sent;
                if (ok) {
                  _context29.next = 9;
                  break;
                }
                return _context29.abrupt("return");
              case 9:
                // 切换状态：如果当前是置顶(1)，则取消置顶(0)；否则设置为置顶(1)
                newStatus = _this38.currentCollectionItem.isTop == 1 ? 0 : 1;
                param = {
                  isTop: newStatus,
                  id: _this38.currentCollectionItem.id
                };
                _this38.$request.put("/wechat/works/editCollectionsIsTop", param).then(function (res) {
                  if (res.code == 200) {
                    // 直接更新本地对应项的 isTop 字段
                    var id = _this38.currentCollectionItem.id;
                    var item = _this38.collectionData.data.find(function (c) {
                      return c.id === id;
                    });
                    if (item) item.isTop = newStatus;
                    _this38.getHomeCollections();
                    uni.showToast({
                      title: newStatus == 1 ? '置顶成功' : '取消置顶成功',
                      icon: 'success'
                    });
                  }
                });
              case 12:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee28);
      }))();
    },
    handleDownloadWork: function handleDownloadWork() {
      if (!this.currentWorkItem) return;
      this.closeWorkPopup();
      this.downloadWorks('work', this.currentWorkItem.id);
    },
    handleDownloadCollection: function handleDownloadCollection() {
      this.closeCollectionPopup();
      this.downloadWorks('collection', this.currentCollectionItem.id);
    },
    // 判断是否是电脑端
    isPC: function isPC() {
      var deviceInfo = uni.getDeviceInfo();
      return deviceInfo.platform === 'windows' || deviceInfo.platform === 'mac';
    },
    // 判断是否已登录
    isLoggedIn: function isLoggedIn() {
      var userInfo = uni.getStorageSync('userInfo');
      return !!userInfo && !!userInfo.id;
    },
    // 处理压缩包下载
    downloadZip: function downloadZip(resourceType, id) {
      var _this39 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee29() {
        var userInfo, teamInfo, res;
        return _regenerator.default.wrap(function _callee29$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                userInfo = uni.getStorageSync('userInfo') || {};
                teamInfo = uni.getStorageSync('teamInfo') || null;
                uni.showLoading({
                  title: '生成压缩包...',
                  mask: true
                });
                _context30.next = 5;
                return _this39.$request.post('/wechat/basic/downLoadWorksPc', {
                  id: id,
                  resourceType: resourceType,
                  userName: _this39.isTeamMode && teamInfo ? teamInfo.nickName : userInfo.nickName || ''
                });
              case 5:
                res = _context30.sent;
                if (res.code === 200 && res.data) {
                  uni.hideLoading();
                  // 打开下载链接
                  // window.open(res.data);
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
                return _context30.stop();
            }
          }
        }, _callee29);
      }))();
    },
    downloadWorks: function downloadWorks(type, id) {
      var _this40 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee30() {
        var isPC, isLoggedIn, res;
        return _regenerator.default.wrap(function _callee30$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                // 检查是否是电脑端且已登录
                isPC = _this40.isPC();
                isLoggedIn = _this40.isLoggedIn();
                if (!(isPC && isLoggedIn)) {
                  _context31.next = 6;
                  break;
                }
                // 电脑端且已登录，使用压缩包下载
                _this40.downloadZip(type, id);
                _context31.next = 19;
                break;
              case 6:
                // 移动端或未登录，使用原有的文件下载方式
                uni.showLoading({
                  title: '获取文件列表...',
                  mask: true
                });
                _context31.prev = 7;
                _context31.next = 10;
                return _this40.$request.post('/wechat/basic/downLoadWorks', {
                  id: id,
                  resourceType: type
                });
              case 10:
                res = _context31.sent;
                if (res.code === 200 && res.data && res.data.length > 0) {
                  uni.hideLoading();
                  _this40.downloadFiles(res.data);
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: '用户案列暂不支持下载',
                    icon: 'none'
                  });
                }
                _context31.next = 19;
                break;
              case 14:
                _context31.prev = 14;
                _context31.t0 = _context31["catch"](7);
                uni.hideLoading();
                uni.showToast({
                  title: '用户案列暂不支持下载',
                  icon: 'none'
                });
                console.error('获取下载内容失败:', _context31.t0);
              case 19:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee30, null, [[7, 14]]);
      }))();
    },
    downloadFiles: function downloadFiles(filePaths) {
      var _this41 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee31() {
        var totalFiles, downloadedFiles, savedFiles, _loop2, i, toastMessage;
        return _regenerator.default.wrap(function _callee31$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                _this41.progress = 0;
                _this41.stageText = '准备下载...';
                totalFiles = filePaths.length;
                downloadedFiles = 0;
                savedFiles = 0;
                _loop2 = /*#__PURE__*/_regenerator.default.mark(function _loop2(i) {
                  var filePath, fullUrl, fileType, tempFilePath;
                  return _regenerator.default.wrap(function _loop2$(_context32) {
                    while (1) {
                      switch (_context32.prev = _context32.next) {
                        case 0:
                          filePath = filePaths[i];
                          fullUrl = _this41.resolveUrl(filePath);
                          fileType = _this41.getFileType(filePath);
                          _context32.prev = 3;
                          _this41.stageText = "\u4E0B\u8F7D\u4E2D (".concat(i + 1, "/").concat(totalFiles, ")");
                          _context32.next = 7;
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
                          tempFilePath = _context32.sent;
                          downloadedFiles++;

                          // 保存到相册（如果是图片或视频）
                          if (!(fileType === 'image' || fileType === 'video')) {
                            _context32.next = 25;
                            break;
                          }
                          _context32.prev = 10;
                          if (!(fileType === 'image')) {
                            _context32.next = 16;
                            break;
                          }
                          _context32.next = 14;
                          return _this41.saveImageToAlbum(tempFilePath);
                        case 14:
                          _context32.next = 19;
                          break;
                        case 16:
                          if (!(fileType === 'video')) {
                            _context32.next = 19;
                            break;
                          }
                          _context32.next = 19;
                          return _this41.saveVideoToAlbum(tempFilePath);
                        case 19:
                          savedFiles++;
                          _context32.next = 25;
                          break;
                        case 22:
                          _context32.prev = 22;
                          _context32.t0 = _context32["catch"](10);
                          console.error("\u4FDD\u5B58\u6587\u4EF6\u5931\u8D25 ".concat(filePath, ":"), _context32.t0);
                          // 继续处理其他文件
                        case 25:
                          _this41.progress = Math.round(downloadedFiles / totalFiles * 100);
                          _context32.next = 31;
                          break;
                        case 28:
                          _context32.prev = 28;
                          _context32.t1 = _context32["catch"](3);
                          console.error("\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25 ".concat(filePath, ":"), _context32.t1);
                          // 继续下载其他文件
                        case 31:
                        case "end":
                          return _context32.stop();
                      }
                    }
                  }, _loop2, null, [[3, 28], [10, 22]]);
                });
                i = 0;
              case 7:
                if (!(i < filePaths.length)) {
                  _context33.next = 12;
                  break;
                }
                return _context33.delegateYield(_loop2(i), "t0", 9);
              case 9:
                i++;
                _context33.next = 7;
                break;
              case 12:
                _this41.stageText = '下载完成';
                _this41.progress = 100;
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
                  _this41.progress = 0;
                }, 3000);
              case 18:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee31);
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
    // 作品搜索功能
    searchWorks: function searchWorks() {
      // console.log('搜索作品:', this.workSearchKeyword);
      // 搜索时重置滚动位置
      this.worksScrollTop = 0;
      this.worksScrollTopValue = 0;
      // 根据团队模式调用对应的方法
      if (this.isTeamMode) {
        this.getTeamWorksData();
      } else {
        this.getUserWorksData();
      }
    },
    // 作品集搜索功能
    searchCollections: function searchCollections() {
      // console.log('搜索作品集:', this.collectionSearchKeyword);
      // 搜索时重置滚动位置
      this.collectionsScrollTop = 0;
      this.collectionsScrollTopValue = 0;
      // 根据团队模式调用对应的方法
      if (this.isTeamMode) {
        this.getTeamCollections();
      } else {
        this.getUserCollections();
      }
    },
    // 作品列表滚动触底加载更多
    onWorksScrollToLower: function onWorksScrollToLower() {
      if (this.isTeamMode) {
        this.getTeamWorksData(true);
      } else {
        this.getUserWorksData(true);
      }
    },
    // 作品集列表滚动触底加载更多
    onCollectionsScrollToLower: function onCollectionsScrollToLower() {
      if (this.isTeamMode) {
        this.getTeamCollections(true);
      } else {
        this.getUserCollections(true);
      }
    },
    // PC端点击刷新作品（不重置滚动位置，避免抖动）
    onWorksRefreshPC: function onWorksRefreshPC() {
      var _this42 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee32() {
        var savedScrollTop;
        return _regenerator.default.wrap(function _callee32$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                if (!_this42.worksRefreshing) {
                  _context34.next = 2;
                  break;
                }
                return _context34.abrupt("return");
              case 2:
                _this42.worksRefreshing = true;
                // 刷新前先断开 scroll-top 绑定，避免数据更新时触发跳位抖动
                savedScrollTop = _this42.worksScrollTop;
                _this42.worksScrollTopValue = null;
                _context34.prev = 5;
                if (!_this42.isTeamMode) {
                  _context34.next = 11;
                  break;
                }
                _context34.next = 9;
                return _this42.getTeamWorksData();
              case 9:
                _context34.next = 13;
                break;
              case 11:
                _context34.next = 13;
                return _this42.getUserWorksData();
              case 13:
                _context34.next = 18;
                break;
              case 15:
                _context34.prev = 15;
                _context34.t0 = _context34["catch"](5);
                console.error('刷新作品失败', _context34.t0);
              case 18:
                _context34.prev = 18;
                _this42.worksRefreshing = false;
                // 数据加载完成后恢复到顶部
                _this42.$nextTick(function () {
                  _this42.worksScrollTop = 0;
                  _this42.worksScrollTopValue = 0;
                  // 再次断开绑定，防止后续滚动时重复跳位
                  setTimeout(function () {
                    _this42.worksScrollTopValue = null;
                  }, 100);
                });
                return _context34.finish(18);
              case 22:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee32, null, [[5, 15, 18, 22]]);
      }))();
    },
    // PC端点击刷新作品集（不重置滚动位置，避免抖动）
    onCollectionsRefreshPC: function onCollectionsRefreshPC() {
      var _this43 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee33() {
        return _regenerator.default.wrap(function _callee33$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (!_this43.collectionsRefreshing) {
                  _context35.next = 2;
                  break;
                }
                return _context35.abrupt("return");
              case 2:
                _this43.collectionsRefreshing = true;
                // 刷新前先断开 scroll-top 绑定，避免数据更新时触发跳位抖动
                _this43.collectionsScrollTopValue = null;
                _context35.prev = 4;
                if (!_this43.isTeamMode) {
                  _context35.next = 10;
                  break;
                }
                _context35.next = 8;
                return _this43.getTeamCollections();
              case 8:
                _context35.next = 12;
                break;
              case 10:
                _context35.next = 12;
                return _this43.getUserCollections();
              case 12:
                _context35.next = 17;
                break;
              case 14:
                _context35.prev = 14;
                _context35.t0 = _context35["catch"](4);
                console.error('刷新作品集失败', _context35.t0);
              case 17:
                _context35.prev = 17;
                _this43.collectionsRefreshing = false;
                // 数据加载完成后回到顶部
                _this43.$nextTick(function () {
                  _this43.collectionsScrollTop = 0;
                  _this43.collectionsScrollTopValue = 0;
                  setTimeout(function () {
                    _this43.collectionsScrollTopValue = null;
                  }, 100);
                });
                return _context35.finish(17);
              case 21:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee33, null, [[4, 14, 17, 21]]);
      }))();
    },
    // Tab1 作品列表下拉刷新
    onWorksRefresh: function onWorksRefresh() {
      var _this44 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee34() {
        return _regenerator.default.wrap(function _callee34$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                if (!_this44.worksRefreshing) {
                  _context36.next = 2;
                  break;
                }
                return _context36.abrupt("return");
              case 2:
                // 防重复
                _this44.worksRefreshing = true;

                // 重置滚动位置
                _this44.worksScrollTop = 0;
                _this44.worksScrollTopValue = null;
                _context36.prev = 5;
                if (!_this44.isTeamMode) {
                  _context36.next = 11;
                  break;
                }
                _context36.next = 9;
                return _this44.getTeamWorksData();
              case 9:
                _context36.next = 13;
                break;
              case 11:
                _context36.next = 13;
                return _this44.getUserWorksData();
              case 13:
                _context36.next = 18;
                break;
              case 15:
                _context36.prev = 15;
                _context36.t0 = _context36["catch"](5);
                console.error('刷新作品失败', _context36.t0);
              case 18:
                _context36.prev = 18;
                _this44.worksRefreshing = false;
                return _context36.finish(18);
              case 21:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee34, null, [[5, 15, 18, 21]]);
      }))();
    },
    // Tab2 作品集列表下拉刷新
    onCollectionsRefresh: function onCollectionsRefresh() {
      var _this45 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee35() {
        return _regenerator.default.wrap(function _callee35$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                if (!_this45.collectionsRefreshing) {
                  _context37.next = 2;
                  break;
                }
                return _context37.abrupt("return");
              case 2:
                // 防重复
                _this45.collectionsRefreshing = true;

                // 重置滚动位置
                _this45.collectionsScrollTop = 0;
                _this45.collectionsScrollTopValue = null;
                _context37.prev = 5;
                if (!_this45.isTeamMode) {
                  _context37.next = 11;
                  break;
                }
                _context37.next = 9;
                return _this45.getTeamCollections();
              case 9:
                _context37.next = 13;
                break;
              case 11:
                _context37.next = 13;
                return _this45.getUserCollections();
              case 13:
                _context37.next = 18;
                break;
              case 15:
                _context37.prev = 15;
                _context37.t0 = _context37["catch"](5);
                console.error('刷新作品集失败', _context37.t0);
              case 18:
                _context37.prev = 18;
                _this45.collectionsRefreshing = false;
                return _context37.finish(18);
              case 21:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee35, null, [[5, 15, 18, 21]]);
      }))();
    },
    // 作品列表滚动事件 - 保存滚动位置
    onWorksScroll: function onWorksScroll(e) {
      this.worksScrollTop = e.detail.scrollTop;
    },
    // 作品集列表滚动事件 - 保存滚动位置
    onCollectionsScroll: function onCollectionsScroll(e) {
      this.collectionsScrollTop = e.detail.scrollTop;
    },
    // 恢复作品列表滚动位置
    restoreWorksScrollPosition: function restoreWorksScrollPosition() {
      var targetScrollTop = this.worksScrollTop;
      if (targetScrollTop <= 0) return;
      this.worksScrollTopValue = targetScrollTop;
    },
    // 恢复作品集列表滚动位置
    restoreCollectionsScrollPosition: function restoreCollectionsScrollPosition() {
      var targetScrollTop = this.collectionsScrollTop;
      if (targetScrollTop <= 0) return;
      this.collectionsScrollTopValue = targetScrollTop;
    },
    // 弹出首页管理作品集
    showHomeCollectionMenu: function showHomeCollectionMenu() {
      this.showHomeCollectionPopup = true;
    },
    closeHomeCollectionPopup: function closeHomeCollectionPopup() {
      this.showHomeCollectionPopup = false;
    },
    // 弹出作品集筛选菜单
    showCollectionFilterMenu: function showCollectionFilterMenu() {
      this.showHomeCollectionPopup = false;
      this.showCollectionFilterPopup = true;
    },
    closeCollectionFilterPopup: function closeCollectionFilterPopup() {
      this.showCollectionFilterPopup = false;
    },
    handleCollectionSingleColumn: function handleCollectionSingleColumn() {
      if (this.currentTab === 0) {
        this.layoutType = 0;
        this.layout(this.layoutType);
      } else if (this.currentTab === 1) {
        this.isSingleColumn = true;
      } else if (this.currentTab === 2) {
        this.portfolioLayout.isSingleColumn = true;
      }
      this.closeCollectionFilterPopup();
    },
    handleCollectionDoubleColumn: function handleCollectionDoubleColumn() {
      if (this.currentTab === 0) {
        this.layoutType = 1;
        this.layout(this.layoutType);
      } else if (this.currentTab === 1) {
        this.isSingleColumn = false;
      } else if (this.currentTab === 2) {
        this.portfolioLayout.isSingleColumn = false;
      }
      this.getHomeCollections();
      this.closeCollectionFilterPopup();
    },
    handleSortCollectionDate: function handleSortCollectionDate() {
      this.sortCollectionsByDate();
      this.closeCollectionFilterPopup();
    },
    // 微信小程序分享功能 - 必须使用这个生命周期方法
    onShareAppMessage: function onShareAppMessage(res) {
      // 当用户点击右上角分享时调用
      if (res.from === 'button') {
        // 主页分享（点击右上角分享按钮）
        if (this.currentTab === 0 && !this.currentWorkItem && !this.currentCollectionItem) {
          // 获取背景图第一张作为封面
          var bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
          return {
            title: "".concat(this.userInfo.nickName || '用户', "\u7684\u4E3B\u9875"),
            path: "/subpkg-library/pages/visitor-home?userId=".concat(this.userInfo.id, "&isTeamMode=").concat(this.isTeamMode),
            imageUrl: bgImg
          };
        }
        if (this.currentWorkItem) {
          // 来自作品管理弹窗的转发
          var work = this.currentWorkItem;
          // 检查作品是否是公开的
          if (work.hide === '1') {
            // 提示用户该作品仅自己可见，无法分享给他人
            uni.showToast({
              title: '该作品仅自己可见，无法分享给他人',
              icon: 'none'
            });
            // 返回 false，阻止分享
            return false;
          }
          return {
            title: work.title || '我的作品',
            path: "/subpkg-others/pages/works-detail/detail?id=".concat(work.id, "&isTeamMode=").concat(this.isTeamMode),
            imageUrl: this.resolveUrl(this.getFirstImageUrl(work.imageUrls)) || '/static/yunyiku/bg.png'
          };
        } else if (this.currentCollectionItem) {
          // 来自作品集管理弹窗的转发
          var collection = this.currentCollectionItem;
          var imageUrl = collection.coverUrl;
          if (collection.workCoverUrls && collection.workCoverUrls.length > 0) {
            imageUrl = collection.workCoverUrls[0];
          }
          return {
            title: collection.name || '我的作品集',
            path: "/subpkg-library/pages/collection/detail?id=".concat(collection.id, "&title=").concat(collection.name, "&isTeamMode=").concat(this.isTeamMode),
            imageUrl: this.resolveUrl(imageUrl) || '/static/yunyiku/bg.png'
          };
        }
      }
      if (this.shareUrl) {
        // 如果有分享链接，使用链接分享
        return {
          title: '我分享了一个作品压缩包',
          path: "/pages/library/index?shareUrl=".concat(encodeURIComponent(this.shareUrl), "&isTeamMode=").concat(this.isTeamMode),
          imageUrl: '/static/yunyiku/bg.png'
        };
      } else {
        // 默认分享
        var _bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
        return {
          title: "".concat(this.userInfo.nickName || '用户', "\u7684\u4E3B\u9875"),
          path: "/subpkg-library/pages/visitor-home?userId=".concat(this.userInfo.id, "&isTeamMode=").concat(this.isTeamMode),
          imageUrl: _bgImg
        };
      }
    },
    // 分享到朋友圈
    onShareTimeline: function onShareTimeline() {
      // 获取背景图第一张作为封面
      var bgImg = this.bannerList.length > 0 ? this.bannerList[0] : '/static/yunyiku/bg.png';
      return {
        title: "".concat(this.userInfo.nickName || '用户', "\u7684\u4E3B\u9875"),
        query: "userId=".concat(this.userInfo.id, "&isTeamMode=").concat(this.isTeamMode),
        imageUrl: bgImg
      };
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
          return timeA - timeB;
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
      this.currentCollectionItem = item;
      this.currentWorkItem = null; // 清除作品选中状态，避免分享混淆
      this.showCollectionPopup = true;
    },
    closeCollectionPopup: function closeCollectionPopup() {
      this.showCollectionPopup = false;
    },
    handleEditCollection: function handleEditCollection() {
      var _this46 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee36() {
        var ok;
        return _regenerator.default.wrap(function _callee36$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                _this46.closeCollectionPopup();
                // 团队模式下检查权限
                if (!_this46.isTeamMode) {
                  _context38.next = 7;
                  break;
                }
                _context38.next = 4;
                return _this46.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
              case 4:
                ok = _context38.sent;
                if (ok) {
                  _context38.next = 7;
                  break;
                }
                return _context38.abrupt("return");
              case 7:
                _this46.saveHomeTab();
                uni.navigateTo({
                  url: "/subpkg-library/pages/collection/create?id=".concat(_this46.currentCollectionItem.id, "&title=").concat(_this46.currentCollectionItem.name, "&workType=").concat(_this46.isTeamMode ? 1 : 0)
                });
              case 9:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee36);
      }))();
    },
    handleDeleteCollection: function handleDeleteCollection() {
      var _this47 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee37() {
        var ok;
        return _regenerator.default.wrap(function _callee37$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _this47.closeCollectionPopup();
                // 团队模式下检查权限
                if (!_this47.isTeamMode) {
                  _context39.next = 7;
                  break;
                }
                _context39.next = 4;
                return _this47.checkTeamPermissions(TEAM_OPERATE_ROLES.MANAGE_COLLECTIONS);
              case 4:
                ok = _context39.sent;
                if (ok) {
                  _context39.next = 7;
                  break;
                }
                return _context39.abrupt("return");
              case 7:
                uni.showModal({
                  title: '提示',
                  content: '确定要删除该作品集吗？',
                  success: function success(modalRes) {
                    if (modalRes.confirm) {
                      _this47.$request.delete("/wechat/works/deleteWorkCollections/".concat(_this47.currentCollectionItem.id)).then(function (res) {
                        if (res.code == 200) {
                          // 直接从本地数组移除
                          var id = _this47.currentCollectionItem.id;
                          _this47.collectionData.data = _this47.collectionData.data.filter(function (item) {
                            return item.id !== id;
                          });
                          _this47.collectionData.total = Math.max(0, _this47.collectionData.total - 1);
                          _this47.getHomeCollections();
                          uni.showToast({
                            title: '删除作品集成功',
                            icon: 'none'
                          });
                        }
                      });
                    }
                  }
                });
              case 8:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee37);
      }))();
    },
    // 按时间排序 (注意要保持 Create 卡片始终在第一个)
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
        // 如果列表为空，直接返回
        if (this.allWorks.worksData.length === 0) {
          uni.showToast({
            title: '暂无作品可排序',
            icon: 'none'
          });
          return;
        }

        // 取出第一个
        var createItem = this.allWorks.worksData.find(function (i) {
          return i.type === 'create';
        });
        // 取出剩余的
        var others = this.allWorks.worksData.filter(function (i) {
          return i.type !== 'create';
        });

        // 对剩余的排序 (日期从大到小)
        others.sort(function (a, b) {
          return new Date(b.createTime) - new Date(a.createTime);
        });

        // 重新组合
        if (createItem) {
          this.allWorks.worksData = [createItem].concat((0, _toConsumableArray2.default)(others));
        } else {
          this.allWorks.worksData = others;
        }
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
          return uni.showToast({
            title: '微信号已复制',
            icon: 'success'
          });
        }
      });
    },
    makePhoneCall: function makePhoneCall() {
      if (!this.userInfo.phone) {
        uni.showToast({
          title: '未绑定手机号',
          icon: 'none'
        });
        return;
      }
      uni.makePhoneCall({
        phoneNumber: this.userInfo.phone
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 67:
/*!********************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/pages/library/index.vue?vue&type=style&index=0&id=462487d5&lang=scss&scoped=true& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=462487d5&lang=scss&scoped=true& */ 68);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_462487d5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 68:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/pages/library/index.vue?vue&type=style&index=0&id=462487d5&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[59,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/library/index.js.map