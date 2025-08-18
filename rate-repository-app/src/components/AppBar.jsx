import { View, StyleSheet, Pressable,Text } from 'react-native';
import { Link } from 'react-router-native';
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
            <Link to="/" component={Pressable}>
                <AppBarTab style={styles.title} name={"Repository"}/>
            </Link>
            <Link to="/signin" component={Pressable}>
                <AppBarTab style={styles.title} name={"Sign In"}/>
            </Link>
        </View>
    ) 
};

export default AppBar;