import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import EditProfileModal from "@/components/ProfileModel";
import { useState } from "react";
import supabase from "@/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {

  const handleLogout = async () => {
      Alert.alert("Success", "Logged out successfully");
      await AsyncStorage.setItem("userData", "");
      supabase.auth.signOut();
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="h-full bg-white">
      <EditProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
        </View>
      
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2" onPress={()=> setModalVisible(!modalVisible)}>
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">Hari</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;