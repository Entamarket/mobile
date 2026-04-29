import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { searchActions } from "../../Slice/Search-Slice";
import { useState } from "react";
import SearchCard from "../../UIComponents/SearchCard/SearchCard";
import entamarketApi from "../../api/entamarketApi";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SearchBarNav() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [focus, setFocus] = useState(true);
  const [queryData, setqueryData] = useState([]);
  const searchQuery = useSelector((state) => state.searchSlice.searchQuery);

  const searchProducts = async (query) => {
    dispatch(searchActions.setSearchQuery(query));
    await entamarketApi
      .get(`/search?element=product&value=${query}`)
      .then((data) => {
        setqueryData(data.data.element);
        setFocus(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <View style={styles.searchResults}>
        <View style={styles.itemSearchBox}>
          <MaterialIcons name="search" size={23} color="grey" />
          <TextInput
            placeholder="Search items on Entamarket"
            style={styles.searchInput}
            multiline
            onChangeText={searchProducts}
            autoFocus={focus}
            value={searchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.searchBox}>
        <Text style={styles.resultsText}>Search results</Text>

        {queryData.length > 0 ? (
          queryData.map((item) => {
            return (
              <View key={item._id}>
                <SearchCard
                  searchText={item.name}
                  searchView={() =>
                    navigation.navigate("ProductView", { id: item._id })
                  }
                />
              </View>
            );
          })
        ) : (
          <View style={styles.invalidSearch}>
            <Entypo name="emoji-sad" size={30} />
            <Text> No Search Results found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchResults: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchBox: {
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  resultsText: {
    // fontWeight: "400",
    fontSize: 17,
    marginBottom: 10,
  },
  invalidSearch: {
    alignItems: "center",
    marginVertical: 15,
  },

  itemSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEE8F5",
    padding: 10,
    borderRadius: 100,
  },
  searchInput: {
    width: 300,
    marginLeft: 10,
  },
});
