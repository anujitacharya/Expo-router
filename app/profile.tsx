import { Link, Stack, useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ProfileScreen() {
  const { id, name, age } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">ID: {id}</ThemedText>
        <ThemedText type="title">Name: {name}</ThemedText>
        <ThemedText type="title">Age: {age}</ThemedText>
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
