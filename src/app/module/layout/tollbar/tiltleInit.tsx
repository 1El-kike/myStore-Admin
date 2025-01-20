import { Breadcrumb } from "../../widgets/breadcrumbs";
import { usePageData } from '../../core/pageTitle'

export const PageTitleInit = () => {

const { pageTitle } = usePageData()

    return (
      <>
        <div className="ml-6 mt-6 gap-6 justify-start items-center h-50">
          <h1 className=" text-2xl mb-2 font-bold text-rose-800">{pageTitle}</h1>
          <Breadcrumb />
        </div>
      </>
    );
  };
