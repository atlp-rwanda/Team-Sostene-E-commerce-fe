import LeftNav from './LeftNav';
import RightPart from './RightPart';

function BodyContainer() {
  return (
    <div className="p-4  mx-auto">
      <div className="flex w-[95%] mx-auto">
        <div className="w-1/4 hidden tablet:block ">
          <LeftNav />
        </div>
        <div className="w-full tablet:w-3/4">
          <RightPart />
        </div>
      </div>
    </div>
  );
}

export default BodyContainer;
