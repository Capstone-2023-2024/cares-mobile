import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import BackHeader from '~/components/BackHeader';
import Background from '~/components/Background';
import {collectionRef} from '~/utils/firebase';
import type {EventWithIdProps, EventProps, PollStyledTextProps} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '~/contexts/AuthContext';

const ProjectSuggestions = () => {
  const [state, setState] = useState<EventWithIdProps[]>([]);

  function renderPolls() {
    return state.map(props => (
      <View
        key={props.id}
        className="w-full items-center rounded-lg bg-white/50 p-2">
        <Poll {...props} />
      </View>
    ));
  }

  useEffect(() => {
    const unsub = collectionRef('project_suggestion')
      .limit(5)
      .onSnapshot(snapshot => {
        const placeholder: EventWithIdProps[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as EventProps;
          const id = doc.id;
          placeholder.push({...data, id});
        });
        setState(placeholder);
      });
    return () => {
      unsub();
    };
  }, []);

  return (
    <View className="flex-1">
      <Background>
        <ScrollView>
          <View className="absolute left-0 top-0 z-10">
            <BackHeader />
          </View>
          <View className="border-black-500 mb-5 w-full self-center bg-primary">
            <View className="m-5 flex-row items-center self-center">
              {/* <Image className="h-12 w-12" source={suggest} /> */}
              <Text className="flex-1 text-center text-lg font-bold text-white">
                Project / Event Suggestions for CICS
              </Text>
              {/* <Image className="h-12 w-12" source={suggest} /> */}
            </View>
          </View>
          {renderPolls()}
        </ScrollView>
      </Background>
    </View>
  );
};

const Poll = ({question, options, id, votes}: EventProps) => {
  const {currentUser} = useAuth();

  async function handleOptionPress(value: string) {
    try {
      await AsyncStorage.setItem(id, value);
      const storedValue = await AsyncStorage.getItem(id);
      if (storedValue !== null && currentUser !== null) {
        let index = -1;
        options.forEach(({value}, i) => {
          if (storedValue === value) {
            index = i;
          }
        });
        if (index > -1) {
          const newVotes = {...votes, [currentUser.email ?? '']: storedValue};
          await collectionRef('project_suggestion').doc(id).update({
            votes: newVotes,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderOptions() {
    function setSelectionStyle() {
      if (currentUser !== null && votes !== undefined) {
        const email = currentUser.email ?? '';
        const result = Object.keys(votes ?? {}).filter(key => email === key)[0];
        if (result !== undefined) {
          // const currentValue = votes.result ?? '';
          return votes[result];
        }
      }
      return '';
    }

    return options.map(({value}, index) => {
      const result = Object.values(votes ?? {}).filter(val => value === val);
      const CONDITION = setSelectionStyle() === value;

      return (
        <TouchableOpacity
          key={index}
          className={`${
            CONDITION ? 'scale-110 bg-green-200/50' : 'bg-white'
          } mb-2 w-fit flex-row justify-between rounded-lg p-2 shadow-sm duration-300 ease-in-out`}
          onPress={() => void handleOptionPress(value)}>
          <PollStyledText value={value} condition={CONDITION} />
          <PollStyledText
            value={JSON.stringify(result?.length ?? 0)}
            condition={CONDITION}
          />
        </TouchableOpacity>
      );
    });
  }

  return (
    <View>
      <Text className="mb-3 text-xl font-semibold">{question}</Text>
      <View>{renderOptions()}</View>
    </View>
  );
};

const PollStyledText = ({condition, value}: PollStyledTextProps) => {
  return (
    <Text className={`${condition ? 'text-green-400' : 'text-black'}`}>
      {value}
    </Text>
  );
};

export default ProjectSuggestions;
