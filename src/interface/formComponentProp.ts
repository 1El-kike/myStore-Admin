export interface FormComponentPropsDescription {
    onFormDataChange: (data: { name?: string; description?: string }) => void;

  }
export interface FormComponentPropsCategory {
    onFormDataChange: (data: { category?: string; tipo?: string }) => void;
  }

 export interface FormComponentPropsInventoy {
    onFormDataChange: (data: { quantity?: number; sku?: string }) => void;
  }

 export interface FormComponentPropsSelling_Type {
    onFormDataChange: (data: { selling_type?: number | undefined}) => void;
  }
  

export interface FormComponentPropsShipping_Delivery {
    onFormDataChange: (data: { items_weight?: string; }) => void;
  }

  export interface FormComponentPropsPricing {
    onFormDataChange: (data: { items_weight?: string; }) => void;
  }

  export interface FormComponentPropsSubmit {
    onFormDataChange: any ;
  }
