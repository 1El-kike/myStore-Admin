export interface TypeTabs{
  children:Option[];
  variant?: "underlined" | "solid" | "light" | "bordered" | undefined;
}

export interface Option {
  option:string;
  component:React.JSX.Element
  icon:any;
  badge?:Badge
}

interface Badge {
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  contex:number;
}