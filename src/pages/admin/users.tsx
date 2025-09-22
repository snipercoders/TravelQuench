

// // src/pages/admin/users.tsx

// import React, { useState, useEffect } from 'react';
// import AdminLayout from '@/components/layout/AdminLayout';
// import { useRequireAuth } from '@/hooks/useAuth';
// import Head from 'next/head';
// import { 
//   Search, Filter, Plus, Edit, Trash2, Eye, Mail, Phone, Calendar, 
//   Shield, UserCheck, UserX, MoreHorizontal, Users as UsersIcon, 
//   Crown, Ban, ArrowLeft, X, Check, AlertTriangle, Download,
//   UserPlus, Settings, RefreshCw, FileText, MessageCircle
// } from 'lucide-react';
// import { useRouter } from 'next/router';

// interface User {
//   id: string;
//   name: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   phone?: string;
//   role: 'customer' | 'admin';
//   isEmailVerified: boolean;
//   profileImage?: string;
//   totalBookings: number;
//   totalSpent: number;
//   lastLoginAt?: string;
//   createdAt: string;
//   isActive: boolean;
//   address?: string;
//   dateOfBirth?: string;
//   emergencyContact?: string;
//   preferences?: {
//     newsletter: boolean;
//     promotions: boolean;
//     notifications: boolean;
//   };
// }

// interface CreateUserData {
//   name: string;
//   email: string;
//   phone?: string;
//   role: 'customer' | 'admin';
//   password: string;
// }

// const UserManagement: React.FC = () => {
//   const { user, isLoading } = useRequireAuth('/auth/login');
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRole, setSelectedRole] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<User | null>(null);
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [createUserData, setCreateUserData] = useState<CreateUserData>({
//     name: '',
//     email: '',
//     phone: '',
//     role: 'customer',
//     password: ''
//   });
//   const [editUserData, setEditUserData] = useState<Partial<User>>({});
//   const [showEditModal, setShowEditModal] = useState(false);
//   const router = useRouter();

//   // Check if current user is admin
//   const isAdmin = user?.role === 'admin';

//   useEffect(() => {
//     if (!isLoading && !isAdmin) {
//       router.push('/unauthorized');
//       return;
//     }
//     if (isAdmin) {
//       fetchUsers();
//     }
//   }, [isLoading, isAdmin]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('/api/admin/users', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUsers(data);
//       } else if (response.status === 403) {
//         router.push('/unauthorized');
//       }
//     } catch (error) {
//       console.error('Failed to fetch users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setActionLoading('create');
//     try {
//       const response = await fetch('/api/admin/users/create', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(createUserData)
//       });
      
//       if (response.ok) {
//         const newUser = await response.json();
//         setUsers([...users, newUser]);
//         setShowCreateModal(false);
//         setCreateUserData({ name: '', email: '', phone: '', role: 'customer', password: '' });
//         alert('User created successfully!');
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to create user');
//       }
//     } catch (error) {
//       console.error('Failed to create user:', error);
//       alert('Failed to create user');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleEditUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedUser) return;
    
//     setActionLoading('edit');
//     try {
//       const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(editUserData)
//       });
      
//       if (response.ok) {
//         const updatedUser = await response.json();
//         setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
//         setShowEditModal(false);
//         setEditUserData({});
//         setSelectedUser(null);
//         alert('User updated successfully!');
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to update user');
//       }
//     } catch (error) {
//       console.error('Failed to update user:', error);
//       alert('Failed to update user');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleRoleChange = async (userId: string, newRole: 'customer' | 'admin') => {
//     if (!isAdmin) return;
    
//     setActionLoading(`role-${userId}`);
//     try {
//       const response = await fetch(`/api/admin/users/${userId}/role`, {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ role: newRole })
//       });
      
//       if (response.ok) {
//         setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
//         alert(`User role updated to ${newRole}`);
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to update user role');
//       }
//     } catch (error) {
//       console.error('Failed to update user role:', error);
//       alert('Failed to update user role');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
//     if (!isAdmin) return;
    
//     setActionLoading(`status-${userId}`);
//     try {
//       const response = await fetch(`/api/admin/users/${userId}/status`, {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ isActive: !currentStatus })
//       });
      
//       if (response.ok) {
//         setUsers(users.map(user => user.id === userId ? { ...user, isActive: !currentStatus } : user));
//         alert(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to update user status');
//       }
//     } catch (error) {
//       console.error('Failed to update user status:', error);
//       alert('Failed to update user status');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleDeleteUser = async () => {
//     if (!isAdmin || !userToDelete) return;
    
//     setActionLoading('delete');
//     try {
//       const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (response.ok) {
//         setUsers(users.filter(user => user.id !== userToDelete.id));
//         setShowDeleteModal(false);
//         setUserToDelete(null);
//         alert('User deleted successfully');
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to delete user');
//       }
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//       alert('Failed to delete user');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const exportUsers = async () => {
//     if (!isAdmin) return;
    
//     try {
//       const response = await fetch('/api/admin/users/export', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       }
//     } catch (error) {
//       console.error('Failed to export users:', error);
//       alert('Failed to export users');
//     }
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = selectedRole === 'all' || user.role === selectedRole;
//     const matchesStatus = selectedStatus === 'all' || 
//       (selectedStatus === 'active' && user.isActive) || 
//       (selectedStatus === 'inactive' && !user.isActive) || 
//       (selectedStatus === 'verified' && user.isEmailVerified) || 
//       (selectedStatus === 'unverified' && !user.isEmailVerified);
//     return matchesSearch && matchesRole && matchesStatus;
//   });

//   const getRoleColor = (role: string) => {
//     return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
//   };

//   const getStatusColor = (isActive: boolean) => {
//     return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
//   };

//   if (isLoading || loading) {
//     return (
//       <AdminLayout title="User Management">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <AdminLayout title="Access Denied">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
//             <p className="text-gray-400">You don't have permission to access this page.</p>
//           </div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>User Management - Travel Quench Admin</title>
//       </Head>
//       <AdminLayout title="User Management">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={() => router.back()}
//               className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
//             >
//               <ArrowLeft className="h-5 w-5 mr-2" />
//               Back
//             </button>
//           </div>

//           {/* Action Bar */}
//           <div className="mb-8">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//               <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
//                 {/* Search */}
//                 <div className="relative w-full sm:w-64">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder="Search users..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
//                   />
//                 </div>

//                 {/* Role Filter */}
//                 <select
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value)}
//                   className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
//                 >
//                   <option value="all">All Roles</option>
//                   <option value="customer" className="bg-gray-800">Customer</option>
//                   <option value="admin" className="bg-gray-800">Admin</option>
//                 </select>

