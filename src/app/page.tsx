"use client";

import { useState, useMemo } from "react";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  FileText,
  Workflow,
  Settings,
  Bell,
  ChevronDown,
  Star,
  MapPin,
  Building2,
  Zap,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  Briefcase,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell } from "recharts";

// Mock data for the CRM
const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Global Commodities Ltd",
    email: "sarah@globalcommodities.com",
    phone: "+1 (555) 123-4567",
    country: "USA",
    tags: ["Gold", "Premium"],
    status: "Active",
    lastActivity: "2 hours ago",
    dealValue: 2500000,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Marcus Chen",
    company: "Asia Pacific Trading",
    email: "marcus@aptrading.com",
    phone: "+65 9876 5432",
    country: "Singapore",
    tags: ["Oil", "Sugar"],
    status: "Lead",
    lastActivity: "1 day ago",
    dealValue: 1800000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "South American Exports",
    email: "elena@saexports.com",
    phone: "+55 11 9999-8888",
    country: "Brazil",
    tags: ["Coffee", "Sugar"],
    status: "Negotiating",
    lastActivity: "3 hours ago",
    dealValue: 950000,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const mockDeals = [
  {
    id: 1,
    title: "Gold Futures Contract - Q2 2024",
    company: "Global Commodities Ltd",
    value: 2500000,
    stage: "Contract Sent",
    probability: 85,
    closeDate: "2024-02-15",
    contact: "Sarah Johnson",
    commodity: "Gold",
    status: "hot"
  },
  {
    id: 2,
    title: "Crude Oil Supply Agreement",
    company: "Asia Pacific Trading",
    value: 1800000,
    stage: "Discussion",
    probability: 60,
    closeDate: "2024-02-28",
    contact: "Marcus Chen",
    commodity: "Oil",
    status: "warm"
  },
  {
    id: 3,
    title: "Sugar Export Deal - Brazil",
    company: "South American Exports",
    value: 950000,
    stage: "Negotiating",
    probability: 75,
    closeDate: "2024-02-20",
    contact: "Elena Rodriguez",
    commodity: "Sugar",
    status: "hot"
  }
];

const revenueData = [
  { month: "Jan", revenue: 1200000, deals: 8 },
  { month: "Feb", revenue: 1800000, deals: 12 },
  { month: "Mar", revenue: 2200000, deals: 15 },
  { month: "Apr", revenue: 1900000, deals: 11 },
  { month: "May", revenue: 2800000, deals: 18 },
  { month: "Jun", revenue: 3200000, deals: 22 }
];

const commodityData = [
  { name: "Gold", value: 35, color: "#FFD700" },
  { name: "Oil", value: 28, color: "#2563EB" },
  { name: "Sugar", value: 20, color: "#10B981" },
  { name: "Coffee", value: 17, color: "#8B4513" }
];

const pipelineStages = [
  { name: "Lead", count: 24, value: 2400000 },
  { name: "Discussion", count: 18, value: 4200000 },
  { name: "Negotiating", count: 12, value: 3800000 },
  { name: "Contract Sent", count: 8, value: 2900000 },
  { name: "Closing", count: 5, value: 1800000 }
];

