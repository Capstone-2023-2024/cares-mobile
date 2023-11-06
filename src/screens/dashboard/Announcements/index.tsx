import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, SectionList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import {Text} from '~/components';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';
import {AnnouncementProps} from '~/types/announcement';
import {retrieveImageFBStorage} from '~/utils/image';

const Announcements = () => {
  const {data, type, handleTypeChange} = useAnnouncement();
  const {getState} = useNavigation();
  const routes = getState().routes;
  const {currentStudent} = useUser();
  const params: string | undefined = routes[routes.length - 1]?.params;
  const paramsExist = typeof params === 'string';
  const announcementData = [
    ...(paramsExist ? data.filter(({id}) => id === params) : data),
  ];

  return (
    <View className="flex-1">
      {!paramsExist && (
        <View>
          <Text className="p-4 text-center text-4xl text-black">
            Announcements
          </Text>
          <View className="w-screen items-center justify-center">
            <SelectDropdown
              disabled={currentStudent.email === 'null'}
              defaultValue={type}
              defaultButtonText="Choose type"
              buttonTextStyle={{
                width: 'auto',
                textTransform: 'capitalize',
                borderRadius: 10,
                padding: 5,
                color: '#f5f5f5',
                backgroundColor: '#767373',
              }}
              data={['Event', 'University Memo', 'Recognition']}
              onSelect={handleTypeChange}
            />
          </View>
        </View>
      )}
      <SectionList
        keyExtractor={({id}) => id}
        sections={announcementData.map(({photoUrl, ...rest}) => ({
          title: {photoUrl, department: rest.department, type: rest.type},
          data: [{...rest}],
        }))}
        renderSectionHeader={({section}) => {
          const {
            title: {department, photoUrl, type},
          } = section;
          return (
            <View>
              <View className="my-4 scale-125 flex-row items-center justify-center">
                <Image
                  source={require('~/assets/cics_icon.png')}
                  className="mr-2 h-8 w-8"
                  resizeMode="center"
                />
                <Text className="mb-2 text-xl font-black text-primary">{`${department.toUpperCase()} Department`}</Text>
                <Text className="scale-75 self-center rounded-lg bg-primary p-2 text-xs uppercase text-paper">
                  {type === 'university_memorandum' ? 'memo' : type}
                </Text>
              </View>
              {photoUrl === undefined ? (
                <View className="" />
              ) : (
                <Image
                  className="m-8 h-64 rounded-3xl"
                  source={require('~/assets/error.svg')}
                  src={
                    photoUrl !== undefined
                      ? retrieveImageFBStorage(photoUrl ?? '')
                      : ''
                  }
                />
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return <Container key={index} {...item} />;
        }}
      />
    </View>
  );
};

const Container = (props: AnnouncementProps) => {
  const {message, postedBy, endDate, type, tags, dateCreated} = props;
  const endingDay = new Date();
  const postedDate = new Date();
  endingDay.setTime(endDate);
  postedDate.setTime(dateCreated);
  const messageLimit = 150;
  const [state, setState] = useState(false);

  function handlePress() {
    setState(prevState => !prevState);
  }

  return (
    <View className="m-2 p-2 shadow-sm">
      <View className="mx-auto w-11/12 p-2 shadow-sm">
        <View className="rounded-lg bg-primary/80 p-4">
          <Text className="text-center font-bold text-paper">{'Message'}</Text>
          {message.length > messageLimit ? (
            <TouchableOpacity onPress={handlePress}>
              <View>
                <Text className="text-paper">
                  {`${message.substring(
                    0,
                    state ? message.length : messageLimit,
                  )}`}
                </Text>

                <Text className="rounded-lg border border-paper p-2 text-center text-paper">
                  {message.length > messageLimit && !state
                    ? 'Read More'
                    : 'Hide'}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text className="text-paper">{message}</Text>
          )}
        </View>
        <View className="flex-row items-center justify-center">
          <Text>Tags:</Text>
          {tags?.map(value => {
            const date = new Date();
            date.setTime(endDate);
            return (
              <Text
                key={value}
                className="m-1 w-max rounded-lg bg-secondary px-2 py-1 text-sm text-paper">
                {value}
              </Text>
            );
          })}
        </View>
        <Text className="text-center font-semibold text-black">{`Posted by: ${postedBy}`}</Text>
        {type === 'university_memorandum' ? (
          <Text className="text-center font-semibold text-black">{`Posted date: ${postedDate.toDateString()}`}</Text>
        ) : (
          <Text className="text-center font-semibold text-black">{`Until: ${endingDay.toDateString()}`}</Text>
        )}
      </View>
    </View>
  );
};

export default Announcements;
