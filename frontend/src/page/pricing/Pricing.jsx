import React, { useState, useEffect } from "react";
import {
  Card,
  Radio,
  Input,
  InputNumber,
  Table,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Form,
  Typography,
  Spin,
} from "antd";
import dayjs from "dayjs";
import mentorApi from "../../apiManager/mentor";
import toast from "react-hot-toast";

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Simulated Auth Hook
const useAuthType = () => {
  const [authType, setAuthType] = useState(null); // "mentor" | "student" | null
  return { authType, setAuthType };
};

// Mentor subscription plans
const mentorPlans = [
  { name: "Starter", features: ["List profile", "Accept basic bookings"], price: 500 },
  { name: "Professional", features: ["Advanced profile", "Premium analytics", "Priority listing", "Featured in search"], price: 1500 },
  { name: "Elite", features: ["Featured listing", "Unlimited bookings", "Branding tools"], price: 3000 },
];

// Student pricing options
const userPricingOptions = [
  { type: "Quick Doubt", description: "Text answer, up to 15 minutes on basic topics", price: "₹150 - ₹350" },
  { type: "Standard Session", description: "1-on-1 call: choose mentor, topic, session length", price: "₹500 - ₹2500" },
  { type: "Expert Session", description: "Multi-session, tough topic, top mentor", price: "₹2000 - ₹5000" },
  { type: "Topic Pack", description: "Pre-paid package for specific subjects or exam prep", price: "₹2500 - ₹6000" },
];

// Table column definitions
const mentorSubscriptionColumns = [
  { title: "Plan Name", dataIndex: "name", key: "name", align: "center" },
  {
    title: "Features",
    dataIndex: "features",
    key: "features",
    align: "center",
    render: (features) => (
      <ul className="pl-0 list-disc text-left">
        {features.map((f, i) => (
          <li key={i} className="text-sm md:text-base">{f}</li>
        ))}
      </ul>
    ),
  },
  { title: "Price / Month", dataIndex: "price", key: "price", align: "center", render: (price) => <b>₹{price}</b> },
];

const userPricingColumns = [
  { title: "Type", dataIndex: "type", key: "type", align: "center" },
  { title: "Description", dataIndex: "description", key: "description", align: "center", render: (desc) => <span className="text-sm md:text-base">{desc}</span> },
  { title: "Price", dataIndex: "price", key: "price", align: "center", render: (price) => <b>{price}</b> },
];

// Session pricing models for students
const pricingModels = [
  { value: "hourly", label: "Hourly Rate" },
  { value: "package", label: "Package Deal" },
  { value: "subscription", label: "Subscription Plan" },
];

