import {
    Theme,
    Colors
} from "../../../settings/styles/theme";

const styles = {
    emptySection:{
        alignContent: 'center',
        alignItems:'center',
        justifyContent:'center',    
    },
    emptyIcon:{
        paddingTop:50,
        alignSelf:'center', 
        justifyContent:'center',
        color: (Platform.OS === 'ios') ? "#FAFAFA" : "#F4F4F4"
    },
};

export default styles;
