import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Products from '../Products/Products';
import SingleReview from '../SingleReview/SingleReview';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const products = useLoaderData();
    return (
        <div className="">
            <Banner></Banner>
            <Category></Category>
            <Products products={products} ></Products>
            <SingleReview></SingleReview>
        </div>
    );
};

export default Home;