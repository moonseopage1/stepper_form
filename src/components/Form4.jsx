import { Form, Input, Select } from 'antd';
const { Option } = Select;

const Form4 = () => {
    return (
        <div>
            <Form.Item
                name={["step4", "mobile"]}
                label={<span className="text-lg">Mobile Number</span>}
                rules={[
                    {
                        required: true,
                        message: "Mobile number is required",
                    }
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input size='large' placeholder='Enter your phone number' />
            </Form.Item>
        </div>
    );
};

export default Form4;