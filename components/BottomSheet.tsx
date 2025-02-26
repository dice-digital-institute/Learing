import React, { useRef, useCallback } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView,  } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "../stores/applicationStore"; // Zustand store
import EditProfile from "./EditProfile";

const BottomSheetComponent = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { isSheetOpen, toggleSheet } = useBottomSheet(); // Zustand store to control BottomSheet

    // ✅ Function to Open & Close Sheet
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) toggleSheet(false); // Close when index is -1
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={1}
                appearsOnIndex={2}
            />
        ),
        []
    );
    
    return (
        <>
            <GestureHandlerRootView style={{ ...styles.container, height: isSheetOpen ? "100%" : 0 }}>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={isSheetOpen ? 0 : -1} // Open or Close
                    snapPoints={["75%", "90%", "100%"]} // ✅ Expand on pull-up
                    enablePanDownToClose={true} // ✅ Close on push-down
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <EditProfile />
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, position: "absolute", width: "100%", bottom: 0, backgroundColor:"rgba(0,0,0,0.5)" },
    contentContainer: {width: "100%",},
});

export default BottomSheetComponent;