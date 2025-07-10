import React from 'react';
import {Text, TextStyle} from 'react-native';

type Props = {
  icon: string;
  color: string;
  size?: number;
};

const TabIcon: React.FC<Props> = ({icon, color, size = 24}) => {
  const iconStyle: TextStyle = {
    color,
    fontSize: size,
    textAlign: 'center',
  };

  return <Text style={iconStyle}>{icon}</Text>;
};

export default TabIcon; 