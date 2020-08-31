import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LazyImage from "../../components/LazyImage";

import { Post, Header, Avatar, Name, Description, Loading } from "./styles";

export default function Feed() {
  const navigation = useNavigation();
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shuldRefresh = false) {
    if (total && pageNumber > total) return;
    setLoading(true);

    const response = await fetch(
      `http://192.168.0.43:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`
    );

    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");

    setTotal(Math.floor(totalItems / 5));
    setFeed(shuldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  function handleNavigationUserInfo(idUser) {
    navigation.navigate("Userinfo", { idUser });
  }

  return (
    <View>
      <FlatList
        data={feed}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        keyExtractor={(post) => String(post.id)}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <TouchableHighlight
              onPress={() => handleNavigationUserInfo(item.author.id)}
            >
              <Header>
                <Avatar source={{ uri: item.author.avatar }} />
                <Name>{item.author.name}</Name>
              </Header>
            </TouchableHighlight>

            <LazyImage
              aspectRatio={item.aspectRatio}
              smallSource={{ uri: item.small }}
              source={{ uri: item.image }}
            />

            <Description>
              <Name>{item.author.name}</Name> {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
