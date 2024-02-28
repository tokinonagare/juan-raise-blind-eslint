//
// @author Darwin
// @email chendengming0817@gmail.com
//

/**
 * 该组件是参考
 * https://github.com/jeanregisser/react-native-slider
 * https://github.com/24ark/react-native-step-indicator
 * 这两个组件自定义的。
*/

/* eslint-disable */
import React, { PureComponent } from 'react';

import {
    Animated,
    Image,
    StyleSheet,
    PanResponder,
    View,
    Easing,
    ViewPropTypes,
    I18nManager,
} from 'react-native';

import PropTypes from 'prop-types';

const TRACK_SIZE = 3;
const THUMB_SIZE = 30;

function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype.containsPoint = function (x, y) {
    return (
        x >= this.x
        && y >= this.y
        && x <= this.x + this.width
        && y <= this.y + this.height
    );
};

const DEFAULT_ANIMATION_CONFIGS = {
    spring: {
        friction: 7,
        tension: 100,
    },
    timing: {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        delay: 0,
    },
    // decay : { // This has a serious bug
    //   velocity     : 1,
    //   deceleration : 0.997
    // }
};

const DEFAULT_TEST_ID = "step-indicator-default-test-id";

export default class StepIndicator extends PureComponent {
    static propTypes = {
        /**
         * Initial value of the slider. The value should be between minimumValue
         * and maximumValue, which default to 0 and 1 respectively.
         * Default value is 0.
         *
         * *This is not a controlled component*, e.g. if you don't update
         * the value, the component won't be reset to its inital value.
         */
        value: PropTypes.number,

        /**
         * If true the user won't be able to move the slider.
         * Default value is false.
         */
        disabled: PropTypes.bool,

        /**
         * Initial minimum value of the slider. Default value is 0.
         */
        minimumValue: PropTypes.number,

        /**
         * Initial maximum value of the slider. Default value is 1.
         */
        maximumValue: PropTypes.number,

        /**
         * Step value of the slider. The value should be between 0 and
         * (maximumValue - minimumValue). Default value is 0.
         */
        step: PropTypes.number,

        /**
         * The color used for the track to the left of the button. Overrides the
         * default blue gradient image.
         */
        minimumTrackTintColor: PropTypes.string,

        /**
         * The color used for the track to the right of the button. Overrides the
         * default blue gradient image.
         */
        maximumTrackTintColor: PropTypes.string,

        /**
         * The color used for the thumb.
         */
        thumbTintColor: PropTypes.string,

        /**
         * The size of the touch area that allows moving the thumb.
         * The touch area has the same center has the visible thumb.
         * This allows to have a visually small thumb while still allowing the user
         * to move it easily.
         * The default is {width: 40, height: 40}.
         */
        thumbTouchSize: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),

        /**
         * Callback continuously called while the user is dragging the slider.
         */
        onValueChange: PropTypes.func,

        /**
         * Callback called when the user starts changing the value (e.g. when
         * the slider is pressed).
         */
        onSlidingStart: PropTypes.func,

        /**
         * Callback called when the user finishes changing the value (e.g. when
         * the slider is released).
         */
        onSlidingComplete: PropTypes.func,

        /**
         * The style applied to the slider container.
         */
        style: ViewPropTypes.style,

        /**
         * The style applied to the track.
         */
        trackStyle: ViewPropTypes.style,

        /**
         * The style applied to the thumb.
         */
        thumbStyle: ViewPropTypes.style,

        /**
         * Sets an image for the thumb.
         */
        thumbImage: Image.propTypes.source,

        /**
         * Set this to true to visually see the thumb touch rect in green.
         */
        debugTouchArea: PropTypes.bool,

        /**
         * Set to true to animate values with default 'timing' animation type
         */
        animateTransitions: PropTypes.bool,

        /**
         * Custom Animation type. 'spring' or 'timing'.
         */
        animationType: PropTypes.oneOf(['spring', 'timing']),

        /**
         * Set to true to update the value whilst clicking the Slider
         */
        trackClickable: PropTypes.bool,

