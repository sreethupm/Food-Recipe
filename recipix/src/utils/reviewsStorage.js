const KEY = 'recipix_reviews';

export const getReviews = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveReviews = (reviews) => {
  localStorage.setItem(KEY, JSON.stringify(reviews));
};
