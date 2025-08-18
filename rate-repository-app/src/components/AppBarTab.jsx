import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

const AppBarTab = ({ style, name }) => {
  return (
   
      <Text style={style}>{name}</Text>

  );
};

export default AppBarTab;
