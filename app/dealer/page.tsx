"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap,
  LayoutDashboard,
  Package,
  ClipboardList,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  ArrowUpRight,
  Filter,
  Download,
  MoreVertical,
  Plus,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  ShoppingCart,
  UserPlus,
  MapPin,
  ExternalLink,
  X,
  QrCode,
  CircleDot,
  PackageCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const NAVIGATION = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "inventory", label: "Inventory", icon: Package, count: 4 },
  { id: "orders", label: "Orders", icon: ClipboardList, count: 12 },
  { id: "dispatch", label: "Dispatch", icon: Truck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

const STATS = [
  { label: "Total Dispatch", value: "142", change: "+12%", trend: "up", icon: Truck, suffix: "Units" },
  { label: "Pending Orders", value: "24", change: "-8%", trend: "down", icon: Clock, suffix: "Orders" },
  { label: "Revenue (Oct)", value: "₹42.5L", change: "+23%", trend: "up", icon: TrendingUp, suffix: "" },
  { label: "Active Partners", value: "18", change: "+2", trend: "up", icon: Users, suffix: "Dealers" },
]

const INVENTORY = [
  {
    sku: "SMG-PRO-BLK",
    model: "SMG Pro Cruiser X1",
    color: "Matte Black",
    stock: 12,
    status: "Low Stock",
    price: "₹89,999",
    img: "https://images.unsplash.com/photo-1620802051782-72656960d7c0?auto=format&fit=crop&q=80&w=100",
  },
  {
    sku: "SMG-URB-WHT",
    model: "SMG Urban Glide S2",
    color: "Pearl White",
    stock: 45,
    status: "In Stock",
    price: "₹64,999",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=100",
  },
  {
    sku: "SMG-ECO-RED",
    model: "Eco Rider Mini",
    color: "Racing Red",
    stock: 0,
    status: "Out of Stock",
    price: "₹45,000",
    img: "https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?auto=format&fit=crop&q=80&w=100",
  },
  {
    sku: "BAT-72V-ION",
    model: "72V Li-Ion Battery",
    color: "Grey",
    stock: 120,
    status: "In Stock",
    price: "₹18,500",
    img: "https://plus.unsplash.com/premium_photo-1679917152960-b9e6456ba1d2?auto=format&fit=crop&q=80&w=100",
  },
]

const ORDERS = [
  {
    id: "ORD-DL-9921",
    dealer: "Rajesh Motors",
    items: 50,
    total: "₹42,50,000",
    status: "Processing",
    date: "Today, 10:23 AM",
  },
  {
    id: "ORD-DL-9920",
    dealer: "Green City Rides",
    items: 20,
    total: "₹18,20,000",
    status: "Shipped",
    date: "Yesterday",
  },
  {
    id: "ORD-DL-9919",
    dealer: "Urban Mobility Hub",
    items: 15,
    total: "₹12,45,000",
    status: "Completed",
    date: "22 Oct 2024",
  },
  {
    id: "ORD-DL-9918",
    dealer: "EV Solutions Pvt",
    items: 30,
    total: "₹25,80,000",
    status: "Processing",
    date: "21 Oct 2024",
  },
  {
    id: "ORD-DL-9917",
    dealer: "Metro EV Store",
    items: 10,
    total: "₹8,50,000",
    status: "Shipped",
    date: "20 Oct 2024",
  },
]

const RECENT_ACTIVITY = [
  { action: "New order received", detail: "ORD-DL-9921 from Rajesh Motors", time: "2 min ago" },
  { action: "Shipment dispatched", detail: "15 units to Urban Mobility Hub", time: "1 hour ago" },
  { action: "Low stock alert", detail: "SMG Pro Cruiser X1 - 12 units left", time: "3 hours ago" },
  { action: "Payment received", detail: "₹18,20,000 from Green City Rides", time: "5 hours ago" },
]

const ANALYTICS_STATS = [
  { label: "Total Revenue", value: "₹2.4Cr", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Total Sales", value: "101", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { label: "Active Inventory", value: "48", change: "-3.1%", trend: "down", icon: Package },
  { label: "New Customers", value: "67", change: "+15.3%", trend: "up", icon: UserPlus },
]

const SALES_TREND_DATA = [
  { month: "Jan", sales: 12 },
  { month: "Feb", sales: 14 },
  { month: "Mar", sales: 18 },
  { month: "Apr", sales: 15 },
  { month: "May", sales: 20 },
  { month: "Jun", sales: 22 },
]

const REVENUE_BY_MONTH = [
  { month: "Jan", revenue: 850000 },
  { month: "Feb", revenue: 1100000 },
  { month: "Mar", revenue: 1050000 },
  { month: "Apr", revenue: 980000 },
  { month: "May", revenue: 1150000 },
  { month: "Jun", revenue: 1250000 },
]

const SALES_BY_CATEGORY = [
  { name: "Pro Cruiser", value: 35, color: "#3b82f6" },
  { name: "Urban Glide", value: 30, color: "#22c55e" },
  { name: "Eco Rider", value: 20, color: "#FF4D00" },
  { name: "Sport X", value: 15, color: "#f59e0b" },
]

const TOP_PERFORMING_MODELS = [
  { model: "SMG Pro Cruiser X1", revenue: "₹56L", units: 45, percentage: 100 },
  { model: "SMG Urban Glide S2", revenue: "₹36L", units: 38, percentage: 64 },
  { model: "Eco Rider Mini", revenue: "₹27L", units: 32, percentage: 48 },
  { model: "Sport X Pro", revenue: "₹30L", units: 18, percentage: 32 },
]

const DISPATCH_STATS = [
  { label: "Total Shipments", value: "32", icon: Truck },
  { label: "Pickup Packages", value: "24", icon: Package },
  { label: "Pending Packages", value: "8", icon: Clock },
  { label: "Packages Delivered", value: "4", icon: PackageCheck },
]

const ONGOING_DELIVERIES = [
  {
    id: "#454EH1274",
    category: "Electric Scooter",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    courier: "SMG Express",
    courierLogo: "🚚",
    origin: "SMG Factory, Bengaluru, KA",
    destination: "Rajesh Motors, Mumbai, MH",
    distance: "980 km",
    vehicle: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=200",
    driver: "Amit Kumar",
    weight: "45.2 kg",
    payment: "₹89,999",
    status: "Shipping",
    startDate: "Dec 1, 2025",
    endDate: "Dec 5, 2025",
    progress: 65,
  },
  {
    id: "#218YU-sas1",
    category: "Battery Pack",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    courier: "SMG Express",
    courierLogo: "🚚",
    origin: "SMG Factory, Bengaluru, KA",
    destination: "Green City Rides, Delhi, DL",
    distance: "2,100 km",
    vehicle: "https://images.unsplash.com/photo-1620802051782-72656960d7c0?auto=format&fit=crop&q=80&w=200",
    driver: "Ravi Singh",
    weight: "18.5 kg",
    payment: "₹18,500",
    status: "Shipping",
    startDate: "Nov 30, 2025",
    endDate: "Dec 6, 2025",
    progress: 40,
  },
  {
    id: "#154KA2537",
    category: "Accessories",
    categoryColor: "bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/20",
    courier: "BlueDart",
    courierLogo: "📦",
    origin: "SMG Factory, Bengaluru, KA",
    destination: "EV Solutions, Chennai, TN",
    distance: "350 km",
    vehicle: "https://images.unsplash.com/photo-1591635566278-10dca0ca76ee?auto=format&fit=crop&q=80&w=200",
    driver: "Suresh M",
    weight: "8.4 kg",
    payment: "₹12,500",
    status: "Pending",
    startDate: "Dec 4, 2025",
    endDate: "Dec 6, 2025",
    progress: 10,
  },
]

const TRACK_ORDERS = [
  {
    trackingNumber: "#HJn487-aa1",
    courier: "FedEx",
    courierIcon: "🟣",
    category: "Equipment",
    categoryColor: "bg-gray-500/10 text-gray-300 border-gray-500/20",
    shipperDate: "Dec 2, 2025",
    destination: "Rajesh Motors, Mumbai, MH",
    weight: "88.4 kg",
    payment: "₹1,26,000",
    status: "Pending",
  },
  {
    trackingNumber: "#454EH1274",
    courier: "SMG Express",
    courierIcon: "🟠",
    category: "Scooter",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    shipperDate: "Dec 2, 2025",
    destination: "Rajesh Motors, Mumbai, MH",
    weight: "45.2 kg",
    payment: "₹89,999",
    status: "Shipping",
  },
  {
    trackingNumber: "#218YU-sas1",
    courier: "SMG Express",
    courierIcon: "🟠",
    category: "Battery",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    shipperDate: "Dec 2, 2025",
    destination: "Green City Rides, Delhi, DL",
    weight: "18.5 kg",
    payment: "₹18,500",
    status: "Shipping",
  },
  {
    trackingNumber: "#jk676NJ12",
    courier: "BlueDart",
    courierIcon: "🔵",
    category: "Accessories",
    categoryColor: "bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/20",
    shipperDate: "Dec 2, 2025",
    destination: "Metro EV Store, Hyderabad, TS",
    weight: "13.4 kg",
    payment: "₹3,46,000",
    status: "Pending",
  },
  {
    trackingNumber: "#DSP-003",
    courier: "DTDC",
    courierIcon: "🟢",
    category: "Charger",
    categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    shipperDate: "Dec 1, 2025",
    destination: "Urban Mobility Hub, Delhi, DL",
    weight: "5.2 kg",
    payment: "₹8,500",
    status: "Delivered",
  },
]

export default function DealerDashboard() {
  const [activeNav, setActiveNav] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedShipment, setSelectedShipment] = useState<(typeof ONGOING_DELIVERIES)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "Low Stock":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      case "Out of Stock":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Processing":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "Shipped":
      case "Shipping":
        return "bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/20"
      case "Completed":
      case "Delivered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "Pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f0f14] border-r border-white/5 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF6B35] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white block leading-tight">SMG Motors</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Dealer Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAVIGATION.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeNav === item.id
                  ? "bg-[#FF4D00] text-white shadow-lg shadow-[#FF4D00]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
              {item.count && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    activeNav === item.id ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 pb-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* User */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#FF6B35] flex items-center justify-center text-white font-bold">
              RM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Rajesh Motors</p>
              <p className="text-xs text-gray-500 truncate">Premium Dealer</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-400 hover:text-white">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#15151a] border-white/10">
                <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">{activeNav}</h1>
              <p className="text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 pl-10"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF4D00] rounded-full" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Overview View */}
          {activeNav === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="bg-white/[0.02] border-white/5 hover:border-[#FF4D00]/30 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#FF4D00]/10 flex items-center justify-center">
                            <stat.icon className="w-6 h-6 text-[#FF4D00]" />
                          </div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                              stat.trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {stat.trend === "up" ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Charts & Activity */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <Card className="lg:col-span-2 bg-white/[0.02] border-white/5">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Recent Orders</CardTitle>
                      <CardDescription className="text-gray-500">Latest dealer orders</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#FF4D00] hover:text-[#FF4D00] hover:bg-[#FF4D00]/10"
                    >
                      View All
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="text-gray-400">Order ID</TableHead>
                          <TableHead className="text-gray-400">Dealer</TableHead>
                          <TableHead className="text-gray-400">Amount</TableHead>
                          <TableHead className="text-gray-400">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ORDERS.slice(0, 4).map((order) => (
                          <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                            <TableCell className="text-white font-medium">{order.id}</TableCell>
                            <TableCell className="text-gray-300">{order.dealer}</TableCell>
                            <TableCell className="text-white">{order.total}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="bg-white/[0.02] border-white/5">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-500">Latest updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {RECENT_ACTIVITY.map((activity, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#FF4D00] mt-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-white">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.detail}</p>
                            <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Inventory View */}
          {activeNav === "inventory" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <Button className="bg-[#FF4D00] hover:bg-[#FF6B35] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <Card className="bg-white/[0.02] border-white/5">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-gray-400">Product</TableHead>
                      <TableHead className="text-gray-400">SKU</TableHead>
                      <TableHead className="text-gray-400">Color</TableHead>
                      <TableHead className="text-gray-400">Stock</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Price</TableHead>
                      <TableHead className="text-gray-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {INVENTORY.map((item) => (
                      <TableRow key={item.sku} className="border-white/5 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={item.img || "/placeholder.svg"}
                              alt={item.model}
                              className="w-12 h-12 rounded-lg object-cover bg-white/5"
                            />
                            <span className="text-white font-medium">{item.model}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400 font-mono text-sm">{item.sku}</TableCell>
                        <TableCell className="text-gray-300">{item.color}</TableCell>
                        <TableCell className="text-white font-medium">{item.stock}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </TableCell>
                        <TableCell className="text-[#FF4D00] font-bold">{item.price}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#15151a] border-white/10">
                              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Orders View */}
          {activeNav === "orders" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <Button className="bg-[#FF4D00] hover:bg-[#FF6B35] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </div>

              <Card className="bg-white/[0.02] border-white/5">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-gray-400">Order ID</TableHead>
                      <TableHead className="text-gray-400">Dealer</TableHead>
                      <TableHead className="text-gray-400">Items</TableHead>
                      <TableHead className="text-gray-400">Total</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((order) => (
                      <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                        <TableCell className="text-white font-medium font-mono">{order.id}</TableCell>
                        <TableCell className="text-gray-300">{order.dealer}</TableCell>
                        <TableCell className="text-white">{order.items} units</TableCell>
                        <TableCell className="text-[#FF4D00] font-bold">{order.total}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-400 text-sm">{order.date}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#15151a] border-white/10">
                              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                                <Truck className="w-4 h-4 mr-2" />
                                Track Shipment
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 focus:text-white focus:bg-white/10">
                                <Download className="w-4 h-4 mr-2" />
                                Download Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}

          {/* Dispatch View */}
          {activeNav === "dispatch" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {DISPATCH_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="bg-white/[0.02] border-white/5">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Delivery Cards */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-white">Ongoing Delivery</h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {ONGOING_DELIVERIES.map((delivery, i) => (
                      <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedShipment(delivery)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedShipment?.id === delivery.id
                            ? "bg-[#FF4D00]/10 border-[#FF4D00]/30"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className="flex gap-4">
                          {/* Vehicle Image */}
                          <div className="w-24 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                            <img
                              src={delivery.vehicle || "/placeholder.svg"}
                              alt="Vehicle"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-xs text-gray-500">Shipment ID:</p>
                                <p className="text-sm font-bold text-white">{delivery.id}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={delivery.categoryColor}>{delivery.category}</Badge>
                                <Badge className="bg-white/5 text-gray-300 border-white/10">
                                  {delivery.courierLogo} {delivery.courier}
                                </Badge>
                                <button className="text-gray-400 hover:text-white">
                                  <ExternalLink className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Route */}
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                              <span className="flex items-center gap-1">
                                <span className="text-base">🇮🇳</span>
                                <span className="truncate max-w-[140px]">{delivery.origin}</span>
                              </span>
                              <span className="text-gray-600">→</span>
                              <span className="flex items-center gap-1">
                                <span className="text-base">🇮🇳</span>
                                <span className="truncate max-w-[140px]">{delivery.destination}</span>
                              </span>
                            </div>

                            {/* Distance */}
                            <p className="text-xs text-gray-500">
                              Distance to destination: <span className="text-gray-300">{delivery.distance}</span>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Map + Shipment Details */}
                <div className="space-y-4">
                  {/* Map Placeholder */}
                  <div className="relative h-[260px] rounded-xl overflow-hidden bg-[#1a1a24] border border-white/5">
                    <div className="absolute inset-0 opacity-50">
                      <img src="/india-map-with-delivery-route-markers-dark-theme.jpg" alt="Delivery Map" className="w-full h-full object-cover" />
                    </div>
                    {/* Map overlay with route indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-[#FF4D00] mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Live Tracking Map</p>
                        <p className="text-xs text-gray-500">Select a shipment to view route</p>
                      </div>
                    </div>
                    {/* Route points */}
                    {selectedShipment && (
                      <>
                        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#FF4D00] rounded-full animate-pulse" />
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <line
                            x1="25%"
                            y1="25%"
                            x2="75%"
                            y2="67%"
                            stroke="#FF4D00"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            opacity="0.5"
                          />
                        </svg>
                      </>
                    )}
                  </div>

                  {/* Shipment Details Popup */}
                  <AnimatePresence>
                    {selectedShipment && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">Shipment details</h4>
                            <Badge className={getStatusColor(selectedShipment.status)}>
                              <CircleDot className="w-3 h-3 mr-1" />
                              {selectedShipment.status}
                            </Badge>
                          </div>
                          <button onClick={() => setSelectedShipment(null)} className="text-gray-400 hover:text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-5 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#FF4D00]/10 flex items-center justify-center">
                              <Users className="w-4 h-4 text-[#FF4D00]" />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500">Driver</p>
                              <p className="text-xs font-medium text-white">{selectedShipment.driver}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500">Tracking number</p>
                            <p className="text-xs font-medium text-white">{selectedShipment.id}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500">Category</p>
                            <p className="text-xs font-medium text-white">{selectedShipment.category}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500">Weight</p>
                            <p className="text-xs font-medium text-white">{selectedShipment.weight}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500">Payment</p>
                            <p className="text-xs font-medium text-[#FF4D00]">{selectedShipment.payment}</p>
                          </div>
                        </div>

                        {/* Timeline Progress */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 whitespace-nowrap">{selectedShipment.startDate}</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${selectedShipment.progress}%` }}
                              className="h-full bg-gradient-to-r from-blue-500 to-[#FF4D00] rounded-full"
                            />
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{selectedShipment.endDate}</span>
                          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ml-2">
                            <QrCode className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <Card className="bg-white/[0.02] border-white/5">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-white text-base">Track Order</CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Search"
                        className="w-48 h-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 pl-9 text-sm"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent"
                    >
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-gray-400 text-xs">
                          <input type="checkbox" className="rounded border-white/20 bg-transparent" />
                        </TableHead>
                        <TableHead className="text-gray-400 text-xs">Tracking number</TableHead>
                        <TableHead className="text-gray-400 text-xs">Courier service</TableHead>
                        <TableHead className="text-gray-400 text-xs">Category</TableHead>
                        <TableHead className="text-gray-400 text-xs">Shipper date</TableHead>
                        <TableHead className="text-gray-400 text-xs">Destination</TableHead>
                        <TableHead className="text-gray-400 text-xs">Weight</TableHead>
                        <TableHead className="text-gray-400 text-xs">Payment</TableHead>
                        <TableHead className="text-gray-400 text-xs">Status</TableHead>
                        <TableHead className="text-gray-400 text-xs"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TRACK_ORDERS.map((order, i) => (
                        <TableRow key={order.trackingNumber} className="border-white/5 hover:bg-white/5">
                          <TableCell>
                            <input type="checkbox" className="rounded border-white/20 bg-transparent" />
                          </TableCell>
                          <TableCell className="text-white font-medium font-mono text-sm">
                            {order.trackingNumber}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{order.courierIcon}</span>
                              <span className="text-gray-300 text-sm">{order.courier}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={order.categoryColor}>{order.category}</Badge>
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm">{order.shipperDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-300 text-sm">
                              <span>🇮🇳</span>
                              <span className="truncate max-w-[180px]">{order.destination}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm">{order.weight}</TableCell>
                          <TableCell className="text-white font-medium text-sm">{order.payment}</TableCell>
                          <TableCell>
                            <span
                              className={`text-sm font-medium flex items-center gap-1 ${
                                order.status === "Pending"
                                  ? "text-amber-400"
                                  : order.status === "Shipping"
                                    ? "text-[#FF4D00]"
                                    : "text-emerald-400"
                              }`}
                            >
                              <CircleDot className="w-3 h-3" />
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <button className="text-gray-400 hover:text-white">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Analytics View */}
          {activeNav === "analytics" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Analytics Header */}
              <div>
                <h2 className="text-xl font-semibold text-white">Analytics</h2>
                <p className="text-sm text-gray-500">Performance insights and statistics</p>
              </div>

              {/* Analytics Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ANALYTICS_STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="bg-white/[0.02] border-white/5">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {stat.trend === "up" ? (
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-400" />
                              )}
                              <span className={`text-xs ${stat.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                                {stat.change}
                              </span>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <stat.icon className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row 1: Sales Trend + Revenue by Month */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Sales Trend Line Chart */}
                <Card className="bg-white/[0.02] border-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={SALES_TREND_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#15151a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue by Month Bar Chart */}
                <Card className="bg-white/[0.02] border-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Revenue by Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={REVENUE_BY_MONTH}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `₹${value / 100000}L`} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#15151a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                            formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, "Revenue"]}
                          />
                          <Legend />
                          <Bar dataKey="revenue" fill="#4ade80" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row 2: Sales by Category + Top Performing Models */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Sales by Category Pie Chart */}
                <Card className="bg-white/[0.02] border-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Sales by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={SALES_BY_CATEGORY}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, value }) => `${name} ${value}%`}
                            labelLine={{ stroke: "rgba(255,255,255,0.3)" }}
                          >
                            {SALES_BY_CATEGORY.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#15151a",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                            formatter={(value: number) => [`${value}%`, "Share"]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Models */}
                <Card className="bg-white/[0.02] border-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base">Top Performing Models</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {TOP_PERFORMING_MODELS.map((item, i) => (
                        <div key={item.model} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{item.model}</span>
                            <span className="text-sm font-bold text-[#FF4D00]">{item.revenue}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                              className="h-full bg-[#FF4D00] rounded-full"
                            />
                          </div>
                          <p className="text-xs text-gray-500">{item.units} units sold</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Settings View */}
          {activeNav === "settings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/[0.02] border-white/5">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                  <CardDescription className="text-gray-500">Manage your dealer account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Business Name</label>
                      <Input defaultValue="Rajesh Motors" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Email</label>
                      <Input
                        defaultValue="contact@rajeshmotors.com"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Phone</label>
                      <Input defaultValue="+91 98284 89249" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">GST Number</label>
                      <Input defaultValue="29AABCT1332L1ZW" className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 bg-transparent">
                      Cancel
                    </Button>
                    <Button className="bg-[#FF4D00] hover:bg-[#FF6B35] text-white">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
