import React from 'react';
import { Card, Space, Typography } from 'antd';
import { DisabledDates } from '@/interfaces/disabled-dates-interface';
import { dateCardProps } from "@/interfaces/date-card-props-interface";
import { formatDate, formatMonth } from '@/helpers/format-date';
const { Meta } = Card;
const { Title } = Typography;
interface Props {
    month: string;
    date: string;
    day: string;
    year: number;
    index: number;
    disabledDates?: DisabledDates[];
    selectedDate: string;
    cardStyle?: dateCardProps;
    onClick: (index: number) => void;
    onClickNavbarDate: (value: string) => void;
}
const today = new Date();
const monthString: string = formatMonth(today);
const DateCard: React.FC<Props> = ({ month, date, day, year, index, disabledDates, selectedDate, cardStyle, onClickNavbarDate, onClick }) => {
    let dateInput = formatDate(month, date, year);

    if (`${monthString} ${today.getDate()}, ${today.getFullYear()}` === dateInput) {
        dateInput = `Today`;
    }
    if (`${monthString} ${today.getDate()}, ${today.getFullYear()}` === selectedDate) {
        selectedDate = `Today`;
    }
    const isHoliday = disabledDates?.some(h => h.date === date && h.month === month && h.year === year);

    function handleCardClick(index: number) {
        if (!isHoliday) {
            onClickNavbarDate(`${month} ${date}, ${year}`);
            onClick(index);
        }
    }
    return (
        <Space style={{ margin: '0 10px' }}>

            <Card
                data-testid="date-card"
                type="inner"
                title={month}
                bordered={false}
                hoverable={!isHoliday}
                style={{
                    width: cardStyle?.cardWidth,
                    padding: 0,
                    textAlign: 'center',
                    boxShadow: !isHoliday && dateInput === selectedDate ? '0 0 5px 2px rgba(200, 200, 200, 0.5)' : 'none',
                    backgroundColor: cardStyle?.cardBackgroundColor,
                }}
                headStyle={{ backgroundColor: isHoliday ? cardStyle?.disabledColor : cardStyle?.headerColor, color: cardStyle?.monthColor }}
                bodyStyle={{ padding: 0, margin: 0 }}
                onClick={() => handleCardClick(index)}

            >
                <Title
                    style={{
                        fontWeight: 'bold',
                        fontSize: 54,
                        padding: 0,
                        margin: 10,
                        color: cardStyle?.dateColor,
                    }}
                >
                    {date}
                </Title>
                <Meta
                    description={
                        <Title
                            level={5}
                            style={{ padding: 0, margin: 10, color: cardStyle?.dayColor }}
                        >
                            {isHoliday ? 'Closed' : day}
                        </Title>
                    }
                />
            </Card>
        </Space>
    );


};

export default DateCard;