import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

type Props = {
  text: string;
  color?: string;
  onPress: (event: GestureResponderEvent) => void;
};

const AppButton: React.FC<Props> = ({text, color = '#007bff', onPress}) => {
  const buttonStyle: ViewStyle = {
    backgroundColor: color,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle: TextStyle = {
    color: '#fff',
    fontSize: 16,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
