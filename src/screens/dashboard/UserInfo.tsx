import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SvgContainer from '~/components/SvgContainer';
import {userSvg} from '~/utils/svgIcons';

interface TextRowType {
  title: string;
  value: string;
}

const UserInfo = () => {
  async function handleSignout() {
    return null;
  }
  return (
    <View className="bg-paper">
      <Hero />
      <Text className="m-8 text-3xl font-semibold text-black">
        Student details
      </Text>
      <TextRow title="first_name" value={`${'Juan'}`} />
      <TextRow title="middle_name" value={`${'Xypher Yyzer Zyder'}`} />
      <TextRow title="last_name" value={`${'Dela Cruz'}`} />
      <TextRow title="college" value={`${'CICT'}`} />
      <TextRow title="year_level" value={`${'4th Year'}`} />
      <TextRow title="school_year" value={`${'2nd Semester AY 20xx - 20xx'}`} />
      <TextRow title="curriculum" value={`${'BSIT (2018-2019)'}`} />
      <TextRow title="scholarship/Discount" value={`${'Discount Scholar'}`} />
      <TextRow title="program" value={`${'BSIT'}`} />
      <TextRow title="major" value={`${'N/A'}`} />
      <TextRow title="sex" value={`${'Male'}`} />
      <TextRow title="age" value={`${'2x'}`} />
      <TouchableOpacity
        onPress={handleSignout}
        className="mt-14 self-center rounded-xl bg-error p-4 px-10 shadow-sm">
        <Text className="text-paper">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Hero = () => {
  return (
    <View className="mx-auto w-11/12 flex-row rounded-xl bg-accent p-6">
      <SvgContainer uri={userSvg} size="base" isCircle />
      <View className="ml-2">
        <Text className="text-xl text-paper">{`${'Dela Cruz, Juan'}`}</Text>
        <Text className="text-xs text-paper">{`${'20xx200xxx'}`}</Text>
      </View>
    </View>
  );
};

const TextRow = (props: TextRowType) => {
  const {title, value} = props;
  return (
    <View className="my-1 flex-row justify-between px-14">
      <Text className="capitalize">{title.replace(/_/, ' ')}</Text>
      <Text className="font-sembold text-black">{value}</Text>
    </View>
  );
};

export default UserInfo;
