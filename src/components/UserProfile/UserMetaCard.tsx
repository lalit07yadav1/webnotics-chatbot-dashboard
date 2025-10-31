import { UserIcon } from "../../icons";

export default function UserMetaCard() {

  return (
    <>
      <div className="p-5 border border-gray-800 rounded-2xl lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="flex items-center justify-center w-20 h-20 overflow-hidden border border-gray-800 rounded-full">
              <UserIcon className="size-10 text-white/90" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-white/90 xl:text-left">
                User Name
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-400">
                  user@gmail.com
                </p>
                <div className="hidden h-3.5 w-px bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-400">
                  U.P, India
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </>
  );
}
