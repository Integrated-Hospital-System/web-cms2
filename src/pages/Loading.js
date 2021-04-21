import { CircularProgress } from '@material-ui/core';

export default function Loading () {
  
  return (
    <div style = {{
      width : "100%",
      height : "100",
      display : "flex",
      justifyContent : "center",
      alignItems : "center",
      marginTop : "270px"
    }}>
      <CircularProgress color="#1de9b6"  />
    </div>
  )
  
}