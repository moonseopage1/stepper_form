import { DatePicker, Form } from 'antd';
import React from 'react';

const Form3 = () => {
    return (
        <div>
            <Form.Item
                name={["step3", "dateOfBirth"]}
                label={<span className="text-lg">Date of Birth</span>}
                rules={[
                    {
                        required: true,
                        message: "Please select your date of birth",
                    },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <DatePicker className="w-full" size="large" />
            </Form.Item>
        </div>
    );
};

export default Form3;