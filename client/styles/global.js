import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  modalContainer: {
    margin: 3,
    width: "100%",
  },
  slog: {
    /*flex: 1,*/
    paddingTop: 20,
    paddingBottom: 20,
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
  item: {
    padding: 5,
    marginTop: 5,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 20,
    marginRight: 20,
  },
  containerr: {
    flex: 1,
    padding: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  test: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
