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
}

const BottomSheet: FC<BSProps> = ({
  children,
  visible,
  style,
  onClose,
  onShow,
  draggerViewStyle,
  draggerStyle,
}) => {
  const bottom = useRef(new Animated.Value(0)).current;

  const [shown, setShown] = useState(false);
  const height = parseFloat(String(style?.height || HEIGHT));
  const ht = Dimensions.get('window').height;

  useEffect(() => {
    Animated.timing(bottom, {
      toValue: visible ? 0 : -HEIGHT * 3,
      useNativeDriver: false,
      duration: 300,
    }).start();

    if (!visible) {
      setTimeout(() => {
        setShown(false);
      }, 300);
    } else {
      setShown(true);
    }
  }, [visible]);

  const handleMove = (event: GestureResponderEvent) => {
    const y = event.nativeEvent.pageY;
    bottom.setValue(y > ht - height ? ht - height - y : 0);
  };

  const handleRelease = (event: GestureResponderEvent) => {
    const y = event.nativeEvent.pageY;
    if (y > ht - parseInt(String(height)) / 1.3) {
      Animated.spring(bottom, {
        toValue: -height,
        useNativeDriver: false,
      }).start();
      onClose();
    } else {
      Animated.spring(bottom, {
        toValue: 0,
        useNativeDriver: false,
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
            backgroundColor: bottom.interpolate({
              inputRange: [-HEIGHT * 3, 0],
              outputRange: ['#00000000', '#00000055'],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Animated.View style={[styles.contentview, {...style, bottom}]}>
          <View
            onStartShouldSetResponder={() => true}
            onResponderMove={handleMove}
            onResponderRelease={handleRelease}
            style={[styles.draggerview, draggerViewStyle]}>
            <View style={[styles.dragger, draggerStyle]} />
          </View>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
