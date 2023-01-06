import React, { useEffect, useState } from 'react';
import { View, Text, Checkbox, Colors } from 'react-native-ui-lib';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    title?: string;
    desc?: string;
    done?: boolean;
};

export const Task: React.FC<Props> = ({ title, desc, done=false }) => {
    const [isDone, setIsDone] = useState(done)
    return (
        <View row bg-white padding-10 br40>
            <View flex-1 left centerV br20>
                <View marginL-10>
                    <Checkbox color={Colors.primary} value={isDone}  onValueChange={() => setIsDone(!isDone)}/>
                </View>
            </View>
            <View flex-4>
                <Text taskTitle>{title}</Text>
                <Text taskDesc>{desc}</Text>
            </View>
            <View flex-1 center>
                <View>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                </View>
            </View>
        </View>
    );
};
