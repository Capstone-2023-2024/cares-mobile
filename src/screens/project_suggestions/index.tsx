import type {
  CommentProps,
  OptionProps,
  PollEventProps,
  ReadPollEventProps,
} from '@cares/common/types/poll';
import {setUpPrefix} from '@cares/common/utils/date';
import {imageDimension} from '@cares/common/utils/media';
import {removeObjectWithType} from '@cares/common/utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity as VanillaTouchableOpacity,
  View,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import Text from '~/components/Text';
import Textfield from '~/components/Textfield';
import TickingClock from '~/components/TickingClock';
import {useAuth} from '~/contexts/AuthContext';
import {useUniversal} from '~/contexts/UniversalContext';
import {arrayUnion, collectionRef} from '~/utils/firebase';

const ProjectSuggestions = () => {
  const [state, setState] = useState<ReadPollEventProps[]>([]);

  useEffect(() => {
    const unsub = collectionRef('project_suggestion')
      .orderBy('dateOfExpiration', 'desc')
      .where('dateOfExpiration', '>', new Date().getTime())
      .limit(10)
      .onSnapshot(snapshot => {
        const placeholder: ReadPollEventProps[] = [];
        snapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data() as PollEventProps;
          const options = data.options?.sort((a, b) => a.index - b.index);
          placeholder.push({...data, options, id});
        });
        setState(placeholder);
      });
    return unsub;
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={props => props.id}
        renderItem={({item}) => (
          <View key={item.id} className="w-full items-center ">
            <Poll {...item} />
          </View>
        )}
      />
    </View>
  );
};

interface PollStateProps {
  idea: string;
  index: number;
  maxLength: number;
  comments: CommentProps[];
  currentComment: string;
  showComments: CommentProps[];
  showCommentInput: boolean;
  showCloseConfirmation: boolean;
  currentIndex: number;
  offset: {
    height: number;
    width: number;
  };
}

