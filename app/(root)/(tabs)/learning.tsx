import React, { useEffect, useState } from "react";
import { ExploreCard } from "@/components/Cards";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { getCourse } from "@/app/apiQuerys";
import { useCourseData } from "../../../stores/applicationStore";

export default function Explore() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // ✅ Track pagination
  const { setCourseList, courseList } = useCourseData();
  const [total, setTotal] = useState("");
  // ✅ Fetch Courses (Initial Load & Pagination)
  const fetchCourses = async () => {
    if (loading) return; // Prevent duplicate API calls
    setLoading(true);
    try {
      const data = await getCourse(page); // Fetch courses with pagination
      if (Array.isArray(data?.data)) {
        setCourseList([...courseList, ...data.data]); // ✅ Append new data
        setPage(page + 1); // ✅ Increment page
        setTotal(""+data?.count);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  // ✅ Fetch initial data on component mount
  useEffect(() => {
    debugger
    if(courseList.length+"" != total){
      fetchCourses();
    }
  }, []);

  return (
    <View className="bg-white flex-1">
    {/* ✅ Title */}
    <Text className="text-2xl font-rubik-bold text-black mt-4 mb-4 px-8">All Courses ({total})</Text>
  
    {/* ✅ Course List (FlatList with Proper Padding) */}
    <FlatList
      data={courseList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ExploreCard {...item} />}
      onEndReached={fetchCourses} // ✅ Load more when reaching the end
      onEndReachedThreshold={0.5} // ✅ Trigger when 50% from bottom
      contentContainerStyle={{ paddingBottom: 100 }} // ✅ Adds extra space at the bottom
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#000" className="my-4" /> : null}
      ListFooterComponentStyle={{ paddingBottom: 30 }} // ✅ Ensures footer is visible
      ListEmptyComponent={!loading ? <Text className="text-center text-gray-500 mt-4">No courses available</Text> : null}
    />
  </View>
  );
}