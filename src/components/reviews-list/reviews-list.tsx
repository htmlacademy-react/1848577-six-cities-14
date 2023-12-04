import { PropsWithChildren } from 'react';
import {MAX_REVIEWS_COUNT} from '../../consts';
import ReviewItem from '../review-item/review-item';
import { Review, State } from '../../types/types';
import { useAppSelector } from '../../hooks';

function ReviewsList({children}: PropsWithChildren): JSX.Element {
  const reviews = useAppSelector((state: State): Review[] => state.reviews);

  const reviewsToRender = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      {children}
    </section>
  );
}

export default ReviewsList;
