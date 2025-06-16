import { Form, Input } from 'antd';
import React from 'react';

const Form2 = () => {
    return (
        <div>
            <Form.Item
                name={["step2", "email"]}
                label={<span className="text-lg">Email</span>}
                rules={[
                    {
                        required: true,
                        message: "Please enter your email",
                    },
                    {
                        type: "email",
                        message: "The input is not valid email",
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input
                    size="large"
                    placeholder="Enter your email"
                    className=""
                />
            </Form.Item>
            <Form.Item
                name={["step2", "username"]}
                label={<span className="text-lg">Username</span>}
                rules={[
                    {
                        // required: true,
                        message: "Please enter your username",
                    }
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input
                    size="large"
                    placeholder="Enter your username"
                />
            </Form.Item>
        </div>
    );
};

export default Form2;