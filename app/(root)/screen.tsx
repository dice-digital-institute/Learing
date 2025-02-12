import { useVideoPlayer, VideoView, VideoSource, } from 'expo-video';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from 'react-native-safe-area-context';

const bigBuckBunnySource: VideoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function PreloadingVideoPlayerScreen() {

  const [getDimensions, setDimensions] = useState({});
  const videoRef = useRef<VideoView>(null);

  const player1 = useVideoPlayer(bigBuckBunnySource, player => {
    player.play();
  });

  useEffect(()=>{
    setDimensions({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    })
  },[Dimensions])

  const [currentPlayer, _setCurrentPlayer] = useState(player1);

  return (
    <SafeAreaView className='h-full w-full flex items-center justify-center' style={styles.contentContainer}>
        {Object.keys(getDimensions).length > 0 && currentPlayer !== null ? (
          <VideoView  
          ref={videoRef} 
          player={currentPlayer} 
          style={getDimensions}
          allowsFullscreen
          allowsPictureInPicture
        />
        ) : (<View></View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
  backgroundColor: "#000"
  },
});
