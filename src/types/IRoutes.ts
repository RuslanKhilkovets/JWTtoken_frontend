export default interface IRoutes {
    path: string;
    component: React.FC;
    children?: IRoutes[];
}
