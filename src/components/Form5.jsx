import { Form, Input } from 'antd';
import React from 'react';

const Form5 = () => {
    return (
        <div>
            <Form.Item
                name={["step5", "password"]}
                label={<span className="text-lg">Password</span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input.Password
                    size="large"
                    placeholder="Enter your password"
                />
            </Form.Item>
        </div>
    );
};

export default Form5;