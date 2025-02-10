import { ExploreCard } from '@/components/Cards';
import Search from '@/components/Search';
import { explore } from '@/constants/data';
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

export default function Explore() {
  return (
    <SafeAreaView className="bg-white mb-64">
      {/* Search Bar */}
      <View className='p-4'>
        <Search />
        <Text className="text-2xl font-rubik-bold text-black pt-4">All Courses (20)</Text>
      </View>
        {/* Scrollable List */}
        <ScrollView>
          {explore.map((lesson) => ( 
            <ExploreCard key={lesson.id} {...lesson} />
          ))}
        </ScrollView>
    </SafeAreaView>
  );
}