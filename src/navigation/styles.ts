import { StyleSheet } from "react-native";
import GlobalStyles from "../shared/GlobalStyles";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    ...GlobalStyles.rowView,
  },
})