export default function CommoditiesCRM() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredContacts = useMemo(() => {
    return mockContacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = selectedFilter === "all" || 
                           contact.tags.some(tag => tag.toLowerCase() === selectedFilter.toLowerCase()) ||
                           contact.status.toLowerCase() === selectedFilter.toLowerCase();
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalDeals = revenueData.reduce((sum, item) => sum + item.deals, 0);
  const avgDealSize = totalRevenue / totalDeals;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">CommodityCRM</h1>
              </div>
              
              <nav className="hidden md:flex space-x-1">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  { id: "contacts", label: "Contacts", icon: Users },
                  { id: "deals", label: "Deals", icon: DollarSign },
                  { id: "workflows", label: "Workflows", icon: Workflow },
                  { id: "documents", label: "Documents", icon: FileText }
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(item.id)}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search contacts, deals..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
              
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "contacts", label: "Contacts", icon: Users },
              { id: "deals", label: "Deals", icon: DollarSign },
              { id: "workflows", label: "Workflows", icon: Workflow },
              { id: "documents", label: "Documents", icon: FileText }
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* AI Insights Banner */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-1">AI Insights & Recommendations</h3>
                    <p className="text-sm text-blue-700 mb-3">
                      Your Gold futures deal with Global Commodities has 85% success probability. 
                      <strong> Suggested action:</strong> Send follow-up email about contract terms.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        <Mail className="w-3 h-3 mr-1" />
                        Send Email
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        <Calendar className="w-3 h-3 mr-1" />
                        Schedule Call
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                        <Target className="w-3 h-3 mr-1" />
                        View Deal
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(totalRevenue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +12.5% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Deals</p>
                      <p className="text-2xl font-bold text-gray-900">{totalDeals}</p>
                      <p className="text-xs text-blue-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +8 new this week
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(avgDealSize / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-orange-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +5.2% increase
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">68%</p>
                      <p className="text-xs text-purple-600 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +3.1% this quarter
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Revenue Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Commodities Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                      <RechartsPieChart data={commodityData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                        {commodityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {commodityData.map((item) => (
                      <div key={item.name} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pipeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Sales Pipeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {pipelineStages.map((stage, index) => (
                    <div key={stage.name} className="text-center">
                      <div className="bg-gray-100 rounded-lg p-4 mb-2">
                        <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                        <div className="text-sm text-gray-600">{stage.name}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        ${(stage.value / 1000000).toFixed(1)}M value
                      </div>
                      {index < pipelineStages.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                          <ArrowUpRight className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-6">
            {/* Contacts Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
                <p className="text-gray-600">Manage your commodity trading contacts</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="oil">Oil</SelectItem>
                    <SelectItem value="sugar">Sugar</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                          <Badge variant={contact.status === 'Active' ? 'default' : contact.status === 'Lead' ? 'secondary' : 'outline'}>
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 truncate">{contact.company}</p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
                          <MapPin className="w-3 h-3" />
                          <span>{contact.country}</span>
                          <span>•</span>
                          <span>{contact.lastActivity}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {contact.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm font-semibold text-green-600 mb-3">
                          Deal Value: ${(contact.dealValue / 1000000).toFixed(1)}M
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "deals" && (
          <div className="space-y-6">
            {/* Deals Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Deals Pipeline</h2>
                <p className="text-gray-600">Track your commodity trading deals</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Deal
              </Button>
            </div>

            {/* Deals List */}
            <div className="space-y-4">
              {mockDeals.map((deal) => (
                <Card key={deal.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                          <Badge 
                            variant={deal.status === 'hot' ? 'destructive' : deal.status === 'warm' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {deal.status === 'hot' ? '🔥 Hot' : deal.status === 'warm' ? '⚡ Warm' : '❄️ Cold'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Building2 className="w-4 h-4" />
                            <span>{deal.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{deal.contact}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Globe className="w-4 h-4" />
                            <span>{deal.commodity}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-lg font-bold text-green-600">
                            ${(deal.value / 1000000).toFixed(1)}M
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Probability:</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={deal.probability} className="w-20" />
                              <span className="text-sm font-medium">{deal.probability}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{deal.stage}</div>
                          <div className="text-xs text-gray-500">Current Stage</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{deal.closeDate}</div>
                          <div className="text-xs text-gray-500">Expected Close</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            Schedule
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-3 h-3 mr-1" />
                            Notes
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "workflows" && (
          <div className="space-y-6">
            {/* Workflows Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Automated Workflows</h2>
                <p className="text-gray-600">Create and manage your automation sequences</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </div>

            {/* Workflow Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Lead Qualification",
                  description: "Automatically qualify new leads based on commodity interest and company size",
                  triggers: 3,
                  actions: 8,
                  active: true,
                  icon: Target
                },
                {
                  name: "Contract Follow-up",
                  description: "Send automated reminders for pending contract signatures",
                  triggers: 2,
                  actions: 5,
                  active: true,
                  icon: FileText
                },
                {
                  name: "Deal Nurturing",
                  description: "Nurture warm leads with personalized content and touchpoints",
                  triggers: 4,
                  actions: 12,
                  active: false,
                  icon: TrendingUp
                },
                {
                  name: "Onboarding Sequence",
                  description: "Welcome new clients with document collection and setup tasks",
                  triggers: 1,
                  actions: 6,
                  active: true,
                  icon: CheckCircle2
                },
                {
                  name: "Renewal Reminders",
                  description: "Proactive outreach for contract renewals 90 days before expiry",
                  triggers: 2,
                  actions: 4,
                  active: true,
                  icon: Clock
                },
                {
                  name: "Risk Alerts",
                  description: "Monitor deal health and alert team of at-risk opportunities",
                  triggers: 5,
                  actions: 3,
                  active: false,
                  icon: AlertCircle
                }
              ].map((workflow, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <workflow.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                          <Badge variant={workflow.active ? "default" : "secondary"}>
                            {workflow.active ? "Active" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>{workflow.triggers} triggers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="w-3 h-3" />
                            <span>{workflow.actions} actions</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Workflow Builder Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Workflow className="w-5 h-5" />
                  <span>Visual Workflow Builder</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Workflow className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop Workflow Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Create sophisticated automation sequences with our visual builder. 
                    Add triggers, conditions, actions, and delays with simple drag-and-drop.
                  </p>
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                    Open Builder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-6">
            {/* Documents Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
                <p className="text-gray-600">Organize contracts, procedures, and files</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            {/* Document Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Contracts", count: 24, icon: FileText, color: "bg-blue-100 text-blue-600" },
                { name: "Procedures", count: 12, icon: Settings, color: "bg-green-100 text-green-600" },
                { name: "Certificates", count: 8, icon: Star, color: "bg-yellow-100 text-yellow-600" },
                { name: "Reports", count: 16, icon: BarChart3, color: "bg-purple-100 text-purple-600" }
              ].map((category) => (
                <Card key={category.name} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} files</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Gold Futures Contract - Q2 2024.pdf",
                      type: "Contract",
                      size: "2.4 MB",
                      modified: "2 hours ago",
                      contact: "Sarah Johnson"
                    },
                    {
                      name: "Oil Supply Agreement Draft.docx",
                      type: "Contract",
                      size: "1.8 MB",
                      modified: "1 day ago",
                      contact: "Marcus Chen"
                    },
                    {
                      name: "Sugar Export Procedures.pdf",
                      type: "Procedure",
                      size: "956 KB",
                      modified: "3 days ago",
                      contact: "Elena Rodriguez"
                    },
                    {
                      name: "Commodity Price Analysis Q1.xlsx",
                      type: "Report",
                      size: "3.2 MB",
                      modified: "1 week ago",
                      contact: "System Generated"
                    }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.modified}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{doc.contact}</div>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}