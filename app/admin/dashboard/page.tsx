'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	AlertTriangle,
	Building2,
	Calendar,
	Edit,
	Eye,
	Mail,
	MoreHorizontal,
	Search,
	Shield,
	Trash2,
	UserCheck,
	UserX,
	Users,
} from 'lucide-react';

import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Mock user data
const mockUsers = [
	{
		id: 'USR001',
		name: 'John Doe',
		email: 'john.doe@example.com',
		phone: '+234 801 234 5678',
		role: 'patient',
		status: 'active',
		joinDate: '2024-01-15',
		lastLogin: '2024-01-20',
		location: 'Lagos, Nigeria',
		avatar: '/placeholder.svg?height=40&width=40',
		verified: true,
		bookings: 5,
		totalSpent: 125000,
		centres: 0,
	},
	{
		id: 'USR002',
		name: 'Dr. Sarah Johnson',
		email: 'sarah.johnson@medcenter.com',
		phone: '+234 802 345 6789',
		role: 'centre_owner',
		status: 'pending',
		joinDate: '2024-01-18',
		lastLogin: '2024-01-19',
		location: 'Abuja, Nigeria',
		avatar: '/placeholder.svg?height=40&width=40',
		verified: false,
		bookings: 0,
		totalSpent: 0,
		centres: 1,
	},
	{
		id: 'USR003',
		name: 'Michael Chen',
		email: 'michael.chen@example.com',
		phone: '+234 803 456 7890',
		role: 'patient',
		status: 'suspended',
		joinDate: '2024-01-10',
		lastLogin: '2024-01-12',
		location: 'Port Harcourt, Nigeria',
		avatar: '/placeholder.svg?height=40&width=40',
		verified: true,
		bookings: 2,
		totalSpent: 45000,
		centres: 0,
	},
	{
		id: 'USR004',
		name: 'Admin User',
		email: 'admin@medidirect.com',
		phone: '+234 804 567 8901',
		role: 'admin',
		status: 'active',
		joinDate: '2023-12-01',
		lastLogin: '2024-01-21',
		location: 'Lagos, Nigeria',
		avatar: '/placeholder.svg?height=40&width=40',
		verified: true,
		bookings: 0,
		totalSpent: 0,
		centres: 0,
	},
];