        /**
         * Used to configure the animation parameters.  These are the same parameters in the Animated library.
         */
        animationConfig: PropTypes.object,
    };

    static defaultProps = {
        value: 0,
        minimumValue: 0,
        maximumValue: 1,
        step: 0,
        minimumTrackTintColor: '#10aefb',
        maximumTrackTintColor: '#C3C9CF',
        thumbTintColor: '#343434',
        thumbTouchSize: { width: 40, height: 40 },
        debugTouchArea: false,
        animationType: 'timing',
        trackClickable: false,
    };

    constructor(props) {
        super(props);
        this.isPressInThumb = false;
    }

    state = {
        containerSize: { width: 40, height: 0 },
        stepIndicatorBarSize: { width: 0, height: 0 },
        trackSize: { width: 0, height: 0 },
        thumbSize: { width: 0, height: 0 },
        stepLabelSize: { width: 0, height: 0 },
        allMeasured: false,
        value: new Animated.Value(this.props.value),
        updateView: true,
    };

    UNSAFE_componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const newValue = nextProps.value;

        if (this.props.value !== newValue) {
            if (this.props.animateTransitions) {
                this._setCurrentValueAnimated(newValue);
            } else {
                this._setCurrentValue(newValue);
            }
        }
    }

    _getPropsForComponentUpdate(props) {
        const {
            value,
            onValueChange,
            onSlidingStart,
            onSlidingComplete,
            style,
            trackStyle,
            thumbStyle,
            trackClickable,
            ...otherProps
        } = props;

        return otherProps;
    }

    _handleStartShouldSetPanResponder = (
        e: Object /* gestureState: Object */,
    ): boolean =>
        // Should we become active when the user presses down on the thumb?
        true


    _handleMoveShouldSetPanResponder(/* e: Object, gestureState: Object */): boolean {
        // Should we become active when the user moves a touch over the thumb?
        return false;
    }

    _handlePanResponderGrant = (event: Object, gestureState: Object) => {
        this._previousLeft = this._getThumbLeft(this._getCurrentValue());
        this._fireChangeEvent('onSlidingStart');
        if (this._thumbHitTest(event)) {
            this.isPressInThumb = true;
        }
    };

    _handlePanResponderMove = (e: Object, gestureState: Object) => {
        if (this.props.disabled) {
            return;
        }
        if (this.isPressInThumb) {
            this._setCurrentValue(this._getValue(gestureState));
            this._fireChangeEvent('onValueChange');
            this.setState({
                updateView: !this.state.updateView,
            });
        }
    };

    _handlePanResponderRequestEnd(e: Object, gestureState: Object) {
        // Should we allow another component to take over this pan?
        return false;
    }

    _handlePanResponderEnd = (event: Object, gestureState: Object) => {
        if (this.props.disabled) {
            return;
        }
        this.setState({ updateView: !this.state.updateView });
        const isTouch = gestureState.dx === 0 && gestureState.dy === 0;
        if (isTouch && this.props.trackClickable) {
            const length = this.state.containerSize.width;
            const thumbLeft = event.nativeEvent.locationX;

            const stepWidth = this.state.containerSize.width / this.props.stepCount;
            const nonRtlRatio = Math.floor(thumbLeft / stepWidth) / this.props.stepCount;
            const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;

            // ###################################################
            // 这里的 currentValue 将用于决定点击后 index 所在的位置
            // 如 maximumValue 如果是 8 的话，那么 [0，7] 才是合法的区域
            // 所以这里需要 this.props.maximumValue - 1
            // ###################################################
            let currentValue;
            if (this.props.step) {
                currentValue = Math.max(
                    this.props.minimumValue,
                    Math.min(
                        this.props.maximumValue - 1,
                        this.props.minimumValue + Math.round(ratio * (this.props.maximumValue - this.props.minimumValue) / this.props.step) * this.props.step,
                    ),
                );
            } else {
                currentValue = Math.max(
                    this.props.minimumValue,
                    Math.min(
                        this.props.maximumValue - 1,
                        ratio * (this.props.maximumValue - this.props.minimumValue) + this.props.minimumValue,
                    ),
                );
            }
            this._setCurrentValue(currentValue);
        } else if (this.isPressInThumb) {
            this._setCurrentValue(this._getValue(gestureState));
        }
        this._fireChangeEvent('onSlidingComplete');
        this.isPressInThumb = false;
    };

    _measureContainer = (x: Object) => {
        this._handleMeasure('containerSize', x);
    };

    _measureIndicatorBar = ({ nativeEvent: { layout: { width, height } } }) => {
        this.setState({
            stepIndicatorBarSize: {
                width,
                height,
            },
        });
    };

    _measureTrack = (x: Object) => {
        this._handleMeasure('trackSize', x);
    };

    _measureStepLabel = (x: Object) => {
        this._handleMeasure('stepLabelSize', x);
    };

    _measureThumb = (x: Object) => {
        this._handleMeasure('thumbSize', x);
    };

    _handleMeasure = (name: string, x: Object) => {
        const { width, height } = x.nativeEvent.layout;
        const size = { width, height };

        const storeName = `_${name}`;
        const currentSize = this[storeName];
        if (currentSize && width === currentSize.width && height === currentSize.height) {
            return;
        }
        this[storeName] = size;
        const { labels } = this.props;
        console.log(this._containerSize)
        if (labels) {
            if (this._containerSize && this._trackSize && this._thumbSize && this._stepLabelSize) {
                this.setState({
                    containerSize: this._containerSize,
                    trackSize: this._trackSize,
                    thumbSize: this._thumbSize,
                    stepLabelSize: this._stepLabelSize,
                    allMeasured: true,
                });
            }
        } else if (this._containerSize && this._trackSize && this._thumbSize) {
            this.setState({
                containerSize: this._containerSize,
                trackSize: this._trackSize,
                thumbSize: this._thumbSize,
                allMeasured: true,
            });
        }
    };

    _getRatio = (value: number) => (value - this.props.minimumValue) / (this.props.maximumValue - this.props.minimumValue);

    _getThumbLeft = (value: number) => {
        const nonRtlRatio = this._getRatio(value);
        const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
        return (ratio * this.state.containerSize.width);
    };

    _getValue = (gestureState: Object) => {
        const length = this.state.containerSize.width - this.state.thumbSize.width;
        const thumbLeft = this._previousLeft + gestureState.dx;

        const nonRtlRatio = thumbLeft / length;
        const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;

        if (this.props.step) {
            return Math.max(
                this.props.minimumValue,
                Math.min(
                    this.props.maximumValue - this.props.step,
                    this.props.minimumValue + Math.round(ratio * (this.props.maximumValue - this.props.minimumValue) / this.props.step) * this.props.step,
                ),
            );
        }
        return Math.max(
            this.props.minimumValue,
            Math.min(
                this.props.maximumValue,
                ratio * (this.props.maximumValue - this.props.minimumValue) + this.props.minimumValue,
            ),
        );
    };

    _getCurrentValue = () => this.state.value.__getValue();

    _setCurrentValue = (value: number) => {
        this.state.value.setValue(value);
    };

    _setCurrentValueAnimated = (value: number) => {
        const { animationType } = this.props;
        const animationConfig = {

            ...DEFAULT_ANIMATION_CONFIGS[animationType],
            ...this.props.animationConfig,
            toValue: value,
        };

        Animated[animationType](this.state.value, animationConfig).start();
    };

    _fireChangeEvent = (event) => {
        if (this.props[event]) {
            this.props[event](this._getCurrentValue());
        }
    };

    _getTouchOverflowSize = () => {
        const { state } = this;
        const { props } = this;

        const size = {};
        if (state.allMeasured === true) {
            size.width = Math.max(
                0,
                props.thumbTouchSize.width - state.thumbSize.width,
            );
            size.height = Math.max(
                0,
                Math.abs(props.thumbTouchSize.height - state.containerSize.height),
            );
        }

        return size;
    };

    _getTouchOverflowStyle = () => {
        const { width, height } = this._getTouchOverflowSize();
        const touchOverflowStyle = {};
        if (width !== undefined && height !== undefined) {
            const verticalMargin = -height / 2;
            touchOverflowStyle.marginTop = verticalMargin;
            touchOverflowStyle.marginBottom = verticalMargin;

            const horizontalMargin = -width / 2;
            touchOverflowStyle.marginLeft = horizontalMargin;
            touchOverflowStyle.marginRight = horizontalMargin;
        }

        if (this.props.debugTouchArea === true) {
            touchOverflowStyle.backgroundColor = 'orange';
            touchOverflowStyle.opacity = 0.5;
        }

        return touchOverflowStyle;
    };

    _thumbHitTest = (e: Object) => {
        const { nativeEvent } = e;
        const thumbTouchRect = this._getThumbTouchRect();
        return thumbTouchRect.containsPoint(
            nativeEvent.locationX,
            nativeEvent.locationY,
        );
    };

    _getThumbTouchRect = () => {
        const { state } = this;
        const { props } = this;
        const touchOverflowSize = this._getTouchOverflowSize();
        const { labels } = props;
        const { stepLabelSize } = state;
        const stepLabelHeight = labels ? stepLabelSize.height : 2;
        const originalPosition = this.state.containerSize.width / (this.props.stepCount * 2)
            - this.state.thumbSize.width / 2;
        const x = touchOverflowSize.width / 2 + this._getThumbLeft(this._getCurrentValue())
            + (state.thumbSize.width - props.thumbTouchSize.width) / 2 + originalPosition;
        const y = touchOverflowSize.height / 2
            + (state.stepIndicatorBarSize.height - props.thumbTouchSize.height - stepLabelHeight) / 2
            + stepLabelHeight + 20;
        return new Rect(x, y, props.thumbTouchSize.width, props.thumbTouchSize.height);
    };

    _renderDebugThumbTouchRect = (thumbLeft) => {
        const thumbTouchRect = this._getThumbTouchRect();
        if (!thumbTouchRect.x || !thumbTouchRect.y) {
            return null;
        }
        const positionStyle = {
            left: thumbLeft,
            top: thumbTouchRect.y,
            width: thumbTouchRect.width,
            height: thumbTouchRect.height,
        };
        const { testID = DEFAULT_TEST_ID } = this.props;
        return (
            <Animated.View
                testID={`${testID}-debug-thumb-touch-area`}
                style={[defaultStyles.debugThumbTouchArea, positionStyle]}
                pointerEvents="none"
            />
        );
    };

    _renderThumbImage = () => {
        const { thumbImage, testID = DEFAULT_TEST_ID } = this.props;
        if (!thumbImage) return;
        return (
            <Image
                testID={`${testID}-thumb-image`}
                source={thumbImage}
            />
        );
    };

    _getMinimumTrackWidth = () => this.state.value.interpolate({
        inputRange: [this.props.minimumValue, this.props.maximumValue],
        outputRange: [
            this.state.containerSize.width / (this.props.stepCount * 2) - 15,
            this.state.containerSize.width + this.state.containerSize.width / (this.props.stepCount * 2) - 15,
        ],
    })

    _getMinimumTrackStyle = () => {
        const valueVisibleStyle = {};
        if (!this.state.allMeasured) {
            valueVisibleStyle.opacity = 0;
        }
        const minimumTrackWidth = Animated.add(this._getMinimumTrackWidth(), new Animated.Value(-this.state.containerSize.width / (this.props.stepCount * 2)));
        return {
            position: 'absolute',
            width: minimumTrackWidth,
            backgroundColor: this.props.minimumTrackTintColor,
            ...valueVisibleStyle,
        };
    }

    _renderThumb = () => {
        const {
            thumbTintColor, thumbStyle, minimumValue, maximumValue, styles, stepCount, testID = DEFAULT_TEST_ID,
        } = this.props;
        const {
            value, containerSize, trackSize, thumbSize, allMeasured,
        } = this.state;
        const mainStyles = styles || defaultStyles;
        const horizontalSpace = this.state.containerSize.width / (stepCount * 2) - (thumbSize.width / 2);
        const thumbLeft = value.interpolate({
            inputRange: [minimumValue, maximumValue],
            outputRange: I18nManager.isRTL
                ? [-(thumbSize.width / 2), -containerSize.width - (thumbSize.width / 2)]
                : [horizontalSpace, containerSize.width + horizontalSpace],
        });
        const valueVisibleStyle = {};
        if (!allMeasured) {
            valueVisibleStyle.opacity = 0;
        }
        const minimumTrackStyle = this._getMinimumTrackStyle();
        return (
            <Animated.View
                testID={`${testID}-thumb`}
                onLayout={this._measureThumb}
                renderToHardwareTextureAndroid
                style={[
                    { backgroundColor: thumbTintColor },
                    mainStyles.thumb,
                    thumbStyle,
                    {
                        transform: [{ translateX: thumbLeft }, { translateY: 0 }],
                        ...valueVisibleStyle,
                    },
                ]}
            >
                {this._renderThumbImage()}
            </Animated.View>
        );
    }

    _renderStepIndicator = () => {
        const steps = [];
        const { stepCount } = this.props;
        const currentValue = this._getCurrentValue();
        for (let position = 0; position < stepCount; position++) {
            steps.push(
                <View key={position}>
                    <Animated.View
                        style={[
                            defaultStyles.stepIndicator,
                            position < currentValue && { backgroundColor: '#10aefb' },
                        ]}
                    />
                </View>,
            );
        }
        const minimumTrackStyle = this._getMinimumTrackStyle();
        return (
            <View style={defaultStyles.stepContainer}>
                {steps}
            </View>
        );
    }

    _renderStepIndicatorBar = () => {
        const {
            styles, trackStyle, stepCount, maximumTrackTintColor, testID = DEFAULT_TEST_ID,
        } = this.props;
        const { value, containerSize } = this.state;
        const mainStyles = styles || defaultStyles;
        const minimumTrackStyle = this._getMinimumTrackStyle();
        return (
            <View
                testID={`${testID}-step-indicator-bar-container`}
                style={[
                    defaultStyles.stepIndicatorContainer,
                ]}
                onLayout={this._measureIndicatorBar}
            >
                <View
                    testID={`${testID}-step-indicator`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        marginHorizontal: this.state.containerSize.width / (stepCount * 2),
                    }}
                >
                    {this._renderStepIndicator()}
                </View>
                <View
                    testID={`${testID}-step-indicator-track`}
                    style={[
                        { backgroundColor: maximumTrackTintColor },
                        mainStyles.track,
                        trackStyle,
                        { marginHorizontal: this.state.containerSize.width / (stepCount * 2) },
                    ]}
                    renderToHardwareTextureAndroid
                    onLayout={this._measureTrack}
                >
                    <Animated.View
                        testID={`${testID}-step-indicator-track-animated-view`}
                        renderToHardwareTextureAndroid
                        style={[mainStyles.track, trackStyle, minimumTrackStyle]}
                    />
                </View>
                {this._renderThumb()}
            </View>
        );
    }

    _renderStepsLabels = () => {
        const currentValue = this._getCurrentValue();
        const { labelStyle, testID = DEFAULT_TEST_ID } = this.props;
        const labelViews = this.props.labels.map((label, index) => (
            <View
                testID={`${testID}-step-label-container`}
                key={index}
                style={defaultStyles.labelContainer}
                onLayout={this._measureStepLabel}
            >
                <Animated.Text
                    testID={`${testID}-step-label-text`}
                    style={[
                        defaultStyles.labelText,
                        labelStyle || {},
                        index === currentValue && { color: '#10aefb' },
                    ]}
                >
                    {label}
                </Animated.Text>
            </View>
        ));
        return (
            <View style={defaultStyles.labelsContainer}>
                {labelViews}
            </View>
        );
    };

    render() {
        const {
            styles, style, debugTouchArea, testID = DEFAULT_TEST_ID, ...other
        } = this.props;
        const mainStyles = styles || defaultStyles;
        const minimumTrackWidth = this._getMinimumTrackWidth();
        const touchOverflowStyle = this._getTouchOverflowStyle();
        return (
            <View
                testID={`${testID}-container`}
                {...other}
                style={[mainStyles.container, style]}
                onLayout={this._measureContainer}
            >
                {this.props.labels && this._renderStepsLabels()}
                {this._renderStepIndicatorBar()}
                <View
                    testID={`${testID}-touch-area`}
                    renderToHardwareTextureAndroid
                    style={[defaultStyles.touchArea, touchOverflowStyle, { justifyContent: 'space-around' }]}
                    {...this._panResponder.panHandlers}
                >
                    {debugTouchArea === true && this._renderDebugThumbTouchRect(minimumTrackWidth)}
                </View>
            </View>
        );
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    stepIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    track: {
        height: TRACK_SIZE,
        borderRadius: TRACK_SIZE / 2,
    },
    stepIndicator: {
        backgroundColor: '#C3C9CF',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    thumb: {
        position: 'absolute',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
    },
    touchArea: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    debugThumbTouchArea: {
        position: 'absolute',
        backgroundColor: 'green',
        opacity: 0.5,
    },
    stepContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    labelsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        color: '#333333',
        fontSize: 13,
    },
});
