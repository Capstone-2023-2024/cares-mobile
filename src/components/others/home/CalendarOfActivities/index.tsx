import React, {useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {View} from 'react-native';
import HeadingTemplate from '~/components/HeadingTemplate';
import TabContainer from '~/components/TabContainer';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';
import Text from '~/components/Text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNav} from '~/contexts/NavigationContext';
import {currentMonth} from '@cares/common/utils/date';

const HomeCalendarOfActivities = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();
  const carouselRef = useRef(null);

  const restAnnouncements = data
    .filter(props => props.type === 'event')
    .sort((a, b) => a.endDate - b.endDate);
  /** FIlter announcement to current Month and Year */
  const filteredAnnouncement = restAnnouncements.filter(props => {
    const firstDate = new Date();
    const lastDate = new Date();
    const {maxDays} = currentMonth({
      month: firstDate.getMonth(),
      year: firstDate.getFullYear(),
    });
    firstDate.setDate(1);
    lastDate.setDate(maxDays);
    const condition =
      props.endDate >= firstDate.getTime() &&
      props.endDate <= lastDate.getTime();
    console.log({title: props.title, condition});

    return condition;
  });
  const {handleNavigation} = useNav();
  const [activeIndex, setActiveIndex] = useState(0);

  const pagination = (
    <Pagination
      dotsLength={filteredAnnouncement.length}
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
        disabled={
          filteredAnnouncement.length === 0 || currentStudent.email === 'null'
        }
        title="calendar of activities"
        navigation="CalendarOfActivities"
        params={JSON.stringify({
          filteredAnnouncement,
          restAnnouncements,
        })}
      />
      <View className="items-center">
        <Carousel
          layout="tinder"
          data={filteredAnnouncement}
          ref={carouselRef}
          renderItem={({item}) => {
            const {title, markedDates, id} = item;
            const keys = Object.keys(markedDates).sort((a, b) =>
              a.localeCompare(b),
            );
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  handleNavigation(
                    'CalendarOfActivities',
                    JSON.stringify({
                      id,
                      filteredAnnouncement,
                      restAnnouncements,
                    }),
                  )
                }
                className={`${
                  filteredAnnouncement.map(({id}) => id).indexOf(id) ===
                  activeIndex
                    ? 'bg-secondary'
                    : 'bg-secondary/50'
                } mx-auto w-96 rounded-lg p-4 shadow-sm duration-300 ease-in-out`}>
                <Text className="text-center text-lg font-black text-white">
                  {title}
                </Text>
                <View>
                  {keys.map((key, i) => {
                    const renderConditionalElement = () => {
                      if (keys.length === 1) {
                        return (
                          <Text className="text-center text-sm text-paper">{`Only at: ${key}`}</Text>
                        );
                      }
                      switch (i) {
                        case 0:
                          return (
                            <Text className="text-center text-sm text-paper">{`Starting from: ${key}`}</Text>
                          );
                        case keys.length - 1:
                          return (
                            <Text className="text-center text-sm text-paper">{`Up to: ${key}`}</Text>
                          );
                        default:
                          return <View />;
                      }
                    };
                    return (
                      <View key={key + title + i}>
                        {renderConditionalElement()}
                      </View>
                    );
                  })}
                </View>
              </TouchableOpacity>
            );
          }}
          loop
          // autoplay
          sliderWidth={400} // Adjust the width as needed
          itemWidth={400} // Adjust the width as needed
          autoplayInterval={3000} // Adjust the interval as needed
          inactiveSlideOpacity={0.2} // Adjust the opacity for inactive slides
          onSnapToItem={handleSnapToItem}
        />
        {pagination}
      </View>
    </TabContainer>
  );
};

export default HomeCalendarOfActivities;
