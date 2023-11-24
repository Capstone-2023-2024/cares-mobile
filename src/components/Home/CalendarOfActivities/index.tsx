import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {HeadingTemplate, TabContainer} from '~/components/Home/Usertab';
import Text from '~/components/Text';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';
import {retrieveImageFBStorage} from '~/utils/image';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {AnnouncementProps} from '~/types/announcement';
import {PathListType} from '~/utils/navPaths/types';
import {CommonActions, useNavigation} from '@react-navigation/native';

const CalendarOfActivities = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();
  const carouselRef = React.useRef(null);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const containerStyle = {paddingVertical: 8};
  const dotStyle = {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  };

  // Filter out posts without images
  const filteredData = data.filter(
    item => item.photoUrl && item.photoUrl.length > 0,
  );

  const renderPagination = () => (
    <Pagination
      dotsLength={filteredData.length}
      containerStyle={containerStyle}
      activeDotIndex={activeSlide}
      dotStyle={dotStyle}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={filteredData.length === 0 || currentStudent.email === 'null'}
        title="calendar of activities"
        navigation="CalendarOfActivities"
      />
      {filteredData.length === 0 ? (
        <PlaceHolder text="Currently no Schedule" />
      ) : (
        <View className="-ml-2">
          <Carousel
            ref={carouselRef}
            style={{alignItems: 'center'}}
            layout={'stack'}
            data={filteredData}
            renderItem={({item}) => (
              <Container {...item} currentStudent={currentStudent} />
            )}
            loop={false}
            autoplay={true}
            autoplayInterval={2500}
            sliderWidth={460}
            itemWidth={400}
            onSnapToItem={index => setActiveSlide(index)} // Update active slide without debounce
          />
          {renderPagination()}
        </View>
      )}
    </TabContainer>
  );
};

const Container = (props: AnnouncementProps & {currentStudent: any}) => {
  const navigate = useNavigation();

  function handleNavigation(path: PathListType) {
    navigate.dispatch(CommonActions.navigate({name: path}));
  }

  function handleUniSched() {
    handleNavigation('CalendarOfActivities');
  }

  return (
    <TouchableOpacity
      disabled={props.currentStudent.email === 'null'}
      className="h-100 ml-2 mr-2 mt-1 w-11/12 items-start justify-center rounded-3xl border-4 bg-primary shadow-md"
      onPress={handleUniSched}>
      <View className="flex-row items-center">
        {props.currentStudent.email === 'null' ? (
          <View className="h-100 w-11/12 bg-primary" />
        ) : (
          <Image
            className=" h-60 w-full rounded-2xl"
            resizeMode="cover"
            source={require('~/assets/error.svg')}
            src={retrieveImageFBStorage(props.photoUrl ?? [])}
          />
        )}
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

export default CalendarOfActivities;