//                 {/* Status Filter */}
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) => setSelectedStatus(e.target.value)}
//                   className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="active" className="bg-gray-800">Active</option>
//                   <option value="inactive" className="bg-gray-800">Inactive</option>
//                   <option value="verified" className="bg-gray-800">Email Verified</option>
//                   <option value="unverified" className="bg-gray-800">Email Unverified</option>
//                 </select>

//                 {/* Refresh Button */}
//                 <button
//                   onClick={fetchUsers}
//                   className="p-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
//                 >
//                   <RefreshCw className="h-4 w-4" />
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
//                 {/* Export Button */}
//                 <button
//                   onClick={exportUsers}
//                   className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg transform hover:scale-105"
//                 >
//                   <Download className="h-4 w-4 mr-2" />
//                   Export
//                 </button>

//                 {/* Add User Button */}
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg transform hover:scale-105"
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add User
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
//               <div className="flex items-center">
//                 <UsersIcon className="h-8 w-8 text-blue-400" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-300">Total Users</p>
//                   <p className="text-2xl font-bold text-white">{users.length}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
//               <div className="flex items-center">
//                 <UserCheck className="h-8 w-8 text-green-400" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-300">Active Users</p>
//                   <p className="text-2xl font-bold text-white">{users.filter(u => u.isActive).length}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
//               <div className="flex items-center">
//                 <Crown className="h-8 w-8 text-purple-400" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-300">Admins</p>
//                   <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</p>
//                 </div>
//               </div>
//             </div>
//             {/* <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
//               <div className="flex items-center">
//                 <Shield className="h-8 w-8 text-yellow-400" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-300">Verified</p>
//                   <p className="text-2xl font-bold text-white">{users.filter(u => u.isEmailVerified).length}</p>
//                 </div>
//               </div>
//             </div> */}
//           </div>

