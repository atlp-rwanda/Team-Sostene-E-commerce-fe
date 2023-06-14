import NotFoundSearch from './notFoundSearch';

const reset = () => {
  console.log('clicked'); //eslint-disable-line
};
export default {
  title: 'DesignComponents/NotFoundSearch',
  component: NotFoundSearch,
};

export const Default = () => <NotFoundSearch btnText="Reset" reset={reset} />;
