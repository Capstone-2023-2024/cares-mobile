import {AnnouncementProps} from '@cares/types/announcement';
import {getImageFromStorage} from '@cares/utils/media';
import {NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET} from '@env';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Modal, SectionList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Text from '~/components/Text';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';

interface TypedParamsProps {
  id: string;
}

const Announcements = () => {
  const {data, type, handleTypeChange} = useAnnouncement();
  const [modalImage, setModalImage] = useState(false);
  const [photoSelected, setPhotoSelected] = useState('');
  const {params} = useRoute();
  const {currentStudent} = useUser();
  const typedParam: TypedParamsProps = params as TypedParamsProps;
  const [announcementData, setAnnouncementData] = useState([
    ...(typeof params === 'object'
      ? data.filter(({id}) => id === typedParam.id)
      : data.filter(props => {
          const today = new Date();
          const endDate = new Date();
          endDate.setTime(props.endDate);
          return props.type === 'event' && endDate.getTime() > today.getTime();
        })),
  ]);
  console.log({params});

  function handlePressImage(value: boolean, src?: string) {
    setModalImage(value);
    if (src !== undefined) {
      setPhotoSelected(src);
    }
  }

  function handleType(text: string) {
    console.log(text);
    handleTypeChange(text);
    if (text === 'Event') {
      return setAnnouncementData([
        ...data.filter(props => {
          const today = new Date();
          const endDate = new Date();
          endDate.setTime(props.endDate);
          return props.type === 'event' && endDate.getTime() > today.getTime();
        }),
      ]);
    } else if (text === 'University Memo') {
      return setAnnouncementData([
        ...data.filter(
          props => props.type === 'university_memorandum'.replace(/_/, ' '),
        ),
      ]);
    } else if (text === 'Others') {
      return setAnnouncementData([
        ...data.filter(props => props.type === 'others'),
      ]);
    }
    setAnnouncementData([
      ...data.filter(props => props.type === 'recognition'),
    ]);
  }

  // function handleTag(text: string) {
  //   setAnnouncementData([
  //     ...data.filter(data => {
  //       return (
  //         data.type === type &&
  //         data.title.filter(value => /.*${text}.*/.test(value))
  //       );
  //     }),
  //   ]);
  // }

  return (
    <View className="flex-1 bg-stone-400 ">
      <Modal
        animationType="fade"
        visible={modalImage}
        onRequestClose={() => handlePressImage(false)}>
        <View className="h-screen items-center justify-center">
          <RenderImageInModal src={photoSelected} />
        </View>
      </Modal>
      {typeof params !== 'object' && (
        <>
          <View className="mx-10 mb-4 mt-6 flex items-center justify-center rounded-3xl ">
            <Image
              source={require('~/assets/announcements.png')}
              className="my-4  h-8 w-80"
              resizeMode="stretch"
            />
          </View>
          <View className="mb-4 flex-row items-center justify-evenly">
            <SelectDropdown
              disabled={currentStudent.email === 'null'}
              defaultValue={type}
              defaultButtonText="Choose type"
              buttonStyle={{
                backgroundColor: '#D9D9D9',
                borderRadius: 50,
                marginHorizontal: 50,
              }}
              buttonTextStyle={{
                textTransform: 'capitalize',
                paddingTop: 3,
                paddingBottom: 3,
                fontWeight: 'bold',
                color: '#5E5E5E',
              }}
              data={['Event', 'University Memo', 'Recognition', 'Others']}
              onSelect={handleType}
            />
          </View>
        </>
      )}
      <SectionList
        keyExtractor={({id}) => id}
        sections={announcementData.map(({photoUrls, ...rest}) => ({
          title: {photoUrls, department: rest.department, type: rest.type},
          data: [{...rest}],
        }))}
        renderSectionHeader={({section}) => {
          const {
            title: {department, photoUrls}, // type
          } = section;

          const photoArrayOneSRC =
            photoUrls !== undefined
              ? getImageFromStorage({
                  imageName: photoUrls[0] ?? '',
                  ref: 'images',
                  storageBucket: NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
                })
              : '';

          return (
            <View className="relative mx-2 mb-3 mt-1 rounded-t-2xl bg-stone-300">
              <View className="ml-5 flex-row">
                <Image
                  source={require('~/assets/cares_icon.png')}
                  className="my-4 mr-2 h-16 w-16"
                  resizeMode="center"
                />
                <Text className="mt-5 text-2xl font-bold text-black">
                  {`${department.toUpperCase()} Department`}
                  {'\n'}
                  <Text className="text-center font-medium text-black">
                    Department Head
                  </Text>
                </Text>
              </View>
              {photoUrls === undefined ? (
                <View className="" />
              ) : (
                <TouchableOpacity
                  onPress={() => handlePressImage(true, photoArrayOneSRC)}>
                  <Image
                    className="mx-4 mb-5 mt-1 h-64 w-11/12 rounded-2xl bg-stone-300"
                    resizeMode="cover"
                    source={require('~/assets/error.svg')}
                    src={photoArrayOneSRC}
                  />
                </TouchableOpacity>
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
  const {message, postedBy, endDate, type, title, dateCreated} = props;
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
    <View className=" shadow-sm ">
      <View className=" shadow-sm">
        <View className="w-98 mx-2 -mt-7 mb-3 rounded-b-2xl bg-stone-300 p-4">
          {message.length > messageLimit ? (
            <View>
              <View>
                <Text className="mb-3">
                  {`${message.substring(
                    0,
                    state ? message.length : messageLimit,
                  )}`}
                </Text>
                <TouchableOpacity
                  onPress={handlePress}
                  className="mx-28 mt-2 rounded-lg border border-black">
                  <Text className="text-center">
                    {message.length > messageLimit && !state
                      ? 'Read More'
                      : 'Hide'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View className=" flex-row items-center justify-center">
                <Text className="text-3xl font-bold">{'[ '}</Text>
                <Text className="text-xl font-bold">{title}</Text>
                <Text className="text-3xl font-bold">{' ]'}</Text>
              </View>
              <Text className=" my-4">{message}</Text>
            </> // Whole Message
          )}

          <Text className="text-center font-semibold text-black">{`Posted by: ${postedBy}`}</Text>
          {type !== 'event' ? (
            <></>
          ) : (
            // <Text className="text-center font-semibold text-black">{`Posted date: ${postedDate.toLocaleString()}`}</Text>
            <View>
              <Text className="text-center font-semibold text-black">{`Posted date: ${postedDate.toLocaleString()}`}</Text>
              <Text className="text-center font-semibold text-black">{`Until: ${endingDay.toLocaleString()}`}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const RenderImageInModal = ({src}: {src: string}) => {
  return (
    <Image
      className="h-full w-full"
      resizeMode="contain"
      source={require('~/assets/error.svg')}
      src={src}
    />
  );
};

export default Announcements;
