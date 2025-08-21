import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate, sortOrder, setSortOrder }) => {
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
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => setSortOrder(itemValue)}
        >
          <Picker.Item label="Latest repo" value="latest" />
          <Picker.Item label="Highest rated" value="highest" />
          <Picker.Item label="lowes rated" value="lowest" />
        </Picker>
      }
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState("latest");

  const orderVariables = {
    latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };
  const { repositories } = useRepositories(orderVariables[sortOrder]);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  );
};

export default RepositoryList;
