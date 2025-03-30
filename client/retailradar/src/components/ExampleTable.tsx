import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const transactions = [
    {
      transactionId: "TXN001",
      customerId: "CUST001",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 123-456-7890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipcode: "10001",
      country: "USA",
      age: 30,
      gender: "Male",
      income: "$60,000",
      customerSegment: "Premium",
      date: "2024-03-15",
      year: 2024,
      month: "March",
      time: "14:30",
      totalPurchases: 5,
      amount: "$500.00",
      totalAmount: "$2500.00",
      productCategory: "Electronics",
      productBrand: "Apple",
      productType: "Laptop",
      feedback: "Excellent service",
      shippingMethod: "Express",
      paymentMethod: "Credit Card",
      orderStatus: "Delivered",
      ratings: 5,
      products: ["MacBook Pro"],
    },
    {
      transactionId: "TXN002",
      customerId: "CUST002",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "+1 987-654-3210",
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zipcode: "90001",
      country: "USA",
      age: 25,
      gender: "Female",
      income: "$50,000",
      customerSegment: "Standard",
      date: "2024-03-16",
      year: 2024,
      month: "March",
      time: "10:15",
      totalPurchases: 3,
      amount: "$200.00",
      totalAmount: "$600.00",
      productCategory: "Fashion",
      productBrand: "Nike",
      productType: "Shoes",
      feedback: "Good quality",
      shippingMethod: "Standard",
      paymentMethod: "PayPal",
      orderStatus: "Shipped",
      ratings: 4,
      products: ["Running Shoes"],
    },
    {
      transactionId: "TXN003",
      customerId: "CUST003",
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      phone: "+1 555-123-4567",
      address: "789 Oak St",
      city: "Chicago",
      state: "IL",
      zipcode: "60601",
      country: "USA",
      age: 40,
      gender: "Male",
      income: "$80,000",
      customerSegment: "VIP",
      date: "2024-03-17",
      year: 2024,
      month: "March",
      time: "18:45",
      totalPurchases: 7,
      amount: "$750.00",
      totalAmount: "$5250.00",
      productCategory: "Home Appliances",
      productBrand: "Samsung",
      productType: "Refrigerator",
      feedback: "Very efficient",
      shippingMethod: "Express",
      paymentMethod: "Bank Transfer",
      orderStatus: "Processing",
      ratings: 5,
      products: ["Double-Door Fridge"],
    }
  ];
  
  
  export function ExampleTable() {
    return (
      <Table>
        <TableCaption>Expected CSV format</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Zipcode</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Customer Segment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Total Purchases</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Product Category</TableHead>
                <TableHead>Product Brand</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Shipping Method</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Ratings</TableHead>
                <TableHead>Products</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {transactions.map((transaction) => (
        <TableRow key={transaction.transactionId}>
            <TableCell className="font-medium">{transaction.transactionId}</TableCell>
            <TableCell>{transaction.customerId}</TableCell>
            <TableCell>{transaction.name}</TableCell>
            <TableCell>{transaction.email}</TableCell>
            <TableCell>{transaction.phone}</TableCell>
            <TableCell>{transaction.address}</TableCell>
            <TableCell>{transaction.city}</TableCell>
            <TableCell>{transaction.state}</TableCell>
            <TableCell>{transaction.zipcode}</TableCell>
            <TableCell>{transaction.country}</TableCell>
            <TableCell>{transaction.age}</TableCell>
            <TableCell>{transaction.gender}</TableCell>
            <TableCell>{transaction.income}</TableCell>
            <TableCell>{transaction.customerSegment}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.year}</TableCell>
            <TableCell>{transaction.month}</TableCell>
            <TableCell>{transaction.time}</TableCell>
            <TableCell>{transaction.totalPurchases}</TableCell>
            <TableCell className="text-right">{transaction.amount}</TableCell>
            <TableCell className="text-right">{transaction.totalAmount}</TableCell>
            <TableCell>{transaction.productCategory}</TableCell>
            <TableCell>{transaction.productBrand}</TableCell>
            <TableCell>{transaction.productType}</TableCell>
            <TableCell>{transaction.feedback}</TableCell>
            <TableCell>{transaction.shippingMethod}</TableCell>
            <TableCell>{transaction.paymentMethod}</TableCell>
            <TableCell>{transaction.orderStatus}</TableCell>
            <TableCell>{transaction.ratings}</TableCell>
            <TableCell>{transaction.products.join(", ")}</TableCell>
        </TableRow>
        ))}
        </TableBody>
      </Table>
    )
  }
  