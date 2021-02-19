export const ROUTES = {
  USER: {
    MAIN: '/users',
  },
  ANSWER: {
    MAIN: '/answers',
    GET_BY_USER_ID: '/getByUserId/:id',
  },
  QUESTION: {
    MAIN: '/questions',
  },
  CATEGORY: {
    MAIN: '/categories',
  },
  ARTICLE: {
    MAIN: '/articles',
    GET_BY_CATEGORY: '/getByCategory/:category',
    GET_BY_GENDER: '/getByGender/:gender',
    GET_BY_GENDER_AND_CATEGORY: '/getByGenderAndCategory',
  },
  ID: {
    DYNAMIC_ID: ':id',
  },
};
