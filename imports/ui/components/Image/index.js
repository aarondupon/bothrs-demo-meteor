import React from 'react'
import styled from 'styled-components';
import { LazyLoadImage,LazyLoadComponent } from 'react-lazy-load-image-component';



const RATIO = 0.6022408964;
const Image  = styled.div`
    min-width:100%;
    width:${props=>props.width}px;
    height:${props=>props.width*RATIO}px;
    background-image:url(${props=>props.source});
    background-size:cover;
    background-position: center center;
    background-color: lightgray;
    border:solid red;
    height:${props=>props.width*RATIO}px;
    
`
export default (props)=>
    (Meteor.isClient ? 
        <LazyLoadImage {...props} src={props.source} effect="blur" />
    :  <Image {...props}/>);
// const ImageC = ({ width, height, source, alt='no alt', caption='no caption' }) => (
//     <div>
//       <LazyLoadImage
//         alt={alt}
//         height={height}
//         src={source} // use normal <img> attributes as props
//         width={width} />
//       <span>{caption}</span>
//     </div>
//   );

//   export default ImageC