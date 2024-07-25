import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { supabase } from "@/supabase";

interface Student {
  id: number;
  name: string;
  age: number;
}

// const students = [
//   { id: 1, name: "Bob", age: 17 },
//   { id: 2, name: "Susy", age: 18 },
//   { id: 3, name: "Teod", age: 18 },
//   { id: 4, name: "Sarah", age: 20 },
//   { id: 5, name: "Bill", age: 19 },
//   { id: 6, name: "Bob", age: 17 },
//   { id: 7, name: "Suy", age: 18 },
//   { id: 8, name: "Tmed", age: 18 },
//   { id: 9, name: "Syrah", age: 20 },
//   { id: 10, name: "Bil", age: 19 },
//   { id: 11, name: "Bob", age: 17 },
//   { id: 12, name: "Susy", age: 18 },
//   { id: 13, name: "Ted", age: 18 },
//   { id: 14, name: "Saprah", age: 20 },
//   { id: 15, name: "Bipl", age: 19 },
// ];

// //this is not  duplicate name
// const uniqueStudents : any[] = [];

// for (let i = 0; i < students.length; i++) {
//   let isUnique = true;
//   for (let j = 0; j < uniqueStudents.length; j++) {
//     if (students[i].name === uniqueStudents[j].name) {
//       isUnique = false;
//       break;
//     }
//   }
//   if (isUnique) {
//     uniqueStudents.push(students[i]);
//   }
// }

export default function TabThreeScreen() {
  const [name, setName] = React.useState<string>("");
  const [age, setAge] = React.useState<number>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Student") // Replace with your table name
        .select("*")
        .order("id", { ascending: false }); // Select all columns

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(data); // Update state with initial data
      }
    };

    fetchData(); // Call the fetch function

    const taskListener = supabase
      .channel("public:Student")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Student" },
        (payload) => {
          setData((prevData) => [...prevData, payload.new].reverse());
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => taskListener.unsubscribe();
  }, [data]);

  const handleInsertData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Student") // Replace with your table name
      .insert([
        { name: name, age: age }, // Object representing the data to insert
      ])
      .select();
    if (error) {
      console.error(error);
    } else {
      setName(null);
      setAge(null);
      setLoading(false);
      console.log("Data inserted:", data);
      // Clear input fields or handle success message
    }
  };
  const renderItem = ({ item }: { item: data }) => (
    <>
      <Link
        href={{
          pathname: "/profile",
          params: { id: item.id, name: item.name, age: item.age },
        }}
        style={styles.link}
      >
        <View
          style={{
            flexDirection: "row",
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 10,
            borderWidth: 0.5,
            borderColor: "lime",
          }}
        >
          <ThemedText type="link" style={{ fontSize: 20 }}>
            Name :{" "}
          </ThemedText>
          <ThemedText type="link" style={{ fontSize: 20 }}>
            {item.name}{" "}
          </ThemedText>
          <ThemedText type="link" style={{ fontSize: 20 }}>
            Age{" "}
          </ThemedText>
          <ThemedText type="link" style={{ fontSize: 20 }}>
            {item.age}{" "}
          </ThemedText>
        </View>
      </Link>
    </>
  );
  return (
    <View style={{ flex: 1, padding: 10, marginTop: 50 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">List Data</ThemedText>
      </ThemedView>
      <ThemedText>This Is List Page </ThemedText>
      <View>
        <TextInput
          style={[styles.input, styles.additionalStyle]}
          placeholder="Enter name"
          placeholderTextColor="#ff7f50"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.additionalStyle]}
          placeholderTextColor="#ff7f50"
          keyboardType="numeric"
          placeholder="Enter Age"
          value={age}
          onChangeText={setAge}
        />
        <ThemedView style={styles.buttonContainer}>
          <Button
            title={loading ? "" : "Insert Data"}
            onPress={handleInsertData}
            disabled={loading}
            color="#841584"
          />
          {loading && (
            <ActivityIndicator
              size="small"
              color="#ffffff"
              style={styles.loader}
            />
          )}
        </ThemedView>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: data) => item.id.toString()}
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 20,
    width: "90%",
    textAlign: "center", // Center the text horizontally
    textAlignVertical: "center", // Center the text vertically (Android only)
    fontWeight: "bold",
  },
  additionalStyle: {
    borderRadius: 10,
    backgroundColor: "#008080",
  },
  loader: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  buttonContainer: {
    position: "relative",
    borderRadius: 25,
    overflow: "hidden",
  },
});
