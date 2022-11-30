import {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Animated,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import styles, {HEIGHT} from './styles';

interface BSProps {
  children: ReactElement | null;
  visible: boolean;
  style?: ViewStyle;
  onClose: () => void;
}

const BottomSheet: FC<BSProps> = ({children, visible, style, onClose}) => {
  const bottom = useRef(new Animated.Value(0)).current;

  const [shown, setShown] = useState(false);

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
    const y = event.nativeEvent.locationY;
    bottom.setValue(y > 0 ? -y : 0);
  };

  const handleRelease = (event: GestureResponderEvent) => {
    const y = event.nativeEvent.locationY;
    const h = style?.height || HEIGHT;

    if (y > parseInt(String(h)) / 4) {
      Animated.timing(bottom, {
        toValue: -h,
        useNativeDriver: false,
        duration: 300,
      }).start();
      onClose();
    } else {
      Animated.timing(bottom, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
      }).start();
    }
  };

  return (
    <Modal
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
            style={styles.draggerview}>
            <View style={styles.dragger} />
          </View>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
