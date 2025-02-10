import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { FontAwesome } from "@expo/vector-icons";

import icons from "@/constants/icons";
import { useLocalSearchParams, router, usePathname } from "expo-router";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex-row items-center w-full">
      {/* Search Bar */}
      <View className="h-16 shadow-lg shadow-black-100 flex-row items-center w-full flex-1 px-4 rounded-lg bg-accent-100 border border-primary-100 py-2">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
          style={{fontSize: 16, display:"flex", justifyContent:"center", alignItems:"center"}}
        />
      </View>

      {/* Filter Button (Right Side) */}
      <TouchableOpacity className="bg-blue-600 p-4 ml-2 rounded-lg h-16 w-16 flex justify-center items-center">
        <FontAwesome name="filter" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
