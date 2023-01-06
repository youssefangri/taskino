import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import {If} from '@kanzitelli/if-component';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '../services';
import {useStores} from '../stores';
import {Section} from '../components/section';
import {AddButton, BButton, HeaderButton} from '../components/button';
import {Reanimated2} from '../components/reanimated2';
import {Row} from '../components/row';
import {useAppearance} from '../utils/hooks';
import { CalendarComponent } from '../components/calendar';
import { Task } from '../components/task';

export const Feed: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {counter, ui} = useStores();
  const {t, api, navio} = useServices();

  // State (local)
  const [loading, setLoading] = useState(false);
  const [taskItems, setTaskItems] = useState([
    {
      title:"Task 1",
      desc:'Remember me to edit nav bar icons and lables',
      done: true
    }
  ])


  // API Methods
  const getCounterValue = useCallback(async () => {
    setLoading(true);
    try {
      const {value} = await api.counter.get();

      counter.set('value', value);
    } catch (e) {
      console.log('[ERROR]', e);
    } finally {
      setLoading(false);
    }
  }, [api.counter, counter]);

  // Methods
  const push = () => navio.push('Example', {type: 'push'});
  const pushStack = () => navio.pushStack('ExampleStack');
  const jumpTo = () => navio.jumpTo('PlaygroundTab');
  const show = () => navio.show('ExampleModal');
  const setRoot = () => navio.setRoot('ExampleStack');

  const handleCounterDec = () => counter.set('value', counter.value - 1);
  const handleCounterInc = () => counter.set('value', counter.value + 1);
  const handleCounterReset = () => counter.set('value', 0);

  // Start
  useEffect(() => {
    configureUI();
    getCounterValue();
  }, []);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({
      // headerRight: () => (
      //   <Row>
      //     <HeaderButton onPress={handleCounterDec} label="Dec" />
      //     <HeaderButton onPress={handleCounterInc} label="Inc" />
      //   </Row>
      // ),
      headerShown: false
      // header:null
    });
  };

  return (
    <View flex bg-primary>
      <View flex bg-bgColor marginB-5 paddingH-10 paddingT-50 bg-grey70 style={{borderBottomLeftRadius:55, borderBottomRightRadius:55}}> 
        <View row spread centerV>
          <View>
            <Text appTitle>TASKINO</Text>
          </View>
          <View paddingH-5>
              <View style={{backgroundColor:"red", borderRadius:25, borderWidth:0, width:40, height:40}}></View>
          </View>
        </View>
        <View centerV paddingT-15 row spread>
          <View >
            <Text grey30>
              May 01, 2022
            </Text>
            <Text section>
              Today
            </Text>
          </View>
          <View>
            <AddButton label='+ Add Task' />
          </View>
        </View>
        <View paddingT-15>
          <CalendarComponent />
        </View>
        <View marginT-30>
          {
            taskItems.map((item,index)=>{
              return(
                  <Task key={index} title={item.title} desc={item.desc} done={item.done}/>
              )
            })
          }
        </View>
      </View>
    </View>
  );
});
Feed.options = () => ({
  // title: services.t.do('home.title'),
});
