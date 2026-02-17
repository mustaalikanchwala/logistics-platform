// Theme colors
export const COLORS = {
  primaryDark: '#0C2B4E',
  secondaryDark: '#1A3D64',
  accentTeal: '#1D546C',
  lightBg: '#F4F4F4',
  white: '#FFFFFF',
};

// Navigation links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/stakeholders', label: 'Stakeholders' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contact', label: 'Contact' },
];

// Problem cards data
export const PROBLEMS = [
  {
    title: 'Fragmented Operations',
    description: 'Multiple suppliers and transporters operate independently without coordination.',
    icon: 'AlertCircle',
  },
  {
    title: 'Duplicated Trips',
    description: 'Same routes traveled multiple times by different vehicles, wasting resources.',
    icon: 'Repeat',
  },
  {
    title: 'Traffic Congestion',
    description: 'Uncoordinated deliveries contribute to urban traffic and delays.',
    icon: 'Traffic',
  },
  {
    title: 'High Emissions',
    description: 'Inefficient logistics lead to increased fuel consumption and carbon footprint.',
    icon: 'CloudOff',
  },
];

// Solution features
export const SOLUTIONS = [
  {
    title: 'Shared Scheduling',
    description: 'Coordinate delivery times across stakeholders',
    icon: 'Calendar',
  },
  {
    title: 'Route Optimization',
    description: 'AI-powered route planning for efficiency',
    icon: 'Route',
  },
  {
    title: 'Load Sharing',
    description: 'Maximize vehicle capacity utilization',
    icon: 'Package',
  },
  {
    title: 'Real-Time Tracking',
    description: 'GPS monitoring of all deliveries',
    icon: 'MapPin',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data-driven insights and reporting',
    icon: 'BarChart3',
  },
  {
    title: 'Emission Monitoring',
    description: 'Track and reduce carbon footprint',
    icon: 'Leaf',
  },
];

// Impact metrics
export const IMPACT_METRICS = [
  { value: 30, label: 'Reduced Trips', suffix: '%' },
  { value: 25, label: 'Lower Fuel Cost', suffix: '%' },
  { value: 20, label: 'Emission Reduction', suffix: '%' },
];

// Features page data
export const FEATURES = [
  {
    title: 'Smart Route Optimization',
    description: 'AI-powered algorithms analyze traffic patterns, delivery windows, and vehicle capacity to create the most efficient routes.',
    icon: 'Route',
  },
  {
    title: 'Shared Fleet Utilization',
    description: 'Enable multiple stakeholders to share transportation resources, reducing empty trips and maximizing vehicle capacity.',
    icon: 'Truck',
  },
  {
    title: 'Stakeholder Coordination',
    description: 'Seamless communication platform connecting suppliers, transporters, retailers, and authorities.',
    icon: 'Users',
  },
  {
    title: 'Real-Time GPS Tracking',
    description: 'Monitor all deliveries in real-time with live GPS tracking and estimated arrival times.',
    icon: 'MapPin',
  },
  {
    title: 'Data Analytics Dashboard',
    description: 'Comprehensive analytics and reporting tools to measure performance and identify optimization opportunities.',
    icon: 'BarChart3',
  },
  {
    title: 'Emission Monitoring',
    description: 'Track carbon emissions and environmental impact with detailed sustainability metrics.',
    icon: 'Leaf',
  },
];

// Stakeholders data
export const STAKEHOLDERS = [
  {
    title: 'Suppliers',
    description: 'Streamline distribution, reduce logistics costs, and improve delivery reliability through coordinated scheduling.',
    benefits: ['Lower transportation costs', 'Better delivery windows', 'Real-time visibility'],
    icon: 'Factory',
  },
  {
    title: 'Transporters',
    description: 'Maximize fleet utilization, reduce empty miles, and increase profitability through shared logistics.',
    benefits: ['Higher vehicle utilization', 'Optimized routes', 'Reduced fuel costs'],
    icon: 'Truck',
  },
  {
    title: 'Retailers',
    description: 'Receive timely deliveries, reduce inventory costs, and improve customer satisfaction with predictable logistics.',
    benefits: ['Reliable deliveries', 'Lower inventory costs', 'Better planning'],
    icon: 'Store',
  },
  {
    title: 'Local Authorities',
    description: 'Reduce traffic congestion, lower emissions, and support sustainable urban development goals.',
    benefits: ['Reduced congestion', 'Lower emissions', 'Smart city goals'],
    icon: 'Building2',
  },
];

// Dashboard sidebar navigation
export const DASHBOARD_NAV = [
  { href: '/dashboard', label: 'Overview', icon: 'LayoutDashboard' },
  { href: '/dashboard/deliveries', label: 'Deliveries', icon: 'Package' },
  { href: '/dashboard/routes', label: 'Routes', icon: 'Route' },
  { href: '/dashboard/vehicles', label: 'Vehicles', icon: 'Truck' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/dashboard/emissions', label: 'Emissions', icon: 'Leaf' },
];
