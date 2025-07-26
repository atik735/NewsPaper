import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ArticleDetails = () => {
  const article = useLoaderData();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.patch(`/articles/${id}/views`)
      .then(res => console.log("View updated", res.data))
      .catch(err => console.error("Error updating view", err));
  }, [id, axiosSecure]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={article.image} alt={article.title} className="w-full rounded-lg" />
      <h1 className="text-3xl font-bold my-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-4">Publisher: {article.publisher}</p>
      <p className="mt-6 text-lg leading-relaxed">{article.longDescription}</p>
      <p className="mt-4 text-gray-600 text-sm">Views: {article.views || 0}</p>
    </div>
  );
};

export default ArticleDetails;
