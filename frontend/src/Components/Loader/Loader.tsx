import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface ILoader {
  message?: string;
}

export default function Loader({ message = 'Loading' }: ILoader) {
  return <Spin indicator={antIcon} tip={message} size={'large'} />;
}
