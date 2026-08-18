(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg-task/pages/taskOrder/index"],{

/***/ 296:
/*!*********************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"subpkg-task%2Fpages%2FtaskOrder%2Findex"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./subpkg-task/pages/taskOrder/index.vue */ 297));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 297:
/*!************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=7e43740c&scoped=true& */ 298);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 300);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=7e43740c&scoped=true&lang=css& */ 302);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 36);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7e43740c",
  null,
  false,
  _index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg-task/pages/taskOrder/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 298:
/*!*******************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue?vue&type=template&id=7e43740c&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=7e43740c&scoped=true& */ 299);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_7e43740c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 299:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue?vue&type=template&id=7e43740c&scoped=true& ***!
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
  var l6 = _vm.__map(_vm.orderList, function (item, __i1__) {
    var $orig = _vm.__get_orig(item)
    var g0 =
      item.expanded &&
      item.taskDetailVisible &&
      !item.taskDetailLoading &&
      !item.taskDetailError
        ? item.taskDetailImages && item.taskDetailImages.length > 0
        : null
    var g1 =
      item.expanded &&
      item.taskDetailVisible &&
      !item.taskDetailLoading &&
      !item.taskDetailError
        ? item.taskDetailImages && item.taskDetailImages.length > 0
        : null
    var g2 =
      item.expanded &&
      item.taskDetailVisible &&
      !item.taskDetailLoading &&
      !item.taskDetailError &&
      g1
        ? item.taskDetailImages.length
        : null
    var g3 =
      item.expanded &&
      item.taskDetailVisible &&
      !item.taskDetailLoading &&
      !item.taskDetailError
        ? item.taskDetailProfessions && item.taskDetailProfessions.length
        : null
    var g4 =
      item.expanded &&
      item.taskDetailVisible &&
      !item.taskDetailLoading &&
      !item.taskDetailError
        ? item.taskDetailGuarantees && item.taskDetailGuarantees.length
        : null
    var m0 =
      item.expanded && !item.timelineLoading
        ? _vm.shouldShowInviteEmptyActions(item)
        : null
    var l0 =
      item.expanded && !item.timelineLoading && m0
        ? _vm.getOrderFooterActions(item)
        : null
    var g5 =
      item.expanded && !item.timelineLoading && !m0
        ? item.timelineLoaded && item.timelineList.length === 0
        : null
    var l1 =
      item.expanded && !item.timelineLoading && !m0 && !g5
        ? _vm.getServiceTimeline(item)
        : null
    var l2 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      item.detailType === "quote"
        ? _vm.getOrderFooterActions(item)
        : null
    var l3 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      !(item.detailType === "service" && item.waitingDeliveryConfirm) &&
      item.detailType === "service" &&
      item.orderStatus === "in_service"
        ? _vm.getOrderFooterActions(item)
        : null
    var m1 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      !(item.detailType === "service" && item.waitingDeliveryConfirm) &&
      item.detailType === "service" &&
      item.orderStatus === "in_service"
        ? _vm.getServiceSubmitterAvatar(item)
        : null
    var m2 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      !(item.detailType === "service" && item.waitingDeliveryConfirm) &&
      item.detailType === "service" &&
      item.orderStatus === "in_service"
        ? _vm.getServiceSubmitterName(item)
        : null
    var m3 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      !(item.detailType === "service" && item.waitingDeliveryConfirm) &&
      item.detailType === "service" &&
      item.orderStatus === "in_service"
        ? _vm.getServiceSubmitterTime(item)
        : null
    var l4 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      item.detailType === "refund"
        ? _vm.getOrderFooterActions(item)
        : null
    var l5 =
      item.expanded &&
      !item.timelineLoading &&
      !m0 &&
      !g5 &&
      item.detailType === "done"
        ? _vm.getOrderFooterActions(item)
        : null
    return {
      $orig: $orig,
      g0: g0,
      g1: g1,
      g2: g2,
      g3: g3,
      g4: g4,
      m0: m0,
      l0: l0,
      g5: g5,
      l1: l1,
      l2: l2,
      l3: l3,
      m1: m1,
      m2: m2,
      m3: m3,
      l4: l4,
      l5: l5,
    }
  })
  var g6 = !_vm.loading && _vm.orderList.length === 0
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, action, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        action = _temp2.action,
        item = _temp2.item
      var _temp, _temp2
      $event.stopPropagation()
      return _vm.handleAction(action.key, item)
    }
    _vm.e1 = function ($event, action, item) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        action = _temp4.action,
        item = _temp4.item
      var _temp3, _temp4
      $event.stopPropagation()
      return _vm.handleAction(action.key, item)
    }
    _vm.e2 = function ($event, action, item) {
      var _temp5 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        action = _temp6.action,
        item = _temp6.item
      var _temp5, _temp6
      $event.stopPropagation()
      return _vm.handleAction(action.key, item)
    }
    _vm.e3 = function ($event, action, item) {
      var _temp7 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp8 = _temp7.eventParams || _temp7["event-params"],
        action = _temp8.action,
        item = _temp8.item
      var _temp7, _temp8
      $event.stopPropagation()
      return _vm.handleAction(action.key, item)
    }
    _vm.e4 = function ($event, action, item) {
      var _temp9 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp10 = _temp9.eventParams || _temp9["event-params"],
        action = _temp10.action,
        item = _temp10.item
      var _temp9, _temp10
      $event.stopPropagation()
      return _vm.handleAction(action.key, item)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l6: l6,
        g6: g6,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 300:
/*!*************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 301);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 301:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue?vue&type=script&lang=js& ***!
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
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 46));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 48));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 38));
var _env = _interopRequireDefault(__webpack_require__(/*! @/config/env.js */ 39));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var RejectReasonPopup = function RejectReasonPopup() {
  __webpack_require__.e(/*! require.ensure | components/reject-reason-popup */ "components/reject-reason-popup").then((function () {
    return resolve(__webpack_require__(/*! @/components/reject-reason-popup.vue */ 435));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var ContactInfoPopup = function ContactInfoPopup() {
  __webpack_require__.e(/*! require.ensure | components/contact-info-popup */ "components/contact-info-popup").then((function () {
    return resolve(__webpack_require__(/*! @/components/contact-info-popup.vue */ 405));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var DEFAULT_AVATAR = '/static/yunyiku/avatar.png';
var ORDER_STATUS_MAP = {
  pending_accept: {
    tab: 'pending',
    statusText: '待接单',
    themeClass: 'theme-pending',
    detailType: 'quote',
    compact: false
  },
  in_service: {
    tab: 'service',
    statusText: '服务中',
    themeClass: 'theme-service',
    detailType: 'service',
    compact: false
  },
  cancelled: {
    tab: 'rejected',
    statusText: '已婉拒',
    themeClass: 'theme-rejected',
    detailType: 'reason',
    compact: false
  },
  refunding: {
    tab: 'refund',
    statusText: '退款中',
    themeClass: 'theme-refund',
    detailType: 'refund',
    compact: false
  },
  completed: {
    tab: 'done',
    statusText: '已完成',
    themeClass: 'theme-done',
    detailType: 'done',
    compact: false
  }
};
var _default = {
  components: {
    RejectReasonPopup: RejectReasonPopup,
    ContactInfoPopup: ContactInfoPopup
  },
  data: function data() {
    return {
      activeTab: 'all',
      keyword: '',
      searchTimer: null,
      pageNum: 1,
      pageSize: 8,
      total: 0,
      loading: false,
      finished: false,
      requestSeq: 0,
      currentUserId: '',
      rejectPopupVisible: false,
      rejectPopupLoading: false,
      rejectTargetItem: null,
      rejectReasons: ['需求暂不清晰，暂不承接', '档期已满，暂不接单', '擅长领域不符', '预算不符，暂不合作', '时间紧张，怕影响效果', '感谢信任，暂不合作'],
      contactPopup: {
        visible: false,
        phone: '',
        wxNumber: ''
      },
      extraChargePopup: {
        visible: false,
        item: null,
        amount: '',
        submitting: false
      },
      quoteInvitePopup: {
        visible: false,
        item: null,
        amount: '',
        submitting: false
      },
      tabs: [{
        label: '全部',
        value: 'all',
        status: ''
      }, {
        label: '待接单',
        value: 'pending',
        status: 'pending_accept'
      }, {
        label: '服务中',
        value: 'service',
        status: 'in_service'
      }, {
        label: '取消/婉拒',
        value: 'rejected',
        status: 'cancelled'
      }, {
        label: '退款中',
        value: 'refund',
        status: 'refunding'
      }, {
        label: '已完成',
        value: 'done',
        status: 'completed'
      }],
      orderList: [],
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
    loadText: function loadText() {
      if (this.loading) {
        return '加载中...';
      }
      if (this.orderList.length === 0) {
        return '';
      }
      return this.finished ? '没有更多了' : '上滑加载更多';
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
  onLoad: function onLoad() {
    this.refreshCurrentUserId();
    this.resetList();
  },
  onShow: function onShow() {
    this.refreshCurrentUserId();
    if (!this.orderList.length) {
      return;
    }
    this.resetList();
  },
  updated: function updated() {
    var _this = this;
    this.$nextTick(function () {
      _this.updateScrollBounds();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
  },
  methods: {
    noop: function noop() {},
    refreshCurrentUserId: function refreshCurrentUserId() {
      this.currentUserId = this.getCurrentUserId();
    },
    getCurrentUserId: function getCurrentUserId() {
      var isTeamMode = !!uni.getStorageSync('isTeamMode');
      var userInfo = uni.getStorageSync('userInfo') || {};
      if (isTeamMode) {
        return uni.getStorageSync('teamOwnerId') || userInfo.id || userInfo.userId || '';
      }
      return userInfo.id || userInfo.userId || '';
    },
    isSelfTimeline: function isSelfTimeline(record) {
      var senderUserId = record && record.senderUserId;
      if (senderUserId === undefined || senderUserId === null || senderUserId === '' || this.currentUserId === '') {
        return false;
      }
      return String(senderUserId) === String(this.currentUserId);
    },
    isDeliveryPendingTimeline: function isDeliveryPendingTimeline(record) {
      if (!record) {
        return false;
      }
      var eventType = record.event_type || record.eventType;
      var actionStatus = record.actionStatus || record.action_status;
      return eventType === 'delivery_apply' && actionStatus === 'pending';
    },
    hasPendingDeliveryApply: function hasPendingDeliveryApply(timelineList) {
      var _this2 = this;
      return Array.isArray(timelineList) && timelineList.some(function (item) {
        return _this2.isDeliveryPendingTimeline(item);
      });
    },
    isRefundPendingTimeline: function isRefundPendingTimeline(record) {
      if (!record) {
        return false;
      }
      var eventType = record.event_type || record.eventType;
      var actionStatus = record.actionStatus || record.action_status;
      return eventType === 'refund_apply' && actionStatus === 'pending';
    },
    goBack: function goBack() {
      if (getCurrentPages().length > 1) {
        uni.navigateBack();
        return;
      }
      uni.switchTab({
        url: '/pages/profile/index'
      });
    },
    changeTab: function changeTab(value) {
      if (this.preventClick) return;
      if (this.activeTab === value) {
        return;
      }
      this.activeTab = value;
      this.resetList();
    },
    updateScrollBounds: function updateScrollBounds() {
      var _this3 = this;
      var query = uni.createSelectorQuery().in(this);
      query.select('.tab-scroll').boundingClientRect();
      query.select('.tabs').boundingClientRect();
      query.exec(function (res) {
        if (res && res[0] && res[1]) {
          _this3.maxScroll = Math.max(0, res[1].width - res[0].width);
          if (_this3.translateX < -_this3.maxScroll) {
            _this3.translateX = -_this3.maxScroll;
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
      var _this4 = this;
      this.isDragging = false;
      if (this.hasDragged) {
        this.preventClick = true;
        setTimeout(function () {
          _this4.preventClick = false;
        }, 100);
      }
    },
    onWheel: function onWheel(e) {
      if (this.maxScroll <= 0) return;
      var delta = (e.deltaY || 0) + (e.deltaX || 0);
      if (!delta) return;
      if (e.preventDefault) {
        try {
          e.preventDefault();
        } catch (err) {}
      }
      var newX = this.translateX - delta;
      newX = Math.max(-this.maxScroll, Math.min(0, newX));
      this.translateX = newX;
    },
    handleKeywordInput: function handleKeywordInput() {
      var _this5 = this;
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(function () {
        _this5.searchTimer = null;
        _this5.resetList();
      }, 300);
    },
    triggerSearch: function triggerSearch() {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.resetList();
    },
    toggleExpand: function toggleExpand(id) {
      var shouldFetchTimeline = false;
      this.orderList = this.orderList.map(function (orderItem) {
        if (orderItem.id !== id) {
          return orderItem;
        }
        var expanded = !orderItem.expanded;
        if (expanded && !orderItem.timelineLoaded && !orderItem.timelineLoading && orderItem.orderNo) {
          shouldFetchTimeline = true;
        }
        return _objectSpread(_objectSpread({}, orderItem), {}, {
          expanded: expanded
        });
      });
      if (shouldFetchTimeline) {
        this.fetchTimeline(id);
      }
    },
    updateOrderItem: function updateOrderItem(id, updater) {
      this.orderList = this.orderList.map(function (orderItem) {
        if (orderItem.id !== id) {
          return orderItem;
        }
        return updater(orderItem);
      });
    },
    handleAction: function handleAction(type, item) {
      var _this6 = this;
      if (type === 'quoted') {
        return;
      }
      if (type === 'reject') {
        this.openRejectPopup(item);
        return;
      }
      if (type === 'submitDelivery') {
        this.applyDelivery(item);
        return;
      }
      if (type === 'accept') {
        this.acceptOrder(item);
        return;
      }
      if (type === 'quote') {
        this.openQuoteInvitePopup(item);
        return;
      }
      if (type === 'handleRefund') {
        if (!item || item.refundHandleLoading) {
          return;
        }
        var refundTimeline = this.getPendingRefundTimeline(item);
        if (!item.orderNo || !refundTimeline || !refundTimeline.timelineId) {
          uni.showToast({
            title: '退款申请信息缺失，无法处理',
            icon: 'none'
          });
          return;
        }
        uni.showModal({
          title: '处理退款',
          content: '请选择是否同意该退款申请',
          confirmText: '同意',
          cancelText: '拒绝',
          confirmColor: '#F37738',
          success: function success(res) {
            if (res.confirm) {
              _this6.handleRefund(item, refundTimeline, 'agree');
              return;
            }
            if (res.cancel) {
              _this6.handleRefund(item, refundTimeline, 'reject');
            }
          }
        });
        return;
      }
      if (type === 'contact') {
        this.showContact(item);
        return;
      }
      if (type === 'addBudget') {
        this.openExtraChargePopup(item);
        return;
      }
      var textMap = {
        quote: '报价',
        refund: '退款处理中',
        review: '评价'
      };
      uni.showToast({
        title: "".concat(item.customerName).concat(textMap[type] || '操作', "\u529F\u80FD\u5F85\u63A5\u5165"),
        icon: 'none'
      });
    },
    openWithdrawalDetail: function openWithdrawalDetail(item) {
      if (!item || !item.orderNo) {
        uni.showToast({
          title: '订单编号缺失，无法查看详情',
          icon: 'none'
        });
        return;
      }
      var query = ["orderNo=".concat(encodeURIComponent(item.orderNo)), "amount=".concat(encodeURIComponent(item.orderAmount || '')), 'hideWithdraw=1'].join('&');
      uni.navigateTo({
        url: "/subpkg-profile/pages/withdrawalcenter/detail/index?".concat(query)
      });
    },
    toggleTaskDetail: function toggleTaskDetail(item) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!item || !item.orderNo)) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                if (!item.taskDetailVisible) {
                  _context.next = 5;
                  break;
                }
                item.taskDetailVisible = false;
                return _context.abrupt("return");
              case 5:
                item.taskDetailVisible = true;
                if (!(item.taskDetailLoaded || item.taskDetailLoading)) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return");
              case 8:
                _context.next = 10;
                return _this7.fetchTaskDetail(item);
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    fetchTaskDetail: function fetchTaskDetail(item) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var res, detail, images, professions, guarantees;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!item || !item.orderNo || item.taskDetailLoading)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                _this8.updateOrderItem(item.id, function (orderItem) {
                  return _objectSpread(_objectSpread({}, orderItem), {}, {
                    taskDetailLoading: true,
                    taskDetailError: ''
                  });
                });
                _context2.prev = 3;
                _context2.next = 6;
                return _request.default.get('/wechat/withdrawal/taskDetail', {
                  orderNo: item.orderNo
                });
              case 6:
                res = _context2.sent;
                detail = _this8.extractTaskDetailData(res);
                images = _this8.normalizeImageList(detail.imageList).map(function (url) {
                  return _this8.buildImageUrl(url);
                }).filter(Boolean);
                professions = _this8.normalizeProfessionList(detail.professionList);
                guarantees = _this8.normalizeGuaranteeList(detail.guaranteeList);
                _this8.updateOrderItem(item.id, function (orderItem) {
                  return _objectSpread(_objectSpread({}, orderItem), {}, {
                    taskDetail: detail,
                    taskDetailImages: images,
                    taskDetailProfessions: professions,
                    taskDetailGuarantees: guarantees,
                    taskDetailPosterIndex: 0,
                    taskDetailLoaded: true,
                    taskDetailLoading: false,
                    taskDetailError: ''
                  });
                });
                _context2.next = 17;
                break;
              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](3);
                _this8.updateOrderItem(item.id, function (orderItem) {
                  return _objectSpread(_objectSpread({}, orderItem), {}, {
                    taskDetailLoading: false,
                    taskDetailError: _context2.t0 && _context2.t0.msg || '订单详情加载失败'
                  });
                });
              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 14]]);
      }))();
    },
    extractTaskDetailData: function extractTaskDetailData(res) {
      var candidates = [res && res.data, res && res.data && res.data.data, res];
      return candidates.find(function (item) {
        return item && (0, _typeof2.default)(item) === 'object' && !Array.isArray(item);
      }) || {};
    },
    normalizeImageList: function normalizeImageList(value) {
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
        return text.split(',').map(function (item) {
          return item.trim();
        }).filter(Boolean);
      }
      return [];
    },
    normalizeProfessionList: function normalizeProfessionList(value) {
      if (!Array.isArray(value)) {
        return [];
      }
      return value.map(function (item) {
        if (!item) {
          return '';
        }
        if (typeof item === 'string') {
          return item.trim();
        }
        return String(item.professionCategoryName || item.categoryName || item.professionName || item.name || item.label || item.description || '').trim();
      }).filter(Boolean);
    },
    normalizeGuaranteeList: function normalizeGuaranteeList(value) {
      if (!Array.isArray(value)) {
        return [];
      }
      return value.map(function (item) {
        if (!item) {
          return '';
        }
        if (typeof item === 'string') {
          return item.trim();
        }
        return String(item.description || '').trim();
      }).filter(Boolean);
    },
    onTaskDetailPosterChange: function onTaskDetailPosterChange(event, item) {
      if (!item) {
        return;
      }
      this.updateOrderItem(item.id, function (orderItem) {
        return _objectSpread(_objectSpread({}, orderItem), {}, {
          taskDetailPosterIndex: event.detail.current || 0
        });
      });
    },
    previewTaskDetailImage: function previewTaskDetailImage(item, index) {
      if (!item || !item.taskDetailImages || !item.taskDetailImages.length) {
        return;
      }
      uni.previewImage({
        urls: item.taskDetailImages,
        current: item.taskDetailImages[index] || item.taskDetailImages[0]
      });
    },
    openRejectPopup: function openRejectPopup(item) {
      if (!item || item.rejectLoading) {
        return;
      }
      this.rejectTargetItem = item;
      this.rejectPopupVisible = true;
    },
    closeRejectPopup: function closeRejectPopup() {
      if (this.rejectPopupLoading) {
        return;
      }
      this.rejectPopupVisible = false;
      this.rejectTargetItem = null;
    },
    confirmRejectReason: function confirmRejectReason(reason) {
      if (!this.rejectTargetItem || this.rejectPopupLoading) {
        return;
      }
      this.rejectOrder(this.rejectTargetItem, reason);
    },
    loadMore: function loadMore() {
      if (this.loading || this.finished) {
        return;
      }
      this.fetchOrderList(this.pageNum + 1, false);
    },
    resetList: function resetList() {
      this.pageNum = 1;
      this.total = 0;
      this.finished = false;
      this.orderList = [];
      return this.fetchOrderList(1, true);
    },
    handleRefresh: function handleRefresh() {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_this9.searchTimer) {
                  clearTimeout(_this9.searchTimer);
                  _this9.searchTimer = null;
                }
                _this9.refreshing = true;
                _context3.prev = 2;
                _context3.next = 5;
                return _this9.resetList();
              case 5:
                _context3.prev = 5;
                _this9.refreshing = false;
                return _context3.finish(5);
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2,, 5, 8]]);
      }))();
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
    fetchOrderList: function fetchOrderList(pageNum, isRefresh) {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var currentRequestSeq, res, pageData, rows, nextList;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currentRequestSeq = ++_this10.requestSeq;
                _this10.loading = true;
                _context4.prev = 2;
                _context4.next = 5;
                return _request.default.get('/wechat/tOrder/page', _this10.buildQueryParams(pageNum));
              case 5:
                res = _context4.sent;
                if (!(currentRequestSeq !== _this10.requestSeq)) {
                  _context4.next = 8;
                  break;
                }
                return _context4.abrupt("return");
              case 8:
                pageData = _this10.extractPageData(res);
                rows = pageData.rows;
                nextList = rows.filter(function (item) {
                  return item && (0, _typeof2.default)(item) === 'object';
                }).map(function (item, index) {
                  return _this10.normalizeOrder(item, index, pageNum);
                });
                _this10.pageNum = pageNum;
                _this10.total = Number(pageData.total) || rows.length;
                _this10.orderList = isRefresh ? nextList : _this10.orderList.concat(nextList);
                _this10.finished = rows.length < _this10.pageSize || _this10.orderList.length >= _this10.total;
                _context4.next = 20;
                break;
              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](2);
                if (currentRequestSeq === _this10.requestSeq) {
                  _this10.finished = isRefresh;
                  console.error('订单列表数据处理失败', _context4.t0);
                  uni.showToast({
                    title: '订单数据加载失败',
                    icon: 'none'
                  });
                }
              case 20:
                _context4.prev = 20;
                if (currentRequestSeq === _this10.requestSeq) {
                  _this10.loading = false;
                }
                return _context4.finish(20);
              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 17, 20, 23]]);
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
        total: list ? list.length : 0
      };
    },
    buildQueryParams: function buildQueryParams(pageNum) {
      var _this11 = this;
      var params = {
        pageNum: pageNum,
        pageSize: this.pageSize
      };
      var currentTab = this.tabs.find(function (item) {
        return item.value === _this11.activeTab;
      });
      if (currentTab && currentTab.status) {
        params.orderStatus = currentTab.status;
      }
      var taskTitle = this.keyword.trim();
      if (taskTitle) {
        params.taskTitle = taskTitle;
      }
      return params;
    },
    normalizeOrder: function normalizeOrder(item) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var pageNum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var statusConfig = ORDER_STATUS_MAP[item.orderStatus] || {
        tab: 'all',
        statusText: item.orderStatus || '未知状态',
        themeClass: 'theme-service',
        detailType: 'service',
        compact: false
      };
      var payStatus = item.payStatus || item.pay_status || '';
      var statusText = item.orderStatus === 'cancelled' && payStatus === 'refunded' ? '已取消' : statusConfig.statusText;
      var publisherName = item.publisherUserName || '发单人';
      var timeText = this.formatDateTime(item.createTime);
      var rawOrderId = item.orderId !== undefined ? item.orderId : item.id !== undefined ? item.id : item.order_id;
      var orderKey = rawOrderId || item.orderNo || "".concat(item.taskId || item.orderStatus || 'order', "-").concat(item.createTime || pageNum, "-").concat(index);
      return {
        id: String(orderKey),
        orderId: rawOrderId,
        orderNo: item.orderNo ? String(item.orderNo) : '',
        taskId: item.taskId,
        publisherUserId: item.publisherUserId || '',
        orderStatus: item.orderStatus || '',
        payStatus: payStatus,
        sourceType: item.sourceType || item.source_type || '',
        channelType: item.channelType || item.channel_type || item.sourceType || item.source_type || '',
        hasInviteQuote: !!(item.hasInviteQuote || item.has_invite_quote),
        tab: statusConfig.tab,
        customerName: publisherName,
        orderDate: this.formatDate(item.createTime),
        deliveryDate: this.formatShortDate(item.expectedDeliveryTime),
        publisherContactTime: timeText,
        orderAmount: item.orderAmount !== undefined ? item.orderAmount : item.order_amount,
        amount: this.formatAmount(item.orderAmount !== undefined ? item.orderAmount : item.order_amount),
        statusText: statusText,
        taskTitle: item.taskTitle || '未命名任务',
        avatar: this.buildImageUrl(item.publisherAvatarUrl),
        themeClass: statusConfig.themeClass,
        detailType: statusConfig.detailType,
        compact: statusConfig.compact,
        badgeCount: 0,
        acceptLoading: false,
        rejectLoading: false,
        contactLoading: false,
        deliveryLoading: false,
        refundHandleLoading: false,
        extraChargeLoading: false,
        quoteLoading: false,
        timelineLoading: false,
        timelineLoaded: false,
        timelineList: [],
        waitingDeliveryConfirm: false,
        publisherInfo: {
          name: publisherName,
          avatar: this.buildImageUrl(item.publisherAvatarUrl),
          userId: item.publisherUserId || item.publisherWxUserId || item.publishUserId || item.publishWxUserId || item.publisherId || ''
        },
        receiverInfo: {
          name: item.receiverUserName || '接单人',
          avatar: this.buildImageUrl(item.receiverAvatarUrl),
          userId: item.receiverUserId
        },
        participant: {
          name: item.receiverUserName || '接单人',
          time: timeText,
          avatar: this.buildImageUrl(item.receiverAvatarUrl),
          content: '',
          isSelf: true,
          isSystem: false,
          rowClass: 'timeline-row-self',
          userClass: 'timeline-user-self',
          textClass: 'timeline-text-self',
          reason: '订单已婉拒',
          subtitle: this.buildParticipantSubtitle(item.orderStatus)
        },
        taskDetailVisible: false,
        taskDetailLoading: false,
        taskDetailLoaded: false,
        taskDetailError: '',
        taskDetail: {},
        taskDetailImages: [],
        taskDetailProfessions: [],
        taskDetailGuarantees: [],
        taskDetailPosterIndex: 0,
        expanded: false
      };
    },
    fetchTimeline: function fetchTimeline(id) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var currentItem, res, list, sortedList, normalizedList, waitingDeliveryConfirm;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                currentItem = _this12.orderList.find(function (orderItem) {
                  return orderItem.id === id;
                });
                if (!(!currentItem || !currentItem.orderNo)) {
                  _context5.next = 3;
                  break;
                }
                return _context5.abrupt("return");
              case 3:
                _this12.updateOrderItem(id, function (orderItem) {
                  return _objectSpread(_objectSpread({}, orderItem), {}, {
                    timelineLoading: true
                  });
                });
                _context5.prev = 4;
                _context5.next = 7;
                return _request.default.post('/wechat/tOrder/timeline', {
                  orderNo: currentItem.orderNo
                });
              case 7:
                res = _context5.sent;
                list = _this12.extractTimelineList(res);
                sortedList = list.slice().sort(function (a, b) {
                  return _this12.parseTimeValue(a && a.createTime) - _this12.parseTimeValue(b && b.createTime);
                });
                normalizedList = sortedList.map(function (record) {
                  return _this12.normalizeTimelineRecord(record);
                }).filter(Boolean);
                waitingDeliveryConfirm = _this12.hasPendingDeliveryApply(normalizedList);
                _this12.updateOrderItem(id, function (orderItem) {
                  return _objectSpread(_objectSpread({}, orderItem), {}, {
                    timelineList: normalizedList,
                    timelineLoaded: true,
                    timelineLoading: false,
                    waitingDeliveryConfirm: waitingDeliveryConfirm,
                    publisherContactTime: normalizedList.length > 0 ? normalizedList[0].time : orderItem.publisherContactTime,
                    participant: normalizedList.length > 0 ? _objectSpread(_objectSpread({}, orderItem.participant), normalizedList[0]) : orderItem.participant
                  });
                });
                _context5.next = 18;
                break;
              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](4);
                _this12.updateOrderItem(id, function (orderItem) {
                  return _objectSpread(_objectSpread({}, orderItem), {}, {
                    timelineLoaded: false,
                    timelineLoading: false
                  });
                });
              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 15]]);
      }))();
    },
    extractTimelineList: function extractTimelineList(res) {
      var candidates = [res, res && res.data, res && res.data && res.data.data, res && res.timelineList, res && res.data && res.data.timelineList];
      return candidates.find(function (item) {
        return Array.isArray(item);
      }) || [];
    },
    getServiceTimeline: function getServiceTimeline(item) {
      if (item.timelineList && item.timelineList.length) {
        return item.timelineList;
      }
      return [item.participant];
    },
    getOrderFooterActions: function getOrderFooterActions(item) {
      if (!item) {
        return [];
      }
      // 退款申请待处理时优先显示退款处理按钮（即使已申请交稿）
      if (this.getPendingRefundTimeline(item)) {
        return [{
          key: 'handleRefund',
          text: '处理退款',
          loadingText: '处理中',
          loading: item.refundHandleLoading,
          className: 'primary-btn refund-handle-btn',
          disabled: item.refundHandleLoading
        }];
      }
      if (item.waitingDeliveryConfirm) {
        return [];
      }
      if (this.shouldShowInviteEmptyActions(item)) {
        if (item.hasInviteQuote) {
          return [{
            key: 'quoted',
            text: '已报价',
            loadingText: '已报价',
            loading: false,
            className: 'invite-primary-btn',
            disabled: true
          }];
        }
        var primaryKey = this.getInvitePrimaryAction(item);
        return [{
          key: 'reject',
          text: '婉拒',
          loadingText: '处理中',
          loading: item.rejectLoading,
          className: 'invite-reject-btn',
          disabled: item.rejectLoading
        }, {
          key: primaryKey,
          text: this.getInvitePrimaryText(item),
          loadingText: primaryKey === 'accept' ? '接单中' : this.getInvitePrimaryText(item),
          loading: primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading,
          className: 'invite-primary-btn',
          disabled: primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading
        }];
      }
      if (item.detailType === 'quote') {
        if (item.hasInviteQuote) {
          return [{
            key: 'quoted',
            text: '已报价',
            loadingText: '已报价',
            loading: false,
            className: 'primary-btn',
            disabled: true
          }];
        }
        var _primaryKey = this.getInvitePrimaryAction(item);
        return [{
          key: 'reject',
          text: '婉拒',
          loadingText: '处理中',
          loading: item.rejectLoading,
          className: 'ghost-btn',
          disabled: item.rejectLoading
        }, {
          key: _primaryKey,
          text: this.getInvitePrimaryText(item),
          loadingText: _primaryKey === 'accept' ? '接单中' : this.getInvitePrimaryText(item),
          loading: _primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading,
          className: 'primary-btn',
          disabled: _primaryKey === 'accept' ? item.acceptLoading : item.quoteLoading
        }];
      }
      if (this.canApplyDelivery(item)) {
        return [{
          key: 'submitDelivery',
          text: '申请交稿',
          loadingText: '提交中',
          loading: item.deliveryLoading,
          className: 'service-submit-btn',
          disabled: item.deliveryLoading
        }];
      }
      if (item.detailType === 'refund') {
        if (this.getPendingRefundTimeline(item)) {
          return [{
            key: 'handleRefund',
            text: '处理退款',
            loadingText: '处理中',
            loading: item.refundHandleLoading,
            className: 'primary-btn refund-handle-btn',
            disabled: item.refundHandleLoading
          }];
        }
        return [{
          key: 'refund',
          text: '处理中',
          loadingText: '处理中',
          loading: false,
          className: 'outline-btn mini-btn',
          disabled: false
        }];
      }
      if (item.detailType === 'done') {
        return [];
      }
      return [];
    },
    shouldShowInviteEmptyActions: function shouldShowInviteEmptyActions(item) {
      return !!item && (this.isInvitePendingAccept(item) || String(item.sourceType || '').toLowerCase() === 'invite') && item.timelineLoaded && !item.timelineLoading && (!item.timelineList || item.timelineList.length === 0);
    },
    isInvitePendingAccept: function isInvitePendingAccept(item) {
      return !!item && String(item.channelType || '').toLowerCase() === 'invite' && item.orderStatus === 'pending_accept';
    },
    isZeroOrderAmount: function isZeroOrderAmount(item) {
      if (!item) {
        return false;
      }
      if (item.orderAmount === null || item.orderAmount === undefined || item.orderAmount === '') {
        return false;
      }
      var numberValue = Number(item.orderAmount);
      return !Number.isNaN(numberValue) && numberValue === 0;
    },
    shouldShowInviteQuoteAction: function shouldShowInviteQuoteAction(item) {
      return !!item && String(item.channelType || '').toLowerCase() === 'invite' && String(item.sourceType || '').toLowerCase() === 'invite' && String(item.payStatus || '').toLowerCase() === 'unpaid';
    },
    getInvitePrimaryAction: function getInvitePrimaryAction(item) {
      if (item.hasInviteQuote) {
        return 'quoted';
      }
      if (this.shouldShowInviteQuoteAction(item)) {
        return 'quote';
      }
      if (this.isInvitePendingAccept(item)) {
        return 'accept';
      }
      return this.isZeroOrderAmount(item) ? 'quote' : 'accept';
    },
    getInvitePrimaryText: function getInvitePrimaryText(item) {
      if (item.hasInviteQuote) {
        return '已报价';
      }
      if (this.shouldShowInviteQuoteAction(item)) {
        return '报价';
      }
      if (this.isInvitePendingAccept(item)) {
        return '接单';
      }
      return this.isZeroOrderAmount(item) ? '报价' : '接单';
    },
    isCurrentReceiver: function isCurrentReceiver(item) {
      if (!item || !item.receiverInfo || this.currentUserId === '') {
        return false;
      }
      var receiverUserId = item.receiverInfo.userId;
      if (receiverUserId === undefined || receiverUserId === null || receiverUserId === '') {
        return false;
      }
      return String(receiverUserId) === String(this.currentUserId);
    },
    canApplyDelivery: function canApplyDelivery(item) {
      return !!item && item.detailType === 'service' && item.orderStatus === 'in_service' && !item.waitingDeliveryConfirm && this.isCurrentReceiver(item);
    },
    getServiceSubmitter: function getServiceSubmitter(item) {
      var lastTimeline = item.timelineList && item.timelineList.length ? item.timelineList[item.timelineList.length - 1] : null;
      return {
        name: item.receiverInfo.name,
        avatar: item.receiverInfo.avatar,
        isSelf: item.receiverInfo.userId === undefined || item.receiverInfo.userId === null ? true : String(item.receiverInfo.userId) === String(this.currentUserId),
        content: lastTimeline && lastTimeline.content ? lastTimeline.content : item.participant.content,
        time: lastTimeline && lastTimeline.time ? lastTimeline.time : item.participant.time
      };
    },
    getServiceSubmitterAvatar: function getServiceSubmitterAvatar(item) {
      return this.getServiceSubmitter(item).avatar;
    },
    getServiceSubmitterName: function getServiceSubmitterName(item) {
      return this.getServiceSubmitter(item).name;
    },
    getServiceSubmitterTime: function getServiceSubmitterTime(item) {
      return this.getServiceSubmitter(item).time;
    },
    normalizeTimelineRecord: function normalizeTimelineRecord(record) {
      if (!record) {
        return null;
      }
      var role = record.senderRole || '';
      var content = record.content === undefined || record.content === null ? '' : String(record.content);
      var senderUserId = record.senderUserId;
      var isSystem = role === 'system' || record.recordType === 'system' || record.actionType === 'system' || senderUserId === undefined || senderUserId === null || senderUserId === '' || String(content).trim().indexOf('处理结果：') === 0;
      var isSelf = !isSystem && this.isSelfTimeline(record);
      return {
        name: record.senderNickName || '匿名用户',
        time: this.formatDateTime(record.createTime),
        avatar: this.buildImageUrl(record.senderAvatarUrl),
        content: content,
        senderUserId: senderUserId,
        isSelf: isSelf,
        isSystem: isSystem,
        role: role,
        senderRole: role,
        rowClass: isSystem ? 'timeline-row-system' : isSelf ? 'timeline-row-self' : 'timeline-row-other',
        userClass: isSelf ? 'timeline-user-self' : 'timeline-user-other',
        textClass: isSelf ? 'timeline-text-self' : 'timeline-text-other',
        timelineId: record.timelineId || record.id || record.timeline_id || '',
        eventType: record.event_type || record.eventType || '',
        actionStatus: record.actionStatus || record.action_status || ''
      };
    },
    getPendingRefundTimeline: function getPendingRefundTimeline(item) {
      if (!item || !Array.isArray(item.timelineList) || item.timelineList.length === 0) {
        return null;
      }
      var lastTimeline = item.timelineList[item.timelineList.length - 1];
      return this.isRefundPendingTimeline(lastTimeline) ? lastTimeline : null;
    },
    buildParticipantSubtitle: function buildParticipantSubtitle(orderStatus) {
      if (orderStatus === 'in_service') {
        return '已接单，等待沟通细节';
      }
      if (orderStatus === 'completed') {
        return '已完成交付，可继续评价';
      }
      return '订单状态更新中';
    },
    formatDate: function formatDate(value) {
      if (!value) {
        return '--';
      }
      return String(value).slice(0, 10).replace(/-/g, '/');
    },
    formatShortDate: function formatShortDate(value) {
      if (!value) {
        return '待定';
      }
      var text = String(value);
      if (text.length >= 10) {
        return text.slice(0, 10).replace(/-/g, '/');
      }
      return text.replace(/-/g, '/');
    },
    formatDateTime: function formatDateTime(value) {
      if (!value) {
        return '--';
      }
      var text = String(value);
      if (text.length >= 16) {
        return text.slice(5, 16).replace(/-/g, '/');
      }
      return text.replace(/-/g, '/');
    },
    parseTimeValue: function parseTimeValue(value) {
      if (!value) {
        return 0;
      }
      var timestamp = new Date(String(value).replace(/-/g, '/')).getTime();
      return Number.isNaN(timestamp) ? 0 : timestamp;
    },
    formatAmount: function formatAmount(value) {
      if (value === null || value === undefined || value === '') {
        return '--';
      }
      var numberValue = Number(value);
      if (Number.isNaN(numberValue)) {
        return String(value);
      }
      return numberValue % 1 === 0 ? String(numberValue) : numberValue.toFixed(2);
    },
    parseAmountValue: function parseAmountValue(value) {
      if (value === null || value === undefined || value === '') {
        return NaN;
      }
      var normalized = String(value).replace(/,/g, '').trim();
      if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
        return NaN;
      }
      return Number(normalized);
    },
    formatSubmitAmount: function formatSubmitAmount(value) {
      return Number(value).toFixed(2);
    },
    buildImageUrl: function buildImageUrl(url) {
      if (!url) {
        return DEFAULT_AVATAR;
      }
      var text = String(url);
      if (/^(https?:|wxfile:|data:|\/static\/)/.test(text)) {
        return text;
      }
      return _env.default.aliyunUrl + text.replace(/^\/+/, '');
    },
    closeContactPopup: function closeContactPopup() {
      this.contactPopup = {
        visible: false,
        phone: '',
        wxNumber: ''
      };
    },
    extractContactData: function extractContactData(res) {
      var candidates = [res && res.data, res && res.data && res.data.data, res];
      return candidates.find(function (item) {
        return item && (0, _typeof2.default)(item) === 'object' && (item.phone !== undefined || item.wxNumber !== undefined);
      }) || {};
    },
    getPublisherContactUserId: function getPublisherContactUserId(item) {
      if (!item) {
        return '';
      }
      return item.publisherUserId || '';
    },
    showContact: function showContact(item) {
      var _this13 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var userId, res, data;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!item || item.contactLoading)) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return");
              case 2:
                userId = _this13.getPublisherContactUserId(item);
                if (userId) {
                  _context6.next = 6;
                  break;
                }
                uni.showToast({
                  title: '发单人用户ID缺失，无法获取联系信息',
                  icon: 'none'
                });
                return _context6.abrupt("return");
              case 6:
                item.contactLoading = true;
                _context6.prev = 7;
                _context6.next = 10;
                return _request.default.post('/wechat/tOrder/contact', {
                  userId: userId
                }, {
                  loading: true,
                  loadingText: '获取联系中...'
                });
              case 10:
                res = _context6.sent;
                data = _this13.extractContactData(res);
                _this13.contactPopup = {
                  visible: true,
                  phone: data.phone ? String(data.phone) : '',
                  wxNumber: data.wxNumber ? String(data.wxNumber) : ''
                };
                _context6.next = 17;
                break;
              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](7);
              case 17:
                _context6.prev = 17;
                item.contactLoading = false;
                return _context6.finish(17);
              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[7, 15, 17, 20]]);
      }))();
    },
    rejectOrder: function rejectOrder(item, rejectContent) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!item || item.rejectLoading)) {
                  _context7.next = 2;
                  break;
                }
                return _context7.abrupt("return");
              case 2:
                if (item.orderNo) {
                  _context7.next = 5;
                  break;
                }
                uni.showToast({
                  title: '订单编号缺失，无法婉拒',
                  icon: 'none'
                });
                return _context7.abrupt("return");
              case 5:
                if (rejectContent) {
                  _context7.next = 8;
                  break;
                }
                uni.showToast({
                  title: '请选择婉拒理由',
                  icon: 'none'
                });
                return _context7.abrupt("return");
              case 8:
                item.rejectLoading = true;
                _this14.rejectPopupLoading = true;
                _context7.prev = 10;
                _context7.next = 13;
                return _request.default.post('/wechat/tOrder/reject', {
                  orderNo: item.orderNo,
                  rejectContent: rejectContent
                }, {
                  loading: true,
                  loadingText: '婉拒中...'
                });
              case 13:
                uni.showToast({
                  title: '婉拒成功',
                  icon: 'success'
                });
                _this14.rejectPopupVisible = false;
                _this14.rejectTargetItem = null;
                _this14.resetList();
                _context7.next = 21;
                break;
              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](10);
              case 21:
                _context7.prev = 21;
                item.rejectLoading = false;
                _this14.rejectPopupLoading = false;
                return _context7.finish(21);
              case 25:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[10, 19, 21, 25]]);
      }))();
    },
    acceptOrder: function acceptOrder(item) {
      var _this15 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(!item || item.acceptLoading)) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return");
              case 2:
                if (item.orderNo) {
                  _context8.next = 5;
                  break;
                }
                uni.showToast({
                  title: '订单编号缺失，无法接单',
                  icon: 'none'
                });
                return _context8.abrupt("return");
              case 5:
                item.acceptLoading = true;
                _context8.prev = 6;
                _context8.next = 9;
                return _request.default.post('/wechat/tOrder/accept', {
                  orderNo: item.orderNo
                }, {
                  loading: true,
                  loadingText: '接单中...'
                });
              case 9:
                uni.showToast({
                  title: '接单成功',
                  icon: 'success'
                });
                _this15.resetList();
                _context8.next = 15;
                break;
              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8["catch"](6);
              case 15:
                _context8.prev = 15;
                item.acceptLoading = false;
                return _context8.finish(15);
              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[6, 13, 15, 18]]);
      }))();
    },
    applyDelivery: function applyDelivery(item) {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var confirmRes;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(!item.orderNo || item.deliveryLoading)) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return");
              case 2:
                _context9.next = 4;
                return new Promise(function (resolve) {
                  uni.showModal({
                    title: '确认交稿',
                    content: "\u786E\u5B9A\u63D0\u4EA4\u201C".concat(item.taskTitle, "\u201D\u7684\u4EA4\u7A3F\u7533\u8BF7\u5417\uFF1F"),
                    confirmColor: '#F37738',
                    success: resolve,
                    fail: function fail() {
                      return resolve({
                        confirm: false
                      });
                    }
                  });
                });
              case 4:
                confirmRes = _context9.sent;
                if (confirmRes.confirm) {
                  _context9.next = 7;
                  break;
                }
                return _context9.abrupt("return");
              case 7:
                item.deliveryLoading = true;
                _context9.prev = 8;
                _context9.next = 11;
                return _request.default.post('/wechat/tOrder/applyDelivery', {
                  orderNo: item.orderNo
                }, {
                  loading: true,
                  loadingText: '交稿提交中...'
                });
              case 11:
                uni.showToast({
                  title: '交稿申请已提交',
                  icon: 'success'
                });
                _this16.resetList();
                _context9.next = 17;
                break;
              case 15:
                _context9.prev = 15;
                _context9.t0 = _context9["catch"](8);
              case 17:
                _context9.prev = 17;
                item.deliveryLoading = false;
                return _context9.finish(17);
              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[8, 15, 17, 20]]);
      }))();
    },
    openExtraChargePopup: function openExtraChargePopup(item) {
      if (!item || !item.orderNo || item.extraChargeLoading) {
        return;
      }
      this.extraChargePopup = {
        visible: true,
        item: item,
        amount: '',
        submitting: false
      };
    },
    closeExtraChargePopup: function closeExtraChargePopup() {
      if (this.extraChargePopup.submitting) {
        return;
      }
      this.extraChargePopup = {
        visible: false,
        item: null,
        amount: '',
        submitting: false
      };
    },
    openQuoteInvitePopup: function openQuoteInvitePopup(item) {
      if (!item || !item.orderNo || item.quoteLoading) {
        if (!item || !item.orderNo) {
          uni.showToast({
            title: '订单编号缺失，无法报价',
            icon: 'none'
          });
        }
        return;
      }
      this.quoteInvitePopup = {
        visible: true,
        item: item,
        amount: '',
        submitting: false
      };
    },
    closeQuoteInvitePopup: function closeQuoteInvitePopup() {
      if (this.quoteInvitePopup.submitting) {
        return;
      }
      this.quoteInvitePopup = {
        visible: false,
        item: null,
        amount: '',
        submitting: false
      };
    },
    confirmQuoteInviteOrder: function confirmQuoteInviteOrder() {
      var _this17 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var item, amount;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!_this17.quoteInvitePopup.submitting) {
                  _context10.next = 2;
                  break;
                }
                return _context10.abrupt("return");
              case 2:
                item = _this17.quoteInvitePopup.item;
                if (!(!item || !item.orderNo)) {
                  _context10.next = 6;
                  break;
                }
                uni.showToast({
                  title: '订单编号缺失，无法报价',
                  icon: 'none'
                });
                return _context10.abrupt("return");
              case 6:
                amount = _this17.parseAmountValue(_this17.quoteInvitePopup.amount);
                if (!(Number.isNaN(amount) || amount < 0.01 || amount > 99999999.99)) {
                  _context10.next = 10;
                  break;
                }
                uni.showToast({
                  title: '请输入0.01至99999999.99的金额',
                  icon: 'none'
                });
                return _context10.abrupt("return");
              case 10:
                _this17.quoteInvitePopup.submitting = true;
                item.quoteLoading = true;
                _context10.prev = 12;
                _context10.next = 15;
                return _request.default.post('/wechat/tOrder/quoteInviteOrder', {
                  orderNo: item.orderNo,
                  quoteAmount: Number(_this17.formatSubmitAmount(amount))
                }, {
                  loading: true,
                  loadingText: '报价提交中...'
                });
              case 15:
                uni.showToast({
                  title: '报价已提交',
                  icon: 'success'
                });
                _this17.quoteInvitePopup = {
                  visible: false,
                  item: null,
                  amount: '',
                  submitting: false
                };
                _this17.resetList();
                _context10.next = 23;
                break;
              case 20:
                _context10.prev = 20;
                _context10.t0 = _context10["catch"](12);
                _this17.quoteInvitePopup.submitting = false;
              case 23:
                _context10.prev = 23;
                item.quoteLoading = false;
                return _context10.finish(23);
              case 26:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[12, 20, 23, 26]]);
      }))();
    },
    confirmExtraCharge: function confirmExtraCharge() {
      var _this18 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var item, amount;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!_this18.extraChargePopup.submitting) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return");
              case 2:
                item = _this18.extraChargePopup.item;
                if (!(!item || !item.orderNo)) {
                  _context11.next = 6;
                  break;
                }
                uni.showToast({
                  title: '订单编号缺失，无法加钱',
                  icon: 'none'
                });
                return _context11.abrupt("return");
              case 6:
                amount = _this18.parseAmountValue(_this18.extraChargePopup.amount);
                if (!(Number.isNaN(amount) || amount < 0.01 || amount > 99999999.99)) {
                  _context11.next = 10;
                  break;
                }
                uni.showToast({
                  title: '请输入0.01至99999999.99的金额',
                  icon: 'none'
                });
                return _context11.abrupt("return");
              case 10:
                _this18.extraChargePopup.submitting = true;
                item.extraChargeLoading = true;
                _context11.prev = 12;
                _context11.next = 15;
                return _request.default.post('/wechat/outSourcing/extraCharge', {
                  orderNo: item.orderNo,
                  extraAmount: Number(_this18.formatSubmitAmount(amount)),
                  operationType: 'receiver_apply'
                }, {
                  loading: true,
                  loadingText: '提交中...'
                });
              case 15:
                uni.showToast({
                  title: '加价申请已提交',
                  icon: 'success'
                });
                _this18.extraChargePopup = {
                  visible: false,
                  item: null,
                  amount: '',
                  submitting: false
                };
                if (item.expanded) {
                  _this18.fetchTimeline(item.id);
                } else {
                  _this18.resetList();
                }
                _context11.next = 23;
                break;
              case 20:
                _context11.prev = 20;
                _context11.t0 = _context11["catch"](12);
                _this18.extraChargePopup.submitting = false;
              case 23:
                _context11.prev = 23;
                item.extraChargeLoading = false;
                return _context11.finish(23);
              case 26:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[12, 20, 23, 26]]);
      }))();
    },
    handleRefund: function handleRefund(item, refundTimeline, action) {
      var _this19 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(!item || item.refundHandleLoading)) {
                  _context12.next = 2;
                  break;
                }
                return _context12.abrupt("return");
              case 2:
                item.refundHandleLoading = true;
                _context12.prev = 3;
                _context12.next = 6;
                return _request.default.post('/wechat/outSourcing/handleRefund', {
                  orderNo: item.orderNo,
                  timelineId: refundTimeline.timelineId,
                  action: action
                }, {
                  loading: true,
                  loadingText: '退款处理中...'
                });
              case 6:
                uni.showToast({
                  title: action === 'agree' ? '已同意退款' : '已拒绝退款',
                  icon: 'success'
                });
                _this19.resetList();
                _context12.next = 12;
                break;
              case 10:
                _context12.prev = 10;
                _context12.t0 = _context12["catch"](3);
              case 12:
                _context12.prev = 12;
                item.refundHandleLoading = false;
                return _context12.finish(12);
              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[3, 10, 12, 15]]);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 302:
/*!*********************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue?vue&type=style&index=0&id=7e43740c&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=7e43740c&scoped=true&lang=css& */ 303);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_7e43740c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 303:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-task/pages/taskOrder/index.vue?vue&type=style&index=0&id=7e43740c&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[296,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg-task/pages/taskOrder/index.js.map