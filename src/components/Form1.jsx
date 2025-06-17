import { Form, Input } from 'antd';
import QuillFormItem from './QuilFromItem';

const Form1 = () => {
    return (
        <div>
            <Form.Item
                name={['step1', 'firstName']}
                label={<span className="text-lg">First Name</span>}
                rules={[
                    {
                        required: true,
                        message: "Please enter your first name",
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input
                    size="large"
                    placeholder="Enter your first name"
                    className=""
                />
            </Form.Item>
            <Form.Item
                name={['step1', 'lastName']}
                label={<span className="text-lg">Last Name</span>}
                rules={[
                    {
                        required: true,
                        message: "Please enter your last name",
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input
                    size="large"
                    placeholder="Enter your last name"
                    className=""
                />
            </Form.Item>
            {/* About  */}
            <QuillFormItem
                name={["step1", "about"]}
                label="About yourself"
                requiredMessage="Please write about yourself"
            />
        </div>
    );
};

export default Form1;