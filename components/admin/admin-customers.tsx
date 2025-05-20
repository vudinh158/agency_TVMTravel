"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Eye, Edit, Trash, Mail } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

// Mock data for customers
const mockCustomers = [
  {
    id: "C12345",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    registrationDate: "2023-01-15",
    bookingsCount: 3,
    totalSpent: 2895,
    status: "active",
  },
  {
    id: "C12346",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Park Ave, Los Angeles, CA 90001",
    registrationDate: "2023-02-20",
    bookingsCount: 2,
    totalSpent: 2198,
    status: "active",
  },
  {
    id: "C12347",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Oak St, Chicago, IL 60007",
    registrationDate: "2023-03-10",
    bookingsCount: 1,
    totalSpent: 899,
    status: "active",
  },
  {
    id: "C12348",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Pine St, Miami, FL 33101",
    registrationDate: "2023-04-05",
    bookingsCount: 4,
    totalSpent: 4590,
    status: "active",
  },
  {
    id: "C12349",
    name: "Robert Brown",
    email: "robert.b@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple St, Seattle, WA 98101",
    registrationDate: "2023-05-12",
    bookingsCount: 0,
    totalSpent: 0,
    status: "inactive",
  },
]

export default function AdminCustomers() {
  const { toast } = useToast()
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      setCustomers(customers.filter((customer) => customer.id !== customerId))
      toast({
        title: "Customer deleted",
        description: `Customer ${customerId} has been deleted.`,
      })
    }
  }

  const handleToggleStatus = (customerId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              status: newStatus,
            }
          : customer,
      ),
    )
    toast({
      title: `Customer ${newStatus === "active" ? "activated" : "deactivated"}`,
      description: `Customer ${customerId} has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>Export Customers</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.email}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(customer.registrationDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{customer.bookingsCount}</TableCell>
                  <TableCell>${customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(customer.id, customer.status)}>
                          {customer.status === "active" ? (
                            <>
                              <Trash className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteCustomer(customer.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
