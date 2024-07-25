import { StyleSheet } from "react-native";
import Config from "./Config";

const GlobalStyles = StyleSheet.create({
    appHeaderStyle: {
        // backgroundColor: "#7ED0D0",
        backgroundColor: Config.appPrimaryColor,
    },
    tabViewStyle: {
        // backgroundColor: '#E7827A'
        backgroundColor: Config.appPrimaryColor,
    },
    tabViewIndicatorStyle: {
        backgroundColor: "#e2ed35",
        // backgroundColor: Constants.appThirdColor,
    },
    leftRightParentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    rightContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    rowCenter: {
        flexDirection: "row",
        justifyContent: "center",
    },
    rowSpaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowSpaceAround: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    rowFlexStart: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    rowFlexEnd: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    textBold: {
        fontWeight: "bold",
    },
    formGroupContainer: {
        marginBottom: 2,
        padding: 3,
    },
    formGroupLabel: {
        marginBottom: 3,
    },
    requiredAsterisk: {
        color: "red",
    },
    borderBottom: {
        borderBottomColor: '#D2D7D7',
        borderBottomWidth: 1
    },
    textInputContainer: {
        flexDirection: "row",
        // backgroundColor: '#e8e8e8',
        borderColor: Config.appSecondaryColor,
        // height: 60,
        borderWidth: 1,
        width: "100%",
        padding: 10,
        borderRadius: 5,
        color: "black",
    },
    textInput: {
        flex: 1,
        marginLeft: 5,
    },
    mt5: {
        marginTop: 5
    },
    mb5: {
        marginBottom: 5
    },
    mr5: {
        marginRight: 5
    },
    ml5: {
        marginLeft: 5
    },
    m5: {
        margin: 5
    },
    mt10: {
        marginTop: 10
    },
    mb10: {
        marginBottom: 10
    },
    mr10: {
        marginRight: 10
    },
    ml10: {
        marginLeft: 10
    },
    m10: {
        margin: 10
    },
    pt5: {
        paddingTop: 5
    },
    pb5: {
        paddingBottom: 5
    },
    pl5: {
        paddingLeft: 5
    },
    pr5: {
        paddingRight: 5
    },
    p5: {
        padding: 5
    },
    pt10: {
        paddingTop: 10
    },
    pb10: {
        paddingBottom: 10
    },
    pl10: {
        paddingLeft: 10
    },
    pr10: {
        paddingRight: 10
    },
    p10: {
        padding: 10
    },
    showBorder: {
        borderWidth: 1,
        borderColor: "#D2D7D7",
      },
    table: {
        borderWidth: 1,
        //borderColor: '#e06666',
        flexDirection: 'column', // Arrange rows vertically
        borderRadius: 5, // Curved corners
        overflow: 'hidden', // Clip the content within the rounded corners
        marginVertical: 5
      },
      row: {
        flexDirection: 'row', // Arrange cells horizontally
      },
      
      cell_start: {
        flex: 1,
        //borderWidth: 0.5,
        //borderColor: '#e06666',
        paddingVertical: 2,
        paddingHorizontal: 3      ,
        alignItems: 'flex-start',
      },
      rowView: {
        flexDirection: 'row',
        alignItems: 'center',
      },
});

export default GlobalStyles;
