import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  notification,
} from 'antd';
import Icon from '@ant-design/icons';
import {
  SearchOutlined,
} from "@ant-design/icons";
import '../styles/register.css';

const baseURL = "https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io";
const { Option } = Select;

// const archive = () => (
//   <img src={zoomSVG} />
// );

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const withUseFormHook = (Component) => {
  return props => {
      const form = Form.useForm();
      return <Component {...props} {...form} />
  }       
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      auth: "",
      autoCompleteResult: [],
    };
    // let form = Form.useForm();
    this.onFinish = this.onFinish.bind(this);
    let websiteOptions = this.state.autoCompleteResult.map((website) => ({
      label: website,
      value: website,
    }));
  }
  // [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  
  onFinish(values){
    const user = {};
      user.email = values.email;
      user.username = values.username;
      user.password = values.password; 
      user.fullName = values.fullName;
      
    console.log('Received values of form: ', values)
    axios.post(`${baseURL}/api/auth/signup`, user).then((response) => {
      if(response.status == "200" && response.data.status.code == "success" ){
        console.log("1", this.state.auth)
        window.location.replace("/login")
      } else { 
        this.setState({error: response.message})
      }
    }).catch((error) => {
      this.setState({error: error.response})
    console.log(error)
      // console.log(this.state.error);
    notification.error({
      message: 'Login Failed',
      description: error.response.data.status.message
    })
    }
    );
  };

  prefixSelector() {
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  }

  suffixSelector() {
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  };

  onWebsiteChange(value) {
    if (!value) {
      this.setState(this.state.autoCompleteResult = []);
    } else {
      this.setState(this.state.autoCompleteResult = ['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  render() {
    return (
      <>
        <div className="registerPageMainContainer">

          <div className="register-form">
            <Form
            {...formItemLayout}
            form={this.form}
            name="register"
            onFinish={this.onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            >
            <div className="formElement loginTitle">
              <span className="title">Register</span>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input className="input" placeholder="E-mail"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password className="input" placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password className="input" placeholder="Confirm Password"/>
            </Form.Item>

            <Form.Item
              name="username"
              tooltip="What do you want others to call you?"
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
              <Input className="input" placeholder="Username"/>
            </Form.Item>

            <Form.Item
              name="fullName"
              tooltip="For example: John Doe"
              rules={[{ required: true, message: 'Please input your fullname!', whitespace: true }]}
            >
              <Input className="input" placeholder="Fullname"/>
            </Form.Item>


            {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>Get captcha</Button>
                </Col>
              </Row>
            </Form.Item> */}

            <Form.Item
              name="agreement"
              valuePropName="checked"
              className="agreement"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox className="check">
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
              <div className="registrationButton">
                <Button className="button" type="primary" htmlType="submit">
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        </div>
      </>
    );
  };
}

export default withUseFormHook(Register);

