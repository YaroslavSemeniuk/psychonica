export const ROUTES = {
  USER: {
    MAIN: '/users',
    GET_ALL: '',
    GET_BY_ID: '/getById',
  },
  ANSWER: {
    MAIN: '/answers',
    GET_BY_ID: '/getById',
    GET_BY_QUESTION_ID: '/getByQuestionId',
    GET_BY_USER_ID: '/getByUserId',
  },
  QUESTION: {
    MAIN: '/questions',
    GET_ALL: '',
    GET_BY_ID: '/getById',
  },
  CATEGORY: {
    MAIN: '/categories',
    GET_ALL: '',
    GET_BY_ID: '/getById',
  },
  ARTICLE: {
    MAIN: '/articles',
    GET_ALL: '',
    GET_BY_CATEGORIES: '/getByCategories',
    GET_BY_ID: '/getById',
    GET_BY_USER_ID: '/getByUserId',
    GET_BY_GENDER: '/getByGender',
    GET_BY_GENDER_AND_CATEGORIES: '/getByGenderAndCategories',
  },
  PARSER: {
    MAIN: '/parser',
    GET_DATA_FROM_TABLE: '/get_data_from_table',
    SAVE_TABLE_DATA_TO_DB: '/save_table_data_to_database',
  },
};
