import {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {Modal, View, Animated} from 'react-native';
import styles, {HEIGHT} from './styles';

interface BSProps {
  children: ReactElement | null;
  visible: boolean;
  style?: {};
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

  return (
    <Modal
      visible={shown}
      transparent
      onRequestClose={onClose}
      onDismiss={onClose}>
      <Animated.View style={[styles.mainview, {
        backgroundColor: bottom.interpolate({
          inputRange: [-HEIGHT*3, 0],
          outputRange: ['#00000000', '#00000055'],
          extrapolate: 'clamp'
        })
      }]}>
        <Animated.View style={[styles.contentview, {...style, bottom}]}>
          <View style={styles.dragger} />
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
