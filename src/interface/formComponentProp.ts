
export interface FormComponentPropsCategory {
    onFormDataChange: (data: { category?: string; tipo?: string }) => void;
  }


  export interface FormComponentSubmit {
    isLoading:boolean;
    error:string | null;
    success:boolean;
    reset:any;
    bottom1?:string;
    bottom2:string;
  }
  


 
