export const AccountsLoader = () => {
  return (
    <div
      data-testid="accounts-loader"
      className="w-full p-32 py-56 flex items-center justify-center text-center"
    >
      <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
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
