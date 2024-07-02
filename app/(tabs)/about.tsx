import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Link, Stack } from "expo-router";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Linking from "expo-linking";

interface Student {
  name: string;
  age: number;
}

const students: Student[] = [
  { name: "Bob", age: 17 },
  { name: "Susy", age: 18 },
  { name: "Ted", age: 18 },
  { name: "Sarah", age: 20 },
  { name: "Bill", age: 19 },
  { name: "Bob", age: 17 },
  { name: "Susy", age: 18 },
  { name: "Ted", age: 18 },
  { name: "Sarah", age: 20 },
  { name: "Bill", age: 19 },
  { name: "Bob", age: 17 },
  { name: "Susy", age: 18 },
  { name: "Ted", age: 18 },
  { name: "Sarah", age: 20 },
  { name: "Bill", age: 19 },
];

export default function TabThreeScreen() {
  const renderItem = ({ item }: { item: Student }) => (
    <Link href="/profile" style={styles.link}>
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
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    //   headerImage={
    //     <Ionicons size={310} name="code-slash" style={styles.headerImage} />
    //   }
    // >
    <View style={{flex:1,padding:10,marginTop:50}}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">List Data</ThemedText>
      </ThemedView>
      <ThemedText>This Is List Page </ThemedText>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item: Student) => item.name}
      />
      </View>
    // </ParallaxScrollView>
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
