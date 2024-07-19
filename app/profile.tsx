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
import { Link, Stack, useRouter, useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from '@expo/vector-icons';
import { supabase } from "@/supabase";

export default function ProfileScreen() {
  const { id, name, age } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
//console.log(id)
  const handleDeleteData = async () => {
      console.log(id)
    
    setLoading(true); // Assuming you have a loading state variable
  
    const { error } = await supabase
      .from('Student') // Replace with your table name
      .delete()
      .eq('id', id) // Specify the ID to delete
    if (error) {
      setLoading(false);
      console.error(error);
    } else {
      setLoading(false);
      console.log('Data deleted successfully');
      // Update UI to reflect the deletion (e.g., remove item from a list)
    }
    
  };
//   <TouchableOpacity
//   onPress={handleDeleteData}
//   style={[{ marginLeft:  10 }]}
// >
//   <Feather name="trash" size={22} color={'green'} />
// </TouchableOpacity>
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
