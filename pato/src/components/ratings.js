import React from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import "../Pages/Home/index.scss"

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#d61c22',
  },
  '& .MuiRating-iconHover': {
    color: '#d61c22',
  },
});
const Ratings=(props)=>{
  const [value, setValue] = React.useState(0);
  
  return (
    <Box
    className="ratings_"
    sx={{
      '& > legend': { mt:3,mb:2,fontSize:"18px" },
    }}
  >
    <Typography className="rate_" component="legend">Rate</Typography>
    <StyledRating
      name="customized-color"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.func(newValue);
      }}
    />
  </Box>
  )
}

export default Ratings;
