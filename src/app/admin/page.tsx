import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// This would typically come from an API call
const adminData = {
  users: [
    { id: "1", name: "Jane Doe", email: "jane@example.com", status: "Active" },
    {
      id: "2",
      name: "John Smith",
      email: "john@example.com",
      status: "Inactive",
    },
  ],
  petitions: [
    {
      id: "1",
      title: "Save the Local Park",
      creator: "Jane Doe",
      status: "Active",
      signatures: 5000,
    },
    {
      id: "2",
      title: "Clean Energy Initiative",
      creator: "John Smith",
      status: "Under Review",
      signatures: 7500,
    },
  ],
  fundraisers: [
    {
      id: "1",
      title: "Community Center Renovation",
      creator: "Jane Doe",
      status: "Active",
      amountRaised: 50000,
    },
    {
      id: "2",
      title: "School Music Program",
      creator: "John Smith",
      status: "Completed",
      amountRaised: 25000,
    },
  ],
};

export default function AdminPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="petitions">Petitions</TabsTrigger>
          <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="petitions">
          <Card>
            <CardHeader>
              <CardTitle>Petition Management</CardTitle>
              <CardDescription>Review and moderate petitions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Signatures</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.petitions.map((petition) => (
                    <TableRow key={petition.id}>
                      <TableCell>{petition.title}</TableCell>
                      <TableCell>{petition.creator}</TableCell>
                      <TableCell>{petition.status}</TableCell>
                      <TableCell>{petition.signatures}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          Moderate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fundraisers">
          <Card>
            <CardHeader>
              <CardTitle>Fundraiser Management</CardTitle>
              <CardDescription>
                Monitor and manage fundraising campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount Raised</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminData.fundraisers.map((fundraiser) => (
                    <TableRow key={fundraiser.id}>
                      <TableCell>{fundraiser.title}</TableCell>
                      <TableCell>{fundraiser.creator}</TableCell>
                      <TableCell>{fundraiser.status}</TableCell>
                      <TableCell>
                        ${fundraiser.amountRaised.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          Moderate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