//           {/* Users Table */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
//             <div className="overflow-x-auto md:overflow-x-auto">
//               <table className="min-w-full md:table block">
//                 <thead className="bg-white/5 hidden md:table-header-group">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role & Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Activity</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="md:divide-y md:divide-white/10">
//                   {filteredUsers.map((user) => (
//                     <tr key={user.id} className="bg-white/5 block md:table-row rounded-lg md:rounded-none mb-4 md:mb-0 hover:bg-white/10 transition-colors">
//                       <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider" data-label="User">
//                         <div className="flex items-center">
//                           <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold">
//                             {user.profileImage ? (
//                               <img src={user.profileImage} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
//                             ) : (
//                               user.name.charAt(0).toUpperCase()
//                             )}
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-white flex items-center">
//                               {user.name}
//                               {user.role === 'admin' && (
//                                 <Crown className="h-4 w-4 ml-2 text-yellow-400" />
//                               )}
//                               {user.isEmailVerified && (
//                                 <UserCheck className="h-4 w-4 ml-2 text-green-400" />
//                               )}
//                             </div>
//                             <div className="text-sm text-gray-400">ID: {user.id.slice(0, 8)}...</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider" data-label="Contact">
//                         <div className="text-sm">
//                           <div className="flex items-center text-white mb-1">
//                             <Mail className="h-4 w-4 mr-2 text-gray-400" />
//                             {user.email}
//                           </div>
//                           {user.phone && (
//                             <div className="flex items-center text-gray-300">
//                               <Phone className="h-4 w-4 mr-2 text-gray-400" />
//                               {user.phone}
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider" data-label="Role & Status">
//                         <div className="flex flex-col space-y-2">
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
//                             <Shield className="h-3 w-3 mr-1" />
//                             {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                           </span>
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}>
//                             {user.isActive ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
//                             {user.isActive ? 'Active' : 'Inactive'}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider text-sm text-gray-300" data-label="Activity">
//                         <div>
//                           <div className="text-white font-medium">{user.totalBookings} bookings</div>
//                           <div className="text-green-400">₹{user.totalSpent.toLocaleString()} spent</div>
//                         </div>
//                       </td>
//                       <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider text-sm text-gray-300" data-label="Joined">
//                         <div className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           {new Date(user.createdAt).toLocaleDateString()}
//                         </div>
//                         {user.lastLoginAt && (
//                           <div className="text-xs text-gray-400 mt-1">
//                             Last: {new Date(user.lastLoginAt).toLocaleDateString()}
//                           </div>
//                         )}
//                       </td>
//                       <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider text-sm font-medium" data-label="Actions">
//                         <div className="flex items-center space-x-2 justify-start md:justify-start">
//                           {/* View User */}
//                           <button
//                             onClick={() => {
//                               setSelectedUser(user);
//                               setShowUserModal(true);
//                             }}
//                             className="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-400/20 rounded"
//                             title="View Details"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </button>

//                           {/* Edit User */}
//                           <button
//                             onClick={() => {
//                               setSelectedUser(user);
//                               setEditUserData(user);
//                               setShowEditModal(true);
//                             }}
//                             className="text-green-400 hover:text-green-300 p-1 hover:bg-green-400/20 rounded"
//                             title="Edit User"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </button>

//                           {/* Toggle Status */}
//                           <button
//                             onClick={() => handleStatusToggle(user.id, user.isActive)}
//                             disabled={actionLoading === `status-${user.id}`}
//                             className={`p-1 rounded ${user.isActive ? 'text-red-400 hover:text-red-300 hover:bg-red-400/20' : 'text-green-400 hover:text-green-300 hover:bg-green-400/20'}`}
//                             title={user.isActive ? 'Deactivate User' : 'Activate User'}
//                           >
//                             {actionLoading === `status-${user.id}` ? (
//                               <RefreshCw className="h-4 w-4 animate-spin" />
//                             ) : user.isActive ? (
//                               <Ban className="h-4 w-4" />
//                             ) : (
//                               <UserCheck className="h-4 w-4" />
//                             )}
//                           </button>

