/**
 * Copyright (c) 2018-present, AC, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Create by mark on 04/06/2018.
 * @emails mark@mail.shafayouxi.org
 */

import {Dimensions, Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import {isMobile, isTablet} from 'react-device-detect';

import getDeviceId from './getDeviceId';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const STATUS_BAR_HEIGHT = 20;
const STATUS_BAR_HEIGHT_FOR_IPHONE_X = 44;
const NAVIGATION_BAR_HEIGHT = 44;

const HEADER_HEIGHT = STATUS_BAR_HEIGHT + NAVIGATION_BAR_HEIGHT;
const HEADER_HEIGHT_FOR_IPHONE_X =
  STATUS_BAR_HEIGHT_FOR_IPHONE_X + NAVIGATION_BAR_HEIGHT;

const ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const ANDROID_NAVIGATION_BAR_HEIGHT = 56;
const ANDROID_HEADER_HEIGHT =
  ANDROID_STATUS_BAR_HEIGHT + ANDROID_NAVIGATION_BAR_HEIGHT;

const TAB_BAR_HEIGHT = 49;
const TAB_BAR_HEIGHT_FOR_IPHONE_X = 34 + TAB_BAR_HEIGHT;

// 网页版纵横比，和游戏一样参考 react-native-size-matters 参数
const WEB_SCREEN_ASPECT_RATIO = 350 / 680;

export default class Device {
  static get isNoInternet() {
    return Device.internetConnectType === 'none';
  }

  static internetConnectType = 'wait_for_set';

  static get bundleId() {
    return DeviceInfo.getBundleId();
  }

  /**
   * 平台类型
   * @returns {string}
   */
  static get platform() {
    return Platform.OS;
  }

  /**
   * 应用版本
   * @returns {*}
   */
  static get appVersion() {
    return DeviceInfo.getVersion();
  }

  /**
   * 设备id
   * @returns {*}
   */
  static get deviceId() {
    return getDeviceId();
  }

  static saveCookie(key, value) {
    document.cookie = key + '=' + value;
  }

  static getCookie(key) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + key + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
  }

  /**
   * 设备名称（Tom's iPhone）
   * @returns {*}
   */
  static async deviceName() {
    try {
      return await DeviceInfo.getDeviceName();
    } catch (e) {
      console.log('get device name error', e);
      return '';
    }
  }

  /**
   * 获取设备时区
   * @returns {string}
   */
  static get timeZone() {
    return RNLocalize.getTimeZone();
  }

  /**
   * 获取设备国家（根据设备 locale 获取）
   * @returns {string}
   */
  static get country() {
    return RNLocalize.getCountry();
  }

  /**
   * 根据时区 和 locale 简单判断用户是否在国内
   * @returns {boolean}
   */
  static get isInChina() {
    return Device.timeZone === 'Asia/Shanghai' || Device.country === 'CN';
  }

  /**
   * 系统版本
   * @returns {*}
   */
  static get osVersion() {
    return DeviceInfo.getSystemVersion();
  }

  static get headerHeight() {
    if (this.isAndroid) {
      return ANDROID_HEADER_HEIGHT;
    }
    return this.isIphoneX ? HEADER_HEIGHT_FOR_IPHONE_X : HEADER_HEIGHT;
  }

  static get navigationBarHeight() {
    if (this.isAndroid) {
      return ANDROID_NAVIGATION_BAR_HEIGHT;
    }
    return NAVIGATION_BAR_HEIGHT;
  }

  static get statusBarHeight() {
    if (this.isAndroid) {
      return ANDROID_STATUS_BAR_HEIGHT;
    }
    return this.isIphoneX ? STATUS_BAR_HEIGHT_FOR_IPHONE_X : STATUS_BAR_HEIGHT;
  }

  static get tabBarHeight() {
    return this.isIphoneX ? TAB_BAR_HEIGHT_FOR_IPHONE_X : TAB_BAR_HEIGHT;
  }

  static get width() {
    const {width} = Dimensions.get('window');
    if (Device.isWeb) {
      if (isMobile || isTablet) {
        // 在手机或者平板上直接返回设备宽度
        return width;
      }
      // 在PC浏览器上根据一下公式计算得出宽
      return Math.max(380, Device.height * WEB_SCREEN_ASPECT_RATIO);
    }
    return width;
  }

  static get height() {
    if (Device.isPWA) {
      return Dimensions.get('screen').height;
    }
    return Dimensions.get('window').height;
  }

  static get isIphoneX() {
    const screenW = Dimensions.get('window').width;
    const screenH = Dimensions.get('window').height;
    return (
      this.isIOS &&
      ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
        (screenH === X_WIDTH && screenW === X_HEIGHT))
    );
  }

  static get isIOS() {
    return Platform.OS === 'ios';
  }

  static get isAndroid() {
    return Platform.OS === 'android';
  }

  static get isWeb() {
    return Platform.OS === 'web';
  }

  /**
   * 是否为 PWA（Progressive Web Apps）模式（添加到主屏幕来使用的）
   */
  static get isPWA() {
    if (!Device.isWeb) {
      return false;
    }
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  static get isPad() {
    if (this.isWeb) {
      return isTablet;
    }
    return Platform.isPad;
  }

  /**
   * H5在 QQ 应用里打开
   */
  static get isInQQ() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes('qq') && !userAgent.includes('mqqbrowser');
  }

  /**
   * H5在 微信 应用里打开
   */
  static get isInWeChat() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes('micromessenger');
  }

  static get language() {
    const locales = RNLocalize.getLocales();
    return (
      locales && locales.length > 0 && locales[0] && locales[0].languageCode
    );
  }

  static get model() {
    return DeviceInfo.getModel();
  }

  static get systemName() {
    return DeviceInfo.getSystemName();
  }

  static async manufacturer() {
    try {
      return await DeviceInfo.getManufacturer();
    } catch (e) {
      console.log('get manufacturer error', e);
      return '获取失败';
    }
  }

  static async productName() {
    try {
      return await DeviceInfo.getProduct();
    } catch (e) {
      console.log('get productName error', e);
      return '获取失败';
    }
  }

  static get brand() {
    return DeviceInfo.getBrand();
  }

  static async processor() {
    try {
      const supportedAbis = await DeviceInfo.supportedAbis();
      let processor = '';
      supportedAbis.forEach(supportedAbi => {
        processor += `${supportedAbi} `;
      });
      return processor;
    } catch (e) {
      console.log('get processor error', e);
      return '';
    }
  }

  static async ram() {
    try {
      const totalMemory = await DeviceInfo.getTotalMemory();
      return `${Math.round(totalMemory / 1024 / 1024 / 1024).toString()}GB`;
    } catch (e) {
      console.log('get ram error', e);
      return '';
    }
  }

  static async rom() {
    try {
      const totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
      return `${Math.round(
        totalDiskCapacity / 1024 / 1024 / 1024,
      ).toString()}GB`;
    } catch (e) {
      console.log('get rom error', e);
      return '';
    }
  }

  static async carrier() {
    try {
      return await DeviceInfo.getCarrier();
    } catch (e) {
      console.log('get carrier error', e);
      return '';
    }
  }

  static async sdkVersion() {
    try {
      const apiLevel = await DeviceInfo.getApiLevel();
      return apiLevel.toString();
    } catch (e) {
      console.log('get sdkVersion error', e);
      return '';
    }
  }
}
