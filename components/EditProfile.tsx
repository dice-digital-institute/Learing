import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../supabase"; // ✅ Import Supabase client
import {  userAllData } from "@/stores/applicationStore";
// ✅ Form Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

export default function EditProfile() {
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const { userAllDataVal } =userAllData();
  // ✅ React Hook Form
  const {
    control,
    handleSubmit,
    setValue, // ✅ Used to set prefilled values
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Fetch User Data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // ✅ Set prefilled values
        setValue("firstName", userAllDataVal?.first_name);
        setValue("lastName", userAllDataVal?.last_name);
        setValue("email", userAllDataVal?.email_id);
        setValue("phone", userAllDataVal?.phone_number);
        setValue("address", userAllDataVal?.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ API Call Function to Update User Data
  const onSubmit = async () => {
    // try {
    //   const { error } = await supabase.from("users").update({
    //     first_name: data.firstName,
    //     last_name: data.lastName,
    //     email: data.email,
    //     phone: data.phone,
    //     address: data.address,
    //   }).eq("id", userId);

    //   if (error) throw error;

    //   Alert.alert("Success", "User details updated successfully!");
    //   reset(); // ✅ Reset form after submission
    // } catch (error) {
    //   console.error("Error:", error);
    //   Alert.alert("Error", "Something went wrong, please try again.");
    // }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View className="bg-white w-full px-8">
      <Text className="text-2xl font-bold text-black text-center mb-4">Edit Profile</Text>

      {/* ✅ First Name Input */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="First Name"
            value={value}
            onChangeText={onChange}
            className="w-full border border-gray-300 rounded-md p-3 my-2"
          />
        )}
      />
      {errors.firstName && <Text className="text-red-500">{errors.firstName.message}</Text>}

      {/* ✅ Last Name Input */}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Last Name"
            value={value}
            onChangeText={onChange}
            className="w-full border border-gray-300 rounded-md p-3 my-2"
          />
        )}
      />
      {errors.lastName && <Text className="text-red-500">{errors.lastName.message}</Text>}

      {/* ✅ Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            className="w-full border border-gray-300 rounded-md p-3 my-2"
          />
        )}
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      {/* ✅ Phone Number Input */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            className="w-full border border-gray-300 rounded-md p-3 my-2"
          />
        )}
      />
      {errors.phone && <Text className="text-red-500">{errors.phone.message}</Text>}

      {/* ✅ Address Input */}
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Address"
            multiline
            numberOfLines={3}
            value={value}
            onChangeText={onChange}
            className="w-full border border-gray-300 rounded-md p-3 my-2"
          />
        )}
      />
      {errors.address && <Text className="text-red-500">{errors.address.message}</Text>}

      {/* ✅ Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg mt-4 ${
          isSubmitting ? "bg-gray-400" : "bg-blue-600"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}