export default function AdminUsersPage() {
	const [users, setUsers] = useState(mockUsers);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [roleFilter, setRoleFilter] = useState('all');
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [showUserDetails, setShowUserDetails] = useState(false);
	const [showBulkActions, setShowBulkActions] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

	const filteredUsers = users.filter(user => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.phone.includes(searchTerm);
		const matchesStatus =
			statusFilter === 'all' || user.status === statusFilter;
		const matchesRole = roleFilter === 'all' || user.role === roleFilter;

		return matchesSearch && matchesStatus && matchesRole;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'suspended':
				return 'bg-red-100 text-red-800';
			case 'inactive':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case 'admin':
				return 'bg-purple-100 text-purple-800';
			case 'centre_owner':
				return 'bg-blue-100 text-blue-800';
			case 'patient':
				return 'bg-green-100 text-green-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const handleApproveUser = (userId: string) => {
		setUsers(
			users.map(user =>
				user.id === userId ? { ...user, status: 'active' } : user
			)
		);
	};

	const handleSuspendUser = (userId: string) => {
		setUsers(
			users.map(user =>
				user.id === userId ? { ...user, status: 'suspended' } : user
			)
		);
	};

	const handleDeleteUser = (userId: string) => {
		setUsers(users.filter(user => user.id !== userId));
	};

	const handleSelectUser = (userId: string) => {
		setSelectedUsers(prev =>
			prev.includes(userId)
				? prev.filter(id => id !== userId)
				: [...prev, userId]
		);
	};

	const handleSelectAll = () => {
		if (selectedUsers.length === filteredUsers.length) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(filteredUsers.map(user => user.id));
		}
	};

	const handleBulkAction = (action: string) => {
		switch (action) {
			case 'approve':
				setUsers(
					users.map(user =>
						selectedUsers.includes(user.id)
							? { ...user, status: 'active' }
							: user
					)
				);
				break;
			case 'suspend':
				setUsers(
					users.map(user =>
						selectedUsers.includes(user.id)
							? { ...user, status: 'suspended' }
							: user
					)
				);
				break;
			case 'delete':
				setUsers(users.filter(user => !selectedUsers.includes(user.id)));
				break;
		}
		setSelectedUsers([]);
		setShowBulkActions(false);
	};

	const exportUsers = () => {
		const csvContent = [
			[
				'ID',
				'Name',
				'Email',
				'Phone',
				'Role',
				'Status',
				'Join Date',
				'Last Login',
			],
			...filteredUsers.map(user => [
				user.id,
				user.name,
				user.email,
				user.phone,
				user.role,
				user.status,
				user.joinDate,
				user.lastLogin,
			]),
		]
			.map(row => row.join(','))
			.join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'users-export.csv';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const stats = {
		total: users.length,
		active: users.filter(u => u.status === 'active').length,
		pending: users.filter(u => u.status === 'pending').length,
		suspended: users.filter(u => u.status === 'suspended').length,
		patients: users.filter(u => u.role === 'patient').length,
		centreOwners: users.filter(u => u.role === 'centre_owner').length,
		admins: users.filter(u => u.role === 'admin').length,
	};

	return (
		<div className='bg-gray-50 min-h-screen'>
			<Header />

			<div className='mx-auto px-4 py-8 container'>
				<div className='mb-8'>
					<h1 className='mb-2 font-bold text-gray-900 text-3xl'>
						User Management
					</h1>
					<p className='text-gray-600'>
						Manage all registered users and their permissions
					</p>
				</div>

				{/* Stats Cards */}
				<div className='gap-6 grid grid-cols-1 md:grid-cols-4 mb-8'>
					<Card>
						<CardContent className='p-6'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='font-medium text-gray-600 text-sm'>
										Total Users
									</p>
									<p className='font-bold text-gray-900 text-3xl'>
										{stats.total}
									</p>
								</div>
								<Users className='w-8 h-8 text-blue-500' />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='p-6'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='font-medium text-gray-600 text-sm'>
										Active Users
									</p>
									<p className='font-bold text-green-600 text-3xl'>
										{stats.active}
									</p>
								</div>
								<UserCheck className='w-8 h-8 text-green-500' />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='p-6'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='font-medium text-gray-600 text-sm'>
										Pending Approval
									</p>
									<p className='font-bold text-yellow-600 text-3xl'>
										{stats.pending}
									</p>
								</div>
								<AlertTriangle className='w-8 h-8 text-yellow-500' />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className='p-6'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='font-medium text-gray-600 text-sm'>
										Centre Owners
									</p>
									<p className='font-bold text-blue-600 text-3xl'>
										{stats.centreOwners}
									</p>
								</div>
								<Building2 className='w-8 h-8 text-blue-500' />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Filters and Actions */}
				<Card className='mb-6'>
					<CardContent className='p-6'>
						<div className='flex lg:flex-row flex-col justify-between items-center gap-4'>
							<div className='flex sm:flex-row flex-col flex-1 gap-4'>
								<div className='relative flex-1 max-w-md'>
									<Search className='top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform' />
									<Input
										placeholder='Search users...'
										value={searchTerm}
										onChange={e => setSearchTerm(e.target.value)}
										className='pl-10'
									/>
								</div>

								<Select
									value={statusFilter}
									onValueChange={setStatusFilter}>
									<SelectTrigger className='w-40'>
										<SelectValue placeholder='Status' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All Status</SelectItem>
										<SelectItem value='active'>Active</SelectItem>
										<SelectItem value='pending'>Pending</SelectItem>
										<SelectItem value='suspended'>Suspended</SelectItem>
										<SelectItem value='inactive'>Inactive</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='flex gap-2'>
								{selectedUsers.length > 0 && (
									<DropdownMenu
										open={showBulkActions}
										onOpenChange={setShowBulkActions}>
										<DropdownMenuTrigger asChild>
											<Button variant='outline'>
												Bulk Actions ({selectedUsers.length})
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem
												onClick={() => handleBulkAction('approve')}>
												<UserCheck className='mr-2 w-4 h-4' />
												Approve Selected
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => handleBulkAction('suspend')}>
												<UserX className='mr-2 w-4 h-4' />
												Suspend Selected
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												onClick={() => handleBulkAction('delete')}
												className='text-red-600'>
												<Trash2 className='mr-2 w-4 h-4' />
												Delete Selected
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Users Table */}
				<Card>
					<CardContent className='p-0'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='w-12'>
										<Checkbox
											checked={
												selectedUsers.length === filteredUsers.length &&
												filteredUsers.length > 0
											}
											onCheckedChange={handleSelectAll}
										/>
									</TableHead>
									<TableHead>User</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Join Date</TableHead>
									<TableHead>Last Login</TableHead>
									<TableHead>Activity</TableHead>
									<TableHead className='w-12'></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredUsers.map(user => (
									<TableRow key={user.id}>
										<TableCell>
											<Checkbox
												checked={selectedUsers.includes(user.id)}
												onCheckedChange={() => handleSelectUser(user.id)}
											/>
										</TableCell>
										<TableCell>
											<div className='flex items-center gap-3'>
												<Avatar className='w-10 h-10'>
													<AvatarImage
														src={user.avatar || '/placeholder.svg'}
														alt={user.name}
													/>
													<AvatarFallback>
														{user.name
															.split(' ')
															.map(n => n[0])
															.join('')}
													</AvatarFallback>
												</Avatar>
												<div>
													<div className='flex items-center gap-2'>
														<p className='font-medium'>{user.name}</p>
														{user.verified && (
															<Shield className='w-4 h-4 text-green-500' />
														)}
													</div>
													<p className='text-gray-600 text-sm'>{user.email}</p>
													<p className='text-gray-500 text-sm'>{user.phone}</p>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge className={getRoleColor(user.role)}>
												{user.role.replace('_', ' ')}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge className={getStatusColor(user.status)}>
												{user.status}
											</Badge>
										</TableCell>
										<TableCell className='text-gray-600 text-sm'>
											{user.joinDate}
										</TableCell>
										<TableCell className='text-gray-600 text-sm'>
											{user.lastLogin}
										</TableCell>
										<TableCell>
											<div className='text-sm'>
												{user.role === 'patient' && (
													<>
														<p>{user.bookings} bookings</p>
														<p className='text-gray-600'>
															₦{user.totalSpent.toLocaleString()}
														</p>
													</>
												)}
												{user.role === 'centre_owner' && (
													<p>
														{user.centres} centre{user.centres !== 1 ? 's' : ''}
													</p>
												)}
											</div>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='ghost'
														size='sm'>
														<MoreHorizontal className='w-4 h-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end'>
													<DropdownMenuItem
														onClick={() => {
															setSelectedUser(user);
															setShowUserDetails(true);
														}}>
														<Eye className='mr-2 w-4 h-4' />
														View Details
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Edit className='mr-2 w-4 h-4' />
														Edit User
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Mail className='mr-2 w-4 h-4' />
														Send Message
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													{user.status === 'pending' && (
														<DropdownMenuItem
															onClick={() => handleApproveUser(user.id)}>
															<UserCheck className='mr-2 w-4 h-4' />
															Approve User
														</DropdownMenuItem>
													)}
													{user.status === 'active' && (
														<DropdownMenuItem
															onClick={() => handleSuspendUser(user.id)}>
															<UserX className='mr-2 w-4 h-4' />
															Suspend User
														</DropdownMenuItem>
													)}
													<DropdownMenuItem
														onClick={() => handleDeleteUser(user.id)}
														className='text-red-600'>
														<Trash2 className='mr-2 w-4 h-4' />
														Delete User
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{filteredUsers.length === 0 && (
					<div className='py-12 text-center'>
						<Users className='mx-auto mb-4 w-12 h-12 text-gray-400' />
						<h3 className='mb-2 font-medium text-gray-900 text-lg'>
							No users found
						</h3>
						<p className='text-gray-600'>
							Try adjusting your search or filter criteria
						</p>
					</div>
				)}
			</div>

			{/* User Details Modal */}
			<Dialog
				open={showUserDetails}
				onOpenChange={setShowUserDetails}>
				<DialogContent className='sm:max-w-2xl'>
					<DialogHeader>
						<DialogTitle>User Details</DialogTitle>
					</DialogHeader>

					{selectedUser && (
						<Tabs
							defaultValue='profile'
							className='space-y-4'>
							<TabsList className='grid grid-cols-4 w-full'>
								<TabsTrigger value='profile'>Profile</TabsTrigger>
								<TabsTrigger value='activity'>Activity</TabsTrigger>
								<TabsTrigger value='security'>Security</TabsTrigger>
								<TabsTrigger value='actions'>Actions</TabsTrigger>
							</TabsList>

							<TabsContent
								value='profile'
								className='space-y-4'>
								<div className='flex items-center gap-4 p-4 border rounded-lg'>
									<Avatar className='w-16 h-16'>
										<AvatarImage
											src={selectedUser.avatar || '/placeholder.svg'}
											alt={selectedUser.name}
										/>
										<AvatarFallback>
											{selectedUser.name
												.split(' ')
												.map((n: string) => n[0])
												.join('')}
										</AvatarFallback>
									</Avatar>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-1'>
											<h3 className='font-semibold text-lg'>
												{selectedUser.name}
											</h3>
											{selectedUser.verified && (
												<Shield className='w-4 h-4 text-green-500' />
											)}
										</div>
										<p className='text-gray-600'>{selectedUser.email}</p>
										<div className='flex gap-2 mt-2'>
											<Badge className={getRoleColor(selectedUser.role)}>
												{selectedUser.role.replace('_', ' ')}
											</Badge>
											<Badge className={getStatusColor(selectedUser.status)}>
												{selectedUser.status}
											</Badge>
										</div>
									</div>
								</div>

								<div className='gap-4 grid grid-cols-2'>
									<div>
										<Label className='font-medium text-gray-600 text-sm'>
											Phone
										</Label>
										<p className='mt-1'>{selectedUser.phone}</p>
									</div>
									<div>
										<Label className='font-medium text-gray-600 text-sm'>
											Location
										</Label>
										<p className='mt-1'>{selectedUser.location}</p>
									</div>
									<div>
										<Label className='font-medium text-gray-600 text-sm'>
											Join Date
										</Label>
										<p className='mt-1'>{selectedUser.joinDate}</p>
									</div>
									<div>
										<Label className='font-medium text-gray-600 text-sm'>
											Last Login
										</Label>
										<p className='mt-1'>{selectedUser.lastLogin}</p>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value='activity'
								className='space-y-4'>
								<div className='gap-4 grid grid-cols-3'>
									<Card>
										<CardContent className='p-4 text-center'>
											<p className='font-bold text-blue-600 text-2xl'>
												{selectedUser.bookings}
											</p>
											<p className='text-gray-600 text-sm'>Total Bookings</p>
										</CardContent>
									</Card>
									<Card>
										<CardContent className='p-4 text-center'>
											<p className='font-bold text-green-600 text-2xl'>
												₦{selectedUser.totalSpent.toLocaleString()}
											</p>
											<p className='text-gray-600 text-sm'>Total Spent</p>
										</CardContent>
									</Card>
									<Card>
										<CardContent className='p-4 text-center'>
											<p className='font-bold text-purple-600 text-2xl'>
												{selectedUser.centres}
											</p>
											<p className='text-gray-600 text-sm'>Centres Owned</p>
										</CardContent>
									</Card>
								</div>

								<div className='space-y-3'>
									<h4 className='font-medium'>Recent Activity</h4>
									<div className='space-y-2'>
										<div className='flex items-center gap-3 p-3 border rounded-lg'>
											<Calendar className='w-4 h-4 text-blue-500' />
											<div className='flex-1'>
												<p className='font-medium text-sm'>Booked MRI Scan</p>
												<p className='text-gray-600 text-xs'>2 days ago</p>
											</div>
										</div>
										<div className='flex items-center gap-3 p-3 border rounded-lg'>
											<Users className='w-4 h-4 text-green-500' />
											<div className='flex-1'>
												<p className='font-medium text-sm'>Profile Updated</p>
												<p className='text-gray-600 text-xs'>1 week ago</p>
											</div>
										</div>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value='security'
								className='space-y-4'>
								<div className='space-y-4'>
									<div className='flex justify-between items-center p-4 border rounded-lg'>
										<div>
											<p className='font-medium'>Email Verified</p>
											<p className='text-gray-600 text-sm'>
												Email address has been verified
											</p>
										</div>
										<Badge className='bg-green-100 text-green-800'>
											Verified
										</Badge>
									</div>

									<div className='flex justify-between items-center p-4 border rounded-lg'>
										<div>
											<p className='font-medium'>Two-Factor Authentication</p>
											<p className='text-gray-600 text-sm'>
												Additional security layer
											</p>
										</div>
										<Badge variant='outline'>Disabled</Badge>
									</div>

									<div className='flex justify-between items-center p-4 border rounded-lg'>
										<div>
											<p className='font-medium'>Login Sessions</p>
											<p className='text-gray-600 text-sm'>
												Active login sessions
											</p>
										</div>
										<Badge className='bg-blue-100 text-blue-800'>
											2 Active
										</Badge>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value='actions'
								className='space-y-4'>
								<div className='space-y-3'>
									<Button
										variant='outline'
										className='justify-start bg-transparent w-full'>
										<Mail className='mr-2 w-4 h-4' />
										Send Email
									</Button>
									<Button
										variant='outline'
										className='justify-start bg-transparent w-full'>
										<Edit className='mr-2 w-4 h-4' />
										Edit Profile
									</Button>
									<Button
										variant='outline'
										className='justify-start bg-transparent w-full'>
										<Shield className='mr-2 w-4 h-4' />
										Reset Password
									</Button>

									{selectedUser.status === 'pending' && (
										<Button
											className='w-full'
											onClick={() => handleApproveUser(selectedUser.id)}>
											<UserCheck className='mr-2 w-4 h-4' />
											Approve User
										</Button>
									)}

									{selectedUser.status === 'active' && (
										<Button
											variant='destructive'
											className='w-full'
											onClick={() => handleSuspendUser(selectedUser.id)}>
											<UserX className='mr-2 w-4 h-4' />
											Suspend User
										</Button>
									)}

									<Button
										variant='destructive'
										className='w-full'
										onClick={() => handleDeleteUser(selectedUser.id)}>
										<Trash2 className='mr-2 w-4 h-4' />
										Delete User
									</Button>
								</div>
							</TabsContent>
						</Tabs>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
