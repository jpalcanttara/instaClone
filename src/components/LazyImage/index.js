import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

import { Small, Original } from "./styles";

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({ smallSource, source, aspectRatio }) {
  const [loaded, setLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={0.75}
    >
      {loaded && (
        <OriginalAnimated
          style={{ opacity }}
          source={source}
          onLoadEnd={handleAnimate}
          ratio={aspectRatio}
          resizeMode="contain"
        />
      )}
    </Small>
  );
}
