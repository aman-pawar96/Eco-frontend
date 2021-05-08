import {createStyles} from '@material-ui/core/styles';
import BackImg from "../../images/sun.jpg";

export const useStyle =  function(theme){

    const {spacing,breakpoints}     =   theme;
    return createStyles({
        main:{
            backgroundImage:`url(${BackImg})` ,
            // backgroundColor:"red",
            minHeight: "100vh",
            alignItems:"center",
            justifyContent:"center",
            display:"flex",
            backgroundColor: "#273c5b",
            backgroundSize: "100% 100%",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundBlendMode:"luminosity",
        },
        paper:{
            width:"100%",
            maxWidth:"350px",
            textAlign:"center",
            margin:"auto",
            backgroundColor: "rgba(0,0,0,.2)",
            borderRadius:"2px",
            boxShadow:"0 1px 5px rgb(0 0 0 / 10%)",
            filter: "drop-shadow(2px 4px 6px black)"

        },
        loginHeader:{
            padding: "1.25rem",
            position: "relative",
            borderRadius:" 2px 2px 0 0",
            backgroundColor: "rgba(0,0,0,.2)",
        },
        logo:{
            position: "absolute",
            marginTop: "-60px",
            marginLeft: "23px",
        },
        typo:{
            color:"rgba(255,255,255,.85)",
        },
        button:{
            backgroundColor: "rgba(255,255,255,.125)",
            color: "#fff",
            width: "100%",
            cursor:"pointer",
            border:"none",
            padding: "5px 0px",
            marginTop:"5px"

        },
        icon:{
            color:"rgba(255,255,255,.85)",
            /* font-weight: 400; */
            fontSize: "3rem"
        },
        loginBody:{
            padding: "2rem",
            backgroundColor: "rgba(0,0,0,.2)",

        },
        input:{
            textAlign: "center",
            background: "transparent",
            backgroundClip: "padding-box",
            width: "100%",
            border: "1px solid rgba(255,255,255,.2)",
            display: "block",
            height: "calc(1.5em + 1.2rem + 2px)",
            padding: ".6rem 1rem",
            fontSize: "1rem",
            fontWeight: "400",
            transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out",
            lineHeight: "1.5",
            color: "rgba(255,255,255,.85)",
            boxSizing: "border-box",
            marginBottom: "2rem"
        },
        inputBase:{
            width:"100%"
        },
        subButton:{
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            padding: "0",
            fontSize: "1.5rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,.125)",
            color: "#fff",
            border:"none",
            cursor:"pointer"
        },
        alert:{
            backgroundColor:"#c22f3d",
            color:"#f8d7da",
            padding:"6px",
            marginBottom:"1rem",
            textAlign:"center"
        },
        alertSuccess:{
            backgroundColor:"rgb(28 130 28)",
            color:"#f8d7da",
            padding:"6px",
            marginBottom:"1rem",
            textAlign:"center"
        },
        lockIcon:{
            position: "absolute",
            marginTop: "-30px",
            fontSize: "24px",
            right: "4px",
            color:"#d26a6a"
        }

    })
}