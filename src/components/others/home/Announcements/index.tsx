import type {ReadAnnouncementProps} from '@cares/types/announcement';
import {getImageFromStorage} from '@cares/utils/media';
import {FIRESTORE_STORAGE_BUCKET} from '@env';
import React, {useRef} from 'react';
import {Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HeadingTemplate from '~/components/HeadingTemplate';
import TabContainer from '~/components/TabContainer';
import Text from '~/components/Text';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useNav} from '~/contexts/NavigationContext';
import {useUser} from '~/contexts/UserContext';

const HomeAnnouncements = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();
  const stateLengthEmpty = data.length === 0;
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const pagination = (
    <Pagination
      dotsLength={data.length}
      activeDotIndex={activeIndex}
      containerStyle={{paddingTop: 1}}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'black',
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  const handleSnapToItem = (index: number) => setActiveIndex(index);

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={stateLengthEmpty || currentStudent.email === 'null'}
        navigation="Announcements"
        title="announcements"
      />
      {stateLengthEmpty ? (
        <PlaceHolder text="Currently no Announcements" />
      ) : (
        <View className="items-center">
          <Carousel
            layout={'stack'}
            ref={carouselRef}
            data={data}
            renderItem={({item}) => <Container {...item} />}
            sliderWidth={500} // Adjust the width as needed
            itemWidth={450} // Adjust the width as needed
            autoplay
            loop
            autoplayInterval={300} // Adjust the interval as needed
            inactiveSlideOpacity={0.5} // Adjust the opacity for inactive slides
            onSnapToItem={handleSnapToItem}
          />
          {pagination}
        </View>
      )}
    </TabContainer>
  );
};

const Container = (props: ReadAnnouncementProps) => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();
  const conditionRender = currentStudent.email === 'null';
  const loadingInput = '..........';
  const {id, department, photoUrls, postedBy, type} = props;

  function handlePressReadMore(announcementId: string) {
    handleNavigation('Announcements', announcementId);
  }

  return (
    <TouchableOpacity
      onPress={() => handlePressReadMore(id)}
      activeOpacity={0.8}>
      <View className=" mx-10 items-center  overflow-hidden rounded-2xl border-2 bg-paper shadow-md ">
        <View className="mt-2 flex-row items-center">
          {currentStudent.email === 'null' ? (
            <View />
          ) : (
            <Image
              source={require('~/assets/cares_icon_5th_variant.png')}
              className="-ml-8 h-14 w-14"
              resizeMode="center"
            />
          )}
          <Text className="absolute -right-24 top-4  mx-auto w-auto flex-col rounded-lg bg-secondary px-2 py-1 text-xs capitalize text-paper">
            {type}
          </Text>
          <Text className="ml-4 text-center text-base font-bold uppercase text-black">
            {currentStudent.email === 'null' ? '.....' : department}
            <Text>{'\n'}</Text>
            {currentStudent.email === 'null' ? '......' : 'DEPARTMENT'}
          </Text>
        </View>
        <Text className="text-xs">
          {conditionRender ? loadingInput : `Posted by: ${postedBy}`}
        </Text>
        <Text className="mx-4 mb-1 mt-2 text-sm text-black ">
          {currentStudent.email === 'null' ? '........' : props.title}
        </Text>
        {photoUrls !== undefined ? (
          <View className=" h-48 w-96 items-center overflow-hidden ">
            {currentStudent.email === 'null' ? (
              <View />
            ) : (
              <Image
                className="mb-2 h-48 w-11/12 "
                source={require('~/assets/error.svg')}
                src={getImageFromStorage({
                  imageName: photoUrls[0] ?? '',
                  ref: 'images',
                  storageBucket: FIRESTORE_STORAGE_BUCKET,
                })}
                resizeMode="cover"
              />
            )}
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          className="mt-2 self-center"
          onPress={() => handlePressReadMore(id)}>
          <Text className="justify-center rounded-full border border-black p-1 px-2 text-xs">
            {currentStudent.email === 'null' ? '.....' : 'Read More'}
          </Text>
        </TouchableOpacity>
        <Text className=" my-2 text-xs">
          {currentStudent.email === 'null' ? '...' : `Posted by: ${postedBy}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PlaceHolder = ({text}: {text: string}) => {
  return (
    <View className="my-2 min-h-max w-full items-center px-[0.6rem] py-5">
      <Text className="text-xl">{text}</Text>
    </View>
  );
};

export default HomeAnnouncements;
