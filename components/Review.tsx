import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ReviewCard = ({ user, review, timeAgo }:any) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Toggle Like Button
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <View className="bg-white rounded-lg mb-8">
      {/* Profile and Review Details */}
      <View className="flex-row items-center">
        <Image source={{ uri: user.image }} className="w-10 h-10 rounded-full mr-3" />
        <View>
          <Text className="text-black font-bold">{user.name}</Text>
          <Text className="text-gray-500 text-xs">{timeAgo}</Text>
        </View>
      </View>

      {/* Review Text */}
      <Text className="text-gray-700 mt-2">{review}</Text>

      {/* Like & Reply Buttons */}
      <View className="flex-row items-center mt-3">
        {/* Like Button */}
        <TouchableOpacity onPress={handleLike} className="flex-row items-center mr-5">
          <FontAwesome name={liked ? "heart" : "heart-o"} size={20} className={liked ? "text-red-500" : "text-gray-500"} />
          <Text className="text-gray-700 ml-1">{likes}</Text>
        </TouchableOpacity>

        {/* Reply Button */}
        <TouchableOpacity className="flex-row items-center">
          <FontAwesome name="reply" size={20} className="text-blue-500" />
          <Text className="text-gray-700 ml-1">Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ReviewCard;