import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch(
        `http://192.168.0.43:3000/authors/1?_embed=feed`
      );

      const data = await response.json();
      setUserInfo(data);
    }
    getUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: userInfo.avatar,
          }}
        />
        <View style={styles.textHeader}>
          <Text>1400</Text>
          <Text>Prublicações</Text>
        </View>
        <View style={styles.textHeader}>
          <Text>1400</Text>
          <Text>Seguidores</Text>
        </View>
        <View style={styles.textHeader}>
          <Text>1400</Text>
          <Text>Seguindo</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.info}>sdf asdfaas sdlfka lskga lkdfs lkdfs</Text>
      </View>
      <View style={styles.buttonsContent}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={{ color: "#fff" }}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Mensagem</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20 + Constants.statusBarHeight,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  textHeader: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonsContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPrimary: {
    padding: 5,
    width: "48%",
    backgroundColor: "#3398f8",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 5,
    width: "48%",
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
