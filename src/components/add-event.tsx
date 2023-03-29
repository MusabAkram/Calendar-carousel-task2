import React, { useState } from "react";
import { Select, Space, Button, Typography, Col, Row, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { defaultTimeOptions } from "@/data/time-options";
const { Text } = Typography;
const { useToken } = theme;

interface Props {
    month?: string;
    date?: string;
    year?: number;
    availableTimeSlots?: { value: string; label: string; disabled?: boolean }[];
    onClickAddEvent?: () => void;
}

const AddEvent: React.FC<Props> = ({ month, date, year, availableTimeSlots = defaultTimeOptions, onClickAddEvent }) => {

    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState(availableTimeSlots[0].value);
    const formatDuration = (duration: number): string => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const { token } = useToken();
    const handleDurationChange = (amount: number) => {
        setDuration(prevDuration => {
            const newDuration = prevDuration + amount * 60;
            return Math.max(newDuration, 0);
        });
    };

    const handleTimeChange = (e: string) => {
        console.log(e);
        setTime(e);
    }
    onClickAddEvent = () => {
        return [date, month, year, time, duration];
    }
    return (
        <Col style={{ backgroundColor: "white", height: "200px" }}>
            <Row style={{ marginBottom: token.marginLG }}>
                <Col span={4} offset={8} >
                    <Text strong>Time:</Text>
                </Col>
                <Col span={4} style={{ textAlign: "end" }}>
                    <Select
                        defaultValue={availableTimeSlots[0].value}
                        style={{ width: 120 }}
                        options={availableTimeSlots}
                        bordered={false}
                        suffixIcon={<DownOutlined style={{ color: token.colorPrimary }} />}
                        onChange={(e) => { handleTimeChange(e) }}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: token.marginLG }}>
                <Col span={4} offset={8}>
                    <Text strong>Duration</Text>
                </Col>
                <Col span={4} style={{ textAlign: "end" }}>
                    <Space>
                        <Button shape="circle" style={{ borderColor: token.colorPrimary, color: token.colorPrimary }} ghost onClick={() => handleDurationChange(-1)}>
                            -
                        </Button>
                        <div>{formatDuration(duration)}</div>
                        <Button shape="circle" style={{ borderColor: token.colorPrimary, color: token.colorPrimary }} ghost onClick={() => handleDurationChange(1)}>
                            +
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row style={{ marginBottom: token.marginLG }}>
                <Col span={8} offset={12}>
                    <Button onClick={onClickAddEvent}>OK</Button>
                </Col>
            </Row>
        </Col>
    );

};

export default AddEvent;