//                           {/* Delete User */}
//                           <button
//                             onClick={() => {
//                               setUserToDelete(user);
//                               setShowDeleteModal(true);
//                             }}
//                             className="text-red-400 hover:text-red-300 p-1 hover:bg-red-400/20 rounded"
//                             title="Delete User"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {filteredUsers.length === 0 && (
//             <div className="text-center py-12">
//               <UsersIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
//               <p className="text-gray-400 mb-4">
//                 {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
//                   ? 'Try adjusting your search criteria'
//                   : 'No users have registered yet'}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Create User Modal */}
//         {showCreateModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-white">Create New User</h3>
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <form onSubmit={handleCreateUser} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={createUserData.name}
//                     onChange={(e) => setCreateUserData({...createUserData, name: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                   <input
//                     type="email"
//                     required
//                     value={createUserData.email}
//                     onChange={(e) => setCreateUserData({...createUserData, email: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Phone (Optional)</label>
//                   <input
//                     type="tel"
//                     value={createUserData.phone}
//                     onChange={(e) => setCreateUserData({...createUserData, phone: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
//                   <select
//                     value={createUserData.role}
//                     onChange={(e) => setCreateUserData({...createUserData, role: e.target.value as 'customer' | 'admin'})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     <option value="customer">Customer</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//                   <input
//                     type="password"
//                     required
//                     value={createUserData.password}
//                     onChange={(e) => setCreateUserData({...createUserData, password: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     minLength={6}
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowCreateModal(false)}
//                     className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={actionLoading === 'create'}
//                     className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {actionLoading === 'create' ? (
//                       <>
//                         <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <UserPlus className="h-4 w-4 mr-2" />
//                         Create User
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Edit User Modal */}
//         {showEditModal && selectedUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-white">Edit User</h3>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <form onSubmit={handleEditUser} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={editUserData.name || ''}
//                     onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                   <input
//                     type="email"
//                     required
//                     value={editUserData.email || ''}
//                     onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
//                   <input
//                     type="tel"
//                     value={editUserData.phone || ''}
//                     onChange={(e) => setEditUserData({...editUserData, phone: e.target.value})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
//                   <select
//                     value={editUserData.role || 'customer'}
//                     onChange={(e) => setEditUserData({...editUserData, role: e.target.value as 'customer' | 'admin'})}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     <option value="customer">Customer</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-end space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowEditModal(false)}
//                     className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={actionLoading === 'edit'}
//                     className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {actionLoading === 'edit' ? (
//                       <>
//                         <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       <>
//                         <Check className="h-4 w-4 mr-2" />
//                         Update User
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* View User Modal */}
//         {showUserModal && selectedUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-white">User Details</h3>
//                 <button
//                   onClick={() => setShowUserModal(false)}
//                   className="text-gray-400 hover:text-white"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
              
