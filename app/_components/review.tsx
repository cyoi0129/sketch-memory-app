'use client';
import { FC, useEffect, useState } from 'react';
import { getReviewByItem } from '../_services/graphql';
import { IoHeart, IoPerson, IoListCircle } from 'react-icons/io5';
import { Form } from '@/app/_components';
import '../_styles/review.scss';

const Review: FC<ReviewProps> = (props) => {
  const { id } = props;
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const getReviewList = async () => {
    const result = await getReviewByItem(id);
    setReviews(result.data.itemReviews);
  };

  const addReview = (new_review: ReviewItem) => {
    setReviews([...reviews, new_review]);
  };

  useEffect(() => {
    getReviewList();
  }, [id]);

  return (
    <section>
      <div className="reviews">
        <h2>
          <IoListCircle />
          この作品のレビュー一覧
        </h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h3>
                  <IoPerson />
                  {review.reviewer}
                </h3>
                <div className="score">
                  {[...Array(review.score)].map((_, i) => (
                    <IoHeart key={i} />
                  ))}
                </div>
                <div className="comment">{review.comment}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>まだレビューがありません</p>
        )}
      </div>
      <Form action={addReview} id={id} />
    </section>
  );
};

export default Review;
