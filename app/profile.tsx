import {create} from 'zustand';
import React , {useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Link, Stack, useRouter, useGlobalSearchParams  } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from '@expo/vector-icons';
import { supabase } from "@/supabase";

const useStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
  deleteData: async (id) => {
    const { error } = await supabase
      .from('Student') // Replace with your table name
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting data:', error);
    } else {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  },
}));

export default function ProfileScreen() {
  const router = useRouter();
  const { id, name, age } = useGlobalSearchParams ();
  const [loading, setLoading] = useState(false);
  const { data, deleteData } = useStore();
//console.log(id)
const handleDeleteData = async () => {
  setLoading(true); // Assuming you have a loading state variable
  await deleteData(id); // Call the delete function from the store
  setLoading(false);
  router.back();
  console.log('Data deleted successfully');
};
  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">ID: {id}</ThemedText>
        <ThemedText type="title">Name: {name}</ThemedText>
        <ThemedText type="title">Age: {age}</ThemedText>

        <View
          style={{
            borderWidth: 1,
            borderColor: "lime",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={handleDeleteData}
            style={[{ marginLeft: 10 }]}
          >
            <Feather name="trash" size={22} color={"green"} />
          </TouchableOpacity>
          <ThemedText type="defaultSemiBold">Delete</ThemedText>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
