import { View, StyleSheet, Pressable,Text } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#292929",
        height: 50,
        justifyContent: "center",
        flexDirection: 'row',
        
    },
    title: {
        color: "white",
        fontWeight: 'bold',
        margin: 20,
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab style={styles} name={"Repository"}/>
            <AppBarTab style={styles} name={"job"}/>
            
        </View>
    ) 
};

export default AppBar;