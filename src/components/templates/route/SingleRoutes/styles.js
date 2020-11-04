import { Colors } from "../../../../settings/styles/theme";
import { Platform, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        marginTop: 10,
        marginHorizontal: 15,
        paddingVertical: 5
    },
    rowText: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    rowOne: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    title: {
        fontWeight: 'bold', 
        fontFamily: "RobotoRegular",
        fontSize: 18,
    },
    titleValue: {
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
        color: Colors.PRIMARY,
        fontSize: 18,
    },
    line: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_LIGHTER,
        width: '100%'
    },
    rowTwo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10
    },
    subContainer: {
        flexDirection: 'row',
    },
    icon: {
        paddingTop: 5,
        paddingRight: 5
    },
    imageContainer: {
        flex: 1,
        height: 200,
        paddingTop: 5,
    },
    image: {
        flex: 1,
        borderRadius: 5,
        width: null
        //resizeMode: "cover", 
        //width: "100%", 
        //height: null
    },
    imageSubtitle: {
        fontWeight: 'bold', 
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 5
    },
    imageSubtitle2: {
        fontSize: 16,
        padding: 5
    },
    iconSubtitleContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 5,
        paddingBottom: 5
    },
    iconSubtitle: {
        textTransform: 'uppercase',
        fontFamily: "RobotoRegular",
        fontWeight: 'bold',
        color: '#f18a22',
        fontSize: 16,
        paddingLeft: 5,
    },
    mapTitle: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 15
    },
    map: {
        width: '100%', 
        height: Platform.OS === 'ios' ? 0.5 * height : 0.5 * height,
        paddingTop: 8
    },
    mapBanner: {
        width: '100%', 
        height: Platform.OS === 'ios' ? 0.5 * height/4 : 0.5 * height/4,
        paddingTop: 8,
        opacity: 0.5,
    },
    unlockButton: {
        marginTop: 60,
        //flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    shareButton: {
        backgroundColor: "#4267B2",
        marginBottom: 10,
        justifyContent:'center',
        alignSelf: 'center',
        paddingHorizontal: 20
    },
    inviteButton: {
        backgroundColor: Colors.PRIMARY,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20
    },
    titleButton: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    shareButtonContainer: {
        paddingTop: 10,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    missionRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15
    },
    missionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
        textTransform: 'uppercase',
        maxWidth: 330
    },
    completedMissionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "RobotoRegular",
        textTransform: 'uppercase',
        maxWidth: 330,
        color: Colors.GRAY_DARK
    },
    missionCurrencyTitle: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontSize: 18,
        fontWeight: 'bold',
    },
    completedMissionRow: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: Colors.GRAY_LIGHT_MEDIUM,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.GRAY_LIGHT_MEDIUM
    },
    completedMissionCurrencyTitle: {
        color: Colors.GRAY_DARK,
        fontFamily: "RobotoRegular",
        fontSize: 18,
        fontWeight: 'bold',
    },
    missionSubtitle: {
        fontSize: 12,
        fontFamily: "RobotoRegular",
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    completedMissionSubtitle: {
        fontSize: 12,
        fontFamily: "RobotoRegular",
        textTransform: 'capitalize',
        textAlign: 'center',
        color: Colors.GRAY_DARK
    },
    completedStamp: {
        width: 70,
        height: 50,
        position: 'absolute',
        right: 20,
        zIndex: 5
    },
    missionImage: {
        width: 60, 
        height: 60,
    },
    missionImageFrame: {
        flex: 1,
        width: null,
        borderRadius: 60,
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shopContainer: {
        height: "100%",
    },
    missionImageContainer: {
        paddingHorizontal: 10
    },
    missionLine: {
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY_LIGHTER,
        width: '100%',
        justifyContent: 'center'
    },
    missionTitleContainer: {
        flex: 1
    },
    modalContainer: {
        padding: 25,
        flex: 1,
        position: 'absolute',
        width: "100%",
        borderTopLeftRadius: 35, 
        borderTopRightRadius: 35, 
        bottom: 0
    },
    missionContainer: {
        flex: 1,
        width: "100%"
    },
    overlaySubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontFamily: "RobotoRegular",
    },
    overlaySubtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10
    },
    overlaySelfieSubtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10
    },
    overlayCurrencyTitle: {
        color: Colors.PRIMARY,
        fontFamily: "RobotoRegular",
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    overlayTitleContainer: {
        paddingBottom: 10
    },
    overlayDescription: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    overlayTextRow: {
        fontSize: 14,
        fontFamily: "RobotoRegular",
        textTransform: 'capitalize',
        paddingLeft: 10
    },
    overlayTitle: {
        paddingTop: 20,
        fontSize: 16,
        fontFamily: "RobotoRegular",
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    overlayDescriptionContent: {
        fontFamily: "RobotoRegular",
        paddingTop: 10,
        fontSize: 14,
    },
    overlayButtonContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButton: {
        backgroundColor: Colors.PRIMARY,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? 15 : 15,
        paddingVertical: Platform.OS === 'ios' ? 20 : 18,
        borderRadius: 40,
    },
    iconPayButton: {
        backgroundColor: Colors.PRIMARY,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
        paddingVertical: Platform.OS === 'ios' ? 17 : 18,
        borderRadius: 30,
    },
    disabledIconPayButton: {
        backgroundColor: Colors.GRAY_LIGHTER,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal: Platform.OS === 'ios' ? 20 : 20,
        paddingVertical: Platform.OS === 'ios' ? 17 : 18,
        borderRadius: 30,
    },
    overlayButtonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    overlaySingleButtonContainer: {
        marginHorizontal: 30
    },
    iconButtonContainer: {
        borderRadius: 30,
        borderColor: Colors.PRIMARY,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    overlayImage: {
        width: '100%', 
        height: 150,
        paddingTop: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 30
    },
    pendingBackground: {
        flex: 1,
        marginTop: -8,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 5
    },
    pendingView: {
        marginTop: 60,
        marginBottom: 70,
        alignItems: "center"
    },
    pendingText: {
        fontWeight: 'bold', 
        fontFamily: "RobotoRegular",
        fontSize: 20,
        color: Colors.PRIMARY,
    },
    messageText: { 
        fontSize: 16,
        fontFamily: "RobotoRegular",
        color: 'white',
        paddingTop: 20,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    subjectText: { 
        fontSize: 20,
        fontFamily: "RobotoRegular",
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 20,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        borderRadius: 5
    },
    infoContainer:{
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
        backgroundColor: "#fff0cc",
        borderStyle : 'dashed',
        paddingHorizontal: 20,
        paddingVertical:5
    },
    infoTitle:{
        fontSize: 16,
        color: Colors.PRIMARY,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    infoSubtitle:{
        fontSize: 14,
        color: Colors.PRIMARY,
        textAlign:"justify"
    },
};

export default styles;