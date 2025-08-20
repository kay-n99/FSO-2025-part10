import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { useQuery, useApolloClient } from "@apollo/client";
import { ME } from "../graphql/queries";
import AuthStorage from "../utils/authStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#292929",
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    margin: 20,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={Pressable}>
          <AppBarTab style={styles.title} name={"Repository"} />
        </Link>

        {data?.me ? (
          <Link onPress={handleSignOut} component={Pressable}>
            <AppBarTab style={styles.title} name={"Sign Out"} />
          </Link>
        ) : (
          <Link to="/signin" component={Pressable}>
            <AppBarTab style={styles.title} name={"Sign In"} />
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
