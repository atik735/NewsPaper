import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ArticleDetails = () => {
  const { id } = useParams();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["articleDetails", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1>Loading...........</h1>
      </div>
    );
  }

  if (isError || !article) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Could not load article!'
    });
    return <div className="text-center text-red-500">Article not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-xl mb-4" />

      <div className="flex justify-between items-center text-gray-600 mb-4">
        <p><strong>Publisher:</strong> {article.publisher}</p>
        <p><strong>Views:</strong> {article.views}</p>
      </div>

      <div className="text-lg text-gray-800 leading-relaxed">
        {article.description}
      </div>
    </div>
  );
};

export default ArticleDetails;
