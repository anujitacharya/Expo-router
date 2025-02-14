import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { supabase } from "@/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const { id, name, age } = useGlobalSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name || "",
    age: age || 0,
  });
  const [students, setStudents] = useState([]); // Added students state

  const handleEditData = () => {
    setIsEditing(true);
  };

  const handleSaveData = async () => {
    const { data, error } = await supabase
      .from("Student")
      .update({ name: editedData.name, age: editedData.age })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating data:", error);
    } else {
      console.log("Updated data:", data);
      setIsEditing(false);
    }
  };

  // Real-time subscription
  useEffect(() => {
    const subscription = supabase
      .channel("edit_data")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Student" },
        (payload: { eventType: string; new: { id: any; }; }) => {
          console.log("Change received:", payload);
          if (payload.eventType === "UPDATE") {
            setStudents((prev: any[]) =>
              prev.map((student) =>
                student.id === payload.new.id ? payload.new : student
              )
            );
          }
        }
      ).subscribe((status: any) => {
        console.log('Subscription status:', status);
      });
    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleDeleteData = async () => {
    Alert.alert(
      "Are You Sure",
      "Delete Your Data",
      [
        {
          text: "cancel",
          onPress: () => {
            console.log("Cancel");
          },
          style: "cancel",
        },
        {
          text: "yes",
          onPress: async () => {
            const { data, error } = await supabase
              .from("Student")
              .delete()
              .eq("id", id);
            router.back();
            console.log("Data deleted successfully", data);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <ThemedView style={styles.container}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.input, styles.additionalStyle]}
              placeholder="Enter name"
              placeholderTextColor="#ff7f50"
              value={editedData.name}
              onChangeText={(text: any) => {
                setEditedData((prev: any) => ({ ...prev, name: text }));
              }}
            />
            <TextInput
              style={[styles.input, styles.additionalStyle]}
              placeholder="Enter age"
              placeholderTextColor="#ff7f50"
              value={editedData.age.toString()}
              onChangeText={(text: any) => {
                setEditedData((prev: any) => ({ ...prev, age: Number(text) }));
              }}
            />
            <TouchableOpacity onPress={handleSaveData}>
              <ThemedText type="defaultSemiBold" style={{ color: "green" }}>
                Save
              </ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <ThemedText type="title">ID: {id}</ThemedText>
            <ThemedText type="title">Name: {name}</ThemedText>
            <ThemedText type="title">Age: {age}</ThemedText>
          </>
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleDeleteData}
            style={[{ marginLeft: 10, alignItems: "center" }]}
          >
            <Feather name="trash" size={30} color={"green"} />
            <ThemedText type="defaultSemiBold" style={{ color: "green" }}>
              Delete
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEditData}
            style={[{ marginLeft: 10, alignItems: "center" }]}
          >
            <FontAwesome name="edit" size={30} color="green" />
            <ThemedText type="defaultSemiBold" style={{ color: "green" }}>
              Edit
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 20,
    width: "90%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  additionalStyle: {
    borderRadius: 10,
    backgroundColor: "#008080",
  },
});
