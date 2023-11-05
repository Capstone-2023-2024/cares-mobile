import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '~/components';
import BackHeader from '~/components/BackHeader';
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
      <View
        key={props.id}
        className="w-full items-center rounded-lg bg-white/50 p-2">
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

const Poll = ({
  question,
  options,
  id,
  votes,
  state,
  dateOfExpiration,
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
            CONDITION ? 'scale-110 bg-green-200/50' : 'bg-white'
          } mb-2 w-fit flex-row justify-between rounded-lg p-2 shadow-sm duration-300 ease-in-out`}
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
    <View className="flex-col items-center justify-center rounded-lg border p-4">
      {state === 'unpublished' ? (
        <View>
          {/* <View className="w-32 flex-row">
            <ScrollView>
              {options?.map((v, i) => {
                return (
                  i < 4 && (
                    <View>
                      <Text>{v.name}</Text>
                      <Text>{v.value}</Text>
                    </View>
                  )
                );
              })}
            </ScrollView>
          </View> */}
          <View className="mb-3 flex-row">
            <Text className="w-2/3 self-center p-2 font-semibold">
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
            className={`${condition ? 'bg-primary' : 'bg-slate-200'} p-2`}
            onPress={handleSubmitIdea}>
            <Text
              className={`${
                condition ? 'text-paper' : 'text-slate-300'
              } rounded-lg text-center shadow-sm`}>
              submit
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text className="mb-3 text-xl font-semibold">{question}</Text>
          <View>{renderOptions()}</View>
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
