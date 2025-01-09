export interface TypeTabs{
  children:Option[];
  
}
export interface Option {
  option:string;
  component:React.JSX.Element
  icon:any;
}