//               <div className="space-y-6">
//                 {/* Profile Section */}
//                 <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
//                   <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white text-xl font-semibold">
//                     {selectedUser.profileImage ? (
//                       <img src={selectedUser.profileImage} alt={selectedUser.name} className="h-16 w-16 rounded-full object-cover" />
//                     ) : (
//                       selectedUser.name.charAt(0).toUpperCase()
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white flex items-center">
//                       {selectedUser.name}
//                       {selectedUser.role === 'admin' && (
//                         <Crown className="h-5 w-5 ml-2 text-yellow-400" />
//                       )}
//                     </h4>
//                     <p className="text-gray-300">{selectedUser.email}</p>
//                     <div className="flex items-center space-x-2 mt-1">
//                       <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(selectedUser.role)}`}>
//                         {selectedUser.role}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedUser.isActive)}`}>
//                         {selectedUser.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                       {selectedUser.isEmailVerified && (
//                         <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
//                           Verified
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-gray-700 p-4 rounded-lg">
//                     <h5 className="text-sm font-medium text-gray-300 mb-2">Contact Information</h5>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-white">
//                         <Mail className="h-4 w-4 mr-2 text-gray-400" />
//                         {selectedUser.email}
//                       </div>
//                       {selectedUser.phone && (
//                         <div className="flex items-center text-white">
//                           <Phone className="h-4 w-4 mr-2 text-gray-400" />
//                           {selectedUser.phone}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-gray-700 p-4 rounded-lg">
//                     <h5 className="text-sm font-medium text-gray-300 mb-2">Account Information</h5>
//                     <div className="space-y-2">
//                       <div className="text-white">
//                         <span className="text-gray-400">User ID:</span> {selectedUser.id}
//                       </div>
//                       <div className="text-white">
//                         <span className="text-gray-400">Joined:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}
//                       </div>
//                       {selectedUser.lastLoginAt && (
//                         <div className="text-white">
//                           <span className="text-gray-400">Last Login:</span> {new Date(selectedUser.lastLoginAt).toLocaleDateString()}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Activity Statistics */}
//                 <div className="bg-gray-700 p-4 rounded-lg">
//                   <h5 className="text-sm font-medium text-gray-300 mb-3">Activity Statistics</h5>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-orange-400">{selectedUser.totalBookings}</div>
//                       <div className="text-sm text-gray-300">Total Bookings</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-green-400">₹{selectedUser.totalSpent.toLocaleString()}</div>
//                       <div className="text-sm text-gray-300">Total Spent</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => {
//                       setShowUserModal(false);
//                       setEditUserData(selectedUser);
//                       setShowEditModal(true);
//                     }}
//                     className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <Edit className="h-4 w-4 mr-2" />
//                     Edit User
//                   </button>
//                   <button
//                     onClick={() => handleStatusToggle(selectedUser.id, selectedUser.isActive)}
//                     className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
//                       selectedUser.isActive 
//                         ? 'bg-red-600 text-white hover:bg-red-700' 
//                         : 'bg-green-600 text-white hover:bg-green-700'
//                     }`}
//                   >
//                     {selectedUser.isActive ? (
//                       <>
//                         <Ban className="h-4 w-4 mr-2" />
//                         Deactivate
//                       </>
//                     ) : (
//                       <>
//                         <UserCheck className="h-4 w-4 mr-2" />
//                         Activate
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {showDeleteModal && userToDelete && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
//               <div className="flex items-center mb-4">
//                 <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
//                 <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
//               </div>
//               <p className="text-gray-300 mb-6">
//                 Are you sure you want to delete user <strong>{userToDelete.name}</strong>? 
//                 This action cannot be undone and will permanently remove all user data.
//               </p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteUser}
//                   disabled={actionLoading === 'delete'}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                 >
//                   {actionLoading === 'delete' ? (
//                     <>
//                       <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       Delete User
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </AdminLayout>
//     </>
//   );
// };

// export default UserManagement;


















import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useRequireAuth } from '@/hooks/useAuth';
import Head from 'next/head';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Mail, Phone, Calendar, 
  Shield, UserCheck, UserX, MoreHorizontal, Users as UsersIcon, 
  Crown, Ban, ArrowLeft, X, Check, AlertTriangle, Download,
  UserPlus, RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  isEmailVerified: boolean;
  profileImage?: string;
  lastLoginAt?: string;
  createdAt: string;
  isActive: boolean;
  address?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  preferences?: {
    newsletter: boolean;
    promotions: boolean;
    notifications: boolean;
  };
}

interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  password: string;
}

