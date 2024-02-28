/**
 * Copyright (c) 2018-present, AC, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * author：Mark
 * date：  2022/7/26 17:30
 */

//import Color from './Color';
//import FontFamily from './FontFamily';

const LightTheme = {
  NavigationBarBackgroundColor: 'rgba(255, 255, 255, 0.85)', //Color.white,
  NavigationBarTintColor: 'rgba(80, 80, 80, 0.85)', //Color.periwinkle,
  NavigationBarTitleColor: 'rgba(255, 255, 255, 0.85)', //Color.white,
  NavigationBarTitleFont: 'rgba(40, 40, 40, 0.85)', //FontFamily.PingFang,
  NavigationBarTitleFontSize: 18,
  NavigationBarAuthBackgroundColor: 'rgba(255, 255, 255, 0.85)', //Color.white,
  NavigationBarAuthTintColor: 'rgba(80, 80, 80, 0.85)', //Color.periwinkle,
  NavigationBarAuthTitleColor: 'rgba(80, 80, 80, 0.85)', //Color.periwinkle,
  BackgroundColor: 'rgba(220, 220, 220, 1)', //Color.grayWhite,
  ContentBackgroundColor: 'rgba(255, 255, 255, 0.85)', //Color.white,
  HeaderTextColor: 'rgba(70, 70, 70, 0.85)',
  ContentTextColor: 'rgba(70, 70, 70, 0.65)',
  ContentTextFont: 'rgba(40, 40, 40, 0.85)', //FontFamily.PingFang,
  SubContentTextColor: 'rgba(70, 70, 70, 0.65)',
  SubContentTextFont: 'rgba(30, 30, 30, 0.85)', //FontFamily.PingFangRegular,
};

const DarkTheme = {
  NavigationBarBackgroundColor: 'rgba(0, 240, 0, 0.85)', //Color.green,
  NavigationBarTintColor: 'rgba(227, 150, 62, 0.85)', //Color.butterscotch,
  NavigationBarTitleColor: 'rgba(255, 255, 255, 0.85)', //Color.white,
  //NavigationBarTitleFont: FontFamily.PingFang,
  NavigationBarTitleFontSize: 18,
  NavigationBarAuthBackgroundColor: 'rgba(0, 240, 0, 0.85)', //Color.green,
  NavigationBarAuthTintColor: 'rgba(227, 150, 62, 0.85)', //Color.butterscotch,
  NavigationBarAuthTitleColor: 'rgba(227, 150, 62, 0.85)', //Color.butterscotch,
  BackgroundColor: 'rgb(23, 23, 27)',
  ContentBackgroundColor: 'rgb(34, 34, 40)',
  HeaderTextColor: 'rgba(255, 255, 255, 0.85)',
  ContentTextColor: 'rgba(255, 255, 255, 0.65)',
  //ContentTextFont: FontFamily.PingFang,
  SubContentTextColor: 'rgba(255, 255, 255, 0.65)',
  //SubContentTextFont: FontFamily.PingFangRegular,
};

const ThemeMode = 'light';

export default ThemeMode === 'light' ? LightTheme : DarkTheme;
