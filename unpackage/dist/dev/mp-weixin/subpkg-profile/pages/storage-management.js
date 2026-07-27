(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg-profile/pages/storage-management"],{

/***/ 100:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue?vue&type=script&lang=js& ***!
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
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 49));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var qiunDataCharts = function qiunDataCharts() {
  Promise.all(/*! require.ensure | uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts")]).then((function () {
    return resolve(__webpack_require__(/*! @/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue */ 372));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    qiunDataCharts: qiunDataCharts // 注册组件
  },
  data: function data() {
    return {
      usedMb: 0,
      totalMb: 0,
      remainingMb: 0,
      expandVisible: false,
      usedFlow: 0,
      totalFlow: 0,
      remainingFlow: 0,
      remainFlow: 0,
      flowExpandVisible: false,
      userRole: 'none',
      showUsedFlowDetail: false,
      showTotalFlowDetail: false,
      memberFlow: 0,
      paidFlow: 0,
      flowHistory: [],
      selectedFlowHistoryIndex: -1,
      chartOpts: {
        padding: [15, 20, 10, 15],
        // 上右下左边距（增加右边距以显示单位）
        legend: {
          show: false
        },
        // 不显示图例
        xAxis: {
          gridType: 'dash',
          dashLength: 4,
          gridColor: '#e0e0e0',
          fontColor: '#999999',
          fontSize: 10,
          rotateLabel: false,
          itemCount: 6,
          // 显示6个标签
          boundaryGap: 'justify' // 标签对齐
        },

        yAxis: {
          gridType: 'dash',
          dashLength: 4,
          gridColor: '#e0e0e0',
          fontColor: '#999999',
          fontSize: 10,
          splitNumber: 4,
          // 直接在yAxis上设置标签格式化
          labelFormat: function labelFormat(val) {
            if (val < 0.01) return val;

            // 判断是否为整数
            if (Number.isInteger(val)) {
              return val;
            }

            // 判断小数位数
            if (val * 10 % 1 === 0) {
              // 检查这一位小数是否为0
              if (Math.round(val * 10) / 10 === Math.round(val)) {
                return Math.round(val);
              }
              return val.toFixed(1);
            }

            // 其他情况保留两位小数
            return val.toFixed(2);
          },
          data: [{
            min: 0,
            unit: 'GB'
          }]
        },
        extra: {
          line: {
            type: 'straight',
            // 折线类型
            width: 3,
            activeType: 'hollow'
          }
        },
        dataLabel: false,
        // 不显示数据标签
        enableScroll: false,
        animation: true
      }
    };
  },
  computed: {
    storagePercentage: function storagePercentage() {
      if (!this.totalMb) return 0;
      var percentage = this.usedMb / this.totalMb * 100;
      var roundedPercentage = Math.min(percentage, 100);
      // 显示一位小数
      return roundedPercentage.toFixed(1);
    },
    flowPercentage: function flowPercentage() {
      if (!this.totalFlow) return 0;
      var percentage = this.usedFlow / this.totalFlow * 100;
      var roundedPercentage = Math.min(percentage, 100);
      // 显示一位小数
      return roundedPercentage.toFixed(1);
    },
    isStorageWarning: function isStorageWarning() {
      if (!this.totalMb) return false;
      var percentage = this.usedMb / this.totalMb * 100;
      return percentage >= 90;
    },
    isFlowWarning: function isFlowWarning() {
      if (!this.totalFlow) return false;
      var percentage = this.usedFlow / this.totalFlow * 100;
      return percentage >= 90;
    }
  },
  onShow: function onShow() {
    this.loadStorageInfo();
  },
  methods: {
    // 格式化小时显示（去掉前导零）
    formatHour: function formatHour(hour) {
      // 如果小时是"00"到"09"，去掉前导零
      var hourNum = parseInt(hour);
      return hourNum + ':00';
    },
    // 获取图表数据（uCharts 格式）
    getChartData: function getChartData(item) {
      var _this = this;
      console.log('Chart data:', item.hourlyData);
      if (!item.hourlyData || item.hourlyData.length === 0) {
        return {
          categories: [],
          series: []
        };
      }

      // 提取小时作为 X 轴标签
      var categories = item.hourlyData.map(function (p) {
        return _this.formatHour(p.hour);
      });

      // 提取数值（已经是 GB 单位，直接使用）
      var values = item.hourlyData.map(function (p) {
        return parseFloat(p.value) || 0;
      });
      return {
        categories: categories,
        series: [{
          name: '流量 (GB)',
          // 在系列名称中也添加单位
          data: values,
          color: '#F37738'
        }]
      };
    },
    // 修改 toggleFlowDetail 方法
    toggleFlowDetail: function toggleFlowDetail(index) {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var item, dayType, chartRes, values, maxValue, allZeros, maxYValue;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2.selectedFlowHistoryIndex === index)) {
                  _context.next = 4;
                  break;
                }
                _this2.selectedFlowHistoryIndex = -1;
                _context.next = 18;
                break;
              case 4:
                _this2.selectedFlowHistoryIndex = index;
                item = _this2.flowHistory[index];
                dayType = item.dayType || 'other';
                _context.prev = 7;
                _context.next = 10;
                return _this2.$request.get("/wechat/flow/findUserFlowChart?dayType=".concat(dayType));
              case 10:
                chartRes = _context.sent;
                if (chartRes.code === 200 && chartRes.data) {
                  // 更新数据
                  _this2.$set(_this2.flowHistory[index], 'hourlyData', chartRes.data.hourlyData || []);

                  // 计算最大值，设置 Y 轴范围
                  values = chartRes.data.hourlyData.map(function (p) {
                    return parseFloat(p.value) || 0;
                  });
                  maxValue = Math.max.apply(Math, (0, _toConsumableArray2.default)(values)); // 判断是否全部为0
                  allZeros = values.every(function (v) {
                    return v === 0;
                  });
                  if (allZeros) {
                    // 全部为0的情况，设置最大值为1
                    _this2.$set(_this2.chartOpts.yAxis.data[0], 'max', 1);
                    _this2.$set(_this2.chartOpts.yAxis.data[0], 'min', 0);
                  } else if (maxValue > 0) {
                    // 有正数的情况，动态计算

                    if (maxValue < 0.1) {
                      maxYValue = Math.ceil(maxValue * 1.5 * 1000) / 1000;
                    } else if (maxValue < 1) {
                      maxYValue = Math.ceil(maxValue * 1.3 * 100) / 100;
                    } else if (maxValue < 10) {
                      maxYValue = Math.ceil(maxValue * 1.2 * 10) / 10;
                    } else {
                      maxYValue = Math.ceil(maxValue * 1.1);
                    }
                    _this2.$set(_this2.chartOpts.yAxis.data[0], 'max', maxYValue);
                    _this2.$set(_this2.chartOpts.yAxis.data[0], 'min', 0);
                  }
                  // 其他情况（如负数）的处理...
                }
                _context.next = 18;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](7);
                console.error('获取流量趋势数据失败:', _context.t0);
                // 如果接口调用失败，使用默认数据
                if (!_this2.flowHistory[index].hourlyData || _this2.flowHistory[index].hourlyData.length === 0) {
                  _this2.flowHistory[index].hourlyData = [{
                    "hour": "00",
                    "value": 0
                  }, {
                    "hour": "04",
                    "value": 0
                  }, {
                    "hour": "08",
                    "value": 0
                  }, {
                    "hour": "12",
                    "value": 0
                  }, {
                    "hour": "16",
                    "value": 0
                  }, {
                    "hour": "20",
                    "value": 0
                  }];
                  // 设置最大值为1
                  _this2.$set(_this2.chartOpts.yAxis.data[0], 'max', 1);
                  _this2.$set(_this2.chartOpts.yAxis.data[0], 'min', 0);
                }
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 14]]);
      }))();
    },
    loadStorageInfo: function loadStorageInfo() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var isTeamMode, teamOwnerId, url, res, data, used, total, flowRes, flowData;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // 从缓存中读取团队模式状态和团长的 userId
                isTeamMode = uni.getStorageSync('isTeamMode') || false;
                teamOwnerId = uni.getStorageSync('teamOwnerId'); // 构建请求URL，团队模式下传递团长的 userId
                url = '/wechat/user/getUserInfo';
                if (isTeamMode && teamOwnerId) {
                  url += "?userId=".concat(teamOwnerId);
                }

                // 获取作品空间数据
                _context2.next = 7;
                return _this3.$request.get(url);
              case 7:
                res = _context2.sent;
                data = res.data || {};
                used = data.cloudUsedMb || 0;
                total = data.cloudTotalMb || 0;
                _this3.userRole = res.data.vipLevel;
                _this3.usedMb = used;
                _this3.totalMb = total;
                // 计算剩余空间，允许为负数以表示超出使用
                _this3.remainingMb = total - used;

                // 获取流量使用数据（调用不同的接口）
                _context2.prev = 15;
                _context2.next = 18;
                return _this3.$request.get('/wechat/flow/findUserFlow');
              case 18:
                flowRes = _context2.sent;
                if (flowRes.code === 200 && flowRes.data) {
                  flowData = flowRes.data; // 将 KB 转换为 MB
                  _this3.usedFlow = (flowData.usedFlow || 0) / 1024;
                  _this3.totalFlow = (flowData.totalFlow || flowData.remainFlow || 0) / 1024;
                  _this3.remainFlow = (flowData.remainFlow || 0) / 1024;
                }
                _context2.next = 28;
                break;
              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](15);
                console.error('获取流量数据失败:', _context2.t0);
                // 如果流量接口调用失败，使用默认值
                _this3.usedFlow = 0;
                _this3.totalFlow = 0;
                _this3.remainFlow = 0;
              case 28:
                _context2.next = 32;
                break;
              case 30:
                _context2.prev = 30;
                _context2.t1 = _context2["catch"](0);
              case 32:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 30], [15, 22]]);
      }))();
    },
    formatStorage: function formatStorage(mb) {
      if (!mb && mb !== 0) return '0KB';
      // 处理负数情况
      var isNegative = mb < 0;
      var absMb = Math.abs(mb);
      var result;
      if (absMb < 1) {
        // 小于 1MB 时，转换为 KB 显示
        var kb = absMb * 1024;
        result = kb.toFixed(0) + 'KB';
      } else if (absMb < 1024) {
        result = absMb.toFixed(2) + 'MB';
      } else {
        result = (absMb / 1024).toFixed(2) + 'GB';
      }

      // 添加负号
      return isNegative ? '-' + result : result;
    },
    openExpand: function openExpand() {
      if (this.userRole == 'none') {
        uni.showToast({
          title: '请先开通会员',
          icon: 'none'
        });
        return;
      }
      this.expandVisible = true;
    },
    openFlowExpand: function openFlowExpand() {
      if (this.userRole == 'none') {
        uni.showToast({
          title: '请先开通会员',
          icon: 'none'
        });
        return;
      }
      this.flowExpandVisible = true;
    },
    handleExpandConfirm: function handleExpandConfirm(payload) {
      var _this4 = this;
      this.expandVisible = false;
      var option = payload && payload.option ? payload.option : null;
      if (!option || !option.id) {
        uni.showToast({
          title: '请选择扩容套餐',
          icon: 'none'
        });
        return;
      }
      uni.showModal({
        title: '确认购买',
        content: "\u786E\u5B9A\u8D2D\u4E70".concat(option.space, "GB\uFF08").concat(option.month, "\u4E2A\u6708\uFF09\uFF1F\u4EF7\u683C\uFF1A\xA5").concat(option.price),
        success: function success(res) {
          if (res.confirm) {
            _this4.$request.post("/wechat/space/order?id=".concat(option.id)).then(function (orderRes) {
              if (orderRes.code !== 200) {
                uni.showToast({
                  title: orderRes.msg || '下单失败',
                  icon: 'none'
                });
                return;
              }
              var payParams = orderRes.data;
              if (typeof payParams === 'string') {
                try {
                  payParams = JSON.parse(payParams);
                } catch (e) {}
              }
              uni.requestPayment(_objectSpread(_objectSpread({
                provider: 'wxpay'
              }, payParams), {}, {
                success: function success() {
                  uni.showToast({
                    title: '支付成功',
                    icon: 'success'
                  });
                  _this4.loadStorageInfo();
                },
                fail: function fail(err) {
                  uni.showToast({
                    title: err.errMsg && err.errMsg.indexOf('cancel') !== -1 ? '支付已取消' : '支付失败',
                    icon: 'none'
                  });
                }
              }));
            });
          }
        }
      });
    },
    handleFlowExpandConfirm: function handleFlowExpandConfirm(payload) {
      var _this5 = this;
      this.flowExpandVisible = false;
      var packageId = payload && payload.packageId ? payload.packageId : null;
      if (!packageId) {
        uni.showToast({
          title: '请选择流量套餐',
          icon: 'none'
        });
        return;
      }
      uni.showModal({
        title: '确认购买',
        content: "\u786E\u5B9A\u8D2D\u4E70\u6D41\u91CF\u5305\uFF1F",
        success: function success(res) {
          if (res.confirm) {
            _this5.$request.post("/wechat/flow/flowPackagePay", {
              packageId: packageId
            }).then(function (orderRes) {
              if (orderRes.code !== 200) {
                uni.showToast({
                  title: orderRes.msg || '下单失败',
                  icon: 'none'
                });
                return;
              }
              var payParams = orderRes.data;
              if (typeof payParams === 'string') {
                try {
                  payParams = JSON.parse(payParams);
                } catch (e) {}
              }
              uni.requestPayment(_objectSpread(_objectSpread({
                provider: 'wxpay'
              }, payParams), {}, {
                success: function success() {
                  uni.showToast({
                    title: '支付成功',
                    icon: 'success'
                  });
                  _this5.loadStorageInfo();
                },
                fail: function fail(err) {
                  uni.showToast({
                    title: err.errMsg && err.errMsg.indexOf('cancel') !== -1 ? '支付已取消' : '支付失败',
                    icon: 'none'
                  });
                }
              }));
            });
          }
        }
      });
    },
    openUsedFlowDetail: function openUsedFlowDetail() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var today, yesterday, dayBeforeYesterday, formatDate, todayStr, yesterdayStr, dayBeforeYesterdayStr, flowRes;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this6.showUsedFlowDetail = true;
                // 生成今日、昨日、前日的日期
                today = new Date();
                yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                dayBeforeYesterday = new Date(today);
                dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

                // 格式化日期为 YYYY-MM-DD
                formatDate = function formatDate(date) {
                  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
                };
                todayStr = formatDate(today);
                yesterdayStr = formatDate(yesterday);
                dayBeforeYesterdayStr = formatDate(dayBeforeYesterday); // 获取流量使用历史数据
                _context3.prev = 10;
                _context3.next = 13;
                return _this6.$request.get('/wechat/flow/findFlowByDay');
              case 13:
                flowRes = _context3.sent;
                if (flowRes.code === 200 && flowRes.data) {
                  // 转换接口返回的数据格式
                  _this6.flowHistory = flowRes.data.map(function (item) {
                    return _objectSpread(_objectSpread({}, item), {}, {
                      value: item.usage / 1024,
                      // 转换为 MB
                      hourlyData: [] // 初始化为空数组，后续通过 toggleFlowDetail 获取
                    });
                  });
                } else {
                  // // 如果接口调用失败，使用默认数据
                  _this6.flowHistory = [];
                }
                _context3.next = 21;
                break;
              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](10);
                console.error('获取流量历史数据失败:', _context3.t0);
                // 如果接口调用失败，使用默认数据
                _this6.flowHistory = [];
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[10, 17]]);
      }))();
    },
    openTotalFlowDetail: function openTotalFlowDetail() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var flowRes, flowData;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this7.showTotalFlowDetail = true;
                _context4.prev = 1;
                _context4.next = 4;
                return _this7.$request.get('/wechat/flow/findUserFlowBucketInfo');
              case 4:
                flowRes = _context4.sent;
                if (flowRes.code === 200 && flowRes.data) {
                  flowData = flowRes.data; // 将 KB 转换为 MB
                  _this7.memberFlow = (flowData.memberFlow || 0) / 1024;
                  _this7.paidFlow = (flowData.purchaseFlow || 0) / 1024;
                  _this7.totalFlow = (flowData.totalFlow || 0) / 1024;
                }
                _context4.next = 13;
                break;
              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                console.error('获取总流量详情失败:', _context4.t0);
                // 如果接口调用失败，使用默认值
                _this7.memberFlow = 0;
                _this7.paidFlow = 0;
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }))();
    },
    getDatePrefix: function getDatePrefix(dateStr) {
      // 解析日期字符串
      var date = new Date(dateStr);
      var today = new Date();
      var yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      var dayBeforeYesterday = new Date(today);
      dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

      // 格式化日期，只比较年月日
      var formatDate = function formatDate(date) {
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      };
      var dateStrFormatted = formatDate(date);
      var todayFormatted = formatDate(today);
      var yesterdayFormatted = formatDate(yesterday);
      var dayBeforeYesterdayFormatted = formatDate(dayBeforeYesterday);

      // 判断日期是今天、昨天还是前天
      if (dateStrFormatted === todayFormatted) {
        return '今日';
      } else if (dateStrFormatted === yesterdayFormatted) {
        return '昨日';
      } else if (dateStrFormatted === dayBeforeYesterdayFormatted) {
        return '前日';
      } else {
        return '';
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 101:
/*!***************************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue?vue&type=style&index=0&id=7def37ae&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./storage-management.vue?vue&type=style&index=0&id=7def37ae&scoped=true&lang=css& */ 102);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 102:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue?vue&type=style&index=0&id=7def37ae&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 95:
/*!*************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/main.js?{"page":"subpkg-profile%2Fpages%2Fstorage-management"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 30);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _storageManagement = _interopRequireDefault(__webpack_require__(/*! ./subpkg-profile/pages/storage-management.vue */ 96));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_storageManagement.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 96:
/*!******************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage-management.vue?vue&type=template&id=7def37ae&scoped=true& */ 97);
/* harmony import */ var _storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage-management.vue?vue&type=script&lang=js& */ 99);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _storage_management_vue_vue_type_style_index_0_id_7def37ae_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage-management.vue?vue&type=style&index=0&id=7def37ae&scoped=true&lang=css& */ 101);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 37);

