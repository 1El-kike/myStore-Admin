export interface TypeTabs{
  children:Option[];
  variant?: "underlined" | "solid" | "light" | "bordered" | undefined;
  onLinkChange?:(link: string) => void
}

export interface Option {
  option:string;
  component:React.JSX.Element;
  icon?:React.ReactNode;
  badge?:Badge;
  link:string;
}

interface Badge {
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  contex:number;
}