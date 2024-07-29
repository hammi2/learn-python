import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Keyboard,
} from "react-native";
import { Searchbar } from "react-native-paper";
import CourceCard from "../../components/CourceCard";
import LibrariesCard from "../../components/librariesCard";
import { database } from "../../../Fire";
import { ref, get } from "firebase/database";
import { AntDesign } from "@expo/vector-icons"; // استيراد أيقونة البحث من مكتبة Expo Icons
import _ from "lodash";

const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courceData, setCourceData] = useState([]);
  const [librariesData, setLibrariesData] = useState([]);
  const [filteredCourceData, setFilteredCourceData] = useState([]);
  const [filteredLibrariesData, setFilteredLibrariesData] = useState([]);
  const debouncedSearch = useRef(
    _.debounce((query) => handleSearch(query), 300)
  ).current;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const courceDataRef = ref(database, "cources");
      const courceSnapshot = await get(courceDataRef);
      if (courceSnapshot.exists()) {
        const data = courceSnapshot.val();
        setCourceData(data);
        setFilteredCourceData(data);
      }

      const librariesDataRef = ref(database, "libraries");
      const librariesSnapshot = await get(librariesDataRef);
      if (librariesSnapshot.exists()) {
        const data = librariesSnapshot.val();
        setLibrariesData(data);
        setFilteredLibrariesData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredCources = Object.values(courceData).filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredLibraries = Object.values(librariesData).filter(
      (item) =>
        item.lib.toLowerCase().includes(lowerCaseQuery) ||
        item.des.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCourceData(filteredCources);
    setFilteredLibrariesData(filteredLibraries);
    //Keyboard.emit() // إخفاء لوحة المفاتيح بعد البحث
  };

  const renderHeader = () => (
    <View>
      <Image
        source={{
          uri: "https://img-c.udemycdn.com/course/750x422/5612850_d997_3.jpg",
        }}
        style={styles.image}
      />
     
      <Text style={styles.text}>Basic :</Text>
      <FlatList
        data={filteredCourceData}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <CourceCard
              id={item.id}
              title={item.title}
              url={item.url}
              description={item.description}
              videoUrl={item.videoUrl}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalFlatListContentContainer}
        keyboardShouldPersistTaps="handled" // تجنب إخفاء لوحة المفاتيح عند النقر على العناصر
      />
      <Text style={styles.text}>Libraries :</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={filteredLibrariesData}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <LibrariesCard
            url={item.url}
            lib={item.lib}
            des={item.des}
            videoUrl={item.videoUrl}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContentContainer}
      keyboardShouldPersistTaps="handled" // تجنب إخفاء لوحة المفاتيح عند النقر على العناصر
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#06024a",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#06024a",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#06024a",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#FFFFFF",
    backgroundColor: "#06024a",
    margin: 10,
  },
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: "#06024a",
  },
  horizontalFlatListContentContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#06024a",
  },
  flatListContentContainer: {
    paddingBottom: 16,
    backgroundColor: "#06024a",
  },
});

export default CoursePage;
