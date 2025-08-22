import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  navigate,
  sortOrder,
  setSortOrder,
  searchKeyword,
  setSearchKeyword,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search repositories"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />

          <Picker
            selectedValue={sortOrder}
            onValueChange={(itemValue) => setSortOrder(itemValue)}
          >
            <Picker.Item label="Latest repo" value="latest" />
            <Picker.Item label="Highest rated" value="highest" />
            <Picker.Item label="lowes rated" value="lowest" />
          </Picker>
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderVariables = {
    latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };
  const { repositories, fetchMore } = useRepositories({
    
    ...orderVariables[sortOrder],
    searchKeyword: debouncedSearchKeyword,
    first: 5,
  });
  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
