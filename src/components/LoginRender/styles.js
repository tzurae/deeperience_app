var React = require('react-native');
var { StyleSheet } = React;
module.exports = StyleSheet.create({
    "outerView": {
        "alignSelf": "stretch",
        "flex": 1,
        "backgroundColor": "black"
    },
    "stageRow": {
        "flex": 1,
        "height": 100,
        "alignSelf": "stretch",
        "flexDirection": "row",
        "marginLeft": 15,
        "marginRight": 15
    },
    "stageRowConStyle": {
        "alignItems": "center",
        "justifyContent": "center"
    },
    "siteView": {
        "width": 75,
        "height": 75,
        "borderWidth": 2,
        "borderStyle": "solid",
        "borderColor": "orange",
        "marginLeft": 15,
        "marginRight": 15
    },
    "siteViewConStyle": {
        "alignItems": "center"
    },
    "siteViewText": {
        "fontSize": 30,
        "textAlign": "center",
        "color": "black"
    }
});