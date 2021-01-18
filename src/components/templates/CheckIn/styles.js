const numColumns = 7;
const size = Dimensions.get("window").width / numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightblue",
  },
});

export default styles;
