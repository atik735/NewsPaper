import React from 'react';
import Banner from './Banner/Banner';
import TrendingArticles from './TrendingArticles/TrendingArticles';
import UserStatistics from './UserStatistics/UserStatistics';
import Publisher from './Publisher/Publisher';
import Subscription from './SubscriptionPlan/SubscriptionPlan';
import Extra1 from './Extra1/Extra1';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TrendingArticles></TrendingArticles>
            <Subscription></Subscription>
            <Publisher></Publisher>
            <UserStatistics></UserStatistics>
            <Extra1></Extra1>
        </div>
    );
};

export default Home;