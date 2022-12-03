# React Native BottomSheet

For displaying a bottom sheet in a react native app.

#### How to thank me ?

Just click on ⭐️ button 😘

https://user-images.githubusercontent.com/62456735/205438152-b4fae14a-ba49-4bea-a965-eb2175203ea8.mov

## Installation:

```
npm install --save @irfanwani/react-native-bottom-sheet
OR
yarn add @irfanwani/react-native-bottom-sheet
```

## Basic Usage

```tsx
import { FC, useRef, useState } from "react";
import { Button, View, Animated, Dimensions } from "react-native";

import BottomSheet from "@irfanwani/react-native-bottom-sheet";

const App: FC = () => {
  const [visible, setVisible] = useState(false);
  const showsheet = () => {
    setVisible(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <BottomSheet
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <Text>Here are the children elements</Text>
      </BottomSheet>
      <Button title="show sheet" onPress={showsheet} />
    </View>
  );
};

export default App;
```

## Props

| Prop       | Type                   | Required | Note                                               |
| ---------- | ---------------------- | -------- | -------------------------------------------------- |
| `visible`  | `boolean`              | True     | Determines whether the bottomsheet is shown or not |
| `children` | `ReactElement or null` | True     | Element to show in the bottom sheet                |
| `onClose`  | `() => void`           | True     | Called when the bottomsheet is closed              |
| `onShow`   | `() => void`           | False    | Called when the bottomsheet opens                  |
| `style`    | `ViewStyle`            | False    | CustomStyles for the bottomsheet                   |
