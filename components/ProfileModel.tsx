import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";


interface ProgressBarProps {
    modalVisible: boolean;
    setModalVisible: any
}

const EditProfileModal: React.FC<ProgressBarProps> = ({ modalVisible, setModalVisible }) => {
    const [userInfo, setUserInfo] = useState({
        name: "John Doe",
        age: "25",
        email: "johndoe@email.com",
        phone: "+1234567890",
        address: "New York, USA",
        bio: "Passionate learner & developer",
    });

    // Handle Input Change
    const handleInputChange = (field: string, value: string) => {
        setUserInfo({ ...userInfo, [field]: value });
    };

    return (
        <View className="items-center mt-4">
            {/* Modal */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/50 px-4">
                    <View className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
                        <Text className="text-xl font-bold text-black mb-4 text-center">Edit Profile</Text>

                        {/* Input Fields */}
                        {Object.keys(userInfo).map((field) => (
                            <TextInput
                                key={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={userInfo[field as keyof typeof userInfo]}
                                onChangeText={(text) => handleInputChange(field, text)}
                                className="w-full border border-gray-300 rounded-md p-2 mb-3"
                            />
                        ))}

                        {/* Buttons */}
                        <View className="flex-row justify-between mt-4">
                            <TouchableOpacity
                                className="bg-red-500 px-4 py-2 rounded-lg"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-white font-bold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="bg-green-500 px-4 py-2 rounded-lg"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-white font-bold">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EditProfileModal;