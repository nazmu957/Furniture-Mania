import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import SingleReview from '../SingleReview/SingleReview';


const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <Category></Category>
            <SingleReview></SingleReview>
        </div>
    );
};

export default Home;