var renderjs





/* normalize component */

var component = Object(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7def37ae",
  null,
  false,
  _storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg-profile/pages/storage-management.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 97:
/*!*************************************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue?vue&type=template&id=7def37ae&scoped=true& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./storage-management.vue?vue&type=template&id=7def37ae&scoped=true& */ 98);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_template_id_7def37ae_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 98:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue?vue&type=template&id=7def37ae&scoped=true& ***!
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
    yunStorageWarning: function () {
      return __webpack_require__.e(/*! import() | components/yun-storage-warning */ "components/yun-storage-warning").then(__webpack_require__.bind(null, /*! @/components/yun-storage-warning.vue */ 344))
    },
    qiunDataCharts: function () {
      return Promise.all(/*! import() | uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts")]).then(__webpack_require__.bind(null, /*! @/uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue */ 372))
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
  var m0 = _vm.formatStorage(_vm.usedMb)
  var m1 = _vm.formatStorage(_vm.totalMb)
  var m2 = _vm.formatStorage(_vm.usedMb)
  var m3 = _vm.formatStorage(_vm.totalMb)
  var m4 = _vm.formatStorage(_vm.remainingMb)
  var m5 = _vm.formatStorage(_vm.usedFlow)
  var m6 = _vm.formatStorage(_vm.totalFlow)
  var m7 = _vm.formatStorage(_vm.usedFlow)
  var m8 = _vm.formatStorage(_vm.totalFlow)
  var m9 = _vm.formatStorage(_vm.remainFlow)
  var m10 = _vm.showUsedFlowDetail ? _vm.formatStorage(_vm.usedFlow) : null
  var l0 = _vm.showUsedFlowDetail
    ? _vm.__map(_vm.flowHistory, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var m11 = _vm.getDatePrefix(item.date)
        var m12 = _vm.formatStorage(item.value)
        var g0 =
          _vm.selectedFlowHistoryIndex === index &&
          item.hourlyData &&
          item.hourlyData.length
        var m13 = g0 ? _vm.getDatePrefix(item.date) : null
        var m14 = g0 ? _vm.getChartData(item) : null
        return {
          $orig: $orig,
          m11: m11,
          m12: m12,
          g0: g0,
          m13: m13,
          m14: m14,
        }
      })
    : null
  var m15 = _vm.showTotalFlowDetail ? _vm.formatStorage(_vm.memberFlow) : null
  var m16 = _vm.showTotalFlowDetail ? _vm.formatStorage(_vm.paidFlow) : null
  var m17 = _vm.showTotalFlowDetail ? _vm.formatStorage(_vm.totalFlow) : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.expandVisible = false
    }
    _vm.e1 = function ($event) {
      _vm.flowExpandVisible = false
    }
    _vm.e2 = function ($event) {
      _vm.showUsedFlowDetail = false
    }
    _vm.e3 = function ($event) {
      _vm.showTotalFlowDetail = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
        m4: m4,
        m5: m5,
        m6: m6,
        m7: m7,
        m8: m8,
        m9: m9,
        m10: m10,
        l0: l0,
        m15: m15,
        m16: m16,
        m17: m17,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 99:
/*!*******************************************************************************************************!*\
  !*** D:/yunyifang/yunyifang-xcx/subpkg-profile/pages/storage-management.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../software/HBuilderX.4.29.2024093009/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./storage-management.vue?vue&type=script&lang=js& */ 100);
/* harmony import */ var _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_software_HBuilderX_4_29_2024093009_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_storage_management_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

},[[95,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg-profile/pages/storage-management.js.map