interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'chartist', src: 'assets/charts/chartist-bundle/chartist.min.js'},
    {name: 'sparkline', src: 'assets/charts/sparkline/jquery.sparkline.js'},
    {name: 'raphael', src: 'assets/charts/morris-bundle/raphael.min.js'},
    {name: 'morris', src: 'assets/charts/morris-bundle/morris.js'},
    {name: 'c3', src: 'assets/charts/c3charts/c3.min.js'},
    {name: 'd3', src: 'assets/charts/c3charts/d3-5.4.0.min.js'},
    {name: 'C3chartjs', src: 'assets/charts/c3charts/C3chartjs.js'},
    {name: 'e-commerce', src: 'assets/dashboard-ecommerce.js'},
    {name: 'finance', src: 'assets/dashboard-finance.js'},
    {name: 'influencer', src: 'assets/dashboard-influencer.js'},
    {name: 'sales', src: 'assets/dashboard-sales.js'},
];