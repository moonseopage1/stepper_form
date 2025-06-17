import { Form } from "antd";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import PropTypes from "prop-types";

const isQuillEmpty = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return !div.textContent?.trim();
};

const QuillFormItem = ({
    name,
    label,
    requiredMessage,
    ...rest
}) => {
    return (
        <Form.Item
            name={name}
            label={<span className="text-lg">{label}</span>}
            valuePropName="value"
            getValueFromEvent={(content) => content} // required for ReactQuill to update Form
            rules={[
                {
                    required: requiredMessage ? true : false,
                    validator: (_, value) =>
                        isQuillEmpty(value)
                            ? Promise.reject(new Error(requiredMessage))
                            : Promise.resolve(),
                },
            ]}
            validateTrigger="onChange"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <ReactQuill
                theme="snow"
                placeholder={`Write your ${label?.toLowerCase()}`}
                {...rest}
            />
        </Form.Item>
    );
};


// const QuillFormItem = ({
//     name,
//     label,
//     requiredMessage = "This field is required",
//     ...rest
// }) => {
//     // eslint-disable-next-line no-unused-vars
//     const [editorValue, setEditorValue] = useState("");

//     // Clear the editor when form is reset
//     const handleChange = (value) => {
//         setEditorValue(value);
//     };

//     return (
//         <Form.Item
//             shouldUpdate={(prevValues, currentValues) =>
//                 prevValues[name] !== currentValues[name]
//             }
//             noStyle
//         >
//             {({ getFieldValue }) => (
//                 <Form.Item
//                     name={name}
//                     label={<span className="text-lg">{label}</span>}
//                     valuePropName="value"
//                     trigger="onChange"
//                     validateTrigger="onChange"
//                     rules={[

//                         {
//                             required: requiredMessage ? true : false,
//                             validator: (_, value) =>
//                                 isQuillEmpty(value)
//                                     ? Promise.reject(new Error(requiredMessage))
//                                     : Promise.resolve(),
//                         },
//                     ]}
//                     labelCol={{ span: 24 }}
//                     wrapperCol={{ span: 24 }}
//                 >
//                     <ReactQuill
//                         theme="snow"
//                         value={getFieldValue(name) || ""}
//                         onChange={handleChange}
//                         placeholder={`Write your ${label?.toLowerCase()}`}
//                         {...rest}
//                     />
//                 </Form.Item>
//             )}
//         </Form.Item>
//     );
// };

QuillFormItem.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    requiredMessage: PropTypes.string,
};

export default QuillFormItem;