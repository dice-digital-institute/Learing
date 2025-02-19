import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";

interface Props {
  item: any;
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />

      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${item.price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full my-4 pb-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>

      <Image source={{ uri: item.image }} className="w-full h-40 rounded-t-lg" />

      <View className="flex px-4 flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          {item.title}
        </Text>
        <Text className="text-xs font-rubik text-black-100">
          {item.des}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bol w-80">
            <ProgressBar progress={item.progress} />
          </Text>
          <Text className="text-base font-rubik-bold">
            &nbsp; {item.progress}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const LessonCard = ({ title, description, duration, image, progress }: any) => {
  return (
    <TouchableOpacity className="bg-white flex-col items-center rounded-xl p-4 h-02 shadow-md mb-4">
      {/* Thumbnail with Play Button */}
      <View className="flex-row items-center justify-center">
        <View className="flex items-center justify-center relative w-20 h-20 rounded-2xl overflow-hidden">
          <Image source={{ uri: image }} className="w-full h-full" />
          {/* Play Button Overlay */}
          <View className="absolute inset-0 flex items-center justify-center bg-black/30">
            <FontAwesome name="play" size={22} color="#FFF" />
          </View>
        </View>
        {/* Text Section */}
        <View className="flex-1 ml-3 mr-1">
          <Text className="text-black text-lg font-rubik-bold">{title}</Text>
          <Text className="text-gray-500 text-sm font-rubik-medium">{description}</Text>
        </View>
        {/* Duration */}
        <Text className="text-gray-700 text-sm font-rubik-light">{duration}</Text>
      </View>
      <View className="flex flex-row items-center justify-between pt-2 w-full">
        <Text className="text-base font-rubik-bol w-80">
          <ProgressBar progress={progress} />
        </Text>
        <Text className="text-base font-rubik-bold">
          &nbsp; {progress}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ExploreCard = ({ title, description, price, thumbnail_url, duration }: any, key:any) => {
  return (
    <TouchableOpacity key={key} className="bg-white flex-row items-center rounded-xl p-4 h-40 shadow-md mx-4 my-2">
      {/* Thumbnail with Play Button */}
      <View className="relative w-28 h-28 rounded-2xl overflow-hidden">
        <View className="flex flex-row items-center absolute px-2 top-2 right-2 bg-white/90 p-1 rounded-full z-50">
          <Image source={icons.star} className="size-2.5" />
          <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
            {4.3}
          </Text>
        </View>
        <Image source={{ uri: thumbnail_url }} className="w-full h-full" />
      </View>
      {/* Text Section */}
      <View className="flex-1 ml-3 mr-1">
        <Text className="text-black text-lg font-rubik-bold">{title}</Text>
        <Text className="text-gray-500 text-sm font-rubik-medium">{description} Vidoes</Text>
        <Text className="text-gray-500 text-sm font-rubik-medium">{duration} mins</Text>
      </View>
      {/* Duration */}

      <Text className="text-gray-700 text-sm font-rubik-light">${price}</Text>
    </TouchableOpacity>
  );
};