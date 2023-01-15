import {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Animated,
  GestureResponderEvent,
  ViewStyle,
  Dimensions,
} from 'react-native';
import styles, {HEIGHT} from './styles';

interface BSProps {
  children: ReactElement | null;
  visible: boolean;
  style?: ViewStyle;
  onClose: () => void;
  onShow?: () => void;
  draggerViewStyle?: ViewStyle;
  draggerStyle?: ViewStyle;
  draggable?: boolean;
}

const BottomSheet: FC<BSProps> = ({
  children,
  visible,
  style,
  onClose,
  onShow,
  draggerViewStyle,
  draggerStyle,
  draggable = true,
}) => {
  const bottom = useRef(new Animated.Value(0)).current;

  const [shown, setShown] = useState(false);
  const height = parseFloat(String(style?.height || HEIGHT));
  const ht = Dimensions.get('window').height;

  useEffect(() => {
    Animated.timing(bottom, {
      toValue: visible ? ht - height : ht,
      useNativeDriver: true,
      duration: 250,
    }).start();

    if (!visible) {
      setTimeout(() => {
        setShown(false);
      }, 250);
    } else {
      setShown(true);
    }
  }, [visible]);

  const handleMove = (event: GestureResponderEvent) => {
    const y = event.nativeEvent.pageY;
    bottom.setValue(y > ht - height ? y : ht - height);
  };

  const handleRelease = (event: GestureResponderEvent) => {
    const y = event.nativeEvent.pageY;
    if (y > ht - parseInt(String(height)) / 1.3) {
      Animated.spring(bottom, {
        toValue: ht,
        useNativeDriver: true,
      }).start();
      onClose();
    } else {
      Animated.spring(bottom, {
        toValue: ht - height,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal
      statusBarTranslucent
      onShow={onShow}
      visible={shown}
      transparent
      onRequestClose={onClose}
      onDismiss={onClose}>
      <Animated.View
        style={[
          styles.mainview,
          {
            opacity: bottom.interpolate({
              inputRange: [ht - height, ht],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),

            backgroundColor: '#00000055'
          },
        ]}>
        <Animated.View style={[styles.contentview, {...style, transform: [{translateY: bottom}]}]}>
          {draggable ? (
            <View
              onStartShouldSetResponder={() => true}
              onResponderMove={handleMove}
              onResponderRelease={handleRelease}
              style={[styles.draggerview, draggerViewStyle]}>
              <View style={[styles.dragger, draggerStyle]} />
            </View>
          ) : null}
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
