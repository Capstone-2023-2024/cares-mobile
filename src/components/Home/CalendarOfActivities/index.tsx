import React from 'react';
import {HeadingTemplate, TabContainer} from '~/components/Home/Usertab';
import {useAnnouncement} from '~/contexts/AnnouncementContext';
import {useUser} from '~/contexts/UserContext';

const CalendarOfActivities = () => {
  const {data} = useAnnouncement();
  const {currentStudent} = useUser();

  return (
    <TabContainer>
      <HeadingTemplate
        disabled={data.length === 0 || currentStudent.email === 'null'}
        title="calendar of activities"
        navigation="CalendarOfActivities"
      />
      {/* <ScrollView
        horizontal={!stateLengthEmpty}
        showsHorizontalScrollIndicator={!stateLengthEmpty}>
        {stateLengthEmpty ? (
          <PlaceHolder text="Currently no Schedule" />
        ) : (
          data.map((props, i) => {
            return <Container {...props} key={i} />;
          })
        )}
      </ScrollView> */}
    </TabContainer>
  );
};

// const Container = (props: AnnouncementProps) => {
//   const navigate = useNavigation();

//   function handleNavigation(path: PathListType) {
//     navigate.dispatch(CommonActions.navigate({name: path}));
//   }

//   function handleUniSched() {
//     handleNavigation('CalendarOfActivities');
//   }

//   return (
//     <TouchableOpacity
//       className="ml-2 mr-5 mt-5 min-h-max w-64 items-start justify-center rounded-full bg-primary px-2 py-4 shadow-md"
//       onPress={handleUniSched}>
//       <View className="flex-row items-center">
//         <SvgContainer uri={pin} size="sm" />
//         <Text className="ml-2 w-1/2 text-xs text-white">
//           {props.message.substring(0, 15)}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const PlaceHolder = ({text}: {text: string}) => {
//   return (
//     <View className="my-2 min-h-max w-full items-center px-[0.6rem] py-5">
//       <Text className="text-xl">{text}</Text>
//     </View>
//   );
// };

export default CalendarOfActivities;
