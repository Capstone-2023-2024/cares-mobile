import React, {useRef} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '~/components';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useNav} from '~/contexts/NavigationContext';
import type {AnnouncementProps} from '~/types/announcement';
import {retrieveImageFBStorage} from '~/utils/image';
import {HeadingTemplate, TabContainer} from '../../../components/Home/Usertab';
import {useUser} from '~/contexts/UserContext';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const Announcements = () => {
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
            className=""
            ref={carouselRef}
            data={data}
            renderItem={({item}) => <Container {...item} />}
            sliderWidth={500} // Adjust the width as needed
            itemWidth={400} // Adjust the width as needed
            autoplay
            loop
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

const Container = (props: AnnouncementProps) => {
  const {handleNavigation} = useNav();
  const {currentStudent} = useUser();
  const {id, department, message, photoUrl, postedBy, type} = props;

  function handlePressReadMore(announcementId: string) {
    handleNavigation('Announcements', announcementId);
  }

  return (
    <TouchableOpacity
      onPress={() => handlePressReadMore(id)}
      activeOpacity={0.8}>
      <View className="ml-2 mr-2  items-center justify-center overflow-hidden rounded-2xl border-2 bg-paper p-4 shadow-md">
        <View className="flex-row">
          <View className="items-start">
            <View className="flex-row items-center justify-center">
              {currentStudent.email === 'null' ? (
                <View className="h-8 w-8 bg-primary" />
              ) : (
                <Image
                  source={require('~/assets/cares_icon_5th_variant.png')}
                  className="h-14 w-14 "
                  resizeMode="center"
                />
              )}
              <View className="ml-6">
                <Text className="text-center text-base font-bold uppercase text-black">
                  {currentStudent.email === 'null' ? '.....' : department}
                </Text>
                <Text className="text-center text-base font-bold text-black">
                  {currentStudent.email === 'null' ? '......' : 'DEPARTMENT'}
                </Text>
              </View>
              <View className="ml-6 rounded-lg bg-primary px-2 py-1 ">
                {currentStudent.email === 'null' ? (
                  <View className="h-12 w-12  bg-secondary" />
                ) : (
                  <Text className="text-xs capitalize text-paper">
                    {type === 'university_memorandum' ? 'memo' : type}
                  </Text>
                )}
              </View>
            </View>
            <Text className=" mx-16 my-3 text-xs text-black ">
              {currentStudent.email === 'null'
                ? '........'
                : message.substring(0, 23)}
            </Text>
            <TouchableOpacity
              className="self-center"
              onPress={() => handlePressReadMore(id)}>
              <Text className="justify-center rounded-full border border-black p-1 px-2 text-xs">
                {currentStudent.email === 'null' ? '.....' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>
          {photoUrl !== undefined ? (
            <View className="ml-5 h-28 w-24 overflow-hidden bg-primary/40">
              {currentStudent.email === 'null' ? (
                <View className="h-12 w-12 bg-primary" />
              ) : (
                <Image
                  className="h-28 w-24 "
                  source={require('~/assets/error.svg')}
                  src={retrieveImageFBStorage(photoUrl)}
                  resizeMode="cover"
                />
              )}
            </View>
          ) : (
            <View />
          )}
        </View>
        <Text className="-mb-2 mt-5 text-xs">
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

export default Announcements;
