import { useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { Card } from "@/components/Cards";
import { cards } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";
import { getUserData } from "@/app/apiQuerys";
import { useLoading, userAllData } from "@/stores/applicationStore";
import { getGreeting } from "@/helper";

const Home = () => {
  
  const handleCardPress = (id: number) => router.push(`/properties/${id}`);
  const {user} = useAuthStore();
  const {toggleisLoading} = useLoading();
  const {setuserAllData, userAllDataVal} =userAllData();
  useEffect(()=>{
    const getUserDataFun  =async () => {
      await getUserData(user?.email).then((data)=> {
        toggleisLoading(false)
        setuserAllData(data?.profiles)
      }).catch((err)=> {
        toggleisLoading(false)
      })
    }
    getUserDataFun();
  },[]);

  return (
    <View className="bg-white flex-1">
      <View className="px-4 pb-2">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row">
           <TouchableOpacity>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              className="w-16 h-16 rounded-full"
            />
           </TouchableOpacity>
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-sm font-rubik text-black-100">
                {getGreeting()}
              </Text>
              <Text className="text-md font-rubik-medium text-black-300 mt-2">
                {userAllDataVal?.first_name}, {userAllDataVal?.last_name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
      </View>
      <ScrollView className="px-6">
        <View className="flex justify-between pt-5">
          <Text className="text-xl font-rubik-bold text-black-300">
            Your Weekly activity
          </Text>
          {/* <LineChartCom /> */}
        </View>
        <View className="mt-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Ongoing Courses
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-28">
        {cards.map((item, id: number) => {
          return (
            <Card item={item} key={id} onPress={() => handleCardPress(id)} />
          )
        })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;