const Poll = (props: ReadPollEventProps) => {
  const {
    question,
    options,
    id,
    votes,
    state,
    dateOfExpiration,
    postedBy,
    comments,
  } = props;
  const {currentUser} = useAuth();
  const {studentsInfo} = useUniversal();
  const [pollState, setPollState] = useState<PollStateProps>({
    idea: '',
    index: -1,
    currentIndex: -1,
    maxLength: -1,
    comments: [],
    currentComment: '',
    showComments: [],
    showCommentInput: false,
    showCloseConfirmation: false,
    offset: {
      height: 0,
      width: 0,
    },
  });
  const undefinedNaN = -1;
  const flatListRef = useRef<FlatList | null>(null);

  const targetPollDocRef = collectionRef('project_suggestion').doc(id);
  const commentCondition = pollState.currentComment.trim() === '';
  const initOptions = (value: string): OptionProps => ({
    value,
    index: 0,
  });

  function handleChangeText(text: string, key: keyof typeof pollState) {
    setPollState(prevState => ({...prevState, [key]: text}));
  }

  function getNewOptionsPrevVote(currentValue: string) {
    const email = currentUser?.email ?? 'NO_EMAIL';
    /** Targeted option destructured */
    const targetedOption =
      options.filter(props => currentValue === props.value)[0] ??
      initOptions('');

    /** The rest of the options */
    const restOptions = options.filter(props => currentValue !== props.value);

    /** Getting previous voted value */
    const emailKey = Object.keys(votes ?? {}).filter(
      key => email === key,
    )[0] as keyof typeof votes;
    const prevVotedValue = votes?.[emailKey];

    const data: {
      targetedOption: OptionProps;
      restOptions: OptionProps[];
      prevVotedValue?: string;
    } = {targetedOption, restOptions, prevVotedValue};
    return data;
  }
  function toggleModal(
    value: boolean,
    key: 'showCommentInput' | 'showCloseConfirmation',
  ) {
    setPollState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }
  /** This will be the key for rendering the comment section */
  const loadCommentData = useCallback(() => {
    const initCondition =
      pollState.index === undefinedNaN || comments === undefined;
    const fetchIndex = initCondition ? 0 : pollState.index;
    const commentHolder = comments ?? [];
    const initCommentData = commentHolder[0] ?? {
      value: '',
      commenter: 'NO_EMAIL',
      dateCreated: NaN,
    };

    setPollState(prevState => ({
      ...prevState,
      index: fetchIndex,
      comments: commentHolder,
      showComments: [
        ...(initCondition ? [initCommentData] : prevState.showComments),
      ],
      maxLength: comments?.length ?? 0,
    }));
  }, [comments, pollState.index, undefinedNaN]);

  /** See More or Hide */
  function paginateComments() {
    setPollState(prevState => {
      const RESETINDEX = 0;
      const incrementBy = 1;
      let advanceIndex = prevState.index + incrementBy;
      const indexCondition = advanceIndex >= prevState.maxLength;
      console.log({advanceIndex}, prevState.maxLength);
      const result = indexCondition
        ? {
            ...prevState,
            index: RESETINDEX,
            showComments: [
              prevState.comments[RESETINDEX] ?? {
                commenter: '',
                value: '',
                dateCreated: NaN,
              },
            ],
          }
        : {
            ...prevState,
            index: advanceIndex,
            showComments: [
              ...prevState.showComments,
              prevState.comments[advanceIndex] ?? {
                commenter: '',
                value: '',
                dateCreated: NaN,
              },
            ],
          };
      return result;
    });
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }

  function handleCommentUpload() {
    const postComment = pollState.currentComment;
    const commentData: CommentProps = {
      value: postComment,
      commenter: currentUser?.email ?? '',
      dateCreated: new Date().getTime(),
    };

    setPollState(prevState => ({
      ...prevState,
      currentComment: '',
      showCommentInput: false,
      showCloseConfirmation: false,
    }));

    commentData.value.trim() !== '' &&
      void targetPollDocRef.update({
        comments: arrayUnion(commentData),
      });
  }

  function renderOptions() {
    const filteredEmail = currentUser?.email ?? '';
    const filteredVotes = votes ?? {};

    /** Sets the condition for Poll Button */
    function setButtonStyle(email: string, votes: {[x: string]: string}) {
      const result = Object.keys(votes ?? {}).filter(key => email === key)[0];
      return result !== undefined && votes[result];
    }

    /** Update vote onPress in Firestore */
    function handleOptionPress(selectedValue: string, email: string) {
      const {targetedOption, restOptions, prevVotedValue} =
        getNewOptionsPrevVote(selectedValue);
      const {vote, value, index} = targetedOption;
      let targetVoteCount = vote ?? undefinedNaN;
      const filterVotes = removeObjectWithType(
        {...votes},
        'key',
        currentUser?.email ?? '',
      );

      const newOptions = [
        ...restOptions.map(props => ({
          ...props,
          vote:
            prevVotedValue === props.value ? (props.vote ?? 0) - 1 : props.vote,
        })),
        targetVoteCount > undefinedNaN
          ? {
              value,
              vote:
                prevVotedValue === value
                  ? targetVoteCount
                  : targetVoteCount + 1,
              index,
            }
          : {value, index},
      ]?.sort((a, b) => a.index - b.index);

      void targetPollDocRef.update({
        options: newOptions,
        votes: Object.assign({[email]: value}, filterVotes),
      });
    }
    return options.map(({value, vote}, index) => {
      const condition = setButtonStyle(filteredEmail, filteredVotes) === value;

      return (
        <TouchableOpacity
          key={index}
          className={`${
            condition ? 'scale-95 bg-secondary' : 'scale-90 bg-primary/40'
          } mx-auto my-1 w-11/12 flex-row justify-between rounded-full p-1 duration-300 ease-in-out`}
          onPress={async () => {
            try {
              await AsyncStorage.setItem(id, value);
              const email = currentUser?.email ?? '';
              const storedValue = (await AsyncStorage.getItem(id)) ?? '';
              handleOptionPress(storedValue, email);
            } catch (err) {
              console.log(err);
            }
          }}>
          <PollStyledText value={value} condition={condition} />
          <PollStyledText
            value={vote?.toString() ?? '0'}
            condition={condition}
          />
        </TouchableOpacity>
      );
    });
  }
  // const renderWithUnpublishedPoll = () => {
  //   return (
  //     <View>
  //       <View className="mb-3">
  //         <Text className="self-center p-2 text-xl font-semibold">
  //           {question}
  //         </Text>
  //         <TickingClock title="time remaining" expiration={dateOfExpiration} />
  //       </View>
  //       <TextInput
  //         className="mb-2 rounded-lg border p-3"
  //         placeholder="Submit entry here regarding the question..."
  //         value={pollState.idea ?? ''}
  //         onChangeText={text => handleChangeText(text, 'idea')}
  //       />
  //       <TouchableOpacity
  //         disabled={!condition}
  //         className={`${
  //           condition ? 'bg-primary' : 'bg-slate-200'
  //         } rounded-lg p-2 shadow-sm`}
  //         onPress={handleSubmitIdea}>
  //         <Text
  //           className={`${
  //             condition ? 'text-paper' : 'text-slate-300'
  //           } rounded-lg text-center capitalize`}>
  //           submit
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  const renderWithPublishedPoll = () => {
    return (
      <View className="mb-10 w-11/12 overflow-hidden rounded-3xl border border-primary bg-primary/40 p-2 shadow-md">
        <View className="p-2">
          <View>
            <View className="flex-row justify-between pb-4">
              <View className="flex-row gap-2">
                <Image
                  source={require('~/assets/cares_icon.png')}
                  className="h-12 w-12"
                  resizeMode="center"
                />
                <View>
                  <Text className="text-xl font-black uppercase text-black">
                    CICS Department
                  </Text>
                  <Text className="text-base font-bold text-primary/100">
                    {postedBy}
                  </Text>
                </View>
              </View>
              <TickingClock expiration={dateOfExpiration} />
            </View>
            {/* <VanillaTouchableOpacity
              onPress={loadCommentData}
              className="absolute inset-0 rounded-full bg-secondary px-2">
              <Text className="text-white">Simulate Comment Data Flow</Text>
            </VanillaTouchableOpacity> */}
            <Text className="mx-auto w-11/12 text-start font-normal text-black">
              {question}
            </Text>
          </View>
        </View>
        <View className="pb-2">{renderOptions()}</View>
        <View className="h-11/12 mx-auto mb-2 w-11/12 rounded-2xl bg-primary p-4">
          <View className="flex-row justify-between">
            <Text className="mb-2 text-xl text-white">Comments</Text>
            <TouchableOpacity
              disabled={pollState.maxLength < 0}
              onPress={() =>
                setPollState(prevState => ({
                  ...prevState,
                  showCommentInput: true,
                }))
              }
              className={`${
                pollState.maxLength < 0 ? 'bg-slate-200' : 'bg-secondary'
              } rounded-full px-2`}>
              <Text
                className={
                  pollState.maxLength < 0 ? 'text-slate-300' : 'text-paper'
                }>
                +
              </Text>
            </TouchableOpacity>
          </View>
          {renderComments()}
        </View>
      </View>
    );
  };
  const renderComments = () => {
    switch (pollState.maxLength) {
      /** initial state */
      case undefinedNaN:
        return <ActivityIndicator color="white" animating={true} />;
      /** loadComments is mounted */
      case 0:
        return (
          <View className="py-4">
            <Text className="text-center  text-paper">No comment</Text>
          </View>
        );
      default:
        return (
          <>
            <FlatList
              ref={flatListRef}
              className={`${
                pollState.index === 2 ? 'h-1/3' : 'h-max'
              } rounded-lg bg-paper/60 p-2`}
              data={pollState.showComments}
              onScroll={event => {
                const contentSize = event.nativeEvent.contentSize;
                const yPosition = event.nativeEvent.contentOffset.y;
                // const newIndex = Math.round(yPosition / contentSize.height);
                console.log({height: contentSize.height, yPosition});
                // if (newIndex !== pollState.currentIndex) {
                //   setPollState(prevState => ({
                //     ...prevState,
                //     currentIndex: newIndex,
                //   }));
                // }
              }}
              renderItem={({item}) => {
                const {commenter, value, dateCreated} = item;
                const studentInfo = studentsInfo?.filter(
                  props => commenter === props.email,
                )[0];
                const date = new Date();
                date.setTime(dateCreated);
                return (
                  <View className={'relative h-max w-full p-2'}>
                    {studentInfo ? (
                      <View>
                        <Image
                          src={studentInfo.src}
                          source={require('~/assets/error.svg')}
                          className="h-8 w-8"
                          {...imageDimension(24)}
                        />
                        <View>
                          <Text className="text-sm text-black">
                            {studentInfo.name}
                          </Text>
                          <Text className="text-sm text-primary">{value}</Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text className="text-sm text-black">{commenter}</Text>
                        <Text className="text-sm text-primary">{value}</Text>
                      </View>
                    )}
                    <Text className="absolute bottom-0 right-0 text-xs text-secondary">
                      {setUpPrefix(date)}
                    </Text>
                  </View>
                );
              }}
            />
            <TouchableOpacity
              onPress={paginateComments}
              className="mx-auto mt-4 w-max rounded-lg border border-paper  px-2 py-1">
              <Text className="text-center capitalize text-paper">
                {pollState.index + 1 === pollState.maxLength
                  ? 'hide'
                  : 'show more'}
              </Text>
            </TouchableOpacity>
          </>
        );
    }
  };

  useEffect(() => {
    return loadCommentData();
  }, [loadCommentData]);

  return (
    <View className="flex h-full w-full flex-col items-center justify-center bg-white">
      <View className="mb-4 w-full items-center bg-gray-500">
        <Image
          source={require('~/assets/project-suggestion.png')}
          className="my-4 h-8 w-80"
          resizeMode="stretch"
        />
      </View>
      <Modal
        transparent
        animationType="fade"
        onRequestClose={() => toggleModal(false, 'showCommentInput')}
        visible={pollState.showCommentInput}>
        <KeyboardAvoidingView className=" h-full bg-primary/40">
          <VanillaTouchableOpacity
            className="h-full "
            activeOpacity={100}
            onPress={() => {
              pollState.currentComment.trim() === ''
                ? toggleModal(false, 'showCommentInput')
                : toggleModal(true, 'showCloseConfirmation');
            }}>
            <Modal
              transparent
              visible={pollState.showCloseConfirmation}
              animationType="slide">
              <View className="h-full items-center justify-center bg-secondary/80">
                <Text className="font-bold text-paper">Discard Comment?</Text>
                <View className="flex-row">
                  <VanillaTouchableOpacity
                    className="m-2 rounded-xl bg-green-500 px-4 py-2 shadow-sm"
                    onPress={() => {
                      handleChangeText('', 'currentComment');
                      setPollState(prevState => ({
                        ...prevState,
                        showCloseConfirmation: false,
                        showCommentInput: false,
                      }));
                    }}>
                    <Text className="text-paper">Yes</Text>
                  </VanillaTouchableOpacity>
                  <VanillaTouchableOpacity
                    className="m-2 rounded-xl bg-red-500 px-4 py-2 shadow-sm"
                    onPress={() => toggleModal(false, 'showCloseConfirmation')}>
                    <Text className="text-paper">No</Text>
                  </VanillaTouchableOpacity>
                </View>
              </View>
            </Modal>
            <View className="m-auto w-max rounded-2xl bg-paper p-4">
              {/* <Text></Text> */}
              <Textfield
                placeholder="Input your comment here"
                value={pollState.currentComment}
                onChangeText={text => handleChangeText(text, 'currentComment')}
              />
              <VanillaTouchableOpacity
                onPress={handleCommentUpload}
                disabled={commentCondition}
                className={`${
                  commentCondition ? 'bg-slate-200' : 'bg-secondary'
                } mx-auto w-max rounded-2xl px-4 py-2`}>
                <Text
                  className={`${
                    commentCondition ? 'text-slate-300' : 'text-paper'
                  } text-center`}>
                  Post
                </Text>
              </VanillaTouchableOpacity>
            </View>
          </VanillaTouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
      {state === 'published' ? (
        renderWithPublishedPoll()
      ) : (
        <View className="h-screen w-full items-center justify-center bg-blue-200">
          <Text>No Polls</Text>
        </View>
      )}
      {/* ? renderWithUnpublishedPoll() */}
    </View>
  );
};

interface PollStyledTextProps {
  condition: boolean;
  value: string;
}

const PollStyledText = ({condition, value}: PollStyledTextProps) => (
  <Text
    className={`${
      condition ? 'text-bold text-lg text-paper' : 'text-black'
    } p-2`}>
    {value}
  </Text>
);

export default ProjectSuggestions;
