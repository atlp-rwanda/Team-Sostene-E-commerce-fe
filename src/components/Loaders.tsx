export const AccountsLoader = () => {
  return (
    <div data-testid="accounts-loader" className="loader">
      <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    </div>
  );
};

export const ButtonLoader = () => {
  return (
    <i
      data-testid="button-loader"
      className="fa fa-circle-o-notch fa-spin"
      style={{ color: '$yellow', transition: '.3s' }}
      aria-hidden="true"
    ></i>
  );
};
