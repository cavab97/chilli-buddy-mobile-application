import { StyleSheet, Platform } from 'react-native';

import { Colors } from "../../../settings/styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    subContainer1: {
        flex: 1, 
        minHeight: Platform.OS === 'ios' && Platform.isPad === true ? 700 : 250,
        maxHeight: Platform.OS === 'ios' && Platform.isPad === true ? 700 : 250,
    },
    subContainer2: {
        alignItems: "center",
        flex: 1,
    },
    subContainer3: {
        flex: 1,
        marginBottom: 10,
    },
    subContainer4: {
        flex: 1,
    },
//--top--------------------------------------------
    actionDotStyle: {
        backgroundColor: '#ffffff',
        width: 6,
        height: 6,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7
    },
    dotStyle:{
        backgroundColor: '#999999',
        width: 6,
        height: 6,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7
    },
    paginationStyle:{
        bottom: 20
    },
    imageTopStyle:{
        width: '100%', 
        height: "100%"
    },
//--join now-------------------------------------------- 
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: "5%",
        //marginLeft: 20,
        fontFamily: "RobotoBold",
        color: Colors.PRIMARY,
    },
    cardSection: {
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        borderRadius: 19,
        width:"100%", 
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 13,
        fontFamily: "RobotoRegular"
    },
    cardContent: {
        color: '#737373',
        fontSize: 11,
        marginLeft: 10,
        fontFamily: "RobotoBold"
        //marginBottom: 3,
    },
    firstCardStyle: {
        width: 332, 
        borderRadius: 20,
        marginRight: 20,
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: {	width: 0, height: 0,},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: 5
    },
    cardStyle: {
        width: 332, 
        borderRadius: 20,
        //marginRight: 20,
        marginLeft: 0,
        shadowColor: "#000",
        shadowOffset: {	width: 0, height: 0,},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: 5,
    },
    imageMap: {
        margin: 11,
        width: 131,
        height: 121,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    cardHolder: {
        flexDirection: 'row', 
        backgroundColor: '#FAFAFA', 
        marginTop: 0,
    },
    textHolderStyle: {
        flex: 1, 
        padding: 11,
        paddingLeft: 0,
        paddingTop: 16,
    },
    iconStyle:{
        marginTop: 0,
        marginRight: -5,
        alignItems: 'flex-end',
        height: 0,
    },
    //-----------your challenge----------------------------------
    imageMap2: {
        /* width: 363.2,
        height: 131.2, */
        resizeMode: "cover",
        borderTopLeftRadius: 19,
        borderTopRightRadius: 19,
    },
    cardSection2: {
        margin: 0,
        padding: 0,
        flexDirection: 'column',
        borderRadius: 19,
        overflow: "hidden"
    },
    cardTitle2: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "RobotoRegular",
    },
    textHolderStyle2: { 
        flex: 1, 
        //padding: 64,
        alignItems: "center", 
        alignContent: "center",
        justifyContent: "center",
        //backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderTopLeftRadius: 19,
        borderTopRightRadius: 19,
    },
    imageBackgroundStyle: {
        resizeMode: "cover",
        height: 90.2,
    },
    bottomTextStyle:{
        textAlign: "center",
        fontFamily: "RobotoBold",
        color: '#ffffff',
        backgroundColor: Colors.PRIMARY,
        fontSize: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: "hidden"
    },
    routeType:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "RobotoRegular",
    },
    //----latest news------------------------------------------------------
    newsTitleTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
        marginBottom: 7,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        height: 55,
    },
    newsImage: {
        width: 179.2, 
        height: 121.2, 
        borderTopLeftRadius: 12,  
        borderTopRightRadius: 12,
    },
    firstNewsCardStyle: {
        width: 181.2, 
        marginLeft: 20,
        marginRight: 20,
        elevation: 3, 
        borderRadius: 10, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginBottom: 6,
    },
    newsCardStyle: {
        width: 181.2, 
        marginRight: 20,
        elevation: 3, 
        borderRadius: 10, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginBottom: 6,
    },
    newsNoImage: {
        width: 179.2, 
        height: 121.2, 
        borderTopLeftRadius: 12,  
        borderTopRightRadius: 12,
        resizeMode: "center"
    },
    infoContainer:{
        width: "100%",
        height: "20%",
        position: "absolute",
        left: 0,
        zIndex: 10,
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
        borderStyle : 'solid',
        backgroundColor: "#fff0cc",
        paddingVertical: 30,
    },
    infoTitle:{
        fontSize: 18,
        color: Colors.PRIMARY,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    infoSubtitle:{
        fontSize: 16,
        color: Colors.PRIMARY,
        textAlign:"justify"
    },
});

export default styles;