import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '~/components';
import Background from '~/components/Background';
import TickingClock from '~/components/TickingClock';
import {useAuth} from '~/contexts/AuthContext';
import {arrayUnion, collectionRef} from '~/utils/firebase';
import type {
  EventProps,
  EventWithIdProps,
  PollStateProps,
  PollStateValue,
  PollStyledTextProps,
} from './types';

const ProjectSuggestions = () => {
  const [state, setState] = useState<EventWithIdProps[]>([]);

  function renderPolls() {
    return state.map(props => (
      <View key={props.id} className="w-full items-center ">
        <Poll {...props} />
      </View>
    ));
  }

  useEffect(() => {
    const unsub = collectionRef('project_suggestion')
      .orderBy('dateOfExpiration', 'desc')
      .where('dateOfExpiration', '>', new Date().getTime())
      .limit(5)
      .onSnapshot(snapshot => {
        const placeholder: EventWithIdProps[] = [];
        snapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data() as EventProps;
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
          <View className="mx-8 my-8 flex items-center justify-center rounded-3xl bg-primary py-2">
            <Image
              source={require('~/assets/project-suggestion.png')}
              className="h-12 w-80 "
              resizeMode="contain"
            />
          </View>
          {renderPolls()}
        </ScrollView>
      </Background>
    </View>
  );
};

const Poll = ({
  question,
  options,
  id,
  votes,
  state,
  dateOfExpiration,
  postedBy,
}: EventWithIdProps) => {
  const initState: PollStateProps = {
    idea: null,
  };
  const {currentUser} = useAuth();
  const [pollState, setPollState] = useState(initState);
  const condition = pollState.idea !== null && pollState.idea.trim() !== '';

  function handleState(key: keyof PollStateProps, value: PollStateValue) {
    setPollState(prevState => ({...prevState, [key]: value}));
  }
  async function handleChangeText(text: string) {
    handleState('idea', text);
  }
  async function handleOptionPress(value: string) {
    try {
      await AsyncStorage.setItem(id, value);
      const storedValue = await AsyncStorage.getItem(id);
      if (storedValue !== null && currentUser !== null) {
        let index = -1;
        options.forEach(({name}, i) => {
          if (storedValue === name) {
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
      ToastAndroid.show('Option pressed error', ToastAndroid.SHORT);
    }
  }
  async function handleSubmitIdea() {
    try {
      if (pollState.idea !== null) {
        const isOptionsUndefined = options === undefined;
        const name = pollState.idea?.toLowerCase();
        const data = {
          name,
          value: 1,
        };
        const union = arrayUnion(data);
        if (isOptionsUndefined) {
          await collectionRef('project_suggestion').doc(id).update({
            options: union,
          });
        } else {
          const target = options.filter(value => name === value.name);
          const rest = options.filter(value => name !== value.name);
          if (target.length > 0) {
            const targetName = target[0]?.name ?? '';
            let value = target[0]?.value ?? 0;
            value += 1;
            const update = await collectionRef('project_suggestion')
              .doc(id)
              .update({
                options: [...rest, {name: targetName, value}],
              });
            return update;
          }
          rest.push(data);
          await collectionRef('project_suggestion')
            .doc(id)
            .update({
              options: [...rest],
            });
        }
      }
      setPollState(initState);
    } catch (err) {
      // console.log(err);
      ToastAndroid.show('Error in submitting idea', ToastAndroid.SHORT);
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

    return options.map(({name}, index) => {
      const result = Object.values(votes ?? {}).filter(val => name === val);
      const CONDITION = setSelectionStyle() === name;

      return (
        <TouchableOpacity
          key={index}
          className={`${
            CONDITION ? ' bg-green-100/70' : 'border bg-white '
          } mx-2 mb-3 w-fit flex-row justify-between rounded-full p-2 shadow-sm duration-300 ease-in-out`}
          onPress={() => handleOptionPress(name)}>
          <PollStyledText value={name} condition={CONDITION} />
          <PollStyledText
            value={JSON.stringify(result?.length ?? 0)}
            condition={CONDITION}
          />
        </TouchableOpacity>
      );
    });
  }

  return (
    <View className="w-full flex-col items-center justify-center ">
      {state === 'unpublished' ? (
        <View>
          <View className="mb-3">
            <Text className="self-center p-2 text-xl font-semibold">
              {question}
            </Text>
            <TickingClock
              title="time remaining"
              expiration={dateOfExpiration}
            />
          </View>
          <TextInput
            className="mb-2 rounded-lg border p-3"
            placeholder="Submit entry here regarding the question..."
            value={pollState.idea ?? ''}
            onChangeText={handleChangeText}
          />
          <TouchableOpacity
            disabled={!condition}
            className={`${
              condition ? 'bg-primary' : 'bg-slate-200'
            } rounded-lg p-2 shadow-sm`}
            onPress={handleSubmitIdea}>
            <Text
              className={`${
                condition ? 'text-paper' : 'text-slate-300'
              } rounded-lg text-center capitalize`}>
              submit
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="w-11/12 rounded-2xl border bg-gray-200">
          <View className="mx-3 mb-3">
            <View className="ml-4 flex-row">
              <Image
                source={require('~/assets/cics_icon.png')}
                className="my-4 mr-2 h-14 w-14"
                resizeMode="center"
              />
              <Text className="mt-5 text-xl font-black text-black">
                CICS Department
                {'\n'}
                <Text className="text-base font-light">{`Posted by: ${postedBy}`}</Text>
              </Text>
            </View>
            <Text className="mx-2 mb-2 text-center text-base font-normal">
              {question}
            </Text>
          </View>
          <View className="mx-4 mb-2  ">{renderOptions()}</View>
          <View className="mx-4 mb-3 rounded-2xl bg-gray-600">
            <Text className="my-4 ml-4 text-xl text-white">Comments</Text>
            <View className="mx-4 mb-4 rounded-3xl bg-slate-400">
              <Text className="ml-4 p-2 text-base text-black">
                SinoNagComment: Hatdog
              </Text>
            </View>
          </View>
          <View className="mx-32  mb-3 rounded-full border">
            <Text className="text-center">See More</Text>
          </View>
        </View>
      )}
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
