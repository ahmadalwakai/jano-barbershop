import { Badge, Table } from "@chakra-ui/react";

export type AdminBookingRow = {
  id: string;
  date: string;
  timeSlot: string;
  service: string;
  customerName: string;
  phone: string;
  paid: boolean;
};

export function AdminTable({ bookings }: { bookings: AdminBookingRow[] }) {
  return (
    <Table.Root variant="outline" size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Date</Table.ColumnHeader>
          <Table.ColumnHeader>Time</Table.ColumnHeader>
          <Table.ColumnHeader>Service</Table.ColumnHeader>
          <Table.ColumnHeader>Customer</Table.ColumnHeader>
          <Table.ColumnHeader>Phone</Table.ColumnHeader>
          <Table.ColumnHeader>Paid</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {bookings.map((booking) => (
          <Table.Row key={booking.id}>
            <Table.Cell>{booking.date}</Table.Cell>
            <Table.Cell>{booking.timeSlot}</Table.Cell>
            <Table.Cell>{booking.service}</Table.Cell>
            <Table.Cell>{booking.customerName}</Table.Cell>
            <Table.Cell>{booking.phone}</Table.Cell>
            <Table.Cell>
              <Badge colorPalette={booking.paid ? "green" : "yellow"}>{booking.paid ? "Paid" : "Pending"}</Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
