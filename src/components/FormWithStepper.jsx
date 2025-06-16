import { useState } from 'react';
import { Button, Form, Steps } from 'antd';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';
import toast from 'react-hot-toast';
import { IoCopyOutline } from "react-icons/io5";

const steps = [
    { id: 1, title: 'First', name: 'step1', content: <Form1 /> },
    { id: 2, title: 'Second', name: 'step2', content: <Form2 /> },
    { id: 3, title: 'Third', name: 'step3', content: <Form3 /> },
    { id: 4, title: 'Fourth', name: 'step4', content: <Form4 /> },
    { id: 5, title: 'Last', name: 'step5', content: <Form5 /> },
];

const FormWithStepper = () => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [formValues, setFormValues] = useState(null);

    const stepNames = ['step1', 'step2', 'step3', 'step4', 'step5'];

    const next = async () => {
        try {
            const allFields = form.getFieldsError();

            const currentStepFieldNames = allFields
                .map(field => field.name)
                .filter(namePath => namePath[0] === stepNames[current]);

            await form.validateFields(currentStepFieldNames);
            setCurrent(current + 1);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            toast.error('Please complete this step before continuing.');
        }
    };


    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = (values) => {
        const flatValues = Object.values(values).reduce((acc, stepGroup) => {
            return { ...acc, ...stepGroup };
        }, {});
        setFormValues(flatValues);
        toast.success('Form submitted successfully!');

        // ✅ Reset form fields and step state
        form.resetFields();
        setCurrent(0);
    };

    const items = steps.map(item => ({ key: item.title, title: item.title }));

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(formValues, null, 2));
        toast.success('Copied to clipboard!');
    };

    return (
        <>
            <Steps current={current} items={items} />

            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="p-4 space-y-6"
            >
                <div className='mt-6'>
                    {steps.map((step, index) => (
                        <div key={step.id} style={{ display: current === index ? 'block' : 'none' }}>
                            {step.content}
                        </div>
                    ))}

                </div>
                <div className="mt-6 flex gap-4">
                    {current > 0 && (
                        <Button onClick={prev}>Previous</Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    )}
                </div>
            </Form>
            {
                formValues && <div className='mt-6'>
                    <div className='bg-gray-100 p-4 flex gap-4 items-start justify-between'>
                        <pre>
                            <code>
                                {JSON.stringify(formValues, null, 2)}
                            </code>
                        </pre>
                        <button onClick={handleCopyToClipboard} title='Copy to clipboard' className='cursor-pointer hover:text-blue-500 transition delay-200 ease-in-out'>
                            <IoCopyOutline size={24} />
                        </button>
                    </div>
                </div>
            }

        </>
    );
};

export default FormWithStepper;
