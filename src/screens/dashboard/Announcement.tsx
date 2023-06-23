import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

const Announcement = () => {
  const imgLink = '../../assets/BSUBACKGROUND.png';
  return (
    <View className="flex flex-1 items-center justify-center gap-12">
      <Image
        className="absolute inset-x-0 -z-10 w-full flex-1 justify-center"
        alt=""
        source={require(imgLink)}
      />
      <Text className="w-full bg-[#f5f5f5]/80 py-2 text-center text-4xl font-bold text-black">
        Title
      </Text>
      <Text className="rounded-xl bg-[#f5f5f5]/80 p-4 text-center text-black">
        Labore eu irure ullamco labore eiusmod dolore voluptate commodo.
        Exercitation aliquip Lorem officia ullamco deserunt non ut laborum
        deserunt labore ex. Commodo minim cillum occaecat commodo occaecat
        adipisicing. Proident laboris minim ullamco proident labore commodo ut.
        Exercitation eu Lorem est eu minim aute. Ad sunt est magna tempor
        reprehenderit ullamco quis. Consequat irure exercitation voluptate
        pariatur amet adipisicing reprehenderit. Irure velit officia voluptate
        nisi laboris laboris. Occaecat nulla aute consectetur id culpa sit ea id
        ad proident incididunt cillum. Lorem ipsum ex duis dolore eiusmod sint
        incididunt sit minim id. Ea quis cillum sit aliqua nulla commodo
        incididunt consequat ipsum. Sint nisi ex duis consequat ex id. Laboris
        proident incididunt cupidatat consectetur non sunt do. Lorem quis esse
        duis deserunt ullamco consequat do consectetur culpa. Commodo pariatur
        et eiusmod mollit pariatur tempor excepteur enim ea irure. Dolor eu
        nostrud adipisicing aute irure commodo qui aliqua id culpa quis quis
        tempor. Ex nisi laboris esse aliqua ut. Qui culpa officia duis commodo
        fugiat eu. Reprehenderit reprehenderit ad mollit mollit magna laborum.
        Consectetur nisi ex occaecat ea dolore aute cillum labore minim aliquip
        occaecat Lorem magna.
      </Text>
    </View>
  );
};

export default Announcement;
