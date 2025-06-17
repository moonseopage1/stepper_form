// TODO: need to fix required validation
import { Form } from "antd";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import PropTypes from "prop-types";

const isQuillEmpty = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return !div.textContent?.trim();
};

const QuillFormItem = ({
    name,
    label,
    requiredMessage = "This field is required",
    ...rest
}) => {
    return (
        <Form.Item
            shouldUpdate={(prev, next) => prev[name] !== next[name]}
            noStyle
        >
            {({ getFieldValue, setFieldsValue }) => (
                <Form.Item
                    name={name}
                    label={<span className="text-lg">{label}</span>}
                    valuePropName="value"
                    trigger="onChange"
                    rules={[
                        {
                            validator: (_, value) =>
                                isQuillEmpty(value)
                                    ? Promise.reject(new Error(requiredMessage))
                                    : Promise.resolve(),
                        },
                    ]}
                >
                    <ReactQuill
                        theme="snow"
                        value={getFieldValue(name)}
                        onChange={(value) => {
                            setFieldsValue({ [name]: value });
                        }}
                        placeholder={`Write your ${label?.toLowerCase()}`}
                        {...rest}
                    />
                </Form.Item>
            )}
        </Form.Item>

        // <Form.Item
        //     name={name}
        //     label={<span className="text-lg">{label}</span>}
        //     rules={[
        //         {
        //             validator: (_, value) =>
        //                 isQuillEmpty(value)
        //                     ? Promise.reject(new Error(requiredMessage))
        //                     : Promise.resolve(),
        //         },
        //     ]}
        //     valuePropName="value"
        //     trigger="onChange"
        //     validateTrigger="onChange"
        //     labelCol={{ span: 24 }}
        //     wrapperCol={{ span: 24 }}
        // >
        //     <ReactQuill
        //         theme="snow"
        //         placeholder={`Write your ${label?.toLowerCase()}`}
        //         {...rest}
        //     />
        // </Form.Item>

    );
};

export default QuillFormItem;

QuillFormItem.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    requiredMessage: PropTypes.string,
};