import React from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { FlatList, View, Text } from "react-native";
import ReviewActions from "./ReviewActions";

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ddd" }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.repository.fullName}</Text>
          <Text>Rating: {item.rating}</Text>
          <Text>{item.text}</Text>
          <Text style={{ color: "gray" }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <ReviewActions
            reviewId={item.id}
            repoId={item.repository.id}
            refetch={refetch}
          />
        </View>
      )}
    />
  );
};

export default MyReviews;
