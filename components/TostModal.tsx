import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { useTostModal } from "@/stores/applicationStore";

interface ToastModalProps {
  title: string;
  type?: "success" | "error"; // Type of toast
}

const ToastModal: React.FC<ToastModalProps> = ({ title, type = "success" }) => {
  const { tostModal, clearTostModal } = useTostModal();
  useEffect(() => {
    const timer = setTimeout(() => {
        clearTostModal();
    }, 2000);

    return () => clearTimeout(timer);
  }, [tostModal]);

  return (
    <Modal
      isVisible={tostModal?.isVisible}
      hasBackdrop={false}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        paddingBottom: 40,
      }}
    >
      <View
        className={`flex-row items-center px-4 py-3 mx-6 rounded-lg shadow-sm ${
          tostModal?.type === "success" ? "bg-green-100 border-green-600" : "bg-red-100 border-red-600"
        } border-l-4`}
      >
        {/* ✅ Success / Error Icon */}
        <Ionicons
          name={tostModal?.type === "success" ? "checkmark-circle" : "close-circle"}
          size={24}
          color={tostModal?.type === "success" ? "#16A34A" : "#DC2626"}
          className="mr-3"
        />
        
        {/* ✅ Toast Message */}
        <Text className="text-black text-lg">{tostModal?.title}</Text>
      </View>
    </Modal>
  );
};

export default ToastModal;