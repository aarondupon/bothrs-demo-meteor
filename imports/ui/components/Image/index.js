import React from 'react'
import styled from 'styled-components';
import { LazyLoadImage,LazyLoadComponent } from 'react-lazy-load-image-component';



const RATIO = 0.6022408964;
const Image  = styled(LazyLoadImage)`
    min-width:100%;
    /* width:100%; */
    margin-left: 50%;
    transform: translate(-50%, 0);
    width:${props=>props.width}px;
    min-height:${props=>props.width*RATIO}px;
    background-size:cover;
    background-position: center center;
    background-color: lightgray;    
`
export default ((props)=>
    <Image  {...props}
        width={'auto'}
        height={props.width*RATIO}
        // visibleByDefault={!Meteor.isClient} 
        // visibleByDefault={true}
        src={props.source} 
        effect="blur" 
/>);
