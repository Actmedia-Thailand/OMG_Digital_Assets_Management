"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Table3 from "@/components/table3";
import Table4 from "@/components/table4";
import Table5 from "@/components/table5";

const InventoryPage = () => {
	const [data, setData] = useState(null); // สร้าง state สำหรับเก็บข้อมูลสินค้า
	const [views, setViews] = useState([
		{
			name: "7777",
			filters: [{ id: "age", value: [10, 30] }],
			sorting: [],
			group: ["age"],
		},
		{
			name: "555",
			filters: [{ id: "gender", value: "Female" }],
			sorting: [],
			group: ["gender"],
		},
		// เพิ่ม views ตามโครงสร้างข้อมูล
	]);

	useEffect(() => {
		// จำลองข้อมูลสินค้าในคลัง
		const inventoryData = [
			{
				id: 1023,
				firstName: "ศราวุฒิ",
				lastName: "บุญชัย",
				gender: "Male",
				age: 31,
				jobTitle: "นักพัฒนาซอฟต์แวร์",
				salary: 62000,
				startDate: "2021-09-01",
				endDate: null,
				isActive: true,
				department: "Engineering",
				address: "123 Rama IX Rd",
				city: "Bangkok",
				country: "Thailand",
				email: "sarawut.b@example.com",
				phoneNumber: "555-1010",
				createdAt: "2021-09-01T08:30:00Z",
				updatedAt: "2023-02-11T14:45:00Z",
			},
			{
				id: 2021,
				firstName: "อรทัย",
				lastName: "โชติชัย",
				gender: "Female",
				age: 29,
				jobTitle: "นักบัญชี",
				salary: 54000,
				startDate: "2020-11-01",
				endDate: null,
				isActive: true,
				department: "Accounting",
				address: "456 Sukhumvit Rd",
				city: "Bangkok",
				country: "Thailand",
				email: "orathai.c@example.com",
				phoneNumber: "555-2020",
				createdAt: "2020-11-01T08:00:00Z",
				updatedAt: "2023-01-20T11:30:00Z",
			},
			{
				id: 3054,
				firstName: "ชาญชัย",
				lastName: "พูนทรัพย์",
				gender: "Male",
				age: 34,
				jobTitle: "นักวิเคราะห์ระบบ",
				salary: 78000,
				startDate: "2019-06-15",
				endDate: null,
				isActive: true,
				department: "IT",
				address: "789 Phahonyothin Rd",
				city: "Chiang Mai",
				country: "Thailand",
				email: "chanchai.p@example.com",
				phoneNumber: "555-3030",
				createdAt: "2019-06-15T09:15:00Z",
				updatedAt: "2023-02-01T13:45:00Z",
			},
			{
				id: 4129,
				firstName: "กมลวรรณ",
				lastName: "รัตนพันธ์",
				gender: "Female",
				age: 26,
				jobTitle: "เจ้าหน้าที่ฝ่ายบุคคล",
				salary: 48000,
				startDate: "2022-04-10",
				endDate: null,
				isActive: true,
				department: "HR",
				address: "321 Silom Rd",
				city: "Phuket",
				country: "Thailand",
				email: "kamonwan.r@example.com",
				phoneNumber: "555-4040",
				createdAt: "2022-04-10T10:00:00Z",
				updatedAt: "2023-04-15T15:30:00Z",
			},
			{
				id: 5267,
				firstName: "สุวรรณ",
				lastName: "ชัยโย",
				gender: "Male",
				age: 42,
				jobTitle: "ผู้จัดการฝ่ายขาย",
				salary: 95000,
				startDate: "2018-08-20",
				endDate: null,
				isActive: true,
				department: "Sales",
				address: "654 Lardprao Rd",
				city: "Bangkok",
				country: "Thailand",
				email: "suwan.c@example.com",
				phoneNumber: "555-5050",
				createdAt: "2018-08-20T07:30:00Z",
				updatedAt: "2023-03-12T13:00:00Z",
			},
			{
				id: 6378,
				firstName: "นิภา",
				lastName: "รุ่งฟ้า",
				gender: "Female",
				age: 37,
				jobTitle: "นักวิเคราะห์ข้อมูล",
				salary: 86000,
				startDate: "2021-01-05",
				endDate: null,
				isActive: true,
				department: "Data",
				address: "789 Ratchadaphisek Rd",
				city: "Nonthaburi",
				country: "Thailand",
				email: "nipa.r@example.com",
				phoneNumber: "555-6060",
				createdAt: "2021-01-05T08:15:00Z",
				updatedAt: "2023-05-10T16:00:00Z",
			},
			{
				id: 7489,
				firstName: "ปรัชญา",
				lastName: "พรหมรักษา",
				gender: "Male",
				age: 39,
				jobTitle: "วิศวกรเครือข่าย",
				salary: 87000,
				startDate: "2019-02-25",
				endDate: null,
				isActive: true,
				department: "IT",
				address: "654 Phayathai Rd",
				city: "Bangkok",
				country: "Thailand",
				email: "pratya.p@example.com",
				phoneNumber: "555-7070",
				createdAt: "2019-02-25T09:00:00Z",
				updatedAt: "2023-02-10T12:30:00Z",
			},
			{
				id: 8541,
				firstName: "ปรียาภรณ์",
				lastName: "ธรรมชาติ",
				gender: "Female",
				age: 24,
				jobTitle: "นักออกแบบ UX/UI",
				salary: 61000,
				startDate: "2022-09-05",
				endDate: null,
				isActive: true,
				department: "Design",
				address: "123 Sathorn Rd",
				city: "Bangkok",
				country: "Thailand",
				email: "preeyaporn.t@example.com",
				phoneNumber: "555-8080",
				createdAt: "2022-09-05T08:45:00Z",
				updatedAt: "2023-04-01T15:00:00Z",
			},
			{
				id: 9624,
				firstName: "ธนกร",
				lastName: "วัฒนวงศ์",
				gender: "Male",
				age: 27,
				jobTitle: "นักพัฒนา Backend",
				salary: 67000,
				startDate: "2021-03-18",
				endDate: null,
				isActive: true,
				department: "Engineering",
				address: "246 Petchaburi Rd",
				city: "Chiang Rai",
				country: "Thailand",
				email: "tanakorn.w@example.com",
				phoneNumber: "555-9090",
				createdAt: "2021-03-18T09:30:00Z",
				updatedAt: "2023-03-10T14:15:00Z",
			},
			{
				id: 1078,
				firstName: "บุญเลิศ",
				lastName: "ไพศาล",
				gender: "Male",
				age: 44,
				jobTitle: "ผู้บริหารฝ่ายการเงิน",
				salary: 135000,
				startDate: "2017-07-15",
				endDate: null,
				isActive: true,
				department: "Finance",
				address: "789 Ladprao Rd",
				city: "Bangkok",
				country: "Thailand",
				email: "boonlert.p@example.com",
				phoneNumber: "555-1111",
				createdAt: "2017-07-15T07:00:00Z",
				updatedAt: "2023-02-05T13:45:00Z",
			},
			{
				id: 1999,
				firstName: "สมชาย",
				lastName: "ดอกไม้",
				gender: "Male",
				age: 28,
				jobTitle: "วิศวกรซอฟต์แวร์",
				salary: 60000,
				startDate: "2022-01-15",
				endDate: "2023-05-20",
				isActive: true,
				department: "Engineering",
				address: "123 Main St",
				city: "Bangkok",
				country: "Thailand",
				email: "somchai.dokmai@example.com",
				phoneNumber: "555-1234",
				createdAt: "2022-01-15T08:30:00Z",
				updatedAt: "2023-01-10T14:45:00Z",
			},
			{
				id: 2000,
				firstName: "สมศักดิ์",
				lastName: "รุ่งเรือง",
				gender: "Male",
				age: 22,
				jobTitle: "ผู้จัดการผลิตภัณฑ์",
				salary: 75000,
				startDate: "2021-05-01",
				endDate: "2022-12-31",
				isActive: false,
				department: "Product",
				address: "456 Elm St",
				city: "Bangkok",
				country: "Thailand",
				email: "somsak.rung@example.com",
				phoneNumber: "555-5678",
				createdAt: "2021-05-01T09:15:00Z",
				updatedAt: "2022-12-20T16:00:00Z",
			},
			{
				id: 3003,
				firstName: "อรวรรณ",
				lastName: "สกุลทอง",
				gender: "Female",
				age: 35,
				jobTitle: "นักออกแบบ",
				salary: 50000,
				startDate: "2020-08-01",
				endDate: "2022-02-28",
				isActive: false,
				department: "Design",
				address: "789 Oak St",
				city: "Chiang Mai",
				country: "Thailand",
				email: "orawan.gold@example.com",
				phoneNumber: "555-9101",
				createdAt: "2020-08-01T10:00:00Z",
				updatedAt: "2022-02-15T11:30:00Z",
			},
			{
				id: 4444,
				firstName: "ปิยะ",
				lastName: "ทรัพย์สมบูรณ์",
				gender: "Male",
				age: 30,
				jobTitle: "ผู้เชี่ยวชาญฝ่ายบุคคล",
				salary: 45000,
				startDate: "2019-10-10",
				endDate: null,
				isActive: true,
				department: "HR",
				address: "135 Maple St",
				city: "Phuket",
				country: "Thailand",
				email: "piya.sab@example.com",
				phoneNumber: "555-2323",
				createdAt: "2019-10-10T14:00:00Z",
				updatedAt: "2023-02-01T09:00:00Z",
			},
			{
				id: 5755,
				firstName: "กานต์",
				lastName: "ศิริสุข",
				gender: "Female",
				age: 40,
				jobTitle: "CEO",
				salary: 150000,
				startDate: "2018-01-01",
				endDate: null,
				isActive: true,
				department: "Executive",
				address: "246 Pine St",
				city: "Bangkok",
				country: "Thailand",
				email: "kan.sirisuk@example.com",
				phoneNumber: "555-3434",
				createdAt: "2018-01-01T07:00:00Z",
				updatedAt: "2023-03-05T12:15:00Z",
			},
			{
				id: 6656,
				firstName: "วราภรณ์",
				lastName: "กาญจนพงษ์",
				gender: "Female",
				age: 29,
				jobTitle: "วิศวกรทดสอบ",
				salary: 55000,
				startDate: "2021-04-15",
				endDate: null,
				isActive: true,
				department: "Quality Assurance",
				address: "357 Cedar St",
				city: "Khon Kaen",
				country: "Thailand",
				email: "waraporn.k@example.com",
				phoneNumber: "555-4545",
				createdAt: "2021-04-15T08:45:00Z",
				updatedAt: "2023-02-20T14:30:00Z",
			},
			{
				id: 3017,
				firstName: "ปริญญา",
				lastName: "มงคลทรัพย์",
				gender: "Male",
				age: 33,
				jobTitle: "วิศวกร DevOps",
				salary: 80000,
				startDate: "2020-11-20",
				endDate: null,
				isActive: true,
				department: "DevOps",
				address: "468 Spruce St",
				city: "Udon Thani",
				country: "Thailand",
				email: "parinya.mongkol@example.com",
				phoneNumber: "555-5656",
				createdAt: "2020-11-20T11:00:00Z",
				updatedAt: "2023-04-01T13:45:00Z",
			},
			{
				id: 8999,
				firstName: "วารุณี",
				lastName: "พงศ์ชูศักดิ์",
				gender: "Female",
				age: 26,
				jobTitle: "ผู้จัดการการตลาด",
				salary: 70000,
				startDate: "2019-06-05",
				endDate: null,
				isActive: true,
				department: "Marketing",
				address: "579 Birch St",
				city: "Nakhon Pathom",
				country: "Thailand",
				email: "warunee.p@example.com",
				phoneNumber: "555-6767",
				createdAt: "2019-06-05T10:30:00Z",
				updatedAt: "2023-03-10T15:00:00Z",
			},
			{
				id: 9999,
				firstName: "วัฒนชัย",
				lastName: "สิงห์สุภา",
				gender: "Male",
				age: 37,
				jobTitle: "นักวิทยาศาสตร์ข้อมูล",
				salary: 90000,
				startDate: "2022-02-10",
				endDate: null,
				isActive: true,
				department: "Data",
				address: "680 Willow St",
				city: "Hat Yai",
				country: "Thailand",
				email: "wattana.s@example.com",
				phoneNumber: "555-7878",
				createdAt: "2022-02-10T09:30:00Z",
				updatedAt: "2023-04-20T11:00:00Z",
			},
			{
				id: 2010,
				firstName: "สุชาดา",
				lastName: "คงสมบูรณ์",
				gender: "Female",
				age: 27,
				jobTitle: "นักพัฒนา Frontend",
				salary: 65000,
				startDate: "2021-07-15",
				endDate: null,
				isActive: true,
				department: "Engineering",
				address: "791 Ash St",
				city: "Chiang Rai",
				country: "Thailand",
				email: "suchada.k@example.com",
				phoneNumber: "555-8989",
				createdAt: "2021-07-15T08:00:00Z",
				updatedAt: "2023-04-10T12:30:00Z",
			},
			{
				id: 1111,
				firstName: "John",
				lastName: "Doe",
				gender: "Male",
				age: 28,
				jobTitle: "Software Engineer",
				salary: 60000,
				startDate: "2022-01-15",
				endDate: "2023-05-20",
				isActive: true,
				department: "Engineering",
				address: "123 Main St",
				city: "New York",
				country: "USA",
				email: "john.doe@example.com",
				phoneNumber: "555-1234",
				createdAt: "2022-01-15T08:30:00Z",
				updatedAt: "2023-01-10T14:45:00Z",
			},
			{
				id: 2101,
				firstName: "Jane",
				lastName: "Smith",
				gender: "Female",
				age: 22,
				jobTitle: "Product Manager",
				salary: 75000,
				startDate: "2021-05-01",
				endDate: "2022-12-31",
				isActive: false,
				department: "Product",
				address: "456 Elm St",
				city: "San Francisco",
				country: "USA",
				email: "jane.smith@example.com",
				phoneNumber: "555-5678",
				createdAt: "2021-05-01T09:15:00Z",
				updatedAt: "2022-12-20T16:00:00Z",
			},
			{
				id: 1003,
				firstName: "Alex",
				lastName: "Johnson",
				gender: "Other",
				age: 35,
				jobTitle: "Designer",
				salary: 50000,
				startDate: "2020-08-01",
				endDate: "2022-02-28",
				isActive: false,
				department: "Design",
				address: "789 Oak St",
				city: "Chicago",
				country: "USA",
				email: "alex.johnson@example.com",
				phoneNumber: "555-9101",
				createdAt: "2020-08-01T10:00:00Z",
				updatedAt: "2022-02-15T11:30:00Z",
			},
			{
				id: 3200,
				firstName: "Emily",
				lastName: "Davis",
				gender: "Female",
				age: 30,
				jobTitle: "HR Specialist",
				salary: 45000,
				startDate: "2019-10-10",
				endDate: null,
				isActive: true,
				department: "HR",
				address: "135 Maple St",
				city: "Boston",
				country: "USA",
				email: "emily.davis@example.com",
				phoneNumber: "555-2323",
				createdAt: "2019-10-10T14:00:00Z",
				updatedAt: "2023-02-01T09:00:00Z",
			},
			{
				id: 5242,
				firstName: "Michael",
				lastName: "Brown",
				gender: "Male",
				age: 40,
				jobTitle: "CEO",
				salary: 150000,
				startDate: "2018-01-01",
				endDate: null,
				isActive: true,
				department: "Executive",
				address: "246 Pine St",
				city: "Seattle",
				country: "USA",
				email: "michael.brown@example.com",
				phoneNumber: "555-3434",
				createdAt: "2018-01-01T07:00:00Z",
				updatedAt: "2023-03-05T12:15:00Z",
			},
			{
				id: 6001,
				firstName: "Sara",
				lastName: "White",
				gender: "Female",
				age: 29,
				jobTitle: "QA Engineer",
				salary: 55000,
				startDate: "2021-04-15",
				endDate: null,
				isActive: true,
				department: "Quality Assurance",
				address: "357 Cedar St",
				city: "Los Angeles",
				country: "USA",
				email: "sara.white@example.com",
				phoneNumber: "555-4545",
				createdAt: "2021-04-15T08:45:00Z",
				updatedAt: "2023-02-20T14:30:00Z",
			},
			{
				id: 3217,
				firstName: "Robert",
				lastName: "Green",
				gender: "Male",
				age: 33,
				jobTitle: "DevOps Engineer",
				salary: 80000,
				startDate: "2020-11-20",
				endDate: null,
				isActive: true,
				department: "DevOps",
				address: "468 Spruce St",
				city: "Denver",
				country: "USA",
				email: "robert.green@example.com",
				phoneNumber: "555-5656",
				createdAt: "2020-11-20T11:00:00Z",
				updatedAt: "2023-04-01T13:45:00Z",
			},
			{
				id: 8421,
				firstName: "Laura",
				lastName: "King",
				gender: "Female",
				age: 26,
				jobTitle: "Marketing Manager",
				salary: 70000,
				startDate: "2019-06-05",
				endDate: null,
				isActive: true,
				department: "Marketing",
				address: "579 Birch St",
				city: "Austin",
				country: "USA",
				email: "laura.king@example.com",
				phoneNumber: "555-6767",
				createdAt: "2019-06-05T10:30:00Z",
				updatedAt: "2023-03-10T15:00:00Z",
			},
			{
				id: 9121,
				firstName: "James",
				lastName: "Wilson",
				gender: "Male",
				age: 37,
				jobTitle: "Data Scientist",
				salary: 90000,
				startDate: "2022-02-10",
				endDate: null,
				isActive: true,
				department: "Data",
				address: "680 Willow St",
				city: "San Diego",
				country: "USA",
				email: "james.wilson@example.com",
				phoneNumber: "555-7878",
				createdAt: "2022-02-10T09:30:00Z",
				updatedAt: "2023-04-20T11:00:00Z",
			},
			{
				id: 3232,
				firstName: "Sophia",
				lastName: "Taylor",
				gender: "Female",
				age: 27,
				jobTitle: "Frontend Developer",
				salary: 65000,
				startDate: "2021-07-15",
				endDate: null,
				isActive: true,
				department: "Engineering",
				address: "791 Ash St",
				city: "Portland",
				country: "USA",
				email: "sophia.taylor@example.com",
				phoneNumber: "555-8989",
				createdAt: "2021-07-15T08:00:00Z",
				updatedAt: "2023-04-10T12:30:00Z",
			},
		];
		setData(inventoryData); // เซ็ตข้อมูลเมื่อโหลดเสร็จ
	}, []);

	// กรณีข้อมูลยังไม่ถูกโหลด
	if (!data) {
		return <Loader />;
	}

	const columns = [
		{ accessorKey: "id", header: "ID" },
		{ accessorKey: "firstName", header: "First Name" },
		{ accessorKey: "lastName", header: "Last Name" },
		{
			accessorKey: "gender",
			header: "Gender",
			filterFn: "equals",
			filterSelectOptions: ["Male", "Female", "Other"],
			filterVariant: "select",
		},
		{ accessorKey: "age", header: "Age", filterVariant: "range" },
		{ accessorKey: "jobTitle", header: "Job Title" },
		{ accessorKey: "salary", header: "Salary", filterVariant: "range" },
		{ accessorKey: "startDate", header: "Start Date" },
		{ accessorKey: "endDate", header: "End Date" },
		{
			accessorKey: "isActive",
			header: "Active",
			filterVariant: "select",
			filterSelectOptions: ["true", "false"],
		},
		{ accessorKey: "department", header: "Department" },
		{ accessorKey: "address", header: "Address" },
		{ accessorKey: "city", header: "City" },
		{ accessorKey: "country", header: "Country" },
		{ accessorKey: "email", header: "Email" },
		{ accessorKey: "phoneNumber", header: "Phone Number" },
		{
			accessorKey: "createdAt",
			header: "Created At",
			filterVariant: "date-range",
		},
		{
			accessorKey: "updatedAt",
			header: "Updated At",
			filterVariant: "date-range",
		},
	];

	// แสดงข้อมูลเมื่อโหลดสำเร็จ
	return (
		<div className="d-flex flex-column">
			<div style={{ height: "100px" }}></div> {/* สำหรับความสูงเต็มหน้าจอ */}
			<Table5 data={data} columns={columns} views={views} setViews={setViews} />
		</div>
	);
};

export default InventoryPage;
