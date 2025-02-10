import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import icons from "@/constants/icons";

import { Card } from "@/components/Cards";
// import LineChartCom from "@/components/LineChart";
import { cards } from "@/constants/data";

const Home = () => {

  const handleCardPress = (id: number) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-4 pb-2">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row">
          <Link href="/sign-in" asChild>
           <TouchableOpacity>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              className="w-16 h-16 rounded-full"
            />
           </TouchableOpacity>
          </Link>
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-sm font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-md font-rubik-medium text-black-300">
                Hari
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
    </SafeAreaView>
  );
};

export default Home;