import { Loading } from "@jiaminghi/data-view-react";

const MyLoading = () => (
  <div className="w-screen h-screen flex items-center justify-center">
    <Loading>
      <span className="font-custom text-[1.4rem] text-white">
        loading....(请尝试刷新)
      </span>
    </Loading>
  </div>
);

export default MyLoading;
