import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { LanguageContext } from "../store/LanguageContext";

const Logo = () => {
  const langCtx = useContext(LanguageContext);
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../assets/logo1.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {langCtx.locale == "en" ? (
        <Image
          source={require("../assets/brandName_en.png")}
          style={styles.brandName}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require("../assets/brandName_ar.png")}
          style={styles.brandName}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginRight: '220',
    width: 150,
    height: 60,
    flexDirection: 'column',
    justifyContent: "right",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 60,
    marginRight: 0,
  },
  brandName: {
    width: 70,
    height: 30,
  },
});

export default Logo;
