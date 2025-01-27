import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const partialFill = rating % 1;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              size={20}
              className="text-yellow-400 fill-yellow-400"
            />
          );
        } else if (index === fullStars && partialFill > 0) {
          return (
            <div key={index} className="relative">
              <Star size={20} className="text-gray-200" />
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${partialFill * 100}%` }}
              >
                <Star
                  size={20}
                  className="text-yellow-400 fill-yellow-400"
                />
              </div>
            </div>
          );
        } else {
          // Empty star
          return (
            <Star
              key={index}
              size={20}
              className="text-gray-200"
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;