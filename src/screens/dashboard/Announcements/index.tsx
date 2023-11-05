import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Text} from '~/components';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';
import {AnnouncementProps} from '~/types/announcement';
import {retrieveImageFBStorage} from '~/utils/image';

const Announcements = () => {
  const {data, type, orderBy, handleOrderBy, handleTypeChange} =
    useAnnouncement();
  const {getState} = useNavigation();
  const routes = getState().routes;
  const {currentStudent} = useUser();
  const params: string | undefined = routes[routes.length - 1]?.params;
  const paramsExist = typeof params === 'string';

  return (
    <View className="flex-1">
      <ScrollView>
        {!paramsExist && (
          <View>
            <Text className="p-4 text-center text-4xl text-black">
              Announcements
            </Text>
            <View className="justify center flex-row items-center">
              <SelectDropdown
                disabled={currentStudent.email === 'null'}
                defaultValue={type}
                defaultButtonText="Choose type"
                buttonTextStyle={{
                  textTransform: 'capitalize',
                  borderRadius: 50,
                  padding: 3,
                  color: '#f5f5f5',
                  backgroundColor: '#767373',
                }}
                data={['event', 'university_memorandum', 'recognition']}
                onSelect={handleTypeChange}
              />
              <SelectDropdown
                disabled={currentStudent.email === 'null'}
                defaultValue={orderBy}
                defaultButtonText="Order by"
                buttonTextStyle={{
                  textTransform: 'capitalize',
                  borderRadius: 50,
                  padding: 3,
                  color: '#f5f5f5',
                  backgroundColor: '#767373',
                }}
                data={['asc', 'desc']}
                onSelect={handleOrderBy}
              />
            </View>
          </View>
        )}
        {[...(paramsExist ? data.filter(({id}) => id === params) : data)].map(
          props => {
            return <Container key={props.id} {...props} />;
          },
        )}
      </ScrollView>
    </View>
  );
};

const Container = (props: AnnouncementProps) => {
  const {
    department,
    message,
    photoUrl,
    postedBy,
    endDate,
    type,
    tags,
    dateCreated,
  } = props;
  const endingDay = new Date();
  const postedDate = new Date();
  endingDay.setTime(endDate);
  postedDate.setTime(dateCreated);

  return (
    <View className="h-[80vh] p-4 shadow-sm">
      <View className="mx-auto w-11/12 p-2 shadow-sm">
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
            className="h-2/5"
            resizeMethod="scale"
            source={require('~/assets/error.svg')}
            src={
              photoUrl !== undefined
                ? retrieveImageFBStorage(photoUrl ?? '')
                : ''
            }
          />
        )}
        <View className="rounded-lg bg-primary/80 p-4">
          <Text className="text-center font-bold text-paper">{'Message'}</Text>
          <Text className="text-paper">{`${message}adssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssasdddddddddddddddddddss`}</Text>
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
