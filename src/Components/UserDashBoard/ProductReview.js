import useFetch from "../../Hooks/usefetch";

const ProductReview = ({ ProductId }) => {
  const { data, setData } = useFetch(
    `http://localhost:3000/products/${ProductId}`
  );
  const reviews = data.reviews;
  console.log(reviews);

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight mt-6 text-gray-900">
          Product Reviews
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Verified feedback from real customers
        </p>
      </div>

      <div className="space-y-4">
        {reviews?.map((review, index) => {
          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 w-4/6 ml-2 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{review.userName}</p>
                <p className="text-sm font-semibold text-yellow-500">
                  ⭐ {review.rating}
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {review.reviewMessage}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ProductReview;
