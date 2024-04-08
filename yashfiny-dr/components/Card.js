import { View, StyleSheet, Dimensions } from "react-native";
const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 24,
    marginTop: deviceWidth < 380 ? 12 : 24,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4, //shadow for android
    //shadow for ios:
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
})