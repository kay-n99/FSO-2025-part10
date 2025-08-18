import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";

const AppBarTab = ({ style, name }) => {
  return (
    <Pressable onPress={() => {}}>
      <Text style={style.title}>{name}</Text>
    </Pressable>
  );
};

export default AppBarTab;
