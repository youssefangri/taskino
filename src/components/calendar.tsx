import React, { useRef } from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons,AntDesign } from '@expo/vector-icons';

const ITEMS:any = []

type Props = {
  title?: string;
};

export const CalendarComponent: React.FC<Props> = ({title}) => {
  return (
    <View>
      <CalendarStrip
      leftSelector={<AntDesign name="leftcircle" size={21} color="white" />}
      rightSelector={<AntDesign name="rightcircle" size={21} color="white" />}
      scrollable
      style={{height:100, paddingTop: 20, paddingBottom: 10, borderRadius:10}}
      calendarColor={Colors.primary}
      calendarHeaderStyle={{color: 'white'}}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white'}}
      iconContainer={{flex: 0.1}}
      highlightDateContainerStyle={{backgroundColor:Colors.secondary}}
    />
    </View>
  );
};
