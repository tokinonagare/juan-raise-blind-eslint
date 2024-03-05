/**
 * Copyright (c) 2018-present, AC, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * author：Mark
 * date：  2022/7/26 17:30
 */

import Color from './Color';
import FontFamily from './FontFamily';

const LightTheme = {
    NavigationBarBackgroundColor: Color.white,
    NavigationBarTintColor: Color.periwinkle,
    NavigationBarTitleColor: Color.white,
    NavigationBarTitleFont: FontFamily.PingFang,
    NavigationBarTitleFontSize: 18,
    NavigationBarAuthBackgroundColor: Color.white,
    NavigationBarAuthTintColor: Color.periwinkle,
    NavigationBarAuthTitleColor: Color.periwinkle,
    BackgroundColor: Color.grayWhite,
    ContentBackgroundColor: Color.white,
    HeaderTextColor: 'rgba(70, 70, 70, 0.85)',
    ContentTextColor: 'rgba(70, 70, 70, 0.65)',
    ContentTextFont: FontFamily.PingFang,
    SubContentTextColor: 'rgba(70, 70, 70, 0.65)',
    SubContentTextFont: FontFamily.PingFangRegular,
};

const DarkTheme = {
    NavigationBarBackgroundColor: Color.green,
    NavigationBarTintColor: Color.butterscotch,
    NavigationBarTitleColor: Color.white,
    NavigationBarTitleFont: FontFamily.PingFang,
    NavigationBarTitleFontSize: 18,
    NavigationBarAuthBackgroundColor: Color.green,
    NavigationBarAuthTintColor: Color.butterscotch,
    NavigationBarAuthTitleColor: Color.butterscotch,
    BackgroundColor: 'rgb(23, 23, 27)',
    ContentBackgroundColor: 'rgb(34, 34, 40)',
    HeaderTextColor: 'rgba(255, 255, 255, 0.85)',
    ContentTextColor: 'rgba(255, 255, 255, 0.65)',
    ContentTextFont: FontFamily.PingFang,
    SubContentTextColor: 'rgba(255, 255, 255, 0.65)',
    SubContentTextFont: FontFamily.PingFangRegular,
};

const ThemeMode = 'light';

export default ThemeMode === 'light' ? LightTheme : DarkTheme;
