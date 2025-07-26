import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router"; // ✅ ঠিক করা হয়েছে

const TrendingArticles = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/articles/trending`)
      .then((res) => setTrending(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-10 px-4">
      <h1 className="text-2xl font-bold mb-5 text-center text-primary">🔥 Trending Articles</h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[FreeMode, Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        {trending.map((article) => (
          <SwiperSlide key={article._id}>
            <div className="card shadow-lg w-full border-gray-300 border bg-white rounded-xl overflow-hidden">
              <figure className="w-full h-60">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-lg font-bold text-gray-800">{article.title}</h2>
                <p className="text-sm text-gray-500">Publisher: {article.publisher}</p>
                <p className="text-sm text-gray-400">Views: {article.views}</p>
                <div className="mt-3">
                  <Link to={`/articles/${article._id}`} className="btn btn-sm btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticles;
