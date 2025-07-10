import React from 'react';
import {Text, TextStyle} from 'react-native';

type Props = {
  text: string;
  color?: string;
  fontSize?: number;
};

const AppText: React.FC<Props> = ({text, color = '#000', fontSize = 16}) => {
  const textStyle: TextStyle = {
    color,
    fontSize,
  };

  return <Text style={textStyle}>{text}</Text>;
};

export default AppText;