const UserManagement: React.FC = () => {
  const { user, isLoading } = useRequireAuth('/auth/login');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [createUserData, setCreateUserData] = useState<CreateUserData>({
    name: '',
    email: '',
    phone: '',
    role: 'customer',
    password: ''
  });
  const [editUserData, setEditUserData] = useState<Partial<User>>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Check if current user is admin
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/unauthorized');
      return;
    }
    if (isAdmin) {
      fetchUsers();
    }
  }, [isLoading, isAdmin]);

  const fetchUsers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setActionLoading('refresh');
      } else {
        setLoading(true);
      }
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        router.push('/auth/login');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch('/api/admin/users', { headers });
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        router.push('/auth/login');
      } else {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      setError(error.message || 'Failed to load users');
    } finally {
      setLoading(false);
      setActionLoading(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('create');
    try {
      const response = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(createUserData)
      });
      
      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setShowCreateModal(false);
        setCreateUserData({ name: '', email: '', phone: '', role: 'customer', password: '' });
        alert('User created successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    setActionLoading('edit');
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editUserData)
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
        setShowEditModal(false);
        setEditUserData({});
        setSelectedUser(null);
        alert('User updated successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'customer' | 'admin') => {
    if (!isAdmin) return;
    
    setActionLoading(`role-${userId}`);
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      
      if (response.ok) {
        setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        alert(`User role updated to ${newRole}`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update user role');
      }
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('Failed to update user role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    if (!isAdmin) return;
    
    setActionLoading(`status-${userId}`);
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (response.ok) {
        setUsers(users.map(user => user.id === userId ? { ...user, isActive: !currentStatus } : user));
        alert(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
      alert('Failed to update user status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!isAdmin || !userToDelete) return;
    
    setActionLoading('delete');
    try {
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
        alert('User deleted successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  const exportUsers = async () => {
    if (!isAdmin) return;
    
    try {
      const response = await fetch('/api/admin/users/export', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Failed to export users');
      }
    } catch (error) {
      console.error('Failed to export users:', error);
      alert('Failed to export users');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && user.isActive) || 
      (selectedStatus === 'inactive' && !user.isActive) || 
      (selectedStatus === 'verified' && user.isEmailVerified) || 
      (selectedStatus === 'unverified' && !user.isEmailVerified);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  if (isLoading || loading) {
    return (
      <AdminLayout title="User Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout title="Access Denied">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400">You don't have permission to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>User Management - Travel Quench Admin</title>
      </Head>
      <AdminLayout title="User Management">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
                <button
                  onClick={() => fetchUsers(true)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          </div>

          {/* Action Bar */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
                >
                  <option value="all">All Roles</option>
                  <option value="customer" className="bg-gray-800">Customer</option>
                  <option value="admin" className="bg-gray-800">Admin</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="active" className="bg-gray-800">Active</option>
                  <option value="inactive" className="bg-gray-800">Inactive</option>
                  <option value="verified" className="bg-gray-800">Email Verified</option>
                  <option value="unverified" className="bg-gray-800">Email Unverified</option>
                </select>
                <button
                  onClick={() => fetchUsers(true)}
                  disabled={actionLoading === 'refresh'}
                  className="p-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${actionLoading === 'refresh' ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
                <button
                  onClick={exportUsers}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center">
                <UsersIcon className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Total Users</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Active Users</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.isActive).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center">
                <Crown className="h-8 w-8 text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Admins</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto md:overflow-x-auto">
              <table className="min-w-full md:table block">
                <thead className="bg-white/5 hidden md:table-header-group">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role & Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="md:divide-y md:divide-white/10">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="bg-white/5 block md:table-row rounded-lg md:rounded-none mb-4 md:mb-0 hover:bg-white/10 transition-colors">
                      <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider" data-label="User">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold">
                            {user.profileImage ? (
                              <img src={user.profileImage} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                              user.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white flex items-center">
                              {user.name}
                              {user.role === 'admin' && (
                                <Crown className="h-4 w-4 ml-2 text-yellow-400" />
                              )}
                              {user.isEmailVerified && (
                                <UserCheck className="h-4 w-4 ml-2 text-green-400" />
                              )}
                            </div>
                            <div className="text-sm text-gray-400">ID: {user.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider" data-label="Contact">
                        <div className="text-sm">
                          <div className="flex items-center text-white mb-1">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center text-gray-300">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider" data-label="Role & Status">
                        <div className="flex flex-col space-y-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            <Shield className="h-3 w-3 mr-1" />
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.isActive)}`}>
                            {user.isActive ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider text-sm text-gray-300" data-label="Joined">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        {user.lastLoginAt && (
                          <div className="text-xs text-gray-400 mt-1">
                            Last: {new Date(user.lastLoginAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="block md:table-cell px-6 py-2 md:py-4 text-left before:content-[attr(data-label)] before:block md:before:hidden before:font-medium before:text-gray-300 before:uppercase before:text-xs before:tracking-wider text-sm font-medium" data-label="Actions">
                        <div className="flex items-center space-x-2 justify-start md:justify-start">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-400/20 rounded"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setEditUserData(user);
                              setShowEditModal(true);
                            }}
                            className="text-green-400 hover:text-green-300 p-1 hover:bg-green-400/20 rounded"
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusToggle(user.id, user.isActive)}
                            disabled={actionLoading === `status-${user.id}`}
                            className={`p-1 rounded ${user.isActive ? 'text-red-400 hover:text-red-300 hover:bg-red-400/20' : 'text-green-400 hover:text-green-300 hover:bg-green-400/20'}`}
                            title={user.isActive ? 'Deactivate User' : 'Activate User'}
                          >
                            {actionLoading === `status-${user.id}` ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : user.isActive ? (
                              <Ban className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setUserToDelete(user);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-400 hover:text-red-300 p-1 hover:bg-red-400/20 rounded"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search criteria'
                  : 'No users have registered yet'}
              </p>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Create New User</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={createUserData.name}
                    onChange={(e) => setCreateUserData({...createUserData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={createUserData.email}
                    onChange={(e) => setCreateUserData({...createUserData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={createUserData.phone}
                    onChange={(e) => setCreateUserData({...createUserData, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    value={createUserData.role}
                    onChange={(e) => setCreateUserData({...createUserData, role: e.target.value as 'customer' | 'admin'})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={createUserData.password}
                    onChange={(e) => setCreateUserData({...createUserData, password: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    minLength={6}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === 'create'}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {actionLoading === 'create' ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Create User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Edit User</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleEditUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={editUserData.name || ''}
                    onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editUserData.email || ''}
                    onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editUserData.phone || ''}
                    onChange={(e) => setEditUserData({...editUserData, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    value={editUserData.role || 'customer'}
                    onChange={(e) => setEditUserData({...editUserData, role: e.target.value as 'customer' | 'admin'})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading === 'edit'}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {actionLoading === 'edit' ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Update User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View User Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white text-xl font-semibold">
                    {selectedUser.profileImage ? (
                      <img src={selectedUser.profileImage} alt={selectedUser.name} className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      selectedUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white flex items-center">
                      {selectedUser.name}
                      {selectedUser.role === 'admin' && (
                        <Crown className="h-5 w-5 ml-2 text-yellow-400" />
                      )}
                    </h4>
                    <p className="text-gray-300">{selectedUser.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedUser.isActive)}`}>
                        {selectedUser.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {selectedUser.isEmailVerified && (
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Contact Information</h5>
                    <div className="space-y-2">
                      <div className="flex items-center text-white">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {selectedUser.email}
                      </div>
                      {selectedUser.phone && (
                        <div className="flex items-center text-white">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {selectedUser.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Account Information</h5>
                    <div className="space-y-2">
                      <div className="text-white">
                        <span className="text-gray-400">User ID:</span> {selectedUser.id}
                      </div>
                      <div className="text-white">
                        <span className="text-gray-400">Joined:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </div>
                      {selectedUser.lastLoginAt && (
                        <div className="text-white">
                          <span className="text-gray-400">Last Login:</span> {new Date(selectedUser.lastLoginAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setShowUserModal(false);
                      setEditUserData(selectedUser);
                      setShowEditModal(true);
                    }}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </button>
                  <button
                    onClick={() => handleStatusToggle(selectedUser.id, selectedUser.isActive)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      selectedUser.isActive 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {selectedUser.isActive ? (
                      <>
                        <Ban className="h-4 w-4 mr-2" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && userToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete user <strong>{userToDelete.name}</strong>? 
                This action cannot be undone and will permanently remove all user data.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={actionLoading === 'delete'}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {actionLoading === 'delete' ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete User
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default UserManagement;