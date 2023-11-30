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
            /* autoplay
            loop */
            autoplayInterval={2500} // Adjust the interval as needed
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
      <View className="mx-auto w-5/6 items-center overflow-hidden rounded-2xl border-2 bg-paper p-4 shadow-md">
        <View className="flex-row items-center">
          <View className="mr-2 h-10 w-10">
            {conditionRender ? (
              <View className="h-full w-full rounded-full bg-secondary" />
            ) : (
              <Image
                source={require('~/assets/cares_icon_5th_variant.png')}
                className="h-full w-full"
                resizeMode="center"
              />
            )}
          </View>
          <View className="relative p-2">
            <Text className="absolute -right-16 top-4 mx-auto w-24 rounded-lg bg-secondary px-2 py-1 text-xs capitalize text-paper">
              {type}
            </Text>
            <Text className="text-base font-bold uppercase text-black">
              {conditionRender ? loadingInput : department}
              <Text>{'\n'}</Text>
              {conditionRender ? loadingInput : 'DEPARTMENT'}
            </Text>
            <Text className="text-xs">
              {conditionRender ? loadingInput : `Posted by: ${postedBy}`}
            </Text>
          </View>
        </View>
        <Text className="mx-auto w-64 p-2 text-sm text-black">
          {conditionRender ? loadingInput : props.title}
        </Text>
        {photoUrls !== undefined ? (
          <View className=" h-48 w-64 items-center overflow-hidden ">
            {conditionRender ? (
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
            {conditionRender ? loadingInput : 'Read More'}
          </Text>
        </TouchableOpacity>
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
