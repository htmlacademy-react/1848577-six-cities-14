import {reviews} from '../../mocks/mocks';
import ReviewForm from '../review-form/review-form';
import {MAX_REVIEWS_COUNT} from '../../consts';
import ReviewItem from '../review-item/review-item';

function ReviewsList() {
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
      <ReviewForm />
    </section>
  );
}

export default ReviewsList;