const Pricing = () => {
  const { authType, setAuthType } = useAuthType();

  const [pricingType, setPricingType] = useState("hourly");
  const [hourlyRate, setHourlyRate] = useState(1000);
  const [packageSessions, setPackageSessions] = useState(5);
  const [packagePrice, setPackagePrice] = useState(4000);
  const [subscriptionPrice, setSubscriptionPrice] = useState(3500);

  const [mentors, setMentors] = useState([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [form] = Form.useForm();
  const platformFeePercent = 15;
  const minPlatformFee = 150;

  const calculatePlatformFee = (price) => Math.max(price * (platformFeePercent / 100), minPlatformFee);
  const calculateTotal = (price) => price + calculatePlatformFee(price);

  const fetchMentors = async () => {
    setLoadingMentors(true);
    try {
      const res = await mentorApi.getAllMentors();
      setMentors(res.data.mentors || []);
    } catch (err) {
      toast.error("Failed to load mentors");
    } finally {
      setLoadingMentors(false);
    }
  };

  useEffect(() => {
    if (authType === "student") fetchMentors();
  }, [authType]);

  const sessionPricing = [
    { key: "hourly", description: "Hourly Session", mentorRate: hourlyRate, platformFee: calculatePlatformFee(hourlyRate), totalCost: calculateTotal(hourlyRate) },
    { key: "package", description: `${packageSessions} Sessions Package`, mentorRate: packagePrice, platformFee: calculatePlatformFee(packagePrice), totalCost: calculateTotal(packagePrice) },
    { key: "subscription", description: "Monthly Subscription", mentorRate: subscriptionPrice, platformFee: 0, totalCost: subscriptionPrice },
  ];

  const handleBooking = async (values) => {
    setBookingLoading(true);
    try {
      toast.success("Booking successful!");
      form.resetFields();
    } catch (err) {
      toast.error("Failed to book session");
    } finally {
      setBookingLoading(false);
    }
  };

  const AuthBar = () => (
    <div className="flex justify-end mb-4 space-x-2">
      <Button size="small" className={authType === null ? "bg-blue-100" : ""} onClick={() => setAuthType(null)}>Explore</Button>
      <Button size="small" className={authType === "mentor" ? "bg-green-100" : ""} onClick={() => setAuthType("mentor")}>Mentor</Button>
      <Button size="small" className={authType === "student" ? "bg-yellow-100" : ""} onClick={() => setAuthType("student")}>Student</Button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-6 bg-gray-50 min-h-screen">
      <AuthBar />
      <Title level={2} className="text-center text-blue-700 text-2xl md:text-3xl font-bold mb-7">Mentor Platform Pricing</Title>

      {/* Not signed in */}
      {authType === null && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <Card title="Mentor Subscription Plans" className="w-full md:w-1/2 rounded-xl shadow-md p-4 md:p-8">
            <Table dataSource={mentorPlans} columns={mentorSubscriptionColumns} rowKey="name" pagination={false} />
          </Card>
          <Card title="User Doubt/Session Pricing" className="w-full md:w-1/2 rounded-xl shadow-md p-4 md:p-8">
            <Table dataSource={userPricingOptions} columns={userPricingColumns} rowKey="type" pagination={false} />
          </Card>
        </div>
      )}

      {/* Mentor logged in */}
      {authType === "mentor" && (
        <Card title="Mentor Subscription Plans" className="rounded-xl shadow-md p-4 md:p-8">
          <Table dataSource={mentorPlans} columns={mentorSubscriptionColumns} rowKey="name" pagination={false} />
          <Paragraph className="mt-4 text-gray-700">Subscribe to a mentor plan to unlock more features and increase booking potential!</Paragraph>
        </Card>
      )}

      {/* Student logged in */}
      {authType === "student" && (
        <Card title="Book a Session" className="rounded-xl shadow-md p-4 md:p-8">
          <Table dataSource={sessionPricing} columns={[
            { title: "Description", dataIndex: "description", key: "description", align: "center" },
            { title: "Mentor Rate (₹)", dataIndex: "mentorRate", key: "mentorRate", align: "center", render: (text) => <b>{text}</b> },
            { title: "Platform Fee (₹)", dataIndex: "platformFee", key: "platformFee", align: "center", render: (text) => <b>{text}</b> },
            { title: "Total Cost (₹)", dataIndex: "totalCost", key: "totalCost", align: "center", render: (text) => <b>{text}</b> },
          ]} rowKey="key" pagination={false} />

          <Paragraph className="mt-4 mb-4">Book a session with a mentor for your topic, date, time, and pricing plan.</Paragraph>

          {loadingMentors ? (
            <div className="flex justify-center py-6"><Spin size="large" /></div>
          ) : (
            <Form form={form} layout="vertical" onFinish={handleBooking} className="w-full">
              <Form.Item label="Select Mentor" name="mentorId" rules={[{ required: true }]}>
                <Select placeholder="Select a mentor">
                  {mentors.map((m) => <Option key={m._id} value={m._id}>{m.name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item label="Topic" name="topic" rules={[{ required: true }]}>
                <Input placeholder="Enter session topic" />
              </Form.Item>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="Preferred Date" name="date" rules={[{ required: true }]}>
                  <DatePicker className="w-full" disabledDate={(d) => d && d < dayjs().startOf("day")} />
                </Form.Item>
                <Form.Item label="Preferred Time" name="time" rules={[{ required: true }]}>
                  <TimePicker className="w-full" format="HH:mm" />
                </Form.Item>
              </div>
              <Form.Item label="Pricing Option" name="pricingOption" initialValue={pricingType}>
                <Radio.Group options={pricingModels} onChange={(e) => setPricingType(e.target.value)} value={pricingType} />
              </Form.Item>
              {(pricingType === "package" || pricingType === "subscription") && (
                <Form.Item label={pricingType === "package" ? "Number of Sessions" : "Duration in Months"} name="quantity" initialValue={1}>
                  <InputNumber min={1} className="w-full" />
                </Form.Item>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={bookingLoading}>Book Now</Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      )}
    </div>
  );
};

export default Pricing;
