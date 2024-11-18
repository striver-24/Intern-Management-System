import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

const ModalWrapper = ({
  open,
  setOpen,
  children,
  title,
  closeButtonLabel = "Close",
  className,
  overlayClassName,
  containerClassName,
  panelClassName,
  closeButtonClassName,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 w-full ${className}`}
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-black bg-opacity-60 transition-opacity ${overlayClassName}`}
          />
        </Transition.Child>

        <div
          className={`fixed inset-0 z-10 w-screen overflow-y-auto ${containerClassName}`}
        >
          <div
            className={`flex h-full items-center justify-center p-4 text-center sm:p-0 ${containerClassName}`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-full sm:max-w-lg ${panelClassName}`}
              >
                <div className={`bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                      {title && (
                        <h2 className="text-lg font-medium leading-6 text-gray-900">
                          {title}
                        </h2>
                      )}
                      {children}
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-3 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${closeButtonClassName}`}
                      ref={cancelButtonRef}
                      onClick={() => setOpen(false)}
                    >
                      {closeButtonLabel}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;