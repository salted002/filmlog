export default function StarRating({
  rating,
  onChange,
}: {
  rating: number
  onChange: (value: number) => void
}) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          className="star-btn"
          onClick={() => onChange(star)}
        >
          {star <= rating ? '★' : '☆'}
        </button>
      ))}
    </div>
  )
}
