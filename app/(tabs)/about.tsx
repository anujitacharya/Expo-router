import {
  StyleSheet,
  View,
  FlatList
} from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";


interface Student {
  id: number;
  name: string;
  age: number;
}

const students = [
  { id: 1, name: "Bob", age: 17 },
  { id: 2, name: "Susy", age: 18 },
  { id: 3, name: "Teod", age: 18 },
  { id: 4, name: "Sarah", age: 20 },
  { id: 5, name: "Bill", age: 19 },
  { id: 6, name: "Bob", age: 17 },
  { id: 7, name: "Suy", age: 18 },
  { id: 8, name: "Tmed", age: 18 },
  { id: 9, name: "Syrah", age: 20 },
  { id: 10, name: "Bil", age: 19 },
  { id: 11, name: "Bob", age: 17 },
  { id: 12, name: "Susy", age: 18 },
  { id: 13, name: "Ted", age: 18 },
  { id: 14, name: "Saprah", age: 20 },
  { id: 15, name: "Bipl", age: 19 },
];

export default function TabThreeScreen() {
  const renderItem = ({ item }: { item: Student }) => (
    <Link
      href={{
        pathname: "/profile",
        params: { id: item.id, name: item.name, age: item.age },
      }}
      style={styles.link}
    >
      <View
        style={{ flexDirection: "row", borderWidth: 2, borderColor: "lime" }}
      >
        <ThemedText type="link" style={{ color: "#D0D0D0", fontSize: 20 }}>
          Name :{" "}
        </ThemedText>
        <ThemedText type="link" style={{ color: "#D0D0D0", fontSize: 20 }}>
          {item.name}{" "}
        </ThemedText>
        <ThemedText type="link" style={{ color: "#D0D0D0", fontSize: 20 }}>
          Age{" "}
        </ThemedText>
        <ThemedText type="link" style={{ color: "#D0D0D0", fontSize: 20 }}>
          {item.age}{" "}
        </ThemedText>
      </View>
    </Link>
  );
  return (
    <View style={{ flex: 1, padding: 10, marginTop: 50 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">List Data</ThemedText>
      </ThemedView>
      <ThemedText>This Is List Page </ThemedText>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item: Student) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  color: {
    color: "gray",
  },
});
