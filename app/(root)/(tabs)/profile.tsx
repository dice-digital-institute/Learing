import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { useAuthStore } from '../../../stores/authStore';
import { useBottomSheet } from '../../../stores/applicationStore';

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
  const { logout } = useAuthStore();
  const { toggleSheet } = useBottomSheet();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="bg-white flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>

          <TouchableOpacity className="" onPress={() => toggleSheet(true)}>
            <Text className="text-xl font-rubik-bold text-primary-300">Edit</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              className="size-48 relative rounded-md"
            />
            <Text className="text-2xl font-rubik-bold mt-2">Hari</Text>
            <Text className="text-lg font-rubik-bold mt-2">Front-end Dev</Text>
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
    </View>
  );
};

export default Profile;