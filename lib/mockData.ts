// Mock data for dashboard charts and tables

export const deliveryChartData = [
    { month: 'Jan', deliveries: 245, optimized: 180 },
    { month: 'Feb', deliveries: 280, optimized: 220 },
    { month: 'Mar', deliveries: 310, optimized: 260 },
    { month: 'Apr', deliveries: 295, optimized: 245 },
    { month: 'May', deliveries: 340, optimized: 290 },
    { month: 'Jun', deliveries: 380, optimized: 330 },
];

export const emissionsChartData = [
    { month: 'Jan', before: 450, after: 360 },
    { month: 'Feb', before: 480, after: 370 },
    { month: 'Mar', before: 520, after: 400 },
    { month: 'Apr', before: 490, after: 380 },
    { month: 'May', before: 550, after: 420 },
    { month: 'Jun', before: 600, after: 460 },
];

export const dashboardStats = [
    {
        title: 'Active Deliveries',
        value: '124',
        change: '+12%',
        trend: 'up',
        icon: 'Package',
    },
    {
        title: 'Optimized Routes',
        value: '89',
        change: '+8%',
        trend: 'up',
        icon: 'Route',
    },
    {
        title: 'Fleet Utilization',
        value: '87%',
        change: '+15%',
        trend: 'up',
        icon: 'Truck',
    },
    {
        title: 'CO₂ Saved',
        value: '2.4T',
        change: '-18%',
        trend: 'down',
        icon: 'Leaf',
    },
];

export const recentDeliveries = [
    {
        id: 'DEL-001',
        supplier: 'ABC Suppliers',
        destination: 'Retail Store A',
        status: 'In Transit',
        eta: '2:30 PM',
        driver: 'Rajesh Kumar',
    },
    {
        id: 'DEL-002',
        supplier: 'XYZ Distributors',
        destination: 'Retail Store B',
        status: 'Delivered',
        eta: '1:15 PM',
        driver: 'Priya Sharma',
    },
    {
        id: 'DEL-003',
        supplier: 'Global Goods',
        destination: 'Warehouse C',
        status: 'In Transit',
        eta: '3:45 PM',
        driver: 'Amit Patel',
    },
    {
        id: 'DEL-004',
        supplier: 'Local Suppliers',
        destination: 'Retail Store D',
        status: 'Scheduled',
        eta: '4:00 PM',
        driver: 'Sunita Desai',
    },
    {
        id: 'DEL-005',
        supplier: 'Metro Distributors',
        destination: 'Retail Store E',
        status: 'In Transit',
        eta: '2:00 PM',
        driver: 'Vikram Singh',
    },
];
